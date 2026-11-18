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
  } = useCronoMapa();

  const currentEpoch = getEpochForYear(maxYear);

  return (
    <section
      aria-label="Línea de tiempo cartográfica"
      className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[870] w-[94vw] max-w-2xl"
    >
      <div className="bg-[#161920]/85 backdrop-blur-xl border border-[#C5A059]/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] px-4 sm:px-5 py-3 space-y-2.5">
        {/* Top Row: Serif Year, Epoch Name, Territory Sync Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-baseline gap-2.5 min-w-0">
            <span className="font-display text-xl sm:text-2xl font-semibold text-[#D4AF37] leading-none font-mono-tabular">
              {maxYear}
            </span>
            <span className="text-xs font-medium text-[#F4F1EA] truncate">
              {currentEpoch.label}
            </span>
            <span className="font-mono-tabular text-[11px] text-[#A39E93] hidden sm:inline whitespace-nowrap">
              · {filteredEvents.length} hechos
            </span>
          </div>

          <button
            type="button"
            onClick={() => setSyncTerritoryWithYear(!syncTerritoryWithYear)}
            aria-pressed={syncTerritoryWithYear}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
              syncTerritoryWithYear
                ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37]'
                : 'bg-[#0D0F12]/70 text-[#F4F1EA] border-[#C5A059]/30 hover:border-[#D4AF37]'
            }`}
          >
            <Layers className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">Sincronizar territorio</span>
            <span className="sm:hidden">Territorio</span>
          </button>
        </div>

        {/* Cartographic Ruler Slider with Golden Graduation Ticks */}
        <div className="relative pt-1 pb-0.5">
          <div
            className="pointer-events-none flex justify-between px-1 mb-1 opacity-55"
            aria-hidden="true"
          >
            {Array.from({ length: 25 }).map((_, idx) => (
              <span
                key={`ruler-tick-${idx}`}
                className={`w-px bg-[#C5A059] ${idx % 4 === 0 ? 'h-2' : 'h-1'}`}
              />
            ))}
          </div>

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
        </div>

        {/* Period Indicators Row */}
        <div className="hidden sm:flex items-center justify-between gap-1.5 overflow-x-auto gis-scroll">
          {HISTORICAL_EPOCHS.map((epoch) => {
            const active = currentEpoch.id === epoch.id;
            return (
              <button
                key={epoch.id}
                type="button"
                onClick={() => setMaxYear(epoch.jumpYear)}
                className={`px-2.5 py-1 text-[11px] font-medium rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  active
                    ? 'bg-[#C5A059]/20 text-[#D4AF37] border-[#D4AF37]/60'
                    : 'bg-[#0D0F12]/50 text-[#A39E93] border-[#C5A059]/20 hover:text-[#F4F1EA] hover:border-[#C5A059]/45'
                }`}
              >
                {epoch.label}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
