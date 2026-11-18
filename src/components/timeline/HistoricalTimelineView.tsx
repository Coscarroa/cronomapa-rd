import { useMemo, useRef, useState } from 'react';
import { Calendar, MapPin, ZoomIn, ZoomOut } from 'lucide-react';
import { useCronoMapa } from '../../context/CronoMapaContext';
import PresidentPortrait from '../ui/PresidentPortrait';
import type { EventCategory, MandatoTipo } from '../../types/history';

const MIN_YEAR = 1492;
const MAX_YEAR = 2026;

const ERA_JUMPS = [
  { label: '1492 Colonia', year: 1492 },
  { label: '1844 Independencia', year: 1844 },
  { label: '1863 Restauración', year: 1863 },
  { label: '1916 Ocupación EE.UU.', year: 1916 },
  { label: '1930 Trujillo', year: 1930 },
  { label: '1965 Guerra de Abril', year: 1965 },
  { label: '1966–1996 Balaguer', year: 1966 },
  { label: '1996–2026 Contemporánea', year: 1996 },
];

const MANDATO_COLORS: Record<MandatoTipo, { bg: string; border: string; label: string }> = {
  constitucional: { bg: '#1D3557', border: '#C5A059', label: 'Constitucional' },
  junta_provisional: { bg: '#0F766E', border: '#2DD4BF', label: 'Junta / Provisional' },
  golpe_derrocado: { bg: '#B45309', border: '#F59E0B', label: 'Golpe / Derrocado' },
  ocupacion_extranjera: { bg: '#334155', border: '#94A3B8', label: 'Ocupación Extranjera' },
  regimen_autoritario: { bg: '#9B2226', border: '#F87171', label: 'Régimen Autoritario' },
};

const CATEGORY_COLORS: Record<EventCategory, string> = {
  'Política/Constitucional': '#1B3B82',
  'Batalla/Militar': '#C83728',
  'Fundación/Territorio': '#92400E',
  'Derechos/Sociedad': '#0F766E',
};

function dateToDecimalYear(iso: string): number {
  const [y, m = '1', d = '1'] = iso.split('-');
  const year = Number(y);
  const month = Number(m) - 1;
  const day = Number(d) - 1;
  return year + month / 12 + day / 365;
}

