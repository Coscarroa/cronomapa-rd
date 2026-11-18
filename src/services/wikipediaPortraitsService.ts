const CACHE_KEY = 'cronomapa_wiki_portraits_v1';
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const BATCH_SIZE = 48; // MediaWiki API allows up to 50 titles per query
const COAT_OF_ARMS_TITLE = 'Coat of arms of the Dominican Republic';

/**
 * Exact dictionary mapping Dominican presidents, historical aliases, and collegiate bodies
 * to their official Wikipedia article titles (referenced from en.wikipedia.org List of presidents).
 */
export const WIKI_TITLES_MAP: Record<string, string> = {
  // Primera República y Junta Central (1844–1861)
  'Francisco del Rosario Sánchez': 'Francisco del Rosario Sánchez',
  'Tomás Bobadilla': 'Tomás Bobadilla',
  'Tomás Bobadilla y Briones': 'Tomás Bobadilla',
  'Pedro Santana': 'Pedro Santana',
  'Pedro Santana Familias': 'Pedro Santana',
  'Manuel Jimenes': 'Manuel Jimenes',
  'Manuel Jimenes González': 'Manuel Jimenes',
  'Santiago Espaillat': 'Santiago Espaillat',
  'Buenaventura Báez': 'Buenaventura Báez',
  'Buenaventura Báez Méndez': 'Buenaventura Báez',
  'Manuel de Regla Mota': 'Manuel de Regla Mota',
  'José Desiderio Valverde': 'José Desiderio Valverde',

  // Anexión y Restauración (1861–1865)
  'Felipe Rivero y Lemoine': 'Felipe Rivero y Lemoine',
  'Carlos de Vargas': 'Carlos de Vargas',
  'José de la Gándara': 'José de la Gándara',
  'José Antonio Salcedo': 'José Antonio Salcedo',
  'José Antonio Salcedo (Pepillo)': 'José Antonio Salcedo',
  'Gaspar Polanco': 'Gaspar Polanco',
  'Gaspar Polanco Borbón': 'Gaspar Polanco',
  'Benigno Filomeno de Rojas': 'Benigno Filomeno de Rojas',
  'Pedro Antonio Pimentel': 'Pedro Antonio Pimentel',
  'Pedro Antonio Pimentel Chamorro': 'Pedro Antonio Pimentel',

  // Segunda República (1865–1916)
  'José María Cabral': 'José María Cabral',
  'José María Cabral y Luna': 'José María Cabral',
  'Pedro Guillermo': 'Pedro Guillermo',
  'Gregorio Luperón': 'Gregorio Luperón',
  'Manuel Altagracia Cáceres': 'Manuel Altagracia Cáceres',
  'Ignacio María González': 'Ignacio María González (politician)',
  'Ignacio María González (politician)': 'Ignacio María González (politician)',
  'Mariano Ignacio Pérez (Ignacio María González)': 'Ignacio María González (politician)',
  'Mariano Ignacio Pérez (Ignacio M. González)': 'Ignacio María González (politician)',
  'Ulises Francisco Espaillat': 'Ulises Francisco Espaillat',
  'Marcos Antonio Cabral': 'Marcos Antonio Cabral',
  'Cesáreo Guillermo': 'Cesáreo Guillermo',
  'Cesáreo Guillermo y Bastardo': 'Cesáreo Guillermo',
  'Jacinto de Castro': 'Jacinto de Castro',
  'Fernando Arturo de Meriño': 'Fernando Arturo de Meriño',
  'Ulises Heureaux': 'Ulises Heureaux',
  'Ulises Heureaux (Lilís)': 'Ulises Heureaux',
  'Ulises Heureaux — Lilís': 'Ulises Heureaux',
  'Dictadura de Ulises Heureaux (Lilís)': 'Ulises Heureaux',
  'Francisco Gregorio Billini': 'Francisco Gregorio Billini',
  'Alejandro Woss y Gil': 'Alejandro Woss y Gil',
  'Wenceslao Figuereo': 'Wenceslao Figuereo',
  'Wenceslao Figuereo (Manolao)': 'Wenceslao Figuereo',
  'Horacio Vásquez': 'Horacio Vásquez',
  'Felipe Horacio Vásquez Lajara': 'Horacio Vásquez',
  'Juan Isidro Jimenes': 'Juan Isidro Jimenes Pereyra',
  'Juan Isidro Jimenes Pereyra': 'Juan Isidro Jimenes Pereyra',
  'Carlos Felipe Morales': 'Carlos Felipe Morales',
  'Carlos Felipe Morales Languasco': 'Carlos Felipe Morales',
  'Ramón Cáceres': 'Ramón Cáceres',
  'Ramón Cáceres (Mon)': 'Ramón Cáceres',
  'Ramón Arturo Cáceres Vásquez (Mon)': 'Ramón Cáceres',
  'Eladio Victoria': 'Eladio Victoria',
  'Adolfo Alejandro Nouel': 'Adolfo Alejandro Nouel',
  'José Bordas Valdez': 'José Bordas Valdez',
  'Ramón Báez': 'Ramón Báez',

  // Ocupación y Tercera República (1916–1965)
  'Francisco Henríquez y Carvajal': 'Francisco Henríquez y Carvajal',
  'Juan Bautista Vicini Burgos': 'Juan Bautista Vicini Burgos',
  'Rafael Estrella Ureña': 'Rafael Estrella Ureña',
  'Jacinto Peynado': 'Jacinto Peynado',
  'Jacinto Bienvenido Peynado': 'Jacinto Peynado',
  'Rafael Trujillo': 'Rafael Trujillo',
  'Rafael Leónidas Trujillo Molina': 'Rafael Trujillo',
  'Manuel de Jesús Troncoso': 'Manuel de Jesús Troncoso',
  'Manuel de Jesús Troncoso de la Concha': 'Manuel de Jesús Troncoso',
  'Héctor Trujillo': 'Héctor Trujillo',
  'Héctor Bienvenido Trujillo Molina': 'Héctor Trujillo',
  'Joaquín Balaguer': 'Joaquín Balaguer',
  'Joaquín Antonio Balaguer Ricardo': 'Joaquín Balaguer',
  'Rafael Filiberto Bonnelly': 'Rafael Filiberto Bonnelly',
  'Juan Bosch': 'Juan Bosch',
  'Juan Emilio Bosch Gaviño': 'Juan Bosch',
  'Emilio de los Santos': 'Emilio de los Santos',
  'Donald Reid Cabral': 'Donald Reid Cabral',

  // Guerra de Abril y Cuarta República (1965–Presente)
  'José Rafael Molina Ureña': 'José Rafael Molina Ureña',
  'Francisco Caamaño': 'Francisco Caamaño',
  'Francisco Alberto Caamaño': 'Francisco Caamaño',
  'Francisco Alberto Caamaño Deñó': 'Francisco Caamaño',
  'Antonio Imbert Barrera': 'Antonio Imbert Barrera',
  'Héctor García-Godoy': 'Héctor García-Godoy',
  'Héctor García-Godoy Cáceres': 'Héctor García-Godoy',
  'Antonio Guzmán Fernández': 'Antonio Guzmán Fernández',
  'Silvestre Antonio Guzmán Fernández': 'Antonio Guzmán Fernández',
  'Jacobo Majluta Azar': 'Jacobo Majluta Azar',
  'Salvador Jorge Blanco': 'Salvador Jorge Blanco',
  'Leonel Fernández': 'Leonel Fernández',
  'Leonel Antonio Fernández Reyna': 'Leonel Fernández',
  'Hipólito Mejía': 'Hipólito Mejía',
  'Rafael Hipólito Mejía Domínguez': 'Hipólito Mejía',
  'Danilo Medina': 'Danilo Medina',
  'Danilo Medina Sánchez': 'Danilo Medina',
  'Luis Abinader': 'Luis Abinader',
  'Luis Rodolfo Abinader Corona': 'Luis Abinader',

  // Órganos colegiados y emblema nacional (fallback institucional)
  'Central Government Junta': COAT_OF_ARMS_TITLE,
  Triumvirate: COAT_OF_ARMS_TITLE,
  'Council of Secretaries of State': COAT_OF_ARMS_TITLE,
  'Council of State': COAT_OF_ARMS_TITLE,
  'Junta Central Gubernativa': COAT_OF_ARMS_TITLE,
  Triunvirato: COAT_OF_ARMS_TITLE,
  'Anexión a España (Capitanía General)': COAT_OF_ARMS_TITLE,
  'Primera Ocupación Militar de EE.UU.': COAT_OF_ARMS_TITLE,
  [COAT_OF_ARMS_TITLE]: COAT_OF_ARMS_TITLE,
};

