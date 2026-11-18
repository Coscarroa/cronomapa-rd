import { useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Flag, Landmark, Scale, Swords } from 'lucide-react';
import type { HistoricalMilestone, MilestoneCategory } from '../../types/history';

interface HistoricalMarkersLayerProps {
  milestones: HistoricalMilestone[];
  visible: boolean;
  selectedMilestoneId: string | null;
  onSelectMilestone: (milestone: HistoricalMilestone) => void;
}

export const MILESTONE_CATEGORY_STYLE: Record<
  MilestoneCategory,
  { bg: string; pulse: string; text: string; label: string }
> = {
  Política: {
    bg: '#2563EB',
    pulse: 'rgba(37, 99, 235, 0.38)',
    text: '#F4F1EA',
    label: 'Política',
  },
  Batalla: {
    bg: '#DC2626',
    pulse: 'rgba(220, 38, 38, 0.42)',
    text: '#F4F1EA',
    label: 'Batalla',
  },
  Fundación: {
    bg: '#D97706',
    pulse: 'rgba(217, 119, 6, 0.38)',
    text: '#0D0F12',
    label: 'Fundación',
  },
  Derechos: {
    bg: '#0D9488',
    pulse: 'rgba(13, 148, 136, 0.40)',
    text: '#F4F1EA',
    label: 'Derechos',
  },
};

export default function HistoricalMarkersLayer({
  milestones,
  visible,
  selectedMilestoneId,
  onSelectMilestone,
}: HistoricalMarkersLayerProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  if (!visible || milestones.length === 0) return null;

  return (
    <>
      {milestones.map((m) => {
        const catStyle = MILESTONE_CATEGORY_STYLE[m.category] ?? MILESTONE_CATEGORY_STYLE.Fundación;
        const isSelected = selectedMilestoneId === m.id;
        const isHovered = hoveredId === m.id;

        return (
          <AdvancedMarker
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            zIndex={isSelected ? 900 : isHovered ? 850 : 600}
            title={`${m.title} (${m.date})`}
            onClick={() => onSelectMilestone(m)}
          >
            <div
              className="relative flex items-center justify-center cursor-pointer group"
              onMouseEnter={() => setHoveredId(m.id)}
              onMouseLeave={() => setHoveredId((cur) => (cur === m.id ? null : cur))}
            >
              {/* Pulsing archival aura */}
              <span
                aria-hidden="true"
                className="crono-pulse-ring absolute w-9 h-9 rounded-full pointer-events-none"
                style={{
                  backgroundColor: catStyle.pulse,
                }}
              />

              {/* Circular Milestone Badge */}
              <div
                className={`relative flex items-center justify-center rounded-full border-2 transition-transform duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.65)] ${
                  isSelected ? 'w-9 h-9 scale-110' : 'w-7 h-7 group-hover:scale-110'
                }`}
                style={{
                  backgroundColor: catStyle.bg,
                  borderColor: isSelected ? '#F4F1EA' : 'rgba(244, 241, 234, 0.85)',
                  color: catStyle.text,
                }}
              >
                {m.category === 'Batalla' ? (
                  <Swords className="w-3.5 h-3.5" />
                ) : m.category === 'Política' ? (
                  <Flag className="w-3.5 h-3.5" />
                ) : m.category === 'Derechos' ? (
                  <Scale className="w-3.5 h-3.5" />
                ) : (
                  <Landmark className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Hover / Selected Floating Archival Tooltip */}
              {(isHovered || isSelected) && (
                <div className="pdi-scalable-label pointer-events-none absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-60 px-3 py-2 rounded-lg bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/45 shadow-[0_14px_34px_rgba(0,0,0,0.75)] text-left z-50 transition-all duration-200">
                  <div className="flex items-center justify-between gap-1.5 font-mono-tabular text-[10px] font-semibold text-[#C5A059] uppercase tracking-wider">
                    <span>
                      {m.epoch} · {m.year}
                    </span>
                    <span
                      className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                      style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
                    >
                      {catStyle.label}
                    </span>
                  </div>
                  <div className="font-display text-xs font-semibold text-[#F4F1EA] leading-snug mt-1">
                    {m.title}
                  </div>
                  <div className="text-[10px] text-[#A39E93] mt-0.5">{m.date}</div>
                </div>
              )}
            </div>
          </AdvancedMarker>
        );
      })}
    </>
  );
}
