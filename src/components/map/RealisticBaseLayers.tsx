import React from 'react';
import { TileLayer } from 'react-leaflet';
import type { BaseMapId } from '../../types/history';

interface RealisticBaseLayersProps {
  baseMapId: BaseMapId;
  reliefIntensity?: number;
}

/**
 * 100% Free & Open-Source Cartographic Base Layers for CronoMapa RD:
 * - realistic_relief: OpenTopoMap (Topographic relief based on OpenStreetMap & SRTM)
 * - physical_historical: CartoDB Dark Matter (High-contrast dark mode for historical layers)
 * - satellite_hybrid: Esri World Imagery + CartoDB Dark Only Labels
 * - parchment: OpenStreetMap Standard with archival parchment CSS filter
 */
export default function RealisticBaseLayers({
  baseMapId,
  reliefIntensity = 0.85,
}: RealisticBaseLayersProps) {
  if (baseMapId === 'realistic_relief') {
    return (
      <>
        <TileLayer
          key="base-carto-dark-underlay"
          url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
        />
        <TileLayer
          key="base-opentopomap"
          url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors, SRTM | &copy; <a href="https://opentopomap.org" target="_blank" rel="noreferrer">OpenTopoMap</a> (CC-BY-SA) | &copy; CARTO, &copy; Esri'
          maxZoom={17}
          opacity={Math.max(0.35, Math.min(1, reliefIntensity))}
          className="tile-filter-topo-dark"
        />
        <TileLayer
          key="overlay-carto-topolabels"
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
          opacity={0.92}
        />
      </>
    );
  }

  if (baseMapId === 'satellite_hybrid') {
    return (
      <>
        <TileLayer
          key="base-esri-imagery"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri, Maxar, Earthstar Geographics | &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>'
          maxZoom={19}
        />
        <TileLayer
          key="overlay-carto-labels"
          url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
          maxZoom={19}
          opacity={0.9}
        />
      </>
    );
  }

  if (baseMapId === 'parchment') {
    return (
      <TileLayer
        key="base-osm-parchment"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors, &copy; CARTO, &copy; Esri'
        maxZoom={19}
        className="tile-filter-parchment"
      />
    );
  }

  // Default ('physical_historical'): CartoDB Dark Matter
  return (
    <TileLayer
      key="base-carto-dark"
      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      subdomains="abcd"
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions" target="_blank" rel="noreferrer">CARTO</a>, &copy; Esri'
      maxZoom={19}
    />
  );
}

export { RealisticBaseLayers };
