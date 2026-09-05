"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Film,
  Award,
  Sparkles,
  ArrowLeft,
  Loader2,
  Trophy,
  Clapperboard,
} from "lucide-react";
import AchievementsShowcase from "@/components/profile/AchievementsShowcase";
import CinephileLevelBar from "@/components/movies/CinephileLevelBar";
import { UserAchievement } from "@/lib/achievements";

export default function CinephileAchievementsPage() {
  const [achievementsData, setAchievementsData] = useState<{
    achievements: UserAchievement[];
    totalUnlocked: number;
    totalAvailable: number;
    completionRate: number;
    totalXpEarned: number;
  } | null>(null);

  const [profileData, setProfileData] = useState<{
    displayName: string;
    stats: any;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const [achRes, profRes] = await Promise.all([
          fetch("/api/profile/achievements?universe=CINE"),
          fetch("/api/profile"),
        ]);

        if (achRes.ok) {
          const achJson = await achRes.json();
          setAchievementsData(achJson);
        }

        if (profRes.ok) {
          const profJson = await profRes.json();
          setProfileData({
            displayName: profJson.profile?.displayName || "Cinéfilo",
            stats: profJson.stats || null,
          });
        }
      } catch (err) {
        console.error("Error al cargar logros cinéfilos:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        <span className="text-xs text-cine-400 font-mono">
          Cargando vitrina de trofeos cinéfilos...
        </span>
      </div>
    );
  }

  const stats = profileData?.stats;

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Cabecera de Navegación y Hero */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Link
            href="/profile"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Volver al Perfil Cinéfilo</span>
          </Link>
        </div>

        <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-cine-950 to-cine-900 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  <Film className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                  Sello de Maestría Cinéfila
                </span>
                {stats?.rankTitle && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    {stats.rankTitle}
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Vitrina de Trofeos & Medallas Cinéfilas
              </h1>
              <p className="text-xs sm:text-sm text-cine-300 max-w-xl leading-relaxed">
                Reclama medallas exclusivas registrando tus películas y series
                vistas, puntuando con precisión frente a IMDb y demostrando tu
                Sofa Knowledge.
              </p>
            </div>

            {stats && stats.level && (
              <div className="w-full md:w-auto md:min-w-[340px]">
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
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Vitrina Completa de Trofeos Cinéfilos */}
      {achievementsData && (
        <section>
          <AchievementsShowcase
            achievements={achievementsData.achievements}
            totalUnlocked={achievementsData.totalUnlocked}
            totalAvailable={achievementsData.totalAvailable}
            completionRate={achievementsData.completionRate}
            totalXpEarned={achievementsData.totalXpEarned}
            userName={profileData?.displayName || "Cinéfilo"}
            universe="CINE"
          />
        </section>
      )}
    </div>
  );
}
