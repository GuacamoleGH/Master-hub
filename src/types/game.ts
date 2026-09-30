export interface GameSearchResult {
  id: number;
  title: string;
  released?: string | null;
  backgroundImage?: string | null;
  rating?: number | null; // RAWG rating 0 a 5
  metacritic?: number | null; // 0 a 100
  platforms: string[];
  genres: string[];
  slug?: string | null;
}

export interface PlatformProgress {
  platform: string;
  hours: number;
  status:
    | "BACKLOG"
    | "PLAYING"
    | "COMPLETED"
    | "PLATINUM"
    | "DROPPED"
    | "CONTINUOUS";
}

export interface GameDetail {
  id: string; // ID interno o string de rawgId
  rawgId: number;
  slug?: string | null;
  title: string;
  released: string | null;
  backgroundImage: string | null;
  metacritic: number | null; // 0 a 100
  rating: number | null;
  genres: string[];
  platforms: string[];
  developers: string[];
  publishers: string[];
  description: string | null;
  screenshots: string[];
  trailerUrl: string | null;
  masterHubScore?: number | null;
  masterHubVotes?: number;
  masterHubDistribution?: number[];
  communityReviews?: any[];
  userGame?: {
    id: string;
    status:
      | "BACKLOG"
      | "PLAYING"
      | "COMPLETED"
      | "PLATINUM"
      | "DROPPED"
      | "CONTINUOUS";
    userRating: number | null;
    hoursPlayed: number | null;
    platform: string | null;
    platformDetails?: PlatformProgress[] | string | null;
    review: string | null;
    completedDate: string | null;
    gameKnowledge: number | null;
    difference: number | null;
  } | null;
}

export interface UserGameItem {
  id: string;
  gameId: string;
  status:
    | "BACKLOG"
    | "PLAYING"
    | "COMPLETED"
    | "PLATINUM"
    | "DROPPED"
    | "CONTINUOUS";
  userRating: number | null;
  hoursPlayed: number | null;
  platform: string | null;
  platformDetails?: PlatformProgress[] | string | null;
  review: string | null;
  completedDate: string | null;
  gameKnowledge: number | null;
  difference: number | null;
  createdAt: string;
  game: {
    id: string;
    rawgId: number;
    slug?: string | null;
    title: string;
    released: string | null;
    backgroundImage: string | null;
    metacritic: number | null;
    rating: number | null;
    genres: string[];
    platforms: string[];
    developers: string[];
  };
}

export interface GamerRank {
  title: string;
  minLevel: number;
  maxLevel: number;
  icon: string;
  color: string;
}

export interface HotTake {
  title: string;
  cover: string | null;
  userRating: number;
  criticRating: number; // escala 0-10
  difference: number;
  gameKnowledge: number;
  type: "BASED" | "OVERRATED" | "UNDERRATED";
  hoursPlayed?: number | null;
}

export interface GamerStats {
  totalHours: number;
  totalCompleted: number;
  totalBacklog: number;
  totalPlaying: number;
  totalPlatinum: number;
  totalReviews: number;
  averageRating: number | null;
  averageMetacritic: number | null; // escala 0-10
  globalGameKnowledge: number | null;
  totalXp: number;
  level: number;
  rankTitle: string;
  rankIcon: string;
  rankColor: string;
  nextLevelXp: number;
  currentLevelBaseXp: number;
  xpProgressPercent: number;
  topGenre: string | null;
  topPlatform: string | null;
  hotTakes: HotTake[];
  criticVsYou: {
    title: string;
    userRating: number;
    criticRating: number;
    gameKnowledge: number;
  }[];
  hoursByPlatform: {
    platform: string;
    hours: number;
    gameCount?: number;
    percentage?: number;
  }[];
  hoursByGenre: { genre: string; hours: number }[];
  ratingDistribution: { rating: number; count: number }[];
  longestGame?: {
    title: string;
    cover: string | null;
    hours: number;
  } | null;
  highestRatedGame?: {
    title: string;
    cover: string | null;
    rating: number;
  } | null;
  lowestRatedGame?: {
    title: string;
    cover: string | null;
    rating: number;
  } | null;
  averageCompletionHours?: number | null;
  statusBreakdown?: {
    completed: number;
    playing: number;
    backlog: number;
    platinum: number;
    abandoned: number;
    continuous?: number;
  };
}
