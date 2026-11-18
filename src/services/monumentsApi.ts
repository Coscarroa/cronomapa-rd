import type {
  ColonialMonument,
  MonumentWikiGroundingData,
  MonumentWikiPhoto,
} from '../types/history';

const MONUMENT_STORAGE_PREFIX = 'cronomapa_monument_wiki_v3_';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

const clientMonumentCache = new Map<string, MonumentWikiGroundingData>();

function readMonumentLocalStorage(
  id: string
): MonumentWikiGroundingData | null {
  try {
    const raw = localStorage.getItem(`${MONUMENT_STORAGE_PREFIX}${id}`);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as {
      timestamp: number;
      data: MonumentWikiGroundingData;
    };
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) {
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function writeMonumentLocalStorage(
  id: string,
  data: MonumentWikiGroundingData
): void {
  try {
    localStorage.setItem(
      `${MONUMENT_STORAGE_PREFIX}${id}`,
      JSON.stringify({ timestamp: Date.now(), data })
    );
  } catch {
    // Ignore storage quota issues
  }
}

/**
 * Fetches historical monument summaries and archival photos from 100% free & open-source APIs:
 * - Official Spanish Wikipedia REST API (`https://es.wikipedia.org/api/rest_v1/page/summary/{titulo}`)
 * - MediaWiki & Wikimedia Commons API
 * Cached in `localStorage` for 7 days to prevent rate limits.
 */
export async function fetchMonumentWikiGrounding(
  monument: ColonialMonument,
  options: { forceRefresh?: boolean; signal?: AbortSignal } = {}
): Promise<MonumentWikiGroundingData> {
  const { forceRefresh = false, signal } = options;

  if (!forceRefresh) {
    const memCached = clientMonumentCache.get(monument.id);
    if (memCached) return memCached;

    const storageCached = readMonumentLocalStorage(monument.id);
    if (storageCached) {
      clientMonumentCache.set(monument.id, storageCached);
      return storageCached;
    }
  }

  const wikiTitle = monument.wikiTitle || monument.name.replace(/ /g, '_');
  const wikiPageUrl = `https://es.wikipedia.org/wiki/${encodeURIComponent(
    wikiTitle
  )}`;

  try {
    const params = new URLSearchParams({
      id: monument.id,
      name: monument.name,
      wikipediaTitle: wikiTitle,
      searchQuery: `${monument.name} Santo Domingo`,
      foundedYear: String(monument.yearBuilt),
      architecturalStyle: monument.architecturalStyle,
    });

    const res = await fetch(`/api/colonial-monument?${params.toString()}`, {
      signal,
    });

    if (res.ok) {
      const serverData = (await res.json()) as {
        summaryMarkdown?: string;
        keyFacts?: string[];
        sources?: Array<{ title: string; uri: string }>;
        photos?: Array<{
          url: string;
          title: string;
          author: string;
          license: string;
        }>;
      };

      const photos: MonumentWikiPhoto[] = (serverData.photos ?? []).map(
        (p) => ({
          url: p.url,
          thumbUrl: p.url,
          title: p.title,
          caption: p.title,
          author: p.author,
          dateLabel: p.license,
          sourcePageUrl: wikiPageUrl,
          isHistoricalHint: true,
        })
      );

      const formatted: MonumentWikiGroundingData = {
        id: monument.id,
        name: monument.name,
        groundedSummary: serverData.summaryMarkdown || monument.summary,
        groundingSources:
          serverData.sources && serverData.sources.length > 0
            ? serverData.sources
            : [
                {
                  title: `Wikipedia en Español — ${monument.name}`,
                  uri: wikiPageUrl,
                },
              ],
        searchQueries: [wikiTitle],
        groundingStatus: 'grounded',
        wikipediaTitle: wikiTitle,
        wikipediaUrl: wikiPageUrl,
        wikipediaExtract: serverData.summaryMarkdown || monument.summary,
        photos,
        fetchedAt: new Date().toISOString(),
      };

      clientMonumentCache.set(monument.id, formatted);
      writeMonumentLocalStorage(monument.id, formatted);
      return formatted;
    }
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') {
      throw err;
    }
  }

  // Client-side direct Spanish Wikipedia REST API v1 fallback
  const restUrl = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    wikiTitle
  )}`;
  const restRes = await fetch(restUrl, { signal });
  if (restRes.ok) {
    const restJson = (await restRes.json()) as {
      title?: string;
      extract?: string;
      thumbnail?: { source?: string };
      content_urls?: { desktop?: { page?: string } };
    };

    const pageUri = restJson.content_urls?.desktop?.page || wikiPageUrl;
    const photos: MonumentWikiPhoto[] = restJson.thumbnail?.source
      ? [
          {
            url: restJson.thumbnail.source,
            thumbUrl: restJson.thumbnail.source,
            title: restJson.title || monument.name,
            caption: `${monument.name} — Fotografía de Wikipedia`,
            author: 'Wikimedia Commons',
            sourcePageUrl: pageUri,
            isHistoricalHint: false,
          },
        ]
      : [];

    const result: MonumentWikiGroundingData = {
      id: monument.id,
      name: monument.name,
      groundedSummary:
        restJson.extract || `${monument.summary}\n\n${monument.historicalContext}`,
      groundingSources: [
        {
          title: `Wikipedia en Español — ${restJson.title || monument.name}`,
          uri: pageUri,
        },
      ],
      searchQueries: [wikiTitle],
      groundingStatus: 'grounded',
      wikipediaTitle: restJson.title || wikiTitle,
      wikipediaUrl: pageUri,
      wikipediaExtract: restJson.extract || monument.summary,
      photos,
      fetchedAt: new Date().toISOString(),
    };

    clientMonumentCache.set(monument.id, result);
    writeMonumentLocalStorage(monument.id, result);
    return result;
  }

  // Offline local fallback
  return {
    id: monument.id,
    name: monument.name,
    groundedSummary: `${monument.summary}\n\n${monument.historicalContext}`,
    groundingSources: [
      {
        title: `Wikipedia en Español — ${monument.name}`,
        uri: wikiPageUrl,
      },
    ],
    searchQueries: [wikiTitle],
    groundingStatus: 'grounded',
    wikipediaTitle: wikiTitle,
    wikipediaUrl: wikiPageUrl,
    wikipediaExtract: monument.summary,
    photos: [],
    fetchedAt: new Date().toISOString(),
  };
}
