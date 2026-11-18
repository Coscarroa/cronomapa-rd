import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Compass,
  Layers,
  MapPin,
  Route,
  ScrollText,
  Share2,
  SplitSquareHorizontal,
  Swords,
  X,
} from 'lucide-react';

export interface CronoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  resetKey?: number;
}

interface GuideStep {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  highlightBadge: string;
}

const GUIDE_STEPS: GuideStep[] = [
  {
    id: 1,
    subtitle: 'NAVEGACIÓN CRONOLÓGICA',
    title: '1. Viaja por la Historia de la Isla',
    description:
      'Usa la línea de tiempo en la parte inferior del mapa para desplazarte por las grandes épocas de la República Dominicana: desde los Cacicazgos Taínos de 1492 y la época Colonial, hasta la Independencia de 1844, la Restauración y nuestras 32 divisiones actuales.',
    highlightBadge: '1492 · 1844 · 1863 · 2026',
  },
  {
    id: 2,
    subtitle: 'CARTOGRAFÍA INTERACTIVA',
    title: '2. Haz Clic en Cacicazgos o Provincias',
    description:
      'Selecciona cualquier territorio iluminado en el mapa. El panel lateral desplegará su ficha histórica, caciques o gobernantes, límites geográficos reales y la evolución de sus comunidades a través de los siglos.',
    highlightBadge: 'Límites Reales GeoJSON + Fichas',
  },
  {
    id: 3,
    subtitle: 'GESTAS Y EXPEDICIONES',
    title: '3. Revive Batallas y Rutas Históricas',
    description:
      "Activa los marcadores de hitos históricos para ubicar batallas clave como el 19 y 30 de Marzo o el Grito de Capotillo. También puedes abrir 'Rutas Históricas' para ver en movimiento expediciones colombinas y campañas militares paso a paso.",
    highlightBadge: 'Hitos Pulsantes + Reproductor de Rutas',
  },
  {
    id: 4,
    subtitle: 'EVOLUCIÓN TERRITORIAL',
    title: '4. Desliza la Cortina: Antes vs. Hoy',
    description:
      "Pulsa el botón 'Comparar: Antes vs. Hoy' en la barra superior. Arrastra la línea dorada con el mouse o tu dedo para superponer los 5 Cacicazgos Taínos o las 5 Provincias Originales de 1844 directamente sobre las provincias modernas.",
    highlightBadge: 'Comparación Split-Screen',
  },
  {
    id: 5,
    subtitle: 'ARCHIVO CARTOGRÁFICO',
    title: '5. Superpón Mapas Antiguos Reales',
    description:
      "Explora cartas náuticas y mapas históricos auténticos (como el mapa de Casimiro Nemesio de Moya de 1905) en la sección 'Mapas Antiguos'. Usa el control de transparencia para proyectarlos directamente sobre el mapa satelital actual.",
    highlightBadge: 'Calco Histórico Georreferenciado',
  },
];

