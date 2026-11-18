import { useEffect, useRef, useState } from 'react';
import { getEpochForYear, type HistoricalEpochDefinition } from '../../data/historicalLayersData';

interface TimelineTransitionOverlayProps {
  year: number;
}

export default function TimelineTransitionOverlay({ year }: TimelineTransitionOverlayProps) {
  const currentEpoch = getEpochForYear(year);
  const previousEpochIdRef = useRef<string>(currentEpoch.id);
  const [activeStamp, setActiveStamp] = useState<{
    epoch: HistoricalEpochDefinition;
    displayYear: number;
    key: number;
  } | null>(null);

  useEffect(() => {
    if (previousEpochIdRef.current !== currentEpoch.id) {
      previousEpochIdRef.current = currentEpoch.id;
      const key = Date.now();
      setActiveStamp({
        epoch: currentEpoch,
        displayYear: year,
        key,
      });

      const timer = window.setTimeout(() => {
        setActiveStamp((curr) => (curr?.key === key ? null : curr));
      }, 900);

      return () => window.clearTimeout(timer);
    }
    return undefined;
  }, [currentEpoch, year]);

  return (
    <>
      {/* Subtle Cartographic Reticle Marks Along Map Borders */}
      <div
        className="pointer-events-none absolute inset-0 z-[410] overflow-hidden"
        aria-hidden="true"
      >
        {/* Top & Bottom degree tick marks */}
        <div className="absolute inset-x-10 top-0 h-2.5 flex justify-between opacity-35">
          {Array.from({ length: 13 }).map((_, idx) => (
            <span
              key={`top-tick-${idx}`}
              className={`w-px bg-[#C5A059] ${idx % 3 === 0 ? 'h-2.5' : 'h-1.5'}`}
            />
          ))}
        </div>
        <div className="absolute inset-x-10 bottom-0 h-2.5 flex justify-between items-end opacity-35">
          {Array.from({ length: 13 }).map((_, idx) => (
            <span
              key={`bot-tick-${idx}`}
              className={`w-px bg-[#C5A059] ${idx % 3 === 0 ? 'h-2.5' : 'h-1.5'}`}
            />
          ))}
        </div>
        {/* Left & Right degree tick marks */}
        <div className="absolute inset-y-10 left-0 w-2.5 flex flex-col justify-between opacity-35">
          {Array.from({ length: 9 }).map((_, idx) => (
            <span
              key={`left-tick-${idx}`}
              className={`h-px bg-[#C5A059] ${idx % 2 === 0 ? 'w-2.5' : 'w-1.5'}`}
            />
          ))}
        </div>
        <div className="absolute inset-y-10 right-0 w-2.5 flex flex-col justify-between items-end opacity-35">
          {Array.from({ length: 9 }).map((_, idx) => (
            <span
              key={`right-tick-${idx}`}
              className={`h-px bg-[#C5A059] ${idx % 2 === 0 ? 'w-2.5' : 'w-1.5'}`}
            />
          ))}
        </div>

        {/* Minimalist Golden SVG Compass Rose in Free Corner */}
        <div className="hidden sm:block absolute bottom-20 right-4 opacity-40">
          <svg
            viewBox="0 0 84 84"
            className="w-16 h-16 text-[#D4AF37]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="42" cy="42" r="34" stroke="currentColor" strokeWidth="0.9" strokeDasharray="3 3" />
            <circle cx="42" cy="42" r="24" stroke="currentColor" strokeWidth="0.7" opacity="0.7" />
            {/* North-South & East-West needles */}
            <polygon points="42,8 46.5,38 42,42 37.5,38" fill="currentColor" />
            <polygon points="42,76 46.5,46 42,42 37.5,46" stroke="currentColor" strokeWidth="1" fill="none" />
            <polygon points="76,42 46,46.5 42,42 46,37.5" fill="currentColor" opacity="0.65" />
            <polygon points="8,42 38,46.5 42,42 38,37.5" stroke="currentColor" strokeWidth="1" fill="none" />
            <circle cx="42" cy="42" r="2.6" fill="#0D0F12" stroke="currentColor" strokeWidth="1.2" />
            <text
              x="42"
              y="6.5"
              textAnchor="middle"
              fill="currentColor"
              fontSize="7"
              fontFamily="Playfair Display, serif"
              fontWeight="700"
            >
              N
            </text>
          </svg>
        </div>
      </div>

      {/* Centered Chronos Stamp (900ms smooth transition on epoch change) */}
      {activeStamp && (
        <div
          key={activeStamp.key}
          aria-live="polite"
          className="pointer-events-none absolute inset-0 z-[880] flex items-center justify-center px-6"
        >
          <div className="chronos-stamp text-center px-8 py-5 rounded-2xl bg-[#0D0F12]/72 backdrop-blur-md border border-[#C5A059]/35 shadow-[0_20px_50px_rgba(0,0,0,0.7)] max-w-lg">
            <div className="flex items-center justify-center gap-3 mb-1.5">
              <span className="h-px w-8 bg-[#C5A059]/60" />
              <span className="font-mono-tabular text-xs tracking-[0.22em] uppercase text-[#C5A059]">
                {activeStamp.displayYear}
              </span>
              <span className="h-px w-8 bg-[#C5A059]/60" />
            </div>
            <div className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#D4AF37]">
              {activeStamp.epoch.label}
            </div>
            <div className="text-xs sm:text-sm text-[#F4F1EA]/90 mt-1.5">
              {activeStamp.epoch.subtitle}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
