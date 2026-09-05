import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { evaluateUserAchievements } from "@/lib/achievements";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const targetUsername = searchParams.get("username");

    let userId: string | null = null;

    if (targetUsername) {
      const user = await prisma.user.findFirst({
        where: {
          OR: [
            { username: { equals: targetUsername, mode: "insensitive" } },
            { id: targetUsername },
          ],
        },
        select: { id: true },
      });
      if (user) userId = user.id;
    } else {
      const session = await getServerSession(authOptions);
      userId = session?.user?.id || null;
    }

    if (!userId) {
      const evaluation = evaluateUserAchievements({});
      return NextResponse.json(evaluation);
    }

    const [userMovies, userSeries, userGames] = await Promise.all([
      prisma.userMovie.findMany({
        where: { userId },
        select: {
          status: true,
          userRating: true,
          difference: true,
          platform: true,
          review: true,
          ballKnowledge: true,
          createdAt: true,
        },
      }),
      prisma.userSeries.findMany({
        where: { userId },
        select: {
          status: true,
          userRating: true,
          difference: true,
          platform: true,
          review: true,
          ballKnowledge: true,
          createdAt: true,
        },
      }),
      prisma.userGame.findMany({
        where: { userId },
        select: {
          status: true,
          userRating: true,
          difference: true,
          hoursPlayed: true,
          review: true,
          gameKnowledge: true,
          createdAt: true,
        },
      }),
    ]);

    // Calcular promedios
    const validBk = [...userMovies, ...userSeries]
      .map((item) => item.ballKnowledge)
      .filter((bk): bk is number => typeof bk === "number");
    const avgBallKnowledge =
      validBk.length > 0
        ? Math.round(validBk.reduce((a, b) => a + b, 0) / validBk.length)
        : null;

    const validGk = userGames
      .map((g) => g.gameKnowledge)
      .filter((gk): gk is number => typeof gk === "number");
    const avgGameKnowledge =
      validGk.length > 0
        ? Math.round(validGk.reduce((a, b) => a + b, 0) / validGk.length)
        : null;

    const totalHours = userGames.reduce(
      (acc, g) => acc + (Number(g.hoursPlayed) || 0),
      0
    );

    const evaluation = evaluateUserAchievements({
      movies: userMovies,
      series: userSeries,
      games: userGames,
      stats: {
        avgBallKnowledge,
        avgGameKnowledge,
        totalHours,
      },
    });

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Error en GET /api/profile/achievements:", error);
    return NextResponse.json(
      { error: "Error al evaluar logros" },
      { status: 500 }
    );
  }
}
