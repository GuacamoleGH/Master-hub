import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { calculateGamerLevelAndRank } from "@/lib/gameKnowledge";
import GameCard from "@/components/games/GameCard";
import GamerLevelBar from "@/components/games/GamerLevelBar";
import {
  Gamepad2,
  Bookmark,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Compass,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function GamerHomePage() {
  // 1. Obtener perfil gamer
  let profile = await prisma.gamerProfile.findUnique({
    where: { id: "gamer-default" },
  });

  if (!profile) {
    profile = {
      id: "gamer-default",
      displayName: "Jose",
      avatarUrl: null,
      bio: "Explorador y analista de videojuegos.",
      totalXp: 0,
      updatedAt: new Date(),
    };
  }

  const levelInfo = calculateGamerLevelAndRank(profile.totalXp);

  // 2. Obtener backlog
  const backlogRecords = await prisma.userGame.findMany({
    where: { status: "BACKLOG" },
    include: { game: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  // 3. Obtener completados
  const completedRecords = await prisma.userGame.findMany({
    where: { status: { in: ["COMPLETED", "PLATINUM"] } },
    include: { game: true },
    orderBy: { completedDate: "desc" },
    take: 6,
  });

  // 4. Jugando actualmente
  const playingRecords = await prisma.userGame.findMany({
    where: { status: "PLAYING" },
    include: { game: true },
    take: 4,
  });

  // 5. Estadísticas de resumen
  const allUserGames = await prisma.userGame.findMany({
    include: { game: true },
  });

  let totalHours = 0;
  let totalCompleted = 0;
  const withGk = allUserGames.filter(
    (ug) => typeof ug.gameKnowledge === "number",
  );
  const avgGk =
    withGk.length > 0
      ? (
          withGk.reduce((acc, c) => acc + (c.gameKnowledge || 0), 0) /
          withGk.length
        ).toFixed(1)
      : null;

  for (const ug of allUserGames) {
    if (ug.hoursPlayed) totalHours += ug.hoursPlayed;
    if (ug.status === "COMPLETED" || ug.status === "PLATINUM") totalCompleted++;
  }

  // 6. Catálogo general para explorar
  const exploreGames = await prisma.game.findMany({
    take: 6,
    orderBy: { createdAt: "desc" },
    include: { userGame: true },
  });

  return (
    <div className="space-y-12 pb-16 animate-fade-in">
      {/* Hero Banner Gamer */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/30 p-6 sm:p-10 bg-gradient-to-br from-purple-950/40 via-cine-950 to-cine-900 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-3.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/40 text-purple-300 text-xs font-semibold font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Gamer Hub • Letterboxd para Videojuegos</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Bienvenido,{" "}
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {profile.displayName}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-cine-300 leading-relaxed">
              Registra tus aventuras virtuales, acumula horas de juego, analiza
              tus discrepancias frente a Metacritic con el índice{" "}
              <strong className="text-purple-300">Game Knowledge</strong> y
              descubre tus <strong className="text-cyan-300">Hot Takes</strong>.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/games/completed"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(139,92,246,0.4)] text-sm transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Completados (
                {totalCompleted})
              </Link>
              <Link
                href="/games/backlog"
                className="px-5 py-2.5 glass-card hover:bg-purple-950/40 text-white font-semibold rounded-xl border border-purple-500/30 text-sm transition-all flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-cyan-400" /> Backlog (
                {backlogRecords.length})
              </Link>
            </div>
          </div>

          {/* Tarjeta de Nivel Gamer */}
          <div className="w-full md:w-auto md:min-w-[320px]">
            <GamerLevelBar totalXp={profile.totalXp} />
          </div>
        </div>
      </section>

      {/* Métricas Destacadas */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Clock className="w-4 h-4 text-cyan-400" /> Horas Jugadas
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {Math.round(totalHours)}
            <span className="text-xs text-cine-500 font-normal"> h</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Registradas en tu diario
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Award className="w-4 h-4 text-purple-400" /> Completados
          </div>
          <div className="text-2xl font-black text-purple-300 font-mono">
            {totalCompleted}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Campañas finalizadas
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <span className="text-sm">🧠</span> Game Knowledge
          </div>
          <div className="text-2xl font-black text-cyan-400 font-mono">
            {avgGk ? `${avgGk}%` : "—"}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Afinidad con Metacritic
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <TrendingUp className="w-4 h-4 text-purple-400" /> Experiencia Gamer
          </div>
          <div className="text-2xl font-black text-purple-400 font-mono">
            {profile.totalXp}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            {levelInfo.xpProgressPercent}% hacia Lvl. {levelInfo.level + 1}
          </div>
        </div>
      </section>

      {/* Jugando Actualmente (Si hay títulos activos) */}
      {playingRecords.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-cyan-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Jugando Actualmente
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {playingRecords.map((item) => {
              let platforms: string[] = [];
              try {
                platforms = JSON.parse(item.game.platforms);
              } catch {}
              return (
                <GameCard
                  key={item.id}
                  game={{
                    id: item.game.id,
                    rawgId: item.game.rawgId,
                    title: item.game.title,
                    released: item.game.released,
                    backgroundImage: item.game.backgroundImage,
                    metacritic: item.game.metacritic,
                    platforms,
                  }}
                  userGame={{
                    status: "PLAYING",
                    hoursPlayed: item.hoursPlayed,
                    platform: item.platform,
                  }}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Últimos Juegos Completados */}
      {completedRecords.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Últimos Juegos Completados
              </h2>
            </div>
            <Link
              href="/games/completed"
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 group"
            >
              Ver todos ({totalCompleted}){" "}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {completedRecords.map((item) => {
              let platforms: string[] = [];
              try {
                platforms = JSON.parse(item.game.platforms);
              } catch {}
              return (
                <GameCard
                  key={item.id}
                  game={{
                    id: item.game.id,
                    rawgId: item.game.rawgId,
                    title: item.game.title,
                    released: item.game.released,
                    backgroundImage: item.game.backgroundImage,
                    metacritic: item.game.metacritic,
                    platforms,
                  }}
                  userGame={{
                    status: item.status as any,
                    userRating: item.userRating,
                    hoursPlayed: item.hoursPlayed,
                    platform: item.platform,
                    review: item.review,
                    gameKnowledge: item.gameKnowledge,
                    difference: item.difference,
                  }}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Mi Backlog */}
      {backlogRecords.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-cyan-400" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Mi Backlog (Pendientes)
              </h2>
            </div>
            <Link
              href="/games/backlog"
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 group"
            >
              Ver todos ({backlogRecords.length}){" "}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {backlogRecords.map((item) => {
              let platforms: string[] = [];
              try {
                platforms = JSON.parse(item.game.platforms);
              } catch {}
              return (
                <GameCard
                  key={item.id}
                  game={{
                    id: item.game.id,
                    rawgId: item.game.rawgId,
                    title: item.game.title,
                    released: item.game.released,
                    backgroundImage: item.game.backgroundImage,
                    metacritic: item.game.metacritic,
                    platforms,
                  }}
                  userGame={{
                    status: "BACKLOG",
                    platform: item.platform,
                  }}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Continuar Explorando Videojuegos */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-purple-400" />
          <h2 className="text-xl font-bold text-white tracking-wide">
            Continuar Explorando
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {exploreGames.map((game) => {
            let platforms: string[] = [];
            try {
              platforms = JSON.parse(game.platforms);
            } catch {}
            return (
              <GameCard
                key={game.id}
                game={{
                  id: game.id,
                  rawgId: game.rawgId,
                  title: game.title,
                  released: game.released,
                  backgroundImage: game.backgroundImage,
                  metacritic: game.metacritic,
                  platforms,
                }}
                userGame={
                  game.userGame
                    ? {
                        status: game.userGame.status as any,
                        userRating: game.userGame.userRating,
                        hoursPlayed: game.userGame.hoursPlayed,
                        platform: game.userGame.platform,
                        review: game.userGame.review,
                        gameKnowledge: game.userGame.gameKnowledge,
                        difference: game.userGame.difference,
                      }
                    : null
                }
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