function StepIllustration({ stepIndex }: { stepIndex: number }) {
  switch (stepIndex) {
    case 0:
      return (
        <div className="relative h-36 sm:h-40 rounded-xl bg-[#0D0F12] border border-[#C5A059]/30 overflow-hidden p-4 flex flex-col justify-between">
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 25%, rgba(212,175,55,0.28), transparent 55%), linear-gradient(to right, rgba(197,160,89,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(197,160,89,0.08) 1px, transparent 1px)',
              backgroundSize: '100% 100%, 24px 24px, 24px 24px',
            }}
          />
          <div className="relative flex items-center justify-between text-[11px] text-[#C5A059]">
            <span className="inline-flex items-center gap-1.5 font-mono-tabular uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Cronología Sincrónica</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-[#1D3557]/80 border border-[#C5A059]/35 text-[#F4F1EA] font-mono-tabular text-[10px]">
              Año 1844
            </span>
          </div>

          <div className="relative space-y-2.5 my-auto">
            <div className="h-2 rounded-full bg-[#161920] border border-[#C5A059]/25 overflow-hidden relative">
              <div className="h-full w-[58%] bg-gradient-to-r from-[#1D3557] via-[#C5A059] to-[#D4AF37] rounded-full" />
            </div>
            <div className="flex items-center justify-between font-mono-tabular text-[10px] sm:text-[11px] text-[#A39E93]">
              <span>1492 Taínos</span>
              <span className="text-[#D4AF37] font-semibold">1844 Independencia</span>
              <span>1863 Rest.</span>
              <span>2026 RD</span>
            </div>
          </div>
        </div>
      );

    case 1:
      return (
        <div className="relative h-36 sm:h-40 rounded-xl bg-[#0D0F12] border border-[#C5A059]/30 overflow-hidden p-4 flex items-center gap-4">
          <div className="relative flex-1 h-full rounded-lg bg-[#161920]/70 border border-[#C5A059]/20 flex items-center justify-center overflow-hidden">
            <svg
              viewBox="0 0 220 110"
              className="w-full h-full max-w-[220px]"
              aria-hidden="true"
            >
              <path
                d="M22,52 L44,32 L85,26 L128,30 L166,44 L196,62 L182,78 L142,74 L106,82 L68,78 L36,68 Z"
                fill="rgba(29,53,87,0.45)"
                stroke="#C5A059"
                strokeWidth="1.4"
              />
              <path
                d="M85,26 L128,30 L132,56 L92,58 Z"
                fill="rgba(212,175,55,0.28)"
                stroke="#D4AF37"
                strokeWidth="1.8"
              />
              <circle cx="110" cy="43" r="4" fill="#D4AF37" />
            </svg>
            <span className="absolute bottom-2 left-2.5 text-[10px] font-mono-tabular text-[#D4AF37] bg-[#0D0F12]/85 px-1.5 py-0.5 rounded border border-[#C5A059]/35">
              Maguá · La Vega
            </span>
          </div>

          <div className="w-40 sm:w-48 h-full rounded-lg bg-[#161920] border border-[#C5A059]/35 p-2.5 flex flex-col justify-between">
            <div>
              <div className="text-[9px] uppercase tracking-[0.16em] text-[#C5A059] font-semibold">
                Ficha Territorial
              </div>
              <div className="font-display text-xs sm:text-sm font-semibold text-[#F4F1EA] mt-0.5">
                Cacicazgo de Maguá
              </div>
              <div className="text-[10px] text-[#A39E93] mt-1">
                Cacique: Guarionex · Valle del Cibao
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#D4AF37] border-t border-[#C5A059]/20 pt-1.5">
              <MapPin className="w-3 h-3 shrink-0" />
              <span className="truncate">Límites y evolución</span>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="relative h-36 sm:h-40 rounded-xl bg-[#0D0F12] border border-[#C5A059]/30 overflow-hidden p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-[#D4AF37] font-semibold">
              <Route className="w-3.5 h-3.5" />
              <span>Ruta Militar · Campaña del Sur</span>
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-mono-tabular px-2 py-0.5 rounded bg-[#9B2226]/30 border border-[#9B2226]/60 text-[#F4F1EA]">
              <Swords className="w-3 h-3 text-[#D4AF37]" />
              <span>19 y 30 de Marzo</span>
            </span>
          </div>

          <div className="relative flex-1 flex items-center justify-center">
            <svg viewBox="0 0 360 72" className="w-full h-16" aria-hidden="true">
              <path
                d="M28,50 Q105,14 180,38 T332,24"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="2.5"
                strokeDasharray="6 5"
              />
              <circle cx="28" cy="50" r="6" fill="#1D3557" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="180" cy="38" r="7" fill="#9B2226" stroke="#D4AF37" strokeWidth="2" />
              <circle cx="332" cy="24" r="6" fill="#D4AF37" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#A39E93]">
            <span>Azua · 19 Mar 1844</span>
            <span className="text-[#D4AF37]">Santiago · 30 Mar 1844</span>
            <span>Capotillo · 1863</span>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="relative h-36 sm:h-40 rounded-xl bg-[#0D0F12] border border-[#C5A059]/30 overflow-hidden flex">
          <div className="w-1/2 h-full bg-gradient-to-br from-[#2B2418] to-[#161920] p-3.5 flex flex-col justify-between border-r-2 border-[#D4AF37]">
            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#D4AF37]">
              Antes · 1492 / 1844
            </span>
            <div className="space-y-1">
              <div className="font-display text-sm font-semibold text-[#F4F1EA]">
                5 Cacicazgos / 5 Provincias
              </div>
              <div className="text-[11px] text-[#A39E93]">
                Xaraguá, Maguá, Azua, El Seibo...
              </div>
            </div>
          </div>

          <div className="w-1/2 h-full bg-gradient-to-br from-[#132238] to-[#0D0F12] p-3.5 flex flex-col justify-between items-end text-right">
            <span className="text-[10px] font-mono-tabular uppercase tracking-wider text-[#C5A059]">
              Hoy · 2026
            </span>
            <div className="space-y-1">
              <div className="font-display text-sm font-semibold text-[#F4F1EA]">
                31 Provincias + D.N.
              </div>
              <div className="text-[11px] text-[#A39E93]">
                División geopolítica contemporánea
              </div>
            </div>
          </div>

          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-none">
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-[#0D0F12] shadow-[0_0_18px_rgba(212,175,55,0.65)] flex items-center justify-center border-2 border-[#0D0F12]">
              <SplitSquareHorizontal className="w-4 h-4" />
            </div>
          </div>
        </div>
      );

    case 4:
    default:
      return (
        <div className="relative h-36 sm:h-40 rounded-xl bg-[#0D0F12] border border-[#C5A059]/30 overflow-hidden p-4 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#C5A059]/15 border border-[#D4AF37]/50 flex items-center justify-center text-[#D4AF37] shrink-0">
                <ScrollText className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.16em] text-[#C5A059] font-semibold">
                  Calco Histórico Superpuesto
                </div>
                <div className="font-display text-xs sm:text-sm font-semibold text-[#F4F1EA]">
                  Mapa de Casimiro Nemesio de Moya (1905)
                </div>
              </div>
            </div>
            <span className="text-[10px] font-mono-tabular px-2 py-0.5 rounded bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] shrink-0">
              70% Opacidad
            </span>
          </div>

          <div className="rounded-lg bg-[#161920] border border-[#C5A059]/25 p-2.5 flex items-center gap-3">
            <Layers className="w-4 h-4 text-[#C5A059] shrink-0" />
            <div className="flex-1 h-1.5 rounded-full bg-[#0D0F12] overflow-hidden">
              <div className="h-full w-[70%] bg-[#D4AF37] rounded-full" />
            </div>
            <span className="font-mono-tabular text-[11px] text-[#F4F1EA]">Satélite + Archivo</span>
          </div>
        </div>
      );
  }
}

