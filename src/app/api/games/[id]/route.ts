import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getGameDetail } from "@/lib/rawg";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const idOrRawg = params.id;

  try {
    const isNum = !isNaN(Number(idOrRawg));
    let dbGame = await prisma.game.findFirst({
      where: isNum
        ? { OR: [{ id: idOrRawg }, { rawgId: Number(idOrRawg) }] }
        : { id: idOrRawg },
      include: {
        userGame: true,
      },
    });

    if (dbGame) {
      let parsedGenres: string[] = [];
      let parsedPlatforms: string[] = [];
      let parsedDevelopers: string[] = [];
      let parsedPublishers: string[] = [];
      let parsedScreenshots: string[] = [];

      try {
        parsedGenres = JSON.parse(dbGame.genres);
      } catch {}
      try {
        parsedPlatforms = JSON.parse(dbGame.platforms);
      } catch {}
      try {
        if (dbGame.developers) parsedDevelopers = JSON.parse(dbGame.developers);
      } catch {}
      try {
        if (dbGame.publishers) parsedPublishers = JSON.parse(dbGame.publishers);
      } catch {}
      try {
        if (dbGame.screenshots)
          parsedScreenshots = JSON.parse(dbGame.screenshots);
      } catch {}

      return NextResponse.json({
        game: {
          id: dbGame.id,
          rawgId: dbGame.rawgId,
          title: dbGame.title,
          released: dbGame.released,
          backgroundImage: dbGame.backgroundImage,
          metacritic: dbGame.metacritic,
          rating: dbGame.rating,
          genres: parsedGenres,
          platforms: parsedPlatforms,
          developers: parsedDevelopers,
          publishers: parsedPublishers,
          description: dbGame.description,
          screenshots: parsedScreenshots,
          trailerUrl: dbGame.trailerUrl,
          userGame: dbGame.userGame
            ? {
                id: dbGame.userGame.id,
                status: dbGame.userGame.status,
                userRating: dbGame.userGame.userRating,
                hoursPlayed: dbGame.userGame.hoursPlayed,
                platform: dbGame.userGame.platform,
                review: dbGame.userGame.review,
                completedDate: dbGame.userGame.completedDate
                  ? dbGame.userGame.completedDate.toISOString()
                  : null,
                gameKnowledge: dbGame.userGame.gameKnowledge,
                difference: dbGame.userGame.difference,
              }
            : null,
        },
      });
    }

    // 2. Si no está en DB pero es un ID numérico de RAWG, consultar la API externa
    if (isNum) {
      const rawgDetail = await getGameDetail(Number(idOrRawg));
      if (rawgDetail) {
        return NextResponse.json({ game: rawgDetail });
      }
    }

    return NextResponse.json(
      { error: "Videojuego no encontrado" },
      { status: 404 },
    );
  } catch (error) {
    console.error("Error en /api/games/[id]:", error);
    return NextResponse.json(
      { error: "Error al obtener el videojuego" },
      { status: 500 },
    );
  }
}
