import { useEffect, useMemo, useState } from 'react';
import {
  CheckCircle2,
  ExternalLink,
  FileText,
  GraduationCap,
  Printer,
  RotateCcw,
  X,
} from 'lucide-react';
import {
  getPrimarySourceForYearOrEpoch,
  PRIMARY_SOURCES_LIST,
} from '../../data/primarySourcesData.js';

const SECONDARY_GRADES = [
  {
    id: '1ro de Secundaria',
    cycle: 'Primer Ciclo · Ciencias Sociales y Geografía General',
  },
  {
    id: '2do de Secundaria',
    cycle: 'Primer Ciclo · Historia de las Civilizaciones y Expansión Europea',
  },
  {
    id: '3ro de Secundaria',
    cycle: 'Primer Ciclo · Historia Dominicana y del Caribe (Siglos XV–XIX)',
  },
  {
    id: '4to de Secundaria',
    cycle: 'Segundo Ciclo · Geografía e Historia de América y República Dominicana',
  },
  {
    id: '5to de Secundaria',
    cycle: 'Segundo Ciclo · Historia Dominicana Contemporánea e Institucional',
  },
  {
    id: '6to de Secundaria',
    cycle: 'Segundo Ciclo · Ciudadanía, Constitución y Problemas Sociales Contemporáneos',
  },
];

