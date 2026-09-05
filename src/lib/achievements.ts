export type AchievementCategory = "CINE" | "GAMING" | "CRITIC" | "MASTERY";
export type AchievementRarity = "BRONZE" | "SILVER" | "GOLD" | "DIAMOND";
export type AchievementUniverse = "CINE" | "GAMING";

export interface AchievementDefinition {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
  universe: AchievementUniverse;
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
    isFavorite?: boolean;
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
    platform?: string | null;
    review?: string | null;
    gameKnowledge?: number | null;
    isFavorite?: boolean;
    createdAt?: string | Date;
  }>;
  stats?: {
    avgBallKnowledge?: number | null;
    avgGameKnowledge?: number | null;
    totalHours?: number | null;
  };
}

export const ACHIEVEMENTS_CATALOG: AchievementDefinition[] = [
  // =========================================================================
  // UNIVERSO: CINE & SERIES (100% CINE)
  // =========================================================================

  // Colección y Maratones de Cine
  {
    id: "cine_first_movie",
    title: "Primer Fotograma",
    description: "Registra tu primera película vista en el catálogo.",
    category: "CINE",
    universe: "CINE",
    rarity: "BRONZE",
    iconName: "Film",
    xp: 15,
    targetValue: 1,
  },
  {
    id: "cine_collector_bronze",
    title: "Iniciación Cinéfila",
    description: "Registra 5 películas vistas en tu cuenta.",
    category: "CINE",
    universe: "CINE",
    rarity: "BRONZE",
    iconName: "Clapperboard",
    xp: 20,
    targetValue: 5,
  },
  {
    id: "cine_marathoner",
    title: "Sesión Continua",
    description: "Registra 10 o más películas vistas.",
    category: "CINE",
    universe: "CINE",
    rarity: "SILVER",
    iconName: "Clapperboard",
    xp: 35,
    targetValue: 10,
  },
  {
    id: "cine_collector_silver",
    title: "Espectador Frecuente",
    description: "Alcanza 20 películas vistas en tu catálogo personal.",
    category: "CINE",
    universe: "CINE",
    rarity: "SILVER",
    iconName: "Sparkles",
    xp: 45,
    targetValue: 20,
  },
  {
    id: "cine_cinematheque",
    title: "Filmoteca Viviente",
    description: "Alcanza 35 o más películas vistas en tu historial.",
    category: "CINE",
    universe: "CINE",
    rarity: "GOLD",
    iconName: "Sparkles",
    xp: 75,
    targetValue: 35,
  },
  {
    id: "cine_gold_50",
    title: "Cinéfilo de Oro",
    description: "Alcanza la colosal cifra de 50 películas vistas.",
    category: "CINE",
    universe: "CINE",
    rarity: "GOLD",
    iconName: "Crown",
    xp: 120,
    targetValue: 50,
  },
  {
    id: "cine_god_100",
    title: "Dios del Séptimo Arte",
    description: "Centenario cinematográfico: 100 películas registradas.",
    category: "CINE",
    universe: "CINE",
    rarity: "DIAMOND",
    iconName: "Flame",
    xp: 200,
    targetValue: 100,
  },
  {
    id: "cine_legend_200",
    title: "Leyenda de la Butaca",
    description:
      "Alcanza la cifra legendaria de 200 películas o series vistas.",
    category: "CINE",
    universe: "CINE",
    rarity: "DIAMOND",
    iconName: "Trophy",
    xp: 300,
    targetValue: 200,
  },

  // Series de TV
  {
    id: "cine_first_series",
    title: "Primer Episodio",
    description: "Registra tu primera serie en seguimiento o completada.",
    category: "CINE",
    universe: "CINE",
    rarity: "BRONZE",
    iconName: "Tv",
    xp: 15,
    targetValue: 1,
  },
  {
    id: "cine_series_binge",
    title: "Atracón de Temporadas",
    description: "Registra al menos 3 series vistas o en seguimiento.",
    category: "CINE",
    universe: "CINE",
    rarity: "SILVER",
    iconName: "Tv",
    xp: 35,
    targetValue: 3,
  },
  {
    id: "cine_series_master",
    title: "Maestro de Series",
    description: "Alcanza 8 o más series registradas en tu catálogo.",
    category: "CINE",
    universe: "CINE",
    rarity: "GOLD",
    iconName: "Sparkles",
    xp: 80,
    targetValue: 8,
  },

  // Plataformas, Watchlist y Favoritos Cine
  {
    id: "cine_pirate_captain",
    title: "Rey de los Mares",
    description: "Registra un título disfrutado en plataforma Pirata 🏴‍☠️.",
    category: "CINE",
    universe: "CINE",
    rarity: "BRONZE",
    iconName: "Skull",
    xp: 20,
    targetValue: 1,
  },
  {
    id: "cine_watchlist_hoarder",
    title: "Diógenes Cinéfilo",
    description:
      "Guarda al menos 10 películas o series en tu lista de pendientes.",
    category: "CINE",
    universe: "CINE",
    rarity: "BRONZE",
    iconName: "Clock",
    xp: 20,
    targetValue: 10,
  },
  {
    id: "cine_watchlist_giant",
    title: "Fila de Espera Infinita",
    description: "Acumula 25 o más títulos pendientes en tu Watchlist.",
    category: "CINE",
    universe: "CINE",
    rarity: "SILVER",
    iconName: "Clock",
    xp: 40,
    targetValue: 25,
  },
  {
    id: "cine_streaming_hopper",
    title: "Nómada del Streaming",
    description:
      "Disfruta de obras en al menos 3 servicios de streaming distintos.",
    category: "CINE",
    universe: "CINE",
    rarity: "SILVER",
    iconName: "Compass",
    xp: 35,
    targetValue: 3,
  },
  {
    id: "cine_favorites_collector",
    title: "Galería de Favoritas",
    description:
      "Marca al menos 5 películas o series en tu lista de favoritas.",
    category: "CINE",
    universe: "CINE",
    rarity: "SILVER",
    iconName: "Star",
    xp: 40,
    targetValue: 5,
  },
  {
    id: "cine_favorites_legend",
    title: "Colección Diamante",
    description: "Selecciona 10 o más obras cinematográficas como favoritas.",
    category: "CINE",
    universe: "CINE",
    rarity: "GOLD",
    iconName: "Crown",
    xp: 80,
    targetValue: 10,
  },

  // Crítica y Reseñas de Cine
  {
    id: "cine_first_review",
    title: "Primera Crítica",
    description:
      "Escribe tu primera reseña con opinión escrita en cine o series.",
    category: "CRITIC",
    universe: "CINE",
    rarity: "BRONZE",
    iconName: "MessageSquare",
    xp: 15,
    targetValue: 1,
  },
  {
    id: "cine_critic_voice",
    title: "Pluma Cinéfila",
    description: "Escribe al menos 5 reseñas redactadas en películas o series.",
    category: "CRITIC",
    universe: "CINE",
    rarity: "SILVER",
    iconName: "Feather",
    xp: 45,
    targetValue: 5,
  },
  {
    id: "cine_critic_gold",
    title: "Cátedra Cinematográfica",
    description: "Escribe 12 o más reseñas analíticas en cine o series.",
    category: "CRITIC",
    universe: "CINE",
    rarity: "GOLD",
    iconName: "Feather",
    xp: 90,
    targetValue: 12,
  },
  {
    id: "cine_bullseye",
    title: "Ojo de Halcón Cinéfilo",
    description:
      "Consigue una diferencia exacta de 0.0 frente a la nota de IMDb.",
    category: "CRITIC",
    universe: "CINE",
    rarity: "GOLD",
    iconName: "Target",
    xp: 60,
    targetValue: 1,
  },
  {
    id: "cine_double_bullseye",
    title: "Francotirador de IMDb",
    description:
      "Coincide exactamente con la nota de IMDb (0.0) en 3 títulos distintos.",
    category: "CRITIC",
    universe: "CINE",
    rarity: "DIAMOND",
    iconName: "Crosshair",
    xp: 130,
    targetValue: 3,
  },
  {
    id: "cine_hot_take",
    title: "Pirómano del Séptimo Arte",
    description:
      "Deja una Hot Take cinéfila con más de 2.5 puntos de diferencia con IMDb.",
    category: "CRITIC",
    universe: "CINE",
    rarity: "SILVER",
    iconName: "Flame",
    xp: 40,
    targetValue: 1,
  },
  {
    id: "cine_hater",
    title: "Crítico Despiadado",
    description:
      "Puntúa una película o serie con una nota implacable de 3/10 o inferior.",
    category: "CRITIC",
    universe: "CINE",
    rarity: "BRONZE",
    iconName: "Skull",
    xp: 20,
    targetValue: 1,
  },
  {
    id: "cine_masterpiece_hunter",
    title: "Devoto del Diez",
    description:
      "Otorga una calificación de 10/10 a al menos 3 películas o series.",
    category: "CRITIC",
    universe: "CINE",
    rarity: "SILVER",
    iconName: "Award",
    xp: 40,
    targetValue: 3,
  },

  // Maestría Cine
  {
    id: "cine_sofa_scholar",
    title: "Cátedra del Sofá",
    description:
      "Mantén un Sofa Knowledge promedio superior al 80% (mín. 3 películas).",
    category: "MASTERY",
    universe: "CINE",
    rarity: "GOLD",
    iconName: "Brain",
    xp: 70,
    targetValue: 80,
  },
  {
    id: "cine_sofa_god",
    title: "Sabiduría Cinematográfica",
    description:
      "Alcanza un Sofa Knowledge supremo superior al 90% (mín. 5 obras).",
    category: "MASTERY",
    universe: "CINE",
    rarity: "DIAMOND",
    iconName: "Brain",
    xp: 160,
    targetValue: 90,
  },

  // =========================================================================
  // UNIVERSO: GAMING (100% VIDEOJUEGOS)
  // =========================================================================

  // Colección y Catálogo Gamer
  {
    id: "game_press_start",
    title: "Press Start",
    description: "Registra tu primer videojuego en tu biblioteca personal.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "BRONZE",
    iconName: "Gamepad2",
    xp: 15,
    targetValue: 1,
  },
  {
    id: "game_collector_bronze",
    title: "Gamer Novato",
    description: "Registra 5 videojuegos en tu biblioteca.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "BRONZE",
    iconName: "Gamepad2",
    xp: 20,
    targetValue: 5,
  },
  {
    id: "game_collector_arcade",
    title: "Coleccionista Arcade",
    description: "Añade 15 o más videojuegos a tu biblioteca gamer.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "SILVER",
    iconName: "Sparkles",
    xp: 45,
    targetValue: 15,
  },
  {
    id: "game_collector_gold",
    title: "Estantería Legendaria",
    description: "Alcanza 35 o más videojuegos en tu catálogo.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "GOLD",
    iconName: "Crown",
    xp: 90,
    targetValue: 35,
  },

  // Progreso, Backlog y Completados
  {
    id: "game_first_clear",
    title: "Victoria Magistral",
    description: "Marca tu primer videojuego como Completado.",
    category: "GAMING",
    universe: "GAMING",
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
    universe: "GAMING",
    rarity: "SILVER",
    iconName: "Trophy",
    xp: 50,
    targetValue: 5,
  },
  {
    id: "game_backlog_slayer",
    title: "Cazador de Backlog",
    description: "Completa 10 videojuegos de tu catálogo.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "GOLD",
    iconName: "Zap",
    xp: 90,
    targetValue: 10,
  },
  {
    id: "game_backlog_titan",
    title: "Exterminador de Pendientes",
    description: "Llega a 20 títulos completados en tu historial.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "DIAMOND",
    iconName: "Flame",
    xp: 180,
    targetValue: 20,
  },
  {
    id: "game_backlog_hoarder",
    title: "Diógenes Gamer",
    description: "Ten al menos 5 videojuegos esperando en tu lista de Backlog.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "BRONZE",
    iconName: "Clock",
    xp: 20,
    targetValue: 5,
  },
  {
    id: "game_backlog_giant",
    title: "Biblioteca Infinita",
    description: "Acumula 15 o más juegos en espera dentro de tu Backlog.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "SILVER",
    iconName: "Clock",
    xp: 40,
    targetValue: 15,
  },

  // Trofeos Platino (100%)
  {
    id: "game_platinum_hunter",
    title: "Cazador de Platinos",
    description: "Alcanza el estatus Platino / 100% en al menos un videojuego.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "GOLD",
    iconName: "Award",
    xp: 75,
    targetValue: 1,
  },
  {
    id: "game_platinum_trio",
    title: "Trilogía de Platino",
    description: "Consigue 3 títulos completados al 100% (Platino).",
    category: "GAMING",
    universe: "GAMING",
    rarity: "DIAMOND",
    iconName: "Crown",
    xp: 150,
    targetValue: 3,
  },
  {
    id: "game_platinum_master",
    title: "Club del 100% Absoluto",
    description: "Consigue 5 trofeos Platino / 100% en tu perfil.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "DIAMOND",
    iconName: "Trophy",
    xp: 250,
    targetValue: 5,
  },

  // Horas de Juego
  {
    id: "game_hours_baby",
    title: "Primeras Partidas",
    description: "Acumula tus primeras 10 horas de juego registradas.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "BRONZE",
    iconName: "Clock",
    xp: 15,
    targetValue: 10,
  },
  {
    id: "game_veteran_hours",
    title: "Veterano del Vicio",
    description: "Acumula más de 30 horas registradas de juego.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "SILVER",
    iconName: "Clock",
    xp: 40,
    targetValue: 30,
  },
  {
    id: "game_hours_master",
    title: "Dedicación Total",
    description: "Supera las 60 horas registradas de juego.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "GOLD",
    iconName: "Zap",
    xp: 80,
    targetValue: 60,
  },
  {
    id: "game_time_lord",
    title: "No-Life Honorario",
    description: "Acumula más de 100 horas registradas en videojuegos.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "DIAMOND",
    iconName: "Zap",
    xp: 120,
    targetValue: 100,
  },
  {
    id: "game_titan_200h",
    title: "Titán del Gaming",
    description: "Supera la barrera épica de 200 horas registradas.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "DIAMOND",
    iconName: "Flame",
    xp: 220,
    targetValue: 200,
  },
  {
    id: "game_hours_god",
    title: "Leyenda Incombustible",
    description: "Supera la colosal marca de 500 horas de juego.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "DIAMOND",
    iconName: "Crown",
    xp: 350,
    targetValue: 500,
  },

  // Plataformas y Favoritos Gaming
  {
    id: "game_multi_platform",
    title: "Multi-Consola",
    description: "Juega títulos en al menos 3 plataformas distintas.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "SILVER",
    iconName: "Compass",
    xp: 40,
    targetValue: 3,
  },
  {
    id: "game_platform_titan",
    title: "Gamer Universal",
    description:
      "Registra videojuegos jugados en 5 o más plataformas diferentes.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "GOLD",
    iconName: "Crown",
    xp: 80,
    targetValue: 5,
  },
  {
    id: "game_favorites_collector",
    title: "Hall of Fame Gamer",
    description:
      "Marca al menos 3 videojuegos como tus favoritos indiscutibles.",
    category: "GAMING",
    universe: "GAMING",
    rarity: "SILVER",
    iconName: "Star",
    xp: 35,
    targetValue: 3,
  },

  // Crítica y Reseñas de Videojuegos
  {
    id: "game_first_review",
    title: "Primer Veredicto",
    description:
      "Escribe tu primera reseña con opinión escrita de un videojuego.",
    category: "CRITIC",
    universe: "GAMING",
    rarity: "BRONZE",
    iconName: "MessageSquare",
    xp: 15,
    targetValue: 1,
  },
  {
    id: "game_critic_voice",
    title: "Analista del Gamepad",
    description: "Escribe reseñas analíticas en al menos 3 videojuegos.",
    category: "CRITIC",
    universe: "GAMING",
    rarity: "SILVER",
    iconName: "Feather",
    xp: 40,
    targetValue: 3,
  },
  {
    id: "game_critic_gold",
    title: "Periodista del Videojuego",
    description:
      "Escribe al menos 8 análisis o reseñas detalladas de videojuegos.",
    category: "CRITIC",
    universe: "GAMING",
    rarity: "GOLD",
    iconName: "Feather",
    xp: 90,
    targetValue: 8,
  },
  {
    id: "game_metacritic_sniper",
    title: "Metacritic Sniper",
    description:
      "Coincide exactamente con la nota de Metacritic (diferencia 0.0).",
    category: "CRITIC",
    universe: "GAMING",
    rarity: "GOLD",
    iconName: "Crosshair",
    xp: 60,
    targetValue: 1,
  },
  {
    id: "game_double_sniper",
    title: "Francotirador de Metacritic",
    description:
      "Clava la nota de Metacritic (0.0) en 3 videojuegos distintos.",
    category: "CRITIC",
    universe: "GAMING",
    rarity: "DIAMOND",
    iconName: "Target",
    xp: 130,
    targetValue: 3,
  },
  {
    id: "game_hot_take",
    title: "Pirómano del Mando",
    description:
      "Deja una Hot Take gamer con más de 2.5 puntos de diferencia con Metacritic.",
    category: "CRITIC",
    universe: "GAMING",
    rarity: "SILVER",
    iconName: "Flame",
    xp: 40,
    targetValue: 1,
  },
  {
    id: "game_hater",
    title: "Hater del Gamepad",
    description:
      "Puntúa un videojuego con una nota implacable de 3/10 o inferior.",
    category: "CRITIC",
    universe: "GAMING",
    rarity: "BRONZE",
    iconName: "Skull",
    xp: 20,
    targetValue: 1,
  },
  {
    id: "game_masterpiece_hunter",
    title: "Joya de Diez",
    description:
      "Otorga una calificación perfecta de 10/10 a al menos 2 videojuegos.",
    category: "CRITIC",
    universe: "GAMING",
    rarity: "SILVER",
    iconName: "Star",
    xp: 40,
    targetValue: 2,
  },

  // Maestría Gamer
  {
    id: "game_game_sage",
    title: "Sabio del Gamepad",
    description:
      "Mantén un Game Knowledge promedio superior al 80% (mín. 3 juegos).",
    category: "MASTERY",
    universe: "GAMING",
    rarity: "GOLD",
    iconName: "Compass",
    xp: 70,
    targetValue: 80,
  },
  {
    id: "game_knowledge_god",
    title: "Oráculo de los Videojuegos",
    description:
      "Alcanza un Game Knowledge supremo superior al 90% (mín. 5 juegos).",
    category: "MASTERY",
    universe: "GAMING",
    rarity: "DIAMOND",
    iconName: "Compass",
    xp: 160,
    targetValue: 90,
  },
];

