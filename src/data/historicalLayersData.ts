import capasTerritoriales from './capas_territoriales.json';
import { CACICAZGOS_1492_CONFIG } from './cacicazgosConfig';
import { PROVINCIAS_1844_CONFIG } from './provincias1844Config';
import {
  buildMacroTerritoryGeoJSON,
  extractGeometryRings,
  getBundledRealProvinces,
} from '../utils/geoUtils';
import type { ProvinceCollection, TerritorialPolygonCollection } from '../types/history';

export type EpochAtmosphere = 'ancient' | 'twentieth' | 'present';

export interface HistoricalEpochDefinition {
  id: string;
  label: string;
  shortLabel: string;
  minYear: number;
  maxYear: number;
  jumpYear: number;
  atmosphere: EpochAtmosphere;
  filterClass: string;
  subtitle: string;
}

export const HISTORICAL_EPOCHS: HistoricalEpochDefinition[] = [
  {
    id: 'taina',
    label: 'Época Taína',
    shortLabel: 'Taína',
    minYear: 1492,
    maxYear: 1504,
    jumpYear: 1498,
    atmosphere: 'ancient',
    filterClass: 'sepia-[0.25] contrast-[1.05] brightness-[0.95]',
    subtitle: 'Quisqueya Precolombina · Los Cinco Cacicazgos',
  },
  {
    id: 'colonia',
    label: 'Colonia',
    shortLabel: 'Colonia',
    minYear: 1505,
    maxYear: 1821,
    jumpYear: 1777,
    atmosphere: 'ancient',
    filterClass: 'sepia-[0.25] contrast-[1.05] brightness-[0.95]',
    subtitle: 'Capitanía General, Devastaciones y Tratado de Aranjuez',
  },
  {
    id: 'independencia',
    label: 'Independencia 1844',
    shortLabel: '1844',
    minYear: 1822,
    maxYear: 1862,
    jumpYear: 1844,
    atmosphere: 'ancient',
    filterClass: 'sepia-[0.25] contrast-[1.05] brightness-[0.95]',
    subtitle: 'Separación Nacional, Primera República y Cinco Provincias',
  },
  {
    id: 'restauracion',
    label: 'Restauración',
    shortLabel: 'Restauración',
    minYear: 1863,
    maxYear: 1915,
    jumpYear: 1865,
    atmosphere: 'ancient',
    filterClass: 'sepia-[0.25] contrast-[1.05] brightness-[0.95]',
    subtitle: 'Grito de Capotillo y Consolidación de la Segunda República',
  },
  {
    id: 'siglo_xx',
    label: 'Siglo XX',
    shortLabel: 'Siglo XX',
    minYear: 1916,
    maxYear: 1999,
    jumpYear: 1965,
    atmosphere: 'twentieth',
    filterClass: 'saturate-[0.8] contrast-[1.08]',
    subtitle: 'Ocupaciones, Era de Trujillo, Guerra de Abril y Balaguer',
  },
  {
    id: 'actualidad',
    label: 'Actualidad',
    shortLabel: 'Hoy',
    minYear: 2000,
    maxYear: 2026,
    jumpYear: 2026,
    atmosphere: 'present',
    filterClass: 'sepia-0 saturate-100 contrast-100 brightness-100',
    subtitle: 'República Dominicana Contemporánea · 32 Demarcaciones',
  },
];

export function getEpochForYear(year: number): HistoricalEpochDefinition {
  return (
    HISTORICAL_EPOCHS.find((ep) => year >= ep.minYear && year <= ep.maxYear) ??
    HISTORICAL_EPOCHS[HISTORICAL_EPOCHS.length - 1]
  );
}

export type BeforeCompareLayerId = 'cacicazgos_1492' | 'division_colonial' | 'provincias_1844';

export interface ComparePolygonFeature {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  labelPoint?: [number, number]; // [lng, lat]
  rings: [number, number][][]; // Array of polygon rings ([lng, lat][])
}

