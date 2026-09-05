export type AchievementCategory = "CINE" | "GAMING" | "CRITIC" | "MASTERY";
export type AchievementRarity = "BRONZE" | "SILVER" | "GOLD" | "DIAMOND";

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  rarity: AchievementRarity;
  iconName: string;
  xp: number;
  targetValue: number;
}

export interface UserAchievement extends AchievementDefinition {
  isUnlocked: boolean;
  progress: number; // 0 a 100
  currentValue: number;
  unlockedAt?: string | null;
}

export interface AchievementEvaluationInput {
  movies?: Array<{
    status: string;
    userRating?: number | null;
    difference?: number | null;
    platform?: string | null;
    review?: string | null;
    ballKnowledge?: number | null;
    createdAt?: string | Date;
  }>;
  series?: Array<{
    status: string;
    userRating?: number | null;
    difference?: number | null;
    platform?: string | null;
    review?: string | null;
    ballKnowledge?: number | null;
    createdAt?: string | Date;
  }>;
  games?: Array<{
    status: string;
    userRating?: number | null;
    difference?: number | null;
    hoursPlayed?: number | null;
    review?: string | null;
    gameKnowledge?: number | null;
    createdAt?: string | Date;
  }>;
  stats?: {
    avgBallKnowledge?: number | null;
    avgGameKnowledge?: number | null;
    totalHours?: number | null;
  };
}

