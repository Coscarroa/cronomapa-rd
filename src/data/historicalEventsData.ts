import type { HistoricalMilestone } from '../types/history';

export const HISTORICAL_MILESTONES: HistoricalMilestone[] = [
  // COLONIA
  {
    id: 'hito-la-navidad-1492',
    title: 'Desembarco de Colón y Fuerte de La Navidad',
    date: '25 de diciembre de 1492',
    year: 1492,
    epoch: 'Colonia',
    type: 'fundacion',
    lat: 19.701,
    lng: -72.103,
    province: 'Costa Norte (Bahía de Caracol / Marién)',
    protagonists: ['Cristóbal Colón', 'Cacique Guacanagarix'],
    summary:
      'Tras encallar la nao Santa María, Colón erige con sus maderos el primer asentamiento europeo en América en tierras del cacique Guacanagarix.',
    chronicle:
      'En la Nochebuena de 1492, la Santa María encalló frente a la costa norte del cacicazgo de Marién. Con ayuda de los taínos de Guacanagarix se rescataron provisiones y maderas para levantar el Fuerte de La Navidad, donde quedaron treinta y nueve tripulantes antes de ser destruido en 1493 tras los abusos contra las comunidades locales.',
    impact: 'Inaugura la presencia europea permanente y el contacto inicial entre Europa y el Caribe.',
    source: 'Diario de a Bordo de Cristóbal Colón · Fray Bartolomé de las Casas',
  },
  {
    id: 'hito-la-isabela-1494',
    title: 'Fundación de La Isabela',
    date: '6 de enero de 1494',
    year: 1494,
    epoch: 'Colonia',
    type: 'fundacion',
    lat: 19.8869,
    lng: -71.0785,
    province: 'Puerto Plata',
    protagonists: ['Cristóbal Colón', 'Fray Bernardo Boyl', 'Diego Colón'],
    summary:
      'Primera ciudad formal del Nuevo Mundo con cabildo, iglesia parroquial y astillero en la desembocadura del río Bajabonico.',
    chronicle:
      'Durante su segundo viaje, Colón fundó La Isabela con diecisiete naves y más de mil doscientos colonos. Allí se celebró la primera misa solemne del continente el 6 de enero de 1494, se estableció el primer ayuntamiento americano y partieron las expediciones hacia el interior de la isla.',
    impact: 'Primer centro administrativo, religioso y municipal europeo en las Américas.',
    source: 'Archivo General de Indias · Crónicas de Pedro Mártir de Anglería',
  },
  {
    id: 'hito-santo-domingo-1498',
    title: 'Fundación de Santo Domingo de Guzmán',
    date: '5 de agosto de 1498',
    year: 1498,
    epoch: 'Colonia',
    type: 'fundacion',
    lat: 18.4734,
    lng: -69.8832,
    province: 'Distrito Nacional',
    protagonists: ['Bartolomé Colón', 'Nicolás de Ovando'],
    summary:
      'Primada de América en la margen del río Ozama, sede de la primera Real Audiencia, catedral y universidad del continente.',
    chronicle:
      'Bartolomé Colón estableció la villa de Nueva Isabela en la ribera oriental del Ozama en 1498 y, tras el huracán de 1502, Nicolás de Ovando la trasladó a la orilla occidental con trazado hipodámico de cuadrícula renacentista.',
    impact: 'Capital histórica de La Española y modelo urbanístico de las ciudades hispanoamericanas.',
    source: 'Historia General y Natural de las Indias · Gonzalo Fernández de Oviedo',
  },
  {
    id: 'hito-enriquillo-1519',
    title: 'Rebelión del Cacique Enriquillo en Bahoruco',
    date: '1519 – 1533',
    year: 1519,
    epoch: 'Colonia',
    type: 'batalla',
    lat: 18.485,
    lng: -71.418,
    province: 'Baoruco / Independencia',
    protagonists: ['Cacique Enriquillo (Guarocuya)', 'Mencía', 'Francisco de Barrionuevo'],
    summary:
      'Alzamiento armado taíno de catorce años en las sierras del Bahoruco que culminó en el primer tratado de paz y libertad indígena en América.',
    chronicle:
      'Educado en el convento franciscano de Verapaz y despojado de sus tierras y dignidad, Enriquillo encabezó una guerrilla invicta en las montañas del Bahoruco desde 1519 hasta 1533, obligando a la Corona de Carlos V a negociar capitulaciones de libertad.',
    impact: 'Primer movimiento de liberación anticolonial triunfante del Nuevo Mundo.',
    source: 'Manuel de Jesús Galván · Documentos del Archivo de Simancas',
  },
  {
    id: 'hito-osorio-1605',
    title: 'Devastaciones de Osorio',
    date: '1605 – 1606',
    year: 1605,
    epoch: 'Colonia',
    type: 'proclamacion',
    lat: 19.648,
    lng: -70.692,
    province: 'Puerto Plata / Monte Cristi / Bayajá',
    protagonists: ['Antonio de Osorio', 'Hernando de Montoro'],
    summary:
      'Despoblamiento forzoso de las villas del norte y oeste para erradicar el contrabando, reubicando la población en Monte Plata y Bayaguana.',
    chronicle:
      'Por cédula real ejecutada por el gobernador Antonio de Osorio, se incendiaron Monte Cristi, Puerto Plata, Bayajá y La Yaguana. La medida arruinó la economía ganadera norteña y dejó la banda occidental despoblada, facilitando la penetración de bucaneros franceses en Tortuga.',
    impact: 'Origen geopolítico de la división de la isla en dos colonias.',
    source: 'Frank Moya Pons · Manual de Historia Dominicana',
  },
  {
    id: 'hito-palo-hincado-1808',
    title: 'Batalla de Palo Hincado',
    date: '7 de noviembre de 1808',
    year: 1808,
    epoch: 'Colonia',
    type: 'batalla',
    lat: 18.7712,
    lng: -69.0389,
    province: 'El Seibo',
    protagonists: ['Juan Sánchez Ramírez', 'Ciriaco Ramírez', 'Louis Ferrand'],
    summary:
      'Victoria decisiva de los criollos dominicanos contra el ejército napoleónico de ocupación en las sabanas de El Seibo.',
    chronicle:
      'Organizados por el hacendado cotuisano Juan Sánchez Ramírez, lanceros y milicianos criollos derrotaron en carga frontal a las tropas francesas del general Ferrand. El triunfo abrió el sitio de Santo Domingo y puso fin al dominio francés en la parte oriental.',
    impact: 'Reafirmación de la identidad hispano-criolla dominicana y fin de la Era de Francia.',
    source: 'Diario de la Reconquista · Juan Sánchez Ramírez',
  },

  // 1844 (INDEPENDENCIA)
  {
    id: 'hito-puerta-del-conde-1844',
    title: 'Proclamación de la Independencia en la Puerta del Conde',
    date: '27 de febrero de 1844',
    year: 1844,
    epoch: '1844',
    type: 'proclamacion',
    lat: 18.4722,
    lng: -69.8926,
    province: 'Distrito Nacional',
    protagonists: [
      'Matías Ramón Mella',
      'Francisco del Rosario Sánchez',
      'Juan Pablo Duarte',
      'María Trinidad Sánchez',
    ],
    summary:
      'Trabucazo de Mella e izamiento de la Bandera Trinitaria por Sánchez en el Baluarte del Conde, proclamando la República Dominicana.',
    chronicle:
      'En la noche del 27 de febrero de 1844, los trinitarios y aliados tomaron la Puerta de la Misericordia y la Puerta del Conde. El disparo del trabuco de Matías Ramón Mella selló el alzamiento y al amanecer Francisco del Rosario Sánchez izó la bandera diseñada por Juan Pablo Duarte.',
    impact: 'Nacimiento soberano de la República Dominicana como Estado independiente.',
    source: 'Manifiesto del 16 de Enero de 1844 · Archivo General de la Nación',
  },
  {
    id: 'hito-19-de-marzo-1844',
    title: 'Batalla del 19 de Marzo (Azua)',
    date: '19 de marzo de 1844',
    year: 1844,
    epoch: '1844',
    type: 'batalla',
    lat: 18.4539,
    lng: -70.7347,
    province: 'Azua',
    protagonists: ['Pedro Santana', 'Antonio Duvergé', 'Francisco Soñé', 'Vicente Noble'],
    summary:
      'Primera gran victoria militar de la República Dominicana frente al ejército haitiano de Charles Hérard en el frente sur.',
    chronicle:
      'Veintiún días después del 27 de febrero, las tropas dominicanas atrincheradas en Azua con artillería dirigida por Francisco Soñé y el ímpetu de Antonio Duvergé y Pedro Santana repelieron la ofensiva principal del ejército invasor.',
    impact: 'Consolidó militarmente la separación nacional en la región sur.',
    source: 'Emilio Rodríguez Demorizi · Guerra Dominico-Haitiana',
  },
  {
    id: 'hito-30-de-marzo-1844',
    title: 'Batalla del 30 de Marzo (Santiago)',
    date: '30 de marzo de 1844',
    year: 1844,
    epoch: '1844',
    type: 'batalla',
    lat: 19.4517,
    lng: -70.697,
    province: 'Santiago',
    protagonists: ['José María Imbert', 'Fernando Valerio', 'Juana Saltitopa'],
    summary:
      'Triunfo decisivo del Ejército del Norte en los fuertes Libertad, Patria y Dios de Santiago de los Caballeros.',
    chronicle:
      'Bajo el mando estratégico del general José María Imbert, con la célebre carga al machete de los andulleros de Sabana Iglesia guiados por Fernando Valerio y el coraje de Juana Saltitopa, las fuerzas cibaeñas derrotaron la columna norte de Pierrot.',
    impact: 'Aseguró el valle del Cibao y consolidó la soberanía nacional.',
    source: 'Academia Dominicana de la Historia · Documentos de 1844',
  },
  {
    id: 'hito-constitucion-1844',
    title: 'Constitución de San Cristóbal (5 Provincias)',
    date: '6 de noviembre de 1844',
    year: 1844,
    epoch: '1844',
    type: 'proclamacion',
    lat: 18.4165,
    lng: -70.1095,
    province: 'San Cristóbal',
    protagonists: ['Buenaventura Báez', 'Manuel María Valencia', 'Tomás Bobadilla'],
    summary:
      'Primera Carta Magna de la República Dominicana, que estructuró el territorio nacional en cinco provincias originales.',
    chronicle:
      'Reunidos en San Cristóbal, los diputados constituyentes promulgaron el pacto fundamental republicano el 6 de noviembre de 1844, dividiendo el país en Santo Domingo, Santiago, Concepción de La Vega, Compostela de Azua y Santa Cruz de El Seibo.',
    impact: 'Fundamento jurídico e institucional de la Primera República.',
    source: 'Colección de Leyes, Decretos y Resoluciones · 1844',
  },

  // RESTAURACIÓN
  {
    id: 'hito-capotillo-1863',
    title: 'Grito de Capotillo e Inicio de la Restauración',
    date: '16 de agosto de 1863',
    year: 1863,
    epoch: 'Restauración',
    type: 'batalla',
    lat: 19.4319,
    lng: -71.6819,
    province: 'Dajabón',
    protagonists: [
      'Santiago Rodríguez',
      'Benito Monción',
      'Gregorio Luperón',
      'José Cabrera',
    ],
    summary:
      'Catorce patriotas izan el pabellón tricolor en el cerro de Capotillo, desencadenando la Guerra de la Restauración contra la Anexión a España.',
    chronicle:
      'Tras la Anexión proclamada por Pedro Santana en 1861, Santiago Rodríguez, Benito Monción, Pedro Antonio Pimentel y sus compañeros cruzaron la frontera y levantaron la bandera dominicana en Capotillo el 16 de agosto de 1863, encendiendo la guerra de guerrillas en todo el Cibao.',
    impact: 'Inicio de la epopeya anticolonial que restauró la soberanía nacional.',
    source: 'Gregorio Luperón · Notas Autobiográficas y Apuntes Históricos',
  },
  {
    id: 'hito-sitio-santiago-1863',
    title: 'Batalla e Incendio de Santiago (1863)',
    date: '6 de septiembre de 1863',
    year: 1863,
    epoch: 'Restauración',
    type: 'batalla',
    lat: 19.4508,
    lng: -70.7061,
    province: 'Santiago',
    protagonists: ['Gaspar Polanco', 'Gregorio Luperón', 'Ulises Espaillat'],
    summary:
      'Asalto general restaurador a la Fortaleza San Luis que obligó a la retirada española hacia Puerto Plata y permitió instalar el Gobierno Provisorio.',
    chronicle:
      'Con más de seis mil combatientes dirigidos por Gaspar Polanco y Gregorio Luperón, los restauradores sitiaron a las fuerzas españolas de Buceta en la Fortaleza San Luis. El incendio de la ciudad impidió la defensa realista y abrió paso al Acta de Independencia del 14 de septiembre.',
    impact: 'Establecimiento del Gobierno Restaurador de Santiago y punto de inflexión militar.',
    source: 'Roberto Cassá · Historia Social y Económica de la RD',
  },
  {
    id: 'hito-la-canela-1864',
    title: 'Batalla de La Canela',
    date: '4 de diciembre de 1864',
    year: 1864,
    epoch: 'Restauración',
    type: 'batalla',
    lat: 18.2345,
    lng: -71.0985,
    province: 'Barahona / Neiba',
    protagonists: ['José María Cabral', 'Eusebio Puello', 'Timoteo Ogando'],
    summary:
      'Victoria fulminante del Ejército Restaurador del Sur comandado por José María Cabral sobre las tropas coloniales en El Canelo.',
    chronicle:
      'En los campos próximos a Cambronal y El Canelo, la caballería e infantería de José María Cabral derrotaron decisivamente la columna realista del Sur, cerrando el cerco militar contra la Anexión.',
    impact: 'Consolidó el triunfo restaurador en el sur y aceleró el decreto de abandono español de 1865.',
    source: 'Archivo Histórico de la Restauración · 1863–1865',
  },

  // SIGLO XX
  {
    id: 'hito-barranquita-1916',
    title: 'Batalla de La Barranquita',
    date: '3 de julio de 1916',
    year: 1916,
    epoch: 'Siglo XX',
    type: 'batalla',
    lat: 19.578,
    lng: -71.112,
    province: 'Valverde',
    protagonists: ['Carlos Daniel', 'Máximo Cabral', 'Pancho Peña'],
    summary:
      'Heroica resistencia de patriotas cibaeños frente al avance de los marines estadounidenses hacia Santiago durante la Primera Ocupación.',
    chronicle:
      'En las lomas de La Barranquita, entre Guayacanes y Mao, unos ochenta combatientes dominicanos mal armados enfrentaron a fuerzas muy superiores del Cuerpo de Marines de los Estados Unidos, convirtiéndose en símbolo eterno de dignidad nacional.',
    impact: 'Referente moral de la soberanía dominicana ante la intervención de 1916–1924.',
    source: 'Museo de Historia y Geografía · Archivo de Mao',
  },
  {
    id: 'hito-ajusticiamiento-1961',
    title: 'Ajusticiamiento de Trujillo (Autopista 30 de Mayo)',
    date: '30 de mayo de 1961',
    year: 1961,
    epoch: 'Siglo XX',
    type: 'proclamacion',
    lat: 18.4309,
    lng: -69.9612,
    province: 'Distrito Nacional',
    protagonists: [
      'Antonio de la Maza',
      'Antonio Imbert Barrera',
      'Juan Tomás Díaz',
      'Salvador Estrella Sadhalá',
    ],
    summary:
      'Un comando de conjurados intercepta y da muerte al dictador Rafael Leónidas Trujillo en el kilómetro 9 de la carretera hacia San Cristóbal.',
    chronicle:
      'La noche del 30 de mayo de 1961 culminó la conspiración cívico-militar que puso fin a treinta y un años de tiranía trujillista, abriendo el camino hacia el retorno de los exiliados y las primeras elecciones libres en 1962.',
    impact: 'Fin de la Era de Trujillo y apertura del proceso de transición democrática.',
    source: 'Museo Memorial de la Resistencia Dominicana',
  },
  {
    id: 'hito-puente-duarte-1965',
    title: 'Batalla del Puente Duarte — Revolución de Abril',
    date: '27 de abril de 1965',
    year: 1965,
    epoch: 'Siglo XX',
    type: 'batalla',
    lat: 18.4847,
    lng: -69.8781,
    province: 'Distrito Nacional',
    protagonists: ['Francisco Alberto Caamaño Deñó', 'Rafael Fernández Domínguez', 'Pueblo Constitucionalista'],
    summary:
      'Militares constitucionalistas y comandos populares defienden el Puente Duarte contra tanques golpistas para restituir la Constitución de 1963.',
    chronicle:
      'Tras el levantamiento del 24 de abril en favor del retorno de Juan Bosch y la vigencia de la Constitución democrática de 1963, combatientes civiles y militares encabezados por el coronel Francisco Alberto Caamaño derrotaron la columna blindada de San Isidro en el Puente Duarte.',
    impact: 'Gesta cívico-militar emblemática por la constitucionalidad y la autodeterminación.',
    source: 'Fundación Caamaño · Historia de la Revolución de Abril',
  },
];
