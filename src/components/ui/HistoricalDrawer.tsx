import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  Award,
  BookOpen,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Globe2,
  Landmark,
  MapPin,
  Route,
  ScrollText,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { useCronoMapa } from '../../context/CronoMapaContext';
import { EVENT_ASSET_MAP } from '../../data/layersConfig';
import { resolvePortraitUrl } from '../../services/wikipediaPortraitsService';
import ColonialMonumentPanel from './ColonialMonumentPanel';
import PresidentPortrait from './PresidentPortrait';
import { PrimarySourceCapsuleContent } from './PrimarySourceDrawer.jsx';
import { getPrimarySourceForYearOrEpoch } from '../../data/primarySourcesData.js';
import type { PresidenteRD } from '../../types/history';

type EventTab = 'relato' | 'impacto' | 'caribe' | 'documento';

export interface HistoricalDrawerProps {
  isTeacherMode?: boolean;
  onOpenWorksheetModal?: (epochKey?: string) => void;
}

function OrnamentalDivider() {
  return (
    <div className="flex items-center gap-3 my-2" aria-hidden="true">
      <span className="h-px flex-1 bg-[#C5A059]/25" />
      <span className="w-1.5 h-1.5 rotate-45 border border-[#C5A059]/70" />
      <span className="h-px flex-1 bg-[#C5A059]/25" />
    </div>
  );
}

