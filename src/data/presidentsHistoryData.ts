export interface PresidentHistoryEntry {
  id: string;
  nombre: string;
  aliases?: string[];
  nacimientoMuerte?: string;
  provinciaNacimiento?: string;
  periodos: string[];
  partidoOcorriente: string;
  resumenGobierno: string;
  puntosPositivos: string[];
  puntosNegativos: string[];
  institucionesCreadas: string[];
  ordenCronologico: number;
  wikiTitle?: string;
  esColegiado?: boolean;
}

export const PRESIDENTS_HISTORY_DATA: PresidentHistoryEntry[] = [
  {
    id: 'junta-central-1844',
    nombre: 'Junta Central Gubernativa (1844)',
    aliases: [
      'Junta Central Gubernativa (Sánchez / Bobadilla)',
      'Junta Central Gubernativa',
      'Central Government Junta',
    ],
    nacimientoMuerte: '27 feb – 13 nov 1844',
    provinciaNacimiento: 'Santo Domingo',
    periodos: ['Febrero – Noviembre 1844 (Gobierno Provisional)'],
    partidoOcorriente: 'Trinitarios y Conservadores',
    resumenGobierno:
      'Primer órgano ejecutivo colegiado de la República Dominicana tras la proclamación de la Independencia en la Puerta del Conde. Organizó la defensa militar inicial ante Haití y convocó la Asamblea Constituyente de San Cristóbal.',
    puntosPositivos: [
      'Consolidó la ruptura con Haití y organizó las primeras victorias militares (19 y 30 de marzo de 1844).',
      'Abolió formalmente la esclavitud desde sus primeros decretos ejecutivos.',
      'Convocó el Congreso Constituyente que redactó la primera Carta Magna dominicana.',
    ],
    puntosNegativos: [
      'Fractura interna temprana entre el sector liberal trinitario (Duarte/Sánchez) y el conservador (Bobadilla/Santana).',
      'Expulsión al exilio de los Padres de la Patria tras el golpe conservador de julio de 1844.',
      'Gestión inicial de propuestas de protectorado extranjero ante potencias europeas.',
    ],
    institucionesCreadas: [
      'Ejército Libertador y Guardias Nacionales',
      'Constitución de San Cristóbal (1844)',
      'Primeros Tribunales de la República',
      'Comisiones de Relaciones Exteriores y Hacienda',
    ],
    ordenCronologico: 1,
    wikiTitle: 'Central Government Junta',
    esColegiado: true,
  },
  {
    id: 'pres-sanchez',
    nombre: 'Francisco del Rosario Sánchez',
    nacimientoMuerte: '1817–1861',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['27 feb – 1 mar 1844 (Presidente inicial Junta Central Gubernativa)'],
    partidoOcorriente: 'Movimiento Trinitario',
    resumenGobierno:
      'Padre de la Patria y estratega clave de la Independencia Nacional ante la ausencia de Juan Pablo Duarte. Encabezó la proclamación del 27 de febrero de 1844 y presidió brevemente la Junta Central antes de ceder la presidencia a Tomás Bobadilla.',
    puntosPositivos: [
      'Proclamó la República Dominicana en la Puerta del Conde e izó la primera bandera nacional.',
      'Redactó bandos iniciales garantizando la abolición definitiva de la esclavitud y el orden ciudadano.',
      'Defendió la soberanía sin protectorados y encabezó en 1861 la resistencia armada contra la Anexión.',
    ],
    puntosNegativos: [
      'Brevedad de su ejercicio ejecutivo debido al desplazamiento político por facciones conservadoras.',
      'Persecución, destierro y posterior fusilamiento en San Juan de la Maguana en 1861 por oponerse a Santana.',
    ],
    institucionesCreadas: [
      'Junta Central Gubernativa (1844)',
      'Símbolos Patrios y Proclama de Independencia',
      'Movimiento Regenerador de 1861',
    ],
    ordenCronologico: 2,
    wikiTitle: 'Francisco del Rosario Sánchez',
  },
  {
    id: 'pres-bobadilla',
    nombre: 'Tomás Bobadilla y Briones',
    aliases: ['Tomás Bobadilla'],
    nacimientoMuerte: '1785–1871',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['1 mar – 9 jun 1844 (Presidente Junta Central Gubernativa)'],
    partidoOcorriente: 'Conservador',
    resumenGobierno:
      'Jurista de amplia trayectoria en las administraciones colonial, haitiana y republicana; coautor del Manifiesto del 16 de Enero de 1844. Estructuró las primeras bases administrativas y fiscales de la naciente República.',
    puntosPositivos: [
      'Aportó experiencia jurídica y burocrática indispensable para organizar el nuevo Estado en 1844.',
      'Impulsó la organización de las aduanas, la hacienda pública y la defensa en el sur y el norte.',
      'Presidió posteriormente la Suprema Corte de Justicia y el Senado Consultor.',
    ],
    puntosNegativos: [
      'Impulsó negociaciones tempranas para establecer un protectorado con Francia (Plan Levasseur).',
      'Participó en pugnas faccionales que desembocaron en golpes dentro de la propia Junta Central.',
    ],
    institucionesCreadas: [
      'Manifiesto del 16 de Enero de 1844',
      'Administración Fiscal y Aduanera Inicial',
      'Suprema Corte de Justicia (organización orgánica)',
    ],
    ordenCronologico: 3,
    wikiTitle: 'Tomás Bobadilla',
  },
  {
    id: 'pres-pedro-santana',
    nombre: 'Pedro Santana Familias',
    aliases: ['Pedro Santana', 'Pedro Santana (1.º mandato)', 'Pedro Santana (2.º mandato)', 'Pedro Santana (3.º mandato)'],
    nacimientoMuerte: '1801–1864',
    provinciaNacimiento: 'El Seibo',
    periodos: ['1844–1848', '1849 (Jefe Supremo)', '1853–1856', '1858–1861'],
    partidoOcorriente: 'Conservador (Santanista)',
    resumenGobierno:
      'Primer presidente constitucional y caudillo militar dominante de la Primera República. Dirigió con éxito la defensa militar frente a las invasiones haitianas, aunque gobernó bajo facultades extraordinarias y culminó su ciclo anexando el país a España en 1861.',
    puntosPositivos: [
      'Lideró las victorias militares de Azua, Las Carreras y la campaña fronteriza, asegurando la independencia física del país.',
      'Logró el primer tratado de reconocimiento diplomático y amistad con Francia, Gran Bretaña y España.',
      'Promovió la reorganización básica del ejército y la división territorial inicial en cinco provincias.',
    ],
    puntosNegativos: [
      'Impuso el artículo 210 de la Constitución de 1844 que le otorgaba poderes dictatoriales.',
      'Desterró y ordenó fusilamientos de figuras patrióticas como María Trinidad Sánchez y Francisco del Rosario Sánchez.',
      'Decretó la Anexión a España en 1861, suprimiendo la soberanía republicana.',
    ],
    institucionesCreadas: [
      'Constitución de San Cristóbal (1844)',
      'División Política en 5 Provincias Originales',
      'Ejército Nacional Permanente',
      'Aduanas Nacionales y Tribunales Militares',
    ],
    ordenCronologico: 4,
    wikiTitle: 'Pedro Santana',
  },
  {
    id: 'pres-manuel-jimenes',
    nombre: 'Manuel Jimenes González',
    aliases: ['Manuel Jimenes'],
    nacimientoMuerte: '1808–1854',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['8 sep 1848 – 29 may 1849'],
    partidoOcorriente: 'Liberal',
    resumenGobierno:
      'Segundo presidente constitucional, electo tras la renuncia de Santana en 1848 con expectativa de apertura democrática. Su breve gestión quedó marcada por la amnistía a los trinitarios y por la crisis militar provocada por la invasión del emperador Faustino Soulouque.',
    puntosPositivos: [
      'Decretó una amplia amnistía política permitiendo el regreso de Juan Pablo Duarte, Sánchez y Mella.',
      'Intentó reducir el gasto militar y gobernar con mayor apego a las prerrogativas del Congreso.',
    ],
    puntosNegativos: [
      'Falta de cohesión militar y desmovilización de tropas frente a la ofensiva haitiana de 1849.',
      'Incapacidad para contener la insurrección de Santana tras la batalla de Las Carreras, lo que provocó su caída.',
    ],
    institucionesCreadas: [
      'Decreto de Amnistía Política de 1848',
      'Ley de Libertad de Imprenta y Garantías Civiles',
    ],
    ordenCronologico: 5,
    wikiTitle: 'Manuel Jimenes',
  },
  {
    id: 'pres-buenaventura-baez',
    nombre: 'Buenaventura Báez Méndez',
    aliases: [
      'Buenaventura Báez',
      'Buenaventura Báez (1.º mandato)',
      'Buenaventura Báez (2.º mandato — Santo Domingo)',
      'Buenaventura Báez (3.º mandato)',
      'Buenaventura Báez (Los Seis Años)',
      'Buenaventura Báez (5.º mandato)',
    ],
    nacimientoMuerte: '1812–1884',
    provinciaNacimiento: 'Azua',
    periodos: ['1849–1853', '1856–1858', '1865–1866', '1868–1874', '1876–1878'],
    partidoOcorriente: 'Partido Rojo (Baecista)',
    resumenGobierno:
      'Cinco veces presidente y gran rival político de Pedro Santana y del Partido Azul. Destacó por su habilidad diplomática y la creación de infraestructura educativa temprana, pero sus mandatos se caracterizaron por endeudamientos onerosos, emisión monetaria inorgánica y reiterados proyectos de anexión a potencias extranjeras.',
    puntosPositivos: [
      'Logró tratados comerciales y de reconocimiento internacional con potencias europeas en su primer período.',
      'Fundó el Colegio San Buenaventura y reorganizó la administración judicial y diplomática.',
      'Mantuvo una amplia base popular caudillista en las regiones sur y oeste del país.',
    ],
    puntosNegativos: [
      'Emisión fraudulenta de papel moneda en 1857 que arruinó a los productores de tabaco del Cibao y desató la guerra civil.',
      'Contratación del lesivo Empréstito Hartmont en 1869 con graves consecuencias financieras.',
      'Negociaciones para anexar la República Dominicana a los Estados Unidos y arrendar la península de Samaná.',
      'Represión política durante el régimen de los Seis Años (1868–1874).',
    ],
    institucionesCreadas: [
      'Colegio San Buenaventura (1852)',
      'Tratados Diplomáticos con Gran Bretaña y Francia',
      'Reforma de Códigos Judiciales y Notariales',
    ],
    ordenCronologico: 6,
    wikiTitle: 'Buenaventura Báez',
  },
  {
    id: 'pres-regla-mota',
    nombre: 'Manuel de Regla Mota',
    nacimientoMuerte: '1795–1864',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['26 may – 8 oct 1856'],
    partidoOcorriente: 'Conservador (Santanista)',
    resumenGobierno:
      'Vicepresidente que asumió la jefatura del Estado tras la renuncia de Santana en 1856. Gobernó durante cuatro meses marcados por una severa crisis fiscal, presiones diplomáticas y el inminente retorno de Buenaventura Báez.',
    puntosPositivos: [
      'Mantuvo la continuidad administrativa pacífica evitando un colapso institucional inmediato tras la salida de Santana.',
      'Afrontó con austeridad presupuestaria los compromisos de defensa fronteriza.',
    ],
    puntosNegativos: [
      'Escaso margen de maniobra política ante el cónsul español Antonio María Segovia y la oposición baecista.',
      'Renuncia prematura sin lograr estabilizar el valor de la moneda nacional.',
    ],
    institucionesCreadas: [
      'Reglamentación de Matrículas Consulares y Aduanas',
    ],
    ordenCronologico: 7,
    wikiTitle: 'Manuel de Regla Mota',
  },
  {
    id: 'pres-valverde',
    nombre: 'José Desiderio Valverde',
    aliases: ['José Desiderio Valverde (Gobierno de Santiago)'],
    nacimientoMuerte: '1822–1903',
    provinciaNacimiento: 'Santiago',
    periodos: ['7 jul 1857 – 31 ago 1858 (Gobierno Provisional en Santiago)'],
    partidoOcorriente: 'Liberal Cibaeño',
    resumenGobierno:
      'Líder de la Revolución Cibaeña de 1857 contra Buenaventura Báez, estableciendo un gobierno paralelo con sede en Santiago. Bajo su mandato se convocó la Asamblea Constituyente de Moca, que produjo la carta constitucional más democrática del siglo XIX dominicano.',
    puntosPositivos: [
      'Auspició la Constitución de Moca de 1858, que abolió la pena de muerte por motivos políticos y estableció elecciones directas.',
      'Trasladó temporalmente la capital a Santiago e impulsó el respaldo económico a los productores agrícolas del Cibao.',
    ],
    puntosNegativos: [
      'Prolongada guerra civil entre el gobierno de Santiago y el sitiado gobierno de Báez en Santo Domingo.',
      'Su alianza táctica con Pedro Santana terminó facilitando el derrocamiento de la propia Constitución de Moca.',
    ],
    institucionesCreadas: [
      'Constitución Liberal de Moca (1858)',
      'Gobierno Provisional del Cibao (Santiago)',
      'Garantías de Libertad de Expresión y Sufragio',
    ],
    ordenCronologico: 8,
    wikiTitle: 'José Desiderio Valverde',
  },
  {
    id: 'anexion-espana-1861',
    nombre: 'Anexión a España (Capitanía General)',
    aliases: ['Felipe Rivero y Lemoine', 'Carlos de Vargas', 'José de la Gándara'],
    nacimientoMuerte: '18 mar 1861 – 11 jul 1865',
    provinciaNacimiento: 'Santo Domingo',
    periodos: ['1861–1865 (Capitanía General Española: Santana, Rivero, Vargas, La Gándara)'],
    partidoOcorriente: 'Monarquía Española (Isabel II)',
    resumenGobierno:
      'Período en que la República Dominicana perdió su condición de Estado soberano al reincorporarse como provincia de ultramar de España. El descontento por la discriminación racial, las cargas fiscales y el choque cultural detonó la Guerra de la Restauración en 1863.',
    puntosPositivos: [
      'Ejecución parcial de obras portuarias, registros estadísticos e infraestructura administrativa básica en las ciudades principales.',
    ],
    puntosNegativos: [
      'Supresión de la soberanía nacional y de los derechos ciudadanos republicanos.',
      'Discriminación contra la oficialidad militar dominicana, imposiciones religiosas y temor al restablecimiento de la esclavitud.',
      'Devastación material, incendios urbanos y miles de bajas durante la guerra contra los restauradores.',
    ],
    institucionesCreadas: [
      'Capitanía General de Santo Domingo (1861–1865)',
      'Real Audiencia Territorial Restaurada',
    ],
    ordenCronologico: 9,
    wikiTitle: 'Felipe Rivero y Lemoine',
    esColegiado: true,
  },
  {
    id: 'pres-pepillo-salcedo',
    nombre: 'José Antonio Salcedo (Pepillo)',
    aliases: [
      'José Antonio Salcedo',
      'Gobierno Provisional Restaurador (Salcedo · Polanco · Rojas · Pimentel)',
    ],
    nacimientoMuerte: '1816–1864',
    provinciaNacimiento: 'Montecristi (criado en Estero Balsa / Santiago)',
    periodos: ['14 sep 1863 – 10 oct 1864 (Presidente Gobierno Restaurador)'],
    partidoOcorriente: 'Ejército y Gobierno Restaurador',
    resumenGobierno:
      'Primer presidente del Gobierno Provisional Restaurador instalado en Santiago tras el Grito de Capotillo. Organizó la logística de la guerra de guerrillas contra el ejército español, aunque su manejo negociador le generó conflictos fatales con el alto mando militar.',
    puntosPositivos: [
      'Estructuró el Gobierno en Armas en Santiago tras la toma de la ciudad en septiembre de 1863.',
      'Coordinó el suministro de armas y la estrategia guerrillera de desgaste en todo el territorio nacional.',
    ],
    puntosNegativos: [
      'Búsqueda de contactos conciliatorios con Pedro Santana y España que despertaron recelos entre los jefes restauradores.',
      'Fue derrocado y posteriormente fusilado en Maimón en noviembre de 1864 por orden de Gaspar Polanco.',
    ],
    institucionesCreadas: [
      'Gobierno Provisional Restaurador (Santiago, 1863)',
      'Ejército Nacional Restaurador (guerra de guerrillas)',
    ],
    ordenCronologico: 10,
    wikiTitle: 'José Antonio Salcedo',
  },
  {
    id: 'pres-gaspar-polanco',
    nombre: 'Gaspar Polanco Borbón',
    aliases: ['Gaspar Polanco'],
    nacimientoMuerte: '1816–1867',
    provinciaNacimiento: 'Montecristi',
    periodos: ['10 oct 1864 – 24 ene 1865 (Presidente Gobierno Restaurador)'],
    partidoOcorriente: 'Ejército Restaurador',
    resumenGobierno:
      'Comandante militar destacado en el sitio de Santiago y jefe supremo durante la etapa decisiva de la Guerra de la Restauración. Impulsó medidas educativas y de ordenamiento financiero en pleno conflicto armado.',
    puntosPositivos: [
      'Intensificó el asedio militar que llevó a España a reconsiderar el costo de mantener la colonia.',
      'Emitió decretos pioneros para la creación de escuelas primarias en los cantones libres.',
      'Reorganizó la circulación monetaria y los recursos para el ejército restaurador.',
    ],
    puntosNegativos: [
      'Ordenó el derrocamiento y ejecución sumaria de José Antonio Salcedo (Pepillo) en noviembre de 1864.',
      'Medidas económicas autoritarias que provocaron su derrocamiento por la Junta de Enero de 1865.',
    ],
    institucionesCreadas: [
      'Decreto de Educación Primaria del Gobierno Restaurador (1864)',
      'Comisaría de Guerra y Abastecimiento',
    ],
    ordenCronologico: 11,
    wikiTitle: 'Gaspar Polanco',
  },
  {
    id: 'pres-rojas',
    nombre: 'Benigno Filomeno de Rojas',
    nacimientoMuerte: '1811–1865',
    provinciaNacimiento: 'Santiago',
    periodos: ['24 ene – 24 mar 1865 (Presidente Junta Superior Gubernativa)'],
    partidoOcorriente: 'Liberal Civilista (Restaurador)',
    resumenGobierno:
      'Jurista, economista y pensador liberal formado en Europa; presidió la Junta Superior tras la caída de Polanco y convocó la Convención Nacional de 1865. Defendió la institucionalidad civil y el retorno a las libertades de la Constitución de Moca.',
    puntosPositivos: [
      'Restableció la preeminencia del poder civil frente al caudillismo militar durante el tramo final de la Restauración.',
      'Convocó la Convención Nacional que reinstauró los principios liberales en la Constitución de 1865.',
      'Impulsó proyectos de fomento agrícola, bancario y educación cívica.',
    ],
    puntosNegativos: [
      'Brevedad de su administración y dificultades para someter las rivalidades entre generales regionales.',
    ],
    institucionesCreadas: [
      'Convención Nacional Constituyente de 1865',
      'Junta Superior Gubernativa Civilista',
    ],
    ordenCronologico: 12,
    wikiTitle: 'Benigno Filomeno de Rojas',
  },
  {
    id: 'pres-pimentel',
    nombre: 'Pedro Antonio Pimentel Chamorro',
    aliases: ['Pedro Antonio Pimentel'],
    nacimientoMuerte: '1830–1874',
    provinciaNacimiento: 'Montecristi',
    periodos: ['25 mar – 4 ago 1865'],
    partidoOcorriente: 'Partido Azul (Restaurador)',
    resumenGobierno:
      'Último presidente del Gobierno Provisional Restaurador; condujo la fase final de la guerra hasta la promulgación del Real Decreto español de abandono en mayo de 1865 y la evacuación de las tropas extranjeras en julio.',
    puntosPositivos: [
      'Condujo con firmeza la negociación y vigilancia del retiro definitivo del ejército español.',
      'Rechazó compensaciones territoriales o condiciones lesivas a la soberanía nacional tras la victoria.',
    ],
    puntosNegativos: [
      'Conflictos con jefes militares del sur (José María Cabral) que culminaron en su desplazamiento en agosto de 1865.',
    ],
    institucionesCreadas: [
      'Comisión de Evacuación y Recuperación de Plazas Nacionales (1865)',
      'Base orgánica del Partido Nacional Liberal (Azul)',
    ],
    ordenCronologico: 13,
    wikiTitle: 'Pedro Antonio Pimentel',
  },
  {
    id: 'pres-jose-maria-cabral',
    nombre: 'José María Cabral y Luna',
    aliases: ['José María Cabral', 'José María Cabral (Protectorado y 1.º mandato)', 'José María Cabral (2.º mandato)'],
    nacimientoMuerte: '1816–1899',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['4 ago – 15 nov 1865 (Protector)', '22 ago 1866 – 31 ene 1868'],
    partidoOcorriente: 'Partido Azul',
    resumenGobierno:
      'General héroe de las batallas de Santomé y La Canela; gobernó inmediatamente tras la salida de España y luego tras el Triunvirato de 1866. Impulsó la reforma constitucional con sufragio universal masculino y enfrentó la sublevación baecista.',
    puntosPositivos: [
      'Promulgó la Constitución de noviembre de 1865 y luego la de 1866 con sufragio universal masculino sin restricciones de propiedad.',
      'Defendió la autonomía municipal y las libertades de imprenta y reunión.',
    ],
    puntosNegativos: [
      'Inestabilidad armada crónica frente a las guerrillas del Partido Rojo en el sur y el este.',
      'Negociaciones exploratorias de arrendamiento de Samaná a EE.UU. para obtener fondos ante la asfixia fiscal.',
    ],
    institucionesCreadas: [
      'Constitución Liberal de 1865 y Reforma de 1866',
      'Sufragio Universal Masculino Republicano',
      'Instituto Profesional (antecesor de la UASD moderna, junto a Meriño)',
    ],
    ordenCronologico: 14,
    wikiTitle: 'José María Cabral',
  },
  {
    id: 'pres-pedro-guillermo',
    nombre: 'Pedro Guillermo',
    nacimientoMuerte: '1814–1867',
    provinciaNacimiento: 'Hato Mayor',
    periodos: ['15 nov – 8 dic 1865 (Encargado Provisional del Poder)'],
    partidoOcorriente: 'Conservador / Baecista',
    resumenGobierno:
      'Caudillo militar del este y combatiente de la Restauración que encabezó una breve transición armada de tres semanas en noviembre de 1865 para facilitar el retorno de Buenaventura Báez al poder.',
    puntosPositivos: [
      'Participó activamente en la liberación del este durante la Guerra de la Restauración.',
    ],
    puntosNegativos: [
      'Derrocó por la vía armada al gobierno constitucional de Cabral, reabriendo el ciclo de guerras civiles.',
      'Fue capturado y fusilado en 1867 tras levantarse nuevamente contra el orden constituido.',
    ],
    institucionesCreadas: [
      'Junta Militar Provisional de 1865',
    ],
    ordenCronologico: 15,
    wikiTitle: 'Pedro Guillermo',
  },
  {
    id: 'pres-mariano-ignacio-perez',
    nombre: 'Mariano Ignacio Pérez (Ignacio María González)',
    aliases: ['Ignacio María González', 'Ignacio María González (politician)', 'Mariano Ignacio Pérez (Ignacio M. González)'],
    nacimientoMuerte: '1838–1915',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['25 nov 1873 – 23 feb 1876', '2 mar – 2 sep 1878'],
    partidoOcorriente: 'Partido Verde / Unionista',
    resumenGobierno:
      'Encabezó el Movimiento Unionista de Puerto Plata en 1873 que puso fin al régimen de los Seis Años de Báez. Intentó gobernar mediante una coalición conciliadora entre los partidos Rojo y Azul, aunque quedó atrapado entre ambos bandos.',
    puntosPositivos: [
      'Puso fin al prolongado régimen autoritario de los Seis Años y anuló las concesiones de Samaná.',
      'Firmó el Tratado de Paz, Amistad y Comercio con Haití en 1874, primer acuerdo formal bilateral.',
    ],
    puntosNegativos: [
      'Incapacidad para sostener la coalición unionista, optando por renunciar o enfrentar insurrecciones militares.',
      'Inestabilidad fiscal heredada del período baecista.',
    ],
    institucionesCreadas: [
      'Tratado Dominico-Haitiano de 1874',
      'Anulación de la Concesión de Samaná Bay Company',
    ],
    ordenCronologico: 16,
    wikiTitle: 'Ignacio María González (politician)',
  },
  {
    id: 'pres-espaillat',
    nombre: 'Ulises Francisco Espaillat',
    nacimientoMuerte: '1823–1878',
    provinciaNacimiento: 'Santiago',
    periodos: ['29 abr – 5 oct 1876'],
    partidoOcorriente: 'Partido Azul (Civilista)',
    resumenGobierno:
      'Farmacéutico, pensador e intelectual santiaguero electo por abrumadora mayoría popular en unas elecciones libres modélicas. Intentó gobernar con absoluta probidad administrativa y respeto a la ley, pero fue derrocado a los cinco meses por levantamientos caudillistas.',
    puntosPositivos: [
      'Referente ético de honestidad pública, austeridad presupuestaria y respeto irrestricto a las libertades cívicas.',
      'Fomentó la educación pública, la prensa independiente y la rendición de cuentas estatal.',
    ],
    puntosNegativos: [
      'Debilidad militar para contener los alzamientos armados simultáneos financiados por facciones opositoras.',
      'Brevedad de su gobierno, que impidió consolidar sus reformas económicas y educativas.',
    ],
    institucionesCreadas: [
      'Reforma de Transparencia Contable del Tesoro (1876)',
      'Impulso a Sociedades Culturales y Bibliotecas Populares',
    ],
    ordenCronologico: 17,
    wikiTitle: 'Ulises Francisco Espaillat',
  },
  {
    id: 'pres-marcos-cabral',
    nombre: 'Marcos Antonio Cabral',
    nacimientoMuerte: '1842–1903',
    provinciaNacimiento: 'Peravia',
    periodos: ['10 dic – 26 dic 1876 (Presidente Junta Provisional)'],
    partidoOcorriente: 'Partido Rojo',
    resumenGobierno:
      'Militar, escritor y orador banilejo que encabezó brevemente una Junta Provisional en diciembre de 1876 durante la transición que llevó nuevamente a Buenaventura Báez al poder.',
    puntosPositivos: [
      'Contribuyó posteriormente al periodismo, la docencia y la oratoria parlamentaria dominicana.',
    ],
    puntosNegativos: [
      'Participación en movimientos insurreccionales faccionales que derrocaron gobiernos civiles como el de Espaillat.',
    ],
    institucionesCreadas: [
      'Junta Provisional de Transición (diciembre 1876)',
    ],
    ordenCronologico: 18,
    wikiTitle: 'Marcos Antonio Cabral',
  },
  {
    id: 'pres-cesareo-guillermo',
    nombre: 'Cesáreo Guillermo y Bastardo',
    aliases: ['Cesáreo Guillermo'],
    nacimientoMuerte: '1847–1885',
    provinciaNacimiento: 'Hato Mayor',
    periodos: ['5 mar – 6 jul 1878', '27 feb – 6 dic 1879'],
    partidoOcorriente: 'Partido Rojo',
    resumenGobierno:
      'Caudillo militar del este que ejerció dos breves períodos presidenciales en medio de la intensa pugna entre los partidos Rojo y Azul. Su derrocamiento por la Revolución de Puerto Plata en 1879 abrió paso al gobierno reformador de Gregorio Luperón.',
    puntosPositivos: [
      'Reorganizó cuerpos armados locales en la región este.',
    ],
    puntosNegativos: [
      'Gobierno personalista con persecución a dirigentes del Partido Azul.',
      'Desorden financiero y conflicto abierto que desencadenó su caída ante Gregorio Luperón.',
    ],
    institucionesCreadas: [
      'Reforma Militar Regional del Este (1879)',
    ],
    ordenCronologico: 19,
    wikiTitle: 'Cesáreo Guillermo',
  },
  {
    id: 'pres-jacinto-de-castro',
    nombre: 'Jacinto de Castro',
    nacimientoMuerte: '1811–1896',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['7 sep – 29 sep 1878 (Presidente Interino)'],
    partidoOcorriente: 'Interinato Judicial',
    resumenGobierno:
      'Presidente de la Suprema Corte de Justicia que asumió constitucionalmente el Poder Ejecutivo de manera interina durante 22 días tras la renuncia de Ignacio María González.',
    puntosPositivos: [
      'Respetó la sucesión constitucional establecida para garantizar una transición ordenada en medio de tensiones militares.',
    ],
    puntosNegativos: [
      'Falta de respaldo armado propio para evitar que los caudillos militares retomaran el control ejecutivo.',
    ],
    institucionesCreadas: [
      'Precedente Constitucional de Sucesión Judicial (1878)',
    ],
    ordenCronologico: 20,
    wikiTitle: 'Jacinto de Castro',
  },
  {
    id: 'pres-luperon',
    nombre: 'Gregorio Luperón',
    nacimientoMuerte: '1839–1897',
    provinciaNacimiento: 'Puerto Plata',
    periodos: ['6 oct 1879 – 1 sep 1880 (Gobierno Provisional en Puerto Plata)'],
    partidoOcorriente: 'Partido Azul (Liberal Nacionalista)',
    resumenGobierno:
      'Principal espada de la Guerra de la Restauración y máximo líder del Partido Azul. Instaló su gobierno provisional en Puerto Plata tras derrocar a Cesáreo Guillermo, sentando las bases del Estado liberal moderno y de la educación laica hostosiana.',
    puntosPositivos: [
      'Respaldó la llegada de Eugenio María de Hostos para fundar la Escuela Normal y modernizar la educación científica y laica.',
      'Reestructuró la hacienda pública, redujo el fraude aduanero y restableció el prestigio institucional.',
      'Fijó el período presidencial en dos años para evitar la perpetuación caudillista y convocó elecciones libres en 1880.',
    ],
    puntosNegativos: [
      'Su modelo descentralizado dependió inicialmente del liderazgo personal en Puerto Plata y no logró evitar el ulterior ascenso autocrático de Ulises Heureaux.',
    ],
    institucionesCreadas: [
      'Escuela Normal de Santo Domingo (con Eugenio María de Hostos, 1880)',
      'Instituto Profesional de Educación Superior',
      'Sistema de Juntas de Crédito y Reforma Aduanera',
      'Prensa y Escuelas Nocturnas para Obreros',
    ],
    ordenCronologico: 21,
    wikiTitle: 'Gregorio Luperón',
  },
  {
    id: 'pres-merino',
    nombre: 'Fernando Arturo de Meriño',
    nacimientoMuerte: '1833–1906',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['1 sep 1880 – 1 sep 1882'],
    partidoOcorriente: 'Partido Azul',
    resumenGobierno:
      'Sacerdote, brillante orador y futuro arzobispo de Santo Domingo, electo con el respaldo de Gregorio Luperón y el Partido Azul. Continuó las reformas educativas y administrativas, aunque ante insurrecciones baecistas aplicó severas medidas represivas.',
    puntosPositivos: [
      'Consolidó la reforma educativa de Hostos y apoyó la profesionalización del magisterio.',
      'Promovió la expansión de la industria azucarera moderna, el telégrafo y las vías de comunicación.',
      'Entregó pacíficamente el mando al término de su período constitucional en 1882.',
    ],
    puntosNegativos: [
      'Promulgación del drástico Decreto de San Fernando (1881), que autorizaba el fusilamiento sumario de insurrectos capturados.',
      'Dependencia creciente del poder militar de su ministro Ulises Heureaux.',
    ],
    institucionesCreadas: [
      'Red Telegráfica Nacional (inicios)',
      'Fortalecimiento de la Escuela Normal y Seminario Conciliar',
      'Juntas Agrícolas y Código Penal y Civil (revisión francesa)',
    ],
    ordenCronologico: 22,
    wikiTitle: 'Fernando Arturo de Meriño',
  },
  {
    id: 'pres-lilis',
    nombre: 'Ulises Heureaux (Lilís)',
    aliases: [
      'Ulises Heureaux',
      'Ulises Heureaux — Lilís (1.º mandato)',
      'Dictadura de Ulises Heureaux (Lilís)',
    ],
    nacimientoMuerte: '1845–1899',
    provinciaNacimiento: 'Puerto Plata',
    periodos: ['1882–1884', '1887–1889', '1889–1893', '1893–1897', '1897–1899'],
    partidoOcorriente: 'Partido Azul / Régimen Personalista (Lilisismo)',
    resumenGobierno:
      'Héroe restaurador que pasó de lugarteniente de Luperón a establecer la dictadura centralizadora más prolongada del siglo XIX dominicano. Modernizó las comunicaciones y el ferrocarril, pero arruinó el erario con empréstitos externos usurarios y reprimió toda disidencia hasta su ajusticiamiento en Moca en 1899.',
    puntosPositivos: [
      'Construyó el Ferrocarril Central Dominicano (Puerto Plata–Santiago) y tendió líneas telegráficas y cable submarino.',
      'Puso fin temporal a las guerras civiles crónicas consolidando la autoridad del Estado central en todo el territorio.',
      'Impulsó la expansión agroindustrial azucarera y las comunicaciones marítimas.',
    ],
    puntosNegativos: [
      'Endeudamiento externo masivo con los empréstitos Westendorp (1888) y la San Domingo Improvement Company (1893), hipotecando las aduanas.',
      'Emisión masiva de moneda sin respaldo ("papeletas de Lilís") que provocó hiperinflación y quiebra comercial.',
      'Dictadura policial, espionaje, asesinatos políticos y censura de prensa.',
    ],
    institucionesCreadas: [
      'Ferrocarril Central Dominicano (Puerto Plata–Santiago)',
      'Red Nacional de Telégrafos y Cable Submarino',
      'Reforma de Códigos Civil, Penal y de Comercio (en español)',
      'Fuerza Armada Centralizada y Policía Secreta',
    ],
    ordenCronologico: 23,
    wikiTitle: 'Ulises Heureaux',
  },
  {
    id: 'pres-francisco-gregorio-billini',
    nombre: 'Francisco Gregorio Billini',
    aliases: ['Francisco G. Billini / Alejandro Woss y Gil'],
    nacimientoMuerte: '1844–1898',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['1 sep 1884 – 16 may 1885'],
    partidoOcorriente: 'Partido Azul',
    resumenGobierno:
      'Novelista, educador y periodista de íntegra vocación democrática. Gobernó apenas ocho meses antes de presentar su renuncia voluntaria ante las presiones políticas de Ulises Heureaux, legando un ejemplo cívico de defensa de la libertad de prensa.',
    puntosPositivos: [
      'Garantizó plena libertad de prensa e imprenta y amnistió a exiliados políticos.',
      'Apoyó la creación de escuelas y fundó el periódico El Eco de la Opinión.',
      'Renunció dignamente antes de aceptar imposiciones autoritarias o censura contra sus críticos.',
    ],
    puntosNegativos: [
      'Escaso respaldo militar propio frente a las maniobras políticas de Ulises Heureaux.',
    ],
    institucionesCreadas: [
      'Lotería de Beneficencia (apoyo a escuelas y hospitales)',
      'Impulso a la Prensa Independiente y Escuelas Primarias',
    ],
    ordenCronologico: 24,
    wikiTitle: 'Francisco Gregorio Billini',
  },
  {
    id: 'pres-woss-y-gil',
    nombre: 'Alejandro Woss y Gil',
    nacimientoMuerte: '1856–1932',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['1885–1887', '23 mar – 24 nov 1903'],
    partidoOcorriente: 'Partido Azul / Juntista',
    resumenGobierno:
      'Abogado y militar; asumió la presidencia en 1885 tras la renuncia de Billini y retornó brevemente al poder en 1903 mediante un movimiento armado antes de ser derrocado por la Revolución Unionista.',
    puntosPositivos: [
      'Facilitó obras de modernización portuaria y alumbrado público durante su primera gestión.',
      'Mantuvo el funcionamiento de las escuelas normales durante la transición de 1885–1887.',
    ],
    puntosNegativos: [
      'Su primer gobierno sirvió de puente para el retorno de Ulises Heureaux al poder absoluto.',
      'En 1903 llegó al poder tras derrocar a Horacio Vásquez y agravó el conflicto con los acreedores extranjeros.',
    ],
    institucionesCreadas: [
      'Concesión Inicial de Alumbrado Público de Santo Domingo',
      'Obras del Ferrocarril Samaná–Santiago (continuidad)',
    ],
    ordenCronologico: 25,
    wikiTitle: 'Alejandro Woss y Gil',
  },
  {
    id: 'pres-wenceslao-figuereo',
    nombre: 'Wenceslao Figuereo (Manolao)',
    aliases: ['Wenceslao Figuereo'],
    nacimientoMuerte: '1834–1910',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['26 jul – 30 ago 1899'],
    partidoOcorriente: 'Lilisismo',
    resumenGobierno:
      'Vicepresidente de la República que asumió brevemente el mando tras el tiranicidio de Ulises Heureaux en julio de 1899. Incapaz de contener el colapso económico y el levantamiento revolucionario nacional, renunció un mes después.',
    puntosPositivos: [
      'Evitó un baño de sangre prolongado en la capital entregando el poder tras el triunfo de la revolución de 1899.',
    ],
    puntosNegativos: [
      'Heredó y defendió brevemente las estructuras de un régimen fiscalmente quebrado y sin respaldo popular.',
    ],
    institucionesCreadas: [
      'Transición Post-Lilisista de 1899',
    ],
    ordenCronologico: 26,
    wikiTitle: 'Wenceslao Figuereo',
  },
  {
    id: 'pres-juan-isidro-jimenes',
    nombre: 'Juan Isidro Jimenes Pereyra',
    aliases: ['Juan Isidro Jimenes', 'Juan Isidro Jimenes (1.º mandato)'],
    nacimientoMuerte: '1846–1919',
    provinciaNacimiento: 'Distrito Nacional (origen empresarial en Montecristi)',
    periodos: ['1899–1902', '1914–1916'],
    partidoOcorriente: 'Partido Jimenista (Bolo)',
    resumenGobierno:
      'Empresario exportador y líder histórico del bando "Bolo" frente al horacismo. Llegó al poder tras la caída de Lilís en 1899 y nuevamente en 1914 mediante elecciones, renunciando dignamente en 1916 antes de aceptar la intervención armada estadounidense.',
    puntosPositivos: [
      'Restauró las libertades públicas y la prensa libre en 1899 tras la dictadura de Heureaux.',
      'Se negó en 1916 a utilizar tropas extranjeras contra ciudadanos dominicanos, prefiriendo renunciar.',
    ],
    puntosNegativos: [
      'Aguda división política ("Bolos" contra "Coludos") que paralizó el Congreso y desencadenó múltiples guerras civiles.',
      'Dificultades para renegociar la deuda de la San Domingo Improvement Company.',
    ],
    institucionesCreadas: [
      'Comisión Liquidadora de la Deuda Post-Lilisista (1899)',
      'Reforma Aduanera Inicial de 1900',
    ],
    ordenCronologico: 27,
    wikiTitle: 'Juan Isidro Jimenes Pereyra',
  },
  {
    id: 'pres-horacio-vasquez',
    nombre: 'Felipe Horacio Vásquez Lajara',
    aliases: ['Horacio Vásquez', 'Horacio Vásquez (Tercera República)', 'Horacio Vásquez / Alejandro Woss y Gil / Carlos F. Morales'],
    nacimientoMuerte: '1860–1936',
    provinciaNacimiento: 'Espaillat',
    periodos: ['1899 (Provisional)', '1902–1903 (Provisional)', '1924–1930 (Constitucional)'],
    partidoOcorriente: 'Partido Nacional (Horacista / Coludo)',
    resumenGobierno:
      'Principal líder civil-militar del horacismo y primer presidente constitucional tras la desocupación estadounidense en 1924. Su gobierno de la Tercera República gozó de amplias libertades públicas y obras de infraestructura, pero su intento de prórroga de mandato en 1927–1930 facilitó el golpe de Trujillo.',
    puntosPositivos: [
      'Consolidó las libertades civiles, la prensa libre y el retorno a la soberanía interna tras la ocupación de 1916–1924.',
      'Ejecutó un vasto plan de carreteras, acueductos, puentes e irrigación agrícola en el Cibao y el Sur.',
      'Firmó el Tratado Fronterizo Dominico-Haitiano de 1929.',
    ],
    puntosNegativos: [
      'Extendió su mandato constitucional de cuatro a seis años mediante reforma de 1927, debilitando su legitimidad.',
      'Firmó la Convención Dominico-Americana de 1924 manteniendo el control estadounidense sobre las aduanas.',
      'Confianza excesiva en Rafael Trujillo como jefe del Ejército, facilitando la conspiración de febrero de 1930.',
    ],
    institucionesCreadas: [
      'Tratado Fronterizo Dominico-Haitiano (1929)',
      'Dirección General de Obras Públicas e Irrigación',
      'Acueducto de Santo Domingo y Carreteras Troncales',
      'Banco Agrícola Inicial (fomento crediticio)',
    ],
    ordenCronologico: 28,
    wikiTitle: 'Horacio Vásquez',
  },
  {
    id: 'pres-morales-languasco',
    nombre: 'Carlos Felipe Morales Languasco',
    aliases: ['Carlos Felipe Morales'],
    nacimientoMuerte: '1867–1914',
    provinciaNacimiento: 'Puerto Plata',
    periodos: ['24 nov 1903 – 12 ene 1906'],
    partidoOcorriente: 'Unionista / Alianza Horacista',
    resumenGobierno:
      'Sacerdote secularizado y gobernador de Puerto Plata que encabezó la Revolución Unionista de 1903 contra Woss y Gil. Ante el asedio de acreedores europeos y la crisis fiscal, pactó el Modus Vivendi de 1905 con Estados Unidos sobre las aduanas.',
    puntosPositivos: [
      'Evitó una intervención militar europea directa por cobro de deudas mediante un acuerdo de arbitraje fiscal.',
      'Logró pacificar temporalmente varias regiones alzadas tras la guerra civil de 1903–1904.',
    ],
    puntosNegativos: [
      'Suscribió el Modus Vivendi de 1905, cediendo la administración de las aduanas dominicanas a interventores estadounidenses.',
      'Ruptura con su vicepresidente Ramón Cáceres, viéndose forzado a renunciar en enero de 1906.',
    ],
    institucionesCreadas: [
      'Receptoría General de Aduanas (Modus Vivendi, 1905)',
      'Reorganización Fiscal del Tesoro',
    ],
    ordenCronologico: 29,
    wikiTitle: 'Carlos Felipe Morales',
  },
  {
    id: 'pres-ramon-caceres',
    nombre: 'Ramón Arturo Cáceres Vásquez (Mon)',
    aliases: ['Ramón Cáceres', 'Ramón Cáceres (Mon)'],
    nacimientoMuerte: '1866–1911',
    provinciaNacimiento: 'Espaillat',
    periodos: ['12 ene 1906 – 19 nov 1911'],
    partidoOcorriente: 'Partido Horacista / Reformismo Estatal',
    resumenGobierno:
      'Figura central del ajusticiamiento de Ulises Heureaux en 1899 y presidente de 1906 hasta su asesinato en 1911. Impuso la pacificación de las montoneras regionales, modernizó las obras públicas y firmó la Convención de 1907 con EE.UU.',
    puntosPositivos: [
      'Modernizó la administración pública, construyó carreteras, muelles, escuelas y el sistema postal y telegráfico.',
      'Creó la Guardia Republicana para profesionalizar la seguridad y contener el caudillismo armado.',
      'Reorganizó la deuda externa consolidando múltiples acreedores en una sola obligación con menor tasa.',
    ],
    puntosNegativos: [
      'Firmó la Convención Dominico-Americana de 1907, entregando formalmente las aduanas a EE.UU. y limitando la soberanía fiscal.',
      'Empleó métodos militares severos ("pacificación de la Línea Noroeste") contra adversarios armados.',
      'Su asesinato en noviembre de 1911 sumergió al país en cinco años de guerras civiles que precedieron la intervención de 1916.',
    ],
    institucionesCreadas: [
      'Guardia Republicana ("La Monera")',
      'Constitución de 1908 (eliminación de la vicepresidencia y período de 6 años)',
      'Dirección General de Obras Públicas y Telégrafos',
      'Ley de Franquicias Agrícolas',
    ],
    ordenCronologico: 30,
    wikiTitle: 'Ramón Cáceres',
  },
  {
    id: 'pres-eladio-victoria',
    nombre: 'Eladio Victoria',
    nacimientoMuerte: '1864–1939',
    provinciaNacimiento: 'Santiago',
    periodos: ['5 dic 1911 – 30 nov 1912'],
    partidoOcorriente: 'Faccionalismo Militar (Post-Cáceres)',
    resumenGobierno:
      'Senador impuesto tras el magnicidio de Ramón Cáceres mediante la influencia militar de su sobrino Alfredo Victoria. Su gobierno de un año enfrentó una intensa guerra civil y presiones diplomáticas estadounidenses que forzaron su renuncia.',
    puntosPositivos: [
      'Mantuvo operativos los servicios básicos de la administración central durante la crisis política de 1912.',
    ],
    puntosNegativos: [
      'Agotó los recursos del erario en campañas militares internas contra los alzamientos horacistas y jimenistas.',
      'Su ascenso percibido como nepotista agravó la fragmentación institucional del Estado.',
    ],
    institucionesCreadas: [
      'Comisión de Pacificación Nacional de 1912',
    ],
    ordenCronologico: 31,
    wikiTitle: 'Eladio Victoria',
  },
  {
    id: 'pres-adolfo-nouel',
    nombre: 'Adolfo Alejandro Nouel',
    nacimientoMuerte: '1862–1937',
    provinciaNacimiento: 'Santo Domingo',
    periodos: ['1 dic 1912 – 13 abr 1913 (Presidente Provisional)'],
    partidoOcorriente: 'Consenso Independiente (Arzobispo)',
    resumenGobierno:
      'Arzobispo de Santo Domingo designado como figura neutral de consenso para pacificar la guerra civil tras la renuncia de Eladio Victoria. Incapaz de conciliar las demandas de cargos de horacistas y jimenistas, dimitió a los cuatro meses.',
    puntosPositivos: [
      'Logró una tregua armada temporal y restableció el diálogo político entre facciones enfrentadas.',
      'Actuó con reconocida rectitud moral y desprendimiento personal.',
    ],
    puntosNegativos: [
      'Asedio constante de jefes militares y caudillos que le impidieron formar un gabinete estable.',
    ],
    institucionesCreadas: [
      'Pacto de Tregua Nacional de 1912',
    ],
    ordenCronologico: 32,
    wikiTitle: 'Adolfo Alejandro Nouel',
  },
  {
    id: 'pres-bordas-valdez',
    nombre: 'José Bordas Valdez',
    aliases: ['Eladio Victoria · Adolfo A. Nouel · José Bordas Valdez'],
    nacimientoMuerte: '1874–1968',
    provinciaNacimiento: 'Santiago',
    periodos: ['14 abr 1913 – 27 ago 1914 (Presidente Provisional)'],
    partidoOcorriente: 'Transición Cívico-Militar',
    resumenGobierno:
      'Militar y político designado provisionalmente tras la renuncia de monseñor Nouel. Su intento de prolongar su mandato mediante elecciones cuestionadas provocó la guerra civil conocida como la "Revolución del Ferrocarril" y la imposición del Plan Wilson.',
    puntosPositivos: [
      'Intentó reorganizar algunas aduanas terrestres e infraestructura portuaria en medio de la crisis.',
    ],
    puntosNegativos: [
      'Bombardeo y sitio de Puerto Plata durante el conflicto armado de 1914.',
      'Aumento de la deuda pública interna y pérdida de confianza electoral que facilitó la injerencia directa de EE.UU.',
    ],
    institucionesCreadas: [
      'Plan Wilson de Mediación Electoral (1914)',
    ],
    ordenCronologico: 33,
    wikiTitle: 'José Bordas Valdez',
  },
  {
    id: 'pres-ramon-baez',
    nombre: 'Ramón Báez',
    nacimientoMuerte: '1858–1929',
    provinciaNacimiento: 'Mayagüez (hijo de Buenaventura Báez)',
    periodos: ['28 ago – 5 dic 1914 (Presidente Provisional)'],
    partidoOcorriente: 'Independiente / Consenso',
    resumenGobierno:
      'Médico cirujano y rector universitario designado como presidente provisional por consenso bajo el Plan Wilson para arbitrar las elecciones generales de 1914.',
    puntosPositivos: [
      'Organizó y garantizó elecciones libres y transparentes en octubre de 1914, entregando el poder sin contratiempos a Juan Isidro Jimenes.',
      'Posteriormente aportó significativamente a la medicina, la educación universitaria y la Cruz Roja Dominicana.',
    ],
    puntosNegativos: [
      'Mandato limitado estrictamente a tres meses de administración electoral bajo observación extranjera.',
    ],
    institucionesCreadas: [
      'Organización Electoral de Consenso (1914)',
      'Universidad de Santo Domingo (reorganización académica posterior)',
    ],
    ordenCronologico: 34,
    wikiTitle: 'Ramón Báez',
  },
  {
    id: 'pres-henriquez-carvajal',
    nombre: 'Francisco Henríquez y Carvajal',
    aliases: ['Juan Isidro Jimenes / Francisco Henríquez y Carvajal'],
    nacimientoMuerte: '1859–1935',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['31 jul – 29 nov 1916 (Presidente Constitucional)'],
    partidoOcorriente: 'Nacionalismo Civilista',
    resumenGobierno:
      'Médico, jurisconsulto e intelectual designado por el Congreso tras la renuncia de Jimenes en medio del desembarco de marines estadounidenses. Rechazó ceder la soberanía fiscal y militar a Washington, por lo que el gobierno interventor congeló las rentas aduaneras y proclamó la ocupación militar en noviembre de 1916.',
    puntosPositivos: [
      'Defensa firme e intransigente de la soberanía nacional frente a las exigencias estadounidenses de control militar y financiero.',
      'Encabezó posteriormente en el exilio la campaña diplomática internacional ("Comisión Nacionalista") por la desocupación.',
    ],
    puntosNegativos: [
      'Parálisis administrativa y falta total de fondos públicos al ser retenidos los ingresos aduaneros por Estados Unidos.',
    ],
    institucionesCreadas: [
      'Junta Nacionalista de Defensa de la Soberanía (1916–1922)',
      'Resistencia Diplomática Internacional ante América Latina y Europa',
    ],
    ordenCronologico: 35,
    wikiTitle: 'Francisco Henríquez y Carvajal',
  },
  {
    id: 'ocupacion-eeuu-1916',
    nombre: 'Primera Ocupación Militar de EE.UU.',
    aliases: ['Primera Ocupación Militar de EE.UU. (1916–1924)'],
    nacimientoMuerte: '29 nov 1916 – 12 jul 1924',
    provinciaNacimiento: 'Santo Domingo',
    periodos: ['1916–1924 (Gobierno Militar de la Marina de EE.UU.)'],
    partidoOcorriente: 'Intervención Militar Extranjera',
    resumenGobierno:
      'Período de suspensión de la soberanía dominicana administrado por gobernadores militares de la Marina estadounidense (Knapp, Snowden, Robison). Ejecutó obras viales y reorganización sanitaria y catastral, mientras imponía censura, desarme y represión contra la resistencia campesina del Este ("gavilleros").',
    puntosPositivos: [
      'Construcción de las primeras carreteras interregionales (Duarte, Sánchez, Mella) conectando el país por tierra.',
      'Creación de la Ley de Registro de Tierras (Sistema Torrens), reforma sanitaria y expansión cuantitativa de escuelas rurales.',
    ],
    puntosNegativos: [
      'Violación de la soberanía nacional, disolución del Congreso y censura previa contra intelectuales y periodistas.',
      'Represión militar armada contra insurgentes rurales en el Este y consolidación de la Guardia Nacional que luego usaría Trujillo.',
    ],
    institucionesCreadas: [
      'Tribunal de Tierras y Ley de Registro Territorial (1920)',
      'Guardia Nacional Dominicana (luego Ejército Nacional)',
      'Carreteras Troncales Duarte, Sánchez y Mella',
      'Código de Sanidad y Secretaría de Educación (reforma orgánica)',
    ],
    ordenCronologico: 36,
    wikiTitle: 'Coat of arms of the Dominican Republic',
    esColegiado: true,
  },
  {
    id: 'pres-vicini-burgos',
    nombre: 'Juan Bautista Vicini Burgos',
    nacimientoMuerte: '1871–1935',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['21 oct 1922 – 12 jul 1924 (Presidente Provisional)'],
    partidoOcorriente: 'Transición de Desocupación (Plan Hughes–Peynado)',
    resumenGobierno:
      'Empresario azucarero elegido bajo los acuerdos del Plan Hughes–Peynado para encabezar el gobierno provisional de transición y supervisar el retiro ordenado de las tropas estadounidenses tras ocho años de ocupación.',
    puntosPositivos: [
      'Organizó las elecciones generales libres de marzo de 1924 y garantizó el traspaso pacífico al gobierno constitucional de Horacio Vásquez.',
      'Supervisó el fin de la administración militar extranjera y el izamiento de la bandera nacional en julio de 1924.',
    ],
    puntosNegativos: [
      'Validación obligatoria de las órdenes ejecutivas emitidas por el gobierno militar estadounidense como condición del plan de retiro.',
    ],
    institucionesCreadas: [
      'Junta Central Electoral (organización comicios de 1924)',
      'Protocolo de Desocupación Militar de 1924',
    ],
    ordenCronologico: 37,
    wikiTitle: 'Juan Bautista Vicini Burgos',
  },
  {
    id: 'pres-estrella-urena',
    nombre: 'Rafael Estrella Ureña',
    nacimientoMuerte: '1889–1945',
    provinciaNacimiento: 'Santiago',
    periodos: ['3 mar – 16 ago 1930 (Presidente Provisional)'],
    partidoOcorriente: 'Partido Republicano / Movimiento Cívico de 1930',
    resumenGobierno:
      'Abogado y destacado orador santiaguero que lideró el levantamiento cívico de febrero de 1930 contra la reelección de Horacio Vásquez en alianza secreta con Rafael Trujillo. Ejerció cinco meses la presidencia provisional antes de servir de vicepresidente en el inicio del trujillato.',
    puntosPositivos: [
      'Intelectual y orador brillante comprometido originalmente con la no reelección presidencial.',
    ],
    puntosNegativos: [
      'Su alianza táctica con el jefe del Ejército Rafael Trujillo facilitó el ascenso de una dictadura de 31 años.',
      'Violencia electoral y persecución contra opositores durante la campaña de mayo de 1930.',
    ],
    institucionesCreadas: [
      'Gobierno Provisional de Transición de 1930',
    ],
    ordenCronologico: 38,
    wikiTitle: 'Rafael Estrella Ureña',
  },
  {
    id: 'pres-trujillo',
    nombre: 'Rafael Leónidas Trujillo Molina',
    aliases: [
      'Rafael Trujillo',
      'Era de Trujillo (Rafael L. Trujillo · Peynado · Troncoso · Héctor Trujillo)',
    ],
    nacimientoMuerte: '1891–1961',
    provinciaNacimiento: 'San Cristóbal',
    periodos: ['1930–1938', '1942–1952 (y poder absoluto de facto 1930–1961)'],
    partidoOcorriente: 'Partido Dominicano (Régimen Autoritario)',
    resumenGobierno:
      'Dictador militar que ejerció un control totalitario sobre la República Dominicana durante 31 años, alternando la presidencia directa con mandatarios títeres. Modernizó la banca estatal, las obras públicas y saldó la deuda externa mediante el Tratado Trujillo-Hull, al costo de una feroz represión, culto a la personalidad, monopolio económico familiar y crímenes de Estado como la Masacre de 1937 y el asesinato de las hermanas Mirabal.',
    puntosPositivos: [
      'Recuperó la soberanía aduanera con el Tratado Trujillo-Hull (1940) y saldó la deuda externa nacional en 1947.',
      'Fundó el sistema financiero y monetario nacional: Banco de Reservas, Banco Central y el Peso Oro Dominicano.',
      'Ejecutó extensas obras viales, puentes, canales de riego, alfabetización básica y la Ciudad Universitaria.',
    ],
    puntosNegativos: [
      'Dictadura totalitaria sin libertades civiles, partido único obligatorio (Partido Dominicano) y terrorismo de Estado (SIM).',
      'Masacre de Perejil de octubre de 1937 contra miles de haitianos y dominico-haitianos en la frontera.',
      'Asesinatos políticos nacionales e internacionales (hermanas Mirabal, Jesús de Galíndez, expedicionarios de 1949 y 1959).',
      'Apropiación monopolística de las principales industrias del país para enriquecimiento familiar.',
    ],
    institucionesCreadas: [
      'Banco de Reservas (1941)',
      'Banco Central de la República Dominicana y Peso Oro (1947)',
      'Banco Agrícola (1945) y Caja Dominicana de Seguros Sociales',
      'Código de Trabajo (1951) y Cédula Personal de Identidad',
      'Ciudad Universitaria (UASD) y Palacio Nacional',
    ],
    ordenCronologico: 39,
    wikiTitle: 'Rafael Trujillo',
  },
  {
    id: 'pres-jacinto-peynado',
    nombre: 'Jacinto Bienvenido Peynado',
    aliases: ['Jacinto Peynado'],
    nacimientoMuerte: '1878–1940',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['16 ago 1938 – 7 mar 1940'],
    partidoOcorriente: 'Partido Dominicano (Tutelaje Trujillista)',
    resumenGobierno:
      'Abogado y catedrático designado por Trujillo para ocupar formalmente la presidencia en 1938 mientras el dictador conservaba el mando supremo como Benefactor y jefe militar. Murió en el ejercicio del cargo en marzo de 1940.',
    puntosPositivos: [
      'Trayectoria jurídica previa en la elaboración de reformas procesales y enseñanza del derecho.',
    ],
    puntosNegativos: [
      'Subordinación total del Poder Ejecutivo a las directrices de Rafael Trujillo y al aparato del Partido Dominicano.',
    ],
    institucionesCreadas: [
      'Continuidad Administrativa del Partido Dominicano (1938–1940)',
    ],
    ordenCronologico: 40,
    wikiTitle: 'Jacinto Peynado',
  },
  {
    id: 'pres-manuel-troncoso',
    nombre: 'Manuel de Jesús Troncoso de la Concha',
    aliases: ['Manuel de Jesús Troncoso'],
    nacimientoMuerte: '1878–1955',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['7 mar 1940 – 18 may 1942'],
    partidoOcorriente: 'Partido Dominicano (Tutelaje Trujillista)',
    resumenGobierno:
      'Jurisconsulto, historiador y exrector universitario que sucedió a Peynado tras su fallecimiento. Durante su período formal se firmó el Tratado Trujillo-Hull y se fundó el Banco de Reservas, bajo estricta dirección del Generalísimo.',
    puntosPositivos: [
      'Formalización jurídica de la recuperación aduanera (Tratado Trujillo-Hull, 1940) y creación del Banco de Reservas (1941).',
      'Aporte académico e historiográfico personal como fundador de la Academia Dominicana de la Historia.',
    ],
    puntosNegativos: [
      'Falta de autonomía ejecutiva frente al control dictatorial y represivo de Trujillo.',
    ],
    institucionesCreadas: [
      'Banco de Reservas de la República Dominicana (1941)',
      'Ejecución del Tratado Trujillo-Hull (1940)',
    ],
    ordenCronologico: 41,
    wikiTitle: 'Manuel de Jesús Troncoso',
  },
  {
    id: 'pres-hector-trujillo',
    nombre: 'Héctor Bienvenido Trujillo Molina',
    aliases: ['Héctor Trujillo'],
    nacimientoMuerte: '1908–2002',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['16 ago 1952 – 3 ago 1960'],
    partidoOcorriente: 'Partido Dominicano',
    resumenGobierno:
      'Hermano menor del dictador Rafael Trujillo, quien ocupó formalmente la presidencia durante la década de 1950 mientras el régimen organizaba la Feria de la Paz (1955) y enfrentaba el creciente aislamiento internacional y las expediciones libertadoras de 1959.',
    puntosPositivos: [
      'Expansión urbana de Santo Domingo e inauguración de la Feria de la Paz y Confraternidad del Mundo Libre (1955).',
      'Construcción de carreteras, el Puente Duarte y primeras autopistas modernas.',
    ],
    puntosNegativos: [
      'Recrudecimiento de la represión policial del SIM contra el Movimiento 14 de Junio y los expedicionarios de Constanza, Maimón y Estero Hondo (1959).',
      'Atentado contra Rómulo Betancourt (1960) que motivó sanciones de la OEA y forzó su renuncia en favor de Balaguer.',
    ],
    institucionesCreadas: [
      'Centro de los Héroes (Feria de la Paz, 1955)',
      'Autopista Duarte (tramo inicial moderno) y Puente Juan Pablo Duarte',
      'Corporación Dominicana de Electricidad (CDE, 1955)',
    ],
    ordenCronologico: 42,
    wikiTitle: 'Héctor Trujillo',
  },
  {
    id: 'pres-bonnelly',
    nombre: 'Rafael Filiberto Bonnelly',
    aliases: ['Joaquín Balaguer / Consejo de Estado (Bonnelly)', 'Council of State'],
    nacimientoMuerte: '1904–1979',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['18 ene 1962 – 27 feb 1963 (Presidente del Consejo de Estado)'],
    partidoOcorriente: 'Unión Cívica Nacional / Consejo de Estado',
    resumenGobierno:
      'Abogado santiaguero que presidió el Consejo de Estado tras la salida de los Trujillo y la renuncia de Balaguer en 1962. Condujo con éxito la transición democrática post-dictadura, confiscó los bienes de la familia Trujillo para el Estado y organizó las primeras elecciones libres en más de tres décadas.',
    puntosPositivos: [
      'Organizó las elecciones democráticas y transparentes de diciembre de 1962, entregando el mando a Juan Bosch.',
      'Aprobó la autonomía y el fuero de la Universidad Autónoma de Santo Domingo (UASD) y restableció las libertades públicas.',
      'Creó el IAD y nacionalizó empresas trujillistas para conformar el patrimonio estatal (CORDE y CEA).',
    ],
    puntosNegativos: [
      'Conflictos huelgarios y tensiones sociales por la transición económica y el desempleo urbano.',
      'Aplicación de leyes de emergencia y deportaciones selectivas para contener agitaciones políticas de 1962.',
    ],
    institucionesCreadas: [
      'Instituto Agrario Dominicano (IAD, 1962)',
      'Autonomía de la UASD (Ley 5778)',
      'Instituto de Auxilios y Viviendas (INAVI) e INAPA',
      'Corporación de Fomento Industrial y Reforma Electoral Libre',
    ],
    ordenCronologico: 43,
    wikiTitle: 'Rafael Filiberto Bonnelly',
  },
  {
    id: 'pres-juan-bosch',
    nombre: 'Juan Emilio Bosch Gaviño',
    aliases: ['Juan Bosch'],
    nacimientoMuerte: '1909–2001',
    provinciaNacimiento: 'La Vega',
    periodos: ['27 feb – 25 sep 1963'],
    partidoOcorriente: 'Partido Revolucionario Dominicano (PRD)',
    resumenGobierno:
      'Cuentista universal, ensayista y primer presidente electo libremente tras la caída de Trujillo. Impulsó la Constitución progresista de 1963 y defendió las libertades sindicales, la educación pública y el patrimonio nacional, siendo derrocado a los siete meses por un golpe cívico-militar.',
    puntosPositivos: [
      'Promulgó la Constitución democrática y social de abril de 1963, ampliando derechos laborales, sindicales y agrarios.',
      'Ejerció una administración austera, honesta y sin persecución política ni censura contra la oposición.',
      'Canceló contratos lesivos de refinación petrolera y renegoció precios favorables del azúcar nacional.',
    ],
    puntosNegativos: [
      'Aguda polarización ideológica con sectores empresariales, eclesiásticos y militares en plena Guerra Fría.',
      'Incapacidad para neutralizar la conspiración golpista que lo depuso el 25 de septiembre de 1963.',
    ],
    institucionesCreadas: [
      'Constitución Democrática de 1963',
      'Departamento de Educación Obrera y Sindical',
      'Ley de Tope a Precios de Exportación Azucarera',
    ],
    ordenCronologico: 44,
    wikiTitle: 'Juan Bosch',
  },
  {
    id: 'pres-emilio-de-los-santos',
    nombre: 'Emilio de los Santos',
    aliases: ['Triunvirato (Emilio de los Santos / Donald Reid Cabral)', 'Triumvirate'],
    nacimientoMuerte: '1903–1986',
    provinciaNacimiento: 'San Juan',
    periodos: ['26 sep – 22 dic 1963 (Presidente inicial del Triunvirato)'],
    partidoOcorriente: 'Triunvirato Cívico-Militar',
    resumenGobierno:
      'Magistrado electoral que presidió brevemente el primer Triunvirato instalado tras el golpe de Estado contra Juan Bosch. Renunció en diciembre de 1963 en protesta moral por el asesinato de Manolo Tavárez Justo y sus compañeros guerrilleros en Las Manaclas.',
    puntosPositivos: [
      'Renuncia ética e inmediata en diciembre de 1963 al enterarse del fusilamiento de los prisioneros rendidos del Movimiento 14 de Junio.',
    ],
    puntosNegativos: [
      'Aceptó encabezar el gobierno de facto surgido del derrocamiento del orden constitucional de 1963.',
    ],
    institucionesCreadas: [
      'Régimen de Facto del Triunvirato (etapa inicial 1963)',
    ],
    ordenCronologico: 45,
    wikiTitle: 'Emilio de los Santos',
  },
  {
    id: 'pres-reid-cabral',
    nombre: 'Donald Reid Cabral',
    nacimientoMuerte: '1923–2006',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['29 dic 1963 – 25 abr 1965 (Presidente del Triunvirato)'],
    partidoOcorriente: 'Triunvirato Cívico-Militar',
    resumenGobierno:
      'Empresario y exintegrante del Consejo de Estado que asumió la jefatura del Triunvirato tras la renuncia de Emilio de los Santos. Gobernó mediante decretos económicos restrictivos y medidas de austeridad hasta ser depuesto por el alzamiento constitucionalista del 24 de abril de 1965.',
    puntosPositivos: [
      'Creó el Instituto Nacional de Recursos Hidráulicos (INDRHI) y medidas iniciales de control financiero y sanitario.',
      'Intentó reducir el contrabando militar en las aduanas, aunque ello generó fracturas dentro de las propias Fuerzas Armadas.',
    ],
    puntosNegativos: [
      'Ilegitimidad de origen al gobernar sin Constitución vigente y proscribir partidos opositores.',
      'Austeridad económica, desempleo, represión sindical y crisis de popularidad que detonaron la Revolución de Abril de 1965.',
    ],
    institucionesCreadas: [
      'Instituto Nacional de Recursos Hidráulicos (INDRHI)',
      'Medidas de Saneamiento Presupuestario (1964)',
    ],
    ordenCronologico: 46,
    wikiTitle: 'Donald Reid Cabral',
  },
  {
    id: 'pres-molina-urena',
    nombre: 'José Rafael Molina Ureña',
    nacimientoMuerte: '1921–2000',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['25 abr – 27 abr 1965 (Presidente Constitucional Provisional)'],
    partidoOcorriente: 'Partido Revolucionario Dominicano (PRD)',
    resumenGobierno:
      'Presidente de la Cámara de Diputados de 1963 que asumió constitucionalmente la jefatura del Estado al estallar la Revolución de Abril de 1965 para restaurar la Carta Magna de 1963 hasta el retorno de Juan Bosch.',
    puntosPositivos: [
      'Aseguró la continuidad jurídica constitucional durante las horas decisivas de la insurrección cívico-militar de abril de 1965.',
    ],
    puntosNegativos: [
      'Tras los bombardeos de la aviación de San Isidro sobre el Palacio Nacional y el fracaso de las gestiones en la embajada de EE.UU., buscó asilo diplomático el 27 de abril.',
    ],
    institucionesCreadas: [
      'Gobierno Constitucionalista de Transición (abril 1965)',
    ],
    ordenCronologico: 47,
    wikiTitle: 'José Rafael Molina Ureña',
  },
  {
    id: 'pres-caamano',
    nombre: 'Francisco Alberto Caamaño Deñó',
    aliases: ['Francisco Caamaño', 'Francisco Alberto Caamaño (Gobierno Constitucionalista)'],
    nacimientoMuerte: '1932–1973',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['4 may – 3 sep 1965 (Presidente Gobierno Constitucionalista)'],
    partidoOcorriente: 'Movimiento Constitucionalista de Abril',
    resumenGobierno:
      'Coronel de las Fuerzas Armadas elegido por el Congreso reunido en zona constitucionalista como presidente durante la Guerra de Abril de 1965. Lideró la defensa armada de Ciudad Nueva y el retorno a la Constitución de 1963 frente a la intervención militar estadounidense.',
    puntosPositivos: [
      'Símbolo de defensa de la soberanía nacional y de la legitimidad constitucional frente a la segunda intervención estadounidense.',
      'Reorganizó los servicios civiles, la justicia y la defensa popular dentro de la zona constitucionalista y negoció el Acta Institucional de paz.',
    ],
    puntosNegativos: [
      'Guerra civil urbana con severas pérdidas humanas, división territorial de la capital y posterior exilio forzado.',
      'Falleció en 1973 tras encabezar el desembarco guerrillero de Playa Caracoles.',
    ],
    institucionesCreadas: [
      'Gobierno Constitucionalista de Ciudad Nueva (1965)',
      'Acta de Reconciliación Dominicana y Acta Institucional (agosto 1965)',
    ],
    ordenCronologico: 48,
    wikiTitle: 'Francisco Caamaño',
  },
  {
    id: 'pres-imbert-barrera',
    nombre: 'Antonio Imbert Barrera',
    aliases: ['Gobierno de Reconstrucción Nacional (Antonio Imbert B.) + Intervención EE.UU.'],
    nacimientoMuerte: '1920–2016',
    provinciaNacimiento: 'Puerto Plata',
    periodos: ['7 may – 30 ago 1965 (Presidente Gobierno de Reconstrucción Nacional)'],
    partidoOcorriente: 'Gobierno Militar / Reconstrucción Nacional',
    resumenGobierno:
      'Uno de los dos sobrevivientes del ajusticiamiento de Trujillo en 1961; encabezó en mayo de 1965 el Gobierno de Reconstrucción Nacional respaldado por la fuerza interventora estadounidense frente al gobierno constitucionalista de Caamaño.',
    puntosPositivos: [
      'Participación heroica previa en el tiranicidio que puso fin a la dictadura de Trujillo en 1961.',
      'Renunció en agosto de 1965 para permitir la instalación del gobierno provisional de Héctor García-Godoy.',
    ],
    puntosNegativos: [
      'Operación Limpieza en la zona norte de Santo Domingo (mayo 1965) con numerosas víctimas civiles y combatientes.',
      'Legitimación interna de la presencia militar extranjera de Estados Unidos y la FIP.',
    ],
    institucionesCreadas: [
      'Gobierno de Reconstrucción Nacional (mayo–agosto 1965)',
    ],
    ordenCronologico: 49,
    wikiTitle: 'Antonio Imbert Barrera',
  },
  {
    id: 'pres-hector-garcia-godoy',
    nombre: 'Héctor García-Godoy Cáceres',
    aliases: ['Héctor García-Godoy'],
    nacimientoMuerte: '1921–1970',
    provinciaNacimiento: 'La Vega',
    periodos: ['3 sep 1965 – 1 jul 1966 (Presidente Provisional)'],
    partidoOcorriente: 'Consenso Nacional / Acta Institucional',
    resumenGobierno:
      'Abogado y diplomático vegano designado presidente provisional tras la firma del Acta Institucional que puso fin a la Guerra de Abril. Condujo con tacto el desarme parcial, la salida gradual de las tropas extranjeras y los comicios generales de 1966.',
    puntosPositivos: [
      'Restableció la paz civil tras la Guerra de Abril y evitó la reanudación de combates a gran escala.',
      'Logró el retiro de líderes militares enfrentados hacia misiones diplomáticas y organizó las elecciones de junio de 1966.',
    ],
    puntosNegativos: [
      'Atentados políticos e incidentes como el ataque al Hotel Matum en Santiago durante la transición.',
      'Elecciones de 1966 celebradas aún con presencia de tropas extranjeras y fuerte ventaja para Balaguer.',
    ],
    institucionesCreadas: [
      'Corporación Dominicana de Empresas Estatales (CORDE)',
      'Consejo Estatal del Azúcar (CEA) y Oficina Nacional de Planificación (ONAPLAN)',
      'Centro Dominicano de Promoción de Exportaciones (antecedente)',
    ],
    ordenCronologico: 50,
    wikiTitle: 'Héctor García-Godoy',
  },
  {
    id: 'pres-balaguer',
    nombre: 'Joaquín Antonio Balaguer Ricardo',
    aliases: [
      'Joaquín Balaguer',
      'Joaquín Balaguer (Los Doce Años)',
      'Joaquín Balaguer (Los Diez Años)',
    ],
    nacimientoMuerte: '1906–2002',
    provinciaNacimiento: 'Santiago',
    periodos: ['1960–1962', '1966–1978 (Los Doce Años)', '1986–1996 (Los Diez Años)'],
    partidoOcorriente: 'Partido Reformista Social Cristiano (PRSC)',
    resumenGobierno:
      'Una de las figuras políticas más influyentes y longevas del siglo XX dominicano. Gobernó durante veintidós años alternados (1966–1978 y 1986–1996), impulsando un vasto programa de infraestructura urbana, presas hidroeléctricas y viviendas, marcado al mismo tiempo por la represión política de "Los Doce Años" y reiterados cuestionamientos electorales.',
    puntosPositivos: [
      'Infraestructura masiva: presas hidroeléctricas (Tavera, Valdesia, Sabana Yegua), avenidas, acueductos, hospitales, museos y viviendas populares.',
      'Fomento industrial (sustitución de importaciones), creación del turismo estatal (INFRATUR) y estabilidad macroeconómica relativa en los años 70 y 90.',
      'Aprobación de reformas ecológicas pioneras y áreas protegidas (parques nacionales y prohibición de tala indiscriminada).',
    ],
    puntosNegativos: [
      'Violenta represión política en "Los Doce Años" contra militantes de izquierda y periodistas (La Banda Colorá, cientos de muertos y desaparecidos).',
      'Cuestionamientos de fraude electoral (1970, 1974, 1990 y la crisis electoral de 1994 que obligó a reducir su período a 2 años).',
      'Hipercentralización presidencialista y desplazamiento campesino/urbano en renovaciones monumentales como el Faro a Colón.',
    ],
    institucionesCreadas: [
      'Instituto Nacional de Formación Técnico Profesional (INFOTEP) — expansión',
      'Plaza de la Cultura, Teatro Nacional y Museo del Hombre Dominicano',
      'Presas de Tavera, Valdesia, Sabana Yegua y Hatillo',
      'Dirección Nacional de Parques y Jardín Botánico Nacional',
      'Comisión Nacional de Zonas Francas e INFRATUR',
    ],
    ordenCronologico: 51,
    wikiTitle: 'Joaquín Balaguer',
  },
  {
    id: 'pres-antonio-guzman',
    nombre: 'Silvestre Antonio Guzmán Fernández',
    aliases: ['Antonio Guzmán Fernández', 'Antonio Guzmán / Jacobo Majluta'],
    nacimientoMuerte: '1911–1982',
    provinciaNacimiento: 'La Vega',
    periodos: ['16 ago 1978 – 4 jul 1982'],
    partidoOcorriente: 'Partido Revolucionario Dominicano (PRD)',
    resumenGobierno:
      'Empresario agrícola cuya victoria en 1978 marcó la primera alternancia democrática pacífica en décadas tras el fin de Los Doce Años. Restableció plenamente las libertades públicas, despolitizó las Fuerzas Armadas y promovió el desarrollo agropecuario.',
    puntosPositivos: [
      'Consolidación de los derechos humanos: amnistía general para presos políticos, regreso de exiliados y respeto irrestricto a la prensa.',
      'Relevo institucional de la cúpula militar trujillista-balaguerista, subordinando los cuarteles al poder civil.',
      'Creación de programas de apoyo rural, escuelas rurales y reconstrucción tras el ciclón David (1979).',
    ],
    puntosNegativos: [
      'Fuerte incremento de la nómina pública y déficit fiscal tras el alza petrolera internacional y los daños del huracán David.',
      'Pugnas internas en el PRD y señalamientos de irregularidades administrativas en el cierre de su mandato que antecedieron su trágico suicidio en julio de 1982.',
    ],
    institucionesCreadas: [
      'Instituto de Estabilización de Precios (INESPRE - reestructuración)',
      'Instituto Nacional de Formación Técnico Profesional (INFOTEP, 1980)',
      'Dirección General de Promoción de la Mujer (DGPM, 1982)',
      'Programa de Escuelas Rurales y Electrificación Agrícola',
    ],
    ordenCronologico: 52,
    wikiTitle: 'Antonio Guzmán Fernández',
  },
  {
    id: 'pres-majluta',
    nombre: 'Jacobo Majluta Azar',
    nacimientoMuerte: '1934–1996',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['4 jul – 16 ago 1982 (43 días tras el fallecimiento de Antonio Guzmán)'],
    partidoOcorriente: 'Partido Revolucionario Dominicano (PRD) / PRI',
    resumenGobierno:
      'Contador público y vicepresidente de la República que asumió la jefatura del Estado durante 43 días tras el fallecimiento de Antonio Guzmán, garantizando el respeto al orden constitucional y la entrega pacífica del poder a Salvador Jorge Blanco.',
    puntosPositivos: [
      'Aseguró la estabilidad democrática y el traspaso constitucional pacífico en una coyuntura de profunda conmoción nacional.',
      'Impulsó la creación del Banco Nacional de Fomento de la Vivienda y la institucionalización contable del Estado.',
    ],
    puntosNegativos: [
      'Posterior fragmentación del PRD que derivó en su ruptura con el liderazgo de Peña Gómez y la fundación del PRI.',
    ],
    institucionesCreadas: [
      'Transición Constitucional Estable de 1982',
      'Consolidación de CORDE y Contraloría (trayectoria previa)',
    ],
    ordenCronologico: 53,
    wikiTitle: 'Jacobo Majluta Azar',
  },
  {
    id: 'pres-jorge-blanco',
    nombre: 'Salvador Jorge Blanco',
    nacimientoMuerte: '1926–2010',
    provinciaNacimiento: 'Santiago',
    periodos: ['16 ago 1982 – 16 ago 1986'],
    partidoOcorriente: 'Partido Revolucionario Dominicano (PRD)',
    resumenGobierno:
      'Abogado y exsenador santiaguero cuyo mandato coincidió con la crisis de la deuda externa latinoamericana. Mantuvo las libertades democráticas y creó el Banco de los Trabajadores y el Consejo Nacional de la Magistratura (antecedentes), aunque los ajustes del FMI detonaron la protesta popular de abril de 1984.',
    puntosPositivos: [
      'Respeto amplio a las libertades civiles, desmilitarización de la política y promoción de zonas francas y turismo.',
      'Creación de infraestructuras educativas, hospitales y proyectos de reforma judicial y fiscal.',
    ],
    puntosNegativos: [
      'Acuerdo de ajuste con el FMI y alzas súbitas de precios en abril de 1984 ("la Poblada"), cuya represión dejó decenas de fallecidos.',
      'Procesos judiciales posteriores por presunta corrupción en compras militares y estatales durante su gestión.',
    ],
    institucionesCreadas: [
      'Banco de los Trabajadores',
      'Dirección General de Impuestos (modernización tributaria inicial)',
      'Ampliación del Sistema de Zonas Francas Industriales',
    ],
    ordenCronologico: 54,
    wikiTitle: 'Salvador Jorge Blanco',
  },
  {
    id: 'pres-leonel-fernandez',
    nombre: 'Leonel Antonio Fernández Reyna',
    aliases: [
      'Leonel Fernández',
      'Leonel Fernández (1.º mandato)',
      'Leonel Fernández (2.º y 3.º mandatos)',
    ],
    nacimientoMuerte: '1953–presente',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['1996–2000', '2004–2008', '2008–2012'],
    partidoOcorriente: 'Partido de la Liberación Dominicana (PLD) / Fuerza del Pueblo',
    resumenGobierno:
      'Abogado y académico que presidió el país en tres períodos, liderando la modernización tecnológica del Estado, la estabilización macroeconómica tras la crisis bancaria de 2003, la inserción en el DR-CAFTA y grandes obras de transporte como el Metro de Santo Domingo.',
    puntosPositivos: [
      'Estabilizó rápidamente la economía y la tasa de cambio tras la crisis financiera de 2003–2004, logrando sostenido crecimiento del PIB.',
      'Inauguró el Metro de Santo Domingo, elevados, túneles, el Parque Cibernético e impulsó la modernización del Poder Judicial y las TIC.',
      'Promulgó la Constitución de 2010 con la creación del Tribunal Constitucional y el Tribunal Superior Electoral.',
    ],
    puntosNegativos: [
      'Aumento significativo de la deuda pública externa e interna y déficit fiscal en el cierre de su último mandato (2012).',
      'Cuestionamientos de corrupción administrativa, clientelismo político y falta de solución estructural al déficit eléctrico.',
    ],
    institucionesCreadas: [
      'Metro de Santo Domingo (OPRET, 2009)',
      'Tribunal Constitucional y Tribunal Superior Electoral (Constitución 2010)',
      'Ministerio de Educación Superior, Ciencia y Tecnología (MESCYT) y Ministerio de Cultura',
      'Parque Cibernético de Santo Domingo (PCSD) e ITLA',
      'Defensor del Pueblo y Dirección General de Ética',
    ],
    ordenCronologico: 55,
    wikiTitle: 'Leonel Fernández',
  },
  {
    id: 'pres-hipolito-mejia',
    nombre: 'Rafael Hipólito Mejía Domínguez',
    aliases: ['Hipólito Mejía'],
    nacimientoMuerte: '1941–presente',
    provinciaNacimiento: 'Santiago',
    periodos: ['16 ago 2000 – 16 ago 2004'],
    partidoOcorriente: 'Partido Revolucionario Dominicano (PRD)',
    resumenGobierno:
      'Agrónomo y empresario que impulsó inicialmente el gasto social, los Juegos Panamericanos de 2003 y el Sistema Dominicano de Seguridad Social. Su gestión se vio sacudida en 2003 por el colapso fraudulento de tres bancos privados (Baninter, Bancrédito, Mercantil), desencadenando una severa devaluación e inflación.',
    puntosPositivos: [
      'Aprobación e inicio del Sistema Dominicano de Seguridad Social (Ley 87-01), la Ley de Hidrocarburos y creación del Ministerio de Medio Ambiente.',
      'Organización exitosa de los XIV Juegos Panamericanos Santo Domingo 2003 y creación de nuevas provincias (Santo Domingo y San José de Ocoa).',
      'Reconoció inmediatamente su derrota electoral en mayo de 2004, garantizando la transición democrática.',
    ],
    puntosNegativos: [
      'Rescate financiero de la crisis bancaria de 2003 (caso Baninter), que multiplicó la deuda cuasifiscal y disparó el dólar e inflación.',
      'Reforma constitucional de 2002 para restablecer la reelección presidencial inmediata.',
      'Controversiales emisiones de bonos soberanos y apagones prolongados.',
    ],
    institucionesCreadas: [
      'Sistema Dominicano de Seguridad Social (Ley 87-01, TSS y ARS/AFP)',
      'Ministerio de Medio Ambiente y Recursos Naturales (Ley 64-00)',
      'Ministerio de la Juventud y Ministerio de la Mujer (consolidación)',
      'Provincia Santo Domingo y Provincia San José de Ocoa',
    ],
    ordenCronologico: 56,
    wikiTitle: 'Hipólito Mejía',
  },
  {
    id: 'pres-danilo-medina',
    nombre: 'Danilo Medina Sánchez',
    aliases: ['Danilo Medina'],
    nacimientoMuerte: '1951–presente',
    provinciaNacimiento: 'San Juan',
    periodos: ['16 ago 2012 – 16 ago 2016', '16 ago 2016 – 16 ago 2020'],
    partidoOcorriente: 'Partido de la Liberación Dominicana (PLD)',
    resumenGobierno:
      'Economista y político que centró sus dos mandatos en la inversión del 4% del PIB para la educación preuniversitaria, la Jornada Escolar Extendida, el Sistema 9-1-1, visitas sorpresa al sector agropecuario y el crecimiento económico sostenido, aunque su administración enfrentó graves escándalos de corrupción vinculados al caso Odebrecht y compras estatales.',
    puntosPositivos: [
      'Asignación constitucional del 4% del PIB a la educación, construcción masiva de aulas, Jornada Escolar Extendida y programa Quisqueya Aprende Contigo.',
      'Implementación del Sistema Nacional de Emergencias 9-1-1, Teleférico de Santo Domingo y Banca Solidaria para pymes.',
      'Estabilidad económica y apoyo directo a cooperativas agropecuarias mediante visitas sorpresa.',
    ],
    puntosNegativos: [
      'Escándalo de sobornos y sobrevaluaciones de Odebrecht, así como investigaciones judiciales posteriores por presunta corrupción administrativa (casos Antipulpo/Calamar).',
      'Reforma constitucional de 2015 para habilitar su reelección y fuerte polarización política interna en 2019–2020.',
      'Construcción cuestionada por sobrecostos de la central termoeléctrica Punta Catalina.',
    ],
    institucionesCreadas: [
      'Sistema Nacional de Atención a Emergencias y Seguridad 9-1-1',
      'Teleférico de Santo Domingo y Programa de Jornada Escolar Extendida',
      'Instituto Nacional de Atención Integral a la Primera Infancia (INAIPI)',
      'Banca Solidaria y Ciudad Juan Bosch',
    ],
    ordenCronologico: 57,
    wikiTitle: 'Danilo Medina',
  },
  {
    id: 'pres-luis-abinader',
    nombre: 'Luis Rodolfo Abinader Corona',
    aliases: ['Luis Abinader'],
    nacimientoMuerte: '1967–presente',
    provinciaNacimiento: 'Distrito Nacional',
    periodos: ['16 ago 2020 – 16 ago 2024', '16 ago 2024 – Actualidad'],
    partidoOcorriente: 'Partido Revolucionario Moderno (PRM)',
    resumenGobierno:
      'Economista y empresario electo en medio de la pandemia de COVID-19. Condujo una rápida recuperación turística y económica, designó un Ministerio Público independiente y promovió grandes obras de transporte e infraestructura, afrontando retos de endeudamiento público, inflación global y presión migratoria haitiana.',
    puntosPositivos: [
      'Rápido plan nacional de vacunación contra el COVID-19 y recuperación récord del sector turístico y zonas francas.',
      'Impulso a la independencia operativa del Ministerio Público y creación de la Dirección General de Alianzas Público-Privadas.',
      'Construcción de nuevas líneas de teleférico (Los Alcarrizos), Monorriel de Santiago, extensión del Metro y reforma constitucional de 2024 blindando límites a la reelección.',
    ],
    puntosNegativos: [
      'Incremento de la deuda pública externa para financiar recuperación post-pandemia y subsidios a combustibles y electricidad.',
      'Alza del costo de la canasta familiar y retiro fallido del proyecto de reforma fiscal en 2024 por rechazo ciudadano.',
      'Persistencia de desafíos estructurales en el sector eléctrico (pérdidas de distribuidoras) y seguridad ciudadana.',
    ],
    institucionesCreadas: [
      'Ministerio de la Vivienda y Edificaciones (MIVED)',
      'Dirección General de Alianzas Público-Privadas (DGAPP)',
      'Gabinete de Turismo y Plan de Vacunación Vacúnate RD',
      'Monorriel de Santiago y Teleférico de Los Alcarrizos',
      'Reforma Constitucional de 2024 (candado a la reelección)',
    ],
    ordenCronologico: 58,
    wikiTitle: 'Luis Abinader',
  },
];

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

