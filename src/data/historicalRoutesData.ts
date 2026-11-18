import type { AnimatedHistoricalRoute } from '../types/history';

export const ANIMATED_HISTORICAL_ROUTES: AnimatedHistoricalRoute[] = [
  {
    id: 'ruta-colon-costa-norte',
    title: 'Primer Viaje de Colón por la Costa Norte',
    subtitle: 'Navegación Atlántica de La Española',
    dates: 'Diciembre 1492 – Enero 1493',
    year: 1493,
    epoch: 'Descubrimiento',
    color: '#D4AF37',
    protagonists: ['Cristóbal Colón', 'Martín Alonso Pinzón', 'Cacique Guacanagarix'],
    summary:
      'Travesía costera de la flotilla colombina desde la bahía de San Nicolás y Monte Cristi hasta el Golfo de las Flechas en Samaná, registrando el primer enfrentamiento armado en el Caribe.',
    stops: [
      {
        order: 1,
        name: 'Fuerte de La Navidad (Bahía de Caracol)',
        date: '25 dic 1492',
        lat: 19.701,
        lng: -72.103,
        narrative:
          'Tras encallar la Santa María, Colón construye el primer asentamiento europeo con sus restos madereros en tierras de Guacanagarix.',
      },
      {
        order: 2,
        name: 'Monte Cristi (El Morro)',
        date: '4 ene 1493',
        lat: 19.893,
        lng: -71.653,
        narrative:
          'La Niña y la Pinta bordean el promontorio costero bautizado por el Almirante como Monte Cristi y recogen pepitas de oro en el río Yaquí.',
      },
      {
        order: 3,
        name: 'Costa de La Isabela y Puerto Plata',
        date: '9 ene 1493',
        lat: 19.832,
        lng: -70.691,
        narrative:
          'Colón denomina «Monte de Plata» a la montaña costera cubierta de bruma plateada y avista manatíes en la bahía.',
      },
      {
        order: 4,
        name: 'Cabo Francés Viejo / Costa Nordeste',
        date: '11 ene 1493',
        lat: 19.645,
        lng: -69.908,
        narrative:
          'Las carabelas siguen los acantilados calcáreos del nordeste en ruta hacia la gran bahía oriental.',
      },
      {
        order: 5,
        name: 'Golfo de las Flechas (Samaná)',
        date: '13 ene 1493',
        lat: 19.205,
        lng: -69.254,
        narrative:
          'Guerreros ciguayos defienden su litoral con arcos y flechas frente a los expedicionarios antes de que Colón zarpe rumbo a España.',
      },
    ],
  },
  {
    id: 'ruta-del-oro-1494',
    title: 'La Ruta del Oro (1494–1502)',
    subtitle: 'Eje Cordillera Septentrional – Cibao – Santo Domingo',
    dates: '1494 – 1502',
    year: 1494,
    epoch: 'Colonia',
    color: '#C5A059',
    protagonists: ['Cristóbal Colón', 'Alonso de Ojeda', 'Bartolomé Colón'],
    summary:
      'Red de fortificaciones, pasos de montaña y caminos reales trazados para conectar el puerto de La Isabela con las minas auríferas de Jánico, la Vega Real, Cotuí y la nueva capital del Ozama.',
    stops: [
      {
        order: 1,
        name: 'La Isabela (Base Costera)',
        date: 'Marzo 1494',
        lat: 19.8869,
        lng: -71.0785,
        narrative:
          'Parte la gran expedición armada hacia las sierras interiores del Cibao en pos del oro anunciado por los guías taínos.',
      },
      {
        order: 2,
        name: 'Paso de los Hidalgos',
        date: '12 mar 1494',
        lat: 19.696,
        lng: -70.955,
        narrative:
          'Ingenieros y caballeros abren a pico y hacha la primera calzada europea a través de la Cordillera Septentrional hacia el valle del Cibao.',
      },
      {
        order: 3,
        name: 'Fortaleza Santo Tomás de Jánico',
        date: '17 mar 1494',
        lat: 19.335,
        lng: -70.795,
        narrative:
          'Primera fortaleza del interior americano, levantada sobre el río Jánico para resguardar los lavaderos de oro frente a Caonabo.',
      },
      {
        order: 4,
        name: 'Concepción de La Vega',
        date: '1495',
        lat: 19.222,
        lng: -70.529,
        narrative:
          'Ciudad fortificada junto al Santo Cerro y principal casa de fundición aurífera de las Antillas durante el siglo XVI.',
      },
      {
        order: 5,
        name: 'Minas de Cotuí y Bonao',
        date: '1496 – 1500',
        lat: 19.052,
        lng: -70.149,
        narrative:
          'Yacimientos de oro y cobre explotados mediante encomiendas que abastecían las remesas hacia la metrópoli.',
      },
      {
        order: 6,
        name: 'Santo Domingo (Puerto del Ozama)',
        date: '1498 – 1502',
        lat: 18.4734,
        lng: -69.8832,
        narrative:
          'Terminal portuaria del eje transinsular donde el oro fundido en La Vega embarcaba hacia la Casa de Contratación de Sevilla.',
      },
    ],
  },
  {
    id: 'campana-restauradora-1863',
    title: 'Campaña Restauradora (1863)',
    subtitle: 'Ofensiva Libertadora de Capotillo a Santo Domingo',
    dates: 'Agosto – Octubre 1863',
    year: 1863,
    epoch: 'Restauración',
    color: '#9B2226',
    protagonists: ['Santiago Rodríguez', 'Benito Monción', 'Gregorio Luperón', 'Gaspar Polanco'],
    summary:
      'Marcha relámpago del Ejército Restaurador desde la frontera noroeste hasta el corazón del Cibao y los pasos hacia la capital, derribando el dominio colonial español.',
    stops: [
      {
        order: 1,
        name: 'Cerro de Capotillo (Grito de Independencia)',
        date: '16 ago 1863',
        lat: 19.4319,
        lng: -71.6819,
        narrative:
          'Catorce patriotas enarbolan la bandera tricolor dando inicio formal a la Guerra de la Restauración.',
      },
      {
        order: 2,
        name: 'Sabaneta y Guayubín',
        date: '18 ago 1863',
        lat: 19.665,
        lng: -71.402,
        narrative:
          'Las columnas patriotas toman los cuarteles de Sabaneta y Guayubín, multiplicando sus filas con campesinos cibaeños.',
      },
      {
        order: 3,
        name: 'Santiago de los Caballeros',
        date: '6–14 sep 1863',
        lat: 19.4508,
        lng: -70.7061,
        narrative:
          'Sitio victorioso a la Fortaleza San Luis y proclamación del Gobierno Provisorio de la República en Armas.',
      },
      {
        order: 4,
        name: 'Moca y Concepción de La Vega',
        date: 'Sep 1863',
        lat: 19.222,
        lng: -70.529,
        narrative:
          'Consolidación del Cibao central como retaguardia política y logística de la revolución nacional.',
      },
      {
        order: 5,
        name: 'Sillón de la Viuda (Cordillera Central)',
        date: 'Oct 1863',
        lat: 18.885,
        lng: -70.352,
        narrative:
          'Gregorio Luperón controla el paso cordillerano de Arroyo Bermejo y frena la contraofensiva de Pedro Santana.',
      },
      {
        order: 6,
        name: 'Cerco a Santo Domingo (San Carlos)',
        date: '1864 – 1865',
        lat: 18.478,
        lng: -69.904,
        narrative:
          'Las tropas restauradoras establecen campamentos en torno a la capital amurallada hasta el reembarque español en julio de 1865.',
      },
    ],
  },
  {
    id: 'ruta-constitucionalista-1965',
    title: 'Ruta Constitucionalista de Abril (1965)',
    subtitle: 'Eje Urbano de la Revolución Constitucionalista',
    dates: '24 – 28 de abril de 1965',
    year: 1965,
    epoch: 'Siglo XX',
    color: '#D4AF37',
    protagonists: ['Francisco Alberto Caamaño Deñó', 'Rafael Fernández Domínguez', 'Comandos Populares'],
    summary:
      'Recorrido estratégico de los batallones constitucionalistas y comandos cívico-militares en Santo Domingo durante los días decisivos de abril de 1965.',
    stops: [
      {
        order: 1,
        name: 'Campamento 16 de Agosto (Km 25 Autopista Duarte)',
        date: '24 abr 1965',
        lat: 18.5825,
        lng: -70.0714,
        narrative:
          'Sublevación de oficiales jóvenes exigiendo la restitución de la Constitución de 1963 y el regreso de Juan Bosch.',
      },
      {
        order: 2,
        name: 'Palacio Nacional',
        date: '25 abr 1965',
        lat: 18.4743,
        lng: -69.8981,
        narrative:
          'Toma de la sede presidencial y juramentación del gobierno provisional de José Rafael Molina Ureña.',
      },
      {
        order: 3,
        name: 'Puente Juan Pablo Duarte (Batalla Decisiva)',
        date: '27 abr 1965',
        lat: 18.4847,
        lng: -69.8781,
        narrative:
          'Victoria épica de Francisco Alberto Caamaño y el pueblo armado al detener el avance de tanques e infantería sobre el río Ozama.',
      },
      {
        order: 4,
        name: 'Parque Independencia y El Conde',
        date: '28 abr 1965',
        lat: 18.4722,
        lng: -69.8926,
        narrative:
          'Organización de los comandos constitucionalistas populares en el centro histórico de Santo Domingo.',
      },
      {
        order: 5,
        name: 'Fortaleza Ozama y Ciudad Nueva',
        date: '30 abr 1965',
        lat: 18.4729,
        lng: -69.8819,
        narrative:
          'Caída de la Fortaleza Ozama y consolidación de la Zona Constitucionalista en defensa de la soberanía nacional.',
      },
    ],
  },
];
