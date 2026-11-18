import {
  Award,
  ChevronLeft,
  ChevronRight,
  Compass,
  Eye,
  EyeOff,
  Filter,
  Globe2,
  Layers,
  MapPin,
  Mountain,
  Route,
  Satellite,
  ScrollText,
  Search,
  X,
} from 'lucide-react';
import { ALL_CATEGORIES, useCronoMapa } from '../../context/CronoMapaContext';
import { BASE_MAPS } from '../../data/layersConfig';
import type { BaseMapId, EventCategory, LayerGroup, RegimeFilter } from '../../types/history';

const GROUP_LABELS: { key: LayerGroup; titulo: string }[] = [
  { key: 'geopolitica', titulo: 'Geopolítica y Dossiers Especiales' },
  { key: 'poligonos', titulo: 'Polígonos Territoriales Dinámicos' },
  { key: 'rutas', titulo: 'Rutas Vectoriales' },
  { key: 'antiguos', titulo: 'Mapas Antiguos Georreferenciados' },
  { key: 'puntos', titulo: 'Hechos Históricos y Políticos' },
];

const CATEGORY_COLOR: Record<EventCategory, string> = {
  'Política/Constitucional': '#1B3B82',
  'Batalla/Militar': '#C83728',
  'Fundación/Territorio': '#92400E',
  'Derechos/Sociedad': '#0F766E',
};

function BaseMapIcon({ id }: { id: BaseMapId }) {
  if (id === 'satellite_hybrid') return <Satellite className="w-4 h-4 shrink-0" />;
  if (id === 'realistic_relief' || id === 'physical_historical')
    return <Mountain className="w-4 h-4 shrink-0" />;
  return <ScrollText className="w-4 h-4 shrink-0" />;
}

function GroupIcon({ group }: { group: LayerGroup }) {
  if (group === 'geopolitica') return <Award className="w-3.5 h-3.5 text-[#D4AF37]" />;
  if (group === 'poligonos') return <Layers className="w-3.5 h-3.5 text-[#C5A059]" />;
  if (group === 'rutas') return <Route className="w-3.5 h-3.5 text-[#C5A059]" />;
  if (group === 'antiguos') return <ScrollText className="w-3.5 h-3.5 text-[#C5A059]" />;
  return <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />;
}

const REGIME_OPTIONS: { id: RegimeFilter; label: string }[] = [
  { id: 'all', label: 'Todos los períodos' },
  { id: 'trujillo', label: 'Era de Trujillo (1930–1961)' },
  { id: 'balaguer', label: 'Gobiernos de Balaguer (1960–1996)' },
];

