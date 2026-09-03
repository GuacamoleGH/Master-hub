import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGameDetail } from "@/lib/rawg";
import { calculateGameKnowledge, calculateGameXp } from "@/lib/gameKnowledge";

async function refreshGamerXp() {
  const allUserGames = await prisma.userGame.findMany();
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

  await prisma.gamerProfile.upsert({
    where: { id: "gamer-default" },
    update: { totalXp },
    create: {
      id: "gamer-default",
      displayName: "Jose",
      totalXp,
    },
  });
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status"); // 'BACKLOG' | 'PLAYING' | 'COMPLETED' | 'PLATINUM' | 'DROPPED'
  const platform = searchParams.get("platform");
  const genre = searchParams.get("genre");
  const sort = searchParams.get("sort") || "recent";

  try {
    const whereClause: any = {};
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

      return {
        id: r.id,
        gameId: r.gameId,
        status: r.status,
        userRating: r.userRating,
        hoursPlayed: r.hoursPlayed,
        platform: r.platform,
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
  try {
    const body = await request.json();
    const {
      rawgId,
      status, // 'BACKLOG' | 'PLAYING' | 'COMPLETED' | 'PLATINUM' | 'DROPPED'
      userRating,
      hoursPlayed,
      platform,
      review,
      completedDate,
    } = body;

    if (!rawgId || !status) {
      return NextResponse.json(
        { error: "Faltan parámetros requeridos (rawgId, status)" },
        { status: 400 },
      );
    }

    // 1. Asegurar que el juego existe en base de datos
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

    // 2. Calcular Game Knowledge si está valorado y tiene Metacritic
    let gameKnowledge: number | null = null;
    let difference: number | null = null;

    if (typeof userRating === "number" && typeof game.metacritic === "number") {
      const gk = calculateGameKnowledge(userRating, game.metacritic);
      gameKnowledge = gk.gameKnowledge;
      difference = gk.difference;
    }

    const isFinished = status === "COMPLETED" || status === "PLATINUM";
    const dateToSave = completedDate
      ? new Date(completedDate)
      : isFinished
        ? new Date()
        : null;

    // 3. Upsert UserGame
    const userGame = await prisma.userGame.upsert({
      where: { gameId: game.id },
      update: {
        status,
        userRating: typeof userRating === "number" ? userRating : null,
        hoursPlayed: typeof hoursPlayed === "number" ? hoursPlayed : null,
        platform: platform !== undefined ? platform : undefined,
        review: review !== undefined ? review : null,
        completedDate: dateToSave,
        gameKnowledge,
        difference,
      },
      create: {
        gameId: game.id,
        status,
        userRating: typeof userRating === "number" ? userRating : null,
        hoursPlayed: typeof hoursPlayed === "number" ? hoursPlayed : null,
        platform: platform || null,
        review: review !== undefined ? review : null,
        completedDate: dateToSave,
        gameKnowledge,
        difference,
      },
    });

    await refreshGamerXp();

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
  const { searchParams } = new URL(request.url);
  const userGameId = searchParams.get("id");
  const gameId = searchParams.get("gameId");

  try {
    if (userGameId) {
      await prisma.userGame.delete({ where: { id: userGameId } });
    } else if (gameId) {
      await prisma.userGame.deleteMany({ where: { gameId } });
    } else {
      return NextResponse.json(
        { error: "Falta parámetro id o gameId" },
        { status: 400 },
      );
    }

    await refreshGamerXp();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error en DELETE /api/user-games:", error);
    return NextResponse.json(
      { error: "Error al eliminar registro de videojuego" },
      { status: 500 },
    );
  }
}
