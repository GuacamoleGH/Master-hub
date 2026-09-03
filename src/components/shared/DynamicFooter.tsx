"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function DynamicFooter() {
  const pathname = usePathname();

  if (pathname.startsWith("/games")) {
    return (
      <footer className="border-t border-purple-900/40 bg-cine-950/80 py-6 text-center text-xs text-cine-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-purple-400">Gamer Hub</span>
            <span>•</span>
            <span className="text-cyan-400 font-mono">
              Game Knowledge Engine 🧠
            </span>
          </div>
          <p className="text-cine-500">
            Datos impulsados por{" "}
            <strong className="text-purple-300">RAWG</strong> &{" "}
            <strong className="text-cyan-300">Metacritic</strong>. Diseñado para
            jugadores exigentes.
          </p>
        </div>
      </footer>
    );
  }

  if (pathname === "/") {
    return (
      <footer className="border-t border-cine-800/80 bg-cine-950/60 py-6 text-center text-xs text-cine-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Command Center</span>
            <span>•</span>
            <span className="text-amber-400">Cinephile Hub</span>
            <span>+</span>
            <span className="text-purple-400">Gamer Hub</span>
          </div>
          <p className="text-cine-500">
            Ecosistema de entretenimiento personal. Arquitectura escalable y
            modular.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-cine-800/80 bg-cine-950/60 py-6 text-center text-xs text-cine-500">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-cine-300">Cinephile Hub</span>
          <span>•</span>
          <span>Ball Knowledge Engine 🏀</span>
        </div>
        <p className="text-cine-500">
          Datos impulsados por TMDB & OMDb. Diseñado para cinéfilos exigentes.
        </p>
      </div>
    </footer>
  );
}