export const ACHIEVEMENTS_CATALOG: AchievementDefinition[] = [
  // CINE & SERIES
  {
    id: "cine_first_movie",
    title: "Primer Fotograma",
    description: "Registra tu primera película vista en el catálogo.",
    category: "CINE",
    rarity: "BRONZE",
    iconName: "Film",
    xp: 15,
    targetValue: 1,
  },
  {
    id: "cine_marathoner",
    title: "Sesión Continua",
    description: "Registra 10 o más películas vistas.",
    category: "CINE",
    rarity: "SILVER",
    iconName: "Clapperboard",
    xp: 35,
    targetValue: 10,
  },
  {
    id: "cine_cinematheque",
    title: "Filmoteca Viviente",
    description: "Alcanza 25 o más películas vistas en tu historial.",
    category: "CINE",
    rarity: "GOLD",
    iconName: "Sparkles",
    xp: 75,
    targetValue: 25,
  },
  {
    id: "cine_pirate_captain",
    title: "Rey de los Mares",
    description: "Registra un título disfrutado en plataforma Pirata 🏴‍☠️.",
    category: "CINE",
    rarity: "BRONZE",
    iconName: "Skull",
    xp: 20,
    targetValue: 1,
  },
  {
    id: "cine_series_binge",
    title: "Atracón de Temporadas",
    description: "Registra al menos 3 series vistas o seguidas.",
    category: "CINE",
    rarity: "SILVER",
    iconName: "Tv",
    xp: 35,
    targetValue: 3,
  },
  {
    id: "cine_bullseye",
    title: "Ojo de Halcón Cinéfilo",
    description: "Consigue una diferencia exacta de 0.0 frente a la nota de IMDb.",
    category: "CINE",
    rarity: "GOLD",
    iconName: "Target",
    xp: 60,
    targetValue: 1,
  },

  // GAMING
  {
    id: "game_press_start",
    title: "Press Start",
    description: "Registra tu primer videojuego en tu biblioteca.",
    category: "GAMING",
    rarity: "BRONZE",
    iconName: "Gamepad2",
    xp: 15,
    targetValue: 1,
  },
  {
    id: "game_first_clear",
    title: "Victoria Magistral",
    description: "Marca tu primer videojuego como Completado.",
    category: "GAMING",
    rarity: "BRONZE",
    iconName: "CheckCircle",
    xp: 25,
    targetValue: 1,
  },
  {
    id: "game_marathon",
    title: "Finisher Legendario",
    description: "Completa 5 o más videojuegos en tu historial.",
    category: "GAMING",
    rarity: "SILVER",
    iconName: "Trophy",
    xp: 50,
    targetValue: 5,
  },
  {
    id: "game_platinum_hunter",
    title: "Cazador de Platinos",
    description: "Alcanza el estatus Platino en al menos un videojuego.",
    category: "GAMING",
    rarity: "GOLD",
    iconName: "Award",
    xp: 75,
    targetValue: 1,
  },
  {
    id: "game_veteran_hours",
    title: "Veterano del Vicio",
    description: "Acumula más de 30 horas registradas de juego.",
    category: "GAMING",
    rarity: "SILVER",
    iconName: "Clock",
    xp: 40,
    targetValue: 30,
  },
  {
    id: "game_time_lord",
    title: "No-Life Honorario",
    description: "Acumula más de 100 horas registradas en videojuegos.",
    category: "GAMING",
    rarity: "DIAMOND",
    iconName: "Zap",
    xp: 120,
    targetValue: 100,
  },
  {
    id: "game_metacritic_sniper",
    title: "Metacritic Sniper",
    description: "Coincide exactamente con la nota de Metacritic (diferencia 0.0).",
    category: "GAMING",
    rarity: "GOLD",
    iconName: "Crosshair",
    xp: 60,
    targetValue: 1,
  },

  // CRITIC & COMMUNITY
  {
    id: "critic_first_words",
    title: "Voz en el Desierto",
    description: "Escribe tu primera reseña con texto.",
    category: "CRITIC",
    rarity: "BRONZE",
    iconName: "MessageSquare",
    xp: 15,
    targetValue: 1,
  },
  {
    id: "critic_top_reviewer",
    title: "Crítico Acreditado",
    description: "Escribe al menos 5 reseñas detalladas.",
    category: "CRITIC",
    rarity: "SILVER",
    iconName: "Feather",
    xp: 45,
    targetValue: 5,
  },
  {
    id: "critic_hot_take",
    title: "Pirómano de Opiniones",
    description: "Deja una Hot Take con más de 2.5 puntos de diferencia con la crítica.",
    category: "CRITIC",
    rarity: "SILVER",
    iconName: "Flame",
    xp: 40,
    targetValue: 1,
  },
  {
    id: "critic_perfectionist",
    title: "Obra Maestra Universal",
    description: "Otorga una calificación perfecta de 10/10 a un título.",
    category: "CRITIC",
    rarity: "BRONZE",
    iconName: "Star",
    xp: 20,
    targetValue: 1,
  },

  // MASTERY
  {
    id: "mastery_sofa_scholar",
    title: "Cátedra del Sofá",
    description: "Mantén un Sofa Knowledge promedio superior al 80%.",
    category: "MASTERY",
    rarity: "GOLD",
    iconName: "Brain",
    xp: 70,
    targetValue: 80,
  },
  {
    id: "mastery_game_sage",
    title: "Sabio del Gamepad",
    description: "Mantén un Game Knowledge promedio superior al 80%.",
    category: "MASTERY",
    rarity: "GOLD",
    iconName: "Compass",
    xp: 70,
    targetValue: 80,
  },
  {
    id: "mastery_omnipresent",
    title: "Señor Multi-Universo",
    description: "Registra al menos 10 películas y 25 horas de videojuegos.",
    category: "MASTERY",
    rarity: "DIAMOND",
    iconName: "Crown",
    xp: 150,
    targetValue: 35, // 10 movies + 25 hours
  },
];