export default function HistoricalTimelineView() {
  const {
    allEventsSorted,
    allMandatos,
    allPresidents,
    setSelectedFeature,
    openEventOnMap,
    selectedFeature,
    portraitsLoading,
    openPresidentDetailModal,
  } = useCronoMapa();

  const [zoomMode, setZoomMode] = useState<'decades' | 'years'>('decades');
  const [tipoFilter, setTipoFilter] = useState<MandatoTipo | 'all'>('all');
  const [catFilter, setCatFilter] = useState<EventCategory | 'all'>('all');
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const pxPerYear = zoomMode === 'decades' ? 18 : 42;
  const paddingX = 80;
  const totalWidth = (MAX_YEAR - MIN_YEAR) * pxPerYear + paddingX * 2;

  const yearToX = (yr: number) => paddingX + (yr - MIN_YEAR) * pxPerYear;

  const jumpToYear = (year: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const targetX = Math.max(0, yearToX(year) - el.clientWidth * 0.25);
    el.scrollTo({ left: targetX, behavior: 'smooth' });
  };

  const presidentsById = useMemo(() => {
    const map: Record<string, (typeof allPresidents)[number]> = {};
    for (const p of allPresidents) map[p.id] = p;
    return map;
  }, [allPresidents]);

  const visibleEvents = useMemo(
    () =>
      allEventsSorted.filter((e) =>
        catFilter === 'all' ? true : e.properties.categoria === catFilter,
      ),
    [allEventsSorted, catFilter],
  );

  const visibleMandatos = useMemo(
    () =>
      allMandatos.filter((m) => (tipoFilter === 'all' ? true : m.tipo === tipoFilter)),
    [allMandatos, tipoFilter],
  );

  // Assign stagger lanes (0..4) to prevent overlapping event cards in the top track
  const positionedEvents = useMemo(() => {
    const laneLastX: number[] = [-9999, -9999, -9999, -9999, -9999];
    const cardWidth = 224;
    return visibleEvents.map((evt) => {
      const x = yearToX(dateToDecimalYear(evt.properties.fecha));
      let chosenLane = 0;
      for (let i = 0; i < laneLastX.length; i++) {
        if (x - laneLastX[i] >= cardWidth + 14) {
          chosenLane = i;
          break;
        }
        if (laneLastX[i] < laneLastX[chosenLane]) {
          chosenLane = i;
        }
      }
      laneLastX[chosenLane] = x;
      return { evt, x, lane: chosenLane };
    });
  }, [visibleEvents, pxPerYear]);

  const ticks = useMemo(() => {
    const step = zoomMode === 'decades' ? 20 : 10;
    const list: number[] = [1492];
    for (let y = 1500; y <= 2020; y += step) {
      list.push(y);
    }
    list.push(2026);
    return list;
  }, [zoomMode]);

  return (
    <section
      aria-label="Línea de Tiempo Histórica y Mandatos Presidenciales"
      className="h-full w-full bg-[#0D0F12] text-[#F4F1EA] flex flex-col overflow-hidden"
    >
      {/* Top Timeline Control Bar */}
      <div className="px-4 sm:px-6 py-3 bg-[#161920]/90 backdrop-blur-xl border-b border-[#C5A059]/30 flex flex-col gap-2.5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Era Quick Jumps */}
          <div className="flex items-center gap-1.5 overflow-x-auto gis-scroll pb-0.5 max-w-full">
            {ERA_JUMPS.map((era) => (
              <button
                key={era.label}
                type="button"
                onClick={() => jumpToYear(era.year)}
                className="px-2.5 py-1.5 text-xs font-medium bg-[#0D0F12]/80 border border-[#C5A059]/25 hover:border-[#D4AF37] hover:text-[#D4AF37] text-[#F4F1EA] rounded-md transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
              >
                {era.label}
              </button>
            ))}
          </div>

          {/* Temporal Zoom Switch */}
          <div className="flex items-center gap-1 p-1 bg-[#0D0F12] border border-[#C5A059]/30 rounded-lg shrink-0">
            <button
              type="button"
              onClick={() => setZoomMode('decades')}
              aria-pressed={zoomMode === 'decades'}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                zoomMode === 'decades'
                  ? 'bg-[#D4AF37] text-[#0D0F12] font-semibold'
                  : 'text-[#A39E93] hover:text-[#F4F1EA]'
              }`}
            >
              <ZoomOut className="w-3.5 h-3.5" />
              <span>Décadas</span>
            </button>
            <button
              type="button"
              onClick={() => setZoomMode('years')}
              aria-pressed={zoomMode === 'years'}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                zoomMode === 'years'
                  ? 'bg-[#D4AF37] text-[#0D0F12] font-semibold'
                  : 'text-[#A39E93] hover:text-[#F4F1EA]'
              }`}
            >
              <ZoomIn className="w-3.5 h-3.5" />
              <span>Años</span>
            </button>
          </div>
        </div>

        {/* Category & Government Type Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#C5A059] font-medium mr-1">Hechos:</span>
            {(['all', 'Política/Constitucional', 'Batalla/Militar', 'Fundación/Territorio', 'Derechos/Sociedad'] as const).map(
              (cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCatFilter(cat)}
                  className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors whitespace-nowrap ${
                    catFilter === cat
                      ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37] font-semibold'
                      : 'bg-[#0D0F12]/70 text-[#A39E93] border-[#C5A059]/20 hover:border-[#C5A059]/50 hover:text-[#F4F1EA]'
                  }`}
                >
                  {cat === 'all' ? 'Todos' : cat.split('/')[0]}
                </button>
              ),
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[#C5A059] font-medium mr-1">Mandatos:</span>
            <button
              type="button"
              onClick={() => setTipoFilter('all')}
              className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors whitespace-nowrap ${
                tipoFilter === 'all'
                  ? 'bg-[#D4AF37] text-[#0D0F12] border-[#D4AF37] font-semibold'
                  : 'bg-[#0D0F12]/70 text-[#A39E93] border-[#C5A059]/20 hover:text-[#F4F1EA]'
              }`}
            >
              Todos
            </button>
            {(Object.keys(MANDATO_COLORS) as MandatoTipo[]).map((tipo) => (
              <button
                key={tipo}
                type="button"
                onClick={() => setTipoFilter(tipo)}
                className={`flex items-center gap-1.5 px-2 py-1 rounded text-[11px] font-medium border transition-colors whitespace-nowrap ${
                  tipoFilter === tipo
                    ? 'text-[#F4F1EA] border-[#D4AF37]/60'
                    : 'bg-[#0D0F12]/70 text-[#A39E93] border-[#C5A059]/20 hover:text-[#F4F1EA]'
                }`}
                style={
                  tipoFilter === tipo ? { backgroundColor: MANDATO_COLORS[tipo].bg } : undefined
                }
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor:
                      tipoFilter === tipo ? '#F4F1EA' : MANDATO_COLORS[tipo].bg,
                  }}
                />
                <span>{MANDATO_COLORS[tipo].label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Synchronized Dual-Track Horizontal Scroll Canvas */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto overflow-y-auto gis-scroll relative"
      >
        <div
          className="relative min-h-[600px] h-full"
          style={{ width: `${totalWidth}px` }}
        >
          {/* Vertical Grid Lines & Year Ruler */}
          {ticks.map((year) => {
            const left = yearToX(year);
            return (
              <div
                key={year}
                className="absolute top-0 bottom-0 border-l border-[#C5A059]/15 pointer-events-none"
                style={{ left: `${left}px` }}
              >
                <span className="sticky top-0 inline-block -translate-x-1/2 mt-2 px-2 py-0.5 bg-[#0D0F12]/95 border border-[#C5A059]/20 rounded font-mono-tabular text-[11px] font-semibold text-[#C5A059]">
                  {year}
                </span>
              </div>
            );
          })}

          {/* Track 1 Label (Sticky Left) */}
          <div className="sticky left-4 top-10 z-20 inline-flex items-center gap-2 px-3 py-1 bg-[#161920]/95 backdrop-blur-md border border-[#C5A059]/35 rounded-md text-xs font-semibold text-[#D4AF37] shadow-lg">
            <Calendar className="w-3.5 h-3.5" />
            <span>Carril 1 · Hechos Históricos y Políticos (1492–2026)</span>
          </div>

          {/* UPPER TRACK: Historical Events */}
          <div className="relative h-[335px] mt-4">
            {positionedEvents.map(({ evt, x, lane }) => {
              const top = 12 + lane * 62;
              const isSelected =
                selectedFeature?.kind === 'event' &&
                selectedFeature.data.properties.id === evt.properties.id;
              const color = CATEGORY_COLORS[evt.properties.categoria];

              return (
                <div
                  key={evt.properties.id}
                  style={{ left: `${x}px`, top: `${top}px` }}
                  className="absolute w-[220px] z-10"
                >
                  <div
                    onClick={() => setSelectedFeature({ kind: 'event', data: evt })}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedFeature({ kind: 'event', data: evt });
                      }
                    }}
                    className={`group cursor-pointer rounded-lg border p-2.5 transition-all bg-[#161920]/90 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.45)] hover:border-[#D4AF37] ${
                      isSelected
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30'
                        : 'border-[#C5A059]/25'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 text-[11px]">
                      <span className="font-mono-tabular font-semibold text-[#D4AF37] flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        {evt.properties.anio}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEventOnMap(evt);
                        }}
                        title="Ver en Mapa GIS"
                        className="text-[#C5A059] hover:text-[#D4AF37] p-0.5 rounded"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs font-semibold text-[#F4F1EA] leading-snug line-clamp-2 mt-1">
                      {evt.properties.titulo}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Chronological Divider */}
          <div className="relative h-8 border-y border-[#C5A059]/30 bg-[#161920]/90 flex items-center">
            <div className="sticky left-4 z-20 text-xs font-semibold text-[#D4AF37] px-2">
              Carril 2 · Mandatos Presidenciales y Gobiernos Paralelos (desde 1844)
            </div>
          </div>

          {/* LOWER TRACK: Presidential Mandates (1844–2026) with Parallel Sub-Tracks */}
          <div className="relative h-[180px] pt-4">
            {visibleMandatos.map((mandato) => {
              const startX = yearToX(dateToDecimalYear(mandato.fecha_inicio));
              const endX = yearToX(dateToDecimalYear(mandato.fecha_fin));
              const width = Math.max(46, endX - startX);
              const top = mandato.carril === 1 ? 14 : 92;
              const style = MANDATO_COLORS[mandato.tipo];
              const isSelected =
                selectedFeature?.kind === 'mandato' && selectedFeature.data.id === mandato.id;
              const presObj = mandato.presidente_id
                ? presidentsById[mandato.presidente_id]
                : undefined;

              return (
                <button
                  key={mandato.id}
                  type="button"
                  onClick={() =>
                    setSelectedFeature({
                      kind: 'mandato',
                      data: mandato,
                      presidente: presObj,
                    })
                  }
                  style={{
                    left: `${startX}px`,
                    width: `${width}px`,
                    top: `${top}px`,
                    backgroundColor: style.bg,
                    borderColor: isSelected ? '#D4AF37' : 'rgba(197, 160, 89, 0.35)',
                  }}
                  className={`absolute h-[64px] rounded-lg border px-2 flex items-center gap-2 text-left text-[#F4F1EA] shadow-[0_8px_20px_rgba(0,0,0,0.45)] hover:brightness-110 transition-all overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] ${
                    isSelected ? 'ring-2 ring-[#D4AF37] z-20' : 'z-10'
                  }`}
                >
                  <PresidentPortrait
                    name={mandato.nombre}
                    fotoUrl={mandato.foto_url}
                    size="xs"
                    shape="circle"
                    isLoading={portraitsLoading}
                    accentColor={style.bg}
                    onClick={() => openPresidentDetailModal(presObj?.nombre || mandato.nombre)}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold leading-tight truncate">
                      {mandato.nombre}
                    </div>
                    <div className="font-mono-tabular text-[10px] text-[#F4F1EA]/85 truncate mt-0.5">
                      {mandato.fecha_inicio.slice(0, 4)}–{mandato.fecha_fin.slice(0, 4)}
                      {mandato.carril === 2 ? ' · Paralelo' : ''}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
