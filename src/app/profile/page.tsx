"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
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

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<{
    displayName: string;
    avatarUrl: string | null;
    bio: string | null;
  }>({
    displayName: "Jose",
    avatarUrl: null,
    bio: "",
  });

  const [stats, setStats] = useState<ProfileStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Edición de perfil
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");
  const [editAvatar, setEditAvatar] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Acciones de administración (wipe / seed)
  const [adminMsg, setAdminMsg] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await fetch("/api/profile");
      if (res.ok) {
        const data = await res.json();
        setProfileData(data.profile);
        setStats(data.stats);
        setEditName(data.profile.displayName);
        setEditBio(data.profile.bio || "");
        setEditAvatar(data.profile.avatarUrl || "");
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

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: editName.trim(),
          bio: editBio.trim(),
          avatarUrl: editAvatar.trim() || null,
        }),
      });
      if (res.ok) {
        setIsEditing(false);
        fetchProfile();
      }
    } catch (err) {
      console.error("Error al guardar perfil:", err);
    } finally {
      setIsSavingProfile(false);
    }
  };

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
          <div className="flex items-center gap-5">
            {/* Avatar */}
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-amber-500/40 shadow-gold-glow flex-shrink-0 bg-cine-900 flex items-center justify-center text-3xl">
              {profileData.avatarUrl ? (
                <img
                  src={profileData.avatarUrl}
                  alt={profileData.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-10 h-10 text-cine-500" />
              )}
            </div>

            {/* Datos Personales */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {profileData.displayName}
                </h1>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="p-1.5 text-cine-400 hover:text-amber-400 hover:bg-cine-800 rounded-lg transition-colors"
                  title="Editar perfil"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-cine-300 max-w-lg leading-relaxed">
                {profileData.bio || "Explorador y crítico del séptimo arte."}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-cine-400">
                <span className="font-semibold text-white">
                  {stats.totalWatched}
                </span>{" "}
                películas vistas ·{" "}
                <span className="font-semibold text-white">
                  {stats.totalReviews}
                </span>{" "}
                reseñas escritas ·{" "}
                <span className="font-semibold text-white">
                  {stats.totalWatchlist}
                </span>{" "}
                en Watchlist
              </div>
            </div>
          </div>

          {/* Sello Gigante de Ball Knowledge Global */}
          <div className="glass-card p-4 sm:p-5 rounded-2xl border border-amber-500/30 bg-cine-950/80 flex flex-col items-center text-center gap-1 shadow-gold-glow w-full sm:w-auto">
            <span className="text-[11px] uppercase font-bold tracking-widest text-amber-400 flex items-center gap-1">
              🏀 BALL KNOWLEDGE SCORE
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

        {/* Formulario desplegable de edición rápida */}
        {isEditing && (
          <form
            onSubmit={handleSaveProfile}
            className="mt-6 pt-6 border-t border-cine-800 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            <div>
              <label className="text-xs text-cine-400 font-medium">
                Nombre para mostrar
              </label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-cine-950 border border-cine-700 rounded-xl text-xs text-white focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-cine-400 font-medium">
                URL del Avatar (foto)
              </label>
              <input
                type="url"
                value={editAvatar}
                onChange={(e) => setEditAvatar(e.target.value)}
                placeholder="https://..."
                className="w-full mt-1 px-3 py-2 bg-cine-950 border border-cine-700 rounded-xl text-xs text-white focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs text-cine-400 font-medium">
                Biografía
              </label>
              <input
                type="text"
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                className="w-full mt-1 px-3 py-2 bg-cine-950 border border-cine-700 rounded-xl text-xs text-white focus:border-amber-500"
              />
            </div>
            <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs text-cine-400 hover:text-white rounded-lg hover:bg-cine-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={isSavingProfile}
                className="px-4 py-1.5 bg-amber-500 hover:bg-amber-400 text-cine-950 font-bold rounded-lg text-xs shadow-gold-glow flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" /> Guardar cambios
              </button>
            </div>
          </form>
        )}
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
              🏀
            </div>
            <div>
              <div className="text-xs text-cine-400 font-medium">
                Precisión comunitaria
              </div>
              <div className="text-sm font-bold text-white">
                Ball Knowledge global:{" "}
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

      {/* 6. Gestión de Datos y Reinicio (Wipeout) */}
      <section className="glass-panel p-6 rounded-3xl border border-cine-800 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-white">
              Gestión de la Base de Datos Local
            </h3>
            <p className="text-xs text-cine-400 mt-0.5">
              Control total sobre tus datos locales almacenados en SQLite
              (`dev.db`).
            </p>
          </div>
        </div>

        {adminMsg && (
          <div className="p-3 bg-emerald-950/70 border border-emerald-800/80 rounded-xl text-emerald-300 text-xs font-semibold">
            {adminMsg}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => handleAdminAction("wipe")}
            disabled={isActionLoading}
            className="px-4 py-2 bg-red-950/60 hover:bg-red-900/80 border border-red-800/80 text-red-300 font-semibold rounded-xl text-xs transition-colors flex items-center gap-2"
          >
            <Trash2 className="w-3.5 h-3.5" /> Vaciar mis datos (Comenzar desde
            cero)
          </button>

          <button
            onClick={() => handleAdminAction("seed")}
            disabled={isActionLoading}
            className="px-4 py-2 bg-cine-900 hover:bg-cine-800 border border-cine-700 text-cine-200 font-semibold rounded-xl text-xs transition-colors flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Recargar catálogo de
            demostración
          </button>
        </div>
      </section>
    </div>
  );
}
