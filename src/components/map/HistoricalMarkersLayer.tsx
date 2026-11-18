import React, { useMemo } from 'react';
import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import type {
  HistoricalMilestone,
  MilestoneCategory,
} from '../../types/history';

interface HistoricalMarkersLayerProps {
  milestones: HistoricalMilestone[];
  selectedMilestoneId: string | null;
  onSelectMilestone: (milestone: HistoricalMilestone) => void;
}

export const MILESTONE_CATEGORY_STYLE: Record<
  MilestoneCategory,
  {
    color: string;
    bg: string;
    border: string;
    text: string;
    label: string;
    glyph: string;
  }
> = {
  Política: {
    color: '#D4AF37',
    bg: '#D4AF37',
    border: '#F4F1EA',
    text: '#F4E09D',
    label: 'Política / Constitucional',
    glyph: '🏛',
  },
  Batalla: {
    color: '#E63946',
    bg: '#E63946',
    border: '#F4F1EA',
    text: '#FCA5A5',
    label: 'Batalla / Militar',
    glyph: '⚔',
  },
  Fundación: {
    color: '#2A9D8F',
    bg: '#2A9D8F',
    border: '#F4F1EA',
    text: '#6EE7B7',
    label: 'Fundación / Territorio',
    glyph: '◈',
  },
  Derechos: {
    color: '#3B82F6',
    bg: '#3B82F6',
    border: '#F4F1EA',
    text: '#93C5FD',
    label: 'Derechos / Sociedad',
    glyph: '★',
  },
};

function createMilestoneDivIcon(
  milestone: HistoricalMilestone,
  isSelected: boolean
): L.DivIcon {
  const style =
    MILESTONE_CATEGORY_STYLE[milestone.category] ??
    MILESTONE_CATEGORY_STYLE.Política;

  const size = isSelected ? 40 : 32;
  const ringShadow = isSelected
    ? `0 0 22px ${style.color}, 0 4px 12px rgba(0,0,0,0.85)`
    : `0 0 12px ${style.color}55, 0 4px 10px rgba(0,0,0,0.8)`;

  const html = `
    <div style="position:relative;display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;cursor:pointer;">
      <span style="position:absolute;inset:-4px;border-radius:9999px;border:1.5px solid ${style.color};opacity:${isSelected ? '0.95' : '0.45'};pointer-events:none;"></span>
      <div style="position:relative;display:flex;align-items:center;justify-content:center;width:${size}px;height:${size}px;border-radius:9999px;background:#0D0F12;border:2px solid ${style.color};box-shadow:${ringShadow};transition:transform 0.2s ease;">
        <span style="font-size:${isSelected ? '15px' : '13px'};line-height:1;color:${style.color};user-select:none;">${style.glyph}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'leaflet-div-icon',
    html,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
}

export default function HistoricalMarkersLayer({
  milestones,
  selectedMilestoneId,
  onSelectMilestone,
}: HistoricalMarkersLayerProps) {
  const iconsById = useMemo(() => {
    const map = new Map<string, L.DivIcon>();
    for (const m of milestones) {
      const isSelected = selectedMilestoneId === m.id;
      map.set(m.id, createMilestoneDivIcon(m, isSelected));
    }
    return map;
  }, [milestones, selectedMilestoneId]);

  return (
    <>
      {milestones.map((milestone) => {
        const isSelected = selectedMilestoneId === milestone.id;
        const style =
          MILESTONE_CATEGORY_STYLE[milestone.category] ??
          MILESTONE_CATEGORY_STYLE.Política;
        const icon =
          iconsById.get(milestone.id) ??
          createMilestoneDivIcon(milestone, isSelected);

        return (
          <Marker
            key={milestone.id}
            position={[milestone.lat, milestone.lng]}
            icon={icon}
            zIndexOffset={isSelected ? 750 : 520}
            eventHandlers={{
              click: (e) => {
                L.DomEvent.stopPropagation(e.originalEvent);
                onSelectMilestone(milestone);
              },
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -18]}
              opacity={1}
              permanent={isSelected}
              className="!bg-transparent !border-0 !shadow-none !p-0"
            >
              <div className="w-60 rounded-lg border border-[#C5A059]/60 bg-[#0D0F12]/95 backdrop-blur-md p-2.5 shadow-[0_14px_30px_rgba(0,0,0,0.92)]">
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span
                    className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded font-semibold"
                    style={{
                      backgroundColor: `${style.color}26`,
                      color: style.color,
                      border: `1px solid ${style.color}55`,
                    }}
                  >
                    {milestone.year}
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-[#9A9589]">
                    {milestone.epoch} · {milestone.category}
                  </span>
                </div>
                <p className="font-display text-xs font-bold text-[#F4F1EA] leading-snug mb-1 whitespace-normal">
                  {milestone.title}
                </p>
                <p className="text-[11px] text-[#A39E93] leading-relaxed line-clamp-2 whitespace-normal">
                  {milestone.summary}
                </p>
                <div className="mt-1.5 pt-1 border-t border-[#C5A059]/20 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider">
                    {milestone.province} · Abrir ficha →
                  </span>
                </div>
              </div>
            </Tooltip>
          </Marker>
        );
      })}
    </>
  );
}

export { HistoricalMarkersLayer };
