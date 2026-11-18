/**
 * Monumentos y sitios coloniales históricos de la República Dominicana
 * Incluye coordenadas exactas, descripciones historiográficas y cliente CORS
 * para obtener imágenes vinculadas mediante la API pública de Wikipedia.
 */

export const COLONIAL_MONUMENTS = [
  {
    id: 'mon-ruinas-san-francisco',
    name: 'Ruinas del Monasterio de San Francisco',
    shortName: 'Ruinas de San Francisco',
    category: 'ruinas',
    yearBuilt: 1508,
    centuryLabel: '1508–1560 (Siglo XVI)',
    province: 'Distrito Nacional',
    locationLabel: 'Calle Hostos esq. Emiliano Tejera, Ciudad Colonial',
    lat: 18.4765,
    lng: -69.8886,
    architecturalStyle: 'Gótico isabelino, renacentista y herreriano',
    heritageStatus: 'Patrimonio de la Humanidad UNESCO · Ciudad Colonial',
    wikiTitle: 'Monasterio_de_San_Francisco_(Santo_Domingo)',
    enWikiTitle: 'Monastery_of_San_Francisco_(Santo_Domingo)',
    summary:
      'Primer monasterio construido en América, iniciado tras la llegada de los frailes franciscanos en 1502 bajo el gobierno de Nicolás de Ovando.',
    historicalContext:
      'Sus muros resistieron el saqueo de Francis Drake (1586), terremotos coloniales y bombardeos del siglo XIX, conservando una imponente nave abierta declarada patrimonio universal.',
  },
  {
    id: 'mon-fortaleza-ozama',
    name: 'Fortaleza Ozama (Torre del Homenaje)',
    shortName: 'Fortaleza Ozama',
    category: 'fortaleza',
    yearBuilt: 1502,
    centuryLabel: '1502–1508 (Siglo XVI)',
    province: 'Distrito Nacional',
    locationLabel: 'Calle Las Damas, desembocadura del río Ozama',
    lat: 18.4731,
    lng: -69.8819,
    architecturalStyle: 'Arquitectura militar medieval y renacentista española',
    heritageStatus: 'Patrimonio de la Humanidad UNESCO · Estructura militar más antigua de América',
    wikiTitle: 'Fortaleza_Ozama',
    enWikiTitle: 'Fortaleza_Ozama',
    summary:
      'Erigida entre 1502 y 1508 para resguardar la entrada del puerto de Santo Domingo y el estuario del río Ozama frente a incursiones piratas y potencias rivales.',
    historicalContext:
      'Su célebre Torre del Homenaje albergó a cronistas como Gonzalo Fernández de Oviedo y presenció izamientos de banderas durante la Independencia y las contiendas republicanas.',
  },
  {
    id: 'mon-catedral-primada',
    name: 'Catedral Primada de América (Santa María la Menor)',
    shortName: 'Catedral Primada de América',
    category: 'iglesia',
    yearBuilt: 1512,
    centuryLabel: '1512–1541 (Siglo XVI)',
    province: 'Distrito Nacional',
    locationLabel: 'Parque Colón, Calle Arzobispo Meriño, Ciudad Colonial',
    lat: 18.4728,
    lng: -69.8838,
    architecturalStyle: 'Gótico con bóvedas de crucería y fachada plateresca',
    heritageStatus: 'Patrimonio de la Humanidad UNESCO · Basílica Menor',
    wikiTitle: 'Catedral_de_Santo_Domingo',
    enWikiTitle: 'Cathedral_of_Santa_María_la_Menor',
    summary:
      'Primera catedral consagrada del Nuevo Mundo, erigida en piedra caliza coralina con catorce capillas laterales y portada plateresca.',
    historicalContext:
      'Fue centro eclesiástico de la primera arquidiócesis de América y custodió durante siglos el mausoleo atribuido al almirante Cristóbal Colón.',
  },
  {
    id: 'mon-alcazar-colon',
    name: 'Alcázar de Colón',
    shortName: 'Alcázar de Colón',
    category: 'palacio',
    yearBuilt: 1511,
    centuryLabel: '1511–1514 (Siglo XVI)',
    province: 'Distrito Nacional',
    locationLabel: 'Plaza España, Ciudad Colonial de Santo Domingo',
    lat: 18.4776,
    lng: -69.8832,
    architecturalStyle: 'Gótico tardío y renacentista plateresco',
    heritageStatus: 'Patrimonio de la Humanidad UNESCO · Palacio virreinal',
    wikiTitle: 'Alcázar_de_Colón',
    enWikiTitle: 'Alcázar_de_Colón',
    summary:
      'Residencia palaciega construida en piedra coralina para Diego Colón, virrey e hijo del almirante Cristóbal Colón, y su esposa María de Toledo.',
    historicalContext:
      'Desde sus galerías abiertas al río Ozama se planificaron expediciones hacia Cuba, México y Tierra Firme; tras quedar en ruinas en el siglo XIX, fue restaurado en la década de 1950.',
  },
  {
    id: 'mon-hospital-san-nicolas',
    name: 'Ruinas del Hospital San Nicolás de Bari',
    shortName: 'Hospital San Nicolás de Bari',
    category: 'ruinas',
    yearBuilt: 1503,
    centuryLabel: '1503–1552 (Siglo XVI)',
    province: 'Distrito Nacional',
    locationLabel: 'Calle Hostos esq. General Luperón, Ciudad Colonial',
    lat: 18.4744,
    lng: -69.8861,
    architecturalStyle: 'Gótico tardío y renacentista en ladrillo y mampostería',
    heritageStatus: 'Patrimonio de la Humanidad UNESCO · Primer hospital de América',
    wikiTitle: 'Hospital_San_Nicolás_de_Bari_(Santo_Domingo)',
    enWikiTitle: 'Hospital_San_Nicolás_de_Bari',
    summary:
      'Fundado por orden del gobernador Nicolás de Ovando en 1503 como la primera institución hospitalaria de piedra edificada en el continente americano.',
    historicalContext:
      'Su planta en cruz latina permitía atender hasta setenta enfermos simultáneamente; hoy conserva arcos de ladrillo y muros monumentales al aire libre.',
  },
  {
    id: 'mon-casas-reales',
    name: 'Palacio de la Real Audiencia (Museo de las Casas Reales)',
    shortName: 'Museo de las Casas Reales',
    category: 'palacio',
    yearBuilt: 1511,
    centuryLabel: '1511–1520 (Siglo XVI)',
    province: 'Distrito Nacional',
    locationLabel: 'Calle Las Damas esq. Mercedes, Ciudad Colonial',
    lat: 18.4761,
    lng: -69.8828,
    architecturalStyle: 'Renacentista español e isabelino',
    heritageStatus: 'Patrimonio de la Humanidad UNESCO · Antigua Real Audiencia',
    wikiTitle: 'Museo_de_las_Casas_Reales',
    enWikiTitle: 'Museo_de_las_Casas_Reales',
    summary:
      'Complejo administrativo que albergó la Real Audiencia de Santo Domingo, la Capitanía General y la Real Hacienda de la Corona española en las Indias.',
    historicalContext:
      'Constituyó el primer tribunal de apelación y sede gubernamental permanente de la América colonial antes de la expansión continental.',
  },
  {
    id: 'mon-convento-dominicos',
    name: 'Convento de los Dominicos (Primera Universidad de América)',
    shortName: 'Convento de los Dominicos',
    category: 'iglesia',
    yearBuilt: 1510,
    centuryLabel: '1510–1538 (Siglo XVI)',
    province: 'Distrito Nacional',
    locationLabel: 'Calle Padre Billini esq. Duarte, Ciudad Colonial',
    lat: 18.4714,
    lng: -69.8871,
    architecturalStyle: 'Gótico tardío y barroco colonial (Capilla del Rosario)',
    heritageStatus: 'Patrimonio de la Humanidad UNESCO · Cuna universitaria de América',
    wikiTitle: 'Convento_de_los_Dominicos_(Santo_Domingo)',
    enWikiTitle: 'Convento_de_los_Dominicos',
    summary:
      'Sede de la orden de predicadores donde fray Antón de Montesinos pronunció el histórico Sermón de Adviento de 1511 en defensa de los indígenas taínos.',
    historicalContext:
      'En 1538 la bula In Apostolatus Culmine erigió aquí el Estudio General que dio origen a la Universidad Primada de América (UASD).',
  },
  {
    id: 'mon-puerta-del-conde',
    name: 'Puerta del Conde y Baluarte del 27 de Febrero',
    shortName: 'Puerta del Conde',
    category: 'fortaleza',
    yearBuilt: 1543,
    centuryLabel: '1543–1655 (Siglos XVI–XVII)',
    province: 'Distrito Nacional',
    locationLabel: 'Parque Independencia, extremo oeste de la Calle El Conde',
    lat: 18.4718,
    lng: -69.8923,
    architecturalStyle: 'Fortificación abaluartada colonial española',
    heritageStatus: 'Patrimonio de la Humanidad UNESCO · Altar simbólico de la Independencia',
    wikiTitle: 'Puerta_del_Conde',
    enWikiTitle: 'Puerta_del_Conde',
    summary:
      'Antiguo bastión de la muralla occidental de Santo Domingo, bautizado en honor al conde de Peñalva tras la defensa exitosa frente a la invasión inglesa de 1655.',
    historicalContext:
      'La noche del 27 de febrero de 1844, Francisco del Rosario Sánchez, Ramón Matías Mella y los trinitarios proclamaron aquí la Independencia Nacional.',
  },
  {
    id: 'mon-panteon-patria',
    name: 'Panteón de la Patria (Antigua Iglesia de los Jesuitas)',
    shortName: 'Panteón de la Patria',
    category: 'iglesia',
    yearBuilt: 1714,
    centuryLabel: '1714–1745 (Siglo XVIII)',
    province: 'Distrito Nacional',
    locationLabel: 'Calle Las Damas, Ciudad Colonial de Santo Domingo',
    lat: 18.4754,
    lng: -69.8827,
    architecturalStyle: 'Neoclásico con vestigios barrocos jesuitas',
    heritageStatus: 'Patrimonio de la Humanidad UNESCO · Mausoleo nacional',
    wikiTitle: 'Panteón_de_la_Patria',
    enWikiTitle: 'Panteón_de_la_Patria',
    summary:
      'Templo erigido por la Compañía de Jesús en el siglo XVIII con sólida cantería caliza, convertido tras múltiples usos civiles en mausoleo de próceres dominicanos.',
    historicalContext:
      'Desde 1958 custodia los restos de figuras fundamentales de la historia política, militar y cultural de la República Dominicana.',
  },
  {
    id: 'mon-casa-del-cordon',
    name: 'Casa del Cordón',
    shortName: 'Casa del Cordón',
    category: 'palacio',
    yearBuilt: 1503,
    centuryLabel: '1503–1509 (Siglo XVI)',
    province: 'Distrito Nacional',
    locationLabel: 'Calle Isabel La Católica esq. Emiliano Tejera, Ciudad Colonial',
    lat: 18.4763,
    lng: -69.8851,
    architecturalStyle: 'Gótico isabelino y mudéjar',
    heritageStatus: 'Patrimonio de la Humanidad UNESCO · Primera casa de piedra de dos plantas',
    wikiTitle: 'Casa_del_Cordón_(Santo_Domingo)',
    enWikiTitle: 'Casa_del_Cordón',
    summary:
      'Considerada la primera vivienda señorial de dos pisos construida en piedra en América, distinguida por el cordón franciscano esculpido sobre su portal.',
    historicalContext:
      'Sirvió de residencia temporal a Diego Colón y María de Toledo antes de la conclusión del Alcázar y fue escenario de negociaciones durante el asedio de Drake.',
  },
  {
    id: 'mon-la-isabela',
    name: 'Parque Arqueológico La Isabela',
    shortName: 'La Isabela (1494)',
    category: 'villa',
    yearBuilt: 1494,
    centuryLabel: '1494–1498 (Siglo XV)',
    province: 'Puerto Plata',
    locationLabel: 'El Castillo, municipio de Luperón, Puerto Plata',
    lat: 19.8872,
    lng: -71.0806,
    architecturalStyle: 'Trazado fundacional colombino (cimientos de alhóndiga, iglesia y casa real)',
    heritageStatus: 'Parque Histórico Nacional · Primer asentamiento urbano europeo en América',
    wikiTitle: 'La_Isabela',
    enWikiTitle: 'La_Isabela',
    summary:
      'Primera villa permanente fundada por Cristóbal Colón en enero de 1494 durante su segundo viaje, tras el hallazgo de la destrucción del Fuerte de la Navidad.',
    historicalContext:
      'Conserva los cimientos de la primera iglesia, la alhóndiga y la casa de Colón, además de evidencias del contacto temprano entre españoles y taínos.',
  },
  {
    id: 'mon-fortaleza-san-felipe',
    name: 'Fortaleza San Felipe',
    shortName: 'Fortaleza San Felipe',
    category: 'fortaleza',
    yearBuilt: 1564,
    centuryLabel: '1564–1577 (Siglo XVI)',
    province: 'Puerto Plata',
    locationLabel: 'Puntilla del Malecón, San Felipe de Puerto Plata',
    lat: 19.8039,
    lng: -70.6956,
    architecturalStyle: 'Fortificación costera española con foso y torreón cilíndrico',
    heritageStatus: 'Monumento Histórico Nacional · Defensa atlántica colonial',
    wikiTitle: 'Fortaleza_San_Felipe_(Puerto_Plata)',
    enWikiTitle: 'Fortaleza_San_Felipe',
    summary:
      'Baluarte ordenado por el rey Felipe II y concluido en 1577 para proteger la costa norte de La Española contra corsarios franceses, ingleses y holandeses.',
    historicalContext:
      'Resistió las Devastaciones de Osorio (1605–1606), la batalla naval de 1800 y sirvió además como prisión política de Juan Pablo Duarte en 1844.',
  },
  {
    id: 'mon-vega-vieja',
    name: 'Ruinas de La Vega Vieja (Concepción de la Vega)',
    shortName: 'Ruinas de La Vega Vieja',
    category: 'villa',
    yearBuilt: 1495,
    centuryLabel: '1495–1562 (Siglos XV–XVI)',
    province: 'La Vega',
    locationLabel: 'Pueblo Viejo, municipio Concepción de La Vega',
    lat: 19.2775,
    lng: -70.5439,
    architecturalStyle: 'Ladrillo colonial temprano y cimientos fortificados',
    heritageStatus: 'Parque Histórico y Arqueológico Nacional',
    wikiTitle: 'Concepción_de_la_Vega',
    enWikiTitle: 'Concepción_de_la_Vega',
    summary:
      'Emporio aurífero del Cibao fundado por Cristóbal Colón en 1495 alrededor del fuerte La Concepción, sede de una de las primeras cecas y obispados de América.',
    historicalContext:
      'Un devastador terremoto el 2 de diciembre de 1562 destruyó la ciudad colonial, obligando a su traslado a las riberas del río Camú.',
  },
  {
    id: 'mon-ruinas-engombe',
    name: 'Ruinas del Ingenio y Palacio de Engombe',
    shortName: 'Ruinas de Engombe',
    category: 'ruinas',
    yearBuilt: 1535,
    centuryLabel: 'c. 1535 (Siglo XVI)',
    province: 'Santo Domingo',
    locationLabel: 'Margen del río Haina, Santo Domingo Oeste',
    lat: 18.4547,
    lng: -69.9889,
    architecturalStyle: 'Arquitectura señorial y agroindustrial azucarera del siglo XVI',
    heritageStatus: 'Parque Histórico y Ecológico · Patrimonio Colonial Azucarero',
    wikiTitle: 'Engombe',
    enWikiTitle: 'Engombe',
    summary:
      'Antiguo ingenio azucarero colonial que conserva un palacio renacentista de dos plantas, una capilla abovedada y vestigios del trapiche.',
    historicalContext:
      'Representa uno de los testimonios materiales mejor preservados de la economía azucarera esclavista del siglo XVI en el Caribe.',
  },
  {
    id: 'mon-san-dionisio-higuey',
    name: 'Iglesia Colonial de San Dionisio',
    shortName: 'Iglesia San Dionisio (Higüey)',
    category: 'iglesia',
    yearBuilt: 1572,
    centuryLabel: '1569–1572 (Siglo XVI)',
    province: 'La Altagracia',
    locationLabel: 'Centro histórico de Salvaleón de Higüey',
    lat: 18.6164,
    lng: -68.7128,
    architecturalStyle: 'Templo colonial de nave única y bóveda de cañón en mampostería',
    heritageStatus: 'Santuario histórico mariano del Oriente dominicano',
    wikiTitle: 'Iglesia_de_San_Dionisio_(Higüey)',
    enWikiTitle: 'Higüey',
    summary:
      'Templo del siglo XVI que funcionó durante casi cuatro siglos como primer santuario de la Virgen de la Altagracia en la región este de la isla.',
    historicalContext:
      'Conserva elementos arquitectónicos coloniales de mampostería y ladrillo que precedieron a la basílica moderna inaugurada en 1971.',
  },
];

