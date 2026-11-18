import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  Clock,
  GraduationCap,
  HelpCircle,
  Info,
  Landmark,
  Map as MapIcon,
  MapPin,
  Play,
  Route,
  ScrollText,
  Search,
  SplitSquareHorizontal,
  Square,
  Swords,
  Users,
  X,
} from 'lucide-react';
import type {
  AnimatedHistoricalRoute,
  ColonialMonument,
  ExplorePeriodId,
  HistoricalEvent,
  HistoricalMilestone,
  HistoricalRoute,
  PresidenteRD,
  ViewMode,
} from '../../types/history';
import AboutModal from './AboutModal';

export type QuickExploreTopic =
  | 'presidentes_provincia'
  | 'trujillo'
  | 'balaguer'
  | 'cacicazgos_1492';

export interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  tourActive?: boolean;
  onStartTour: () => void;
  onStopTour?: () => void;
  onSelectQuickExplore: (topic: QuickExploreTopic) => void;
  onOpenExploreModal?: (periodId?: ExplorePeriodId) => void;
  onResetMap: () => void;
  compareMode?: boolean;
  onToggleCompare?: () => void;
  onOpenMapsPanel?: () => void;
  onActivateRoutesLayer?: () => void;
  showMilestones?: boolean;
  onToggleMilestones?: () => void;
  milestones?: HistoricalMilestone[];
  onJumpToMilestone?: (milestone: HistoricalMilestone) => void;
  animatedRoutes?: AnimatedHistoricalRoute[];
  activeAnimatedRouteId?: string | null;
  onStartAnimatedRoute?: (route: AnimatedHistoricalRoute) => void;
  onOpenVintageGallery?: () => void;
  hasActiveVintageOverlay?: boolean;
  onOpenGuide?: () => void;
  isTeacherMode?: boolean;
  onToggleTeacherMode?: () => void;
  colonialMonuments?: ColonialMonument[];
  onJumpToMonument?: (monument: ColonialMonument) => void;
  routes?: HistoricalRoute[];
  events?: HistoricalEvent[];
  presidents?: PresidenteRD[];
  onSelectRoute?: (route: HistoricalRoute) => void;
  onSelectEvent?: (evt: HistoricalEvent) => void;
  onSelectPresident?: (pres: PresidenteRD) => void;
}

