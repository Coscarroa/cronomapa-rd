import { useEffect, useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Building2, Castle, Church, Compass, Landmark } from 'lucide-react';
import {
  COLONIAL_MONUMENTS,
  fetchMonumentWikipediaImages,
  getCachedMonumentWikipediaImages,
} from '../../data/colonialMonumentsData.js';
import type { ColonialMonument, MonumentCategory } from '../../types/history';

interface ColonialMonumentsLayerProps {
  monuments?: ColonialMonument[];
  visible?: boolean;
  opacity?: number;
  selectedMonumentId: string | null;
  onSelectMonument: (monument: ColonialMonument) => void;
}

function MonumentIcon({ category }: { category: MonumentCategory }) {
  if (category === 'fortaleza') return <Castle className="w-3.5 h-3.5" />;
  if (category === 'iglesia') return <Church className="w-3.5 h-3.5" />;
  if (category === 'palacio') return <Building2 className="w-3.5 h-3.5" />;
  if (category === 'villa') return <Compass className="w-3.5 h-3.5" />;
  return <Landmark className="w-3.5 h-3.5" />;
}

const CATEGORY_LABEL: Record<MonumentCategory, string> = {
  fortaleza: 'Fortaleza Colonial',
  ruinas: 'Ruinas Históricas',
  iglesia: 'Templo / Convento',
  palacio: 'Palacio / Audiencia',
  villa: 'Asentamiento Fundacional',
};

function BronzeGoldPin({
  monumentId,
  category,
  isSelected,
  isHovered,
}: {
  monumentId: string;
  category: MonumentCategory;
  isSelected: boolean;
  isHovered: boolean;
}) {
  const active = isSelected || isHovered;
  const gradId = `bronze-gold-${monumentId}-${isSelected ? 'active' : 'base'}`;

  return (
    <div
      className={`relative flex flex-col items-center transition-transform duration-300 ease-out ${
        isSelected
          ? '-translate-y-1.5 scale-115'
          : isHovered
            ? '-translate-y-1 scale-110'
            : 'translate-y-0 scale-100'
      }`}
    >
      {/* Subtle ground contact shadow */}
      <span
        aria-hidden="true"
        className={`absolute -bottom-1 w-4 h-1.5 rounded-full bg-black/65 blur-[2px] transition-all duration-300 ${
          active ? 'scale-110 opacity-85' : 'opacity-65'
        }`}
      />

      {/* Soft golden-bronze aura on selection or hover */}
      {active && (
        <span
          aria-hidden="true"
          className="absolute top-0.5 w-10 h-10 rounded-full bg-[#D4AF37]/30 blur-[3px] animate-pulse pointer-events-none"
        />
      )}

      {/* Architectural Golden-Bronze Teardrop Pin */}
      <div className="relative w-9 h-11 drop-shadow-[0_6px_12px_rgba(0,0,0,0.75)]">
        <svg viewBox="0 0 36 44" className="w-full h-full overflow-visible" aria-hidden="true">
          <defs>
            <linearGradient id={gradId} x1="15%" y1="5%" x2="85%" y2="95%">
              <stop offset="0%" stopColor={isSelected ? '#FFF1B8' : '#F3D98B'} />
              <stop offset="35%" stopColor={isSelected ? '#E2B84A' : '#C89B3C'} />
              <stop offset="72%" stopColor={isSelected ? '#B87E24' : '#96621E'} />
              <stop offset="100%" stopColor="#5C380E" />
            </linearGradient>
          </defs>

          {/* Outer sculpted pin silhouette */}
          <path
            d="M18 1.5C8.887 1.5 1.5 8.887 1.5 18c0 10.67 13.38 22.12 15.65 24.02a1.32 1.32 0 0 0 1.7 0C21.12 40.12 34.5 28.67 34.5 18 34.5 8.887 27.113 1.5 18 1.5Z"
            fill={`url(#${gradId})`}
            stroke={isSelected ? '#F4F1EA' : '#F3D98B'}
            strokeWidth={isSelected ? '1.75' : '1.25'}
          />

          {/* Engraved inner bronze bezel */}
          <circle
            cx="18"
            cy="17.5"
            r="11.2"
            fill="#221509"
            stroke="#D4AF37"
            strokeOpacity={isSelected ? '0.95' : '0.65'}
            strokeWidth="1.1"
          />
        </svg>

        {/* Centered category emblem inside medallion */}
        <div
          className={`absolute left-1/2 top-[17.5px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-colors duration-200 ${
            isSelected ? 'text-[#FFF1B8]' : 'text-[#E7C66C] group-hover:text-[#FFF1B8]'
          }`}
        >
          <MonumentIcon category={category} />
        </div>
      </div>
    </div>
  );
}

