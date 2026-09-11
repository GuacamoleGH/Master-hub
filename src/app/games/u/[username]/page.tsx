"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Gamepad2,
  Share2,
  Calendar,
  Star,
  Trophy,
  Clock,
  Layers,
  Check,
  Loader2,
  AlertCircle,
  Brain,
  Award,
  ArrowRight,
  Tv,
  Camera,
  Edit2,
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
import TopFiveCard, { TopFiveItem } from "@/components/profile/TopFiveCard";
import WatchedCatalogSection, {
  WatchedCatalogItem,
} from "@/components/profile/WatchedCatalogSection";
import AffinityCard from "@/components/profile/AffinityCard";
import SocialWrappedModal from "@/components/profile/SocialWrappedModal";
import { UserAchievement } from "@/lib/achievements";
import { sounds } from "@/lib/sounds";
import { useToast } from "@/components/shared/ToastContext";

interface PublicGamerProfileData {
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
  gaming: {
    totalCompleted: number;
    totalBacklog: number;
    totalHours: number;
    totalPlatinum?: number;
    averageRating: number | null;
    averageMetacritic?: number | null;
    globalGameKnowledge: number | null;
    totalXp?: number;
    level: number;
    rankTitle: string;
    rankIcon: string;
    topGenre?: string | null;
    topPlatform?: string | null;
    topGames: any[];
    gamesCatalog?: WatchedCatalogItem[];
    recentGames: any[];
    longestGame?: { title: string; cover: string | null; hours: number } | null;
    highestRatedGame?: { title: string; cover: string | null; rating: number } | null;
    lowestRatedGame?: { title: string; cover: string | null; rating: number } | null;
    averageCompletionHours?: number | null;
    statusBreakdown?: {
      completed: number;
      playing: number;
      backlog: number;
      platinum: number;
      abandoned: number;
    };
    ratingDistribution?: { rating: number; count: number }[];
    hoursByPlatform?: any[];
    hoursByGenre?: any[];
    criticVsYou?: any[];
    hotTakes?: any[];
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

export default function PublicGamerProfilePage() {
  const params = useParams();
  const username = params?.username as string;
  const toast = useToast();

  const [data, setData] = useState<PublicGamerProfileData | null>(null);
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
        "¡Enlace de perfil gamer copiado!",
        "Compártelo con tus amigos para que exploren tu biblioteca.",
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
          Cargando perfil gamer de @{username}...
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
          href="/games"
          className="mt-2 px-4 py-2 bg-cine-800 hover:bg-cine-700 text-white rounded-xl text-xs font-semibold transition-colors"
        >
          Volver a Videojuegos
        </Link>
      </div>
    );
  }

  const { user, isOwner, gaming, affinity } = data;

  // Formatear Top 5 Gaming
  const topFiveGames: TopFiveItem[] = (gaming.topGames || []).map((g: any) => ({
    id: g.id,
    title: g.title || g.game?.title,
    image: g.image ?? g.posterPath ?? g.game?.backgroundImage,
    year: g.year ?? (g.game?.released ? g.game.released.split("-")[0] : null),
    rating: g.rating ?? g.userRating,
    isFavorite: g.isFavorite,
    link: g.link || (g.game ? `/games/${g.game.rawgId}` : "#"),
    mediaType: "game" as const,
  }));

  const memberYear = user.createdAt
    ? new Date(user.createdAt).getFullYear()
    : 2026;

