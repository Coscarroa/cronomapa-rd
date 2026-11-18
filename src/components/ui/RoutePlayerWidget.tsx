import {
  ChevronLeft,
  ChevronRight,
  Compass,
  MapPin,
  Pause,
  Play,
  RotateCcw,
  X,
} from 'lucide-react';
import { useCronoMapa } from '../../context/CronoMapaContext';
import type { AnimatedHistoricalRoute } from '../../types/history';

interface RoutePlayerWidgetProps {
  route: AnimatedHistoricalRoute;
  isPlaying: boolean;
  progress: number;
  stopIndex: number;
  onTogglePlay: () => void;
  onRestart: () => void;
  onClose: () => void;
  onJumpToStop: (index: number) => void;
}

export default function RoutePlayerWidget({
  route,
  isPlaying,
  progress,
  stopIndex,
  onTogglePlay,
  onRestart,
  onClose,
  onJumpToStop,
}: RoutePlayerWidgetProps) {
  const { sidebarOpen, animatedRoutes, startAnimatedRoute, flyToCoords } = useCronoMapa();
  const currentStop = route.stops[stopIndex] ?? route.stops[0];
  const progressPct = Math.round(progress * 100);
  const leftOffsetClass = sidebarOpen ? 'left-4 md:left-[304px]' : 'left-4';

  return (
    <aside
      aria-label="Reproductor de recorrido histórico animado paso a paso"
      className={`pointer-events-auto absolute bottom-20 ${leftOffsetClass} z-[925] w-[368px] max-w-[calc(100vw-2rem)] bg-slate-900/95 backdrop-blur-xl border border-[#C5A059]/45 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] text-[#F4F1EA] overflow-hidden transition-all duration-200 print:hidden`}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#C5A059]/25 flex items-start justify-between gap-2 bg-[#0D0F12]/80">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#C5A059] font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Modo Recorrido Paso a Paso · {route.dates}</span>
          </div>
          <h3 className="font-display text-sm font-bold text-[#F4F1EA] leading-snug mt-0.5 truncate">
            {route.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar reproductor de ruta"
          className="p-1.5 rounded-lg border border-[#C5A059]/25 text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#D4AF37] transition-colors shrink-0"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Selector Rápido de las 3 Rutas Históricas */}
      {animatedRoutes.length > 1 && (
        <div className="px-3 py-1.5 bg-[#0D0F12]/50 border-b border-[#C5A059]/15 flex items-center gap-1 overflow-x-auto gis-scroll">
          {animatedRoutes.map((rt) => {
            const active = rt.id === route.id;
            return (
              <button
                key={rt.id}
                type="button"
                onClick={() => startAnimatedRoute(rt, false)}
                className={`px-2 py-1 rounded text-[10px] font-semibold whitespace-nowrap flex items-center gap-1.5 border transition-colors ${
                  active
                    ? 'bg-[#161920] text-[#D4AF37] border-[#D4AF37]/60'
                    : 'bg-transparent text-[#A39E93] border-transparent hover:text-[#F4F1EA]'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: rt.color }}
                />
                <span>{rt.epoch}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Body: Step-by-Step Stop Selector, Narrative Card & Controls */}
      <div className="p-3.5 space-y-3">
        {/* Numbered Step-by-Step Stop Pills */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono-tabular">
            <span className="text-[#C5A059] font-semibold">
              Parada {stopIndex + 1} de {route.stops.length}
            </span>
            <span className="text-[#D4AF37] font-semibold">{progressPct}% recorrido</span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {route.stops.map((st, idx) => {
              const isCurrent = idx === stopIndex;
              const isCompleted = idx < stopIndex;
              return (
                <button
                  key={st.order}
                  type="button"
                  onClick={() => onJumpToStop(idx)}
                  title={`Ir a parada ${st.order}: ${st.name}`}
                  className={`py-1 px-1.5 rounded-lg border text-[11px] font-mono-tabular font-bold transition-all flex items-center justify-center gap-1 ${
                    isCurrent
                      ? 'bg-[#D4AF37] text-[#0D0F12] border-[#F4F1EA] shadow-sm'
                      : isCompleted
                        ? 'bg-[#161920] text-[#D4AF37] border-[#D4AF37]/50'
                        : 'bg-[#0D0F12]/70 text-[#A39E93] border-[#C5A059]/25 hover:border-[#C5A059]/60 hover:text-[#F4F1EA]'
                  }`}
                >
                  <span>Paso {st.order}</span>
                </button>
              );
            })}
          </div>

          <div className="h-1.5 w-full rounded-full bg-[#0D0F12] border border-[#C5A059]/20 overflow-hidden">
            <div
              className="h-full transition-all duration-150"
              style={{ width: `${progressPct}%`, backgroundColor: route.color }}
            />
          </div>
        </div>

        {/* Active Stop Narrative Card */}
        {currentStop && (
          <div className="rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 p-3 space-y-1.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono-tabular text-[11px] font-bold text-[#D4AF37]">
                Parada {currentStop.order} · {currentStop.date}
              </span>
              <button
                type="button"
                onClick={() => flyToCoords([currentStop.lng, currentStop.lat], 12)}
                className="inline-flex items-center gap-1 text-[10px] font-mono-tabular text-[#C5A059] hover:text-[#D4AF37]"
                title="Enfocar parada en el mapa"
              >
                <MapPin className="w-3 h-3" />
                <span>
                  {currentStop.lat.toFixed(3)}°N, {Math.abs(currentStop.lng).toFixed(3)}°O
                </span>
              </button>
            </div>
            <div className="font-display text-sm font-bold text-[#F4F1EA]">
              {currentStop.name}
            </div>
            <p className="text-xs text-[#F4F1EA]/85 leading-relaxed">{currentStop.narrative}</p>
          </div>
        )}

        {/* Step-by-Step Navigation & Play Controls */}
        <div className="flex items-center justify-between gap-2 pt-0.5">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onJumpToStop(stopIndex - 1)}
              disabled={stopIndex <= 0}
              aria-label="Parada anterior"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#C5A059]/35 bg-[#0D0F12]/85 text-xs font-semibold text-[#F4F1EA] hover:border-[#D4AF37] disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>

            <button
              type="button"
              onClick={() => onJumpToStop(stopIndex + 1)}
              disabled={stopIndex >= route.stops.length - 1}
              aria-label="Siguiente parada"
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-[#C5A059]/35 bg-[#0D0F12]/85 text-xs font-semibold text-[#F4F1EA] hover:border-[#D4AF37] disabled:opacity-40 transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onTogglePlay}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] transition-colors shadow-sm"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{progress >= 0.99 ? 'Repetir' : 'Auto'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onRestart}
              title="Reiniciar ruta desde la parada 1"
              aria-label="Reiniciar ruta"
              className="p-1.5 rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 text-[#F4F1EA] hover:border-[#D4AF37] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