export default function CronoGuideModal({
  isOpen,
  onClose,
  resetKey = 0,
}: CronoGuideModalProps) {
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setStepIndex(0);
    }
  }, [isOpen, resetKey]);

  const totalSteps = GUIDE_STEPS.length;
  const activeStep = GUIDE_STEPS[stepIndex] ?? GUIDE_STEPS[0];
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === totalSteps - 1;

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowRight') {
        setStepIndex((prev) => Math.min(totalSteps - 1, prev + 1));
      } else if (e.key === 'ArrowLeft') {
        setStepIndex((prev) => Math.max(0, prev - 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, totalSteps]);

  const whatsappShareUrl = useMemo(() => {
    const currentUrl =
      typeof window !== 'undefined' && window.location?.href
        ? window.location.href
        : 'https://cronomapa.rd';
    const message = `Explora CronoMapa RD — Atlas Cartográfico Histórico de la República Dominicana (1492–2026), con cacicazgos, batallas, mapas antiguos y comparador territorial: ${currentUrl}`;
    return `https://wa.me/?text=${encodeURIComponent(message)}`;
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1150] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="crono-guide-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#161920] border border-[#C5A059]/40 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-[#F4F1EA] overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Archival Accent Strip */}
        <div className="h-1 w-full bg-gradient-to-r from-[#1D3557] via-[#D4AF37] to-[#9B2226] shrink-0" />

        {/* Modal Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#C5A059]/25 flex items-center justify-between gap-3 shrink-0 bg-[#161920]">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#0D0F12] border border-[#C5A059]/45 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Compass className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] uppercase tracking-[0.18em] text-[#C5A059] font-semibold truncate">
                  Bitácora de Bienvenida · CronoMapa RD
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#A39E93] mt-0.5">
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="font-mono-tabular font-medium text-[#F4F1EA]">
                  Paso {stepIndex + 1} de {totalSteps}
                </span>
                <span className="hidden sm:inline text-[#C5A059]/60">·</span>
                <span className="hidden sm:inline truncate">{activeStep.highlightBadge}</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar guía del atlas"
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Step Body */}
        <div className="px-5 sm:px-6 py-5 space-y-5 overflow-y-auto gis-scroll">
          {/* Interactive Step Progress Pills */}
          <div
            className="flex items-center gap-2"
            role="tablist"
            aria-label="Pasos de la guía del atlas"
          >
            {GUIDE_STEPS.map((step, idx) => {
              const isCurrent = idx === stepIndex;
              const isVisited = idx < stepIndex;
              return (
                <button
                  key={step.id}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Ir al paso ${idx + 1}: ${step.subtitle}`}
                  onClick={() => setStepIndex(idx)}
                  className={`h-2 rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isCurrent
                      ? 'flex-[2.2] bg-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.5)]'
                      : isVisited
                        ? 'flex-1 bg-[#C5A059]/65 hover:bg-[#D4AF37]/80'
                        : 'flex-1 bg-[#0D0F12] border border-[#C5A059]/30 hover:border-[#C5A059]/70'
                  }`}
                />
              );
            })}
          </div>

          {/* Brand Emblem on Step 1 */}
          {stepIndex === 0 && (
            <div className="pt-1 text-center">
              <img
                src="/logo-cronomapa.png"
                alt="Logotipo oficial de CronoMapa RD"
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#D4AF37] mx-auto mb-3 shadow-lg bg-[#0D0F12]"
              />
            </div>
          )}

          {/* Visual Diagram for Active Step */}
          <StepIllustration stepIndex={stepIndex} />

          {/* Archival Editorial Copy */}
          <div className="space-y-2.5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
              {activeStep.subtitle}
            </div>
            <h2
              id="crono-guide-title"
              className="font-display text-xl sm:text-2xl font-semibold text-[#F4F1EA] leading-snug"
            >
              {activeStep.title}
            </h2>
            <p className="text-sm sm:text-[15px] leading-relaxed text-[#F4F1EA]/85">
              {activeStep.description}
            </p>
          </div>
        </div>

        {/* Navigation & Viral Share Footer */}
        <div className="px-5 sm:px-6 py-4 border-t border-[#C5A059]/25 bg-[#0D0F12]/65 space-y-3.5 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStepIndex((prev) => Math.max(0, prev - 1))}
              disabled={isFirstStep}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                isFirstStep
                  ? 'border-[#C5A059]/15 bg-[#161920]/40 text-[#A39E93]/40 cursor-not-allowed'
                  : 'border-[#C5A059]/40 bg-[#161920] text-[#F4F1EA] hover:border-[#D4AF37] hover:bg-[#C5A059]/15'
              }`}
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              <span>Anterior</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-[#A39E93] font-mono-tabular">
              {GUIDE_STEPS.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStepIndex(idx)}
                  aria-label={`Paso ${idx + 1}`}
                  className={`w-6 h-6 rounded-md border text-[11px] transition-colors ${
                    idx === stepIndex
                      ? 'bg-[#D4AF37]/20 border-[#D4AF37] text-[#D4AF37] font-semibold'
                      : 'bg-[#161920]/70 border-[#C5A059]/25 text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#C5A059]/60'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>

            {isLastStep ? (
              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] font-semibold shadow-[0_0_24px_rgba(212,175,55,0.3)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EA]"
              >
                <span>Comenzar Exploración Histórica</span>
                <Compass className="w-4 h-4 shrink-0" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStepIndex((prev) => Math.min(totalSteps - 1, prev + 1))}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold border border-[#C5A059]/50 bg-[#161920] hover:bg-[#C5A059]/15 hover:border-[#D4AF37] text-[#F4F1EA] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <span>Siguiente</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] shrink-0" />
              </button>
            )}
          </div>

          <div className="pt-2.5 border-t border-[#C5A059]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#A39E93] hover:text-[#D4AF37] transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
              <span>Compartir CronoMapa RD con estudiantes o docentes</span>
            </a>
            <span className="text-[11px] font-mono-tabular text-[#A39E93]/75 hidden sm:inline">
              Usa ← / → para navegar · Esc para cerrar
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
