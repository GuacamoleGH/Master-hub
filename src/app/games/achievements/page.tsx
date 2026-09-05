"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  Award,
  Gamepad2,
  Sparkles,
  ArrowLeft,
  Loader2,
  Shield,
  Zap,
} from "lucide-react";
import AchievementsShowcase from "@/components/profile/AchievementsShowcase";
import GamerLevelBar from "@/components/games/GamerLevelBar";
import { UserAchievement } from "@/lib/achievements";

export default function GamerAchievementsPage() {
  const [achievementsData, setAchievementsData] = useState<{
    achievements: UserAchievement[];
    totalUnlocked: number;
    totalAvailable: number;
    completionRate: number;
    totalXpEarned: number;
  } | null>(null);

  const [profileData, setProfileData] = useState<{
    displayName: string;
    totalXp: number;
    rankTitle: string;
    level: number;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [achRes, profRes] = await Promise.all([
          fetch("/api/profile/achievements"),
          fetch("/api/games/profile"),
        ]);

        if (achRes.ok) {
          const achJson = await achRes.json();
          setAchievementsData(achJson);
        }

        if (profRes.ok) {
          const profJson = await profRes.json();
          setProfileData({
            displayName: profJson.profile?.displayName || "Gamer",
            totalXp: profJson.stats?.totalXp || 0,
            rankTitle: profJson.stats?.rankTitle || "Novato",
            level: profJson.stats?.level || 1,
          });
        }
      } catch (err) {
        console.error("Error al cargar logros de gaming:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-purple-400 animate-spin" />
        <span className="text-xs text-cine-400 font-mono">
          Cargando vitrina de trofeos gamer...
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Cabecera de Navegación y Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link
            href="/games/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Perfil Gamer</span>
          </Link>
        </div>

        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-cine-900 to-cine-950 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  <Gamepad2 className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                  Sello de Maestría Gamer
                </span>
                {profileData?.rankTitle && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    {profileData.rankTitle}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                Vitrina de Trofeos & Medallas Gamer
              </h1>
              <p className="text-xs sm:text-sm text-cine-300 max-w-xl leading-relaxed">
                Desbloquea hitos únicos registrando tus sesiones, conquistando
                platinos, acumulando horas de juego y defendiendo tus notas
                frente al consenso de Metacritic.
              </p>
            </div>

            {profileData && (
              <div className="w-full md:w-auto md:min-w-[320px]">
                <GamerLevelBar totalXp={profileData.totalXp} />
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Vitrina Completa de Trofeos Gamer */}
      {achievementsData && (
        <section>
          <AchievementsShowcase
            achievements={achievementsData.achievements}
            totalUnlocked={achievementsData.totalUnlocked}
            totalAvailable={achievementsData.totalAvailable}
            completionRate={achievementsData.completionRate}
            totalXpEarned={achievementsData.totalXpEarned}
            userName={profileData?.displayName || "Gamer"}
            universe="GAMING"
          />
        </section>
      )}
    </div>
  );
}
