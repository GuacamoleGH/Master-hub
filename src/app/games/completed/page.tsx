"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Filter,
  ArrowUpDown,
  Loader2,
  Gamepad2,
  Plus,
  Tv,
  Clock,
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

export default function GamerCompletedPage() {
  const [items, setItems] = useState<UserGameItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("hoursDesc");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [statusFilter, setStatusFilter] = useState("COMPLETED_ALL");

  const fetchCompleted = async () => {
    try {
      setIsLoading(true);
      const url = `/api/user-games?status=${statusFilter}&sort=${sortBy}&genre=${selectedGenre}&platform=${selectedPlatform}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.error("Error al cargar juegos completados:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompleted();
  }, [sortBy, selectedGenre, selectedPlatform, statusFilter]);

  const allGenres = Array.from(
    new Set(items.flatMap((item) => item.game.genres)),
  ).sort();

  const totalHoursInView = items.reduce(
    (acc, c) => acc + (c.hoursPlayed || 0),
    0,
  );

  return (
    <div className="space-y-8 pb-16 animate-fade-in">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-purple-900/40 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 shadow-[0_0_10px_rgba(139,92,246,0.3)]">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Juegos Completados
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cine-800 border border-purple-500/30 text-xs font-mono font-bold text-purple-300">
              {items.length}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono font-bold text-cyan-300 flex items-center gap-1">
              <Clock className="w-3 h-3 text-cyan-400" />
              {Math.round(totalHoursInView)}h totales
            </span>
          </div>
          <p className="text-xs sm:text-sm text-cine-400 mt-1">
            Historial de campañas terminadas, horas dedicadas y precisión de
            Game Knowledge.
          </p>
        </div>

        {/* Controles de ordenación y filtrado */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filtro por Estado (Completado vs 100% Platino) */}
          <div className="flex items-center gap-1.5 bg-cine-900 border border-purple-500/30 rounded-xl px-3 py-1.5 text-xs text-cine-200">
            <span className="text-purple-400 font-bold">🏆</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-cine-200"
            >
              <option value="COMPLETED_ALL" className="bg-cine-900 text-white">
                Completados + Platinos
              </option>
              <option value="PLATINUM" className="bg-cine-900 text-white">
                Solo 100% Platino 👑
              </option>
              <option value="COMPLETED" className="bg-cine-900 text-white">
                Solo Campaña Terminada 🏆
              </option>
            </select>
          </div>

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
              <option value="hoursDesc" className="bg-cine-900 text-white">
                Más horas jugadas
              </option>
              <option value="hoursAsc" className="bg-cine-900 text-white">
                Menos horas jugadas
              </option>
              <option value="myRatingDesc" className="bg-cine-900 text-white">
                Mi nota (Mayor a menor)
              </option>
              <option value="gkDesc" className="bg-cine-900 text-white">
                🧠 Mayor Game Knowledge
              </option>
              <option value="gkAsc" className="bg-cine-900 text-white">
                🔥 Mayor Hot Take (Menor GK)
              </option>
              <option value="metacriticDesc" className="bg-cine-900 text-white">
                Mayor Metacritic
              </option>
              <option value="recent" className="bg-cine-900 text-white">
                Completados recientemente
              </option>
              <option value="title" className="bg-cine-900 text-white">
                Título alfabético
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Juegos Completados */}
      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-7 h-7 text-purple-400 animate-spin" />
          <span className="text-xs text-cine-400 font-mono">
            Cargando videojuegos completados...
          </span>
        </div>
      ) : items.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-purple-500/20 text-center flex flex-col items-center justify-center gap-4 max-w-lg mx-auto bg-cine-950">
          <div className="w-16 h-16 rounded-full bg-cine-900 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Gamepad2 className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              No hay juegos con estos filtros
            </h3>
            <p className="text-xs text-cine-400">
              Prueba a cambiar los filtros de plataforma, estado o género.
            </p>
          </div>
          <Link
            href="/games"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(139,92,246,0.4)]"
          >
            <Plus className="w-3.5 h-3.5" /> Descubrir títulos
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
                status: item.status,
                userRating: item.userRating,
                hoursPlayed: item.hoursPlayed,
                platform: item.platform,
                review: item.review,
                gameKnowledge: item.gameKnowledge,
                difference: item.difference,
                platformDetails: item.platformDetails,
              }}
              onUpdate={fetchCompleted}
            />
          ))}
        </div>
      )}
    </div>
  );
}
