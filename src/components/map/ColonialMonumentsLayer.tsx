import React, { useMemo } from 'react';
import L from 'leaflet';
import { Marker, Tooltip } from 'react-leaflet';
import type { ColonialMonument } from '../../types/history';

interface ColonialMonumentsLayerProps {
  monuments: ColonialMonument[];
  selectedMonumentId: string | null;
  onSelectMonument: (monument: ColonialMonument) => void;
  visible: boolean;
}

function createColonialMonumentDivIcon(
  monument: ColonialMonument,
  isSelected: boolean
): L.DivIcon {
  const uid = monument.id;
  const scale = isSelected ? 1.15 : 1;
  const html = `
    <div style="display:flex;flex-direction:column;align-items:center;cursor:pointer;transform:scale(${scale});transform-origin:bottom center;transition:transform 0.2s ease;">
      <div style="position:relative;display:flex;align-items:center;justify-content:center;">
        <svg width="36" height="44" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 6px 10px rgba(0,0,0,0.85));">
          <defs>
            <linearGradient id="goldPinGrad-${uid}" x1="0" y1="0" x2="36" y2="44" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stop-color="#F7E5A9" />
              <stop offset="38%" stop-color="#D4AF37" />
              <stop offset="78%" stop-color="#9A7420" />
              <stop offset="100%" stop-color="#5E430C" />
            </linearGradient>
            <radialGradient id="innerDark-${uid}" cx="50%" cy="40%" r="50%">
              <stop offset="0%" stop-color="#221D15" />
              <stop offset="100%" stop-color="#0D0F12" />
            </radialGradient>
          </defs>
          <path d="M18 1.5C8.8873 1.5 1.5 8.8873 1.5 18C1.5 29.25 18 42.2 18 42.2C18 42.2 34.5 29.25 34.5 18C34.5 8.8873 27.1127 1.5 18 1.5Z" fill="url(#goldPinGrad-${uid})" stroke="${isSelected ? '#FFF4CC' : '#3A2A08'}" stroke-width="${isSelected ? '2' : '1.4'}" />
          <circle cx="18" cy="17.5" r="10.5" fill="url(#innerDark-${uid})" stroke="#D4AF37" stroke-width="1.2" />
          <path d="M12.5 22.5H23.5M13.5 20.5V15.5L18 12.2L22.5 15.5V20.5M16 20.5V17H20V20.5" stroke="#F4E09D" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div style="margin-top:-2px;padding:1px 6px;border-radius:3px;border:1px solid ${isSelected ? '#D4AF37' : 'rgba(197,160,89,0.5)'};background:${isSelected ? '#D4AF37' : 'rgba(13,15,18,0.92)'};color:${isSelected ? '#0D0F12' : '#F4F1EA'};font-family:monospace;font-size:9px;font-weight:700;letter-spacing:0.04em;white-space:nowrap;box-shadow:0 3px 8px rgba(0,0,0,0.85);">
        ${monument.shortName}
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'leaflet-div-icon',
    html,
    iconSize: [76, 56],
    iconAnchor: [38, 44],
  });
}

export default function ColonialMonumentsLayer({
  monuments,
  selectedMonumentId,
  onSelectMonument,
  visible,
}: ColonialMonumentsLayerProps) {
  const iconsById = useMemo(() => {
    const map = new Map<string, L.DivIcon>();
    for (const m of monuments) {
      map.set(m.id, createColonialMonumentDivIcon(m, selectedMonumentId === m.id));
    }
    return map;
  }, [monuments, selectedMonumentId]);

  if (!visible) return null;

  return (
    <>
      {monuments.map((monument) => {
        const isSelected = selectedMonumentId === monument.id;
        const icon =
          iconsById.get(monument.id) ??
          createColonialMonumentDivIcon(monument, isSelected);

        return (
          <Marker
            key={monument.id}
            position={[monument.lat, monument.lng]}
            icon={icon}
            zIndexOffset={isSelected ? 820 : 620}
            eventHandlers={{
              click: (e) => {
                L.DomEvent.stopPropagation(e.originalEvent);
                onSelectMonument(monument);
              },
            }}
          >
            <Tooltip
              direction="top"
              offset={[0, -42]}
              opacity={1}
              className="!bg-transparent !border-0 !shadow-none !p-0"
            >
              <div className="w-60 rounded-lg border border-[#D4AF37]/80 bg-[#0D0F12]/95 backdrop-blur-md p-2.5 shadow-[0_14px_32px_rgba(0,0,0,0.95)]">
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <span className="text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
                    {monument.heritageStatus} • {monument.yearBuilt}
                  </span>
                </div>
                <p className="font-display text-xs font-bold text-[#F4F1EA] leading-snug mb-1 whitespace-normal">
                  {monument.name}
                </p>
                <p className="text-[11px] text-[#A39E93] leading-relaxed line-clamp-2 whitespace-normal">
                  {monument.summary}
                </p>
                <div className="mt-1.5 pt-1 border-t border-[#C5A059]/20 flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#D4AF37] uppercase tracking-wider">
                    Wikipedia REST & Fotos →
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

export { ColonialMonumentsLayer };
