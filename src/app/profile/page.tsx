"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  LogIn,
  User,
  Film,
  Star,
  Sparkles,
  Trophy,
  Loader2,
  RefreshCw,
  Trash2,
  Edit2,
  Check,
  X,
  TrendingUp,
  Brain,
  Award,
} from "lucide-react";
import { ProfileStats } from "@/types/movie";
import CinephileLevelBar from "@/components/CinephileLevelBar";
import BallKnowledgeBadge from "@/components/BallKnowledgeBadge";
import RatingDistributionChart from "@/components/charts/RatingDistributionChart";
import GenreChart from "@/components/charts/GenreChart";
import WatchesTimelineChart from "@/components/charts/WatchesTimelineChart";
import AvatarPickerModal from "@/components/shared/AvatarPickerModal";
import EditCinephileProfileModal from "@/components/movies/EditCinephileProfileModal";
import AchievementsShowcase from "@/components/profile/AchievementsShowcase";
import SocialWrappedModal from "@/components/profile/SocialWrappedModal";
import { UserAchievement } from "@/lib/achievements";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sounds } from "@/lib/sounds";
import { useToast } from "@/components/shared/ToastContext";
import { Camera } from "lucide-react";

export default function ProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [profileData, setProfileData] = useState<{
    displayName: string;
    avatarUrl: string | null;
    bio: string | null;
  }>({
    displayName: "Invitado",
    avatarUrl: null,
    bio: "",
  });

  const [stats, setStats] = useState<ProfileStats | null>(null);
  const toast = useToast();
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Logros y Wrapped
  const [achievementsData, setAchievementsData] = useState<{
    achievements: UserAchievement[];
    totalUnlocked: number;
    totalAvailable: number;
    completionRate: number;
    totalXpEarned: number;
  } | null>(null);
  const [isWrappedOpen, setIsWrappedOpen] = useState(false);

  // Modal de edición de perfil cinéfilo
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const handleOpenEdit = () => {
    sounds.click();
    if (!session?.user) {
      router.push("/login?callbackUrl=/profile");
      return;
    }
    setIsEditProfileOpen(true);
  };

  // Acciones de administración (wipe / seed)
  const [adminMsg, setAdminMsg] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const [resProfile, resAch] = await Promise.all([
        fetch("/api/profile"),
        fetch("/api/profile/achievements"),
      ]);

      if (resProfile.ok) {
        const data = await resProfile.json();
        setProfileData(data.profile);
        setStats(data.stats);
      }

      if (resAch.ok) {
        const dataAch = await resAch.json();
        setAchievementsData(dataAch);
      }
    } catch (err) {
      console.error("Error al cargar perfil:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAdminAction = async (action: "wipe" | "seed") => {
    const confirmText =
      action === "wipe"
        ? "¿Estás seguro de que deseas vaciar tus valoraciones para comenzar desde cero?"
        : "¿Deseas recargar el catálogo con las películas y reseñas de demostración?";

    if (!window.confirm(confirmText)) return;

    setIsActionLoading(true);
    setAdminMsg(null);
    try {
      const res = await fetch("/api/admin/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (res.ok) {
        setAdminMsg(data.message);
        fetchProfile();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        <p className="text-sm text-cine-400 font-medium">
          Calculando tus estadísticas cinéfilas...
        </p>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="space-y-12 pb-20">
      {/* 1. Cabecera del Perfil */}
      <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-cine-800 bg-gradient-to-r from-cine-900 via-cine-950 to-cine-900 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-5 sm:gap-6">
            {/* Avatar con botón de cambio */}
            <div className="relative group/avatar w-24 h-24 sm:w-32 sm:h-32 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-gold-glow flex-shrink-0 bg-cine-900 flex items-center justify-center">
              {profileData.avatarUrl ? (
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-12 h-12 text-cine-500" />
              )}
              <button
                type="button"
                onClick={handleOpenEdit}
                className="absolute inset-0 w-full h-full bg-black/80 backdrop-blur-xs opacity-0 group-hover/avatar:opacity-100 transition-all duration-200 flex flex-col items-center justify-center text-center p-0 m-0 cursor-pointer"
                title={
                  session?.user ? "Editar avatar y perfil" : "Iniciar sesión"
                }
              >
                {session?.user ? (
                  <div className="flex flex-col items-center justify-center gap-1.5 text-amber-300">
                    <Sparkles className="w-6 h-6 text-amber-400" />
                    <span className="text-[11px] font-bold tracking-wide leading-none text-center">
                      Cambiar
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1.5 text-amber-300">
                    <LogIn className="w-6 h-6 text-amber-400" />
                    <span className="text-[11px] font-bold tracking-wide leading-none text-center">
                      Entrar
                    </span>
                  </div>
                )}
              </button>
            </div>

            {/* Datos Personales */}
            <div className="space-y-2">
              {stats?.rankTitle && (
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                    Perfil Cinéfilo
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {stats.rankTitle}
                  </span>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-3.5">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {profileData.displayName}
                </h1>
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  <button
                    onClick={handleOpenEdit}
                    className="w-full justify-center px-3.5 py-1.5 bg-cine-800/80 hover:bg-amber-500/20 text-amber-300 hover:text-white border border-amber-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                    title={
                      session?.user
                        ? "Editar perfil cinéfilo"
                        : "Inicia sesión para editar tu perfil"
                    }
                  >
                    {session?.user ? (
                      <>
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Editar Perfil</span>
                      </>
                    ) : (
                      <>
                        <LogIn className="w-3.5 h-3.5" />
                        <span>Iniciar Sesión</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      sounds.shutter();
                      setIsWrappedOpen(true);
                    }}
                    className="w-full justify-center px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-cine-950 font-black rounded-xl text-xs flex items-center gap-1.5 shadow-gold-glow transition-all cursor-pointer"
                    title="Generar tarjeta de resumen para redes sociales"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>MasterHub Wrapped</span>
                  </button>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-cine-300 max-w-lg leading-relaxed">
                {profileData.bio || "Explorador y crítico del séptimo arte."}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-0.5 text-xs text-cine-400">
                <span className="font-semibold text-white">
                  {stats?.totalWatched ?? 0}
                </span>{" "}
                películas vistas ·{" "}
                <span className="font-semibold text-white">
                  {stats?.totalReviews ?? 0}
                </span>{" "}
                reseñas escritas ·{" "}
                <span className="font-semibold text-white">
                  {stats?.totalWatchlist ?? 0}
                </span>{" "}
                en Watchlist
              </div>
            </div>
          </div>

          {/* Sello Gigante de Sofa Knowledge Global */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-cine-950/80 flex flex-col items-center text-center gap-1 shadow-gold-glow w-full sm:w-auto">
            <span className="text-[11px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1">
              🛋️ SOFA KNOWLEDGE SCORE
            </span>
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
              {stats.globalBallKnowledge !== null
                ? `${stats.globalBallKnowledge}%`
                : "—"}
            </div>
            <p className="text-[11px] text-cine-400 max-w-[200px] leading-tight">
              {stats.globalBallKnowledge !== null
                ? `Tu criterio coincide un ${stats.globalBallKnowledge}% con la valoración media de IMDb.`
                : "Puntúa tus primeras películas para calcular tu índice."}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Mi Carrera Cinematográfica (Niveles y Gamificación) */}
      <CinephileLevelBar
        level={stats.level}
        totalXp={stats.totalXp}
        rankTitle={stats.rankTitle}
        rankIcon={stats.rankIcon}
        rankColor={stats.rankColor}
        xpProgressPercent={stats.xpProgressPercent}
        currentLevelBaseXp={stats.currentLevelBaseXp}
        nextLevelXp={stats.nextLevelXp}
      />

      {/* 2.5 Vitrina de Trofeos & Medallas */}
      {achievementsData && (
        <section className="pt-2">
          <AchievementsShowcase
            achievements={achievementsData.achievements}
            totalUnlocked={achievementsData.totalUnlocked}
            totalAvailable={achievementsData.totalAvailable}
            completionRate={achievementsData.completionRate}
            totalXpEarned={achievementsData.totalXpEarned}
            userName={profileData.displayName}
            universe="CINE"
          />
        </section>
      )}

      {/* 3. Estadísticas Divertidas Automáticas */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white tracking-wide">
            Highlights Cinéfilos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="glass-panel p-4 rounded-2xl border border-cine-800 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl flex-shrink-0">
              🎬
            </div>
            <div>
              <div className="text-xs text-cine-400 font-medium">
                Volumen de visionados
              </div>
              <div className="text-sm font-bold text-white">
                Has visto{" "}
                <span className="text-amber-400 font-mono">
                  {stats.totalWatched}
                </span>{" "}
                películas
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-cine-800 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-xl flex-shrink-0">
              ⭐
            </div>
            <div>
              <div className="text-xs text-cine-400 font-medium">
                Criterio cuantitativo
              </div>
              <div className="text-sm font-bold text-white">
                Tu nota media es{" "}
                <span className="text-amber-400 font-mono">
                  {stats.averageRating ? `${stats.averageRating} / 10` : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-cine-800 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-xl flex-shrink-0">
              🛋️
            </div>
            <div>
              <div className="text-xs text-cine-400 font-medium">
                Precisión comunitaria
              </div>
              <div className="text-sm font-bold text-white">
                Sofa Knowledge global:{" "}
                <span className="text-emerald-400 font-mono">
                  {stats.globalBallKnowledge !== null
                    ? `${stats.globalBallKnowledge}%`
                    : "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-cine-800 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-xl flex-shrink-0">
              🔥
            </div>
            <div>
              <div className="text-xs text-cine-400 font-medium">
                Tu género predilecto
              </div>
              <div className="text-sm font-bold text-white">
                {stats.topGenre ? stats.topGenre : "Aún por definir"}
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-cine-800 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-xl flex-shrink-0">
              💀
            </div>
            <div>
              <div className="text-xs text-cine-400 font-medium">
                Tu peor valoración
              </div>
              <div className="text-sm font-bold text-white">
                {stats.lowestRatedMovie ? (
                  <>
                    <span className="text-red-400 font-mono">
                      {stats.lowestRatedMovie.userRating.toFixed(1)}/10
                    </span>{" "}
                    en{" "}
                    <span className="text-cine-300 italic">
                      {stats.lowestRatedMovie.title}
                    </span>
                  </>
                ) : (
                  "—"
                )}
              </div>
            </div>
          </div>

          <div className="glass-panel p-4 rounded-2xl border border-cine-800 flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-xl flex-shrink-0">
              🧠
            </div>
            <div>
              <div className="text-xs text-cine-400 font-medium">
                Mayor coincidencia
              </div>
              <div className="text-sm font-bold text-white truncate">
                {stats.biggestW ? (
                  <>
                    <span className="text-purple-300 font-mono">
                      {stats.biggestW.ballKnowledge}%
                    </span>{" "}
                    en{" "}
                    <span className="text-cine-300 italic">
                      {stats.biggestW.title}
                    </span>
                  </>
                ) : (
                  "—"
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Rankings Personales: Biggest W vs Biggest L */}
      {(stats.biggestW || stats.biggestL) && (
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold text-white tracking-wide">
              Rankings de Precisión (W & L)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Biggest W */}
            {stats.biggestW && (
              <div className="glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-cine-900 to-emerald-950/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👑</span>
                    <h3 className="font-bold text-white text-base">
                      BIGGEST W
                    </h3>
                  </div>
                  <BallKnowledgeBadge
                    score={stats.biggestW.ballKnowledge}
                    size="sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {stats.biggestW.posterPath && (
                    <img
                      src={stats.biggestW.posterPath}
                      alt={stats.biggestW.title}
                      className="w-16 h-24 object-cover rounded-xl shadow border border-white/10"
                    />
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-base">
                      {stats.biggestW.title}
                    </h4>
                    <p className="text-xs text-cine-300">
                      Coincidencia casi idéntica con el consenso de IMDb.
                    </p>
                    <div className="flex items-center gap-3 text-xs font-mono pt-1">
                      <span className="text-amber-400 font-bold">
                        Tú: {stats.biggestW.userRating.toFixed(1)}
                      </span>
                      <span className="text-cine-500">vs</span>
                      <span className="text-cine-300">
                        IMDb: {stats.biggestW.imdbRating.toFixed(1)}
                      </span>
                      <span className="text-emerald-400 font-semibold">
                        (Diff:{" "}
                        {stats.biggestW.diff > 0
                          ? `+${stats.biggestW.diff}`
                          : stats.biggestW.diff}
                        )
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Biggest L */}
            {stats.biggestL && (
              <div className="glass-panel p-5 rounded-3xl border border-red-500/30 bg-gradient-to-br from-cine-900 to-red-950/20 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🤡</span>
                    <h3 className="font-bold text-white text-base">
                      BIGGEST L
                    </h3>
                  </div>
                  <BallKnowledgeBadge
                    score={stats.biggestL.ballKnowledge}
                    size="sm"
                  />
                </div>

                <div className="flex items-center gap-4">
                  {stats.biggestL.posterPath && (
                    <img
                      src={stats.biggestL.posterPath}
                      alt={stats.biggestL.title}
                      className="w-16 h-24 object-cover rounded-xl shadow border border-white/10"
                    />
                  )}
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-base">
                      {stats.biggestL.title}
                    </h4>
                    <p className="text-xs text-cine-300">
                      Tu mayor discrepancia respecto a la nota comunitaria de
                      IMDb.
                    </p>
                    <div className="flex items-center gap-3 text-xs font-mono pt-1">
                      <span className="text-amber-400 font-bold">
                        Tú: {stats.biggestL.userRating.toFixed(1)}
                      </span>
                      <span className="text-cine-500">vs</span>
                      <span className="text-cine-300">
                        IMDb: {stats.biggestL.imdbRating.toFixed(1)}
                      </span>
                      <span className="text-red-400 font-semibold">
                        (Diff:{" "}
                        {stats.biggestL.diff > 0
                          ? `+${stats.biggestL.diff}`
                          : stats.biggestL.diff}
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

      {/* 5. Gráficos Analíticos (Recharts) */}
      <section className="space-y-6">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl font-bold text-white tracking-wide">
            Analítica Cinematográfica
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Distribución de Notas */}
          <div className="glass-panel p-5 rounded-3xl border border-cine-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Distribución de mis valoraciones</span>
              <span className="text-xs text-cine-400 font-normal">
                0 a 10 Estrellas
              </span>
            </h3>
            <RatingDistributionChart data={stats.ratingDistribution} />
          </div>

          {/* Géneros Más Vistos */}
          <div className="glass-panel p-5 rounded-3xl border border-cine-800 space-y-3">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Géneros más frecuentes</span>
              <span className="text-xs text-cine-400 font-normal">
                Volumen & Nota media
              </span>
            </h3>
            <GenreChart data={stats.genreCounts} />
          </div>

          {/* Línea Temporal de Visionados */}
          <div className="glass-panel p-5 rounded-3xl border border-cine-800 space-y-3 lg:col-span-2">
            <h3 className="text-sm font-bold text-white flex items-center justify-between">
              <span>Evolución de visionados mensuales</span>
              <span className="text-xs text-cine-400 font-normal">
                Ritmo cinematográfico
              </span>
            </h3>
            <WatchesTimelineChart data={stats.watchesByMonth} />
          </div>
        </div>
      </section>

      {/* Modal Moderno de Edición de Perfil Cinéfilo */}
      <EditCinephileProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSaved={fetchProfile}
        initialName={profileData.displayName}
        initialBio={profileData.bio}
        initialAvatar={profileData.avatarUrl}
      />

      {/* Modal de Social Wrapped */}
      <SocialWrappedModal
        isOpen={isWrappedOpen}
        onClose={() => setIsWrappedOpen(false)}
        universe="CINE"
        user={{
          displayName: profileData.displayName,
          username: session?.user?.username,
          avatarUrl: profileData.avatarUrl,
        }}
        stats={{
          totalMovies: stats.totalWatched,
          totalSeries: 0,
          totalHours: 0,
          totalCompletedGames: 0,
          ballKnowledge: stats.globalBallKnowledge,
          gameKnowledge: null,
        }}
        achievements={achievementsData?.achievements || []}
      />
    </div>
  );
}
