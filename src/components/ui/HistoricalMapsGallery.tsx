import { useEffect, useState } from 'react';
import {
  BookOpen,
  Layers,
  MapPin,
  RotateCcw,
  ScrollText,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { VINTAGE_MAPS_DATA } from '../../data/vintageMapsData';
import type { VintageMapItem } from '../../types/history';

interface HistoricalMapsGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  activeOverlayId: string | null;
  onOverlayOnMap: (mapItem: VintageMapItem) => void;
  onClearOverlay: () => void;
}

export default function HistoricalMapsGallery({
  isOpen,
  onClose,
  activeOverlayId,
  onOverlayOnMap,
  onClearOverlay,
}: HistoricalMapsGalleryProps) {
  const [selectedMap, setSelectedMap] = useState<VintageMapItem>(VINTAGE_MAPS_DATA[0]);
  const [viewerZoom, setViewerZoom] = useState<number>(1);
  const [imgSrc, setImgSrc] = useState<string>(VINTAGE_MAPS_DATA[0].imageUrl);

  useEffect(() => {
    setImgSrc(selectedMap.imageUrl);
    setViewerZoom(1);
  }, [selectedMap]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const isOverlayActive = activeOverlayId === selectedMap.id;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Galería de Mapas Antiguos de La Española y República Dominicana"
      className="fixed inset-0 z-[1100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
    >
      <div className="w-full max-w-6xl h-[90vh] max-h-[820px] bg-[#161920] border border-[#C5A059]/45 rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden text-[#F4F1EA]">
        {/* Modal Header */}
        <div className="px-5 py-3.5 border-b border-[#C5A059]/25 bg-[#0D0F12]/90 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-[#161920] border border-[#C5A059]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <ScrollText className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                Cartografía Histórica · Dominio Público
              </div>
              <h2 className="font-display text-base sm:text-lg font-semibold text-[#F4F1EA] truncate">
                Galería de Mapas Antiguos y Superposición Geográfica
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar galería de mapas antiguos"
            className="min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg border border-[#C5A059]/30 bg-[#161920] text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#D4AF37] transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Gallery Body */}
        <div className="flex-1 min-h-0 flex flex-col md:flex-row overflow-hidden">
          {/* Left Map List */}
          <div className="w-full md:w-80 shrink-0 border-b md:border-b-0 md:border-r border-[#C5A059]/25 bg-[#0D0F12]/60 overflow-y-auto gis-scroll p-3 space-y-2">
            {VINTAGE_MAPS_DATA.map((item) => {
              const selected = item.id === selectedMap.id;
              const activeOnMap = activeOverlayId === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedMap(item)}
                  className={`w-full text-left p-3 rounded-xl border transition-colors ${
                    selected
                      ? 'bg-[#1D3557]/80 border-[#D4AF37] shadow-lg'
                      : 'bg-[#161920]/80 border-[#C5A059]/20 hover:border-[#C5A059]/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono-tabular text-[11px] font-semibold text-[#D4AF37]">
                      {item.yearLabel}
                    </span>
                    {activeOnMap && (
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F4F1EA] bg-[#9B2226] px-2 py-0.5 rounded">
                        Calco activo
                      </span>
                    )}
                  </div>
                  <div className="font-display text-sm font-semibold text-[#F4F1EA] mt-1 leading-snug">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-[#A39E93] mt-1 truncate">{item.author}</div>
                </button>
              );
            })}
          </div>

          {/* Right Zoom Viewer + Metadata */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Zoom Controls Bar */}
            <div className="px-4 py-2.5 border-b border-[#C5A059]/20 bg-[#0D0F12]/50 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setViewerZoom((z) => Math.max(1, Number((z - 0.35).toFixed(2))))}
                  disabled={viewerZoom <= 1}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#C5A059]/30 bg-[#161920] text-[#F4F1EA] hover:border-[#D4AF37] disabled:opacity-40 transition-colors"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                  <span>Alejar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewerZoom((z) => Math.min(3.5, Number((z + 0.35).toFixed(2))))}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#C5A059]/30 bg-[#161920] text-[#F4F1EA] hover:border-[#D4AF37] transition-colors"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Acercar</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewerZoom(1)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg border border-[#C5A059]/30 bg-[#161920] text-[#A39E93] hover:text-[#F4F1EA] transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="font-mono-tabular">{Math.round(viewerZoom * 100)}%</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                {isOverlayActive && (
                  <button
                    type="button"
                    onClick={onClearOverlay}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-[#C5A059]/40 bg-[#9B2226] hover:bg-[#7F1D1D] text-[#F4F1EA] transition-colors"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Quitar Calco</span>
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => onOverlayOnMap(selectedMap)}
                  className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] shadow-lg transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Superponer sobre el Mapa Actual</span>
                </button>
              </div>
            </div>

            {/* Interactive Image Viewport */}
            <div className="flex-1 min-h-0 overflow-auto gis-scroll bg-[#0A0C0F] flex items-center justify-center p-4">
              <div
                className="transition-transform duration-200 origin-center"
                style={{ transform: `scale(${viewerZoom})` }}
              >
                <img
                  src={imgSrc}
                  alt={selectedMap.title}
                  referrerPolicy="no-referrer"
                  onError={() => {
                    if (imgSrc !== selectedMap.fallbackUrl) {
                      setImgSrc(selectedMap.fallbackUrl);
                    }
                  }}
                  className="max-h-[48vh] md:max-h-[54vh] w-auto object-contain rounded-lg border border-[#C5A059]/35 shadow-2xl"
                />
              </div>
            </div>

            {/* Museographic Footer */}
            <div className="px-5 py-3.5 border-t border-[#C5A059]/25 bg-[#0D0F12]/80 space-y-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-display text-sm font-semibold text-[#F4F1EA]">
                  {selectedMap.title}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[#C5A059]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>{selectedMap.archive}</span>
                </span>
              </div>
              <p className="text-xs text-[#A39E93] leading-relaxed">{selectedMap.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
