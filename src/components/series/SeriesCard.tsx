"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, Bookmark, CheckCircle2, Tv, ExternalLink } from "lucide-react";
import BallKnowledgeBadge from "../BallKnowledgeBadge";
import ReviewModal from "../ReviewModal";
import MoviePoster from "../MoviePoster";
import StreamingBadge from "../StreamingBadge";
import { getImdbUrl } from "@/lib/externalLinks";

export interface SeriesCardProps {
  series: {
    id: string | number;
    tmdbId: number;
    imdbId?: string | null;
    name: string;
    originalName?: string | null;
    firstAirYear?: number | null;
    lastAirYear?: number | null;
    numberOfSeasons?: number | null;
    numberOfEpisodes?: number | null;
    posterPath?: string | null;
    imdbRating?: number | null;
    genres?: string[];
    streamingPlatforms?: string[];
  };
  userSeries?: {
    status: "WATCHLIST" | "WATCHED";
    userRating?: number | null;
    review?: string | null;
    watchedDate?: string | null;
    platform?: string | null;
    ballKnowledge?: number | null;
    difference?: number | null;
  } | null;
  onUpdate?: () => void;
}

export default function SeriesCard({
  series,
  userSeries,
  onUpdate,
}: SeriesCardProps) {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const isWatchlist = userSeries?.status === "WATCHLIST";
  const isWatched = userSeries?.status === "WATCHED";

  const handleToggleWatchlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUpdating(true);

    try {
      if (isWatchlist) {
        await fetch(`/api/user-series?seriesId=${series.id}`, {
          method: "DELETE",
        });
      } else {
        await fetch("/api/user-series", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            tmdbId: series.tmdbId,
            status: "WATCHLIST",
          }),
        });
      }
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleOpenReview = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsReviewModalOpen(true);
  };

  const currentPlatform =
    userSeries?.platform ||
    (series.streamingPlatforms && series.streamingPlatforms.length > 0
      ? series.streamingPlatforms[0]
      : null);

  const yearDisplay = series.firstAirYear
    ? series.lastAirYear && series.lastAirYear !== series.firstAirYear
      ? `${series.firstAirYear} - ${series.lastAirYear}`
      : `${series.firstAirYear}`
    : null;

  return (
    <>
      <div className="group relative glass-card rounded-2xl overflow-hidden flex flex-col bg-cine-900/60 border border-cine-800 hover:border-purple-500/40 transition-all duration-300">
        {/* Póster con enlace */}
        <Link
          href={`/series/${series.tmdbId}`}
          className="relative aspect-[2/3] w-full overflow-hidden bg-cine-950 block"
        >
          <MoviePoster
            src={series.posterPath}
            alt={series.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          />

          {/* Gradiente superior/inferior para legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-t from-cine-950 via-transparent to-black/50 opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Badge Serie + Nota IMDb */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 flex-wrap">
            <span className="flex items-center gap-1 bg-purple-950/80 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold text-purple-300 border border-purple-500/30 shadow">
              <Tv className="w-3 h-3" /> SERIE
            </span>
            {series.imdbRating && (
              <a
                href={getImdbUrl(series.imdbId, series.name)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 bg-black/80 hover:bg-[#f5c518] hover:text-black transition-all backdrop-blur-md px-2 py-0.5 rounded-lg text-xs font-semibold text-amber-400 border border-amber-500/20 hover:border-amber-400 shadow group/imdb cursor-pointer"
                title={`Ver en IMDb (Nota: ${series.imdbRating.toFixed(1)} / 10)`}
              >
                <Star className="w-3 h-3 fill-amber-400 group-hover/imdb:fill-black group-hover/imdb:text-black transition-colors" />
                <span>{series.imdbRating.toFixed(1)}</span>
                <ExternalLink className="w-2.5 h-2.5 opacity-60 group-hover/imdb:opacity-100" />
              </a>
            )}
          </div>

          {/* Badge Temporadas */}
          {series.numberOfSeasons && (
            <div className="absolute top-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold text-cine-300 border border-cine-700 shadow">
              {series.numberOfSeasons}T
            </div>
          )}

          {/* Calificación, Ball Knowledge o Badge Visto si está vista */}
          {isWatched && (
            <div className="absolute bottom-2.5 left-2.5">
              {userSeries?.userRating !== undefined &&
              userSeries.userRating !== null ? (
                <div
                  className="flex items-center gap-1 bg-purple-600/90 text-white px-2 py-0.5 rounded-lg text-xs font-bold shadow cursor-help"
                  title={`Tu valoración: ${userSeries.userRating.toFixed(1)} / 10`}
                >
                  <Star className="w-3 h-3 fill-white text-white" />
                  <span>{userSeries.userRating.toFixed(1)}</span>
                </div>
              ) : userSeries?.ballKnowledge !== undefined &&
                userSeries.ballKnowledge !== null ? (
                <BallKnowledgeBadge
                  score={userSeries.ballKnowledge}
                  difference={userSeries.difference}
                  size="sm"
                />
              ) : (
                <div
                  className="flex items-center gap-1 bg-cine-950/80 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded-lg text-[10px] font-bold shadow backdrop-blur-md"
                  title="Serie en tu historial (sin nota)"
                >
                  <span>📼 Vista</span>
                </div>
              )}
            </div>
          )}

          {/* Acciones rápidas overlay */}
          <div className="absolute top-12 right-2.5 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <a
              href={getImdbUrl(series.imdbId, series.name)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-2 rounded-xl backdrop-blur-md border border-amber-500/40 bg-black/85 hover:bg-[#f5c518] text-[#f5c518] hover:text-black shadow transition-all flex items-center justify-center font-black text-[10px] tracking-tight gap-0.5"
              title="Abrir ficha oficial en IMDb"
            >
              <span>IMDb</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>

            <button
              onClick={handleToggleWatchlist}
              disabled={isUpdating}
              className={`p-2 rounded-xl backdrop-blur-md border shadow transition-all ${
                isWatchlist
                  ? "bg-sky-500 text-cine-950 border-sky-400 font-bold shadow-[0_0_12px_rgba(14,165,233,0.4)]"
                  : "bg-cine-900/90 text-cine-300 hover:text-white border-cine-700 hover:bg-cine-800"
              }`}
              title={
                isWatchlist
                  ? "Quitar de mi Watchlist"
                  : "Añadir serie a Watchlist"
              }
            >
              <Bookmark
                className={`w-3.5 h-3.5 ${isWatchlist ? "fill-cine-950" : ""}`}
              />
            </button>

            <button
              onClick={handleOpenReview}
              className={`p-2 rounded-xl backdrop-blur-md border shadow transition-all ${
                isWatched
                  ? "bg-emerald-500 text-cine-950 border-emerald-400"
                  : "bg-cine-900/90 text-cine-300 hover:text-white border-cine-700 hover:bg-cine-800"
              }`}
              title={isWatched ? "Modificar reseña" : "Marcar serie como vista"}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </Link>

        {/* Info inferior */}
        <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
          <div>
            <Link
              href={`/series/${series.tmdbId}`}
              className="font-bold text-xs sm:text-sm text-white group-hover:text-purple-300 transition-colors line-clamp-1"
              title={series.name}
            >
              {series.name}
            </Link>
            {series.originalName && series.originalName !== series.name && (
              <p className="text-[11px] text-cine-400 italic line-clamp-1">
                {series.originalName}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-cine-800/80 text-[11px] text-cine-400">
            <span>{yearDisplay || "Serie TV"}</span>
            {currentPlatform && (
              <StreamingBadge platform={currentPlatform} size="sm" />
            )}
          </div>
        </div>
      </div>

      {/* Modal de Reseña de Serie */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSaved={() => {
          if (onUpdate) onUpdate();
        }}
        movie={{
          tmdbId: series.tmdbId,
          title: series.name,
          year: series.firstAirYear,
          posterPath: series.posterPath,
          imdbRating: series.imdbRating,
          streamingPlatforms: series.streamingPlatforms,
        }}
        initialRating={userSeries?.userRating}
        initialReview={userSeries?.review}
        initialDate={userSeries?.watchedDate}
        initialPlatform={userSeries?.platform}
        apiEndpoint="/api/user-series"
        mediaLabel="serie"
      />
    </>
  );
}
