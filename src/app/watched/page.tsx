"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Filter,
  ArrowUpDown,
  Loader2,
  Film,
  Plus,
  Tv,
} from "lucide-react";
import { UserMovieItem } from "@/types/movie";
import MovieCard from "@/components/MovieCard";

const PLATFORM_OPTIONS = [
  { value: "all", label: "Todas las plataformas" },
  { value: "Netflix", label: "Netflix" },
  { value: "HBO Max", label: "HBO Max" },
  { value: "Prime Video", label: "Prime Video" },
  { value: "Disney+", label: "Disney+" },
  { value: "Pirata", label: "🏴‍☠️ Pirata / Stremio" },
];

export default function WatchedMoviesPage() {
  const [items, setItems] = useState<UserMovieItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("watchedRecent");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedPlatform, setSelectedPlatform] = useState("all");
  const [ratingRange, setRatingRange] = useState("all");

  const fetchWatched = async () => {
    try {
      setIsLoading(true);
      let query = `/api/user-movies?status=WATCHED&sort=${sortBy}&genre=${selectedGenre}&platform=${selectedPlatform}`;
      if (ratingRange === "9-10") query += "&ratingMin=9.0&ratingMax=10.0";
      else if (ratingRange === "7-8.9") query += "&ratingMin=7.0&ratingMax=8.9";
      else if (ratingRange === "5-6.9") query += "&ratingMin=5.0&ratingMax=6.9";
      else if (ratingRange === "0-4.9") query += "&ratingMin=0.0&ratingMax=4.9";

      const res = await fetch(query);
      if (res.ok) {
        const data = await res.json();
        setItems(data.items || []);
      }
    } catch (err) {
      console.error("Error al cargar películas vistas:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWatched();
  }, [sortBy, selectedGenre, selectedPlatform, ratingRange]);

  const allGenres = Array.from(
    new Set(items.flatMap((item) => item.movie.genres)),
  ).sort();

  return (
    <div className="space-y-8 pb-16">
      {/* Cabecera */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cine-800 pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Películas Vistas
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-cine-800 border border-cine-700 text-xs font-mono font-bold text-emerald-400">
              {items.length}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-cine-400 mt-1">
            Historial de visionados, plataformas y contrastes de Ball Knowledge.
          </p>
        </div>

        {/* Controles de ordenación y filtrado */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Filtro por Plataforma */}
          <div className="flex items-center gap-1.5 bg-cine-900 border border-cine-700 rounded-xl px-3 py-1.5 text-xs text-cine-200">
            <Tv className="w-3.5 h-3.5 text-cine-400" />
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

          {/* Filtro por Rango de Notas */}
          <div className="flex items-center gap-1.5 bg-cine-900 border border-cine-700 rounded-xl px-3 py-1.5 text-xs text-cine-200">
            <span className="text-amber-400 font-bold">★</span>
            <select
              value={ratingRange}
              onChange={(e) => setRatingRange(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-cine-200"
            >
              <option value="all" className="bg-cine-900 text-white">
                Todas las notas
              </option>
              <option value="9-10" className="bg-cine-900 text-white">
                Obras Maestras (9.0 - 10)
              </option>
              <option value="7-8.9" className="bg-cine-900 text-white">
                Notables (7.0 - 8.9)
              </option>
              <option value="5-6.9" className="bg-cine-900 text-white">
                Regulares (5.0 - 6.9)
              </option>
              <option value="0-4.9" className="bg-cine-900 text-white">
                Controversias (&lt; 5.0)
              </option>
            </select>
          </div>

          {/* Filtro por Género */}
          <div className="flex items-center gap-1.5 bg-cine-900 border border-cine-700 rounded-xl px-3 py-1.5 text-xs text-cine-200">
            <Filter className="w-3.5 h-3.5 text-cine-400" />
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
          <div className="flex items-center gap-1.5 bg-cine-900 border border-cine-700 rounded-xl px-3 py-1.5 text-xs text-cine-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-cine-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none cursor-pointer text-cine-200"
            >
              <option value="watchedRecent" className="bg-cine-900 text-white">
                Vistas más recientes
              </option>
              <option value="watchedOldest" className="bg-cine-900 text-white">
                Vistas más antiguas
              </option>
              <option value="myRatingDesc" className="bg-cine-900 text-white">
                Mi nota (Mayor a menor)
              </option>
              <option value="myRatingAsc" className="bg-cine-900 text-white">
                Mi nota (Menor a mayor)
              </option>
              <option value="bkDesc" className="bg-cine-900 text-white">
                🏀 Mayor Ball Knowledge
              </option>
              <option value="bkAsc" className="bg-cine-900 text-white">
                🏀 Menor Ball Knowledge
              </option>
              <option value="imdbRatingDesc" className="bg-cine-900 text-white">
                Mayor nota IMDb
              </option>
              <option value="title" className="bg-cine-900 text-white">
                Título alfabético
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid de Películas Vistas */}
      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-2">
          <Loader2 className="w-7 h-7 text-emerald-400 animate-spin" />
          <span className="text-xs text-cine-400">
            Cargando películas vistas...
          </span>
        </div>
      ) : items.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-cine-800 text-center flex flex-col items-center justify-center gap-4 max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-cine-900 border border-cine-800 flex items-center justify-center text-cine-600">
            <Film className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">
              No hay películas vistas con estos filtros
            </h3>
            <p className="text-xs text-cine-400">
              Prueba a cambiar los filtros de plataforma, género o notas.
            </p>
          </div>
          <Link
            href="/"
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-cine-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shadow"
          >
            <Plus className="w-3.5 h-3.5" /> Descubrir películas
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {items.map((item) => (
            <MovieCard
              key={item.id}
              movie={{
                id: item.movie.id,
                tmdbId: item.movie.tmdbId,
                title: item.movie.title,
                originalTitle: item.movie.originalTitle,
                year: item.movie.year,
                posterPath: item.movie.posterPath,
                imdbRating: item.movie.imdbRating,
                genres: item.movie.genres,
                streamingPlatforms: item.movie.streamingPlatforms,
              }}
              userMovie={{
                status: "WATCHED",
                userRating: item.userRating,
                review: item.review,
                watchedDate: item.watchedDate,
                platform: item.platform,
                ballKnowledge: item.ballKnowledge,
                difference: item.difference,
              }}
              onUpdate={fetchWatched}
            />
          ))}
        </div>
      )}
    </div>
  );
}
