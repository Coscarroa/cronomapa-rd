import { useEffect, useMemo, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Compass,
  Flag,
  Landmark,
  Map as MapIcon,
  MapPin,
  Play,
  Route,
  Scale,
  Sparkles,
  Swords,
  Users,
  X,
} from 'lucide-react';
import {
  HISTORICAL_ENCYCLOPEDIA_PERIODS,
  type HistoricalEncyclopediaPeriod,
} from '../../data/historicalEncyclopediaData';
import { MILESTONE_CATEGORY_STYLE } from '../map/HistoricalMarkersLayer';
import type {
  AnimatedHistoricalRoute,
  ExplorePeriodId,
  HistoricalMilestone,
} from '../../types/history';

interface HistoricalExploreModalProps {
  isOpen: boolean;
  initialPeriodId?: ExplorePeriodId | null;
  onClose: () => void;
  milestones: HistoricalMilestone[];
  animatedRoutes: AnimatedHistoricalRoute[];
  onExplorePeriodOnMap: (period: HistoricalEncyclopediaPeriod) => void;
  onSelectMilestone: (milestone: HistoricalMilestone) => void;
  onStartAnimatedRoute: (route: AnimatedHistoricalRoute, autoPlay?: boolean) => void;
}

type InnerReadTab = 'sintesis' | 'hitos' | 'ruta';

