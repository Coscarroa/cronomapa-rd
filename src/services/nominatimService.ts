/**
 * 100% Free & Open-Source Geocoding and Historical Summary Services:
 * 1. Nominatim (OpenStreetMap) bounded to Dominican Republic (`countrycodes=do`)
 * 2. Spanish Wikipedia REST API (`https://es.wikipedia.org/api/rest_v1/page/summary/{titulo}`)
 * Includes persistent `localStorage` caching to avoid HTTP 429 rate limits and support offline reuse.
 */

export interface NominatimPlaceResult {
  place_id: number;
  display_name: string;
  name: string;
  lat: number;
  lng: number;
  type: string;
  category: string;
}

export interface WikipediaSummaryResult {
  title: string;
  extract: string;
  thumbnailUrl: string | null;
  pageUrl: string;
  description?: string;
}

const NOMINATIM_CACHE_KEY = 'cronomapa_nominatim_rd_cache_v1';
const WIKI_REST_CACHE_KEY = 'cronomapa_wiki_rest_es_cache_v1';
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

interface CacheEntry<T> {
  timestamp: number;
  data: T;
}

function readLocalCache<T>(storageKey: string, queryKey: string): T | null {
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Record<string, CacheEntry<T>>;
    const entry = parsed[queryKey];
    if (!entry) return null;
    if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function writeLocalCache<T>(
  storageKey: string,
  queryKey: string,
  data: T
): void {
  try {
    const raw = localStorage.getItem(storageKey);
    const parsed: Record<string, CacheEntry<T>> = raw ? JSON.parse(raw) : {};
    // Keep cache compact (max 60 keys)
    const keys = Object.keys(parsed);
    if (keys.length > 60) {
      delete parsed[keys[0]];
    }
    parsed[queryKey] = {
      timestamp: Date.now(),
      data,
    };
    localStorage.setItem(storageKey, JSON.stringify(parsed));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Queries OpenStreetMap Nominatim strictly filtered to the Dominican Republic (`countrycodes=do`).
 * Uses `localStorage` cache first so repeated searches trigger 0 network requests.
 */
export async function searchNominatimRD(
  query: string,
  signal?: AbortSignal
): Promise<NominatimPlaceResult[]> {
  const normalized = query.trim().toLowerCase();
  if (normalized.length < 3) return [];

  const cached = readLocalCache<NominatimPlaceResult[]>(
    NOMINATIM_CACHE_KEY,
    normalized
  );
  if (cached) return cached;

  const params = new URLSearchParams({
    format: 'jsonv2',
    q: query.trim(),
    countrycodes: 'do',
    viewbox: '-72.01,19.93,-68.32,17.47',
    bounded: '1',
    limit: '5',
    'accept-language': 'es',
  });

  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?${params.toString()}`,
    {
      signal,
      headers: {
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    return [];
  }

  const rawList = (await response.json()) as Array<{
    place_id: number;
    display_name: string;
    name?: string;
    lat: string;
    lon: string;
    type?: string;
    category?: string;
  }>;

  const results: NominatimPlaceResult[] = rawList.map((item) => ({
    place_id: item.place_id,
    display_name: item.display_name,
    name: item.name || item.display_name.split(',')[0],
    lat: parseFloat(item.lat),
    lng: parseFloat(item.lon),
    type: item.type || 'lugar',
    category: item.category || 'place',
  }));

  writeLocalCache(NOMINATIM_CACHE_KEY, normalized, results);
  return results;
}

/**
 * Queries the official free Spanish Wikipedia REST API:
 * https://es.wikipedia.org/api/rest_v1/page/summary/{titulo}
 */
export async function fetchWikipediaSummaryEs(
  title: string,
  signal?: AbortSignal
): Promise<WikipediaSummaryResult | null> {
  const cleanTitle = title.trim();
  if (!cleanTitle) return null;

  const cacheKey = cleanTitle.toLowerCase();
  const cached = readLocalCache<WikipediaSummaryResult>(
    WIKI_REST_CACHE_KEY,
    cacheKey
  );
  if (cached) return cached;

  const url = `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
    cleanTitle.replace(/ /g, '_')
  )}`;

  const response = await fetch(url, {
    signal,
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) return null;

  const data = (await response.json()) as {
    title?: string;
    extract?: string;
    description?: string;
    thumbnail?: { source?: string };
    content_urls?: { desktop?: { page?: string } };
  };

  if (!data.extract) return null;

  const summary: WikipediaSummaryResult = {
    title: data.title || cleanTitle,
    extract: data.extract,
    description: data.description,
    thumbnailUrl: data.thumbnail?.source || null,
    pageUrl:
      data.content_urls?.desktop?.page ||
      `https://es.wikipedia.org/wiki/${encodeURIComponent(cleanTitle)}`,
  };

  writeLocalCache(WIKI_REST_CACHE_KEY, cacheKey, summary);
  return summary;
}
