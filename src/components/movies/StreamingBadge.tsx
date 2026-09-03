"use client";

import React from "react";

interface StreamingBadgeProps {
  platform: string;
  size?: "xs" | "sm" | "md";
}

export default function StreamingBadge({
  platform,
  size = "xs",
}: StreamingBadgeProps) {
  let styleClasses = "bg-cine-800 text-cine-300 border-cine-700";

  const clean = platform.toLowerCase();
  if (clean.includes("netflix")) {
    styleClasses = "bg-red-950/70 text-red-400 border-red-800/60";
  } else if (clean.includes("hbo") || clean.includes("max")) {
    styleClasses = "bg-purple-950/70 text-purple-300 border-purple-800/60";
  } else if (clean.includes("prime") || clean.includes("amazon")) {
    styleClasses = "bg-sky-950/70 text-sky-300 border-sky-800/60";
  } else if (clean.includes("disney")) {
    styleClasses = "bg-blue-950/70 text-blue-300 border-blue-800/60";
  } else if (clean.includes("pirata") || clean.includes("stremio")) {
    styleClasses =
      "bg-amber-950/70 text-amber-300 border-amber-800/60 font-bold";
  }

  const sizeClasses = {
    xs: "text-[10px] px-2 py-0.5",
    sm: "text-xs px-2.5 py-1",
    md: "text-sm px-3 py-1.5",
  }[size];

  return (
    <span
      title={`Disponible en streaming en ${platform}`}
      className={`inline-flex items-center gap-1 rounded-md border font-medium tracking-wide shadow-sm cursor-help ${sizeClasses} ${styleClasses}`}
    >
      {clean.includes("pirata") ? "🏴‍☠️" : null} {platform}
    </span>
  );
}
