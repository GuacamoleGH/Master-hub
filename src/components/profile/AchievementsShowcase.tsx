"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  Trophy,
  Award,
  Film,
  Clapperboard,
  Sparkles,
  Skull,
  Tv,
  Target,
  Gamepad2,
  CheckCircle,
  Clock,
  Zap,
  Crosshair,
  MessageSquare,
  Feather,
  Flame,
  Star,
  Brain,
  Compass,
  Crown,
  Lock,
  ChevronRight,
  ShieldCheck,
  Check,
} from "lucide-react";
import {
  UserAchievement,
  AchievementCategory,
  AchievementRarity,
  AchievementUniverse,
} from "@/lib/achievements";
import { sounds } from "@/lib/sounds";

interface AchievementsShowcaseProps {
  achievements: UserAchievement[];
  totalUnlocked?: number;
  totalAvailable?: number;
  completionRate?: number;
  totalXpEarned?: number;
  userName?: string;
  isCompact?: boolean;
  universe?: "CINE" | "GAMING" | "ALL";
}

const ICON_MAP: Record<string, React.ElementType> = {
  Film,
  Clapperboard,
  Sparkles,
  Skull,
  Tv,
  Target,
  Gamepad2,
  CheckCircle,
  Trophy,
  Award,
  Clock,
  Zap,
  Crosshair,
  MessageSquare,
  Feather,
  Flame,
  Star,
  Brain,
  Compass,
  Crown,
};

const RARITY_CONFIG: Record<
  AchievementRarity,
  {
    name: string;
    badgeBg: string;
    border: string;
    glow: string;
    color: string;
  }
> = {
  BRONZE: {
    name: "Bronce",
    badgeBg: "bg-amber-950/40 text-amber-400 border-amber-800/60",
    border: "border-amber-700/40 hover:border-amber-500/80",
    glow: "shadow-[0_0_15px_rgba(217,119,6,0.15)]",
    color: "text-amber-400",
  },
  SILVER: {
    name: "Plata",
    badgeBg: "bg-slate-800/60 text-slate-300 border-slate-600/60",
    border: "border-slate-500/40 hover:border-slate-300/80",
    glow: "shadow-[0_0_15px_rgba(203,213,225,0.2)]",
    color: "text-slate-300",
  },
  GOLD: {
    name: "Oro",
    badgeBg: "bg-yellow-950/40 text-yellow-300 border-yellow-700/60",
    border: "border-yellow-500/50 hover:border-yellow-400",
    glow: "shadow-[0_0_20px_rgba(234,179,8,0.25)]",
    color: "text-yellow-400",
  },
  DIAMOND: {
    name: "Diamante",
    badgeBg: "bg-cyan-950/50 text-cyan-300 border-cyan-500/60",
    border: "border-cyan-400/60 hover:border-cyan-300",
    glow: "shadow-[0_0_25px_rgba(6,182,212,0.35)]",
    color: "text-cyan-300",
  },
};

const CATEGORIES: { id: "ALL" | AchievementCategory; label: string }[] = [
  { id: "ALL", label: "Todos" },
  { id: "CINE", label: "Cine & Series" },
  { id: "GAMING", label: "Videojuegos" },
  { id: "CRITIC", label: "Reseñas" },
  { id: "MASTERY", label: "Maestría" },
];

