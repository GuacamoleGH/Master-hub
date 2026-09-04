"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Star,
  Calendar,
  MessageSquare,
  Loader2,
  Sparkles,
  Tv,
} from "lucide-react";
import MoviePoster from "./MoviePoster";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  movie: {
    tmdbId: number;
    title: string;
    year?: number | null;
    posterPath?: string | null;
    imdbRating?: number | null;
    streamingPlatforms?: string[];
  };
  initialRating?: number | null;
  initialReview?: string | null;
  initialDate?: string | null;
  initialPlatform?: string | null;
  apiEndpoint?: string;
  mediaLabel?: string;
}

const COMMON_PLATFORMS = [
  "Netflix",
  "HBO Max",
  "Prime Video",
  "Disney+",
  "Pirata / Stremio",
  "Cine / Físico",
];

export default function ReviewModal({
  isOpen,
  onClose,
  onSaved,
  movie,
  initialRating,
  initialReview,
  initialDate,
  initialPlatform,
  apiEndpoint = "/api/user-movies",
  mediaLabel = "película",
}: ReviewModalProps) {
  const [hasRating, setHasRating] = useState<boolean>(
    initialRating !== null && initialRating !== undefined ? true : true,
  );
  const [rating, setRating] = useState<number>(initialRating ?? 8.0);
  const [review, setReview] = useState<string>(initialReview ?? "");
  const [platform, setPlatform] = useState<string>(
    initialPlatform ||
      (movie.streamingPlatforms && movie.streamingPlatforms.length > 0
        ? movie.streamingPlatforms[0]
        : "Pirata / Stremio"),
  );
  const [watchedDate, setWatchedDate] = useState<string>(
    initialDate
      ? new Date(initialDate).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialRating !== undefined) {
      setHasRating(initialRating !== null);
      if (initialRating !== null) {
        setRating(initialRating);
      }
    } else {
      setHasRating(true);
    }
    if (initialReview) {
      setReview(initialReview);
    }
    if (initialDate) {
      setWatchedDate(new Date(initialDate).toISOString().split("T")[0]);
    }
    if (initialPlatform) {
      setPlatform(initialPlatform);
    } else if (
      movie.streamingPlatforms &&
      movie.streamingPlatforms.length > 0
    ) {
      setPlatform(movie.streamingPlatforms[0]);
    }
  }, [initialRating, initialReview, initialDate, initialPlatform, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tmdbId: movie.tmdbId,
          status: "WATCHED",
          userRating: hasRating ? Number(rating.toFixed(1)) : null,
          review: review.trim() || null,
          platform: platform || null,
          watchedDate: new Date(watchedDate).toISOString(),
        }),
      });

      if (!res.ok) {
        throw new Error("No se pudo guardar la reseña");
      }

      onSaved();
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Error al guardar");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg glass-panel bg-cine-900/95 border border-cine-700/80 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Cabecera del modal */}
        <div className="flex items-center justify-between p-5 border-b border-cine-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-14 rounded overflow-hidden shadow flex-shrink-0 bg-cine-950">
              <MoviePoster src={movie.posterPath} alt={movie.title} />
            </div>
            <div>
              <h3 className="font-bold text-white text-base line-clamp-1">
                {movie.title}
              </h3>
              <p className="text-xs text-cine-400">
                {movie.year ? `${movie.year} · ` : ""}IMDb:{" "}
                {movie.imdbRating ? `${movie.imdbRating}/10` : "N/A"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-cine-400 hover:text-white rounded-lg hover:bg-cine-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {errorMsg && (
            <div className="p-3 bg-red-950/60 border border-red-800/60 text-red-300 text-xs rounded-xl">
              {errorMsg}
            </div>
          )}

          {/* Calificación y Checkbox Asignar nota */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-sm font-semibold text-cine-200 flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Mi
                Valoración
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableMovieRating"
                  checked={hasRating}
                  onChange={(e) => setHasRating(e.target.checked)}
                  className="w-4 h-4 rounded border-cine-700 bg-cine-900 text-amber-500 focus:ring-amber-400 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="enableMovieRating"
                  className="text-xs text-cine-300 font-medium cursor-pointer select-none hover:text-white transition-colors"
                >
                  Asignar nota
                </label>
              </div>
            </div>

            {hasRating ? (
              <div className="space-y-3 bg-cine-950/60 p-4 rounded-2xl border border-amber-500/20 animate-in fade-in duration-200">
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-black text-amber-400 font-mono tracking-tight">
                    {rating.toFixed(1)}
                  </span>
                  <div className="flex items-center gap-1 bg-cine-900 border border-amber-500/30 px-2.5 py-1 rounded-xl">
                    <input
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={rating}
                      onChange={(e) => {
                        const val = parseFloat(e.target.value);
                        if (!isNaN(val)) {
                          setRating(
                            Math.max(0, Math.min(10, Number(val.toFixed(1)))),
                          );
                        }
                      }}
                      className="w-12 bg-transparent text-right font-mono font-bold text-amber-400 text-base focus:outline-none"
                    />
                    <span className="text-xs text-cine-400 font-semibold">
                      /10
                    </span>
                  </div>
                </div>

                {/* Slider interactivo */}
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  className="w-full h-2 bg-cine-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[11px] text-cine-500 font-mono">
                  <span>0.0</span>
                  <span>2.5</span>
                  <span>5.0</span>
                  <span>7.5</span>
                  <span>10.0</span>
                </div>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-cine-950/40 border border-cine-800/80 text-xs text-cine-400 italic text-center">
                Guardarás este título como visto sin puntuación (puedes
                asignarle nota cuando quieras).
              </div>
            )}
          </div>

          {/* Selector de Plataforma de Streaming / Opción Pirata */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
              <Tv className="w-3.5 h-3.5 text-cine-400" /> ¿Dónde la viste?
              (Plataforma)
            </label>
            <div className="grid grid-cols-3 gap-2">
              {COMMON_PLATFORMS.map((plat) => {
                const isSelected = platform === plat;
                const isPirate = plat.includes("Pirata");
                return (
                  <button
                    key={plat}
                    type="button"
                    onClick={() => setPlatform(plat)}
                    className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border transition-all text-center truncate ${
                      isSelected
                        ? isPirate
                          ? "bg-amber-500/20 border-amber-500 text-amber-300 font-bold shadow"
                          : "bg-amber-500 text-cine-950 border-amber-400 font-bold shadow"
                        : "bg-cine-950/70 border-cine-800 text-cine-300 hover:text-white hover:border-cine-700"
                    }`}
                  >
                    {isPirate ? "🏴‍☠️ Pirata" : plat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Fecha en que se vio */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cine-400" /> Fecha de
              visionado
            </label>
            <input
              type="date"
              value={watchedDate}
              onChange={(e) => setWatchedDate(e.target.value)}
              className="w-full px-3.5 py-2 bg-cine-950 border border-cine-800 rounded-xl text-sm text-cine-200 focus:outline-none focus:border-amber-500/60"
            />
          </div>

          {/* Reseña personal */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5 text-cine-400" /> Reseña
              personal (+50 XP)
            </label>
            <textarea
              rows={3}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Escribe tu crítica cinematográfica, qué te pareció el ritmo, las actuaciones, el montaje..."
              className="w-full p-3.5 bg-cine-950 border border-cine-800 rounded-xl text-sm text-cine-100 placeholder-cine-600 focus:outline-none focus:border-amber-500/60 transition-colors resize-none"
            />
          </div>

          {/* Acciones */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-cine-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-cine-400 hover:text-white rounded-xl hover:bg-cine-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-cine-950 font-bold rounded-xl shadow-gold-glow flex items-center gap-2 text-sm transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Guardando...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Guardar valoración
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
