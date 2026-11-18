import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const PORT = 3000;

interface MonumentCacheEntry {
  summaryMarkdown: string;
  keyFacts: string[];
  sources: Array<{ title: string; uri: string }>;
  photos: Array<{
    url: string;
    title: string;
    author: string;
    license: string;
  }>;
  timestamp: number;
}

const monumentCache = new Map<string, MonumentCacheEntry>();
const CACHE_TTL_MS = 1000 * 60 * 60 * 6; // 6 hours

/**
 * Fetches verified historical photographs from Wikimedia Commons using the public MediaWiki API.
 * 100% Free & Open-Source — No API Key required.
 */
async function fetchWikimediaPhotos(
  wikipediaTitle: string,
  searchQuery: string
): Promise<
  Array<{ url: string; title: string; author: string; license: string }>
> {
  const photos: Array<{
    url: string;
    title: string;
    author: string;
    license: string;
  }> = [];

  try {
    // 1. Primary thumbnail from Spanish Wikipedia pageimages API
    const wikiUrl = `https://es.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
      wikipediaTitle
    )}&prop=pageimages&pithumbsize=900&format=json&origin=*`;
    const wikiRes = await fetch(wikiUrl, {
      headers: {
        'User-Agent': 'CronoMapaRD/1.0 (Atlas Cartografico Historico RD)',
      },
    });
    if (wikiRes.ok) {
      const wikiJson = (await wikiRes.json()) as {
        query?: {
          pages?: Record<
            string,
            { title?: string; thumbnail?: { source?: string } }
          >;
        };
      };
      const pages = wikiJson.query?.pages || {};
      for (const page of Object.values(pages)) {
        if (page.thumbnail?.source) {
          photos.push({
            url: page.thumbnail.source,
            title: `${page.title || wikipediaTitle} (Fotografía Principal - Wikipedia)`,
            author: 'Wikimedia Commons Contributors',
            license: 'CC BY-SA',
          });
        }
      }
    }

    // 2. Additional historical photographs from Wikimedia Commons
    const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(
      `filetype:bitmap ${searchQuery}`
    )}&gsrlimit=6&prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=800&format=json&origin=*`;

    const commonsRes = await fetch(commonsUrl, {
      headers: {
        'User-Agent': 'CronoMapaRD/1.0 (Atlas Cartografico Historico RD)',
      },
    });

    if (commonsRes.ok) {
      const commonsJson = (await commonsRes.json()) as {
        query?: {
          pages?: Record<
            string,
            {
              title?: string;
              imageinfo?: Array<{
                thumburl?: string;
                url?: string;
                extmetadata?: {
                  Artist?: { value?: string };
                  LicenseShortName?: { value?: string };
                  ImageDescription?: { value?: string };
                };
              }>;
            }
          >;
        };
      };
      const pages = commonsJson.query?.pages || {};
      for (const page of Object.values(pages)) {
        const info = page.imageinfo?.[0];
        const imgUrl = info?.thumburl || info?.url;
        if (
          imgUrl &&
          !photos.some((p) => p.url === imgUrl) &&
          !imgUrl.endsWith('.svg') &&
          !imgUrl.endsWith('.tif')
        ) {
          const rawTitle = (page.title || '')
            .replace(/^File:/i, '')
            .replace(/\.[^/.]+$/, '')
            .replace(/_/g, ' ');
          const rawAuthor =
            info?.extmetadata?.Artist?.value?.replace(/<[^>]*>/g, '').trim() ||
            'Archivo Wikimedia Commons';
          const license =
            info?.extmetadata?.LicenseShortName?.value || 'CC BY-SA';

          photos.push({
            url: imgUrl,
            title: rawTitle,
            author: rawAuthor.slice(0, 70),
            license,
          });
        }
      }
    }
  } catch (err) {
    console.warn('Error fetching Wikimedia photos:', err);
  }

  return photos.slice(0, 5);
}

/**
 * Fetches historical summary, structured paragraphs, and references directly from
 * the free Spanish Wikipedia REST API (`https://es.wikipedia.org/api/rest_v1/page/summary/{titulo}`)
 * and MediaWiki TextExtracts API — 100% Free & Open-Source, Zero Paid AI Keys.
 */
async function fetchWikipediaRestMonumentSummary(
  name: string,
  wikipediaTitle: string,
  foundedYear: number,
  architecturalStyle: string
): Promise<{
  summaryMarkdown: string;
  keyFacts: string[];
  sources: Array<{ title: string; uri: string }>;
}> {
  const wikiPageUri = `https://es.wikipedia.org/wiki/${encodeURIComponent(
    wikipediaTitle
  )}`;
  const sources: Array<{ title: string; uri: string }> = [
    {
      title: `Wikipedia en Español — ${wikipediaTitle.replace(/_/g, ' ')}`,
      uri: wikiPageUri,
    },
    {
      title: 'UNESCO — Ciudad Colonial de Santo Domingo (Patrimonio Mundial)',
      uri: 'https://whc.unesco.org/es/list/526',
    },
  ];

  try {
    // 1. Call official Spanish Wikipedia REST API v1
    const restUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      wikipediaTitle
    )}`;
    const restRes = await fetch(restUrl, {
      headers: {
        'User-Agent': 'CronoMapaRD/1.0 (Atlas Cartografico Historico RD)',
        Accept: 'application/json',
      },
    });

    let leadExtract = '';
    let description = '';

    if (restRes.ok) {
      const restData = (await restRes.json()) as {
        extract?: string;
        description?: string;
        content_urls?: { desktop?: { page?: string } };
      };
      leadExtract = (restData.extract || '').trim();
      description = (restData.description || '').trim();
    }

    // 2. Fetch fuller plain-text extract from MediaWiki API for multi-paragraph detail
    const extractUrl = `https://es.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=0&exchars=1800&explaintext=1&titles=${encodeURIComponent(
      wikipediaTitle
    )}&format=json&origin=*`;
    const extractRes = await fetch(extractUrl, {
      headers: {
        'User-Agent': 'CronoMapaRD/1.0 (Atlas Cartografico Historico RD)',
      },
    });

    let fullExtract = leadExtract;
    if (extractRes.ok) {
      const extractJson = (await extractRes.json()) as {
        query?: { pages?: Record<string, { extract?: string }> };
      };
      const pages = extractJson.query?.pages || {};
      const firstPage = Object.values(pages)[0];
      if (firstPage?.extract && firstPage.extract.trim().length > leadExtract.length) {
        fullExtract = firstPage.extract.trim();
      }
    }

    if (fullExtract) {
      const paragraphs = fullExtract
        .split(/\n+/)
        .map((p) => p.trim())
        .filter((p) => p.length > 40 && !p.startsWith('=='))
        .slice(0, 3);

      const summaryMarkdown = paragraphs.join('\n\n');

      // Extract concise factual sentences for keyFacts
      const sentences = fullExtract
        .split(/(?<=\.)\s+/)
        .map((s) => s.trim())
        .filter((s) => s.length >= 45 && s.length <= 190);

      const keyFacts: string[] = [
        description
          ? `${name}: ${description}.`
          : `Monumento histórico erigido en ${foundedYear} en la Ciudad Colonial de Santo Domingo.`,
        `Estilo arquitectónico predominante: ${architecturalStyle}.`,
        ...sentences.slice(0, 2),
      ].slice(0, 4);

      return {
        summaryMarkdown,
        keyFacts,
        sources,
      };
    }
  } catch (err) {
    console.warn('Wikipedia REST API fallback error:', err);
  }

  return {
    summaryMarkdown: `${name} (fundado hacia ${foundedYear}) constituye uno de los monumentos más representativos de la Ciudad Colonial de Santo Domingo, declarada Patrimonio de la Humanidad por la UNESCO en 1990. Su arquitectura de estilo ${architecturalStyle} refleja la primacía institucional, militar y religiosa de La Española en el Nuevo Mundo.`,
    keyFacts: [
      `Año de fundación / construcción inicial: ${foundedYear}.`,
      `Estilo arquitectónico: ${architecturalStyle}.`,
      `Forma parte del Centro Histórico de Santo Domingo (Patrimonio Mundial UNESCO, 1990).`,
    ],
    sources,
  };
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Endpoint: Colonial Monument Details via 100% Free Wikipedia REST API & Wikimedia Commons
  app.get('/api/colonial-monument', async (req, res) => {
    const id = String(req.query.id || '');
    const name = String(req.query.name || 'Monumento Colonial');
    const wikipediaTitle = String(
      req.query.wikipediaTitle || 'Ciudad_Colonial_de_Santo_Domingo'
    );
    const searchQuery = String(req.query.searchQuery || `${name} Santo Domingo`);
    const foundedYear = Number(req.query.foundedYear || 1502);
    const architecturalStyle = String(
      req.query.architecturalStyle || 'Gótico Isabelino / Renacentista'
    );

    const cacheKey = `${id || wikipediaTitle}`;
    const cached = monumentCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return res.json(cached);
    }

    const [photos, wikiData] = await Promise.all([
      fetchWikimediaPhotos(wikipediaTitle, searchQuery),
      fetchWikipediaRestMonumentSummary(
        name,
        wikipediaTitle,
        foundedYear,
        architecturalStyle
      ),
    ]);

    const payload: MonumentCacheEntry = {
      summaryMarkdown: wikiData.summaryMarkdown,
      keyFacts: wikiData.keyFacts,
      sources: wikiData.sources,
      photos,
      timestamp: Date.now(),
    };

    monumentCache.set(cacheKey, payload);
    return res.json(payload);
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`CronoMapa RD Server running on http://localhost:${PORT}`);
  });
}

startServer();
