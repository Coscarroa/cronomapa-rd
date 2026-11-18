import { useState } from 'react';
import {
  ChevronDown,
  ChevronUp,
  Eraser,
  FileText,
  GraduationCap,
  Highlighter,
  MonitorUp,
  MousePointer,
  PenTool,
  ScrollText,
  Undo2,
  Zap,
} from 'lucide-react';

export const TACTICAL_COLORS = [
  {
    id: 'carmin',
    hex: '#E63946',
    label: 'Carmín (Ofensivas)',
    shortLabel: 'Ofensivas',
  },
  {
    id: 'azul',
    hex: '#457B9D',
    label: 'Azul (Defensas)',
    shortLabel: 'Defensas',
  },
  {
    id: 'dorado',
    hex: '#D4AF37',
    label: 'Dorado (Fronteras/Cercos)',
    shortLabel: 'Fronteras',
  },
];

export default function TeacherToolbar({
  sidebarOpen = false,
  isPdiMode = false,
  onTogglePdiMode,
  whiteboardTool = 'navigate',
  onChangeWhiteboardTool,
  strokeColor = '#E63946',
  onChangeStrokeColor,
  onClearWhiteboard,
  onUndoWhiteboard,
  hasStrokes = false,
  primarySourceOpen = false,
  onTogglePrimarySource,
  onOpenWorksheetModal,
  onOpenTriviaModal,
  activeEpochLabel = 'Época Actual',
}) {
  const [collapsed, setCollapsed] = useState(false);

  const leftOffsetClass =
    sidebarOpen && !isPdiMode ? 'left-4 md:left-[304px]' : 'left-4';

  return (
    <aside
      aria-label="Barra de herramientas del Modo Docente"
      className={`fixed md:absolute top-16 ${leftOffsetClass} z-[925] w-64 sm:w-68 bg-slate-900/90 backdrop-blur-md border border-[#D4AF37]/50 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] text-[#F4F1EA] transition-all duration-200 select-none print:hidden`}
    >
      {/* Encabezado de la Barra Docente */}
      <div className="px-3.5 py-2.5 border-b border-[#C5A059]/25 flex items-center justify-between gap-2 bg-[#0D0F12]/60 rounded-t-xl">
        <div className="flex items-center gap-2 min-w-0">
          <span className="w-6 h-6 rounded-md bg-[#D4AF37] text-[#0D0F12] flex items-center justify-center shrink-0 shadow-sm">
            <GraduationCap className="w-4 h-4" />
          </span>
          <div className="min-w-0">
            <div className="font-display text-xs font-semibold text-[#F4F1EA] truncate">
              Aula de Ciencias Sociales
            </div>
            <div className="text-[10px] text-[#C5A059] font-mono-tabular truncate">
              {activeEpochLabel}
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          aria-expanded={!collapsed}
          aria-label={collapsed ? 'Expandir herramientas docentes' : 'Contraer herramientas docentes'}
          className="p-1.5 rounded-lg text-[#A39E93] hover:text-[#D4AF37] hover:bg-[#C5A059]/15 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {!collapsed && (
        <div className="p-3 space-y-3">
          {/* 1. Modo Proyección PDI (Alto Contraste +18% lectura a distancia) */}
          <button
            type="button"
            onClick={onTogglePdiMode}
            aria-pressed={isPdiMode}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
              isPdiMode
                ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.35)]'
                : 'bg-[#0D0F12]/80 text-[#F4F1EA] border-[#C5A059]/35 hover:border-[#D4AF37]'
            }`}
          >
            <span className="flex items-center gap-2 truncate">
              <MonitorUp className="w-4 h-4 shrink-0" />
              <span className="truncate">Modo Proyección PDI</span>
            </span>
            <span
              className={`font-mono-tabular text-[10px] px-1.5 py-0.5 rounded ${
                isPdiMode
                  ? 'bg-[#0D0F12]/20 text-[#0D0F12] font-bold'
                  : 'text-[#C5A059]'
              }`}
            >
              +18%
            </span>
          </button>

          {/* 2. Pizarra Digital Interactiva (HTML5 Canvas) */}
          <div className="p-2.5 rounded-lg bg-[#0D0F12]/75 border border-[#C5A059]/25 space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#C5A059]">
              <span>Pizarra Táctica sobre Mapa</span>
              <span className="font-mono-tabular text-[10px] text-[#A39E93]">
                {whiteboardTool === 'navigate'
                  ? 'Mapa libre'
                  : whiteboardTool === 'pen'
                    ? 'Lápiz activo'
                    : 'Resaltador'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <button
                type="button"
                onClick={() => onChangeWhiteboardTool('navigate')}
                aria-pressed={whiteboardTool === 'navigate'}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  whiteboardTool === 'navigate'
                    ? 'bg-[#1D3557] text-[#F4F1EA] border-[#D4AF37]/70'
                    : 'bg-[#161920] text-[#A39E93] border-[#C5A059]/20 hover:text-[#F4F1EA]'
                }`}
              >
                <MousePointer className="w-3.5 h-3.5 shrink-0" />
                <span>Navegar</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeWhiteboardTool('pen')}
                aria-pressed={whiteboardTool === 'pen'}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  whiteboardTool === 'pen'
                    ? 'bg-[#1D3557] text-[#F4F1EA] border-[#D4AF37]/70'
                    : 'bg-[#161920] text-[#A39E93] border-[#C5A059]/20 hover:text-[#F4F1EA]'
                }`}
              >
                <PenTool className="w-3.5 h-3.5 shrink-0" />
                <span>Lápiz Táctico</span>
              </button>

              <button
                type="button"
                onClick={() => onChangeWhiteboardTool('highlighter')}
                aria-pressed={whiteboardTool === 'highlighter'}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  whiteboardTool === 'highlighter'
                    ? 'bg-[#1D3557] text-[#F4F1EA] border-[#D4AF37]/70'
                    : 'bg-[#161920] text-[#A39E93] border-[#C5A059]/20 hover:text-[#F4F1EA]'
                }`}
              >
                <Highlighter className="w-3.5 h-3.5 shrink-0" />
                <span>Resaltador</span>
              </button>

              <button
                type="button"
                onClick={onClearWhiteboard}
                disabled={!hasStrokes}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium border border-[#9B2226]/50 bg-[#9B2226]/20 hover:bg-[#9B2226]/40 text-[#F4F1EA] disabled:opacity-40 disabled:pointer-events-none transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Eraser className="w-3.5 h-3.5 shrink-0 text-[#E63946]" />
                <span>Borrar</span>
              </button>
            </div>

            {/* Selector de 3 colores tácticos */}
            <div className="pt-1 border-t border-[#C5A059]/15 flex items-center justify-between gap-1.5">
              <div className="flex items-center gap-1.5">
                {TACTICAL_COLORS.map((col) => {
                  const selected = strokeColor.toUpperCase() === col.hex.toUpperCase();
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => {
                        onChangeStrokeColor(col.hex);
                        if (whiteboardTool === 'navigate') {
                          onChangeWhiteboardTool('pen');
                        }
                      }}
                      title={col.label}
                      aria-label={col.label}
                      aria-pressed={selected}
                      className={`flex items-center gap-1 px-2 py-1 rounded-md border text-[10px] font-medium transition-all ${
                        selected
                          ? 'border-[#F4F1EA] bg-[#161920] text-[#F4F1EA] shadow-sm scale-[1.03]'
                          : 'border-transparent bg-[#161920]/60 text-[#A39E93] hover:text-[#F4F1EA]'
                      }`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0 border border-white/40"
                        style={{ backgroundColor: col.hex }}
                      />
                      <span>{col.shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              {onUndoWhiteboard && (
                <button
                  type="button"
                  onClick={onUndoWhiteboard}
                  disabled={!hasStrokes}
                  title="Deshacer último trazo"
                  aria-label="Deshacer último trazo"
                  className="p-1 rounded-md border border-[#C5A059]/25 text-[#A39E93] hover:text-[#F4F1EA] disabled:opacity-35 disabled:pointer-events-none"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* 3. Cápsulas de Fuentes Primarias (AGN / MINERD) */}
          <button
            type="button"
            onClick={onTogglePrimarySource}
            aria-pressed={primarySourceOpen}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg border text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
              primarySourceOpen
                ? 'bg-[#1D3557] text-[#F4F1EA] border-[#D4AF37]'
                : 'bg-[#0D0F12]/80 text-[#F4F1EA] border-[#C5A059]/35 hover:border-[#D4AF37] hover:bg-[#C5A059]/10'
            }`}
          >
            <span className="flex items-center gap-2 truncate">
              <ScrollText className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="truncate">📜 Fuente Primaria (AGN)</span>
            </span>
            <span className="text-[10px] font-mono-tabular text-[#C5A059]">Debate</span>
          </button>

          {/* 4. Generador de Guías Didácticas en PDF (Adecuación Curricular MINERD) */}
          <button
            type="button"
            onClick={onOpenWorksheetModal}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] text-xs font-bold shadow-[0_6px_20px_rgba(212,175,55,0.28)] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EA]"
          >
            <FileText className="w-4 h-4 shrink-0" />
            <span>📄 Generar Guía de Clase (PDF)</span>
          </button>

          {/* 5. Desafío Rápido en Clase (Trivia PDI de Cierre Formativo 5 min) */}
          {onOpenTriviaModal && (
            <button
              type="button"
              onClick={onOpenTriviaModal}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-[#9B2226] hover:bg-[#B2282D] text-[#F4F1EA] border border-[#D4AF37]/60 text-xs font-bold shadow-[0_6px_20px_rgba(155,34,38,0.4)] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <Zap className="w-4 h-4 text-[#D4AF37] fill-current shrink-0" />
              <span>⚡ Desafío de Cierre (5 min)</span>
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
