import type { ExplorePeriodId, LayerId, RegimeFilter } from '../types/history';

export interface EncyclopediaSectionItem {
  id: string;
  titulo: string;
  subtitulo?: string;
  contenido: string;
  puntosClave: string[];
}

export interface HistoricalEncyclopediaPeriod {
  id: ExplorePeriodId;
  numero: number;
  titulo: string;
  rangoAniosLabel: string;
  subtitulo: string;
  color: string;
  resumen: string;
  seccionesTitulo: string;
  secciones: EncyclopediaSectionItem[];
  cierreTitulo: string;
  cierreTexto: string;
  protagonistasDestacados: string[];
  fuentesBibliograficas: string[];
  // Direct Map Connection
  targetYear: number;
  yearRange: [number, number];
  regimeFilter: RegimeFilter;
  territorialLayerId?: LayerId;
  routeId?: string;
  milestoneIds: string[];
  focusCenter: [number, number]; // [lat, lng]
  focusZoom: number;
}

export const HISTORICAL_ENCYCLOPEDIA_PERIODS: HistoricalEncyclopediaPeriod[] = [
  {
    id: 'taina',
    numero: 1,
    titulo: 'Época Taína',
    rangoAniosLabel: 'Pre-1492 – Siglo XVI',
    subtitulo: 'Cacicazgos de Quisqueya, cosmovisión indígena y resistencia de Enriquillo',
    color: '#D97706',
    resumen:
      'Antes de la llegada europea en 1492, la isla —llamada Quisqueya («Madre de todas las tierras»), Haití («Tierra montañosa») o Babeque— estaba habitada por la sociedad taína, de tronco lingüístico arahuaco. Su territorio se articulaba en cinco grandes cacicazgos: Marién (Guacanagarix), Maguá (Guarionex), Maguana (Caonabo), Jaragua (Bohechío y Anacaona) e Higüey (Cayacoa y Cotubanamá).',
    seccionesTitulo: 'Aspectos Clave de la Sociedad Taína',
    secciones: [
      {
        id: 'taina-organizacion',
        titulo: 'Organización Social y Política',
        subtitulo: 'Caciques, Nitaínos, Behiques y Naborías',
        contenido:
          'La sociedad taína poseía una estructura jerárquica y comunitaria cohesionada en torno a los yucayeques (aldeas) gobernados por un cacique o cacica, cuya sucesión seguía predominantemente la línea matrilineal.',
        puntosClave: [
          'Caciques: Jefes políticos, militares y redistribuidores de los bienes comunitarios de cada cacicazgo.',
          'Nitaínos: Estrato noble de guerreros, consejeros del cacique y supervisores de los límites territoriales.',
          'Behiques: Sacerdotes, chamanes y médicos tradicionales encargados del rito de la cohoba y la comunicación con los cemíes.',
          'Naborías: Población trabajadora dedicada al cultivo en conucos, la pesca, la alfarería y la cestería.',
        ],
      },
      {
        id: 'taina-cultura',
        titulo: 'Cultura, Economía y Cosmovisión',
        subtitulo: 'Conucos, Areíto, Batú y culto a los Cemíes',
        contenido:
          'Los taínos desarrollaron una agricultura avanzada basada en montículos de tierra (conucos) que evitaban la erosión y garantizaban cosechas continuas de yuca amarga —procesada con el sebucán para elaborar el casabe—, maíz, batata, maní, ají y tabaco.',
        puntosClave: [
          'El Areíto: Ceremonia colectiva de canto, danza e historia oral donde se transmitían las genealogías y hazañas de los ancestros.',
          'El Batú (Juego de Pelota): Ritual cívico-religioso practicado con una pelota de caucho en plazas ceremoniales rodeadas de monolitos (bateyes), como el Corral de los Indios.',
          'Cosmovisión y Cemíes: Veneración de Yúcahu Bagua Maórocoti (dios de la yuca y del mar) y Atabey (madre de las aguas dulces y la fertilidad), plasmada en miles de pictografías en las Cuevas del Pomier.',
        ],
      },
      {
        id: 'taina-resistencia',
        titulo: 'Resistencia Indígena ante la Conquista',
        subtitulo: 'De Caonabo y Anacaona a la gesta de Enriquillo en Bahoruco (1519–1533)',
        contenido:
          'Frente a la imposición del tributo de oro, los repartimientos y el sistema de encomiendas, los liderazgos taínos protagonizaron una tenaz defensa de su libertad y territorio.',
        puntosClave: [
          'Caonabo y la Vega Real (1493–1495): El cacique de Maguana destruyó el Fuerte de La Navidad y encabezó la resistencia interior antes de ser capturado.',
          'Anacaona en Jaragua (1503) y Cotubanamá en Higüey (1504): Defensa de la autonomía de los cacicazgos del suroeste y del este frente a las campañas de Nicolás de Ovando.',
          'Rebelión del Cacique Enriquillo (1519–1533): Alzamiento guerrillero invicto durante 14 años en la Sierra de Bahoruco que obligó al emperador Carlos V a firmar el primer tratado de paz y libertad indígena de América.',
        ],
      },
    ],
    cierreTitulo: 'Legado Histórico y Cultural',
    cierreTexto:
      'La huella taína perdura de manera viva en la toponimia nacional, el vocabulario cotidiano (huracán, hamaca, barbacoa, canoa, sabana), la gastronomía del casabe y los yacimientos arqueológicos y rupestres que conforman el patrimonio fundacional de la República Dominicana.',
    protagonistasDestacados: [
      'Cacique Enriquillo (Guarocuya)',
      'Cacica Anacaona',
      'Cacique Caonabo',
      'Guacanagarix',
      'Guarionex',
      'Cotubanamá',
    ],
    fuentesBibliograficas: [
      'Fray Bartolomé de las Casas · Historia de las Indias',
      'Frank Moya Pons · Después de Colón: Trabajo, Sociedad y Política en la Economía del Oro',
      'Marcio Veloz Maggiolo · Arqueología Prehistórica de Santo Domingo',
    ],
    targetYear: 1525,
    yearRange: [1492, 1550],
    regimeFilter: 'all',
    territorialLayerId: 'cacicazgos_1492',
    routeId: 'ruta-resistencia-taina-1492',
    milestoneIds: [
      'hito-corral-de-los-indios-1492',
      'hito-sierra-de-bahoruco-1519',
      'hito-cuevas-del-pomier-1492',
    ],
    focusCenter: [18.75, -70.65],
    focusZoom: 8,
  },
  {
    id: 'independencia',
    numero: 2,
    titulo: 'Independencia Nacional',
    rangoAniosLabel: '1838 – 1844',
    subtitulo: 'La Trinitaria, proclamación del 27 de febrero y batallas de Azua y Santiago',
    color: '#3B82F6',
    resumen:
      'El proceso de Independencia Nacional puso fin a los 22 años de unificación de la isla bajo el gobierno de Haití (1822–1844) y dio nacimiento a la República Dominicana como Estado soberano la noche del 27 de febrero de 1844, bajo el ideario liberal y democrático de Juan Pablo Duarte y los trinitarios.',
    seccionesTitulo: 'Aspectos Clave de la Gesta Independiente',
    secciones: [
      {
        id: 'indep-trinitaria',
        titulo: 'La Trinitaria (16 de julio de 1838)',
        subtitulo: 'Ideario de Duarte y organización clandestina «Dios, Patria y Libertad»',
        contenido:
          'Fundada por Juan Pablo Duarte el 16 de julio de 1838 en la casa de Doña Chepita Pérez de la Paz en Santo Domingo, la sociedad secreta La Trinitaria se estructuró en células de tres miembros para evitar delaciones y difundir la conciencia nacional.',
        puntosClave: [
          'Juramento Trinitario: Compromiso solemne de constituir una República libre, soberana e independiente de toda dominación extranjera bajo el lema «Dios, Patria y Libertad».',
          'La Filantrópica y La Dramática: Sociedades culturales y teatrales utilizadas por Duarte, Francisco del Rosario Sánchez y Matías Ramón Mella para despertar el sentimiento patriótico mediante obras cívicas.',
          'Alianza con los reformistas y Manifiesto del 16 de Enero de 1844: Redactado por Tomás Bobadilla y Francisco del Rosario Sánchez como acta doctrinal de la separación y los derechos ciudadanos.',
        ],
      },
      {
        id: 'indep-proclamacion',
        titulo: 'Proclamación en Santo Domingo (27 de febrero de 1844)',
        subtitulo: 'El trabucazo de Mella e izamiento del pabellón en la Puerta del Conde',
        contenido:
          'La noche del 27 de febrero de 1844, los patriotas se congregaron en la Puerta de la Misericordia y marcharon hacia el Baluarte de San Genaro (Puerta del Conde) para proclamar el Estado dominicano.',
        puntosClave: [
          'El Trabucazo de Mella: Ante la vacilación de algunos conjurados en la Puerta de la Misericordia, Matías Ramón Mella disparó su trabuco al aire, despejando toda marcha atrás.',
          'Izamiento de la Bandera Nacional: En la Puerta del Conde, Francisco del Rosario Sánchez izó la primera bandera tricolor confeccionada por Concepción Bona, María Trinidad Sánchez, Isabel Sosa y María de Jesús Pina.',
          'Junta Central Gubernativa: Instalación del primer gobierno colegiado de la República, encargado de organizar la defensa nacional y convocar al regreso de Duarte desde el exilio en Curazao.',
        ],
      },
      {
        id: 'indep-campanas',
        titulo: 'Campañas Militares Defensivas y Primera Constitución',
        subtitulo: 'Batalla del 19 de Marzo en Azua y Batalla del 30 de Marzo en Santiago',
        contenido:
          'En marzo de 1844 el presidente haitiano Charles Hérard marchó sobre la naciente República con tres columnas militares, siendo derrotado decisivamente tanto en el Sur como en el Cibao.',
        puntosClave: [
          'Batalla del 19 de Marzo (Azua): Las tropas del Ejército del Sur dirigidas por Pedro Santana, Antonio Duvergé y la artillería de Francisco Soñé repelieron la ofensiva de Hérard en Azua.',
          'Batalla del 30 de Marzo (Santiago): En los fuertes Dios, Patria y Libertad, el general José María Imbert, la carga al machete de Fernando Valerio y el heroísmo de Juana Saltitopa derrotaron al ejército de Pierrot.',
          'Constitución de San Cristóbal (6 de noviembre de 1844): Promulgación de la primera Carta Magna dominicana que organizó el Estado republicano.',
        ],
      },
    ],
    cierreTitulo: 'Consolidación de la Primera República',
    cierreTexto:
      'La proclamación del 27 de febrero de 1844 y las victorias de marzo en tierra y mar (Batalla Naval de Tortuguero, 15 de abril) afianzaron la existencia de la República Dominicana, consagrando a Juan Pablo Duarte, Francisco del Rosario Sánchez y Matías Ramón Mella como Padres de la Patria.',
    protagonistasDestacados: [
      'Juan Pablo Duarte',
      'Francisco del Rosario Sánchez',
      'Matías Ramón Mella',
      'María Trinidad Sánchez',
      'Concepción Bona',
      'Antonio Duvergé',
      'José María Imbert',
      'Juana Saltitopa',
    ],
    fuentesBibliograficas: [
      'Manifiesto del 16 de Enero de 1844 · Archivo General de la Nación',
      'José Gabriel García · Compendio de la Historia de Santo Domingo',
      'Emilio Rodríguez Demorizi · Guerra Dominico-Haitiana',
    ],
    targetYear: 1844,
    yearRange: [1838, 1856],
    regimeFilter: 'all',
    territorialLayerId: 'provincias_1844',
    routeId: 'ruta-independencia-1844',
    milestoneIds: [
      'hito-puerta-del-conde-1844',
      'hito-19-de-marzo-1844',
      'hito-30-de-marzo-1844',
    ],
    focusCenter: [18.85, -70.35],
    focusZoom: 8,
  },
  {
    id: 'restauracion',
    numero: 3,
    titulo: 'Guerra de la Restauración',
    rangoAniosLabel: '1863 – 1865',
    subtitulo: 'El Grito de Capotillo, el Gobierno Restaurador de Santiago y la Segunda República',
    color: '#E63946',
    resumen:
      'La Guerra de la Restauración (1863–1865) fue una gesta patriótica, popular y anticolonial librada por el pueblo dominicano para recuperar la independencia tras la Anexión a España proclamada por Pedro Santana el 18 de marzo de 1861. Mediante una intensa guerra de guerrillas en todo el territorio, los restauradores lograron la retirada definitiva de las tropas españolas en julio de 1865.',
    seccionesTitulo: 'Aspectos Clave de la Epopeya Restauradora',
    secciones: [
      {
        id: 'rest-capotillo',
        titulo: 'El Grito de Capotillo (16 de agosto de 1863)',
        subtitulo: 'Los 14 héroes en Dajabón y el levantamiento de la Línea Noroeste',
        contenido:
          'Tras los alzamientos precursores de Moca (2 de mayo de 1861), el martirio de Francisco del Rosario Sánchez en San Juan (4 de julio de 1861) y los pronunciamientos de febrero de 1863 en Sabaneta y Guayubín, la insurrección definitiva estalló el 16 de agosto de 1863.',
        puntosClave: [
          'Catorce patriotas en el Cerro de Capotillo: Liderados por Santiago Rodríguez, Benito Monción, José Cabrera y Pedro Antonio Pimentel, izaron el pabellón tricolor al toque de diana.',
          'Expansión relámpago por la Línea Noroeste: Toma inmediata de Sabaneta, Guayubín, Monte Cristi y avance masivo de columnas campesinas hacia el Valle del Cibao.',
          'Guerra de carácter social y nacional: Participación decisiva del campesinado, artesanos y oficiales criollos frente a la administración colonial española.',
        ],
      },
      {
        id: 'rest-santiago',
        titulo: 'Sitio de Santiago y Gobierno Provisorio Restaurador',
        subtitulo: 'Fortaleza San Luis y Acta de Independencia del 14 de septiembre de 1863',
        contenido:
          'A inicios de septiembre de 1863 más de seis mil combatientes restauradores rodearon a las fuerzas españolas atrincheradas en la Fortaleza San Luis de Santiago de los Caballeros.',
        puntosClave: [
          'Sitio e Incendio de Santiago (6 de septiembre de 1863): Bajo el mando de Gaspar Polanco y el joven general Gregorio Luperón, el asalto e incendio de la plaza quebró la defensa realista y obligó a la columna española a retirarse hacia Puerto Plata.',
          'Gobierno Provisorio en Santiago (14 de septiembre de 1863): Instalación de la República en Armas presidida por José Antonio (Pepillo) Salcedo y Vicepresidencia de Benigno Filomeno de Rojas, con figuras civilistas como Ulises Francisco Espaillat.',
          'Guerra de guerrillas sistemática: Desgaste continuo de las columnas enviadas desde Cuba y Puerto Rico mediante emboscadas, control de pasos montañosos y corte de suministros.',
        ],
      },
      {
        id: 'rest-triunfo',
        titulo: 'Triunfo Militar y Evacuación Española (Julio de 1865)',
        subtitulo: 'Victoria en el Sur y nacimiento de la Segunda República',
        contenido:
          'La guerra se extendió al Este y al Sur bajo la jefatura de Gregorio Luperón, Pedro Florentino, Eusebio Manzueta y José María Cabral, quien obtuvo la victoria decisiva de La Canela (4 de diciembre de 1864).',
        puntosClave: [
          'Derrota estratégica del ejército colonial: Las bajas por combates y enfermedades tropicales y el alto costo financiero hicieron insostenible la ocupación española.',
          'Decreto de abandono (3 de marzo de 1865): La reina Isabel II firmó la derogación de la Anexión y ordenó el retiro de las fuerzas españolas, completado en julio de 1865.',
          'Consolidación de la Segunda República: Reafirmación definitiva de la identidad nacional dominicana y su impacto inspirador en el Grito de Lares (Puerto Rico) y el Grito de Yara (Cuba) en 1868.',
        ],
      },
    ],
    cierreTitulo: 'Significado Histórico en el Caribe',
    cierreTexto:
      'La Guerra de la Restauración no solo devolvió la soberanía a la República Dominicana e inauguró la Segunda República, sino que demostró que una nación caribeña podía derrotar mediante la unidad popular a una potencia imperial europea.',
    protagonistasDestacados: [
      'Gregorio Luperón',
      'Santiago Rodríguez',
      'Benito Monción',
      'Gaspar Polanco',
      'José Cabrera',
      'Pedro Antonio Pimentel',
      'Ulises Francisco Espaillat',
      'José María Cabral',
    ],
    fuentesBibliograficas: [
      'Gregorio Luperón · Notas Autobiográficas y Apuntes Históricos',
      'Pedro María Archambault · Historia de la Restauración',
      'Roberto Cassá · Historia Social y Económica de la República Dominicana',
    ],
    targetYear: 1863,
    yearRange: [1861, 1865],
    regimeFilter: 'all',
    routeId: 'ruta-restauracion-1863',
    milestoneIds: ['hito-capotillo-1863', 'hito-sitio-santiago-1863'],
    focusCenter: [19.48, -71.15],
    focusZoom: 9,
  },
  {
    id: 'trujillo',
    numero: 4,
    titulo: 'Era de Trujillo',
    rangoAniosLabel: '1930 – 1961',
    subtitulo: 'Totalitarismo, culto a la personalidad, terror de Estado y ajusticiamiento del 30 de Mayo',
    color: '#9B2226',
    resumen:
      'La Era de Trujillo abarca los 31 años de dictadura absoluta ejercida por Rafael Leónidas Trujillo Molina desde su llegada al poder en 1930 —tras el movimiento contra el presidente Horacio Vásquez— hasta su ajusticiamiento la noche del 30 de mayo de 1961. Fue uno de los regímenes totalitarios más férreos y prolongados de América Latina.',
    seccionesTitulo: 'Características Principales y Fin de la Dictadura',
    secciones: [
      {
        id: 'trujillo-control',
        titulo: 'Control Absoluto, Partido Único y Culto a la Personalidad',
        subtitulo: 'El Partido Dominicano y «Ciudad Trujillo» (1936–1961)',
        contenido:
          'El régimen suprimió el pluralismo político, subordinó el Congreso y el Poder Judicial, e impuso la afiliación obligatoria al Partido Dominicano («La Palmita»), cuyo carnet —junto a «los tres golpes» de la cédula— era requisito indispensable para trabajar o transitar.',
        puntosClave: [
          'Culto megalómano a la personalidad: En 1936 la capital de cinco siglos fue rebautizada como «Ciudad Trujillo» y la montaña más alta de las Antillas como «Pico Trujillo».',
          'Títulos oficiales y adoctrinamiento: Imposición de los títulos de «Benefactor de la Patria» y «Padre de la Patria Nueva», bustos obligatorios, cartillas escolares y lemas como «Dios y Trujillo».',
          'Presidentes títeres: Aunque Trujillo cedió formalmente la banda presidencial en algunos períodos a Jacinto Peynado, Manuel de Jesús Troncoso, su hermano Héctor Bienvenido Trujillo y Joaquín Balaguer, conservó intacto el mando supremo.',
        ],
      },
      {
        id: 'trujillo-represion',
        titulo: 'Represión, Terror de Estado y Masacre de 1937',
        subtitulo: 'La 42, el SIM, el Centro «La 40», Masacre del Perejil y Hermanas Mirabal',
        contenido:
          'La dictadura sostuvo su dominio mediante un aparato de espionaje, terror psicológico, prisiones clandestinas y eliminación física de cualquier disidencia interna o en el exilio.',
        puntosClave: [
          'Aparato represivo (La 42 y el SIM): Desde la banda paramilitar «La 42» en 1930 hasta el temido Servicio de Inteligencia Militar (SIM) dirigido por Johnny Abbes García y sus centros de tortura como «La 40» en Cristo Rey.',
          'Masacre del Perejil (Octubre de 1937): Orden de exterminio ejecutada en la frontera norte y la cuenca del río Masacre/Dajabón contra miles de habitantes haitianos y dominico-haitianos.',
          'Gesta de Junio de 1959 y Hermanas Mirabal (1960): Inmolación de los expedicionarios de Constanza, Maimón y Estero Hondo, surgimiento del Movimiento Revolucionario 14 de Junio (Manolo Tavárez Justo) y asesinato de las hermanas Patria, Minerva y María Teresa Mirabal el 25 de noviembre de 1960.',
        ],
      },
      {
        id: 'trujillo-economia-exterior',
        titulo: 'Monopolio Económico del Clan y Crisis Internacional',
        subtitulo: 'Acaparamiento empresarial y sanciones de la OEA (1960)',
        contenido:
          'Trujillo utilizó el Estado para construir un emporio familiar que llegó a controlar cerca del 70% de la producción nacional, al tiempo que sus crímenes en el exterior provocaron el aislamiento diplomático del régimen.',
        puntosClave: [
          'Monopolio económico personal: Control de los principales ingenios azucareros (Río Haina), sal, leche, carne, cemento, tabaco, seguros, aviación y banca, junto a la firma del Tratado Trujillo-Hull (1940) y la creación del Banco Central (1947).',
          'Terrorismo extraterritorial: Secuestro y desaparición de Jesús de Galíndez en Nueva York (1956), asesinato de Mauricio Báez en La Habana (1950) y atentado con coche bomba contra el presidente de Venezuela, Rómulo Betancourt, en junio de 1960.',
          'Sanciones de la OEA (Agosto de 1960): En la VI Reunión de Cancilleres en Costa Rica, los países americanos rompieron relaciones diplomáticas e impusieron sanciones económicas contra la dictadura.',
        ],
      },
    ],
    cierreTitulo: 'Fin de la Era: Ajusticiamiento del 30 de Mayo de 1961',
    cierreTexto:
      'La noche del 30 de mayo de 1961, en la carretera Santo Domingo–San Cristóbal (hoy Autopista 30 de Mayo), un comando integrado por Antonio de la Maza, Antonio Imbert Barrera, Amado García Guerrero, Salvador Estrella Sadhalá, Huáscar Tejeda, Roberto Pastoriza y Pedro Livio Cedeño —en conspiración con Juan Tomás Díaz, Modesto Díaz y Luis Amiama Tió— interceptó y ajustició al dictador, abriendo paso al despertar democrático del pueblo dominicano.',
    protagonistasDestacados: [
      'Patria, Minerva y María Teresa Mirabal',
      'Manolo Tavárez Justo',
      'Héroes de Constanza, Maimón y Estero Hondo',
      'Antonio de la Maza',
      'Antonio Imbert Barrera',
      'Juan Tomás Díaz',
      'Amado García Guerrero',
      'Salvador Estrella Sadhalá',
    ],
    fuentesBibliograficas: [
      'Roberto Cassá · Capitalismo y Dictadura',
      'Bernardo Vega · Los Estados Unidos y Trujillo',
      'Museo Memorial de la Resistencia Dominicana · Archivos de la Era de Trujillo',
    ],
    targetYear: 1961,
    yearRange: [1930, 1961],
    regimeFilter: 'trujillo',
    milestoneIds: [
      'hito-rio-masacre-1937',
      'hito-la-40-sim-1957',
      'hito-hermanas-mirabal-1960',
      'hito-ajusticiamiento-1961',
    ],
    focusCenter: [18.95, -70.55],
    focusZoom: 8,
  },
  {
    id: 'balaguer',
    numero: 5,
    titulo: 'Gobiernos de Balaguer',
    rangoAniosLabel: '1960 – 1996',
    subtitulo: 'Transición post-Trujillo, los «Doce Años» (1966–1978), los «Diez Años» (1986–1996) y el Pacto por la Democracia',
    color: '#0D9488',
    resumen:
      'Joaquín Balaguer Ricardo (1906–2002) gobernó la República Dominicana en tres grandes etapas: la transición de 1960–1962, los «Doce Años» (1966–1978) y los «Diez Años» (1986–1996). Su prolongada gravitación política definió el modelo de inversión en infraestructura, el presidencialismo centralizado y las reformas electorales de finales del siglo XX.',
    seccionesTitulo: 'Las Tres Etapas Principales y Aspectos Clave',
    secciones: [
      {
        id: 'balaguer-etapa1',
        titulo: '1.ª Etapa: Transición tras el Fin de Trujillo (1960–1962)',
        subtitulo: 'Del gobierno nominal de agosto de 1960 al Consejo de Estado',
        contenido:
          'Designado presidente nominal en agosto de 1960 tras la renuncia de Héctor Bienvenido Trujillo para intentar suavizar las sanciones de la OEA, Balaguer permaneció en el Palacio Nacional cuando Trujillo fue ajusticiado el 30 de mayo de 1961.',
        puntosClave: [
          'Apertura controlada y retorno de exiliados (1961): Llegada al país de la comisión del PRD (Ángel Miolán, Nicolás Silfa y Ramón Castillo) el 5 de julio de 1961 y movilizaciones de la Unión Cívica Nacional (UCN) y el Movimiento 14 de Junio.',
          'Salida de la familia Trujillo (Noviembre de 1961): Tras la rebelión de los pilotos de la Fuerza Aérea y la presión popular y diplomática, los hermanos del dictador y Ramfis Trujillo abandonaron el país.',
          'Consejo de Estado y exilio (Enero de 1962): El 1 de enero de 1962 se instaló el Consejo de Estado; tras la crisis cívico-militar de mediados de enero, Balaguer se asiló en la Nunciatura Apostólica y partió al exilio en Nueva York.',
        ],
      },
      {
        id: 'balaguer-etapa2',
        titulo: '2.ª Etapa: Los «Doce Años» (1966–1978)',
        subtitulo: 'Crecimiento económico, obras públicas, leyes agrarias y represión política',
        contenido:
          'Tras la Revolución de Abril de 1965 y la intervención militar estadounidense, Balaguer fundó el Partido Reformista, ganó las elecciones de junio de 1966 frente a Juan Bosch y gobernó durante tres períodos consecutivos hasta 1978.',
        puntosClave: [
          'Infraestructura, presas y urbanismo: Construcción de las presas de Tavera (1973), Valdesia y Sabana Yegua, autopistas, la Plaza de la Cultura, el Centro Olímpico y multifamiliares.',
          'Leyes Agrarias de 1972 y política forestal: Reparto de tierras estatales a campesinos mediante el Instituto Agrario Dominicano (IAD) y cierre de aserraderos para proteger las cuencas hidrográficas.',
          'Autoritarismo y derechos humanos: Fuerte persecución contrainsurgente contra grupos de izquierda, sindicatos y estudiantes, actuación del grupo parapolicial «La Banda Colorá» y asesinatos políticos como el del periodista Orlando Martínez (17 de marzo de 1975).',
        ],
      },
      {
        id: 'balaguer-etapa3',
        titulo: '3.ª Etapa: Los «Diez Años» (1986–1996) y el Pacto por la Democracia',
        subtitulo: 'Obras del V Centenario, Faro a Colón y reforma constitucional de 1994',
        contenido:
          'Con casi 80 años y afectado de ceguera, Balaguer retornó al poder en 1986 al frente del Partido Reformista Social Cristiano (PRSC), reorientando la economía hacia el turismo, las zonas francas y un vasto programa monumental.',
        puntosClave: [
          'Monumentalismo y V Centenario (1986–1992): Construcción del Faro a Colón (inaugurado en 1992), acueductos, avenidas, remodelación urbana y planes de vivienda en Santo Domingo y Santiago.',
          'Crisis económica de 1990 y reformas estructurales: Tras el pico inflacionario y de escasez de 1990, su gobierno implementó reformas tributarias, arancelarias y financieras que estabilizaron la macroeconomía.',
          'Crisis electoral y Pacto por la Democracia (10 de agosto de 1994): Ante las denuncias de fraude contra José Francisco Peña Gómez (PRD), Balaguer firmó el Pacto por la Democracia y la reforma constitucional de 1994, que prohibió la reelección consecutiva, creó la doble vuelta electoral (50% + 1), fundó el Consejo Nacional de la Magistratura y recortó su período a dos años (1994–1996).',
        ],
      },
    ],
    cierreTitulo: 'Cierre de una Época (1996–2002)',
    cierreTexto:
      'En 1996 Joaquín Balaguer entregó el mando tras las elecciones pactadas en la reforma de 1994. Aún participó como candidato en los comicios del año 2000 y falleció en Santo Domingo el 14 de julio de 2002 a los 95 años de edad, cerrando el ciclo del caudillismo político dominicano del siglo XX.',
    protagonistasDestacados: [
      'Joaquín Balaguer',
      'Juan Bosch',
      'José Francisco Peña Gómez',
      'Orlando Martínez',
      'Francisco Alberto Caamaño Deñó',
    ],
    fuentesBibliograficas: [
      'Frank Moya Pons · Manual de Historia Dominicana',
      'Joaquín Balaguer · Memorias de un Cortesano de la Era de Trujillo',
      'Roberto Cassá · Historia Contemporánea de la República Dominicana',
    ],
    targetYear: 1996,
    yearRange: [1960, 1996],
    regimeFilter: 'balaguer',
    milestoneIds: [
      'hito-presa-de-tavera-1973',
      'hito-orlando-martinez-1975',
      'hito-faro-a-colon-1992',
      'hito-pacto-por-la-democracia-1994',
    ],
    focusCenter: [18.85, -70.25],
    focusZoom: 8,
  },
];
