import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSeriesDetail } from "@/lib/tmdb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const idOrTmdb = params.id;
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  try {
    const isNum = !isNaN(Number(idOrTmdb));
    let dbSeries = await prisma.series.findFirst({
      where: isNum
        ? { OR: [{ id: idOrTmdb }, { tmdbId: Number(idOrTmdb) }] }
        : { id: idOrTmdb },
      include: {
        userSeries: userId ? { where: { userId } } : false,
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

      const userSeries = (dbSeries as any).userSeries?.[0] || null;

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
          userSeries: userSeries
            ? {
                id: userSeries.id,
                status: userSeries.status,
                userRating: userSeries.userRating,
                review: userSeries.review,
                platform: userSeries.platform,
                watchedDate: userSeries.watchedDate
                  ? userSeries.watchedDate.toISOString()
                  : null,
                ballKnowledge: userSeries.ballKnowledge,
                difference: userSeries.difference,
              }
            : null,
        },
      });
    }

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
      { status: 500 }
    );
  }
}