const ES_WIKI_ALT_TITLES: Record<string, string> = {
  'Ignacio María González (politician)': 'Ignacio María González Santín',
  'Manuel de Jesús Troncoso': 'Manuel de Jesús Troncoso de la Concha',
  'Rafael Trujillo': 'Rafael Leónidas Trujillo',
  'Francisco Caamaño': 'Francisco Alberto Caamaño',
  [COAT_OF_ARMS_TITLE]: 'Escudo de la República Dominicana',
};

interface CachedPortraitsPayload {
  timestamp: number;
  portraits: Record<string, string>;
}

interface MediaWikiBatchResponse {
  query?: {
    normalized?: Array<{ from: string; to: string }>;
    redirects?: Array<{ from: string; to: string }>;
    pages?: Record<
      string,
      {
        title?: string;
        missing?: string;
        thumbnail?: { source?: string; width?: number; height?: number };
      }
    >;
  };
}

function normalizeLookupKey(raw: string): string {
  return raw
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

const NORMALIZED_KEY_TO_WIKI_TITLE: Record<string, string> = Object.entries(
  WIKI_TITLES_MAP,
).reduce<Record<string, string>>((acc, [key, wikiTitle]) => {
  acc[normalizeLookupKey(key)] = wikiTitle;
  return acc;
}, {});

export function isCollegiateEntityName(name: string): boolean {
  const norm = normalizeLookupKey(name);
  return (
    norm.includes('junta') ||
    norm.includes('triunvirato') ||
    norm.includes('triumvirate') ||
    norm.includes('council') ||
    norm.includes('consejo de estado') ||
    norm.includes('ocupacion') ||
    norm.includes('anexion')
  );
}

export function resolveWikiTitleForName(name: string): string | null {
  if (!name) return null;
  if (WIKI_TITLES_MAP[name]) return WIKI_TITLES_MAP[name];

  const normFull = normalizeLookupKey(name);
  if (NORMALIZED_KEY_TO_WIKI_TITLE[normFull]) {
    return NORMALIZED_KEY_TO_WIKI_TITLE[normFull];
  }

  // Strip parenthetical mandate annotations like "Pedro Santana (1.º mandato)" or "Junta ... (Sánchez / Bobadilla)"
  const withoutParens = name.replace(/\(.*?\)/g, '').trim();
  const normNoParens = normalizeLookupKey(withoutParens);
  if (NORMALIZED_KEY_TO_WIKI_TITLE[normNoParens]) {
    return NORMALIZED_KEY_TO_WIKI_TITLE[normNoParens];
  }

  // Handle slash-separated titles in timeline entries (e.g. "Antonio Guzmán / Jacobo Majluta")
  if (withoutParens.includes('/') || withoutParens.includes('·')) {
    const firstPart = withoutParens.split(/[\/·]/)[0]?.trim() ?? '';
    const normFirst = normalizeLookupKey(firstPart);
    if (NORMALIZED_KEY_TO_WIKI_TITLE[normFirst]) {
      return NORMALIZED_KEY_TO_WIKI_TITLE[normFirst];
    }
  }

  // Collegiate bodies automatically fall back to the Coat of Arms of the Dominican Republic
  if (isCollegiateEntityName(name)) {
    return COAT_OF_ARMS_TITLE;
  }

  return null;
}

export function getCachedPortraits(): Record<string, string> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as CachedPortraitsPayload;
    if (
      !parsed ||
      typeof parsed.timestamp !== 'number' ||
      !parsed.portraits ||
      typeof parsed.portraits !== 'object'
    ) {
      return {};
    }
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) {
      return {};
    }
    return parsed.portraits;
  } catch {
    return {};
  }
}

