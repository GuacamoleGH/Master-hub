"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Film,
  Share2,
  Calendar,
  Star,
  Trophy,
  Loader2,
  AlertCircle,
  TrendingUp,
  Brain,
  Award,
  ArrowRight,
  Camera,
  Edit2,
  Check,
} from "lucide-react";
import CinephileLevelBar from "@/components/CinephileLevelBar";
import BallKnowledgeBadge from "@/components/BallKnowledgeBadge";
import RatingDistributionChart from "@/components/charts/RatingDistributionChart";
import GenreChart from "@/components/charts/GenreChart";
import WatchesTimelineChart from "@/components/charts/WatchesTimelineChart";
import TopFiveCard, { TopFiveItem } from "@/components/profile/TopFiveCard";
import WatchedCatalogSection, {
  WatchedCatalogItem,
} from "@/components/profile/WatchedCatalogSection";
import AffinityCard from "@/components/profile/AffinityCard";
import SocialWrappedModal from "@/components/profile/SocialWrappedModal";
import { UserAchievement } from "@/lib/achievements";
import { sounds } from "@/lib/sounds";
import { useToast } from "@/components/shared/ToastContext";

interface PublicCinemaProfileData {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    bio: string | null;
    totalXp?: number;
    createdAt: string;
  };
  isOwner: boolean;
  cinema: {
    totalWatched: number;
    totalWatchlist: number;
    totalMovies?: number;
    totalSeries?: number;
    totalReviews?: number;
    averageRating: number | null;
    globalBallKnowledge: number | null;
    totalXp?: number;
    level: number;
    rankTitle: string;
    rankIcon: string;
    topGenre?: string | null;
    highestRatedMovie?: any;
    lowestRatedMovie?: any;
    topCine?: any[];
    topMovies?: any[];
    watchedCatalog?: WatchedCatalogItem[];
    recentMovies: any[];
    recentSeries?: any[];
    biggestW?: any;
    biggestL?: any;
    ratingDistribution?: any[];
    genreCounts?: any[];
    watchesByMonth?: any[];
  };
  affinity: any;
  achievements?: {
    achievements: UserAchievement[];
    totalUnlocked: number;
    totalAvailable: number;
    totalXpEarned: number;
    completionRate: number;
  };
}

