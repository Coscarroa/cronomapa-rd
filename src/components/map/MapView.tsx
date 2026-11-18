import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  APILoadingStatus,
  AdvancedMarker,
  Map as GoogleMapView,
  useApiLoadingStatus,
  useMap,
  useMapsLibrary,
} from '@vis.gl/react-google-maps';
import {
  ANTIQUE_OVERLAYS,
  HISPANIOLA_MAX_BOUNDS,
  MAP_INITIAL_CENTER,
  MAP_INITIAL_ZOOM,
  MAP_MAX_ZOOM,
  MAP_MIN_ZOOM,
} from '../../data/layersConfig';
import capasTerritoriales from '../../data/capas_territoriales.json';
import historicaData from '../../data/division_historica_rd.json';
import { useCronoMapa } from '../../context/CronoMapaContext';
import { getProvinceCentroid, normalizeProvinceName } from '../../utils/geoUtils';
import { getGoogleProvinceStyle, getGoogleTerritorialStyle } from '../../utils/mapStyles';
import { COLONIAL_MONUMENTS } from '../../data/colonialMonumentsData.js';
import RealisticBaseLayers, { getGoogleMapTypeId } from './RealisticBaseLayers';
import ColonialMonumentsLayer from './ColonialMonumentsLayer';
import HistoricalMarkersLayer from './HistoricalMarkersLayer';
import HistoricalRoutesLayer from './HistoricalRoutesLayer';
import PresidentPortrait from '../ui/PresidentPortrait';
import type {
  DossierHito,
  EventCategory,
  HistoricalEvent,
  HistoricalLayer,
  LayerId,
  PresidenteRD,
  ProvinceFeature,
  TerritorialLayerKind,
  TerritorialPolygonCollection,
  TerritorialPolygonFeature,
} from '../../types/history';

export interface FlyToTarget {
  bounds?: [[number, number], [number, number]];
  center?: [number, number];
  zoom?: number;
  nonce: number;
}

const CATEGORY_COLORS: Record<EventCategory, string> = {
  'Política/Constitucional': '#1D3557',
  'Batalla/Militar': '#9B2226',
  'Fundación/Territorio': '#C5A059',
  'Derechos/Sociedad': '#2A6F97',
};

function MapCameraAndEvents({
  flyToTarget,
  onCursorMove,
  onZoomChange,
}: {
  flyToTarget: FlyToTarget | null;
  onCursorMove: (lat: number, lng: number) => void;
  onZoomChange: (zoom: number) => void;
}) {
  const map = useMap();
  const onCursorMoveRef = useRef(onCursorMove);
  const onZoomChangeRef = useRef(onZoomChange);

  useEffect(() => {
    onCursorMoveRef.current = onCursorMove;
  }, [onCursorMove]);

  useEffect(() => {
    onZoomChangeRef.current = onZoomChange;
  }, [onZoomChange]);

  useEffect(() => {
    if (!map || typeof map.addListener !== 'function') return;

    const rawListeners: Array<google.maps.MapsEventListener | undefined> = [];
    try {
      rawListeners.push(
        map.addListener('mousemove', (e: google.maps.MapMouseEvent) => {
          if (e?.latLng) {
            onCursorMoveRef.current(e.latLng.lat(), e.latLng.lng());
          }
        }),
        map.addListener('zoom_changed', () => {
          const z = typeof map.getZoom === 'function' ? map.getZoom() : undefined;
          if (typeof z === 'number') onZoomChangeRef.current(z);
        }),
      );
    } catch {
      // Ignore listener attachment errors if Maps SDK failed authentication
    }

    const listeners = rawListeners.filter(
      (l): l is google.maps.MapsEventListener => Boolean(l && typeof l.remove === 'function'),
    );

    return () => {
      listeners.forEach((l) => l?.remove?.());
    };
  }, [map]);

  useEffect(() => {
    if (!map || !flyToTarget) return;
    try {
      if (flyToTarget.bounds && typeof map.fitBounds === 'function') {
        const [[south, west], [north, east]] = flyToTarget.bounds;
        map.fitBounds({ north, south, east, west }, 36);
      } else if (flyToTarget.center) {
        if (typeof map.panTo === 'function') {
          map.panTo({ lat: flyToTarget.center[0], lng: flyToTarget.center[1] });
        }
        if (typeof flyToTarget.zoom === 'number' && typeof map.setZoom === 'function') {
          map.setZoom(flyToTarget.zoom);
        }
      }
    } catch {
      // Ignore camera operations if map is not fully initialized
    }
  }, [map, flyToTarget]);

  return null;
}

