import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  calculateGamerLevelAndRank,
  classifyHotTake,
} from "@/lib/gameKnowledge";
import { GamerStats, HotTake } from "@/types/game";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      const levelInfo = calculateGamerLevelAndRank(0);
      return NextResponse.json({
        profile: {
          id: "guest",
          displayName: "Invitado",
          avatarUrl: null,
          bio: "Inicia sesión para guardar tu progreso de videojuegos y subir de nivel.",
        },
        stats: {
          totalHours: 0,
          totalCompleted: 0,
          totalBacklog: 0,
          totalPlaying: 0,
          totalPlatinum: 0,
          totalReviews: 0,
          averageRating: null,
          averageMetacritic: null,
          globalGameKnowledge: null,
          totalXp: 0,
          level: levelInfo.level,
          rankTitle: levelInfo.rankTitle,
          rankIcon: levelInfo.rankIcon,
          rankColor: levelInfo.rankColor,
          nextLevelXp: levelInfo.nextLevelXp,
          currentLevelBaseXp: levelInfo.currentLevelBaseXp,
          xpProgressPercent: levelInfo.xpProgressPercent,
          topGenre: null,
          topPlatform: null,
          hotTakes: [],
          criticVsYou: [],
          hoursByPlatform: [],
          hoursByGenre: [],
          ratingDistribution: [],
        },
      });
    }

    const userId = session.user.id;
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    const userGames = await prisma.userGame.findMany({
      where: { userId },
      include: {
        game: true,
      },
    });

    let totalHours = 0;
    let totalCompleted = 0;
    let totalPlatinum = 0;
    let totalBacklog = 0;
    let totalPlaying = 0;
    let totalReviews = 0;

    let totalUserRatingSum = 0;
    let ratedCount = 0;

    let totalMetacriticSum = 0;
    let metacriticCount = 0;

    let totalGkSum = 0;
    let gkCount = 0;

    const platformHoursMap: Record<string, number> = {};
    const platformGamesCountMap: Record<string, number> = {};
    const genreHoursMap: Record<string, number> = {};
    const ratingDistribution: Record<number, number> = {
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

    const hotTakes: HotTake[] = [];
    const criticVsYou: GamerStats["criticVsYou"] = [];

    for (const ug of userGames) {
      if (ug.hoursPlayed) {
        totalHours += ug.hoursPlayed;
      }

      if (ug.status === "COMPLETED") totalCompleted++;
      else if (ug.status === "PLATINUM") {
        totalCompleted++;
        totalPlatinum++;
      } else if (ug.status === "BACKLOG") totalBacklog++;
      else if (ug.status === "PLAYING") totalPlaying++;

      if (ug.review && ug.review.trim().length > 0) totalReviews++;

      if (typeof ug.userRating === "number") {
        totalUserRatingSum += ug.userRating;
        ratedCount++;

        const bucket = Math.min(10, Math.max(1, Math.round(ug.userRating)));
        ratingDistribution[bucket] = (ratingDistribution[bucket] || 0) + 1;
      }

      let parsedGenres: string[] = [];
      try {
        parsedGenres = JSON.parse(ug.game.genres);
      } catch {}

      const gameHours = ug.hoursPlayed || 0;

      let parsedProgress:
        | { platform: string; hours: number; status: string }[]
        | null = null;
      if (ug.platformDetails) {
        try {
          parsedProgress = JSON.parse(ug.platformDetails);
        } catch {}
      }

      if (
        parsedProgress &&
        Array.isArray(parsedProgress) &&
        parsedProgress.length > 0
      ) {
        for (const prog of parsedProgress) {
          const platName = prog.platform || "General";
          const progHours = Number(prog.hours) || 0;
          platformHoursMap[platName] =
            (platformHoursMap[platName] || 0) + progHours;
          platformGamesCountMap[platName] =
            (platformGamesCountMap[platName] || 0) + 1;
        }
      } else {
        const rawPlatform = ug.platform || "General";
        const individualPlats = rawPlatform
          .split(",")
          .map((p) => p.trim())
          .filter(Boolean);

        for (const p of individualPlats) {
          platformHoursMap[p] = (platformHoursMap[p] || 0) + gameHours;
          platformGamesCountMap[p] = (platformGamesCountMap[p] || 0) + 1;
        }
      }

      for (const g of parsedGenres) {
        genreHoursMap[g] = (genreHoursMap[g] || 0) + gameHours;
      }

      if (
        typeof ug.userRating === "number" &&
        typeof ug.game.metacritic === "number" &&
        ug.gameKnowledge !== null &&
        ug.difference !== null
      ) {
        const criticRating = Number((ug.game.metacritic / 10).toFixed(1));
        totalMetacriticSum += criticRating;
        metacriticCount++;

        totalGkSum += ug.gameKnowledge;
        gkCount++;

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

    const totalXp = user?.totalXp || 0;
    const levelInfo = calculateGamerLevelAndRank(totalXp);

    const totalPlatformAggregatedHours = Object.values(platformHoursMap).reduce(
      (a, b) => a + b,
      0
    );
    const hoursByPlatform = Object.entries(platformHoursMap)
      .map(([platform, hours]) => ({
        platform,
        hours: Math.round(hours),
        gameCount: platformGamesCountMap[platform] || 1,
        percentage:
          totalPlatformAggregatedHours > 0
            ? Math.round((hours / totalPlatformAggregatedHours) * 100)
            : 0,
      }))
      .sort((a, b) => b.hours - a.hours);

    const hoursByGenre = Object.entries(genreHoursMap)
      .map(([genre, hours]) => ({ genre, hours: Math.round(hours) }))
      .sort((a, b) => b.hours - a.hours);

    const ratingDistributionList = Object.entries(ratingDistribution).map(
      ([rating, count]) => ({ rating: Number(rating), count })
    );

    const stats: GamerStats = {
      totalHours: Math.round(totalHours),
      totalCompleted,
      totalBacklog,
      totalPlaying,
      totalPlatinum,
      totalReviews,
      averageRating:
        ratedCount > 0
          ? Number((totalUserRatingSum / ratedCount).toFixed(1))
          : null,
      averageMetacritic:
        metacriticCount > 0
          ? Number((totalMetacriticSum / metacriticCount).toFixed(1))
          : null,
      globalGameKnowledge:
        gkCount > 0 ? Number((totalGkSum / gkCount).toFixed(1)) : null,
      totalXp,
      level: levelInfo.level,
      rankTitle: levelInfo.rankTitle,
      rankIcon: levelInfo.rankIcon,
      rankColor: levelInfo.rankColor,
      nextLevelXp: levelInfo.nextLevelXp,
      currentLevelBaseXp: levelInfo.currentLevelBaseXp,
      xpProgressPercent: levelInfo.xpProgressPercent,
      topGenre: hoursByGenre.length > 0 ? hoursByGenre[0].genre : null,
      topPlatform:
        hoursByPlatform.length > 0 ? hoursByPlatform[0].platform : null,
      hotTakes,
      criticVsYou,
      hoursByPlatform,
      hoursByGenre,
      ratingDistribution: ratingDistributionList,
    };

    return NextResponse.json({
      profile: {
        id: user?.id || "gamer-default",
        displayName: user?.name || user?.username || "Gamer",
        avatarUrl: user?.image || null,
        bio: user?.bio || null,
      },
      stats,
    });
  } catch (error) {
    console.error("Error en /api/games/profile:", error);
    return NextResponse.json(
      { error: "Error al calcular estadísticas gamer" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { displayName, bio, avatarUrl } = body;

    const updated = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name: displayName ? displayName.trim() : undefined,
        bio: bio !== undefined ? bio.trim() : undefined,
        image: avatarUrl !== undefined ? avatarUrl.trim() || null : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      profile: {
        id: updated.id,
        displayName: updated.name || updated.username,
        bio: updated.bio,
        avatarUrl: updated.image,
      },
    });
  } catch (error) {
    console.error("Error en PATCH /api/games/profile:", error);
    return NextResponse.json(
      { error: "Error al actualizar perfil gamer" },
      { status: 500 }
    );
  }
}
