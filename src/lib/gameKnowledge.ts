import { GamerRank, HotTake } from '@/types/game';

export const GAMER_RANKS: GamerRank[] = [
  {
    title: 'Button Masher',
    minLevel: 1,
    maxLevel: 5,
    icon: '🕹️',
    color: '#94A3B8', // slate
  },
  {
    title: 'Casual Gamer',
    minLevel: 6,
    maxLevel: 15,
    icon: '🎮',
    color: '#38BDF8', // sky
  },
  {
    title: 'Core Gamer',
    minLevel: 16,
    maxLevel: 30,
    icon: '⚔️',
    color: '#8B5CF6', // purple / violet
  },
  {
    title: 'Game Knowledge Specialist',
    minLevel: 31,
    maxLevel: 50,
    icon: '🧠',
    color: '#EC4899', // pink
  },
  {
    title: 'Backlog Slayer',
    minLevel: 51,
    maxLevel: 75,
    icon: '🏆',
    color: '#F59E0B', // amber
  },
  {
    title: 'Gaming Legend',
    minLevel: 76,
    maxLevel: 999,
    icon: '👑',
    color: '#06B6D4', // cyan / gold
  },
];

/**
 * Calcula la coincidencia de Game Knowledge a partir de tu nota y la de Metacritic (0-100 convertida a 0-10)
 */
export function calculateGameKnowledge(userRating: number, metacritic: number): {
  gameKnowledge: number;
  criticRating: number;
  difference: number;
} {
  const criticRating = Number((metacritic / 10).toFixed(1));
  const diff = Number((userRating - criticRating).toFixed(1));
  const absDiff = Math.abs(diff);
  const score = Math.max(0, Math.min(100, 100 - absDiff * 10));

  return {
    gameKnowledge: Number(score.toFixed(1)),
    criticRating,
    difference: diff,
  };
}

/**
 * Calcula la experiencia (XP) generada por un videojuego según su estado, horas y reseña
 */
export function calculateGameXp(
  status: string,
  hasReview: boolean,
  hoursPlayed?: number | null,
  gameKnowledge?: number | null
): number {
  let xp = 0;

  if (status === 'BACKLOG') {
    xp = 15;
  } else if (status === 'PLAYING') {
    xp = 35;
  } else if (status === 'COMPLETED') {
    xp = 150;
  } else if (status === 'PLATINUM') {
    xp = 250;
  } else if (status === 'DROPPED') {
    xp = 20;
  }

  // Bonus por reseña
  if (hasReview) xp += 50;

  // Bonus por alta coincidencia Game Knowledge
  if (gameKnowledge !== null && gameKnowledge !== undefined && gameKnowledge >= 95) {
    xp += 30;
  }

  // Bonus acumulativo por horas jugadas (10 XP por cada 10 horas)
  if (hoursPlayed && hoursPlayed > 0) {
    xp += Math.min(200, Math.floor(hoursPlayed / 10) * 10);
  }

  return xp;
}

const XP_PER_LEVEL = 250;

/**
 * Determina el nivel gamer, barra de progreso y título
 */
export function calculateGamerLevelAndRank(totalXp: number) {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const currentLevelBaseXp = (level - 1) * XP_PER_LEVEL;
  const nextLevelXp = level * XP_PER_LEVEL;
  const xpInCurrentLevel = totalXp - currentLevelBaseXp;
  const progressPercent = Math.min(100, Math.max(0, Math.round((xpInCurrentLevel / XP_PER_LEVEL) * 100)));

  const rank =
    GAMER_RANKS.find((r) => level >= r.minLevel && level <= r.maxLevel) ||
    GAMER_RANKS[GAMER_RANKS.length - 1];

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

/**
 * Clasifica un juego en Hot Takes
 */
export function classifyHotTake(diff: number): HotTake['type'] {
  if (diff <= -2.0) return 'OVERRATED';
  if (diff >= 2.0) return 'UNDERRATED';
  return 'BASED';
}
