import { NextRequest, NextResponse } from "next/server";
import { searchSeries } from "@/lib/tmdb";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  if (!q || q.trim().length === 0) {
    return NextResponse.json({ results: [] });
  }

  try {
    const results = await searchSeries(q);
    return NextResponse.json({ results });
  } catch (error) {
    console.error("Error en /api/series/search:", error);
    return NextResponse.json(
      { error: "Error al buscar series" },
      { status: 500 },
    );
  }
}
