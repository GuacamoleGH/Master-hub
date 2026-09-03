"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Star,
  Clock,
  Calendar,
  Bookmark,
  CheckCircle2,
  Edit3,
  Loader2,
  Film,
  Sparkles,
  ArrowLeft,
  User as UserIcon,
  Tv,
} from "lucide-react";
import { MovieDetail } from "@/types/movie";
import BallKnowledgeBadge from "@/components/BallKnowledgeBadge";
import ReviewModal from "@/components/ReviewModal";
import MoviePoster from "@/components/MoviePoster";
import StreamingBadge from "@/components/StreamingBadge";

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = params.id as string;

  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isUpdatingWatchlist, setIsUpdatingWatchlist] = useState(false);

  const fetchMovie = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/movies/${movieId}`);
      if (res.ok) {
        const data = await res.json();
        setMovie(data.movie);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (movieId) {
      fetchMovie();
    }
  }, [movieId]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        <p className="text-sm text-cine-400 font-medium">
          Cargando detalles cinematográficos...
        </p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
        <Film className="w-12 h-12 text-cine-600" />
        <h2 className="text-xl font-bold text-white">Película no encontrada</h2>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-cine-800 hover:bg-cine-700 text-sm rounded-xl transition-colors"
        >
          Volver atrás
        </button>
      </div>
    );
  }

  const isWatchlist = movie.userMovie?.status === "WATCHLIST";
  const isWatched = movie.userMovie?.status === "WATCHED";

  const handleToggleWatchlist = async () => {
    setIsUpdatingWatchlist(true);
    try {
      if (isWatchlist) {
        await fetch(`/api/user-movies?movieId=${movie.id}`, {
          method: "DELETE",
        });
      } else {
        await fetch("/api/user-movies", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tmdbId: movie.tmdbId,
            status: "WATCHLIST",
          }),
        });
      }
      await fetchMovie();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdatingWatchlist(false);
    }
  };

  const formatRuntime = (mins: number | null) => {
    if (!mins) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  };

  const formatSpanishDate = (isoStr: string | null) => {
    if (!isoStr) return null;
    const date = new Date(isoStr);
    return date.toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-10 pb-16">
      {/* Botón Volver */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-semibold text-cine-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al catálogo
      </button>

      {/* Cabecera Inmersiva con Backdrop */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-cine-800 shadow-2xl bg-cine-950">
        {/* Imagen de Backdrop grande */}
        {movie.backdropPath && (
          <div className="absolute inset-0 z-0">
            <img
              src={movie.backdropPath}
              alt={movie.title}
              className="w-full h-full object-cover object-top opacity-25 filter blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cine-950 via-cine-950/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-cine-950 via-cine-950/70 to-transparent" />
          </div>
        )}

        {/* Contenido de la cabecera */}
        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Póster Grande */}
          <div className="w-48 sm:w-60 flex-shrink-0 aspect-[2/3] rounded-2xl overflow-hidden shadow-poster border border-white/10 bg-cine-900">
            <MoviePoster
              src={movie.posterPath}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Ficha técnica y Acciones */}
          <div className="flex-1 space-y-5">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {movie.title}
              </h1>
              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="text-base text-cine-400 italic mt-0.5">
                  Título original: {movie.originalTitle}
                </p>
              )}
            </div>

            {/* Metadatos rápidos: Año, Duración, Géneros, IMDb */}
            <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              {movie.year && (
                <div className="flex items-center gap-1 text-cine-300 font-medium">
                  <Calendar className="w-4 h-4 text-cine-500" />
                  <span>{movie.year}</span>
                </div>
              )}

              {movie.runtime && (
                <div className="flex items-center gap-1 text-cine-300 font-medium">
                  <Clock className="w-4 h-4 text-cine-500" />
                  <span>{formatRuntime(movie.runtime)}</span>
                </div>
              )}

              {movie.imdbRating && (
                <div className="flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>IMDb {movie.imdbRating.toFixed(1)} / 10</span>
                </div>
              )}
            </div>

            {/* Pills de Géneros */}
            {movie.genres && movie.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-cine-800/80 border border-cine-700 text-cine-200"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Plataformas de Streaming Disponibles */}
            {movie.streamingPlatforms &&
              movie.streamingPlatforms.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-cine-400 flex items-center gap-1.5">
                    <Tv className="w-3.5 h-3.5 text-cine-400" /> Dónde ver en
                    streaming:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {movie.streamingPlatforms.map((plat) => (
                      <StreamingBadge key={plat} platform={plat} size="sm" />
                    ))}
                  </div>
                </div>
              )}

            {/* Botones de acción principales */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleToggleWatchlist}
                disabled={isUpdatingWatchlist}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                  isWatchlist
                    ? "bg-amber-500 text-cine-950 font-bold shadow-gold-glow"
                    : "glass-card border border-cine-700 text-cine-200 hover:text-white hover:bg-cine-800"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isWatchlist ? "fill-cine-950" : "text-amber-400"}`}
                />
                {isWatchlist ? "En tu Watchlist" : "+ Añadir a Watchlist"}
              </button>

              <button
                onClick={() => setIsReviewModalOpen(true)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                  isWatched
                    ? "bg-emerald-500 text-cine-950 font-bold shadow"
                    : "bg-amber-500 hover:bg-amber-400 text-cine-950 font-bold shadow-gold-glow"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {isWatched ? "Editar valoración" : "Marcar como vista"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección: Mis Datos Cinematográficos (Si ya fue vista) */}
      {isWatched && movie.userMovie && (
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-cine-900 via-cine-900 to-cine-950 shadow-gold-glow space-y-4">
          <div className="flex items-center justify-between border-b border-cine-800 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Tu Veredicto Cinéfilo
              </h2>
            </div>
            <button
              onClick={() => setIsReviewModalOpen(true)}
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-cine-800/80 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" /> Modificar nota y reseña
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-2">
            {/* Mi Nota vs IMDb */}
            <div className="space-y-1">
              <span className="text-xs text-cine-400 font-medium">
                Mi Calificación
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-amber-400 font-mono">
                  {movie.userMovie.userRating?.toFixed(1) ?? "—"}
                </span>
                <span className="text-sm text-cine-500">/ 10</span>
                {movie.imdbRating && (
                  <span className="text-xs text-cine-400 ml-2">
                    (IMDb:{" "}
                    <strong className="text-white">
                      {movie.imdbRating.toFixed(1)}
                    </strong>
                    )
                  </span>
                )}
              </div>
              {movie.userMovie.difference !== null &&
                movie.userMovie.difference !== undefined && (
                  <div className="text-xs text-cine-400 font-mono">
                    Diferencia con IMDb:{" "}
                    <strong
                      className={
                        Math.abs(movie.userMovie.difference) <= 0.5
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }
                    >
                      {movie.userMovie.difference > 0
                        ? `+${movie.userMovie.difference}`
                        : movie.userMovie.difference}{" "}
                      pts
                    </strong>
                  </div>
                )}
            </div>

            {/* Ball Knowledge */}
            <div className="space-y-2">
              <span className="text-xs text-cine-400 font-medium">
                Índice Ball Knowledge
              </span>
              <div>
                <BallKnowledgeBadge
                  score={movie.userMovie.ballKnowledge}
                  difference={movie.userMovie.difference}
                  size="lg"
                />
              </div>
            </div>

            {/* Plataforma donde se vio */}
            <div className="space-y-1">
              <span className="text-xs text-cine-400 font-medium">
                Plataforma
              </span>
              <div className="pt-1">
                {movie.userMovie.platform ? (
                  <StreamingBadge
                    platform={movie.userMovie.platform}
                    size="sm"
                  />
                ) : (
                  <span className="text-xs text-cine-500 italic">
                    No especificada
                  </span>
                )}
              </div>
            </div>

            {/* Fecha de Visionado */}
            <div className="space-y-1">
              <span className="text-xs text-cine-400 font-medium">
                Fecha de Visionado
              </span>
              <div className="text-sm font-semibold text-cine-200">
                {formatSpanishDate(movie.userMovie.watchedDate) ||
                  "No especificada"}
              </div>
            </div>
          </div>

          {/* Reseña Completa */}
          {movie.userMovie.review && (
            <div className="pt-4 border-t border-cine-800/80">
              <span className="text-xs text-cine-400 font-medium block mb-1">
                Mi Reseña
              </span>
              <blockquote className="p-4 rounded-xl bg-cine-950/70 border border-white/5 text-cine-200 text-sm italic leading-relaxed">
                &quot;{movie.userMovie.review}&quot;
              </blockquote>
            </div>
          )}
        </section>
      )}

      {/* Grid de 2 Columnas: Sinopsis & Equipo */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sinopsis */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-white tracking-wide border-b border-cine-800 pb-2">
            Sinopsis
          </h3>
          <p className="text-cine-300 text-sm sm:text-base leading-relaxed">
            {movie.overview || "Sin sinopsis disponible para este título."}
          </p>

          {/* Director */}
          {movie.director && (
            <div className="pt-4">
              <h4 className="text-xs uppercase font-bold text-cine-400 tracking-wider mb-3">
                Dirección
              </h4>
              <div className="flex items-center gap-3 glass-card p-3 rounded-xl border border-cine-800 max-w-sm">
                {movie.directorImage ? (
                  <img
                    src={movie.directorImage}
                    alt={movie.director}
                    className="w-12 h-12 rounded-full object-cover border border-white/10"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-cine-800 flex items-center justify-center text-cine-500">
                    <UserIcon className="w-5 h-5" />
                  </div>
                )}
                <div>
                  <div className="font-bold text-white text-sm">
                    {movie.director}
                  </div>
                  <div className="text-xs text-cine-400">Director</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Reparto Principal */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white tracking-wide border-b border-cine-800 pb-2">
            Reparto Principal
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2.5">
            {movie.cast && movie.cast.length > 0 ? (
              movie.cast.map((actor) => (
                <div
                  key={actor.id}
                  className="flex items-center gap-3 p-2.5 rounded-xl glass-card border border-cine-800"
                >
                  {actor.profilePath ? (
                    <img
                      src={actor.profilePath}
                      alt={actor.name}
                      className="w-10 h-10 rounded-full object-cover border border-white/10 flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-cine-800 flex items-center justify-center text-cine-500 flex-shrink-0">
                      <UserIcon className="w-4 h-4" />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold text-white truncate">
                      {actor.name}
                    </div>
                    <div className="text-xs text-cine-400 truncate">
                      {actor.character}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-cine-500">
                No hay información de reparto disponible.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Reseña */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSaved={fetchMovie}
        movie={{
          tmdbId: movie.tmdbId,
          title: movie.title,
          year: movie.year,
          posterPath: movie.posterPath,
          imdbRating: movie.imdbRating,
          streamingPlatforms: movie.streamingPlatforms,
        }}
        initialRating={movie.userMovie?.userRating}
        initialReview={movie.userMovie?.review}
        initialDate={movie.userMovie?.watchedDate}
        initialPlatform={movie.userMovie?.platform}
      />
    </div>
  );
}