export default function HistoricalExploreModal({
  isOpen,
  initialPeriodId,
  onClose,
  milestones,
  animatedRoutes,
  onExplorePeriodOnMap,
  onSelectMilestone,
  onStartAnimatedRoute,
}: HistoricalExploreModalProps) {
  const [selectedPeriodId, setSelectedPeriodId] = useState<ExplorePeriodId>(
    initialPeriodId ?? 'taina',
  );
  const [activeReadTab, setActiveReadTab] = useState<InnerReadTab>('sintesis');
  const [expandedSectionIds, setExpandedSectionIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (initialPeriodId) {
      setSelectedPeriodId(initialPeriodId);
    }
  }, [initialPeriodId]);

  const activePeriod = useMemo(
    () =>
      HISTORICAL_ENCYCLOPEDIA_PERIODS.find((p) => p.id === selectedPeriodId) ??
      HISTORICAL_ENCYCLOPEDIA_PERIODS[0],
    [selectedPeriodId],
  );

  // Expand the first two accordion sections by default whenever the period changes
  useEffect(() => {
    const initialMap: Record<string, boolean> = {};
    activePeriod.secciones.forEach((sec, idx) => {
      initialMap[sec.id] = idx === 0;
    });
    setExpandedSectionIds(initialMap);
    setActiveReadTab('sintesis');
  }, [activePeriod]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const periodMilestones = useMemo(
    () => milestones.filter((m) => m.periodId === activePeriod.id),
    [milestones, activePeriod.id],
  );

  const periodRoute = useMemo(
    () =>
      activePeriod.routeId
        ? animatedRoutes.find((r) => r.id === activePeriod.routeId) ?? null
        : null,
    [animatedRoutes, activePeriod.routeId],
  );

  if (!isOpen) return null;

  const toggleAccordion = (secId: string) => {
    setExpandedSectionIds((prev) => ({
      ...prev,
      [secId]: !prev[secId],
    }));
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="explore-encyclopedia-title"
      className="fixed inset-0 z-[1100] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/75 backdrop-blur-sm print:hidden"
    >
      <div className="relative w-full max-w-6xl h-[88vh] max-h-[820px] bg-slate-900/95 backdrop-blur-xl border border-[#C5A059]/45 rounded-2xl shadow-[0_28px_80px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-[#F4F1EA]">
        {/* Top Modal Header */}
        <div className="px-5 py-3.5 border-b border-[#C5A059]/30 bg-[#0D0F12]/80 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/45 flex items-center justify-center text-[#D4AF37] shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#C5A059] font-semibold">
                Enciclopedia Cartográfica Interactiva · Sección Explorar
              </div>
              <h2
                id="explore-encyclopedia-title"
                className="font-display text-base sm:text-lg font-bold text-[#F4F1EA] truncate"
              >
                5 Grandes Períodos, 16 Hitos Geográficos y 3 Rutas Históricas
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar enciclopedia histórica"
            className="w-9 h-9 rounded-lg border border-[#C5A059]/30 bg-[#161920] text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#D4AF37] flex items-center justify-center transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Body: Left Period Selector + Right Structured Reading Panel */}
        <div className="flex-1 min-h-0 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Navigation Column: 5 Historical Periods */}
          <nav
            aria-label="Períodos históricos de la República Dominicana"
            className="lg:w-72 shrink-0 border-b lg:border-b-0 lg:border-r border-[#C5A059]/25 bg-[#0D0F12]/65 p-3 overflow-x-auto lg:overflow-y-auto gis-scroll flex lg:flex-col gap-2"
          >
            <div className="hidden lg:block px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[#C5A059] font-semibold">
              Seleccionar Época (5)
            </div>
            {HISTORICAL_ENCYCLOPEDIA_PERIODS.map((period) => {
              const isSelected = period.id === activePeriod.id;
              const countMilestones = milestones.filter((m) => m.periodId === period.id).length;

              return (
                <button
                  key={period.id}
                  type="button"
                  onClick={() => setSelectedPeriodId(period.id)}
                  className={`text-left p-3 rounded-xl border transition-all shrink-0 w-60 lg:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isSelected
                      ? 'bg-[#161920] border-[#D4AF37] shadow-[0_6px_20px_rgba(0,0,0,0.5)]'
                      : 'bg-[#0D0F12]/50 border-[#C5A059]/20 hover:border-[#C5A059]/50 hover:bg-[#161920]/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 font-mono-tabular text-[10px] font-bold uppercase tracking-wider text-[#C5A059]">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: period.color }}
                      />
                      <span>
                        0{period.numero} · {period.rangoAniosLabel}
                      </span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-[#0D0F12] border border-[#C5A059]/25 font-mono-tabular text-[10px] text-[#D4AF37]">
                      {countMilestones} hitos
                    </span>
                  </div>
                  <div className="font-display text-sm font-bold text-[#F4F1EA] mt-1">
                    {period.titulo}
                  </div>
                  <p className="text-[11px] text-[#A39E93] line-clamp-2 mt-0.5 leading-snug">
                    {period.subtitulo}
                  </p>
                </button>
              );
            })}
          </nav>

          {/* Right Structured Reading & Interactive GIS Connection Panel */}
          <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
            {/* Period Hero Banner + Primary Map Action Button */}
            <div className="p-4 sm:p-5 border-b border-[#C5A059]/25 bg-gradient-to-r from-[#0D0F12]/90 via-[#161920]/90 to-[#0D0F12]/90 shrink-0 space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-tabular font-bold uppercase tracking-wider text-[#F4F1EA]"
                      style={{ backgroundColor: activePeriod.color }}
                    >
                      Período {activePeriod.numero} · {activePeriod.rangoAniosLabel}
                    </span>
                    <span className="text-xs text-[#C5A059] font-medium">
                      {periodMilestones.length} hitos geográficos
                      {periodRoute ? ' · 1 ruta interactiva trazada' : ''}
                    </span>
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F4F1EA]">
                    {activePeriod.titulo}
                  </h3>
                  <p className="text-xs text-[#A39E93]">{activePeriod.subtitulo}</p>
                </div>

                {/* Primary Button required by Prompt: "🗺️ Ver hitos y rutas de esta época en el mapa" */}
                <button
                  type="button"
                  onClick={() => {
                    onExplorePeriodOnMap(activePeriod);
                    onClose();
                  }}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] font-bold text-xs sm:text-sm shadow-[0_8px_24px_rgba(212,175,55,0.35)] transition-all shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F4F1EA]"
                >
                  <MapIcon className="w-4 h-4 shrink-0" />
                  <span>🗺️ Ver hitos y rutas de esta época en el mapa</span>
                </button>
              </div>

              {/* Inner Structured Navigation Tabs */}
              <div
                role="tablist"
                aria-label="Secciones del período histórico"
                className="flex flex-wrap items-center gap-1.5 pt-1"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeReadTab === 'sintesis'}
                  onClick={() => setActiveReadTab('sintesis')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    activeReadTab === 'sintesis'
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                      : 'bg-[#0D0F12]/70 text-[#A39E93] border-[#C5A059]/25 hover:text-[#F4F1EA]'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Resumen y Aspectos Clave</span>
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeReadTab === 'hitos'}
                  onClick={() => setActiveReadTab('hitos')}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                    activeReadTab === 'hitos'
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                      : 'bg-[#0D0F12]/70 text-[#A39E93] border-[#C5A059]/25 hover:text-[#F4F1EA]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Hitos Geográficos ({periodMilestones.length})</span>
                </button>

                {periodRoute && (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeReadTab === 'ruta'}
                    onClick={() => setActiveReadTab('ruta')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                      activeReadTab === 'ruta'
                        ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                        : 'bg-[#0D0F12]/70 text-[#A39E93] border-[#C5A059]/25 hover:text-[#F4F1EA]'
                    }`}
                  >
                    <Route className="w-3.5 h-3.5" />
                    <span>Ruta Trazada y Recorrido Animado</span>
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Tab Content Area */}
            <div className="flex-1 overflow-y-auto gis-scroll p-4 sm:p-6 space-y-5">
              {/* TAB 1: RESUMEN Y ACORDEONES ESTRUCTURADOS */}
              {activeReadTab === 'sintesis' && (
                <>
                  {/* Resumen Ejecutivo */}
                  <div className="rounded-xl border border-[#C5A059]/35 bg-[#0D0F12]/80 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                      <Sparkles className="w-4 h-4 shrink-0" />
                      <span>Resumen Histórico</span>
                    </div>
                    <p className="text-sm text-[#F4F1EA]/95 leading-relaxed">
                      {activePeriod.resumen}
                    </p>
                  </div>

                  {/* Acordeones de Aspectos Clave / Etapas */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-[#C5A059]">
                        {activePeriod.seccionesTitulo}
                      </h4>
                      <button
                        type="button"
                        onClick={() => {
                          const allOpen = activePeriod.secciones.every(
                            (s) => expandedSectionIds[s.id],
                          );
                          const next: Record<string, boolean> = {};
                          activePeriod.secciones.forEach((s) => {
                            next[s.id] = !allOpen;
                          });
                          setExpandedSectionIds(next);
                        }}
                        className="text-[11px] text-[#D4AF37] hover:underline"
                      >
                        {activePeriod.secciones.every((s) => expandedSectionIds[s.id])
                          ? 'Contraer secciones'
                          : 'Expandir todas las secciones'}
                      </button>
                    </div>

                    {activePeriod.secciones.map((sec, idx) => {
                      const isExpanded = Boolean(expandedSectionIds[sec.id]);
                      return (
                        <div
                          key={sec.id}
                          className="rounded-xl border border-[#C5A059]/30 bg-[#0D0F12]/70 overflow-hidden transition-colors"
                        >
                          <button
                            type="button"
                            onClick={() => toggleAccordion(sec.id)}
                            aria-expanded={isExpanded}
                            className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-3 hover:bg-[#161920]/80 transition-colors"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span
                                className="w-6 h-6 rounded-full text-xs font-mono-tabular font-bold flex items-center justify-center shrink-0 text-[#F4F1EA]"
                                style={{ backgroundColor: activePeriod.color }}
                              >
                                {idx + 1}
                              </span>
                              <div className="min-w-0">
                                <div className="font-display text-sm sm:text-base font-bold text-[#F4F1EA]">
                                  {sec.titulo}
                                </div>
                                {sec.subtitulo && (
                                  <div className="text-xs text-[#C5A059] truncate">
                                    {sec.subtitulo}
                                  </div>
                                )}
                              </div>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#D4AF37] shrink-0" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#A39E93] shrink-0" />
                            )}
                          </button>

                          {isExpanded && (
                            <div className="px-4 pb-4 pt-2 border-t border-[#C5A059]/20 space-y-3 bg-[#161920]/40">
                              <p className="text-xs sm:text-sm text-[#F4F1EA]/90 leading-relaxed">
                                {sec.contenido}
                              </p>
                              <ul className="space-y-2">
                                {sec.puntosClave.map((punto) => (
                                  <li
                                    key={punto}
                                    className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F4F1EA]/85 leading-relaxed"
                                  >
                                    <span
                                      className="w-2 h-2 rounded-full mt-1.5 shrink-0"
                                      style={{ backgroundColor: activePeriod.color }}
                                    />
                                    <span>{punto}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Cierre Histórico y Protagonistas */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="rounded-xl border border-[#C5A059]/30 bg-[#0D0F12]/75 p-4 space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                        {activePeriod.cierreTitulo}
                      </div>
                      <p className="text-xs sm:text-sm text-[#F4F1EA]/85 leading-relaxed">
                        {activePeriod.cierreTexto}
                      </p>
                    </div>

                    <div className="rounded-xl border border-[#C5A059]/30 bg-[#0D0F12]/75 p-4 space-y-3">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                        <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Protagonistas y Fuentes</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {activePeriod.protagonistasDestacados.map((prot) => (
                          <span
                            key={prot}
                            className="px-2 py-1 rounded-md bg-[#161920] border border-[#C5A059]/25 text-[11px] text-[#F4F1EA]"
                          >
                            {prot}
                          </span>
                        ))}
                      </div>
                      <div className="pt-1 border-t border-[#C5A059]/15 text-[11px] text-[#A39E93] space-y-0.5">
                        {activePeriod.fuentesBibliograficas.map((f) => (
                          <div key={f}>• {f}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Acceso Rápido a los Hitos de esta Época desde la vista de lectura */}
                  <div className="rounded-xl border border-[#C5A059]/35 bg-[#0D0F12]/80 p-4 space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                        📍 Hitos Geográficos de {activePeriod.titulo} (Clic para volar en el mapa)
                      </div>
                      <span className="text-[11px] text-[#A39E93]">flyTo directo</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                      {periodMilestones.map((m) => {
                        const catStyle =
                          MILESTONE_CATEGORY_STYLE[m.category] ??
                          MILESTONE_CATEGORY_STYLE.Fundación;
                        return (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              onSelectMilestone(m);
                              onClose();
                            }}
                            className="text-left p-3 rounded-xl border border-[#C5A059]/25 bg-[#161920]/85 hover:border-[#D4AF37] hover:bg-[#161920] transition-all flex flex-col justify-between gap-2 group"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center justify-between gap-1.5">
                                <span
                                  className="px-2 py-0.5 rounded text-[10px] font-bold"
                                  style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
                                >
                                  {m.category}
                                </span>
                                <span className="font-mono-tabular text-[11px] text-[#C5A059]">
                                  Año {m.year}
                                </span>
                              </div>
                              <div className="font-display text-xs sm:text-sm font-bold text-[#F4F1EA] group-hover:text-[#D4AF37] transition-colors">
                                {m.title}
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-[10px] font-mono-tabular text-[#A39E93] pt-1 border-t border-[#C5A059]/15">
                              <span>
                                {m.lat.toFixed(4)}° N, {Math.abs(m.lng).toFixed(4)}° O
                              </span>
                              <span className="text-[#D4AF37] font-semibold">Ubicar →</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}

              {/* TAB 2: HITOS GEOGRÁFICOS CON COORDENADAS EXACTAS */}
              {activeReadTab === 'hitos' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs text-[#A39E93]">
                      Haz clic en cualquier hito para realizar un desplazamiento suave (
                      <code className="text-[#D4AF37]">flyTo</code>) hacia sus coordenadas exactas y
                      abrir su ficha historiográfica.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                    {periodMilestones.map((m) => {
                      const catStyle =
                        MILESTONE_CATEGORY_STYLE[m.category] ?? MILESTONE_CATEGORY_STYLE.Fundación;
                      return (
                        <div
                          key={m.id}
                          className="rounded-xl border border-[#C5A059]/35 bg-[#0D0F12]/80 p-4 flex flex-col justify-between gap-3 hover:border-[#D4AF37] transition-colors"
                        >
                          <div className="space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <span
                                className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-bold"
                                style={{ backgroundColor: catStyle.bg, color: catStyle.text }}
                              >
                                {m.category === 'Batalla' ? (
                                  <Swords className="w-3 h-3" />
                                ) : m.category === 'Política' ? (
                                  <Flag className="w-3 h-3" />
                                ) : m.category === 'Derechos' ? (
                                  <Scale className="w-3 h-3" />
                                ) : (
                                  <Landmark className="w-3 h-3" />
                                )}
                                <span>{m.category}</span>
                              </span>
                              <span className="font-mono-tabular text-xs text-[#D4AF37] font-semibold">
                                {m.date} ({m.year})
                              </span>
                            </div>

                            <h5 className="font-display text-base font-bold text-[#F4F1EA]">
                              {m.title}
                            </h5>

                            <div className="flex items-center justify-between text-xs text-[#C5A059] font-mono-tabular">
                              <span>{m.province}</span>
                              <span>
                                Lat: {m.lat.toFixed(4)}, Lng: {m.lng.toFixed(4)}
                              </span>
                            </div>

                            <p className="text-xs text-[#F4F1EA]/85 leading-relaxed">{m.summary}</p>
                          </div>

                          <button
                            type="button"
                            onClick={() => {
                              onSelectMilestone(m);
                              onClose();
                            }}
                            className="w-full py-2 px-3 rounded-lg bg-[#161920] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0D0F12] border border-[#C5A059]/40 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5" />
                            <span>Volar al Hito en el Mapa (flyTo)</span>
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: RUTA HISTÓRICA TRAZADA Y RECORRIDO ANIMADO PASO A PASO */}
              {activeReadTab === 'ruta' && periodRoute && (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#C5A059]/40 bg-[#0D0F12]/85 p-4 sm:p-5 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 text-xs font-mono-tabular text-[#C5A059]">
                          <span
                            className="w-3 h-3 rounded-full inline-block"
                            style={{ backgroundColor: periodRoute.color }}
                          />
                          <span>
                            Polilínea Interactiva · {periodRoute.dates} · {periodRoute.stops.length}{' '}
                            paradas
                          </span>
                        </div>
                        <h4 className="font-display text-lg font-bold text-[#F4F1EA] mt-1">
                          {periodRoute.title}
                        </h4>
                        <p className="text-xs text-[#A39E93] mt-0.5">{periodRoute.subtitle}</p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onStartAnimatedRoute(periodRoute, true);
                            onClose();
                          }}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#D4AF37] hover:bg-[#C5A059] text-[#0D0F12] font-bold text-xs shadow-md transition-colors"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>▶ Reproducir Ruta Animada</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            onStartAnimatedRoute(periodRoute, false);
                            onClose();
                          }}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-[#D4AF37]/60 bg-[#161920] hover:bg-[#D4AF37]/15 text-[#D4AF37] font-semibold text-xs transition-colors"
                        >
                          <Compass className="w-3.5 h-3.5" />
                          <span>Modo Paso a Paso (Parada 1)</span>
                        </button>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#F4F1EA]/90 leading-relaxed">
                      {periodRoute.summary}
                    </p>
                  </div>

                  {/* Lista de Paradas del Recorrido Guiado */}
                  <div className="space-y-2.5">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#C5A059]">
                      Paradas del Recorrido Guiado Paso a Paso
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {periodRoute.stops.map((stop) => (
                        <div
                          key={stop.order}
                          className="rounded-xl border border-[#C5A059]/25 bg-[#0D0F12]/75 p-3.5 flex items-start gap-3"
                        >
                          <span
                            className="w-7 h-7 rounded-full font-mono-tabular text-xs font-bold flex items-center justify-center shrink-0 text-[#F4F1EA]"
                            style={{ backgroundColor: periodRoute.color }}
                          >
                            {stop.order}
                          </span>
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center justify-between gap-2 text-[11px] font-mono-tabular text-[#C5A059]">
                              <span>{stop.date}</span>
                              <span>
                                {stop.lat.toFixed(4)}° N, {Math.abs(stop.lng).toFixed(4)}° O
                              </span>
                            </div>
                            <div className="font-display text-sm font-bold text-[#F4F1EA]">
                              {stop.name}
                            </div>
                            <p className="text-xs text-[#F4F1EA]/80 leading-relaxed">
                              {stop.narrative}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
