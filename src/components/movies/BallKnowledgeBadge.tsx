"use client";

import React from "react";

interface BallKnowledgeBadgeProps {
  score: number | null | undefined;
  difference?: number | null;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function BallKnowledgeBadge({
  score,
  difference,
  size = "md",
  showLabel = true,
}: BallKnowledgeBadgeProps) {
  if (score === null || score === undefined) return null;

  const roundedScore = Math.round(score);

  // Determinar paleta de color y texto de precisión
  let colorClasses =
    "border-red-500/40 bg-red-950/40 text-red-400 shadow-red-950/50";
  let labelText = "Hot Take 🤡";

  if (roundedScore >= 95) {
    colorClasses =
      "border-purple-500/50 bg-gradient-to-r from-purple-950/60 to-indigo-950/60 text-purple-300 shadow-purple-900/40";
    labelText = "Exact Match 🧠";
  } else if (roundedScore >= 85) {
    colorClasses =
      "border-emerald-500/40 bg-emerald-950/40 text-emerald-400 shadow-emerald-950/50";
    labelText = "High Knowledge 🏀";
  } else if (roundedScore >= 70) {
    colorClasses =
      "border-amber-500/40 bg-amber-950/40 text-amber-400 shadow-amber-950/50";
    labelText = "Balanced ⚖️";
  }

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 gap-1",
    md: "text-sm px-3 py-1 gap-1.5",
    lg: "text-base px-4 py-2 gap-2 font-semibold",
  }[size];

  return (
    <div
      className={`inline-flex items-center rounded-full border backdrop-blur-md shadow-sm font-medium transition-all ${sizeClasses} ${colorClasses}`}
      title={`Ball Knowledge: ${score}%. ${difference !== undefined && difference !== null ? `Diferencia con IMDb: ${difference > 0 ? "+" : ""}${difference}` : ""}`}
    >
      <span className="font-mono font-bold tracking-tight">
        🏀 {score.toFixed(0)}%
      </span>
      {showLabel && (
        <span className="text-[11px] opacity-90 hidden sm:inline-block border-l border-white/10 pl-1.5 ml-0.5">
          {labelText}
        </span>
      )}
      {difference !== undefined && difference !== null && (
        <span className="text-[10px] opacity-75 font-mono">
          ({difference > 0 ? `+${difference}` : difference})
        </span>
      )}
    </div>
  );
}
