import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Debes iniciar sesión para realizar esta acción." },
        { status: 401 }
      );
    }

    const userId = session.user.id;
    const body = await request.json();
    const { confirmationWord, deleteAccount } = body;

    // Capa de seguridad obligatoria: escribir la palabra exacta ELIMINAR
    if (typeof confirmationWord !== "string" || confirmationWord.trim() !== "ELIMINAR") {
      return NextResponse.json(
        {
          error:
            "Palabra de confirmación no válida. Debes escribir exactamente la palabra ELIMINAR en mayúsculas.",
        },
        { status: 400 }
      );
    }

    // Verificar que el usuario exista en la base de datos
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: "Usuario no encontrado en la base de datos." },
        { status: 404 }
      );
    }

    // Ejecutar borrado estricto y aislado SOLO para este userId
    const [deletedMovies, deletedSeries, deletedGames] = await prisma.$transaction([
      prisma.userMovie.deleteMany({
        where: { userId },
      }),
      prisma.userSeries.deleteMany({
        where: { userId },
      }),
      prisma.userGame.deleteMany({
        where: { userId },
      }),
    ]);

    let accountDeleted = false;

    if (deleteAccount === true) {
      // Eliminar también la cuenta de usuario (cascada a sesiones y cuentas OAuth/Credentials)
      await prisma.user.delete({
        where: { id: userId },
      });
      accountDeleted = true;
    } else {
      // Mantener la cuenta pero reiniciar totalmente sus estadísticas y XP
      await prisma.user.update({
        where: { id: userId },
        data: {
          totalXp: 0,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: accountDeleted
        ? "Tu cuenta y todos tus datos han sido purgados permanentemente de la base de datos."
        : "Se ha realizado el wipeout de tu biblioteca (películas, series y juegos) y se ha restablecido tu XP a cero.",
      deletedCount: {
        movies: deletedMovies.count,
        series: deletedSeries.count,
        games: deletedGames.count,
      },
      accountDeleted,
    });
  } catch (error: any) {
    console.error("Error al ejecutar wipeout de datos de usuario:", error);
    return NextResponse.json(
      {
        error:
          "Ocurrió un error en el servidor al intentar purgar los datos. Inténtalo nuevamente.",
      },
      { status: 500 }
    );
  }
}
