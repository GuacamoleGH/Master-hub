import { MovieSearchResult, MovieDetail, CastMember } from "@/types/movie";
import { CURATED_MOVIES } from "./mockData";
import { getImdbRating } from "./omdb";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

function getHeaders(): HeadersInit {
  const token = process.env.TMDB_READ_ACCESS_TOKEN;
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json;charset=utf-8",
    };
  }
  return {
    "Content-Type": "application/json;charset=utf-8",
  };
}

function getApiKeyParam(): string {
  const key = process.env.TMDB_API_KEY;
  return key ? `api_key=${key}` : "";
}

/**
 * Normaliza y detecta las plataformas de streaming en España / Internacional
 */
export function extractStreamingPlatforms(watchProviders: any): string[] {
  const esFlatrate =
    watchProviders?.results?.ES?.flatrate ||
    watchProviders?.results?.US?.flatrate ||
    [];
  const platforms: Set<string> = new Set();

  for (const item of esFlatrate) {
    const name = item.provider_name.toLowerCase();
    if (name.includes("netflix")) platforms.add("Netflix");
    else if (name.includes("hbo") || name.includes("max"))
      platforms.add("HBO Max");
    else if (name.includes("amazon") || name.includes("prime"))
      platforms.add("Prime Video");
    else if (name.includes("disney")) platforms.add("Disney+");
    else if (name.includes("filmin")) platforms.add("Filmin");
    else if (name.includes("movistar")) platforms.add("Movistar Plus+");
    else if (name.includes("skyshowtime") || name.includes("showtime"))
      platforms.add("SkyShowtime");
  }

  // Regla del usuario: si no sale ni en Netflix, ni en HBO, ni en Amazon Prime Video -> Opción Pirata / Stremio
  const hasBigThree =
    platforms.has("Netflix") ||
    platforms.has("HBO Max") ||
    platforms.has("Prime Video");

  if (!hasBigThree || platforms.size === 0) {
    platforms.add("Pirata / Stremio");
  }

  return Array.from(platforms);
}

/**
 * Busca películas por texto en TMDB con fallback local
 */
export async function searchMovies(
  query: string,
): Promise<MovieSearchResult[]> {
  if (!query || query.trim().length === 0) return [];

  const cleanQuery = query.trim().toLowerCase();

  try {
    const apiKeyParam = getApiKeyParam();
    const url = `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=es-ES&include_adult=false${apiKeyParam ? `&${apiKeyParam}` : ""}`;

    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 3600 },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        return data.results.slice(0, 15).map((item: any) => ({
          id: item.id,
          title: item.title,
          originalTitle: item.original_title,
          year: item.release_date
            ? parseInt(item.release_date.substring(0, 4), 10)
            : undefined,
          posterPath: item.poster_path
            ? `${TMDB_IMAGE_BASE}/w500${item.poster_path}`
            : null,
          backdropPath: item.backdrop_path
            ? `${TMDB_IMAGE_BASE}/original${item.backdrop_path}`
            : null,
          overview: item.overview || "",
          voteAverage: Number((item.vote_average || 0).toFixed(1)),
        }));
      }
    }
  } catch (error) {
    console.error("Error al consultar TMDB Search API:", error);
  }

  // Fallback: búsqueda en el catálogo curado local
  const localMatches = CURATED_MOVIES.filter(
    (m) =>
      m.title.toLowerCase().includes(cleanQuery) ||
      m.originalTitle.toLowerCase().includes(cleanQuery),
  );

  return localMatches.map((item) => ({
    id: item.tmdbId,
    title: item.title,
    originalTitle: item.originalTitle,
    year: item.year,
    posterPath: item.posterPath,
    backdropPath: item.backdropPath,
    overview: item.overview,
    voteAverage: item.imdbRating,
  }));
}

/**
 * Obtiene los detalles completos de una película por su ID de TMDB incluyendo streaming providers
 */
export async function getMovieDetail(
  tmdbId: number,
): Promise<MovieDetail | null> {
  try {
    const apiKeyParam = getApiKeyParam();
    const url = `${TMDB_BASE_URL}/movie/${tmdbId}?language=es-ES&append_to_response=credits,external_ids,watch/providers${apiKeyParam ? `&${apiKeyParam}` : ""}`;

    const res = await fetch(url, {
      headers: getHeaders(),
      next: { revalidate: 86400 },
    });

    if (res.ok) {
      const data = await res.json();
      const credits = data.credits || {};
      const externalIds = data.external_ids || {};
      const watchProviders = data["watch/providers"] || {};

      // Buscar director
      const crew = credits.crew || [];
      const directorObj =
        crew.find((c: any) => c.job === "Director") ||
        crew.find((c: any) => c.department === "Directing");
      const director = directorObj ? directorObj.name : null;
      const directorImage =
        directorObj && directorObj.profile_path
          ? `${TMDB_IMAGE_BASE}/w185${directorObj.profile_path}`
          : null;

      // Principales actores (top 8)
      const cast: CastMember[] = (credits.cast || [])
        .slice(0, 8)
        .map((c: any) => ({
          id: c.id,
          name: c.name,
          character: c.character,
          profilePath: c.profile_path
            ? `${TMDB_IMAGE_BASE}/w185${c.profile_path}`
            : null,
        }));

      const genres = (data.genres || []).map((g: any) => g.name);
      const imdbId = externalIds.imdb_id || null;
      const tmdbRating = data.vote_average
        ? Number(data.vote_average.toFixed(1))
        : null;

      // Plataformas de streaming
      const streamingPlatforms = extractStreamingPlatforms(watchProviders);

      // Obtener rating de IMDb vía OMDb con fallback a TMDB
      const imdbRating = await getImdbRating(imdbId, tmdbRating);

      return {
        id: String(data.id),
        tmdbId: data.id,
        imdbId,
        title: data.title,
        originalTitle: data.original_title || null,
        year: data.release_date
          ? parseInt(data.release_date.substring(0, 4), 10)
          : null,
        posterPath: data.poster_path
          ? `${TMDB_IMAGE_BASE}/w500${data.poster_path}`
          : null,
        backdropPath: data.backdrop_path
          ? `${TMDB_IMAGE_BASE}/original${data.backdrop_path}`
          : null,
        overview: data.overview || null,
        runtime: data.runtime || null,
        genres,
        director,
        directorImage,
        cast,
        imdbRating,
        streamingPlatforms,
      };
    }
  } catch (error) {
    console.error("Error al obtener detalle de película en TMDB:", error);
  }

  // Fallback: buscar en catálogo curado
  const local = CURATED_MOVIES.find((m) => m.tmdbId === tmdbId);
  if (local) {
    return {
      id: String(local.tmdbId),
      tmdbId: local.tmdbId,
      imdbId: local.imdbId,
      title: local.title,
      originalTitle: local.originalTitle,
      year: local.year,
      posterPath: local.posterPath,
      backdropPath: local.backdropPath,
      overview: local.overview,
      runtime: local.runtime,
      genres: local.genres,
      director: local.director,
      directorImage: local.directorImage,
      cast: local.cast.map((c, idx) => ({ id: idx + 1, ...c })),
      imdbRating: local.imdbRating,
      streamingPlatforms: local.streamingPlatforms || ["Pirata / Stremio"],
    };
  }

  return null;
}
