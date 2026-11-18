import { useState } from 'react';
import { ChevronDown, ChevronUp, Compass, FilterX, Play } from 'lucide-react';
import { useCronoMapa } from '../../context/CronoMapaContext';
import { HISTORICAL_ENCYCLOPEDIA_PERIODS } from '../../data/historicalEncyclopediaData';
import { MILESTONE_CATEGORY_STYLE } from '../map/HistoricalMarkersLayer';
import type { MilestoneCategory } from '../../types/history';

const LEGEND_CATEGORIES: MilestoneCategory[] = [
  'Política',
  'Batalla',
  'Fundación',
  'Derechos',
];

export default function MapLegend() {
  const {
    sidebarOpen,
    activeAnimatedRoute,
    animatedRoutes,
    startAnimatedRoute,
    activePeriodFilter,
    setActivePeriodFilter,
    setRegimeFilter,
    setMaxYear,
  } = useCronoMapa();

  const [collapsed, setCollapsed] = useState(false);

  // If the animated route player is active in the bottom-left corner, shift the legend above or to the side
  const leftPositionClass = sidebarOpen
    ? activeAnimatedRoute
      ? 'left-4 md:left-[656px]'
      : 'left-4 md:left-[304px]'
    : activeAnimatedRoute
      ? 'left-4 sm:left-[396px]'
      : 'left-4';

  const activePeriodObj = activePeriodFilter
    ? HISTORICAL_ENCYCLOPEDIA_PERIODS.find((p) => p.id === activePeriodFilter)
    : null;

  return (
    <aside
      aria-label="Leyenda cartográfica de rutas y marcadores"
      className={`pointer-events-auto absolute bottom-20 ${leftPositionClass} z-[885] max-w-[calc(100vw-5.5rem)] transition-all duration-200 print:hidden`}
    >
      {/* Active Period Filter Pill (if user clicked "Ver hitos y rutas de esta época en el mapa") */}
      {activePeriodObj && (
        <div className="mb-1.5 flex items-center justify-between gap-2 px-3 py-1.5 rounded-xl bg-slate-900/95 backdrop-blur-md border border-[#D4AF37]/70 shadow-lg text-xs">
          <span className="flex items-center gap-1.5 font-medium text-[#F4F1EA] truncate">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: activePeriodObj.color }}
            />
            <span className="truncate">
              Filtro: <strong className="text-[#D4AF37]">{activePeriodObj.titulo}</strong>
            </span>
          </span>
          <button
            type="button"
            onClick={() => {
              setActivePeriodFilter(null);
              setRegimeFilter('all');
              setMaxYear(2026);
            }}
            title="Mostrar todas las épocas"
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#9B2226]/80 hover:bg-[#9B2226] text-[10px] font-semibold text-[#F4F1EA] shrink-0 transition-colors"
          >
            <FilterX className="w-3 h-3" />
            <span>Ver todo</span>
          </button>
        </div>
      )}

      <div className="bg-slate-900/90 backdrop-blur-md border border-[#C5A059]/35 rounded-xl shadow-[0_14px_34px_rgba(0,0,0,0.7)] text-[#F4F1EA] overflow-hidden w-64">
        {/* Compact Header Toggle */}
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-expanded={!collapsed}
          className="w-full px-3 py-2 flex items-center justify-between gap-2 text-left hover:bg-[#C5A059]/10 transition-colors"
        >
          <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-[#D4AF37]">
            <Compass className="w-3.5 h-3.5 shrink-0" />
            <span>Leyenda Cartográfica</span>
          </span>
          {collapsed ? (
            <ChevronUp className="w-3.5 h-3.5 text-[#C5A059]" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-[#C5A059]" />
          )}
        </button>

        {!collapsed && (
          <div className="px-3 pb-2.5 pt-1 border-t border-[#C5A059]/20 space-y-2.5 text-[11px]">
            {/* Categorías de Marcadores / Hitos */}
            <div className="space-y-1">
              <div className="text-[9px] uppercase tracking-[0.16em] text-[#A39E93] font-semibold">
                Marcadores e Hitos (16)
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                {LEGEND_CATEGORIES.map((cat) => {
                  const style = MILESTONE_CATEGORY_STYLE[cat];
                  return (
                    <div key={cat} className="flex items-center gap-1.5 min-w-0">
                      <span
                        className="w-2.5 h-2.5 rounded-full border border-[#F4F1EA]/70 shrink-0"
                        style={{ backgroundColor: style.bg }}
                      />
                      <span className="truncate text-[#F4F1EA]/90 font-medium">{cat}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Código de Colores de las 3 Rutas Históricas */}
            <div className="space-y-1 pt-1 border-t border-[#C5A059]/15">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-[0.16em] text-[#A39E93] font-semibold">
                  Rutas Históricas (3)
                </span>
                <span className="text-[9px] text-[#C5A059]">Clic para animar</span>
              </div>
              <div className="space-y-1">
                {animatedRoutes.map((rt) => {
                  const isPlayingThis = activeAnimatedRoute?.id === rt.id;
                  return (
                    <button
                      key={rt.id}
                      type="button"
                      onClick={() => startAnimatedRoute(rt, false)}
                      title={`Iniciar recorrido paso a paso: ${rt.title}`}
                      className={`w-full text-left px-1.5 py-1 rounded flex items-center justify-between gap-1.5 transition-colors ${
                        isPlayingThis
                          ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-semibold'
                          : 'hover:bg-[#C5A059]/15 text-[#F4F1EA]/90'
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-4 h-0.5 shrink-0 rounded-full"
                          style={{
                            backgroundColor: rt.color,
                            boxShadow: `0 0 6px ${rt.color}`,
                          }}
                        />
                        <span className="truncate text-[10px]">
                          {rt.epoch === 'Época Taína'
                            ? 'Resistencia Taína (1492)'
                            : rt.epoch === 'Independencia 1844'
                              ? 'Independencia (1844)'
                              : 'Restauración (1863)'}
                        </span>
                      </span>
                      <Play className="w-2.5 h-2.5 text-[#D4AF37] fill-current shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
