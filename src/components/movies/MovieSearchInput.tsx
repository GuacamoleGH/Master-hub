"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Loader2, Film, Star, X } from "lucide-react";
import { MovieSearchResult } from "@/types/movie";

export default function MovieSearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounce search effect
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/movies/search?q=${encodeURIComponent(query)}`,
        );
        if (res.ok) {
          const data = await res.json();
          setResults(data.results || []);
          setIsOpen(true);
        }
      } catch (err) {
        console.error("Error buscando películas:", err);
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectMovie = (id: number) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/movie/${id}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-lg">
      <form onSubmit={handleSearchSubmit} className="relative">
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-cine-400 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.trim() && setIsOpen(true)}
            placeholder="Buscar cualquier película (ej. El truco final, Interstellar)..."
            className="w-full pl-10 pr-10 py-2.5 bg-cine-900/90 border border-cine-700/80 rounded-xl text-sm text-cine-100 placeholder-cine-500 focus:outline-none focus:border-amber-500/70 focus:ring-2 focus:ring-amber-500/20 transition-all shadow-inner"
          />
          {isLoading ? (
            <Loader2 className="absolute right-3.5 w-4 h-4 text-amber-400 animate-spin" />
          ) : query ? (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setResults([]);
                setIsOpen(false);
              }}
              className="absolute right-3.5 text-cine-400 hover:text-cine-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
        </div>
      </form>

      {/* Desplegable de autocompletado */}
      {isOpen && (results.length > 0 || isLoading) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-cine-900/95 border border-cine-700 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden z-50 divide-y divide-cine-800/80 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="max-h-[380px] overflow-y-auto">
            {results.map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleSelectMovie(movie.id)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-cine-800/60 transition-colors group"
              >
                {movie.posterPath ? (
                  <img
                    src={movie.posterPath}
                    alt={movie.title}
                    className="w-11 h-16 object-cover rounded-md flex-shrink-0 shadow border border-white/5 group-hover:scale-105 transition-transform"
                  />
                ) : (
                  <div className="w-11 h-16 bg-cine-800 rounded-md flex items-center justify-center text-cine-500 flex-shrink-0">
                    <Film className="w-5 h-5" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-cine-100 truncate group-hover:text-amber-400 transition-colors">
                    {movie.title}
                  </div>
                  {movie.originalTitle &&
                    movie.originalTitle !== movie.title && (
                      <div className="text-xs text-cine-400 truncate italic">
                        {movie.originalTitle}
                      </div>
                    )}
                  <div className="flex items-center gap-3 mt-1 text-xs text-cine-400">
                    {movie.year && <span>{movie.year}</span>}
                    {movie.voteAverage > 0 && (
                      <span className="flex items-center gap-1 text-amber-400 font-medium">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        {movie.voteAverage.toFixed(1)}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="p-2.5 bg-cine-950/80 text-center">
            <button
              onClick={handleSearchSubmit}
              className="text-xs text-amber-400 hover:text-amber-300 font-medium transition-colors"
            >
              Ver todos los resultados para &quot;{query}&quot; →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
