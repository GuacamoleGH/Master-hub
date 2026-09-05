import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import {
  Film,
  Tv,
  Gamepad2,
  Sparkles,
  ArrowRight,
  Clock,
  CheckCircle2,
  Layers,
  Database,
  ShieldCheck,
  PlusCircle,
  Trophy,
  Crown,
  MessageSquare,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MasterHubPage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  // Estadísticas rápidas de Cine & Series
  let movieCount = 0;
  let seriesCount = 0;
  let movieWatchedCount = 0;
  let seriesWatchedCount = 0;
  let avgBallKnowledge: number | null = null;

  try {
    movieCount = await prisma.movie.count();
    seriesCount = await prisma.series.count();

    const watched = userId
      ? await prisma.userMovie.findMany({
          where: { userId, status: "WATCHED" },
          select: { ballKnowledge: true },
        })
      : [];
    const watchedSeries = userId
      ? await prisma.userSeries.findMany({
          where: { userId, status: "WATCHED" },
          select: { ballKnowledge: true },
        })
      : [];

    movieWatchedCount = watched.length;
    seriesWatchedCount = watchedSeries.length;
    const allWithBk = [...watched, ...watchedSeries].filter(
      (w) => typeof w.ballKnowledge === "number",
    );
    if (allWithBk.length > 0) {
      avgBallKnowledge = Number(
        (
          allWithBk.reduce((acc, c) => acc + (c.ballKnowledge || 0), 0) /
          allWithBk.length
        ).toFixed(1),
      );
    }
  } catch {}

  // Estadísticas rápidas de Videojuegos
  let gameCount = 0;
  let totalHours = 0;
  let completedGamesCount = 0;
  let avgGameKnowledge: number | null = null;

  try {
    gameCount = await prisma.game.count();
    const userGames = userId
      ? await prisma.userGame.findMany({
          where: { userId },
          select: { status: true, hoursPlayed: true, gameKnowledge: true },
        })
      : [];

    for (const ug of userGames) {
      if (ug.hoursPlayed) totalHours += ug.hoursPlayed;
      if (ug.status === "COMPLETED" || ug.status === "PLATINUM")
        completedGamesCount++;
    }
    const withGk = userGames.filter(
      (ug) => typeof ug.gameKnowledge === "number",
    );
    if (withGk.length > 0) {
      avgGameKnowledge = Number(
        (
          withGk.reduce((acc, c) => acc + (c.gameKnowledge || 0), 0) /
          withGk.length
        ).toFixed(1),
      );
    }
  } catch {}

  // Estadísticas globales de reseñas comunitarias
  let reviewCount = 0;
  try {
    const movieReviews = await prisma.userMovie.count({
      where: {
        OR: [{ review: { not: null } }, { userRating: { not: null } }],
      },
    });
    const gameReviews = await prisma.userGame.count({
      where: {
        OR: [{ review: { not: null } }, { userRating: { not: null } }],
      },
    });
    reviewCount = movieReviews + gameReviews;
  } catch {}

  return (
    <div className="min-h-[75vh] flex flex-col justify-center space-y-12 pb-16 pt-4 animate-fade-in">
      {/* Cabecera del Centro de Mando */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cine-900 border border-cine-700/80 text-xs font-mono text-cine-300 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Centro de Mando Personal</span>
          <span className="text-cine-600">•</span>
          <span className="text-cine-400">v2.0 Multi-Universo</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Elige tu universo de{" "}
          <span className="bg-gradient-to-r from-amber-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            entretenimiento
          </span>
        </h1>

        <p className="text-sm sm:text-base text-cine-400 max-w-xl mx-auto">
          Gestiona tus colecciones, registra críticas personales y mide tu
          criterio frente al canon oficial con los motores de precisión
          cultural.
        </p>
      </div>

      {/* Banners Comunitarios: Ranking y Reseñas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto w-full">
        {/* Banner 1: Salón de la Fama / Leaderboard */}
        <Link
          href="/leaderboard"
          className="group relative overflow-hidden rounded-3xl border border-amber-500/30 hover:border-amber-400/60 bg-gradient-to-br from-amber-500/10 via-cine-900/90 to-purple-500/10 p-5 sm:p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_0_30px_rgba(245,158,11,0.2)]"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0 group-hover:scale-105 transition-transform shadow-gold-glow">
              <Trophy className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-amber-400" />
                  Salón de la Fama
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Ranking
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors mt-1">
                Podio de Cinéfilos & Gamers
              </h3>
              <p className="text-xs text-cine-300 mt-1">
                Compara tu Sofa Knowledge y Game Knowledge frente a los mejores
                de la comunidad.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-amber-500/20">
            <span className="text-[11px] font-mono text-amber-400/80">
              Top usuarios & puntuaciones
            </span>
            <div className="flex items-center gap-1.5 text-xs font-black text-amber-400 bg-amber-500/10 group-hover:bg-amber-500 group-hover:text-slate-950 px-3 py-1.5 rounded-xl border border-amber-500/30 transition-all shrink-0">
              <span>Ver Ranking</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Banner 2: Reseñas de la Comunidad */}
        <Link
          href="/reviews"
          className="group relative overflow-hidden rounded-3xl border border-pink-500/30 hover:border-pink-400/60 bg-gradient-to-br from-pink-500/10 via-cine-900/90 to-purple-500/10 p-5 sm:p-6 flex flex-col justify-between gap-4 transition-all duration-300 hover:-translate-y-1 shadow-xl hover:shadow-[0_0_30px_rgba(236,72,153,0.2)]"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-pink-400 shrink-0 group-hover:scale-105 transition-transform shadow-[0_0_15px_rgba(236,72,153,0.3)]">
              <MessageSquare className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-pink-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-pink-400" />
                  Muro Comunitario
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  Nuevo v3.4
                </span>
              </div>
              <h3 className="text-lg font-black text-white group-hover:text-pink-300 transition-colors mt-1">
                Reseñas & Hot Takes
              </h3>
              <p className="text-xs text-cine-300 mt-1">
                Descubre qué opina la gente. Filtra por más recientes, obras
                maestras (10★) o discrepancias.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-pink-500/20">
            <span className="text-[11px] font-mono text-pink-400/80">
              {reviewCount > 0
                ? `${reviewCount} opiniones registradas`
                : "Cine & Videojuegos"}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-black text-pink-400 bg-pink-500/10 group-hover:bg-pink-500 group-hover:text-slate-950 px-3 py-1.5 rounded-xl border border-pink-500/30 transition-all shrink-0">
              <span>Explorar Reseñas</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </Link>
      </div>

      {/* Grid de Universos Activos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
        {/* Tarjeta 1: Cinephile Hub */}
        <div className="group relative rounded-3xl overflow-hidden glass-panel border border-amber-500/20 hover:border-amber-500/60 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-2xl bg-gradient-to-br from-amber-500/10 via-cine-950 to-cine-950">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-all duration-500" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-2xl shadow-gold-glow">
                <Film className="w-7 h-7 text-amber-400" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-300 border border-amber-500/30">
                Cine & Series
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-amber-300 transition-colors">
                Cinephile<span className="text-amber-400">Hub</span>
              </h2>
              <p className="text-sm text-cine-300 mt-2 leading-relaxed">
                Tu Letterboxd cinematográfico. Registra películas, escribe
                reseñas, sigue plataformas de streaming (con opción 🏴‍☠️ Pirata) y
                calcula tu precisión frente a IMDb con el índice{" "}
                <strong>Sofa Knowledge</strong>.
              </p>
            </div>

            {/* Métricas rápidas */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-cine-800/80">
              <div className="bg-cine-900/60 p-3 rounded-xl border border-cine-800 text-center">
                <div className="text-[10px] uppercase font-bold text-cine-400">
                  Pelis vistas
                </div>
                <div className="text-lg font-mono font-black text-amber-400 mt-0.5">
                  {movieWatchedCount}
                </div>
              </div>

              <div className="bg-cine-900/60 p-3 rounded-xl border border-cine-800 text-center">
                <div className="text-[10px] uppercase font-bold text-cine-400">
                  Series vistas
                </div>
                <div className="text-lg font-mono font-black text-purple-400 mt-0.5">
                  {seriesWatchedCount}
                </div>
              </div>

              <div className="bg-cine-900/60 p-3 rounded-xl border border-cine-800 text-center">
                <div className="text-[10px] uppercase font-bold text-cine-400">
                  Sofa Knowledge
                </div>
                <div className="text-lg font-mono font-black text-emerald-400 mt-0.5">
                  {avgBallKnowledge ? `${avgBallKnowledge}%` : "—"}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-cine-800/80 grid grid-cols-2 gap-3">
            <Link
              href="/movies"
              className="py-3 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-cine-950 font-black text-xs sm:text-sm transition-all shadow-gold-glow flex items-center justify-center gap-1.5"
            >
              <Film className="w-4 h-4" />
              <span>Películas</span>
            </Link>
            <Link
              href="/series"
              className="py-3 px-4 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs sm:text-sm transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center gap-1.5"
            >
              <Tv className="w-4 h-4" />
              <span>Series</span>
            </Link>
          </div>
        </div>

        {/* Tarjeta 2: Gamer Hub */}
        <div className="group relative rounded-3xl overflow-hidden glass-panel border border-purple-500/30 hover:border-purple-500/70 p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-2xl bg-gradient-to-br from-purple-500/10 via-cine-950 to-cine-950">
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-500/20 transition-all duration-500" />

          <div className="relative z-10 space-y-6">
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-2xl shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Gamepad2 className="w-7 h-7 text-purple-400" />
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Videojuegos
              </span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight group-hover:text-purple-300 transition-colors">
                Gamer<span className="text-purple-400">Hub</span>
              </h2>
              <p className="text-sm text-cine-300 mt-2 leading-relaxed">
                Tu Letterboxd de videojuegos. Registra horas jugadas, gestiona
                tu backlog, descubre trailers y capturas, y compara tu criterio
                frente a Metacritic con <strong>Game Knowledge</strong> y tus{" "}
                <strong>Hot Takes</strong>.
              </p>
            </div>

            {/* Métricas rápidas */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-cine-800/80">
              <div className="bg-cine-900/60 p-3 rounded-xl border border-cine-800 text-center">
                <div className="text-[10px] uppercase font-bold text-cine-400">
                  Horas
                </div>
                <div className="text-lg font-mono font-black text-cyan-400 mt-0.5">
                  {Math.round(totalHours)}h
                </div>
              </div>

              <div className="bg-cine-900/60 p-3 rounded-xl border border-cine-800 text-center">
                <div className="text-[10px] uppercase font-bold text-cine-400">
                  Completados
                </div>
                <div className="text-lg font-mono font-black text-purple-400 mt-0.5">
                  {completedGamesCount}
                </div>
              </div>

              <div className="bg-cine-900/60 p-3 rounded-xl border border-cine-800 text-center">
                <div className="text-[10px] uppercase font-bold text-cine-400">
                  Game Knowledge
                </div>
                <div className="text-lg font-mono font-black text-cyan-300 mt-0.5">
                  {avgGameKnowledge ? `${avgGameKnowledge}%` : "—"}
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 pt-6 mt-6 border-t border-cine-800/80">
            <Link
              href="/games"
              className="w-full py-3.5 px-6 rounded-2xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2 group-hover:gap-3"
            >
              <span>Entrar a Gamer Hub</span>
              <ArrowRight className="w-4 h-4 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {/* Módulo Futuro / Próximamente (Espacio reservado) */}
      <div className="max-w-5xl mx-auto w-full">
        <div className="rounded-3xl border-2 border-dashed border-cine-800/90 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cine-950/40 text-center sm:text-left">
          <div className="flex items-center gap-4 justify-center sm:justify-start">
            <div className="w-12 h-12 rounded-2xl bg-cine-900 border border-cine-800 flex items-center justify-center text-cine-500">
              <PlusCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">
                Próximos Universos (En desarrollo)
              </h3>
              <p className="text-xs text-cine-400">
                Arquitectura modular preparada para incorporar Anime, Libros o
                Música cuando lo decidas.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-end gap-3 text-xs font-mono text-cine-500">
            <span className="px-2.5 py-1 rounded-lg bg-cine-900 border border-cine-800">
              100% Escalable
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-cine-900 border border-cine-800">
              Supabase DB
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
