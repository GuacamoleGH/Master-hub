"use client";

import React, { useState } from "react";
import { Gamepad2 } from "lucide-react";

interface GamePosterProps {
  src?: string | null;
  alt: string;
  className?: string;
}

export default function GamePoster({
  src,
  alt,
  className = "",
}: GamePosterProps) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center p-3 text-center bg-gradient-to-br from-cine-900 to-cine-950 border border-purple-500/20 text-cine-500 select-none ${className}`}
      >
        <Gamepad2 className="w-8 h-8 text-purple-400/60 mb-1" />
        <span className="text-[11px] font-bold text-cine-300 line-clamp-2 px-1">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