export default function PublicCinephileProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const toast = useToast();

  const [data, setData] = useState<PublicCinemaProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isWrappedOpen, setIsWrappedOpen] = useState(false);

  useEffect(() => {
    if (!username) return;

    const fetchPublicProfile = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`/api/u/${encodeURIComponent(username)}`);
        if (res.status === 404) {
          setError("El usuario que buscas no existe en Master Hub.");
          return;
        }
        if (!res.ok) {
          throw new Error("No se pudo cargar el perfil.");
        }
        const json = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Error de conexión.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicProfile();
  }, [username]);

  const handleShare = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
      sounds.playSuccess();
      setCopied(true);
      toast.success(
        "¡Enlace de perfil cinéfilo copiado!",
        "Compártelo con tus amigos para que exploren tu vitrina.",
      );
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("No se pudo copiar el enlace automáticamente.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        <span className="text-xs text-cine-400 font-mono">
          Cargando perfil cinéfilo de @{username}...
        </span>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6 gap-4">
        <div className="p-4 rounded-2xl bg-red-950/40 border border-red-800/60 text-red-400">
          <AlertCircle className="w-10 h-10 mx-auto" />
        </div>
        <h2 className="text-xl font-bold text-white">Usuario no encontrado</h2>
        <p className="text-xs text-cine-400 max-w-sm">
          {error || "El perfil solicitado no existe o no está disponible."}
        </p>
        <Link
          href="/"
          className="mt-2 px-4 py-2 bg-cine-800 hover:bg-cine-700 text-white rounded-xl text-xs font-semibold transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    );
  }

  const { user, isOwner, cinema, affinity } = data;

  // Formatear Top 5 Cinéfilo
  const topFiveCine: TopFiveItem[] = (cinema.topCine || cinema.topMovies || []).map(
    (m: any) => ({
      id: m.id,
      title: m.title || m.movie?.title || m.series?.name,
      image: m.image ?? m.posterPath ?? m.movie?.posterPath ?? m.series?.posterPath,
      year: m.year ?? m.movie?.year ?? m.series?.firstAirYear,
      rating: m.rating ?? m.userRating,
      isFavorite: m.isFavorite,
      link:
        m.link ||
        (m.movie
          ? `/movie/${m.movie.tmdbId}`
          : m.series
            ? `/series/${m.series.tmdbId}`
            : "#"),
      mediaType: m.mediaType || (m.series ? "series" : "movie"),
    }),
  );

  const memberYear = user.createdAt
    ? new Date(user.createdAt).getFullYear()
    : 2026;

  return (
    <div className="space-y-10 pb-20 animate-fade-in">
      {/* 1. Cabecera Principal del Perfil Cinéfilo Público */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-cine-900 to-cine-950 shadow-2xl relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-amber-500/10" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 flex-1 min-w-0">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-gold-glow shrink-0 bg-cine-900 flex items-center justify-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || user.username || "Usuario"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-white text-3xl bg-gradient-to-br from-amber-600 to-yellow-800">
                  {(user.name || user.username || "U")[0].toUpperCase()}
                </div>
              )}
            </div>

            {/* Datos de Identidad */}
            <div className="space-y-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight truncate">
                  {user.name || user.username}
                </h1>
                <span className="text-xs font-mono px-2 py-0.5 rounded-lg border text-amber-300 bg-amber-950/60 border-amber-500/30">
                  @{user.username || "user"}
                </span>
                {isOwner && (
                  <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-lg">
                    Tú
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-cine-300 max-w-xl leading-relaxed">
                {user.bio ||
                  "Explorador y analista del catálogo universal de cine y series en MasterHub."}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-cine-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cine-500" />
                  Miembro desde {memberYear}
                </span>
                <span>•</span>
                <span className="text-amber-400 font-medium">
                  {cinema.totalWatched} películas/series vistas
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-row sm:flex-col gap-2.5 shrink-0 self-start sm:self-center sm:ml-auto">
              {isOwner && (
                <Link
                  href="/profile"
                  className="justify-center px-3.5 py-1.5 bg-cine-800/80 hover:bg-amber-500/20 text-cine-200 hover:text-white border border-cine-700 hover:border-amber-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Editar perfil cinéfilo"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Editar Perfil</span>
                </Link>
              )}

              <button
                type="button"
                onClick={handleShare}
                className="justify-center px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer border bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 hover:text-white border-amber-500/40"
                title="Copiar enlace a este perfil público"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Compartir Perfil</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  sounds.shutter();
                  setIsWrappedOpen(true);
                }}
                className="justify-center px-3.5 py-1.5 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-cine-950 shadow-gold-glow"
                title="Generar tarjeta de resumen para redes sociales"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Cinephile Hub Wrapped</span>
              </button>
            </div>
          </div>

          {/* Barra de Nivel Cinéfilo en Cabecera */}
          <div className="w-full lg:w-auto lg:min-w-[320px] shrink-0">
            <CinephileLevelBar
              totalXp={cinema.totalXp ?? user.totalXp ?? 0}
              variant="cinema"
            />
          </div>
        </div>
      </section>

      {/* 2. Comparador de Afinidad (Si es otro usuario visitando) */}
      <AffinityCard
        affinity={affinity}
        targetUsername={user.username || "usuario"}
      />

      {/* 3. Contenido Principal del Perfil Cinéfilo */}
      {/* Highlights Rápidos de Cine */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Películas Vistas */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Film className="w-4 h-4 text-amber-400" /> Películas Vistas
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {cinema.totalWatched}
            <span className="text-xs font-normal text-cine-400"> títulos</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            {cinema.totalReviews ?? 0} reseñas escritas
          </div>
        </div>

        {/* En Watchlist */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Trophy className="w-4 h-4 text-amber-400" /> En Watchlist
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {cinema.totalWatchlist}
            <span className="text-xs font-normal text-cine-400"> pendientes</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Por ver en streaming / cine
          </div>
        </div>

        {/* Global Sofa Knowledge */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Brain className="w-4 h-4 text-amber-400" /> Sofa Knowledge
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">
            {cinema.globalBallKnowledge !== null
              ? `${cinema.globalBallKnowledge}%`
              : "—"}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Frente al consenso de IMDb
          </div>
        </div>

        {/* Tu Nota Media */}
        <div className="glass-panel p-5 rounded-2xl border border-amber-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> Tu Nota Media
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {cinema.averageRating || "—"}
            <span className="text-xs font-normal text-cine-400"> / 10</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Género top:{" "}
            <strong className="text-amber-400">{cinema.topGenre || "—"}</strong>
          </div>
        </div>
      </section>

      {/* Vitrina de Top 5 Cinéfilo (Películas & Series) */}
      <section>
        <TopFiveCard type="cinema" title="Top 5 Cinéfilo" items={topFiveCine} />
      </section>

      {/* Catálogo Completo de Películas y Series Vistas */}
      <WatchedCatalogSection
        type="cinema"
        items={cinema.watchedCatalog || []}
        isOwner={isOwner}
      />

      {/* Vitrina de Trofeos Cinéfilos */}
      {data.achievements && (
        <section className="glass-panel p-6 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-cine-900 to-cine-950 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cine-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    Vitrina de Trofeos Cinéfilos
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    {data.achievements.totalUnlocked} /{" "}
                    {data.achievements.totalAvailable} Desbloqueados
                  </span>
                </div>
                <p className="text-xs text-cine-400 mt-0.5">
                  {data.achievements.completionRate}% completado ·{" "}
                  {data.achievements.totalXpEarned} XP acumulados
                </p>
              </div>
            </div>

            <Link
              href="/achievements"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-cine-950 font-black text-xs rounded-xl shadow-gold-glow transition-all cursor-pointer shrink-0"
            >
              <Award className="w-4 h-4" />
              <span>Explorar Todos los Logros</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Muestra de Trofeos Destacados */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {data.achievements.achievements
              .filter((a) => !a.universe || a.universe === "CINE")
              .slice(0, 6)
              .map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center text-center gap-2 ${
                    ach.isUnlocked
                      ? "bg-amber-950/30 border-amber-500/40 text-amber-200 shadow-[0_0_10px_rgba(245,158,11,0.15)]"
                      : "bg-cine-900/40 border-cine-800 text-cine-500 opacity-60"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-base ${
                      ach.isUnlocked
                        ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                        : "bg-cine-800 text-cine-600"
                    }`}
                  >
                    {ach.isUnlocked ? "🏆" : "🔒"}
                  </div>
                  <div className="min-w-0 w-full">
                    <p className="text-xs font-bold text-white truncate">
                      {ach.title}
                    </p>
                    <p className="text-[10px] text-cine-400 font-mono mt-0.5">
                      +{ach.xp} XP
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </section>
      )}

      {/* Rankings Personales: Biggest W vs Biggest L */}
      {(cinema.biggestW || cinema.biggestL) && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Rankings de Precisión (W & L)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cinema.biggestW && (
              <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-cine-900 to-emerald-950/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👑</span>
                    <h3 className="font-bold text-white text-base">BIGGEST W</h3>
                  </div>
                  <BallKnowledgeBadge
                    score={cinema.biggestW.ballKnowledge}
                    size="sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {cinema.biggestW.posterPath && (
                    <img
                      src={cinema.biggestW.posterPath}
                      alt={cinema.biggestW.title}
                      className="w-16 h-24 object-cover rounded-xl shadow border border-white/10"
                    />
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-base">
                      {cinema.biggestW.title}
                    </h4>
                    <p className="text-xs text-cine-300">
                      Coincidencia casi idéntica con el consenso de IMDb.
                    </p>
                    <div className="flex items-center gap-3 text-xs font-mono pt-1">
                      <span className="text-amber-400 font-bold">
                        Tú: {cinema.biggestW.userRating?.toFixed(1)}
                      </span>
                      <span className="text-cine-500">vs</span>
                      <span className="text-cine-300">
                        IMDb: {cinema.biggestW.imdbRating?.toFixed(1)}
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        (Diff:{" "}
                        {cinema.biggestW.diff > 0
                          ? `+${cinema.biggestW.diff}`
                          : cinema.biggestW.diff}
                        )
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {cinema.biggestL && (
              <div className="glass-panel p-5 rounded-3xl border border-red-500/30 bg-gradient-to-br from-cine-900 to-red-950/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤡</span>
                    <h3 className="font-bold text-white text-base">BIGGEST L</h3>
                  </div>
                  <BallKnowledgeBadge
                    score={cinema.biggestL.ballKnowledge}
                    size="sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {cinema.biggestL.posterPath && (
                    <img
                      src={cinema.biggestL.posterPath}
                      alt={cinema.biggestL.title}
                      className="w-16 h-24 object-cover rounded-xl shadow border border-white/10"
                    />
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-base">
                      {cinema.biggestL.title}
                    </h4>
                    <p className="text-xs text-cine-300">
                      Tu mayor discrepancia respecto a la nota comunitaria de IMDb.
                    </p>
                    <div className="flex items-center gap-3 text-xs font-mono pt-1">
                      <span className="text-amber-400 font-bold">
                        Tú: {cinema.biggestL.userRating?.toFixed(1)}
                      </span>
                      <span className="text-cine-500">vs</span>
                      <span className="text-cine-300">
                        IMDb: {cinema.biggestL.imdbRating?.toFixed(1)}
                      </span>
                      <span className="text-red-400 font-semibold">
                        (Diff:{" "}
                        {cinema.biggestL.diff > 0
                          ? `+${cinema.biggestL.diff}`
                          : cinema.biggestL.diff}
                        )
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Analítica Cinematográfica */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white tracking-wide">
            Analítica Cinematográfica
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribución de Notas */}
          {cinema.ratingDistribution && (
            <div className="glass-panel p-5 rounded-3xl border border-cine-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Distribución de valoraciones</span>
                <span className="text-xs text-cine-400 font-normal">
                  0 a 10 Estrellas
                </span>
              </h3>
              <RatingDistributionChart data={cinema.ratingDistribution} />
            </div>
          )}

          {/* Géneros Más Vistos */}
          {cinema.genreCounts && (
            <div className="glass-panel p-5 rounded-3xl border border-cine-800 space-y-3">
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Géneros más frecuentes</span>
                <span className="text-xs text-cine-400 font-normal">
                  Volumen & Nota media
                </span>
              </h3>
              <GenreChart data={cinema.genreCounts} />
            </div>
          )}

          {/* Línea Temporal de Visionados */}
          {cinema.watchesByMonth && (
            <div className="glass-panel p-5 rounded-3xl border border-cine-800 space-y-3 lg:col-span-2">
              <h3 className="text-sm font-bold text-white flex items-center justify-between">
                <span>Evolución de visionados mensuales</span>
                <span className="text-xs text-cine-400 font-normal">
                  Ritmo cinematográfico
                </span>
              </h3>
              <WatchesTimelineChart data={cinema.watchesByMonth} />
            </div>
          )}
        </div>
      </section>

      {/* Modal de Social Wrapped Cinéfilo */}
      <SocialWrappedModal
        isOpen={isWrappedOpen}
        onClose={() => setIsWrappedOpen(false)}
        universe="CINE"
        user={{
          displayName: user.name || user.username || "Usuario",
          username: user.username,
          avatarUrl: user.image,
        }}
        stats={{
          totalMovies: cinema.totalMovies ?? cinema.totalWatched,
          totalSeries: cinema.totalSeries ?? 0,
          totalHours: 0,
          totalCompletedGames: 0,
          averageRating: cinema.averageRating,
          ballKnowledge: cinema.globalBallKnowledge,
          gameKnowledge: null,
        }}
        topItems={topFiveCine.slice(0, 3)}
        achievements={data.achievements?.achievements || []}
      />
    </div>
  );
}
