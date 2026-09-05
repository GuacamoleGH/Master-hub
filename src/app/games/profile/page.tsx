"use client";

import React, { useState, useEffect } from "react";
import {
  LogIn,
  Gamepad2,
  Trophy,
  Clock,
  Layers,
  Tv,
  Star,
  Brain,
  Loader2,
  Bookmark,
  Edit3,
  Trash2,
  RefreshCw,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import GamerLevelBar from "@/components/games/GamerLevelBar";
import CriticVsYouChart from "@/components/games/CriticVsYouChart";
import HotTakesTable from "@/components/games/HotTakesTable";
import EditGamerProfileModal from "@/components/games/EditGamerProfileModal";
import AchievementsShowcase from "@/components/profile/AchievementsShowcase";
import SocialWrappedModal from "@/components/profile/SocialWrappedModal";
import { UserAchievement } from "@/lib/achievements";
import { GamerStats } from "@/types/game";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { sounds } from "@/lib/sounds";
import { Camera } from "lucide-react";

interface ProfileResponse {
  profile: {
    id: string;
    displayName: string;
    avatarUrl: string | null;
    bio: string | null;
  };
  stats: GamerStats;
}

export default function GamerProfilePage() {
  const { data: session } = useSession();
  const router = useRouter();

  const [profileData, setProfileData] = useState<ProfileResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [adminMsg, setAdminMsg] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);

  // Logros y Wrapped
  const [achievementsData, setAchievementsData] = useState<{
    achievements: UserAchievement[];
    totalUnlocked: number;
    totalAvailable: number;
    completionRate: number;
    totalXpEarned: number;
  } | null>(null);
  const [isWrappedOpen, setIsWrappedOpen] = useState(false);

  const handleOpenEdit = () => {
    sounds.playClick();
    if (!session?.user) {
      router.push("/login?callbackUrl=/games/profile");
      return;
    }
    setIsEditOpen(true);
  };

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const [resProfile, resAch] = await Promise.all([
        fetch("/api/games/profile"),
        fetch("/api/profile/achievements"),
      ]);

      if (resProfile.ok) {
        const data = await resProfile.json();
        setProfileData(data);
      }

      if (resAch.ok) {
        const dataAch = await resAch.json();
        setAchievementsData(dataAch);
      }
    } catch (err) {
      console.error("Error al cargar perfil gamer:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleAdminAction = async (action: "wipe" | "seed") => {
    if (action === "wipe") {
      const confirmWipe = window.confirm(
        "¿Estás seguro de que deseas vaciar tu base de datos de videojuegos? Se eliminarán todas las partidas, veredictos y progreso de nivel para empezar desde cero.",
      );
      if (!confirmWipe) return;
    }

    try {
      setIsActionLoading(true);
      setAdminMsg(null);
      const res = await fetch("/api/games/admin/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (res.ok) {
        setAdminMsg(data.message);
        await fetchProfile();
      } else {
        setAdminMsg(data.error || "Error al ejecutar acción");
      }
    } catch (err) {
      console.error(err);
      setAdminMsg("Error de conexión al ejecutar acción en la base de datos.");
    } finally {
      setIsActionLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        <span className="text-xs text-cine-400 font-mono">
          Calculando telemetría gamer...
        </span>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-xs text-cine-500">
        No se pudieron cargar los datos del perfil gamer.
      </div>
    );
  }

  const { profile, stats } = profileData;

  return (
    <div className="space-y-10 pb-16 animate-fade-in">
      {/* Cabecera del Perfil Gamer */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-cine-900 to-cine-950 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group/avatar w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.4)] flex-shrink-0 bg-cine-900 flex items-center justify-center text-purple-300">
              {profile.avatarUrl ? (
                <img
                  src={profile.avatarUrl}
                  alt={profile.displayName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Gamepad2 className="w-10 h-10" />
              )}
              <button
                type="button"
                onClick={handleOpenEdit}
                className="absolute inset-0 w-full h-full bg-black/80 backdrop-blur-xs opacity-0 group-hover/avatar:opacity-100 transition-all duration-200 flex flex-col items-center justify-center text-center p-0 m-0 cursor-pointer"
                title={
                  session?.user ? "Elegir insignia temática" : "Iniciar sesión"
                }
              >
                {session?.user ? (
                  <div className="flex flex-col items-center justify-center gap-1.5 text-purple-300">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="text-[11px] font-bold tracking-wide leading-none text-center">
                      Cambiar
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1.5 text-purple-300">
                    <LogIn className="w-5 h-5 text-purple-400" />
                    <span className="text-[11px] font-bold tracking-wide leading-none text-center">
                      Entrar
                    </span>
                  </div>
                )}
              </button>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                  Perfil de Jugador
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {stats.rankTitle}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {profile.displayName}
                </h1>
                <button
                  onClick={handleOpenEdit}
                  className="px-3 py-1 bg-cine-800/80 hover:bg-purple-600/30 text-purple-300 hover:text-white border border-purple-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title={
                    session?.user
                      ? "Editar perfil gamer"
                      : "Inicia sesión para editar tu perfil"
                  }
                >
                  {session?.user ? (
                    <>
                      <Edit3 className="w-3.5 h-3.5" />
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
                  className="px-3.5 py-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black rounded-xl text-xs flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer"
                  title="Generar tarjeta de resumen para redes sociales"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>MasterHub Wrapped</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-cine-300 max-w-lg">
                {profile.bio ||
                  "Jugador y analista del catálogo universal de videojuegos."}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto md:min-w-[340px]">
            <GamerLevelBar totalXp={stats.totalXp} />
          </div>
        </div>
      </section>

      {/* Highlights Rápidos */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Horas Totales */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Clock className="w-4 h-4 text-cyan-400" /> Horas en Pantalla
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {stats.totalHours}
            <span className="text-sm font-normal text-cyan-400"> h</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Top consola/tienda:{" "}
            <strong className="text-cine-300">
              {stats.topPlatform || "—"}
            </strong>
          </div>
        </div>

        {/* Completados */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Trophy className="w-4 h-4 text-amber-400" /> Títulos Terminados
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {stats.totalCompleted}
            <span className="text-xs font-normal text-cine-400"> juegos</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            {stats.totalPlatinum} trofeos Platino / 100%
          </div>
        </div>

        {/* Global Game Knowledge */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Brain className="w-4 h-4 text-purple-400" /> Game Knowledge
          </div>
          <div className="text-3xl font-black text-purple-400 font-mono">
            {stats.globalGameKnowledge ? `${stats.globalGameKnowledge}%` : "—"}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Frente al consenso de Metacritic
          </div>
        </div>

        {/* Nota Media vs Prensa */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Star className="w-4 h-4 text-purple-400 fill-purple-400" /> Tu Nota
            Media
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {stats.averageRating || "—"}
            <span className="text-xs font-normal text-cine-400"> / 10</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Prensa:{" "}
            <strong className="text-cyan-400">
              {stats.averageMetacritic || "—"}
            </strong>{" "}
            / 10
          </div>
        </div>
      </section>

      {/* Vitrina de Trofeos & Medallas */}
      {achievementsData && (
        <section className="pt-2">
          <AchievementsShowcase
            achievements={achievementsData.achievements}
            totalUnlocked={achievementsData.totalUnlocked}
            totalAvailable={achievementsData.totalAvailable}
            completionRate={achievementsData.completionRate}
            totalXpEarned={achievementsData.totalXpEarned}
            userName={profile.displayName}
            universe="GAMING"
          />
        </section>
      )}

      {/* Critic vs You: Gráfica Comparativa con Metacritic */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-cine-950 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cine-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
              <h2 className="text-lg font-bold text-white">
                Critic vs You (Metacritic vs Tu Veredicto)
              </h2>
            </div>
            <p className="text-xs text-cine-400 mt-0.5">
              Comparativa directa entre tu criterio de juego y la media de los
              analistas especializados.
            </p>
          </div>
          <span className="text-[11px] font-mono text-cine-500">
            {stats.criticVsYou.length} títulos contrastados
          </span>
        </div>

        <CriticVsYouChart data={stats.criticVsYou} />
      </section>

      {/* Tabla de Hot Takes 🔥 */}
      <section className="space-y-4">
        <HotTakesTable hotTakes={stats.hotTakes} />
      </section>

      {/* Horas por Plataforma y Horas por Género */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Horas por Plataforma */}
        <section className="glass-panel p-6 rounded-3xl border border-purple-500/20 bg-cine-950 space-y-4">
          <div className="flex items-center gap-2 border-b border-cine-800 pb-3">
            <Tv className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              Horas por Plataforma
            </h3>
          </div>

          {stats.hoursByPlatform.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-xs text-cine-500 italic">
              Registra juegos con plataformas para ver tus horas.
            </div>
          ) : (
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.hoursByPlatform}
                  layout="vertical"
                  margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#232635"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    stroke="#71717A"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="platform"
                    type="category"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    width={115}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090A10",
                      borderColor: "#8B5CF6",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    formatter={(val: any, name: any, item: any) => {
                      const count = item?.payload?.gameCount;
                      const countStr = count
                        ? ` (${count} juego${count > 1 ? "s" : ""})`
                        : "";
                      const pct = item?.payload?.percentage
                        ? ` · ${item.payload.percentage}%`
                        : "";
                      return [`${val} horas${countStr}${pct}`, "Tiempo"];
                    }}
                  />
                  <Bar
                    dataKey="hours"
                    fill="#06B6D4"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={22}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        {/* Horas por Género */}
        <section className="glass-panel p-6 rounded-3xl border border-purple-500/20 bg-cine-950 space-y-4">
          <div className="flex items-center gap-2 border-b border-cine-800 pb-3">
            <Layers className="w-4 h-4 text-purple-400" />
            <h3 className="text-base font-bold text-white">Horas por Género</h3>
          </div>

          {stats.hoursByGenre.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-xs text-cine-500 italic">
              Sin datos de géneros registrados.
            </div>
          ) : (
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.hoursByGenre.slice(0, 6)}
                  layout="vertical"
                  margin={{ top: 5, right: 25, left: 10, bottom: 5 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#232635"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    stroke="#71717A"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis
                    dataKey="genre"
                    type="category"
                    stroke="#94a3b8"
                    fontSize={11}
                    tickLine={false}
                    width={100}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090A10",
                      borderColor: "#8B5CF6",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    formatter={(val: any) => [`${val} horas`, "Tiempo"]}
                  />
                  <Bar
                    dataKey="hours"
                    fill="#8B5CF6"
                    radius={[0, 4, 4, 0]}
                    maxBarSize={22}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </div>

      {/* Modal para Editar Perfil Gamer */}
      <EditGamerProfileModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSaved={() => {
          fetchProfile();
        }}
        initialName={profile.displayName}
        initialBio={profile.bio}
        initialAvatar={profile.avatarUrl}
      />

      {/* Modal de Social Wrapped */}
      <SocialWrappedModal
        isOpen={isWrappedOpen}
        onClose={() => setIsWrappedOpen(false)}
        universe="GAMING"
        user={{
          displayName: profile.displayName,
          username: session?.user?.username,
          avatarUrl: profile.avatarUrl,
        }}
        stats={{
          totalMovies: 0,
          totalSeries: 0,
          totalHours: stats.totalHours,
          totalCompletedGames: stats.totalCompleted,
          totalPlatinum: stats.totalPlatinum,
          ballKnowledge: null,
          gameKnowledge: stats.globalGameKnowledge,
        }}
        achievements={achievementsData?.achievements || []}
      />
    </div>
  );
}
