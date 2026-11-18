import React, { useEffect, useMemo, useState } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  GeoJSON,
  ImageOverlay,
  Marker,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import capasTerritoriales from '../../data/capas_territoriales.json';
import {
  ANTIQUE_OVERLAYS,
  MAP_INITIAL_CENTER,
  MAP_INITIAL_ZOOM,
} from '../../data/layersConfig';
import { useCronoMapa } from '../../context/CronoMapaContext';
import {
  getLeafletProvinceStyle,
  getLeafletTerritorialStyle,
} from '../../utils/mapStyles';
import type {
  DossierHito,
  HistoricalEvent,
  ProvinceFeature,
  TerritorialPolygonCollection,
  TerritorialPolygonFeature,
} from '../../types/history';
import RealisticBaseLayers from './RealisticBaseLayers';
import HistoricalMarkersLayer from './HistoricalMarkersLayer';
import ColonialMonumentsLayer from './ColonialMonumentsLayer';
import HistoricalRoutesLayer from './HistoricalRoutesLayer';

export interface FlyToTarget {
  center?: [number, number]; // [lat, lng]
  zoom?: number;
  zoomDelta?: number;
  bounds?: [[number, number], [number, number]]; // [[south, west], [north, east]]
  nonce: number;
}

const MapCameraAndEvents: React.FC = () => {
  const map = useMap();
  const { flyToTarget, setCursorCoords, setZoom, setSelectedFeature } =
    useCronoMapa();

  // Keep Leaflet container dimensions fresh on sidebar/drawer open/close
  useEffect(() => {
    const container = map.getContainer();
    const timer = window.setTimeout(() => {
      map.invalidateSize();
    }, 120);

    let observer: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && container) {
      observer = new ResizeObserver(() => {
        map.invalidateSize({ animate: false });
      });
      observer.observe(container);
    }

    return () => {
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [map]);

  useMapEvents({
    mousemove(e) {
      setCursorCoords({
        lat: Number(e.latlng.lat.toFixed(4)),
        lng: Number(e.latlng.lng.toFixed(4)),
      });
    },
    zoomend() {
      setZoom(map.getZoom());
    },
    click() {
      setSelectedFeature(null);
    },
  });

  useEffect(() => {
    if (!flyToTarget) return;
    if (flyToTarget.center) {
      const [lat, lng] = flyToTarget.center;
      map.flyTo([lat, lng], flyToTarget.zoom ?? map.getZoom(), {
        duration: 0.85,
      });
    } else if (flyToTarget.bounds) {
      map.flyToBounds(flyToTarget.bounds, {
        padding: [36, 36],
        duration: 0.85,
      });
    } else if (typeof flyToTarget.zoomDelta === 'number') {
      map.setZoom(map.getZoom() + flyToTarget.zoomDelta);
    } else if (typeof flyToTarget.zoom === 'number') {
      map.setZoom(flyToTarget.zoom);
    }
  }, [flyToTarget, map]);

  return null;
};

const EVENT_CATEGORY_COLORS: Record<string, string> = {
  'Política/Constitucional': '#D4AF37',
  'Batalla/Militar': '#E63946',
  'Fundación/Territorio': '#2A9D8F',
  'Derechos/Sociedad': '#3B82F6',
};

function createEventDivIcon(
  evt: HistoricalEvent,
  isSelected: boolean
): L.DivIcon {
  const color = EVENT_CATEGORY_COLORS[evt.properties.categoria] ?? '#D4AF37';
  const size = isSelected ? 30 : 22;
  const html = `
    <div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:9999px;background:#161920;border:2px solid ${color};box-shadow:0 0 12px ${color}80;cursor:pointer;transition:transform 0.2s ease;">
      <div style="width:${isSelected ? 10 : 7}px;height:${isSelected ? 10 : 7}px;border-radius:9999px;background:${color};"></div>
    </div>
  `;
  return L.divIcon({
    className: 'leaflet-div-icon',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

function createDossierDivIcon(
  hito: DossierHito,
  isSelected: boolean
): L.DivIcon {
  const color = hito.regimen === 'trujillo' ? '#9B2226' : '#2563EB';
  const size = isSelected ? 30 : 24;
  const html = `
    <div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:6px;transform:rotate(45deg);background:${color};border:1.5px solid #F4F1EA;box-shadow:0 3px 10px rgba(0,0,0,0.85);cursor:pointer;">
      <span style="transform:rotate(-45deg);font-family:monospace;font-size:9px;font-weight:700;color:#F4F1EA;">${hito.regimen === 'trujillo' ? 'T' : 'B'}</span>
    </div>
  `;
  return L.divIcon({
    className: 'leaflet-div-icon',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function MapView() {
  const {
    activeBaseMapId,
    reliefIntensity,
    layers,
    realProvinces,
    cacicazgos1492,
    provincias1844,
    filteredMilestones,
    showMilestones,
    filteredColonialMonuments,
    filteredRoutes,
    filteredEvents,
    filteredDossierHitos,
    allPresidents,
    selectedFeature,
    setSelectedFeature,
    activeAnimatedRoute,
    isRoutePlaying,
    routeProgress,
    routeStopIndex,
    setRouteProgress,
    setRouteStopIndex,
    setIsRoutePlaying,
    jumpToRouteStop,
    activeVintageMap,
    vintageOpacity,
  } = useCronoMapa();

  const [hoveredProvinceName, setHoveredProvinceName] = useState<string | null>(
    null
  );

  const layerMap = useMemo(() => {
    const map = new Map<string, { visible: boolean; opacidad: number }>();
    for (const l of layers) {
      map.set(l.id, { visible: l.visible, opacidad: l.opacidad });
    }
    return map;
  }, [layers]);

  const presidentsByProvince = useMemo(() => {
    const map = new Map<string, typeof allPresidents>();
    for (const pres of allPresidents) {
      const list = map.get(pres.provincia_nacimiento) ?? [];
      list.push(pres);
      map.set(pres.provincia_nacimiento, list);
    }
    return map;
  }, [allPresidents]);

  // Combine active territorial polygon layers (1492, 1606, 1777, 1822, 1844)
  const activeTerritorialFeatures = useMemo(() => {
    const rawStatic =
      capasTerritoriales as unknown as TerritorialPolygonCollection;
    const list: Array<{
      feature: TerritorialPolygonFeature;
      opacity: number;
    }> = [];

    const cacicazgosLayer = layerMap.get('cacicazgos_1492');
    if (cacicazgosLayer?.visible) {
      for (const f of cacicazgos1492.features) {
        list.push({ feature: f, opacity: cacicazgosLayer.opacidad });
      }
    }

    const provincias1844Layer = layerMap.get('provincias_1844');
    if (provincias1844Layer?.visible) {
      for (const f of provincias1844.features) {
        list.push({ feature: f, opacity: provincias1844Layer.opacidad });
      }
    }

    for (const f of rawStatic.features) {
      const group = f.properties.grupo_territorial;
      if (group === 'cacicazgos_1492' || group === 'provincias_1844') continue;
      const conf = layerMap.get(group);
      if (conf?.visible) {
        list.push({ feature: f, opacity: conf.opacidad });
      }
    }

    return list;
  }, [layerMap, cacicazgos1492, provincias1844]);

  const provincesLayerConf = layerMap.get('provincias_actuales');
  const presidentsLayerConf = layerMap.get('presidentes_provincia');
  const dossiersLayerConf = layerMap.get('dossiers_regimenes');
  const routesLayerConf = layerMap.get('rutas_historicas');
  const eventsLayerConf = layerMap.get('eventos_historicos');
  const monumentsLayerConf = layerMap.get('monumentos_coloniales');
  const oldHispaniolaConf = layerMap.get('mapa_antiguo_espaniola');
  const oldColonialPlanConf = layerMap.get('plano_ciudad_colonial');

  // Filter out general events that overlap with our 16 core milestones
  const nonOverlappingEvents = useMemo(() => {
    if (!eventsLayerConf?.visible) return [];
    return filteredEvents.filter((ev) => {
      const [lng, lat] = ev.geometry.coordinates;
      return !filteredMilestones.some(
        (m) =>
          Math.abs(m.lat - lat) < 0.015 &&
          Math.abs(m.lng - lng) < 0.015 &&
          Math.abs(m.year - ev.properties.anio) <= 5
      );
    });
  }, [filteredEvents, filteredMilestones, eventsLayerConf?.visible]);

  const selectedMilestoneId =
    selectedFeature?.kind === 'milestone' ? selectedFeature.data.id : null;
  const selectedMonumentId =
    selectedFeature?.kind === 'colonial_monument'
      ? selectedFeature.data.id
      : null;
  const selectedRouteId =
    selectedFeature?.kind === 'route'
      ? selectedFeature.data.properties.id
      : null;

  return (
    <div
      id="cronomapa-map-canvas"
      className="relative w-full h-full bg-[#0D0F12] select-none overflow-hidden"
    >
      <MapContainer
        center={MAP_INITIAL_CENTER}
        zoom={MAP_INITIAL_ZOOM}
        minZoom={6}
        maxZoom={18}
        zoomControl={false}
        attributionControl={true}
        preferCanvas={true}
        className="w-full h-full"
      >
        <MapCameraAndEvents />

        {/* 1. 100% Free & Open-Source Base Tile Layers */}
        <RealisticBaseLayers
          baseMapId={activeBaseMapId}
          reliefIntensity={reliefIntensity}
        />

        {/* 2. Layer-Based Vintage Overlays (1560 Hispaniola / 1650 Santo Domingo) */}
        {oldHispaniolaConf?.visible && ANTIQUE_OVERLAYS.espaniola_1560 && (
          <ImageOverlay
            url={ANTIQUE_OVERLAYS.espaniola_1560.url}
            bounds={ANTIQUE_OVERLAYS.espaniola_1560.bounds}
            opacity={oldHispaniolaConf.opacidad}
            zIndex={240}
          />
        )}
        {oldColonialPlanConf?.visible && ANTIQUE_OVERLAYS.ciudad_colonial_1650 && (
          <ImageOverlay
            url={ANTIQUE_OVERLAYS.ciudad_colonial_1650.url}
            bounds={ANTIQUE_OVERLAYS.ciudad_colonial_1650.bounds}
            opacity={oldColonialPlanConf.opacidad}
            zIndex={245}
          />
        )}

        {/* 3. Gallery Vintage Overlay */}
        {activeVintageMap && (
          <ImageOverlay
            key={activeVintageMap.id}
            url={activeVintageMap.imageUrl || activeVintageMap.fallbackUrl}
            bounds={[
              [activeVintageMap.bounds.south, activeVintageMap.bounds.west],
              [activeVintageMap.bounds.north, activeVintageMap.bounds.east],
            ]}
            opacity={vintageOpacity}
            zIndex={250}
          />
        )}

        {/* 4. Historical Territorial Macro-Polygons (1492, 1606, 1777, 1822, 1844) */}
        {activeTerritorialFeatures.map(({ feature, opacity }) => {
          const isSelected =
            selectedFeature?.kind === 'territorial' &&
            selectedFeature.data.properties.id === feature.properties.id;

          return (
            <GeoJSON
              key={`terr-${feature.properties.id}-${opacity}-${isSelected}`}
              data={feature as unknown as GeoJSON.GeoJsonObject}
              style={() =>
                getLeafletTerritorialStyle(
                  feature,
                  activeBaseMapId,
                  opacity,
                  isSelected
                )
              }
              onEachFeature={(_feat, layer) => {
                layer.on({
                  click: (e) => {
                    L.DomEvent.stopPropagation(e.originalEvent);
                    setSelectedFeature({ kind: 'territorial', data: feature });
                  },
                });
              }}
            />
          );
        })}

        {/* 5. Local Static 32 Dominican Provinces GeoJSON */}
        {provincesLayerConf?.visible &&
          realProvinces.features.map((provFeature: ProvinceFeature) => {
            const provName = provFeature.properties.nombre;
            const presList = presidentsByProvince.get(provName) ?? [];
            const isSelected =
              (selectedFeature?.kind === 'province' &&
                selectedFeature.data.properties.nombre === provName) ||
              (selectedFeature?.kind === 'province_presidents' &&
                selectedFeature.provinceName === provName);
            const isHovered = hoveredProvinceName === provName;

            return (
              <GeoJSON
                key={`prov-${provFeature.properties.codigo}-${isSelected}-${isHovered}-${presidentsLayerConf?.visible}`}
                data={provFeature as unknown as GeoJSON.GeoJsonObject}
                style={() =>
                  getLeafletProvinceStyle({
                    regionName: provFeature.properties.region,
                    baseMapId: activeBaseMapId,
                    layerOpacity: provincesLayerConf.opacidad,
                    presidentsLayerVisible: Boolean(
                      presidentsLayerConf?.visible
                    ),
                    presidentCount: presList.length,
                    isSelected,
                    isHovered,
                  })
                }
                onEachFeature={(_feat, layer) => {
                  layer.on({
                    mouseover: () => setHoveredProvinceName(provName),
                    mouseout: () =>
                      setHoveredProvinceName((prev) =>
                        prev === provName ? null : prev
                      ),
                    click: (e) => {
                      L.DomEvent.stopPropagation(e.originalEvent);
                      if (presidentsLayerConf?.visible && presList.length > 0) {
                        setSelectedFeature({
                          kind: 'province_presidents',
                          provinceName: provName,
                          region: provFeature.properties.region,
                          cabecera: provFeature.properties.cabecera,
                          presidentes: presList,
                        });
                      } else {
                        setSelectedFeature({
                          kind: 'province',
                          data: provFeature,
                        });
                      }
                    },
                  });
                }}
              />
            );
          })}

        {/* 6. Historical & Animated Routes Layer (3 Traced Routes + Step-by-Step Player) */}
        <HistoricalRoutesLayer
          staticRoutes={filteredRoutes}
          staticRoutesVisible={Boolean(routesLayerConf?.visible)}
          staticRoutesOpacity={routesLayerConf?.opacidad ?? 0.9}
          selectedRouteId={selectedRouteId}
          onSelectStaticRoute={(route) =>
            setSelectedFeature({ kind: 'route', data: route })
          }
          activeAnimatedRoute={activeAnimatedRoute}
          isRoutePlaying={isRoutePlaying}
          routeProgress={routeProgress}
          routeStopIndex={routeStopIndex}
          onUpdateProgress={setRouteProgress}
          onUpdateStopIndex={setRouteStopIndex}
          onFinishPlaying={() => setIsRoutePlaying(false)}
          onSelectRouteStop={jumpToRouteStop}
        />

        {/* 7. 16 Key Historical Milestones Layer */}
        {showMilestones && (
          <HistoricalMarkersLayer
            milestones={filteredMilestones}
            selectedMilestoneId={selectedMilestoneId}
            onSelectMilestone={(milestone) =>
              setSelectedFeature({ kind: 'milestone', data: milestone })
            }
          />
        )}

        {/* 8. Colonial Monuments UNESCO Layer */}
        <ColonialMonumentsLayer
          monuments={filteredColonialMonuments}
          selectedMonumentId={selectedMonumentId}
          onSelectMonument={(monument) =>
            setSelectedFeature({ kind: 'colonial_monument', data: monument })
          }
          visible={Boolean(monumentsLayerConf?.visible)}
        />

        {/* 9. Dossiers de Regímenes (Trujillo & Balaguer) */}
        {dossiersLayerConf?.visible &&
          filteredDossierHitos.map((hito) => {
            const isSelected =
              selectedFeature?.kind === 'dossier_hito' &&
              selectedFeature.data.id === hito.id;
            const [lng, lat] = hito.coordenadas;

            return (
              <Marker
                key={hito.id}
                position={[lat, lng]}
                icon={createDossierDivIcon(hito, isSelected)}
                zIndexOffset={isSelected ? 720 : 480}
                eventHandlers={{
                  click: (e) => {
                    L.DomEvent.stopPropagation(e.originalEvent);
                    setSelectedFeature({ kind: 'dossier_hito', data: hito });
                  },
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -14]}
                  opacity={1}
                  className="!bg-transparent !border-0 !shadow-none !p-0"
                >
                  <div className="px-2.5 py-1.5 rounded-lg bg-[#0D0F12]/95 border border-[#C5A059]/50 text-[10px] font-mono text-[#F4F1EA] whitespace-nowrap shadow-xl">
                    <span className="text-[#D4AF37] font-bold">
                      {hito.anio}
                    </span>{' '}
                    • {hito.titulo}
                  </div>
                </Tooltip>
              </Marker>
            );
          })}

        {/* 10. Secondary Historical Events Markers */}
        {nonOverlappingEvents.map((evt) => {
          const isSelected =
            selectedFeature?.kind === 'event' &&
            selectedFeature.data.properties.id === evt.properties.id;
          const [lng, lat] = evt.geometry.coordinates;

          return (
            <Marker
              key={evt.properties.id}
              position={[lat, lng]}
              icon={createEventDivIcon(evt, isSelected)}
              zIndexOffset={isSelected ? 700 : 410}
              eventHandlers={{
                click: (e) => {
                  L.DomEvent.stopPropagation(e.originalEvent);
                  setSelectedFeature({ kind: 'event', data: evt });
                },
              }}
            >
              <Tooltip
                direction="top"
                offset={[0, -12]}
                opacity={1}
                className="!bg-transparent !border-0 !shadow-none !p-0"
              >
                <div className="px-2 py-1 rounded bg-[#0D0F12]/95 border border-[#C5A059]/50 text-[10px] font-mono text-[#F4F1EA] whitespace-nowrap shadow-xl">
                  <span className="text-[#D4AF37] font-semibold">
                    {evt.properties.anio}
                  </span>{' '}
                  • {evt.properties.titulo}
                </div>
              </Tooltip>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export { MapView };
