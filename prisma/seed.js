const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CURATED_MOVIES = [
  {
    tmdbId: 1124,
    imdbId: "tt0482571",
    title: "El truco final (El prestigio)",
    originalTitle: "The Prestige",
    year: 2006,
    posterPath:
      "https://image.tmdb.org/t/p/w500/lIl2CrnWohGrZSO9eyKRptxZ7Hs.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/t5zCBSB5xMDKcDqe71tcK639Wwh.jpg",
    overview:
      "En el Londres de finales del siglo XIX, dos jóvenes magos ilusionistas, Robert Angier y Alfred Borden, se convierten en enconados rivales tras un trágico accidente durante una función. Su obsesión por crear el truco definitivo desencadenará una guerra de egos con consecuencias letales.",
    runtime: 130,
    genres: JSON.stringify(["Drama", "Misterio", "Ciencia ficción"]),
    director: "Christopher Nolan",
    directorImage:
      "https://image.tmdb.org/t/p/w185/xuAIuYSmsUzKlUMBFGVZaWsY3Z5.jpg",
    imdbRating: 8.5,
    streamingPlatforms: JSON.stringify(["Pirata / Stremio"]),
    cast: JSON.stringify([
      {
        name: "Hugh Jackman",
        character: "Robert Angier",
        profilePath:
          "https://image.tmdb.org/t/p/w185/oX6CpXmn5UcficC3Y7Wi605v5kL.jpg",
      },
      {
        name: "Christian Bale",
        character: "Alfred Borden",
        profilePath:
          "https://image.tmdb.org/t/p/w185/b7fTC9WFkgqGOv77mLQ0kWGR4iq.jpg",
      },
      {
        name: "Michael Caine",
        character: "John Cutter",
        profilePath:
          "https://image.tmdb.org/t/p/w185/klNxOq3zD87J31UvKk1G0e3aD7y.jpg",
      },
      {
        name: "Scarlett Johansson",
        character: "Olivia Wenscombe",
        profilePath:
          "https://image.tmdb.org/t/p/w185/6NsMbJXRlDZuDzatJA4akhoQxmJ.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHED",
      userRating: 8.5,
      review:
        "Una auténtica obra maestra del ilusionismo narrativo. La estructura de tres actos (La Presentación, El Giro y El Prestigio) se aplica tanto a la magia como al propio montaje cinematográfico.",
      watchedDate: new Date("2026-08-15T20:30:00Z"),
      platform: "Pirata / Stremio",
    },
  },
  {
    tmdbId: 180,
    imdbId: "tt0264464",
    title: "Atrápame si puedes",
    originalTitle: "Catch Me If You Can",
    year: 2002,
    posterPath:
      "https://image.tmdb.org/t/p/w500/ctjggpwtc602d3A8R9uK1a6G0l1.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/jGvY2fQ4h2y8H6aR4mK7G8h4mXq.jpg",
    overview:
      "Basada en una historia real. En los años sesenta, Frank W. Abagnale Jr. era un joven y escurridizo estafador que se hizo pasar por piloto de avión, médico y abogado, viviendo una vida de lujo mientras el agente del FBI Carl Hanratty le seguía la pista obsesivamente.",
    runtime: 141,
    genres: JSON.stringify(["Crimen", "Drama", "Comedia"]),
    director: "Steven Spielberg",
    directorImage:
      "https://image.tmdb.org/t/p/w185/tZxcg19YQ3e8fJ0XkL4fJ3V9n7P.jpg",
    imdbRating: 8.1,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([
      {
        name: "Leonardo DiCaprio",
        character: "Frank Abagnale Jr.",
        profilePath:
          "https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
      },
      {
        name: "Tom Hanks",
        character: "Carl Hanratty",
        profilePath:
          "https://image.tmdb.org/t/p/w185/xndWFsBlClOJFRdhSt4NBwiPq2o.jpg",
      },
      {
        name: "Christopher Walken",
        character: "Frank Abagnale Sr.",
        profilePath:
          "https://image.tmdb.org/t/p/w185/eP44kR5X0x7M9A3A3KzV0v4wP0Q.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHED",
      userRating: 8.0,
      review:
        "El ritmo y carisma que desprende esta película es inigualable. La química entre DiCaprio y Hanks eleva un guion ya de por sí brillante.",
      watchedDate: new Date("2026-08-20T21:00:00Z"),
      platform: "Prime Video",
    },
  },
  {
    tmdbId: 157336,
    imdbId: "tt0816692",
    title: "Interstellar",
    originalTitle: "Interstellar",
    year: 2014,
    posterPath:
      "https://image.tmdb.org/t/p/w500/d1QKiYtceF3GDtxvTFXFAqwwah9.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    overview:
      "Un grupo de científicos y exploradores, encabezados por Cooper, se embarca en un viaje espacial para encontrar un nuevo hogar para la humanidad tras el colapso ecológico de la Tierra.",
    runtime: 169,
    genres: JSON.stringify(["Aventura", "Drama", "Ciencia ficción"]),
    director: "Christopher Nolan",
    directorImage:
      "https://image.tmdb.org/t/p/w185/xuAIuYSmsUzKlUMBFGVZaWsY3Z5.jpg",
    imdbRating: 8.7,
    streamingPlatforms: JSON.stringify(["Prime Video", "HBO Max"]),
    cast: JSON.stringify([
      {
        name: "Matthew McConaughey",
        character: "Joseph Cooper",
        profilePath:
          "https://image.tmdb.org/t/p/w185/eDmg9HhC2f4C9C9jP9g8B1F8.jpg",
      },
      {
        name: "Anne Hathaway",
        character: "Amelia Brand",
        profilePath:
          "https://image.tmdb.org/t/p/w185/tLel4qGqaVUm9P9qV5hB1.jpg",
      },
      {
        name: "Jessica Chastain",
        character: "Murphy Cooper",
        profilePath: "https://image.tmdb.org/t/p/w185/nkFr77s6F6eA9K5j9.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHED",
      userRating: 9.3,
      review:
        "Experiencia sensorial y emocional absoluta. La banda sonora de Hans Zimmer te transporta a otra dimensión.",
      watchedDate: new Date("2026-07-10T22:15:00Z"),
      platform: "HBO Max",
    },
  },
  {
    tmdbId: 680,
    imdbId: "tt0110912",
    title: "Pulp Fiction",
    originalTitle: "Pulp Fiction",
    year: 1994,
    posterPath:
      "https://image.tmdb.org/t/p/w500/hNcQAuquJxTxl2fJFs1R42DrWcf.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    overview:
      "Jules y Vincent, dos asesinos a sueldo con no demasiadas luces, trabajan a las órdenes del temido gángster Marsellus Wallace.",
    runtime: 154,
    genres: JSON.stringify(["Suspense", "Crimen"]),
    director: "Quentin Tarantino",
    directorImage:
      "https://image.tmdb.org/t/p/w185/1gjcpAa99FAOWGnrUvHEXRsRs7o.jpg",
    imdbRating: 8.9,
    streamingPlatforms: JSON.stringify(["HBO Max"]),
    cast: JSON.stringify([
      {
        name: "John Travolta",
        character: "Vincent Vega",
        profilePath: "https://image.tmdb.org/t/p/w185/7h2bW9W.jpg",
      },
      {
        name: "Samuel L. Jackson",
        character: "Jules Winnfield",
        profilePath: "https://image.tmdb.org/t/p/w185/mXN4IQ.jpg",
      },
      {
        name: "Uma Thurman",
        character: "Mia Wallace",
        profilePath: "https://image.tmdb.org/t/p/w185/9P9X.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHED",
      userRating: 8.9,
      review:
        "Diálogos legendarios y una estructura no lineal que redefinió el cine moderno para siempre.",
      watchedDate: new Date("2026-06-04T18:00:00Z"),
      platform: "HBO Max",
    },
  },
  {
    tmdbId: 244786,
    imdbId: "tt2582802",
    title: "Whiplash",
    originalTitle: "Whiplash",
    year: 2014,
    posterPath:
      "https://image.tmdb.org/t/p/w500/uy36CPy5ARuC8qrH8Esg2ndFyJ5.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/vNXGrkn3c6ePz2fLz9aX0.jpg",
    overview:
      "El objetivo de Andrew Neiman, un joven baterista de jazz, es triunfar en el elitista Conservatorio Shaffer de Nueva York.",
    runtime: 107,
    genres: JSON.stringify(["Drama", "Música"]),
    director: "Damien Chazelle",
    directorImage: "https://image.tmdb.org/t/p/w185/q4vV2.jpg",
    imdbRating: 8.5,
    streamingPlatforms: JSON.stringify(["Pirata / Stremio"]),
    cast: JSON.stringify([
      {
        name: "Miles Teller",
        character: "Andrew Neiman",
        profilePath: "https://image.tmdb.org/t/p/w185/cg.jpg",
      },
      {
        name: "J.K. Simmons",
        character: "Terence Fletcher",
        profilePath: "https://image.tmdb.org/t/p/w185/jk.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHED",
      userRating: 9.0,
      review:
        "Tensión en estado puro de principio a fin. El solo final de batería es historia del cine.",
      watchedDate: new Date("2026-05-18T20:00:00Z"),
      platform: "Pirata / Stremio",
    },
  },
  {
    tmdbId: 496243,
    imdbId: "tt6751668",
    title: "Parásitos",
    originalTitle: "Gisaengchung",
    year: 2019,
    posterPath:
      "https://image.tmdb.org/t/p/w500/4N55tgxDW0RRATyrZHbx0q9HUKv.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/hiKmpZMGZsrkA3cdce8a7Dpos1j.jpg",
    overview:
      "Tanto Gi-taek como su familia están sin trabajo. Cuando su hijo mayor empieza a dar clases particulares en casa de los adinerados Park, las dos familias se ven envueltas en una cadena de incidentes.",
    runtime: 132,
    genres: JSON.stringify(["Comedia", "Suspense", "Drama"]),
    director: "Bong Joon-ho",
    directorImage: "https://image.tmdb.org/t/p/w185/bong.jpg",
    imdbRating: 8.5,
    streamingPlatforms: JSON.stringify(["Prime Video"]),
    cast: JSON.stringify([
      {
        name: "Song Kang-ho",
        character: "Kim Ki-taek",
        profilePath: "https://image.tmdb.org/t/p/w185/song.jpg",
      },
      {
        name: "Lee Sun-kyun",
        character: "Park Dong-ik",
        profilePath: "https://image.tmdb.org/t/p/w185/lee.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHED",
      userRating: 8.7,
      review:
        "Sátira social quirúrgica y cambiante que pasa de la comedia al thriller más perturbador.",
      watchedDate: new Date("2026-07-22T21:30:00Z"),
      platform: "Prime Video",
    },
  },
  {
    tmdbId: 550,
    imdbId: "tt0137523",
    title: "El club de la lucha",
    originalTitle: "Fight Club",
    year: 1999,
    posterPath:
      "https://image.tmdb.org/t/p/w500/sgTAWJFaB2kBvdQxRGabYFiQqEK.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    overview:
      "Un empleado de oficina hastiado y un carismático fabricante de jabón forman un club clandestino que evoluciona hacia algo mucho más caótico.",
    runtime: 139,
    genres: JSON.stringify(["Drama"]),
    director: "David Fincher",
    directorImage: "https://image.tmdb.org/t/p/w185/fincher.jpg",
    imdbRating: 8.8,
    streamingPlatforms: JSON.stringify(["Netflix", "Disney+"]),
    cast: JSON.stringify([
      {
        name: "Edward Norton",
        character: "Narrador",
        profilePath: "https://image.tmdb.org/t/p/w185/norton.jpg",
      },
      {
        name: "Brad Pitt",
        character: "Tyler Durden",
        profilePath: "https://image.tmdb.org/t/p/w185/pitt.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHED",
      userRating: 4.4,
      review:
        "Mi mayor 'unpopular opinion'. Demasiado pretenciosa y nihilismo adolescente mal envejecido.",
      watchedDate: new Date("2026-06-12T19:40:00Z"),
      platform: "Netflix",
    },
  },
  {
    tmdbId: 335984,
    imdbId: "tt1856101",
    title: "Blade Runner 2049",
    originalTitle: "Blade Runner 2049",
    year: 2017,
    posterPath:
      "https://image.tmdb.org/t/p/w500/cOt8SQwrxpoTv9Bc3kyce3etkZX.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/sAtoMqDVhNDQBc3QJL3RF6hlxGq.jpg",
    overview:
      "Treinta años después de los eventos de la primera película, un nuevo blade runner desentierra un secreto enterrado que podría sumergir lo que queda de la sociedad en el caos.",
    runtime: 164,
    genres: JSON.stringify(["Ciencia ficción", "Misterio"]),
    director: "Denis Villeneuve",
    directorImage: "https://image.tmdb.org/t/p/w185/villeneuve.jpg",
    imdbRating: 8.0,
    streamingPlatforms: JSON.stringify(["Pirata / Stremio"]),
    cast: JSON.stringify([
      {
        name: "Ryan Gosling",
        character: "K",
        profilePath: "https://image.tmdb.org/t/p/w185/gosling.jpg",
      },
      {
        name: "Harrison Ford",
        character: "Rick Deckard",
        profilePath: "https://image.tmdb.org/t/p/w185/ford.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHED",
      userRating: 8.2,
      review:
        "Visualmente arrebatadora. Roger Deakins firma una de las mejores fotografías de la historia moderna.",
      watchedDate: new Date("2026-08-01T21:00:00Z"),
      platform: "Pirata / Stremio",
    },
  },
  {
    tmdbId: 238,
    imdbId: "tt0068646",
    title: "El Padrino",
    originalTitle: "The Godfather",
    year: 1972,
    posterPath:
      "https://image.tmdb.org/t/p/w500/5HlLUsmsv60cZVTzVns9ICZD6zU.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
    overview:
      "El anciano patriarca de una dinastía del crimen organizado transfiere el control de su imperio clandestino a su reacio hijo.",
    runtime: 175,
    genres: JSON.stringify(["Drama", "Crimen"]),
    director: "Francis Ford Coppola",
    directorImage: "https://image.tmdb.org/t/p/w185/coppola.jpg",
    imdbRating: 9.2,
    streamingPlatforms: JSON.stringify(["Pirata / Stremio"]),
    cast: JSON.stringify([
      {
        name: "Marlon Brando",
        character: "Don Vito Corleone",
        profilePath: "https://image.tmdb.org/t/p/w185/brando.jpg",
      },
      {
        name: "Al Pacino",
        character: "Michael Corleone",
        profilePath: "https://image.tmdb.org/t/p/w185/pacino.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHLIST",
      platform: "Pirata / Stremio",
    },
  },
  {
    tmdbId: 313369,
    imdbId: "tt3783958",
    title: "La La Land",
    originalTitle: "La La Land",
    year: 2016,
    posterPath:
      "https://image.tmdb.org/t/p/w500/7pFsAaJmiOppVHcldBzg8JKBHwe.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/qJeU79fBnGcq0y0X7Q4b.jpg",
    overview:
      "Una aspirante a actriz y un dedicado músico de jazz luchan por llegar a fin de mes mientras persiguen sus sueños en Los Ángeles.",
    runtime: 128,
    genres: JSON.stringify(["Comedia", "Drama", "Romance", "Música"]),
    director: "Damien Chazelle",
    directorImage: "https://image.tmdb.org/t/p/w185/chazelle.jpg",
    imdbRating: 8.0,
    streamingPlatforms: JSON.stringify(["Prime Video"]),
    cast: JSON.stringify([
      {
        name: "Ryan Gosling",
        character: "Sebastian Wilder",
        profilePath: "https://image.tmdb.org/t/p/w185/gosling.jpg",
      },
      {
        name: "Emma Stone",
        character: "Mia Dolan",
        profilePath: "https://image.tmdb.org/t/p/w185/stone.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHLIST",
      platform: "Prime Video",
    },
  },
  {
    tmdbId: 155,
    imdbId: "tt0468569",
    title: "El Caballero Oscuro",
    originalTitle: "The Dark Knight",
    year: 2008,
    posterPath:
      "https://image.tmdb.org/t/p/w500/8QDQExnfNFOtabLDKqfDQuHDsIg.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/dqK9Hag1054tghRQSqLSPoY2fgn.jpg",
    overview:
      "Batman se propone desmantelar las organizaciones criminales restantes que plagan las calles de Gotham.",
    runtime: 152,
    genres: JSON.stringify(["Acción", "Crimen", "Drama"]),
    director: "Christopher Nolan",
    directorImage: "https://image.tmdb.org/t/p/w185/nolan.jpg",
    imdbRating: 9.0,
    streamingPlatforms: JSON.stringify(["Netflix", "HBO Max", "Prime Video"]),
    cast: JSON.stringify([
      {
        name: "Christian Bale",
        character: "Bruce Wayne / Batman",
        profilePath: "https://image.tmdb.org/t/p/w185/bale.jpg",
      },
      {
        name: "Heath Ledger",
        character: "Joker",
        profilePath: "https://image.tmdb.org/t/p/w185/ledger.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHLIST",
      platform: "Netflix",
    },
  },
  {
    tmdbId: 603,
    imdbId: "tt0133093",
    title: "Matrix",
    originalTitle: "The Matrix",
    year: 1999,
    posterPath:
      "https://image.tmdb.org/t/p/w500/tpW2X2DvxtTHJ61iJ7zNYYrJihs.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/fNG7i7rqMErkcqhohV2a6JW9pqw.jpg",
    overview:
      "Un hacker informático aprende de rebeldes misteriosos sobre la verdadera naturaleza de su realidad.",
    runtime: 136,
    genres: JSON.stringify(["Acción", "Ciencia ficción"]),
    director: "Lilly Wachowski, Lana Wachowski",
    directorImage: "",
    imdbRating: 8.7,
    streamingPlatforms: JSON.stringify(["Prime Video", "HBO Max"]),
    cast: JSON.stringify([
      {
        name: "Keanu Reeves",
        character: "Neo",
        profilePath: "https://image.tmdb.org/t/p/w185/reeves.jpg",
      },
      {
        name: "Laurence Fishburne",
        character: "Morpheus",
        profilePath: "https://image.tmdb.org/t/p/w185/fishburne.jpg",
      },
    ]),
    userMovie: {
      status: "WATCHLIST",
      platform: "HBO Max",
    },
  },
];

function calculateBK(userRating, imdbRating) {
  if (
    userRating === null ||
    userRating === undefined ||
    imdbRating === null ||
    imdbRating === undefined
  ) {
    return { ballKnowledge: null, difference: null };
  }
  const diff = Number((userRating - imdbRating).toFixed(1));
  const absDiff = Math.abs(diff);
  const score = Math.max(0, Math.min(100, 100 - absDiff * 10));
  return {
    ballKnowledge: Number(score.toFixed(1)),
    difference: diff,
  };
}

async function seed() {
  console.log(
    "🌱 Sembrando base de datos con películas y plataformas actualizadas...",
  );

  await prisma.userMovie.deleteMany();
  await prisma.movie.deleteMany();
  await prisma.userProfile.deleteMany();

  let totalXp = 0;

  for (const item of CURATED_MOVIES) {
    const movie = await prisma.movie.create({
      data: {
        tmdbId: item.tmdbId,
        imdbId: item.imdbId,
        title: item.title,
        originalTitle: item.originalTitle,
        year: item.year,
        posterPath: item.posterPath,
        backdropPath: item.backdropPath,
        overview: item.overview,
        runtime: item.runtime,
        genres: item.genres,
        director: item.director,
        directorImage: item.directorImage,
        cast: item.cast,
        imdbRating: item.imdbRating,
        streamingPlatforms: item.streamingPlatforms,
      },
    });

    if (item.userMovie) {
      const { ballKnowledge, difference } = calculateBK(
        item.userMovie.userRating,
        item.imdbRating,
      );

      await prisma.userMovie.create({
        data: {
          movieId: movie.id,
          status: item.userMovie.status,
          userRating: item.userMovie.userRating ?? null,
          review: item.userMovie.review ?? null,
          platform: item.userMovie.platform ?? null,
          watchedDate: item.userMovie.watchedDate ?? null,
          ballKnowledge,
          difference,
        },
      });

      if (item.userMovie.status === "WATCHED") {
        totalXp += 100;
        if (item.userMovie.review) totalXp += 50;
        if (ballKnowledge !== null && ballKnowledge >= 95) totalXp += 25;
      } else {
        totalXp += 10;
      }
    }
  }

  await prisma.userProfile.create({
    data: {
      id: "user-default",
      displayName: "Jose",
      avatarUrl:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      bio: "Amante del cine de autor, ciencia ficción y thrillers de montaje impecable.",
      totalXp,
    },
  });

  console.log(
    `✅ Base de datos sembrada con éxito. Películas: ${CURATED_MOVIES.length}. XP: ${totalXp}`,
  );
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