  return (
    <div className="space-y-10 pb-20 animate-fade-in">
      {/* 1. Cabecera Principal del Perfil Gamer Público */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-cine-900 to-cine-950 shadow-2xl relative overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none bg-purple-600/10" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 flex-1 min-w-0">
            {/* Avatar */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.3)] shrink-0 bg-cine-900 flex items-center justify-center">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || user.username || "Usuario"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center font-black text-white text-3xl bg-gradient-to-br from-purple-700 to-indigo-900">
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
                <span className="text-xs font-mono px-2 py-0.5 rounded-lg border text-purple-300 bg-purple-950/60 border-purple-500/30">
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
                  "Explorador de mundos interactivos y coleccionista de aventuras gamer en MasterHub."}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] text-cine-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-cine-500" />
                  Miembro desde {memberYear}
                </span>
                <span>•</span>
                <span className="text-purple-400 font-medium">
                  {gaming.totalCompleted} juegos completados
                </span>
              </div>
            </div>

            {/* Botones de acción */}
            <div className="flex flex-row sm:flex-col gap-2.5 shrink-0 self-start sm:self-center sm:ml-auto">
              {isOwner && (
                <Link
                  href="/games/profile"
                  className="justify-center px-3.5 py-1.5 bg-cine-800/80 hover:bg-purple-500/20 text-cine-200 hover:text-white border border-cine-700 hover:border-purple-500/40 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Editar perfil gamer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>Editar Perfil</span>
                </Link>
              )}

              <button
                type="button"
                onClick={handleShare}
                className="justify-center px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer border bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 hover:text-white border-purple-500/40"
                title="Copiar enlace a este perfil gamer público"
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
                className="justify-center px-3.5 py-1.5 font-black rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                title="Generar tarjeta de resumen para redes sociales"
              >
                <Camera className="w-3.5 h-3.5" />
                <span>Gamer Hub Wrapped</span>
              </button>
            </div>
          </div>

          {/* Barra de Nivel Gamer en Cabecera */}
          <div className="w-full lg:w-auto lg:min-w-[320px] shrink-0">
            <GamerLevelBar totalXp={gaming.totalXp ?? user.totalXp ?? 0} />
          </div>
        </div>
      </section>

      {/* 2. Comparador de Afinidad (Si es otro usuario visitando) */}
      <AffinityCard
        affinity={affinity}
        targetUsername={user.username || "usuario"}
      />

      {/* 3. Contenido Principal del Perfil Gamer */}
      {/* Highlights Rápidos de Gaming */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Horas Jugadas */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Clock className="w-4 h-4 text-purple-400" /> Horas Jugadas
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {gaming.totalHours}
            <span className="text-xs font-normal text-cine-400"> hrs</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Tiempo invertido registrado
          </div>
        </div>

        {/* Títulos Terminados */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Trophy className="w-4 h-4 text-amber-400" /> Títulos Terminados
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {gaming.totalCompleted}
            <span className="text-xs font-normal text-cine-400"> juegos</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            {gaming.totalPlatinum ?? 0} trofeos Platino / 100%
          </div>
        </div>

        {/* Global Game Knowledge */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Brain className="w-4 h-4 text-purple-400" /> Game Knowledge
          </div>
          <div className="text-3xl font-black text-purple-400 font-mono">
            {gaming.globalGameKnowledge ? `${gaming.globalGameKnowledge}%` : "—"}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Frente al consenso de Metacritic
          </div>
        </div>

        {/* Nota Media vs Prensa */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Star className="w-4 h-4 text-purple-400 fill-purple-400" /> Tu Nota Media
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {gaming.averageRating || "—"}
            <span className="text-xs font-normal text-cine-400"> / 10</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Prensa:{" "}
            <strong className="text-cyan-400">
              {gaming.averageMetacritic || "—"}
            </strong>{" "}
            / 10
          </div>
        </div>
      </section>

      {/* Vitrina de Top 5 Videojuegos */}
      <section>
        <TopFiveCard
          type="gaming"
          title="Top 5 Videojuegos"
          items={topFiveGames}
        />
      </section>

      {/* Catálogo Completo de Videojuegos */}
      <WatchedCatalogSection
        type="gaming"
        items={gaming.gamesCatalog || []}
        isOwner={isOwner}
      />

      {/* Vitrina de Trofeos Gamer */}
      {data.achievements && (
        <section className="glass-panel p-6 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/30 via-cine-900 to-cine-950 shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cine-800/80 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                <Trophy className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">
                    Vitrina de Trofeos Gamer
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
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
              href="/games/achievements"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all cursor-pointer shrink-0"
            >
              <Award className="w-4 h-4" />
              <span>Explorar Todos los Logros Gamer</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Muestra de Trofeos Destacados */}
          <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {data.achievements.achievements
              .filter((a) => !a.universe || a.universe === "GAMING")
              .slice(0, 6)
              .map((ach) => (
                <div
                  key={ach.id}
                  className={`p-3 rounded-2xl border transition-all flex flex-col items-center text-center gap-2 ${
                    ach.isUnlocked
                      ? "bg-purple-950/30 border-purple-500/40 text-purple-200 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
                      : "bg-cine-900/40 border-cine-800 text-cine-500 opacity-60"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center text-base ${
                      ach.isUnlocked
                        ? "bg-purple-500/20 text-purple-300 border border-purple-500/50"
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

      {/* Récords y Métricas Extremas */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Récord: Partida Legendaria */}
        <div className="glass-panel p-5 rounded-3xl border border-purple-500/20 bg-cine-950 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>Partida Legendaria (Más Horas)</span>
          </div>

          {gaming.longestGame ? (
            <div className="flex items-center gap-3.5">
              {gaming.longestGame.cover && (
                <img
                  src={gaming.longestGame.cover}
                  alt={gaming.longestGame.title}
                  className="w-14 h-14 rounded-xl object-cover border border-purple-500/30 shadow-md shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {gaming.longestGame.title}
                </p>
                <p className="text-xl font-black text-purple-400 font-mono mt-0.5">
                  {gaming.longestGame.hours}{" "}
                  <span className="text-xs text-cine-400 font-normal">
                    horas jugadas
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-cine-500 italic py-3">
              Sin registros de tiempo prolongado todavía.
            </p>
          )}
        </div>

        {/* Récord: Obra Maestra */}
        <div className="glass-panel p-5 rounded-3xl border border-amber-500/20 bg-cine-950 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Obra Maestra Personal</span>
          </div>

          {gaming.highestRatedGame ? (
            <div className="flex items-center gap-3.5">
              {gaming.highestRatedGame.cover && (
                <img
                  src={gaming.highestRatedGame.cover}
                  alt={gaming.highestRatedGame.title}
                  className="w-14 h-14 rounded-xl object-cover border border-amber-500/30 shadow-md shrink-0"
                />
              )}
              <div className="min-w-0">
                <p className="text-sm font-bold text-white truncate">
                  {gaming.highestRatedGame.title}
                </p>
                <p className="text-xl font-black text-amber-400 font-mono mt-0.5">
                  ★ {gaming.highestRatedGame.rating}{" "}
                  <span className="text-xs text-cine-400 font-normal">/ 10</span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-cine-500 italic py-3">
              Sin videojuegos puntuados como obra maestra.
            </p>
          )}
        </div>

        {/* Estado del Catálogo */}
        <div className="glass-panel p-5 rounded-3xl border border-cyan-500/20 bg-cine-950 flex flex-col justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Ritmo y Biblioteca</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-2 rounded-xl bg-cine-900/80 border border-cine-800">
              <span className="text-cine-400 block text-[10px]">Jugando</span>
              <span className="text-base font-black text-white font-mono">
                {gaming.statusBreakdown?.playing ?? 0}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-cine-900/80 border border-cine-800">
              <span className="text-cine-400 block text-[10px]">Pendientes</span>
              <span className="text-base font-black text-white font-mono">
                {gaming.statusBreakdown?.backlog ?? gaming.totalBacklog}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-cine-900/80 border border-cine-800">
              <span className="text-cine-400 block text-[10px]">Media / Título</span>
              <span className="text-base font-black text-cyan-300 font-mono">
                {gaming.averageCompletionHours
                  ? `${gaming.averageCompletionHours}h`
                  : "—"}
              </span>
            </div>
            <div className="p-2 rounded-xl bg-cine-900/80 border border-cine-800">
              <span className="text-cine-400 block text-[10px]">Platinados</span>
              <span className="text-base font-black text-amber-400 font-mono">
                {gaming.statusBreakdown?.platinum ?? gaming.totalPlatinum ?? 0}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Distribución de Puntuaciones (1 al 10) */}
      {gaming.ratingDistribution &&
        gaming.ratingDistribution.some((d) => d.count > 0) && (
          <section className="glass-panel p-6 rounded-3xl border border-purple-500/20 bg-cine-950 space-y-4">
            <div className="flex items-center justify-between border-b border-cine-800 pb-3">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-purple-400" />
                <h3 className="text-base font-bold text-white">
                  Distribución de Puntuaciones
                </h3>
              </div>
              <span className="text-xs text-cine-400 font-mono">Escala 1 a 10</span>
            </div>

            <div className="w-full h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={gaming.ratingDistribution}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#232635"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="rating"
                    stroke="#71717A"
                    fontSize={11}
                    tickLine={false}
                    tickFormatter={(v) => `★ ${v}`}
                  />
                  <YAxis
                    stroke="#71717A"
                    fontSize={11}
                    tickLine={false}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#090A10",
                      borderColor: "#8B5CF6",
                      borderRadius: "12px",
                      fontSize: "12px",
                    }}
                    formatter={(val: any) => [`${val} juego(s)`, "Cantidad"]}
                    labelFormatter={(lbl) => `Nota ★ ${lbl}`}
                  />
                  <Bar
                    dataKey="count"
                    fill="#8B5CF6"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={30}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>
        )}

      {/* Critic vs You: Gráfica Comparativa con Metacritic */}
      {gaming.criticVsYou && gaming.criticVsYou.length > 0 && (
        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-cine-950 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cine-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-500 animate-pulse" />
                <h2 className="text-lg font-bold text-white">
                  Critic vs You (Metacritic vs Veredicto)
                </h2>
              </div>
              <p className="text-xs text-cine-400 mt-0.5">
                Comparativa directa entre el criterio del usuario y la media de analistas de Metacritic.
              </p>
            </div>
            <span className="text-[11px] font-mono text-cine-500">
              {gaming.criticVsYou.length} títulos contrastados
            </span>
          </div>

          <CriticVsYouChart data={gaming.criticVsYou} />
        </section>
      )}

      {/* Tabla de Hot Takes 🔥 */}
      {gaming.hotTakes && gaming.hotTakes.length > 0 && (
        <section className="space-y-4">
          <HotTakesTable hotTakes={gaming.hotTakes} />
        </section>
      )}

      {/* Horas por Plataforma y Horas por Género */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Horas por Plataforma */}
        {gaming.hoursByPlatform && (
          <section className="glass-panel p-6 rounded-3xl border border-purple-500/20 bg-cine-950 space-y-4">
            <div className="flex items-center gap-2 border-b border-cine-800 pb-3">
              <Tv className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">
                Horas por Plataforma
              </h3>
            </div>

            {gaming.hoursByPlatform.length === 0 ? (
              <div className="h-56 flex items-center justify-center text-xs text-cine-500 italic">
                Sin registros de plataformas todavía.
              </div>
            ) : (
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={gaming.hoursByPlatform}
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
                        return [`${val} hrs${countStr}${pct}`, "Tiempo"];
                      }}
                    />
                    <Bar
                      dataKey="hours"
                      fill="#38BDF8"
                      radius={[0, 4, 4, 0]}
                      maxBarSize={22}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>
        )}

        {/* Horas por Género */}
        {gaming.hoursByGenre && (
          <section className="glass-panel p-6 rounded-3xl border border-purple-500/20 bg-cine-950 space-y-4">
            <div className="flex items-center gap-2 border-b border-cine-800 pb-3">
              <Gamepad2 className="w-4 h-4 text-purple-400" />
              <h3 className="text-base font-bold text-white">
                Horas por Género
              </h3>
            </div>

            {gaming.hoursByGenre.length === 0 ? (
              <div className="h-56 flex items-center justify-center text-xs text-cine-500 italic">
                Sin registros de géneros todavía.
              </div>
            ) : (
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={gaming.hoursByGenre.slice(0, 7)}
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
                      width={115}
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
        )}
      </div>

      {/* Modal de Social Wrapped Gamer */}
      <SocialWrappedModal
        isOpen={isWrappedOpen}
        onClose={() => setIsWrappedOpen(false)}
        universe="GAMING"
        user={{
          displayName: user.name || user.username || "Usuario",
          username: user.username,
          avatarUrl: user.image,
        }}
        stats={{
          totalMovies: 0,
          totalSeries: 0,
          totalHours: gaming.totalHours,
          totalCompletedGames: gaming.totalCompleted,
          totalPlatinum: gaming.totalPlatinum,
          averageRating: gaming.averageRating,
          ballKnowledge: null,
          gameKnowledge: gaming.globalGameKnowledge,
        }}
        topItems={topFiveGames.slice(0, 3)}
        achievements={data.achievements?.achievements || []}
      />
    </div>
  );
}
