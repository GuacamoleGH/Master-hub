"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  MessageSquare,
  Film,
  Gamepad2,
  Sparkles,
  Search,
  Loader2,
  Clock,
  Star,
  Flame,
  Filter,
} from "lucide-react";
import ReviewFeedCard from "@/components/reviews/ReviewFeedCard";
import { UnifiedReview } from "@/app/api/reviews/route";
import { sounds } from "@/lib/sounds";

function ReviewsFeedContent() {
  const searchParams = useSearchParams();
  const initialCategory =
    (searchParams.get("category") as "all" | "cinema" | "gaming") || "all";
  const initialSort =
    (searchParams.get("sort") as "recent" | "highest" | "lowest") || "recent";

  const [category, setCategory] = useState<"all" | "cinema" | "gaming">(
    initialCategory,
  );
  const [sort, setSort] = useState<"recent" | "highest" | "lowest">(
    initialSort,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [reviews, setReviews] = useState<UnifiedReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams({
          category,
          sort,
          ...(searchQuery ? { q: searchQuery } : {}),
        });
        const res = await fetch(`/api/reviews?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setReviews(data.reviews || []);
        }
      } catch (err) {
        console.error("Error al cargar reseñas:", err);
      } finally {
        setIsLoading(false);
      }
    }

    const timer = setTimeout(fetchReviews, searchQuery ? 300 : 0);
    return () => clearTimeout(timer);
  }, [category, sort, searchQuery]);

  const handleCategoryChange = (newCat: "all" | "cinema" | "gaming") => {
    sounds.nav();
    setCategory(newCat);
  };

  const handleSortChange = (newSort: "recent" | "highest" | "lowest") => {
    sounds.click();
    setSort(newSort);
  };

  return (
    <div className="space-y-8 pb-20 animate-fadeIn">
      {/* 1. Cabecera Hero de Reseñas */}
      <section className="relative overflow-hidden rounded-3xl border border-cine-800 bg-gradient-to-b from-cine-900 via-cine-950 to-cine-900 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Muro Crítico de la Comunidad</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Reseñas & Críticas
          </h1>

          <p className="text-xs sm:text-sm text-cine-300">
            Descubre qué opinan otros miembros sobre sus películas, series y
            videojuegos favoritos. Filtra por universo y ordena por actualidad,
            nota o discrepancias.
          </p>
        </div>

        {/* Barra de Filtros de Categoría */}
        <div className="relative z-10 mt-8 flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-cine-950/80 border border-cine-800/80 max-w-fit">
          <button
            onClick={() => handleCategoryChange("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              category === "all"
                ? "bg-gradient-to-r from-amber-500 to-purple-600 text-white shadow-lg"
                : "text-cine-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Todas</span>
          </button>

          <button
            onClick={() => handleCategoryChange("cinema")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              category === "cinema"
                ? "bg-amber-500 text-slate-950 shadow-gold-glow"
                : "text-cine-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Cine & Series</span>
          </button>

          <button
            onClick={() => handleCategoryChange("gaming")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              category === "gaming"
                ? "bg-purple-600 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "text-cine-300 hover:text-white hover:bg-white/5"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Videojuegos</span>
          </button>
        </div>
      </section>

      {/* 2. Barra de Control: Buscador y Criterios de Ordenación */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Buscador de reseñas */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-cine-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por obra, crítico o palabra clave..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-cine-900/80 border border-cine-800 text-xs text-white placeholder-cine-500 focus:outline-none focus:border-amber-500/60 transition-colors"
          />
        </div>

        {/* Botones de Ordenación */}
        <div className="flex items-center gap-2 flex-wrap self-start md:self-center">
          <span className="text-xs text-cine-500 font-mono hidden sm:inline flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" />
            <span>Ordenar por:</span>
          </span>

          <button
            onClick={() => handleSortChange("recent")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sort === "recent"
                ? "bg-cine-800 text-white border border-cine-700 shadow-sm"
                : "text-cine-400 hover:text-white bg-cine-900/60 border border-transparent"
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Más recientes</span>
          </button>

          <button
            onClick={() => handleSortChange("highest")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sort === "highest"
                ? "bg-cine-800 text-white border border-cine-700 shadow-sm"
                : "text-cine-400 hover:text-white bg-cine-900/60 border border-transparent"
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>Mayor nota</span>
          </button>

          <button
            onClick={() => handleSortChange("lowest")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sort === "lowest"
                ? "bg-cine-800 text-white border border-cine-700 shadow-sm"
                : "text-cine-400 hover:text-white bg-cine-900/60 border border-transparent"
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Hot Takes (Menor nota)</span>
          </button>
        </div>
      </div>

      {/* 3. Feed de Reseñas */}
      {isLoading ? (
        <div className="min-h-[40vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <span className="text-xs text-cine-400 font-mono">
            Cargando opiniones de la comunidad...
          </span>
        </div>
      ) : reviews.length === 0 ? (
        <div className="rounded-3xl border border-cine-800 bg-cine-900/40 p-12 text-center space-y-3">
          <MessageSquare className="w-10 h-10 text-cine-600 mx-auto" />
          <h3 className="text-base font-bold text-white">
            No se encontraron reseñas
          </h3>
          <p className="text-xs text-cine-400 max-w-sm mx-auto">
            {searchQuery
              ? `No hay críticas que coincidan con "${searchQuery}".`
              : "Todavía no se han redactado reseñas en esta categoría. ¡Sé el primero!"}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-cine-500 font-mono flex items-center justify-between pb-1 border-b border-cine-800/80">
            <span>
              {reviews.length}{" "}
              {reviews.length === 1
                ? "crítica encontrada"
                : "críticas encontradas"}
            </span>
            <span>Comunidad Master Hub</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {reviews.map((rev) => (
              <ReviewFeedCard key={`${rev.mediaType}-${rev.id}`} review={rev} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-amber-400 animate-spin" />
          <span className="text-xs text-cine-400 font-mono">
            Cargando muro de reseñas...
          </span>
        </div>
      }
    >
      <ReviewsFeedContent />
    </Suspense>
  );
}
