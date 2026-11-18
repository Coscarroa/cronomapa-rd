import { useState } from 'react';
import { AdvancedMarker } from '@vis.gl/react-google-maps';
import { Flag, Landmark, Swords } from 'lucide-react';
import type { HistoricalMilestone } from '../../types/history';

interface HistoricalMarkersLayerProps {
  milestones: HistoricalMilestone[];
  visible: boolean;
  selectedMilestoneId: string | null;
  onSelectMilestone: (milestone: HistoricalMilestone) => void;
}

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
        const isBattle = m.type === 'batalla';
        const isSelected = selectedMilestoneId === m.id;
        const isHovered = hoveredId === m.id;
        const primaryColor = isBattle ? '#9B2226' : '#D4AF37';
        const iconColor = isBattle ? '#F4F1EA' : '#0D0F12';

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
                  backgroundColor: isBattle
                    ? 'rgba(155, 34, 38, 0.42)'
                    : 'rgba(212, 175, 55, 0.38)',
                }}
              />

              {/* Circular Milestone Badge */}
              <div
                className={`relative flex items-center justify-center rounded-full border-2 transition-transform duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.65)] ${
                  isSelected ? 'w-9 h-9 scale-110' : 'w-7 h-7 group-hover:scale-110'
                }`}
                style={{
                  backgroundColor: primaryColor,
                  borderColor: isSelected ? '#F4F1EA' : 'rgba(244, 241, 234, 0.85)',
                  color: iconColor,
                }}
              >
                {isBattle ? (
                  <Swords className="w-3.5 h-3.5" />
                ) : m.type === 'proclamacion' ? (
                  <Flag className="w-3.5 h-3.5" />
                ) : (
                  <Landmark className="w-3.5 h-3.5" />
                )}
              </div>

              {/* Hover / Selected Floating Archival Tooltip */}
              {(isHovered || isSelected) && (
                <div className="pdi-scalable-label pointer-events-none absolute bottom-full mb-2.5 left-1/2 -translate-x-1/2 w-56 px-3 py-2 rounded-lg bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/45 shadow-[0_14px_34px_rgba(0,0,0,0.75)] text-left z-50 transition-all duration-200">
                  <div className="font-mono-tabular text-[10px] font-semibold text-[#C5A059] uppercase tracking-wider">
                    {m.epoch} · {m.year}
                  </div>
                  <div className="font-display text-xs font-semibold text-[#F4F1EA] leading-snug mt-0.5">
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
