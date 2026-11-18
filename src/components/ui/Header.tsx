import { useEffect, useMemo, useRef, useState } from 'react';
import {
  BookOpen,
  ChevronDown,
  Clock,
  Compass,
  Crown,
  Flame,
  History,
  Home,
  Info,
  Landmark,
  Layers,
  Map as MapIcon,
  MapPin,
  Menu,
  Play,
  Route,
  ScrollText,
  Search,
  ShieldAlert,
  SplitSquareHorizontal,
  Square,
  Swords,
  Users,
  X,
} from 'lucide-react';
import type {
  AnimatedHistoricalRoute,
  ColonialMonument,
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
  onResetMap: () => void;
  compareMode?: boolean;
  onToggleCompare?: () => void;
  onOpenMapsPanel?: () => void;
  onActivateRoutesLayer?: () => void;
  // Module 3, 4, 5 controls
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
  // Modo Aula / Docente (Progressive Disclosure)
  isTeacherMode?: boolean;
  onToggleTeacherMode?: () => void;
  // Existing datasets
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
  onSelectQuickExplore,
  onResetMap,
  compareMode = false,
  onToggleCompare,
  onOpenMapsPanel,
  onActivateRoutesLayer,
  showMilestones = true,
  onToggleMilestones,
  milestones = [],
  onJumpToMilestone,
  animatedRoutes = [],
  activeAnimatedRouteId = null,
  onStartAnimatedRoute,
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
  const [exploreOpen, setExploreOpen] = useState(false);
  const [routesOpen, setRoutesOpen] = useState(false);
  const [milestonesOpen, setMilestonesOpen] = useState(false);
  const [monumentsOpen, setMonumentsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const exploreRef = useRef<HTMLDivElement | null>(null);
  const routesRef = useRef<HTMLDivElement | null>(null);
  const milestonesRef = useRef<HTMLDivElement | null>(null);
  const monumentsRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (exploreRef.current && !exploreRef.current.contains(target)) {
        setExploreOpen(false);
      }
      if (routesRef.current && !routesRef.current.contains(target)) {
        setRoutesOpen(false);
      }
      if (milestonesRef.current && !milestonesRef.current.contains(target)) {
        setMilestonesOpen(false);
      }
      if (monumentsRef.current && !monumentsRef.current.contains(target)) {
        setMonumentsOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(target)) {
        setSearchFocused(false);
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setExploreOpen(false);
        setRoutesOpen(false);
        setMilestonesOpen(false);
        setMonumentsOpen(false);
        setMobileMenuOpen(false);
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
      routes: matchedRoutes,
      presidents: matchedPresidents,
      monuments: matchedMonuments,
      total:
        matchedEvents.length +
        matchedRoutes.length +
        matchedPresidents.length +
        matchedMonuments.length,
    };
  }, [searchQuery, events, routes, presidents, colonialMonuments]);

  const handleInicioClick = () => {
    setViewMode('map');
    onResetMap();
    setMobileMenuOpen(false);
  };

  const handleMapasClick = () => {
    setViewMode('map');
    onOpenMapsPanel?.();
    setMobileMenuOpen(false);
  };

  const handleCronologiaClick = () => {
    setViewMode('timeline');
    setMobileMenuOpen(false);
  };

  const handleRoutesToggle = () => {
    setViewMode('map');
    setRoutesOpen((prev) => !prev);
    setExploreOpen(false);
    setMilestonesOpen(false);
  };

  const handlePickExplore = (topic: QuickExploreTopic) => {
    onSelectQuickExplore(topic);
    setExploreOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="relative z-[980] shrink-0 bg-[#0D0F12]/95 backdrop-blur-xl border-b border-[#C5A059]/30 shadow-[0_12px_36px_rgba(0,0,0,0.55)] select-none">
        {/* NIVEL 1: Encabezado Editorial "Cartografía Contemporánea de Archivo" */}
        <div className="px-4 sm:px-6 py-2 flex items-center justify-between gap-3 sm:gap-5">
          {/* Izquierda: Wordmark Serif + Subtítulo en Versalitas Doradas */}
          <button
            type="button"
            onClick={handleInicioClick}
            title="Volver a la vista general de la República Dominicana"
            className="flex items-center gap-3 text-left min-w-0 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] rounded-lg"
          >
            <img
              src="/logo-cronomapa.png"
              alt="CronoMapa RD"
              className="w-11 h-11 md:w-12 md:h-12 rounded-full object-cover shrink-0 ring-2 ring-[#D4AF37]/70 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:scale-105 transition-transform duration-300 cursor-pointer bg-[#0D0F12]"
            />
            <div className="min-w-0">
              <h1 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-[#F4F1EA] leading-none whitespace-nowrap">
                CronoMapa RD
              </h1>
              <p className="tracking-[0.2em] text-[10px] sm:text-xs uppercase text-[#C5A059] mt-1 leading-none truncate">
                Atlas Cartográfico Histórico
              </p>
            </div>
          </button>

          {/* Centro: Buscador Editorial */}
          <div ref={searchRef} className="relative flex-1 max-w-[200px] sm:max-w-xs md:max-w-sm">
            <Search
              className="w-3.5 h-3.5 text-[#C5A059] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
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
              placeholder="Buscar hechos, provincias, rutas..."
              aria-label="Búsqueda global en CronoMapa RD"
              className="w-full pl-9 pr-8 py-1.5 text-xs sm:text-sm bg-[#161920]/90 hover:bg-[#161920] focus:bg-[#161920] border border-[#C5A059]/30 rounded-full text-[#F4F1EA] placeholder:text-[#A39E93] focus:outline-none focus:ring-1 focus:ring-[#D4AF37] focus:border-[#D4AF37] transition-colors"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Limpiar búsqueda global"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A39E93] hover:text-[#F4F1EA] p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}

            {searchFocused && searchResults && (
              <div className="absolute right-0 left-0 sm:left-auto sm:w-96 mt-2 bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/35 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.75)] z-[1050] max-h-80 overflow-y-auto gis-scroll p-2 space-y-2">
                {searchResults.total === 0 ? (
                  <div className="px-3 py-3 text-xs text-[#A39E93] text-center">
                    Sin coincidencias en el archivo para &ldquo;{searchQuery}&rdquo;
                  </div>
                ) : (
                  <>
                    {searchResults.monuments.length > 0 && (
                      <div>
                        <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#D4AF37]">
                          Monumentos coloniales (Wikipedia)
                        </div>
                        {searchResults.monuments.map((mon) => (
                          <button
                            key={mon.id}
                            type="button"
                            onClick={() => {
                              onJumpToMonument?.(mon);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#C5A059]/10 flex items-start gap-2 transition-colors"
                          >
                            <Landmark className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-[#F4F1EA] truncate">
                                {mon.shortName}
                              </div>
                              <div className="text-[11px] text-[#A39E93] font-mono-tabular">
                                {mon.yearBuilt} · {mon.province}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.events.length > 0 && (
                      <div>
                        <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C5A059]">
                          Hechos históricos
                        </div>
                        {searchResults.events.map((ev) => (
                          <button
                            key={ev.properties.id}
                            type="button"
                            onClick={() => {
                              onSelectEvent?.(ev);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#C5A059]/10 flex items-start gap-2 transition-colors"
                          >
                            <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-[#F4F1EA] truncate">
                                {ev.properties.titulo}
                              </div>
                              <div className="text-[11px] text-[#A39E93] font-mono-tabular">
                                {ev.properties.anio} · {ev.properties.provincia}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.routes.length > 0 && (
                      <div>
                        <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C5A059]">
                          Rutas históricas
                        </div>
                        {searchResults.routes.map((rt) => (
                          <button
                            key={rt.properties.id}
                            type="button"
                            onClick={() => {
                              setViewMode('map');
                              onActivateRoutesLayer?.();
                              onSelectRoute?.(rt);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#C5A059]/10 flex items-start gap-2 transition-colors"
                          >
                            <Route className="w-3.5 h-3.5 text-[#C5A059] shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-[#F4F1EA] truncate">
                                {rt.properties.titulo}
                              </div>
                              <div className="text-[11px] text-[#A39E93]">
                                {rt.properties.tipo_ruta_etiqueta} · {rt.properties.fechas}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {searchResults.presidents.length > 0 && (
                      <div>
                        <div className="px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#C5A059]">
                          Presidentes
                        </div>
                        {searchResults.presidents.map((pr) => (
                          <button
                            key={pr.id}
                            type="button"
                            onClick={() => {
                              setViewMode('map');
                              onSelectPresident?.(pr);
                              setSearchFocused(false);
                            }}
                            className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#C5A059]/10 flex items-start gap-2 transition-colors"
                          >
                            <Users className="w-3.5 h-3.5 text-[#D4AF37] shrink-0 mt-0.5" />
                            <div className="min-w-0">
                              <div className="text-xs font-medium text-[#F4F1EA] truncate">
                                {pr.nombre}
                              </div>
                              <div className="text-[11px] text-[#A39E93]">
                                {pr.provincia_nacimiento} · {pr.periodos_gobierno[0]}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Derecha: Modo Docente + Guía del Atlas + Mapas Antiguos + Comparar Antes vs. Hoy */}
          <div className="flex items-center gap-2 shrink-0">
            {onToggleTeacherMode && (
              <button
                type="button"
                onClick={onToggleTeacherMode}
                aria-pressed={isTeacherMode}
                title="Activar o desactivar suite pedagógica Modo Aula / Docente"
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  isTeacherMode
                    ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.38)]'
                    : 'border-[#C5A059]/40 bg-[#161920]/80 text-[#F4F1EA] hover:border-[#D4AF37] hover:bg-[#C5A059]/15'
                }`}
              >
                <span>🎓 Modo Docente</span>
              </button>
            )}

            {onOpenGuide && (
              <button
                type="button"
                onClick={onOpenGuide}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#161920]/80 hover:bg-[#C5A059]/15 text-[#F4F1EA] border border-[#C5A059]/40 hover:border-[#D4AF37] transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Guía del Atlas</span>
              </button>
            )}

            {onOpenVintageGallery && (
              <button
                type="button"
                onClick={onOpenVintageGallery}
                aria-pressed={hasActiveVintageOverlay}
                className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  hasActiveVintageOverlay
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]'
                    : 'bg-[#161920]/90 text-[#F4F1EA] border-[#C5A059]/45 hover:border-[#D4AF37] hover:bg-[#C5A059]/15'
                }`}
              >
                <ScrollText className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>Mapas Antiguos</span>
              </button>
            )}

            {onToggleCompare && (
              <button
                type="button"
                onClick={onToggleCompare}
                aria-pressed={compareMode}
                className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-semibold rounded-lg border transition-all whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  compareMode
                    ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37] shadow-[0_0_20px_rgba(212,175,55,0.35)]'
                    : 'bg-[#161920]/90 text-[#F4F1EA] border-[#C5A059]/50 hover:border-[#D4AF37] hover:bg-[#C5A059]/15'
                }`}
              >
                <SplitSquareHorizontal className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Comparar: Antes vs. Hoy</span>
                <span className="md:hidden">Antes/Hoy</span>
              </button>
            )}
          </div>
        </div>

        {/* NIVEL 2: Navegación Editorial, Módulos 3/4/5 y Selector de Vista GIS */}
        <div className="bg-[#161920]/70 border-t border-[#C5A059]/20 px-4 sm:px-6 py-1.5 flex items-center justify-between gap-2 sm:gap-3">
          {/* Bloque Izquierdo: Menú de Navegación */}
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Abrir menú de navegación"
              className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-[#F4F1EA] bg-[#0D0F12]/70 border border-[#C5A059]/30 rounded-lg hover:border-[#D4AF37] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span className="hidden sm:inline">Índice</span>
            </button>

            <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-1">
              <button
                type="button"
                onClick={handleInicioClick}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-[#F4F1EA]/85 hover:text-[#D4AF37] hover:bg-[#C5A059]/10 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Home className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Inicio</span>
              </button>

              <button
                type="button"
                onClick={handleMapasClick}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-[#F4F1EA]/85 hover:text-[#D4AF37] hover:bg-[#C5A059]/10 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Capas RD</span>
              </button>

              {/* Módulo 3: Hitos Toggle + "Ir a un Hito..." Dropdown */}
              {onToggleMilestones && (
                <button
                  type="button"
                  onClick={onToggleMilestones}
                  aria-pressed={showMilestones}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    showMilestones
                      ? 'bg-[#9B2226]/85 text-[#F4F1EA] border-[#D4AF37]/60'
                      : 'text-[#A39E93] border-transparent hover:text-[#F4F1EA] hover:bg-[#C5A059]/10'
                  }`}
                >
                  <Swords className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Hitos</span>
                </button>
              )}

              {milestones.length > 0 && onJumpToMilestone && (
                <div ref={milestonesRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setMilestonesOpen((p) => !p);
                      setRoutesOpen(false);
                      setExploreOpen(false);
                    }}
                    aria-expanded={milestonesOpen}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#F4F1EA]/90 hover:text-[#D4AF37] hover:bg-[#C5A059]/10 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    <ScrollText className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Ir a un Hito...</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#A39E93] transition-transform ${
                        milestonesOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {milestonesOpen && (
                    <div className="absolute left-0 mt-1.5 w-80 max-h-96 overflow-y-auto gis-scroll bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/35 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.75)] z-[1040] py-1.5">
                      <div className="px-3 py-1.5 text-[11px] font-medium text-[#C5A059] border-b border-[#C5A059]/20">
                        Batallas y proclamaciones · Saltar en el mapa
                      </div>
                      {milestones.map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() => {
                            onJumpToMilestone(m);
                            setMilestonesOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-[#C5A059]/10 transition-colors flex items-start gap-2.5"
                        >
                          <span
                            className="w-2.5 h-2.5 rounded-full mt-1 shrink-0 border border-[#F4F1EA]/40"
                            style={{
                              backgroundColor: m.type === 'batalla' ? '#9B2226' : '#D4AF37',
                            }}
                          />
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#F4F1EA] leading-snug">
                              {m.title}
                            </div>
                            <div className="text-[11px] text-[#A39E93] mt-0.5 font-mono-tabular">
                              {m.epoch} · {m.date}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {colonialMonuments.length > 0 && onJumpToMonument && (
                <div ref={monumentsRef} className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setMonumentsOpen((p) => !p);
                      setMilestonesOpen(false);
                      setRoutesOpen(false);
                      setExploreOpen(false);
                    }}
                    aria-expanded={monumentsOpen}
                    className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#F4F1EA]/90 hover:text-[#D4AF37] hover:bg-[#C5A059]/10 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                  >
                    <Landmark className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>Sitios Coloniales</span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#A39E93] transition-transform ${
                        monumentsOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {monumentsOpen && (
                    <div className="absolute left-0 mt-1.5 w-80 max-h-96 overflow-y-auto gis-scroll bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/35 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.75)] z-[1040] py-1.5">
                      <div className="px-3 py-1.5 text-[11px] font-medium text-[#D4AF37] border-b border-[#C5A059]/20">
                        Monumentos coloniales · Fotos y Grounding Wikipedia
                      </div>
                      {colonialMonuments.map((mon) => (
                        <button
                          key={mon.id}
                          type="button"
                          onClick={() => {
                            onJumpToMonument(mon);
                            setMonumentsOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-[#C5A059]/10 transition-colors flex items-start gap-2.5"
                        >
                          <Landmark className="w-3.5 h-3.5 text-[#D4AF37] mt-0.5 shrink-0" />
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-[#F4F1EA] leading-snug">
                              {mon.shortName}
                            </div>
                            <div className="text-[11px] text-[#A39E93] mt-0.5 font-mono-tabular">
                              {mon.yearBuilt} · {mon.province}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Módulo 4: Rutas Históricas Animadas + GIS Dropdown */}
              <div ref={routesRef} className="relative">
                <button
                  type="button"
                  onClick={handleRoutesToggle}
                  aria-expanded={routesOpen}
                  className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    activeAnimatedRouteId
                      ? 'bg-[#D4AF37]/20 text-[#D4AF37]'
                      : 'text-[#F4F1EA]/85 hover:text-[#D4AF37] hover:bg-[#C5A059]/10'
                  }`}
                >
                  <Compass className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Rutas Históricas</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#A39E93] transition-transform ${
                      routesOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {routesOpen && (
                  <div className="absolute left-0 mt-1.5 w-88 max-h-[70vh] overflow-y-auto gis-scroll bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/35 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.75)] z-[1040] py-1.5">
                    {animatedRoutes.length > 0 && onStartAnimatedRoute && (
                      <>
                        <div className="px-3 py-1.5 text-[11px] font-semibold text-[#D4AF37] border-b border-[#C5A059]/20">
                          Reproductor Animado de Campañas y Viajes
                        </div>
                        {animatedRoutes.map((ar) => {
                          const isActive = ar.id === activeAnimatedRouteId;
                          return (
                            <button
                              key={ar.id}
                              type="button"
                              onClick={() => {
                                onStartAnimatedRoute(ar);
                                setRoutesOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 hover:bg-[#C5A059]/15 transition-colors flex items-start gap-2.5 ${
                                isActive ? 'bg-[#C5A059]/15' : ''
                              }`}
                            >
                              <Play className="w-3.5 h-3.5 text-[#D4AF37] mt-1 shrink-0 fill-current" />
                              <div className="min-w-0">
                                <div className="text-xs font-semibold text-[#F4F1EA] leading-snug">
                                  {ar.title}
                                </div>
                                <div className="text-[11px] text-[#A39E93] mt-0.5">
                                  {ar.dates} · {ar.stops.length} paradas narrativas
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </>
                    )}

                    {routes.length > 0 && (
                      <>
                        <div className="px-3 py-1.5 mt-1 text-[11px] font-medium text-[#C5A059] border-y border-[#C5A059]/20">
                          Itinerarios GIS en el mapa
                        </div>
                        {routes.map((rt) => (
                          <button
                            key={rt.properties.id}
                            type="button"
                            onClick={() => {
                              setViewMode('map');
                              onActivateRoutesLayer?.();
                              onSelectRoute?.(rt);
                              setRoutesOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 hover:bg-[#C5A059]/10 transition-colors flex items-start gap-2.5"
                          >
                            <span
                              className="w-2.5 h-2.5 rounded-full mt-1 shrink-0 border border-[#F4F1EA]/40"
                              style={{ backgroundColor: rt.properties.color }}
                            />
                            <div className="min-w-0">
                              <div className="text-xs font-semibold text-[#F4F1EA] leading-snug">
                                {rt.properties.titulo}
                              </div>
                              <div className="text-[11px] text-[#A39E93] mt-0.5">
                                {rt.properties.tipo_ruta_etiqueta} · {rt.properties.fechas}
                              </div>
                            </div>
                          </button>
                        ))}
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Explorar Dropdown */}
              <div
                ref={exploreRef}
                className="relative"
                onMouseEnter={() => setExploreOpen(true)}
                onMouseLeave={() => setExploreOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => {
                    setExploreOpen((prev) => !prev);
                    setRoutesOpen(false);
                    setMilestonesOpen(false);
                  }}
                  aria-expanded={exploreOpen}
                  className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-[#F4F1EA]/85 hover:text-[#D4AF37] hover:bg-[#C5A059]/10 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                >
                  <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>Explorar</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-[#A39E93] transition-transform ${
                      exploreOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {exploreOpen && (
                  <div className="absolute left-0 pt-1.5 w-80 z-[1040]">
                    <div className="bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/35 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.75)] py-1.5">
                      <button
                        type="button"
                        onClick={() => handlePickExplore('presidentes_provincia')}
                        className="w-full text-left px-3 py-2.5 hover:bg-[#C5A059]/10 flex items-start gap-2.5 transition-colors"
                      >
                        <Crown className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-[#F4F1EA]">
                            Presidentes por Provincia de Nacimiento
                          </div>
                          <div className="text-[11px] text-[#A39E93]">
                            Mapa coroplético y galería de 45 mandatarios
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePickExplore('trujillo')}
                        className="w-full text-left px-3 py-2.5 hover:bg-[#C5A059]/10 flex items-start gap-2.5 transition-colors"
                      >
                        <ShieldAlert className="w-4 h-4 text-[#9B2226] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-[#F4F1EA]">
                            Era de Trujillo (1930–1961)
                          </div>
                          <div className="text-[11px] text-[#A39E93]">
                            Dossier geolocalizado y hechos de la dictadura
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePickExplore('balaguer')}
                        className="w-full text-left px-3 py-2.5 hover:bg-[#C5A059]/10 flex items-start gap-2.5 transition-colors"
                      >
                        <History className="w-4 h-4 text-[#60A5FA] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-[#F4F1EA]">
                            Gobiernos de Joaquín Balaguer (1966–1996)
                          </div>
                          <div className="text-[11px] text-[#A39E93]">
                            Los Doce Años y retorno constitucional
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => handlePickExplore('cacicazgos_1492')}
                        className="w-full text-left px-3 py-2.5 hover:bg-[#C5A059]/10 flex items-start gap-2.5 transition-colors"
                      >
                        <Flame className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <div className="text-xs font-semibold text-[#F4F1EA]">
                            Cacicazgos Taínos (1492)
                          </div>
                          <div className="text-[11px] text-[#A39E93]">
                            Fusión Turf.js precolombina de La Española
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => setAboutOpen(true)}
                className="flex items-center gap-1.5 px-2 py-1 text-xs font-medium text-[#F4F1EA]/85 hover:text-[#D4AF37] hover:bg-[#C5A059]/10 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Info className="w-3.5 h-3.5 text-[#C5A059]" />
                <span className="hidden xl:inline">Sobre Nosotros</span>
              </button>
            </nav>
          </div>

          {/* Bloque Derecho: Selector Rápido de Vista + Tour Histórico */}
          <div className="flex items-center gap-2 shrink-0">
            <nav
              aria-label="Selector rápido de vista"
              className="flex items-center gap-1 p-0.5 bg-[#0D0F12]/80 border border-[#C5A059]/30 rounded-lg shrink-0"
            >
              <button
                type="button"
                onClick={() => setViewMode('map')}
                aria-pressed={viewMode === 'map' && !compareMode}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  viewMode === 'map' && !compareMode
                    ? 'bg-[#1D3557] text-[#F4F1EA] border border-[#C5A059]/35'
                    : 'text-[#A39E93] hover:text-[#F4F1EA]'
                }`}
              >
                <MapIcon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Vista Mapa GIS</span>
                <span className="sm:hidden">Mapa</span>
              </button>

              <button
                type="button"
                onClick={handleCronologiaClick}
                aria-pressed={viewMode === 'timeline' && !compareMode}
                className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                  viewMode === 'timeline' && !compareMode
                    ? 'bg-[#1D3557] text-[#F4F1EA] border border-[#C5A059]/35'
                    : 'text-[#A39E93] hover:text-[#F4F1EA]'
                }`}
              >
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">Línea de Tiempo</span>
                <span className="md:hidden">Cronología</span>
              </button>
            </nav>

            {tourActive ? (
              <button
                type="button"
                onClick={onStopTour ?? onStartTour}
                className="flex items-center gap-1.5 bg-[#9B2226] hover:bg-[#7F1D1D] text-[#F4F1EA] border border-[#C5A059]/40 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Square className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">Detener Tour</span>
                <span className="sm:hidden">Detener</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onStartTour}
                className="flex items-center gap-1.5 bg-[#9B2226] hover:bg-[#7F1D1D] text-[#F4F1EA] border border-[#C5A059]/40 text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                <Play className="w-3.5 h-3.5 shrink-0 fill-current" />
                <span className="hidden sm:inline">Tour Histórico</span>
                <span className="sm:hidden">Tour</span>
              </button>
            )}
          </div>
        </div>

        {/* Menú Móvil / Tablet (< 1024px) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#161920]/98 backdrop-blur-xl border-t border-[#C5A059]/25 px-4 py-3 space-y-3 max-h-[70vh] overflow-y-auto gis-scroll">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={handleInicioClick}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/70 text-[#F4F1EA] hover:border-[#D4AF37]"
              >
                <Home className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Inicio</span>
              </button>
              <button
                type="button"
                onClick={handleMapasClick}
                className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/70 text-[#F4F1EA] hover:border-[#D4AF37]"
              >
                <Layers className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Capas RD</span>
              </button>
              {onOpenVintageGallery && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenVintageGallery();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/70 text-[#F4F1EA] hover:border-[#D4AF37]"
                >
                  <ScrollText className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Mapas Antiguos</span>
                </button>
              )}
              {onToggleMilestones && (
                <button
                  type="button"
                  onClick={() => {
                    onToggleMilestones();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-xs font-medium rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/70 text-[#F4F1EA] hover:border-[#D4AF37]"
                >
                  <Swords className="w-3.5 h-3.5 text-[#9B2226]" />
                  <span>{showMilestones ? 'Ocultar Hitos' : 'Mostrar Hitos'}</span>
                </button>
              )}
            </div>

            {colonialMonuments.length > 0 && onJumpToMonument && (
              <div className="pt-2 border-t border-[#C5A059]/20 space-y-1.5">
                <div className="text-[11px] font-semibold text-[#D4AF37]">
                  Monumentos y Sitios Coloniales (Wikipedia)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {colonialMonuments.slice(0, 6).map((mon) => (
                    <button
                      key={mon.id}
                      type="button"
                      onClick={() => {
                        onJumpToMonument(mon);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left px-3 py-2 text-xs rounded-lg border border-[#C5A059]/25 hover:border-[#D4AF37] text-[#F4F1EA] flex items-center gap-2"
                    >
                      <Landmark className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="truncate font-medium">{mon.shortName}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {animatedRoutes.length > 0 && onStartAnimatedRoute && (
              <div className="pt-2 border-t border-[#C5A059]/20 space-y-1.5">
                <div className="text-[11px] font-semibold text-[#C5A059]">
                  Rutas Históricas Animadas
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {animatedRoutes.map((ar) => (
                    <button
                      key={ar.id}
                      type="button"
                      onClick={() => {
                        onStartAnimatedRoute(ar);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left px-3 py-2 text-xs rounded-lg border border-[#C5A059]/25 hover:border-[#D4AF37] text-[#F4F1EA] flex items-center gap-2"
                    >
                      <Play className="w-3 h-3 text-[#D4AF37] shrink-0 fill-current" />
                      <span className="truncate font-medium">{ar.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-[#C5A059]/20 space-y-1.5">
              <div className="text-[11px] font-semibold text-[#C5A059]">Explorar colecciones</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => handlePickExplore('presidentes_provincia')}
                  className="text-left px-3 py-2 text-xs rounded-lg border border-[#C5A059]/25 hover:border-[#D4AF37] font-medium text-[#F4F1EA]"
                >
                  Presidentes por Provincia
                </button>
                <button
                  type="button"
                  onClick={() => handlePickExplore('trujillo')}
                  className="text-left px-3 py-2 text-xs rounded-lg border border-[#C5A059]/25 hover:border-[#D4AF37] font-medium text-[#F4F1EA]"
                >
                  Era de Trujillo (1930–1961)
                </button>
                <button
                  type="button"
                  onClick={() => handlePickExplore('balaguer')}
                  className="text-left px-3 py-2 text-xs rounded-lg border border-[#C5A059]/25 hover:border-[#D4AF37] font-medium text-[#F4F1EA]"
                >
                  Gobiernos de Balaguer (1966–1996)
                </button>
                <button
                  type="button"
                  onClick={() => handlePickExplore('cacicazgos_1492')}
                  className="text-left px-3 py-2 text-xs rounded-lg border border-[#C5A059]/25 hover:border-[#D4AF37] font-medium text-[#F4F1EA]"
                >
                  Cacicazgos Taínos (1492)
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#C5A059]/20 flex items-center justify-between gap-2">
              {onOpenGuide ? (
                <button
                  type="button"
                  onClick={() => {
                    onOpenGuide();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-[#161920]/80 hover:bg-[#C5A059]/15 text-[#F4F1EA] border border-[#C5A059]/40"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Guía del Atlas</span>
                </button>
              ) : (
                <span />
              )}
              <button
                type="button"
                onClick={() => {
                  setAboutOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#C5A059] hover:text-[#D4AF37]"
              >
                <Info className="w-3.5 h-3.5" />
                <span>Sobre CronoMapa RD</span>
              </button>
            </div>
          </div>
        )}
      </header>

      <AboutModal isOpen={aboutOpen} onClose={() => setAboutOpen(false)} />
    </>
  );
}