export default function HistoricalDrawer({
  isTeacherMode = false,
  onOpenWorksheetModal,
}: HistoricalDrawerProps = {}) {
  const {
    selectedFeature,
    setSelectedFeature,
    tourActive,
    tourIndex,
    filteredEvents,
    allEventsSorted,
    nextTourStep,
    prevTourStep,
    stopTour,
    openEventOnMap,
    flyToCoords,
    setViewMode,
    viewMode,
    maxYear,
    setMaxYear,
    wikiPortraits,
    portraitsLoading,
    detailModalPresidentKey,
    openPresidentDetailModal,
  } = useCronoMapa();

  const [activeTab, setActiveTab] = useState<EventTab>('relato');
  const [imgError, setImgError] = useState(false);
  const [focusedPresident, setFocusedPresident] = useState<PresidenteRD | null>(null);
  const [showTeacherSourceInDrawer, setShowTeacherSourceInDrawer] = useState(false);

  useEffect(() => {
    setActiveTab('relato');
    setImgError(false);
    if (selectedFeature?.kind === 'province_presidents') {
      const preselected = selectedFeature.focusedPresidentId
        ? selectedFeature.presidentes.find((p) => p.id === selectedFeature.focusedPresidentId) ??
          null
        : selectedFeature.presidentes.length === 1
          ? selectedFeature.presidentes[0]
          : null;
      setFocusedPresident(preselected);
    } else if (selectedFeature?.kind === 'mandato' && selectedFeature.presidente) {
      setFocusedPresident(selectedFeature.presidente);
    } else {
      setFocusedPresident(null);
    }
  }, [selectedFeature]);

  useEffect(() => {
    if (!selectedFeature) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !detailModalPresidentKey) {
        setSelectedFeature(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedFeature, setSelectedFeature, detailModalPresidentKey]);

  const tourList = useMemo(
    () => (filteredEvents.length > 0 ? filteredEvents : allEventsSorted),
    [filteredEvents, allEventsSorted],
  );

  if (!selectedFeature) return null;

  return (
    <aside
      aria-label="Ficha historiográfica y biográfica"
      className="pdi-scalable-panel absolute top-0 right-0 z-[940] h-full w-full sm:w-[460px] bg-[#161920]/90 backdrop-blur-xl border-l border-[#C5A059]/30 shadow-[0_20px_50px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden transition-all duration-300 text-[#F4F1EA] print:hidden"
    >
      {/* Museum Accession Header */}
      <div className="px-5 pt-4 pb-3 border-b border-[#C5A059]/25 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {selectedFeature.kind === 'event' && (
            <>
              <div className="text-xs text-[#C5A059] font-mono-tabular">
                {selectedFeature.data.properties.anio} · {selectedFeature.data.properties.categoria}{' '}
                · {selectedFeature.data.properties.provincia}
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F4F1EA] leading-snug mt-1">
                {selectedFeature.data.properties.titulo}
              </h2>
            </>
          )}

          {selectedFeature.kind === 'milestone' && (
            <>
              <div className="text-xs text-[#C5A059] font-mono-tabular">
                {selectedFeature.data.epoch} · {selectedFeature.data.date} ·{' '}
                {selectedFeature.data.type === 'batalla'
                  ? 'Batalla Histórica'
                  : selectedFeature.data.type === 'proclamacion'
                    ? 'Proclamación'
                    : 'Fundación'}
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F4F1EA] leading-snug mt-1">
                {selectedFeature.data.title}
              </h2>
            </>
          )}

          {selectedFeature.kind === 'colonial_monument' && (
            <>
              <div className="text-xs text-[#D4AF37] font-mono-tabular">
                Monumento Colonial · {selectedFeature.data.centuryLabel}
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F4F1EA] leading-snug mt-1">
                {selectedFeature.data.name}
              </h2>
            </>
          )}

          {selectedFeature.kind === 'province_presidents' && (
            <>
              <div className="text-xs text-[#C5A059] font-medium">
                {selectedFeature.region ? `Región ${selectedFeature.region} · ` : ''}
                {selectedFeature.presidentes.length}{' '}
                {selectedFeature.presidentes.length === 1
                  ? 'mandatario registrado'
                  : 'mandatarios registrados'}
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F4F1EA] leading-snug mt-1">
                {focusedPresident
                  ? focusedPresident.nombre
                  : `Presidentes de ${selectedFeature.provinceName}`}
              </h2>
            </>
          )}

          {selectedFeature.kind === 'mandato' && (
            <>
              <div className="text-xs font-mono-tabular text-[#C5A059] font-medium">
                {selectedFeature.data.fecha_inicio.slice(0, 4)}–
                {selectedFeature.data.fecha_fin.slice(0, 4)} · {selectedFeature.data.titulo_cargo}
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F4F1EA] leading-snug mt-1">
                {selectedFeature.data.nombre}
              </h2>
            </>
          )}

          {selectedFeature.kind === 'dossier_hito' && (
            <>
              <div className="text-xs font-mono-tabular text-[#C5A059] font-medium">
                Dossier{' '}
                {selectedFeature.data.regimen === 'trujillo'
                  ? 'Era de Trujillo'
                  : 'Joaquín Balaguer'}{' '}
                · {selectedFeature.data.anio} · {selectedFeature.data.categoria}
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F4F1EA] leading-snug mt-1">
                {selectedFeature.data.titulo}
              </h2>
            </>
          )}

          {selectedFeature.kind === 'route' && (
            <>
              <div className="text-xs text-[#C5A059] font-medium">
                {selectedFeature.data.properties.tipo_ruta_etiqueta} ·{' '}
                {selectedFeature.data.properties.fechas}
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F4F1EA] leading-snug mt-1">
                {selectedFeature.data.properties.titulo}
              </h2>
            </>
          )}

          {selectedFeature.kind === 'province' && (
            <>
              <div className="text-xs text-[#C5A059] font-medium">
                Demarcación Actual · Región {selectedFeature.data.properties.region}
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F4F1EA] leading-snug mt-1">
                {selectedFeature.data.properties.nombre}
              </h2>
            </>
          )}

          {selectedFeature.kind === 'territorial' && (
            <>
              <div className="text-xs text-[#C5A059] font-medium font-mono-tabular">
                {selectedFeature.data.properties.anio_inicio}–
                {selectedFeature.data.properties.anio_fin} ·{' '}
                {selectedFeature.data.properties.subtitulo}
              </div>
              <h2 className="font-display text-lg font-semibold text-[#F4F1EA] leading-snug mt-1">
                {selectedFeature.data.properties.nombre_capa}
              </h2>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setSelectedFeature(null)}
          aria-label="Cerrar panel de detalle"
          className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/70 text-[#A39E93] hover:text-[#D4AF37] hover:border-[#D4AF37] transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Scrollable Museum Card Body */}
      <div className="flex-1 overflow-y-auto gis-scroll p-5 space-y-4 text-sm text-[#F4F1EA]/90">
        {/* VIEW 1: HISTORICAL EVENT WITH TABS */}
        {selectedFeature.kind === 'event' &&
          (() => {
            const evt = selectedFeature.data;
            const props = evt.properties;
            const [lng, lat] = evt.geometry.coordinates;
            const resolvedImg = EVENT_ASSET_MAP[props.imagen_url] ?? props.imagen_url;

            return (
              <>
                {!imgError && resolvedImg ? (
                  <div className="rounded-lg overflow-hidden border border-[#C5A059]/30 bg-[#0D0F12] aspect-video">
                    <img
                      src={resolvedImg}
                      alt={props.titulo}
                      referrerPolicy="no-referrer"
                      onError={() => setImgError(true)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/60 p-5 flex items-center gap-3 text-[#A39E93]">
                    <Landmark className="w-6 h-6 text-[#C5A059] shrink-0" />
                    <span className="text-xs font-medium text-[#F4F1EA]">{props.titulo}</span>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="text-[#A39E93]">{props.periodo}</span>
                  <span className="font-mono text-xs text-[#C5A059] font-mono-tabular">
                    {lat.toFixed(4)}° N, {Math.abs(lng).toFixed(4)}° O
                  </span>
                </div>

                {viewMode === 'timeline' && (
                  <button
                    type="button"
                    onClick={() => openEventOnMap(evt)}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-medium text-[#0D0F12] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Ubicar en Mapa GIS</span>
                  </button>
                )}

                {/* Event Adaptive Tabs */}
                <div
                  role="tablist"
                  aria-label="Secciones historiográficas"
                  className="grid grid-cols-4 gap-1 p-1 bg-[#0D0F12]/80 rounded-lg border border-[#C5A059]/25"
                >
                  {(
                    [
                      { id: 'relato', label: 'Relato' },
                      { id: 'impacto', label: 'Impacto' },
                      { id: 'caribe', label: 'Caribe' },
                      { id: 'documento', label: '📜 Fuente Primaria' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-1.5 px-2 text-xs font-medium rounded-md transition-colors duration-300 whitespace-nowrap truncate ${
                        activeTab === tab.id
                          ? 'bg-[#1D3557] text-[#F4F1EA] border border-[#C5A059]/35'
                          : 'text-[#A39E93] hover:text-[#F4F1EA]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {activeTab === 'relato' && (
                  <div className="space-y-3">
                    <p className="font-medium text-[#F4F1EA] leading-relaxed">{props.resumen}</p>
                    <OrnamentalDivider />
                    <p className="text-[#F4F1EA]/80 leading-relaxed">{props.detalle_historico}</p>
                  </div>
                )}

                {activeTab === 'impacto' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                      <Landmark className="w-4 h-4 shrink-0" />
                      <span>Impacto político e institucional</span>
                    </div>
                    <p className="text-[#F4F1EA]/85 leading-relaxed">{props.impacto_politico}</p>
                  </div>
                )}

                {activeTab === 'caribe' && (
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C5A059]">
                      <Globe2 className="w-4 h-4 shrink-0" />
                      <span>Contexto caribeño e internacional</span>
                    </div>
                    <p className="text-[#F4F1EA]/85 leading-relaxed">{props.contexto_caribeno}</p>
                  </div>
                )}

                {activeTab === 'documento' && (
                  <div className="space-y-4">
                    <div className="rounded-lg border border-[#C5A059]/30 bg-[#0D0F12]/70 p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                        <ScrollText className="w-4 h-4 shrink-0" />
                        <span>Cita del hecho ({props.anio})</span>
                      </div>
                      <blockquote className="font-display italic text-sm text-[#F4F1EA] leading-relaxed">
                        {props.documento_primario}
                      </blockquote>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex items-start gap-2">
                        <Users className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-[#F4F1EA]">Protagonistas: </span>
                          <span className="text-[#A39E93]">{props.personajes.join(' · ')}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <BookOpen className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-[#F4F1EA]">Fuente: </span>
                          <span className="text-[#A39E93]">{props.fuente_bibliografica}</span>
                        </div>
                      </div>
                    </div>

                    <OrnamentalDivider />

                    {/* Cápsula de Fuente Primaria de la Época con Preguntas Socráticas y Enlace Oficial AGN/MINERD */}
                    <PrimarySourceCapsuleContent
                      capsule={getPrimarySourceForYearOrEpoch(props.anio)}
                      onSyncMapYear={setMaxYear}
                      onOpenWorksheetModal={onOpenWorksheetModal}
                      compact
                    />
                  </div>
                )}
              </>
            );
          })()}

        {/* VIEW 1B: HISTORICAL MILESTONE (MODULO 3) */}
        {selectedFeature.kind === 'milestone' &&
          (() => {
            const m = selectedFeature.data;
            return (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <span className="px-2.5 py-1 rounded border border-[#C5A059]/35 bg-[#0D0F12]/80 text-[#D4AF37] font-medium">
                    {m.province}
                  </span>
                  <span className="font-mono text-xs text-[#C5A059] font-mono-tabular">
                    {m.lat.toFixed(4)}° N, {Math.abs(m.lng).toFixed(4)}° O
                  </span>
                </div>

                <p className="font-medium text-[#F4F1EA] leading-relaxed">{m.summary}</p>
                <OrnamentalDivider />
                <p className="text-[#F4F1EA]/85 leading-relaxed">{m.chronicle}</p>

                <div className="rounded-lg border border-[#C5A059]/25 bg-[#0D0F12]/70 p-3.5 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                    <Landmark className="w-4 h-4 shrink-0" />
                    <span>Trascendencia histórica</span>
                  </div>
                  <p className="text-xs text-[#F4F1EA]/85 leading-relaxed">{m.impact}</p>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#F4F1EA]">Protagonistas: </span>
                      <span className="text-[#A39E93]">{m.protagonists.join(' · ')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#F4F1EA]">Fuente: </span>
                      <span className="text-[#A39E93]">{m.source}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}

        {/* VIEW 1C: COLONIAL MONUMENT WITH WIKIPEDIA GROUNDING & HISTORICAL PHOTOS */}
        {selectedFeature.kind === 'colonial_monument' && (
          <ColonialMonumentPanel monument={selectedFeature.data} />
        )}

        {/* VIEW 2: PROVINCE PRESIDENTS GALLERY OR BIOGRAPHY */}
        {selectedFeature.kind === 'province_presidents' && (
          <div className="space-y-4">
            {focusedPresident ? (
              <div className="space-y-4">
                {selectedFeature.presidentes.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setFocusedPresident(null)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D4AF37] hover:underline"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Ver todos en {selectedFeature.provinceName}</span>
                  </button>
                )}

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0D0F12]/70 border border-[#C5A059]/30">
                  <PresidentPortrait
                    name={focusedPresident.nombre}
                    fotoUrl={
                      resolvePortraitUrl(focusedPresident.nombre, wikiPortraits) ||
                      focusedPresident.foto_url
                    }
                    size="xl"
                    shape="rounded"
                    isLoading={portraitsLoading}
                    accentColor="#C5A059"
                    onClick={() => openPresidentDetailModal(focusedPresident.nombre)}
                  />
                  <div className="min-w-0 space-y-1">
                    <div className="font-mono text-xs text-[#C5A059] font-mono-tabular">
                      {focusedPresident.nacimiento_muerte}
                    </div>
                    <div className="text-xs font-medium text-[#F4F1EA]">
                      {focusedPresident.municipio_nacimiento} ·{' '}
                      {focusedPresident.provincia_nacimiento}
                    </div>
                    <div className="text-xs text-[#A39E93] font-medium">
                      {focusedPresident.forma_acceso} · {focusedPresident.partido}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => openPresidentDetailModal(focusedPresident.nombre)}
                  className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-[#0D0F12] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ver biografía y balance histórico completo</span>
                </button>

                <div className="space-y-1">
                  <div className="text-xs font-semibold text-[#C5A059]">Etapa republicana</div>
                  <div className="text-sm font-medium text-[#F4F1EA]">
                    {focusedPresident.etapa_historica}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#C5A059]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Períodos de gobierno</span>
                  </div>
                  <ul className="space-y-1 font-mono-tabular text-xs text-[#F4F1EA]">
                    {focusedPresident.periodos_gobierno.map((per) => (
                      <li key={per}>· {per}</li>
                    ))}
                  </ul>
                </div>

                <OrnamentalDivider />

                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-[#C5A059]">Resumen de gestión</div>
                  <p className="text-[#F4F1EA]/85 leading-relaxed">
                    {focusedPresident.resumen_gestion}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                {selectedFeature.cabecera && (
                  <div className="text-xs text-[#A39E93]">
                    Cabecera: <strong className="text-[#F4F1EA]">{selectedFeature.cabecera}</strong>
                  </div>
                )}

                <div className="divide-y divide-[#C5A059]/20">
                  {selectedFeature.presidentes.map((pres) => (
                    <button
                      key={pres.id}
                      type="button"
                      onClick={() => setFocusedPresident(pres)}
                      className="w-full py-3 first:pt-0 last:pb-0 flex items-start gap-3 text-left hover:bg-[#C5A059]/10 rounded-lg px-2 -mx-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                    >
                      <PresidentPortrait
                        name={pres.nombre}
                        fotoUrl={resolvePortraitUrl(pres.nombre, wikiPortraits) || pres.foto_url}
                        size="md"
                        shape="circle"
                        isLoading={portraitsLoading}
                        accentColor="#C5A059"
                        onClick={() => openPresidentDetailModal(pres.nombre)}
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="font-display text-sm font-semibold text-[#F4F1EA]">
                            {pres.nombre}
                          </span>
                          <span className="font-mono-tabular text-[11px] text-[#A39E93] shrink-0">
                            {pres.nacimiento_muerte}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#A39E93]">
                          {pres.forma_acceso} · {pres.partido}
                        </div>
                        <div className="font-mono-tabular text-[11px] text-[#D4AF37]">
                          {pres.periodos_gobierno[0]}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: MANDATO FROM TIMELINE */}
        {selectedFeature.kind === 'mandato' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0D0F12]/70 border border-[#C5A059]/30">
              <PresidentPortrait
                name={selectedFeature.data.nombre}
                fotoUrl={
                  resolvePortraitUrl(selectedFeature.data.nombre, wikiPortraits) ||
                  (focusedPresident
                    ? resolvePortraitUrl(focusedPresident.nombre, wikiPortraits)
                    : undefined) ||
                  selectedFeature.data.foto_url
                }
                size="xl"
                shape="rounded"
                isLoading={portraitsLoading}
                accentColor="#C5A059"
                onClick={() =>
                  openPresidentDetailModal(
                    focusedPresident?.nombre || selectedFeature.data.nombre,
                  )
                }
              />
              <div className="min-w-0 space-y-1">
                <div className="font-mono text-xs text-[#D4AF37] font-mono-tabular font-medium">
                  {selectedFeature.data.fecha_inicio} → {selectedFeature.data.fecha_fin}
                </div>
                <div className="text-xs text-[#A39E93]">{selectedFeature.data.partido}</div>
                {focusedPresident && (
                  <div className="text-xs text-[#F4F1EA]">
                    Nacimiento: {focusedPresident.municipio_nacimiento} (
                    {focusedPresident.provincia_nacimiento})
                  </div>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                openPresidentDetailModal(
                  focusedPresident?.nombre || selectedFeature.data.nombre,
                )
              }
              className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 text-xs font-semibold text-[#0D0F12] bg-[#D4AF37] hover:bg-[#C5A059] rounded-lg transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ver biografía, aportes y controversias</span>
            </button>

            <p className="leading-relaxed text-[#F4F1EA]/90">{selectedFeature.data.resumen}</p>

            {focusedPresident && (
              <>
                <OrnamentalDivider />
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#C5A059]">
                    Trayectoria biográfica y períodos
                  </div>
                  <p className="text-xs text-[#F4F1EA]/80 leading-relaxed">
                    {focusedPresident.resumen_gestion}
                  </p>
                  <div className="font-mono-tabular text-xs text-[#D4AF37]">
                    {focusedPresident.periodos_gobierno.join(' · ')}
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* VIEW 4: DOSSIER TRUJILLO / BALAGUER */}
        {selectedFeature.kind === 'dossier_hito' &&
          (() => {
            const hito = selectedFeature.data;
            const [lng, lat] = hito.coordenadas;
            return (
              <>
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#A39E93]">
                  <span>
                    <span className="text-[#F4F1EA] font-medium">{hito.subperiodo}</span> ·{' '}
                    {hito.provincia}
                  </span>
                  <span className="font-mono text-xs text-[#C5A059]">
                    {lat.toFixed(4)}° N, {Math.abs(lng).toFixed(4)}° O
                  </span>
                </div>

                <p className="font-medium text-[#F4F1EA] leading-relaxed">{hito.resumen}</p>
                <p className="text-[#F4F1EA]/80 leading-relaxed">{hito.detalle_historico}</p>

                <OrnamentalDivider />

                <div className="space-y-1.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>Impacto político e institucional</span>
                  </div>
                  <p className="text-xs text-[#F4F1EA]/80 leading-relaxed">
                    {hito.impacto_politico}
                  </p>
                </div>

                <OrnamentalDivider />

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#F4F1EA]">Protagonistas: </span>
                      <span className="text-[#A39E93]">{hito.protagonistas.join(' · ')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#F4F1EA]">Fuente: </span>
                      <span className="text-[#A39E93]">{hito.fuente_bibliografica}</span>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}

        {/* VIEW 5: ROUTE WITH INTERACTIVE WAYPOINTS */}
        {selectedFeature.kind === 'route' &&
          (() => {
            const props = selectedFeature.data.properties;
            return (
              <>
                <div className="flex items-center gap-2 text-xs text-[#A39E93]">
                  <Route className="w-4 h-4 text-[#D4AF37] shrink-0" />
                  <span>
                    {props.tipo_ruta_etiqueta} ·{' '}
                    <strong className="text-[#F4F1EA]">{props.epoca}</strong> ·{' '}
                    {props.hitos.length} hitos
                  </span>
                </div>

                <p className="text-[#F4F1EA]/90 leading-relaxed">{props.descripcion}</p>

                {props.hitos.length > 0 && (
                  <>
                    <OrnamentalDivider />
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-[#D4AF37]">
                          Itinerario e hitos intermedios
                        </span>
                        <span className="text-[11px] text-[#A39E93]">Clic para enfocar</span>
                      </div>

                      <ol className="space-y-2">
                        {props.hitos.map((hito) => (
                          <li key={hito.orden}>
                            <button
                              type="button"
                              onClick={() => {
                                if (viewMode !== 'map') setViewMode('map');
                                flyToCoords(hito.coordenadas, 11.5);
                              }}
                              className="w-full text-left p-2.5 rounded-lg border border-[#C5A059]/25 bg-[#0D0F12]/65 hover:border-[#D4AF37] hover:bg-[#C5A059]/10 transition-colors flex items-start gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
                            >
                              <span
                                className="w-5 h-5 rounded-full text-[11px] font-mono-tabular font-bold flex items-center justify-center shrink-0 mt-0.5 border border-[#D4AF37] text-[#D4AF37] bg-[#161920]"
                              >
                                {hito.orden}
                              </span>
                              <div className="min-w-0 flex-1">
                                <div className="font-mono text-[11px] text-[#C5A059]">
                                  {hito.fecha}
                                </div>
                                <div className="text-xs font-semibold text-[#F4F1EA] mt-0.5">
                                  {hito.nombre}
                                </div>
                                <p className="text-[11px] text-[#A39E93] mt-1 leading-relaxed">
                                  {hito.descripcion}
                                </p>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </>
                )}

                <OrnamentalDivider />

                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <Users className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#F4F1EA]">Protagonistas: </span>
                      <span className="text-[#A39E93]">{props.protagonistas.join(' · ')}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <BookOpen className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#F4F1EA]">Fuente: </span>
                      <span className="text-[#A39E93]">{props.fuente_bibliografica}</span>
                    </div>
                  </div>
                </div>
              </>
            );
          })()}

        {/* VIEW 6: PROVINCE / TERRITORIAL */}
        {selectedFeature.kind === 'province' && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#C5A059]">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>Código ONE {selectedFeature.data.properties.codigo}</span>
            </div>
            <p className="leading-relaxed text-[#F4F1EA]/90">
              Provincia perteneciente a la macrorregión{' '}
              <strong className="text-[#D4AF37]">{selectedFeature.data.properties.region}</strong>,
              con municipio cabecera en{' '}
              <strong className="text-[#F4F1EA]">{selectedFeature.data.properties.cabecera}</strong>.
            </p>
          </div>
        )}

        {selectedFeature.kind === 'territorial' && (
          <div className="space-y-3">
            <div className="font-mono text-xs text-[#C5A059]">
              Vigencia histórica: {selectedFeature.data.properties.anio_inicio}–
              {selectedFeature.data.properties.anio_fin}
            </div>
            {selectedFeature.data.properties.cabecera && (
              <div className="text-xs text-[#A39E93]">
                Sede / Centro:{' '}
                <strong className="text-[#F4F1EA]">
                  {selectedFeature.data.properties.cabecera}
                </strong>
              </div>
            )}
            {selectedFeature.data.properties.liderazgo && (
              <div className="text-xs text-[#A39E93]">
                Liderazgo / Eje:{' '}
                <strong className="text-[#D4AF37]">
                  {selectedFeature.data.properties.liderazgo}
                </strong>
              </div>
            )}
            <OrnamentalDivider />
            <p className="leading-relaxed text-[#F4F1EA]/90">
              {selectedFeature.data.properties.descripcion_territorial}
            </p>
            {selectedFeature.data.properties.provincias_actuales && (
              <div className="pt-2 space-y-1.5">
                <div className="text-[11px] uppercase tracking-[0.14em] text-[#C5A059] font-semibold">
                  Provincias actuales incluidas (Fusión Turf.js)
                </div>
                <p className="text-xs text-[#A39E93] leading-relaxed">
                  {selectedFeature.data.properties.provincias_actuales.join(' · ')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* MÓDULO B: Pestaña / Sección de Fuente Primaria en Modo Docente para cualquier elemento */}
        {selectedFeature.kind !== 'event' && (isTeacherMode || showTeacherSourceInDrawer) && (
          <div className="pt-3 border-t border-[#C5A059]/30 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
                <ScrollText className="w-4 h-4 shrink-0" />
                <span>📜 Fuente Primaria de la Época</span>
              </span>
              {!isTeacherMode && (
                <button
                  type="button"
                  onClick={() => setShowTeacherSourceInDrawer(false)}
                  className="text-[11px] text-[#A39E93] hover:text-[#F4F1EA]"
                >
                  Ocultar
                </button>
              )}
            </div>
            <PrimarySourceCapsuleContent
              capsule={getPrimarySourceForYearOrEpoch(
                selectedFeature.kind === 'milestone'
                  ? selectedFeature.data.year
                  : selectedFeature.kind === 'territorial'
                    ? selectedFeature.data.properties.anio_inicio
                    : selectedFeature.kind === 'colonial_monument'
                      ? selectedFeature.data.yearBuilt
                      : maxYear,
              )}
              onSyncMapYear={setMaxYear}
              onOpenWorksheetModal={onOpenWorksheetModal}
              compact
            />
          </div>
        )}

        {selectedFeature.kind !== 'event' && !isTeacherMode && !showTeacherSourceInDrawer && (
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowTeacherSourceInDrawer(true)}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-[#C5A059]/35 bg-[#0D0F12]/70 hover:border-[#D4AF37] text-xs font-semibold text-[#D4AF37] transition-colors"
            >
              <ScrollText className="w-3.5 h-3.5 shrink-0" />
              <span>📜 Ver Fuente Primaria y Preguntas de Aula</span>
            </button>
          </div>
        )}
      </div>

      {/* Tour Cronológico Controls Footer */}
      {tourActive && (
        <div className="px-5 py-3 border-t border-[#C5A059]/25 bg-[#0D0F12]/90 flex items-center justify-between gap-2">
          <div className="font-mono text-xs font-semibold text-[#D4AF37]">
            Tour {tourIndex + 1} / {tourList.length}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={prevTourStep}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-[#161920] border border-[#C5A059]/30 rounded-md text-[#F4F1EA] hover:border-[#D4AF37] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Anterior</span>
            </button>
            <button
              type="button"
              onClick={nextTourStep}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-[#1D3557] text-[#F4F1EA] border border-[#C5A059]/35 rounded-md hover:bg-[#264673] transition-colors"
            >
              <span>Siguiente</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={stopTour}
              aria-label="Salir del tour"
              className="px-2.5 py-1.5 text-xs font-medium text-[#C5A059] hover:text-[#F4F1EA] hover:bg-[#9B2226]/30 rounded-md transition-colors"
            >
              Salir
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
