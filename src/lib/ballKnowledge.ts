import { CinephileRank } from "@/types/movie";

export const RANKS: CinephileRank[] = [
  {
    title: "Casual Viewer",
    minLevel: 1,
    maxLevel: 5,
    icon: "🍿",
    color: "#94A3B8", // slate
  },
  {
    title: "Cinephile",
    minLevel: 6,
    maxLevel: 15,
    icon: "🎬",
    color: "#38BDF8", // sky
  },
  {
    title: "Film Nerd",
    minLevel: 16,
    maxLevel: 30,
    icon: "🧠",
    color: "#A855F7", // purple
  },
  {
    title: "Sofa Knowledge Merchant",
    minLevel: 31,
    maxLevel: 50,
    icon: "🛋️",
    color: "#F59E0B", // amber
  },
  {
    title: "Criterion Goblin",
    minLevel: 51,
    maxLevel: 75,
    icon: "🗿",
    color: "#10B981", // emerald
  },
  {
    title: "Cinema God",
    minLevel: 76,
    maxLevel: 999,
    icon: "👑",
    color: "#EC4899", // pink/gold
  },
];

/**
 * Calcula el porcentaje de Ball Knowledge entre la nota del usuario y la nota de IMDb.
 *
 * Fórmula:
 * delta = userRating - imdbRating
 * Ball Knowledge = max(0, min(100, 100 - (|delta| * 10)))
 */
export function calculateBallKnowledge(
  userRating: number,
  imdbRating: number,
): {
  ballKnowledge: number;
  difference: number;
} {
  const diff = Number((userRating - imdbRating).toFixed(1));
  const absDiff = Math.abs(diff);
  const score = Math.max(0, Math.min(100, 100 - absDiff * 10));
  return {
    ballKnowledge: Number(score.toFixed(1)),
    difference: diff,
  };
}

/**
 * Calcula la experiencia (XP) generada por una película.
 */
export function calculateMovieXp(
  hasWatched: boolean,
  hasReview: boolean,
  ballKnowledge?: number | null,
): number {
  if (!hasWatched) return 10; // +10 XP por agregar a Watchlist

  let xp = 100; // Base por película vista
  if (hasReview) {
    xp += 50; // Bonus por redactar reseña
  }
  if (
    ballKnowledge !== null &&
    ballKnowledge !== undefined &&
    ballKnowledge >= 95
  ) {
    xp += 25; // Bonus por alta precisión de Ball Knowledge
  }
  return xp;
}

const XP_PER_LEVEL = 200;

/**
 * Determina el nivel, progreso y rango a partir de los puntos totales de XP.
 */
export function calculateLevelAndRank(totalXp: number) {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const currentLevelBaseXp = (level - 1) * XP_PER_LEVEL;
  const nextLevelXp = level * XP_PER_LEVEL;
  const xpInCurrentLevel = totalXp - currentLevelBaseXp;
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100)),
  );

  const rank =
    RANKS.find((r) => level >= r.minLevel && level <= r.maxLevel) ||
    RANKS[RANKS.length - 1];

  return {
    level,
    totalXp,
    rankTitle: rank.title,
    rankIcon: rank.icon,
    rankColor: rank.color,
    currentLevelBaseXp,
    nextLevelXp,
    xpProgressPercent: progressPercent,
  };
}
