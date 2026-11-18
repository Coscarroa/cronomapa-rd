export type EventCategory =
  | 'Política/Constitucional'
  | 'Batalla/Militar'
  | 'Fundación/Territorio'
  | 'Derechos/Sociedad';

export type HistoricalPeriod =
  | 'Descubrimiento y Conquista (1492–1500)'
  | 'Colonia y Transiciones (1501–1821)'
  | 'Independencia, Anexión y Restauración (1822–1915)'
  | 'Ocupación, Dictadura y Democracia (1916–2000)'
  | 'Era Contemporánea (2001–2026)';

export interface HistoricalEventProperties {
  id: string;
  titulo: string;
  fecha: string; // ISO YYYY-MM-DD
  anio: number;
  periodo: HistoricalPeriod;
  categoria: EventCategory;
  provincia: string;
  resumen: string;
  detalle_historico: string;
  impacto_politico: string;
  contexto_caribeno: string;
  documento_primario: string;
  personajes: string[];
  imagen_url: string;
  fuente_bibliografica: string;
}

export interface GeoJSONPointGeometry {
  type: 'Point';
  coordinates: [number, number]; // [lng, lat]
}

export interface HistoricalEvent {
  type: 'Feature';
  geometry: GeoJSONPointGeometry;
  properties: HistoricalEventProperties;
}

export interface HistoricalEventCollection {
  type: 'FeatureCollection';
  name: string;
  features: HistoricalEvent[];
}

export type RouteEra = 'Descubrimiento' | 'Colonia' | 'Independencia' | 'Restauración';

export type RouteCategory =
  | 'maritima'
  | 'militar'
  | 'terrestre_expedicion'
  | 'economica_migratoria';

export interface RouteWaypoint {
  orden: number;
  nombre: string;
  fecha: string;
  coordenadas: [number, number]; // [lng, lat]
  descripcion: string;
}

export interface HistoricalRouteProperties {
  id: string;
  titulo: string;
  anio_inicio: number;
  anio_fin: number;
  fechas: string;
  tipo_ruta: RouteCategory;
  tipo_ruta_etiqueta: string;
  epoca: RouteEra;
  color: string;
  descripcion: string;
  protagonistas: string[];
  hitos: RouteWaypoint[];
  fuente_bibliografica: string;
}

export interface GeoJSONLineStringGeometry {
  type: 'LineString';
  coordinates: [number, number][]; // Array of [lng, lat]
}

export interface HistoricalRoute {
  type: 'Feature';
  geometry: GeoJSONLineStringGeometry;
  properties: HistoricalRouteProperties;
}

export interface HistoricalRouteCollection {
  type: 'FeatureCollection';
  name: string;
  features: HistoricalRoute[];
}

export type TerritorialLayerKind =
  | 'cacicazgos_1492'
  | 'despoblacion_osorio_1606'
  | 'tratado_aranjuez_1777'
  | 'unificacion_haitiana_1822'
  | 'provincias_1844';

export interface TerritorialPolygonProperties {
  id: string;
  nombre_capa: string;
  subtitulo: string;
  grupo_territorial: TerritorialLayerKind;
  anio_inicio: number;
  anio_fin: number;
  color: string;
  descripcion_territorial: string;
  cabecera?: string;
  liderazgo?: string;
  provincias_actuales?: string[];
  centroid?: [number, number]; // [lng, lat]
}

export interface TerritorialPolygonFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: [number, number][][] | [number, number][][][];
  };
  properties: TerritorialPolygonProperties;
}

export interface TerritorialPolygonCollection {
  type: 'FeatureCollection';
  name: string;
  features: TerritorialPolygonFeature[];
}

export interface ProvinceProperties {
  codigo: string;
  nombre: string;
  region: string;
  cabecera: string;
  shapeName?: string;
}

export interface ProvinceFeature {
  type: 'Feature';
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: [number, number][][] | [number, number][][][];
  };
  properties: ProvinceProperties;
}

export interface ProvinceCollection {
  type: 'FeatureCollection';
  name: string;
  features: ProvinceFeature[];
}

export type FormaAcceso =
  | 'Elección'
  | 'Golpe de Estado'
  | 'Interinato'
  | 'Proclamación / Junta'
  | 'Designación / Sucesión';

export type EtapaRepublicana =
  | 'Primera República (1844–1861)'
  | 'Restauración y Segunda República (1863–1916)'
  | 'Tercera República y Era de Trujillo (1924–1961)'
  | 'Transición y Cuarta República (1962–Actualidad)';

export interface PresidenteRD {
  id: string;
  nombre: string;
  foto_url: string;
  nacimiento_muerte: string;
  provincia_nacimiento: string;
  municipio_nacimiento: string;
  coordenadas: [number, number]; // [lng, lat]
  periodos_gobierno: string[];
  etapa_historica: EtapaRepublicana;
  partido: string;
  forma_acceso: FormaAcceso;
  resumen_gestion: string;
}

export interface PresidentesCollection {
  metadata: {
    titulo: string;
    fuente: string;
    total: number;
  };
  presidentes: PresidenteRD[];
}

export type MandatoTipo =
  | 'constitucional'
  | 'golpe_derrocado'
  | 'junta_provisional'
  | 'ocupacion_extranjera'
  | 'regimen_autoritario';

export interface MandatoRD {
  id: string;
  presidente_id: string | null;
  nombre: string;
  titulo_cargo: string;
  fecha_inicio: string; // YYYY-MM-DD
  fecha_fin: string; // YYYY-MM-DD
  carril: 1 | 2;
  tipo: MandatoTipo;
  foto_url: string;
  partido: string;
  resumen: string;
}

