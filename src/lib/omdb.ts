/**
 * Servicio para consultar la nota oficial de IMDb vía OMDb API con fallback seguro
 */
export async function getImdbRating(
  imdbId: string | null,
  fallbackRating?: number | null,
): Promise<number | null> {
  if (!imdbId) return fallbackRating ?? null;

  const apiKey = process.env.OMDB_API_KEY;
  if (!apiKey) {
    return fallbackRating ?? null;
  }

  try {
    const res = await fetch(
      `https://www.omdbapi.com/?i=${imdbId}&apikey=${apiKey}`,
      {
        next: { revalidate: 86400 }, // Caché por 24 horas
      },
    );
    if (!res.ok) return fallbackRating ?? null;

    const data = await res.json();
    if (
      data.Response === "True" &&
      data.imdbRating &&
      data.imdbRating !== "N/A"
    ) {
      const parsed = parseFloat(data.imdbRating);
      if (!isNaN(parsed)) {
        return Number(parsed.toFixed(1));
      }
    }
  } catch (error) {
    console.error("Error al consultar OMDb:", error);
  }

  return fallbackRating ?? null;
}
