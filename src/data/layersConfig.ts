import type { BaseMapConfig, HistoricalLayer } from '../types/history';
import mapaEspaniola1560Url from '../assets/images/mapa_espaniola_1560_1794524558685.jpg';
import planoSantoDomingo1650Url from '../assets/images/plano_santo_domingo_1650_1794524559186.jpg';
import archivoColonialUrl from '../assets/images/archivo_colonial_espaniola_1794524559887.jpg';
import archivoIndependenciaUrl from '../assets/images/archivo_independencia_1844_1794524560155.jpg';
import archivoContemporaneoUrl from '../assets/images/archivo_contemporaneo_rd_1794524560563.jpg';

export const MAP_INITIAL_CENTER: [number, number] = [18.7357, -70.1627];
export const MAP_INITIAL_ZOOM = 8;
export const MAP_MIN_ZOOM = 7;
export const MAP_MAX_ZOOM = 18;

// Restrict panning to the Greater Antilles / Hispaniola maritime basin
export const HISPANIOLA_MAX_BOUNDS: [[number, number], [number, number]] = [
  [16.5, -75.8],
  [21.2, -67.2],
];

export const ANTIQUE_OVERLAYS = {
  espaniola_1560: {
    url: mapaEspaniola1560Url,
    bounds: [
      [17.28, -74.68],
      [20.22, -68.12],
    ] as [[number, number], [number, number]],
    titulo: 'Portolano de La Española (c. 1560)',
    fuente: 'Archivo Cartográfico Histórico · Colección Indias Occidentales',
  },
  ciudad_colonial_1650: {
    url: planoSantoDomingo1650Url,
    bounds: [
      [18.463, -69.901],
      [18.485, -69.873],
    ] as [[number, number], [number, number]],
    titulo: 'Plano Fortificado de Santo Domingo (c. 1675)',
    fuente: 'Ciudad Colonial · Desembocadura del Río Ozama',
  },
};

export const EVENT_ASSET_MAP: Record<string, string> = {
  '/src/assets/images/archivo_colonial_espaniola_1794524559887.jpg': archivoColonialUrl,
  '/src/assets/images/archivo_independencia_1844_1794524560155.jpg': archivoIndependenciaUrl,
  '/src/assets/images/archivo_contemporaneo_rd_1794524560563.jpg': archivoContemporaneoUrl,
};

export const BASE_MAPS: BaseMapConfig[] = [
  {
    id: 'realistic_relief',
    nombre: 'Relieve Topográfico Hiperrealista',
    subtitulo: '3D Hillshade + Físico (Cordilleras y batimetría)',
    maxZoom: 16,
  },
  {
    id: 'satellite_hybrid',
    nombre: 'Satélite Híbrido Realista',
    subtitulo: 'Ortofoto satelital + etiquetas territoriales',
    maxZoom: 18,
  },
  {
    id: 'physical_historical',
    nombre: 'Terreno Físico Histórico',
    subtitulo: 'Geografía natural pura sin fronteras modernas',
    maxZoom: 15,
  },
  {
    id: 'parchment',
    nombre: 'Cartografía Antigua / Pergamino',
    subtitulo: 'Tono archivo sepia para rutas y batallas',
    maxZoom: 18,
  },
];

export const INITIAL_LAYERS: HistoricalLayer[] = [
  {
    id: 'provincias_actuales',
    nombre: 'División Política Actual',
    descripcion: '31 provincias y el Distrito Nacional por macrorregión',
    grupo: 'poligonos',
    visible: true,
    opacidad: 0.85,
    colorIndicador: '#1B3B82',
  },
  {
    id: 'cacicazgos_1492',
    nombre: 'Cacicazgos Taínos (1492)',
    descripcion: 'Marién, Maguá, Maguana, Jaragua e Higüey',
    grupo: 'poligonos',
    visible: false,
    opacidad: 0.72,
    colorIndicador: '#B45309',
  },
  {
    id: 'despoblacion_osorio_1606',
    nombre: 'Despoblación de Osorio (1606)',
    descripcion: 'Franja norte y oeste arrasada por la Corona',
    grupo: 'poligonos',
    visible: false,
    opacidad: 0.75,
    colorIndicador: '#9A3412',
  },
  {
    id: 'tratado_aranjuez_1777',
    nombre: 'Tratado de Aranjuez (1777)',
    descripcion: 'Saint-Domingue Francés vs. Santo Domingo Español',
    grupo: 'poligonos',
    visible: false,
    opacidad: 0.75,
    colorIndicador: '#1E40AF',
  },
  {
    id: 'unificacion_haitiana_1822',
    nombre: 'Unificación de la Isla (1822–1844)',
    descripcion: 'Dominio unitario bajo la República de Haití',
    grupo: 'poligonos',
    visible: false,
    opacidad: 0.65,
    colorIndicador: '#C83728',
  },
  {
    id: 'provincias_1844',
    nombre: '5 Provincias Originales (1844)',
    descripcion: 'Fusión Turf.js: Santo Domingo, Santiago, La Vega, Azua y El Seibo',
    grupo: 'poligonos',
    visible: false,
    opacidad: 0.72,
    colorIndicador: '#1D3557',
  },
  {
    id: 'presidentes_provincia',
    nombre: 'Presidentes por Provincia (1844–2026)',
    descripcion: 'Mapa coroplético y retratos según provincia natal',
    grupo: 'geopolitica',
    visible: true,
    opacidad: 0.95,
    colorIndicador: '#B45309',
  },
  {
    id: 'dossiers_regimenes',
    nombre: 'Dossiers: Trujillo y Balaguer (1930–1996)',
    descripcion: '15 hitos geolocalizados de ambos regímenes del s. XX',
    grupo: 'geopolitica',
    visible: false,
    opacidad: 0.95,
    colorIndicador: '#991B1B',
  },
  {
    id: 'rutas_historicas',
    nombre: 'Rutas Históricas',
    descripcion: 'Colón, Paso de los Hidalgos, Osorio, Independencia y Restauración',
    grupo: 'rutas',
    visible: true,
    opacidad: 0.95,
    colorIndicador: '#C83728',
  },
  {
    id: 'mapa_antiguo_espaniola',
    nombre: 'Carta Portolana La Española (s. XVI)',
    descripcion: 'Cartografía colonial escaneada sobre la isla',
    grupo: 'antiguos',
    visible: false,
    opacidad: 0.65,
    colorIndicador: '#78350F',
    focusBounds: [
      [17.45, -72.2],
      [20.05, -68.25],
    ],
  },
  {
    id: 'plano_ciudad_colonial',
    nombre: 'Plano Ciudad Colonial (c. 1675)',
    descripcion: 'Trazado amurallado histórico de Santo Domingo',
    grupo: 'antiguos',
    visible: false,
    opacidad: 0.75,
    colorIndicador: '#78350F',
    focusBounds: [
      [18.463, -69.901],
      [18.485, -69.873],
    ],
  },
  {
    id: 'eventos_historicos',
    nombre: 'Hechos Históricos y Políticos',
    descripcion: '40 hitos documentados (1492–2020)',
    grupo: 'puntos',
    visible: true,
    opacidad: 1,
    colorIndicador: '#1B3B82',
  },
  {
    id: 'monumentos_coloniales',
    nombre: 'Monumentos y Sitios Coloniales',
    descripcion: '15 monumentos con datos Wikipedia (Grounding) y fotos históricas',
    grupo: 'puntos',
    visible: true,
    opacidad: 1,
    colorIndicador: '#D4AF37',
  },
];
