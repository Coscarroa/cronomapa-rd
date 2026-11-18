import 'dotenv/config';
import express from 'express';
import type { Request, Response } from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const WIKI_USER_AGENT = 'CronoMapaRD/1.0 (Atlas Cartografico Historico RD; educational-app)';

interface WikiPhotoItem {
  url: string;
  thumbUrl: string;
  title: string;
  caption: string;
  author?: string;
  dateLabel?: string;
  sourcePageUrl: string;
  isHistoricalHint: boolean;
}

interface GroundingSource {
  title: string;
  uri: string;
}

interface MonumentWikiResponse {
  id: string;
  name: string;
  groundedSummary: string;
  groundingSources: GroundingSource[];
  searchQueries: string[];
  groundingStatus: 'grounded' | 'unavailable';
  groundingError?: string;
  wikipediaTitle?: string;
  wikipediaUrl?: string;
  wikipediaExtract?: string;
  photos: WikiPhotoItem[];
  fetchedAt: string;
}

interface CacheEntry {
  expiresAt: number;
  data: MonumentWikiResponse;
}

const wikiCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

function stripHtml(raw: string | undefined): string {
  if (!raw) return '';
  return raw
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function isExcludedWikiImage(title: string, mime?: string, width?: number, height?: number): boolean {
  const lower = title.toLowerCase();
  if (mime && !['image/jpeg', 'image/png', 'image/webp'].includes(mime)) {
    return true;
  }
  if (typeof width === 'number' && width < 320) return true;
  if (typeof height === 'number' && height < 200) return true;

  const blocked = [
    '.svg',
    'commons-logo',
    'wikidata',
    'wikisource',
    'wikibooks',
    'wikiquote',
    'flag_of',
    'escudo',
    'coat_of_arms',
    'location_map',
    'locator',
    'icon',
    'ambox',
    'question_book',
    'symbol',
    'blue_pencil',
    'red_pog',
    'unesco_logo',
    'world_heritage',
  ];
  return blocked.some((token) => lower.includes(token));
}

function detectHistoricalPhotoHint(title: string, caption: string, dateLabel: string): boolean {
  const combined = `${title} ${caption} ${dateLabel}`.toLowerCase();
  return /\b(18\d{2}|19[0-5]\d|historic|históric|antigu|grabado|lithograph|postcard|postal|archivo|archive|vintage|stereograph|c\.\s*19|siglo xix|siglo xviii)\b/.test(
    combined,
  );
}

interface WikiApiPage {
  pageid?: number;
  title?: string;
  extract?: string;
  fullurl?: string;
  missing?: string;
  thumbnail?: { source?: string; width?: number; height?: number };
  original?: { source?: string; width?: number; height?: number };
}

interface WikiImageInfo {
  url?: string;
  thumburl?: string;
  descriptionurl?: string;
  mime?: string;
  width?: number;
  height?: number;
  extmetadata?: {
    ImageDescription?: { value?: string };
    ObjectName?: { value?: string };
    Artist?: { value?: string };
    DateTimeOriginal?: { value?: string };
  };
}

interface WikiImagePage {
  title?: string;
  imageinfo?: WikiImageInfo[];
}

async function fetchJsonWithTimeout(url: string, timeoutMs = 8000): Promise<unknown> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': WIKI_USER_AGENT,
        Accept: 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} from ${url}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

function extractPhotosFromPages(
  pagesMap: Record<string, WikiImagePage> | undefined,
  fallbackCaption: string,
): WikiPhotoItem[] {
  if (!pagesMap) return [];
  const collected: WikiPhotoItem[] = [];

  for (const page of Object.values(pagesMap)) {
    const title = page.title ?? '';
    const info = page.imageinfo?.[0];
    if (!info?.url) continue;
    if (isExcludedWikiImage(title, info.mime, info.width, info.height)) continue;

    const desc =
      stripHtml(info.extmetadata?.ImageDescription?.value) ||
      stripHtml(info.extmetadata?.ObjectName?.value) ||
      fallbackCaption;
    const author = stripHtml(info.extmetadata?.Artist?.value);
    const dateLabel = stripHtml(info.extmetadata?.DateTimeOriginal?.value);
    const cleanTitle = title.replace(/^File:/i, '').replace(/^Archivo:/i, '').replace(/_/g, ' ');

    collected.push({
      url: info.url,
      thumbUrl: info.thumburl || info.url,
      title: cleanTitle,
      caption: desc.slice(0, 220),
      author: author ? author.slice(0, 80) : undefined,
      dateLabel: dateLabel ? dateLabel.slice(0, 48) : undefined,
      sourcePageUrl: info.descriptionurl || info.url,
      isHistoricalHint: detectHistoricalPhotoHint(cleanTitle, desc, dateLabel),
    });
  }

  // Prioritize historical/archival images first
  collected.sort((a, b) => Number(b.isHistoricalHint) - Number(a.isHistoricalHint));
  return collected;
}

