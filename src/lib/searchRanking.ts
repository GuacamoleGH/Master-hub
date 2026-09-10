export interface RankableSearchItem {
  title: string;
  originalTitle?: string | null;
  voteAverage?: number | null;
  popularity?: number | null;
  voteCount?: number | null;
}

/**
 * Calcula una puntuación de relevancia para ordenar resultados de búsqueda de TMDB.
 * Evita que series o películas desconocidas (ej. animes o programas chinos con 1 solo voto de 10.0)
 * aparezcan por encima de grandes éxitos o coincidencias reales de la consulta.
 */
export function calculateSearchRelevanceScore(
  item: RankableSearchItem,
  rawQuery: string,
): number {
  const cleanQ = rawQuery.trim().toLowerCase();
  if (!cleanQ) return 0;

  const title = (item.title || "").toLowerCase();
  const origTitle = (item.originalTitle || "").toLowerCase();

  let score = 0;

  // 1. Coincidencia exacta de título
  if (title === cleanQ) {
    score += 10000;
  } else if (origTitle === cleanQ) {
    score += 8000;
  }
  // 2. El título empieza exactamente con la búsqueda (ej. "Infinite..." para "infini")
  else if (title.startsWith(cleanQ)) {
    score += 5000;
  } else if (origTitle.startsWith(cleanQ)) {
    score += 4000;
  }
  // 3. Coincidencia por palabras individuales
  else {
    const titleWords = title.split(/[\s:,\-_·/()]+/);
    const origWords = origTitle.split(/[\s:,\-_·/()]+/);

    const titleWordIndex = titleWords.findIndex((w) => w.startsWith(cleanQ));
    if (titleWordIndex !== -1) {
      // Cuanto antes aparezca la palabra en el título, más relevante
      score += Math.max(3500 - titleWordIndex * 250, 1500);
    } else {
      const origWordIndex = origWords.findIndex((w) => w.startsWith(cleanQ));
      if (origWordIndex !== -1) {
        score += Math.max(2500 - origWordIndex * 200, 1200);
      } else if (title.includes(cleanQ)) {
        score += 800;
      } else if (origTitle.includes(cleanQ)) {
        score += 400;
      }
    }
  }

  // 4. Penalización si el título principal contiene caracteres orientales (chino, japonés, coreano)
  // y la búsqueda fue hecha en caracteres latinos.
  const hasCJK =
    /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f\u1100-\u11ff\u3130-\u318f\ua960-\ua97f\ud7b0-\ud7ff]/.test(
      item.title || "",
    );
  const queryIsLatin = /^[a-zA-Z0-9\s:,'"-]+$/.test(cleanQ);
  if (hasCJK && queryIsLatin) {
    score -= 1500;
  }

  // 5. Popularidad de TMDB (audiencia e interés real a nivel mundial)
  const popularity = item.popularity || 0;
  score += Math.min(popularity * 5, 2000);

  // 6. Conteo de votos (Confianza estadística masiva: 20.000 votos vs 1 voto)
  const voteCount = item.voteCount || 0;
  if (voteCount > 0) {
    score += Math.min(Math.log10(voteCount + 1) * 100, 600);
  }

  // 7. Calidad/Nota media: SÓLO aporta puntos si tiene al menos 15 votos fiables.
  // Esto previene que una serie con 1 único voto de 10.0 adelante a producciones aclamadas.
  if (voteCount >= 15 && item.voteAverage) {
    score += item.voteAverage * 15;
  }

  return score;
}

export function sortSearchResultsByRelevance<T extends RankableSearchItem>(
  items: T[],
  query: string,
): T[] {
  return [...items].sort((a, b) => {
    const scoreA = calculateSearchRelevanceScore(a, query);
    const scoreB = calculateSearchRelevanceScore(b, query);
    return scoreB - scoreA;
  });
}
