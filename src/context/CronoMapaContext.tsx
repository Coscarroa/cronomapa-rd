import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { FlyToTarget } from '../components/map/MapView';
import { CACICAZGOS_1492_CONFIG } from '../data/cacicazgosConfig';
import { PROVINCIAS_1844_CONFIG } from '../data/provincias1844Config';
import { HISTORICAL_MILESTONES } from '../data/historicalEventsData';
import { ANIMATED_HISTORICAL_ROUTES } from '../data/historicalRoutesData';
import { COLONIAL_MONUMENTS } from '../data/colonialMonumentsData';
import {
  BASE_MAPS,
  EVENT_ASSET_MAP,
  INITIAL_LAYERS,
  MAP_INITIAL_CENTER,
  MAP_INITIAL_ZOOM,
} from '../data/layersConfig';
import eventosData from '../data/eventos_rd.json';
import rutasData from '../data/rutas_rd.json';
import presidentesData from '../data/presidentes_rd.json';
import dossiersData from '../data/dossiers_regimenes.json';
import mandatosData from '../data/mandatos_rd.json';
import {
  buildMacroTerritoryGeoJSON,
  fetchRealProvinceGeoJSON,
  getBundledRealProvinces,
} from '../utils/geoUtils';
import {
  fetchAllPresidentPortraits,
  getCachedPortraits,
  resolvePortraitUrl,
} from '../services/wikipediaPortraitsService';
import type {
  AnimatedHistoricalRoute,
  BaseMapConfig,
  BaseMapId,
  ColonialMonument,
  DossierHito,
  DossiersRegimenesData,
  EventCategory,
  ExplorePeriodId,
  HistoricalEvent,
  HistoricalEventCollection,
  HistoricalLayer,
  HistoricalMilestone,
  HistoricalRoute,
  HistoricalRouteCollection,
  LayerId,
  MandatoRD,
  MandatosCollection,
  MilestoneCategory,
  PresidenteRD,
  PresidentesCollection,
  ProvinceCollection,
  RegimeFilter,
  SelectedFeature,
  TerritorialPolygonCollection,
  ViewMode,
  VintageMapItem,
} from '../types/history';
import type { HistoricalEncyclopediaPeriod } from '../data/historicalEncyclopediaData';

export const ALL_CATEGORIES: EventCategory[] = [
  'Política/Constitucional',
  'Batalla/Militar',
  'Fundación/Territorio',
  'Derechos/Sociedad',
];

const EVENT_CAT_TO_MILESTONE_CAT: Record<EventCategory, MilestoneCategory> = {
  'Política/Constitucional': 'Política',
  'Batalla/Militar': 'Batalla',
  'Fundación/Territorio': 'Fundación',
  'Derechos/Sociedad': 'Derechos',
};