export function findPresidentHistory(
  nameOrId: string,
  fallbackMeta?: {
    id?: string;
    nacimiento_muerte?: string;
    provincia_nacimiento?: string;
    periodos_gobierno?: string[];
    partido?: string;
    resumen_gestion?: string;
  },
): PresidentHistoryEntry {
  const norm = normalizeText(nameOrId);

  const exact = PRESIDENTS_HISTORY_DATA.find(
    (entry) =>
      entry.id === nameOrId ||
      (fallbackMeta?.id && entry.id === fallbackMeta.id) ||
      normalizeText(entry.nombre) === norm ||
      entry.aliases?.some((a) => normalizeText(a) === norm),
  );
  if (exact) return exact;

  // Strip parenthetical mandate numbers like "Pedro Santana (1.º mandato)"
  const stripped = normalizeText(nameOrId.replace(/\(.*?\)/g, ''));
  const byStripped = PRESIDENTS_HISTORY_DATA.find(
    (entry) =>
      normalizeText(entry.nombre) === stripped ||
      normalizeText(entry.nombre.replace(/\(.*?\)/g, '')) === stripped ||
      entry.aliases?.some((a) => normalizeText(a) === stripped),
  );
  if (byStripped) return byStripped;

  // Slash-separated timeline entries (e.g. "Antonio Guzmán / Jacobo Majluta")
  if (stripped.includes('/') || stripped.includes('·')) {
    const firstPart = stripped.split(/[\/·]/)[0]?.trim() ?? '';
    if (firstPart.length > 3) {
      const byFirst = PRESIDENTS_HISTORY_DATA.find(
        (entry) =>
          normalizeText(entry.nombre).includes(firstPart) ||
          entry.aliases?.some((a) => normalizeText(a).includes(firstPart)),
      );
      if (byFirst) return byFirst;
    }
  }

  // Partial surname/name match as safe last resort
  const partial = PRESIDENTS_HISTORY_DATA.find((entry) => {
    const entryNorm = normalizeText(entry.nombre);
    return entryNorm.includes(stripped) || stripped.includes(entryNorm);
  });
  if (partial) return partial;

  return {
    id: fallbackMeta?.id || `hist-${norm.replace(/\s+/g, '-')}`,
    nombre: nameOrId,
    nacimientoMuerte: fallbackMeta?.nacimiento_muerte,
    provinciaNacimiento: fallbackMeta?.provincia_nacimiento,
    periodos: fallbackMeta?.periodos_gobierno ?? ['Período registrado en CronoMapa RD'],
    partidoOcorriente: fallbackMeta?.partido ?? 'Historia Política Dominicana',
    resumenGobierno:
      fallbackMeta?.resumen_gestion ??
      'Mandatario registrado en la cronología histórica de la República Dominicana.',
    puntosPositivos: [
      'Desempeñó funciones ejecutivas en el marco institucional de su época histórica.',
    ],
    puntosNegativos: [
      'Enfrentó las limitaciones fiscales y tensiones políticas características de su período.',
    ],
    institucionesCreadas: ['Administración del Poder Ejecutivo Nacional'],
    ordenCronologico: 99,
  };
}
