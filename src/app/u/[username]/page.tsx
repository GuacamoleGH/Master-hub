"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Film,
  Gamepad2,
  Share2,
  Calendar,
  Star,
  Trophy,
  Clock,
  Sparkles,
  Layers,
  Quote,
  Check,
  Loader2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import TopFourCard from "@/components/profile/TopFourCard";
import AffinityCard from "@/components/profile/AffinityCard";
import AchievementsShowcase from "@/components/profile/AchievementsShowcase";
import SocialWrappedModal from "@/components/profile/SocialWrappedModal";
import { UserAchievement } from "@/lib/achievements";
import { sounds } from "@/lib/sounds";
import { useToast } from "@/components/shared/ToastContext";

interface PublicProfileData {
  user: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    bio: string | null;
    createdAt: string;
  };
  isOwner: boolean;
  cinema: {
    totalWatched: number;
    totalWatchlist: number;
    averageRating: number | null;
    globalBallKnowledge: number | null;
    level: number;
    rankTitle: string;
    rankIcon: string;
    topMovies: any[];
    recentMovies: any[];
  };
  gaming: {
    totalCompleted: number;
    totalBacklog: number;
    totalHours: number;
    averageRating: number | null;
    globalGameKnowledge: number | null;
    level: number;
    rankTitle: string;
    rankIcon: string;
    topGames: any[];
    recentGames: any[];
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

export default function PublicProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const toast = useToast();

  const [data, setData] = useState<PublicProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"cinema" | "gaming">("cinema");
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
        "¡Enlace copiado al portapapeles!",
        "Compártelo con tus amigos para que exploren tu catálogo.",
      );
      setTimeout(() => setCopied(false), 3000);
    } catch {
      toast.error("No se pudo copiar el enlace automáticamente.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        <span className="text-xs text-cine-400 font-mono">
          Cargando perfil público de @{username}...
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

  const { user, isOwner, cinema, gaming, affinity } = data;

  // Formatear Top 4 para los componentes
  const topFourMovies = cinema.topMovies.map((m) => ({
    id: m.id,
    title: m.movie.title,
    image: m.movie.posterPath,
    year: m.movie.year,
    rating: m.userRating,
    isFavorite: m.isFavorite,
    link: `/movie/${m.movie.tmdbId}`,
  }));

  const topFourGames = gaming.topGames.map((g) => ({
    id: g.id,
    title: g.game.title,
    image: g.game.backgroundImage,
    year: g.game.released ? g.game.released.split("-")[0] : null,
    rating: g.userRating,
    isFavorite: g.isFavorite,
    link: `/games/${g.game.rawgId}`,
  }));

  const memberYear = user.createdAt
    ? new Date(user.createdAt).getFullYear()
    : 2026;

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      {/* 1. Cabecera Principal del Perfil Público */}
      <section className="glass-panel p-6 sm:p-10 rounded-3xl border border-cine-800 bg-gradient-to-r from-cine-900 via-cine-950 to-cine-900 shadow-2xl relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.3)] flex-shrink-0 bg-cine-900 flex items-center justify-center text-3xl">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || user.username || "Usuario"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-700 to-indigo-900 flex items-center justify-center font-black text-white text-2xl">
                  {(user.name || user.username || "U")[0].toUpperCase()}
                </div>
              )}
            </div>

            {/* Datos de Identidad */}
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {user.name || user.username}
                </h1>
                <span className="text-xs font-mono text-purple-400 bg-purple-950/60 border border-purple-500/30 px-2 py-0.5 rounded-lg">
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
                  "Explorador del catálogo universal de cine y videojuegos."}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-cine-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cine-500" />
                  Miembro desde {memberYear}
                </span>
                <span>•</span>
                <span className="text-amber-400 font-medium">
                  {cinema.totalWatched} películas vistas
                </span>
                <span>•</span>
                <span className="text-purple-400 font-medium">
                  {gaming.totalCompleted} juegos completados
                </span>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => {
                sounds.shutter();
                setIsWrappedOpen(true);
              }}
              className="px-4 py-2 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-cine-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-gold-glow transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>MasterHub Wrapped</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-4 py-2 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 hover:border-purple-500 text-purple-300 hover:text-white rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>¡Enlace Copiado!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-4 h-4" />
                  <span>Compartir Perfil</span>
                </>
              )}
            </button>

            {isOwner && (
              <Link
                href="/profile"
                className="px-4 py-2 bg-cine-800 hover:bg-cine-700 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Editar Perfil
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* 2. Comparador de Afinidad (Si es otro usuario visitando) */}
      <AffinityCard
        affinity={affinity}
        targetUsername={user.username || "usuario"}
      />

      {/* 3. Vitrina de TOP 4 (Cine y Juegos) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopFourCard
          type="cinema"
          title="Top 4 Cinéfilo"
          items={topFourMovies}
        />
        <TopFourCard
          type="gaming"
          title="Top 4 Videojuegos"
          items={topFourGames}
        />
      </div>

      {/* Vitrina de Trofeos & Medallas */}
      {data.achievements && (
        <section className="pt-2">
          <AchievementsShowcase
            achievements={data.achievements.achievements}
            totalUnlocked={data.achievements.totalUnlocked}
            totalAvailable={data.achievements.totalAvailable}
            completionRate={data.achievements.completionRate}
            totalXpEarned={data.achievements.totalXpEarned}
            userName={user.name || user.username || "Usuario"}
          />
        </section>
      )}

      {/* 4. Selector de Pestañas (Cinefilia vs Gaming) */}
      <div className="flex items-center gap-2 border-b border-cine-800 pb-3">
        <button
          type="button"
          onClick={() => {
            sounds.playNav();
            setActiveTab("cinema");
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "cinema"
              ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-gold-glow"
              : "text-cine-400 hover:text-white hover:bg-cine-900"
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Colección de Cine & Series ({cinema.totalWatched})</span>
        </button>

        <button
          type="button"
          onClick={() => {
            sounds.playNav();
            setActiveTab("gaming");
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === "gaming"
              ? "bg-purple-500/15 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.25)]"
              : "text-cine-400 hover:text-white hover:bg-cine-900"
          }`}
        >
          <Gamepad2 className="w-4 h-4" />
          <span>Colección Gamer ({gaming.totalCompleted})</span>
        </button>
      </div>

      {/* 5. Contenido de la Pestaña Activa */}
      {activeTab === "cinema" ? (
        <div className="space-y-6">
          {/* Métricas destacadas de cine */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-cine-900/60 border border-cine-800">
              <span className="text-[10px] uppercase font-mono text-cine-400 font-bold block">
                Películas Vistas
              </span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">
                {cinema.totalWatched}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-cine-900/60 border border-cine-800">
              <span className="text-[10px] uppercase font-mono text-cine-400 font-bold block">
                Sofa Knowledge
              </span>
              <span className="text-2xl font-black text-emerald-400 font-mono mt-1 block">
                {cinema.globalBallKnowledge !== null
                  ? `${cinema.globalBallKnowledge}%`
                  : "—"}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-cine-900/60 border border-cine-800">
              <span className="text-[10px] uppercase font-mono text-cine-400 font-bold block">
                Nota Media
              </span>
              <span className="text-2xl font-black text-amber-400 font-mono mt-1 block">
                {cinema.averageRating !== null
                  ? `${cinema.averageRating} ⭐`
                  : "—"}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-cine-900/60 border border-cine-800">
              <span className="text-[10px] uppercase font-mono text-cine-400 font-bold block">
                Rango Cinéfilo
              </span>
              <span className="text-xs font-bold text-white truncate mt-2 block">
                {cinema.rankTitle}
              </span>
            </div>
          </div>

          {/* Lista de películas recientes con reseñas */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Film className="w-4 h-4 text-amber-400" />
              <span>Títulos Recientes en su Colección</span>
            </h3>

            {cinema.recentMovies.length === 0 ? (
              <div className="p-8 text-center text-xs text-cine-500 rounded-2xl border border-cine-800/80 bg-cine-950/40">
                Este usuario aún no ha registrado películas en su cuenta.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                {cinema.recentMovies.map((um) => (
                  <Link
                    key={um.id}
                    href={`/movie/${um.movie.tmdbId}`}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-cine-900/80 border border-cine-800 hover:border-amber-500/50 transition-all hover:scale-[1.02]"
                  >
                    <div className="relative aspect-[2/3] w-full overflow-hidden bg-cine-950">
                      {um.movie.posterPath ? (
                        <img
                          src={um.movie.posterPath}
                          alt={um.movie.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-cine-700">
                          <Film className="w-8 h-8" />
                        </div>
                      )}
                      {um.userRating && (
                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold text-amber-400 flex items-center gap-1 border border-amber-500/30">
                          <Star className="w-2.5 h-2.5 fill-amber-400" />
                          {um.userRating.toFixed(1)}
                        </div>
                      )}
                    </div>
                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <p className="text-xs font-bold text-white truncate group-hover:text-amber-300 transition-colors">
                        {um.movie.title}
                      </p>
                      <span className="text-[10px] text-cine-400 font-mono mt-1">
                        {um.movie.year || "—"}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Métricas destacadas de gaming */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-cine-900/60 border border-cine-800">
              <span className="text-[10px] uppercase font-mono text-cine-400 font-bold block">
                Completados
              </span>
              <span className="text-2xl font-black text-white font-mono mt-1 block">
                {gaming.totalCompleted}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-cine-900/60 border border-cine-800">
              <span className="text-[10px] uppercase font-mono text-cine-400 font-bold block">
                Horas Totales
              </span>
              <span className="text-2xl font-black text-cyan-400 font-mono mt-1 block">
                {gaming.totalHours}h
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-cine-900/60 border border-cine-800">
              <span className="text-[10px] uppercase font-mono text-cine-400 font-bold block">
                Game Knowledge
              </span>
              <span className="text-2xl font-black text-purple-400 font-mono mt-1 block">
                {gaming.globalGameKnowledge !== null
                  ? `${gaming.globalGameKnowledge}%`
                  : "—"}
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-cine-900/60 border border-cine-800">
              <span className="text-[10px] uppercase font-mono text-cine-400 font-bold block">
                Rango Gamer
              </span>
              <span className="text-xs font-bold text-white truncate mt-2 block">
                {gaming.rankTitle}
              </span>
            </div>
          </div>

          {/* Lista de videojuegos recientes */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-purple-400" />
              <span>Videojuegos en su Catálogo</span>
            </h3>

            {gaming.recentGames.length === 0 ? (
              <div className="p-8 text-center text-xs text-cine-500 rounded-2xl border border-cine-800/80 bg-cine-950/40">
                Este usuario aún no ha registrado videojuegos en su cuenta.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5">
                {gaming.recentGames.map((ug) => (
                  <Link
                    key={ug.id}
                    href={`/games/${ug.game.rawgId}`}
                    className="group flex flex-col rounded-2xl overflow-hidden bg-cine-900/80 border border-cine-800 hover:border-purple-500/50 transition-all hover:scale-[1.02]"
                  >
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-cine-950">
                      {ug.game.backgroundImage ? (
                        <img
                          src={ug.game.backgroundImage}
                          alt={ug.game.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-cine-700">
                          <Gamepad2 className="w-8 h-8" />
                        </div>
                      )}
                      {ug.userRating && (
                        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold text-purple-400 flex items-center gap-1 border border-purple-500/30">
                          <Star className="w-2.5 h-2.5 fill-purple-400" />
                          {ug.userRating.toFixed(1)}
                        </div>
                      )}
                    </div>
                    <div className="p-2.5 flex-1 flex flex-col justify-between">
                      <p className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                        {ug.game.title}
                      </p>
                      <div className="flex items-center justify-between text-[10px] text-cine-400 font-mono mt-1">
                        <span>
                          {ug.hoursPlayed ? `${ug.hoursPlayed}h` : "—"}
                        </span>
                        <span className="text-cyan-400 font-bold">
                          {ug.status}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modal de Social Wrapped */}
      <SocialWrappedModal
        isOpen={isWrappedOpen}
        onClose={() => setIsWrappedOpen(false)}
        user={{
          displayName: user.name || user.username || "Usuario",
          username: user.username,
          avatarUrl: user.image,
        }}
        stats={{
          totalMovies: cinema.totalWatched,
          totalSeries: 0,
          totalHours: gaming.totalHours,
          totalCompletedGames: gaming.totalCompleted,
          ballKnowledge: cinema.globalBallKnowledge,
          gameKnowledge: gaming.globalGameKnowledge,
        }}
        achievements={data.achievements?.achievements || []}
      />
    </div>
  );
}
