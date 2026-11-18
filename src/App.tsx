import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { AlertTriangle, Layers, X } from 'lucide-react';
import { CronoMapaProvider, useCronoMapa } from './context/CronoMapaContext';
import HistoricalTimelineView from './components/timeline/HistoricalTimelineView';
import BeforeAfterCompare from './components/map/BeforeAfterCompare';
import TimelineTransitionOverlay from './components/map/TimelineTransitionOverlay';
import Header, { type QuickExploreTopic } from './components/ui/Header';
import CronoGuideModal from './components/ui/CronoGuideModal';
import HistoricalDrawer from './components/ui/HistoricalDrawer';
import HistoricalMapsGallery from './components/ui/HistoricalMapsGallery';
import PresidentDetailModal from './components/ui/PresidentDetailModal';
import MapStatusHUD from './components/ui/MapStatusHUD';
import RoutePlayerWidget from './components/ui/RoutePlayerWidget';
import SidebarGIS from './components/ui/SidebarGIS';
import TimelineBottomBar from './components/ui/TimelineBottomBar';
import TeacherToolbar, { type WhiteboardToolMode } from './components/ui/TeacherToolbar.jsx';
import PrimarySourceDrawer from './components/ui/PrimarySourceDrawer.jsx';
import { getEpochForYear } from './data/historicalLayersData';
import type { HistoricalRoute, PresidenteRD } from './types/history';

const DynamicMapView = lazy(() => import('./components/map/MapView'));
const LazyWhiteboardCanvasOverlay = lazy(
  () => import('./components/map/WhiteboardCanvasOverlay.jsx'),
);
const LazyMinerdWorksheetGenerator = lazy(
  () => import('./components/ui/MinerdWorksheetGenerator.jsx'),
);
const LazyClassroomTriviaModal = lazy(
  () => import('./components/ui/ClassroomTriviaModal.jsx'),
);

const GOOGLE_MAPS_API_KEY = (
  (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) ?? ''
).trim();
const HAS_MAPS_API_KEY = GOOGLE_MAPS_API_KEY.length > 0;

