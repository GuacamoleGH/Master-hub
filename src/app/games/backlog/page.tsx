"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bookmark,
  Filter,
  ArrowUpDown,
  Loader2,
  Gamepad2,
  Plus,
  Tv,
} from "lucide-react";
import { UserGameItem } from "@/types/game";
import GameCard from "@/components/games/GameCard";

const PLATFORM_OPTIONS = [
  { value: "all", label: "Todas las plataformas" },
  { value: "Steam", label: "PC (Steam)" },
  { value: "Epic", label: "PC (Epic Games)" },
  { value: "Game Pass", label: "PC (Game Pass)" },
  { value: "PlayStation 5", label: "PlayStation 5" },
  { value: "PlayStation 4", label: "PlayStation 4" },
  { value: "PlayStation 3", label: "PlayStation 3 (Old Gen)" },
  { value: "Xbox 360", label: "Xbox 360 (Old Gen)" },
  { value: "Xbox Series", label: "Xbox Series S/X" },
  { value: "Nintendo Switch", label: "Nintendo Switch" },
  { value: "Deck", label: "Steam Deck" },
];

export default function GamerBacklogPage() {
  const [items, setItems] = useState<UserGameItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recent");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");

  const fetchBacklog = async () => {
    try {
      setIsLoading(true);
      const url = `/api/user-games?status=BACKLOG&sort=${sortBy}&genre=${selectedGenre}&platform=${selectedPlatform}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.error("Error al cargar Backlog:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBacklog();
  }, [sortBy, selectedGenre, selectedPlatform]);

  const allGenres = Array.from(
    new Set(items.flatMap((item) => item.game.genres)),
  ).sort();

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.3)]">
              <Bookmark className="w-5 h-5 fill-cyan-400" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Mi Backlog
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cine-800 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300">
              {items.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-cine-400 mt-1">
            Títulos pendientes por jugar, explorar y conquistar.
          </p>
        </div>

        {/* Controles de ordenación y filtrado */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filtro por Plataforma */}
          <div className="flex items-center gap-1.5 bg-cine-900 border border-purple-500/30 rounded-xl px-3 py-1.5 text-xs text-cine-200">
            <Tv className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-cine-200"
            >
              {PLATFORM_OPTIONS.map((p) => (
                <option
                  key={p.value}
                  value={p.value}
                  className="bg-cine-900 text-white"
                >
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por Género */}
          <div className="flex items-center gap-1.5 bg-cine-900 border border-purple-500/30 rounded-xl px-3 py-1.5 text-xs text-cine-200">
            <Filter className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-cine-200"
            >
              <option value="all" className="bg-cine-900 text-white">
                Todos los géneros
              </option>
              {allGenres.map((g) => (
                <option key={g} value={g} className="bg-cine-900 text-white">
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenar */}
          <div className="flex items-center gap-1.5 bg-cine-900 border border-purple-500/30 rounded-xl px-3 py-1.5 text-xs text-cine-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-purple-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-cine-200"
            >
              <option value="recent" className="bg-cine-900 text-white">
                Añadidos recientemente
              </option>
              <option value="oldest" className="bg-cine-900 text-white">
                Primeros añadidos
              </option>
              <option value="metacriticDesc" className="bg-cine-900 text-white">
                Mayor Metacritic
              </option>
              <option value="title" className="bg-cine-900 text-white">
                Título alfabético
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Videojuegos en Backlog */}
      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-7 h-7 text-cyan-400 animate-spin" />
          <span className="text-xs text-cine-400 font-mono">
            Actualizando Backlog...
          </span>
        </div>
      ) : items.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-purple-500/20 text-center flex flex-col items-center justify-center gap-4 max-w-lg mx-auto bg-cine-950">
          <div className="w-16 h-16 rounded-full bg-cine-900 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              Tu Backlog está vacío o filtrado
            </h3>
            <p className="text-xs text-cine-400">
              Busca cualquier juego en el buscador superior para agregarlo a tu
              lista de pendientes.
            </p>
          </div>
          <Link
            href="/games"
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-cine-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(6,182,212,0.4)]"
          >
            <Plus className="w-3.5 h-3.5" /> Explorar catálogo
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <GameCard
              key={item.id}
              game={{
                id: item.game.id,
                rawgId: item.game.rawgId,
                title: item.game.title,
                released: item.game.released,
                backgroundImage: item.game.backgroundImage,
                metacritic: item.game.metacritic,
                platforms: item.game.platforms,
                genres: item.game.genres,
              }}
              userGame={{
                status: "BACKLOG",
                platform: item.platform,
                platformDetails: item.platformDetails,
              }}
              onUpdate={fetchBacklog}
            />
          ))}
        </div>
      )}
    </div>
  );
}
