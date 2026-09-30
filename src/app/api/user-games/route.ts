import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGameDetail } from "@/lib/rawg";
import { calculateGameKnowledge, calculateGameXp } from "@/lib/gameKnowledge";
import { calculateMovieXp } from "@/lib/ballKnowledge";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function refreshGamerXp(userId: string) {
  const [allUserGames, allUserMovies, allUserSeries] = await Promise.all([
    prisma.userGame.findMany({ where: { userId } }),
    prisma.userMovie.findMany({ where: { userId } }),
    prisma.userSeries.findMany({ where: { userId } }),
  ]);
  let totalXp = 0;
  for (const ug of allUserGames) {
    const hasReview = Boolean(ug.review && ug.review.trim().length > 0);
    totalXp += calculateGameXp(
      ug.status,
      hasReview,
      ug.hoursPlayed,
      ug.gameKnowledge,
    );
  }
  for (const um of allUserMovies) {
    const isWatched = um.status === "WATCHED";
    const hasReview = Boolean(um.review && um.review.trim().length > 0);
    totalXp += calculateMovieXp(isWatched, hasReview, um.ballKnowledge);
  }
  for (const us of allUserSeries) {
    const isWatched = us.status === "WATCHED";
    const hasReview = Boolean(us.review && us.review.trim().length > 0);
    totalXp += calculateMovieXp(isWatched, hasReview, us.ballKnowledge);
  }

  await prisma.user.update({
    where: { id: userId },
    data: { totalXp },
  });
}

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ items: [] });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const platform = searchParams.get("platform");
  const genre = searchParams.get("genre");
  const sort = searchParams.get("sort") || "recent";

  try {
    const whereClause: any = {
      userId: session.user.id,
    };

    if (status && status !== "all") {
      if (status === "COMPLETED_ALL") {
        whereClause.status = { in: ["COMPLETED", "PLATINUM"] };
      } else {
        whereClause.status = status;
      }
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "hoursDesc") orderBy = { hoursPlayed: "desc" };
    else if (sort === "hoursAsc") orderBy = { hoursPlayed: "asc" };
    else if (sort === "myRatingDesc") orderBy = { userRating: "desc" };
    else if (sort === "myRatingAsc") orderBy = { userRating: "asc" };
    else if (sort === "gkDesc") orderBy = { gameKnowledge: "desc" };
    else if (sort === "gkAsc") orderBy = { gameKnowledge: "asc" };
    else if (sort === "oldest") orderBy = { createdAt: "asc" };

    const records = await prisma.userGame.findMany({
      where: whereClause,
      include: {
        game: true,
      },
      orderBy,
    });

    let results = records.map((r) => {
      let genres: string[] = [];
      let platforms: string[] = [];
      let developers: string[] = [];
      try {
        genres = JSON.parse(r.game.genres);
      } catch {}
      try {
        platforms = JSON.parse(r.game.platforms);
      } catch {}
      try {
        if (r.game.developers) developers = JSON.parse(r.game.developers);
      } catch {}

      let parsedPlatformDetails = null;
      if (r.platformDetails) {
        try {
          parsedPlatformDetails = JSON.parse(r.platformDetails);
        } catch {}
      }

      return {
        id: r.id,
        gameId: r.gameId,
        status: r.status,
        userRating: r.userRating,
        hoursPlayed: r.hoursPlayed,
        platform: r.platform,
        platformDetails: parsedPlatformDetails,
        review: r.review,
        completedDate: r.completedDate ? r.completedDate.toISOString() : null,
        gameKnowledge: r.gameKnowledge,
        difference: r.difference,
        createdAt: r.createdAt.toISOString(),
        game: {
          id: r.game.id,
          rawgId: r.game.rawgId,
          title: r.game.title,
          released: r.game.released,
          backgroundImage: r.game.backgroundImage,
          metacritic: r.game.metacritic,
          rating: r.game.rating,
          genres,
          platforms,
          developers,
        },
      };
    });

    if (genre && genre !== "all") {
      results = results.filter((item) =>
        item.game.genres.some((g) => g.toLowerCase() === genre.toLowerCase()),
      );
    }

    if (platform && platform !== "all") {
      const cleanPlat = platform.toLowerCase();
      results = results.filter(
        (item) =>
          (item.platform && item.platform.toLowerCase().includes(cleanPlat)) ||
          item.game.platforms.some((p) => p.toLowerCase().includes(cleanPlat)),
      );
    }

    if (sort === "title") {
      results.sort((a, b) => a.game.title.localeCompare(b.game.title));
    } else if (sort === "metacriticDesc") {
      results.sort(
        (a, b) => (b.game.metacritic || 0) - (a.game.metacritic || 0),
      );
    }

    return NextResponse.json({ items: results });
  } catch (error) {
    console.error("Error en GET /api/user-games:", error);
    return NextResponse.json(
      { error: "Error al listar videojuegos" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      {
        error:
          "Debes iniciar sesión para registrar videojuegos en tu colección.",
      },
      { status: 401 },
    );
  }

  const userId = session.user.id;

  try {
    const body = await request.json();
    const {
      rawgId,
      status,
      userRating,
      hoursPlayed,
      platform,
      platformDetails,
      review,
      completedDate,
    } = body;

    if (!rawgId || !status) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos (rawgId, status)" },
        { status: 400 },
      );
    }

    let game = await prisma.game.findUnique({
      where: { rawgId: Number(rawgId) },
    });

    if (!game) {
      const detail = await getGameDetail(Number(rawgId));
      if (!detail) {
        return NextResponse.json(
          { error: "No se pudo obtener información del juego desde RAWG" },
          { status: 404 },
        );
      }

      game = await prisma.game.create({
        data: {
          rawgId: detail.rawgId,
          title: detail.title,
          released: detail.released,
          backgroundImage: detail.backgroundImage,
          metacritic: detail.metacritic,
          rating: detail.rating,
          genres: JSON.stringify(detail.genres),
          platforms: JSON.stringify(detail.platforms),
          developers: JSON.stringify(detail.developers),
          publishers: JSON.stringify(detail.publishers),
          description: detail.description,
          screenshots: JSON.stringify(detail.screenshots),
          trailerUrl: detail.trailerUrl,
        },
      });
    }

    let gameKnowledge: number | null = null;
    let difference: number | null = null;

    if (typeof userRating === "number" && typeof game.metacritic === "number") {
      const gk = calculateGameKnowledge(userRating, game.metacritic);
      gameKnowledge = gk.gameKnowledge;
      difference = gk.difference;
    }

    const isFinished = status === "COMPLETED" || status === "PLATINUM";
    const dateToSave =
      completedDate === null
        ? null
        : completedDate
          ? new Date(completedDate)
          : isFinished
            ? new Date()
            : null;

    let finalHoursPlayed = typeof hoursPlayed === "number" ? hoursPlayed : null;
    let serializedPlatformDetails: string | null = null;
    if (platformDetails) {
      if (typeof platformDetails === "string") {
        serializedPlatformDetails = platformDetails;
        try {
          const parsed = JSON.parse(platformDetails);
          if (
            Array.isArray(parsed) &&
            parsed.length > 0 &&
            finalHoursPlayed === null
          ) {
            finalHoursPlayed = parsed.reduce(
              (acc: number, p: any) => acc + (Number(p.hours) || 0),
              0,
            );
          }
        } catch {}
      } else if (Array.isArray(platformDetails)) {
        serializedPlatformDetails = JSON.stringify(platformDetails);
        if (finalHoursPlayed === null && platformDetails.length > 0) {
          finalHoursPlayed = platformDetails.reduce(
            (acc: number, p: any) => acc + (Number(p.hours) || 0),
            0,
          );
        }
      }
    }

    const userGame = await prisma.userGame.upsert({
      where: {
        userId_gameId: {
          userId,
          gameId: game.id,
        },
      },
      update: {
        status,
        userRating: typeof userRating === "number" ? userRating : null,
        hoursPlayed: finalHoursPlayed,
        platform: platform !== undefined ? platform : undefined,
        platformDetails:
          serializedPlatformDetails !== null
            ? serializedPlatformDetails
            : undefined,
        review: review !== undefined ? review : null,
        completedDate: dateToSave,
        gameKnowledge,
        difference,
      },
      create: {
        userId,
        gameId: game.id,
        status,
        userRating: typeof userRating === "number" ? userRating : null,
        hoursPlayed: finalHoursPlayed,
        platform: platform || null,
        platformDetails: serializedPlatformDetails,
        review: review !== undefined ? review : null,
        completedDate: dateToSave,
        gameKnowledge,
        difference,
      },
    });

    await refreshGamerXp(userId);

    return NextResponse.json({ success: true, userGame });
  } catch (error) {
    console.error("Error en POST /api/user-games:", error);
    return NextResponse.json(
      { error: "Error al registrar videojuego" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json(
      { error: "Debes iniciar sesión para modificar tu colección." },
      { status: 401 },
    );
  }

  const userId = session.user.id;
  const { searchParams } = new URL(request.url);
  const userGameId = searchParams.get("id");
  const gameId = searchParams.get("gameId");

  try {
    if (userGameId) {
      await prisma.userGame.deleteMany({
        where: { id: userGameId, userId },
      });
    } else if (gameId) {
      await prisma.userGame.deleteMany({
        where: { gameId, userId },
      });
    } else {
      return NextResponse.json(
        { error: "Falta parámetro id o gameId" },
        { status: 400 },
      );
    }

    await refreshGamerXp(userId);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en DELETE /api/user-games:", error);
    return NextResponse.json(
      { error: "Error al eliminar registro de videojuego" },
      { status: 500 },
    );
  }
}
