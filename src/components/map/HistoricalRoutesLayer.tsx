import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { Polyline, Marker, Tooltip, useMap } from 'react-leaflet';
import type {
  AnimatedHistoricalRoute,
  AnimatedRouteStop,
  HistoricalRoute,
} from '../../types/history';

interface HistoricalRoutesLayerProps {
  staticRoutes: HistoricalRoute[];
  staticRoutesVisible: boolean;
  staticRoutesOpacity: number;
  selectedRouteId: string | null;
  onSelectStaticRoute: (route: HistoricalRoute) => void;
  activeAnimatedRoute: AnimatedHistoricalRoute | null;
  isRoutePlaying: boolean;
  routeProgress: number; // 0..1
  routeStopIndex: number;
  onUpdateProgress: (progress: number) => void;
  onUpdateStopIndex: (idx: number) => void;
  onFinishPlaying: () => void;
  onSelectRouteStop: (index: number) => void;
}

function interpolateStops(
  stops: AnimatedRouteStop[],
  progress01: number
): {
  partialPath: [number, number][];
  headPoint: [number, number] | null;
  activeIdx: number;
} {
  if (stops.length === 0) {
    return { partialPath: [], headPoint: null, activeIdx: 0 };
  }
  const clamped = Math.max(0, Math.min(1, progress01));
  if (stops.length === 1 || clamped <= 0) {
    return {
      partialPath: [[stops[0].lat, stops[0].lng]],
      headPoint: [stops[0].lat, stops[0].lng],
      activeIdx: 0,
    };
  }
  if (clamped >= 1) {
    const last = stops[stops.length - 1];
    return {
      partialPath: stops.map((s) => [s.lat, s.lng]),
      headPoint: [last.lat, last.lng],
      activeIdx: stops.length - 1,
    };
  }

  const totalSegments = stops.length - 1;
  const exactSegment = clamped * totalSegments;
  const segIndex = Math.min(Math.floor(exactSegment), totalSegments - 1);
  const segFraction = exactSegment - segIndex;

  const partial: [number, number][] = stops
    .slice(0, segIndex + 1)
    .map((s) => [s.lat, s.lng]);
  const start = stops[segIndex];
  const end = stops[segIndex + 1];
  const interpPoint: [number, number] = [
    start.lat + (end.lat - start.lat) * segFraction,
    start.lng + (end.lng - start.lng) * segFraction,
  ];
  partial.push(interpPoint);

  const activeIdx = Math.min(
    stops.length - 1,
    Math.round(clamped * totalSegments)
  );

  return { partialPath: partial, headPoint: interpPoint, activeIdx };
}