export default function SidebarGIS() {
  const {
    sidebarOpen,
    toggleSidebar,
    activeBaseMapId,
    setActiveBaseMapId,
    reliefIntensity,
    setReliefIntensity,
    layers,
    toggleLayer,
    changeLayerOpacity,
    focusLayer,
    resetView,
    searchQuery,
    setSearchQuery,
    selectedCategories,
    toggleCategory,
    regimeFilter,
    setRegimeFilter,
    openForeignPresidents,
    foreignPresidents,
    filteredEvents,
    allEventsSorted,
    allPresidents,
    allRoutesCount,
  } = useCronoMapa();

  return (
    <>
      {/* Collapsed Floating Reopen Button */}
      {!sidebarOpen && (
        <button
          type="button"
          onClick={toggleSidebar}
          aria-label="Abrir panel de capas GIS"
          className="absolute top-3 left-4 z-[900] flex items-center gap-2 px-3.5 py-2 min-h-[40px] bg-[#161920]/85 backdrop-blur-xl border border-[#C5A059]/30 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] text-[#F4F1EA] hover:border-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] whitespace-nowrap shrink-0"
        >
          <Layers className="w-4 h-4 text-[#D4AF37] shrink-0" />
          <span className="text-xs font-semibold">Capas y Filtros</span>
          <ChevronRight className="w-4 h-4 text-[#A39E93] shrink-0" />
        </button>
      )}

      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="absolute inset-0 bg-black/50 z-[890] md:hidden"
          aria-hidden="true"
        />
      )}

      {/* Main Collapsible Left GIS Sidebar */}
      <aside
        aria-label="Gestor de capas cartográficas y filtros"
        className={`absolute top-0 left-0 z-[900] h-full w-[350px] max-w-[90vw] bg-[#161920]/90 backdrop-blur-xl border-r border-[#C5A059]/30 shadow-[0_20px_50px_rgba(0,0,0,0.75)] flex flex-col text-[#F4F1EA] transition-transform duration-200 ease-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Top Search & Collapse */}
        <div className="px-4 pt-4 pb-3 border-b border-[#C5A059]/20 space-y-3">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="font-display text-sm font-semibold text-[#F4F1EA]">
                Panel Cartográfico GIS
              </span>
            </div>
            <button
              type="button"
              onClick={toggleSidebar}
              aria-label="Contraer panel lateral"
              className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/80 text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#D4AF37] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* Real-time Keyword Search */}
          <div className="relative">
            <Search
              className="w-3.5 h-3.5 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar hecho, provincia o prócer..."
              aria-label="Buscar hecho histórico, provincia o personaje"
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#0D0F12]/90 border border-[#C5A059]/30 rounded-lg text-[#F4F1EA] placeholder:text-[#A39E93] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
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
          </div>
        </div>

        {/* Scrollable GIS Controls */}
        <div className="flex-1 overflow-y-auto gis-scroll px-4 py-4 space-y-6">
          {/* Regimes Special Filter Section: Trujillo y Balaguer */}
          <section aria-labelledby="regimes-heading" className="space-y-2">
            <h2
              id="regimes-heading"
              className="text-[11px] uppercase tracking-[0.16em] font-semibold text-[#C5A059]"
            >
              Regímenes del Siglo XX: Trujillo y Balaguer
            </h2>
            <div className="grid grid-cols-1 gap-1.5">
              {REGIME_OPTIONS.map((opt) => {
                const active = regimeFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setRegimeFilter(opt.id)}
                    aria-pressed={active}
                    className={`w-full px-3 py-2 text-left text-xs font-medium rounded-lg border transition-colors whitespace-nowrap truncate focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      active
                        ? 'bg-[#9B2226] text-[#F4F1EA] border-[#D4AF37]/60'
                        : 'bg-[#0D0F12]/70 text-[#F4F1EA]/85 border-[#C5A059]/20 hover:border-[#C5A059]/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-[#C5A059]/20" />

          {/* Category Filters */}
          <section aria-labelledby="categories-heading" className="space-y-2">
            <div className="flex items-center justify-between">
              <h2
                id="categories-heading"
                className="flex items-center gap-1.5 text-xs font-semibold text-[#C5A059]"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>Categorías históricas</span>
              </h2>
              <span className="font-mono-tabular text-[11px] text-[#A39E93]">
                {filteredEvents.length} visibles
              </span>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {ALL_CATEGORIES.map((cat) => {
                const active = selectedCategories.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    aria-pressed={active}
                    className={`flex items-center gap-2 px-2.5 py-2 text-[11px] font-medium rounded-lg border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      active
                        ? 'bg-[#0D0F12] text-[#F4F1EA] border-[#D4AF37]/50'
                        : 'bg-[#0D0F12]/40 text-[#A39E93] border-[#C5A059]/15'
                    }`}
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{
                        backgroundColor: active ? CATEGORY_COLOR[cat] : '#52525B',
                      }}
                    />
                    <span className="truncate">{cat.split('/')[0]}</span>
                  </button>
                );
              })}
            </div>
          </section>

          <hr className="border-[#C5A059]/20" />

          {/* Base Map Selector */}
          <section aria-labelledby="basemap-heading">
            <div className="flex items-center justify-between mb-2">
              <h2 id="basemap-heading" className="text-xs font-semibold text-[#C5A059]">
                Mapa base topográfico e histórico
              </h2>
              <span className="font-mono-tabular text-[11px] text-[#A39E93]">EPSG:3857</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5">
              {BASE_MAPS.map((bm) => {
                const active = bm.id === activeBaseMapId;
                return (
                  <button
                    key={bm.id}
                    type="button"
                    onClick={() => setActiveBaseMapId(bm.id)}
                    aria-pressed={active}
                    className={`w-full flex items-center gap-3 px-3 py-2 min-h-[42px] rounded-lg border text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                      active
                        ? 'bg-[#1D3557] text-[#F4F1EA] border-[#D4AF37]/70'
                        : 'bg-[#0D0F12]/70 text-[#F4F1EA] border-[#C5A059]/20 hover:border-[#C5A059]/45'
                    }`}
                  >
                    <BaseMapIcon id={bm.id} />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-medium leading-tight whitespace-nowrap truncate">
                        {bm.nombre}
                      </div>
                      <div
                        className={`text-[10px] leading-tight mt-0.5 truncate ${
                          active ? 'text-[#F4F1EA]/85' : 'text-[#A39E93]'
                        }`}
                      >
                        {bm.subtitulo}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Relief Intensity Slider (0.3 – 1.0 for World_Shaded_Relief) */}
            <div className="mt-3 p-3 rounded-lg border border-[#C5A059]/25 bg-[#0D0F12]/70 space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor="relief-intensity-slider"
                  className="text-[11px] font-semibold text-[#F4F1EA]"
                >
                  Intensidad de Relieve Topográfico
                </label>
                <span className="font-mono-tabular text-[11px] font-semibold text-[#D4AF37]">
                  {Math.round(reliefIntensity * 100)}%
                </span>
              </div>
              <input
                id="relief-intensity-slider"
                type="range"
                min={0.3}
                max={1.0}
                step={0.05}
                value={reliefIntensity}
                onChange={(e) => setReliefIntensity(Number(e.target.value))}
                disabled={
                  activeBaseMapId !== 'realistic_relief' &&
                  activeBaseMapId !== 'physical_historical'
                }
                className="gis-slider w-full disabled:opacity-45"
              />
              <div className="text-[10px] text-[#A39E93] leading-snug">
                {activeBaseMapId === 'realistic_relief' || activeBaseMapId === 'physical_historical'
                  ? 'Modula la orografía 3D de la Cordillera Central y Sierra de Bahoruco.'
                  : 'Disponible en los modos Relieve Topográfico o Terreno Físico Histórico.'}
              </div>
            </div>
          </section>

          <hr className="border-[#C5A059]/20" />

          {/* Thematic GIS Layer Manager */}
          <section aria-labelledby="layers-heading" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 id="layers-heading" className="text-xs font-semibold text-[#C5A059]">
                Gestor de capas GIS
              </h2>
              <span className="font-mono-tabular text-[11px] text-[#A39E93]">
                {layers.filter((l) => l.visible).length}/{layers.length} activas
              </span>
            </div>

            {GROUP_LABELS.map((group) => {
              const groupLayers = layers.filter((l) => l.grupo === group.key);
              if (groupLayers.length === 0) return null;

              return (
                <div key={group.key} className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#F4F1EA]/90">
                    <GroupIcon group={group.key} />
                    <span>{group.titulo}</span>
                  </div>

                  <div className="space-y-2">
                    {groupLayers.map((layer) => {
                      const opacityPct = Math.round(layer.opacidad * 100);
                      return (
                        <div
                          key={layer.id}
                          className={`rounded-lg border p-3 transition-colors ${
                            layer.visible
                              ? 'bg-[#0D0F12]/85 border-[#C5A059]/35'
                              : 'bg-[#0D0F12]/40 border-[#C5A059]/15'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <span
                                  className="w-2.5 h-2.5 rounded-sm shrink-0"
                                  style={{ backgroundColor: layer.colorIndicador ?? '#C5A059' }}
                                  aria-hidden="true"
                                />
                                <span className="text-xs font-semibold text-[#F4F1EA] leading-snug">
                                  {layer.nombre}
                                </span>
                              </div>
                              <p className="text-[11px] text-[#A39E93] mt-1 leading-relaxed">
                                {layer.descripcion}
                              </p>
                            </div>

                            <button
                              type="button"
                              role="switch"
                              aria-checked={layer.visible}
                              aria-label={`Alternar capa ${layer.nombre}`}
                              onClick={() => toggleLayer(layer.id)}
                              className={`min-w-[38px] min-h-[38px] flex items-center justify-center rounded-md border transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                                layer.visible
                                  ? 'bg-[#D4AF37]/15 border-[#D4AF37]/45 text-[#D4AF37]'
                                  : 'bg-transparent border-[#C5A059]/20 text-[#A39E93] hover:text-[#F4F1EA]'
                              }`}
                            >
                              {layer.visible ? (
                                <Eye className="w-4 h-4" />
                              ) : (
                                <EyeOff className="w-4 h-4" />
                              )}
                            </button>
                          </div>

                          {layer.visible && (
                            <div className="mt-2.5 pt-2 border-t border-[#C5A059]/15 space-y-2">
                              <div className="flex items-center justify-between gap-3">
                                <label
                                  htmlFor={`opacity-${layer.id}`}
                                  className="text-[11px] font-medium text-[#A39E93] whitespace-nowrap"
                                >
                                  Opacidad
                                </label>
                                <input
                                  id={`opacity-${layer.id}`}
                                  type="range"
                                  min={0}
                                  max={100}
                                  step={5}
                                  value={opacityPct}
                                  onChange={(e) =>
                                    changeLayerOpacity(layer.id, Number(e.target.value) / 100)
                                  }
                                  className="gis-slider flex-1"
                                />
                                <span className="font-mono-tabular text-[11px] font-medium text-[#D4AF37] w-9 text-right">
                                  {opacityPct}%
                                </span>
                              </div>

                              {layer.id === 'presidentes_provincia' && (
                                <div className="flex items-center justify-between gap-2">
                                  <span className="text-[11px] text-[#A39E93]">
                                    Clic en provincia o insignia
                                  </span>
                                  <button
                                    type="button"
                                    onClick={openForeignPresidents}
                                    className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium text-[#D4AF37] bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/25 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                                  >
                                    <Globe2 className="w-3.5 h-3.5 shrink-0" />
                                    <span>Exterior ({foreignPresidents.length})</span>
                                  </button>
                                </div>
                              )}

                              {layer.focusBounds && (
                                <div className="flex justify-end">
                                  <button
                                    type="button"
                                    onClick={() => focusLayer(layer)}
                                    className="px-3 py-1.5 text-xs font-medium text-[#D4AF37] bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/25 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                                  >
                                    Enfocar área del mapa
                                  </button>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </section>
        </div>

        {/* Clean Sidebar Footer */}
        <div className="px-4 py-3 border-t border-[#C5A059]/20 bg-[#0D0F12]/80 flex items-center justify-between gap-3">
          <div className="text-[11px] text-[#A39E93] font-mono-tabular truncate">
            {allEventsSorted.length} hechos · {allPresidents.length} pres. · {allRoutesCount} rutas
          </div>
          <button
            type="button"
            onClick={resetView}
            className="px-3 py-1.5 text-xs font-medium text-[#D4AF37] bg-[#C5A059]/10 hover:bg-[#C5A059]/20 border border-[#C5A059]/25 rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            Centrar isla
          </button>
        </div>
      </aside>
    </>
  );
}
