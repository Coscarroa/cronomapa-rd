import type { ColonialMonument, MonumentWikiGroundingData } from '../types/history';

const clientWikiCache = new Map<string, MonumentWikiGroundingData>();

export async function fetchMonumentWikiGrounding(
  monument: ColonialMonument,
  options?: { forceRefresh?: boolean; signal?: AbortSignal },
): Promise<MonumentWikiGroundingData> {
  if (!options?.forceRefresh) {
    const cached = clientWikiCache.get(monument.id);
    if (cached) return cached;
  }

  const response = await fetch('/api/monuments/wiki', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: options?.signal,
    body: JSON.stringify({
      id: monument.id,
      name: monument.name,
      wikiTitle: monument.wikiTitle,
      enWikiTitle: monument.enWikiTitle,
      location: `${monument.locationLabel}, ${monument.province}`,
      yearBuilt: monument.yearBuilt,
      forceRefresh: Boolean(options?.forceRefresh),
    }),
  });

  const payload = (await response.json()) as MonumentWikiGroundingData & { error?: string };

  if (!response.ok) {
    throw new Error(
      payload?.error || `No se pudieron cargar los datos de Wikipedia (${response.status}).`,
    );
  }

  clientWikiCache.set(monument.id, payload);
  return payload;
}
