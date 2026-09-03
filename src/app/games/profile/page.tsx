'use client';

import React, { useState, useEffect } from 'react';
import {
  Gamepad2,
  Clock,
  Award,
  Star,
  Brain,
  Layers,
  Sparkles,
  Loader2,
  Tv,
  Flame,
  BarChart3,
} from 'lucide-react';
import { GamerStats } from '@/types/game';
import GamerLevelBar from '@/components/games/GamerLevelBar';
import CriticVsYouChart from '@/components/games/CriticVsYouChart';
import HotTakesTable from '@/components/games/HotTakesTable';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

export default function GamerProfilePage() {
  const [profileData, setProfileData] = useState<{
    profile: { displayName: string; bio: string | null; avatarUrl: string | null };
    stats: GamerStats;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const res = await fetch('/api/games/profile');
      if (res.ok) {
        const data = await res.json();
        setProfileData(data);
      }
    } catch (err) {
      console.error('Error al cargar perfil gamer:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        <p className="text-xs text-cine-400 font-mono">Calculando telemetría de juego y Game Knowledge...</p>
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
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt={profile.displayName}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.4)]"
              />
            ) : (
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-purple-900/60 border-2 border-purple-400/50 flex items-center justify-center text-purple-300">
                <Gamepad2 className="w-10 h-10" />
              </div>
            )}

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                  Perfil de Jugador
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  {stats.rankTitle}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {profile.displayName}
              </h1>

              <p className="text-xs sm:text-sm text-cine-300 max-w-lg">
                {profile.bio || 'Jugador y analista del catálogo universal de videojuegos.'}
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
          <div className="text-[11px] text-cine-500 mt-1">Tiempo de vida en videojuegos</div>
        </div>

        {/* Campañas Completadas */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Award className="w-4 h-4 text-purple-400" /> Completados
          </div>
          <div className="text-3xl font-black text-purple-300 font-mono">
            {stats.totalCompleted}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            {stats.totalPlatinum > 0 ? `${stats.totalPlatinum} platinos al 100%` : 'Campañas finalizadas'}
          </div>
        </div>

        {/* Game Knowledge Global */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Brain className="w-4 h-4 text-cyan-400" /> Game Knowledge
          </div>
          <div className="text-3xl font-black text-cyan-400 font-mono">
            {stats.globalGameKnowledge ? `${stats.globalGameKnowledge}%` : '—'}
          </div>
          <div className="text-[11px] text-cine-500 mt-1">Afinidad global vs Metacritic</div>
        </div>

        {/* Nota Media vs Crítica */}
        <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-cine-900/60">
          <div className="flex items-center gap-2 text-xs font-semibold text-cine-400 mb-1">
            <Star className="w-4 h-4 text-purple-400 fill-purple-400" /> Tu Nota Media
          </div>
          <div className="text-3xl font-black text-purple-400 font-mono">
            {stats.averageRating ? `${stats.averageRating}` : '—'}
            <span className="text-xs font-normal text-cine-500 font-sans"> / 10</span>
          </div>
          <div className="text-[11px] text-cine-500 mt-1">
            Crítica promedio: {stats.averageMetacritic ? `${stats.averageMetacritic}/10` : '—'}
          </div>
        </div>
      </section>

      {/* Gráfica Critic vs You */}
      <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/20 bg-cine-950 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cine-800 pb-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-purple-400" />
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              Critic vs You (Metacritic vs Tu Veredicto)
            </h2>
          </div>
          <p className="text-xs text-cine-400">
            Comparativa directa de calificaciones por título
          </p>
        </div>

        <CriticVsYouChart data={stats.criticVsYou} />
      </section>

      {/* Tabla: Tus Hot Takes */}
      <section className="glass-panel rounded-3xl border border-purple-500/20 overflow-hidden bg-cine-950 space-y-0">
        <div className="p-6 border-b border-cine-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-rose-400 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide">
              Tus Hot Takes 🔥
            </h2>
          </div>
          <span className="text-xs text-cine-400">
            Discrepancias y sintonías frente a la prensa
          </span>
        </div>

        <HotTakesTable hotTakes={stats.hotTakes} />
      </section>

      {/* Grid de 2 Columnas: Horas por Plataforma & Horas por Género */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Horas por Plataforma */}
        <section className="glass-panel p-6 rounded-3xl border border-purple-500/20 bg-cine-950 space-y-4">
          <div className="flex items-center gap-2 border-b border-cine-800 pb-3">
            <Tv className="w-4 h-4 text-cyan-400" />
            <h3 className="text-base font-bold text-white">Horas por Plataforma</h3>
          </div>

          {stats.hoursByPlatform.length === 0 ? (
            <div className="h-56 flex items-center justify-center text-xs text-cine-500 italic">
              Registra juegos con plataformas para ver tus horas.
            </div>
          ) : (
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.hoursByPlatform}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#232635" horizontal={false} />
                  <XAxis type="number" stroke="#71717A" fontSize={11} tickLine={false} />
                  <YAxis
                    dataKey="platform"
                    type="category"
                    stroke="#71717A"
                    fontSize={11}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090A10',
                      borderColor: '#8B5CF6',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`${val} horas`, 'Tiempo']}
                  />
                  <Bar dataKey="hours" fill="#06B6D4" radius={[0, 4, 4, 0]} maxBarSize={22} />
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
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={stats.hoursByGenre.slice(0, 6)}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 30, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#232635" horizontal={false} />
                  <XAxis type="number" stroke="#71717A" fontSize={11} tickLine={false} />
                  <YAxis
                    dataKey="genre"
                    type="category"
                    stroke="#71717A"
                    fontSize={11}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#090A10',
                      borderColor: '#8B5CF6',
                      borderRadius: '12px',
                      fontSize: '12px',
                    }}
                    formatter={(val: any) => [`${val} horas`, 'Tiempo']}
                  />
                  <Bar dataKey="hours" fill="#8B5CF6" radius={[0, 4, 4, 0]} maxBarSize={22} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
