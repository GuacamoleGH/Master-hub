import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { calculateLevelAndRank } from "@/lib/ballKnowledge";
import { calculateGamerLevelAndRank } from "@/lib/gameKnowledge";
import { evaluateUserAchievements } from "@/lib/achievements";

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } },
) {
  try {
    const rawUsername = params.username.trim();
    const session = await getServerSession(authOptions);
    const visitorId = session?.user?.id || null;

    // Buscar al usuario por username o ID
    const targetUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username: { equals: rawUsername, mode: "insensitive" } },
          { id: rawUsername },
        ],
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        totalXp: true,
        createdAt: true,
      },
    });

    if (!targetUser) {
      return NextResponse.json(
        { error: "Usuario no encontrado" },
        { status: 404 },
      );
    }

    const userId = targetUser.id;

    // 1. Obtener películas y series del usuario
    const [userMovies, userSeries] = await Promise.all([
      prisma.userMovie.findMany({
        where: { userId },
        include: {
          movie: true,
        },
        orderBy: { createdAt: "desc" },
      }),
      prisma.userSeries.findMany({
        where: { userId },
        include: {
          series: true,
        },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    const watchedMovies = userMovies.filter((m) => m.status === "WATCHED");
    const watchlistMovies = userMovies.filter((m) => m.status === "WATCHLIST");
    const watchedSeries = userSeries.filter((s) => s.status === "WATCHED");
    const watchlistSeries = userSeries.filter((s) => s.status === "WATCHLIST");

    // Top 5 Cinéfilo (películas y series combinadas)
    const movieItems = watchedMovies.map((um) => ({
      id: `movie-${um.id}`,
      title: um.movie.title,
      image: um.movie.posterPath,
      year: um.movie.year,
      rating: um.userRating,
      isFavorite: Boolean(um.isFavorite),
      link: `/movie/${um.movie.tmdbId}`,
      mediaType: "movie" as const,
    }));

    const seriesItems = watchedSeries.map((us) => ({
      id: `series-${us.id}`,
      title: us.series.name,
      image: us.series.posterPath,
      year: us.series.firstAirYear,
      rating: us.userRating,
      isFavorite: false,
      link: `/series/${us.series.tmdbId}`,
      mediaType: "series" as const,
    }));

    const topCine = [...movieItems, ...seriesItems]
      .sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return (b.rating || 0) - (a.rating || 0);
      })
      .slice(0, 5);

    // Métricas de cine
    const movieRatings = watchedMovies
      .map((m) => m.userRating)
      .filter((r): r is number => r !== null);
    const avgMovieRating =
      movieRatings.length > 0
        ? Number(
            (
              movieRatings.reduce((a, b) => a + b, 0) / movieRatings.length
            ).toFixed(1),
          )
        : null;

    const bkScores = watchedMovies
      .map((m) => m.ballKnowledge)
      .filter((b): b is number => b !== null);
    const globalBallKnowledge =
      bkScores.length > 0
        ? Math.round(bkScores.reduce((a, b) => a + b, 0) / bkScores.length)
        : null;

    const movieLevelInfo = calculateLevelAndRank(watchedMovies.length * 10);

    // 2. Obtener videojuegos del usuario
    const userGames = await prisma.userGame.findMany({
      where: { userId },
      include: {
        game: true,
      },
      orderBy: { createdAt: "desc" },
    });

    const completedGames = userGames.filter(
      (g) => g.status === "COMPLETED" || g.status === "PLATINUM",
    );
    const backlogGames = userGames.filter((g) => g.status === "BACKLOG");

    // Top 5 Videojuegos
    const topGames = [...userGames]
      .filter((g) => g.status !== "DROPPED")
      .sort((a, b) => {
        if (a.isFavorite && !b.isFavorite) return -1;
        if (!a.isFavorite && b.isFavorite) return 1;
        return (b.userRating || 0) - (a.userRating || 0);
      })
      .slice(0, 5)
      .map((g) => ({
        id: g.id,
        title: g.game.title,
        image: g.game.backgroundImage,
        year: g.game.released ? g.game.released.split("-")[0] : null,
        rating: g.userRating,
        isFavorite: Boolean(g.isFavorite),
        link: `/games/${g.game.rawgId}`,
        mediaType: "game" as const,
      }));

    // Métricas de gaming
    const totalHours = userGames.reduce(
      (acc, g) => acc + (g.hoursPlayed || 0),
      0,
    );
    const gameRatings = userGames
      .map((g) => g.userRating)
      .filter((r): r is number => r !== null);
    const avgGameRating =
      gameRatings.length > 0
        ? Number(
            (
              gameRatings.reduce((a, b) => a + b, 0) / gameRatings.length
            ).toFixed(1),
          )
        : null;

    const gkScores = userGames
      .map((g) => g.gameKnowledge)
      .filter((gk): gk is number => gk !== null);
    const globalGameKnowledge =
      gkScores.length > 0
        ? Math.round(gkScores.reduce((a, b) => a + b, 0) / gkScores.length)
        : null;

    const gamerLevelInfo = calculateGamerLevelAndRank(targetUser.totalXp);

    // 3. Cálculo de Afinidad si el visitante está logueado y no es él mismo
    let affinity: {
      hasComparison: boolean;
      score: number | null;
      sharedMoviesCount: number;
      sharedGamesCount: number;
      mutualLoves: Array<{ title: string; type: "movie" | "game" }>;
      biggestDiscrepancy: {
        title: string;
        type: "movie" | "game";
        userRating: number;
        visitorRating: number;
      } | null;
    } = {
      hasComparison: false,
      score: null,
      sharedMoviesCount: 0,
      sharedGamesCount: 0,
      mutualLoves: [],
      biggestDiscrepancy: null,
    };

    if (visitorId && visitorId !== userId) {
      const visitorMovies = await prisma.userMovie.findMany({
        where: { userId: visitorId, status: "WATCHED" },
        include: { movie: true },
      });

      const visitorGames = await prisma.userGame.findMany({
        where: { userId: visitorId },
        include: { game: true },
      });

      const visitorMovieMap = new Map(visitorMovies.map((m) => [m.movieId, m]));
      const visitorGameMap = new Map(visitorGames.map((g) => [g.gameId, g]));

      let totalDiffSum = 0;
      let ratedSharedCount = 0;
      let sharedMoviesCount = 0;
      let sharedGamesCount = 0;
      const mutualLoves: Array<{ title: string; type: "movie" | "game" }> = [];
      let maxDiff = -1;
      let biggestDiscrepancy: any = null;

      // Comparar Películas
      for (const targetMovie of watchedMovies) {
        const visitorM = visitorMovieMap.get(targetMovie.movieId);
        if (visitorM) {
          sharedMoviesCount++;
          if (targetMovie.userRating !== null && visitorM.userRating !== null) {
            ratedSharedCount++;
            const diff = Math.abs(targetMovie.userRating - visitorM.userRating);
            totalDiffSum += diff;

            if (targetMovie.userRating >= 8 && visitorM.userRating >= 8) {
              mutualLoves.push({
                title: targetMovie.movie.title,
                type: "movie",
              });
            }

            if (diff > maxDiff) {
              maxDiff = diff;
              biggestDiscrepancy = {
                title: targetMovie.movie.title,
                type: "movie",
                userRating: targetMovie.userRating,
                visitorRating: visitorM.userRating,
              };
            }
          }
        }
      }

      // Comparar Juegos
      for (const targetGame of userGames) {
        const visitorG = visitorGameMap.get(targetGame.gameId);
        if (visitorG) {
          sharedGamesCount++;
          if (targetGame.userRating !== null && visitorG.userRating !== null) {
            ratedSharedCount++;
            const diff = Math.abs(targetGame.userRating - visitorG.userRating);
            totalDiffSum += diff;

            if (targetGame.userRating >= 8 && visitorG.userRating >= 8) {
              mutualLoves.push({
                title: targetGame.game.title,
                type: "game",
              });
            }

            if (diff > maxDiff) {
              maxDiff = diff;
              biggestDiscrepancy = {
                title: targetGame.game.title,
                type: "game",
                userRating: targetGame.userRating,
                visitorRating: visitorG.userRating,
              };
            }
          }
        }
      }

      const totalShared = sharedMoviesCount + sharedGamesCount;
      if (totalShared > 0) {
        const avgDiff =
          ratedSharedCount > 0 ? totalDiffSum / ratedSharedCount : 2.0;
        // 0 diff -> 100%, 5 diff -> 50%, 10 diff -> 0%
        const score = Math.max(
          10,
          Math.min(100, Math.round(100 - avgDiff * 9)),
        );

        affinity = {
          hasComparison: true,
          score,
          sharedMoviesCount,
          sharedGamesCount,
          mutualLoves: mutualLoves.slice(0, 4),
          biggestDiscrepancy: maxDiff >= 1.5 ? biggestDiscrepancy : null,
        };
      }
    }

    // 4. Evaluar vitrina de logros
    const achievementsData = evaluateUserAchievements({
      movies: userMovies,
      series: userSeries,
      games: userGames,
      stats: {
        avgBallKnowledge: globalBallKnowledge,
        avgGameKnowledge: globalGameKnowledge,
        totalHours,
      },
    });

    return NextResponse.json({
      user: targetUser,
      isOwner: visitorId === userId,
      cinema: {
        totalWatched: watchedMovies.length + watchedSeries.length,
        totalWatchlist: watchlistMovies.length + watchlistSeries.length,
        totalMovies: watchedMovies.length,
        totalSeries: watchedSeries.length,
        averageRating: avgMovieRating,
        globalBallKnowledge,
        level: movieLevelInfo.level,
        rankTitle: movieLevelInfo.rankTitle,
        rankIcon: movieLevelInfo.rankIcon,
        topCine,
        topMovies: topCine,
        recentMovies: watchedMovies.slice(0, 12),
        recentSeries: watchedSeries.slice(0, 12),
      },
      gaming: {
        totalCompleted: completedGames.length,
        totalBacklog: backlogGames.length,
        totalHours: Math.round(totalHours),
        averageRating: avgGameRating,
        globalGameKnowledge,
        level: gamerLevelInfo.level,
        rankTitle: gamerLevelInfo.rankTitle,
        rankIcon: gamerLevelInfo.rankIcon,
        topGames,
        recentGames: userGames.slice(0, 12),
      },
      affinity,
      achievements: achievementsData,
    });
  } catch (error) {
    console.error("Error en GET /api/u/[username]:", error);
    return NextResponse.json(
      { error: "Error al cargar perfil público" },
      { status: 500 },
    );
  }
}
