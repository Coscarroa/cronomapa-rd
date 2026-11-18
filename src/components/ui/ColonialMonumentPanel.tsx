import { useCallback, useEffect, useState } from 'react';
import {
  AlertCircle,
  BookOpen,
  Camera,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  History,
  Landmark,
  Loader2,
  MapPin,
  RefreshCw,
  Sparkles,
  X,
  ZoomIn,
} from 'lucide-react';
import { fetchMonumentWikiGrounding } from '../../services/monumentsApi';
import { fetchMonumentWikipediaImages } from '../../data/colonialMonumentsData';
import type { ColonialMonument, MonumentWikiGroundingData } from '../../types/history';

interface ColonialMonumentPanelProps {
  monument: ColonialMonument;
}

function renderFormattedSections(rawText: string) {
  const blocks = rawText
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, idx) => {
    const match = block.match(/^\*\*(.+?)\*\*\s*:?\s*([\s\S]*)$/);
    if (match) {
      const heading = match[1].replace(/:$/, '').trim();
      const body = match[2].trim();
      return (
        <div key={idx} className="space-y-1">
          <div className="text-xs font-semibold text-[#D4AF37] tracking-wide">{heading}</div>
          <p className="text-xs sm:text-[13px] leading-relaxed text-[#F4F1EA]/90">{body}</p>
        </div>
      );
    }
    return (
      <p key={idx} className="text-xs sm:text-[13px] leading-relaxed text-[#F4F1EA]/90">
        {block.replace(/\*\*/g, '')}
      </p>
    );
  });
}

