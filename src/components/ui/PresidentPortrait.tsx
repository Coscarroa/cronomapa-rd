import { useEffect, useState, type KeyboardEvent, type MouseEvent } from 'react';
import { ZoomIn } from 'lucide-react';
import { isCollegiateEntityName } from '../../services/wikipediaPortraitsService';

export interface PresidentPortraitProps {
  name: string;
  fotoUrl?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  shape?: 'circle' | 'rounded';
  isLoading?: boolean;
  isArchival?: boolean;
  accentColor?: string;
  className?: string;
  interactive?: boolean;
  interactiveLabel?: string;
  onClick?: (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => void;
}

const SIZE_CLASSES: Record<NonNullable<PresidentPortraitProps['size']>, string> = {
  xs: 'w-8 h-8 text-[10px]',
  sm: 'w-9 h-9 text-[11px]',
  md: 'w-11 h-11 text-xs',
  lg: 'w-16 h-16 text-base',
  xl: 'w-20 h-20 text-lg',
};

function getInitials(name: string): string {
  const clean = name
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 2 || /^[A-ZÁÉÍÓÚ]/.test(w));
  if (clean.length === 0) return 'RD';
  if (clean.length === 1) return clean[0].slice(0, 2).toUpperCase();
  return `${clean[0][0]}${clean[clean.length - 1][0]}`.toUpperCase();
}

export default function PresidentPortrait({
  name,
  fotoUrl,
  size = 'md',
  shape = 'circle',
  isLoading = false,
  isArchival = true,
  accentColor = '#1B3B82',
  className = '',
  interactive,
  interactiveLabel = 'Ver biografía y balance',
  onClick,
}: PresidentPortraitProps) {
  const [hasError, setHasError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setHasError(false);
    setImageLoaded(false);
  }, [fotoUrl]);

  const showImage = Boolean(fotoUrl) && !hasError;
  const isCollegiate = isCollegiateEntityName(name);
  const initials = getInitials(name);
  const shapeClass = shape === 'rounded' ? 'rounded-lg' : 'rounded-full';
  const isInteractive = interactive ?? Boolean(onClick);
  const isLarge = size === 'lg' || size === 'xl';

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isInteractive || !onClick) return;
    e.stopPropagation();
    onClick(e);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!isInteractive || !onClick) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      e.stopPropagation();
      onClick(e);
    }
  };

  return (
    <div
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `${interactiveLabel}: ${name}` : undefined}
      onClick={isInteractive ? handleClick : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
      className={`group relative ${shapeClass} overflow-hidden shrink-0 border border-[#C5A059]/50 bg-[#161920] shadow-sm flex items-center justify-center select-none transition-all duration-300 hover:border-[#D4AF37] ${
        isInteractive
          ? 'cursor-pointer hover:ring-2 hover:ring-[#D4AF37]/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]'
          : ''
      } ${SIZE_CLASSES[size]} ${className}`}
      style={{
        background: showImage
          ? '#161920'
          : `radial-gradient(circle at 30% 25%, rgba(212, 175, 55, 0.2), ${accentColor} 55%, #0D0F12 100%)`,
      }}
      title={isInteractive ? `${interactiveLabel} · ${name}` : name}
    >
      {/* Subtle golden loading shimmer while MediaWiki API resolves */}
      {(isLoading || (showImage && !imageLoaded)) && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-[#161920] via-[#C5A059]/20 to-[#161920] animate-pulse"
        />
      )}

      {showImage ? (
        <img
          src={fotoUrl}
          alt={`Retrato oficial de ${name}`}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => {
            setHasError(true);
            setImageLoaded(false);
          }}
          className={`relative z-10 w-full h-full object-cover object-top transition-all duration-300 ${
            isArchival
              ? 'contrast-[1.05] brightness-[0.96] group-hover:brightness-105 group-hover:contrast-100'
              : 'group-hover:scale-105'
          } ${isInteractive ? 'group-hover:scale-105' : ''} ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ) : (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
          {/* Stylized bronze/gold silhouette or collegiate crest */}
          <svg
            viewBox="0 0 40 40"
            className="absolute inset-0 w-full h-full opacity-25 pointer-events-none"
            aria-hidden="true"
          >
            {isCollegiate ? (
              <path
                d="M20 6 L31 11 V20 C31 27 26 32 20 35 C14 32 9 27 9 20 V11 Z"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.6"
              />
            ) : (
              <g fill="#C5A059">
                <circle cx="20" cy="14.5" r="5.5" />
                <path d="M9.5 34 C10.5 25.5 14.8 22.5 20 22.5 C25.2 22.5 29.5 25.5 30.5 34 Z" />
              </g>
            )}
          </svg>
          <span className="relative font-display font-semibold tracking-wider text-[#D4AF37] drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
            {initials}
          </span>
        </div>
      )}

      {/* Interactive hover magnifying-glass overlay */}
      {isInteractive && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-20 bg-[#0D0F12]/65 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-0.5 p-1 text-[#F4F1EA]"
        >
          <ZoomIn
            className={`${isLarge ? 'w-5 h-5' : 'w-3.5 h-3.5'} text-[#D4AF37] drop-shadow`}
          />
          {isLarge && (
            <span className="text-[9px] font-medium leading-tight text-center text-[#F4F1EA] px-1">
              Ver biografía
            </span>
          )}
        </div>
      )}
    </div>
  );
}
