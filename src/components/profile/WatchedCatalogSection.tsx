"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Film,
  Gamepad2,
  Search,
  Star,
  Tv,
  Clock,
  ChevronDown,
  X,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { sounds } from "@/lib/sounds";

export interface WatchedCatalogItem {
  id: string;
  title: string;
  posterPath?: string | null;
  year?: number | string | null;
  userRating?: number | null;
  imdbRating?: number | null;
  ballKnowledge?: number | null;
  metacritic?: number | null;
  gameKnowledge?: number | null;
  hoursPlayed?: number | null;
  status?: string;
  platform?: string | null;
  review?: string | null;
  mediaType?: "movie" | "series" | "game";
  link: string;
}

interface WatchedCatalogSectionProps {
  type: "cinema" | "gaming";
  items: WatchedCatalogItem[];
  title?: string;
  subtitle?: string;
  isOwner?: boolean;
}

export default function WatchedCatalogSection({
  type,
  items,
  title,
  subtitle,
}: WatchedCatalogSectionProps) {
  const isCinema = type === "cinema";
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("rating_desc");
  const [visibleCount, setVisibleCount] = useState<number>(18);

  const defaultTitle = isCinema
    ? "Películas & Series Vistas"
    : "Catálogo de Videojuegos";
  const defaultSubtitle = isCinema
    ? "Explora todos los títulos de cine y televisión vistos con sus notas y reseñas"
    : "Explora la biblioteca completa de juegos, horas jugadas y estados";

  // Conteos para filtros
  const counts = useMemo(() => {
    if (isCinema) {
      const moviesCount = items.filter((i) => i.mediaType === "movie").length;
      const seriesCount = items.filter((i) => i.mediaType === "series").length;
      return { all: items.length, movies: moviesCount, series: seriesCount };
    } else {
      const completed = items.filter(
        (i) => i.status === "COMPLETED" || i.status === "PLATINUM",
      ).length;
      const playing = items.filter((i) => i.status === "PLAYING").length;
      const platinum = items.filter((i) => i.status === "PLATINUM").length;
      const backlog = items.filter((i) => i.status === "BACKLOG").length;
      return { all: items.length, completed, playing, platinum, backlog };
    }
  }, [items, isCinema]);

  const filteredItems = useMemo(() => {
    let result = [...items];

    // Búsqueda por texto
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          (i.review && i.review.toLowerCase().includes(q)),
      );
    }

    // Filtros por universo
    if (isCinema) {
      if (filterType === "movies") {
        result = result.filter((i) => i.mediaType === "movie");
      } else if (filterType === "series") {
        result = result.filter((i) => i.mediaType === "series");
      }
    } else {
      if (filterType === "completed") {
        result = result.filter(
          (i) => i.status === "COMPLETED" || i.status === "PLATINUM",
        );
      } else if (filterType === "playing") {
        result = result.filter((i) => i.status === "PLAYING");
      } else if (filterType === "platinum") {
        result = result.filter((i) => i.status === "PLATINUM");
      } else if (filterType === "backlog") {
        result = result.filter((i) => i.status === "BACKLOG");
      }
    }

    // Ordenación
    result.sort((a, b) => {
      if (sortBy === "rating_desc") {
        return (b.userRating || 0) - (a.userRating || 0);
      }
      if (sortBy === "rating_asc") {
        return (a.userRating || 0) - (b.userRating || 0);
      }
      if (sortBy === "year_desc") {
        return Number(b.year || 0) - Number(a.year || 0);
      }
      if (sortBy === "hours_desc" && !isCinema) {
        return (b.hoursPlayed || 0) - (a.hoursPlayed || 0);
      }
      if (sortBy === "title_asc") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

    return result;
  }, [items, searchQuery, filterType, sortBy, isCinema]);

  const displayedItems = filteredItems.slice(0, visibleCount);
  const hasMore = filteredItems.length > visibleCount;

  return (
    <section className="space-y-5 pt-2">
      {/* Encabezado y Barra de Filtros */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cine-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`p-1.5 rounded-lg border ${
                isCinema
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                  : "bg-purple-500/20 text-purple-400 border-purple-500/40"
              }`}
            >
              {isCinema ? (
                <Film className="w-4 h-4" />
              ) : (
                <Gamepad2 className="w-4 h-4" />
              )}
            </span>
            <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              <span>{title || defaultTitle}</span>
              <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-cine-900 border border-cine-800 text-cine-400">
                {items.length}
              </span>
            </h2>
          </div>
          <p className="text-xs text-cine-400 mt-1">
            {subtitle || defaultSubtitle}
          </p>
        </div>

        {/* Buscador y Selector de Ordenación */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-cine-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(18);
              }}
              placeholder="Buscar título o reseña..."
              className="w-full pl-9 pr-8 py-2 rounded-xl bg-cine-900/90 border border-cine-800 text-xs text-white placeholder:text-cine-500 focus:outline-none focus:border-cine-600 transition-colors shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cine-500 hover:text-white p-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 rounded-xl bg-cine-900/90 border border-cine-800 text-xs text-cine-300 font-medium focus:outline-none focus:border-cine-600 cursor-pointer"
          >
            <option value="rating_desc">Mejor valorados</option>
            <option value="rating_asc">Menos valorados</option>
            <option value="year_desc">Año de estreno</option>
            {!isCinema && <option value="hours_desc">Más horas jugadas</option>}
            <option value="title_asc">Título (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Píldoras de Filtro */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        {isCinema ? (
          <>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setFilterType("all");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "all"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                  : "bg-cine-900/80 text-cine-400 hover:text-white border border-cine-800"
              }`}
            >
              Todos ({counts.all})
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setFilterType("movies");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === "movies"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                  : "bg-cine-900/80 text-cine-400 hover:text-white border border-cine-800"
              }`}
            >
              <Film className="w-3 h-3" />
              <span>Películas ({counts.movies})</span>
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setFilterType("series");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                filterType === "series"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                  : "bg-cine-900/80 text-cine-400 hover:text-white border border-cine-800"
              }`}
            >
              <Tv className="w-3 h-3" />
              <span>Series ({counts.series})</span>
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setFilterType("all");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "all"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                  : "bg-cine-900/80 text-cine-400 hover:text-white border border-cine-800"
              }`}
            >
              Todos ({counts.all})
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setFilterType("completed");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "completed"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                  : "bg-cine-900/80 text-cine-400 hover:text-white border border-cine-800"
              }`}
            >
              Completados ({counts.completed})
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setFilterType("playing");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "playing"
                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm"
                  : "bg-cine-900/80 text-cine-400 hover:text-white border border-cine-800"
              }`}
            >
              Jugando ({counts.playing})
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setFilterType("platinum");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "platinum"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                  : "bg-cine-900/80 text-cine-400 hover:text-white border border-cine-800"
              }`}
            >
              Platinos ({counts.platinum})
            </button>
            <button
              type="button"
              onClick={() => {
                sounds.click();
                setFilterType("backlog");
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                filterType === "backlog"
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm"
                  : "bg-cine-900/80 text-cine-400 hover:text-white border border-cine-800"
              }`}
            >
              Pendientes ({counts.backlog})
            </button>
          </>
        )}
      </div>

      {/* Grid de Títulos Vistos */}
      {filteredItems.length === 0 ? (
        <div className="p-12 text-center text-xs text-cine-500 rounded-3xl border border-cine-800/80 bg-cine-950/40">
          {searchQuery
            ? "No se encontraron títulos que coincidan con la búsqueda."
            : isCinema
              ? "No hay títulos registrados en esta categoría."
              : "No hay videojuegos registrados en esta categoría."}
        </div>
      ) : (
        <div
          className={`grid gap-3.5 ${
            isCinema
              ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
          }`}
        >
          {displayedItems.map((item) => {
            const isSeries = item.mediaType === "series";

            return (
              <Link
                key={item.id}
                href={item.link}
                onClick={() => sounds.click()}
                className={`group flex flex-col rounded-2xl overflow-hidden bg-cine-900/80 border transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${
                  isCinema
                    ? "border-cine-800 hover:border-amber-500/50"
                    : "border-cine-800 hover:border-purple-500/50"
                }`}
              >
                {/* Poster / Imagen */}
                <div
                  className={`relative w-full overflow-hidden bg-cine-950 ${
                    isCinema ? "aspect-[2/3]" : "aspect-[16/10]"
                  }`}
                >
                  {item.posterPath ? (
                    <img
                      src={item.posterPath}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-cine-700 bg-cine-900">
                      {isCinema ? (
                        <Film className="w-8 h-8 opacity-40" />
                      ) : (
                        <Gamepad2 className="w-8 h-8 opacity-40" />
                      )}
                    </div>
                  )}

                  {/* Overlay gradiente */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cine-950/80 via-transparent to-transparent opacity-80" />

                  {/* Badge de Calificación */}
                  {item.userRating !== null && item.userRating !== undefined && (
                    <div
                      className={`absolute top-2 right-2 px-1.5 py-0.5 rounded-md text-[10px] font-mono font-bold flex items-center gap-1 backdrop-blur-md shadow border ${
                        isCinema
                          ? "bg-black/80 text-amber-400 border-amber-500/40"
                          : "bg-black/80 text-purple-400 border-purple-500/40"
                      }`}
                    >
                      <Star
                        className={`w-2.5 h-2.5 ${
                          isCinema ? "fill-amber-400" : "fill-purple-400"
                        }`}
                      />
                      <span>{item.userRating.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Badge de Tipo (Serie) */}
                  {isSeries && (
                    <div className="absolute top-2 left-2 p-1 rounded-md bg-indigo-950/85 border border-indigo-500/40 text-indigo-300 shadow">
                      <Tv className="w-3 h-3" />
                    </div>
                  )}

                  {/* Badge de Horas / Estado si es juego */}
                  {!isCinema && item.hoursPlayed && item.hoursPlayed > 0 && (
                    <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded-md bg-black/80 backdrop-blur-md text-[10px] font-mono text-cyan-300 border border-cyan-500/30 flex items-center gap-1">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{item.hoursPlayed}h</span>
                    </div>
                  )}
                </div>

                {/* Info inferior */}
                <div className="p-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3
                      className={`text-xs font-bold text-white truncate transition-colors ${
                        isCinema
                          ? "group-hover:text-amber-300"
                          : "group-hover:text-purple-300"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-cine-400 font-mono mt-0.5">
                      <span>{item.year || "—"}</span>
                      {isCinema ? (
                        <span className="text-[9px] uppercase tracking-wider text-cine-500">
                          {isSeries ? "Serie" : "Película"}
                        </span>
                      ) : (
                        <span className="text-[9px] uppercase tracking-wider text-cyan-400">
                          {item.status || "—"}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Indicador de reseña si existe */}
                  {item.review && item.review.trim().length > 0 && (
                    <div className="mt-2 pt-1.5 border-t border-cine-800/60 flex items-center gap-1 text-[10px] text-cine-400 truncate">
                      <MessageSquare className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                      <span className="italic truncate">"{item.review}"</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      {/* Botón Ver Más */}
      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => {
              sounds.click();
              setVisibleCount((prev) => prev + 18);
            }}
            className="px-5 py-2.5 rounded-xl bg-cine-900 hover:bg-cine-800 border border-cine-700 text-xs font-bold text-white flex items-center gap-2 transition-all shadow-md hover:border-cine-500 cursor-pointer"
          >
            <span>
              Ver más títulos ({displayedItems.length} de {filteredItems.length})
            </span>
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </section>
  );
}
