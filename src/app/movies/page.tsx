import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { calculateLevelAndRank } from "@/lib/ballKnowledge";
import MovieCard from "@/components/MovieCard";
import BallKnowledgeBadge from "@/components/BallKnowledgeBadge";
import ExploreMoviesSection from "@/components/movies/ExploreMoviesSection";
import {
  Film,
  Bookmark,
  CheckCircle2,
  Star,
  Sparkles,
  TrendingUp,
  Compass,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function MoviesHomePage() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  // 1. Obtener perfil del usuario o invitado
  let profile = {
    id: "guest",
    displayName: "Invitado",
    avatarUrl: null as string | null,
    bio: "Inicia sesión para guardar tus valoraciones y calcular tu Sofa Knowledge.",
    totalXp: 0,
    updatedAt: new Date(),
  };

  if (userId) {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (user) {
      profile = {
        id: user.id,
        displayName: user.name || user.username || "Cinéfilo",
        avatarUrl: user.image,
        bio: user.bio || "Explorador cinematográfico",
        totalXp: user.totalXp,
        updatedAt: user.updatedAt,
      };
    }
  }

  const levelInfo = calculateLevelAndRank(profile.totalXp);

  // 2. Obtener películas de la Watchlist
  const watchlistRecords = userId
    ? await prisma.userMovie.findMany({
        where: { userId, status: "WATCHLIST" },
        include: { movie: true },
        orderBy: { createdAt: "desc" },
        take: 6,
      })
    : [];

  // 3. Obtener últimas películas vistas
  const watchedRecords = userId
    ? await prisma.userMovie.findMany({
        where: { userId, status: "WATCHED" },
        include: { movie: true },
        orderBy: { updatedAt: "desc" },
        take: 6,
      })
    : [];

  // 4. Catálogo general para continuar explorando
  let exploreMovies = await prisma.movie.findMany({
    where: userId
      ? {
          userMovies: {
            none: { userId },
          },
        }
      : {},
    orderBy: { imdbRating: "desc" },
    take: 12,
    include: {
      userMovies: userId ? { where: { userId } } : false,
    },
  });

  if (exploreMovies.length === 0) {
    exploreMovies = await prisma.movie.findMany({
      take: 12,
      orderBy: { imdbRating: "desc" },
      include: {
        userMovies: userId ? { where: { userId } } : false,
      },
    });
  }

  const formattedExploreMovies = exploreMovies.map((movie) => {
    let genres: string[] = [];
    let streamingPlatforms: string[] = [];
    try {
      genres = JSON.parse(movie.genres);
    } catch {}
    try {
      if (movie.streamingPlatforms)
        streamingPlatforms = JSON.parse(movie.streamingPlatforms);
    } catch {}

    const uMovie = (movie as any).userMovies?.[0] || null;

    return {
      id: movie.id,
      tmdbId: movie.tmdbId,
      title: movie.title,
      originalTitle: movie.originalTitle,
      year: movie.year,
      posterPath: movie.posterPath,
      imdbRating: movie.imdbRating,
      genres,
      streamingPlatforms,
      userMovie: uMovie
        ? {
            status: uMovie.status as any,
            userRating: uMovie.userRating,
            review: uMovie.review,
            ballKnowledge: uMovie.ballKnowledge,
            difference: uMovie.difference,
            platform: uMovie.platform,
          }
        : null,
    };
  });

  // 5. Estadísticas resumidas para la Home
  const allWatched = userId
    ? await prisma.userMovie.findMany({
        where: { userId, status: "WATCHED" },
        include: { movie: true },
      })
    : [];

  const totalWatched = allWatched.length;
  const rated = allWatched.filter((r) => typeof r.userRating === "number");
  const avgRating =
    rated.length > 0
      ? (
          rated.reduce((acc, c) => acc + (c.userRating || 0), 0) / rated.length
        ).toFixed(1)
      : null;

  const withBk = allWatched.filter((r) => typeof r.ballKnowledge === "number");
  const avgBk =
    withBk.length > 0
      ? (
          withBk.reduce((acc, c) => acc + (c.ballKnowledge || 0), 0) /
          withBk.length
        ).toFixed(1)
      : null;

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner Cinematográfico */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-amber-500/20 p-6 sm:p-10 bg-gradient-to-br from-cine-900 via-cine-950 to-cine-900 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bienvenido a tu cuartel cinematográfico</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Hola,{" "}
              <span className="text-amber-400">{profile.displayName}</span>
            </h1>
            <p className="text-sm sm:text-base text-cine-300 leading-relaxed">
              Registra cada película que ves, califícala con precisión
              quirúrgica y descubre tu nivel de coincidencia con el canon
              cinéfilo mediante el índice{" "}
              <strong className="text-amber-400">Sofa Knowledge</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/watched"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-cine-950 font-bold rounded-xl shadow-gold-glow text-sm transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Películas Vistas (
                {totalWatched})
              </Link>
              <Link
                href="/watchlist"
                className="px-5 py-2.5 glass-card hover:bg-cine-800 text-white font-semibold rounded-xl border border-cine-700 text-sm transition-all flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-amber-400" /> Watchlist (
                {watchlistRecords.length})
              </Link>
            </div>
          </div>

          {/* Tarjeta de Resumen Rápido Sofa Knowledge & Nivel */}
          <div className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col gap-4 min-w-[260px] bg-cine-900/90 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase font-bold text-cine-400 tracking-wider">
                Tu Criterio
              </span>
              <span className="text-xs font-bold text-amber-400">
                IMDb Benchmark
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl">
                {levelInfo.rankIcon}
              </div>
              <div>
                <div className="text-xs text-cine-400 font-medium">
                  Rango Cinéfilo
                </div>
                <div className="font-bold text-white text-base">
                  {levelInfo.rankTitle}{" "}
                  <span className="text-amber-400">Lvl.{levelInfo.level}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-cine-800 flex items-center justify-between">
              <div className="text-xs text-cine-400">Sofa Knowledge Global</div>
              {avgBk ? (
                <BallKnowledgeBadge
                  score={parseFloat(avgBk)}
                  size="sm"
                  showLabel={false}
                />
              ) : (
                <span className="text-xs text-cine-500">Sin datos</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mis Estadísticas Destacadas */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-cine-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Film className="w-4 h-4 text-amber-400" /> Películas Vistas
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {totalWatched}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Registradas en tu diario
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cine-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Nota
            Media
          </div>
          <div className="text-2xl font-black text-amber-400 font-mono">
            {avgRating ? `${avgRating}` : "—"}
            <span className="text-xs text-cine-500 font-normal"> / 10</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            En tus valoraciones
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cine-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <span className="text-sm">🛋️</span> Sofa Knowledge
          </div>
          <div className="text-2xl font-black text-emerald-400 font-mono">
            {avgBk ? `${avgBk}%` : "—"}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Precisión vs IMDb
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cine-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <TrendingUp className="w-4 h-4 text-sky-400" /> Experiencia XP
          </div>
          <div className="text-2xl font-black text-sky-400 font-mono">
            {profile.totalXp}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            {levelInfo.xpProgressPercent}% hacia Lvl. {levelInfo.level + 1}
          </div>
        </div>
      </section>

      {/* Sección: Últimas películas vistas */}
      {watchedRecords.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Últimas Películas Vistas
              </h2>
            </div>
            <Link
              href="/watched"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group"
            >
              Ver todas ({totalWatched}){" "}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchedRecords.map((item) => {
              let genres: string[] = [];
              let streamingPlatforms: string[] = [];
              try {
                genres = JSON.parse(item.movie.genres);
              } catch {}
              try {
                if (item.movie.streamingPlatforms)
                  streamingPlatforms = JSON.parse(
                    item.movie.streamingPlatforms,
                  );
              } catch {}

              return (
                <MovieCard
                  key={item.id}
                  movie={{
                    id: item.movie.id,
                    tmdbId: item.movie.tmdbId,
                    title: item.movie.title,
                    originalTitle: item.movie.originalTitle,
                    year: item.movie.year,
                    posterPath: item.movie.posterPath,
                    imdbRating: item.movie.imdbRating,
                    genres,
                    streamingPlatforms,
                  }}
                  userMovie={{
                    status: "WATCHED",
                    userRating: item.userRating,
                    review: item.review,
                    watchedDate: item.watchedDate
                      ? item.watchedDate.toISOString()
                      : null,
                    ballKnowledge: item.ballKnowledge,
                    difference: item.difference,
                    platform: item.platform,
                  }}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Sección: Mi Watchlist */}
      {watchlistRecords.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-amber-400" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Mi Watchlist
              </h2>
            </div>
            <Link
              href="/watchlist"
              className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 group"
            >
              Ver todas ({watchlistRecords.length}){" "}
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {watchlistRecords.map((item) => {
              let genres: string[] = [];
              let streamingPlatforms: string[] = [];
              try {
                genres = JSON.parse(item.movie.genres);
              } catch {}
              try {
                if (item.movie.streamingPlatforms)
                  streamingPlatforms = JSON.parse(
                    item.movie.streamingPlatforms,
                  );
              } catch {}

              return (
                <MovieCard
                  key={item.id}
                  movie={{
                    id: item.movie.id,
                    tmdbId: item.movie.tmdbId,
                    title: item.movie.title,
                    originalTitle: item.movie.originalTitle,
                    year: item.movie.year,
                    posterPath: item.movie.posterPath,
                    imdbRating: item.movie.imdbRating,
                    genres,
                    streamingPlatforms,
                  }}
                  userMovie={{
                    status: "WATCHLIST",
                    platform: item.platform,
                  }}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Continuar Explorando Películas con Desplegable y Modo Colapsable */}
      <ExploreMoviesSection movies={formattedExploreMovies} />
    </div>
  );
}