function createVanguardDivIcon(color: string): L.DivIcon {
  const html = `
    <div style="position:relative;display:flex;align-items:center;justify-content:center;width:28px;height:28px;">
      <span style="position:absolute;inset:0;border-radius:9999px;background:${color};opacity:0.4;transform:scale(1.4);"></span>
      <div style="position:relative;width:20px;height:20px;border-radius:9999px;border:2px solid #F4F1EA;background:${color};box-shadow:0 0 16px ${color};display:flex;align-items:center;justify-content:center;">
        <div style="width:6px;height:6px;border-radius:9999px;background:#F4F1EA;"></div>
      </div>
    </div>
  `;
  return L.divIcon({
    className: 'leaflet-div-icon',
    html,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function createStopDivIcon(
  idx: number,
  color: string,
  isCurrentStop: boolean,
  isReached: boolean
): L.DivIcon {
  const size = isCurrentStop ? 32 : 24;
  const bgColor = isCurrentStop ? color : isReached ? '#161920' : '#0D0F12';
  const borderColor = isCurrentStop || isReached ? color : '#9A9589';
  const textColor = isCurrentStop
    ? '#0D0F12'
    : isReached
      ? '#F4F1EA'
      : '#9A9589';
  const shadow = isCurrentStop
    ? `0 0 18px ${color}, 0 4px 10px rgba(0,0,0,0.9)`
    : '0 2px 6px rgba(0,0,0,0.8)';

  const html = `
    <div style="display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:9999px;background:${bgColor};border:2px solid ${borderColor};color:${textColor};box-shadow:${shadow};font-family:monospace;font-size:11px;font-weight:700;cursor:pointer;transition:transform 0.2s ease;">
      ${idx + 1}
    </div>
  `;

  return L.divIcon({
    className: 'leaflet-div-icon',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function HistoricalRoutesLayer({
  staticRoutes,
  staticRoutesVisible,
  staticRoutesOpacity,
  selectedRouteId,
  onSelectStaticRoute,
  activeAnimatedRoute,
  isRoutePlaying,
  routeProgress,
  routeStopIndex,
  onUpdateProgress,
  onUpdateStopIndex,
  onFinishPlaying,
  onSelectRouteStop,
}: HistoricalRoutesLayerProps) {
  const map = useMap();
  const [hoveredStaticRouteId, setHoveredStaticRouteId] = useState<
    string | null
  >(null);

  // Animation loop when playing an expedition route (routeProgress is 0..1)
  useEffect(() => {
    if (!isRoutePlaying || !activeAnimatedRoute) return;

    let lastTime = performance.now();
    let currentProg = routeProgress >= 0.995 ? 0 : routeProgress;
    let rafId: number;
    const totalStops = Math.max(1, activeAnimatedRoute.stops.length - 1);

    const step = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;
      currentProg = Math.min(1, currentProg + dt * 0.000095);
      onUpdateProgress(currentProg);

      const nextStopIdx = Math.min(
        activeAnimatedRoute.stops.length - 1,
        Math.round(currentProg * totalStops)
      );
      onUpdateStopIndex(nextStopIdx);

      if (currentProg < 1) {
        rafId = requestAnimationFrame(step);
      } else {
        onFinishPlaying();
      }
    };

    rafId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafId);
  }, [isRoutePlaying, activeAnimatedRoute]);

  // Smooth pan when user steps manually between stops
  useEffect(() => {
    if (!map || !activeAnimatedRoute || isRoutePlaying) return;
    const stop = activeAnimatedRoute.stops[routeStopIndex];
    if (!stop) return;
    map.panTo([stop.lat, stop.lng], { animate: true, duration: 0.65 });
  }, [map, activeAnimatedRoute, routeStopIndex, isRoutePlaying]);

  const animatedData = activeAnimatedRoute
    ? interpolateStops(activeAnimatedRoute.stops, routeProgress)
    : null;

  return (
    <>
      {/* 1. Static Historical Routes (3 core traced routes) */}
      {staticRoutesVisible &&
        staticRoutes.map((route) => {
          const id = route.properties.id;
          const isHovered = hoveredStaticRouteId === id;
          const isSelected = selectedRouteId === id;
          const positions = route.geometry.coordinates.map(
            ([lng, lat]) => [lat, lng] as [number, number]
          );

          return (
            <Polyline
              key={id}
              positions={positions}
              pathOptions={{
                color: route.properties.color || '#D4AF37',
                weight: isSelected || isHovered ? 5.5 : 3.8,
                opacity: Math.min(
                  1,
                  (isSelected || isHovered ? 1 : 0.85) *
                    Math.max(0.4, staticRoutesOpacity)
                ),
                dashArray: isSelected || isHovered ? undefined : '8 6',
              }}
              eventHandlers={{
                mouseover: () => setHoveredStaticRouteId(id),
                mouseout: () =>
                  setHoveredStaticRouteId((prev) => (prev === id ? null : prev)),
                click: (e) => {
                  L.DomEvent.stopPropagation(e.originalEvent);
                  onSelectStaticRoute(route);
                },
              }}
            >
              <Tooltip
                sticky
                direction="top"
                opacity={1}
                className="!bg-transparent !border-0 !shadow-none !p-0"
              >
                <div className="w-60 rounded-lg border border-[#C5A059]/60 bg-[#0D0F12]/95 backdrop-blur-md p-2.5 shadow-xl">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span
                      className="text-[10px] font-mono font-bold uppercase tracking-wider"
                      style={{ color: route.properties.color }}
                    >
                      {route.properties.epoca} • {route.properties.fechas}
                    </span>
                  </div>
                  <p className="font-display text-xs font-bold text-[#F4F1EA] whitespace-normal">
                    {route.properties.titulo}
                  </p>
                  <p className="text-[10px] text-[#A39E93] mt-0.5 leading-snug line-clamp-2 whitespace-normal">
                    {route.properties.descripcion}
                  </p>
                </div>
              </Tooltip>
            </Polyline>
          );
        })}

      {/* 2. Active Animated Route Track & Step-by-Step Stops */}
      {activeAnimatedRoute && (
        <>
          <Polyline
            key={`anim-base-${activeAnimatedRoute.id}`}
            positions={activeAnimatedRoute.stops.map(
              (s) => [s.lat, s.lng] as [number, number]
            )}
            pathOptions={{
              color: activeAnimatedRoute.color,
              weight: 2.6,
              opacity: 0.35,
              dashArray: '6 8',
            }}
          />

          {animatedData && animatedData.partialPath.length > 1 && (
            <Polyline
              key={`anim-active-${activeAnimatedRoute.id}`}
              positions={animatedData.partialPath}
              pathOptions={{
                color: activeAnimatedRoute.color,
                weight: 5.2,
                opacity: 0.96,
              }}
            />
          )}

          {animatedData?.headPoint && (
            <Marker
              position={animatedData.headPoint}
              icon={createVanguardDivIcon(activeAnimatedRoute.color)}
              zIndexOffset={900}
            />
          )}

          {activeAnimatedRoute.stops.map((stop, idx) => {
            const denom = Math.max(1, activeAnimatedRoute.stops.length - 1);
            const stopThreshold = idx / denom;
            const isReached = routeProgress >= stopThreshold - 0.02;
            const isCurrentStop = routeStopIndex === idx;

            return (
              <Marker
                key={`${activeAnimatedRoute.id}-stop-${idx}`}
                position={[stop.lat, stop.lng]}
                icon={createStopDivIcon(
                  idx,
                  activeAnimatedRoute.color,
                  isCurrentStop,
                  isReached
                )}
                zIndexOffset={isCurrentStop ? 880 : 660}
                eventHandlers={{
                  click: (e) => {
                    L.DomEvent.stopPropagation(e.originalEvent);
                    onSelectRouteStop(idx);
                  },
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -16]}
                  opacity={1}
                  permanent={isCurrentStop}
                  className="!bg-transparent !border-0 !shadow-none !p-0"
                >
                  <div className="w-60 rounded-lg border border-[#C5A059]/60 bg-[#0D0F12]/95 backdrop-blur-md p-2.5 shadow-xl">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <span
                        className="text-[10px] font-mono font-bold uppercase tracking-wider"
                        style={{ color: activeAnimatedRoute.color }}
                      >
                        Parada {stop.order} de{' '}
                        {activeAnimatedRoute.stops.length} • {stop.date}
                      </span>
                    </div>
                    <p className="font-display text-xs font-bold text-[#F4F1EA] mb-0.5 whitespace-normal">
                      {stop.name}
                    </p>
                    <p className="text-[11px] text-[#A39E93] leading-snug whitespace-normal">
                      {stop.narrative}
                    </p>
                  </div>
                </Tooltip>
              </Marker>
            );
          })}
        </>
      )}
    </>
  );
}

export { HistoricalRoutesLayer };
