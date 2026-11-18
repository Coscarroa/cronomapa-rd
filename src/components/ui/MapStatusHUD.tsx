import { Crosshair } from 'lucide-react';
import { useCronoMapa } from '../../context/CronoMapaContext';

export default function MapStatusHUD() {
  const { cursorCoords, zoom, resetView } = useCronoMapa();
  const latLabel = `${Math.abs(cursorCoords.lat).toFixed(4)}° ${cursorCoords.lat >= 0 ? 'N' : 'S'}`;
  const lngLabel = `${Math.abs(cursorCoords.lng).toFixed(4)}° ${cursorCoords.lng >= 0 ? 'E' : 'O'}`;

  return (
    <div className="absolute top-3 right-16 z-[850] hidden sm:flex items-center gap-3 px-3.5 py-2 bg-[#161920]/85 backdrop-blur-xl border border-[#C5A059]/30 rounded-lg shadow-[0_12px_32px_rgba(0,0,0,0.65)]">
      <div className="font-mono text-xs text-[#C5A059] font-mono-tabular whitespace-nowrap">
        {latLabel}, {lngLabel}
        <span className="mx-2 text-[#A39E93]" aria-hidden="true">
          ·
        </span>
        <span className="text-[#F4F1EA]">Zoom {zoom.toFixed(2).replace(/\.00$/, '')}</span>
      </div>

      <button
        type="button"
        onClick={resetView}
        title="Centrar en La Española"
        aria-label="Centrar mapa en La Española"
        className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#D4AF37] hover:bg-[#C5A059]/15 rounded transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
      >
        <Crosshair className="w-3.5 h-3.5 shrink-0" />
        <span>La Española</span>
      </button>
    </div>
  );
}
