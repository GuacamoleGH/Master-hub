"use client";

import React from "react";
import { Trophy, Zap } from "lucide-react";
import { calculateGamerLevelAndRank } from "@/lib/gameKnowledge";

interface GamerLevelBarProps {
  totalXp: number;
}

export default function GamerLevelBar({ totalXp }: GamerLevelBarProps) {
  const {
    level,
    rankTitle,
    rankIcon,
    rankColor,
    currentLevelBaseXp,
    nextLevelXp,
    xpProgressPercent,
  } = calculateGamerLevelAndRank(totalXp);

  const xpInCurrentLevel = totalXp - currentLevelBaseXp;
  const xpNeededForNext = nextLevelXp - currentLevelBaseXp;

  return (
    <div className="glass-panel p-5 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-950/40 via-cine-900 to-cine-950 shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Nivel y Rango */}
        <div className="flex items-center gap-3.5">
          <div
            className="w-13 h-13 rounded-2xl flex items-center justify-center text-2xl border shadow-inner"
            style={{
              backgroundColor: `${rankColor}20`,
              borderColor: `${rankColor}50`,
            }}
          >
            <span>{rankIcon}</span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-purple-400 font-mono">
                Rango Gamer
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                Nvl. {level}
              </span>
            </div>
            <h3
              className="text-lg sm:text-xl font-black tracking-tight"
              style={{ color: rankColor }}
            >
              {rankTitle}
            </h3>
          </div>
        </div>

        {/* XP acumulada */}
        <div className="sm:text-right">
          <div className="text-xs text-cine-400 flex items-center sm:justify-end gap-1 font-medium">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />{" "}
            Experiencia Total
          </div>
          <div
            suppressHydrationWarning
            className="text-xl sm:text-2xl font-black text-white font-mono tracking-tight"
          >
            {(totalXp || 0).toLocaleString()}{" "}
            <span className="text-xs font-bold text-purple-400">XP</span>
          </div>
        </div>
      </div>

      {/* Barra de progreso interactiva */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-xs text-cine-400 font-mono">
          <span>
            Progreso nivel {level}:{" "}
            <strong className="text-purple-300">
              {xpInCurrentLevel} / {xpNeededForNext} XP
            </strong>
          </span>
          <span className="text-cyan-400 font-bold">{xpProgressPercent}%</span>
        </div>

        <div className="w-full h-2.5 bg-cine-900 rounded-full overflow-hidden p-0.5 border border-purple-900/50">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out bg-gradient-to-r from-purple-500 to-cyan-400 shadow-[0_0_12px_rgba(139,92,246,0.5)]"
            style={{ width: `${xpProgressPercent}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-cine-500 pt-0.5">
          <span>{currentLevelBaseXp} XP</span>
          <span className="flex items-center gap-1 text-cine-400">
            <Trophy className="w-3 h-3 text-purple-400" /> Siguiente nivel:{" "}
            {nextLevelXp} XP
          </span>
        </div>
      </div>
    </div>
  );
}
