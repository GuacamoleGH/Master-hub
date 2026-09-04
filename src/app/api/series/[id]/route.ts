import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSeriesDetail } from "@/lib/tmdb";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const idOrTmdb = params.id;

  try {
    // 1. Intentar buscar en DB por id interno o tmdbId
    const isNum = !isNaN(Number(idOrTmdb));
    let dbSeries = await prisma.series.findFirst({
      where: isNum
        ? { OR: [{ id: idOrTmdb }, { tmdbId: Number(idOrTmdb) }] }
        : { id: idOrTmdb },
      include: {
        userSeries: true,
      },
    });

    if (dbSeries) {
      let parsedGenres: string[] = [];
      let parsedCast: any[] = [];
      let parsedPlatforms: string[] = [];
      try {
        parsedGenres = JSON.parse(dbSeries.genres);
      } catch {}
      try {
        parsedCast = JSON.parse(dbSeries.cast);
      } catch {}
      try {
        if (dbSeries.streamingPlatforms) {
          parsedPlatforms = JSON.parse(dbSeries.streamingPlatforms);
        }
      } catch {}

      // Si faltan plataformas, reparto completo o foto del creador en DB pero tiene tmdbId, actualizar desde TMDB
      if (
        dbSeries.tmdbId &&
        (parsedPlatforms.length === 0 ||
          parsedCast.length < 8 ||
          !dbSeries.creatorImage)
      ) {
        const freshDetail = await getSeriesDetail(dbSeries.tmdbId);
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
          await prisma.series.update({
            where: { id: dbSeries.id },
            data: {
              streamingPlatforms: JSON.stringify(parsedPlatforms),
              cast: JSON.stringify(parsedCast),
              creator: freshDetail.creator || dbSeries.creator,
              creatorImage: freshDetail.creatorImage || dbSeries.creatorImage,
              posterPath: freshDetail.posterPath || dbSeries.posterPath,
              backdropPath: freshDetail.backdropPath || dbSeries.backdropPath,
            },
          });
        }
      }

      return NextResponse.json({
        series: {
          id: dbSeries.id,
          tmdbId: dbSeries.tmdbId,
          imdbId: dbSeries.imdbId,
          name: dbSeries.name,
          originalName: dbSeries.originalName,
          firstAirYear: dbSeries.firstAirYear,
          lastAirYear: dbSeries.lastAirYear,
          numberOfSeasons: dbSeries.numberOfSeasons,
          numberOfEpisodes: dbSeries.numberOfEpisodes,
          seriesStatus: dbSeries.seriesStatus,
          posterPath: dbSeries.posterPath,
          backdropPath: dbSeries.backdropPath,
          overview: dbSeries.overview,
          genres: parsedGenres,
          creator: dbSeries.creator,
          creatorImage: dbSeries.creatorImage,
          cast: parsedCast,
          imdbRating: dbSeries.imdbRating,
          streamingPlatforms: parsedPlatforms,
          userSeries: dbSeries.userSeries
            ? {
                id: dbSeries.userSeries.id,
                status: dbSeries.userSeries.status,
                userRating: dbSeries.userSeries.userRating,
                review: dbSeries.userSeries.review,
                platform: dbSeries.userSeries.platform,
                watchedDate: dbSeries.userSeries.watchedDate
                  ? dbSeries.userSeries.watchedDate.toISOString()
                  : null,
                ballKnowledge: dbSeries.userSeries.ballKnowledge,
                difference: dbSeries.userSeries.difference,
              }
            : null,
        },
      });
    }

    // 2. Si no está en DB pero es un ID numérico de TMDB, consultar la API externa
    if (isNum) {
      const tmdbDetail = await getSeriesDetail(Number(idOrTmdb));
      if (tmdbDetail) {
        return NextResponse.json({ series: tmdbDetail });
      }
    }

    return NextResponse.json({ error: "Serie no encontrada" }, { status: 404 });
  } catch (error) {
    console.error("Error en /api/series/[id]:", error);
    return NextResponse.json(
      { error: "Error al obtener la serie" },
      { status: 500 },
    );
  }
}
