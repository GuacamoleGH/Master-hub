import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calculateLevelAndRank } from "@/lib/ballKnowledge";

export async function GET() {
  try {
    let profile = await prisma.userProfile.findUnique({
      where: { id: "user-default" },
    });

    if (!profile) {
      profile = await prisma.userProfile.create({
        data: {
          id: "user-default",
          displayName: "Jose",
          totalXp: 0,
        },
      });
    }

    const allRecords = await prisma.userMovie.findMany({
      include: {
        movie: true,
      },
    });

    const watchedList = allRecords.filter((r) => r.status === "WATCHED");
    const watchlistCount = allRecords.filter(
      (r) => r.status === "WATCHLIST",
    ).length;
    const reviewedCount = watchedList.filter(
      (r) => r.review && r.review.trim().length > 0,
    ).length;

    // Métricas de notas y Ball Knowledge
    const ratedList = watchedList.filter(
      (r) => typeof r.userRating === "number",
    );
    const totalRated = ratedList.length;

    let averageRating: number | null = null;
    let averageImdbRating: number | null = null;
    let globalBallKnowledge: number | null = null;
    let averageDifference: number | null = null;

    if (totalRated > 0) {
      const sumUserRatings = ratedList.reduce(
        (acc, curr) => acc + (curr.userRating || 0),
        0,
      );
      averageRating = Number((sumUserRatings / totalRated).toFixed(1));

      const moviesWithImdb = ratedList.filter(
        (r) => typeof r.movie.imdbRating === "number",
      );
      if (moviesWithImdb.length > 0) {
        const sumImdb = moviesWithImdb.reduce(
          (acc, curr) => acc + (curr.movie.imdbRating || 0),
          0,
        );
        averageImdbRating = Number(
          (sumImdb / moviesWithImdb.length).toFixed(1),
        );

        const bkList = moviesWithImdb.filter(
          (r) => typeof r.ballKnowledge === "number",
        );
        if (bkList.length > 0) {
          const sumBk = bkList.reduce(
            (acc, curr) => acc + (curr.ballKnowledge || 0),
            0,
          );
          globalBallKnowledge = Number((sumBk / bkList.length).toFixed(1));

          const sumDiff = bkList.reduce(
            (acc, curr) => acc + Math.abs(curr.difference || 0),
            0,
          );
          averageDifference = Number((sumDiff / bkList.length).toFixed(1));
        }
      }
    }

    // Nivel cinéfilo y XP
    const levelInfo = calculateLevelAndRank(profile.totalXp);

    // Rankings personales: Highest, Lowest, Biggest W, Biggest L
    let highestRatedMovie: any = null;
    let lowestRatedMovie: any = null;
    let biggestW: any = null;
    let biggestL: any = null;

    if (ratedList.length > 0) {
      const sortedByRating = [...ratedList].sort(
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

      const bkRecords = ratedList.filter(
        (r) =>
          typeof r.ballKnowledge === "number" &&
          typeof r.movie.imdbRating === "number",
      );
      if (bkRecords.length > 0) {
        // Biggest W: mayor coincidencia (mayor BK y menor abs(diff))
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

        // Biggest L: mayor discrepancia (menor BK)
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

    // Distribución de notas (redondeadas al entero más cercano 0..10)
    const ratingBuckets: { [key: number]: number } = {};
    for (let i = 0; i <= 10; i++) ratingBuckets[i] = 0;
    for (const r of ratedList) {
      if (typeof r.userRating === "number") {
        const bucket = Math.round(r.userRating);
        ratingBuckets[bucket] = (ratingBuckets[bucket] || 0) + 1;
      }
    }
    const ratingDistribution = Object.keys(ratingBuckets).map((k) => ({
      rating: Number(k),
      count: ratingBuckets[Number(k)],
    }));

    // Conteo por géneros
    const genreMap: { [key: string]: { count: number; totalScore: number } } =
      {};
    for (const r of watchedList) {
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

    const genreCounts = Object.entries(genreMap)
      .map(([genre, data]) => ({
        genre,
        count: data.count,
        avgRating:
          data.count > 0
            ? Number((data.totalScore / data.count).toFixed(1))
            : 0,
      }))
      .sort((a, b) => b.count - a.count);

    const topGenre = genreCounts.length > 0 ? genreCounts[0].genre : null;

    // Películas vistas por mes
    const monthMap: { [key: string]: number } = {};
    for (const r of watchedList) {
      if (r.watchedDate) {
        const key = r.watchedDate.toISOString().substring(0, 7); // YYYY-MM
        monthMap[key] = (monthMap[key] || 0) + 1;
      }
    }
    const watchesByMonth = Object.keys(monthMap)
      .sort()
      .map((month) => ({
        month,
        count: monthMap[month],
      }));

    // Conteo por décadas
    const decadeMap: { [key: string]: number } = {};
    for (const r of watchedList) {
      if (r.movie.year) {
        const decade = `${Math.floor(r.movie.year / 10) * 10}s`;
        decadeMap[decade] = (decadeMap[decade] || 0) + 1;
      }
    }
    const decadesCount = Object.keys(decadeMap)
      .sort()
      .map((decade) => ({
        decade,
        count: decadeMap[decade],
      }));

    return NextResponse.json({
      profile: {
        displayName: profile.displayName,
        avatarUrl: profile.avatarUrl,
        bio: profile.bio,
      },
      stats: {
        totalWatched: watchedList.length,
        totalWatchlist: watchlistCount,
        totalReviews: reviewedCount,
        averageRating,
        averageImdbRating,
        globalBallKnowledge,
        averageDifference,
        ...levelInfo,
        topGenre,
        highestRatedMovie,
        lowestRatedMovie,
        biggestW,
        biggestL,
        ratingDistribution,
        genreCounts,
        watchesByMonth,
        decadesCount,
      },
    });
  } catch (error) {
    console.error("Error en GET /api/profile:", error);
    return NextResponse.json(
      { error: "Error al obtener estadísticas del perfil" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { displayName, bio, avatarUrl } = body;

    const updated = await prisma.userProfile.upsert({
      where: { id: "user-default" },
      update: {
        displayName: displayName || undefined,
        bio: bio !== undefined ? bio : undefined,
        avatarUrl: avatarUrl !== undefined ? avatarUrl : undefined,
      },
      create: {
        id: "user-default",
        displayName: displayName || "Cinéfilo",
        bio,
        avatarUrl,
      },
    });

    return NextResponse.json({ success: true, profile: updated });
  } catch (error) {
    console.error("Error en PATCH /api/profile:", error);
    return NextResponse.json(
      { error: "Error al actualizar perfil" },
      { status: 500 },
    );
  }
}