export function evaluateUserAchievements(
  data: AchievementEvaluationInput,
  universe?: "CINE" | "GAMING" | "ALL",
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

  // =========================================================================
  // MÉTRICAS 100% CINE & SERIES
  // =========================================================================
  const watchedMovies = movies.filter((m) => m.status === "WATCHED");
  const watchedSeries = series.filter((s) => s.status === "WATCHED");
  const totalWatchedCine = watchedMovies.length + watchedSeries.length;

  const watchlistCineCount =
    movies.filter((m) => m.status === "WATCHLIST").length +
    series.filter((s) => s.status === "WATCHLIST").length;

  const pirateTitlesCount =
    movies.filter((m) => m.platform === "Pirata").length +
    series.filter((s) => s.platform === "Pirata").length;

  const movieFavoritesCount = movies.filter((m) => m.isFavorite).length;

  const cineStreamingCount = new Set(
    [...movies, ...series]
      .map((item) => item.platform)
      .filter((p): p is string =>
        Boolean(p && p !== "Pirata" && p.trim().length > 0),
      ),
  ).size;

  const cineReviewsCount =
    movies.filter((m) => m.review && m.review.trim().length > 0).length +
    series.filter((s) => s.review && s.review.trim().length > 0).length;

  const cineTensCount =
    movies.filter((m) => m.userRating === 10).length +
    series.filter((s) => s.userRating === 10).length;

  const cineHaterCount = [...movies, ...series].filter(
    (item) =>
      item.userRating !== null &&
      item.userRating !== undefined &&
      item.userRating <= 3,
  ).length;

  const zeroDiffCineCount = [...movies, ...series].filter(
    (item) =>
      item.difference !== null &&
      item.difference !== undefined &&
      Math.abs(item.difference) < 0.05,
  ).length;

  const cineHotTakesCount = [...movies, ...series].filter(
    (m) =>
      m.difference !== null &&
      m.difference !== undefined &&
      Math.abs(m.difference) >= 2.5,
  ).length;

  const ballKnowledgeAvg = data.stats?.avgBallKnowledge ?? 0;

  // =========================================================================
  // MÉTRICAS 100% GAMING
  // =========================================================================
  const allGamesCount = games.length;
  const completedGames = games.filter(
    (g) => g.status === "COMPLETED" || g.status === "PLATINUM",
  );
  const backlogGamesCount = games.filter((g) => g.status === "BACKLOG").length;
  const platinumGames = games.filter((g) => g.status === "PLATINUM");

  const totalHours =
    data.stats?.totalHours ??
    games.reduce((acc, g) => acc + (Number(g.hoursPlayed) || 0), 0);

  const uniqueGamingPlatforms = new Set(
    games
      .map((g) => g.platform)
      .filter((p): p is string => Boolean(p && p.trim().length > 0)),
  ).size;

  const gameFavoritesCount = games.filter((g) => g.isFavorite).length;

  const gameReviewsCount = games.filter(
    (g) => g.review && g.review.trim().length > 0,
  ).length;

  const gameTensCount = games.filter((g) => g.userRating === 10).length;

  const gameHaterCount = games.filter(
    (g) =>
      g.userRating !== null && g.userRating !== undefined && g.userRating <= 3,
  ).length;

  const zeroDiffGameCount = games.filter(
    (g) =>
      g.difference !== null &&
      g.difference !== undefined &&
      Math.abs(g.difference) < 0.05,
  ).length;

  const gameHotTakesCount = games.filter(
    (g) =>
      g.difference !== null &&
      g.difference !== undefined &&
      Math.abs(g.difference) >= 2.5,
  ).length;

  const gameKnowledgeAvg = data.stats?.avgGameKnowledge ?? 0;

  // =========================================================================
  // EVALUACIÓN DE CADA LOGRO
  // =========================================================================
  const targetCatalog =
    universe && universe !== "ALL"
      ? ACHIEVEMENTS_CATALOG.filter((a) => a.universe === universe)
      : ACHIEVEMENTS_CATALOG;

  const achievements: UserAchievement[] = targetCatalog.map((def) => {
    let currentValue = 0;
    let isUnlocked = false;

    switch (def.id) {
      // ---------------- Cine ----------------
      case "cine_first_movie":
      case "cine_collector_bronze":
      case "cine_marathoner":
      case "cine_collector_silver":
      case "cine_cinematheque":
      case "cine_gold_50":
      case "cine_god_100":
        currentValue = watchedMovies.length;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_legend_200":
        currentValue = totalWatchedCine;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_first_series":
      case "cine_series_binge":
      case "cine_series_master":
        currentValue = watchedSeries.length;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_pirate_captain":
        currentValue = pirateTitlesCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_watchlist_hoarder":
      case "cine_watchlist_giant":
        currentValue = watchlistCineCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_streaming_hopper":
        currentValue = cineStreamingCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_favorites_collector":
      case "cine_favorites_legend":
        currentValue = movieFavoritesCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_first_review":
      case "cine_critic_voice":
      case "cine_critic_gold":
        currentValue = cineReviewsCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_bullseye":
      case "cine_double_bullseye":
        currentValue = zeroDiffCineCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_hot_take":
        currentValue = cineHotTakesCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_hater":
        currentValue = cineHaterCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_masterpiece_hunter":
        currentValue = cineTensCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "cine_sofa_scholar":
        currentValue = Math.round(ballKnowledgeAvg);
        isUnlocked =
          currentValue >= def.targetValue && watchedMovies.length >= 3;
        break;

      case "cine_sofa_god":
        currentValue = Math.round(ballKnowledgeAvg);
        isUnlocked =
          currentValue >= def.targetValue && watchedMovies.length >= 5;
        break;

      // ---------------- Gaming ----------------
      case "game_press_start":
      case "game_collector_bronze":
      case "game_collector_arcade":
      case "game_collector_gold":
        currentValue = allGamesCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_first_clear":
      case "game_marathon":
      case "game_backlog_slayer":
      case "game_backlog_titan":
        currentValue = completedGames.length;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_backlog_hoarder":
      case "game_backlog_giant":
        currentValue = backlogGamesCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_platinum_hunter":
      case "game_platinum_trio":
      case "game_platinum_master":
        currentValue = platinumGames.length;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_hours_baby":
      case "game_veteran_hours":
      case "game_hours_master":
      case "game_time_lord":
      case "game_titan_200h":
      case "game_hours_god":
        currentValue = Math.round(totalHours);
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_multi_platform":
      case "game_platform_titan":
        currentValue = uniqueGamingPlatforms;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_favorites_collector":
        currentValue = gameFavoritesCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_first_review":
      case "game_critic_voice":
      case "game_critic_gold":
        currentValue = gameReviewsCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_metacritic_sniper":
      case "game_double_sniper":
        currentValue = zeroDiffGameCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_hot_take":
        currentValue = gameHotTakesCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_hater":
        currentValue = gameHaterCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_masterpiece_hunter":
        currentValue = gameTensCount;
        isUnlocked = currentValue >= def.targetValue;
        break;

      case "game_game_sage":
        currentValue = Math.round(gameKnowledgeAvg);
        isUnlocked = currentValue >= def.targetValue && games.length >= 3;
        break;

      case "game_knowledge_god":
        currentValue = Math.round(gameKnowledgeAvg);
        isUnlocked = currentValue >= def.targetValue && games.length >= 5;
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
  const completionRate =
    totalAvailable > 0 ? Math.round((totalUnlocked / totalAvailable) * 100) : 0;

  return {
    achievements,
    totalUnlocked,
    totalAvailable,
    totalXpEarned,
    totalPossibleXp,
    completionRate,
  };
}
