import { useMemo, useState } from 'react';
import {
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Globe2,
  Landmark,
  Layers,
  MapPin,
  Menu,
  Play,
  Route,
  ScrollText,
  Swords,
  Users,
  X,
} from 'lucide-react';
import { ALL_CATEGORIES, useCronoMapa } from '../../context/CronoMapaContext';
import { HISTORICAL_ENCYCLOPEDIA_PERIODS } from '../../data/historicalEncyclopediaData';
import type { EventCategory, ExplorePeriodId, LayerId } from '../../types/history';

const CATEGORY_META: Record<EventCategory, { shortLabel: string; color: string }> = {
  'Política/Constitucional': { shortLabel: 'Política', color: '#2563EB' },
  'Batalla/Militar': { shortLabel: 'Batalla', color: '#DC2626' },
  'Fundación/Territorio': { shortLabel: 'Fundación', color: '#D97706' },
  'Derechos/Sociedad': { shortLabel: 'Derechos', color: '#0D9488' },
};

const TERRITORIAL_LAYER_IDS: LayerId[] = [
  'provincias_actuales',
  'cacicazgos_1492',
  'despoblacion_osorio_1606',
  'tratado_aranjuez_1777',
  'unificacion_haitiana_1822',
  'provincias_1844',
  'mapa_antiguo_espaniola',
  'plano_ciudad_colonial',
];

interface SidebarGISProps {
  onOpenExploreModal?: (periodId?: ExplorePeriodId) => void;
}

