"use client";

import React from "react";
import { Sparkles, Trophy } from "lucide-react";

interface CinephileLevelBarProps {
  level: number;
  totalXp: number;
  rankTitle: string;
  rankIcon: string;
  rankColor: string;
  xpProgressPercent: number;
  currentLevelBaseXp: number;
  nextLevelXp: number;
}

export default function CinephileLevelBar({
  level,
  totalXp,
  rankTitle,
  rankIcon,
  rankColor,
  xpProgressPercent,
  currentLevelBaseXp,
  nextLevelXp,
}: CinephileLevelBarProps) {
  const currentXpInLevel = totalXp - currentLevelBaseXp;
  const xpNeededForNext = nextLevelXp - currentLevelBaseXp;

  return (
    <div className="glass-panel rounded-2xl p-6 relative overflow-hidden border border-amber-500/20 shadow-gold-glow">
      {/* Luz ambiental decorativa */}
      <div
        className="absolute -right-16 -top-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: rankColor }}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4 relative z-10">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-md border border-white/10"
            style={{ backgroundColor: `${rankColor}20` }}
          >
            {rankIcon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-amber-400/90 font-semibold flex items-center gap-1">
                <Trophy className="w-3 h-3" /> Mi Carrera Cinematográfica
              </span>
            </div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {rankTitle.toUpperCase()}{" "}
              <span className="text-amber-400">LVL. {level}</span>
            </h3>
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-cine-400">Experiencia Total</div>
          <div className="text-lg font-mono font-bold text-amber-400 flex items-center justify-end gap-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
            {totalXp} XP
          </div>
        </div>
      </div>

      {/* Barra de progreso interactiva */}
      <div className="space-y-1.5 relative z-10">
        <div className="flex justify-between text-xs text-cine-400 font-mono">
          <span>
            {currentXpInLevel} / {xpNeededForNext} XP para Lvl. {level + 1}
          </span>
          <span className="font-bold text-amber-400">{xpProgressPercent}%</span>
        </div>

        <div className="w-full h-3 bg-cine-800 rounded-full overflow-hidden p-0.5 border border-white/5">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400 shadow-sm"
            style={{ width: `${Math.max(4, xpProgressPercent)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
