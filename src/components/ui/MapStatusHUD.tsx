import { useEffect, useRef, useState } from 'react';
import {
  Check,
  Crosshair,
  Layers,
  Minus,
  Mountain,
  Plus,
  Satellite,
  ScrollText,
} from 'lucide-react';
import { useCronoMapa } from '../../context/CronoMapaContext';
import type { BaseMapId } from '../../types/history';

const COMPACT_BASE_MAPS: { id: BaseMapId; label: string; subtitle: string }[] = [
  {
    id: 'realistic_relief',
    label: 'Relieve Topográfico',
    subtitle: '3D Hillshade + Cordilleras',
  },
  {
    id: 'satellite_hybrid',
    label: 'Satélite Híbrido',
    subtitle: 'Ortofoto satelital + etiquetas',
  },
  {
    id: 'parchment',
    label: 'Cartografía Antigua',
    subtitle: 'Archivo histórico sepia',
  },
  {
    id: 'physical_historical',
    label: 'Terreno Físico Puro',
    subtitle: 'Sin fronteras modernas',
  },
];

function BaseMapOptionIcon({ id }: { id: BaseMapId }) {
  if (id === 'satellite_hybrid') return <Satellite className="w-3.5 h-3.5 shrink-0" />;
  if (id === 'parchment') return <ScrollText className="w-3.5 h-3.5 shrink-0" />;
  return <Mountain className="w-3.5 h-3.5 shrink-0" />;
}

export default function MapStatusHUD() {
  const {
    activeBaseMapId,
    setActiveBaseMapId,
    reliefIntensity,
    setReliefIntensity,
    resetView,
    zoomIn,
    zoomOut,
  } = useCronoMapa();

  const [baseMapMenuOpen, setBaseMapMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setBaseMapMenuOpen(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBaseMapMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  return (
    <div
      aria-label="Controles flotantes del mapa"
      className="absolute bottom-20 right-4 z-[880] flex flex-col items-end gap-2 select-none print:hidden"
    >
      {/* 1. Selector de Mapa Base con menú desplegable flotante */}
      <div ref={menuRef} className="relative">
        {baseMapMenuOpen && (
          <div className="absolute bottom-0 right-12 mr-1 w-60 bg-slate-900/95 backdrop-blur-xl border border-[#C5A059]/45 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-2 space-y-1.5 text-xs text-[#F4F1EA]">
            <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C5A059]">
              Mapa Base
            </div>

            {COMPACT_BASE_MAPS.map((bm) => {
              const active = activeBaseMapId === bm.id;
              return (
                <button
                  key={bm.id}
                  type="button"
                  onClick={() => {
                    setActiveBaseMapId(bm.id);
                    setBaseMapMenuOpen(false);
                  }}
                  aria-pressed={active}
                  className={`w-full flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg border text-left transition-colors ${
                    active
                      ? 'bg-[#1D3557] text-[#F4F1EA] border-[#D4AF37]/70'
                      : 'bg-[#0D0F12]/70 text-[#F4F1EA]/90 border-transparent hover:border-[#C5A059]/40'
                  }`}
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <BaseMapOptionIcon id={bm.id} />
                    <span className="min-w-0">
                      <span className="block text-xs font-medium truncate">{bm.label}</span>
                      <span className="block text-[10px] text-[#A39E93] truncate">
                        {bm.subtitle}
                      </span>
                    </span>
                  </span>
                  {active && <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />}
                </button>
              );
            })}

            {(activeBaseMapId === 'realistic_relief' ||
              activeBaseMapId === 'physical_historical') && (
              <div className="pt-1.5 px-2 pb-1 border-t border-[#C5A059]/20 space-y-1">
                <div className="flex items-center justify-between text-[10px]">
                  <span className="text-[#A39E93]">Intensidad de relieve</span>
                  <span className="font-mono-tabular text-[#D4AF37] font-semibold">
                    {Math.round(reliefIntensity * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.3}
                  max={1.0}
                  step={0.05}
                  value={reliefIntensity}
                  onChange={(e) => setReliefIntensity(Number(e.target.value))}
                  aria-label="Intensidad de relieve topográfico"
                  className="gis-slider w-full"
                />
              </div>
            )}
          </div>
        )}

        <button
          type="button"
          onClick={() => setBaseMapMenuOpen((prev) => !prev)}
          aria-expanded={baseMapMenuOpen}
          title="Cambiar Mapa Base (Relieve, Satélite, Cartografía Antigua)"
          aria-label="Cambiar Mapa Base"
          className={`w-10 h-10 flex items-center justify-center rounded-xl border shadow-[0_12px_30px_rgba(0,0,0,0.75)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
            baseMapMenuOpen
              ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37]'
              : 'bg-slate-900/90 backdrop-blur-md text-[#D4AF37] border-[#C5A059]/40 hover:border-[#D4AF37] hover:text-[#F4F1EA]'
          }`}
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Botón Centrar Isla (🎯) */}
      <button
        type="button"
        onClick={resetView}
        title="Centrar isla (La Española / República Dominicana)"
        aria-label="Centrar isla"
        className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-900/90 backdrop-blur-md border border-[#C5A059]/40 hover:border-[#D4AF37] text-[#D4AF37] hover:text-[#F4F1EA] shadow-[0_12px_30px_rgba(0,0,0,0.75)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <Crosshair className="w-4 h-4" />
      </button>

      {/* 3. Controles de Zoom (+ y −) agrupados verticalmente */}
      <div className="flex flex-col rounded-xl overflow-hidden bg-slate-900/90 backdrop-blur-md border border-[#C5A059]/40 shadow-[0_12px_30px_rgba(0,0,0,0.75)]">
        <button
          type="button"
          onClick={zoomIn}
          title="Acercar mapa (+)"
          aria-label="Acercar mapa"
          className="w-10 h-10 flex items-center justify-center text-[#F4F1EA] hover:text-[#D4AF37] hover:bg-[#C5A059]/15 border-b border-[#C5A059]/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={zoomOut}
          title="Alejar mapa (−)"
          aria-label="Alejar mapa"
          className="w-10 h-10 flex items-center justify-center text-[#F4F1EA] hover:text-[#D4AF37] hover:bg-[#C5A059]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#D4AF37]"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
