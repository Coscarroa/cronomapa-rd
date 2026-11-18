import type { AnimatedHistoricalRoute } from '../types/history';

export const ANIMATED_HISTORICAL_ROUTES: AnimatedHistoricalRoute[] = [
  {
    id: 'ruta-resistencia-taina-1492',
    title: 'Ruta de la Resistencia Taína y Conquista (1492–1533)',
    subtitle: 'De los santuarios rupestres y plazas de Anacaona al bastión invicto de Enriquillo en Bahoruco',
    dates: '1492 – 1533',
    year: 1492,
    epoch: 'Época Taína',
    color: '#D97706',
    protagonists: [
      'Cacique Enriquillo (Guarocuya)',
      'Cacica Anacaona',
      'Cacique Caonabo',
      'Guacanagarix',
    ],
    summary:
      'Recorrido por los principales centros ceremoniales, cacicazgos y escenarios de resistencia indígena frente a la conquista española en Quisqueya.',
    stops: [
      {
        order: 1,
        name: 'Cuevas del Pomier (Santuario Rupestre Taíno)',
        date: 'Pre-1492',
        lat: 18.4686,
        lng: -70.1353,
        narrative:
          'Complejo cavernario sagrado en San Cristóbal con más de 4,000 pictografías y petroglifos donde los behiques celebraban rituales espirituales a los cemíes.',
      },
      {
        order: 2,
        name: 'La Vega Real / Santo Cerro (Cacicazgo de Maguá)',
        date: 'Marzo de 1495',
        lat: 19.2228,
        lng: -70.5289,
        narrative:
          'En el corazón del Valle de la Vega Real tuvo lugar el primer gran enfrentamiento abierto entre la confederación de caciques taínos y las huestes europeas.',
      },
      {
        order: 3,
        name: 'Corral de los Indios (Plaza Ceremonial de Anacaona y Caonabo)',
        date: '1492 – 1503',
        lat: 18.8317,
        lng: -71.2358,
        narrative:
          'Gran batey circular megalítico en San Juan de la Maguana, centro ceremonial de los areítos y símbolo de la resistencia encabezada por Caonabo y Anacaona.',
      },
      {
        order: 4,
        name: 'Sierra de Bahoruco (Rebelión del Cacique Enriquillo)',
        date: '1519 – 1533',
        lat: 18.1667,
        lng: -71.4167,
        narrative:
          'Durante 14 años el cacique Enriquillo mantuvo una guerrilla invicta en las montañas del Bahoruco hasta lograr el primer tratado de paz y libertad indígena de América (1533).',
      },
    ],
  },
  {
    id: 'ruta-independencia-1844',
    title: 'Ruta de la Independencia Nacional (1844)',
    subtitle: 'Del trabucazo del 27 de febrero en la Puerta del Conde a las victorias de Azua y Santiago',
    dates: '27 de febrero – 30 de marzo de 1844',
    year: 1844,
    epoch: 'Independencia 1844',
    color: '#3B82F6',
    protagonists: [
      'Juan Pablo Duarte',
      'Francisco del Rosario Sánchez',
      'Matías Ramón Mella',
      'Antonio Duvergé',
      'José María Imbert',
    ],
    summary:
      'Itinerario patriótico de la proclamación de la República Dominicana en Santo Domingo y las campañas defensivas que sellaron la soberanía nacional en el Sur y el Cibao.',
    stops: [
      {
        order: 1,
        name: 'Puerta del Conde / Altar de la Patria (Santo Domingo)',
        date: '27 de febrero de 1844',
        lat: 18.4731,
        lng: -69.8931,
        narrative:
          'Tras el trabucazo de Mella en la Puerta de la Misericordia, Francisco del Rosario Sánchez iza por primera vez la Bandera Trinitaria en el Baluarte del Conde.',
      },
      {
        order: 2,
        name: 'San Cristóbal (Movilización del Sur y Sede Constituyente)',
        date: 'Marzo – Noviembre de 1844',
        lat: 18.4165,
        lng: -70.1095,
        narrative:
          'Paso estratégico de las columnas patriotas hacia el frente sur y sede donde se proclamó la primera Constitución de la República el 6 de noviembre de 1844.',
      },
      {
        order: 3,
        name: 'Batalla del 19 de Marzo (Azua de Compostela)',
        date: '19 de marzo de 1844',
        lat: 18.4539,
        lng: -70.7347,
        narrative:
          'Primera gran victoria militar defensiva de la República: la artillería de Francisco Soñé y las cargas de Antonio Duvergé y Pedro Santana frenan la invasión en el Sur.',
      },
      {
        order: 4,
        name: 'Batalla del 30 de Marzo (Fuertes Dios, Patria y Libertad, Santiago)',
        date: '30 de marzo de 1844',
        lat: 19.4517,
        lng: -70.7042,
        narrative:
          'El Ejército del Norte dirigido por José María Imbert, Fernando Valerio y Juana Saltitopa derrota decisivamente la columna norte en Santiago de los Caballeros.',
      },
    ],
  },
  {
    id: 'ruta-restauracion-1863',
    title: 'Ruta de la Guerra de la Restauración (1863–1865)',
    subtitle: 'Del Grito de Capotillo en Dajabón al Sitio de la Fortaleza San Luis y el triunfo de la Segunda República',
    dates: '16 de agosto de 1863 – julio de 1865',
    year: 1863,
    epoch: 'Restauración',
    color: '#E63946',
    protagonists: [
      'Gregorio Luperón',
      'Santiago Rodríguez',
      'Benito Monción',
      'Gaspar Polanco',
      'José Cabrera',
    ],
    summary:
      'Avance relámpago de las columnas guerrilleras restauradoras desde el cerro de Capotillo a través de la Línea Noroeste hasta la toma de Santiago y la recuperación de la soberanía.',
    stops: [
      {
        order: 1,
        name: 'Monumento al Grito de Capotillo (Dajabón)',
        date: '16 de agosto de 1863',
        lat: 19.4319,
        lng: -71.6853,
        narrative:
          'Catorce patriotas liderados por Santiago Rodríguez, Benito Monción y José Cabrera izan el pabellón tricolor en el cerro de Capotillo contra la Anexión a España.',
      },
      {
        order: 2,
        name: 'Sabaneta y Guayubín (Alzamiento de la Línea Noroeste)',
        date: '17 – 20 de agosto de 1863',
        lat: 19.4775,
        lng: -71.3419,
        narrative:
          'Las columnas patriotas toman Sabaneta y Guayubín, sumando miles de campesinos y jinetes a la insurrección restauradora rumbo al corazón del Cibao.',
      },
      {
        order: 3,
        name: 'Fortaleza San Luis (Sitio e Incendio de Santiago)',
        date: '6 – 14 de septiembre de 1863',
        lat: 19.4492,
        lng: -70.7031,
        narrative:
          'Bajo el mando de Gaspar Polanco y Gregorio Luperón, las fuerzas restauradoras sitian la Fortaleza San Luis e instalan el Gobierno Provisorio Restaurador.',
      },
      {
        order: 4,
        name: 'Puerto Plata (Repliegue Español y Restauración de la Soberanía)',
        date: 'Septiembre de 1863 – Julio de 1865',
        lat: 19.7934,
        lng: -70.6884,
        narrative:
          'Las tropas anexionistas quedan reducidas al puerto atlántico hasta la orden de evacuación total de julio de 1865, consolidando la Segunda República.',
      },
    ],
  },
];
