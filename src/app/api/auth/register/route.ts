import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, username, email, password } = body;

    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "Usuario, email y contraseña son obligatorios." },
        { status: 400 }
      );
    }

    const cleanUsername = username.trim().toLowerCase();
    const cleanEmail = email.trim().toLowerCase();

    if (cleanUsername.length < 3) {
      return NextResponse.json(
        { error: "El nombre de usuario debe tener al menos 3 caracteres." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres." },
        { status: 400 }
      );
    }

    // Comprobar si ya existe usuario o email
    const existing = await prisma.user.findFirst({
      where: {
        OR: [
          { email: { equals: cleanEmail, mode: "insensitive" } },
          { username: { equals: cleanUsername, mode: "insensitive" } },
        ],
      },
    });

    if (existing) {
      if (existing.email?.toLowerCase() === cleanEmail) {
        return NextResponse.json(
          { error: "Este correo electrónico ya está registrado." },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: "Este nombre de usuario ya está en uso." },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name: name?.trim() || username.trim(),
        username: cleanUsername,
        email: cleanEmail,
        passwordHash,
        bio: "Explorador y analista del catálogo universal.",
        totalXp: 0,
      },
    });

    return NextResponse.json(
      {
        message: "Usuario creado exitosamente.",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          name: user.name,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error en registro:", error);
    return NextResponse.json(
      { error: "Error interno al crear el usuario." },
      { status: 500 }
    );
  }
}
