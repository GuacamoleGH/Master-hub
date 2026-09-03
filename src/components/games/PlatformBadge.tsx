"use client";

import React from "react";
import { getPlatformBadgeStyle } from "@/lib/platforms";

interface PlatformBadgeProps {
  platform: string; // Puede ser 'PC (Steam)' o 'PC (Steam), PlayStation 5, Xbox 360'
  size?: "xs" | "sm" | "md";
}

export default function PlatformBadge({
  platform,
  size = "xs",
}: PlatformBadgeProps) {
  if (!platform) return null;

  // Dividir por comas para soportar múltiples plataformas completadas
  const platforms = platform
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);

  const sizeClasses = {
    xs: "text-[9px] px-1.5 py-0.5 rounded",
    sm: "text-[11px] px-2 py-0.5 rounded-md font-medium",
    md: "text-xs px-2.5 py-1 rounded-lg font-semibold",
  }[size];

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {platforms.map((p, idx) => {
        const badgeStyle = getPlatformBadgeStyle(p);
        return (
          <span
            key={idx}
            className={`font-mono border backdrop-blur-sm shadow-sm truncate max-w-[120px] cursor-help ${sizeClasses} ${badgeStyle}`}
            title={`Plataforma de juego: ${p}`}
          >
            {p}
          </span>
        );
      })}
    </div>
  );
}
