import {
  COLONIAL_MONUMENTS as RAW_COLONIAL_MONUMENTS,
  fetchMonumentWikipediaImages as rawFetchMonumentWikipediaImages,
  getCachedMonumentWikipediaImages as rawGetCachedMonumentWikipediaImages,
} from './colonialMonumentsData.js';
import type { ColonialMonument, MonumentWikiPhoto } from '../types/history';

export interface MonumentWikipediaMediaResult {
  wikipediaTitle: string;
  wikipediaUrl: string;
  wikipediaExtract: string;
  primaryImage: string | null;
  photos: MonumentWikiPhoto[];
}

export const COLONIAL_MONUMENTS: ColonialMonument[] =
  RAW_COLONIAL_MONUMENTS as ColonialMonument[];

export function getCachedMonumentWikipediaImages(
  monumentOrKey: ColonialMonument | string,
): MonumentWikipediaMediaResult | null {
  return rawGetCachedMonumentWikipediaImages(monumentOrKey) as MonumentWikipediaMediaResult | null;
}

export async function fetchMonumentWikipediaImages(
  monumentOrTitle: ColonialMonument | string,
  options?: { forceRefresh?: boolean; signal?: AbortSignal },
): Promise<MonumentWikipediaMediaResult> {
  return rawFetchMonumentWikipediaImages(
    monumentOrTitle,
    options,
  ) as Promise<MonumentWikipediaMediaResult>;
}
