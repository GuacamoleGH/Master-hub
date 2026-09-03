"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
import GameKnowledgeBadge from "./GameKnowledgeBadge";
import GameReviewModal from "./GameReviewModal";
import GamePoster from "./GamePoster";
import PlatformBadge from "./PlatformBadge";

interface GameCardProps {
  game: {
    id: string;
    rawgId: number;
    title: string;
    released?: string | null;
    backgroundImage?: string | null;
    metacritic?: number | null;
    genres?: string[];
    platforms?: string[];
  };
  userGame?: {
    status?: "BACKLOG" | "PLAYING" | "COMPLETED" | "PLATINUM" | "DROPPED";
    userRating?: number | null;
    hoursPlayed?: number | null;
    platform?: string | null;
    review?: string | null;
    gameKnowledge?: number | null;
    difference?: number | null;
  } | null;
  onUpdate?: () => void;
}

export default function GameCard({ game, userGame, onUpdate }: GameCardProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);

  const releaseYear = game.released ? game.released.split("-")[0] : null;

  const statusBadges = {
    BACKLOG: {
      label: "📥 Backlog",
      class: "bg-zinc-800 text-zinc-300 border-zinc-700",
    },
    PLAYING: {
      label: "🕹️ Jugando",
      class: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    },
    COMPLETED: {
      label: "🏆 Completado",
      class: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    },
    PLATINUM: {
      label: "👑 Platino",
      class: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    },
    DROPPED: {
      label: "💀 Dropped",
      class: "bg-rose-500/20 text-rose-300 border-rose-500/40",
    },
  };

  return (
    <>
      <div className="group relative flex flex-col rounded-2xl overflow-hidden glass-card border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-1 bg-cine-900/80 shadow-lg">
        {/* Carátula con GamePoster */}
        <Link
          href={`/games/${game.rawgId}`}
          className="block relative aspect-[16/10] overflow-hidden bg-cine-950"
        >
          <GamePoster
            src={game.backgroundImage}
            alt={game.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Gradiente oscuro inferior */}
          <div className="absolute inset-0 bg-gradient-to-t from-cine-950 via-transparent to-black/30" />

          {/* Badge de Estado */}
          {userGame?.status && statusBadges[userGame.status] && (
            <div className="absolute top-2.5 left-2.5">
              <span
                className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border backdrop-blur-md shadow ${
                  statusBadges[userGame.status].class
                }`}
              >
                {statusBadges[userGame.status].label}
              </span>
            </div>
          )}

          {/* Metacritic Badge */}
          {game.metacritic && (
            <div className="absolute top-2.5 right-2.5">
              <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono font-black bg-purple-600/90 text-white border border-purple-400 shadow-md">
                MC {game.metacritic}
              </span>
            </div>
          )}

          {/* Horas Jugadas */}
          {userGame?.hoursPlayed !== null &&
            userGame?.hoursPlayed !== undefined &&
            userGame.hoursPlayed > 0 && (
              <div className="absolute bottom-2.5 left-2.5">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[10px] font-mono font-bold bg-cine-950/80 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                  <Clock className="w-2.5 h-2.5 text-cyan-400" />
                  {userGame.hoursPlayed}h
                </span>
              </div>
            )}
        </Link>

        {/* Contenido inferior */}
        <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
          <div>
            <Link href={`/games/${game.rawgId}`}>
              <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 leading-snug">
                {game.title}
              </h3>
            </Link>

            <div className="flex items-center justify-between text-xs text-cine-400 mt-1">
              <span>{releaseYear || "—"}</span>
            </div>

            {/* Plataformas donde se jugó */}
            {userGame?.platform && (
              <div className="mt-1.5">
                <PlatformBadge platform={userGame.platform} size="xs" />
              </div>
            )}
          </div>

          {/* Mi Puntuación y Game Knowledge */}
          {userGame?.userRating !== null &&
          userGame?.userRating !== undefined ? (
            <div className="pt-2 border-t border-cine-800/80 flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-xs">
                <Star className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />
                <span className="font-mono font-bold text-white text-sm">
                  {userGame.userRating.toFixed(1)}
                </span>
              </div>

              <GameKnowledgeBadge
                score={userGame.gameKnowledge}
                difference={userGame.difference}
                size="sm"
              />
            </div>
          ) : (
            <div className="pt-2 border-t border-cine-800/80">
              <button
                onClick={() => setIsReviewOpen(true)}
                className="w-full py-1.5 text-[11px] font-semibold text-purple-300 hover:text-white bg-purple-950/30 hover:bg-purple-900/50 border border-purple-500/20 rounded-lg transition-colors text-center"
              >
                + Registrar Veredicto
              </button>
            </div>
          )}
        </div>
      </div>

      <GameReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSaved={() => {
          if (onUpdate) onUpdate();
        }}
        game={{
          rawgId: game.rawgId,
          title: game.title,
          released: game.released,
          backgroundImage: game.backgroundImage,
          metacritic: game.metacritic,
          platforms: game.platforms,
        }}
        initialStatus={userGame?.status || "COMPLETED"}
        initialRating={userGame?.userRating}
        initialHours={userGame?.hoursPlayed}
        initialPlatform={userGame?.platform}
        initialReview={userGame?.review}
      />
    </>
  );
}
