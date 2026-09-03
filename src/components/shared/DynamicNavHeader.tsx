"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MovieHeader from "../movies/MovieHeader";
import GameHeader from "../games/GameHeader";

export default function DynamicNavHeader() {
  const pathname = usePathname();

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
