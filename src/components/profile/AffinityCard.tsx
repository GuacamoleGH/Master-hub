"use client";

import React from "react";
import { Sparkles, Heart, Zap, Film, Gamepad2 } from "lucide-react";

interface AffinityData {
  hasComparison: boolean;
  score: number | null;
  sharedMoviesCount: number;
  sharedGamesCount: number;
  mutualLoves: Array<{ title: string; type: "movie" | "game" }>;
  biggestDiscrepancy: {
    title: string;
    type: "movie" | "game";
    userRating: number;
    visitorRating: number;
  } | null;
}

interface AffinityCardProps {
  affinity: AffinityData;
  targetUsername: string;
}

export default function AffinityCard({
  affinity,
  targetUsername,
}: AffinityCardProps) {
  if (!affinity.hasComparison || affinity.score === null) {
    return null;
  }

  const score = affinity.score;
  const scoreColor =
    score >= 80
      ? "text-emerald-400 border-emerald-500/40 bg-emerald-950/40 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
      : score >= 60
        ? "text-purple-400 border-purple-500/40 bg-purple-950/40 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
        : "text-amber-400 border-amber-500/40 bg-amber-950/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]";

  return (
    <div className="p-6 rounded-3xl bg-cine-900/80 border border-cine-800 backdrop-blur-xl relative overflow-hidden">
      {/* Glow ambiental */}
      <div className="absolute top-0 right-0 w-60 h-60 bg-gradient-to-br from-purple-600/15 to-emerald-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Cabecera y Afinidad */}
        <div className="flex items-center gap-5">
          <div
            className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 flex flex-col items-center justify-center flex-shrink-0 ${scoreColor}`}
          >
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight">
              {score}%
            </span>
            <span className="text-[9px] uppercase tracking-wider font-bold opacity-80">
              Afinidad
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-purple-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
              <span>Comparador de Gustos</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Tú y @{targetUsername}
            </h3>
            <p className="text-xs text-cine-300 leading-relaxed max-w-md">
              Compartís{" "}
              <span className="text-white font-bold">
                {affinity.sharedMoviesCount} películas
              </span>{" "}
              y{" "}
              <span className="text-white font-bold">
                {affinity.sharedGamesCount} videojuegos
              </span>{" "}
              registrados en común.
            </p>
          </div>
        </div>

        {/* Detalles de Coincidencias */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:min-w-[340px]">
          {/* Ambos puntuaron alto */}
          {affinity.mutualLoves.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-cine-950/70 border border-cine-800/80 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold">
                <Heart className="w-3.5 h-3.5 fill-rose-500" />
                <span>Ambos amáis (8+ ⭐)</span>
              </div>
              <div className="space-y-1">
                {affinity.mutualLoves.map((item, i) => (
                  <div
                    key={i}
                    className="text-[11px] text-cine-200 truncate flex items-center gap-1.5"
                  >
                    {item.type === "movie" ? (
                      <Film className="w-3 h-3 text-amber-400 flex-shrink-0" />
                    ) : (
                      <Gamepad2 className="w-3 h-3 text-purple-400 flex-shrink-0" />
                    )}
                    <span className="truncate">{item.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mayor discrepancia */}
          {affinity.biggestDiscrepancy && (
            <div className="p-3.5 rounded-2xl bg-cine-950/70 border border-cine-800/80 flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-amber-400 text-xs font-bold">
                <Zap className="w-3.5 h-3.5 fill-amber-400" />
                <span>Mayor Discrepancia</span>
              </div>
              <p className="text-[11px] font-semibold text-white truncate">
                {affinity.biggestDiscrepancy.title}
              </p>
              <div className="flex items-center justify-between text-[10px] font-mono text-cine-400 mt-auto pt-1 border-t border-cine-900">
                <span>
                  @{targetUsername}:{" "}
                  <strong className="text-amber-400">
                    {affinity.biggestDiscrepancy.userRating}
                  </strong>
                </span>
                <span>
                  Tú:{" "}
                  <strong className="text-purple-400">
                    {affinity.biggestDiscrepancy.visitorRating}
                  </strong>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