const wikiImageMemoryCache = new Map();
const wikiImageInflight = new Map();

function stripHtmlTags(raw) {
  if (!raw) return '';
  return String(raw)
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function isExcludedWikiAsset(title = '', mime = '', width, height) {
  const lower = title.toLowerCase();
  if (mime && !['image/jpeg', 'image/png', 'image/webp'].includes(mime)) {
    return true;
  }
  if (typeof width === 'number' && width < 260) return true;
  if (typeof height === 'number' && height < 180) return true;

  const blockedTokens = [
    '.svg',
    'commons-logo',
    'wikidata',
    'wikisource',
    'flag_of',
    'escudo',
    'coat_of_arms',
    'location_map',
    'locator',
    'icon',
    'ambox',
    'symbol',
    'unesco_logo',
    'world_heritage',
  ];
  return blockedTokens.some((tok) => lower.includes(tok));
}

function isHistoricalPhoto(title, caption, dateLabel) {
  const combined = `${title} ${caption} ${dateLabel}`.toLowerCase();
  return /\b(18\d{2}|19[0-5]\d|historic|históric|antigu|grabado|lithograph|postcard|postal|archivo|archive|vintage|siglo xix|siglo xviii)\b/.test(
    combined,
  );
}

async function queryWikipediaByLang(lang, title, fallbackName, signal) {
  const summaryEndpoint =
    `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(title)}` +
    `&redirects=1&prop=extracts|info|pageimages&exintro=1&explaintext=1&inprop=url` +
    `&piprop=original|thumbnail&pithumbsize=900&format=json&origin=*`;

  const res = await fetch(summaryEndpoint, { signal });
  if (!res.ok) return null;

  const data = await res.json();
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  let page = pages[0];

  if (!page || page.missing !== undefined) {
    return null;
  }

  const canonicalTitle = page.title || title;
  const photos = [];
  const seenUrls = new Set();

  if (page.thumbnail?.source || page.original?.source) {
    const primaryUrl = page.original?.source || page.thumbnail?.source;
    const thumbUrl = page.thumbnail?.source || page.original?.source;
    seenUrls.add(primaryUrl);
    photos.push({
      url: primaryUrl,
      thumbUrl,
      title: canonicalTitle,
      caption: fallbackName || canonicalTitle,
      sourcePageUrl: page.fullurl || `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(canonicalTitle)}`,
      isHistoricalHint: false,
    });
  }

  // Query gallery images attached to the Wikipedia article
  const galleryEndpoint =
    `https://${lang}.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(canonicalTitle)}` +
    `&generator=images&gimlimit=15&prop=imageinfo&iiprop=url|mime|size|extmetadata&iiurlwidth=800&format=json&origin=*`;

  try {
    const galleryRes = await fetch(galleryEndpoint, { signal });
    if (galleryRes.ok) {
      const galleryData = await galleryRes.json();
      const imagePages = galleryData?.query?.pages ? Object.values(galleryData.query.pages) : [];

      for (const imgPage of imagePages) {
        const info = imgPage?.imageinfo?.[0];
        const fileTitle = imgPage?.title || '';
        if (!info?.url || seenUrls.has(info.url)) continue;
        if (isExcludedWikiAsset(fileTitle, info.mime, info.width, info.height)) continue;

        const desc =
          stripHtmlTags(info.extmetadata?.ImageDescription?.value) ||
          stripHtmlTags(info.extmetadata?.ObjectName?.value) ||
          fallbackName;
        const author = stripHtmlTags(info.extmetadata?.Artist?.value);
        const dateLabel = stripHtmlTags(info.extmetadata?.DateTimeOriginal?.value);
        const cleanTitle = fileTitle
          .replace(/^File:/i, '')
          .replace(/^Archivo:/i, '')
          .replace(/_/g, ' ');

        seenUrls.add(info.url);
        photos.push({
          url: info.url,
          thumbUrl: info.thumburl || info.url,
          title: cleanTitle,
          caption: desc.slice(0, 220),
          author: author ? author.slice(0, 80) : undefined,
          dateLabel: dateLabel ? dateLabel.slice(0, 48) : undefined,
          sourcePageUrl: info.descriptionurl || info.url,
          isHistoricalHint: isHistoricalPhoto(cleanTitle, desc, dateLabel),
        });
      }
    }
  } catch {
    // Keep primary thumbnail if gallery lookup fails
  }

  photos.sort((a, b) => Number(b.isHistoricalHint) - Number(a.isHistoricalHint));

  return {
    wikipediaTitle: canonicalTitle,
    wikipediaUrl:
      page.fullurl || `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(canonicalTitle)}`,
    wikipediaExtract: page.extract || '',
    primaryImage: photos[0]?.thumbUrl || photos[0]?.url || null,
    photos,
  };
}

/**
 * Obtiene de forma síncrona el resultado en caché para un monumento colonial.
 */
export function getCachedMonumentWikipediaImages(monumentOrKey) {
  if (!monumentOrKey) return null;
  const key =
    typeof monumentOrKey === 'string'
      ? monumentOrKey
      : monumentOrKey.id || monumentOrKey.wikiTitle || monumentOrKey.name;
  return wikiImageMemoryCache.get(key) || null;
}

/**
 * Obtiene imágenes vinculadas y extracto enciclopédico de un monumento colonial
 * directamente mediante la API pública de Wikipedia (con soporte CORS origin=*).
 */
export async function fetchMonumentWikipediaImages(monumentOrTitle, options = {}) {
  const isObj = typeof monumentOrTitle === 'object' && monumentOrTitle !== null;
  const cacheKey = isObj
    ? monumentOrTitle.id || monumentOrTitle.wikiTitle || monumentOrTitle.name
    : String(monumentOrTitle || '');

  if (!cacheKey) {
    return { wikipediaTitle: '', wikipediaUrl: '', wikipediaExtract: '', primaryImage: null, photos: [] };
  }

  if (!options.forceRefresh && wikiImageMemoryCache.has(cacheKey)) {
    return wikiImageMemoryCache.get(cacheKey);
  }

  if (!options.forceRefresh && wikiImageInflight.has(cacheKey)) {
    return wikiImageInflight.get(cacheKey);
  }

  const esTitle = isObj ? monumentOrTitle.wikiTitle || monumentOrTitle.name : cacheKey;
  const enTitle = isObj ? monumentOrTitle.enWikiTitle || esTitle : cacheKey;
  const displayName = isObj ? monumentOrTitle.name || monumentOrTitle.shortName : cacheKey;

  const task = (async () => {
    try {
      let result = await queryWikipediaByLang('es', esTitle, displayName, options.signal);
      if (!result || result.photos.length === 0) {
        const enResult = await queryWikipediaByLang('en', enTitle, displayName, options.signal);
        if (enResult) {
          if (!result) {
            result = enResult;
          } else {
            const seen = new Set(result.photos.map((p) => p.url));
            for (const photo of enResult.photos) {
              if (!seen.has(photo.url)) result.photos.push(photo);
            }
            if (!result.primaryImage) result.primaryImage = enResult.primaryImage;
          }
        }
      }

      const finalPayload = result || {
        wikipediaTitle: displayName,
        wikipediaUrl: `https://es.wikipedia.org/wiki/${encodeURIComponent(esTitle)}`,
        wikipediaExtract: isObj ? monumentOrTitle.summary || '' : '',
        primaryImage: null,
        photos: [],
      };

      wikiImageMemoryCache.set(cacheKey, finalPayload);
      return finalPayload;
    } finally {
      wikiImageInflight.delete(cacheKey);
    }
  })();

  wikiImageInflight.set(cacheKey, task);
  return task;
}
