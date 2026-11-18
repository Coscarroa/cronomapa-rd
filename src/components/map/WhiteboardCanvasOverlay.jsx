import { useCallback, useEffect, useRef } from 'react';
import { Eraser, Highlighter, MousePointer, PenTool, Undo2 } from 'lucide-react';

/**
 * Lienzo de Anotación Táctil sobre el Mapa (HTML5 Canvas)
 * Diseñado para Pantallas Digitales Interactivas (PDI) en aulas de Ciencias Sociales.
 * Soporta PointerEvents (Mouse, lápiz óptico y pantallas táctiles) y conserva trazos al redimensionar.
 */
export default function WhiteboardCanvasOverlay({
  tool = 'navigate',
  strokeColor = '#E63946',
  clearNonce = 0,
  undoNonce = 0,
  onStrokesChange,
  onSelectTool,
  onSelectColor,
  onRequestClear,
  onRequestUndo,
}) {
  const canvasRef = useRef(null);
  const strokesRef = useRef([]);
  const activeStrokeRef = useRef(null);
  const isDrawingRef = useRef(false);

  const renderAllStrokes = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const drawSingleStroke = (stroke) => {
      if (!stroke || stroke.points.length === 0) return;
      ctx.save();
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = stroke.color;

      if (stroke.tool === 'highlighter') {
        ctx.globalAlpha = 0.34;
        ctx.lineWidth = 22 * dpr;
      } else {
        ctx.globalAlpha = 0.96;
        ctx.lineWidth = 4.2 * dpr;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.55)';
        ctx.shadowBlur = 4 * dpr;
      }

      ctx.beginPath();
      const firstPt = stroke.points[0];
      ctx.moveTo(firstPt.x * width * dpr, firstPt.y * height * dpr);

      if (stroke.points.length === 1) {
        ctx.lineTo(firstPt.x * width * dpr + 0.5, firstPt.y * height * dpr + 0.5);
      } else {
        for (let i = 1; i < stroke.points.length; i++) {
          const prev = stroke.points[i - 1];
          const curr = stroke.points[i];
          const midX = ((prev.x + curr.x) / 2) * width * dpr;
          const midY = ((prev.y + curr.y) / 2) * height * dpr;
          ctx.quadraticCurveTo(prev.x * width * dpr, prev.y * height * dpr, midX, midY);
        }
        const last = stroke.points[stroke.points.length - 1];
        ctx.lineTo(last.x * width * dpr, last.y * height * dpr);
      }

      ctx.stroke();
      ctx.restore();
    };

    for (const s of strokesRef.current) {
      drawSingleStroke(s);
    }
    if (activeStrokeRef.current) {
      drawSingleStroke(activeStrokeRef.current);
    }
  }, []);

  const syncCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const targetW = Math.max(1, Math.round(rect.width * dpr));
    const targetH = Math.max(1, Math.round(rect.height * dpr));
    if (canvas.width !== targetW || canvas.height !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
    }
    renderAllStrokes();
  }, [renderAllStrokes]);

  useEffect(() => {
    syncCanvasDimensions();
    window.addEventListener('resize', syncCanvasDimensions);
    return () => window.removeEventListener('resize', syncCanvasDimensions);
  }, [syncCanvasDimensions]);

  useEffect(() => {
    if (clearNonce === 0) return;
    strokesRef.current = [];
    activeStrokeRef.current = null;
    isDrawingRef.current = false;
    renderAllStrokes();
    onStrokesChange?.(0);
  }, [clearNonce, renderAllStrokes, onStrokesChange]);

  useEffect(() => {
    if (undoNonce === 0) return;
    if (strokesRef.current.length > 0) {
      strokesRef.current = strokesRef.current.slice(0, -1);
      renderAllStrokes();
      onStrokesChange?.(strokesRef.current.length);
    }
  }, [undoNonce, renderAllStrokes, onStrokesChange]);

  const getNormalizedPoint = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / Math.max(1, rect.width)));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / Math.max(1, rect.height)));
    return { x, y };
  };

  const handlePointerDown = (e) => {
    if (tool === 'navigate') return;
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (canvas && canvas.setPointerCapture) {
      try {
        canvas.setPointerCapture(e.pointerId);
      } catch {
        // Ignore pointer capture errors on synthetic events
      }
    }

    isDrawingRef.current = true;
    const pt = getNormalizedPoint(e);
    activeStrokeRef.current = {
      tool,
      color: strokeColor,
      points: [pt],
    };
    renderAllStrokes();
  };

  const handlePointerMove = (e) => {
    if (!isDrawingRef.current || !activeStrokeRef.current) return;
    e.preventDefault();
    const pt = getNormalizedPoint(e);
    activeStrokeRef.current.points.push(pt);
    renderAllStrokes();
  };

  const finishStroke = (e) => {
    if (!isDrawingRef.current || !activeStrokeRef.current) return;
    e?.preventDefault?.();
    strokesRef.current = [...strokesRef.current, activeStrokeRef.current];
    activeStrokeRef.current = null;
    isDrawingRef.current = false;
    renderAllStrokes();
    onStrokesChange?.(strokesRef.current.length);
  };

  const isDrawingMode = tool === 'pen' || tool === 'highlighter';

  return (
    <div
      className={`absolute inset-0 z-[845] print:hidden ${
        isDrawingMode ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <canvas
        ref={canvasRef}
        aria-label="Lienzo de anotación táctil de pizarra digital sobre el mapa"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishStroke}
        onPointerCancel={finishStroke}
        className={`w-full h-full block ${
          isDrawingMode
            ? 'pointer-events-auto cursor-crosshair touch-none'
            : 'pointer-events-none'
        }`}
      />

      {/* Barra rápida flotante superior de Pizarra cuando el docente está trazando en la PDI */}
      {isDrawingMode && (
        <div className="pointer-events-auto absolute top-3 left-1/2 -translate-x-1/2 z-[885] flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161920]/95 backdrop-blur-xl border border-[#D4AF37]/60 shadow-[0_14px_34px_rgba(0,0,0,0.75)] text-xs text-[#F4F1EA]">
          <span className="flex items-center gap-1.5 font-semibold text-[#D4AF37] whitespace-nowrap">
            {tool === 'pen' ? (
              <PenTool className="w-3.5 h-3.5" />
            ) : (
              <Highlighter className="w-3.5 h-3.5" />
            )}
            <span>
              {tool === 'pen' ? 'Pizarra PDI: Lápiz Táctico' : 'Pizarra PDI: Marcador Resaltador'}
            </span>
          </span>

          <div className="h-3.5 w-px bg-[#C5A059]/30" />

          {[
            { hex: '#E63946', title: 'Carmín (Ofensivas)' },
            { hex: '#457B9D', title: 'Azul (Defensas)' },
            { hex: '#D4AF37', title: 'Dorado (Fronteras/Cercos)' },
          ].map((c) => (
            <button
              key={c.hex}
              type="button"
              onClick={() => onSelectColor?.(c.hex)}
              title={c.title}
              aria-label={c.title}
              className={`w-5 h-5 rounded-full border transition-transform ${
                strokeColor.toUpperCase() === c.hex
                  ? 'border-[#F4F1EA] scale-115 ring-2 ring-[#D4AF37]/50'
                  : 'border-white/40 opacity-75 hover:opacity-100'
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}

          <div className="h-3.5 w-px bg-[#C5A059]/30" />

          {onRequestUndo && (
            <button
              type="button"
              onClick={onRequestUndo}
              title="Deshacer último trazo"
              className="px-2 py-1 rounded-md bg-[#0D0F12]/80 hover:bg-[#C5A059]/15 border border-[#C5A059]/30 text-[#F4F1EA] flex items-center gap-1"
            >
              <Undo2 className="w-3.5 h-3.5 text-[#C5A059]" />
              <span className="hidden sm:inline">Deshacer</span>
            </button>
          )}

          {onRequestClear && (
            <button
              type="button"
              onClick={onRequestClear}
              title="Borrar pizarra"
              className="px-2 py-1 rounded-md bg-[#9B2226]/30 hover:bg-[#9B2226]/60 border border-[#9B2226]/60 text-[#F4F1EA] flex items-center gap-1"
            >
              <Eraser className="w-3.5 h-3.5 text-[#E63946]" />
              <span className="hidden sm:inline">Limpiar</span>
            </button>
          )}

          {onSelectTool && (
            <button
              type="button"
              onClick={() => onSelectTool('navigate')}
              className="px-2.5 py-1 rounded-md bg-[#D4AF37] text-[#0D0F12] font-semibold flex items-center gap-1 hover:bg-[#C5A059] transition-colors whitespace-nowrap"
            >
              <MousePointer className="w-3.5 h-3.5" />
              <span>Mover Mapa</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}
