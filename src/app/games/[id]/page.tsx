"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Gamepad2,
  Calendar,
  Bookmark,
  CheckCircle2,
  Edit3,
  Loader2,
  ArrowLeft,
  Clock,
  Star,
  Sparkles,
  Building,
  Tv,
  Play,
  Layers,
} from "lucide-react";
import { GameDetail } from "@/types/game";
import GameKnowledgeBadge from "@/components/games/GameKnowledgeBadge";
import GameReviewModal from "@/components/games/GameReviewModal";
import GamePoster from '@/components/games/GamePoster';
import PlatformBadge from '@/components/games/PlatformBadge';

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;

  const [game, setGame] = useState<GameDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [isUpdatingBacklog, setIsUpdatingBacklog] = useState(false);

  const fetchGame = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/games/${gameId}`);
      if (res.ok) {
        const data = await res.json();
        setGame(data.game);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (gameId) {
      fetchGame();
    }
  }, [gameId]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        <p className="text-sm text-cine-400 font-medium font-mono">
          Cargando base de datos gamer...
        </p>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
        <Gamepad2 className="w-12 h-12 text-cine-600" />
        <h2 className="text-xl font-bold text-white">
          Videojuego no encontrado
        </h2>
        <button
          onClick={() => router.back()}
          className="px-4 py-2 bg-cine-800 hover:bg-cine-700 text-sm rounded-xl transition-colors"
        >
          Volver atrás
        </button>
      </div>
    );
  }

  const isBacklog = game.userGame?.status === "BACKLOG";
  const isFinished =
    game.userGame?.status === "COMPLETED" ||
    game.userGame?.status === "PLATINUM";

  const handleToggleBacklog = async () => {
    setIsUpdatingBacklog(true);
    try {
      if (isBacklog) {
        await fetch(`/api/user-games?gameId=${game.id}`, { method: "DELETE" });
      } else {
        await fetch("/api/user-games", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            rawgId: game.rawgId,
            status: "BACKLOG",
            platform: game.platforms?.[0] || "PC",
          }),
        });
      }
      await fetchGame();
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdatingBacklog(false);
    }
  };

  const criticScore = game.metacritic
    ? (game.metacritic / 10).toFixed(1)
    : null;

  return (
    <div className="space-y-10 pb-16 animate-fade-in">
      {/* Botón Volver */}
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 text-xs font-semibold text-cine-400 hover:text-purple-300 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver al catálogo gamer
      </button>

      {/* Hero Inmersivo con Imagen Panorámica */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/30 shadow-2xl bg-cine-950">
        {game.backgroundImage && (
          <div className="absolute inset-0 z-0">
            <img
              src={game.backgroundImage}
              alt={game.title}
              className="w-full h-full object-cover object-center opacity-30 filter blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-cine-950 via-cine-950/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-cine-950 via-cine-950/70 to-transparent" />
          </div>
        )}

        <div className="relative z-10 p-6 sm:p-10 flex flex-col md:flex-row gap-8 items-start">
          {/* Carátula */}
          <div className="w-48 sm:w-60 flex-shrink-0 aspect-[16/10] sm:aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-purple-500/30 bg-cine-900">
            <GamePoster
              src={game.backgroundImage}
              alt={game.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Datos y Ficha */}
          <div className="flex-1 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {game.metacritic && (
                  <span className="px-2.5 py-0.5 rounded-lg text-xs font-mono font-black bg-purple-600 text-white border border-purple-400 shadow">
                    Metacritic {game.metacritic}
                  </span>
                )}
                {criticScore && (
                  <span className="text-xs text-cine-400 font-mono">
                    (Crítica:{" "}
                    <strong className="text-cyan-300">{criticScore}/10</strong>)
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {game.title}
              </h1>

              {game.developers && game.developers.length > 0 && (
                <p className="text-sm text-purple-300 mt-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-purple-400" />
                  {game.developers.join(", ")}
                </p>
              )}
            </div>

            {/* Metadatos Rápidos */}
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-cine-300">
              {game.released && (
                <div className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-4 h-4 text-cine-500" />
                  <span>{game.released}</span>
                </div>
              )}

              {game.userGame?.hoursPlayed && (
                <div className="flex items-center gap-1.5 font-mono text-cyan-300 font-bold bg-cyan-950/40 px-2.5 py-1 rounded-xl border border-cyan-500/30">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>{game.userGame.hoursPlayed}h jugadas</span>
                </div>
              )}
            </div>

            {/* Plataformas */}
            {game.platforms && game.platforms.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-cine-400 block">
                  Plataformas disponibles:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {game.platforms.map((plat) => (
                    <span
                      key={plat}
                      className="px-2.5 py-1 rounded-lg text-xs font-mono font-medium bg-cine-900 border border-cine-700/80 text-cine-300"
                    >
                      {plat}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Géneros */}
            {game.genres && game.genres.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {game.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 rounded-lg text-xs font-semibold bg-purple-950/40 border border-purple-500/30 text-purple-300"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            )}

            {/* Botones de Acción */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={handleToggleBacklog}
                disabled={isUpdatingBacklog}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                  isBacklog
                    ? "bg-cyan-500 text-cine-950 font-bold shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                    : "glass-card border border-purple-500/30 text-cine-200 hover:text-white hover:bg-purple-950/40"
                }`}
              >
                <Bookmark
                  className={`w-4 h-4 ${isBacklog ? "fill-cine-950" : "text-cyan-400"}`}
                />
                {isBacklog ? "En tu Backlog" : "+ Añadir a Backlog"}
              </button>

              <button
                onClick={() => setIsReviewOpen(true)}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${
                  isFinished
                    ? "bg-purple-600 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)]"
                    : "bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                {game.userGame
                  ? "Modificar veredicto gamer"
                  : "Registrar partida"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección: Tu Veredicto Gamer (Si está registrado) */}
      {game.userGame && (
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-950/30 via-cine-900 to-cine-950 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-cine-800 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Tu Veredicto Gamer
              </h2>
            </div>
            <button
              onClick={() => setIsReviewOpen(true)}
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-cine-800/80 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" /> Modificar datos
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 pt-2">
            {/* Mi Calificación */}
            <div className="space-y-1">
              <span className="text-xs text-cine-400 font-medium">
                Tu Puntuación
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-purple-400 font-mono">
                  {game.userGame.userRating?.toFixed(1) ?? "—"}
                </span>
                <span className="text-sm text-cine-500 font-mono">/ 10</span>
                {criticScore && (
                  <span className="text-xs text-cine-400 ml-1">
                    (MC: <strong className="text-white">{criticScore}</strong>)
                  </span>
                )}
              </div>
              {game.userGame.difference !== null &&
                game.userGame.difference !== undefined && (
                  <div className="text-xs text-cine-400 font-mono">
                    Diferencia:{" "}
                    <strong
                      className={
                        Math.abs(game.userGame.difference) <= 0.3
                          ? "text-cyan-400"
                          : game.userGame.difference > 0
                            ? "text-emerald-400"
                            : "text-rose-400"
                      }
                    >
                      {game.userGame.difference > 0
                        ? `+${game.userGame.difference}`
                        : game.userGame.difference}{" "}
                      pts
                    </strong>
                  </div>
                )}
            </div>

            {/* Game Knowledge */}
            <div className="space-y-2">
              <span className="text-xs text-cine-400 font-medium">
                Índice Game Knowledge
              </span>
              <div>
                <GameKnowledgeBadge
                  score={game.userGame.gameKnowledge}
                  difference={game.userGame.difference}
                  size="lg"
                />
              </div>
            </div>

            {/* Horas Jugadas y Plataformas */}
            <div className="space-y-1">
              <span className="text-xs text-cine-400 font-medium">
                Tiempo & Plataformas
              </span>
              <div className="text-2xl font-black text-cyan-400 font-mono">
                {game.userGame.hoursPlayed
                  ? `${game.userGame.hoursPlayed} h`
                  : "No registrado"}
              </div>
              <div className="pt-1">
                {game.userGame.platform ? (
                  <PlatformBadge platform={game.userGame.platform} size="sm" />
                ) : (
                  <span className="text-[11px] text-cine-500 italic">Sin plataforma</span>
                )}
              </div>
            </div>

            {/* Estado */}
            <div className="space-y-1">
              <span className="text-xs text-cine-400 font-medium">Estado</span>
              <div className="pt-1">
                <span className="px-3 py-1 rounded-xl text-xs font-bold font-mono bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {game.userGame.status}
                </span>
              </div>
            </div>
          </div>

          {/* Reseña Completa */}
          {game.userGame.review && (
            <div className="pt-4 border-t border-cine-800/80">
              <span className="text-xs text-cine-400 font-medium block mb-1">
                Tu Crítica
              </span>
              <blockquote className="p-4 rounded-xl bg-cine-950/70 border border-purple-500/20 text-cine-200 text-sm italic leading-relaxed">
                &quot;{game.userGame.review}&quot;
              </blockquote>
            </div>
          )}
        </section>
      )}

      {/* Trailer de Vídeo (Si existe) */}
      {game.trailerUrl && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Play className="w-5 h-5 text-purple-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Trailer Oficial
            </h2>
          </div>
          <div className="rounded-3xl overflow-hidden glass-panel border border-purple-500/30 aspect-video max-w-4xl bg-black">
            <video
              src={game.trailerUrl}
              controls
              poster={game.backgroundImage || undefined}
              className="w-full h-full object-contain"
            />
          </div>
        </section>
      )}

      {/* Galería de Capturas (Screenshots) */}
      {game.screenshots && game.screenshots.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Tv className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Galería de Capturas
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {game.screenshots.slice(0, 6).map((imgUrl, idx) => (
              <div
                key={idx}
                className="aspect-video rounded-2xl overflow-hidden border border-white/10 glass-card group relative"
              >
                <img
                  src={imgUrl}
                  alt={`${game.title} screenshot ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Sinopsis / Descripción */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-wide border-b border-cine-800 pb-2">
          Sinopsis
        </h2>
        <div className="text-cine-300 text-sm sm:text-base leading-relaxed whitespace-pre-line max-w-4xl">
          {game.description ||
            "Sin descripción disponible para este videojuego."}
        </div>
      </section>

      {/* Modal de Registro Gamer */}
      <GameReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        onSaved={fetchGame}
        game={{
          rawgId: game.rawgId,
          title: game.title,
          released: game.released,
          backgroundImage: game.backgroundImage,
          metacritic: game.metacritic,
          platforms: game.platforms,
        }}
        initialStatus={game.userGame?.status || "COMPLETED"}
        initialRating={game.userGame?.userRating}
        initialHours={game.userGame?.hoursPlayed}
        initialPlatform={game.userGame?.platform}
        initialReview={game.userGame?.review}
      />
    </div>
  );
}
