export interface MacroTerritoryDefinition {
  id: string;
  nombre: string;
  subtitulo: string;
  color: string;
  anioInicio: number;
  anioFin: number;
  cabecera: string;
  liderazgo: string;
  provincias: string[];
  descripcion: string;
  labelFallback: [number, number]; // [lng, lat]
}

export const CACICAZGOS_1492_CONFIG: MacroTerritoryDefinition[] = [
  {
    id: 'cacicazgo-marien',
    nombre: 'Cacicazgo de Marién',
    subtitulo: 'Noroeste · Cacicazgo Taíno (1492)',
    color: '#2A6F97',
    anioInicio: 1492,
    anioFin: 1504,
    cabecera: 'El Guarico (Noroeste de La Española)',
    liderazgo: 'Cacique Guacanagarix',
    provincias: ['Monte Cristi', 'Dajabón', 'Valverde', 'Santiago Rodríguez', 'Puerto Plata'],
    descripcion:
      'Confederación taína del cuadrante noroeste, extendida desde el valle del Yaque del Norte hasta las costas atlánticas de Monte Cristi y Puerto Plata. Su cacique Guacanagarix recibió a Cristóbal Colón tras el naufragio de la Santa María en diciembre de 1492.',
    labelFallback: [-71.25, 19.65],
  },
  {
    id: 'cacicazgo-magua',
    nombre: 'Cacicazgo de Maguá',
    subtitulo: 'Cibao y Nordeste · Cacicazgo Taíno (1492)',
    color: '#386641',
    anioInicio: 1492,
    anioFin: 1504,
    cabecera: 'Valle de la Vega Real',
    liderazgo: 'Cacique Guarionex',
    provincias: [
      'Santiago',
      'Espaillat',
      'Hermanas Mirabal',
      'Duarte',
      'María Trinidad Sánchez',
      'Samaná',
      'Sánchez Ramírez',
    ],
    descripcion:
      'Territorio de fértiles llanuras interiores («Maguá» significa la Vega) y península de Samaná, gobernado por Guarionex. Fue escenario de la batalla del Santo Cerro (1495) y del primer alzamiento indígena organizado en la Vega Real.',
    labelFallback: [-70.18, 19.32],
  },
  {
    id: 'cacicazgo-maguana',
    nombre: 'Cacicazgo de Maguana',
    subtitulo: 'Cordillera Central y San Juan · Cacicazgo Taíno (1492)',
    color: '#BC6C25',
    anioInicio: 1492,
    anioFin: 1504,
    cabecera: 'Corral de los Indios (San Juan de la Maguana)',
    liderazgo: 'Cacique Caonabo',
    provincias: [
      'San Juan',
      'Elías Piña',
      'La Vega',
      'Monseñor Nouel',
      'Azua',
      'San José de Ocoa',
    ],
    descripcion:
      'Señorío central montañoso liderado por Caonabo, célebre por su resistencia armada contra el Fuerte de La Navidad y las huestes de Alonso de Ojeda. Alberga el centro ceremonial del Corral de los Indios en el valle de San Juan.',
    labelFallback: [-71.02, 18.88],
  },
  {
    id: 'cacicazgo-jaragua',
    nombre: 'Cacicazgo de Jaragua',
    subtitulo: 'Suroeste y Enriquillo · Cacicazgo Taíno (1492)',
    color: '#9B2226',
    anioInicio: 1492,
    anioFin: 1504,
    cabecera: 'Yaguana / Cuenca del Lago Enriquillo',
    liderazgo: 'Bohechío y Anacaona',
    provincias: ['Independencia', 'Baoruco', 'Barahona', 'Pedernales'],
    descripcion:
      'El más refinado de los cinco cacicazgos en artes ceremoniales y areítos, gobernado por Bohechío y luego por su hermana Anacaona. En sus sierras de Bahoruco tendría lugar años después la rebelión victoriosa del cacique Enriquillo (1519–1533).',
    labelFallback: [-71.48, 18.28],
  },
  {
    id: 'cacicazgo-higuey',
    nombre: 'Cacicazgo de Higüey',
    subtitulo: 'Oriente y Ozama · Cacicazgo Taíno (1492)',
    color: '#C5A059',
    anioInicio: 1492,
    anioFin: 1504,
    cabecera: 'Salvaleón de Higüey y cuenca del Ozama',
    liderazgo: 'Cayacoa y Cotubanamá',
    provincias: [
      'Peravia',
      'San Cristóbal',
      'Distrito Nacional',
      'Santo Domingo',
      'Monte Plata',
      'San Pedro de Macorís',
      'Hato Mayor',
      'El Seibo',
      'La Romana',
      'La Altagracia',
    ],
    descripcion:
      'Confederación oriental extendida desde el río Haina y el Ozama hasta el cabo Engaño y la isla Saona. Bajo el mando de Cotubanamá libró una tenaz resistencia en las guerras de Higüey (1502–1504) frente a Juan de Esquivel.',
    labelFallback: [-69.18, 18.68],
  },
];