export default function ColonialMonumentPanel({ monument }: ColonialMonumentPanelProps) {
  const [wikiData, setWikiData] = useState<MonumentWikiGroundingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [failedUrls, setFailedUrls] = useState<Record<string, boolean>>({});
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const loadMonumentData = useCallback(
    async (forceRefresh = false, signal?: AbortSignal) => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const data = await fetchMonumentWikiGrounding(monument, { forceRefresh, signal });
        if (signal?.aborted) return;

        if (data.photos.length === 0) {
          const fallback = await fetchMonumentWikipediaImages(monument, { forceRefresh, signal });
          if (signal?.aborted) return;
          setWikiData({
            ...data,
            wikipediaTitle: data.wikipediaTitle || fallback.wikipediaTitle,
            wikipediaUrl: data.wikipediaUrl || fallback.wikipediaUrl,
            wikipediaExtract: data.wikipediaExtract || fallback.wikipediaExtract,
            photos: fallback.photos,
          });
        } else {
          setWikiData(data);
        }

        setActivePhotoIndex(0);
        setFailedUrls({});
      } catch (err) {
        if (signal?.aborted) return;
        try {
          const fallback = await fetchMonumentWikipediaImages(monument, { forceRefresh, signal });
          if (signal?.aborted) return;
          setWikiData({
            id: monument.id,
            name: monument.name,
            groundedSummary: '',
            groundingSources: [],
            searchQueries: [],
            groundingStatus: 'unavailable',
            wikipediaTitle: fallback.wikipediaTitle,
            wikipediaUrl: fallback.wikipediaUrl,
            wikipediaExtract: fallback.wikipediaExtract,
            photos: fallback.photos,
            fetchedAt: new Date().toISOString(),
          });
          setActivePhotoIndex(0);
          setFailedUrls({});
        } catch {
          setErrorMsg(
            err instanceof Error
              ? err.message
              : 'No se pudo consultar Wikipedia para este monumento.',
          );
        }
      } finally {
        if (!signal?.aborted) {
          setLoading(false);
        }
      }
    },
    [monument],
  );

  useEffect(() => {
    const controller = new AbortController();
    setWikiData(null);
    setLightboxOpen(false);
    void loadMonumentData(false, controller.signal);
    return () => controller.abort();
  }, [loadMonumentData]);

  const validPhotos = (wikiData?.photos ?? []).filter((p) => !failedUrls[p.url]);
  const safeIndex = validPhotos.length > 0 ? Math.min(activePhotoIndex, validPhotos.length - 1) : 0;
  const currentPhoto = validPhotos[safeIndex] ?? null;

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setLightboxOpen(false);
      } else if (e.key === 'ArrowRight' && validPhotos.length > 1) {
        setActivePhotoIndex((i) => (i + 1) % validPhotos.length);
      } else if (e.key === 'ArrowLeft' && validPhotos.length > 1) {
        setActivePhotoIndex((i) => (i - 1 + validPhotos.length) % validPhotos.length);
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [lightboxOpen, validPhotos.length]);

  return (
    <div className="space-y-4">
      {/* Location & Heritage Header Tags */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-[#D4AF37]/40 bg-[#0D0F12]/80 text-[#D4AF37] font-medium">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span>{monument.province}</span>
        </span>
        <span className="font-mono-tabular text-xs text-[#C5A059]">
          {monument.lat.toFixed(4)}° N, {Math.abs(monument.lng).toFixed(4)}° O
        </span>
      </div>

      {/* Historical Photos Gallery (Wikipedia / Wikimedia Commons) */}
      <div className="rounded-xl border border-[#C5A059]/35 bg-[#0D0F12]/85 overflow-hidden">
        <div className="px-3.5 py-2.5 border-b border-[#C5A059]/20 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Camera className="w-3.5 h-3.5 shrink-0" />
            <span>Galería y Fotos Históricas (Wikipedia)</span>
          </div>
          {validPhotos.length > 0 && (
            <span className="font-mono-tabular text-[11px] text-[#A39E93]">
              {safeIndex + 1} / {validPhotos.length}
            </span>
          )}
        </div>

        {loading ? (
          <div className="aspect-video flex flex-col items-center justify-center gap-2.5 bg-[#0D0F12] text-[#A39E93] px-4 text-center">
            <Loader2 className="w-6 h-6 text-[#D4AF37] animate-spin" />
            <span className="text-xs">
              Consultando Wikipedia con Grounding y recuperando fotografías históricas...
            </span>
          </div>
        ) : currentPhoto ? (
          <div className="space-y-2.5 p-2.5">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-[#161920] border border-[#C5A059]/25 group">
              <img
                src={currentPhoto.thumbUrl || currentPhoto.url}
                alt={currentPhoto.caption || currentPhoto.title}
                referrerPolicy="no-referrer"
                onError={() =>
                  setFailedUrls((prev) => ({
                    ...prev,
                    [currentPhoto.url]: true,
                  }))
                }
                onClick={() => setLightboxOpen(true)}
                className="w-full h-full object-cover cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
              />

              {/* Historical / Archive Badge */}
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold backdrop-blur-md border ${
                    currentPhoto.isHistoricalHint
                      ? 'bg-[#9B2226]/85 border-[#D4AF37]/60 text-[#F4F1EA]'
                      : 'bg-[#0D0F12]/80 border-[#C5A059]/40 text-[#D4AF37]'
                  }`}
                >
                  {currentPhoto.isHistoricalHint ? 'Archivo Histórico' : 'Wikimedia / Wikipedia'}
                </span>
              </div>

              {/* Expand Lightbox Button */}
              <button
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Ampliar fotografía histórica"
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-[#0D0F12]/80 hover:bg-[#D4AF37] text-[#F4F1EA] hover:text-[#0D0F12] border border-[#C5A059]/45 transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Prev / Next Controls */}
              {validPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActivePhotoIndex((i) => (i - 1 + validPhotos.length) % validPhotos.length)
                    }
                    aria-label="Foto anterior"
                    className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#0D0F12]/75 hover:bg-[#161920] text-[#F4F1EA] border border-[#C5A059]/40 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePhotoIndex((i) => (i + 1) % validPhotos.length)}
                    aria-label="Siguiente foto"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#0D0F12]/75 hover:bg-[#161920] text-[#F4F1EA] border border-[#C5A059]/40 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Caption & Photo Attribution */}
            <div className="px-1 space-y-1">
              <p className="text-xs text-[#F4F1EA]/90 leading-snug line-clamp-2">
                {currentPhoto.caption || currentPhoto.title}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#A39E93]">
                <span className="truncate">
                  {currentPhoto.dateLabel ? `${currentPhoto.dateLabel} · ` : ''}
                  {currentPhoto.author || 'Wikimedia Commons'}
                </span>
                <a
                  href={currentPhoto.sourcePageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline shrink-0"
                >
                  <span>Archivo original</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {validPhotos.length > 1 && (
              <div className="flex items-center gap-1.5 overflow-x-auto gis-scroll pb-1">
                {validPhotos.map((photo, idx) => (
                  <button
                    key={photo.url}
                    type="button"
                    onClick={() => setActivePhotoIndex(idx)}
                    aria-label={`Ver imagen ${idx + 1}`}
                    className={`relative w-14 h-10 rounded-md overflow-hidden border shrink-0 transition-all ${
                      idx === safeIndex
                        ? 'border-[#D4AF37] ring-1 ring-[#D4AF37]'
                        : 'border-[#C5A059]/25 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={photo.thumbUrl || photo.url}
                      alt={photo.title}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedUrls((prev) => ({
                          ...prev,
                          [photo.url]: true,
                        }))
                      }
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="p-5 text-center space-y-2 text-xs text-[#A39E93]">
            <Landmark className="w-6 h-6 text-[#C5A059] mx-auto" />
            <p>No se encontraron fotografías disponibles en Wikimedia Commons para este sitio.</p>
          </div>
        )}
      </div>

      {/* Architectural & Heritage Metadata */}
      <div className="rounded-xl border border-[#C5A059]/25 bg-[#0D0F12]/65 p-3.5 space-y-2 text-xs">
        <div>
          <span className="text-[#A39E93]">Ubicación: </span>
          <span className="text-[#F4F1EA] font-medium">{monument.locationLabel}</span>
        </div>
        <div>
          <span className="text-[#A39E93]">Estilo arquitectónico: </span>
          <span className="text-[#F4F1EA]">{monument.architecturalStyle}</span>
        </div>
        <div>
          <span className="text-[#A39E93]">Estatus patrimonial: </span>
          <span className="text-[#D4AF37] font-medium">{monument.heritageStatus}</span>
        </div>
      </div>

      {/* Wikipedia REST API (Español) Historical Panel */}
      <div className="rounded-xl border border-[#C5A059]/35 bg-[#0D0F12]/75 p-4 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#D4AF37]">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Ficha Histórica · Wikipedia REST API (ES)</span>
          </div>
          <button
            type="button"
            onClick={() => void loadMonumentData(true)}
            disabled={loading}
            title="Actualizar consulta con Wikipedia REST API"
            className="inline-flex items-center gap-1 text-[11px] text-[#A39E93] hover:text-[#D4AF37] disabled:opacity-50"
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} />
            <span>Actualizar</span>
          </button>
        </div>

        {loading && (
          <div className="space-y-2 animate-pulse">
            <div className="h-3 bg-[#C5A059]/15 rounded w-3/4" />
            <div className="h-3 bg-[#C5A059]/10 rounded w-full" />
            <div className="h-3 bg-[#C5A059]/10 rounded w-5/6" />
          </div>
        )}

        {!loading && errorMsg && (
          <div className="rounded-lg border border-[#9B2226]/60 bg-[#9B2226]/15 p-3 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-[#F4F1EA]">
              <AlertCircle className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
            <p className="text-[#F4F1EA]/85 leading-relaxed">{monument.summary}</p>
            <p className="text-[#A39E93] leading-relaxed">{monument.historicalContext}</p>
          </div>
        )}

        {!loading && !errorMsg && wikiData && (
          <div className="space-y-3">
            {wikiData.groundingStatus === 'grounded' && wikiData.groundedSummary ? (
              <div className="space-y-3">{renderFormattedSections(wikiData.groundedSummary)}</div>
            ) : (
              <div className="space-y-2">
                {wikiData.wikipediaExtract ? (
                  <p className="text-xs sm:text-[13px] leading-relaxed text-[#F4F1EA]/90">
                    {wikiData.wikipediaExtract}
                  </p>
                ) : (
                  <>
                    <p className="text-xs sm:text-[13px] leading-relaxed text-[#F4F1EA]/90">
                      {monument.summary}
                    </p>
                    <p className="text-xs leading-relaxed text-[#A39E93]">
                      {monument.historicalContext}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Wikipedia & Heritage Sources Attribution */}
            {wikiData.groundingSources.length > 0 && (
              <div className="pt-2.5 border-t border-[#C5A059]/20 space-y-2">
                <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-[#C5A059] font-semibold">
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>Fuentes · Wikipedia en Español & UNESCO</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {wikiData.groundingSources.slice(0, 5).map((src) => (
                    <a
                      key={src.uri}
                      href={src.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-[#C5A059]/30 bg-[#161920] hover:border-[#D4AF37] text-[11px] text-[#F4F1EA] hover:text-[#D4AF37] transition-colors max-w-full"
                    >
                      <span className="truncate max-w-[200px]">{src.title}</span>
                      <ExternalLink className="w-3 h-3 shrink-0 text-[#C5A059]" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {wikiData.wikipediaUrl && (
              <a
                href={wikiData.wikipediaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-[#1D3557] hover:bg-[#264673] border border-[#C5A059]/40 text-xs font-semibold text-[#F4F1EA] transition-colors"
              >
                <History className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Leer artículo completo en Wikipedia</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#C5A059]" />
              </a>
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Historical Photo Lightbox */}
      {lightboxOpen && currentPhoto && (
        <div
          className="fixed inset-0 z-[1250] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Visor ampliado de fotografía histórica"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#161920] border border-[#C5A059]/45 rounded-2xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-4 py-3 border-b border-[#C5A059]/25 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="text-[11px] font-mono-tabular uppercase tracking-wider text-[#D4AF37]">
                  {monument.shortName} · Fotografía {safeIndex + 1} de {validPhotos.length}
                </div>
                <div className="font-display text-sm font-semibold text-[#F4F1EA] truncate">
                  {currentPhoto.title}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                aria-label="Cerrar visor de fotografía"
                className="p-2 rounded-lg border border-[#C5A059]/30 bg-[#0D0F12] text-[#A39E93] hover:text-[#F4F1EA] hover:border-[#D4AF37]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative flex-1 bg-[#0D0F12] flex items-center justify-center min-h-[260px] max-h-[68vh] overflow-hidden">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption || currentPhoto.title}
                referrerPolicy="no-referrer"
                className="max-w-full max-h-[66vh] object-contain"
              />
              {validPhotos.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setActivePhotoIndex((i) => (i - 1 + validPhotos.length) % validPhotos.length)
                    }
                    aria-label="Fotografía anterior"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#0D0F12]/85 hover:bg-[#D4AF37] text-[#F4F1EA] hover:text-[#0D0F12] border border-[#C5A059]/50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePhotoIndex((i) => (i + 1) % validPhotos.length)}
                    aria-label="Fotografía siguiente"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#0D0F12]/85 hover:bg-[#D4AF37] text-[#F4F1EA] hover:text-[#0D0F12] border border-[#C5A059]/50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            <div className="px-4 py-3 border-t border-[#C5A059]/25 bg-[#161920] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <p className="text-[#F4F1EA]/90 leading-snug">
                {currentPhoto.caption || currentPhoto.title}
              </p>
              <a
                href={currentPhoto.sourcePageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#D4AF37] hover:underline shrink-0"
              >
                <span>Fuente Wikimedia Commons</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