interface CronoMapaContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  activeBaseMapId: BaseMapId;
  setActiveBaseMapId: (id: BaseMapId) => void;
  activeBaseMap: BaseMapConfig;
  reliefIntensity: number;
  setReliefIntensity: (val: number) => void;
  layers: HistoricalLayer[];
  toggleLayer: (id: LayerId) => void;
  setLayerVisible: (id: LayerId, visible: boolean) => void;
  changeLayerOpacity: (id: LayerId, opacity: number) => void;
  focusLayer: (layer: HistoricalLayer) => void;
  maxYear: number;
  setMaxYear: (year: number) => void;
  syncTerritoryWithYear: boolean;
  setSyncTerritoryWithYear: (sync: boolean) => void;
  selectedCategories: EventCategory[];
  toggleCategory: (cat: EventCategory) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  regimeFilter: RegimeFilter;
  setRegimeFilter: (filter: RegimeFilter) => void;
  activePeriodFilter: ExplorePeriodId | null;
  setActivePeriodFilter: (periodId: ExplorePeriodId | null) => void;
  explorePeriodOnMap: (period: HistoricalEncyclopediaPeriod) => void;
  selectedFeature: SelectedFeature | null;
  setSelectedFeature: (feature: SelectedFeature | null) => void;
  cursorCoords: { lat: number; lng: number };
  setCursorCoords: (coords: { lat: number; lng: number }) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  zoomIn: () => void;
  zoomOut: () => void;
  flyToTarget: FlyToTarget | null;
  resetView: () => void;
  flyToCoords: (coords: [number, number], zoom?: number) => void;
  // Real GeoJSON + Turf.js fused territories
  realProvinces: ProvinceCollection;
  cacicazgos1492: TerritorialPolygonCollection;
  provincias1844: TerritorialPolygonCollection;
  // Milestones (Module 3)
  allMilestones: HistoricalMilestone[];
  filteredMilestones: HistoricalMilestone[];
  showMilestones: boolean;
  setShowMilestones: (show: boolean) => void;
  toggleMilestones: () => void;
  jumpToMilestone: (milestone: HistoricalMilestone) => void;
  // Colonial Monuments & Wikipedia Grounding
  allColonialMonuments: ColonialMonument[];
  filteredColonialMonuments: ColonialMonument[];
  jumpToColonialMonument: (monument: ColonialMonument) => void;
  // Animated Routes Player (Module 4)
  animatedRoutes: AnimatedHistoricalRoute[];
  activeAnimatedRoute: AnimatedHistoricalRoute | null;
  isRoutePlaying: boolean;
  setIsRoutePlaying: (playing: boolean) => void;
  routeProgress: number; // 0..1
  routeStopIndex: number;
  routeResetNonce: number;
  startAnimatedRoute: (route: AnimatedHistoricalRoute, autoPlay?: boolean) => void;
  toggleRoutePlay: () => void;
  restartAnimatedRoute: () => void;
  closeAnimatedRoute: () => void;
  setRouteProgress: (p: number) => void;
  setRouteStopIndex: (idx: number) => void;
  jumpToRouteStop: (stopIndex: number) => void;
  // Vintage Maps Gallery & GroundOverlay (Module 5)
  vintageGalleryOpen: boolean;
  setVintageGalleryOpen: (open: boolean) => void;
  activeVintageMap: VintageMapItem | null;
  vintageOpacity: number;
  setVintageOpacity: (opacity: number) => void;
  activateVintageOverlay: (mapItem: VintageMapItem) => void;
  clearVintageOverlay: () => void;
  // Existing datasets
  allEventsSorted: HistoricalEvent[];
  filteredEvents: HistoricalEvent[];
  allRoutes: HistoricalRoute[];
  filteredRoutes: HistoricalRoute[];
  allRoutesCount: number;
  filteredDossierHitos: DossierHito[];
  allPresidents: PresidenteRD[];
  foreignPresidents: PresidenteRD[];
  allMandatos: MandatoRD[];
  wikiPortraits: Record<string, string>;
  portraitsLoading: boolean;
  // Tour Cronológico
  tourActive: boolean;
  tourIndex: number;
  startTour: () => void;
  stopTour: () => void;
  nextTourStep: () => void;
  prevTourStep: () => void;
  openEventOnMap: (evt: HistoricalEvent) => void;
  openForeignPresidents: () => void;
  detailModalPresidentKey: string | null;
  openPresidentDetailModal: (nameOrId: string) => void;
  closePresidentDetailModal: () => void;
}

const CronoMapaContext = createContext<CronoMapaContextValue | null>(null);

