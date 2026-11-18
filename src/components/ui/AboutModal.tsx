import { useEffect } from 'react';
import { BookOpen, Compass, Globe2, Landmark, Layers, X } from 'lucide-react';

export interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] overflow-y-auto gis-scroll bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/35 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] text-[#F4F1EA]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Archival Accent Strip */}
        <div className="h-1 w-full bg-gradient-to-r from-[#1D3557] via-[#C5A059] to-[#9B2226] rounded-t-2xl" />

        {/* Header */}
        <div className="px-6 py-4 border-b border-[#C5A059]/20 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1D3557] border border-[#C5A059]/40 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 id="about-modal-title" className="font-display text-xl font-semibold text-[#F4F1EA]">
                Sobre CronoMapa RD
              </h2>
              <p className="text-xs text-[#C5A059]">
                Atlas Cartográfico Histórico · República Dominicana (1492–2026)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ventana informativa"
            className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 space-y-5 text-sm leading-relaxed text-[#F4F1EA]/90">
          <p>
            <strong className="text-[#D4AF37]">CronoMapa RD</strong> es una plataforma educativa de
            cartografía histórica digital diseñada para explorar la evolución territorial, política,
            militar y social de la República Dominicana desde la sociedad taína de 1492 hasta la
            etapa democrática contemporánea de 2026.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-[#0D0F12]/80 border border-[#C5A059]/25 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                <Layers className="w-4 h-4 shrink-0" />
                <span>Cartografía y Relieve Real</span>
              </div>
              <p className="text-xs text-[#A39E93] leading-relaxed">
                Combina sombreado topográfico 3D, terreno físico histórico, cartas portulanas
                georreferenciadas, fronteras coloniales y la división en 32 demarcaciones por
                macrorregión geográfica.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#0D0F12]/80 border border-[#C5A059]/25 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
                <Landmark className="w-4 h-4 shrink-0" />
                <span>Geopolítica y Cronología</span>
              </div>
              <p className="text-xs text-[#A39E93] leading-relaxed">
                Integra la georreferenciación de presidentes por provincia de nacimiento, dossiers del
                siglo XX (Trujillo y Balaguer) y una línea de tiempo sincrónica de doble carril.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#0D0F12]/90 border border-[#C5A059]/30 p-4 space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#D4AF37]">
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Rigor historiográfico y fuentes consultadas</span>
            </div>
            <ul className="space-y-1.5 text-xs text-[#A39E93]">
              <li>
                · <strong className="text-[#F4F1EA]">Archivo General de la Nación (AGN):</strong>{' '}
                Colecciones documentales de la Independencia, Restauración, correspondencia oficial y
                registros republicanos.
              </li>
              <li>
                · <strong className="text-[#F4F1EA]">Academia Dominicana de la Historia:</strong>{' '}
                Estudios críticos de Frank Moya Pons, Roberto Cassá, Emilio Rodríguez Demorizi,
                Bernardo Vega y José Gabriel García.
              </li>
              <li>
                ·{' '}
                <strong className="text-[#F4F1EA]">
                  Oficina Nacional de Estadística (ONE) e Instituto Geográfico Nacional:
                </strong>{' '}
                Marco geoestadístico de provincias, macrorregiones y toponimia nacional.
              </li>
              <li>
                ·{' '}
                <strong className="text-[#F4F1EA]">
                  Archivo General de Indias y Crónicas Tempranas:
                </strong>{' '}
                Diario de Cristóbal Colón, Fray Bartolomé de las Casas y Relaciones de Antonio de
                Osorio.
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#C5A059]/20 text-xs text-[#A39E93]">
            <div className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span>Uso educativo, académico y divulgación cultural</span>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#9B2226] hover:bg-[#7F1D1D] text-[#F4F1EA] border border-[#C5A059]/40 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              Volver al Atlas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