export default function ColonialMonumentsLayer({
  monuments,
  visible = true,
  opacity = 1,
  selectedMonumentId,
  onSelectMonument,
}: ColonialMonumentsLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewImages, setPreviewImages] = useState<Record<string, string>>({});

  const items: ColonialMonument[] =
    monuments ?? (COLONIAL_MONUMENTS as ColonialMonument[]);

  const activePreviewId = hoveredId || selectedMonumentId;

  useEffect(() => {
    if (!activePreviewId || previewImages[activePreviewId]) return;
    const monument = items.find((m) => m.id === activePreviewId);
    if (!monument) return;

    const cached = getCachedMonumentWikipediaImages(monument);
    const cachedImage = cached?.primaryImage;
    if (cachedImage) {
      setPreviewImages((prev) => ({
        ...prev,
        [monument.id]: cachedImage,
      }));
      return;
    }

    const controller = new AbortController();
    fetchMonumentWikipediaImages(monument, { signal: controller.signal })
      .then((res) => {
        const loadedImage = res?.primaryImage;
        if (!controller.signal.aborted && loadedImage) {
          setPreviewImages((prev) => ({
            ...prev,
            [monument.id]: loadedImage,
          }));
        }
      })
      .catch(() => {
        // Tooltip still renders cleanly without preview thumbnail
      });

    return () => controller.abort();
  }, [activePreviewId, items, previewImages]);

  if (!visible || items.length === 0) return null;

  return (
    <>
      {items.map((monument) => {
        const isSelected = selectedMonumentId === monument.id;
        const isHovered = hoveredId === monument.id;
        const previewThumb = previewImages[monument.id];

        return (
          <AdvancedMarker
            key={monument.id}
            position={{ lat: monument.lat, lng: monument.lng }}
            zIndex={isSelected ? 930 : isHovered ? 880 : 650}
            title={`${monument.shortName} (${monument.yearBuilt}) · Monumento Colonial`}
            onClick={() => onSelectMonument(monument)}
          >
            <div
              className="relative flex flex-col items-center cursor-pointer group"
              style={{ opacity }}
              onMouseEnter={() => setHoveredId(monument.id)}
              onMouseLeave={() => setHoveredId((cur) => (cur === monument.id ? null : cur))}
            >
              <BronzeGoldPin
                monumentId={monument.id}
                category={monument.category}
                isSelected={isSelected}
                isHovered={isHovered}
              />

              {/* Floating Archival Tooltip with Wikipedia Image Preview */}
              {(isHovered || isSelected) && (
                <div className="pointer-events-none absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-64 rounded-xl bg-[#161920]/95 backdrop-blur-xl border border-[#D4AF37]/55 shadow-[0_18px_40px_rgba(0,0,0,0.88)] text-left overflow-hidden z-50">
                  {previewThumb && (
                    <div className="relative h-24 w-full bg-[#0D0F12] border-b border-[#C5A059]/25 overflow-hidden">
                      <img
                        src={previewThumb}
                        alt={monument.shortName}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-[#0D0F12]/80 border border-[#D4AF37]/40 font-mono-tabular text-[9px] text-[#D4AF37]">
                        Wikipedia
                      </span>
                    </div>
                  )}
                  <div className="px-3 py-2.5">
                    <div className="font-mono-tabular text-[10px] font-semibold text-[#D4AF37] uppercase tracking-wider">
                      {CATEGORY_LABEL[monument.category]} · {monument.yearBuilt}
                    </div>
                    <div className="font-display text-xs font-semibold text-[#F4F1EA] leading-snug mt-0.5">
                      {monument.shortName}
                    </div>
                    <div className="text-[10px] text-[#A39E93] mt-1 line-clamp-2 leading-relaxed">
                      {monument.summary}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </AdvancedMarker>
        );
      })}
    </>
  );
}
