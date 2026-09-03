"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import GameHeader from "./games/GameHeader";

export default function DynamicNavHeader() {
  const pathname = usePathname();

  // Si estamos en el universo de Videojuegos
  if (pathname.startsWith("/games")) {
    return <GameHeader />;
  }

  // Si estamos en el Launcher Principal (/)
  if (pathname === "/") {
    return null; // El Launcher tiene su propio hero y cabecera integrada de bienvenida
  }

  // Por defecto (Películas)
  return <Header />;
}
