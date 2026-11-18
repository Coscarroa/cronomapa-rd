import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Layers, X } from 'lucide-react';
import {
  buildBeforeCompareLayers,
  buildModernCompareFeatures,
  type BeforeCompareLayerId,
  type ComparePolygonFeature,
} from '../../data/historicalLayersData';
import { useCronoMapa } from '../../context/CronoMapaContext';
import { getProvinceMacroPalette } from '../../utils/mapStyles';

interface BeforeAfterCompareProps {
  onClose: () => void;
}

// Shared geographic bounding box for synchronized projection across Hispaniola & RD
const BOUNDS = {
  minLng: -74.65,
  maxLng: -68.15,
  minLat: 17.42,
  maxLat: 20.12,
};

const SVG_W = 1000;
const SVG_H = 460;

function projectCoord([lng, lat]: [number, number]): [number, number] {
  const x = ((lng - BOUNDS.minLng) / (BOUNDS.maxLng - BOUNDS.minLng)) * SVG_W;
  const y = SVG_H - ((lat - BOUNDS.minLat) / (BOUNDS.maxLat - BOUNDS.minLat)) * SVG_H;
  return [x, y];
}

function ringsToSvgPath(rings: [number, number][][]): string {
  return rings
    .map((ring) => {
      if (ring.length === 0) return '';
      const pts = ring.map((c, idx) => {
        const [x, y] = projectCoord(c);
        return `${idx === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
      });
      return `${pts.join(' ')} Z`;
    })
    .join(' ');
}

function getFeatureCenter(feature: ComparePolygonFeature): [number, number] {
  if (feature.labelPoint) return projectCoord(feature.labelPoint);
  const ring = feature.rings[0] ?? [];
  if (ring.length === 0) return [SVG_W / 2, SVG_H / 2];
  let sumX = 0;
  let sumY = 0;
  const len = ring.length > 1 ? ring.length - 1 : ring.length;
  for (let i = 0; i < len; i++) {
    const [x, y] = projectCoord(ring[i]);
    sumX += x;
    sumY += y;
  }
  return [sumX / len, sumY / len];
}

export default function BeforeAfterCompare({ onClose }: BeforeAfterCompareProps) {
  const { realProvinces } = useCronoMapa();
  const [selectedLayerId, setSelectedLayerId] =
    useState<BeforeCompareLayerId>('cacicazgos_1492');
  const [splitPercent, setSplitPercent] = useState<number>(50);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [hoveredFeature, setHoveredFeature] = useState<{
    side: 'before' | 'after';
    name: string;
    subtitle: string;
  } | null>(null);

  const stageRef = useRef<HTMLDivElement | null>(null);

  const beforeCompareLayers = useMemo(
    () => buildBeforeCompareLayers(realProvinces),
    [realProvinces],
  );

  const modernCompareFeatures = useMemo(
    () => buildModernCompareFeatures(realProvinces),
    [realProvinces],
  );

  const activeBeforeLayer = useMemo(
    () =>
      beforeCompareLayers.find((l) => l.id === selectedLayerId) ?? beforeCompareLayers[0],
    [beforeCompareLayers, selectedLayerId],
  );

  const updateSplitFromClientX = useCallback((clientX: number) => {
    const el = stageRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width <= 0) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSplitPercent(Math.max(0, Math.min(100, pct)));
  }, []);

  useEffect(() => {
    if (!isDragging) return;
    const handleMouseMove = (e: MouseEvent) => updateSplitFromClientX(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) updateSplitFromClientX(e.touches[0].clientX);
    };
    const stopDrag = () => setIsDragging(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging, updateSplitFromClientX]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSliderKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSplitPercent((p) => Math.max(0, p - 3));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSplitPercent((p) => Math.min(100, p + 3));
    }
  };

  return (
    <section
      aria-label="Comparación cartográfica Antes y Después"
      className="absolute inset-0 z-[960] bg-[#0D0F12] flex flex-col overflow-hidden"
    >
      {/* Top Bar of Compare Mode */}
      <div className="px-4 sm:px-6 py-3 bg-[#161920]/90 backdrop-blur-xl border-b border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-medium">
              Comparación Sincronizada
            </div>
            <h2 className="font-display text-base sm:text-lg font-semibold text-[#F4F1EA]">
              Antes vs. Hoy — Evolución Territorial
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="before-layer-select"
              className="text-xs text-[#A39E93] hidden md:inline"
            >
              Capa histórica:
            </label>
            <div className="relative">
              <Layers className="w-3.5 h-3.5 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                id="before-layer-select"
                value={selectedLayerId}
                onChange={(e) => setSelectedLayerId(e.target.value as BeforeCompareLayerId)}
                className="pl-8 pr-4 py-1.5 text-xs font-medium bg-[#0D0F12] text-[#F4F1EA] border border-[#C5A059]/40 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              >
                {beforeCompareLayers.map((layer) => (
                  <option key={layer.id} value={layer.id}>
                    {layer.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-[#9B2226] hover:bg-[#7F1D1D] text-[#F4F1EA] border border-[#C5A059]/40 rounded-lg transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <X className="w-3.5 h-3.5 shrink-0" />
          <span>Salir de Comparación</span>
        </button>
      </div>

      {/* Synchronized Split-Screen Canvas */}
      <div
        ref={stageRef}
        onMouseMove={(e) => {
          if (isDragging) updateSplitFromClientX(e.clientX);
        }}
        onTouchMove={(e) => {
          if (isDragging && e.touches[0]) updateSplitFromClientX(e.touches[0].clientX);
        }}
        className="relative flex-1 min-h-0 overflow-hidden select-none cursor-ew-resize"
      >
        {/* RIGHT LAYER (DESPUÉS — República Dominicana Actual, Full Base Layer) */}
        <div className="absolute inset-0 bg-[#0D0F12] flex items-center justify-center p-4 sm:p-10">
          {/* Subtle modern coordinate grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(197,160,89,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(197,160,89,0.18) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
            aria-hidden="true"
          />

          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-full max-w-[1160px] max-h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Reference Island Outline */}
            {(beforeCompareLayers.find((l) => l.id === 'division_colonial')?.features ?? []).map(
              (f) => (
                <path
                  key={`modern-bg-${f.id}`}
                  d={ringsToSvgPath(f.rings)}
                  fill="#161920"
                  stroke="rgba(197,160,89,0.16)"
                  strokeWidth={1}
                />
              ),
            )}

            {/* 31 Provinces + Distrito Nacional */}
            {modernCompareFeatures.map((prov) => {
              const regionText = prov.subtitle.split(' · ')[0] ?? '';
              const palette = getProvinceMacroPalette(regionText);
              const [cx, cy] = getFeatureCenter(prov);
              const isDistrito = prov.name === 'Distrito Nacional';

              return (
                <g
                  key={`modern-${prov.id}`}
                  onMouseEnter={() =>
                    setHoveredFeature({
                      side: 'after',
                      name: prov.name,
                      subtitle: prov.subtitle,
                    })
                  }
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="cursor-pointer"
                >
                  <path
                    d={ringsToSvgPath(prov.rings)}
                    fill={palette.fill}
                    fillOpacity={0.32}
                    stroke="#D4AF37"
                    strokeWidth={1.15}
                    className="transition-opacity duration-200 hover:fill-opacity-60"
                  />
                  {!isDistrito && (
                    <text
                      x={cx}
                      y={cy}
                      textAnchor="middle"
                      fill="#F4F1EA"
                      fontSize="7.8"
                      fontWeight="500"
                      className="pointer-events-none select-none"
                      opacity={0.85}
                    >
                      {prov.name}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>

        {/* LEFT LAYER (ANTES — División Histórica, Clipped by Slider Percentage) */}
        <div
          className="absolute inset-0 bg-[#17130D] flex items-center justify-center p-4 sm:p-10"
          style={{
            clipPath: `inset(0 ${100 - splitPercent}% 0 0)`,
          }}
        >
          {/* Dark archival parchment radial vignette & fine meridian lines */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 45%, rgba(197,160,89,0.11) 0%, rgba(13,15,18,0.65) 100%)',
            }}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(212,175,55,0.14) 1px, transparent 1px), linear-gradient(to bottom, rgba(212,175,55,0.14) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
            aria-hidden="true"
          />

          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full h-full max-w-[1160px] max-h-full relative z-10"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Ghost modern border outline for subtle spatial anchor */}
            {modernCompareFeatures.map((prov) => (
              <path
                key={`ghost-${prov.id}`}
                d={ringsToSvgPath(prov.rings)}
                fill="none"
                stroke="rgba(197,160,89,0.12)"
                strokeWidth={0.6}
                strokeDasharray="2 3"
              />
            ))}

            {/* Selected Historical Before Polygons */}
            {activeBeforeLayer.features.map((feat) => {
              const [cx, cy] = getFeatureCenter(feat);
              return (
                <g
                  key={`before-${feat.id}`}
                  onMouseEnter={() =>
                    setHoveredFeature({
                      side: 'before',
                      name: feat.name,
                      subtitle: feat.subtitle,
                    })
                  }
                  onMouseLeave={() => setHoveredFeature(null)}
                  className="cursor-pointer"
                >
                  <path
                    d={ringsToSvgPath(feat.rings)}
                    fill={feat.color}
                    fillOpacity={0.34}
                    stroke="#D4AF37"
                    strokeWidth={2}
                    strokeDasharray={selectedLayerId === 'division_colonial' ? 'none' : '5 3'}
                  />
                  <text
                    x={cx}
                    y={cy - 4}
                    textAnchor="middle"
                    fill="#F4F1EA"
                    fontSize="12"
                    fontFamily="Playfair Display, serif"
                    fontWeight="600"
                    className="pointer-events-none select-none"
                  >
                    {feat.name}
                  </text>
                  <text
                    x={cx}
                    y={cy + 10}
                    textAnchor="middle"
                    fill="#C5A059"
                    fontSize="8.5"
                    className="pointer-events-none select-none"
                  >
                    {feat.subtitle}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Corner Identification Labels */}
        <div className="pointer-events-none absolute top-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-[#161920]/85 backdrop-blur-xl border border-[#C5A059]/35">
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#C5A059]">
            Antes · {activeBeforeLayer.yearLabel}
          </div>
          <div className="font-display text-xs sm:text-sm font-semibold text-[#F4F1EA]">
            {activeBeforeLayer.shortTitle}
          </div>
        </div>

        <div className="pointer-events-none absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-[#161920]/85 backdrop-blur-xl border border-[#C5A059]/35 text-right">
          <div className="text-[10px] uppercase tracking-[0.18em] text-[#C5A059]">
            Después · 2026
          </div>
          <div className="font-display text-xs sm:text-sm font-semibold text-[#F4F1EA]">
            31 Provincias y Distrito Nacional
          </div>
        </div>

        {/* Hover Readout Chip */}
        {hoveredFeature && (
          <div className="pointer-events-none absolute top-4 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-lg bg-[#161920]/95 backdrop-blur-xl border border-[#D4AF37]/50 shadow-xl text-center">
            <div className="font-display text-xs font-semibold text-[#F4F1EA]">
              {hoveredFeature.name}
            </div>
            <div className="text-[11px] text-[#C5A059]">{hoveredFeature.subtitle}</div>
          </div>
        )}

        {/* Vertical Golden Split Divider + Draggable Handle */}
        <div
          className="absolute inset-y-0 z-30 -translate-x-1/2 pointer-events-none"
          style={{ left: `${splitPercent}%` }}
        >
          <div className="h-full w-[2px] bg-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.75)] mx-auto" />
          <button
            type="button"
            role="slider"
            aria-label="Deslizador de comparación entre mapa histórico y actual"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(splitPercent)}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onTouchStart={() => setIsDragging(true)}
            onKeyDown={handleSliderKeyDown}
            className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-[#161920] border-2 border-[#D4AF37] text-[#D4AF37] shadow-[0_8px_24px_rgba(0,0,0,0.75)] flex items-center justify-center gap-0.5 cursor-ew-resize hover:scale-105 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EA]"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="w-px h-3.5 bg-[#D4AF37]/70" />
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Footer Context Card */}
      <div className="px-4 sm:px-6 py-3 bg-[#161920]/90 backdrop-blur-xl border-t border-[#C5A059]/30">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="space-y-0.5">
            <div className="text-[10px] uppercase tracking-[0.18em] text-[#C5A059] font-semibold">
              Evolución Territorial · {activeBeforeLayer.shortTitle} → Actualidad
            </div>
            <p className="text-xs text-[#F4F1EA]/90 leading-relaxed">
              {activeBeforeLayer.evolutionNote}
            </p>
          </div>
          <div className="font-mono-tabular text-[11px] text-[#A39E93] shrink-0">
            Cortina: {Math.round(splitPercent)}% / {100 - Math.round(splitPercent)}%
          </div>
        </div>
      </div>
    </section>
  );
}
