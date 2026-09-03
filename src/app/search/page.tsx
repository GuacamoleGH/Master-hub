"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, Loader2, Film, Star, ArrowLeft } from "lucide-react";
import { MovieSearchResult } from "@/types/movie";
import Link from "next/link";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";

  const [inputVal, setInputVal] = useState(query);
  const [results, setResults] = useState<MovieSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInputVal(query);
    if (query.trim()) {
      fetchResults(query);
    } else {
      setResults([]);
    }
  }, [query]);

  const fetchResults = async (q: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/movies/search?q=${encodeURIComponent(q)}`);
      if (res.ok) {
        const data = await res.json();
        setResults(data.results || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      router.push(`/search?q=${encodeURIComponent(inputVal.trim())}`);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Barra de búsqueda dedicada */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-cine-800 space-y-4">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-1.5 text-xs text-cine-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Volver atrás
        </button>

        <form onSubmit={handleSubmit} className="relative max-w-2xl">
          <Search className="absolute left-4 w-5 h-5 text-cine-400 pointer-events-none top-3.5" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Buscar por título (ej. Atrápame si puedes, The Prestige, Fight Club)..."
            className="w-full pl-12 pr-28 py-3.5 bg-cine-900 border border-cine-700 rounded-2xl text-base text-white placeholder-cine-500 focus:outline-none focus:border-amber-500 shadow-inner"
          />
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-5 bg-amber-500 hover:bg-amber-400 text-cine-950 font-bold rounded-xl text-xs transition-all shadow-gold-glow flex items-center gap-1.5"
          >
            Buscar
          </button>
        </form>

        {query && (
          <div className="text-xs text-cine-400">
            Resultados de búsqueda para:{" "}
            <strong className="text-amber-400">&quot;{query}&quot;</strong>
            {!isLoading && ` (${results.length} títulos encontrados)`}
          </div>
        )}
      </div>

      {/* Grid de resultados */}
      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <p className="text-xs text-cine-400">Consultando catálogo...</p>
        </div>
      ) : results.length === 0 && query ? (
        <div className="glass-panel p-12 rounded-3xl border border-cine-800 text-center flex flex-col items-center justify-center gap-3 max-w-md mx-auto">
          <Film className="w-12 h-12 text-cine-600" />
          <h3 className="text-base font-bold text-white">
            No se encontraron películas
          </h3>
          <p className="text-xs text-cine-400">
            Intenta con otro título o revisa la ortografía.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results.map((movie) => (
            <Link
              key={movie.id}
              href={`/movie/${movie.id}`}
              className="group glass-card rounded-2xl overflow-hidden flex flex-col bg-cine-900/60 border border-cine-800"
            >
              <div className="relative aspect-[2/3] w-full overflow-hidden bg-cine-950">
                {movie.posterPath ? (
                  <img
                    src={movie.posterPath}
                    alt={movie.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-cine-600 gap-2">
                    <Film className="w-10 h-10" />
                    <span className="text-xs">Sin póster</span>
                  </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-cine-950 via-transparent to-black/40 opacity-70 group-hover:opacity-40 transition-opacity" />

                {movie.voteAverage > 0 && (
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded-lg text-xs font-semibold text-amber-400 border border-amber-500/20 shadow">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{movie.voteAverage.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-white group-hover:text-amber-400 transition-colors line-clamp-1">
                    {movie.title}
                  </h4>
                  {movie.originalTitle &&
                    movie.originalTitle !== movie.title && (
                      <p className="text-[11px] text-cine-400 italic line-clamp-1">
                        {movie.originalTitle}
                      </p>
                    )}
                </div>
                {movie.year && (
                  <span className="text-xs text-cine-500 font-medium mt-1">
                    {movie.year}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[40vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
