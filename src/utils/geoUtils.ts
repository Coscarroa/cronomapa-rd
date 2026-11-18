import * as turf from '@turf/turf';
import localProvincesData from '../data/division_politica_rd.json';
import type { MacroTerritoryDefinition } from '../data/cacicazgosConfig';
import type {
  ProvinceCollection,
  ProvinceFeature,
  TerritorialLayerKind,
  TerritorialPolygonCollection,
  TerritorialPolygonFeature,
} from '../types/history';

const PROVINCE_NAME_ALIASES: Record<string, string> = {
  'la estrelleta': 'elias pina',
  'el seybo': 'el seibo',
  hermanas: 'hermanas mirabal',
  bahoruco: 'baoruco',
};

export function normalizeProvinceName(name: string): string {
  const cleaned = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return PROVINCE_NAME_ALIASES[cleaned] ?? cleaned;
}

const localFallbackTyped = localProvincesData as unknown as ProvinceCollection;

export function getBundledRealProvinces(): ProvinceCollection {
  return localFallbackTyped;
}

export async function fetchRealProvinceGeoJSON(): Promise<ProvinceCollection> {
  // 100% Offline-First: Bundled local static GeoJSON for instant zero-latency rendering
  return localFallbackTyped;
}

export function buildMacroTerritoryGeoJSON(
  provincesGeoJson: ProvinceCollection,
  configs: MacroTerritoryDefinition[],
  groupKind: TerritorialLayerKind,
): TerritorialPolygonCollection {
  const byNormName: Record<string, ProvinceFeature> = {};
  for (const feat of provincesGeoJson.features) {
    byNormName[normalizeProvinceName(feat.properties.nombre)] = feat;
    if (feat.properties.shapeName) {
      byNormName[normalizeProvinceName(feat.properties.shapeName)] = feat;
    }
  }

  const features: TerritorialPolygonFeature[] = [];

  for (const cfg of configs) {
    const matchedTurfFeatures: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>[] = [];

    for (const provName of cfg.provincias) {
      const found = byNormName[normalizeProvinceName(provName)];
      if (found) {
        matchedTurfFeatures.push({
          type: 'Feature',
          properties: {},
          geometry: found.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon,
        });
      }
    }

    if (matchedTurfFeatures.length === 0) continue;

    let merged: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>;
    if (matchedTurfFeatures.length === 1) {
      merged = matchedTurfFeatures[0];
    } else {
      try {
        const unionResult = turf.union(turf.featureCollection(matchedTurfFeatures));
        merged = unionResult ?? matchedTurfFeatures[0];
      } catch {
        // Fallback to MultiPolygon combination if topological union encounters a degenerate vertex
        const multiCoords: GeoJSON.Position[][][] = [];
        for (const mf of matchedTurfFeatures) {
          if (mf.geometry.type === 'Polygon') {
            multiCoords.push(mf.geometry.coordinates);
          } else {
            multiCoords.push(...mf.geometry.coordinates);
          }
        }
        merged = {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'MultiPolygon',
            coordinates: multiCoords,
          },
        };
      }
    }

    let centroid: [number, number] = cfg.labelFallback;
    try {
      const center = turf.centerOfMass(merged);
      const [lng, lat] = center.geometry.coordinates;
      if (Number.isFinite(lng) && Number.isFinite(lat)) {
        centroid = [lng, lat];
      }
    } catch {
      centroid = cfg.labelFallback;
    }

    features.push({
      type: 'Feature',
      geometry: {
        type: merged.geometry.type,
        coordinates: merged.geometry.coordinates as
          | [number, number][][]
          | [number, number][][][],
      },
      properties: {
        id: cfg.id,
        nombre_capa: cfg.nombre,
        subtitulo: cfg.subtitulo,
        grupo_territorial: groupKind,
        anio_inicio: cfg.anioInicio,
        anio_fin: cfg.anioFin,
        color: cfg.color,
        descripcion_territorial: cfg.descripcion,
        cabecera: cfg.cabecera,
        liderazgo: cfg.liderazgo,
        provincias_actuales: cfg.provincias,
        centroid,
      },
    });
  }

  return {
    type: 'FeatureCollection',
    name: groupKind,
    features,
  };
}

export function getProvinceCentroid(feature: ProvinceFeature): [number, number] {
  try {
    const center = turf.centerOfMass(
      feature as unknown as GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>,
    );
    const [lng, lat] = center.geometry.coordinates;
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      return [lat, lng];
    }
  } catch {
    // Fallback below
  }
  const ring =
    feature.geometry.type === 'Polygon'
      ? (feature.geometry.coordinates as [number, number][][])[0]
      : (feature.geometry.coordinates as [number, number][][][])[0]?.[0];
  if (!ring?.length) return [18.7357, -70.1627];
  let sumLng = 0;
  let sumLat = 0;
  for (const pt of ring) {
    sumLng += pt[0];
    sumLat += pt[1];
  }
  return [sumLat / ring.length, sumLng / ring.length];
}

export function extractGeometryRings(
  geometry: GeoJSON.Polygon | GeoJSON.MultiPolygon | ProvinceFeature['geometry'],
): [number, number][][] {
  if (geometry.type === 'Polygon') {
    return geometry.coordinates as [number, number][][];
  }
  return (geometry.coordinates as [number, number][][][]).flat();
}
