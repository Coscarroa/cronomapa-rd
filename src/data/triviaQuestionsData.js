/**
 * Banco de Preguntas para el "Desafío Rápido en Clase (Trivia PDI)"
 * Alineado con el Diseño Curricular de Ciencias Sociales del MINERD (República Dominicana).
 * Incluye 24 preguntas divididas por época histórica con coordenadas geográficas vinculadas.
 */

export const TRIVIA_EPOCH_OPTIONS = [
  { id: 'all', label: 'Repaso General (Todas las Épocas)', shortLabel: 'Mixto' },
  { id: '1492', label: '1492 · Cacicazgos Taínos y Contacto', shortLabel: '1492 · Taínos' },
  { id: 'colonia', label: 'Colonia · Devastaciones y Frontera (1505–1821)', shortLabel: 'Colonia' },
  { id: '1844', label: '1844 · Independencia y 1ra República', shortLabel: '1844 · Independencia' },
  { id: 'restauracion', label: '1863 · Guerra de la Restauración', shortLabel: '1863 · Restauración' },
  { id: 'siglo_xx', label: 'Siglo XX · Soberanía y Democracia (1916–1999)', shortLabel: 'Siglo XX' },
  { id: 'actualidad', label: 'Actualidad · Geografía Política y Constitución', shortLabel: 'Actualidad' },
];