export default function AchievementsShowcase({
  achievements,
  totalUnlocked,
  totalAvailable,
  completionRate,
  totalXpEarned = 0,
  userName = "Usuario",
  isCompact = false,
  universe,
}: AchievementsShowcaseProps) {
  const [mounted, setMounted] = useState(false);
  const [activeUniverseTab, setActiveUniverseTab] = useState<
    "ALL" | "CINE" | "GAMING"
  >(universe || "ALL");
  const [selectedCategory, setSelectedCategory] = useState<
    "ALL" | AchievementCategory
  >("ALL");
  const [activeModal, setActiveModal] = useState<UserAchievement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (universe) {
      setActiveUniverseTab(universe);
    }
  }, [universe]);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeModal]);

  // Filtrado por Universo (Cine, Gaming o Todo)
  const scopedAchievements = achievements.filter((ach) => {
    if (activeUniverseTab === "ALL") return true;
    if (activeUniverseTab === "CINE") {
      return ach.universe === "CINE";
    }
    if (activeUniverseTab === "GAMING") {
      return ach.universe === "GAMING";
    }
    return true;
  });

  // Métricas calculadas para el universo seleccionado
  const displayUnlocked = scopedAchievements.filter((a) => a.isUnlocked).length;
  const displayTotal = scopedAchievements.length;
  const displayRate =
    displayTotal > 0 ? Math.round((displayUnlocked / displayTotal) * 100) : 0;
  const displayXp = scopedAchievements
    .filter((a) => a.isUnlocked)
    .reduce((acc, a) => acc + a.xp, 0);

  // Categorías adaptadas al universo activo
  const dynamicCategories = [
    { id: "ALL" as const, label: "Todos los logros" },
    ...(activeUniverseTab !== "GAMING"
      ? [{ id: "CINE" as AchievementCategory, label: "Cine & Series" }]
      : []),
    ...(activeUniverseTab !== "CINE"
      ? [{ id: "GAMING" as AchievementCategory, label: "Videojuegos" }]
      : []),
    { id: "CRITIC" as AchievementCategory, label: "Crítica & Reseñas" },
    { id: "MASTERY" as AchievementCategory, label: "Maestría" },
  ];

  const filteredAchievements = scopedAchievements.filter((ach) => {
    if (selectedCategory === "ALL") return true;
    return ach.category === selectedCategory;
  });

  const handleOpenAchievement = (ach: UserAchievement) => {
    sounds.modalOpen();
    if (ach.isUnlocked) {
      setTimeout(() => sounds.achievement(), 90);
    }
    setActiveModal(ach);
  };

  const handleUniverseSwitch = (tab: "ALL" | "CINE" | "GAMING") => {
    sounds.whoosh();
    setActiveUniverseTab(tab);
    setSelectedCategory("ALL");
  };

  // Configuración visual según el universo
  const isCine = activeUniverseTab === "CINE";
  const isGaming = activeUniverseTab === "GAMING";

  return (
    <div className="space-y-6">
      {/* Selector de sub-universo si no está bloqueado por prop */}
      {!universe && (
        <div className="flex items-center gap-2 p-1 bg-cine-900/80 rounded-2xl border border-cine-800 w-fit">
          <button
            type="button"
            onClick={() => handleUniverseSwitch("ALL")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeUniverseTab === "ALL"
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-cine-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Todos</span>
          </button>
          <button
            type="button"
            onClick={() => handleUniverseSwitch("CINE")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeUniverseTab === "CINE"
                ? "bg-amber-500 text-cine-950 shadow-gold-glow"
                : "text-cine-400 hover:text-white"
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Cine & Series</span>
          </button>
          <button
            type="button"
            onClick={() => handleUniverseSwitch("GAMING")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeUniverseTab === "GAMING"
                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "text-cine-400 hover:text-white"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Videojuegos</span>
          </button>
        </div>
      )}

      {/* Cabecera de la Vitrina con Barra de Progreso */}
      <div
        className={`rounded-3xl border p-6 sm:p-7 backdrop-blur-xl relative overflow-hidden shadow-2xl transition-all ${
          isGaming
            ? "bg-gradient-to-br from-[#0c0d1e]/95 via-cine-950/90 to-[#0e1026]/80 border-purple-800/40"
            : isCine
              ? "bg-gradient-to-br from-[#1a1205]/95 via-cine-950/90 to-[#140e04]/80 border-amber-800/40"
              : "bg-gradient-to-br from-cine-900/90 via-cine-950/80 to-cine-900/60 border-cine-800/80"
        }`}
      >
        <div
          className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
            isGaming
              ? "bg-purple-600/15"
              : isCine
                ? "bg-amber-500/15"
                : "bg-amber-500/10"
          }`}
        />
        <div
          className={`absolute bottom-0 left-0 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
            isGaming
              ? "bg-cyan-500/10"
              : isCine
                ? "bg-yellow-500/10"
                : "bg-purple-500/10"
          }`}
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center gap-4">
            <div
              className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 shadow-lg ${
                isGaming
                  ? "bg-purple-600/20 border-purple-500/40 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                  : isCine
                    ? "bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-gold-glow"
                    : "bg-gradient-to-tr from-amber-500/20 via-yellow-500/30 to-amber-400/20 border-amber-500/40 text-amber-400 shadow-gold-glow"
              }`}
            >
              {isGaming ? (
                <Gamepad2 className="w-7 h-7" />
              ) : isCine ? (
                <Film className="w-7 h-7" />
              ) : (
                <Trophy className="w-7 h-7" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {isGaming
                    ? "Vitrina de Trofeos Gamer"
                    : isCine
                      ? "Vitrina de Trofeos Cinéfilos"
                      : "Sala de Trofeos & Medallas"}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-cine-400 mt-1">
                {isGaming
                  ? "Desbloquea medallas completando videojuegos, sumando horas y logrando platinos."
                  : isCine
                    ? "Desbloquea medallas registrando películas, series y afinando tu Sofa Knowledge."
                    : "Logros desbloqueables por tu trayectoria en Cine, Series y Videojuegos."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 bg-cine-950/60 border border-cine-800/80 px-5 py-3 rounded-2xl self-start md:self-auto">
            <div className="text-center">
              <span className="text-[10px] font-bold text-cine-400 uppercase tracking-wider block">
                Desbloqueados
              </span>
              <span
                className={`text-lg font-black font-mono ${
                  isGaming ? "text-purple-400" : "text-amber-400"
                }`}
              >
                {displayUnlocked}{" "}
                <span className="text-cine-500 text-xs font-normal">
                  / {displayTotal}
                </span>
              </span>
            </div>
            <div className="w-px h-8 bg-cine-800" />
            <div className="text-center">
              <span className="text-[10px] font-bold text-cine-400 uppercase tracking-wider block">
                Progreso
              </span>
              <span
                className={`text-lg font-black font-mono ${
                  isGaming ? "text-cyan-400" : "text-purple-400"
                }`}
              >
                {displayRate}%
              </span>
            </div>
            {displayXp > 0 && (
              <>
                <div className="w-px h-8 bg-cine-800" />
                <div className="text-center">
                  <span className="text-[10px] font-bold text-cine-400 uppercase tracking-wider block">
                    Puntos XP
                  </span>
                  <span className="text-lg font-black font-mono text-emerald-400">
                    +{displayXp}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Barra de progreso visual */}
        <div className="relative z-10 mt-6 pt-5 border-t border-cine-800/80">
          <div className="flex justify-between items-center text-xs font-medium text-cine-400 mb-2">
            <span>
              {isGaming
                ? "Progreso de logros Gamer"
                : isCine
                  ? "Progreso de logros Cinéfilos"
                  : "Completitud general de la colección"}
            </span>
            <span className="font-mono font-bold text-white">
              {displayRate}% completado
            </span>
          </div>
          <div className="w-full h-3 bg-cine-950/80 rounded-full border border-cine-800 overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-700 shadow-md ${
                isGaming
                  ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 shadow-[0_0_12px_rgba(168,85,247,0.5)]"
                  : isCine
                    ? "bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 shadow-gold-glow"
                    : "bg-gradient-to-r from-amber-500 via-purple-500 to-cyan-400"
              }`}
              style={{ width: `${Math.max(displayRate, 3)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Píldoras de Categorías */}
      {!isCompact && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {dynamicCategories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  sounds.filterBlip();
                  setSelectedCategory(cat.id);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? isGaming
                      ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                      : "bg-amber-500 text-cine-950 shadow-gold-glow"
                    : "bg-cine-900/60 hover:bg-cine-800/80 text-cine-300 border border-cine-800"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Rejilla de Medallas / Trofeos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((ach) => {
          const IconComponent = ICON_MAP[ach.iconName] || Award;
          const rarityCfg = RARITY_CONFIG[ach.rarity];

          return (
            <div
              key={ach.id}
              onClick={() => handleOpenAchievement(ach)}
              onMouseEnter={() => ach.isUnlocked && sounds.trophyHover()}
              className={`group relative rounded-2xl p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                ach.isUnlocked
                  ? `bg-gradient-to-br from-cine-900/90 via-cine-950 to-cine-900/50 ${rarityCfg.border} ${rarityCfg.glow} hover:-translate-y-1`
                  : "bg-cine-950/40 border-cine-900/80 hover:border-cine-800 opacity-70 hover:opacity-90"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                      ach.isUnlocked
                        ? `${rarityCfg.badgeBg} border shadow-md`
                        : "bg-cine-900/80 text-cine-600 border border-cine-800"
                    }`}
                  >
                    {ach.isUnlocked ? (
                      <IconComponent className={`w-6 h-6 ${rarityCfg.color}`} />
                    ) : (
                      <Lock className="w-5 h-5 text-cine-600" />
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${
                        ach.isUnlocked
                          ? rarityCfg.badgeBg
                          : "bg-cine-900 text-cine-500 border-cine-800"
                      }`}
                    >
                      {rarityCfg.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-cine-400 bg-cine-900/80 px-1.5 py-0.5 rounded-md border border-cine-800">
                      +{ach.xp} XP
                    </span>
                  </div>
                </div>

                <div className="mt-3.5">
                  <h4
                    className={`font-black text-sm tracking-tight flex items-center gap-1.5 ${
                      ach.isUnlocked
                        ? "text-white group-hover:text-amber-300 transition-colors"
                        : "text-cine-400"
                    }`}
                  >
                    {ach.title}
                    {ach.isUnlocked && (
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 inline" />
                    )}
                  </h4>
                  <p className="text-xs text-cine-400 mt-1 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              </div>

              {/* Barra de progreso de la medalla */}
              <div className="mt-4 pt-3 border-t border-cine-900/80">
                <div className="flex justify-between items-center text-[10px] font-mono text-cine-500 mb-1.5">
                  <span>{ach.isUnlocked ? "Completado" : "Progreso"}</span>
                  <span>
                    {ach.currentValue} / {ach.targetValue}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-cine-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      ach.isUnlocked ? "bg-emerald-400" : "bg-amber-500/60"
                    }`}
                    style={{ width: `${ach.progress}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal interactivo de detalle de logro - Portaled al Body con z-[100] */}
      {activeModal &&
        mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
            onClick={() => {
              sounds.modalClose();
              setActiveModal(null);
            }}
          >
            <div
              className="w-full max-w-md rounded-3xl bg-cine-950 border border-cine-700/80 p-7 shadow-2xl relative overflow-hidden text-center animate-slideUp"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

              <div
                className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center mb-4 ${
                  activeModal.isUnlocked
                    ? `${RARITY_CONFIG[activeModal.rarity].badgeBg} border shadow-lg scale-105`
                    : "bg-cine-900 text-cine-600 border border-cine-800"
                }`}
              >
                {React.createElement(ICON_MAP[activeModal.iconName] || Award, {
                  className: `w-10 h-10 ${
                    activeModal.isUnlocked
                      ? RARITY_CONFIG[activeModal.rarity].color
                      : "text-cine-500"
                  }`,
                })}
              </div>

              <span
                className={`inline-block text-xs font-mono font-bold px-3 py-1 rounded-full border mb-2 ${
                  activeModal.isUnlocked
                    ? RARITY_CONFIG[activeModal.rarity].badgeBg
                    : "bg-cine-900 text-cine-500 border-cine-800"
                }`}
              >
                Nivel: {RARITY_CONFIG[activeModal.rarity].name} • +
                {activeModal.xp} XP
              </span>

              <h3 className="text-2xl font-black text-white tracking-tight mt-1">
                {activeModal.title}
              </h3>

              <p className="text-sm text-cine-300 mt-2 leading-relaxed">
                {activeModal.description}
              </p>

              <div className="mt-5 p-4 rounded-2xl bg-cine-900/60 border border-cine-800 text-left">
                <div className="flex justify-between items-center text-xs text-cine-400 font-mono mb-2">
                  <span>Objetivo:</span>
                  <span className="font-bold text-white">
                    {activeModal.currentValue} / {activeModal.targetValue}
                  </span>
                </div>
                <div className="w-full h-2 bg-cine-950 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      activeModal.isUnlocked ? "bg-emerald-400" : "bg-amber-500"
                    }`}
                    style={{ width: `${activeModal.progress}%` }}
                  />
                </div>
                <div className="mt-3 text-[11px] text-cine-400">
                  {activeModal.isUnlocked ? (
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 inline" /> Logro
                      conseguido y añadido a tu vitrina.
                    </span>
                  ) : (
                    <span>
                      Faltan{" "}
                      {Math.max(
                        0,
                        activeModal.targetValue - activeModal.currentValue,
                      )}{" "}
                      para desbloquear esta medalla.
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => {
                  sounds.modalClose();
                  setActiveModal(null);
                }}
                className="mt-6 w-full py-3 rounded-2xl bg-cine-800 hover:bg-cine-700 text-white font-bold text-sm transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
