"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import MovieHeader from "../movies/MovieHeader";
import GameHeader from "../games/GameHeader";

export default function DynamicNavHeader() {
  const pathname = usePathname();

  // Páginas de Autenticación
  if (pathname === "/login" || pathname === "/register") {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-cine-800/80 bg-cine-950/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs font-semibold text-cine-400 hover:text-white transition-colors bg-cine-900/80 px-3 py-1.5 rounded-xl border border-cine-800"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Hub</span>
          </Link>
          <Link href="/" className="font-extrabold text-white text-base tracking-tight">
            Master<span className="text-purple-400">Hub</span>
          </Link>
        </div>
      </header>
    );
  }

  // Universo de Videojuegos
  if (pathname.startsWith("/games")) {
    return <GameHeader />;
  }

  // Launcher Principal (Centro de Mando)
  if (pathname === "/") {
    return null;
  }

  // Universo de Películas
  return <MovieHeader />;
}
