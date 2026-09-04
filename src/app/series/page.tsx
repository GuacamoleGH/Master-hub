import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { calculateLevelAndRank } from "@/lib/ballKnowledge";
import SeriesCard from "@/components/series/SeriesCard";
import BallKnowledgeBadge from "@/components/BallKnowledgeBadge";
import ExploreSeriesSection from "@/components/series/ExploreSeriesSection";
import { CURATED_SERIES } from "@/lib/mockData";
import {
  Tv,
  Bookmark,
  CheckCircle2,
  Star,
  Sparkles,
  TrendingUp,
  Layers,
  ArrowRight,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function SeriesHomePage() {
  // 1. Obtener perfil de usuario
  let profile = await prisma.userProfile.findUnique({
    where: { id: "user-default" },
  });

  if (!profile) {
    profile = {
      id: "user-default",
      displayName: "Jose",
      avatarUrl: null,
      bio: "Explorador de series y cine",
      totalXp: 0,
      updatedAt: new Date(),
    };
  }

  const levelInfo = calculateLevelAndRank(profile.totalXp);

  // 2. Sincronizar o sembrar series curadas iniciales
  try {
    for (const s of CURATED_SERIES) {
      await prisma.series.upsert({
        where: { tmdbId: s.tmdbId },
        update: {
          posterPath: s.posterPath,
          backdropPath: s.backdropPath,
          creator: s.creator,
          creatorImage: s.creatorImage || null,
          cast: JSON.stringify(s.cast),
          numberOfSeasons: s.numberOfSeasons,
          numberOfEpisodes: s.numberOfEpisodes,
          imdbRating: s.imdbRating,
          genres: JSON.stringify(s.genres),
          overview: s.overview,
        },
        create: {
          tmdbId: s.tmdbId,
          imdbId: s.imdbId,
          name: s.name,
          originalName: s.originalName,
          firstAirYear: s.firstAirYear,
          lastAirYear: s.lastAirYear,
          numberOfSeasons: s.numberOfSeasons,
          numberOfEpisodes: s.numberOfEpisodes,
          seriesStatus: s.seriesStatus,
          posterPath: s.posterPath,
          backdropPath: s.backdropPath,
          overview: s.overview,
          genres: JSON.stringify(s.genres),
          creator: s.creator,
          creatorImage: s.creatorImage || null,
          cast: JSON.stringify(s.cast),
          imdbRating: s.imdbRating,
          streamingPlatforms: JSON.stringify(s.streamingPlatforms),
        },
      });
    }
  } catch (e) {
    console.error("Error sincronizando series iniciales:", e);
  }

  // 3. Obtener series de la Watchlist (últimas añadidas)
  const watchlistRecords = await prisma.userSeries.findMany({
    where: { status: "WATCHLIST" },
    include: { series: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  // 4. Obtener últimas series vistas
  const watchedRecords = await prisma.userSeries.findMany({
    where: { status: "WATCHED" },
    include: { series: true },
    orderBy: { updatedAt: "desc" },
    take: 6,
  });

  // 5. Catálogo general para continuar explorando
  let exploreSeries = await prisma.series.findMany({
    where: {
      userSeries: null,
    },
    orderBy: { imdbRating: "desc" },
    include: { userSeries: true },
  });

  if (exploreSeries.length === 0) {
    exploreSeries = await prisma.series.findMany({
      take: 12,
      orderBy: { imdbRating: "desc" },
      include: { userSeries: true },
    });
  }

  const formattedExploreSeries = exploreSeries.map((s) => {
    let genres: string[] = [];
    let streamingPlatforms: string[] = [];
    try {
      genres = JSON.parse(s.genres);
    } catch {}
    try {
      if (s.streamingPlatforms)
        streamingPlatforms = JSON.parse(s.streamingPlatforms);
    } catch {}

    return {
      id: s.id,
      tmdbId: s.tmdbId,
      name: s.name,
      originalName: s.originalName,
      firstAirYear: s.firstAirYear,
      lastAirYear: s.lastAirYear,
      numberOfSeasons: s.numberOfSeasons,
      numberOfEpisodes: s.numberOfEpisodes,
      posterPath: s.posterPath,
      imdbRating: s.imdbRating,
      genres,
      streamingPlatforms,
      userSeries: s.userSeries
        ? {
            status: s.userSeries.status as any,
            userRating: s.userSeries.userRating,
            review: s.userSeries.review,
            ballKnowledge: s.userSeries.ballKnowledge,
            difference: s.userSeries.difference,
            platform: s.userSeries.platform,
          }
        : null,
    };
  });

  // 6. Estadísticas resumidas de Series
  const allWatched = await prisma.userSeries.findMany({
    where: { status: "WATCHED" },
    include: { series: true },
  });

  const totalWatched = allWatched.length;
  const rated = allWatched.filter((r) => typeof r.userRating === "number");
  const avgRating =
    rated.length > 0
      ? (
          rated.reduce((acc, c) => acc + (c.userRating || 0), 0) / rated.length
        ).toFixed(1)
      : null;

  const withBk = rated.filter((r) => typeof r.ballKnowledge === "number");
  const avgBk =
    withBk.length > 0
      ? (
          withBk.reduce((acc, c) => acc + (c.ballKnowledge || 0), 0) /
          withBk.length
        ).toFixed(1)
      : null;

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner Series */}
      <section className="relative rounded-3xl overflow-hidden glass-panel border border-purple-500/25 p-6 sm:p-10 bg-gradient-to-br from-cine-900 via-cine-950 to-cine-900 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Universo de Series de Televisión</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Bienvenido,{" "}
              <span className="text-purple-400">{profile.displayName}</span>
            </h1>
            <p className="text-sm sm:text-base text-cine-300 leading-relaxed">
              Registra cada serie que sigues, organiza tus temporadas
              pendientes, califica cada producción con precisión y pon a prueba
              tu criterio frente a IMDb con el índice{" "}
              <strong className="text-purple-400">Sofa Knowledge</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/watched"
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.4)] text-sm transition-all flex items-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Series Vistas (
                {totalWatched})
              </Link>
              <Link
                href="/watchlist"
                className="px-5 py-2.5 glass-card hover:bg-cine-800 text-white font-semibold rounded-xl border border-cine-700 text-sm transition-all flex items-center gap-2"
              >
                <Bookmark className="w-4 h-4 text-purple-400" /> Watchlist (
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
              <span className="text-xs font-bold text-purple-400">
                Series Canon
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-2xl text-purple-400">
                <Tv className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <div className="text-xs text-cine-400 font-medium">
                  Rango Cinéfilo
                </div>
                <div className="font-bold text-white text-base">
                  {levelInfo.rankTitle}{" "}
                  <span className="text-purple-400">Lvl.{levelInfo.level}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-cine-800 flex items-center justify-between">
              <div className="text-xs text-cine-400">Sofa Knowledge Series</div>
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

      {/* Mis Estadísticas Destacadas de Series */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-2xl border border-cine-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Tv className="w-4 h-4 text-purple-400" /> Series Vistas
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {totalWatched}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            En tu diario personal
          </div>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-cine-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Star className="w-4 h-4 text-purple-400 fill-purple-400" /> Nota
            Media
          </div>
          <div className="text-2xl font-black text-purple-400 font-mono">
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

      {/* Sección: Últimas series vistas */}
      {watchedRecords.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Últimas Series Vistas
              </h2>
            </div>
            <Link
              href="/watched"
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 group"
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
                genres = JSON.parse(item.series.genres);
              } catch {}
              try {
                if (item.series.streamingPlatforms)
                  streamingPlatforms = JSON.parse(
                    item.series.streamingPlatforms,
                  );
              } catch {}

              return (
                <SeriesCard
                  key={item.id}
                  series={{
                    id: item.series.id,
                    tmdbId: item.series.tmdbId,
                    name: item.series.name,
                    originalName: item.series.originalName,
                    firstAirYear: item.series.firstAirYear,
                    lastAirYear: item.series.lastAirYear,
                    numberOfSeasons: item.series.numberOfSeasons,
                    numberOfEpisodes: item.series.numberOfEpisodes,
                    posterPath: item.series.posterPath,
                    imdbRating: item.series.imdbRating,
                    genres,
                    streamingPlatforms,
                  }}
                  userSeries={{
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

      {/* Sección: Mi Watchlist de Series */}
      {watchlistRecords.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white tracking-wide">
                Series en Mi Watchlist
              </h2>
            </div>
            <Link
              href="/watchlist"
              className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 group"
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
                genres = JSON.parse(item.series.genres);
              } catch {}
              try {
                if (item.series.streamingPlatforms)
                  streamingPlatforms = JSON.parse(
                    item.series.streamingPlatforms,
                  );
              } catch {}

              return (
                <SeriesCard
                  key={item.id}
                  series={{
                    id: item.series.id,
                    tmdbId: item.series.tmdbId,
                    name: item.series.name,
                    originalName: item.series.originalName,
                    firstAirYear: item.series.firstAirYear,
                    lastAirYear: item.series.lastAirYear,
                    numberOfSeasons: item.series.numberOfSeasons,
                    numberOfEpisodes: item.series.numberOfEpisodes,
                    posterPath: item.series.posterPath,
                    imdbRating: item.series.imdbRating,
                    genres,
                    streamingPlatforms,
                  }}
                  userSeries={{
                    status: "WATCHLIST",
                    platform: item.platform,
                  }}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Continuar Explorando Series con Desplegable y Modo Colapsable */}
      <ExploreSeriesSection series={formattedExploreSeries} />
    </div>
  );
}