export default function SidebarGIS({ onOpenExploreModal }: SidebarGISProps = {}) {
  const {
    sidebarOpen,
    toggleSidebar,
    layers,
    toggleLayer,
    changeLayerOpacity,
    focusLayer,
    selectedCategories,
    toggleCategory,
    regimeFilter,
    setRegimeFilter,
    activePeriodFilter,
    setActivePeriodFilter,
    explorePeriodOnMap,
    showMilestones,
    toggleMilestones,
    openForeignPresidents,
    foreignPresidents,
    filteredEvents,
    animatedRoutes,
    activeAnimatedRoute,
    startAnimatedRoute,
    setVintageGalleryOpen,
    setMaxYear,
  } = useCronoMapa();

  const [showTerritorialSublayers, setShowTerritorialSublayers] = useState(false);

  const layerById = useMemo(() => {
    const map = {} as Record<LayerId, (typeof layers)[number]>;
    for (const l of layers) {
      map[l.id] = l;
    }
    return map;
  }, [layers]);

  const monumentosLayer = layerById.monumentos_coloniales;
  const rutasLayer = layerById.rutas_historicas;
  const eventosLayer = layerById.eventos_historicos;
  const presidentesLayer = layerById.presidentes_provincia;

  // Contador numérico de capas y filtros activos para el botón flotante tipo píldora
  const activeCount = useMemo(() => {
    let count = 0;
    if (showMilestones) count += 1;
    if (monumentosLayer?.visible) count += 1;
    if (rutasLayer?.visible) count += 1;
    if (presidentesLayer?.visible) count += 1;
    if (regimeFilter !== 'all') count += 1;
    if (selectedCategories.length < ALL_CATEGORIES.length) {
      count += selectedCategories.length;
    }
    const extraTerritorial = layers.filter(
      (l) =>
        TERRITORIAL_LAYER_IDS.includes(l.id) &&
        l.id !== 'provincias_actuales' &&
        l.visible,
    ).length;
    count += extraTerritorial;
    return count;
  }, [
    showMilestones,
    monumentosLayer?.visible,
    rutasLayer?.visible,
    presidentesLayer?.visible,
    regimeFilter,
    selectedCategories.length,
    layers,
  ]);

  const territorialLayers = useMemo(
    () => layers.filter((l) => TERRITORIAL_LAYER_IDS.includes(l.id)),
    [layers],
  );

  return (
    <>
      {/* Botón Flotante Tipo Píldora en Esquina Superior Izquierda ("☰ Capas y Filtros") */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Abrir panel de Capas y Filtros"
          className="absolute top-3.5 left-4 z-[900] flex items-center gap-2 px-4 py-2 min-h-[38px] bg-slate-900/90 backdrop-blur-md border border-[#C5A059]/40 rounded-full shadow-[0_14px_34px_rgba(0,0,0,0.7)] text-[#F4F1EA] hover:border-[#D4AF37] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] whitespace-nowrap shrink-0 print:hidden"
        >
          <Menu className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span className="text-xs font-semibold tracking-wide">Capas y Filtros</span>
          {activeCount > 0 && (
            <span className="ml-0.5 min-w-[20px] h-5 px-1.5 rounded-full bg-[#D4AF37] text-[#0D0F12] font-mono-tabular text-[11px] font-bold flex items-center justify-center shadow-sm">
              {activeCount}
            </span>
          )}
        </button>
      )}

      {/* Backdrop sutil sólo en pantallas móviles */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="absolute inset-0 bg-black/40 z-[895] sm:hidden print:hidden"
          aria-hidden="true"
        />
      )}

      {/* Drawer Lateral Izquierdo Colapsable (288px / w-72) con fondo oscuro translúcido */}
      <aside
        aria-label="Capas y Filtros Cartográficos"
        className={`absolute top-0 left-0 bottom-16 z-[910] w-72 max-w-[88vw] bg-slate-900/90 backdrop-blur-md border-r border-[#C5A059]/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col text-[#F4F1EA] transition-transform duration-200 ease-out print:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full pointer-events-none'
        }`}
      >
        {/* Encabezado del Drawer con botón ✕ */}
        <div className="px-4 py-3 border-b border-[#C5A059]/25 flex items-center justify-between gap-2 bg-[#0D0F12]/60 shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <Layers className="w-4 h-4 text-[#D4AF37] shrink-0" />
            <span className="font-display text-sm font-semibold text-[#F4F1EA] truncate">
              Capas y Filtros
            </span>
          </div>
          <button
            type="button"
            onClick={toggleSidebar}
            aria-label="Cerrar panel de capas y filtros"
            className="w-7 h-7 flex items-center justify-center rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Contenido Ordenado del Drawer */}
        <div className="flex-1 overflow-y-auto gis-scroll p-4 space-y-5">
          {/* 1. CAPAS HISTÓRICAS (Checkboxes principales) */}
          <section aria-labelledby="drawer-layers-heading" className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h2
                id="drawer-layers-heading"
                className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#C5A059]"
              >
                Capas Históricas
              </h2>
              <span className="font-mono-tabular text-[10px] text-[#A39E93]">Activas</span>
            </div>

            <div className="space-y-1.5">
              {/* Checkbox 1: Hitos */}
              <label className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg border border-[#C5A059]/25 bg-[#0D0F12]/70 hover:border-[#D4AF37]/60 cursor-pointer transition-colors select-none">
                <span className="flex items-center gap-2.5 min-w-0">
                  <input
                    type="checkbox"
                    checked={showMilestones}
                    onChange={toggleMilestones}
                    className="sr-only"
                  />
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                      showMilestones
                        ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0D0F12]'
                        : 'bg-[#0D0F12] border-[#C5A059]/40'
                    }`}
                  >
                    {showMilestones && <Check className="w-3 h-3 stroke-[3]" />}
                  </span>
                  <Swords className="w-3.5 h-3.5 text-[#E63946] shrink-0" />
                  <span className="text-xs font-medium text-[#F4F1EA] truncate">Hitos</span>
                </span>
                <span className="text-[10px] font-mono-tabular text-[#A39E93]">Batallas</span>
              </label>

              {/* Checkbox 2: Sitios Coloniales */}
              {monumentosLayer && (
                <label className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg border border-[#C5A059]/25 bg-[#0D0F12]/70 hover:border-[#D4AF37]/60 cursor-pointer transition-colors select-none">
                  <span className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={monumentosLayer.visible}
                      onChange={() => toggleLayer('monumentos_coloniales')}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                        monumentosLayer.visible
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0D0F12]'
                          : 'bg-[#0D0F12] border-[#C5A059]/40'
                      }`}
                    >
                      {monumentosLayer.visible && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <Landmark className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="text-xs font-medium text-[#F4F1EA] truncate">
                      Sitios Coloniales
                    </span>
                  </span>
                  <span className="text-[10px] font-mono-tabular text-[#C5A059]">UNESCO</span>
                </label>
              )}

              {/* Checkbox 3: Rutas Históricas */}
              {rutasLayer && (
                <div className="rounded-lg border border-[#C5A059]/25 bg-[#0D0F12]/70 overflow-hidden">
                  <label className="flex items-center justify-between gap-2.5 px-3 py-2 hover:bg-[#C5A059]/10 cursor-pointer transition-colors select-none">
                    <span className="flex items-center gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={rutasLayer.visible}
                        onChange={() => toggleLayer('rutas_historicas')}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                          rutasLayer.visible
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0D0F12]'
                            : 'bg-[#0D0F12] border-[#C5A059]/40'
                        }`}
                      >
                        {rutasLayer.visible && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <Route className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span className="text-xs font-medium text-[#F4F1EA] truncate">
                        Rutas Históricas
                      </span>
                    </span>
                    <span className="text-[10px] font-mono-tabular text-[#A39E93]">Trazados</span>
                  </label>

                  {rutasLayer.visible && animatedRoutes.length > 0 && (
                    <div className="px-2.5 pb-2 pt-1 border-t border-[#C5A059]/15 space-y-1">
                      <div className="text-[10px] text-[#C5A059] font-medium px-1">
                        Reproducir recorrido animado:
                      </div>
                      {animatedRoutes.map((ar) => {
                        const isPlayingThis = activeAnimatedRoute?.id === ar.id;
                        return (
                          <button
                            key={ar.id}
                            type="button"
                            onClick={() => startAnimatedRoute(ar)}
                            className={`w-full text-left px-2 py-1 rounded text-[11px] flex items-center gap-1.5 transition-colors ${
                              isPlayingThis
                                ? 'bg-[#D4AF37]/20 text-[#D4AF37] font-semibold'
                                : 'text-[#F4F1EA]/85 hover:bg-[#C5A059]/15'
                            }`}
                          >
                            <Play className="w-2.5 h-2.5 text-[#D4AF37] fill-current shrink-0" />
                            <span className="truncate">{ar.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Checkbox 4: Hechos Históricos Generales */}
              {eventosLayer && (
                <label className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-lg border border-[#C5A059]/25 bg-[#0D0F12]/70 hover:border-[#D4AF37]/60 cursor-pointer transition-colors select-none">
                  <span className="flex items-center gap-2.5 min-w-0">
                    <input
                      type="checkbox"
                      checked={eventosLayer.visible}
                      onChange={() => toggleLayer('eventos_historicos')}
                      className="sr-only"
                    />
                    <span
                      className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                        eventosLayer.visible
                          ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0D0F12]'
                          : 'bg-[#0D0F12] border-[#C5A059]/40'
                      }`}
                    >
                      {eventosLayer.visible && <Check className="w-3 h-3 stroke-[3]" />}
                    </span>
                    <MapPin className="w-3.5 h-3.5 text-[#60A5FA] shrink-0" />
                    <span className="text-xs font-medium text-[#F4F1EA] truncate">
                      Hechos Históricos
                    </span>
                  </span>
                  <span className="text-[10px] font-mono-tabular text-[#A39E93]">
                    {filteredEvents.length}
                  </span>
                </label>
              )}

              {/* Checkbox 5: Presidentes por Provincia */}
              {presidentesLayer && (
                <div className="rounded-lg border border-[#C5A059]/25 bg-[#0D0F12]/70 overflow-hidden">
                  <label className="flex items-center justify-between gap-2.5 px-3 py-2 hover:bg-[#C5A059]/10 cursor-pointer transition-colors select-none">
                    <span className="flex items-center gap-2.5 min-w-0">
                      <input
                        type="checkbox"
                        checked={presidentesLayer.visible}
                        onChange={() => toggleLayer('presidentes_provincia')}
                        className="sr-only"
                      />
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                          presidentesLayer.visible
                            ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0D0F12]'
                            : 'bg-[#0D0F12] border-[#C5A059]/40'
                        }`}
                      >
                        {presidentesLayer.visible && <Check className="w-3 h-3 stroke-[3]" />}
                      </span>
                      <Users className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                      <span className="text-xs font-medium text-[#F4F1EA] truncate">
                        Presidentes por Provincia
                      </span>
                    </span>
                  </label>
                  {presidentesLayer.visible && (
                    <div className="px-3 pb-2 pt-1 border-t border-[#C5A059]/15 flex items-center justify-between">
                      <span className="text-[10px] text-[#A39E93]">Nacidos fuera del país:</span>
                      <button
                        type="button"
                        onClick={openForeignPresidents}
                        className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium text-[#D4AF37] bg-[#C5A059]/15 hover:bg-[#C5A059]/25 rounded transition-colors"
                      >
                        <Globe2 className="w-3 h-3" />
                        <span>Exterior ({foreignPresidents.length})</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Submenú Colapsable de Polígonos Territoriales y Mapas Antiguos */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowTerritorialSublayers((prev) => !prev)}
                  aria-expanded={showTerritorialSublayers}
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg border border-[#C5A059]/20 bg-[#0D0F12]/50 hover:border-[#C5A059]/45 text-[11px] font-medium text-[#C5A059] transition-colors"
                >
                  <span>Polígonos Territoriales ({territorialLayers.filter((l) => l.visible).length})</span>
                  {showTerritorialSublayers ? (
                    <ChevronUp className="w-3.5 h-3.5" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5" />
                  )}
                </button>

                {showTerritorialSublayers && (
                  <div className="mt-1.5 space-y-1.5 pl-1">
                    {territorialLayers.map((layer) => {
                      const opacityPct = Math.round(layer.opacidad * 100);
                      return (
                        <div
                          key={layer.id}
                          className="rounded-lg border border-[#C5A059]/20 bg-[#0D0F12]/65 p-2 space-y-1.5"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <label className="flex items-center gap-2 min-w-0 cursor-pointer flex-1">
                              <input
                                type="checkbox"
                                checked={layer.visible}
                                onChange={() => toggleLayer(layer.id)}
                                className="sr-only"
                              />
                              <span
                                className={`w-3.5 h-3.5 rounded flex items-center justify-center border shrink-0 ${
                                  layer.visible
                                    ? 'bg-[#D4AF37] border-[#D4AF37] text-[#0D0F12]'
                                    : 'bg-[#0D0F12] border-[#C5A059]/40'
                                }`}
                              >
                                {layer.visible && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                              </span>
                              <span
                                className="w-2 h-2 rounded-full shrink-0"
                                style={{ backgroundColor: layer.colorIndicador ?? '#C5A059' }}
                              />
                              <span className="text-[11px] font-medium text-[#F4F1EA] truncate">
                                {layer.nombre}
                              </span>
                            </label>
                            {layer.visible && layer.focusBounds && (
                              <button
                                type="button"
                                onClick={() => focusLayer(layer)}
                                className="text-[10px] text-[#D4AF37] hover:underline shrink-0"
                              >
                                Enfocar
                              </button>
                            )}
                          </div>

                          {layer.visible && (
                            <div className="flex items-center gap-2 pt-1 border-t border-[#C5A059]/10">
                              <span className="text-[10px] text-[#A39E93]">Opacidad</span>
                              <input
                                type="range"
                                min={10}
                                max={100}
                                step={5}
                                value={opacityPct}
                                onChange={(e) =>
                                  changeLayerOpacity(layer.id, Number(e.target.value) / 100)
                                }
                                className="gis-slider flex-1"
                              />
                              <span className="font-mono-tabular text-[10px] text-[#D4AF37] w-7 text-right">
                                {opacityPct}%
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() => setVintageGalleryOpen(true)}
                      className="w-full flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 hover:border-[#D4AF37] text-[11px] font-medium text-[#D4AF37] transition-colors"
                    >
                      <ScrollText className="w-3.5 h-3.5" />
                      <span>Galería de Mapas Antiguos</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

          <hr className="border-[#C5A059]/20" />

          {/* 2. EXPLORAR: 5 GRANDES PERÍODOS HISTÓRICOS */}
          <section aria-labelledby="drawer-regimes-heading" className="space-y-2">
            <div className="flex items-center justify-between">
              <h2
                id="drawer-regimes-heading"
                className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#C5A059]"
              >
                5 Grandes Períodos
              </h2>
              {onOpenExploreModal && (
                <button
                  type="button"
                  onClick={() => onOpenExploreModal()}
                  className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#D4AF37] hover:underline"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Enciclopedia</span>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              <button
                type="button"
                onClick={() => {
                  setActivePeriodFilter(null);
                  setRegimeFilter('all');
                  setMaxYear(2026);
                }}
                aria-pressed={activePeriodFilter === null && regimeFilter === 'all'}
                className={`w-full px-3 py-1.5 text-left text-xs font-medium rounded-lg border transition-colors ${
                  activePeriodFilter === null && regimeFilter === 'all'
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border-[#D4AF37]/70 font-semibold'
                    : 'bg-[#0D0F12]/70 text-[#F4F1EA]/85 border-[#C5A059]/20 hover:border-[#C5A059]/50'
                }`}
              >
                Todas las épocas (1492–2026)
              </button>

              {HISTORICAL_ENCYCLOPEDIA_PERIODS.map((period) => {
                const active = activePeriodFilter === period.id;
                return (
                  <div
                    key={period.id}
                    className={`rounded-lg border transition-colors flex items-center justify-between gap-1 p-1.5 ${
                      active
                        ? 'bg-[#161920] border-[#D4AF37]/80 shadow-sm'
                        : 'bg-[#0D0F12]/70 border-[#C5A059]/20 hover:border-[#C5A059]/50'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => explorePeriodOnMap(period)}
                      className="flex-1 min-w-0 text-left flex items-center gap-2 px-1.5 py-0.5"
                      title={`Filtrar mapa por ${period.titulo}`}
                    >
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: period.color }}
                      />
                      <span className="text-xs font-medium text-[#F4F1EA] truncate">
                        {period.titulo}
                      </span>
                    </button>

                    {onOpenExploreModal && (
                      <button
                        type="button"
                        onClick={() => onOpenExploreModal(period.id)}
                        title={`Leer ficha enciclopédica de ${period.titulo}`}
                        className="px-2 py-1 rounded bg-[#0D0F12] hover:bg-[#D4AF37] text-[#D4AF37] hover:text-[#0D0F12] border border-[#C5A059]/30 text-[10px] font-semibold shrink-0 transition-colors"
                      >
                        Leer
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <hr className="border-[#C5A059]/20" />

          {/* 3. CATEGORÍAS (Política, Batalla, Fundación, Derechos) */}
          <section aria-labelledby="drawer-categories-heading" className="space-y-2">
            <div className="flex items-center justify-between">
              <h2
                id="drawer-categories-heading"
                className="text-[11px] uppercase tracking-[0.14em] font-semibold text-[#C5A059]"
              >
                Categorías
              </h2>
              <span className="font-mono-tabular text-[10px] text-[#A39E93]">
                {filteredEvents.length} visibles
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {ALL_CATEGORIES.map((cat) => {
                const active = selectedCategories.includes(cat);
                const meta = CATEGORY_META[cat];
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    aria-pressed={active}
                    className={`flex items-center gap-2 px-2.5 py-2 text-xs font-medium rounded-lg border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      active
                        ? 'bg-[#0D0F12]/90 text-[#F4F1EA] border-[#D4AF37]/50'
                        : 'bg-[#0D0F12]/40 text-[#A39E93] border-[#C5A059]/15 opacity-75'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: active ? meta.color : '#52525B',
                      }}
                    />
                    <span className="truncate">{meta.shortLabel}</span>
                  </button>
                );
              })}
            </div>
          </section>
        </div>
      </aside>
    </>
  );
}