export interface BeforeCompareLayerConfig {
  id: BeforeCompareLayerId;
  title: string;
  shortTitle: string;
  yearLabel: string;
  evolutionNote: string;
  features: ComparePolygonFeature[];
}

const territorialTyped = capasTerritoriales as unknown as TerritorialPolygonCollection;

function toCompareFeaturesFromTerritorial(collection: TerritorialPolygonCollection): ComparePolygonFeature[] {
  return collection.features.map((f) => ({
    id: f.properties.id,
    name: f.properties.nombre_capa,
    subtitle: f.properties.subtitulo,
    color: f.properties.color,
    labelPoint: f.properties.centroid,
    rings: extractGeometryRings(f.geometry),
  }));
}

function toCompareFeaturesFromGroup(group: string): ComparePolygonFeature[] {
  const filtered: TerritorialPolygonCollection = {
    type: 'FeatureCollection',
    name: group,
    features: territorialTyped.features.filter((f) => f.properties.grupo_territorial === group),
  };
  return toCompareFeaturesFromTerritorial(filtered);
}

export function buildBeforeCompareLayers(provincesGeoJson: ProvinceCollection): BeforeCompareLayerConfig[] {
  const cacicazgosMerged = buildMacroTerritoryGeoJSON(
    provincesGeoJson,
    CACICAZGOS_1492_CONFIG,
    'cacicazgos_1492',
  );
  const provincias1844Merged = buildMacroTerritoryGeoJSON(
    provincesGeoJson,
    PROVINCIAS_1844_CONFIG,
    'provincias_1844',
  );

  return [
    {
      id: 'cacicazgos_1492',
      title: 'Los 5 Cacicazgos Taínos de 1492',
      shortTitle: 'Cacicazgos Taínos (1492)',
      yearLabel: '1492',
      evolutionNote:
        'Fusión geográfica real mediante Turf.js de los territorios indígenas de Quisqueya (Marién, Maguá, Maguana, Jaragua e Higüey) en contraste sincronizado con las 31 provincias y el Distrito Nacional contemporáneos.',
      features: toCompareFeaturesFromTerritorial(cacicazgosMerged),
    },
    {
      id: 'provincias_1844',
      title: 'Las 5 Provincias Originales de 1844',
      shortTitle: '5 Provincias de 1844',
      yearLabel: '1844',
      evolutionNote:
        'La primera Constitución de San Cristóbal (6 de noviembre de 1844) estructuró la República en cinco grandes provincias: Santo Domingo, Santiago, Concepción de La Vega, Compostela de Azua y Santa Cruz de El Seibo.',
      features: toCompareFeaturesFromTerritorial(provincias1844Merged),
    },
    {
      id: 'division_colonial',
      title: 'División Colonial de la Isla (Tratado de Aranjuez)',
      shortTitle: 'División Colonial (1777)',
      yearLabel: '1777',
      evolutionNote:
        'El Tratado de Aranjuez de 1777 fijó 221 mojones entre el Saint-Domingue francés y la Capitanía General de Santo Domingo española, trazando la frontera matriz de la República Dominicana.',
      features: toCompareFeaturesFromGroup('tratado_aranjuez_1777'),
    },
  ];
}

export function buildModernCompareFeatures(provincesGeoJson: ProvinceCollection): ComparePolygonFeature[] {
  return provincesGeoJson.features.map((f) => ({
    id: f.properties.codigo,
    name: f.properties.nombre,
    subtitle: `${f.properties.region} · Cab. ${f.properties.cabecera}`,
    color: '#C5A059',
    rings: extractGeometryRings(f.geometry),
  }));
}

const defaultProvinces = getBundledRealProvinces();
export const BEFORE_COMPARE_LAYERS: BeforeCompareLayerConfig[] =
  buildBeforeCompareLayers(defaultProvinces);
export const MODERN_COMPARE_FEATURES: ComparePolygonFeature[] =
  buildModernCompareFeatures(defaultProvinces);
