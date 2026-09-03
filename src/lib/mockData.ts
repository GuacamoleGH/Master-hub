export interface SeedMovie {
  tmdbId: number;
  imdbId: string;
  title: string;
  originalTitle: string;
  year: number;
  posterPath: string;
  backdropPath: string;
  overview: string;
  runtime: number;
  genres: string[];
  director: string;
  directorImage: string;
  imdbRating: number;
  streamingPlatforms: string[];
  cast: {
    name: string;
    character: string;
    profilePath: string;
  }[];
  userMovie?: {
    status: "WATCHLIST" | "WATCHED";
    userRating?: number;
    review?: string;
    watchedDate?: string;
    platform?: string;
  };
}

export const CURATED_MOVIES: SeedMovie[] = [
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
    genres: ["Drama", "Misterio", "Ciencia ficción"],
    director: "Christopher Nolan",
    directorImage:
      "https://image.tmdb.org/t/p/w185/xuAIuYSmsUzKlUMBFGVZaWsY3Z5.jpg",
    imdbRating: 8.5,
    streamingPlatforms: ["Pirata / Stremio"],
    cast: [
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
    ],
    userMovie: {
      status: "WATCHED",
      userRating: 8.5,
      review:
        "Una auténtica obra maestra del ilusionismo narrativo. La estructura de tres actos (La Presentación, El Giro y El Prestigio) se aplica tanto a la magia como al montaje cinematográfico.",
      watchedDate: "2026-08-15T20:30:00.000Z",
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
    genres: ["Crimen", "Drama", "Comedia"],
    director: "Steven Spielberg",
    directorImage:
      "https://image.tmdb.org/t/p/w185/tZxcg19YQ3e8fJ0XkL4fJ3V9n7P.jpg",
    imdbRating: 8.1,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [
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
    ],
    userMovie: {
      status: "WATCHED",
      userRating: 8.0,
      review:
        "El ritmo y carisma que desprende esta película es inigualable. La química entre DiCaprio y Hanks eleva un guion ya de por sí brillante.",
      watchedDate: "2026-08-20T21:00:00.000Z",
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
    genres: ["Aventura", "Drama", "Ciencia ficción"],
    director: "Christopher Nolan",
    directorImage:
      "https://image.tmdb.org/t/p/w185/xuAIuYSmsUzKlUMBFGVZaWsY3Z5.jpg",
    imdbRating: 8.7,
    streamingPlatforms: ["Prime Video", "HBO Max"],
    cast: [
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
    ],
    userMovie: {
      status: "WATCHED",
      userRating: 9.3,
      review:
        "Experiencia sensorial y emocional absoluta. La banda sonora de Hans Zimmer te transporta a otra dimensión.",
      watchedDate: "2026-07-10T22:15:00.000Z",
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
    genres: ["Suspense", "Crimen"],
    director: "Quentin Tarantino",
    directorImage:
      "https://image.tmdb.org/t/p/w185/1gjcpAa99FAOWGnrUvHEXRsRs7o.jpg",
    imdbRating: 8.9,
    streamingPlatforms: ["HBO Max"],
    cast: [
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
    ],
    userMovie: {
      status: "WATCHED",
      userRating: 8.9,
      review:
        "Diálogos legendarios y una estructura no lineal que redefinió el cine moderno para siempre.",
      watchedDate: "2026-06-04T18:00:00.000Z",
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
    genres: ["Drama", "Música"],
    director: "Damien Chazelle",
    directorImage: "https://image.tmdb.org/t/p/w185/q4vV2.jpg",
    imdbRating: 8.5,
    streamingPlatforms: ["Pirata / Stremio"],
    cast: [
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
    ],
    userMovie: {
      status: "WATCHED",
      userRating: 9.0,
      review:
        "Tensión en estado puro de principio a fin. El solo final de batería es historia del cine.",
      watchedDate: "2026-05-18T20:00:00.000Z",
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
    genres: ["Comedia", "Suspense", "Drama"],
    director: "Bong Joon-ho",
    directorImage: "https://image.tmdb.org/t/p/w185/bong.jpg",
    imdbRating: 8.5,
    streamingPlatforms: ["Prime Video"],
    cast: [
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
    ],
    userMovie: {
      status: "WATCHED",
      userRating: 8.7,
      review:
        "Sátira social quirúrgica y cambiante que pasa de la comedia al thriller más perturbador sin despeinarse.",
      watchedDate: "2026-07-22T21:30:00.000Z",
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
    genres: ["Drama"],
    director: "David Fincher",
    directorImage: "https://image.tmdb.org/t/p/w185/fincher.jpg",
    imdbRating: 8.8,
    streamingPlatforms: ["Netflix", "Disney+"],
    cast: [
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
    ],
    userMovie: {
      status: "WATCHED",
      userRating: 4.4,
      review:
        "Mi mayor 'unpopular opinion'. Demasiado pretenciosa y nihilismo adolescente mal envejecido.",
      watchedDate: "2026-06-12T19:40:00.000Z",
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
    genres: ["Ciencia ficción", "Misterio"],
    director: "Denis Villeneuve",
    directorImage: "https://image.tmdb.org/t/p/w185/villeneuve.jpg",
    imdbRating: 8.0,
    streamingPlatforms: ["Pirata / Stremio"],
    cast: [
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
    ],
    userMovie: {
      status: "WATCHED",
      userRating: 8.2,
      review:
        "Visualmente arrebatadora. Roger Deakins firma una de las mejores fotografías de la historia.",
      watchedDate: "2026-08-01T21:00:00.000Z",
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
    genres: ["Drama", "Crimen"],
    director: "Francis Ford Coppola",
    directorImage: "https://image.tmdb.org/t/p/w185/coppola.jpg",
    imdbRating: 9.2,
    streamingPlatforms: ["Pirata / Stremio"],
    cast: [
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
    ],
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
    genres: ["Comedia", "Drama", "Romance", "Música"],
    director: "Damien Chazelle",
    directorImage: "https://image.tmdb.org/t/p/w185/chazelle.jpg",
    imdbRating: 8.0,
    streamingPlatforms: ["Prime Video"],
    cast: [
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
    ],
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
    genres: ["Acción", "Crimen", "Drama"],
    director: "Christopher Nolan",
    directorImage: "https://image.tmdb.org/t/p/w185/nolan.jpg",
    imdbRating: 9.0,
    streamingPlatforms: ["Netflix", "HBO Max", "Prime Video"],
    cast: [
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
    ],
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
    genres: ["Acción", "Ciencia ficción"],
    director: "Lilly Wachowski, Lana Wachowski",
    directorImage: "",
    imdbRating: 8.7,
    streamingPlatforms: ["Prime Video", "HBO Max"],
    cast: [
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
    ],
    userMovie: {
      status: "WATCHLIST",
      platform: "HBO Max",
    },
  },
  // Películas listas para "Continuar Explorando" (sin userMovie)
  {
    tmdbId: 27205,
    imdbId: "tt1375666",
    title: "Origen (Inception)",
    originalTitle: "Inception",
    year: 2010,
    posterPath:
      "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    overview:
      "Dom Cobb es un ladrón experto en el peligroso arte de la extracción: robar secretos del subconsciente durante el sueño.",
    runtime: 148,
    genres: ["Acción", "Ciencia ficción", "Aventura"],
    director: "Christopher Nolan",
    directorImage:
      "https://image.tmdb.org/t/p/w185/xuAIuYSmsUzKlUMBFGVZaWsY3Z5.jpg",
    imdbRating: 8.8,
    streamingPlatforms: ["HBO Max", "Movistar Plus+"],
    cast: [
      {
        name: "Leonardo DiCaprio",
        character: "Dom Cobb",
        profilePath:
          "https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg",
      },
      {
        name: "Joseph Gordon-Levitt",
        character: "Arthur",
        profilePath: "https://image.tmdb.org/t/p/w185/dhv9f3A2n41.jpg",
      },
    ],
  },
  {
    tmdbId: 98,
    imdbId: "tt0172495",
    title: "Gladiator",
    originalTitle: "Gladiator",
    year: 2000,
    posterPath:
      "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/hZkgoQYus5vegHoetLkCJzb17zJ.jpg",
    overview:
      "Un antiguo general romano busca vengarse del corrupto emperador que asesinó a su familia y lo condenó a la esclavitud.",
    runtime: 155,
    genres: ["Acción", "Drama", "Aventura"],
    director: "Ridley Scott",
    directorImage: "https://image.tmdb.org/t/p/w185/kzh1rU2D2.jpg",
    imdbRating: 8.5,
    streamingPlatforms: ["Prime Video", "Netflix"],
    cast: [
      {
        name: "Russell Crowe",
        character: "Maximus Decimus Meridius",
        profilePath: "https://image.tmdb.org/t/p/w185/crowe.jpg",
      },
      {
        name: "Joaquin Phoenix",
        character: "Commodus",
        profilePath: "https://image.tmdb.org/t/p/w185/phoenix.jpg",
      },
    ],
  },
  {
    tmdbId: 807,
    imdbId: "tt0114388",
    title: "Seven (Se7en)",
    originalTitle: "Se7en",
    year: 1995,
    posterPath:
      "https://image.tmdb.org/t/p/w500/6yoghtyTpznpBik8EngEmJskVUO.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/ba4CpFFZc5dC9Z983wKecx4k3xV.jpg",
    overview:
      "Dos detectives de homicidios van a la caza de un asesino en serie que justifica sus crímenes basándose en los siete pecados capitales.",
    runtime: 127,
    genres: ["Crimen", "Misterio", "Suspense"],
    director: "David Fincher",
    directorImage: "https://image.tmdb.org/t/p/w185/fincher.jpg",
    imdbRating: 8.6,
    streamingPlatforms: ["HBO Max"],
    cast: [
      {
        name: "Brad Pitt",
        character: "David Mills",
        profilePath: "https://image.tmdb.org/t/p/w185/pitt.jpg",
      },
      {
        name: "Morgan Freeman",
        character: "William Somerset",
        profilePath: "https://image.tmdb.org/t/p/w185/freeman.jpg",
      },
    ],
  },
  {
    tmdbId: 278,
    imdbId: "tt0111161",
    title: "Cadena perpetua",
    originalTitle: "The Shawshank Redemption",
    year: 1994,
    posterPath:
      "https://image.tmdb.org/t/p/w500/9cqNFs8svA79xfbtv92as9Lsdly.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    overview:
      "Acusado injustamente del asesinato de su esposa, el banquero Andy Dufresne comienza una nueva vida en la dura prisión de Shawshank.",
    runtime: 142,
    genres: ["Drama", "Crimen"],
    director: "Frank Darabont",
    directorImage: "https://image.tmdb.org/t/p/w185/darabont.jpg",
    imdbRating: 9.3,
    streamingPlatforms: ["HBO Max", "Movistar Plus+"],
    cast: [
      {
        name: "Tim Robbins",
        character: "Andy Dufresne",
        profilePath: "https://image.tmdb.org/t/p/w185/robbins.jpg",
      },
      {
        name: "Morgan Freeman",
        character: "Ellis Boyd 'Red' Redding",
        profilePath: "https://image.tmdb.org/t/p/w185/freeman.jpg",
      },
    ],
  },
  {
    tmdbId: 769,
    imdbId: "tt0099685",
    title: "Uno de los nuestros",
    originalTitle: "Goodfellas",
    year: 1990,
    posterPath:
      "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/sw7mordbZxgITU877yTpZCud90M.jpg",
    overview:
      "Henry Hill, hijo de padre irlandés y madre siciliana, vive fascinado por la vida que llevan los gángsters de su barrio en Brooklyn.",
    runtime: 145,
    genres: ["Drama", "Crimen"],
    director: "Martin Scorsese",
    directorImage: "https://image.tmdb.org/t/p/w185/scorsese.jpg",
    imdbRating: 8.7,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [
      {
        name: "Robert De Niro",
        character: "James Conway",
        profilePath: "https://image.tmdb.org/t/p/w185/deniro.jpg",
      },
      {
        name: "Ray Liotta",
        character: "Henry Hill",
        profilePath: "https://image.tmdb.org/t/p/w185/liotta.jpg",
      },
      {
        name: "Joe Pesci",
        character: "Tommy DeVito",
        profilePath: "https://image.tmdb.org/t/p/w185/pesci.jpg",
      },
    ],
  },
  {
    tmdbId: 274,
    imdbId: "tt0102926",
    title: "El silencio de los corderos",
    originalTitle: "The Silence of the Lambs",
    year: 1991,
    posterPath:
      "https://image.tmdb.org/t/p/w500/uS9m8OBk1A8eM9I042bx8XXUNAq.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/mfwq2nMBzArzQ7Y9R5KN8SVj69m.jpg",
    overview:
      "Una joven cadete del FBI debe confiar en un encarcelado y manipulador asesino caníbal para capturar a otro asesino en serie.",
    runtime: 118,
    genres: ["Crimen", "Drama", "Suspense"],
    director: "Jonathan Demme",
    directorImage: "https://image.tmdb.org/t/p/w185/demme.jpg",
    imdbRating: 8.6,
    streamingPlatforms: ["Prime Video"],
    cast: [
      {
        name: "Jodie Foster",
        character: "Clarice Starling",
        profilePath: "https://image.tmdb.org/t/p/w185/foster.jpg",
      },
      {
        name: "Anthony Hopkins",
        character: "Dr. Hannibal Lecter",
        profilePath: "https://image.tmdb.org/t/p/w185/hopkins.jpg",
      },
    ],
  },
  {
    tmdbId: 872585,
    imdbId: "tt15398776",
    title: "Oppenheimer",
    originalTitle: "Oppenheimer",
    year: 2023,
    posterPath:
      "https://image.tmdb.org/t/p/w500/ncKCQVXgk4BcY5xsSa1m829YvOP.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/fm6K9vYI02nG9LHaZCLMTe69pn0.jpg",
    overview:
      "La historia del físico teórico J. Robert Oppenheimer, su liderazgo en el Proyecto Manhattan y el desarrollo de la bomba atómica.",
    runtime: 180,
    genres: ["Drama", "Historia"],
    director: "Christopher Nolan",
    directorImage:
      "https://image.tmdb.org/t/p/w185/xuAIuYSmsUzKlUMBFGVZaWsY3Z5.jpg",
    imdbRating: 8.8,
    streamingPlatforms: ["SkyShowtime", "Movistar Plus+"],
    cast: [
      {
        name: "Cillian Murphy",
        character: "J. Robert Oppenheimer",
        profilePath: "https://image.tmdb.org/t/p/w185/murphy.jpg",
      },
      {
        name: "Emily Blunt",
        character: "Katherine Oppenheimer",
        profilePath: "https://image.tmdb.org/t/p/w185/blunt.jpg",
      },
      {
        name: "Robert Downey Jr.",
        character: "Lewis Strauss",
        profilePath: "https://image.tmdb.org/t/p/w185/downey.jpg",
      },
    ],
  },
  {
    tmdbId: 129,
    imdbId: "tt0245429",
    title: "El viaje de Chihiro",
    originalTitle: "Sen to Chihiro no kamikakushi",
    year: 2001,
    posterPath:
      "https://image.tmdb.org/t/p/w500/393rwsUqA07d8fVyfOovO7jWq22.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg",
    overview:
      "Chihiro, una niña de diez años, se adentra en un mundo mágico gobernado por dioses y brujas donde sus padres son transformados en cerdos.",
    runtime: 125,
    genres: ["Animación", "Familia", "Fantasía"],
    director: "Hayao Miyazaki",
    directorImage: "https://image.tmdb.org/t/p/w185/miyazaki.jpg",
    imdbRating: 8.6,
    streamingPlatforms: ["Netflix"],
    cast: [
      {
        name: "Rumi Hiiragi",
        character: "Chihiro Ogino (voz)",
        profilePath: "",
      },
      { name: "Miyu Irino", character: "Haku (voz)", profilePath: "" },
    ],
  },
  {
    tmdbId: 693134,
    imdbId: "tt15239678",
    title: "Dune: Parte Dos",
    originalTitle: "Dune: Part Two",
    year: 2024,
    posterPath:
      "https://image.tmdb.org/t/p/w500/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/xOMo8BRK7PfcJv9JCnx7s520bNe.jpg",
    overview:
      "Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia.",
    runtime: 166,
    genres: ["Ciencia ficción", "Aventura"],
    director: "Denis Villeneuve",
    directorImage: "https://image.tmdb.org/t/p/w185/villeneuve.jpg",
    imdbRating: 8.5,
    streamingPlatforms: ["HBO Max"],
    cast: [
      {
        name: "Timothée Chalamet",
        character: "Paul Atreides",
        profilePath: "https://image.tmdb.org/t/p/w185/chalamet.jpg",
      },
      {
        name: "Zendaya",
        character: "Chani",
        profilePath: "https://image.tmdb.org/t/p/w185/zendaya.jpg",
      },
    ],
  },
  {
    tmdbId: 569094,
    imdbId: "tt9362722",
    title: "Spider-Man: Cruzando el Multiverso",
    originalTitle: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    posterPath:
      "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg",
    overview:
      "Miles Morales es catapultado a través del Multiverso, donde se encuentra con un equipo de Spider-Gente encargado de proteger su propia existencia.",
    runtime: 140,
    genres: ["Animación", "Acción", "Aventura"],
    director: "Joaquim Dos Santos, Kemp Powers",
    directorImage: "",
    imdbRating: 8.6,
    streamingPlatforms: ["Movistar Plus+", "Prime Video"],
    cast: [
      {
        name: "Shameik Moore",
        character: "Miles Morales (voz)",
        profilePath: "",
      },
      {
        name: "Hailee Steinfeld",
        character: "Gwen Stacy (voz)",
        profilePath: "",
      },
    ],
  },
  {
    tmdbId: 28,
    imdbId: "tt0078788",
    title: "Apocalypse Now",
    originalTitle: "Apocalypse Now",
    year: 1979,
    posterPath:
      "https://image.tmdb.org/t/p/w500/gQB8Y5RCMkv2zwzFHbUJX3kAhvA.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/iBmsZ7e69K6x9kL4r9iZgqF8QpA.jpg",
    overview:
      "Durante la guerra de Vietnam, el capitán Willard es enviado en una peligrosa misión por el río hasta Camboya para eliminar a un coronel rebelde.",
    runtime: 147,
    genres: ["Drama", "Guerra"],
    director: "Francis Ford Coppola",
    directorImage: "https://image.tmdb.org/t/p/w185/coppola.jpg",
    imdbRating: 8.4,
    streamingPlatforms: ["Filmin", "Movistar Plus+"],
    cast: [
      { name: "Martin Sheen", character: "Capitán Willard", profilePath: "" },
      { name: "Marlon Brando", character: "Coronel Kurtz", profilePath: "" },
    ],
  },
  {
    tmdbId: 120467,
    imdbId: "tt2278388",
    title: "El Gran Hotel Budapest",
    originalTitle: "The Grand Budapest Hotel",
    year: 2014,
    posterPath:
      "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWX9ne3rNfg.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/71R375zT36l1w9M6k7oH8uP2Gsm.jpg",
    overview:
      "Las aventuras de Gustave H, un legendario conserje de un famoso hotel europeo de entreguerras, y Zero Moustafa, el botones que se convierte en su amigo de confianza.",
    runtime: 100,
    genres: ["Comedia", "Aventura"],
    director: "Wes Anderson",
    directorImage: "https://image.tmdb.org/t/p/w185/anderson.jpg",
    imdbRating: 8.1,
    streamingPlatforms: ["Disney+"],
    cast: [
      { name: "Ralph Fiennes", character: "M. Gustave", profilePath: "" },
      { name: "Tony Revolori", character: "Zero Moustafa", profilePath: "" },
    ],
  },
];
