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

  const timeoutController = new AbortController();
  const timeoutId = globalThis.setTimeout(() => timeoutController.abort(), 10000);
  const onExternalAbort = () => timeoutController.abort();
  options?.signal?.addEventListener('abort', onExternalAbort, { once: true });

  try {
    const response = await fetch('/api/monuments/wiki', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: timeoutController.signal,
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

    const rawText = await response.text();
    let payload: (MonumentWikiGroundingData & { error?: string }) | null = null;
    if (rawText) {
      try {
        payload = JSON.parse(rawText) as MonumentWikiGroundingData & { error?: string };
      } catch {
        payload = null;
      }
    }

    if (response.status === 429) {
      throw new Error(
        'Límite de peticiones alcanzado (HTTP 429). Intente nuevamente en unos segundos.',
      );
    }

    if (!response.ok || !payload) {
      throw new Error(
        payload?.error || `No se pudieron cargar los datos de Wikipedia (${response.status}).`,
      );
    }

    clientWikiCache.set(monument.id, payload);
    return payload;
  } finally {
    globalThis.clearTimeout(timeoutId);
    options?.signal?.removeEventListener('abort', onExternalAbort);
  }
}
