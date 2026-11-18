import { useEffect, useMemo, useRef } from 'react';
import { AdvancedMarker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import type {
  AnimatedHistoricalRoute,
  HistoricalRoute,
  RouteCategory,
  RouteWaypoint,
} from '../../types/history';

interface HistoricalRoutesLayerProps {
  // Static GIS routes layer (from SidebarGIS toggle)
  staticRoutes: HistoricalRoute[];
  staticRoutesVisible: boolean;
  staticOpacity: number;
  selectedStaticRouteId: string | null;
  onSelectStaticRoute: (route: HistoricalRoute) => void;
  onSelectStaticWaypoint?: (route: HistoricalRoute, waypoint: RouteWaypoint) => void;
  // Animated Route Player (Module 4)
  activeAnimatedRoute: AnimatedHistoricalRoute | null;
  isPlaying: boolean;
  routeProgress: number;
  resetNonce: number;
  onProgressChange: (progress: number) => void;
  onStopIndexChange: (stopIndex: number) => void;
  onPlaybackComplete: () => void;
  onSelectStop?: (stopIndex: number) => void;
}

function getStaticRouteColor(tipo: RouteCategory): string {
  if (tipo === 'maritima') return '#60A5FA';
  if (tipo === 'militar') return '#DC2626';
  return '#D4AF37';
}

export default function HistoricalRoutesLayer({
  staticRoutes,
  staticRoutesVisible,
  staticOpacity,
  selectedStaticRouteId,
  onSelectStaticRoute,
  onSelectStaticWaypoint,
  activeAnimatedRoute,
  isPlaying,
  routeProgress,
  resetNonce,
  onProgressChange,
  onStopIndexChange,
  onPlaybackComplete,
  onSelectStop,
}: HistoricalRoutesLayerProps) {
  const map = useMap();
  const mapsLib = useMapsLibrary('maps');

  const staticPolylinesRef = useRef<google.maps.Polyline[]>([]);
  const baseDashedLineRef = useRef<google.maps.Polyline | null>(null);
  const animatedArrowLineRef = useRef<google.maps.Polyline | null>(null);
  const progressRef = useRef<number>(routeProgress);
  const lastStopIdxRef = useRef<number>(0);

  useEffect(() => {
    progressRef.current = routeProgress;
  }, [routeProgress]);

  // 1. Render static historical routes polylines (from SidebarGIS "Rutas Históricas")
  useEffect(() => {
    staticPolylinesRef.current.forEach((p) => p.setMap(null));
    staticPolylinesRef.current = [];

    if (!map || !mapsLib || typeof mapsLib.Polyline !== 'function' || !staticRoutesVisible || activeAnimatedRoute) {
      return;
    }

    const created: google.maps.Polyline[] = [];
    const clickListeners: google.maps.MapsEventListener[] = [];
    for (const route of staticRoutes) {
      const isSelected = route.properties.id === selectedStaticRouteId;
      const color = getStaticRouteColor(route.properties.tipo_ruta);
      const path = route.geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));

      const line = new mapsLib.Polyline({
        path,
        geodesic: true,
        strokeColor: color,
        strokeOpacity: 0,
        strokeWeight: isSelected ? 4 : 2.8,
        icons: [
          {
            icon: {
              path: 'M 0,-1 0,1',
              strokeOpacity: isSelected ? 1 : Math.max(0.45, staticOpacity),
              strokeColor: color,
              scale: isSelected ? 3.5 : 2.6,
            },
            offset: '0',
            repeat: '14px',
          },
        ],
        zIndex: isSelected ? 60 : 35,
        map,
      });

      const listener = line.addListener?.('click', () => {
        onSelectStaticRoute(route);
      });
      if (listener && typeof listener.remove === 'function') {
        clickListeners.push(listener);
      }

      created.push(line);
    }

    staticPolylinesRef.current = created;
    return () => {
      clickListeners.forEach((l) => l?.remove?.());
      created.forEach((p) => p.setMap(null));
      staticPolylinesRef.current = [];
    };
  }, [
    map,
    mapsLib,
    staticRoutes,
    staticRoutesVisible,
    staticOpacity,
    selectedStaticRouteId,
    activeAnimatedRoute,
    onSelectStaticRoute,
  ]);

  // 2. Setup Animated Route Base Dashed Polyline + Arrow Polyline (Module 4)
  useEffect(() => {
    if (baseDashedLineRef.current) {
      baseDashedLineRef.current.setMap(null);
      baseDashedLineRef.current = null;
    }
    if (animatedArrowLineRef.current) {
      animatedArrowLineRef.current.setMap(null);
      animatedArrowLineRef.current = null;
    }

    if (!map || !mapsLib || typeof mapsLib.Polyline !== 'function' || !activeAnimatedRoute) {
      return;
    }

    const path = activeAnimatedRoute.stops.map((s) => ({ lat: s.lat, lng: s.lng }));
    const color = activeAnimatedRoute.color || '#D4AF37';

    // Base dashed trajectory
    const baseLine = new mapsLib.Polyline({
      path,
      geodesic: true,
      strokeOpacity: 0,
      icons: [
        {
          icon: {
            path: 'M 0,-1 0,1',
            strokeOpacity: 0.72,
            strokeColor: color,
            scale: 3.2,
          },
          offset: '0',
          repeat: '14px',
        },
      ],
      zIndex: 70,
      map,
    });

    // Progressive animated forward arrow symbol
    const gMaps = (globalThis as unknown as { google?: typeof google }).google?.maps;
    const forwardArrowPath =
      gMaps?.SymbolPath?.FORWARD_CLOSED_ARROW ?? 'M 0,-2 1.5,1.5 0,0.6 -1.5,1.5 Z';

    const arrowLine = new mapsLib.Polyline({
      path,
      geodesic: true,
      strokeColor: '#F4F1EA',
      strokeOpacity: 0.25,
      strokeWeight: 2,
      icons: [
        {
          icon: {
            path: forwardArrowPath,
            scale: 5,
            fillColor: '#D4AF37',
            fillOpacity: 1,
            strokeColor: '#0D0F12',
            strokeWeight: 1.5,
          },
          offset: `${Math.round(progressRef.current * 100)}%`,
        },
      ],
      zIndex: 85,
      map,
    });

    baseDashedLineRef.current = baseLine;
    animatedArrowLineRef.current = arrowLine;
    lastStopIdxRef.current = 0;

    return () => {
      baseLine.setMap(null);
      arrowLine.setMap(null);
      baseDashedLineRef.current = null;
      animatedArrowLineRef.current = null;
    };
  }, [map, mapsLib, activeAnimatedRoute]);

  // 3. Sync arrow offset when user clicks a stop or resets manually
  useEffect(() => {
    const arrowLine = animatedArrowLineRef.current;
    if (!arrowLine) return;
    const icons = arrowLine.get('icons') as google.maps.IconSequence[] | undefined;
    if (icons && icons[0]) {
      icons[0].offset = `${(progressRef.current * 100).toFixed(2)}%`;
      arrowLine.set('icons', icons);
    }
  }, [resetNonce, routeProgress]);

  // 4. requestAnimationFrame progression along the route + camera follow
  useEffect(() => {
    if (!isPlaying || !activeAnimatedRoute || !map) return;

    let rafId = 0;
    let lastTime = performance.now();
    const totalStops = activeAnimatedRoute.stops.length;
    const durationMs = Math.max(9000, totalStops * 2600);

    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      const nextProgress = Math.min(1, progressRef.current + dt / durationMs);
      progressRef.current = nextProgress;

      const arrowLine = animatedArrowLineRef.current;
      if (arrowLine) {
        const icons = arrowLine.get('icons') as google.maps.IconSequence[] | undefined;
        if (icons && icons[0]) {
          icons[0].offset = `${(nextProgress * 100).toFixed(2)}%`;
          arrowLine.set('icons', icons);
        }
      }

      // Compute current stop index & pan camera smoothly when crossing each waypoint
      if (totalStops > 1) {
        const computedStopIdx = Math.min(
          totalStops - 1,
          Math.floor(nextProgress * (totalStops - 1) + 0.05),
        );
        if (computedStopIdx !== lastStopIdxRef.current) {
          lastStopIdxRef.current = computedStopIdx;
          onStopIndexChange(computedStopIdx);
          const stop = activeAnimatedRoute.stops[computedStopIdx];
          if (stop && typeof map.panTo === 'function') {
            map.panTo({ lat: stop.lat, lng: stop.lng });
          }
        }
      }

      onProgressChange(nextProgress);

      if (nextProgress >= 1) {
        onPlaybackComplete();
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    rafId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [
    isPlaying,
    activeAnimatedRoute,
    map,
    onProgressChange,
    onStopIndexChange,
    onPlaybackComplete,
  ]);

  const selectedStaticRoute = useMemo(
    () => staticRoutes.find((r) => r.properties.id === selectedStaticRouteId) ?? null,
    [staticRoutes, selectedStaticRouteId],
  );

  return (
    <>
      {/* Animated Route Stop Markers */}
      {activeAnimatedRoute &&
        activeAnimatedRoute.stops.map((stop, idx) => {
          const isCurrent = Math.round(routeProgress * (activeAnimatedRoute.stops.length - 1)) === idx;
          return (
            <AdvancedMarker
              key={`${activeAnimatedRoute.id}-stop-${stop.order}`}
              position={{ lat: stop.lat, lng: stop.lng }}
              zIndex={isCurrent ? 920 : 750}
              title={`${stop.order}. ${stop.name} (${stop.date})`}
              onClick={() => onSelectStop?.(idx)}
            >
              <div
                className={`flex items-center justify-center rounded-full border-2 font-mono-tabular font-bold text-[11px] cursor-pointer transition-transform shadow-[0_3px_10px_rgba(0,0,0,0.7)] ${
                  isCurrent ? 'w-7 h-7 scale-110' : 'w-6 h-6 hover:scale-110'
                }`}
                style={{
                  backgroundColor: isCurrent ? '#D4AF37' : '#161920',
                  color: isCurrent ? '#0D0F12' : '#F4F1EA',
                  borderColor: isCurrent ? '#F4F1EA' : activeAnimatedRoute.color,
                }}
              >
                {stop.order}
              </div>
            </AdvancedMarker>
          );
        })}

      {/* Static GIS Route Waypoints when selected */}
      {!activeAnimatedRoute &&
        staticRoutesVisible &&
        selectedStaticRoute &&
        selectedStaticRoute.properties.hitos.map((wp) => {
          const [lng, lat] = wp.coordenadas;
          return (
            <AdvancedMarker
              key={`${selectedStaticRoute.properties.id}-wp-${wp.orden}`}
              position={{ lat, lng }}
              zIndex={740}
              title={`Hito ${wp.orden}: ${wp.nombre}`}
              onClick={() => onSelectStaticWaypoint?.(selectedStaticRoute, wp)}
            >
              <div className="w-6 h-6 rounded-full bg-[#161920] text-[#F4F1EA] border-2 border-[#D4AF37] font-mono-tabular text-[11px] font-bold flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform">
                {wp.orden}
              </div>
            </AdvancedMarker>
          );
        })}
    </>
  );
}