async function fetchWikipediaAndCommons(
  wikiTitle: string,
  enWikiTitle: string | undefined,
  monumentName: string,
): Promise<{
  wikipediaTitle?: string;
  wikipediaUrl?: string;
  wikipediaExtract?: string;
  photos: WikiPhotoItem[];
}> {
  let resolvedTitle = wikiTitle;
  let wikipediaTitle: string | undefined;
  let wikipediaUrl: string | undefined;
  let wikipediaExtract: string | undefined;
  const photos: WikiPhotoItem[] = [];
  const seenUrls = new Set<string>();

  const pushUniquePhotos = (items: WikiPhotoItem[]) => {
    for (const item of items) {
      if (!seenUrls.has(item.url) && photos.length < 10) {
        seenUrls.add(item.url);
        photos.push(item);
      }
    }
  };

  try {
    // 1) Resolve Spanish Wikipedia article summary & canonical title
    const summaryUrl =
      `https://es.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(resolvedTitle)}` +
      `&redirects=1&prop=extracts|info|pageimages&exintro=1&explaintext=1&inprop=url&piprop=original|thumbnail&pithumbsize=1100&format=json`;
    const summaryData = (await fetchJsonWithTimeout(summaryUrl)) as {
      query?: { pages?: Record<string, WikiApiPage> };
    };
    let page = summaryData.query?.pages ? Object.values(summaryData.query.pages)[0] : undefined;

    if (!page || page.missing !== undefined) {
      // Fallback search in es.wikipedia
      const searchUrl = `https://es.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(
        `${monumentName} República Dominicana`,
      )}&srlimit=1&format=json`;
      const searchRes = (await fetchJsonWithTimeout(searchUrl)) as {
        query?: { search?: Array<{ title?: string }> };
      };
      const foundTitle = searchRes.query?.search?.[0]?.title;
      if (foundTitle) {
        resolvedTitle = foundTitle;
        const retryUrl =
          `https://es.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(resolvedTitle)}` +
          `&redirects=1&prop=extracts|info|pageimages&exintro=1&explaintext=1&inprop=url&piprop=original|thumbnail&pithumbsize=1100&format=json`;
        const retryData = (await fetchJsonWithTimeout(retryUrl)) as {
          query?: { pages?: Record<string, WikiApiPage> };
        };
        page = retryData.query?.pages ? Object.values(retryData.query.pages)[0] : undefined;
      }
    }

    if (page && page.missing === undefined) {
      wikipediaTitle = page.title;
      resolvedTitle = page.title || resolvedTitle;
      wikipediaUrl = page.fullurl;
      wikipediaExtract = page.extract?.trim();

      if (page.original?.source && !isExcludedWikiImage(page.original.source)) {
        pushUniquePhotos([
          {
            url: page.original.source,
            thumbUrl: page.thumbnail?.source || page.original.source,
            title: wikipediaTitle || monumentName,
            caption: `Imagen principal documentada en Wikipedia: ${wikipediaTitle || monumentName}`,
            sourcePageUrl: wikipediaUrl || page.original.source,
            isHistoricalHint: false,
          },
        ]);
      }

      // 2) Fetch all images embedded in the Spanish Wikipedia article
      const esImagesUrl =
        `https://es.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(resolvedTitle)}` +
        `&generator=images&gimlimit=20&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=1200&format=json`;
      const esImagesData = (await fetchJsonWithTimeout(esImagesUrl)) as {
        query?: { pages?: Record<string, WikiImagePage> };
      };
      pushUniquePhotos(extractPhotosFromPages(esImagesData.query?.pages, monumentName));
    }
  } catch {
    // Non-fatal: continue to English Wikipedia & Wikimedia Commons
  }

  // 3) Check English Wikipedia article images (often contains extra Library of Congress / archival photos)
  if (enWikiTitle && photos.length < 6) {
    try {
      const enImagesUrl =
        `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(enWikiTitle)}` +
        `&redirects=1&generator=images&gimlimit=15&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=1200&format=json`;
      const enImagesData = (await fetchJsonWithTimeout(enImagesUrl)) as {
        query?: { pages?: Record<string, WikiImagePage> };
      };
      pushUniquePhotos(extractPhotosFromPages(enImagesData.query?.pages, monumentName));
    } catch {
      // Non-fatal
    }
  }

  // 4) Search Wikimedia Commons directly for historical / archival photos of the monument
  if (photos.length < 6) {
    try {
      const commonsQuery = `${monumentName} Santo Domingo OR Dominicana`;
      const commonsUrl =
        `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6` +
        `&gsrsearch=${encodeURIComponent(commonsQuery)}&gsrlimit=12&prop=imageinfo&iiprop=url|extmetadata|mime|size&iiurlwidth=1200&format=json`;
      const commonsData = (await fetchJsonWithTimeout(commonsUrl)) as {
        query?: { pages?: Record<string, WikiImagePage> };
      };
      pushUniquePhotos(extractPhotosFromPages(commonsData.query?.pages, monumentName));
    } catch {
      // Non-fatal
    }
  }

  // Sort again so historical photos surface cleanly while keeping valid order
  photos.sort((a, b) => Number(b.isHistoricalHint) - Number(a.isHistoricalHint));

  return {
    wikipediaTitle,
    wikipediaUrl,
    wikipediaExtract,
    photos,
  };
}

