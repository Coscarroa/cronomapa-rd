import { useEffect, useMemo, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  ExternalLink,
  Landmark,
  Loader2,
  MapPin,
  X,
  ZoomIn,
} from 'lucide-react';
import { useCronoMapa } from '../../context/CronoMapaContext';
import {
  PRESIDENTS_HISTORY_DATA,
  findPresidentHistory,
  type PresidentHistoryEntry,
} from '../../data/presidentsHistoryData';
import {
  fetchHighResPortrait,
  getCachedHighResPortrait,
  resolvePortraitUrl,
  resolveWikiTitleForName,
} from '../../services/wikipediaPortraitsService';

interface PresidentDetailModalProps {
  isOpen: boolean;
  presidentKey: string | null;
  onClose: () => void;
  onSelectPresident: (idOrName: string) => void;
}

export default function PresidentDetailModal({
  isOpen,
  presidentKey,
  onClose,
  onSelectPresident,
}: PresidentDetailModalProps) {
  const { allPresidents, wikiPortraits } = useCronoMapa();

  const [highResUrl, setHighResUrl] = useState<string | null>(null);
  const [highResLoading, setHighResLoading] = useState<boolean>(false);
  const [imgError, setImgError] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);

  const sortedHistory = useMemo(
    () =>
      [...PRESIDENTS_HISTORY_DATA].sort(
        (a, b) => a.ordenCronologico - b.ordenCronologico,
      ),
    [],
  );

  const matchedPresident = useMemo(() => {
    if (!presidentKey) return undefined;
    const normKey = presidentKey
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\(.*?\)/g, '')
      .trim()
      .toLowerCase();

    return allPresidents.find((p) => {
      const normName = p.nombre
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim()
        .toLowerCase();
      return (
        p.id === presidentKey ||
        normName === normKey ||
        normName.includes(normKey) ||
        normKey.includes(normName)
      );
    });
  }, [presidentKey, allPresidents]);

  const entry: PresidentHistoryEntry | null = useMemo(() => {
    if (!isOpen || !presidentKey) return null;
    return findPresidentHistory(presidentKey, matchedPresident);
  }, [isOpen, presidentKey, matchedPresident]);

  const currentIndex = useMemo(() => {
    if (!entry) return -1;
    return sortedHistory.findIndex((item) => item.id === entry.id);
  }, [entry, sortedHistory]);

  const prevEntry =
    currentIndex > 0 ? sortedHistory[currentIndex - 1] : null;
  const nextEntry =
    currentIndex >= 0 && currentIndex < sortedHistory.length - 1
      ? sortedHistory[currentIndex + 1]
      : null;

  const lookupTitle = entry?.wikiTitle || entry?.nombre || '';

  useEffect(() => {
    if (!isOpen || !entry) return;
    setImgError(false);
    setLightboxOpen(false);

    const cached = getCachedHighResPortrait(lookupTitle);
    if (cached) {
      setHighResUrl(cached);
      setHighResLoading(false);
      return;
    }

    setHighResUrl(null);
    setHighResLoading(true);
    let active = true;

    fetchHighResPortrait(lookupTitle)
      .then((url) => {
        if (active && url) {
          setHighResUrl(url);
        }
      })
      .catch(() => {
        // Fallback smoothly to batch thumbnail URL
      })
      .finally(() => {
        if (active) setHighResLoading(false);
      });

    return () => {
      active = false;
    };
  }, [isOpen, entry, lookupTitle]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
        return;
      }
      if (lightboxOpen) return;
      if (e.key === 'ArrowLeft' && prevEntry) {
        e.preventDefault();
        onSelectPresident(prevEntry.id);
      } else if (e.key === 'ArrowRight' && nextEntry) {
        e.preventDefault();
        onSelectPresident(nextEntry.id);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, lightboxOpen, onClose, onSelectPresident, prevEntry, nextEntry]);

  if (!isOpen || !entry) return null;

  const fallbackThumb =
    resolvePortraitUrl(entry.nombre, wikiPortraits) ||
    resolvePortraitUrl(lookupTitle, wikiPortraits) ||
    matchedPresident?.foto_url;

  const displayPortraitUrl = !imgError ? highResUrl || fallbackThumb : undefined;

  const lifespanText =
    entry.nacimientoMuerte || matchedPresident?.nacimiento_muerte;
  const provinceText =
    entry.provinciaNacimiento || matchedPresident?.provincia_nacimiento;

  const wikiArticleTitle =
    entry.wikiTitle || resolveWikiTitleForName(entry.nombre) || entry.nombre;
  const wikiArticleHref = `https://en.wikipedia.org/wiki/${encodeURIComponent(
    wikiArticleTitle.replace(/\s+/g, '_'),
  )}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="president-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-[1150] bg-[#0D0F12]/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-[fadeIn_0.2s_ease-out]"
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-[#14171D]/95 backdrop-blur-xl border border-[#C5A059]/40 text-[#F4F1EA] rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.88)] overflow-hidden">
        {/* Top Archival Header Bar */}
        <div className="px-5 sm:px-7 py-3.5 border-b border-[#C5A059]/25 bg-[#0D0F12]/75 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <Landmark className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#C5A059] truncate">
              {entry.esColegiado
                ? 'Expediente de Gobierno Colegiado'
                : 'Expediente Museográfico Presidencial'}
              {currentIndex >= 0 ? ` · Registro #${entry.ordenCronologico}` : ''}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar ficha presidencial"
            className="w-9 h-9 rounded-lg border border-[#C5A059]/30 bg-[#161920] text-[#A39E93] hover:text-[#D4AF37] hover:border-[#D4AF37] flex items-center justify-center transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Two-Column Museum Content */}
        <div className="flex-1 overflow-y-auto gis-scroll p-5 sm:p-7">
          <div className="grid grid-cols-1 md:grid-cols-[248px_1fr] lg:grid-cols-[270px_1fr] gap-6 sm:gap-7 items-start">
            {/* LEFT COLUMN: High-Resolution Portrait + Archival Metadata */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] w-full max-w-[260px] mx-auto md:max-w-none rounded-xl overflow-hidden border-2 border-[#D4AF37]/50 bg-[#0D0F12] shadow-[0_14px_38px_rgba(0,0,0,0.65)] group">
                {displayPortraitUrl ? (
                  <>
                    <img
                      src={displayPortraitUrl}
                      alt={`Retrato oficial de ${entry.nombre}`}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      onClick={() => setLightboxOpen(true)}
                      className="w-full h-full object-cover object-top cursor-zoom-in transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <button
                      type="button"
                      onClick={() => setLightboxOpen(true)}
                      aria-label="Ampliar retrato en pantalla completa"
                      className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#0D0F12]/85 backdrop-blur-md border border-[#D4AF37]/50 text-[11px] font-medium text-[#F4F1EA] hover:bg-[#D4AF37] hover:text-[#0D0F12] transition-colors shadow-lg"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                      <span>Ampliar</span>
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-[#161920] to-[#0D0F12]">
                    <Landmark className="w-12 h-12 text-[#C5A059]/60 mb-3" />
                    <span className="font-display text-sm font-semibold text-[#D4AF37]">
                      {entry.nombre}
                    </span>
                    <span className="font-mono text-[11px] text-[#A39E93] mt-1">
                      Archivo Histórico Nacional
                    </span>
                  </div>
                )}

                {highResLoading && (
                  <div
                    aria-label="Cargando retrato de alta resolución"
                    className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2 py-1 rounded bg-[#0D0F12]/80 border border-[#C5A059]/35 text-[10px] font-mono text-[#D4AF37]"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>HD</span>
                  </div>
                )}
              </div>

              {/* Monospace Biographical & Mandate Caption */}
              <div className="rounded-xl border border-[#C5A059]/25 bg-[#0D0F12]/70 p-3.5 space-y-2.5">
                {lifespanText && (
                  <div className="font-mono text-xs text-[#C5A059] font-mono-tabular">
                    {lifespanText}
                  </div>
                )}

                {provinceText && (
                  <div className="flex items-center gap-1.5 text-xs text-[#F4F1EA]/85">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>{provinceText}</span>
                  </div>
                )}

                <div className="pt-1 border-t border-[#C5A059]/20 space-y-1">
                  <div className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[#A39E93]">
                    <Calendar className="w-3 h-3 text-[#C5A059] shrink-0" />
                    <span>Mandatos</span>
                  </div>
                  <ul className="space-y-1 font-mono text-xs text-[#C5A059] font-mono-tabular">
                    {entry.periodos.map((per) => (
                      <li key={per}>· {per}</li>
                    ))}
                  </ul>
                </div>

                {/* Party / Political Movement Badge */}
                <div className="pt-1">
                  <div className="inline-block px-2.5 py-1 rounded-md border border-[#C5A059]/40 bg-[#1D3557]/35 text-[11px] font-medium text-[#F4F1EA]">
                    {entry.partidoOcorriente}
                  </div>
                </div>

                <div className="pt-1 border-t border-[#C5A059]/15">
                  <a
                    href={wikiArticleHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] text-[#A39E93] hover:text-[#D4AF37] transition-colors"
                  >
                    <span>Referencia enciclopédica (Wikipedia)</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Impartial Historiographical Balance */}
            <div className="space-y-5 min-w-0">
              <div className="space-y-2.5">
                <h2
                  id="president-modal-title"
                  className="font-display text-2xl sm:text-3xl font-bold text-[#F4F1EA] leading-tight"
                >
                  {entry.nombre}
                </h2>
                <p className="text-sm sm:text-[15px] leading-relaxed text-[#F4F1EA]/90">
                  {entry.resumenGobierno}
                </p>
              </div>

              {/* 2-Column Side-by-Side Balanced Assessment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Accomplishments */}
                <section
                  aria-label="Aportes y Avances"
                  className="rounded-xl border border-emerald-500/25 bg-emerald-950/15 p-4 space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em]">
                      Aportes y Avances
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-[13px] leading-relaxed text-[#F4F1EA]/88">
                    {entry.puntosPositivos.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-400/80 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Controversies & Crises */}
                <section
                  aria-label="Controversias y Crisis"
                  className="rounded-xl border border-[#9B2226]/35 bg-[#9B2226]/10 p-4 space-y-2.5"
                >
                  <div className="flex items-center gap-2 text-[#F87171]">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <h3 className="text-xs font-semibold uppercase tracking-[0.12em]">
                      Controversias y Crisis
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-[13px] leading-relaxed text-[#F4F1EA]/88">
                    {entry.puntosNegativos.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#F87171]/80 shrink-0"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>

              {/* Founded Institutions, Laws & Public Works */}
              <section
                aria-label="Instituciones, Leyes y Obras Fundadas"
                className="rounded-xl border border-[#C5A059]/30 bg-[#0D0F12]/70 p-4 space-y-3"
              >
                <div className="flex items-center gap-2 text-[#D4AF37]">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <h3 className="text-xs font-semibold uppercase tracking-[0.12em]">
                    Instituciones, Leyes y Obras Fundadas
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {entry.institucionesCreadas.map((inst) => (
                    <span
                      key={inst}
                      className="px-2.5 py-1.5 rounded-md border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs font-medium text-[#F4F1EA] leading-snug"
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>

        {/* Chronological Footer Navigation */}
        <div className="px-4 sm:px-7 py-3 border-t border-[#C5A059]/25 bg-[#0D0F12]/90 flex items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            disabled={!prevEntry}
            onClick={() => prevEntry && onSelectPresident(prevEntry.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#C5A059]/30 bg-[#161920] text-xs font-medium text-[#F4F1EA] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-35 disabled:pointer-events-none transition-colors max-w-[42%]"
          >
            <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">
              {prevEntry ? `Anterior: ${prevEntry.nombre}` : 'Inicio cronológico'}
            </span>
          </button>

          <span className="hidden sm:inline-block font-mono text-[11px] text-[#A39E93] font-mono-tabular shrink-0">
            {currentIndex >= 0
              ? `${currentIndex + 1} / ${sortedHistory.length}`
              : 'Archivo RD'}
          </span>

          <button
            type="button"
            disabled={!nextEntry}
            onClick={() => nextEntry && onSelectPresident(nextEntry.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[#C5A059]/30 bg-[#161920] text-xs font-medium text-[#F4F1EA] hover:border-[#D4AF37] hover:text-[#D4AF37] disabled:opacity-35 disabled:pointer-events-none transition-colors max-w-[42%]"
          >
            <span className="truncate">
              {nextEntry ? `Siguiente: ${nextEntry.nombre}` : 'Presente (2026)'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>
        </div>
      </div>

      {/* Fullscreen Lightbox for High-Resolution Portrait */}
      {lightboxOpen && displayPortraitUrl && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada de ${entry.nombre}`}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-[1250] bg-[#0D0F12]/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Cerrar vista ampliada"
            className="absolute top-4 right-4 w-10 h-10 rounded-lg border border-[#D4AF37]/50 bg-[#161920] text-[#F4F1EA] hover:text-[#D4AF37] flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-2xl max-h-[85vh] flex flex-col items-center gap-3"
          >
            <img
              src={displayPortraitUrl}
              alt={`Retrato en alta resolución de ${entry.nombre}`}
              referrerPolicy="no-referrer"
              className="max-h-[76vh] w-auto rounded-xl border-2 border-[#D4AF37]/60 shadow-[0_24px_80px_rgba(0,0,0,0.9)] object-contain bg-[#0D0F12]"
            />
            <div className="text-center space-y-0.5">
              <div className="font-display text-lg font-semibold text-[#F4F1EA]">
                {entry.nombre}
              </div>
              <div className="font-mono text-xs text-[#C5A059]">
                {entry.periodos.join(' · ')}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