export const TRIVIA_QUESTIONS = [
  // ================= ÉPOCA 1492: CACICAZGOS TAÍNOS Y CONTACTO =================
  {
    id: 'triv-1492-01',
    epocaId: '1492',
    epocaLabel: 'Época Taína (1492)',
    tema: 'Cacicazgo de Maguana y resistencia indígena',
    pregunta:
      '¿Cuál de los cinco grandes cacicazgos de La Española ocupaba el centro de la isla (Valle de San Juan) y estaba gobernado por el cacique Caonabo?',
    opciones: [
      'Cacicazgo de Marién',
      'Cacicazgo de Maguana',
      'Cacicazgo de Higüey',
      'Cacicazgo de Maguá',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'El cacicazgo de Maguana tenía su centro ceremonial en el Corral de los Indios (San Juan de la Maguana) y fue liderado por Caonabo, quien encabezó la primera resistencia contra el Fuerte de la Navidad.',
    coordenadasMapa: {
      lat: 18.8059,
      lng: -71.2299,
      zoom: 10,
      label: 'San Juan de la Maguana (Cacicazgo de Maguana)',
    },
  },
  {
    id: 'triv-1492-02',
    epocaId: '1492',
    epocaLabel: 'Época Taína (1492)',
    tema: 'Cacicazgo de Jaragua y liderazgo de Anacaona',
    pregunta:
      '¿Qué cacicazgo del suroeste de la isla fue gobernado por Behechío y posteriormente por la cacica Anacaona?',
    opciones: [
      'Cacicazgo de Jaragua (Xaraguá)',
      'Cacicazgo de Maguá',
      'Cacicazgo de Marién',
      'Cacicazgo de Higüey',
    ],
    respuestaCorrecta: 0,
    explicacionDidactica:
      'Jaragua abarcaba la hoya de Enriquillo y la península de Tiburón; destacó por su avanzada agricultura de yuca con riego y por el liderazgo político y poético (areítos) de Anacaona.',
    coordenadasMapa: {
      lat: 18.48,
      lng: -71.42,
      zoom: 9,
      label: 'Hoya de Enriquillo y Suroeste (Cacicazgo de Jaragua)',
    },
  },
  {
    id: 'triv-1492-03',
    epocaId: '1492',
    epocaLabel: 'Época Taína (1492)',
    tema: 'Primer asentamiento europeo en América (1494)',
    pregunta:
      '¿En qué provincia actual de la costa norte fundó Cristóbal Colón en enero de 1494 "La Isabela", primera villa europea permanente en América?',
    opciones: [
      'Samaná',
      'Montecristi',
      'Puerto Plata (Luperón)',
      'Espaillat',
    ],
    respuestaCorrecta: 2,
    explicacionDidactica:
      'La Isabela fue edificada en enero de 1494 en El Castillo (municipio de Luperón, Puerto Plata) durante el segundo viaje colombino, donde se levantaron el primer cabildo y la primera iglesia de piedra.',
    coordenadasMapa: {
      lat: 19.8872,
      lng: -71.0806,
      zoom: 12,
      label: 'Parque Histórico La Isabela, Puerto Plata',
    },
  },
  {
    id: 'triv-1492-04',
    epocaId: '1492',
    epocaLabel: 'Época Taína (1492)',
    tema: 'Cacicazgo de Maguá y la Vega Real',
    pregunta:
      '¿Quién gobernaba el próspero Cacicazgo de Maguá, extendido por el fértil Valle de la Vega Real en el Cibao?',
    opciones: [
      'Guacanagarí',
      'Guarionex',
      'Cayacoa',
      'Cotubanamá',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'El cacique Guarionex gobernaba Maguá, la región de mayor densidad agrícola de la isla, comprendida entre la Cordillera Central y la Cordillera Septentrional.',
    coordenadasMapa: {
      lat: 19.2775,
      lng: -70.5439,
      zoom: 10,
      label: 'La Vega Vieja (Valle de la Vega Real, Maguá)',
    },
  },

  // ================= ÉPOCA COLONIA: 1505–1821 =================
  {
    id: 'triv-col-01',
    epocaId: 'colonia',
    epocaLabel: 'Período Colonial (1505–1821)',
    tema: 'Devastaciones de Osorio (1605–1606)',
    pregunta:
      '¿Qué nuevas poblaciones fueron fundadas entre 1605 y 1606 con los habitantes trasladados forzosamente durante las Devastaciones de Osorio?',
    opciones: [
      'Baní y San Cristóbal',
      'Monte Plata y Bayaguana',
      'Higüey y El Seibo',
      'Santiago y Moca',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'La fusión forzosa de Monte Cristi y Puerto Plata dio origen a Monte Plata, mientras que los vecinos desalojados de Bayajá y La Yaguana fundaron San Juan Bautista de Bayaguana.',
    coordenadasMapa: {
      lat: 18.807,
      lng: -69.784,
      zoom: 10,
      label: 'Monte Plata y Bayaguana (Línea de Guardia de 1606)',
    },
  },
  {
    id: 'triv-col-02',
    epocaId: 'colonia',
    epocaLabel: 'Período Colonial (1505–1821)',
    tema: 'Tratado de Aranjuez (1777)',
    pregunta:
      '¿Qué acuerdo firmado en 1777 trazó con 221 mojones la frontera colonial entre el Saint-Domingue francés y la parte española desde el río Masacre hasta Pedernales?',
    opciones: [
      'Tratado de Ryswick (1697)',
      'Tratado de Aranjuez (1777)',
      'Tratado de Basilea (1795)',
      'Paz de París (1814)',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'El Tratado de Aranjuez (3 de junio de 1777) fijó físicamente los límites norte-sur entre los ríos Dajabón (Masacre) y Pedernales, convirtiéndose en el antecedente directo de la frontera dominicana.',
    coordenadasMapa: {
      lat: 19.5488,
      lng: -71.7083,
      zoom: 9,
      label: 'Frontera del Tratado de Aranjuez (Dajabón–Pedernales)',
    },
  },
  {
    id: 'triv-col-03',
    epocaId: 'colonia',
    epocaLabel: 'Período Colonial (1505–1821)',
    tema: 'Defensa de los derechos humanos (1511)',
    pregunta:
      '¿Qué fraile dominico pronunció en diciembre de 1511 en Santo Domingo el célebre Sermón de Adviento denunciando los abusos de las encomiendas?',
    opciones: [
      'Fray Antón de Montesinos',
      'Fray Nicolás de Ovando',
      'Fray Cipriano de Utrera',
      'Hernando de Gorjón',
    ],
    respuestaCorrecta: 0,
    explicacionDidactica:
      'Con la pregunta «¿Estos, no son hombres?», Fray Antón de Montesinos y la comunidad dominica iniciaron en Santo Domingo el primer debate moderno sobre el derecho de gentes y los derechos humanos.',
    coordenadasMapa: {
      lat: 18.4714,
      lng: -69.8871,
      zoom: 16,
      label: 'Convento de los Dominicos, Ciudad Colonial',
    },
  },
  {
    id: 'triv-col-04',
    epocaId: 'colonia',
    epocaLabel: 'Período Colonial (1505–1821)',
    tema: 'Rebelión del Bahoruco y primer tratado de paz indígena',
    pregunta:
      '¿En qué sistema montañoso organizó el cacique Enriquillo (Guarocuya) su rebelión entre 1519 y 1533 hasta lograr un tratado de libertad con Carlos V?',
    opciones: [
      'Cordillera Septentrional',
      'Sierra de Yamasá',
      'Sierra de Bahoruco',
      'Sierra Oriental',
    ],
    respuestaCorrecta: 2,
    explicacionDidactica:
      'Aprovechando la abrupta topografía de la Sierra de Bahoruco en el suroeste, Enriquillo mantuvo durante catorce años una resistencia invicta que obligó a la Corona a reconocer la libertad de su pueblo.',
    coordenadasMapa: {
      lat: 18.18,
      lng: -71.52,
      zoom: 10,
      label: 'Sierra de Bahoruco (Rebelión de Enriquillo)',
    },
  },

  // ================= ÉPOCA 1844: INDEPENDENCIA Y PRIMERA REPÚBLICA =================
  {
    id: 'triv-1844-01',
    epocaId: '1844',
    epocaLabel: 'Independencia y 1ra República (1844)',
    tema: 'Las 5 Provincias Originales de 1844',
    pregunta:
      'Según la primera Constitución de San Cristóbal (6 de noviembre de 1844), ¿en cuántas y cuáles grandes provincias se dividió originalmente el territorio nacional?',
    opciones: [
      '3 Provincias: Ozama, Cibao y Enriquillo',
      '5 Provincias: Santo Domingo, Santiago, La Vega, Azua y El Seibo',
      '7 Provincias incluyendo Puerto Plata y Montecristi',
      '12 Provincias y un Distrito Nacional',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'El artículo 4 de la Constitución de 1844 organizó la República en cinco grandes provincias: Compostela de Azua, Santo Domingo, Santa Cruz de El Seibo, Concepción de La Vega y Santiago de los Caballeros.',
    coordenadasMapa: {
      lat: 18.4167,
      lng: -70.1,
      zoom: 9,
      label: 'San Cristóbal y las 5 Provincias Originales de 1844',
    },
  },
  {
    id: 'triv-1844-02',
    epocaId: '1844',
    epocaLabel: 'Independencia y 1ra República (1844)',
    tema: 'Proclamación de la Independencia Nacional',
    pregunta:
      '¿En qué baluarte amurallado de Santo Domingo se proclamó la Independencia Nacional la noche del 27 de febrero de 1844 tras el trabucazo de Mella en la Misericordia?',
    opciones: [
      'Fortaleza Ozama',
      'Puerta del Conde (Baluarte del 27 de Febrero)',
      'Alcázar de Colón',
      'Fuerte San Gil',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'En la Puerta del Conde, Francisco del Rosario Sánchez izó la primera bandera nacional confeccionada por Concepción Bona y María Trinidad Sánchez bajo el ideario trinitario de Juan Pablo Duarte.',
    coordenadasMapa: {
      lat: 18.4718,
      lng: -69.8923,
      zoom: 16,
      label: 'Puerta del Conde, Parque Independencia',
    },
  },
  {
    id: 'triv-1844-03',
    epocaId: '1844',
    epocaLabel: 'Independencia y 1ra República (1844)',
    tema: 'Batallas de Marzo de 1844',
    pregunta:
      '¿En qué dos ciudades estratégicas del Sur y del Cibao obtuvieron las fuerzas dominicanas las victorias decisivas del 19 de marzo y del 30 de marzo de 1844?',
    opciones: [
      'Baní y San Francisco de Macorís',
      'Azua de Compostela y Santiago de los Caballeros',
      'San Juan de la Maguana y Puerto Plata',
      'Barahona y Montecristi',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'El 19 de marzo de 1844 se contuvo el avance por el corredor sur en Azua, y el 30 de marzo los generales José María Imbert y Fernando Valerio triunfaron en los fuertes Dios, Patria y Libertad en Santiago.',
    coordenadasMapa: {
      lat: 19.4517,
      lng: -70.697,
      zoom: 10,
      label: 'Santiago de los Caballeros (Batalla del 30 de Marzo de 1844)',
    },
  },
  {
    id: 'triv-1844-04',
    epocaId: '1844',
    epocaLabel: 'Independencia y 1ra República (1844)',
    tema: 'Batalla de Sabana Larga y Santomé (1855–1856)',
    pregunta:
      '¿Qué batalla librada el 24 de enero de 1856 en la provincia de Dajabón selló militarmente el fin de las campañas de la Primera República en la Línea Noroeste?',
    opciones: [
      'Batalla de Las Carreras',
      'Batalla de El Número',
      'Batalla de Sabana Larga',
      'Batalla de Beller',
    ],
    respuestaCorrecta: 2,
    explicacionDidactica:
      'La victoria dominicana en Sabana Larga (Dajabón, enero de 1856), junto a la batalla de Santomé en San Juan y Cambronal en Neiba, aseguró definitivamente la frontera occidental.',
    coordenadasMapa: {
      lat: 19.566,
      lng: -71.682,
      zoom: 11,
      label: 'Sabana Larga, Dajabón (1856)',
    },
  },

  // ================= ÉPOCA RESTAURACIÓN: 1863–1915 =================
  {
    id: 'triv-rest-01',
    epocaId: 'restauracion',
    epocaLabel: 'Guerra de la Restauración (1863–1865)',
    tema: 'Grito de Capotillo (16 de agosto de 1863)',
    pregunta:
      '¿Quién encabezó a los catorce patriotas que cruzaron la frontera e izaron el pabellón nacional en el Cerro de Capotillo (Dajabón) el 16 de agosto de 1863?',
    opciones: [
      'Santiago Rodríguez, Benito Monción y José Cabrera',
      'Pedro Santana y Buenaventura Báez',
      'Ulises Heureaux y Cesáreo Guillermo',
      'Ramón Cáceres y Horacio Vásquez',
    ],
    respuestaCorrecta: 0,
    explicacionDidactica:
      'El Grito de Capotillo liderado por Santiago Rodríguez, Benito Monción y José Cabrera dio inicio a la ofensiva nacional que restauró la soberanía frente a la anexión a España de 1861.',
    coordenadasMapa: {
      lat: 19.4194,
      lng: -71.6819,
      zoom: 12,
      label: 'Cerro de Capotillo, Loma de Cabrera (Dajabón)',
    },
  },
  {
    id: 'triv-rest-02',
    epocaId: 'restauracion',
    epocaLabel: 'Guerra de la Restauración (1863–1865)',
    tema: 'Gobierno Provisional Restaurador en Santiago',
    pregunta:
      '¿Qué ciudad se convirtió en capital del Gobierno Provisional Restaurador tras el sitio de septiembre de 1863 y sede de la firma del Acta de Independencia Restauradora?',
    opciones: [
      'Puerto Plata',
      'Concepción de La Vega',
      'Santiago de los Caballeros',
      'San Pedro de Macorís',
    ],
    respuestaCorrecta: 2,
    explicacionDidactica:
      'El 14 de septiembre de 1863 se instaló en Santiago el Gobierno Provisional presidido por José Antonio Salcedo (Pepillo), con Benigno Filomeno de Rojas y Gregorio Luperón como figuras clave.',
    coordenadasMapa: {
      lat: 19.45,
      lng: -70.695,
      zoom: 12,
      label: 'Fortaleza San Luis, Santiago de los Caballeros',
    },
  },
  {
    id: 'triv-rest-03',
    epocaId: 'restauracion',
    epocaLabel: 'Segunda República (1865–1915)',
    tema: 'Aportes educativos de Eugenio María de Hostos y Salomé Ureña',
    pregunta:
      'Durante la Segunda República (década de 1880), ¿quiénes impulsaron la Escuela Normal y el Instituto de Señoritas que transformaron la educación dominicana?',
    opciones: [
      'Eugenio María de Hostos y Salomé Ureña de Henríquez',
      'Félix María del Monte y Manuel de Jesús Galván',
      'Américo Lugo y Fabio Fiallo',
      'Pedro Francisco Bonó y Emiliano Tejera',
    ],
    respuestaCorrecta: 0,
    explicacionDidactica:
      'Eugenio María de Hostos fundó la Escuela Normal (1880) y Salomé Ureña creó el Instituto de Señoritas (1881), formando a las primeras maestras normales del país.',
    coordenadasMapa: {
      lat: 18.4735,
      lng: -69.8845,
      zoom: 15,
      label: 'Ciudad Colonial de Santo Domingo (Cuna del Normalismo)',
    },
  },

  // ================= ÉPOCA SIGLO XX: 1916–1999 =================
  {
    id: 'triv-sxx-01',
    epocaId: 'siglo_xx',
    epocaLabel: 'Siglo XX (1916–1999)',
    tema: 'Resistencia de La Barranquita (1916)',
    pregunta:
      '¿Qué general comandó la heroica resistencia de La Barranquita (Guayacanes, Valverde) el 3 de julio de 1916 frente a las tropas de ocupación estadounidense?',
    opciones: [
      'General Carlos Daniel y Capitán Máximo Cabral',
      'General Desiderio Arias',
      'General Cipriano Bencosme',
      'General Gregorio Urbano Gilbert',
    ],
    respuestaCorrecta: 0,
    explicacionDidactica:
      'En el cerro de La Barranquita (provincia Valverde), el general Carlos Daniel y el capitán Máximo Cabral protagonizaron con ochenta patriotas la principal acción armada en defensa de la soberanía en 1916.',
    coordenadasMapa: {
      lat: 19.638,
      lng: -71.066,
      zoom: 12,
      label: 'Monumento de La Barranquita, Mao (Valverde)',
    },
  },
  {
    id: 'triv-sxx-02',
    epocaId: 'siglo_xx',
    epocaLabel: 'Siglo XX (1916–1999)',
    tema: 'Expedición de Constanza, Maimón y Estero Hondo (1959)',
    pregunta:
      '¿Por cuáles tres puntos de la geografía nacional desembarcó en junio de 1959 el Movimiento de Liberación Dominicana ("Raza Inmortal") contra la dictadura de Trujillo?',
    opciones: [
      'Luperón, Samaná y Barahona',
      'Constanza, Maimón y Estero Hondo',
      'Azua, Las Calderas y Manzanillo',
      'Pedernales, Montecristi y Miches',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'El 14 de junio de 1959 aterrizó en Constanza (La Vega) el grupo comandado por Enrique Jiménez Moya, y el 20 de junio desembarcaron las lanchas por Maimón y Estero Hondo (Puerto Plata).',
    coordenadasMapa: {
      lat: 18.9092,
      lng: -70.7449,
      zoom: 11,
      label: 'Valle de Constanza, La Vega (14 de junio de 1959)',
    },
  },
  {
    id: 'triv-sxx-03',
    epocaId: 'siglo_xx',
    epocaLabel: 'Siglo XX (1916–1999)',
    tema: 'Las Hermanas Mirabal y la resistencia antitrujillista',
    pregunta:
      '¿De qué provincia del Cibao eran oriundas las heroínas Patria, Minerva y María Teresa Mirabal, símbolos universales de la lucha por la libertad?',
    opciones: [
      'Provincia Duarte (San Francisco de Macorís)',
      'Provincia Hermanas Mirabal (Ojo de Agua, Salcedo)',
      'Provincia Espaillat (Moca)',
      'Provincia Monseñor Nouel (Bonao)',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'Nacidas en Ojo de Agua (Salcedo), las Hermanas Mirabal cofundaron el Movimiento Revolucionario 14 de Junio; en su honor la antigua provincia Salcedo lleva hoy el nombre de Provincia Hermanas Mirabal.',
    coordenadasMapa: {
      lat: 19.3775,
      lng: -70.4175,
      zoom: 12,
      label: 'Casa Museo Hermanas Mirabal, Conuco (Salcedo)',
    },
  },
  {
    id: 'triv-sxx-04',
    epocaId: 'siglo_xx',
    epocaLabel: 'Siglo XX (1916–1999)',
    tema: 'Constitución de 1963 y Revolución de Abril de 1965',
    pregunta:
      '¿Cuál era la demanda central del movimiento cívico-militar liderado por el coronel Francisco Alberto Caamaño Deñó en abril de 1965?',
    opciones: [
      'El retorno a la Constitución democrática de 1963 promulgada en el gobierno de Juan Bosch',
      'La creación de un Triunvirato militar provisional',
      'La reforma de la frontera con Haití',
      'El traslado de la capital hacia Santiago de los Caballeros',
    ],
    respuestaCorrecta: 0,
    explicacionDidactica:
      'La Gesta de Abril de 1965 exigió el restablecimiento inmediato de la Constitución social y democrática de 1963, teniendo como escenarios el Puente Duarte y Ciudad Nueva en Santo Domingo.',
    coordenadasMapa: {
      lat: 18.4812,
      lng: -69.8825,
      zoom: 14,
      label: 'Puente Duarte y Ciudad Nueva, Santo Domingo (Abril de 1965)',
    },
  },

  // ================= ÉPOCA ACTUALIDAD: GEOGRAFÍA POLÍTICA E INSTITUCIONES =================
  {
    id: 'triv-act-01',
    epocaId: 'actualidad',
    epocaLabel: 'Actualidad (Geografía e Instituciones)',
    tema: 'División político-administrativa actual',
    pregunta:
      '¿Cómo está estructurada actualmente la división político-territorial superior de la República Dominicana según la Constitución y la ONE?',
    opciones: [
      '29 provincias y 2 distritos especiales',
      '31 provincias y 1 Distrito Nacional (32 demarcaciones)',
      '30 provincias y 3 regiones autónomas',
      '32 provincias más el Distrito Nacional',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'El territorio de la República Dominicana se divide políticamente en 31 provincias y un Distrito Nacional (sede de Santo Domingo de Guzmán, capital de la República), sumando 32 demarcaciones.',
    coordenadasMapa: {
      lat: 18.4861,
      lng: -69.9312,
      zoom: 11,
      label: 'Distrito Nacional y Gran Santo Domingo',
    },
  },
  {
    id: 'triv-act-02',
    epocaId: 'actualidad',
    epocaLabel: 'Actualidad (Geografía e Instituciones)',
    tema: 'Presidentes por provincia de nacimiento',
    pregunta:
      'Según las estadísticas históricas del Atlas, ¿cuáles dos demarcaciones encabezan el mayor número de presidentes dominicanos nacidos en su territorio?',
    opciones: [
      'La Vega y San Cristóbal',
      'Distrito Nacional (Santo Domingo) y Santiago',
      'Puerto Plata y Azua',
      'El Seibo y San Pedro de Macorís',
    ],
    respuestaCorrecta: 1,
    explicacionDidactica:
      'Santo Domingo (Distrito Nacional) y Santiago de los Caballeros concentran históricamente la mayor cantidad de mandatarios nacidos en su jurisdicción desde 1844 hasta la actualidad.',
    coordenadasMapa: {
      lat: 19.4517,
      lng: -70.697,
      zoom: 8,
      label: 'Eje Histórico Santo Domingo – Santiago',
    },
  },
  {
    id: 'triv-act-03',
    epocaId: 'actualidad',
    epocaLabel: 'Actualidad (Geografía e Instituciones)',
    tema: 'Relieve e hidrografía nacional',
    pregunta:
      '¿En qué sistema montañoso se localiza el Pico Duarte (3,098 m s. n. m.), punto más elevado de las Antillas, y nacen los ríos Yaque del Norte y Yaque del Sur?',
    opciones: [
      'Cordillera Oriental',
      'Cordillera Septentrional',
      'Cordillera Central',
      'Sierra de Neiba',
    ],
    respuestaCorrecta: 2,
    explicacionDidactica:
      'La Cordillera Central ("Madre de las Aguas") alberga el Pico Duarte entre las provincias de San Juan y Santiago, alimentando las principales cuencas hidrográficas del país.',
    coordenadasMapa: {
      lat: 19.0231,
      lng: -70.9981,
      zoom: 10,
      label: 'Pico Duarte, Cordillera Central',
    },
  },
  {
    id: 'triv-act-04',
    epocaId: 'actualidad',
    epocaLabel: 'Actualidad (Geografía e Instituciones)',
    tema: 'Provincias fronterizas de norte a sur',
    pregunta:
      '¿Cuáles son las cinco provincias que conforman de norte a sur la línea fronteriza terrestre de la República Dominicana?',
    opciones: [
      'Montecristi, Dajabón, Elías Piña, Independencia y Pedernales',
      'Puerto Plata, Valverde, San Juan, Bahoruco y Barahona',
      'Montecristi, Santiago Rodríguez, San Juan, Neiba y Pedernales',
      'Dajabón, Santiago Rodríguez, Elías Piña, Bahoruco y Barahona',
    ],
    respuestaCorrecta: 0,
    explicacionDidactica:
      'Las cinco provincias limítrofes con la República de Haití, de norte a sur, son Montecristi, Dajabón, Elías Piña, Independencia y Pedernales.',
    coordenadasMapa: {
      lat: 18.88,
      lng: -71.7,
      zoom: 8,
      label: 'Eje Fronterizo Dominicano (Montecristi a Pedernales)',
    },
  },
  {
    id: 'triv-act-05',
    epocaId: 'actualidad',
    epocaLabel: 'Actualidad (Geografía e Instituciones)',
    tema: 'Constitución de 2010 y Tribunal Constitucional',
    pregunta:
      '¿Qué reforma constitucional creó en la República Dominicana el Tribunal Constitucional y consolidó la figura del Estado Social y Democrático de Derecho?',
    opciones: [
      'Reforma Constitucional de 1966',
      'Reforma Constitucional de 1994',
      'Constitución proclamada el 26 de enero de 2010',
      'Reforma Constitucional de 2002',
    ],
    respuestaCorrecta: 2,
    explicacionDidactica:
      'La Constitución del 26 de enero de 2010 definió al país como un Estado Social y Democrático de Derecho e instituyó las altas cortes como el Tribunal Constitucional y el Tribunal Superior Electoral.',
    coordenadasMapa: {
      lat: 18.4485,
      lng: -69.9258,
      zoom: 13,
      label: 'Centro de los Héroes y Plaza de la Bandera, Santo Domingo',
    },
  },
];

/**
 * Devuelve el id de época sugerido para la Trivia según el año activo del mapa.
 */
export function getSuggestedTriviaEpochForYear(year) {
  const y = Number(year) || 2026;
  if (y <= 1504) return '1492';
  if (y <= 1821) return 'colonia';
  if (y <= 1862) return '1844';
  if (y <= 1915) return 'restauracion';
  if (y <= 1999) return 'siglo_xx';
  return 'all';
}

/**
 * Selecciona un conjunto barajado de preguntas para una partida en el aula.
 * Si la época elegida tiene menos preguntas que `count`, completa con preguntas complementarias.
 */
export function buildTriviaRoundQuestions(epocaId = 'all', count = 5) {
  const shuffle = (arr) => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  };

  if (epocaId === 'all') {
    return shuffle(TRIVIA_QUESTIONS).slice(0, count);
  }

  const matching = shuffle(TRIVIA_QUESTIONS.filter((q) => q.epocaId === epocaId));
  if (matching.length >= count) {
    return matching.slice(0, count);
  }

  const others = shuffle(TRIVIA_QUESTIONS.filter((q) => q.epocaId !== epocaId));
  return [...matching, ...others].slice(0, count);
}
