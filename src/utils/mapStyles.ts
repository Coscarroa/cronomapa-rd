import type { PathOptions } from 'leaflet';
import type { BaseMapId, TerritorialPolygonFeature } from '../types/history';

export type MacroRegionKey = 'ozama' | 'cibao' | 'sur' | 'este';

export interface MacroRegionPalette {
  key: MacroRegionKey;
  label: string;
  fill: string;
  stroke: string;
}

export const MACRO_REGION_PALETTES: Record<MacroRegionKey, MacroRegionPalette> = {
  ozama: {
    key: 'ozama',
    label: 'Gran Santo Domingo / Ozama',
    fill: '#9B2226',
    stroke: '#C5A059',
  },
  cibao: {
    key: 'cibao',
    label: 'Región Cibao / Norte',
    fill: '#2D6A4F',
    stroke: '#C5A059',
  },
  sur: {
    key: 'sur',
    label: 'Región Sur / Suroeste',
    fill: '#BC6C25',
    stroke: '#C5A059',
  },
  este: {
    key: 'este',
    label: 'Región Este',
    fill: '#1D3557',
    stroke: '#C5A059',
  },
};

export function getMacroRegionKey(regionName: string): MacroRegionKey {
  const normalized = regionName.toLowerCase();
  if (normalized.includes('ozama') || normalized.includes('santo domingo')) {
    return 'ozama';
  }
  if (normalized.includes('cibao')) {
    return 'cibao';
  }
  if (
    normalized.includes('valle') ||
    normalized.includes('enriquillo') ||
    normalized.includes('valdesia') ||
    normalized.includes('sur')
  ) {
    return 'sur';
  }
  return 'este';
}

export function getProvinceMacroPalette(regionName: string): MacroRegionPalette {
  return MACRO_REGION_PALETTES[getMacroRegionKey(regionName)];
}

export function isSatelliteBaseMap(baseMapId: BaseMapId): boolean {
  return baseMapId === 'satellite_hybrid';
}

export interface ProvinceStyleOptions {
  regionName: string;
  baseMapId: BaseMapId;
  layerOpacity: number;
  presidentsLayerVisible: boolean;
  presidentCount: number;
  isSelected: boolean;
  isHovered?: boolean;
}

export function getLeafletProvinceStyle({
  regionName,
  baseMapId,
  layerOpacity,
  presidentsLayerVisible,
  presidentCount,
  isSelected,
  isHovered = false,
}: ProvinceStyleOptions): PathOptions {
  const palette = getProvinceMacroPalette(regionName);
  const satellite = isSatelliteBaseMap(baseMapId);

  let baseFillOpacity = 0.28;
  if (presidentsLayerVisible) {
    baseFillOpacity =
      presidentCount > 0 ? Math.min(0.55, 0.25 + presidentCount * 0.045) : 0.16;
  }

  if (isSelected) {
    baseFillOpacity = 0.52;
  } else if (isHovered) {
    baseFillOpacity = 0.38;
  }

  const strokeColor = isSelected
    ? '#D4AF37'
    : satellite
      ? '#F4F1EA'
      : '#C5A059';

  return {
    fillColor: palette.fill,
    fillOpacity: Math.min(0.75, baseFillOpacity * Math.max(0.35, layerOpacity)),
    color: strokeColor,
    weight: isSelected || isHovered ? 2.5 : 1.2,
    opacity: isSelected || isHovered ? 1 : Math.max(0.55, layerOpacity),
  };
}

export function getLeafletTerritorialStyle(
  feature: TerritorialPolygonFeature | undefined,
  baseMapId: BaseMapId,
  layerOpacity: number,
  isSelected: boolean,
  isHovered = false,
): PathOptions {
  const color = feature?.properties?.color ?? '#C5A059';
  const satellite = isSatelliteBaseMap(baseMapId);

  return {
    fillColor: color,
    fillOpacity: Math.min(
      0.68,
      (isSelected ? 0.48 : isHovered ? 0.42 : 0.35) * Math.max(0.4, layerOpacity),
    ),
    color: isSelected ? '#F4F1EA' : satellite ? '#F4F1EA' : '#C5A059',
    weight: isSelected || isHovered ? 2.6 : 1.6,
    opacity: Math.max(0.65, layerOpacity),
    dashArray: isSelected ? undefined : '5, 4',
  };
}