function VintageGroundOverlayLayer({
  imageUrl,
  fallbackUrl,
  bounds,
  opacity,
}: {
  imageUrl: string | null;
  fallbackUrl?: string;
  bounds: google.maps.LatLngBoundsLiteral | null;
  opacity: number;
}) {
  const map = useMap();
  const mapsLib = useMapsLibrary('maps');
  const overlayRef = useRef<google.maps.GroundOverlay | null>(null);
  const [resolvedUrl, setResolvedUrl] = useState<string | null>(imageUrl);

  useEffect(() => {
    if (!imageUrl) {
      setResolvedUrl(null);
      return;
    }
    let cancelled = false;
    setResolvedUrl(imageUrl);
    if (fallbackUrl && fallbackUrl !== imageUrl) {
      const probe = new Image();
      probe.referrerPolicy = 'no-referrer';
      probe.onerror = () => {
        if (!cancelled) setResolvedUrl(fallbackUrl);
      };
      probe.src = imageUrl;
    }
    return () => {
      cancelled = true;
    };
  }, [imageUrl, fallbackUrl]);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.setMap(null);
      overlayRef.current = null;
    }
    if (!map || !mapsLib || typeof mapsLib.GroundOverlay !== 'function' || !resolvedUrl || !bounds) {
      return;
    }

    const overlay = new mapsLib.GroundOverlay(resolvedUrl, bounds, {
      opacity,
      clickable: false,
    });
    overlay.setMap(map);
    overlayRef.current = overlay;

    return () => {
      overlay.setMap(null);
      if (overlayRef.current === overlay) {
        overlayRef.current = null;
      }
    };
  }, [map, mapsLib, resolvedUrl, bounds]);

  useEffect(() => {
    if (overlayRef.current) {
      overlayRef.current.setOpacity(opacity);
    }
  }, [opacity]);

  return null;
}

