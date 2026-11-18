import { useEffect } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import type { BaseMapId } from '../../types/history';

interface RealisticBaseLayersProps {
  baseMapId: BaseMapId;
  reliefIntensity: number;
}

export function getGoogleMapTypeId(baseMapId: BaseMapId): string {
  if (baseMapId === 'satellite_hybrid') return 'hybrid';
  if (baseMapId === 'realistic_relief' || baseMapId === 'physical_historical') return 'terrain';
  return 'roadmap';
}

export default function RealisticBaseLayers({ baseMapId }: RealisticBaseLayersProps) {
  const map = useMap();

  useEffect(() => {
    if (!map || typeof map.setMapTypeId !== 'function') return;
    map.setMapTypeId(getGoogleMapTypeId(baseMapId));
  }, [map, baseMapId]);

  return null;
}