function savePortraitsToCache(portraits: Record<string, string>): void {
  if (typeof window === 'undefined') return;
  try {
    const payload: CachedPortraitsPayload = {
      timestamp: Date.now(),
      portraits,
    };
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota or storage restriction errors inside iframes
  }
}

async function queryMediaWikiBatch(
  lang: 'en' | 'es',
  titles: string[],
): Promise<Record<string, string>> {
  const result: Record<string, string> = {};
  if (titles.length === 0) return result;

  const encodedTitles = encodeURIComponent(titles.join('|'));
  const endpoint = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodedTitles}&prop=pageimages&format=json&pithumbsize=400&redirects=1&origin=*`;

  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`MediaWiki ${lang} HTTP ${response.status}`);
  }

  const data = (await response.json()) as MediaWikiBatchResponse;
  const pages = Object.values(data.query?.pages ?? {});

  const normalizedMap = new Map<string, string>();
  for (const item of data.query?.normalized ?? []) {
    normalizedMap.set(item.from, item.to);
  }

  const redirectMap = new Map<string, string>();
  for (const item of data.query?.redirects ?? []) {
    redirectMap.set(item.from, item.to);
  }

  const thumbByFinalTitle = new Map<string, string>();
  for (const page of pages) {
    if (page.title && page.thumbnail?.source) {
      thumbByFinalTitle.set(page.title, page.thumbnail.source);
    }
  }

  for (const requested of titles) {
    let resolved = normalizedMap.get(requested) ?? requested;
    // Follow possible chained redirects
    for (let hop = 0; hop < 3; hop += 1) {
      const next = redirectMap.get(resolved);
      if (!next) break;
      resolved = next;
    }
    const thumb = thumbByFinalTitle.get(resolved) ?? thumbByFinalTitle.get(requested);
    if (thumb) {
      result[requested] = thumb;
    }
  }

  return result;
}

function chunkArray<T>(items: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
}

let inflightFetch: Promise<Record<string, string>> | null = null;

/**
 * Fetches all official Dominican presidential portraits (400px thumbnails) in batches
 * from en.wikipedia.org with es.wikipedia.org fallback, and caches them for 7 days.
 */
export async function fetchAllPresidentPortraits(
  options?: { forceRefresh?: boolean },
): Promise<Record<string, string>> {
  if (!options?.forceRefresh) {
    const cached = getCachedPortraits();
    if (Object.keys(cached).length > 0) {
      return cached;
    }
  }

  if (inflightFetch && !options?.forceRefresh) {
    return inflightFetch;
  }

  inflightFetch = (async () => {
    const uniqueWikiTitles = Array.from(new Set(Object.values(WIKI_TITLES_MAP)));
    const resolvedByWikiTitle: Record<string, string> = {};

    // 1. Batch query en.wikipedia.org (max 48 titles per HTTP call -> 2 quick requests)
    const enBatches = chunkArray(uniqueWikiTitles, BATCH_SIZE);
    const enResults = await Promise.allSettled(
      enBatches.map((batch) => queryMediaWikiBatch('en', batch)),
    );
    for (const r of enResults) {
      if (r.status === 'fulfilled') {
        Object.assign(resolvedByWikiTitle, r.value);
      }
    }

    // 2. Fallback query es.wikipedia.org for any titles missing from en.wikipedia.org
    const missingWikiTitles = uniqueWikiTitles.filter((t) => !resolvedByWikiTitle[t]);
    if (missingWikiTitles.length > 0) {
      const esQueryToOrig = new Map<string, string[]>();
      const esTitlesToFetch: string[] = [];

      for (const origTitle of missingWikiTitles) {
        const esTitle = ES_WIKI_ALT_TITLES[origTitle] ?? origTitle;
        const list = esQueryToOrig.get(esTitle) ?? [];
        list.push(origTitle);
        esQueryToOrig.set(esTitle, list);
        if (!esTitlesToFetch.includes(esTitle)) {
          esTitlesToFetch.push(esTitle);
        }
      }

      const esBatches = chunkArray(esTitlesToFetch, BATCH_SIZE);
      const esResults = await Promise.allSettled(
        esBatches.map((batch) => queryMediaWikiBatch('es', batch)),
      );
      for (const r of esResults) {
        if (r.status === 'fulfilled') {
          for (const [esTitle, thumbUrl] of Object.entries(r.value)) {
            const origList = esQueryToOrig.get(esTitle) ?? [esTitle];
            for (const origTitle of origList) {
              resolvedByWikiTitle[origTitle] = thumbUrl;
            }
          }
        }
      }
    }

    // 3. Build final dictionary keyed by every app/Wikipedia name + collegiate fallback
    const portraitsByName: Record<string, string> = {};
    const coatOfArmsUrl = resolvedByWikiTitle[COAT_OF_ARMS_TITLE];

    for (const [appName, wikiTitle] of Object.entries(WIKI_TITLES_MAP)) {
      const url = resolvedByWikiTitle[wikiTitle];
      if (url) {
        portraitsByName[appName] = url;
      } else if (isCollegiateEntityName(appName) && coatOfArmsUrl) {
        portraitsByName[appName] = coatOfArmsUrl;
      }
    }

    // Also include direct canonical Wikipedia titles
    for (const [wikiTitle, url] of Object.entries(resolvedByWikiTitle)) {
      if (url && !portraitsByName[wikiTitle]) {
        portraitsByName[wikiTitle] = url;
      }
    }

    if (Object.keys(portraitsByName).length > 0) {
      savePortraitsToCache(portraitsByName);
    }

    return portraitsByName;
  })();

  try {
    return await inflightFetch;
  } finally {
    inflightFetch = null;
  }
}

/**
 * Resolves the portrait URL for a president or collegiate mandate name from the portraits map.
 */
export function resolvePortraitUrl(
  name: string,
  portraitsMap: Record<string, string>,
): string | undefined {
  if (!name) return undefined;
  if (portraitsMap[name]) return portraitsMap[name];

  const mappedTitle = resolveWikiTitleForName(name);
  if (mappedTitle && portraitsMap[mappedTitle]) {
    return portraitsMap[mappedTitle];
  }

  const normTarget = normalizeLookupKey(name);
  for (const [key, url] of Object.entries(portraitsMap)) {
    if (normalizeLookupKey(key) === normTarget) {
      return url;
    }
  }

  if (isCollegiateEntityName(name)) {
    return (
      portraitsMap[COAT_OF_ARMS_TITLE] ||
      portraitsMap['Central Government Junta'] ||
      portraitsMap['Triumvirate']
    );
  }

  return undefined;
}

const highResCache = new Map<string, string>();
const highResInflight = new Map<string, Promise<string | null>>();

interface MediaWikiHighResResponse {
  query?: {
    pages?: Record<
      string,
      {
        title?: string;
        missing?: string;
        thumbnail?: { source?: string; width?: number; height?: number };
        original?: { source?: string; width?: number; height?: number };
      }
    >;
  };
}

async function queryHighResFromLang(lang: 'en' | 'es', title: string): Promise<string | null> {
  const encodedTitle = encodeURIComponent(title);
  const endpoint = `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodedTitle}&prop=pageimages&format=json&piprop=thumbnail|original&pithumbsize=800&redirects=1&origin=*`;

  const response = await fetch(endpoint);
  if (!response.ok) return null;

  const data = (await response.json()) as MediaWikiHighResResponse;
  const pages = Object.values(data.query?.pages ?? {});
  const page = pages[0];
  if (!page || page.missing !== undefined) return null;

  return page.thumbnail?.source || page.original?.source || null;
}

export function getCachedHighResPortrait(nameOrTitle: string): string | undefined {
  const wikiTitle = resolveWikiTitleForName(nameOrTitle) ?? nameOrTitle;
  return highResCache.get(wikiTitle) ?? highResCache.get(nameOrTitle);
}

/**
 * Fetches an 800px (or original) high-resolution portrait from MediaWiki API
 * on demand when opening the PresidentDetailModal, keeping initial loads light.
 */
export async function fetchHighResPortrait(nameOrTitle: string): Promise<string | null> {
  if (!nameOrTitle) return null;
  const wikiTitle = resolveWikiTitleForName(nameOrTitle) ?? nameOrTitle;

  const cached = highResCache.get(wikiTitle);
  if (cached) return cached;

  const pending = highResInflight.get(wikiTitle);
  if (pending) return pending;

  const task = (async () => {
    try {
      let url = await queryHighResFromLang('en', wikiTitle);
      if (!url) {
        const esTitle = ES_WIKI_ALT_TITLES[wikiTitle] ?? wikiTitle;
        url = await queryHighResFromLang('es', esTitle);
      }
      if (url) {
        highResCache.set(wikiTitle, url);
        highResCache.set(nameOrTitle, url);
      }
      return url;
    } catch {
      return null;
    } finally {
      highResInflight.delete(wikiTitle);
    }
  })();

  highResInflight.set(wikiTitle, task);
  return task;
}

