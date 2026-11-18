import type { HistoricalMilestone } from '../types/history';

export const HISTORICAL_MILESTONES: HistoricalMilestone[] = [
  // 1. ÉPOCA TAÍNA (Pre-1492 – Siglo XVI)
  {
    id: 'hito-corral-de-los-indios-1492',
    title: 'Corral de los Indios (Plaza Ceremonial de Anacaona)',
    date: 'Pre-1492 – 1503',
    year: 1492,
    epoch: 'Época Taína',
    type: 'fundacion',
    category: 'Fundación',
    periodId: 'taina',
    lat: 18.8317,
    lng: -71.2358,
    province: 'San Juan de la Maguana',
    protagonists: ['Cacica Anacaona', 'Cacique Caonabo', 'Bohechío'],
    summary:
      'El mayor batey o plaza ceremonial circular taína de las Antillas, centro espiritual y político del cacicazgo de Maguana.',
    chronicle:
      'Ubicado en Juan de Herrera (San Juan), este gran círculo megalítico de más de 225 metros de diámetro presidido por un monolito central de piedra fue el corazón ritual donde los taínos de Maguana y Jaragua celebraban areítos, ceremonias a los cemíes y el juego de pelota (batú) bajo el liderazgo de Caonabo y la cacica Anacaona.',
    impact:
      'Monumento arqueológico cumbre de la organización política, cosmovisión y arquitectura ceremonial taína en Quisqueya.',
    source: 'Museo del Hombre Dominicano · Crónicas de Fray Bartolomé de las Casas',
  },
  {
    id: 'hito-sierra-de-bahoruco-1519',
    title: 'Sierra de Bahoruco (Rebelión del Cacique Enriquillo)',
    date: '1519 – 1533',
    year: 1519,
    epoch: 'Época Taína',
    type: 'batalla',
    category: 'Batalla',
    periodId: 'taina',
    lat: 18.1667,
    lng: -71.4167,
    province: 'Baoruco / Independencia',
    protagonists: ['Cacique Enriquillo (Guarocuya)', 'Mencía', 'Francisco de Barrionuevo'],
    summary:
      'Alzamiento armado taíno de catorce años en las montañas del Bahoruco que culminó en el primer tratado de paz y libertad indígena de América.',
    chronicle:
      'Educado por los franciscanos en la Verapaz y agraviado por el encomendero Andrés de Valenzuela, el cacique Enriquillo (Guarocuya) organizó en 1519 una guerrilla inexpugnable en las cumbres de la Sierra de Bahoruco. Durante 14 años derrotó todas las expediciones coloniales hasta que el emperador Carlos V envió a Francisco de Barrionuevo a firmar el tratado de paz y libertad de 1533.',
    impact:
      'Primer movimiento de liberación anticolonial triunfante del continente americano.',
    source: 'Archivo General de Indias · Fray Bartolomé de las Casas · Manuel de Jesús Galván',
  },
  {
    id: 'hito-cuevas-del-pomier-1492',
    title: 'Cuevas del Pomier (Arte Rupestre Taíno)',
    date: 'Pre-1492',
    year: 1492,
    epoch: 'Época Taína',
    type: 'fundacion',
    category: 'Fundación',
    periodId: 'taina',
    lat: 18.4686,
    lng: -70.1353,
    province: 'San Cristóbal',
    protagonists: ['Behiques y artistas taínos', 'Comunidades indígenas de Borbón'],
    summary:
      'Complejo cavernario sagrado con más de 4,000 pictografías y petroglifos taínos, considerado la capital prehistórica de las Antillas.',
    chronicle:
      'Las 55 cavernas calcáreas de Borbón (El Pomier) albergan el mayor conjunto de arte rupestre del Caribe insular. Los behiques y comunidades indígenas plasmaron con carbón vegetal y óxidos minerales representaciones de cemíes, aves, rituales de la cohoba, escenas de pesca y mitos cosmogónicos sobre el origen de la humanidad.',
    impact:
      'Reserva antropológica fundamental para comprender la cosmovisión, espiritualidad y expresión artística taína.',
    source: 'Reserva Antropológica Cuevas del Pomier · Instituto Dominicano de Investigaciones Antropológicas',
  },

  // 2. INDEPENDENCIA NACIONAL (1844)
  {
    id: 'hito-puerta-del-conde-1844',
    title: 'Puerta del Conde / Altar de la Patria (Santo Domingo)',
    date: '27 de febrero de 1844',
    year: 1844,
    epoch: '1844',
    type: 'proclamacion',
    category: 'Política',
    periodId: 'independencia',
    lat: 18.4731,
    lng: -69.8931,
    province: 'Distrito Nacional',
    protagonists: [
      'Juan Pablo Duarte',
      'Francisco del Rosario Sánchez',
      'Matías Ramón Mella',
      'Concepción Bona',
      'María Trinidad Sánchez',
    ],
    summary:
      'Baluarte histórico donde se proclamó la Independencia Nacional e izó por primera vez la Bandera Dominicana tras el trabucazo de Mella.',
    chronicle:
      'En la noche del 27 de febrero de 1844, tras el disparo del trabucazo de Matías Ramón Mella en la Puerta de la Misericordia, los trinitarios y patriotas convergieron en el Baluarte de San Genaro (Puerta del Conde). Allí Francisco del Rosario Sánchez izó la bandera tricolor concebida por Juan Pablo Duarte bajo el lema «Dios, Patria y Libertad», proclamando el nacimiento de la República Dominicana.',
    impact:
      'Nacimiento jurídico y político de la República Dominicana como Estado libre, soberano e independiente.',
    source: 'Manifiesto del 16 de Enero de 1844 · Archivo General de la Nación',
  },
  {
    id: 'hito-19-de-marzo-1844',
    title: 'Batalla del 19 de Marzo (Azua)',
    date: '19 de marzo de 1844',
    year: 1844,
    epoch: '1844',
    type: 'batalla',
    category: 'Batalla',
    periodId: 'independencia',
    lat: 18.4539,
    lng: -70.7347,
    province: 'Azua',
    protagonists: ['Pedro Santana', 'Antonio Duvergé', 'Francisco Soñé', 'Vicente Noble', 'Nicolás Mañón'],
    summary:
      'Primera gran victoria militar defensiva de la naciente República Dominicana frente a la columna sur del ejército haitiano de Charles Hérard.',
    chronicle:
      'Apenas tres semanas después de proclamada la Independencia, las tropas dominicanas del Ejército del Sur se atrincheraron en los accesos de Compostela de Azua. Con la artillería dirigida por Francisco Soñé en El Resolí y Los Jovillos y las cargas al machete de Antonio Duvergé y Vicente Noble, las fuerzas nacionales frenaron el avance de más de 10,000 soldados invasores.',
    impact:
      'Garantizó la supervivencia militar de la República en el frente sur y demostró la capacidad defensiva del ejército patriota.',
    source: 'Emilio Rodríguez Demorizi · Guerra Dominico-Haitiana (Documentos de 1844)',
  },
  {
    id: 'hito-30-de-marzo-1844',
    title: 'Batalla del 30 de Marzo (Santiago de los Caballeros)',
    date: '30 de marzo de 1844',
    year: 1844,
    epoch: '1844',
    type: 'batalla',
    category: 'Batalla',
    periodId: 'independencia',
    lat: 19.4517,
    lng: -70.7042,
    province: 'Santiago',
    protagonists: [
      'José María Imbert',
      'Fernando Valerio',
      'Juana Saltitopa (La Coronela)',
      'Achilles Michel',
      'José María López',
    ],
    summary:
      'Triunfo decisivo del Ejército del Norte en los fuertes Dios, Patria y Libertad que selló la Independencia en el Valle del Cibao.',
    chronicle:
      'Bajo el mando del general José María Imbert, las fuerzas cibaeñas defendieron la ciudad de Santiago desde los fuertes Dios, Patria y Libertad frente a la columna norte del general Jean-Louis Pierrot. La célebre «Carga de los Andulleros» de Sabana Iglesia comandada por Fernando Valerio y el heroísmo de Juana Saltitopa provocaron la retirada definitiva del ejército invasor.',
    impact:
      'Consolidó la soberanía nacional en toda la región norte y aseguró el territorio de la Primera República.',
    source: 'Academia Dominicana de la Historia · Parte Oficial de la Batalla de Santiago (1844)',
  },

  // 3. GUERRA DE LA RESTAURACIÓN (1863–1865)
  {
    id: 'hito-capotillo-1863',
    title: 'Monumento al Grito de Capotillo (Dajabón)',
    date: '16 de agosto de 1863',
    year: 1863,
    epoch: 'Restauración',
    type: 'batalla',
    category: 'Batalla',
    periodId: 'restauracion',
    lat: 19.4319,
    lng: -71.6853,
    province: 'Dajabón',
    protagonists: [
      'Santiago Rodríguez',
      'Benito Monción',
      'José Cabrera',
      'Pedro Antonio Pimentel',
    ],
    summary:
      'Catorce patriotas izan el pabellón tricolor en el cerro de Capotillo, encendiendo la Guerra de la Restauración contra la Anexión a España.',
    chronicle:
      'Dos años después de la Anexión a España proclamada en 1861, catorce patriotas liderados por Santiago Rodríguez, Benito Monción y José Cabrera cruzaron la frontera e izaron la bandera dominicana en la cima del cerro de Capotillo el 16 de agosto de 1863, dando inicio al levantamiento general de la Línea Noroeste y del Cibao.',
    impact:
      'Inicio formal de la Guerra de la Restauración que recuperó la independencia y dio origen a la Segunda República.',
    source: 'Gregorio Luperón · Notas Autobiográficas y Apuntes Históricos',
  },
  {
    id: 'hito-sitio-santiago-1863',
    title: 'Fortaleza San Luis (Sitio e Incendio de Santiago)',
    date: '6 – 14 de septiembre de 1863',
    year: 1863,
    epoch: 'Restauración',
    type: 'batalla',
    category: 'Batalla',
    periodId: 'restauracion',
    lat: 19.4492,
    lng: -70.7031,
    province: 'Santiago',
    protagonists: [
      'Gregorio Luperón',
      'Gaspar Polanco',
      'Benigno Filomeno de Rojas',
      'Pepillo Salcedo',
      'Ulises Francisco Espaillat',
    ],
    summary:
      'Asedio decisivo a las tropas españolas en la Fortaleza San Luis que culminó con la retirada realista y la instalación del Gobierno Restaurador.',
    chronicle:
      'Las columnas restauradoras comandadas por Gaspar Polanco y Gregorio Luperón cercaron a las fuerzas españolas del brigadier Buceta en la Fortaleza San Luis. El 6 de septiembre de 1863 se produjo el incendio de Santiago durante el asalto general, forzando la evacuación española hacia Puerto Plata y permitiendo proclamar el 14 de septiembre el Gobierno Provisorio Restaurador.',
    impact:
      'Convirtió a Santiago en capital política y militar de la República en Armas durante la Guerra de la Restauración.',
    source: 'Actas del Gobierno Provisorio de la Restauración (1863) · Archivo General de la Nación',
  },

  // 4. ERA DE TRUJILLO (1930–1961)
  {
    id: 'hito-rio-masacre-1937',
    title: 'Río Masacre / Dajabón (Masacre del Perejil)',
    date: 'Octubre de 1937',
    year: 1937,
    epoch: 'Siglo XX',
    type: 'batalla',
    category: 'Derechos',
    periodId: 'trujillo',
    lat: 19.5489,
    lng: -71.7083,
    province: 'Dajabón',
    protagonists: ['Víctimas fronterizas de 1937', 'Régimen de Rafael Leónidas Trujillo'],
    summary:
      'Matanza perpetrada por orden de la dictadura de Trujillo en la zona fronteriza norte y la cuenca del río Masacre en octubre de 1937.',
    chronicle:
      'Tras un discurso pronunciado en Dajabón el 2 de octubre de 1937, el dictador Rafael Leónidas Trujillo ordenó al ejército y a fuerzas auxiliares la persecución y ejecución de miles de habitantes haitianos y dominico-haitianos a lo largo de la frontera norte y el río Dajabón (Masacre), episodio conocido internacionalmente como el «Corte» o la Masacre del Perejil.',
    impact:
      'Uno de los crímenes de Estado más graves del siglo XX en el Caribe, que generó condena internacional y marcó la política fronteriza del régimen.',
    source: 'Bernardo Vega · Trujillo y Haití · Museo Memorial de la Resistencia Dominicana',
  },
  {
    id: 'hito-la-40-sim-1957',
    title: 'Centro de Torturas "La 40" (SIM)',
    date: '1957 – 1961',
    year: 1957,
    epoch: 'Siglo XX',
    type: 'proclamacion',
    category: 'Derechos',
    periodId: 'trujillo',
    lat: 18.4981,
    lng: -69.9142,
    province: 'Distrito Nacional (Cristo Rey)',
    protagonists: [
      'Jóvenes del Movimiento 14 de Junio',
      'Manolo Tavárez Justo',
      ' Leandro Guzmán',
      'Servicio de Inteligencia Militar (SIM)',
    ],
    summary:
      'Principal cárcel clandestina y centro de torturas del Servicio de Inteligencia Militar (SIM) en la calle 40 del sector Cristo Rey.',
    chronicle:
      'Operado por Johnny Abbes García y los agentes del SIM en los años finales de la dictadura, el centro clandestino de «La 40» fue escenario de interrogatorios, sillas eléctricas y torturas contra los expedicionarios de junio de 1959 y los militantes del Movimiento Revolucionario 14 de Junio tras las redadas de enero de 1960.',
    impact:
      'Símbolo de la represión sistemática del aparato de terror trujillista y de la valentía de la resistencia antitrujillista.',
    source: 'Museo Memorial de la Resistencia Dominicana · Testimonios del 14 de Junio',
  },
  {
    id: 'hito-hermanas-mirabal-1960',
    title: 'Monumento a las Hermanas Mirabal (Ojo de Agua, Salcedo)',
    date: '25 de noviembre de 1960',
    year: 1960,
    epoch: 'Siglo XX',
    type: 'proclamacion',
    category: 'Derechos',
    periodId: 'trujillo',
    lat: 19.3775,
    lng: -70.3822,
    province: 'Hermanas Mirabal (Salcedo)',
    protagonists: [
      'Patria Mirabal',
      'Minerva Mirabal',
      'María Teresa Mirabal',
      'Rufino de la Cruz',
      'Dedé Mirabal',
    ],
    summary:
      'Lugar de memoria de las heroínas Patria, Minerva y María Teresa Mirabal («Las Mariposas»), asesinadas por el SIM el 25 de noviembre de 1960.',
    chronicle:
      'Fundadoras y articuladoras clave del Movimiento Revolucionario 14 de Junio, las hermanas Patria, Minerva y María Teresa Mirabal, junto al conductor Rufino de la Cruz, fueron emboscadas y asesinadas por agentes del SIM cuando regresaban de visitar a sus esposos presos en Puerto Plata. Su crimen conmocionó la conciencia nacional y precipitó el fin de la dictadura.',
    impact:
      'En su honor la ONU declaró el 25 de noviembre como Día Internacional de la Eliminación de la Violencia contra la Mujer.',
    source: 'Casa Museo Hermanas Mirabal · Archivo General de la Nación',
  },
  {
    id: 'hito-ajusticiamiento-1961',
    title: 'Monumento a los Héroes del 30 de Mayo (Ajusticiamiento de Trujillo)',
    date: '30 de mayo de 1961',
    year: 1961,
    epoch: 'Siglo XX',
    type: 'proclamacion',
    category: 'Política',
    periodId: 'trujillo',
    lat: 18.4314,
    lng: -69.9694,
    province: 'Distrito Nacional',
    protagonists: [
      'Antonio de la Maza',
      'Antonio Imbert Barrera',
      'Amado García Guerrero',
      'Salvador Estrella Sadhalá',
      'Juan Tomás Díaz',
      'Huáscar Tejeda',
      'Roberto Pastoriza',
      'Pedro Livio Cedeño',
    ],
    summary:
      'Punto exacto de la autopista hacia San Cristóbal donde el comando del 30 de Mayo ajustició al dictador Rafael Leónidas Trujillo.',
    chronicle:
      'La noche del 30 de mayo de 1961, en el kilómetro 9 de la carretera Santo Domingo–San Cristóbal, un comando de conjurados interceptó el automóvil oficial del dictador Rafael Leónidas Trujillo Molina. Tras un intenso intercambio de disparos, cayó abatido el tirano, poniendo término a 31 años de régimen totalitario.',
    impact:
      'Fin de la Era de Trujillo y apertura del proceso de transición hacia la democracia dominicana.',
    source: 'Fundación Héroes del 30 de Mayo · Museo Memorial de la Resistencia Dominicana',
  },

  // 5. GOBIERNOS DE BALAGUER (1960–1996)
  {
    id: 'hito-presa-de-tavera-1973',
    title: 'Presa de Tavera (Infraestructura Hidroeléctrica — Los Doce Años)',
    date: '27 de febrero de 1973',
    year: 1973,
    epoch: 'Siglo XX',
    type: 'fundacion',
    category: 'Fundación',
    periodId: 'balaguer',
    lat: 19.2865,
    lng: -70.7155,
    province: 'Santiago',
    protagonists: ['Joaquín Balaguer', 'Ingenieros y comunidades del río Yaque del Norte'],
    summary:
      'Primera gran central hidroeléctrica y obra emblemática de riego agrícola e infraestructura construida durante los «Doce Años» de Joaquín Balaguer.',
    chronicle:
      'Inaugurada en 1973 sobre la cuenca del río Yaque del Norte en Santiago, la Presa de Tavera marcó el inicio del programa de grandes complejos hidroeléctricos, canales de riego y leyes agrarias (1972) impulsados por las administraciones de Joaquín Balaguer para transformar la matriz energética y agropecuaria del Cibao.',
    impact:
      'Eje de la política de modernización hidráulica, electrificación y reforma agraria de la década de 1970.',
    source: 'Archivo General de la Nación · Memorias de Obras Públicas (1966–1978)',
  },
  {
    id: 'hito-orlando-martinez-1975',
    title: 'Calle José Contreras / UASD (Memoria de Orlando Martínez y Los Doce Años)',
    date: '17 de marzo de 1975',
    year: 1975,
    epoch: 'Siglo XX',
    type: 'proclamacion',
    category: 'Derechos',
    periodId: 'balaguer',
    lat: 18.4689,
    lng: -69.9112,
    province: 'Distrito Nacional',
    protagonists: [
      'Orlando Martínez Howley',
      'Movimiento estudiantil y periodístico',
      'Defensores de los derechos humanos',
    ],
    summary:
      'Sitio conmemorativo del periodista Orlando Martínez en las inmediaciones de la UASD, símbolo de la lucha por la libertad de expresión durante los «Doce Años».',
    chronicle:
      'Durante el período 1966–1978 («Los Doce Años»), la fuerte represión política contra la oposición de izquierda, sindicatos y movimientos estudiantiles alcanzó uno de sus momentos más críticos el 17 de marzo de 1975 con el asesinato del periodista y director de la revista Ahora!, Orlando Martínez, en las cercanías de la Universidad Autónoma de Santo Domingo (UASD).',
    impact:
      'Símbolo permanente de la libertad de prensa, los derechos civiles y la resistencia democrática en la República Dominicana.',
    source: 'Colegio Dominicano de Periodistas · Museo Memorial de la Resistencia Dominicana',
  },
  {
    id: 'hito-faro-a-colon-1992',
    title: 'Faro a Colón (Santo Domingo Este — Obras del V Centenario)',
    date: '6 de octubre de 1992',
    year: 1992,
    epoch: 'Siglo XX',
    type: 'fundacion',
    category: 'Fundación',
    periodId: 'balaguer',
    lat: 18.4785,
    lng: -69.8682,
    province: 'Santo Domingo',
    protagonists: ['Joaquín Balaguer', 'Joseph Lea Gleave (diseño original)', 'Teófilo Carbonell'],
    summary:
      'Monumento y museo en forma de cruz de hormigón inaugurado en 1992 como obra cumbre del programa urbanístico de los «Diez Años» (1986–1996).',
    chronicle:
      'Concebido originalmente por el arquitecto escocés Joseph Lea Gleave en 1931 y retomado a gran escala por Joaquín Balaguer durante su última etapa de gobierno (1986–1996), el Faro a Colón fue inaugurado en octubre de 1992 para el V Centenario del Descubrimiento y Evangelización de América, reflejando tanto el sello monumentalista balaguerista como los intensos debates sociales de la época.',
    impact:
      'Ícono arquitectónico de la política de inversión en obras monumentales y remodelación urbana de Santo Domingo en los años noventa.',
    source: 'Patronato del Faro a Colón · Historia de la Arquitectura Dominicana',
  },
  {
    id: 'hito-pacto-por-la-democracia-1994',
    title: 'Palacio Nacional / JCE (Pacto por la Democracia de 1994)',
    date: '10 de agosto de 1994',
    year: 1994,
    epoch: 'Siglo XX',
    type: 'proclamacion',
    category: 'Política',
    periodId: 'balaguer',
    lat: 18.4743,
    lng: -69.8981,
    province: 'Distrito Nacional',
    protagonists: [
      'Joaquín Balaguer',
      'José Francisco Peña Gómez',
      'Juan Bosch',
      'Monseñor Agripino Núñez Collado',
    ],
    summary:
      'Acuerdo político y reforma constitucional de 1994 que recortó el mandato presidencial a dos años, creó el balotaje y cerró el ciclo de Balaguer en 1996.',
    chronicle:
      'Tras la aguda crisis postelectoral de mayo de 1994, el presidente Joaquín Balaguer y los líderes opositores José Francisco Peña Gómez (PRD) y Juan Bosch (PLD) firmaron en el Palacio Nacional el Pacto por la Democracia el 10 de agosto de 1994. La reforma constitucional resultante prohibió la reelección consecutiva, estableció la doble vuelta electoral (50% + 1), creó el Consejo Nacional de la Magistratura y fijó nuevas elecciones para 1996.',
    impact:
      'Hito institucional decisivo que modernizó el sistema electoral y judicial dominicano y marcó el cierre de los gobiernos de Joaquín Balaguer (1960–1996).',
    source: 'Reforma Constitucional del 14 de Agosto de 1994 · Archivo General de la Nación',
  },
];