export interface MandatosCollection {
  metadata: {
    titulo: string;
    total: number;
  };
  mandatos: MandatoRD[];
}

export type DossierRegimenId = 'trujillo' | 'balaguer';

export type DossierHitoCategory =
  | 'Política y Régimen'
  | 'Economía e Infraestructura'
  | 'Represión y Derechos Humanos'
  | 'Resistencia y Transición';

export interface DossierHito {
  id: string;
  regimen: DossierRegimenId;
  subperiodo: string;
  titulo: string;
  fecha: string;
  anio: number;
  categoria: DossierHitoCategory;
  provincia: string;
  coordenadas: [number, number]; // [lng, lat]
  resumen: string;
  detalle_historico: string;
  impacto_politico: string;
  protagonistas: string[];
  fuente_bibliografica: string;
}

export interface DossierRegimenModule {
  id: DossierRegimenId;
  titulo: string;
  periodo: string;
  descripcion: string;
  color: string;
  hitos: DossierHito[];
}

export interface DossiersRegimenesData {
  trujillo: DossierRegimenModule;
  balaguer: DossierRegimenModule;
}

export type BaseMapId =
  | 'realistic_relief'
  | 'satellite_hybrid'
  | 'physical_historical'
  | 'parchment';

export interface BaseMapConfig {
  id: BaseMapId;
  nombre: string;
  subtitulo: string;
  maxZoom: number;
}

export type LayerId =
  | 'cacicazgos_1492'
  | 'despoblacion_osorio_1606'
  | 'tratado_aranjuez_1777'
  | 'unificacion_haitiana_1822'
  | 'provincias_1844'
  | 'provincias_actuales'
  | 'presidentes_provincia'
  | 'dossiers_regimenes'
  | 'rutas_historicas'
  | 'mapa_antiguo_espaniola'
  | 'plano_ciudad_colonial'
  | 'eventos_historicos'
  | 'monumentos_coloniales';

export type LayerGroup = 'poligonos' | 'geopolitica' | 'rutas' | 'antiguos' | 'puntos';

export interface HistoricalLayer {
  id: LayerId;
  nombre: string;
  descripcion: string;
  grupo: LayerGroup;
  visible: boolean;
  opacidad: number; // 0 to 1
  colorIndicador?: string;
  focusBounds?: [[number, number], [number, number]];
}

export type ViewMode = 'map' | 'timeline';
export type RegimeFilter = 'all' | 'trujillo' | 'balaguer';

export type MilestoneEpoch = 'Colonia' | '1844' | 'Restauración' | 'Siglo XX';
export type MilestoneType = 'batalla' | 'proclamacion' | 'fundacion';

export interface HistoricalMilestone {
  id: string;
  title: string;
  date: string;
  year: number;
  epoch: MilestoneEpoch;
  type: MilestoneType;
  lat: number;
  lng: number;
  province: string;
  protagonists: string[];
  summary: string;
  chronicle: string;
  impact: string;
  source: string;
}

export interface AnimatedRouteStop {
  order: number;
  name: string;
  date: string;
  lat: number;
  lng: number;
  narrative: string;
}

export interface AnimatedHistoricalRoute {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  year: number;
  epoch: string;
  color: string;
  protagonists: string[];
  summary: string;
  stops: AnimatedRouteStop[];
}

export interface VintageMapItem {
  id: string;
  title: string;
  author: string;
  year: number;
  yearLabel: string;
  archive: string;
  description: string;
  imageUrl: string;
  fallbackUrl: string;
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  defaultOpacity: number;
}

export type MonumentCategory = 'fortaleza' | 'ruinas' | 'iglesia' | 'palacio' | 'villa';

export interface ColonialMonument {
  id: string;
  name: string;
  shortName: string;
  category: MonumentCategory;
  yearBuilt: number;
  centuryLabel: string;
  province: string;
  locationLabel: string;
  lat: number;
  lng: number;
  architecturalStyle: string;
  heritageStatus: string;
  wikiTitle: string;
  enWikiTitle?: string;
  summary: string;
  historicalContext: string;
}

export interface MonumentWikiPhoto {
  url: string;
  thumbUrl: string;
  title: string;
  caption: string;
  author?: string;
  dateLabel?: string;
  sourcePageUrl: string;
  isHistoricalHint: boolean;
}

export interface MonumentGroundingSource {
  title: string;
  uri: string;
}

export interface MonumentWikiGroundingData {
  id: string;
  name: string;
  groundedSummary: string;
  groundingSources: MonumentGroundingSource[];
  searchQueries: string[];
  groundingStatus: 'grounded' | 'unavailable';
  groundingError?: string;
  wikipediaTitle?: string;
  wikipediaUrl?: string;
  wikipediaExtract?: string;
  photos: MonumentWikiPhoto[];
  fetchedAt: string;
}

export type SelectedFeature =
  | { kind: 'event'; data: HistoricalEvent }
  | { kind: 'milestone'; data: HistoricalMilestone }
  | { kind: 'colonial_monument'; data: ColonialMonument }
  | { kind: 'route'; data: HistoricalRoute }
  | { kind: 'province'; data: ProvinceFeature }
  | { kind: 'territorial'; data: TerritorialPolygonFeature }
  | {
      kind: 'province_presidents';
      provinceName: string;
      region?: string;
      cabecera?: string;
      presidentes: PresidenteRD[];
      focusedPresidentId?: string;
    }
  | { kind: 'dossier_hito'; data: DossierHito }
  | { kind: 'mandato'; data: MandatoRD; presidente?: PresidenteRD };
