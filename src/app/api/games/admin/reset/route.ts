import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CURATED_GAMES } from "@/lib/mockGames";
import { calculateGameKnowledge } from "@/lib/gameKnowledge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action || "wipe";

    if (action === "wipe") {
      await prisma.userGame.deleteMany();
      await prisma.gamerProfile.updateMany({
        data: { totalXp: 0 },
      });
      return NextResponse.json({
        success: true,
        message: "Datos de usuario gamer reiniciados correctamente.",
      });
    }

    if (action === "seed") {
      await prisma.userGame.deleteMany();
      await prisma.game.deleteMany();

      let totalXp = 0;

      for (const item of CURATED_GAMES) {
        const game = await prisma.game.create({
          data: {
            rawgId: item.rawgId,
            title: item.title,
            released: item.released,
            backgroundImage: item.backgroundImage,
            metacritic: item.metacritic,
            rating: item.rating,
            genres: JSON.stringify(item.genres),
            platforms: JSON.stringify(item.platforms),
            developers: JSON.stringify(item.developers),
            publishers: JSON.stringify(item.publishers),
            description: item.description,
            screenshots: JSON.stringify(item.screenshots),
          },
        });

        if (item.userGame) {
          let gameKnowledge: number | null = null;
          let difference: number | null = null;

          if (
            typeof item.userGame.userRating === "number" &&
            typeof item.metacritic === "number"
          ) {
            const res = calculateGameKnowledge(
              item.userGame.userRating,
              item.metacritic
            );
            gameKnowledge = res.gameKnowledge;
            difference = res.difference;
          }

          await prisma.userGame.create({
            data: {
              gameId: game.id,
              status: item.userGame.status,
              userRating: item.userGame.userRating ?? null,
              hoursPlayed: item.userGame.hoursPlayed ?? null,
              platform: item.userGame.platform ?? null,
              review: item.userGame.review ?? null,
              completedDate: item.userGame.completedDate ? new Date(item.userGame.completedDate) : null,
              gameKnowledge,
              difference,
            },
          });

          if (item.userGame.status === "COMPLETED") totalXp += 150;
          else if (item.userGame.status === "PLATINUM") totalXp += 250;
          else if (item.userGame.status === "PLAYING") totalXp += 35;
          else if (item.userGame.status === "BACKLOG") totalXp += 15;

          if (item.userGame.review) totalXp += 50;
          if (gameKnowledge !== null && gameKnowledge >= 95) totalXp += 30;
          if (item.userGame.hoursPlayed) {
            totalXp += Math.min(
              200,
              Math.floor(item.userGame.hoursPlayed / 10) * 10
            );
          }
        }
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

      return NextResponse.json({
        success: true,
        message: "Catálogo de videojuegos de demostración cargado con éxito.",
      });
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  } catch (error) {
    console.error("Error en /api/games/admin/reset:", error);
    return NextResponse.json(
      { error: "Error al gestionar la base de datos de videojuegos" },
      { status: 500 }
    );
  }
}