export default function MinerdWorksheetGenerator({
  isOpen,
  onClose,
  currentYear = 2026,
  initialEpochKey = null,
  activeFeatureTitle = null,
  activeProvinceName = null,
}) {
  const defaultCapsule = useMemo(
    () => getPrimarySourceForYearOrEpoch(initialEpochKey || currentYear),
    [initialEpochKey, currentYear],
  );

  const [epochKey, setEpochKey] = useState(defaultCapsule.epochKey);
  const [grade, setGrade] = useState('4to de Secundaria');
  const [schoolName, setSchoolName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [customTopic, setCustomTopic] = useState('');
  const [customIndicator, setCustomIndicator] = useState('');

  const capsule = useMemo(() => getPrimarySourceForYearOrEpoch(epochKey), [epochKey]);

  const syncedTopic = useMemo(() => {
    const contextSuffix = activeProvinceName
      ? ` — Enfoque territorial: ${activeProvinceName}`
      : activeFeatureTitle
        ? ` — Estudio de caso: ${activeFeatureTitle}`
        : '';
    return `${capsule.title}${contextSuffix}`;
  }, [capsule, activeProvinceName, activeFeatureTitle]);

  useEffect(() => {
    const nextCap = getPrimarySourceForYearOrEpoch(initialEpochKey || currentYear);
    setEpochKey(nextCap.epochKey);
  }, [initialEpochKey, currentYear, isOpen]);

  useEffect(() => {
    setCustomTopic(syncedTopic);
    setCustomIndicator(capsule.minerdCompetencies.achievementIndicator);
  }, [syncedTopic, capsule]);

  if (!isOpen) return null;

  const selectedGradeMeta =
    SECONDARY_GRADES.find((g) => g.id === grade) || SECONDARY_GRADES[3];

  const handlePrintPdf = () => {
    window.print();
  };

  const handleResetDefaults = () => {
    setCustomTopic(syncedTopic);
    setCustomIndicator(capsule.minerdCompetencies.achievementIndicator);
  };

  const todayFormatted = new Date().toLocaleDateString('es-DO', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="minerd-worksheet-title"
      className="minerd-print-modal fixed inset-0 z-[1150] bg-black/80 backdrop-blur-md flex flex-col items-center justify-start overflow-y-auto p-3 sm:p-6 print:static print:bg-white print:p-0 print:overflow-visible"
    >
      {/* BARRA SUPERIOR DE CONFIGURACIÓN DOCENTE (OCULTA AL IMPRIMIR) */}
      <div className="w-full max-w-5xl bg-[#161920] border border-[#D4AF37]/50 rounded-t-2xl p-4 sm:p-5 text-[#F4F1EA] shadow-2xl space-y-4 print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#C5A059]/25 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-lg bg-[#D4AF37] text-[#0D0F12] flex items-center justify-center shrink-0">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div>
              <h2
                id="minerd-worksheet-title"
                className="font-display text-base sm:text-lg font-semibold text-[#F4F1EA]"
              >
                Generador de Guía Didáctica en PDF · Adecuación Curricular MINERD
              </h2>
              <p className="text-xs text-[#A39E93]">
                Hoja de trabajo de 45 minutos en blanco y negro (ahorro de tinta) lista para imprimir o guardar como PDF
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleResetDefaults}
              title="Restaurar textos sincronizados con el mapa"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#C5A059]/35 bg-[#0D0F12]/80 hover:border-[#D4AF37] text-xs font-medium text-[#F4F1EA] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="hidden sm:inline">Sincronizar</span>
            </button>

            <button
              type="button"
              onClick={handlePrintPdf}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] text-xs sm:text-sm font-bold shadow-[0_6px_20px_rgba(212,175,55,0.35)] transition-colors"
            >
              <Printer className="w-4 h-4 shrink-0" />
              <span>Descargar / Imprimir PDF</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar generador de guía"
              className="p-2 rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#D4AF37]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Controles de personalización rápida */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label
              htmlFor="minerd-grade-select"
              className="block text-[11px] font-semibold text-[#C5A059] mb-1"
            >
              Nivel / Grado (Secundaria MINERD)
            </label>
            <select
              id="minerd-grade-select"
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0D0F12] border border-[#C5A059]/35 text-[#F4F1EA] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            >
              {SECONDARY_GRADES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="minerd-epoch-select"
              className="block text-[11px] font-semibold text-[#C5A059] mb-1"
            >
              Época Histórica y Fuente Documental
            </label>
            <select
              id="minerd-epoch-select"
              value={epochKey}
              onChange={(e) => setEpochKey(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-[#0D0F12] border border-[#C5A059]/35 text-[#F4F1EA] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            >
              {PRIMARY_SOURCES_LIST.map((item) => (
                <option key={item.id} value={item.epochKey}>
                  {item.periodLabel}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="minerd-school-input"
              className="block text-[11px] font-semibold text-[#C5A059] mb-1"
            >
              Centro Educativo / Liceo (Opcional)
            </label>
            <input
              id="minerd-school-input"
              type="text"
              value={schoolName}
              onChange={(e) => setSchoolName(e.target.value)}
              placeholder="Ej. Liceo Juan Pablo Duarte"
              className="w-full px-3 py-2 rounded-lg bg-[#0D0F12] border border-[#C5A059]/35 text-[#F4F1EA] placeholder:text-[#A39E93]/60 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          <div>
            <label
              htmlFor="minerd-teacher-input"
              className="block text-[11px] font-semibold text-[#C5A059] mb-1"
            >
              Nombre del Docente (Opcional)
            </label>
            <input
              id="minerd-teacher-input"
              type="text"
              value={teacherName}
              onChange={(e) => setTeacherName(e.target.value)}
              placeholder="Ej. Prof. Ciencias Sociales"
              className="w-full px-3 py-2 rounded-lg bg-[#0D0F12] border border-[#C5A059]/35 text-[#F4F1EA] placeholder:text-[#A39E93]/60 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div>
            <label
              htmlFor="minerd-topic-input"
              className="block text-[11px] font-semibold text-[#C5A059] mb-1"
            >
              Tema de la Guía (Sincronizado con el mapa y editable)
            </label>
            <input
              id="minerd-topic-input"
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F12] border border-[#C5A059]/35 text-[#F4F1EA] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>

          <div>
            <label
              htmlFor="minerd-indicator-input"
              className="block text-[11px] font-semibold text-[#C5A059] mb-1"
            >
              Indicador de Logro MINERD (Editable)
            </label>
            <input
              id="minerd-indicator-input"
              type="text"
              value={customIndicator}
              onChange={(e) => setCustomIndicator(e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg bg-[#0D0F12] border border-[#C5A059]/35 text-[#F4F1EA] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
            />
          </div>
        </div>
      </div>

      {/* HOJA DE TRABAJO IMPRIMIBLE EN BLANCO Y NEGRO DE AHORRO DE TINTA */}
      <div
        id="minerd-printable-sheet"
        className="w-full max-w-5xl bg-white text-black rounded-b-2xl shadow-2xl p-6 sm:p-10 space-y-5 border-x border-b border-neutral-300 print:border-0 print:shadow-none print:rounded-none print:p-0 print:max-w-none"
      >
        {/* 1. ENCABEZADO ESCOLAR OFICIAL */}
        <header className="border-b-2 border-black pb-3 space-y-2.5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-wider text-black">
                República Dominicana · Ministerio de Educación (MINERD)
              </div>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-black leading-tight mt-0.5">
                Guía Didáctica de Análisis Cartográfico y Documental (45 min)
              </h1>
              <div className="text-xs font-medium text-neutral-800 mt-0.5">
                Área de Ciencias Sociales · {selectedGradeMeta.id} ({selectedGradeMeta.cycle})
              </div>
            </div>

            <div className="text-right shrink-0 border border-black px-2.5 py-1.5 rounded">
              <div className="font-display text-xs font-bold text-black">CronoMapa RD</div>
              <div className="text-[10px] text-neutral-700 font-mono-tabular">
                Atlas Cartográfico Histórico
              </div>
              <div className="text-[10px] text-neutral-700">1492 – 2026</div>
            </div>
          </div>

          {/* Campos de Identificación Escolar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 pt-2 text-xs">
            <div className="flex items-baseline gap-1.5 border-b border-black/70 pb-1">
              <span className="font-bold shrink-0">Centro Educativo:</span>
              <span className="flex-1 truncate">
                {schoolName || '________________________________________________'}
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 border-b border-black/70 pb-1">
              <span className="font-bold shrink-0">Docente:</span>
              <span className="flex-1 truncate">
                {teacherName || '________________________________________________'}
              </span>
            </div>
            <div className="flex items-baseline gap-1.5 border-b border-black/70 pb-1">
              <span className="font-bold shrink-0">Estudiante:</span>
              <span className="flex-1">
                ____________________________________________________
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-baseline gap-1.5 border-b border-black/70 pb-1">
                <span className="font-bold shrink-0">Grado/Sec.:</span>
                <span className="truncate">{grade.replace(' de Secundaria', '')} / ____</span>
              </div>
              <div className="flex items-baseline gap-1.5 border-b border-black/70 pb-1">
                <span className="font-bold shrink-0">Fecha:</span>
                <span className="truncate">{todayFormatted}</span>
              </div>
            </div>
          </div>

          <div className="pt-1 text-xs">
            <span className="font-bold">Tema de la sesión: </span>
            <span className="font-medium">{customTopic}</span>
          </div>
        </header>

        {/* 2. COMPETENCIAS FUNDAMENTALES Y ESPECÍFICAS + 3. INDICADOR DE LOGRO */}
        <section className="border border-black rounded p-3 space-y-2 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <div className="font-bold uppercase text-[11px] tracking-wide border-b border-black/40 pb-0.5 mb-1">
                Competencias Específicas (Adecuación Curricular MINERD)
              </div>
              <ul className="space-y-1 list-disc list-inside text-[11px] leading-snug text-neutral-900">
                {capsule.minerdCompetencies.specific.map((comp, idx) => (
                  <li key={idx}>{comp}</li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <div>
                <div className="font-bold uppercase text-[11px] tracking-wide border-b border-black/40 pb-0.5 mb-1">
                  Competencias Fundamentales
                </div>
                <p className="text-[11px] text-neutral-900">
                  {capsule.minerdCompetencies.fundamental}
                </p>
              </div>
              <div>
                <div className="font-bold uppercase text-[11px] tracking-wide border-b border-black/40 pb-0.5 mb-1">
                  Indicador de Logro
                </div>
                <p className="text-[11px] font-medium text-black leading-snug">
                  {customIndicator}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 4. ACTIVIDAD 1 — ANÁLISIS CARTOGRÁFICO (15 MINUTOS) */}
        <section className="space-y-2 text-xs">
          <div className="flex items-center justify-between border-b border-black pb-1">
            <h3 className="font-bold text-sm uppercase tracking-wide">
              Actividad 1 — Análisis Cartográfico y Territorial (15 min)
            </h3>
            <span className="font-mono-tabular text-[11px] font-semibold">
              Época en el visor: {capsule.periodLabel}
            </span>
          </div>

          <p className="text-xs leading-relaxed text-neutral-900">
            <strong>Instrucción:</strong> {capsule.cartographicActivity}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="sm:col-span-2 space-y-3 pt-1">
              <div className="text-[11px] font-semibold text-neutral-800">
                1.1. Registra las demarcaciones, fronteras, rutas o puntos estratégicos observados en el mapa proyectado:
              </div>
              <div className="border-b border-black/60 h-5" />
              <div className="border-b border-black/60 h-5" />
              <div className="border-b border-black/60 h-5" />
              <div className="border-b border-black/60 h-5" />
            </div>

            <div className="border border-black rounded p-2 flex flex-col justify-between min-h-[115px]">
              <div className="text-[10px] font-bold uppercase text-center border-b border-black/40 pb-1">
                Croquis / Leyenda de Fronteras o Rutas
              </div>
              <div className="text-[10px] text-neutral-600 text-center my-auto py-4">
                [Espacio para trazar límites, flechas de campaña o puntos cardinales]
              </div>
              <div className="text-[9px] text-neutral-700 flex justify-between font-mono-tabular">
                <span>N ↑</span>
                <span>Mar Caribe / Atlántico</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5. ACTIVIDAD 2 — LECTURA CRÍTICA DE FUENTE PRIMARIA (20 MINUTOS) */}
        <section className="space-y-2.5 text-xs">
          <div className="flex items-center justify-between border-b border-black pb-1">
            <h3 className="font-bold text-sm uppercase tracking-wide">
              Actividad 2 — Lectura Crítica de Fuente Primaria (20 min)
            </h3>
            <span className="font-mono-tabular text-[11px]">
              Fuente: {capsule.year}
            </span>
          </div>

          <div className="border border-black rounded p-3 bg-neutral-50 print:bg-white space-y-1.5">
            <div className="text-[11px] font-bold">
              Documento: {capsule.documentTitle} ({capsule.author})
            </div>
            <blockquote className="font-display italic text-xs leading-relaxed text-black">
              {capsule.excerpt}
            </blockquote>
            {capsule.secondaryExcerpt && (
              <blockquote className="font-display italic text-[11px] leading-relaxed text-neutral-900 pt-1 border-t border-black/25">
                {capsule.secondaryExcerpt}
              </blockquote>
            )}
            <div className="text-[10px] text-neutral-700 pt-0.5">
              Referencia documental: {capsule.archiveRef}
            </div>
          </div>

          {/* 2 Preguntas de Desarrollo Reflexivo */}
          <div className="space-y-3 pt-1">
            {capsule.socraticQuestions.map((question, idx) => (
              <div key={idx} className="space-y-2">
                <div className="font-bold text-xs leading-snug">
                  2.{idx + 1}. {question}
                </div>
                <div className="border-b border-black/60 h-5" />
                <div className="border-b border-black/60 h-5" />
                <div className="border-b border-black/60 h-5" />
              </div>
            ))}
          </div>
        </section>

        {/* 6. MINI-RÚBRICA DE EVALUACIÓN RÁPIDA (3 NIVELES: LOGRADO, EN PROCESO, INICIADO) */}
        <section className="space-y-2 text-xs pt-1">
          <div className="font-bold text-xs uppercase tracking-wide border-b border-black pb-1">
            Rúbrica de Evaluación Formativa (Escala Curricular MINERD)
          </div>

          <table className="w-full border-collapse border border-black text-[11px]">
            <thead>
              <tr className="bg-neutral-100 print:bg-white">
                <th className="border border-black px-2 py-1 text-left w-1/4">
                  Criterio de Evaluación
                </th>
                <th className="border border-black px-2 py-1 text-left w-1/4">
                  Logrado (Destacado)
                </th>
                <th className="border border-black px-2 py-1 text-left w-1/4">
                  En Proceso
                </th>
                <th className="border border-black px-2 py-1 text-left w-1/4">
                  Iniciado
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-black px-2 py-1.5 font-semibold">
                  1. Ubicación espacio-temporal en el mapa
                </td>
                <td className="border border-black px-2 py-1.5">
                  Identifica con precisión límites, provincias y rutas históricas relacionándolas con el relieve. [ ]
                </td>
                <td className="border border-black px-2 py-1.5">
                  Ubica parcialmente las demarcaciones o rutas pero omite su relación geográfica. [ ]
                </td>
                <td className="border border-black px-2 py-1.5">
                  Requiere apoyo docente para distinguir las fronteras históricas en el mapa. [ ]
                </td>
              </tr>
              <tr>
                <td className="border border-black px-2 py-1.5 font-semibold">
                  2. Análisis crítico de fuente primaria
                </td>
                <td className="border border-black px-2 py-1.5">
                  Argumenta con ideas propias vinculando el documento primario con su contexto histórico. [ ]
                </td>
                <td className="border border-black px-2 py-1.5">
                  Parafrasea el fragmento documental con análisis contextual básico. [ ]
                </td>
                <td className="border border-black px-2 py-1.5">
                  Transcribe fragmentos literales sin responder las preguntas detonantes. [ ]
                </td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* PIE DE PÁGINA CON URLS OFICIALES DE REFERENCIA */}
        <footer className="pt-2 border-t border-black flex flex-wrap items-center justify-between gap-2 text-[10px] text-neutral-800">
          <div>
            <strong>Fuentes Oficiales de Consulta:</strong>{' '}
            <span>https://agn.gob.do</span> ·{' '}
            <span>https://libroabierto.do</span> ·{' '}
            <span>https://ministeriodeeducacion.gob.do</span> ·{' '}
            <span>https://tribunalconstitucional.gob.do</span>
          </div>
          <div className="font-mono-tabular">
            Generado en CronoMapa RD — Modo Docente
          </div>
        </footer>
      </div>

      {/* BARRA INFERIOR DE ACCIÓN RÁPIDA (OCULTA AL IMPRIMIR) */}
      <div className="w-full max-w-5xl mt-3 flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#161920] border border-[#C5A059]/35 text-xs text-[#F4F1EA] print:hidden">
        <div className="flex items-center gap-2 text-[#A39E93]">
          <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span>
            Consejo de impresión: en el cuadro de diálogo del navegador selecciona{' '}
            <strong className="text-[#F4F1EA]">&ldquo;Guardar como PDF&rdquo;</strong> o tu impresora escolar.
          </span>
        </div>

        <div className="flex items-center gap-2">
          {capsule.officialLinks?.[0] && (
            <a
              href={capsule.officialLinks[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C5A059]/40 text-[#D4AF37] hover:bg-[#C5A059]/10 font-medium"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Abrir {capsule.officialLinks[0].institution}</span>
            </a>
          )}
          <button
            type="button"
            onClick={handlePrintPdf}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] font-bold"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Descargar / Imprimir PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
}