async function fetchGeminiWikipediaGrounding(params: {
  name: string;
  wikiTitle: string;
  location: string;
  yearBuilt: number;
}): Promise<{
  groundedSummary: string;
  groundingSources: GroundingSource[];
  searchQueries: string[];
  groundingStatus: 'grounded' | 'unavailable';
  groundingError?: string;
}> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      groundedSummary: '',
      groundingSources: [],
      searchQueries: [],
      groundingStatus: 'unavailable',
      groundingError: 'GEMINI_API_KEY no configurada en el entorno del servidor.',
    };
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const prompt = [
      `Consulta información verificada en Wikipedia (es.wikipedia.org / en.wikipedia.org) mediante búsqueda web sobre el monumento colonial dominicano "${params.name}" ubicado en ${params.location} (construido hacia ${params.yearBuilt}, artículo de referencia: "${params.wikiTitle.replace(/_/g, ' ')}").`,
      'Redacta en español una ficha historiográfica concisa y rigurosa (máximo 220 palabras) estructurada exactamente en tres bloques cortos con estos encabezados en negrita:',
      '**Reseña Histórica (Wikipedia):** origen, fundación, hechos históricos relevantes y papel durante la época colonial o republicana.',
      '**Arquitectura y Conservación:** estilo arquitectónico, materiales, estado actual (ruinas, fortaleza, templo o museo) y estatus patrimonial.',
      '**Dato de Archivo:** 1 o 2 datos singulares verificables del monumento.',
      'No inventes fechas ni atribuciones no respaldadas por las fuentes consultadas.',
    ].join('\n\n');

    const response = await ai.models.generateContent({
      model: 'gemini-4-hydrogen',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        systemInstruction:
          'Eres un historiador especialista en arquitectura colonial del Caribe y de la República Dominicana. Responde exclusivamente en español con rigor enciclopédico basado en los resultados de búsqueda de Wikipedia.',
      },
    });

    const groundedSummary = (response.text ?? '').trim();
    const metadata = response.candidates?.[0]?.groundingMetadata;
    const rawChunks = metadata?.groundingChunks ?? [];

    const seenUris = new Set<string>();
    const groundingSources: GroundingSource[] = [];
    for (const chunk of rawChunks) {
      const uri = chunk.web?.uri;
      const title = chunk.web?.title || uri || 'Fuente Wikipedia / Web';
      if (uri && !seenUris.has(uri)) {
        seenUris.add(uri);
        groundingSources.push({ title, uri });
      }
    }

    // Prioritize Wikipedia & Wikimedia sources first
    groundingSources.sort((a, b) => {
      const aWiki = a.uri.includes('wikipedia.org') || a.uri.includes('wikimedia.org') ? 1 : 0;
      const bWiki = b.uri.includes('wikipedia.org') || b.uri.includes('wikimedia.org') ? 1 : 0;
      return bWiki - aWiki;
    });

    const searchQueries = metadata?.webSearchQueries ?? [];

    return {
      groundedSummary,
      groundingSources,
      searchQueries,
      groundingStatus: groundedSummary ? 'grounded' : 'unavailable',
      groundingError: groundedSummary ? undefined : 'El modelo no devolvió texto fundamentado.',
    };
  } catch (err) {
    const rawMessage =
      err instanceof Error ? err.message : 'Error consultando Gemini Search Grounding.';
    let cleanMessage = rawMessage;
    try {
      const parsed = JSON.parse(rawMessage) as {
        error?: { code?: number; message?: string; status?: string };
      };
      if (parsed?.error?.message) {
        cleanMessage = parsed.error.code === 429
          ? 'Cuota de Gemini API temporalmente agotada (429). Se muestran datos directos de Wikipedia y Wikimedia Commons.'
          : `${parsed.error.status || 'Error'} (${parsed.error.code ?? ''}): ${parsed.error.message}`;
      }
    } catch {
      if (rawMessage.includes('429') || rawMessage.includes('RESOURCE_EXHAUSTED')) {
        cleanMessage =
          'Cuota de Gemini API temporalmente agotada (429). Se muestran datos directos de Wikipedia y Wikimedia Commons.';
      }
    }
    return {
      groundedSummary: '',
      groundingSources: [],
      searchQueries: [],
      groundingStatus: 'unavailable',
      groundingError: cleanMessage,
    };
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ ok: true, service: 'cronomapa-rd' });
  });

  app.post('/api/monuments/wiki', async (req: Request, res: Response) => {
    const body = req.body as {
      id?: string;
      name?: string;
      wikiTitle?: string;
      enWikiTitle?: string;
      location?: string;
      yearBuilt?: number;
      forceRefresh?: boolean;
    };

    const id = String(body.id ?? '').trim();
    const name = String(body.name ?? '').trim();
    const wikiTitle = String(body.wikiTitle ?? name).trim();
    const enWikiTitle = body.enWikiTitle ? String(body.enWikiTitle).trim() : undefined;
    const location = String(body.location ?? 'República Dominicana').trim();
    const yearBuilt = Number(body.yearBuilt ?? 1502);
    const forceRefresh = Boolean(body.forceRefresh);

    if (!id || !name) {
      res.status(400).json({ error: 'Los campos id y name son obligatorios.' });
      return;
    }

    const cached = wikiCache.get(id);
    if (!forceRefresh && cached && cached.expiresAt > Date.now()) {
      res.json(cached.data);
      return;
    }

    try {
      const [groundingResult, wikiMediaResult] = await Promise.all([
        fetchGeminiWikipediaGrounding({ name, wikiTitle, location, yearBuilt }),
        fetchWikipediaAndCommons(wikiTitle, enWikiTitle, name),
      ]);

      // Ensure Wikipedia link appears in sources if discovered via REST API
      const sources = [...groundingResult.groundingSources];
      if (
        wikiMediaResult.wikipediaUrl &&
        !sources.some((s) => s.uri === wikiMediaResult.wikipediaUrl)
      ) {
        sources.unshift({
          title: `Wikipedia: ${wikiMediaResult.wikipediaTitle || name}`,
          uri: wikiMediaResult.wikipediaUrl,
        });
      }

      const payload: MonumentWikiResponse = {
        id,
        name,
        groundedSummary: groundingResult.groundedSummary,
        groundingSources: sources,
        searchQueries: groundingResult.searchQueries,
        groundingStatus: groundingResult.groundingStatus,
        groundingError: groundingResult.groundingError,
        wikipediaTitle: wikiMediaResult.wikipediaTitle,
        wikipediaUrl: wikiMediaResult.wikipediaUrl,
        wikipediaExtract: wikiMediaResult.wikipediaExtract,
        photos: wikiMediaResult.photos,
        fetchedAt: new Date().toISOString(),
      };

      // Cache successful grounded responses (and short-cache partial responses)
      if (payload.groundingStatus === 'grounded' || payload.photos.length > 0) {
        wikiCache.set(id, {
          expiresAt: Date.now() + (payload.groundingStatus === 'grounded' ? CACHE_TTL_MS : 1000 * 60 * 5),
          data: payload,
        });
      }

      if (
        payload.groundingStatus === 'unavailable' &&
        !payload.wikipediaExtract &&
        payload.photos.length === 0
      ) {
        res.status(502).json({
          error:
            payload.groundingError ||
            'No se pudieron obtener datos de Wikipedia ni de Grounding en este momento.',
          ...payload,
        });
        return;
      }

      res.json(payload);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error interno consultando datos de Wikipedia.';
      res.status(500).json({ error: message });
    }
  });

  if (process.env.NODE_ENV === 'production') {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CronoMapa RD server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start CronoMapa RD server:', err);
  process.exit(1);
});
