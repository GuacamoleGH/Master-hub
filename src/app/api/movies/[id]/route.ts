import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getMovieDetail } from "@/lib/tmdb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const idOrTmdb = params.id;

  try {
    // 1. Intentar buscar en DB por id interno o tmdbId
    const isNum = !isNaN(Number(idOrTmdb));
    let dbMovie = await prisma.movie.findFirst({
      where: isNum
        ? { OR: [{ id: idOrTmdb }, { tmdbId: Number(idOrTmdb) }] }
        : { id: idOrTmdb },
      include: {
        userMovie: true,
      },
    });

    if (dbMovie) {
      let parsedGenres: string[] = [];
      let parsedCast: any[] = [];
      let parsedPlatforms: string[] = [];
      try {
        parsedGenres = JSON.parse(dbMovie.genres);
      } catch {}
      try {
        parsedCast = JSON.parse(dbMovie.cast);
      } catch {}
      try {
        if (dbMovie.streamingPlatforms) {
          parsedPlatforms = JSON.parse(dbMovie.streamingPlatforms);
        }
      } catch {}

      // Si faltan plataformas, reparto completo o foto del director en DB pero tiene tmdbId, actualizar desde TMDB
      if (
        dbMovie.tmdbId &&
        (parsedPlatforms.length === 0 ||
          parsedCast.length < 8 ||
          !dbMovie.directorImage)
      ) {
        const freshDetail = await getMovieDetail(dbMovie.tmdbId);
        if (freshDetail) {
          if (
            freshDetail.streamingPlatforms &&
            freshDetail.streamingPlatforms.length > 0
          ) {
            parsedPlatforms = freshDetail.streamingPlatforms;
          }
          if (freshDetail.cast && freshDetail.cast.length > parsedCast.length) {
            parsedCast = freshDetail.cast;
          }
          await prisma.movie.update({
            where: { id: dbMovie.id },
            data: {
              streamingPlatforms: JSON.stringify(parsedPlatforms),
              cast: JSON.stringify(parsedCast),
              director: freshDetail.director || dbMovie.director,
              directorImage: freshDetail.directorImage || dbMovie.directorImage,
              posterPath: freshDetail.posterPath || dbMovie.posterPath,
              backdropPath: freshDetail.backdropPath || dbMovie.backdropPath,
            },
          });
        }
      }

      return NextResponse.json({
        movie: {
          id: dbMovie.id,
          tmdbId: dbMovie.tmdbId,
          imdbId: dbMovie.imdbId,
          title: dbMovie.title,
          originalTitle: dbMovie.originalTitle,
          year: dbMovie.year,
          posterPath: dbMovie.posterPath,
          backdropPath: dbMovie.backdropPath,
          overview: dbMovie.overview,
          runtime: dbMovie.runtime,
          genres: parsedGenres,
          director: dbMovie.director,
          directorImage: dbMovie.directorImage,
          cast: parsedCast,
          imdbRating: dbMovie.imdbRating,
          streamingPlatforms: parsedPlatforms,
          userMovie: dbMovie.userMovie
            ? {
                id: dbMovie.userMovie.id,
                status: dbMovie.userMovie.status,
                userRating: dbMovie.userMovie.userRating,
                review: dbMovie.userMovie.review,
                platform: dbMovie.userMovie.platform,
                watchedDate: dbMovie.userMovie.watchedDate
                  ? dbMovie.userMovie.watchedDate.toISOString()
                  : null,
                ballKnowledge: dbMovie.userMovie.ballKnowledge,
                difference: dbMovie.userMovie.difference,
              }
            : null,
        },
      });
    }

    // 2. Si no está en DB pero es un ID numérico de TMDB, consultar la API externa
    if (isNum) {
      const tmdbDetail = await getMovieDetail(Number(idOrTmdb));
      if (tmdbDetail) {
        return NextResponse.json({ movie: tmdbDetail });
      }
    }

    return NextResponse.json(
      { error: "Película no encontrada" },
      { status: 404 },
    );
  } catch (error) {
    console.error("Error en /api/movies/[id]:", error);
    return NextResponse.json(
      { error: "Error al obtener la película" },
      { status: 500 },
    );
  }
}
