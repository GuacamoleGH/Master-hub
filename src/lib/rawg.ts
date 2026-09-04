import { GameSearchResult, GameDetail } from "@/types/game";

const RAWG_BASE_URL = "https://api.rawg.io/api";

function getApiKey(): string {
  return process.env.RAWG_API_KEY || "976bc28df89142868e4721cff5fc5645";
}

/**
 * Busca videojuegos por texto en la API de RAWG
 */
export async function searchGames(query: string): Promise<GameSearchResult[]> {
  if (!query || query.trim().length === 0) return [];

  const key = getApiKey();
  const url = `${RAWG_BASE_URL}/games?search=${encodeURIComponent(query.trim())}&key=${key}&page_size=15`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];

    const data = await res.json();
    if (!data.results || !Array.isArray(data.results)) return [];

    return data.results.map((item: any) => {
      const platforms = (item.platforms || [])
        .map((p: any) => p.platform?.name)
        .filter(Boolean);
      const genres = (item.genres || [])
        .map((g: any) => g.name)
        .filter(Boolean);

      return {
        id: item.id,
        title: item.name,
        released: item.released || null,
        backgroundImage: item.background_image || null,
        rating: item.rating ? Number(item.rating.toFixed(1)) : null,
        metacritic: item.metacritic || null,
        platforms,
        genres,
        slug: item.slug || null,
      };
    });
  } catch (error) {
    console.error("Error al buscar juegos en RAWG:", error);
    return [];
  }
}

/**
 * Obtiene el detalle completo de un videojuego en RAWG incluyendo screenshots y trailers
 */
export async function getGameDetail(
  rawgId: number,
): Promise<GameDetail | null> {
  const key = getApiKey();

  try {
    // 1. Obtener ficha principal
    const mainUrl = `${RAWG_BASE_URL}/games/${rawgId}?key=${key}`;
    const res = await fetch(mainUrl, { next: { revalidate: 86400 } });
    if (!res.ok) return null;

    const data = await res.json();

    const platforms = (data.platforms || [])
      .map((p: any) => p.platform?.name)
      .filter(Boolean);
    const genres = (data.genres || []).map((g: any) => g.name).filter(Boolean);
    const developers = (data.developers || [])
      .map((d: any) => d.name)
      .filter(Boolean);
    const publishers = (data.publishers || [])
      .map((p: any) => p.name)
      .filter(Boolean);

    // 2. Obtener screenshots
    let screenshots: string[] = [];
    try {
      const screenRes = await fetch(
        `${RAWG_BASE_URL}/games/${rawgId}/screenshots?key=${key}`,
        {
          next: { revalidate: 86400 },
        },
      );
      if (screenRes.ok) {
        const screenData = await screenRes.json();
        screenshots = (screenData.results || [])
          .map((s: any) => s.image)
          .filter(Boolean);
      }
    } catch {}

    // 3. Obtener trailer/clip
    let trailerUrl: string | null = null;
    try {
      const movieRes = await fetch(
        `${RAWG_BASE_URL}/games/${rawgId}/movies?key=${key}`,
        {
          next: { revalidate: 86400 },
        },
      );
      if (movieRes.ok) {
        const movieData = await movieRes.json();
        if (movieData.results && movieData.results.length > 0) {
          trailerUrl =
            movieData.results[0].data?.max ||
            movieData.results[0].data?.[480] ||
            null;
        }
      }
    } catch {}

    return {
      id: String(data.id),
      rawgId: data.id,
      title: data.name,
      released: data.released || null,
      backgroundImage: data.background_image || null,
      metacritic: data.metacritic || null,
      rating: data.rating ? Number(data.rating.toFixed(1)) : null,
      genres,
      platforms,
      developers,
      publishers,
      description: data.description_raw || data.description || null,
      screenshots,
      trailerUrl,
      slug: data.slug || null,
    };
  } catch (error) {
    console.error("Error al obtener detalle de juego en RAWG:", error);
    return null;
  }
}
