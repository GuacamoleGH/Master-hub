"use client";

import React from "react";
import Link from "next/link";
import { Star, Film, Gamepad2, Heart, Sparkles } from "lucide-react";

interface TopFourItem {
  id: string;
  title: string;
  image?: string | null;
  year?: number | string | null;
  rating?: number | null;
  isFavorite?: boolean;
  link: string;
}

interface TopFourCardProps {
  type: "cinema" | "gaming";
  title: string;
  items: TopFourItem[];
}

export default function TopFourCard({ type, title, items }: TopFourCardProps) {
  const isCinema = type === "cinema";
  const AccentIcon = isCinema ? Film : Gamepad2;
  const accentColor = isCinema ? "text-amber-400" : "text-purple-400";
  const glowColor = isCinema
    ? "border-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
    : "border-purple-500/30 shadow-[0_0_20px_rgba(168,85,247,0.15)]";

  // Rellenar hasta 4 espacios si faltan
  const slots: Array<TopFourItem | null> = [
    items[0] || null,
    items[1] || null,
    items[2] || null,
    items[3] || null,
  ];

  return (
    <div
      className={`p-5 sm:p-6 rounded-3xl bg-cine-900/80 border backdrop-blur-xl ${glowColor}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-2 rounded-xl bg-cine-950 border border-cine-800 ${accentColor}`}
          >
            <AccentIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
              {title}
              <Sparkles className={`w-3.5 h-3.5 ${accentColor}`} />
            </h3>
            <p className="text-[10px] text-cine-400 font-mono">
              Los 4 títulos predilectos e insignia del perfil
            </p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cine-950 border border-cine-800 text-cine-400">
          TOP 4
        </span>
      </div>

      {/* Grid de los 4 títulos */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {slots.map((item, idx) => {
          if (!item) {
            return (
              <div
                key={idx}
                className="aspect-[2/3] rounded-2xl border-2 border-dashed border-cine-800/80 bg-cine-950/40 flex flex-col items-center justify-center p-3 text-center gap-2 group"
              >
                <div className="w-8 h-8 rounded-full bg-cine-900 flex items-center justify-center text-cine-600 group-hover:text-cine-400 transition-colors">
                  <span className="text-xs font-mono font-bold">{idx + 1}</span>
                </div>
                <span className="text-[10px] text-cine-500 font-medium leading-tight">
                  Espacio disponible
                </span>
              </div>
            );
          }

          return (
            <Link
              key={item.id || idx}
              href={item.link}
              className="group relative aspect-[2/3] rounded-2xl overflow-hidden border border-cine-700/60 bg-cine-950 shadow-lg hover:scale-[1.03] hover:border-cine-500 transition-all duration-300 block"
            >
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-cine-900 text-cine-600">
                  <AccentIcon className="w-8 h-8 opacity-40" />
                </div>
              )}

              {/* Overlay degradado */}
              <div className="absolute inset-0 bg-gradient-to-t from-cine-950 via-cine-950/20 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

              {/* Posición 1, 2, 3, 4 */}
              <div className="absolute top-2 left-2 w-6 h-6 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-[11px] font-black text-white font-mono shadow">
                #{idx + 1}
              </div>

              {/* Corazón si es favorito */}
              {item.isFavorite && (
                <div className="absolute top-2 right-2 p-1 rounded-lg bg-rose-950/80 border border-rose-500/40 text-rose-400">
                  <Heart className="w-3 h-3 fill-rose-500" />
                </div>
              )}

              {/* Info inferior */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5">
                <p className="text-xs font-bold text-white truncate drop-shadow">
                  {item.title}
                </p>
                <div className="flex items-center justify-between text-[10px] text-cine-300 mt-0.5">
                  <span>{item.year || "—"}</span>
                  {item.rating !== null && item.rating !== undefined && (
                    <span className="flex items-center gap-1 font-mono font-bold text-amber-400 bg-black/60 px-1.5 py-0.5 rounded">
                      <Star className="w-2.5 h-2.5 fill-amber-400" />
                      {item.rating.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