function GeoJsonDataLayerRenderer() {
  const map = useMap();
  const mapsLib = useMapsLibrary('maps');
  const {
    activeBaseMapId,
    layers,
    realProvinces,
    cacicazgos1492,
    provincias1844,
    selectedFeature,
    setSelectedFeature,
    allPresidents,
  } = useCronoMapa();

  const [hoveredTooltip, setHoveredTooltip] = useState<{
    title: string;
    subtitle: string;
    accent?: string;
  } | null>(null);

  const layerDict = useMemo(() => {
    const dict = {} as Record<LayerId, HistoricalLayer>;
    for (const l of layers) dict[l.id] = l;
    return dict;
  }, [layers]);

  const presidentsByNormProvince = useMemo(() => {
    const grouped: Record<string, PresidenteRD[]> = {};
    for (const pres of allPresidents) {
      const k = normalizeProvinceName(pres.provincia_nacimiento);
      if (!grouped[k]) grouped[k] = [];
      grouped[k].push(pres);
    }
    return grouped;
  }, [allPresidents]);

  const provinciasLayer = layerDict.provincias_actuales;
  const cacicazgosLayer = layerDict.cacicazgos_1492;
  const osorioLayer = layerDict.despoblacion_osorio_1606;
  const aranjuezLayer = layerDict.tratado_aranjuez_1777;
  const unificacionLayer = layerDict.unificacion_haitiana_1822;
  const provincias1844Layer = layerDict.provincias_1844;
  const presidentesLayer = layerDict.presidentes_provincia;

  const territorialAll = capasTerritoriales as unknown as TerritorialPolygonCollection;
  const aranjuezLine = (
    historicaData as unknown as {
      frontera_aranjuez_1777: GeoJSON.FeatureCollection;
    }
  ).frontera_aranjuez_1777;

  // Lookup dictionaries for click handlers
  const provinceByCode = useMemo(() => {
    const dict: Record<string, ProvinceFeature> = {};
    for (const f of realProvinces.features) {
      dict[f.properties.codigo] = f;
    }
    return dict;
  }, [realProvinces]);

  const activeTerritorialFeatures = useMemo(() => {
    const list: TerritorialPolygonFeature[] = [];
    if (cacicazgosLayer?.visible) list.push(...cacicazgos1492.features);
    if (provincias1844Layer?.visible) list.push(...provincias1844.features);

    const staticKinds: TerritorialLayerKind[] = [];
    if (osorioLayer?.visible) staticKinds.push('despoblacion_osorio_1606');
    if (aranjuezLayer?.visible) staticKinds.push('tratado_aranjuez_1777');
    if (unificacionLayer?.visible) staticKinds.push('unificacion_haitiana_1822');

    if (staticKinds.length > 0) {
      for (const f of territorialAll.features) {
        if (staticKinds.includes(f.properties.grupo_territorial)) {
          list.push(f);
        }
      }
    }
    return list;
  }, [
    cacicazgosLayer?.visible,
    provincias1844Layer?.visible,
    osorioLayer?.visible,
    aranjuezLayer?.visible,
    unificacionLayer?.visible,
    cacicazgos1492,
    provincias1844,
    territorialAll,
  ]);

  const territorialById = useMemo(() => {
    const dict: Record<string, TerritorialPolygonFeature> = {};
    for (const f of activeTerritorialFeatures) {
      dict[f.properties.id] = f;
    }
    return dict;
  }, [activeTerritorialFeatures]);

  // Refs to keep Data layer listeners stable without recreating layers on state updates
  const provinceByCodeRef = useRef(provinceByCode);
  const presidentsByNormProvinceRef = useRef(presidentsByNormProvince);
  const presidentesVisibleRef = useRef(Boolean(presidentesLayer?.visible));
  const territorialByIdRef = useRef(territorialById);

  useEffect(() => {
    provinceByCodeRef.current = provinceByCode;
  }, [provinceByCode]);

  useEffect(() => {
    presidentsByNormProvinceRef.current = presidentsByNormProvince;
  }, [presidentsByNormProvince]);

  useEffect(() => {
    presidentesVisibleRef.current = Boolean(presidentesLayer?.visible);
  }, [presidentesLayer?.visible]);

  useEffect(() => {
    territorialByIdRef.current = territorialById;
  }, [territorialById]);

  // 1. Modern Real GeoJSON Provinces Data Layer (Module 1)
  const provDataRef = useRef<google.maps.Data | null>(null);
  useEffect(() => {
    if (!map || !mapsLib || typeof mapsLib.Data !== 'function') return;
    const dataLayer = new mapsLib.Data();
    provDataRef.current = dataLayer;

    const clickListener = dataLayer.addListener?.('click', (e: google.maps.Data.MouseEvent) => {
      const code = String(e.feature.getProperty('codigo') ?? '');
      const typed = provinceByCodeRef.current[code];
      if (!typed) return;
      const presList =
        presidentsByNormProvinceRef.current[normalizeProvinceName(typed.properties.nombre)] ?? [];
      if (presidentesVisibleRef.current && presList.length > 0) {
        setSelectedFeature({
          kind: 'province_presidents',
          provinceName: typed.properties.nombre,
          region: typed.properties.region,
          cabecera: typed.properties.cabecera,
          presidentes: presList,
        });
      } else {
        setSelectedFeature({ kind: 'province', data: typed });
      }
    });

    const overListener = dataLayer.addListener?.('mouseover', (e: google.maps.Data.MouseEvent) => {
      const nombre = String(e.feature.getProperty('nombre') ?? '');
      const region = String(e.feature.getProperty('region') ?? '');
      const cabecera = String(e.feature.getProperty('cabecera') ?? '');
      const presCount =
        presidentsByNormProvinceRef.current[normalizeProvinceName(nombre)]?.length ?? 0;

      dataLayer.overrideStyle(e.feature, {
        strokeWeight: 2.5,
        strokeColor: '#D4AF37',
        fillOpacity: 0.48,
        zIndex: 25,
      });

      setHoveredTooltip({
        title: nombre,
        subtitle: `${region} · Cab. ${cabecera}`,
        accent:
          presCount > 0
            ? `${presCount} ${presCount === 1 ? 'presidente nacido aquí' : 'presidentes nacidos aquí'}`
            : 'Clic para ficha provincial',
      });
    });

    const outListener = dataLayer.addListener?.('mouseout', () => {
      dataLayer.revertStyle();
      setHoveredTooltip(null);
    });

    return () => {
      clickListener?.remove?.();
      overListener?.remove?.();
      outListener?.remove?.();
      dataLayer.setMap(null);
      provDataRef.current = null;
    };
  }, [map, mapsLib, setSelectedFeature]);

  useEffect(() => {
    const dataLayer = provDataRef.current;
    if (!dataLayer || !map) return;

    dataLayer.forEach((f) => dataLayer.remove(f));
    if (!provinciasLayer?.visible) {
      dataLayer.setMap(null);
      return;
    }

    dataLayer.addGeoJson(realProvinces as unknown as object);
    dataLayer.setMap(map);

    const selectedCode =
      selectedFeature?.kind === 'province' ? selectedFeature.data.properties.codigo : null;
    const selectedPresProv =
      selectedFeature?.kind === 'province_presidents'
        ? normalizeProvinceName(selectedFeature.provinceName)
        : null;

    dataLayer.setStyle((feature) => {
      const codigo = String(feature.getProperty('codigo') ?? '');
      const nombre = String(feature.getProperty('nombre') ?? '');
      const region = String(feature.getProperty('region') ?? '');
      const norm = normalizeProvinceName(nombre);
      const presCount = presidentsByNormProvince[norm]?.length ?? 0;
      const isSelected =
        codigo === selectedCode || (selectedPresProv !== null && norm === selectedPresProv);

      return getGoogleProvinceStyle({
        regionName: region,
        baseMapId: activeBaseMapId,
        layerOpacity: provinciasLayer.opacidad,
        presidentsLayerVisible: Boolean(presidentesLayer?.visible),
        presidentCount: presCount,
        isSelected,
      });
    });
  }, [
    map,
    realProvinces,
    provinciasLayer?.visible,
    provinciasLayer?.opacidad,
    activeBaseMapId,
    presidentesLayer?.visible,
    presidentsByNormProvince,
    selectedFeature,
  ]);

  // 2. Turf-merged Macro-Territories & Historical Boundaries Data Layer (Module 2)
  const terrDataRef = useRef<google.maps.Data | null>(null);
  useEffect(() => {
    if (!map || !mapsLib || typeof mapsLib.Data !== 'function') return;
    const dataLayer = new mapsLib.Data();
    terrDataRef.current = dataLayer;

    const clickListener = dataLayer.addListener?.('click', (e: google.maps.Data.MouseEvent) => {
      const id = String(e.feature.getProperty('id') ?? '');
      const typed = territorialByIdRef.current[id];
      if (typed) {
        setSelectedFeature({ kind: 'territorial', data: typed });
      }
    });

    const overListener = dataLayer.addListener?.('mouseover', (e: google.maps.Data.MouseEvent) => {
      const id = String(e.feature.getProperty('id') ?? '');
      const typed = territorialByIdRef.current[id];
      if (!typed) return;
      dataLayer.overrideStyle(e.feature, {
        strokeWeight: 2.8,
        strokeColor: '#F4F1EA',
        fillOpacity: 0.48,
        zIndex: 35,
      });
      setHoveredTooltip({
        title: typed.properties.nombre_capa,
        subtitle: `${typed.properties.subtitulo} · ${typed.properties.anio_inicio}–${typed.properties.anio_fin}`,
        accent: typed.properties.liderazgo ?? 'Clic para análisis territorial',
      });
    });

    const outListener = dataLayer.addListener?.('mouseout', () => {
      dataLayer.revertStyle();
      setHoveredTooltip(null);
    });

    return () => {
      clickListener?.remove?.();
      overListener?.remove?.();
      outListener?.remove?.();
      dataLayer.setMap(null);
      terrDataRef.current = null;
    };
  }, [map, mapsLib, setSelectedFeature]);

  useEffect(() => {
    const dataLayer = terrDataRef.current;
    if (!dataLayer || !map) return;

    dataLayer.forEach((f) => dataLayer.remove(f));
    if (activeTerritorialFeatures.length === 0 && !aranjuezLayer?.visible) {
      dataLayer.setMap(null);
      return;
    }

    if (activeTerritorialFeatures.length > 0) {
      dataLayer.addGeoJson({
        type: 'FeatureCollection',
        features: activeTerritorialFeatures,
      });
    }
    if (aranjuezLayer?.visible) {
      dataLayer.addGeoJson(aranjuezLine as unknown as object);
    }

    dataLayer.setMap(map);

    const selectedTerrId =
      selectedFeature?.kind === 'territorial' ? selectedFeature.data.properties.id : null;

    dataLayer.setStyle((feature) => {
      const id = String(feature.getProperty('id') ?? '');
      const typed = territorialById[id];
      if (!typed) {
        // Aranjuez border polyline feature
        return {
          strokeColor: '#D4AF37',
          strokeWeight: 3.5,
          strokeOpacity: 0.9,
          clickable: false,
          zIndex: 40,
        };
      }
      const group = typed.properties.grupo_territorial;
      const layerOpacity = layerDict[group]?.opacidad ?? 0.72;
      return getGoogleTerritorialStyle(
        typed,
        activeBaseMapId,
        layerOpacity,
        id === selectedTerrId,
      );
    });
  }, [
    map,
    activeTerritorialFeatures,
    territorialById,
    aranjuezLayer?.visible,
    aranjuezLine,
    layerDict,
    activeBaseMapId,
    selectedFeature,
  ]);

  // Playfair Display Serif centroid labels for Turf-fused 1492 & 1844 macro-territories
  const centroidLabels = useMemo(() => {
    const labels: {
      id: string;
      nombre: string;
      lat: number;
      lng: number;
      color: string;
      feature: TerritorialPolygonFeature;
    }[] = [];
    const macroList = [
      ...(cacicazgosLayer?.visible ? cacicazgos1492.features : []),
      ...(provincias1844Layer?.visible ? provincias1844.features : []),
    ];
    for (const f of macroList) {
      const pt = f.properties.centroid;
      if (!pt) continue;
      labels.push({
        id: f.properties.id,
        nombre: f.properties.nombre_capa.replace(/\s*\(1844\)/, ''),
        lng: pt[0],
        lat: pt[1],
        color: f.properties.color,
        feature: f,
      });
    }
    return labels;
  }, [cacicazgosLayer?.visible, provincias1844Layer?.visible, cacicazgos1492, provincias1844]);

  return (
    <>
      {centroidLabels.map((lbl) => (
        <AdvancedMarker
          key={`macro-lbl-${lbl.id}`}
          position={{ lat: lbl.lat, lng: lbl.lng }}
          zIndex={420}
          onClick={() => setSelectedFeature({ kind: 'territorial', data: lbl.feature })}
        >
          <div className="pdi-scalable-label pointer-events-auto cursor-pointer px-2.5 py-1 rounded-md bg-[#0D0F12]/80 backdrop-blur-md border border-[#C5A059]/45 shadow-lg text-center hover:border-[#D4AF37] transition-all duration-200">
            <span className="font-display text-xs sm:text-[13px] font-semibold tracking-wide text-[#F4F1EA] drop-shadow">
              {lbl.nombre}
            </span>
          </div>
        </AdvancedMarker>
      ))}

      {hoveredTooltip && (
        <div className="pdi-scalable-label pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 z-[880] px-3.5 py-2 rounded-lg bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/45 shadow-[0_14px_34px_rgba(0,0,0,0.75)] text-center max-w-xs transition-all duration-200">
          <div className="font-display text-xs font-semibold text-[#F4F1EA]">
            {hoveredTooltip.title}
          </div>
          <div className="text-[11px] text-[#A39E93]">{hoveredTooltip.subtitle}</div>
          {hoveredTooltip.accent && (
            <div className="text-[11px] font-medium text-[#D4AF37] mt-0.5">
              {hoveredTooltip.accent}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function MapView() {
  const {
    activeBaseMapId,
    reliefIntensity,
    layers,
    selectedFeature,
    setSelectedFeature,
    setCursorCoords,
    setZoom,
    flyToTarget,
    flyToCoords,
    realProvinces,
    filteredMilestones,
    showMilestones,
    jumpToMilestone,
    filteredColonialMonuments,
    jumpToColonialMonument,
    activeAnimatedRoute,
    isRoutePlaying,
    routeProgress,
    routeResetNonce,
    setRouteProgress,
    setRouteStopIndex,
    toggleRoutePlay,
    jumpToRouteStop,
    activeVintageMap,
    vintageOpacity,
    filteredEvents,
    filteredRoutes,
    filteredDossierHitos,
    allPresidents,
    portraitsLoading,
  } = useCronoMapa();

  const layerDict = useMemo(() => {
    const dict = {} as Record<LayerId, HistoricalLayer>;
    for (const layer of layers) {
      dict[layer.id] = layer;
    }
    return dict;
  }, [layers]);

  const presidentesLayer = layerDict.presidentes_provincia;
  const dossiersLayer = layerDict.dossiers_regimenes;
  const rutasLayer = layerDict.rutas_historicas;
  const mapaAntiguoLayer = layerDict.mapa_antiguo_espaniola;
  const planoColonialLayer = layerDict.plano_ciudad_colonial;
  const eventosLayer = layerDict.eventos_historicos;
  const monumentosLayer = layerDict.monumentos_coloniales;

  const presidentsByNormProvince = useMemo(() => {
    const grouped: Record<string, PresidenteRD[]> = {};
    for (const pres of allPresidents) {
      const k = normalizeProvinceName(pres.provincia_nacimiento);
      if (!grouped[k]) grouped[k] = [];
      grouped[k].push(pres);
    }
    return grouped;
  }, [allPresidents]);

  const provincePresidentBadges = useMemo(() => {
    return realProvinces.features
      .map((prov) => {
        const list = presidentsByNormProvince[normalizeProvinceName(prov.properties.nombre)] ?? [];
        if (list.length === 0) return null;
        return {
          province: prov,
          center: getProvinceCentroid(prov),
          presidentes: list,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);
  }, [realProvinces, presidentsByNormProvince]);

  const activeGroundOverlay = useMemo(() => {
    if (activeVintageMap) {
      return {
        url: activeVintageMap.imageUrl,
        fallbackUrl: activeVintageMap.fallbackUrl,
        bounds: activeVintageMap.bounds,
        opacity: vintageOpacity,
      };
    }
    if (planoColonialLayer?.visible) {
      const [[s, w], [n, e]] = ANTIQUE_OVERLAYS.ciudad_colonial_1650.bounds;
      return {
        url: ANTIQUE_OVERLAYS.ciudad_colonial_1650.url,
        fallbackUrl: ANTIQUE_OVERLAYS.ciudad_colonial_1650.url,
        bounds: { north: n, south: s, east: e, west: w },
        opacity: planoColonialLayer.opacidad,
      };
    }
    if (mapaAntiguoLayer?.visible) {
      const [[s, w], [n, e]] = ANTIQUE_OVERLAYS.espaniola_1560.bounds;
      return {
        url: ANTIQUE_OVERLAYS.espaniola_1560.url,
        fallbackUrl: ANTIQUE_OVERLAYS.espaniola_1560.url,
        bounds: { north: n, south: s, east: e, west: w },
        opacity: mapaAntiguoLayer.opacidad,
      };
    }
    return null;
  }, [
    activeVintageMap,
    vintageOpacity,
    planoColonialLayer?.visible,
    planoColonialLayer?.opacidad,
    mapaAntiguoLayer?.visible,
    mapaAntiguoLayer?.opacidad,
  ]);

  const apiStatus = useApiLoadingStatus();

  const handleCursorMove = useCallback(
    (lat: number, lng: number) => {
      setCursorCoords({ lat, lng });
    },
    [setCursorCoords],
  );

  useEffect(() => {
    if (apiStatus === APILoadingStatus.AUTH_FAILURE || apiStatus === APILoadingStatus.FAILED) {
      window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
    }
  }, [apiStatus]);

  const [[southBound, westBound], [northBound, eastBound]] = HISPANIOLA_MAX_BOUNDS;
  const isMapAuthOrLoadFailed =
    apiStatus === APILoadingStatus.AUTH_FAILURE || apiStatus === APILoadingStatus.FAILED;

  return (
    <div className="relative h-full w-full bg-[#0D0F12]">
      {isMapAuthOrLoadFailed ? (
        <div className="h-full w-full flex items-center justify-center p-6 bg-[#0D0F12]">
          <div className="max-w-md rounded-xl border border-[#C5A059]/40 bg-[#161920]/95 p-6 text-center shadow-2xl space-y-2">
            <h2 className="font-display text-lg font-semibold text-[#D4AF37]">
              Mapa base temporalmente no disponible
            </h2>
            <p className="text-xs text-[#A39E93] leading-relaxed">
              No se pudo autenticar la sesión de Google Maps Platform. Puedes seguir explorando la
              Línea de Tiempo Histórica y la vista Comparar Antes vs. Hoy desde la barra superior.
            </p>
          </div>
        </div>
      ) : (
      <GoogleMapView
        defaultCenter={{ lat: MAP_INITIAL_CENTER[0], lng: MAP_INITIAL_CENTER[1] }}
        defaultZoom={MAP_INITIAL_ZOOM}
        minZoom={MAP_MIN_ZOOM}
        maxZoom={MAP_MAX_ZOOM}
        mapTypeId={getGoogleMapTypeId(activeBaseMapId)}
        mapId="DEMO_MAP_ID"
        colorScheme="DARK"
        gestureHandling="greedy"
        mapTypeControl={false}
        streetViewControl={false}
        fullscreenControl={false}
        restriction={{
          latLngBounds: {
            north: northBound,
            south: southBound,
            east: eastBound,
            west: westBound,
          },
          strictBounds: false,
        }}
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        className="h-full w-full"
      >
        <MapCameraAndEvents
          flyToTarget={flyToTarget}
          onCursorMove={handleCursorMove}
          onZoomChange={setZoom}
        />

        <RealisticBaseLayers baseMapId={activeBaseMapId} reliefIntensity={reliefIntensity} />

        {/* Módulo 5: Calco Histórico (GroundOverlay) */}
        <VintageGroundOverlayLayer
          imageUrl={activeGroundOverlay?.url ?? null}
          fallbackUrl={activeGroundOverlay?.fallbackUrl}
          bounds={activeGroundOverlay?.bounds ?? null}
          opacity={activeGroundOverlay?.opacity ?? 0.72}
        />

        {/* Módulos 1 & 2: Fronteras Reales GeoJSON + Fusión Turf.js 1492 & 1844 */}
        <GeoJsonDataLayerRenderer />

        {/* Capa Geopolítica: Presidentes por Provincia con Retrato + Contador */}
        {presidentesLayer?.visible &&
          provincePresidentBadges.map(({ province, center, presidentes }) => {
            const isSelected =
              selectedFeature?.kind === 'province_presidents' &&
              normalizeProvinceName(selectedFeature.provinceName) ===
                normalizeProvinceName(province.properties.nombre);
            const lead = presidentes.find((p) => p.foto_url) ?? presidentes[0];

            return (
              <AdvancedMarker
                key={`pres-badge-${province.properties.codigo}`}
                position={{ lat: center[0], lng: center[1] }}
                zIndex={isSelected ? 780 : 520}
                title={`${province.properties.nombre}: ${presidentes.length} presidente(s)`}
                onClick={() =>
                  setSelectedFeature({
                    kind: 'province_presidents',
                    provinceName: province.properties.nombre,
                    region: province.properties.region,
                    cabecera: province.properties.cabecera,
                    presidentes,
                  })
                }
              >
                <div
                  className="relative w-9 h-9 cursor-pointer transition-transform hover:scale-110"
                  style={{ opacity: presidentesLayer.opacidad }}
                >
                  <PresidentPortrait
                    name={lead.nombre}
                    fotoUrl={lead.foto_url}
                    size="xs"
                    shape="circle"
                    isLoading={portraitsLoading}
                    interactive={false}
                    className={`border-2 shadow-[0_3px_10px_rgba(0,0,0,0.6)] ${
                      isSelected ? 'border-[#D4AF37]' : 'border-[#F4F1EA]'
                    }`}
                  />
                  <span
                    className="absolute -top-1 -right-0.5 z-20 min-w-[18px] h-[18px] px-1 rounded-full border border-[#F4F1EA] font-mono-tabular text-[10px] font-bold flex items-center justify-center shadow"
                    style={{
                      backgroundColor: isSelected ? '#9B2226' : '#1D3557',
                      color: '#F4F1EA',
                    }}
                  >
                    {presidentes.length}
                  </span>
                </div>
              </AdvancedMarker>
            );
          })}

        {/* Dossiers Especiales: Trujillo (1930-1961) y Balaguer (1960-1996) */}
        {dossiersLayer?.visible &&
          filteredDossierHitos.map((hito: DossierHito) => {
            const [lng, lat] = hito.coordenadas;
            const isSelected =
              selectedFeature?.kind === 'dossier_hito' && selectedFeature.data.id === hito.id;
            const bg = hito.regimen === 'trujillo' ? '#9B2226' : '#1D3557';

            return (
              <AdvancedMarker
                key={hito.id}
                position={{ lat, lng }}
                zIndex={isSelected ? 820 : 540}
                title={`${hito.anio} · ${hito.titulo}`}
                onClick={() => setSelectedFeature({ kind: 'dossier_hito', data: hito })}
              >
                <div
                  className={`rounded-full border-2 border-[#F4F1EA] cursor-pointer shadow-lg transition-transform ${
                    isSelected ? 'w-5 h-5 scale-110' : 'w-4 h-4 hover:scale-125'
                  }`}
                  style={{ backgroundColor: bg, opacity: dossiersLayer.opacidad }}
                />
              </AdvancedMarker>
            );
          })}

        {/* Hechos Históricos Generales (eventos_rd.json) */}
        {eventosLayer?.visible &&
          filteredEvents.map((evt: HistoricalEvent) => {
            const [lng, lat] = evt.geometry.coordinates;
            const isSelected =
              selectedFeature?.kind === 'event' &&
              selectedFeature.data.properties.id === evt.properties.id;
            const bg = CATEGORY_COLORS[evt.properties.categoria] ?? '#1D3557';

            return (
              <AdvancedMarker
                key={evt.properties.id}
                position={{ lat, lng }}
                zIndex={isSelected ? 810 : 480}
                title={`${evt.properties.anio} · ${evt.properties.titulo}`}
                onClick={() => setSelectedFeature({ kind: 'event', data: evt })}
              >
                <div
                  className={`rounded-full border cursor-pointer transition-transform shadow-md flex items-center justify-center ${
                    isSelected
                      ? 'w-5 h-5 border-[#D4AF37] ring-2 ring-[#D4AF37]/40 scale-110'
                      : 'w-3.5 h-3.5 border-[#F4F1EA]/90 hover:scale-125'
                  }`}
                  style={{ backgroundColor: bg, opacity: eventosLayer.opacidad }}
                />
              </AdvancedMarker>
            );
          })}

        {/* Módulo 3: Hitos y Batallas Históricas Pulsantes */}
        <HistoricalMarkersLayer
          milestones={filteredMilestones}
          visible={showMilestones}
          selectedMilestoneId={
            selectedFeature?.kind === 'milestone' ? selectedFeature.data.id : null
          }
          onSelectMilestone={jumpToMilestone}
        />

        {/* Monumentos y Sitios Coloniales (Pines Bronce Dorado + Wikipedia) */}
        <ColonialMonumentsLayer
          monuments={
            filteredColonialMonuments ?? (COLONIAL_MONUMENTS as unknown as typeof filteredColonialMonuments)
          }
          visible={Boolean(monumentosLayer?.visible)}
          opacity={monumentosLayer?.opacidad ?? 1}
          selectedMonumentId={
            selectedFeature?.kind === 'colonial_monument' ? selectedFeature.data.id : null
          }
          onSelectMonument={jumpToColonialMonument}
        />

        {/* Módulo 4: Rutas Históricas Animadas y Estáticas */}
        <HistoricalRoutesLayer
          staticRoutes={filteredRoutes}
          staticRoutesVisible={Boolean(rutasLayer?.visible)}
          staticOpacity={rutasLayer?.opacidad ?? 0.9}
          selectedStaticRouteId={
            selectedFeature?.kind === 'route' ? selectedFeature.data.properties.id : null
          }
          onSelectStaticRoute={(route) => setSelectedFeature({ kind: 'route', data: route })}
          onSelectStaticWaypoint={(_route, wp) => flyToCoords(wp.coordenadas, 11)}
          activeAnimatedRoute={activeAnimatedRoute}
          isPlaying={isRoutePlaying}
          routeProgress={routeProgress}
          resetNonce={routeResetNonce}
          onProgressChange={setRouteProgress}
          onStopIndexChange={setRouteStopIndex}
          onPlaybackComplete={() => {
            if (isRoutePlaying) toggleRoutePlay();
          }}
          onSelectStop={jumpToRouteStop}
        />
      </GoogleMapView>
      )}
    </div>
  );
}