export default function Header({
  viewMode,
  setViewMode,
  searchQuery,
  setSearchQuery,
  tourActive = false,
  onStartTour,
  onStopTour,
  onOpenExploreModal,
  onResetMap,
  compareMode = false,
  onToggleCompare,
  milestones = [],
  onJumpToMilestone,
  onOpenVintageGallery,
  hasActiveVintageOverlay = false,
  onOpenGuide,
  isTeacherMode = false,
  onToggleTeacherMode,
  colonialMonuments = [],
  onJumpToMonument,
  routes = [],
  events = [],
  presidents = [],
  onSelectRoute,
  onSelectEvent,
  onSelectPresident,
}: HeaderProps) {
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const helpMenuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (helpMenuRef.current && !helpMenuRef.current.contains(target)) {
        setHelpMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchFocused(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setHelpMenuOpen(false);
        setSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (q.length < 2) return null;

    const matchedEvents = events
      .filter((ev) =>
        `${ev.properties.titulo} ${ev.properties.provincia} ${ev.properties.periodo} ${ev.properties.personajes.join(' ')}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 4);

    const matchedMilestones = milestones
      .filter((m) =>
        `${m.title} ${m.province} ${m.epoch} ${m.protagonists.join(' ')}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 3);

    const matchedRoutes = routes
      .filter((rt) =>
        `${rt.properties.titulo} ${rt.properties.epoca} ${rt.properties.protagonistas.join(' ')}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 3);

    const matchedPresidents = presidents
      .filter((pr) =>
        `${pr.nombre} ${pr.provincia_nacimiento} ${pr.municipio_nacimiento} ${pr.partido}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 4);

    const matchedMonuments = colonialMonuments
      .filter((mon) =>
        `${mon.name} ${mon.shortName} ${mon.province} ${mon.locationLabel} ${mon.architecturalStyle}`
          .toLowerCase()
          .includes(q),
      )
      .slice(0, 4);

    return {
      events: matchedEvents,
      milestones: matchedMilestones,
      routes: matchedRoutes,
      presidents: matchedPresidents,
      monuments: matchedMonuments,
      total:
        matchedEvents.length +
        matchedMilestones.length +
        matchedRoutes.length +
        matchedPresidents.length +
        matchedMonuments.length,
    };
  }, [searchQuery, events, milestones, routes, presidents, colonialMonuments]);

  const handleInicioClick = () => {
    setViewMode('map');
    onResetMap();
  };

  return (
    <>
      <header className="relative z-[980] h-14 shrink-0 bg-slate-900/90 backdrop-blur-md border-b border-[#C5A059]/30 shadow-[0_8px_24px_rgba(0,0,0,0.5)] select-none print:hidden">
        <div className="h-full px-3 sm:px-5 flex items-center justify-between gap-2.5 sm:gap-4">
          {/* 1. IZQUIERDA: Logo + Título compacto "CronoMapa RD" */}
          <button
            type="button"
            onClick={handleInicioClick}
            title="Centrar mapa en la República Dominicana"
            className="flex items-center gap-2.5 text-left shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[#C5A059]/50 bg-[#161920] shadow-sm shrink-0 group-hover:border-[#D4AF37] transition-colors">
              <img
                src="/assets/aistudio/logo_cf5a0697.jpeg"
                alt="Logo CronoMapa RD"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = '/logo-cronomapa.png';
                }}
              />
            </div>
            <span className="font-display text-base sm:text-lg font-bold tracking-tight text-[#F4F1EA] group-hover:text-[#D4AF37] transition-colors whitespace-nowrap">
              CronoMapa RD
            </span>
          </button>

          {/* 2. CENTRO: Buscador Global Único */}
          <div ref={searchRef} className="relative flex-1 max-w-md mx-auto">
            <Search
              className="w-3.5 h-3.5 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onFocus={() => setSearchFocused(true)}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setSearchFocused(true);
              }}
              placeholder="Buscar hechos, provincias, próceres o rutas..."
              aria-label="Buscar hechos, provincias, próceres o rutas"
              className="w-full h-9 pl-9 pr-8 text-xs bg-[#0D0F12]/85 border border-[#C5A059]/35 rounded-lg text-[#F4F1EA] placeholder:text-[#A39E93] focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-[#A39E93] hover:text-[#F4F1EA] p-1"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Desplegable de Resultados de Búsqueda Global */}
            {searchFocused && searchResults && (
              <div className="absolute left-0 right-0 top-full mt-1.5 bg-slate-900/95 backdrop-blur-xl border border-[#C5A059]/45 rounded-xl shadow-[0_24px_60px_rgba(0,0,0,0.85)] max-h-[72vh] overflow-y-auto gis-scroll z-[1050] p-2 space-y-2 text-xs">
                {searchResults.total === 0 ? (
                  <div className="px-3 py-4 text-center text-[#A39E93]">
                    No se encontraron resultados para «{searchQuery}»
                  </div>
                ) : (
                  <>
                    {searchResults.events.length > 0 && (
                      <div>
                        <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C5A059]">
                          Hechos Históricos
                        </div>
                        {searchResults.events.map((ev) => (
                          <button
                            key={ev.properties.id}
                            type="button"
                            onClick={() => {
                              onSelectEvent?.(ev);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#C5A059]/15 flex items-center justify-between gap-2 text-[#F4F1EA]"
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                              <span className="truncate font-medium">{ev.properties.titulo}</span>
                            </span>
                            <span className="font-mono-tabular text-[10px] text-[#C5A059] shrink-0">
                              {ev.properties.anio}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.milestones.length > 0 && onJumpToMilestone && (
                      <div className="pt-1 border-t border-[#C5A059]/15">
                        <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C5A059]">
                          Hitos y Batallas
                        </div>
                        {searchResults.milestones.map((m) => (
                          <button
                            key={m.id}
                            type="button"
                            onClick={() => {
                              onJumpToMilestone(m);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#C5A059]/15 flex items-center justify-between gap-2 text-[#F4F1EA]"
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <Swords className="w-3.5 h-3.5 text-[#E63946] shrink-0" />
                              <span className="truncate font-medium">{m.title}</span>
                            </span>
                            <span className="font-mono-tabular text-[10px] text-[#C5A059] shrink-0">
                              {m.year}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.monuments.length > 0 && onJumpToMonument && (
                      <div className="pt-1 border-t border-[#C5A059]/15">
                        <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#D4AF37]">
                          Sitios Coloniales
                        </div>
                        {searchResults.monuments.map((mon) => (
                          <button
                            key={mon.id}
                            type="button"
                            onClick={() => {
                              onJumpToMonument(mon);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#C5A059]/15 flex items-center justify-between gap-2 text-[#F4F1EA]"
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <Landmark className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                              <span className="truncate font-medium">{mon.name}</span>
                            </span>
                            <span className="font-mono-tabular text-[10px] text-[#C5A059] shrink-0">
                              {mon.yearBuilt}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.presidents.length > 0 && onSelectPresident && (
                      <div className="pt-1 border-t border-[#C5A059]/15">
                        <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C5A059]">
                          Presidentes y Próceres
                        </div>
                        {searchResults.presidents.map((pr) => (
                          <button
                            key={pr.id}
                            type="button"
                            onClick={() => {
                              onSelectPresident(pr);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#C5A059]/15 flex items-center justify-between gap-2 text-[#F4F1EA]"
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <Users className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                              <span className="truncate font-medium">{pr.nombre}</span>
                            </span>
                            <span className="text-[10px] text-[#A39E93] truncate max-w-[110px]">
                              {pr.provincia_nacimiento}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.routes.length > 0 && onSelectRoute && (
                      <div className="pt-1 border-t border-[#C5A059]/15">
                        <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-[#C5A059]">
                          Rutas Históricas
                        </div>
                        {searchResults.routes.map((rt) => (
                          <button
                            key={rt.properties.id}
                            type="button"
                            onClick={() => {
                              onSelectRoute(rt);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#C5A059]/15 flex items-center justify-between gap-2 text-[#F4F1EA]"
                          >
                            <span className="flex items-center gap-2 min-w-0">
                              <Route className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                              <span className="truncate font-medium">{rt.properties.titulo}</span>
                            </span>
                            <span className="font-mono-tabular text-[10px] text-[#C5A059] shrink-0">
                              {rt.properties.anio_inicio}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* 3. DERECHA: Acciones Principales + Botón Compacto "?" */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Botón Principal "📖 Explorar" (Enciclopedia Histórica de los 5 Períodos) */}
            {onOpenExploreModal && (
              <button
                type="button"
                onClick={() => onOpenExploreModal()}
                title="Explorar los 5 grandes períodos históricos, 16 hitos y 3 rutas"
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 h-9 text-xs font-semibold rounded-lg border border-[#D4AF37]/60 bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0D0F12] transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <BookOpen className="w-3.5 h-3.5 shrink-0" />
                <span>Explorar</span>
              </button>
            )}

            {/* Interruptor discreto "🎓 Modo Docente" (Divulgación Progresiva) */}
            {onToggleTeacherMode && (
              <button
                type="button"
                onClick={onToggleTeacherMode}
                aria-pressed={isTeacherMode}
                title="Activar suite educativa Modo Aula / Docente"
                className={`flex items-center gap-1.5 px-2.5 py-1.5 h-9 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  isTeacherMode
                    ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.35)]'
                    : 'border-[#C5A059]/40 bg-[#161920]/80 text-[#F4F1EA] hover:border-[#D4AF37]'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden xl:inline">🎓 Modo Docente</span>
                <span className="hidden md:inline xl:hidden">Docente</span>
              </button>
            )}

            {/* Botón Comparar: Antes vs. Hoy */}
            {onToggleCompare && (
              <button
                type="button"
                onClick={onToggleCompare}
                aria-pressed={compareMode}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 h-9 text-xs font-semibold rounded-lg border transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  compareMode
                    ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37]'
                    : 'bg-[#161920]/80 hover:bg-[#C5A059]/15 text-[#F4F1EA] border-[#C5A059]/40 hover:border-[#D4AF37]'
                }`}
              >
                <SplitSquareHorizontal className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span className="hidden lg:inline">Comparar: Antes vs. Hoy</span>
                <span className="hidden sm:inline lg:hidden">Comparar</span>
              </button>
            )}

            {/* Botón ▶ Tour Histórico */}
            {tourActive ? (
              <button
                type="button"
                onClick={onStopTour ?? onStartTour}
                className="flex items-center gap-1.5 bg-[#9B2226] hover:bg-[#7F1D1D] text-[#F4F1EA] border border-[#C5A059]/40 text-xs font-semibold px-2.5 sm:px-3 py-1.5 h-9 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Square className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Detener Tour</span>
                <span className="sm:hidden">Detener</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onStartTour}
                className="flex items-center gap-1.5 bg-[#9B2226] hover:bg-[#7F1D1D] text-[#F4F1EA] border border-[#C5A059]/40 text-xs font-semibold px-2.5 sm:px-3 py-1.5 h-9 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
                <span className="hidden sm:inline">Tour Histórico</span>
                <span className="sm:hidden">Tour</span>
              </button>
            )}

            {/* Botón Compacto "?" para Guía del Atlas y Sobre Nosotros */}
            <div ref={helpMenuRef} className="relative">
              <button
                type="button"
                onClick={() => setHelpMenuOpen((prev) => !prev)}
                aria-expanded={helpMenuOpen}
                aria-label="Ayuda, Guía del Atlas y Sobre Nosotros"
                title="Guía del Atlas y Sobre Nosotros"
                className={`w-9 h-9 flex items-center justify-center rounded-lg border text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  helpMenuOpen
                    ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37]'
                    : 'bg-[#161920]/80 text-[#D4AF37] border-[#C5A059]/40 hover:border-[#D4AF37]'
                }`}
              >
                <HelpCircle className="w-4 h-4" />
              </button>

              {helpMenuOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-56 bg-slate-900/95 backdrop-blur-xl border border-[#C5A059]/45 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.85)] p-1.5 space-y-1 z-[1050] text-xs">
                  {onOpenGuide && (
                    <button
                      type="button"
                      onClick={() => {
                        onOpenGuide();
                        setHelpMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[#F4F1EA] hover:bg-[#C5A059]/15 transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <div>
                        <div className="font-semibold">Guía del Atlas</div>
                        <div className="text-[10px] text-[#A39E93]">Cómo explorar CronoMapa RD</div>
                      </div>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setAboutOpen(true);
                      setHelpMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[#F4F1EA] hover:bg-[#C5A059]/15 transition-colors"
                  >
                    <Info className="w-4 h-4 text-[#C5A059] shrink-0" />
                    <div>
                      <div className="font-semibold">Sobre Nosotros</div>
                      <div className="text-[10px] text-[#A39E93]">Fuentes AGN y créditos</div>
                    </div>
                  </button>

                  <div className="h-px bg-[#C5A059]/20 my-1" />

                  {onOpenVintageGallery && (
                    <button
                      type="button"
                      onClick={() => {
                        onOpenVintageGallery();
                        setHelpMenuOpen(false);
                      }}
                      className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-[#F4F1EA] hover:bg-[#C5A059]/15 transition-colors"
                    >
                      <span className="flex items-center gap-2.5">
                        <ScrollText className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span className="font-medium">Mapas Antiguos</span>
                      </span>
                      {hasActiveVintageOverlay && (
                        <span className="w-2 h-2 rounded-full bg-[#D4AF37]" />
                      )}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setViewMode(viewMode === 'map' ? 'timeline' : 'map');
                      setHelpMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-[#F4F1EA] hover:bg-[#C5A059]/15 transition-colors"
                  >
                    {viewMode === 'map' ? (
                      <>
                        <Clock className="w-4 h-4 text-[#C5A059] shrink-0" />
                        <span className="font-medium">Vista Línea de Tiempo</span>
                      </>
                    ) : (
                      <>
                        <MapIcon className="w-4 h-4 text-[#D4AF37] shrink-0" />
                        <span className="font-medium">Volver al Mapa GIS</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
