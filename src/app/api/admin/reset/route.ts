import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { CURATED_MOVIES } from "@/lib/mockData";
import { calculateBallKnowledge } from "@/lib/ballKnowledge";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action || "wipe";

    if (action === "wipe") {
      // Limpiar solo los registros del usuario
      await prisma.userMovie.deleteMany();
      await prisma.userProfile.updateMany({
        data: { totalXp: 0 },
      });
      return NextResponse.json({
        success: true,
        message: "Datos de usuario reiniciados correctamente.",
      });
    }

    if (action === "seed") {
      // Re-sembrar datos de demostración
      await prisma.userMovie.deleteMany();
      await prisma.movie.deleteMany();

      let totalXp = 0;

      for (const item of CURATED_MOVIES) {
        const movie = await prisma.movie.create({
          data: {
            tmdbId: item.tmdbId,
            imdbId: item.imdbId,
            title: item.title,
            originalTitle: item.originalTitle,
            year: item.year,
            posterPath: item.posterPath,
            backdropPath: item.backdropPath,
            overview: item.overview,
            runtime: item.runtime,
            genres: JSON.stringify(item.genres),
            director: item.director,
            directorImage: item.directorImage,
            cast: JSON.stringify(item.cast),
            imdbRating: item.imdbRating,
          },
        });

        if (item.userMovie) {
          let bk: number | null = null;
          let diff: number | null = null;

          if (
            typeof item.userMovie.userRating === "number" &&
            typeof item.imdbRating === "number"
          ) {
            const res = calculateBallKnowledge(
              item.userMovie.userRating,
              item.imdbRating,
            );
            bk = res.ballKnowledge;
            diff = res.difference;
          }

          await prisma.userMovie.create({
            data: {
              movieId: movie.id,
              status: item.userMovie.status,
              userRating: item.userMovie.userRating ?? null,
              review: item.userMovie.review ?? null,
              watchedDate: item.userMovie.watchedDate
                ? new Date(item.userMovie.watchedDate)
                : null,
              ballKnowledge: bk,
              difference: diff,
            },
          });

          if (item.userMovie.status === "WATCHED") {
            totalXp += 100;
            if (item.userMovie.review) totalXp += 50;
            if (bk !== null && bk >= 95) totalXp += 25;
          } else {
            totalXp += 10;
          }
        }
      }

      await prisma.userProfile.upsert({
        where: { id: "user-default" },
        update: { totalXp },
        create: {
          id: "user-default",
          displayName: "Jose",
          totalXp,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Catálogo de demostración cargado con éxito.",
      });
    }

    return NextResponse.json({ error: "Acción no válida" }, { status: 400 });
  } catch (error) {
    console.error("Error en /api/admin/reset:", error);
    return NextResponse.json(
      { error: "Error al reiniciar datos" },
      { status: 500 },
    );
  }
}
