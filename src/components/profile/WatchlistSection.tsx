"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Bookmark,
  Film,
  Gamepad2,
  Search,
  Star,
  Tv,
  Globe,
  Lock,
  ChevronDown,
  X,
  Sparkles,
  Loader2,
} from "lucide-react";
import { sounds } from "@/lib/sounds";
import { WatchedCatalogItem } from "./WatchedCatalogSection";

interface WatchlistSectionProps {
  type: "cinema" | "gaming";
  items: WatchedCatalogItem[];
  isOwner?: boolean;
  isPublic: boolean;
  username?: string | null;
  onTogglePrivacy?: (newVal: boolean) => Promise<void> | void;
}

export default function WatchlistSection({
  type,
  items,
  isOwner = false,
  isPublic,
  username,
  onTogglePrivacy,
}: WatchlistSectionProps) {
  const isCinema = type === "cinema";
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("recent");
  const [visibleCount, setVisibleCount] = useState<number>(18);
  const [isUpdatingPrivacy, setIsUpdatingPrivacy] = useState(false);

  const title = isCinema
    ? "Watchlist de Cine & Series"
    : "Backlog de Videojuegos";
  const subtitle = isCinema
    ? "Títulos marcados como pendientes para ver"
    : "Videojuegos pendientes por jugar en tu backlog";

  // Conteos de filtros
  const counts = useMemo(() => {
    if (isCinema) {
      const moviesCount = items.filter((i) => i.mediaType === "movie").length;
      const seriesCount = items.filter((i) => i.mediaType === "series").length;
      return { all: items.length, movies: moviesCount, series: seriesCount };
    } else {
      return { all: items.length };
    }
  }, [items, isCinema]);

  // Manejar el toggle de privacidad
  const handleTogglePrivacy = async () => {
    if (!onTogglePrivacy || isUpdatingPrivacy) return;
    try {
      setIsUpdatingPrivacy(true);
      sounds.switch();
      await onTogglePrivacy(!isPublic);
    } catch (err) {
      console.error("Error al cambiar visibilidad:", err);
    } finally {
      setIsUpdatingPrivacy(false);
    }
  };

  // Filtrado y ordenación
  const filteredItems = useMemo(() => {
    let result = [...items];

    // Búsqueda por texto
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.title.toLowerCase().includes(q) ||
          (i.platform && i.platform.toLowerCase().includes(q)),
      );
    }

    // Filtros por universo
    if (isCinema) {
      if (filterType === "movies") {
        result = result.filter((i) => i.mediaType === "movie");
      } else if (filterType === "series") {
        result = result.filter((i) => i.mediaType === "series");
      }
    }

    // Ordenación
    result.sort((a, b) => {
      if (sortBy === "recent") {
        const dateA = (a as any).addedDate
          ? new Date((a as any).addedDate).getTime()
          : 0;
        const dateB = (b as any).addedDate
          ? new Date((b as any).addedDate).getTime()
          : 0;
        return dateB - dateA;
      }
      if (sortBy === "rating_desc") {
        const ratingA = isCinema ? a.imdbRating || 0 : a.metacritic || 0;
        const ratingB = isCinema ? b.imdbRating || 0 : b.metacritic || 0;
        return ratingB - ratingA;
      }
      if (sortBy === "year_desc") {
        return Number(b.year || 0) - Number(a.year || 0);
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
          <div className="flex items-center gap-2.5 flex-wrap">
            <span
              className={`p-1.5 rounded-lg border ${
                isCinema
                  ? "bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-gold-glow"
                  : "bg-purple-500/20 text-purple-400 border-purple-500/40 shadow-neon-purple"
              }`}
            >
              <Bookmark className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-black text-white tracking-wide">
              {title}
            </h2>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                isCinema
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                  : "bg-purple-500/10 text-purple-400 border-purple-500/30"
              }`}
            >
              {isPublic || isOwner ? items.length : "🔒"}
            </span>

            {/* Toggle de Privacidad (si es Owner) o Badge (si es visitante) */}
            {isOwner && onTogglePrivacy ? (
              <button
                type="button"
                onClick={handleTogglePrivacy}
                disabled={isUpdatingPrivacy}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold border transition-all shadow-sm ml-auto sm:ml-2 ${
                  isPublic
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                    : "bg-rose-500/10 text-rose-400 border-rose-500/40 hover:bg-rose-500/20 shadow-[0_0_12px_rgba(244,63,94,0.2)]"
                }`}
                title={
                  isPublic
                    ? "Tu lista es pública. Haz clic para cambiarla a privada."
                    : "Tu lista es privada. Haz clic para cambiarla a pública."
                }
              >
                {isUpdatingPrivacy ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : isPublic ? (
                  <Globe className="w-3.5 h-3.5" />
                ) : (
                  <Lock className="w-3.5 h-3.5" />
                )}
                <span>{isPublic ? "Pública" : "Privada"}</span>
                <span className="text-[10px] opacity-75 font-normal hidden lg:inline">
                  {isPublic ? "(visible para todos)" : "(solo tú)"}
                </span>
              </button>
            ) : (
              <div className="ml-auto sm:ml-2">
                {isPublic ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    <Globe className="w-3 h-3" />
                    <span>Pública</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                    <Lock className="w-3 h-3" />
                    <span>Privada</span>
                  </span>
                )}
              </div>
            )}
          </div>
          <p className="text-xs text-cine-400 mt-1">{subtitle}</p>
        </div>

        {/* Barra de Filtros y Búsqueda (solo si es accesible) */}
        {(isPublic || isOwner) && items.length > 0 && (
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Buscador */}
            <div className="relative min-w-[170px]">
              <Search className="w-3.5 h-3.5 text-cine-500 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar pendiente..."
                className="w-full bg-cine-900 border border-cine-700/60 rounded-xl pl-8 pr-7 py-1.5 text-xs text-white placeholder-cine-500 focus:outline-none focus:border-amber-400/70"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-cine-500 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Selector de Orden */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-cine-900 border border-cine-700/60 rounded-xl px-2.5 py-1.5 text-xs text-cine-300 focus:outline-none focus:border-amber-400/70"
            >
              <option value="recent">Recién añadidos</option>
              <option value="rating_desc">
                {isCinema ? "Calificación IMDb" : "Metacritic"}
              </option>
              <option value="year_desc">Año de estreno</option>
              <option value="title_asc">Título (A-Z)</option>
            </select>
          </div>
        )}
      </div>

      {/* Si es PRIVADA y NO es el dueño -> Mostrar Card de Privacidad elegante */}
      {!isPublic && !isOwner ? (
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cine-800 bg-cine-950/60 flex flex-col items-center text-center space-y-4 shadow-xl my-4">
          <div className="w-16 h-16 rounded-2xl bg-cine-900/90 border border-cine-700/50 flex items-center justify-center text-cine-400 shadow-inner">
            <Lock className="w-8 h-8 text-rose-400/80" />
          </div>
          <div className="space-y-1.5 max-w-md">
            <h3 className="text-base sm:text-lg font-bold text-white">
              {isCinema ? "Watchlist Privada" : "Backlog Privado"}
            </h3>
            <p className="text-xs sm:text-sm text-cine-400 leading-relaxed">
              {username ? `@${username}` : "Este usuario"} ha configurado su
              lista de pendientes como privada. Solo{" "}
              {username ? `@${username}` : "el usuario"} puede ver sus títulos
              pendientes.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Pestañas de Filtro (Cine: Todos / Películas / Series) */}
          {isCinema && items.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => {
                  sounds.playClick();
                  setFilterType("all");
                }}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  filterType === "all"
                    ? "bg-amber-500 text-slate-950 shadow-gold-glow"
                    : "bg-cine-900 border border-cine-800 text-cine-400 hover:text-white"
                }`}
              >
                Todos ({counts.all})
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setFilterType("movies");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  filterType === "movies"
                    ? "bg-amber-500 text-slate-950 shadow-gold-glow"
                    : "bg-cine-900 border border-cine-800 text-cine-400 hover:text-white"
                }`}
              >
                <Film className="w-3.5 h-3.5" />
                <span>Películas ({counts.movies})</span>
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  setFilterType("series");
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  filterType === "series"
                    ? "bg-amber-500 text-slate-950 shadow-gold-glow"
                    : "bg-cine-900 border border-cine-800 text-cine-400 hover:text-white"
                }`}
              >
                <Tv className="w-3.5 h-3.5" />
                <span>Series ({counts.series})</span>
              </button>
            </div>
          )}

          {/* Grid de Ítems */}
          {displayedItems.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
              {displayedItems.map((item) => {
                const isMovie = item.mediaType === "movie";
                const isSeries = item.mediaType === "series";

                return (
                  <Link
                    key={item.id}
                    href={item.link}
                    onClick={() => sounds.playClick()}
                    className="group relative flex flex-col bg-cine-900/60 border border-cine-800/80 hover:border-amber-500/50 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex-shrink-0"
                  >
                    {/* Imagen / Póster */}
                    <div className="relative aspect-[2/3] w-full bg-cine-950 overflow-hidden">
                      {item.posterPath ? (
                        <img
                          src={item.posterPath}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-cine-600 gap-2 p-3 text-center">
                          {isCinema ? (
                            <Film className="w-8 h-8" />
                          ) : (
                            <Gamepad2 className="w-8 h-8" />
                          )}
                          <span className="text-[10px] line-clamp-2">
                            {item.title}
                          </span>
                        </div>
                      )}

                      {/* Gradiente */}
                      <div className="absolute inset-0 bg-gradient-to-t from-cine-950 via-transparent to-black/40 opacity-80 group-hover:opacity-60 transition-opacity" />

                      {/* Icono de Watchlist en la esquina superior izquierda */}
                      <div className="absolute top-2 left-2">
                        <span
                          className={`flex items-center justify-center w-6 h-6 rounded-lg backdrop-blur-md border ${
                            isCinema
                              ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                              : "bg-purple-500/20 text-purple-400 border-purple-500/40"
                          }`}
                        >
                          <Bookmark className="w-3.5 h-3.5 fill-current" />
                        </span>
                      </div>

                      {/* Badge de Tipo / Plataforma en esquina superior derecha */}
                      <div className="absolute top-2 right-2">
                        {isCinema ? (
                          <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold text-white uppercase tracking-wider">
                            {isMovie ? (
                              <>
                                <Film className="w-2.5 h-2.5 text-amber-400" />
                                <span>PELI</span>
                              </>
                            ) : (
                              <>
                                <Tv className="w-2.5 h-2.5 text-cyan-400" />
                                <span>SERIE</span>
                              </>
                            )}
                          </span>
                        ) : (
                          item.platform && (
                            <span className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-purple-500/30 text-[9px] font-bold text-purple-300 truncate max-w-[90px]">
                              {item.platform.split(",")[0]}
                            </span>
                          )
                        )}
                      </div>

                      {/* Calificación IMDb / Metacritic en la esquina inferior */}
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                        {isCinema && typeof item.imdbRating === "number" && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-amber-500/40 text-[10px] font-bold text-amber-300">
                            <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                            <span>{item.imdbRating.toFixed(1)}</span>
                          </span>
                        )}

                        {!isCinema && typeof item.metacritic === "number" && (
                          <span
                            className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md border text-[10px] font-black ${
                              item.metacritic >= 75
                                ? "text-emerald-400 border-emerald-500/40"
                                : item.metacritic >= 50
                                  ? "text-amber-400 border-amber-500/40"
                                  : "text-rose-400 border-rose-500/40"
                            }`}
                          >
                            <span>MC {item.metacritic}</span>
                          </span>
                        )}

                        {item.year && (
                          <span className="text-[10px] font-medium text-cine-300 bg-black/60 px-1.5 py-0.5 rounded backdrop-blur-md ml-auto">
                            {item.year}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contenido inferior */}
                    <div className="p-2.5 flex flex-col justify-between flex-1 gap-1">
                      <h3
                        className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-400 transition-colors"
                        title={item.title}
                      >
                        {item.title}
                      </h3>
                      <span className="text-[10px] text-cine-400 capitalize">
                        {isCinema
                          ? isMovie
                            ? "Película pendiente"
                            : "Serie pendiente"
                          : "En backlog"}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="glass-panel p-8 rounded-3xl border border-cine-800/80 bg-cine-950/40 text-center space-y-2">
              <Bookmark className="w-8 h-8 text-cine-600 mx-auto" />
              <h3 className="text-sm font-bold text-cine-300">
                {searchQuery
                  ? "No se encontraron títulos pendientes con esa búsqueda"
                  : isCinema
                    ? "La watchlist está vacía"
                    : "El backlog está vacío"}
              </h3>
              <p className="text-xs text-cine-500 max-w-sm mx-auto">
                {isOwner
                  ? "Explora el catálogo o busca nuevos títulos para añadirlos a tu lista de pendientes."
                  : "El usuario aún no ha añadido ningún título a su lista de pendientes."}
              </p>
            </div>
          )}

          {/* Botón Ver Más */}
          {hasMore && (
            <div className="flex justify-center pt-2">
              <button
                onClick={() => {
                  sounds.playClick();
                  setVisibleCount((prev) => prev + 18);
                }}
                className="flex items-center gap-2 px-6 py-2.5 bg-cine-900 hover:bg-cine-800 border border-cine-700/60 rounded-xl text-xs font-bold text-white transition-all hover:scale-105"
              >
                <span>
                  Ver más ({filteredItems.length - visibleCount} restantes)
                </span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
