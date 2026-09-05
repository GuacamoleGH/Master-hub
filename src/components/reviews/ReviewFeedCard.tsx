"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  Film,
  Tv,
  Gamepad2,
  Clock,
  Heart,
  Quote,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { UnifiedReview } from "@/app/api/reviews/route";
import { sounds } from "@/lib/sounds";

interface ReviewFeedCardProps {
  review: UnifiedReview;
}

export default function ReviewFeedCard({ review }: ReviewFeedCardProps) {
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasLiked) {
      sounds.star(8);
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    } else {
      sounds.click();
      setLikes((prev) => Math.max(0, prev - 1));
      setHasLiked(false);
    }
  };

  const formattedDate = new Date(review.date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const mediaTypeConfig = {
    movie: {
      label: "Película",
      icon: Film,
      badgeBg: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      glowColor: "group-hover:border-amber-500/50",
    },
    series: {
      label: "Serie",
      icon: Tv,
      badgeBg: "bg-purple-500/15 text-purple-300 border-purple-500/30",
      glowColor: "group-hover:border-purple-500/50",
    },
    game: {
      label: "Videojuego",
      icon: Gamepad2,
      badgeBg: "bg-cyan-500/15 text-cyan-300 border-cyan-500/30",
      glowColor: "group-hover:border-cyan-500/50",
    },
  }[review.mediaType];

  const MediaIcon = mediaTypeConfig.icon;

  return (
    <div
      className={`group rounded-3xl border border-cine-800/80 bg-gradient-to-b from-cine-900/90 via-cine-950 to-cine-950 p-5 sm:p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 ${mediaTypeConfig.glowColor}`}
    >
      <div className="flex flex-col md:flex-row gap-5">
        {/* Lado izquierdo: Carátula de la obra con enlace */}
        <Link
          href={review.detailUrl}
          onClick={() => sounds.nav()}
          className="relative shrink-0 w-24 h-36 sm:w-28 sm:h-40 rounded-2xl overflow-hidden bg-cine-900 border border-white/10 shadow-lg group-hover:scale-105 transition-transform"
        >
          {review.poster ? (
            <img
              src={review.poster}
              alt={review.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-cine-600 bg-cine-900">
              <MediaIcon className="w-8 h-8" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-cine-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-2">
            <span className="text-[10px] text-white font-bold flex items-center gap-1">
              <span>Ver ficha</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* Lado derecho: Autor, Título, Nota y Texto de la crítica */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div>
            {/* Cabecera de la crítica: Datos del autor + Tipo de obra */}
            <div className="flex items-center justify-between gap-3 flex-wrap mb-2">
              <Link
                href={`/u/${review.author.username}`}
                onClick={() => sounds.click()}
                className="flex items-center gap-2.5 group/author hover:opacity-90 transition-opacity"
              >
                <div className="w-9 h-9 rounded-xl ring-2 ring-white/10 group-hover/author:ring-amber-400/60 overflow-hidden bg-cine-900 shrink-0 flex items-center justify-center">
                  {review.author.image ? (
                    <img
                      src={review.author.image}
                      alt={review.author.username}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-cine-800 text-white font-black text-xs flex items-center justify-center">
                      {(review.author.name ||
                        review.author.username)[0]?.toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-white group-hover/author:text-amber-400 transition-colors">
                      {review.author.name || review.author.username}
                    </span>
                    <span className="text-[11px] text-cine-400 font-mono">
                      @{review.author.username}
                    </span>
                  </div>
                  <span className="text-[10px] text-cine-400 font-medium flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                    <span>{review.author.rankTitle}</span>
                  </span>
                </div>
              </Link>

              <span
                className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border uppercase tracking-wider ${mediaTypeConfig.badgeBg}`}
              >
                <MediaIcon className="w-3 h-3" />
                <span>{mediaTypeConfig.label}</span>
              </span>
            </div>

            {/* Título de la película / juego y valoración */}
            <div className="flex items-center justify-between gap-3 mt-1 flex-wrap">
              <Link
                href={review.detailUrl}
                onClick={() => sounds.nav()}
                className="hover:underline"
              >
                <h3 className="text-base sm:text-lg font-black text-white group-hover:text-amber-300 transition-colors truncate max-w-sm sm:max-w-md">
                  {review.title}
                  {review.year && (
                    <span className="text-cine-400 font-normal text-xs ml-2 font-mono">
                      ({review.year})
                    </span>
                  )}
                </h3>
              </Link>

              {/* Nota dada por el usuario */}
              {review.userRating !== null && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-black text-sm shadow-sm">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>{review.userRating.toFixed(1)}</span>
                  <span className="text-cine-500 text-[10px] font-normal">
                    /10
                  </span>
                </div>
              )}
            </div>

            {/* Texto de la reseña */}
            <div className="mt-3 relative pl-3 border-l-2 border-amber-500/40 py-1">
              <p className="text-xs sm:text-sm text-cine-200 leading-relaxed italic line-clamp-4">
                &quot;{review.review}&quot;
              </p>
            </div>
          </div>

          {/* Pie de la tarjeta: Plataforma, horas jugadas, fecha y botón de like */}
          <div className="mt-4 pt-3 border-t border-cine-800/80 flex items-center justify-between gap-3 text-xs text-cine-400 flex-wrap">
            <div className="flex items-center gap-3">
              {review.platform && (
                <span className="px-2 py-0.5 rounded-lg bg-cine-900 border border-cine-800 text-[11px] font-semibold text-cine-300">
                  {review.platform}
                </span>
              )}
              {review.hoursPlayed && review.hoursPlayed > 0 && (
                <span className="flex items-center gap-1 text-cyan-400 font-mono text-[11px]">
                  <Clock className="w-3 h-3" />
                  <span>{Math.round(review.hoursPlayed)}h registradas</span>
                </span>
              )}
              {review.knowledgeScore && (
                <span className="text-[11px] font-mono text-emerald-400 font-bold">
                  {review.knowledgeScore}%{" "}
                  {review.knowledgeType === "sofa" ? "Sofa" : "Game"} Knowledge
                </span>
              )}
              <span className="text-cine-500">{formattedDate}</span>
            </div>

            {/* Botón interactivo de me gusta */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                hasLiked
                  ? "bg-rose-500/20 text-rose-400 border border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.3)]"
                  : "bg-white/5 hover:bg-white/10 text-cine-400 hover:text-rose-400 border border-white/5"
              }`}
            >
              <Heart
                className={`w-3.5 h-3.5 transition-transform ${
                  hasLiked ? "fill-rose-400 scale-110" : ""
                }`}
              />
              <span>{likes > 0 ? likes : "Útil"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
