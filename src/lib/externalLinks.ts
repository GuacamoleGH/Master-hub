/**
 * Genera el enlace oficial a la ficha de IMDb para una película o serie
 */
export function getImdbUrl(imdbId?: string | null, title?: string): string {
  if (imdbId && imdbId.trim().length > 0) {
    return `https://www.imdb.com/title/${imdbId.trim()}/`;
  }
  if (title && title.trim().length > 0) {
    return `https://www.imdb.com/find/?q=${encodeURIComponent(title.trim())}`;
  }
  return "https://www.imdb.com";
}

/**
 * Genera el enlace oficial a la ficha de RAWG para un videojuego
 */
export function getRawgUrl(
  slug?: string | null,
  title?: string,
  rawgId?: number | string | null,
): string {
  if (slug && slug.trim().length > 0) {
    return `https://rawg.io/games/${slug.trim()}`;
  }
  if (title && title.trim().length > 0) {
    const slugified = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/['":.]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    if (slugified) {
      return `https://rawg.io/games/${slugified}`;
    }
  }
  if (rawgId) {
    return `https://rawg.io/games/${rawgId}`;
  }
  return "https://rawg.io";
}