export function CronoMapaProvider({ children }: { children: ReactNode }) {
  const [viewMode, setViewModeState] = useState<ViewMode>('map');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [activeBaseMapId, setActiveBaseMapId] = useState<BaseMapId>('realistic_relief');
  const [reliefIntensity, setReliefIntensity] = useState<number>(0.85);
  const [layers, setLayers] = useState<HistoricalLayer[]>(INITIAL_LAYERS);
  const [maxYear, setMaxYearState] = useState<number>(2026);
  const [syncTerritoryWithYear, setSyncTerritoryWithYearState] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<EventCategory[]>(ALL_CATEGORIES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [regimeFilter, setRegimeFilterState] = useState<RegimeFilter>('all');
  const [activePeriodFilter, setActivePeriodFilter] = useState<ExplorePeriodId | null>(null);
  const [selectedFeature, setSelectedFeature] = useState<SelectedFeature | null>(null);
  const [cursorCoords, setCursorCoordsState] = useState<{ lat: number; lng: number }>({
    lat: MAP_INITIAL_CENTER[0],
    lng: MAP_INITIAL_CENTER[1],
  });
  const setCursorCoords = useCallback((coords: { lat: number; lng: number }) => {
    const nextLat = Number(coords.lat.toFixed(4));
    const nextLng = Number(coords.lng.toFixed(4));
    setCursorCoordsState((prev) => {
      if (prev.lat === nextLat && prev.lng === nextLng) return prev;
      return { lat: nextLat, lng: nextLng };
    });
  }, []);
  const [zoom, setZoom] = useState<number>(MAP_INITIAL_ZOOM);
  const [flyToTarget, setFlyToTarget] = useState<FlyToTarget | null>(null);
  const [tourActive, setTourActive] = useState<boolean>(false);
  const [tourIndex, setTourIndex] = useState<number>(0);
  const [detailModalPresidentKey, setDetailModalPresidentKey] = useState<string | null>(null);

  // Module 1 & 2: Real GeoJSON + Turf.js fusion
  const [realProvinces, setRealProvinces] = useState<ProvinceCollection>(() =>
    getBundledRealProvinces(),
  );

  useEffect(() => {
    let active = true;
    fetchRealProvinceGeoJSON().then((collection) => {
      if (active && collection.features.length > 0) {
        setRealProvinces(collection);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const cacicazgos1492 = useMemo(
    () =>
      buildMacroTerritoryGeoJSON(realProvinces, CACICAZGOS_1492_CONFIG, 'cacicazgos_1492'),
    [realProvinces],
  );

  const provincias1844 = useMemo(
    () => buildMacroTerritoryGeoJSON(realProvinces, PROVINCIAS_1844_CONFIG, 'provincias_1844'),
    [realProvinces],
  );

  // Module 3: Milestones ("⚔️ Hitos")
  const [showMilestones, setShowMilestones] = useState<boolean>(true);

  const allowedMilestoneCategories = useMemo(
    () => new Set(selectedCategories.map((c) => EVENT_CAT_TO_MILESTONE_CAT[c])),
    [selectedCategories],
  );

  const filteredMilestones = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return HISTORICAL_MILESTONES.filter((m) => {
      if (m.year > maxYear) return false;
      if (!allowedMilestoneCategories.has(m.category)) return false;
      if (activePeriodFilter && m.periodId !== activePeriodFilter) return false;
      if (regimeFilter === 'trujillo' && (m.year < 1930 || m.year > 1961)) return false;
      if (regimeFilter === 'balaguer' && (m.year < 1960 || m.year > 1996)) return false;
      if (!q) return true;
      return `${m.title} ${m.province} ${m.epoch} ${m.category} ${m.summary} ${m.protagonists.join(' ')}`
        .toLowerCase()
        .includes(q);
    });
  }, [maxYear, allowedMilestoneCategories, activePeriodFilter, regimeFilter, searchQuery]);

  const filteredColonialMonuments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return COLONIAL_MONUMENTS.filter((mon) => {
      if (mon.yearBuilt > maxYear) return false;
      if (!q) return true;
      return `${mon.name} ${mon.shortName} ${mon.province} ${mon.locationLabel} ${mon.architecturalStyle} ${mon.summary}`
        .toLowerCase()
        .includes(q);
    });
  }, [maxYear, searchQuery]);

  // Module 4: Animated Routes Player
  const [activeAnimatedRoute, setActiveAnimatedRoute] =
    useState<AnimatedHistoricalRoute | null>(null);
  const [isRoutePlaying, setIsRoutePlaying] = useState<boolean>(false);
  const [routeProgress, setRouteProgress] = useState<number>(0);
  const [routeStopIndex, setRouteStopIndex] = useState<number>(0);
  const [routeResetNonce, setRouteResetNonce] = useState<number>(0);

  // Module 5: Vintage Maps Gallery & GroundOverlay
  const [vintageGalleryOpen, setVintageGalleryOpen] = useState<boolean>(false);
  const [activeVintageMap, setActiveVintageMap] = useState<VintageMapItem | null>(null);
  const [vintageOpacity, setVintageOpacity] = useState<number>(0.72);

  const setViewMode = useCallback((mode: ViewMode) => {
    setViewModeState(mode);
    if (mode !== 'map') {
      // Lifecycle cleanup when leaving the map canvas
      setIsRoutePlaying(false);
    }
  }, []);

  const allEventsSorted = useMemo(() => {
    const col = eventosData as unknown as HistoricalEventCollection;
    return col.features
      .map((feat) => ({
        ...feat,
        properties: {
          ...feat.properties,
          imagen_url: EVENT_ASSET_MAP[feat.properties.imagen_url] ?? feat.properties.imagen_url,
        },
      }))
      .sort(
        (a, b) =>
          a.properties.fecha.localeCompare(b.properties.fecha) ||
          a.properties.id.localeCompare(b.properties.id),
      );
  }, []);

  const allRoutes = useMemo(() => {
    const col = rutasData as unknown as HistoricalRouteCollection;
    return col.features;
  }, []);

  // Dynamic MediaWiki Presidential Portraits (cached 7 days in localStorage)
  const [wikiPortraits, setWikiPortraits] = useState<Record<string, string>>(() =>
    getCachedPortraits(),
  );
  const [portraitsLoading, setPortraitsLoading] = useState<boolean>(
    () => Object.keys(getCachedPortraits()).length === 0,
  );

  useEffect(() => {
    let active = true;
    const cached = getCachedPortraits();
    if (Object.keys(cached).length > 0) {
      setWikiPortraits(cached);
      setPortraitsLoading(false);
      return;
    }

    setPortraitsLoading(true);
    fetchAllPresidentPortraits()
      .then((map) => {
        if (active && Object.keys(map).length > 0) {
          setWikiPortraits(map);
        }
      })
      .catch(() => {
        // Fallback smoothly to local JSON URLs or silhouette emblem
      })
      .finally(() => {
        if (active) setPortraitsLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const allPresidents = useMemo(() => {
    const col = presidentesData as unknown as PresidentesCollection;
    return col.presidentes.map((pres) => ({
      ...pres,
      foto_url: resolvePortraitUrl(pres.nombre, wikiPortraits) || pres.foto_url,
    }));
  }, [wikiPortraits]);

  const foreignPresidents = useMemo(
    () => allPresidents.filter((p) => p.provincia_nacimiento === 'Nacidos en el Exterior'),
    [allPresidents],
  );

  const allMandatos = useMemo(() => {
    const col = mandatosData as unknown as MandatosCollection;
    const presById = new Map(allPresidents.map((p) => [p.id, p]));
    return col.mandatos.map((man) => {
      const linkedPres = man.presidente_id ? presById.get(man.presidente_id) : undefined;
      const dynamicUrl =
        resolvePortraitUrl(man.nombre, wikiPortraits) ||
        (linkedPres ? resolvePortraitUrl(linkedPres.nombre, wikiPortraits) : undefined) ||
        linkedPres?.foto_url ||
        man.foto_url;
      return {
        ...man,
        foto_url: dynamicUrl,
      };
    });
  }, [allPresidents, wikiPortraits]);

  const allDossierHitos = useMemo(() => {
    const data = dossiersData as unknown as DossiersRegimenesData;
    return [...data.trujillo.hitos, ...data.balaguer.hitos].sort((a, b) =>
      a.fecha.localeCompare(b.fecha),
    );
  }, []);

  const activeBaseMap = useMemo(
    () => BASE_MAPS.find((bm) => bm.id === activeBaseMapId) ?? BASE_MAPS[0],
    [activeBaseMapId],
  );

  const applyTerritoryForYear = useCallback((year: number) => {
    setLayers((prev) =>
      prev.map((layer) => {
        if (layer.id === 'cacicazgos_1492') {
          return { ...layer, visible: year >= 1492 && year <= 1549 };
        }
        if (layer.id === 'despoblacion_osorio_1606') {
          return { ...layer, visible: year >= 1550 && year <= 1715 };
        }
        if (layer.id === 'tratado_aranjuez_1777') {
          return { ...layer, visible: year >= 1716 && year <= 1821 };
        }
        if (layer.id === 'unificacion_haitiana_1822') {
          return { ...layer, visible: year >= 1822 && year <= 1843 };
        }
        if (layer.id === 'provincias_1844') {
          return { ...layer, visible: year >= 1844 && year <= 1862 };
        }
        if (layer.id === 'provincias_actuales') {
          return { ...layer, visible: year >= 1863 };
        }
        return layer;
      }),
    );
  }, []);

  const setMaxYear = useCallback(
    (year: number) => {
      const clamped = Math.max(1492, Math.min(2026, Math.round(year)));
      setMaxYearState(clamped);
      if (syncTerritoryWithYear) {
        applyTerritoryForYear(clamped);
      }
      setSelectedFeature((prev) => {
        if (!prev) return null;
        if (prev.kind === 'event' && prev.data.properties.anio > clamped) return null;
        if (prev.kind === 'milestone' && prev.data.year > clamped) return null;
        if (prev.kind === 'colonial_monument' && prev.data.yearBuilt > clamped) return null;
        if (prev.kind === 'dossier_hito' && prev.data.anio > clamped) return null;
        if (prev.kind === 'route' && prev.data.properties.anio_inicio > clamped) return null;
        return prev;
      });
    },
    [syncTerritoryWithYear, applyTerritoryForYear],
  );

  const setSyncTerritoryWithYear = useCallback(
    (sync: boolean) => {
      setSyncTerritoryWithYearState(sync);
      if (sync) {
        applyTerritoryForYear(maxYear);
      }
    },
    [maxYear, applyTerritoryForYear],
  );

  const setRegimeFilter = useCallback(
    (filter: RegimeFilter) => {
      setRegimeFilterState(filter);
      if (filter === 'all') {
        setActivePeriodFilter(null);
      } else {
        setActivePeriodFilter(filter === 'trujillo' ? 'trujillo' : 'balaguer');
        const targetYear = filter === 'trujillo' ? 1961 : 1996;
        setMaxYearState(targetYear);
        if (syncTerritoryWithYear) {
          applyTerritoryForYear(targetYear);
        }
        setLayers((prev) =>
          prev.map((l) => (l.id === 'dossiers_regimenes' ? { ...l, visible: true } : l)),
        );
      }
    },
    [syncTerritoryWithYear, applyTerritoryForYear],
  );

  const filteredEvents = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allEventsSorted.filter((evt) => {
      const p = evt.properties;
      if (p.anio > maxYear) return false;
      if (!selectedCategories.includes(p.categoria)) return false;
      if (activePeriodFilter === 'taina' && p.anio > 1550) return false;
      if (activePeriodFilter === 'independencia' && (p.anio < 1838 || p.anio > 1860)) return false;
      if (activePeriodFilter === 'restauracion' && (p.anio < 1861 || p.anio > 1866)) return false;
      if (
        (regimeFilter === 'trujillo' || activePeriodFilter === 'trujillo') &&
        (p.anio < 1930 || p.anio > 1961)
      )
        return false;
      if (
        (regimeFilter === 'balaguer' || activePeriodFilter === 'balaguer') &&
        (p.anio < 1960 || p.anio > 1996)
      )
        return false;
      if (!q) return true;
      const haystack = [
        p.titulo,
        p.provincia,
        p.resumen,
        p.periodo,
        ...p.personajes,
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [allEventsSorted, maxYear, selectedCategories, activePeriodFilter, regimeFilter, searchQuery]);

  const filteredRoutes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allRoutes.filter((route) => {
      if (route.properties.anio_inicio > maxYear) return false;
      if (activePeriodFilter === 'taina' && route.properties.id !== 'ruta-resistencia-taina-1492')
        return false;
      if (
        activePeriodFilter === 'independencia' &&
        route.properties.id !== 'ruta-independencia-1844'
      )
        return false;
      if (activePeriodFilter === 'restauracion' && route.properties.id !== 'ruta-restauracion-1863')
        return false;
      if (
        regimeFilter !== 'all' ||
        activePeriodFilter === 'trujillo' ||
        activePeriodFilter === 'balaguer'
      )
        return false;
      if (!q) return true;
      return `${route.properties.titulo} ${route.properties.descripcion} ${route.properties.protagonistas.join(' ')}`
        .toLowerCase()
        .includes(q);
    });
  }, [allRoutes, maxYear, activePeriodFilter, regimeFilter, searchQuery]);

  const filteredDossierHitos = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allDossierHitos.filter((hito) => {
      if (hito.anio > maxYear) return false;
      if (regimeFilter !== 'all' && hito.regimen !== regimeFilter) return false;
      if (!q) return true;
      return `${hito.titulo} ${hito.provincia} ${hito.resumen} ${hito.protagonistas.join(' ')}`
        .toLowerCase()
        .includes(q);
    });
  }, [allDossierHitos, maxYear, regimeFilter, searchQuery]);

  const toggleLayer = useCallback((id: LayerId) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, visible: !l.visible } : l)));
  }, []);

  const setLayerVisible = useCallback((id: LayerId, visible: boolean) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, visible } : l)));
  }, []);

  const changeLayerOpacity = useCallback((id: LayerId, opacidad: number) => {
    setLayers((prev) => prev.map((l) => (l.id === id ? { ...l, opacidad } : l)));
  }, []);

  const focusLayer = useCallback((layer: HistoricalLayer) => {
    if (!layer.focusBounds) return;
    setLayers((prev) =>
      prev.map((item) => (item.id === layer.id ? { ...item, visible: true } : item)),
    );
    setFlyToTarget({ bounds: layer.focusBounds, nonce: Date.now() });
  }, []);

  const resetView = useCallback(() => {
    setActivePeriodFilter(null);
    setRegimeFilterState('all');
    setMaxYearState(2026);
    setFlyToTarget({
      center: MAP_INITIAL_CENTER,
      zoom: MAP_INITIAL_ZOOM,
      nonce: Date.now(),
    });
  }, []);

  const zoomIn = useCallback(() => {
    setFlyToTarget({
      zoomDelta: 1,
      nonce: Date.now(),
    });
  }, []);

  const zoomOut = useCallback(() => {
    setFlyToTarget({
      zoomDelta: -1,
      nonce: Date.now(),
    });
  }, []);

  const flyToCoords = useCallback((coords: [number, number], targetZoom = 12) => {
    setFlyToTarget({
      center: [coords[1], coords[0]],
      zoom: targetZoom,
      nonce: Date.now(),
    });
  }, []);

  const toggleCategory = useCallback((cat: EventCategory) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat],
    );
  }, []);

  const openEventOnMap = useCallback((evt: HistoricalEvent) => {
    setViewModeState('map');
    setSelectedFeature({ kind: 'event', data: evt });
    const [lng, lat] = evt.geometry.coordinates;
    setFlyToTarget({
      center: [lat, lng],
      zoom: 12,
      nonce: Date.now(),
    });
  }, []);

  const jumpToMilestone = useCallback(
    (milestone: HistoricalMilestone) => {
      setViewModeState('map');
      setShowMilestones(true);
      setSelectedCategories(ALL_CATEGORIES);
      if (activePeriodFilter && activePeriodFilter !== milestone.periodId) {
        setActivePeriodFilter(null);
      }
      setRegimeFilterState('all');
      if (maxYear < milestone.year) {
        setMaxYearState(Math.max(milestone.year, 2026));
        if (syncTerritoryWithYear) {
          applyTerritoryForYear(milestone.year);
        }
      }
      setSelectedFeature({ kind: 'milestone', data: milestone });
      setFlyToTarget({
        center: [milestone.lat, milestone.lng],
        zoom: 12,
        nonce: Date.now(),
      });
    },
    [maxYear, activePeriodFilter, syncTerritoryWithYear, applyTerritoryForYear],
  );

  const explorePeriodOnMap = useCallback((period: HistoricalEncyclopediaPeriod) => {
    setViewModeState('map');
    setShowMilestones(true);
    setSelectedCategories(ALL_CATEGORIES);
    setActivePeriodFilter(period.id);
    setRegimeFilterState(period.regimeFilter);
    setMaxYearState(period.targetYear);

    setLayers((prev) =>
      prev.map((l) => {
        if (l.id === 'rutas_historicas') {
          return { ...l, visible: Boolean(period.routeId) };
        }
        if (l.id === 'dossiers_regimenes') {
          return { ...l, visible: period.regimeFilter !== 'all' };
        }
        if (period.territorialLayerId && l.id === period.territorialLayerId) {
          return { ...l, visible: true };
        }
        return l;
      }),
    );

    setFlyToTarget({
      center: period.focusCenter,
      zoom: period.focusZoom,
      nonce: Date.now(),
    });
  }, []);

  const jumpToColonialMonument = useCallback(
    (monument: ColonialMonument) => {
      setViewModeState('map');
      setRegimeFilterState('all');
      if (maxYear < monument.yearBuilt) {
        setMaxYearState(monument.yearBuilt);
        if (syncTerritoryWithYear) {
          applyTerritoryForYear(monument.yearBuilt);
        }
      }
      setLayers((prev) =>
        prev.map((l) => (l.id === 'monumentos_coloniales' ? { ...l, visible: true } : l)),
      );
      setSelectedFeature({ kind: 'colonial_monument', data: monument });
      setFlyToTarget({
        center: [monument.lat, monument.lng],
        zoom: 16,
        nonce: Date.now(),
      });
    },
    [maxYear, syncTerritoryWithYear, applyTerritoryForYear],
  );

  // Module 4 actions
  const startAnimatedRoute = useCallback((route: AnimatedHistoricalRoute, autoPlay = true) => {
    setViewModeState('map');
    setMaxYearState((prev) => Math.max(prev, route.year));
    setLayers((prev) =>
      prev.map((l) => (l.id === 'rutas_historicas' ? { ...l, visible: true } : l)),
    );
    setActiveAnimatedRoute(route);
    setRouteProgress(0);
    setRouteStopIndex(0);
    setIsRoutePlaying(autoPlay);
    setRouteResetNonce((n) => n + 1);
    const first = route.stops[0];
    if (first) {
      setFlyToTarget({
        center: [first.lat, first.lng],
        zoom: 10,
        nonce: Date.now(),
      });
    }
  }, []);

  const toggleRoutePlay = useCallback(() => {
    setIsRoutePlaying((prev) => {
      if (!prev && routeProgress >= 0.995) {
        setRouteProgress(0);
        setRouteStopIndex(0);
        setRouteResetNonce((n) => n + 1);
      }
      return !prev;
    });
  }, [routeProgress]);

  const restartAnimatedRoute = useCallback(() => {
    if (!activeAnimatedRoute) return;
    setRouteProgress(0);
    setRouteStopIndex(0);
    setIsRoutePlaying(true);
    setRouteResetNonce((n) => n + 1);
    const first = activeAnimatedRoute.stops[0];
    if (first) {
      setFlyToTarget({
        center: [first.lat, first.lng],
        zoom: 10,
        nonce: Date.now(),
      });
    }
  }, [activeAnimatedRoute]);

  const closeAnimatedRoute = useCallback(() => {
    setIsRoutePlaying(false);
    setActiveAnimatedRoute(null);
    setRouteProgress(0);
    setRouteStopIndex(0);
  }, []);

  const jumpToRouteStop = useCallback(
    (stopIdx: number) => {
      if (!activeAnimatedRoute) return;
      const clamped = Math.max(0, Math.min(activeAnimatedRoute.stops.length - 1, stopIdx));
      const denom = Math.max(1, activeAnimatedRoute.stops.length - 1);
      setRouteStopIndex(clamped);
      setRouteProgress(clamped / denom);
      setIsRoutePlaying(false);
      setRouteResetNonce((n) => n + 1);
      const stop = activeAnimatedRoute.stops[clamped];
      if (stop) {
        setFlyToTarget({
          center: [stop.lat, stop.lng],
          zoom: 11,
          nonce: Date.now(),
        });
      }
    },
    [activeAnimatedRoute],
  );

  // Module 5 actions
  const activateVintageOverlay = useCallback((mapItem: VintageMapItem) => {
    setViewModeState('map');
    setActiveVintageMap(mapItem);
    setVintageOpacity(mapItem.defaultOpacity);
    setVintageGalleryOpen(false);
    setFlyToTarget({
      bounds: [
        [mapItem.bounds.south, mapItem.bounds.west],
        [mapItem.bounds.north, mapItem.bounds.east],
      ],
      nonce: Date.now(),
    });
  }, []);

  const clearVintageOverlay = useCallback(() => {
    setActiveVintageMap(null);
  }, []);

  const startTour = useCallback(() => {
    const list = filteredEvents.length > 0 ? filteredEvents : allEventsSorted;
    if (list.length === 0) return;
    setViewModeState('map');
    setTourActive(true);
    setTourIndex(0);
    const first = list[0];
    setSelectedFeature({ kind: 'event', data: first });
    const [lng, lat] = first.geometry.coordinates;
    setFlyToTarget({ center: [lat, lng], zoom: 11, nonce: Date.now() });
  }, [filteredEvents, allEventsSorted]);

  const stopTour = useCallback(() => {
    setTourActive(false);
  }, []);

  const nextTourStep = useCallback(() => {
    const list = filteredEvents.length > 0 ? filteredEvents : allEventsSorted;
    if (list.length === 0) return;
    const nextIdx = (tourIndex + 1) % list.length;
    setTourIndex(nextIdx);
    const evt = list[nextIdx];
    setSelectedFeature({ kind: 'event', data: evt });
    const [lng, lat] = evt.geometry.coordinates;
    setFlyToTarget({ center: [lat, lng], zoom: 11, nonce: Date.now() });
  }, [filteredEvents, allEventsSorted, tourIndex]);

  const prevTourStep = useCallback(() => {
    const list = filteredEvents.length > 0 ? filteredEvents : allEventsSorted;
    if (list.length === 0) return;
    const prevIdx = (tourIndex - 1 + list.length) % list.length;
    setTourIndex(prevIdx);
    const evt = list[prevIdx];
    setSelectedFeature({ kind: 'event', data: evt });
    const [lng, lat] = evt.geometry.coordinates;
    setFlyToTarget({ center: [lat, lng], zoom: 11, nonce: Date.now() });
  }, [filteredEvents, allEventsSorted, tourIndex]);

  const openForeignPresidents = useCallback(() => {
    setSelectedFeature({
      kind: 'province_presidents',
      provinceName: 'Nacidos en el Exterior',
      presidentes: foreignPresidents,
    });
  }, [foreignPresidents]);

  const openPresidentDetailModal = useCallback((nameOrId: string) => {
    if (!nameOrId) return;
    setDetailModalPresidentKey(nameOrId);
  }, []);

  const closePresidentDetailModal = useCallback(() => {
    setDetailModalPresidentKey(null);
  }, []);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen((o) => !o);
  }, []);

  const toggleMilestones = useCallback(() => {
    setShowMilestones((s) => !s);
  }, []);

  const value: CronoMapaContextValue = useMemo(
    () => ({
      viewMode,
      setViewMode,
      sidebarOpen,
      setSidebarOpen,
      toggleSidebar,
      activeBaseMapId,
      setActiveBaseMapId,
      activeBaseMap,
      reliefIntensity,
      setReliefIntensity,
      layers,
      toggleLayer,
      setLayerVisible,
      changeLayerOpacity,
      focusLayer,
      maxYear,
      setMaxYear,
      syncTerritoryWithYear,
      setSyncTerritoryWithYear,
      selectedCategories,
      toggleCategory,
      searchQuery,
      setSearchQuery,
      regimeFilter,
      setRegimeFilter,
      activePeriodFilter,
      setActivePeriodFilter,
      explorePeriodOnMap,
      selectedFeature,
      setSelectedFeature,
      cursorCoords,
      setCursorCoords,
      zoom,
      setZoom,
      zoomIn,
      zoomOut,
      flyToTarget,
      resetView,
      flyToCoords,
      realProvinces,
      cacicazgos1492,
      provincias1844,
      allMilestones: HISTORICAL_MILESTONES,
      filteredMilestones,
      showMilestones,
      setShowMilestones,
      toggleMilestones,
      jumpToMilestone,
      allColonialMonuments: COLONIAL_MONUMENTS,
      filteredColonialMonuments,
      jumpToColonialMonument,
      animatedRoutes: ANIMATED_HISTORICAL_ROUTES,
      activeAnimatedRoute,
      isRoutePlaying,
      setIsRoutePlaying,
      routeProgress,
      routeStopIndex,
      routeResetNonce,
      startAnimatedRoute,
      toggleRoutePlay,
      restartAnimatedRoute,
      closeAnimatedRoute,
      setRouteProgress,
      setRouteStopIndex,
      jumpToRouteStop,
      vintageGalleryOpen,
      setVintageGalleryOpen,
      activeVintageMap,
      vintageOpacity,
      setVintageOpacity,
      activateVintageOverlay,
      clearVintageOverlay,
      allEventsSorted,
      filteredEvents,
      allRoutes,
      filteredRoutes,
      allRoutesCount: allRoutes.length,
      filteredDossierHitos,
      allPresidents,
      foreignPresidents,
      allMandatos,
      wikiPortraits,
      portraitsLoading,
      tourActive,
      tourIndex,
      startTour,
      stopTour,
      nextTourStep,
      prevTourStep,
      openEventOnMap,
      openForeignPresidents,
      detailModalPresidentKey,
      openPresidentDetailModal,
      closePresidentDetailModal,
    }),
    [
      viewMode,
      setViewMode,
      sidebarOpen,
      toggleSidebar,
      activeBaseMapId,
      activeBaseMap,
      reliefIntensity,
      layers,
      toggleLayer,
      setLayerVisible,
      changeLayerOpacity,
      focusLayer,
      maxYear,
      setMaxYear,
      syncTerritoryWithYear,
      setSyncTerritoryWithYear,
      selectedCategories,
      toggleCategory,
      searchQuery,
      regimeFilter,
      setRegimeFilter,
      activePeriodFilter,
      explorePeriodOnMap,
      selectedFeature,
      cursorCoords,
      setCursorCoords,
      zoom,
      zoomIn,
      zoomOut,
      flyToTarget,
      resetView,
      flyToCoords,
      realProvinces,
      cacicazgos1492,
      provincias1844,
      filteredMilestones,
      showMilestones,
      toggleMilestones,
      jumpToMilestone,
      filteredColonialMonuments,
      jumpToColonialMonument,
      activeAnimatedRoute,
      isRoutePlaying,
      routeProgress,
      routeStopIndex,
      routeResetNonce,
      startAnimatedRoute,
      toggleRoutePlay,
      restartAnimatedRoute,
      closeAnimatedRoute,
      jumpToRouteStop,
      vintageGalleryOpen,
      activeVintageMap,
      vintageOpacity,
      activateVintageOverlay,
      clearVintageOverlay,
      allEventsSorted,
      filteredEvents,
      allRoutes,
      filteredRoutes,
      filteredDossierHitos,
      allPresidents,
      foreignPresidents,
      allMandatos,
      wikiPortraits,
      portraitsLoading,
      tourActive,
      tourIndex,
      startTour,
      stopTour,
      nextTourStep,
      prevTourStep,
      openEventOnMap,
      openForeignPresidents,
      detailModalPresidentKey,
      openPresidentDetailModal,
      closePresidentDetailModal,
    ],
  );

  return <CronoMapaContext.Provider value={value}>{children}</CronoMapaContext.Provider>;
}

export function useCronoMapa() {
  const ctx = useContext(CronoMapaContext);
  if (!ctx) throw new Error('useCronoMapa must be used inside CronoMapaProvider');
  return ctx;
}
