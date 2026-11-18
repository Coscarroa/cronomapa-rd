import type { VintageMapItem } from '../types/history';
import mapaEspaniola1560Url from '../assets/images/mapa_espaniola_1560_1794524558685.jpg';
import planoSantoDomingo1650Url from '../assets/images/plano_santo_domingo_1650_1794524559186.jpg';

export const VINTAGE_MAPS_DATA: VintageMapItem[] = [
  {
    id: 'mapa-espaniola-1516',
    title: 'Carta de La Española (Pedro Mártir / Ramusio, s. XVI)',
    author: 'Pedro Mártir de Anglería / Giovanni Battista Ramusio',
    year: 1516,
    yearLabel: '1516 / 1565',
    archive: 'Colección Indias Occidentales · Dominio Público',
    description:
      'Una de las primeras representaciones impresas de la isla de La Española tras las expediciones colombinas y las fundaciones de Santo Domingo, Concepción de La Vega, Azua e Higüey.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/8/83/1565_Hispaniola_Ramusio_Delle_Navigationi_vol3_p44.png',
    fallbackUrl: mapaEspaniola1560Url,
    bounds: {
      north: 20.18,
      south: 17.35,
      east: -68.18,
      west: -74.55,
    },
    defaultOpacity: 0.72,
  },
  {
    id: 'mapa-bellin-1764',
    title: "Carte de l'Isle de Saint-Domingue (Jacques-Nicolas Bellin)",
    author: 'Jacques-Nicolas Bellin · Dépôt des Cartes de la Marine',
    year: 1764,
    yearLabel: '1764',
    archive: 'Bibliothèque Nationale de France (BnF) · Dominio Público',
    description:
      'Carta náutica e hidrográfica del siglo XVIII que cartografía con notable precisión bahías, cordilleras, ríos fronterizos y puertos de ambos lados de la isla en vísperas del Tratado de Aranjuez.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/5/53/Carte_de_l%27isle_de_Saint-Domingue_dress%C3%A9e_au_Depost_des_Cartes_et_Plans_de_la_Marine..._-_par_le_Sr._Bellin..._1764_-_btv1b59726483.jpg',
    fallbackUrl: mapaEspaniola1560Url,
    bounds: {
      north: 20.14,
      south: 17.42,
      east: -68.22,
      west: -74.58,
    },
    defaultOpacity: 0.7,
  },
  {
    id: 'plano-tomas-lopez-1785',
    title: 'Plano de la Plaza y Ciudad de Santo Domingo (Tomás López)',
    author: 'Don Tomás López, Geógrafo de los Dominios de S.M.',
    year: 1785,
    yearLabel: '1785',
    archive: 'Bibliothèque Nationale de France / Real Academia de la Historia',
    description:
      'Plano urbano fortificado de Santo Domingo de Guzmán en el siglo XVIII: muralla perimetral, Fortaleza Ozama, Catedral Primada, Alcázar de Colón, baluartes y desembocadura del río Ozama.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/b/b0/Plano_de_la_plaza_y_ciudad_de_Santo_Domingo%2C_capital_de_la_isla_Espa%C3%B1ola_-_por_Don_Tomas_Lopez..._-_btv1b8492174t.jpg',
    fallbackUrl: planoSantoDomingo1650Url,
    bounds: {
      north: 18.4855,
      south: 18.4635,
      east: -69.8735,
      west: -69.9015,
    },
    defaultOpacity: 0.78,
  },
  {
    id: 'mapa-casimiro-moya-1905',
    title: 'Mapa de la República Dominicana (Casimiro Nemesio de Moya)',
    author: 'Casimiro Nemesio de Moya',
    year: 1905,
    yearLabel: '1905',
    archive: 'World Digital Library / Biblioteca del Congreso · Dominio Público',
    description:
      'Obra cumbre de la cartografía republicana dominicana de principios del siglo XX, con levantamiento detallado de provincias, comunes, ferrocarriles, vías reales y orografía nacional.',
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/commons/9/90/Map_of_the_Dominican_Republic_WDL11320.png',
    fallbackUrl: mapaEspaniola1560Url,
    bounds: {
      north: 20.06,
      south: 17.44,
      east: -68.26,
      west: -72.12,
    },
    defaultOpacity: 0.72,
  },
];
