import {
  ChevronLeft,
  ChevronRight,
  Compass,
  Pause,
  Play,
  RotateCcw,
  X,
} from 'lucide-react';
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
  const currentStop = route.stops[stopIndex] ?? route.stops[0];
  const progressPct = Math.round(progress * 100);

  return (
    <aside
      aria-label="Reproductor de ruta histórica animada"
      className="pointer-events-auto absolute bottom-20 left-4 z-[925] w-[360px] max-w-[calc(100vw-2rem)] bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/45 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.75)] text-[#F4F1EA] overflow-hidden"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#C5A059]/25 flex items-start justify-between gap-2 bg-[#0D0F12]/70">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#C5A059] font-semibold">
            <Compass className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Ruta Animada · {route.dates}</span>
          </div>
          <h3 className="font-display text-sm font-semibold text-[#F4F1EA] leading-snug mt-0.5 truncate">
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

      {/* Progress & Narrative Stop */}
      <div className="p-4 space-y-3">
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-mono-tabular">
            <span className="text-[#C5A059]">
              Parada {stopIndex + 1} de {route.stops.length}
            </span>
            <span className="text-[#D4AF37] font-semibold">{progressPct}%</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-[#0D0F12] border border-[#C5A059]/20 overflow-hidden">
            <div
              className="h-full bg-[#D4AF37] transition-all duration-150"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {currentStop && (
          <div className="rounded-lg border border-[#C5A059]/25 bg-[#0D0F12]/75 p-3 space-y-1">
            <div className="font-mono-tabular text-[11px] font-semibold text-[#D4AF37]">
              {currentStop.order}. {currentStop.date}
            </div>
            <div className="font-display text-sm font-semibold text-[#F4F1EA]">
              {currentStop.name}
            </div>
            <p className="text-xs text-[#F4F1EA]/80 leading-relaxed">{currentStop.narrative}</p>
          </div>
        )}

        {/* Controls */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={onTogglePlay}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] transition-colors"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span>Pausar</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{progress >= 0.99 ? 'Repetir' : 'Reproducir'}</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onRestart}
              title="Reiniciar ruta"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 text-[#F4F1EA] hover:border-[#D4AF37] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar</span>
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onJumpToStop(stopIndex - 1)}
              disabled={stopIndex <= 0}
              aria-label="Parada anterior"
              className="p-1.5 rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 text-[#F4F1EA] hover:border-[#D4AF37] disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => onJumpToStop(stopIndex + 1)}
              disabled={stopIndex >= route.stops.length - 1}
              aria-label="Siguiente parada"
              className="p-1.5 rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 text-[#F4F1EA] hover:border-[#D4AF37] disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
