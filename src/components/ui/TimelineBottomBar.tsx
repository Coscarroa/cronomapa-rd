import { Layers } from 'lucide-react';
import { useCronoMapa } from '../../context/CronoMapaContext';
import { HISTORICAL_EPOCHS, getEpochForYear } from '../../data/historicalLayersData';

export default function TimelineBottomBar() {
  const {
    maxYear,
    setMaxYear,
    syncTerritoryWithYear,
    setSyncTerritoryWithYear,
    filteredEvents,
    cursorCoords,
    zoom,
  } = useCronoMapa();

  const currentEpoch = getEpochForYear(maxYear);
  const latLabel = `${Math.abs(cursorCoords.lat).toFixed(4)}° ${cursorCoords.lat >= 0 ? 'N' : 'S'}`;
  const lngLabel = `${Math.abs(cursorCoords.lng).toFixed(4)}° ${cursorCoords.lng >= 0 ? 'E' : 'O'}`;
  const zoomLabel = zoom.toFixed(1).replace(/\.0$/, '');

  return (
    <footer
      aria-label="Línea de tiempo cartográfica y telemetría de coordenadas"
      className="absolute bottom-0 inset-x-0 z-[870] h-16 bg-slate-900/90 backdrop-blur-md border-t border-[#C5A059]/30 shadow-[0_-12px_30px_rgba(0,0,0,0.65)] px-3 sm:px-5 flex items-center justify-between gap-3 sm:gap-4 select-none print:hidden"
    >
      {/* 1. Izquierda: Año Activo + Contador de Hechos Visibles + Botón Sincronizar Territorio */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="flex items-baseline gap-2">
          <span className="font-display text-xl sm:text-2xl font-bold text-[#D4AF37] leading-none font-mono-tabular">
            {maxYear}
          </span>
          <span className="font-mono-tabular text-[11px] text-[#A39E93] whitespace-nowrap">
            {filteredEvents.length} hechos
          </span>
        </div>

        <button
          type="button"
          onClick={() => setSyncTerritoryWithYear(!syncTerritoryWithYear)}
          aria-pressed={syncTerritoryWithYear}
          title="Sincronizar fronteras territoriales con el año seleccionado"
          className={`flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
            syncTerritoryWithYear
              ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37] font-semibold'
              : 'bg-[#0D0F12]/70 text-[#F4F1EA] border-[#C5A059]/30 hover:border-[#D4AF37]'
          }`}
        >
          <Layers className="w-3 h-3 shrink-0" />
          <span className="hidden md:inline">Territorio</span>
        </button>
      </div>

      {/* 2. Centro-Izquierda: Control Deslizante (Slider 1492–2026) */}
      <div className="flex items-center gap-2 flex-1 min-w-[110px] max-w-xs lg:max-w-md">
        <span className="hidden sm:inline font-mono-tabular text-[10px] text-[#A39E93]">1492</span>
        <input
          type="range"
          aria-label="Filtrar eventos hasta el año"
          min={1492}
          max={2026}
          step={1}
          value={maxYear}
          onChange={(e) => setMaxYear(Number(e.target.value))}
          className="gis-slider w-full"
        />
        <span className="hidden sm:inline font-mono-tabular text-[10px] text-[#A39E93]">2026</span>
      </div>

      {/* 3. Centro-Derecha: Botones de Épocas Históricas en una sola fila */}
      <div className="flex items-center gap-1 overflow-x-auto gis-scroll py-1 max-w-[38vw] xl:max-w-none">
        {HISTORICAL_EPOCHS.map((epoch) => {
          const active = currentEpoch.id === epoch.id;
          return (
            <button
              key={epoch.id}
              type="button"
              onClick={() => setMaxYear(epoch.jumpYear)}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                active
                  ? 'bg-[#C5A059]/25 text-[#D4AF37] border-[#D4AF37]/70 font-semibold'
                  : 'bg-[#0D0F12]/60 text-[#A39E93] border-[#C5A059]/20 hover:text-[#F4F1EA] hover:border-[#C5A059]/45'
              }`}
            >
              {epoch.label}
            </button>
          );
        })}
      </div>

      {/* 4. Extremo Derecho: Coordenadas (18.7357° N, 70.1627° O) y Nivel de Zoom discretos */}
      <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-[#C5A059]/25 font-mono text-[11px] font-mono-tabular text-[#A39E93] whitespace-nowrap shrink-0">
        <span className="text-[#C5A059]">
          {latLabel}, {lngLabel}
        </span>
        <span aria-hidden="true" className="text-[#C5A059]/40">
          ·
        </span>
        <span className="text-[#F4F1EA]/90">Zoom {zoomLabel}</span>
      </div>
    </footer>
  );
}
