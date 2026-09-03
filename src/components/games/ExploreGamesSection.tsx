"use client";

import React, { useState, useMemo } from "react";
import {
  Compass,
  ChevronDown,
  ChevronUp,
  Filter,
  Gamepad2,
} from "lucide-react";
import GameCard from "./GameCard";

interface ExploreGameItem {
  id: string;
  rawgId: number;
  title: string;
  released?: string | null;
  backgroundImage?: string | null;
  metacritic?: number | null;
  genres: string[];
  platforms?: string[];
  userGame?: any;
}

interface ExploreGamesSectionProps {
  games: ExploreGameItem[];
}

export default function ExploreGamesSection({
  games,
}: ExploreGamesSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("all");

  // Extraer géneros disponibles
  const availableGenres = useMemo(() => {
    const set = new Set<string>();
    games.forEach((g) => {
      g.genres?.forEach((genre) => set.add(genre));
    });
    return Array.from(set).sort();
  }, [games]);

  // Filtrar según el género seleccionado en el desplegable
  const filteredGames = useMemo(() => {
    if (selectedGenre === "all") return games;
    return games.filter((g) => g.genres?.includes(selectedGenre));
  }, [games, selectedGenre]);

  // Mostrar los primeros 4 si está plegado, o todos si está desplegado
  const displayedGames = useMemo(() => {
    if (isExpanded || selectedGenre !== "all") {
      return filteredGames;
    }
    return filteredGames.slice(0, 4);
  }, [filteredGames, isExpanded, selectedGenre]);

  const hasMore = selectedGenre === "all" && filteredGames.length > 4;

  return (
    <section className="space-y-6 pt-6 border-t border-purple-900/30">
      {/* Cabecera con controles y desplegable */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-wide flex items-center gap-2">
              Continuar Explorando Videojuegos
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cine-800 text-purple-300 border border-purple-500/30">
                {filteredGames.length} títulos
              </span>
            </h2>
            <p className="text-xs text-cine-400">
              Obras aclamadas de la historia del videojuego disponibles para
              registrar o añadir a tu Backlog.
            </p>
          </div>
        </div>

        {/* Desplegable de Géneros y Botón de Plegado */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="relative inline-flex items-center bg-cine-900 border border-purple-500/30 rounded-xl px-3 py-1.5 text-xs text-cine-200">
            <Filter className="w-3.5 h-3.5 text-cyan-400 mr-2" />
            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                if (e.target.value !== "all") setIsExpanded(true);
              }}
              className="bg-transparent focus:outline-none cursor-pointer text-white font-medium pr-2"
            >
              <option value="all" className="bg-cine-900 text-white">
                Todos los géneros ({games.length})
              </option>
              {availableGenres.map((g) => (
                <option key={g} value={g} className="bg-cine-900 text-white">
                  {g}
                </option>
              ))}
            </select>
          </div>

          {hasMore && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="px-3.5 py-1.5 bg-cine-800 hover:bg-purple-900/40 border border-purple-500/30 text-purple-300 font-semibold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow-sm"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-3.5 h-3.5" /> Plegar
                </>
              ) : (
                <>
                  <ChevronDown className="w-3.5 h-3.5" /> Desplegar todo (+
                  {filteredGames.length - 4})
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Grid de Videojuegos */}
      {filteredGames.length === 0 ? (
        <div className="p-8 text-center bg-cine-950 border border-purple-500/20 rounded-2xl text-xs text-cine-400">
          No hay videojuegos disponibles en este género.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayedGames.map((game) => (
            <GameCard
              key={game.id}
              game={{
                id: game.id,
                rawgId: game.rawgId,
                title: game.title,
                released: game.released,
                backgroundImage: game.backgroundImage,
                metacritic: game.metacritic,
                platforms: game.platforms,
                genres: game.genres,
              }}
              userGame={game.userGame}
            />
          ))}
        </div>
      )}

      {/* Botón inferior para desplegar / plegar */}
      {hasMore && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-6 py-2.5 bg-cine-900 hover:bg-purple-950/60 border border-purple-500/30 text-purple-300 font-bold rounded-2xl text-xs transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(139,92,246,0.3)] hover:border-purple-400"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 text-purple-400" />
                Mostrar menos títulos
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 text-cyan-400" />
                Desplegar catálogo completo de exploración (+
                {filteredGames.length - 4} videojuegos)
              </>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
