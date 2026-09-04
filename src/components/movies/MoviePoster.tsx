"use client";

import React, { useState } from "react";
import { Film } from "lucide-react";

interface MoviePosterProps {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fallbackClassName?: string;
  priority?: boolean;
}

export default function MoviePoster({
  src,
  alt,
  className = "w-full h-full object-cover",
  fallbackClassName = "w-full h-full flex flex-col items-center justify-center text-cine-500 bg-cine-900/80 p-3 text-center",
}: MoviePosterProps) {
  const [hasError, setHasError] = useState(false);

  React.useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src || hasError) {
    return (
      <div className={fallbackClassName}>
        <Film className="w-10 h-10 text-cine-600 mb-1.5 stroke-[1.5]" />
        <span className="text-[11px] font-medium text-cine-400 line-clamp-2 px-1">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      referrerPolicy="no-referrer"
    />
  );
}
