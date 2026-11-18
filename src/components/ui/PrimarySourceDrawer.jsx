import { useEffect, useState } from 'react';
import {
  BookOpen,
  Compass,
  ExternalLink,
  FileText,
  HelpCircle,
  Landmark,
  ScrollText,
  X,
} from 'lucide-react';
import {
  getPrimarySourceForYearOrEpoch,
  PRIMARY_SOURCES_LIST,
} from '../../data/primarySourcesData.js';

const EPOCH_JUMP_YEARS = {
  '1492': 1498,
  colonia: 1777,
  '1844': 1844,
  restauracion: 1865,
  siglo_xx: 1965,
};

/**
 * Contenido reutilizable de una Cápsula de Fuente Primaria
 * (usado tanto en PrimarySourceDrawer como en la pestaña "📜 Fuente Primaria" de InfoPanel/HistoricalDrawer)
 */
export function PrimarySourceCapsuleContent({
  capsule,
  onOpenWorksheetModal,
  onSyncMapYear,
  compact = false,
}) {
  if (!capsule) return null;

  const primaryOfficialLink = capsule.officialLinks?.[0];

  return (
    <div className="space-y-4">
      {/* Encabezado Documental */}
      <div className="space-y-1">
        <div className="text-[11px] font-mono-tabular text-[#C5A059]">
          {capsule.periodLabel} · {capsule.year}
        </div>
        <h3 className="font-display text-base sm:text-lg font-semibold text-[#F4F1EA] leading-snug">
          {capsule.title}
        </h3>
        <div className="text-xs text-[#A39E93]">{capsule.documentTitle}</div>
      </div>

      {/* Extracto en Estilo Pergamino Oscuro Tipográfico */}
      <div className="rounded-xl border border-[#C5A059]/40 bg-[#0D0F12]/90 p-4 space-y-3 shadow-inner">
        <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[#D4AF37]">
          <span className="flex items-center gap-1.5">
            <ScrollText className="w-4 h-4 shrink-0" />
            <span>Fuente Primaria Documental</span>
          </span>
          <span className="font-mono-tabular text-[11px] text-[#C5A059]">{capsule.year}</span>
        </div>

        <blockquote className="font-display italic text-sm sm:text-[15px] text-[#F4F1EA] leading-relaxed">
          {capsule.excerpt}
        </blockquote>

        {capsule.secondaryExcerpt && (
          <blockquote className="font-display italic text-xs sm:text-[13px] text-[#F4F1EA]/85 leading-relaxed pt-2 border-t border-[#C5A059]/20">
            {capsule.secondaryExcerpt}
          </blockquote>
        )}

        <div className="pt-2 border-t border-[#C5A059]/20 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#A39E93]">
          <span>
            <strong className="text-[#F4F1EA]">Autoría:</strong> {capsule.author}
          </span>
          <span className="text-[#C5A059]">{capsule.archiveRef}</span>
        </div>
      </div>

      {/* Contexto Historiográfico */}
      <div className="space-y-1.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C5A059]">
          <Landmark className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
          <span>Contexto Histórico para el Aula</span>
        </div>
        <p className="text-xs sm:text-sm text-[#F4F1EA]/85 leading-relaxed">
          {capsule.historicalContext}
        </p>
      </div>

      {/* Preguntas Socráticas Detonantes para Debate en Clase */}
      <div className="rounded-xl border border-[#C5A059]/30 bg-[#0D0F12]/70 p-4 space-y-2.5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
          <HelpCircle className="w-4 h-4 shrink-0" />
          <span>Preguntas Socráticas para Debate en Clase</span>
        </div>
        <ol className="space-y-2.5 text-xs sm:text-sm text-[#F4F1EA]/90">
          {capsule.socraticQuestions.map((question, idx) => (
            <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
              <span className="font-mono-tabular font-bold text-[#D4AF37] shrink-0 mt-0.5">
                0{idx + 1}.
              </span>
              <span>{question}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Actividad Cartográfica Sugerida */}
      {!compact && capsule.cartographicActivity && (
        <div className="rounded-xl border border-[#C5A059]/25 bg-[#0D0F12]/55 p-3.5 space-y-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-[#C5A059]">
              <Compass className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Práctica de Observación en el Mapa</span>
            </span>
            {onSyncMapYear && (
              <button
                type="button"
                onClick={() =>
                  onSyncMapYear(EPOCH_JUMP_YEARS[capsule.epochKey] ?? 1844)
                }
                className="text-[11px] font-semibold text-[#D4AF37] hover:underline"
              >
                Sincronizar mapa ({EPOCH_JUMP_YEARS[capsule.epochKey] ?? 1844})
              </button>
            )}
          </div>
          <p className="text-xs text-[#F4F1EA]/85 leading-relaxed">
            {capsule.cartographicActivity}
          </p>
        </div>
      )}

      {/* Botón Principal y Enlaces Oficiales Verificables (AGN / MINERD / TC) */}
      <div className="space-y-2 pt-1">
        {primaryOfficialLink && (
          <a
            href={primaryOfficialLink.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] text-xs font-bold shadow-sm transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            <span>🔗 Ver Fuente Oficial (AGN / MINERD)</span>
          </a>
        )}

        <div className="space-y-1.5">
          <div className="text-[11px] font-semibold text-[#A39E93]">
            Repositorios oficiales de consulta docente:
          </div>
          <div className="grid grid-cols-1 gap-1.5">
            {capsule.officialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg border border-[#C5A059]/25 bg-[#0D0F12]/70 hover:border-[#D4AF37] hover:bg-[#C5A059]/10 text-xs text-[#F4F1EA] transition-colors"
              >
                <span className="flex items-center gap-2 truncate">
                  <BookOpen className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="truncate">{link.label}</span>
                </span>
                <span className="flex items-center gap-1 font-mono-tabular text-[10px] text-[#C5A059] shrink-0">
                  <span>{link.institution}</span>
                  <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            ))}
          </div>
        </div>

        {onOpenWorksheetModal && (
          <button
            type="button"
            onClick={() => onOpenWorksheetModal(capsule.epochKey)}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg border border-[#D4AF37]/50 bg-[#1D3557]/80 hover:bg-[#1D3557] text-[#F4F1EA] text-xs font-semibold transition-colors mt-2"
          >
            <FileText className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
            <span>Generar Guía Didáctica MINERD de esta Época</span>
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Panel lateral de Cápsulas de Fuentes Primarias para el Modo Docente
 */
export default function PrimarySourceDrawer({
  isOpen,
  onClose,
  currentYear = 2026,
  onSelectYear,
  onOpenWorksheetModal,
}) {
  const autoCapsule = getPrimarySourceForYearOrEpoch(currentYear);
  const [selectedEpochKey, setSelectedEpochKey] = useState(autoCapsule.epochKey);

  useEffect(() => {
    const synced = getPrimarySourceForYearOrEpoch(currentYear);
    setSelectedEpochKey(synced.epochKey);
  }, [currentYear]);

  if (!isOpen) return null;

  const activeCapsule = getPrimarySourceForYearOrEpoch(selectedEpochKey);

  return (
    <aside
      aria-label="Cápsulas de Fuentes Primarias del Archivo General de la Nación y MINERD"
      className="pdi-scalable-panel fixed md:absolute top-0 right-0 z-[945] h-full w-full sm:w-[460px] bg-[#161920]/95 backdrop-blur-xl border-l border-[#D4AF37]/45 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden text-[#F4F1EA] print:hidden"
    >
      {/* Encabezado */}
      <div className="px-5 pt-4 pb-3 border-b border-[#C5A059]/25 flex items-start justify-between gap-3 bg-[#0D0F12]/60">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <ScrollText className="w-4 h-4 shrink-0" />
            <span>Módulo Docente · Fuentes Primarias</span>
          </div>
          <h2 className="font-display text-lg font-semibold text-[#F4F1EA] leading-snug mt-0.5">
            Archivo Documental y Debate Socrático
          </h2>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar panel de fuentes primarias"
          className="min-w-[38px] min-h-[38px] flex items-center justify-center rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/70 text-[#A39E93] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Selector de Épocas */}
      <div className="px-5 py-2.5 border-b border-[#C5A059]/20 bg-[#0D0F12]/40">
        <div className="text-[11px] text-[#A39E93] mb-1.5">
          Época documental (sincronizada con la línea de tiempo):
        </div>
        <div className="grid grid-cols-5 gap-1 p-1 bg-[#0D0F12]/90 rounded-lg border border-[#C5A059]/25">
          {PRIMARY_SOURCES_LIST.map((item) => {
            const isSelected = item.epochKey === activeCapsule.epochKey;
            const shortTab =
              item.epochKey === '1492'
                ? '1492'
                : item.epochKey === 'colonia'
                  ? 'Colonia'
                  : item.epochKey === '1844'
                    ? '1844'
                    : item.epochKey === 'restauracion'
                      ? '1863'
                      : 'S. XX';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedEpochKey(item.epochKey)}
                className={`py-1.5 px-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap truncate ${
                  isSelected
                    ? 'bg-[#D4AF37] text-[#0D0F12]'
                    : 'text-[#A39E93] hover:text-[#F4F1EA]'
                }`}
              >
                {shortTab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Cuerpo Desplazable */}
      <div className="flex-1 overflow-y-auto gis-scroll p-5">
        <PrimarySourceCapsuleContent
          capsule={activeCapsule}
          onSyncMapYear={onSelectYear}
          onOpenWorksheetModal={onOpenWorksheetModal}
        />
      </div>
    </aside>
  );
}
