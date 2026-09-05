"use client";

import React from "react";
import { Star, Users, BarChart3, Sparkles } from "lucide-react";

interface MasterHubScoreBadgeProps {
  score: number | null; // 0.0 a 10.0
  totalVotes: number;
  distribution?: number[]; // Array de 10 números con el conteo de votos para 1 a 10 estrellas
  size?: "sm" | "md" | "lg";
  themeColor?: "amber" | "purple";
}

export default function MasterHubScoreBadge({
  score,
  totalVotes,
  distribution = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  size = "md",
  themeColor = "amber",
}: MasterHubScoreBadgeProps) {
  const isPurple = themeColor === "purple";
  const maxVoteInDist = Math.max(...distribution, 1);

  if (!score || totalVotes === 0) {
    return (
      <div className="flex items-center gap-2 p-3 rounded-2xl bg-cine-900/60 border border-cine-800 text-cine-400 text-xs">
        <Sparkles className="w-4 h-4 text-cine-500" />
        <span>
          Sin votos comunitarios suficientes aún. ¡Sé el primero en valorar!
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-cine-800 bg-gradient-to-br from-cine-900/90 via-cine-950 to-cine-900/80 p-4 sm:p-5 shadow-xl space-y-3">
      {/* Cabecera del Score */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-cine-400">
            <Sparkles
              className={`w-3.5 h-3.5 ${
                isPurple ? "text-purple-400" : "text-amber-400"
              }`}
            />
            <span>Master Hub Score Oficial</span>
          </div>
          <div className="flex items-baseline gap-2 mt-1">
            <span
              className={`text-2xl sm:text-3xl font-black font-mono flex items-center gap-1.5 ${
                isPurple ? "text-purple-300" : "text-amber-400"
              }`}
            >
              <Star
                className={`w-6 h-6 ${
                  isPurple
                    ? "fill-purple-400 text-purple-400"
                    : "fill-amber-400 text-amber-400"
                }`}
              />
              <span>{score.toFixed(1)}</span>
            </span>
            <span className="text-xs text-cine-500 font-mono">/ 10</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cine-900 border border-cine-800 text-xs text-cine-300 font-semibold">
          <Users className="w-3.5 h-3.5 text-cine-400" />
          <span>
            {totalVotes} {totalVotes === 1 ? "voto" : "votos"}
          </span>
        </div>
      </div>

      {/* Histograma de distribución de notas (1 a 10 estrellas estilo Letterboxd) */}
      <div className="pt-2 border-t border-cine-800/80 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-mono text-cine-500">
          <span>Distribución comunitaria (1★ a 10★)</span>
          <BarChart3 className="w-3 h-3" />
        </div>
        <div className="flex items-end gap-1 h-12 pt-2 px-1">
          {distribution.map((count, index) => {
            const heightPercent = Math.max(
              8,
              Math.round((count / maxVoteInDist) * 100),
            );
            const starNumber = index + 1;
            return (
              <div
                key={starNumber}
                className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end"
                title={`${starNumber}★: ${count} votos`}
              >
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t transition-all ${
                    count > 0
                      ? isPurple
                        ? "bg-purple-500 hover:bg-purple-400"
                        : "bg-amber-500 hover:bg-amber-400"
                      : "bg-cine-800/40"
                  }`}
                />
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[9px] font-mono text-cine-500 px-0.5">
          <span>1★</span>
          <span>5★</span>
          <span>10★</span>
        </div>
      </div>
    </div>
  );
}
