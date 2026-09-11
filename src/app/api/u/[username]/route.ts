import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { calculateLevelAndRank } from "@/lib/ballKnowledge";
import {
  calculateGamerLevelAndRank,
  classifyHotTake,
} from "@/lib/gameKnowledge";
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

    const watchedCatalog = [
      ...watchedMovies.map((um) => ({
        id: `movie-${um.id}`,
        title: um.movie.title,
        posterPath: um.movie.posterPath,
        year: um.movie.year,
        userRating: um.userRating,
        imdbRating: um.movie.imdbRating,
        ballKnowledge: um.ballKnowledge,
        review: um.review,
        watchedDate: um.watchedDate,
        isFavorite: Boolean(um.isFavorite),
        mediaType: "movie" as const,
        link: `/movie/${um.movie.tmdbId}`,
      })),
      ...watchedSeries.map((us) => ({
        id: `series-${us.id}`,
        title: us.series.name,
        posterPath: us.series.posterPath,
        year: us.series.firstAirYear,
        userRating: us.userRating,
        imdbRating: us.series.imdbRating,
        ballKnowledge: us.ballKnowledge,
        review: us.review,
        watchedDate: us.watchedDate,
        isFavorite: false,
        mediaType: "series" as const,
        link: `/series/${us.series.tmdbId}`,
      })),
    ].sort((a, b) => {
      if (a.watchedDate && b.watchedDate) {
        return (
          new Date(b.watchedDate).getTime() - new Date(a.watchedDate).getTime()
        );
      }
      return (b.userRating || 0) - (a.userRating || 0);
    });

    let highestRatedMovie: any = null;
    let lowestRatedMovie: any = null;
    let biggestW: any = null;
    let biggestL: any = null;

    const ratedMovies = watchedMovies.filter(
      (r) => typeof r.userRating === "number",
    );
    if (ratedMovies.length > 0) {
      const sortedByRating = [...ratedMovies].sort(
        (a, b) => (b.userRating || 0) - (a.userRating || 0),
      );
      highestRatedMovie = {
        title: sortedByRating[0].movie.title,
        posterPath: sortedByRating[0].movie.posterPath,
        userRating: sortedByRating[0].userRating,
      };
      lowestRatedMovie = {
        title: sortedByRating[sortedByRating.length - 1].movie.title,
        posterPath: sortedByRating[sortedByRating.length - 1].movie.posterPath,
        userRating: sortedByRating[sortedByRating.length - 1].userRating,
      };

      const bkRecords = ratedMovies.filter(
        (r) =>
          typeof r.ballKnowledge === "number" &&
          typeof r.movie.imdbRating === "number",
      );
      if (bkRecords.length > 0) {
        const sortedW = [...bkRecords].sort(
          (a, b) => (b.ballKnowledge || 0) - (a.ballKnowledge || 0),
        );
        biggestW = {
          title: sortedW[0].movie.title,
          posterPath: sortedW[0].movie.posterPath,
          userRating: sortedW[0].userRating,
          imdbRating: sortedW[0].movie.imdbRating,
          ballKnowledge: sortedW[0].ballKnowledge,
          diff: sortedW[0].difference,
        };

        const sortedL = [...bkRecords].sort(
          (a, b) => (a.ballKnowledge || 0) - (b.ballKnowledge || 0),
        );
        biggestL = {
          title: sortedL[0].movie.title,
          posterPath: sortedL[0].movie.posterPath,
          userRating: sortedL[0].userRating,
          imdbRating: sortedL[0].movie.imdbRating,
          ballKnowledge: sortedL[0].ballKnowledge,
          diff: sortedL[0].difference,
        };
      }
    }

    const ratingBuckets: { [key: number]: number } = {};
    for (let i = 0; i <= 10; i++) ratingBuckets[i] = 0;
    for (const r of ratedMovies) {
      if (typeof r.userRating === "number") {
        const bucket = Math.round(r.userRating);
        ratingBuckets[bucket] = (ratingBuckets[bucket] || 0) + 1;
      }
    }
    const movieRatingDistribution = Object.keys(ratingBuckets).map((k) => ({
      rating: Number(k),
      count: ratingBuckets[Number(k)],
    }));

    const genreMap: { [key: string]: { count: number; totalScore: number } } =
      {};
    for (const r of watchedMovies) {
      let genres: string[] = [];
      try {
        genres = JSON.parse(r.movie.genres);
      } catch {}
      for (const g of genres) {
        if (!genreMap[g]) genreMap[g] = { count: 0, totalScore: 0 };
        genreMap[g].count += 1;
        if (typeof r.userRating === "number") {
          genreMap[g].totalScore += r.userRating;
        }
      }
    }
    const movieGenreCounts = Object.entries(genreMap)
      .map(([genre, data]) => ({
        genre,
        count: data.count,
        avgRating:
          data.count > 0
            ? Number((data.totalScore / data.count).toFixed(1))
            : 0,
      }))
      .sort((a, b) => b.count - a.count);

    const monthMap: { [key: string]: number } = {};
    for (const r of watchedMovies) {
      if (r.watchedDate) {
        const key = r.watchedDate.toISOString().substring(0, 7);
        monthMap[key] = (monthMap[key] || 0) + 1;
      }
    }
    const watchesByMonth = Object.keys(monthMap)
      .sort()
      .map((month) => ({
        month,
        count: monthMap[month],
      }));

    const allRatedCine = [...watchedMovies, ...watchedSeries].filter(
      (r) => typeof r.userRating === "number",
    );
    const avgMovieRating =
      allRatedCine.length > 0
        ? Number(
            (
              allRatedCine.reduce((acc, r) => acc + (r.userRating || 0), 0) /
              allRatedCine.length
            ).toFixed(1),
          )
        : null;

    const allBk = [...watchedMovies, ...watchedSeries].filter(
      (r) => typeof r.ballKnowledge === "number",
    );
    const globalBallKnowledge =
      allBk.length > 0
        ? Math.round(
            allBk.reduce((acc, r) => acc + (r.ballKnowledge || 0), 0) /
              allBk.length,
          )
        : null;

    const movieLevelInfo = calculateLevelAndRank(targetUser.totalXp);

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

    const gamesWithMetacritic = userGames.filter(
      (g) => typeof g.game.metacritic === "number",
    );
    const averageMetacritic =
      gamesWithMetacritic.length > 0
        ? Number(
            (
              gamesWithMetacritic.reduce(
                (acc, g) => acc + (g.game.metacritic || 0),
                0,
              ) /
              gamesWithMetacritic.length /
              10
            ).toFixed(1),
          )
        : null;
    const totalPlatinum = userGames.filter(
      (ug) => ug.status === "PLATINUM",
    ).length;

    const gamesCatalog = userGames
      .map((ug) => ({
        id: ug.id,
        title: ug.game.title,
        posterPath: ug.game.backgroundImage,
        year: ug.game.released ? ug.game.released.split("-")[0] : null,
        userRating: ug.userRating,
        metacritic: ug.game.metacritic,
        gameKnowledge: ug.gameKnowledge,
        hoursPlayed: ug.hoursPlayed,
        status: ug.status,
        platform: ug.platform,
        review: ug.review,
        isFavorite: Boolean(ug.isFavorite),
        link: `/games/${ug.game.rawgId}`,
        mediaType: "game" as const,
      }))
      .sort((a, b) => (b.hoursPlayed || 0) - (a.hoursPlayed || 0));

    const gamesWithHours = userGames
      .filter((g) => (g.hoursPlayed || 0) > 0)
      .sort((a, b) => (b.hoursPlayed || 0) - (a.hoursPlayed || 0));
    const longestGame =
      gamesWithHours.length > 0
        ? {
            title: gamesWithHours[0].game.title,
            cover: gamesWithHours[0].game.backgroundImage,
            hours: gamesWithHours[0].hoursPlayed || 0,
          }
        : null;

    const ratedGames = userGames
      .filter((g) => typeof g.userRating === "number")
      .sort((a, b) => (b.userRating || 0) - (a.userRating || 0));
    const highestRatedGame =
      ratedGames.length > 0
        ? {
            title: ratedGames[0].game.title,
            cover: ratedGames[0].game.backgroundImage,
            rating: ratedGames[0].userRating || 0,
          }
        : null;
    const lowestRatedGame =
      ratedGames.length > 0
        ? {
            title: ratedGames[ratedGames.length - 1].game.title,
            cover: ratedGames[ratedGames.length - 1].game.backgroundImage,
            rating: ratedGames[ratedGames.length - 1].userRating || 0,
          }
        : null;

    const completedWithHours = userGames.filter(
      (ug) =>
        (ug.status === "COMPLETED" || ug.status === "PLATINUM") &&
        (ug.hoursPlayed || 0) > 0,
    );
    const averageCompletionHours =
      completedWithHours.length > 0
        ? Math.round(
            completedWithHours.reduce(
              (acc, g) => acc + (g.hoursPlayed || 0),
              0,
            ) / completedWithHours.length,
          )
        : null;

    const statusBreakdown = {
      completed: completedGames.length,
      playing: userGames.filter((ug) => ug.status === "PLAYING").length,
      backlog: backlogGames.length,
      platinum: userGames.filter((ug) => ug.status === "PLATINUM").length,
      abandoned: userGames.filter((ug) => ug.status === "ABANDONED").length,
    };

    const platformHoursMap: Record<string, number> = {};
    const platformGamesCountMap: Record<string, number> = {};
    const genreHoursMap: Record<string, number> = {};
    const gameRatingDist: Record<number, number> = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
      10: 0,
    };
    const hotTakes: any[] = [];
    const criticVsYou: any[] = [];

    for (const ug of userGames) {
      if (typeof ug.userRating === "number") {
        const bucket = Math.min(10, Math.max(1, Math.round(ug.userRating)));
        gameRatingDist[bucket] = (gameRatingDist[bucket] || 0) + 1;
      }
      let parsedGenres: string[] = [];
      try {
        parsedGenres = JSON.parse(ug.game.genres);
      } catch {}
      const gameHours = ug.hoursPlayed || 0;
      for (const g of parsedGenres) {
        genreHoursMap[g] = (genreHoursMap[g] || 0) + gameHours;
      }
      const rawPlatform = ug.platform || "General";
      const individualPlats = rawPlatform
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
      for (const p of individualPlats) {
        platformHoursMap[p] = (platformHoursMap[p] || 0) + gameHours;
        platformGamesCountMap[p] = (platformGamesCountMap[p] || 0) + 1;
      }

      if (
        typeof ug.userRating === "number" &&
        typeof ug.game.metacritic === "number" &&
        ug.gameKnowledge !== null &&
        ug.difference !== null
      ) {
        const criticRating = Number((ug.game.metacritic / 10).toFixed(1));
        const takeType = classifyHotTake(ug.difference);
        hotTakes.push({
          title: ug.game.title,
          cover: ug.game.backgroundImage,
          userRating: ug.userRating,
          criticRating,
          difference: ug.difference,
          gameKnowledge: ug.gameKnowledge,
          type: takeType,
          hoursPlayed: ug.hoursPlayed,
        });
        criticVsYou.push({
          title: ug.game.title,
          userRating: ug.userRating,
          criticRating,
          gameKnowledge: ug.gameKnowledge,
        });
      }
    }

    hotTakes.sort((a, b) => Math.abs(b.difference) - Math.abs(a.difference));

    const totalPlatAgg = Object.values(platformHoursMap).reduce(
      (a, b) => a + b,
      0,
    );
    const hoursByPlatform = Object.entries(platformHoursMap)
      .map(([platform, hours]) => ({
        platform,
        hours: Math.round(hours),
        gameCount: platformGamesCountMap[platform] || 1,
        percentage:
          totalPlatAgg > 0 ? Math.round((hours / totalPlatAgg) * 100) : 0,
      }))
      .sort((a, b) => b.hours - a.hours);

    const hoursByGenre = Object.entries(genreHoursMap)
      .map(([genre, hours]) => ({ genre, hours: Math.round(hours) }))
      .sort((a, b) => b.hours - a.hours);

    const gameRatingDistributionList = Object.entries(gameRatingDist).map(
      ([rating, count]) => ({ rating: Number(rating), count }),
    );

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
        totalReviews: watchedMovies.filter(
          (m) => m.review && m.review.trim().length > 0,
        ).length,
        averageRating: avgMovieRating,
        globalBallKnowledge,
        ...movieLevelInfo,
        topGenre: movieGenreCounts[0]?.genre || null,
        highestRatedMovie,
        lowestRatedMovie,
        topCine,
        topMovies: topCine,
        watchedCatalog,
        recentMovies: watchedMovies.slice(0, 12),
        recentSeries: watchedSeries.slice(0, 12),
        biggestW,
        biggestL,
        ratingDistribution: movieRatingDistribution,
        genreCounts: movieGenreCounts,
        watchesByMonth,
      },
      gaming: {
        totalCompleted: completedGames.length,
        totalBacklog: backlogGames.length,
        totalHours: Math.round(totalHours),
        totalPlatinum,
        averageRating: avgGameRating,
        averageMetacritic,
        globalGameKnowledge,
        ...gamerLevelInfo,
        topGenre: hoursByGenre[0]?.genre || null,
        topPlatform: hoursByPlatform[0]?.platform || null,
        topGames,
        gamesCatalog,
        recentGames: userGames.slice(0, 12),
        longestGame,
        highestRatedGame,
        lowestRatedGame,
        averageCompletionHours,
        statusBreakdown,
        ratingDistribution: gameRatingDistributionList,
        hoursByPlatform,
        hoursByGenre,
        criticVsYou,
        hotTakes,
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