function CronoMapaShell() {
  const {
    viewMode,
    setViewMode,
    searchQuery,
    setSearchQuery,
    tourActive,
    startTour,
    stopTour,
    resetView,
    sidebarOpen,
    setSidebarOpen,
    setLayerVisible,
    setRegimeFilter,
    maxYear,
    setMaxYear,
    allRoutes,
    allEventsSorted,
    allPresidents,
    selectedFeature,
    setSelectedFeature,
    openEventOnMap,
    flyToCoords,
    // Module 3, 4, 5
    allMilestones,
    showMilestones,
    toggleMilestones,
    jumpToMilestone,
    allColonialMonuments,
    jumpToColonialMonument,
    animatedRoutes,
    activeAnimatedRoute,
    isRoutePlaying,
    routeProgress,
    routeStopIndex,
    startAnimatedRoute,
    toggleRoutePlay,
    restartAnimatedRoute,
    closeAnimatedRoute,
    jumpToRouteStop,
    vintageGalleryOpen,
    setVintageGalleryOpen,
    activeVintageMap,
    vintageOpacity,
    setVintageOpacity,
    activateVintageOverlay,
    clearVintageOverlay,
    detailModalPresidentKey,
    openPresidentDetailModal,
    closePresidentDetailModal,
  } = useCronoMapa();

  const [compareMode, setCompareMode] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [guideResetKey, setGuideResetKey] = useState(0);

  // Suite Pedagógica "Modo Aula / Docente" (Divulgación Progresiva)
  const [isTeacherMode, setIsTeacherMode] = useState(false);
  const [isPdiMode, setIsPdiMode] = useState(false);
  const [whiteboardTool, setWhiteboardTool] = useState<WhiteboardToolMode>('navigate');
  const [strokeColor, setStrokeColor] = useState('#E63946');
  const [clearNonce, setClearNonce] = useState(0);
  const [undoNonce, setUndoNonce] = useState(0);
  const [strokeCount, setStrokeCount] = useState(0);
  const [primarySourceOpen, setPrimarySourceOpen] = useState(false);
  const [worksheetModalOpen, setWorksheetModalOpen] = useState(false);
  const [worksheetEpochKey, setWorksheetEpochKey] = useState<string | null>(null);
  const [triviaModalOpen, setTriviaModalOpen] = useState(false);

  const activeEpoch = getEpochForYear(maxYear);

  const { activeFeatureTitle, activeProvinceName } = useMemo(() => {
    if (!selectedFeature) return { activeFeatureTitle: null, activeProvinceName: null };
    switch (selectedFeature.kind) {
      case 'province':
        return {
          activeFeatureTitle: selectedFeature.data.properties.nombre,
          activeProvinceName: selectedFeature.data.properties.nombre,
        };
      case 'province_presidents':
        return {
          activeFeatureTitle: `Presidentes de ${selectedFeature.provinceName}`,
          activeProvinceName: selectedFeature.provinceName,
        };
      case 'event':
        return {
          activeFeatureTitle: selectedFeature.data.properties.titulo,
          activeProvinceName: selectedFeature.data.properties.provincia,
        };
      case 'milestone':
        return {
          activeFeatureTitle: selectedFeature.data.title,
          activeProvinceName: selectedFeature.data.province,
        };
      case 'territorial':
        return {
          activeFeatureTitle: selectedFeature.data.properties.nombre_capa,
          activeProvinceName: null,
        };
      case 'colonial_monument':
        return {
          activeFeatureTitle: selectedFeature.data.name,
          activeProvinceName: selectedFeature.data.province,
        };
      default:
        return { activeFeatureTitle: null, activeProvinceName: null };
    }
  }, [selectedFeature]);

  useEffect(() => {
    let alreadyViewed = false;
    try {
      alreadyViewed = window.localStorage.getItem('cronomapa_guia_vista') === 'true';
    } catch {
      alreadyViewed = false;
    }

    if (alreadyViewed) return;

    const timer = window.setTimeout(() => {
      setGuideResetKey((prev) => prev + 1);
      setGuideOpen(true);
      try {
        window.localStorage.setItem('cronomapa_guia_vista', 'true');
      } catch {
        // Ignore storage write errors inside restricted iframes
      }
    }, 900);

    return () => window.clearTimeout(timer);
  }, []);

  const handleToggleTeacherMode = useCallback(() => {
    setIsTeacherMode((prev) => {
      const next = !prev;
      if (next) {
        setViewMode('map');
      } else {
        setIsPdiMode(false);
        setWhiteboardTool('navigate');
        setPrimarySourceOpen(false);
      }
      return next;
    });
  }, [setViewMode]);

  const handleTogglePdiMode = useCallback(() => {
    setIsPdiMode((prev) => {
      const next = !prev;
      if (next) {
        // Oculta controles laterales secundarios para lectura limpia desde el fondo del aula
        setSidebarOpen(false);
      }
      return next;
    });
  }, [setSidebarOpen]);

  const handleOpenWorksheetModal = useCallback((epochKeyOverride?: string) => {
    setWorksheetEpochKey(typeof epochKeyOverride === 'string' ? epochKeyOverride : null);
    setWorksheetModalOpen(true);
  }, []);

  const handleOpenGuide = useCallback(() => {
    setCompareMode(false);
    setGuideResetKey((prev) => prev + 1);
    setGuideOpen(true);
  }, []);

  const handleCloseGuide = useCallback(() => {
    setGuideOpen(false);
    try {
      window.localStorage.setItem('cronomapa_guia_vista', 'true');
    } catch {
      // Ignore storage write errors inside restricted iframes
    }
  }, []);

  const handleSetViewMode = useCallback(
    (mode: 'map' | 'timeline') => {
      setCompareMode(false);
      setViewMode(mode);
    },
    [setViewMode],
  );

  const handleSelectQuickExplore = useCallback(
    (topic: QuickExploreTopic) => {
      setCompareMode(false);
      setViewMode('map');
      if (topic === 'presidentes_provincia') {
        setRegimeFilter('all');
        setMaxYear(2026);
        setLayerVisible('provincias_actuales', true);
        setLayerVisible('presidentes_provincia', true);
        resetView();
      } else if (topic === 'trujillo') {
        setRegimeFilter('trujillo');
        setSidebarOpen(true);
      } else if (topic === 'balaguer') {
        setRegimeFilter('balaguer');
        setSidebarOpen(true);
      } else if (topic === 'cacicazgos_1492') {
        setRegimeFilter('all');
        setLayerVisible('cacicazgos_1492', true);
        setMaxYear(1504);
        resetView();
      }
    },
    [setViewMode, setRegimeFilter, setMaxYear, setLayerVisible, resetView, setSidebarOpen],
  );

  const handleSelectRouteFromHeader = useCallback(
    (route: HistoricalRoute) => {
      setCompareMode(false);
      setViewMode('map');
      closeAnimatedRoute();
      setLayerVisible('rutas_historicas', true);
      setMaxYear(2026);
      setSelectedFeature({ kind: 'route', data: route });
      const midIndex = Math.floor(route.geometry.coordinates.length / 2);
      const focusCoord = route.geometry.coordinates[midIndex];
      if (focusCoord) {
        flyToCoords(focusCoord, 9);
      }
    },
    [setViewMode, closeAnimatedRoute, setLayerVisible, setMaxYear, setSelectedFeature, flyToCoords],
  );

  const handleSelectPresidentFromSearch = useCallback(
    (pres: PresidenteRD) => {
      setCompareMode(false);
      setViewMode('map');
      setLayerVisible('presidentes_provincia', true);
      const sameProvince = allPresidents.filter(
        (p) => p.provincia_nacimiento === pres.provincia_nacimiento,
      );
      setSelectedFeature({
        kind: 'province_presidents',
        provinceName: pres.provincia_nacimiento,
        presidentes: sameProvince.length > 0 ? sameProvince : [pres],
        focusedPresidentId: pres.id,
      });
      if (pres.provincia_nacimiento !== 'Nacidos en el Exterior') {
        flyToCoords(pres.coordenadas, 10);
      }
    },
    [setViewMode, setLayerVisible, allPresidents, setSelectedFeature, flyToCoords],
  );

  const handleSelectEventFromSearch = useCallback(
    (evt: (typeof allEventsSorted)[number]) => {
      setCompareMode(false);
      openEventOnMap(evt);
    },
    [openEventOnMap],
  );

  const handleToggleCompare = useCallback(() => {
    setViewMode('map');
    setCompareMode((prev) => !prev);
  }, [setViewMode]);

  return (
    <div
      className={`h-screen w-screen flex flex-col overflow-hidden bg-[#0D0F12] text-[#F4F1EA] ${
        isPdiMode ? 'pdi-projection-mode' : ''
      }`}
    >
      <Header
        viewMode={viewMode}
        setViewMode={handleSetViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tourActive={tourActive}
        onStartTour={() => {
          setCompareMode(false);
          startTour();
        }}
        onStopTour={stopTour}
        onSelectQuickExplore={handleSelectQuickExplore}
        onResetMap={() => {
          setCompareMode(false);
          resetView();
        }}
        compareMode={compareMode}
        onToggleCompare={handleToggleCompare}
        onOpenMapsPanel={() => {
          setCompareMode(false);
          setSidebarOpen(true);
        }}
        onActivateRoutesLayer={() => {
          setCompareMode(false);
          setLayerVisible('rutas_historicas', true);
          setMaxYear(2026);
        }}
        showMilestones={showMilestones}
        onToggleMilestones={toggleMilestones}
        milestones={allMilestones}
        onJumpToMilestone={(m) => {
          setCompareMode(false);
          jumpToMilestone(m);
        }}
        animatedRoutes={animatedRoutes}
        activeAnimatedRouteId={activeAnimatedRoute?.id ?? null}
        onStartAnimatedRoute={(ar) => {
          setCompareMode(false);
          startAnimatedRoute(ar);
        }}
        onOpenVintageGallery={() => setVintageGalleryOpen(true)}
        hasActiveVintageOverlay={Boolean(activeVintageMap)}
        onOpenGuide={handleOpenGuide}
        isTeacherMode={isTeacherMode}
        onToggleTeacherMode={handleToggleTeacherMode}
        colonialMonuments={allColonialMonuments}
        onJumpToMonument={(mon) => {
          setCompareMode(false);
          jumpToColonialMonument(mon);
        }}
        routes={allRoutes}
        events={allEventsSorted}
        presidents={allPresidents}
        onSelectRoute={handleSelectRouteFromHeader}
        onSelectEvent={handleSelectEventFromSearch}
        onSelectPresident={handleSelectPresidentFromSearch}
      />

      <main className="relative flex-1 min-h-0 overflow-hidden bg-[#0D0F12]">
        {viewMode === 'map' ? (
          <>
            <div
              className={`h-full w-full transition-all duration-700 ease-in-out ${activeEpoch.filterClass}`}
            >
              {HAS_MAPS_API_KEY ? (
                <Suspense
                  fallback={
                    <div className="h-full w-full flex items-center justify-center bg-[#0D0F12] text-[#D4AF37] font-display text-lg">
                      Cargando lienzo cartográfico de La Española...
                    </div>
                  }
                >
                  <DynamicMapView />
                </Suspense>
              ) : (
                <div className="h-full w-full flex items-center justify-center p-6 bg-[#0D0F12]">
                  <div className="max-w-md rounded-xl border border-[#C5A059]/40 bg-[#161920]/95 p-6 text-center shadow-2xl space-y-2">
                    <h2 className="font-display text-lg font-semibold text-[#D4AF37]">
                      Clave de Google Maps Platform no configurada
                    </h2>
                    <p className="text-xs text-[#A39E93] leading-relaxed">
                      Configura{' '}
                      <code className="text-[#F4F1EA]">VITE_GOOGLE_MAPS_API_KEY</code> para
                      visualizar el lienzo cartográfico interactivo. Mientras tanto, puedes usar la
                      Línea de Tiempo Histórica y Comparar Antes vs. Hoy.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* MÓDULO A: Lienzo de Anotación Táctil (HTML5 Canvas) cargado bajo demanda con React.lazy */}
            {isTeacherMode && (
              <Suspense fallback={null}>
                <LazyWhiteboardCanvasOverlay
                  tool={whiteboardTool}
                  strokeColor={strokeColor}
                  clearNonce={clearNonce}
                  undoNonce={undoNonce}
                  onStrokesChange={setStrokeCount}
                  onSelectTool={setWhiteboardTool}
                  onSelectColor={setStrokeColor}
                  onRequestClear={() => setClearNonce((n) => n + 1)}
                  onRequestUndo={() => setUndoNonce((n) => n + 1)}
                />
              </Suspense>
            )}

            <TimelineTransitionOverlay year={maxYear} />

            {/* Oculta paneles secundarios en Modo Proyección PDI para priorizar lectura a distancia */}
            {!isPdiMode && <SidebarGIS />}
            {!isPdiMode && <MapStatusHUD />}

            {/* Barra Flotante de Herramientas de Aula (Modo Docente) */}
            {isTeacherMode && (
              <TeacherToolbar
                sidebarOpen={sidebarOpen}
                isPdiMode={isPdiMode}
                onTogglePdiMode={handleTogglePdiMode}
                whiteboardTool={whiteboardTool}
                onChangeWhiteboardTool={setWhiteboardTool}
                strokeColor={strokeColor}
                onChangeStrokeColor={setStrokeColor}
                onClearWhiteboard={() => setClearNonce((n) => n + 1)}
                onUndoWhiteboard={() => setUndoNonce((n) => n + 1)}
                hasStrokes={strokeCount > 0}
                primarySourceOpen={primarySourceOpen}
                onTogglePrimarySource={() => setPrimarySourceOpen((prev) => !prev)}
                onOpenWorksheetModal={() => handleOpenWorksheetModal()}
                onOpenTriviaModal={() => setTriviaModalOpen(true)}
                activeEpochLabel={`${activeEpoch.label} (${maxYear})`}
              />
            )}

            {/* Módulo 5: Floating Opacity Control for Active Vintage GroundOverlay */}
            {activeVintageMap && (
              <div className="absolute top-16 right-4 z-[910] w-72 bg-[#161920]/95 backdrop-blur-xl border border-[#C5A059]/45 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.75)] p-3.5 space-y-2.5">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] text-[#C5A059] font-semibold">
                      <Layers className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Calco Histórico · {activeVintageMap.yearLabel}</span>
                    </div>
                    <div className="font-display text-xs font-semibold text-[#F4F1EA] truncate mt-0.5">
                      {activeVintageMap.title}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={clearVintageOverlay}
                    aria-label="Quitar calco histórico"
                    className="p-1 rounded-md text-[#A39E93] hover:text-[#F4F1EA] hover:bg-[#9B2226]/30 transition-colors shrink-0"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex items-center gap-2.5">
                  <label
                    htmlFor="vintage-overlay-opacity"
                    className="text-[11px] text-[#A39E93] whitespace-nowrap"
                  >
                    Opacidad
                  </label>
                  <input
                    id="vintage-overlay-opacity"
                    type="range"
                    min={0}
                    max={100}
                    step={2}
                    value={Math.round(vintageOpacity * 100)}
                    onChange={(e) => setVintageOpacity(Number(e.target.value) / 100)}
                    className="gis-slider flex-1"
                  />
                  <span className="font-mono-tabular text-[11px] font-semibold text-[#D4AF37] w-9 text-right">
                    {Math.round(vintageOpacity * 100)}%
                  </span>
                </div>

                <button
                  type="button"
                  onClick={clearVintageOverlay}
                  className="w-full py-1.5 text-xs font-medium rounded-lg border border-[#C5A059]/35 bg-[#9B2226]/80 hover:bg-[#9B2226] text-[#F4F1EA] transition-colors"
                >
                  Quitar Calco Histórico
                </button>
              </div>
            )}

            {/* Módulo 4: Floating Animated Route Player */}
            {activeAnimatedRoute && (
              <RoutePlayerWidget
                route={activeAnimatedRoute}
                isPlaying={isRoutePlaying}
                progress={routeProgress}
                stopIndex={routeStopIndex}
                onTogglePlay={toggleRoutePlay}
                onRestart={restartAnimatedRoute}
                onClose={closeAnimatedRoute}
                onJumpToStop={jumpToRouteStop}
              />
            )}

            <TimelineBottomBar />
          </>
        ) : (
          <HistoricalTimelineView />
        )}

        {compareMode && <BeforeAfterCompare onClose={() => setCompareMode(false)} />}

        <HistoricalDrawer
          isTeacherMode={isTeacherMode}
          onOpenWorksheetModal={handleOpenWorksheetModal}
        />

        {/* MÓDULO B: Panel de Cápsulas de Fuentes Primarias */}
        {isTeacherMode && (
          <PrimarySourceDrawer
            isOpen={primarySourceOpen}
            onClose={() => setPrimarySourceOpen(false)}
            currentYear={maxYear}
            onSelectYear={(y) => setMaxYear(y)}
            onOpenWorksheetModal={(epochKey) => handleOpenWorksheetModal(epochKey)}
          />
        )}

        {/* MÓDULO C: Generador de Guías Didácticas en PDF (MINERD) cargado bajo demanda con React.lazy */}
        {(isTeacherMode || worksheetModalOpen) && worksheetModalOpen && (
          <Suspense fallback={null}>
            <LazyMinerdWorksheetGenerator
              isOpen={worksheetModalOpen}
              onClose={() => setWorksheetModalOpen(false)}
              currentYear={maxYear}
              initialEpochKey={worksheetEpochKey}
              activeFeatureTitle={activeFeatureTitle}
              activeProvinceName={activeProvinceName}
            />
          </Suspense>
        )}

        {/* MÓDULO D: Desafío Rápido en Clase (Trivia PDI 5 min) cargado bajo demanda con React.lazy */}
        {(isTeacherMode || triviaModalOpen) && triviaModalOpen && (
          <Suspense fallback={null}>
            <LazyClassroomTriviaModal
              isOpen={triviaModalOpen}
              onClose={() => setTriviaModalOpen(false)}
              currentYear={maxYear}
              onFocusMapLocation={(loc) => {
                setCompareMode(false);
                setViewMode('map');
                flyToCoords([loc.lng, loc.lat], loc.zoom);
              }}
            />
          </Suspense>
        )}

        <HistoricalMapsGallery
          isOpen={vintageGalleryOpen}
          onClose={() => setVintageGalleryOpen(false)}
          activeOverlayId={activeVintageMap?.id ?? null}
          onOverlayOnMap={activateVintageOverlay}
          onClearOverlay={clearVintageOverlay}
        />

        <CronoGuideModal
          isOpen={guideOpen}
          resetKey={guideResetKey}
          onClose={handleCloseGuide}
        />

        <PresidentDetailModal
          isOpen={Boolean(detailModalPresidentKey)}
          presidentKey={detailModalPresidentKey}
          onClose={closePresidentDetailModal}
          onSelectPresident={openPresidentDetailModal}
        />
      </main>
    </div>
  );
}

export default function App() {
  const [quotaError, setQuotaError] = useState(false);

  useEffect(() => {
    const onQuota = () => setQuotaError(true);
    window.addEventListener('gmp-quota-exceeded', onQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', onQuota);
  }, []);

  const shellContent = (
    <div className="relative h-screen w-screen flex flex-col overflow-hidden bg-[#0D0F12]">
      {quotaError && (
        <div
          role="alert"
          className="sticky top-0 z-[1200] bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm flex items-center justify-between gap-3 shadow-sm shrink-0"
        >
          <div className="flex items-center gap-2 min-w-0 mx-auto">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
            <span className="truncate">
              Google Maps Platform quota reached. If you are the app owner, visit{' '}
              <a
                href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-semibold text-amber-950 hover:text-amber-800"
              >
                maps developer site
              </a>{' '}
              for instructions to update your account.
            </span>
          </div>
          <button
            type="button"
            onClick={() => setQuotaError(false)}
            aria-label="Ocultar aviso"
            className="p-1 hover:bg-amber-200/60 rounded text-amber-900 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      <div className="flex-1 min-h-0">
        <CronoMapaProvider>
          <CronoMapaShell />
        </CronoMapaProvider>
      </div>
    </div>
  );

  if (!HAS_MAPS_API_KEY) {
    return shellContent;
  }

  return (
    <APIProvider
      apiKey={GOOGLE_MAPS_API_KEY}
      libraries={['marker', 'maps']}
      language="es"
      region="DO"
    >
      {shellContent}
    </APIProvider>
  );
}
