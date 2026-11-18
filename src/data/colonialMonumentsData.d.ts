import type { ColonialMonument, MonumentWikiPhoto } from '../types/history';

export interface MonumentWikipediaMediaResult {
  wikipediaTitle: string;
  wikipediaUrl: string;
  wikipediaExtract: string;
  primaryImage: string | null;
  photos: MonumentWikiPhoto[];
}

export declare const COLONIAL_MONUMENTS: ColonialMonument[];

export declare function getCachedMonumentWikipediaImages(
  monumentOrKey: ColonialMonument | string,
): MonumentWikipediaMediaResult | null;

export declare function fetchMonumentWikipediaImages(
  monumentOrTitle: ColonialMonument | string,
  options?: { forceRefresh?: boolean; signal?: AbortSignal },
): Promise<MonumentWikipediaMediaResult>;