export function evaluateUserAchievements(
  data: AchievementEvaluationInput,
): {
  achievements: UserAchievement[];
  totalUnlocked: number;
  totalAvailable: number;
  totalXpEarned: number;
  totalPossibleXp: number;
  completionRate: number;
} {
  const movies = data.movies || [];
  const series = data.series || [];
  const games = data.games || [];

  const watchedMovies = movies.filter((m) => m.status === "WATCHED");
  const watchedSeries = series.filter((s) => s.status === "WATCHED");
  const completedGames = games.filter(
    (g) => g.status === "COMPLETED" || g.status === "PLATINUM",
  );
  const platinumGames = games.filter((g) => g.status === "PLATINUM");

  const totalHours =
    data.stats?.totalHours ??
    games.reduce((acc, g) => acc + (Number(g.hoursPlayed) || 0), 0);

  const pirateTitlesCount =
    movies.filter((m) => m.platform === "Pirata").length +
    series.filter((s) => s.platform === "Pirata").length;

  // Películas o series con diferencia exacta de 0
  const zeroDiffCineCount = [...movies, ...series].filter(
    (item) => item.difference !== null && item.difference !== undefined && Math.abs(item.difference) < 0.05,
  ).length;

  // Juegos con diferencia exacta de 0
  const zeroDiffGameCount = games.filter(
    (g) => g.difference !== null && g.difference !== undefined && Math.abs(g.difference) < 0.05,
  ).length;

  // Reseñas con texto
  const textReviewsCount = [
    ...movies.filter((m) => m.review && m.review.trim().length > 0),
    ...series.filter((s) => s.review && s.review.trim().length > 0),
    ...games.filter((g) => g.review && g.review.trim().length > 0),
  ].length;

  // Hot takes (> 2.5 de diferencia)
  const hotTakesCount = [
    ...movies.filter((m) => m.difference !== null && m.difference !== undefined && Math.abs(m.difference) >= 2.5),
    ...games.filter((g) => g.difference !== null && g.difference !== undefined && Math.abs(g.difference) >= 2.5),
  ].length;

  // Puntuaciones perfectas (10)
  const perfectRatingsCount = [
    ...movies.filter((m) => m.userRating === 10),
    ...series.filter((s) => s.userRating === 10),
    ...games.filter((g) => g.userRating === 10),
  ].length;

  // Promedios
  const ballKnowledgeAvg = data.stats?.avgBallKnowledge ?? 0;
  const gameKnowledgeAvg = data.stats?.avgGameKnowledge ?? 0;

  const achievements: UserAchievement[] = ACHIEVEMENTS_CATALOG.map((def) => {
    let currentValue = 0;
    let isUnlocked = false;

    switch (def.id) {
      case "cine_first_movie":
        currentValue = watchedMovies.length;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "cine_marathoner":
        currentValue = watchedMovies.length;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "cine_cinematheque":
        currentValue = watchedMovies.length;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "cine_pirate_captain":
        currentValue = pirateTitlesCount;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "cine_series_binge":
        currentValue = watchedSeries.length;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "cine_bullseye":
        currentValue = zeroDiffCineCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_press_start":
        currentValue = games.length;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "game_first_clear":
        currentValue = completedGames.length;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "game_marathon":
        currentValue = completedGames.length;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "game_platinum_hunter":
        currentValue = platinumGames.length;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "game_veteran_hours":
        currentValue = Math.round(totalHours);
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "game_time_lord":
        currentValue = Math.round(totalHours);
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "game_metacritic_sniper":
        currentValue = zeroDiffGameCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "critic_first_words":
        currentValue = textReviewsCount;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "critic_top_reviewer":
        currentValue = textReviewsCount;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "critic_hot_take":
        currentValue = hotTakesCount;
        isUnlocked = currentValue >= def.targetValue;
        break;
      case "critic_perfectionist":
        currentValue = perfectRatingsCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "mastery_sofa_scholar":
        currentValue = Math.round(ballKnowledgeAvg);
        isUnlocked = currentValue >= def.targetValue && watchedMovies.length >= 3;
        break;
      case "mastery_game_sage":
        currentValue = Math.round(gameKnowledgeAvg);
        isUnlocked = currentValue >= def.targetValue && games.length >= 3;
        break;
      case "mastery_omnipresent":
        // 10 pelis + 25h = 35 puntos de hito combinado
        const cinePart = Math.min(watchedMovies.length, 10);
        const gamePart = Math.min(Math.round(totalHours), 25);
        currentValue = cinePart + gamePart;
        isUnlocked = watchedMovies.length >= 10 && totalHours >= 25;
        break;
      default:
        break;
    }

    const progress = Math.min(
      100,
      Math.max(0, Math.round((currentValue / def.targetValue) * 100)),
    );

    return {
      ...def,
      currentValue,
      progress: isUnlocked ? 100 : progress,
      isUnlocked,
    };
  });

  const totalUnlocked = achievements.filter((a) => a.isUnlocked).length;
  const totalAvailable = achievements.length;
  const totalXpEarned = achievements
    .filter((a) => a.isUnlocked)
    .reduce((acc, a) => acc + a.xp, 0);
  const totalPossibleXp = achievements.reduce((acc, a) => acc + a.xp, 0);
  const completionRate = Math.round((totalUnlocked / totalAvailable) * 100);

  return {
    achievements,
    totalUnlocked,
    totalAvailable,
    totalXpEarned,
    totalPossibleXp,
    completionRate,
  };
}
