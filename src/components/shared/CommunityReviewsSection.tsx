"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Star, MessageSquare, Heart, Clock, Sparkles } from "lucide-react";
import { calculateLevelAndRank } from "@/lib/ballKnowledge";
import { calculateGamerLevelAndRank } from "@/lib/gameKnowledge";
import { sounds } from "@/lib/sounds";

export interface CommunityReviewDetail {
  id: string;
  user: {
    id: string;
    username: string;
    name: string | null;
    image: string | null;
    totalXp: number;
  };
  userRating: number | null;
  review: string | null;
  platform?: string | null;
  hoursPlayed?: number | null;
  knowledgeScore?: number | null;
  knowledgeType?: "sofa" | "game";
  date: string;
}

interface CommunityReviewsSectionProps {
  reviews: CommunityReviewDetail[];
  title: string;
  themeColor?: "amber" | "purple";
  onOpenReviewModal?: () => void;
}

export default function CommunityReviewsSection({
  reviews,
  title,
  themeColor = "amber",
  onOpenReviewModal,
}: CommunityReviewsSectionProps) {
  const isPurple = themeColor === "purple";
  const [likedReviews, setLikedReviews] = useState<Record<string, boolean>>({});

  const toggleLike = (reviewId: string) => {
    setLikedReviews((prev) => {
      const current = Boolean(prev[reviewId]);
      if (!current) {
        sounds.star(8);
      } else {
        sounds.click();
      }
      return { ...prev, [reviewId]: !current };
    });
  };

  const validReviews = reviews.filter(
    (r) => r.review && r.review.trim() !== "",
  );

  return (
    <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-cine-800 space-y-6">
      <div className="flex items-center justify-between gap-4 border-b border-cine-800/80 pb-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              isPurple
                ? "bg-purple-500/20 text-purple-400 border border-purple-500/30"
                : "bg-amber-500/20 text-amber-400 border border-amber-500/30 shadow-gold-glow"
            }`}
          >
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Reseñas de la Comunidad
            </h3>
            <p className="text-xs text-cine-400">
              {validReviews.length === 0
                ? "Aún no hay críticas escritas para este título."
                : `${validReviews.length} ${
                    validReviews.length === 1
                      ? "crítica de la comunidad"
                      : "críticas de la comunidad"
                  }`}
            </p>
          </div>
        </div>

        {onOpenReviewModal && (
          <button
            onClick={onOpenReviewModal}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              isPurple
                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                : "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-gold-glow"
            }`}
          >
            Escribir mi Crítica
          </button>
        )}
      </div>

      {validReviews.length === 0 ? (
        <div className="p-8 rounded-2xl border border-dashed border-cine-800 text-center space-y-3 bg-cine-950/40">
          <MessageSquare className="w-8 h-8 text-cine-600 mx-auto" />
          <p className="text-sm font-semibold text-white">
            Nadie ha dejado su opinión sobre &quot;{title}&quot; todavía.
          </p>
          <p className="text-xs text-cine-400 max-w-sm mx-auto">
            Sé el primero en compartir tu análisis para guiar a otros cinéfilos
            y gamers.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {validReviews.map((r) => {
            const rankInfo =
              r.knowledgeType === "game"
                ? calculateGamerLevelAndRank(r.user.totalXp)
                : calculateLevelAndRank(r.user.totalXp);
            const isLiked = Boolean(likedReviews[r.id]);
            const formattedDate = new Date(r.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
              year: "numeric",
            });

            return (
              <div
                key={r.id}
                className="p-4 sm:p-5 rounded-2xl bg-cine-900/60 border border-cine-800/80 hover:border-cine-700 transition-all space-y-3"
              >
                {/* Cabecera de la reseña: autor, nota y fecha */}
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <Link
                    href={`/u/${r.user.username}`}
                    onClick={() => sounds.click()}
                    className="flex items-center gap-3 group/author"
                  >
                    <div className="w-10 h-10 rounded-xl overflow-hidden ring-2 ring-white/10 group-hover/author:ring-amber-400/50 bg-cine-950 flex items-center justify-center shrink-0">
                      {r.user.image ? (
                        <img
                          src={r.user.image}
                          alt={r.user.username}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-cine-800 text-white font-bold text-xs flex items-center justify-center">
                          {(r.user.name || r.user.username)[0]?.toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white text-sm group-hover/author:text-amber-400 transition-colors">
                          {r.user.name || r.user.username}
                        </span>
                        <span className="text-xs text-cine-400 font-mono">
                          @{r.user.username}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[11px] text-cine-400">
                        <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                        <span>{rankInfo.rankTitle}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Valoración */}
                  {r.userRating !== null && (
                    <div className="flex items-center gap-1 px-3 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 font-mono font-black text-sm">
                      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                      <span>{r.userRating.toFixed(1)}</span>
                      <span className="text-cine-500 text-[10px] font-normal">
                        /10
                      </span>
                    </div>
                  )}
                </div>

                {/* Texto de la crítica */}
                <blockquote className="p-3.5 rounded-xl bg-cine-950/60 border border-white/5 text-cine-200 text-sm leading-relaxed italic">
                  &quot;{r.review}&quot;
                </blockquote>

                {/* Pie: detalles y like */}
                <div className="flex items-center justify-between text-xs text-cine-400 pt-1">
                  <div className="flex items-center gap-3">
                    {r.platform && (
                      <span className="px-2 py-0.5 rounded-md bg-cine-900 border border-cine-800 text-[10px] font-semibold text-cine-300">
                        {r.platform}
                      </span>
                    )}
                    {r.hoursPlayed && r.hoursPlayed > 0 && (
                      <span className="flex items-center gap-1 text-cyan-400 font-mono text-[11px]">
                        <Clock className="w-3 h-3" />
                        <span>{Math.round(r.hoursPlayed)}h</span>
                      </span>
                    )}
                    <span className="text-cine-500">{formattedDate}</span>
                  </div>

                  <button
                    onClick={() => toggleLike(r.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      isLiked
                        ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                        : "bg-white/5 hover:bg-white/10 text-cine-400 hover:text-rose-400"
                    }`}
                  >
                    <Heart
                      className={`w-3 h-3 ${isLiked ? "fill-rose-400" : ""}`}
                    />
                    <span>{isLiked ? "1" : "Útil"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
