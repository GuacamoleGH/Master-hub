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
    title: "Origen",
    originalTitle: "Inception",
    year: 2010,
    posterPath:
      "https://image.tmdb.org/t/p/w500/tXQvtRWfkUUnWJAn2tN3jERIUG.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    overview:
      "Dom Cobb es un ladrón hábil, el mejor de todos, especializado en el peligroso arte de extracción: el robo de secretos valiosos desde las profundidades del subconsciente durante el estado de sueño cuando la mente está más vulnerable. Esta habilidad excepcional de Cobb le ha hecho un jugador codiciado en el traicionero nuevo mundo de espionaje corporativo, pero al mismo tiempo, le ha convertido en un fugitivo internacional y ha tenido que sacrificar todo que le importaba. Ahora a Cobb se le ofrece una oportunidad para redimirse. Con un último trabajo podría recuperar su vida anterior, pero solamente si logra lo imposible.",
    runtime: 148,
    genres: ["Acción", "Ciencia ficción", "Aventura"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.4,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 98,
    imdbId: "tt0172495",
    title: "Gladiator",
    originalTitle: "Gladiator",
    year: 2000,
    posterPath:
      "https://image.tmdb.org/t/p/w500/90QFOG5zSN4cbrIVs4DL4ePAuA5.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/jhk6D8pim3yaByu1801kMoxXFaX.jpg",
    overview:
      "En el año 180, el Imperio Romano domina todo el mundo conocido. Tras una gran victoria sobre los bárbaros del norte, el anciano emperador Marco Aurelio decide transferir el poder a Máximo, bravo general de sus ejércitos y hombre de inquebrantable lealtad al imperio. Pero su hijo Cómodo, que aspiraba al trono, no lo acepta y trata de asesinar a Máximo.",
    runtime: 155,
    genres: ["Acción", "Drama", "Aventura"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.2,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 807,
    imdbId: "tt0114369",
    title: "Seven",
    originalTitle: "Se7en",
    year: 1995,
    posterPath:
      "https://image.tmdb.org/t/p/w500/uVPcVz4b2hnSGrXYLdIGRXwcivs.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/i5H7zusQGsysGQ8i6P361Vnr0n2.jpg",
    overview:
      "El teniente Somerset, del departamento de homicidios, está a punto de jubilarse y ser reemplazado por el ambicioso y brillante detective David Mills. Ambos tendrán que colaborar en la resolución de una serie de asesinatos cometidos por un psicópata que toma como base la relación de los siete pecados capitales: gula, pereza, soberbia, avaricia, envidia, lujuria e ira. Los cuerpos de las víctimas, sobre los que el asesino se ensaña de manera impúdica, se convertirán para los policías en un enigma que les obligará a viajar al horror y la barbarie más absoluta.",
    runtime: 127,
    genres: ["Crimen", "Misterio", "Suspense"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.4,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 278,
    imdbId: "tt0111161",
    title: "Cadena perpetua",
    originalTitle: "The Shawshank Redemption",
    year: 1994,
    posterPath:
      "https://image.tmdb.org/t/p/w500/uRRTV7p6l2ivtODWJVVAMRrwTn2.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/pNjh59JSxChQktamG3LMp9ZoQzp.jpg",
    overview:
      "Acusado del asesinato de su mujer, Andrew Dufresne, tras ser condenado a cadena perpetua, es enviado a la prisión de Shawshank. Con el paso de los años conseguirá ganarse la confianza del director del centro y el respeto de sus compañeros presidiarios, especialmente de Red, el jefe de la mafia de los sobornos.",
    runtime: 143,
    genres: ["Drama", "Crimen"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.7,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 769,
    imdbId: "tt0099685",
    title: "Uno de los nuestros",
    originalTitle: "GoodFellas",
    year: 1990,
    posterPath:
      "https://image.tmdb.org/t/p/w500/3Yy0zBO9AlyAZH1cTI8Ko2ouCi.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/gILte6Zd7m1YneIr6MVhh30S9pr.jpg",
    overview:
      "Henry, un niño de trece años de Brooklyn, vive fascinado con el mundo de los gángsters. Su sueño se hace realidad cuando entra a formar parte de la familia Pauline, dueña absoluta de la zona, que lo educan como un miembro más de la banda convirtiéndole en un destacado mafioso.",
    runtime: 146,
    genres: ["Drama", "Crimen"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.5,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 274,
    imdbId: "tt0102926",
    title: "El silencio de los corderos",
    originalTitle: "The Silence of the Lambs",
    year: 1991,
    posterPath:
      "https://image.tmdb.org/t/p/w500/8FdQQ3cUCs9goEOr1qUFaHackoJ.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/aYcnDyLMnpKce1FOYUpZrXtgUye.jpg",
    overview:
      "Clarice Starling, del FBI, se aventura a una prisión de máxima seguridad para analizar el cerebro enfermo de Hannibal Lecter, un psiquiatra convertido en caníbal.",
    runtime: 118,
    genres: ["Crimen", "Suspense", "Drama"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.3,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 872585,
    imdbId: "tt15398776",
    title: "Oppenheimer",
    originalTitle: "Oppenheimer",
    year: 2023,
    posterPath:
      "https://image.tmdb.org/t/p/w500/mJRUREPjTqqMEKwEiM2sdmIGngz.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg",
    overview:
      "Película sobre el físico J. Robert Oppenheimer y su papel como desarrollador de la bomba atómica. Basada en el libro 'American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer' de Kai Bird y Martin J. Sherwin.",
    runtime: 181,
    genres: ["Drama", "Historia"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 129,
    imdbId: "tt0245429",
    title: "El viaje de Chihiro",
    originalTitle: "千と千尋の神隠し",
    year: 2001,
    posterPath:
      "https://image.tmdb.org/t/p/w500/2RcxjDykOssx4SfqshewyI9vfSl.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/dyJvKsNs2KP8qQnAXbRwDjblViy.jpg",
    overview:
      "Durante el traslado de su familia a los suburbios, una niña de 10 años de edad deambula por un mundo gobernado por dioses, brujas y espíritus, y donde los humanos se convierten en bestias.",
    runtime: 122,
    genres: ["Animación", "Familia", "Fantasía"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.5,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 693134,
    imdbId: "tt15239678",
    title: "Dune: Parte dos",
    originalTitle: "Dune: Part Two",
    year: 2024,
    posterPath:
      "https://image.tmdb.org/t/p/w500/xCHmhHeO7aOCMlzcNukGH6Q7EiD.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
    overview:
      "Sigue el viaje mítico de Paul Atreides mientras se une a Chani y los Fremen en una guerra de venganza contra los conspiradores que destruyeron a su familia. Al enfrentarse a una elección entre el amor de su vida y el destino del universo conocido, Paul se esfuerza por evitar un futuro terrible que solo él puede prever.",
    runtime: 167,
    genres: ["Ciencia ficción", "Aventura"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.1,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 569094,
    imdbId: "tt9362722",
    title: "Spider-Man: Cruzando el Multiverso",
    originalTitle: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    posterPath:
      "https://image.tmdb.org/t/p/w500/37WcNMgNOMxdhT87MFl7tq7FM1.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg",
    overview:
      "Tras reencontrarse con Gwen Stacy, el amigable vecindario de Spider-Man de Brooklyn al completo es catapultado a través del Multiverso, donde se encuentra con un equipo de Spidermans encargados de proteger su propia existencia. Pero cuando los héroes se enfrentan sobre cómo manejar una nueva amenaza, Miles se encuentra enfrentado a las otras Arañas y debe redefinir lo que significa ser un héroe para poder salvar a la gente que más quiere.",
    runtime: 140,
    genres: ["Animación", "Acción", "Aventura", "Ciencia ficción"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.3,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 28,
    imdbId: "tt0078788",
    title: "Apocalypse Now",
    originalTitle: "Apocalypse Now",
    year: 1979,
    posterPath:
      "https://image.tmdb.org/t/p/w500/zJXRrkJTlcb5x87v4VWN1zZX0Xk.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/49fzLedFVKgGgFChLMuulDJBY1c.jpg",
    overview:
      "Durante la guerra de Vietnam, al joven Capitán Willard, un oficial de los servicios de inteligencia del ejército estadounidense, se le ha encomendado entrar en Camboya con la peligrosa misión de eliminar a Kurtz, un coronel renegado que se ha vuelto loco. El capitán deberá ir navegar por el río hasta el corazón de la selva, donde parece ser que Kurtz reina como un buda despótico sobre los miembros de la tribu Montagnard, que le adoran como a un dios.",
    runtime: 147,
    genres: ["Drama", "Bélica"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.3,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 120467,
    imdbId: "tt2278388",
    title: "El gran hotel Budapest",
    originalTitle: "The Grand Budapest Hotel",
    year: 2014,
    posterPath:
      "https://image.tmdb.org/t/p/w500/1wk0vpNCX5T40KsGQKjfoDAhmJw.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/9udCLTxTFl28RxnK8Q05E154ZGa.jpg",
    overview:
      "El Sr. Gustave H., un legendario conserje de un famoso hotel europeo de entreguerras, entabla amistad con Zero Moustafa, un joven empleado al que convierte en su protegido. La historia trata sobre el robo y la recuperación de una pintura renacentista de valor incalculable y sobre la batalla que enfrenta a los miembros de una familia por una inmensa fortuna. Como telón de fondo, los levantamientos que transformaron Europa durante la primera mitad del siglo XX.",
    runtime: 99,
    genres: ["Comedia", "Drama"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 122,
    imdbId: "tt0167260",
    title: "El señor de los anillos: El retorno del rey",
    originalTitle: "The Lord of the Rings: The Return of the King",
    year: 2003,
    posterPath:
      "https://image.tmdb.org/t/p/w500/mWuFbQrXyLk2kMBKF9TUPtDwuPx.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/ctiw6FZK4N36LmkjSklWEbuvlq9.jpg",
    overview:
      "Las fuerzas de Saruman han sido destruidas, y su fortaleza sitiada. Ha llegado el momento de que se decida el destino de la Tierra Media, y por primera vez en mucho tiempo, parece que hay una pequeña esperanza. La atención del señor oscuro Sauron se centra ahora en Gondor, el último reducto de los hombres, y del cual Aragorn tendrá que reclamar el trono para ocupar su puesto de rey. Pero las fuerzas de Sauron ya se preparan para lanzar el último y definitivo ataque contra el reino de Gondor, la batalla que decidirá el destino de todos. Mientras tanto, Frodo y Sam continuan su camino hacia Mordor, a la espera de que Sauron no repare en que dos pequeños Hobbits se acercan cada día más al final de su camino, el Monte del Destino.",
    runtime: 202,
    genres: ["Aventura", "Fantasía", "Acción"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.5,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 120,
    imdbId: "tt0120737",
    title: "El señor de los anillos: La comunidad del anillo",
    originalTitle: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    posterPath:
      "https://image.tmdb.org/t/p/w500/9xtH1RmAzQ0rrMBNUMXstb2s3er.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/oiwc338EoBgS4sEI2ixAny4KQKg.jpg",
    overview:
      "En la Tierra Media, el Señor Oscuro Saurón creó los Grandes Anillos de Poder, forjados por los herreros Elfos. Tres para los reyes Elfos, siete para los Señores Enanos, y nueve para los Hombres Mortales. Secretamente, Saurón también forjó un anillo maestro, el Anillo Único, que contiene en sí el poder para esclavizar a toda la Tierra Media. Con la ayuda de un grupo de amigos y de valientes aliados, Frodo emprende un peligroso viaje con la misión de destruir el Anillo Único. Pero el Señor Oscuro Sauron, quien creara el Anillo, envía a sus servidores para perseguir al grupo. Si Sauron lograra recuperar el Anillo, sería el final de la Tierra Media.",
    runtime: 179,
    genres: ["Aventura", "Fantasía", "Acción"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.4,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 121,
    imdbId: "tt0167261",
    title: "El señor de los anillos: Las dos torres",
    originalTitle: "The Lord of the Rings: The Two Towers",
    year: 2002,
    posterPath:
      "https://image.tmdb.org/t/p/w500/up6gIHZlfEQZkHIfQwcOOaGOzOt.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/6G73mNyooWAEQTpckPSnFxFoNmc.jpg",
    overview:
      "La Compañía del Anillo se ha disuelto. El portador del anillo Frodo y su fiel amigo Sam se dirigen hacia Mordor para destruir el Anillo Único y acabar con el poder de Sauron. Mientras, y tras la dura batalla contra los orcos donde cayó Boromir, el hombre Aragorn, el elfo Legolas y el enano Gimli intentan rescatar a los medianos Merry y Pipin, secuestrados por los ogros de Mordor. Por su parte, Saurón y el traidor Sarumán continúan con sus planes en Mordor, en espera de la guerra contra las razas libres de la Tierra Media.",
    runtime: 180,
    genres: ["Aventura", "Fantasía", "Acción"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.4,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 424,
    imdbId: "tt0108052",
    title: "La lista de Schindler",
    originalTitle: "Schindler's List",
    year: 1993,
    posterPath:
      "https://image.tmdb.org/t/p/w500/3Ho0pXsnMxpGJWqdOi0KDNdaTkT.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
    overview:
      "Oskar Schindler, un hombre de enorme astucia y talento para las relaciones públicas, organiza un ambicioso plan para ganarse la simpatía de los nazis. Después de la invasión de Polonia por los alemanes, consigue, gracias a sus relaciones con los nazis, la propiedad de una fábrica de Cracovia. Allí emplea a cientos de operarios judíos, cuya explotación le hace prosperar rápidamente. Su gerente, también judío, es el verdadero director en la sombra, pues Schindler no tiene el menor conocimiento industrial.",
    runtime: 195,
    genres: ["Drama", "Historia", "Bélica"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.6,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 13,
    imdbId: "tt0109830",
    title: "Forrest Gump",
    originalTitle: "Forrest Gump",
    year: 1994,
    posterPath:
      "https://image.tmdb.org/t/p/w500/azV6hV99lYkdhydsQbJCI6FqMl4.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/66Kn4XWhkuPkJxOJyPEx4U2CUfN.jpg",
    overview:
      "Forrest Gump es un chico con deficiencias mentales no muy profundas y con alguna incapacidad motora que, a pesar de todo, llegará a convertirse, entre otras cosas, en un héroe durante la Guerra del Vietnam. Su persistencia y bondad le llevarán a conseguir una gran fortuna, ser objeto del clamor popular y a codearse con las más altas esferas sociales y políticas del país. Siempre sin olvidar a Jenny, su gran amor desde que era niño.",
    runtime: 142,
    genres: ["Comedia", "Drama", "Romance"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.5,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 637,
    imdbId: "tt0118799",
    title: "La vida es bella",
    originalTitle: "La vita è bella",
    year: 1997,
    posterPath:
      "https://image.tmdb.org/t/p/w500/aZ7MFlKPfB02Lr9NwZQ4vsYRgcy.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/6aNKD81RHR1DqUUa8kOZ1TBY1Lp.jpg",
    overview:
      "En 1939, a punto de estallar la Segunda Guerra Mundial (1939-1945), el extravagante Guido llega a Arezzo, en la Toscana, con la intención de abrir una librería. Allí conoce a la encantadora Dora y, a pesar de que es la prometida del fascista Rodolfo, se casa con ella y tiene un hijo. Al estallar la guerra, los tres son internados en un campo de exterminio, donde Guido hará lo imposible para hacer creer a su hijo que la terrible situación que están padeciendo es tan sólo un juego.",
    runtime: 117,
    genres: ["Comedia", "Drama"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.4,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 240,
    imdbId: "tt0071562",
    title: "El padrino II",
    originalTitle: "The Godfather Part II",
    year: 1974,
    posterPath:
      "https://image.tmdb.org/t/p/w500/mbry0W5PRylSUHsYzdiY2FSJwze.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/pGzqRKrYeK4LogoysNro0vG8d8N.jpg",
    overview:
      "Continuación de la saga de los Corleone con dos historias paralelas: la elección de Michael Corleone como jefe de los negocios familiares y los orígenes del patriarca, el ya fallecido Don Vito, primero en Sicilia y luego en Estados Unidos, donde, empezando desde abajo, llegó a ser un poderosísimo jefe de la mafia de Nueva York.",
    runtime: 200,
    genres: ["Drama", "Crimen"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.6,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 389,
    imdbId: "tt0050083",
    title: "Doce hombres sin piedad",
    originalTitle: "12 Angry Men",
    year: 1957,
    posterPath:
      "https://image.tmdb.org/t/p/w500/t88XfoxO5cX3f0qaSxWsBS0Lc3.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
    overview:
      "Tras escuchar todos los testimonios y valorar las pruebas presentadas, un jurado popular compuesto por doce hombres tiene que decidir, por unanimidad, si absuelve o condena a muerte a un joven acusado de haber matado a su padre. Al principio, once están completamente convencidos de su culpabilidad y se inclinan por la condena, pero el que discrepa empieza a plantear dudas razonables que, poco a poco, van resquebrajando la inicial seguridad de los demás.",
    runtime: 92,
    genres: ["Drama"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.6,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 105,
    imdbId: "tt0088763",
    title: "Regreso al futuro",
    originalTitle: "Back to the Future",
    year: 1985,
    posterPath:
      "https://image.tmdb.org/t/p/w500/owk40tn1sFJmC7bhamEpmhdZPKa.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/5bzPWQ2dFUl2aZKkp7ILJVVkRed.jpg",
    overview:
      "El adolescente Marty McFly es amigo de Doc, un científico al que todos toman por loco. Cuando Doc crea una máquina para viajar en el tiempo, un error fortuito hace que Marty llegue a 1955, año en el que sus futuros padres aún no se habían conocido. Después de impedir su primer encuentro, deberá conseguir que se conozcan y se casen; de lo contrario, su existencia no sería posible.",
    runtime: 116,
    genres: ["Aventura", "Comedia", "Ciencia ficción"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.3,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 19995,
    imdbId: "tt0499549",
    title: "Avatar",
    originalTitle: "Avatar",
    year: 2009,
    posterPath:
      "https://image.tmdb.org/t/p/w500/t5T3LPbLLgP2OP6kloM9p2PXpJL.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg",
    overview:
      "Año 2154. Jake Sully, un exmarine en silla de ruedas, es enviado al planeta Pandora, donde se ha creado el programa Avatar, gracias al cual los seres humanos pueden controlar de forma remota un cuerpo biológico con apariencia y genética de la especie nativa. Pronto se encontrará con la encrucijada entre seguir las órdenes de sus superiores o defender al mundo que le ha acogido y siente como suyo.",
    runtime: 161,
    genres: ["Ciencia ficción", "Acción", "Aventura"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 7.6,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 8587,
    imdbId: "tt0110357",
    title: "El rey león",
    originalTitle: "The Lion King",
    year: 1994,
    posterPath:
      "https://image.tmdb.org/t/p/w500/b0MxU37dNmMwKtoPVYPKOZSIrIn.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/q00H8EqULYSK74lgevMkhmGGLHn.jpg",
    overview:
      "La sabana africana es el escenario en el que tienen lugar las aventuras de Simba, un pequeño león que es el heredero del trono. Sin embargo, se ve forzado a exiliarse al ser injustamente acusado de la muerte de su padre. Durante su destierro, hará buenas amistades y, finalmente, regresará para recuperar lo que legítimamente le corresponde.",
    runtime: 85,
    genres: ["Animación", "Familia", "Drama"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.3,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 597,
    imdbId: "tt0120338",
    title: "Titanic",
    originalTitle: "Titanic",
    year: 1997,
    posterPath:
      "https://image.tmdb.org/t/p/w500/rBTJZrf5UWaxzg5YJd2eqpeaSvm.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/xnHVX37XZEp33hhCbYlQFq7ux1J.jpg",
    overview:
      "Jack, un joven artista, gana en una partida de cartas un pasaje para viajar a América en el Titanic, el transatlántico más grande y seguro jamás construido. A bordo conoce a Rose, una joven de una buena familia venida a menos que va a contraer un matrimonio de conveniencia con Cal, un millonario engreído a quien sólo interesa el prestigioso apellido de su prometida. Jack y Rose se enamoran, pero el prometido y la madre de ella ponen todo tipo de trabas a su relación. Mientras, el gigantesco y lujoso transatlántico se aproxima hacia un inmenso iceberg.",
    runtime: 194,
    genres: ["Drama", "Romance"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 7.9,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 37799,
    imdbId: "tt1285016",
    title: "La red social",
    originalTitle: "The Social Network",
    year: 2010,
    posterPath:
      "https://image.tmdb.org/t/p/w500/2GtDmIdxkJ5NZG97yhJQtM8Wn1H.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/1PXwh3nJzgRkkYnqfWInJNypeL4.jpg",
    overview:
      "Mark Zuckerberg, alumno de Harvard y genio de la programación, se sienta a su ordenador y con empeño y entusiasmo comienza a desarrollar una nueva idea. En un furor de blogging y programación, lo que comenzó en la habitación de su colegio mayor pronto se convirtió en una red social global y una revolución en la comunicación. Seis años y 500 millones de amigos después, Mark Zuckerberg es el billonario más joven de la historia. Pero para este emprendedor, el éxito ha supuesto complicaciones personales y legales...",
    runtime: 120,
    genres: ["Drama"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 7.4,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
  {
    tmdbId: 77,
    imdbId: "tt0209144",
    title: "Memento",
    originalTitle: "Memento",
    year: 2000,
    posterPath:
      "https://image.tmdb.org/t/p/w500/fKTPH2WvH8nHTXeBYBVhawtRqtR.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/7Wev9JMo6R5XAfz2KDvXb7oPMmy.jpg",
    overview:
      "Leonard Shelby sigue la pista del hombre que violó y asesinó a su mujer. Sin embargo, la dificultad de localizar al asesino de su esposa se ve agravada por el hecho de que padece una forma rara e intratable de pérdida de memoria a corto plazo. Aunque puede recordar detalles de la vida antes de su accidente, Leonard no puede recordar qué ha pasado hace quince minutos, adónde va o por qué.",
    runtime: 113,
    genres: ["Misterio", "Suspense"],
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.2,
    streamingPlatforms: ["HBO Max", "Prime Video"],
    cast: [],
  },
];

export interface SeedSeries {
  tmdbId: number;
  imdbId?: string | null;
  name: string;
  originalName?: string | null;
  firstAirYear?: number | null;
  lastAirYear?: number | null;
  numberOfSeasons?: number | null;
  numberOfEpisodes?: number | null;
  seriesStatus?: string | null;
  posterPath?: string | null;
  backdropPath?: string | null;
  overview?: string | null;
  genres: string[];
  creator?: string | null;
  creatorImage?: string | null;
  imdbRating?: number | null;
  streamingPlatforms?: string[];
  cast: {
    name: string;
    character: string;
    profilePath?: string | null;
  }[];
}

export const CURATED_SERIES: SeedSeries[] = [
  {
    tmdbId: 1396,
    imdbId: "tt0903747",
    name: "Breaking Bad",
    originalName: "Breaking Bad",
    firstAirYear: 2008,
    lastAirYear: 2013,
    numberOfSeasons: 5,
    numberOfEpisodes: 62,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/anFx9aTOOYqgS3v7x3R84Kz67ly.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/tsRy63Mu5cu8etL1X7ZLyf7UP1M.jpg",
    overview:
      "Un profesor de química con cáncer terminal se asocia con un exalumno suyo para fabricar y vender metanfetamina a fin de que su familia no pase apuros económicos.",
    genres: ["Drama", "Crimen"],
    creator: "Vince Gilligan",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/wJIxATESjzsjSgvRhVavOmdamXc.jpg",
    imdbRating: 9,
    cast: [
      {
        name: "Bryan Cranston",
        character: "Walter White",
        profilePath:
          "https://image.tmdb.org/t/p/w185/npIIZJGSrcJIJ6yHdmbqO6Jzo5I.jpg",
      },
      {
        name: "Aaron Paul",
        character: "Jesse Pinkman",
        profilePath:
          "https://image.tmdb.org/t/p/w185/8Ac9uuoYwZoYVAIJfRLzzLsGGJn.jpg",
      },
      {
        name: "Anna Gunn",
        character: "Skyler White",
        profilePath:
          "https://image.tmdb.org/t/p/w185/adppyeu1a4REN3khtgmXusrapFi.jpg",
      },
      {
        name: "RJ Mitte",
        character: "Walter White Jr.",
        profilePath:
          "https://image.tmdb.org/t/p/w185/sNPA92ZrssYhlaB1UA2pWcLD9db.jpg",
      },
      {
        name: "Dean Norris",
        character: "Hank Schrader",
        profilePath:
          "https://image.tmdb.org/t/p/w185/mKRrEbsxAX3ro700HsViFArRM7l.jpg",
      },
      {
        name: "Betsy Brandt",
        character: "Marie Schrader",
        profilePath:
          "https://image.tmdb.org/t/p/w185/xAnuzyjdMbQq9L1c4JNwXL52Wm4.jpg",
      },
      {
        name: "Bob Odenkirk",
        character: "Saul Goodman",
        profilePath:
          "https://image.tmdb.org/t/p/w185/rF0Lb6SBhGSTvjRffmlKRSeI3jE.jpg",
      },
      {
        name: "Jonathan Banks",
        character: "Mike Ehrmantraut",
        profilePath:
          "https://image.tmdb.org/t/p/w185/bswk26L13PvY4iMTwUTAsepXCLv.jpg",
      },
    ],
  },
  {
    tmdbId: 87108,
    imdbId: "tt7366338",
    name: "Chernobyl",
    originalName: "Chernobyl",
    firstAirYear: 2019,
    lastAirYear: 2019,
    numberOfSeasons: 1,
    numberOfEpisodes: 5,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/3URK0z9PzpVNJrGE7XOuyy6KFzk.jpg",
    overview:
      "En Abril de 1986, la Central Nuclear de Chernóbil en Ucrania (en aquel entonces, la Unión Soviética), sufrió una explosión masiva que liberó material radioactivo en Bielorrusia, Rusia, Ucrania, así como en zonas de Escandinavia y Europa Central. La serie relata lo que aconteció en 1986, en uno de los mayores desastres provocados por el hombre en la historia reciente, así como los sacrificios realizados para salvar al continente de un desastre sin precedentes.",
    genres: ["Drama"],
    creator: "Craig Mazin",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/uEhna6qcMuyU5TP7irpTUZ2ZsZc.jpg",
    imdbRating: 8.7,
    cast: [
      {
        name: "Jared Harris",
        character: "Valery Legasov",
        profilePath:
          "https://image.tmdb.org/t/p/w185/jAyPWkmge3BqXtgxIG9MfXBzOGj.jpg",
      },
      {
        name: "Stellan Skarsgård",
        character: "Boris Shcherbina",
        profilePath:
          "https://image.tmdb.org/t/p/w185/mW7xmtGV4y79kQGn0zkKVGDMAmw.jpg",
      },
      {
        name: "Emily Watson",
        character: "Ulana Khomyuk",
        profilePath:
          "https://image.tmdb.org/t/p/w185/bd0qiJXHoLNpkCqABsh67AKRtjC.jpg",
      },
      {
        name: "Paul Ritter",
        character: "Anatoly Dyatlov",
        profilePath:
          "https://image.tmdb.org/t/p/w185/hYRSjC5vxrIFZ5sx1rM6V4ZEI8G.jpg",
      },
      {
        name: "Jessie Buckley",
        character: "Lyudmilla Ignatenko",
        profilePath:
          "https://image.tmdb.org/t/p/w185/qbz9175DERSqsCQeYWGJWwqb38z.jpg",
      },
      {
        name: "Adam Nagaitis",
        character: "Vasily Ignatenko",
        profilePath:
          "https://image.tmdb.org/t/p/w185/e05YxtScfLCI723ZFU6WOzLiJ6u.jpg",
      },
      {
        name: "Sam Troughton",
        character: "Alexandr Akimov",
        profilePath:
          "https://image.tmdb.org/t/p/w185/daT0NIIeYxCsxjJ0200wAfJGfEE.jpg",
      },
      {
        name: "Robert Emms",
        character: "Leonid Toptunov",
        profilePath:
          "https://image.tmdb.org/t/p/w185/yqXBUz5WMcuicfyp6GlKSLBdBJH.jpg",
      },
      {
        name: "Con O'Neill",
        character: "Viktor Bryukhanov",
        profilePath:
          "https://image.tmdb.org/t/p/w185/7Fnj1dB9kStTuy29eEVK4IuOxWO.jpg",
      },
      {
        name: "Adrian Rawlins",
        character: "Nikolai Fomin",
        profilePath:
          "https://image.tmdb.org/t/p/w185/G0PGZqTjenuVTAQiib4ScU7vAI.jpg",
      },
      {
        name: "Alan Williams",
        character: "KGB Chairman Charkov",
        profilePath:
          "https://image.tmdb.org/t/p/w185/hvfjcPUtKkbBewvJdJ6uGutwS51.jpg",
      },
      {
        name: "David Dencik",
        character: "Mikhail Gorbachev",
        profilePath:
          "https://image.tmdb.org/t/p/w185/2BPsGhw8lGhe6HNs1aLu4Q1XeVn.jpg",
      },
    ],
  },
  {
    tmdbId: 94605,
    imdbId: "tt11126994",
    name: "Arcane",
    originalName: "Arcane",
    firstAirYear: 2021,
    lastAirYear: 2024,
    numberOfSeasons: 2,
    numberOfEpisodes: 18,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/5cvnxEHT3e39DvT6ARw4GNCFrB0.jpg",
    overview:
      "Con las dispares ciudades de Piltover y Zaun como telón de fondo, dos hermanas luchan en bandos opuestos de una guerra entre tecnologías mágicas y creencias enfrentadas.",
    genres: ["Animación", "Action & Adventure", "Sci-Fi & Fantasy"],
    creator: "Christian Linke",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/u1uCJkmVSeLQC1CwSB7UzXAVbqO.jpg",
    imdbRating: 8.7,
    cast: [
      {
        name: "Hailee Steinfeld",
        character: "Vi (voice)",
        profilePath:
          "https://image.tmdb.org/t/p/w185/qDInsG0cxWNxS1X4t59TBZ5S6x5.jpg",
      },
      {
        name: "Ella Purnell",
        character: "Jinx (voice)",
        profilePath:
          "https://image.tmdb.org/t/p/w185/jqrYg35GHuMGwGqEVUthqTLQnay.jpg",
      },
    ],
  },
  {
    tmdbId: 2288,
    imdbId: "tt0455275",
    name: "Prison Break",
    originalName: "Prison Break",
    firstAirYear: 2005,
    lastAirYear: 2017,
    numberOfSeasons: 5,
    numberOfEpisodes: 88,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/oqy7vnLWIFwoKBimCQfJHoVRYTS.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/n3Brk7roueE9HOwVmYlJx5j462g.jpg",
    overview:
      "Michael Scofield (Wentworth Miller) es un hombre desesperado en un situación desesperada. Su hermano Lincoln Burrows (Dominic Purcell), condenado a la pena capital está a la espera de ser ejecutado. A pesar de todas las evidencias, Michael cree en su inocencia, por lo que decide robar un banco para dejarse atrapar y ser encarcelado en la misma prisión que su hermano. Su objetivo: escapar juntos.",
    genres: ["Action & Adventure", "Crimen", "Drama"],
    creator: "Paul T. Scheuring",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/2hNYumD0sMCDezKvTtDwginHP4L.jpg",
    imdbRating: 8.1,
    cast: [
      {
        name: "Wentworth Miller",
        character: "Michael Scofield",
        profilePath:
          "https://image.tmdb.org/t/p/w185/js09M98qo6rEyyIlTbRMI6XiZJH.jpg",
      },
      {
        name: "Dominic Purcell",
        character: "Lincoln Burrows",
        profilePath:
          "https://image.tmdb.org/t/p/w185/5GtHSYdnH7o2x5UIm09XqqLoJKO.jpg",
      },
      {
        name: "Sarah Wayne Callies",
        character: "Sara Tancredi",
        profilePath:
          "https://image.tmdb.org/t/p/w185/uBtFalxNR1O0eARg0lsyLXkoJNG.jpg",
      },
      {
        name: "Rockmond Dunbar",
        character: "Benjamin 'C-Note' Franklin",
        profilePath:
          "https://image.tmdb.org/t/p/w185/gim7zIrYkbKWsp2Kod7fp74fWyI.jpg",
      },
      {
        name: "Robert Knepper",
        character: "Theodore 'T-Bag' Bagwell",
        profilePath:
          "https://image.tmdb.org/t/p/w185/lRncjvgCIm1muIkK94zJSH2i3d6.jpg",
      },
      {
        name: "Inbar Lavi",
        character: "Sheba",
        profilePath:
          "https://image.tmdb.org/t/p/w185/rdcdfVavWaKc0UCCV9ufdQaLIpc.jpg",
      },
      {
        name: "Augustus Prew",
        character: "David 'Whip' Martin",
        profilePath:
          "https://image.tmdb.org/t/p/w185/37cPl9BaiCY24eMMMOxlZuTkGo7.jpg",
      },
      {
        name: "Mark Feuerstein",
        character: "Jacob Ness",
        profilePath:
          "https://image.tmdb.org/t/p/w185/1XsbDSx7hqhaY9Sjjx86iTp43S0.jpg",
      },
      {
        name: "Said Bey",
        character: "terrorist",
        profilePath:
          "https://image.tmdb.org/t/p/w185/fgYSU3ARAShZKXxygUVOomRJgnM.jpg",
      },
    ],
  },
  {
    tmdbId: 61923,
    imdbId: "tt2758770",
    name: "Star contra las fuerzas del mal",
    originalName: "Star vs. the Forces of Evil",
    firstAirYear: 2015,
    lastAirYear: 2019,
    numberOfSeasons: 4,
    numberOfEpisodes: 140,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/drnY78Uwi4nYw4jOEp067WRl4Lt.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/2UElp7Dkm3SiB9ZEdKEWNmAOijB.jpg",
    overview:
      "Sigue la historia de Star, una apasionada y genial princesa adolescente de otra dimensión. Después de recibir una Varita Mágica Real todopoderosa para su cumpleaños número 14, sus padres de la realeza la envían a vivir con la familia Díaz y su responsable hijo Marco en la Tierra, y ella lleva su estilo interdimensional único a su nuevo hogar.",
    genres: [
      "Action & Adventure",
      "Animación",
      "Comedia",
      "Sci-Fi & Fantasy",
      "Familia",
    ],
    creator: "Daron Nefcy",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/ottk9ThiEri5cb1dnWs4vPSZwhU.jpg",
    imdbRating: 8.4,
    cast: [
      {
        name: "Eden Sher",
        character: "Star Butterfly (voice)",
        profilePath:
          "https://image.tmdb.org/t/p/w185/880rB5Z89P7AhD6ThtOLOWgNM2H.jpg",
      },
      {
        name: "Adam McArthur",
        character: "Marco Diaz (voice)",
        profilePath:
          "https://image.tmdb.org/t/p/w185/dX9wqqiD3HPJdJZLa8h1hFRZDBf.jpg",
      },
      {
        name: "Alan Tudyk",
        character: "Ludo / King River Butterfly (voice)",
        profilePath:
          "https://image.tmdb.org/t/p/w185/jUuUbPuMGonFT5E2pcs4alfqaCN.jpg",
      },
    ],
  },
  {
    tmdbId: 76669,
    imdbId: "tt7134908",
    name: "Élite",
    originalName: "Élite",
    firstAirYear: 2018,
    lastAirYear: 2024,
    numberOfSeasons: 8,
    numberOfEpisodes: 64,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/c07WqB99Igco0rua794q9k9QJYm.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/1qOA3kMtQO8bjnW8M2smjA8tp10.jpg",
    overview:
      "Las Encinas, un exclusivo colegio privado al que la élite social del país envía a sus hijos. Pero en el centro son admitidos tres adolescentes de familias humildes después de que un terremoto destruyera el colegio público en el que estudiaban. El choque de clases genera diversos problemas que se agravan hasta que, de repente, se produce un asesinato.",
    genres: ["Crimen", "Misterio", "Drama"],
    creator: "Darío Madrona",
    creatorImage: null,
    imdbRating: 8,
    cast: [
      {
        name: "Omar Ayuso",
        character: "Omar Shanaa",
        profilePath:
          "https://image.tmdb.org/t/p/w185/c4bAqv3PoSVK4ov7cw076NNqg6f.jpg",
      },
      {
        name: "Valentina Zenere",
        character: "Isadora Artiñan",
        profilePath:
          "https://image.tmdb.org/t/p/w185/5EfGAj1nOocsFb8Ffst5Ik48Gye.jpg",
      },
      {
        name: "André Lamoglia",
        character: "Iván Carvalho",
        profilePath:
          "https://image.tmdb.org/t/p/w185/6kMkE1tPagXWRCQHAt2PYHyo6kD.jpg",
      },
      {
        name: "Carmen Arrufat",
        character: "Sara",
        profilePath:
          "https://image.tmdb.org/t/p/w185/9swPIqmwj4ao2l9Q5zrjZau1GFA.jpg",
      },
      {
        name: "Ander Puig",
        character: "Nico",
        profilePath:
          "https://image.tmdb.org/t/p/w185/4seAT5elw0hAbKIpCKlNwwfim38.jpg",
      },
      {
        name: "Nadia Al Saidi",
        character: "Sonia",
        profilePath:
          "https://image.tmdb.org/t/p/w185/nMCWCQOriQrlA0MCdS4TASwYUbM.jpg",
      },
      {
        name: "Fernando Lindez",
        character: "Joel",
        profilePath:
          "https://image.tmdb.org/t/p/w185/quHSt84xNfEqCk9v5fv3qVxlbaX.jpg",
      },
      {
        name: "Mirela Balić",
        character: "Chloe",
        profilePath:
          "https://image.tmdb.org/t/p/w185/xgGvzfTd7FThbehjCtGeSg4UTXP.jpg",
      },
      {
        name: "Gleb Abrosimov",
        character: "Eric",
        profilePath:
          "https://image.tmdb.org/t/p/w185/7FxcYwxyp5t5RfP0wuRXelhVcd5.jpg",
      },
      {
        name: "Iván Mendes",
        character: "Dalmar",
        profilePath:
          "https://image.tmdb.org/t/p/w185/6wnNzRIVchcd7WCrchDazEqHtoi.jpg",
      },
      {
        name: "Nuno Gallego",
        character: "Héctor",
        profilePath:
          "https://image.tmdb.org/t/p/w185/9yIFgpbIJPL0qvrgZi02H7Fuvz4.jpg",
      },
      {
        name: "Alejandro Albarracín",
        character: "Luis",
        profilePath:
          "https://image.tmdb.org/t/p/w185/34RnAj40ZvWAEHDCRXMmXnkUOJi.jpg",
      },
    ],
  },
  {
    tmdbId: 1398,
    imdbId: "tt0141842",
    name: "Los Soprano",
    originalName: "The Sopranos",
    firstAirYear: 1999,
    lastAirYear: 2007,
    numberOfSeasons: 6,
    numberOfEpisodes: 86,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/p7XPjx5jTFl32TGbbIW8exdY8QW.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/lNpkvX2s8LGB0mjGODMT4o6Up7j.jpg",
    overview:
      "Los Soprano (The Sopranos) es una serie de televisión estadounidense creada y producida por David Chase. La serie se estrenó en Estados Unidos el 10 de enero de 1999 por el canal de televisión por cable HBO, que la emitió ininterrumpidamente hasta su desenlace, el 10 de junio de 2007. La trama de la serie gira en torno al mafioso de Nueva Jersey Tony Soprano (James Gandolfini) y las dificultades que enfrenta tanto en su hogar como en la organización criminal que dirige. A su vez, la serie también se centra en la historia de los personajes cercanos a Tony, especialmente su esposa Carmela (Edie Falco) y su sobrino y protegido Christopher Moltisanti (Michael Imperioli).",
    genres: ["Crimen", "Drama"],
    creator: "David Chase",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/jv6o40ugYcutRRMYDVJxvaqQ9aj.jpg",
    imdbRating: 8.7,
    cast: [
      {
        name: "James Gandolfini",
        character: "Tony Soprano",
        profilePath:
          "https://image.tmdb.org/t/p/w185/vhtsFJZcfHdeDkFBoWMDzOS6xrP.jpg",
      },
      {
        name: "Edie Falco",
        character: "Carmela Soprano",
        profilePath:
          "https://image.tmdb.org/t/p/w185/jS2Hnr5OmntpX0J7EpH70zAG0mz.jpg",
      },
      {
        name: "Jamie-Lynn Sigler",
        character: "Meadow Soprano",
        profilePath:
          "https://image.tmdb.org/t/p/w185/Aur8H7qOzDUr9cRaqqOsCE5kLJp.jpg",
      },
      {
        name: "Robert Iler",
        character: "A.J. Soprano",
        profilePath:
          "https://image.tmdb.org/t/p/w185/vfTbVoV1Bp2fcDVHaGOIiQppk3J.jpg",
      },
      {
        name: "Lorraine Bracco",
        character: "Jennifer Melfi",
        profilePath:
          "https://image.tmdb.org/t/p/w185/tAtpCzN4sTOy1RHpMpJj52zTO4S.jpg",
      },
      {
        name: "Michael Imperioli",
        character: "Christopher Moltisanti",
        profilePath:
          "https://image.tmdb.org/t/p/w185/bCDwQGrecRujCibI8rvsxEc91We.jpg",
      },
      {
        name: "Steven Van Zandt",
        character: "Silvio Dante",
        profilePath:
          "https://image.tmdb.org/t/p/w185/okh4QNQrGG647y5HnGSXAFFoIlp.jpg",
      },
      {
        name: "Tony Sirico",
        character: "Paulie Gualtieri",
        profilePath:
          "https://image.tmdb.org/t/p/w185/6mbO6Ziu4p5wRdKrRfFmrw0xKC3.jpg",
      },
      {
        name: "Dominic Chianese",
        character: "Corrado 'Junior' Soprano",
        profilePath:
          "https://image.tmdb.org/t/p/w185/wJIybLAbVv6VEPFpZtpxRW26aq2.jpg",
      },
      {
        name: "Aida Turturro",
        character: "Janice Soprano",
        profilePath:
          "https://image.tmdb.org/t/p/w185/kEPpV3eHXOKXGWGtsxUUV6k1hai.jpg",
      },
      {
        name: "Steve Schirripa",
        character: "Bobby 'Bacala' Baccalieri",
        profilePath:
          "https://image.tmdb.org/t/p/w185/2Nd2Hd4zIBCv4ZoXFhSkrJCx6wB.jpg",
      },
    ],
  },
  {
    tmdbId: 1438,
    imdbId: "tt0306414",
    name: "Bajo escucha",
    originalName: "The Wire",
    firstAirYear: 2002,
    lastAirYear: 2008,
    numberOfSeasons: 5,
    numberOfEpisodes: 60,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/v5m7os416ER2a9dTE0M017KqRmZ.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/layPSOJGckJv3PXZDIVluMq69mn.jpg",
    overview:
      "David Simon, creador y coguionista de la miniserie de HBO tres veces ganadora del premio Emmy The Corner, este sencillo y extremadamente realista drama sigue una caótica y controvertida investigación de drogas y asesinatos en Baltimore que conllevará peligrosos pinchazos telefónicos y continua vigilancia. Mostrando ambas perspectivas, de la policía y de sus criminales, la serie captura un universo donde distinguir entre el bien y el mal, el delito y la condena, es siempre desafío.",
    genres: ["Crimen", "Drama"],
    creator: "David Simon",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/rby7VXKgmcQtkgTHCWW6dE3sWF4.jpg",
    imdbRating: 8.6,
    cast: [
      {
        name: "Dominic West",
        character: "Jimmy McNulty",
        profilePath:
          "https://image.tmdb.org/t/p/w185/6y2M3EWslBPwPlugEFg8XDHfSJ0.jpg",
      },
      {
        name: "Lance Reddick",
        character: "Cedric Daniels",
        profilePath:
          "https://image.tmdb.org/t/p/w185/22mVtEXZbpt0J7S0LhIhdkfRrZV.jpg",
      },
      {
        name: "Sonja Sohn",
        character: "Kima Greggs",
        profilePath:
          "https://image.tmdb.org/t/p/w185/8zjUsesMnQSOJtXmFl9O37ZYdQ5.jpg",
      },
      {
        name: "Wendell Pierce",
        character: "Bunk Moreland",
        profilePath:
          "https://image.tmdb.org/t/p/w185/r6yKahL6Z8l9aUX5qvWxTmWl8Nm.jpg",
      },
      {
        name: "Michael Kenneth Williams",
        character: "Omar Little",
        profilePath:
          "https://image.tmdb.org/t/p/w185/mafEXtGlT1qYjGmZtbjo7Ep5qK3.jpg",
      },
      {
        name: "Deirdre Lovejoy",
        character: "Rhonda Pearlman",
        profilePath:
          "https://image.tmdb.org/t/p/w185/8Iv7NcwLcxen5ql8PAkCy9VpsTf.jpg",
      },
      {
        name: "Andre Royo",
        character: "Bubbles",
        profilePath:
          "https://image.tmdb.org/t/p/w185/tJzftaUtVvZs2RkFt2iQlQ5QWEh.jpg",
      },
      {
        name: "John Doman",
        character: "William Rawls",
        profilePath:
          "https://image.tmdb.org/t/p/w185/2HQRXWb6QrUFHJtJrgY8zpLP8u8.jpg",
      },
      {
        name: "Clarke Peters",
        character: "Lester Freamon",
        profilePath:
          "https://image.tmdb.org/t/p/w185/ouDHDpocxXgXrosF3vShAEkOjHL.jpg",
      },
      {
        name: "Jamie Hector",
        character: "Marlo Stanfield",
        profilePath:
          "https://image.tmdb.org/t/p/w185/7vCzdjSRkYU3fIRJsnKdATh2nQF.jpg",
      },
      {
        name: "Aidan Gillen",
        character: "Tommy Carcetti",
        profilePath:
          "https://image.tmdb.org/t/p/w185/fWWRgyJEGjOPcx43CaFiUCWMBLo.jpg",
      },
      {
        name: "Seth Gilliam",
        character: "Ellis Carver",
        profilePath:
          "https://image.tmdb.org/t/p/w185/9CiWZNBysr4IiyERAYQFONqyTAQ.jpg",
      },
    ],
  },
  {
    tmdbId: 1399,
    imdbId: "tt0944947",
    name: "Juego de tronos",
    originalName: "Game of Thrones",
    firstAirYear: 2011,
    lastAirYear: 2019,
    numberOfSeasons: 8,
    numberOfEpisodes: 73,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/3hDtRuwTfQQYRst3kjhvp4Cogjw.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/2OMB0ynKlyIenMJWI2Dy9IWT4c.jpg",
    overview:
      "En una tierra donde los veranos duran décadas y los inviernos pueden durar toda una vida, los problemas acechan. Desde las maquinaciones del sur a las salvajes tierras del este, pasando por el helado norte y el milenario muro que protege el reino de las fuerzas tenebrosas, dos poderosas familias mantienen un enfrentamiento letal por gobernar los Siete Reinos de Poniente. Mientras la traición, la lujuria y las fuerzas sobrenaturales sacuden los pilares de los reinos, la sangrienta batalla por el trono de Hierro tendrá consecuencias imprevistas y trascendentales. El invierno se acerca. Que empiece 'Juego de tronos'.",
    genres: ["Sci-Fi & Fantasy", "Drama", "Action & Adventure"],
    creator: "David Benioff",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/xvNN5huL0X8yJ7h3IZfGG4O2zBD.jpg",
    imdbRating: 8.5,
    cast: [
      {
        name: "Peter Dinklage",
        character: "Tyrion 'The Halfman' Lannister",
        profilePath:
          "https://image.tmdb.org/t/p/w185/9CAd7wr8QZyIN0E7nm8v1B6WkGn.jpg",
      },
      {
        name: "Kit Harington",
        character: "Jon Snow",
        profilePath:
          "https://image.tmdb.org/t/p/w185/iGXlJbExWwZmo9sUDsYuzf4Sv4y.jpg",
      },
      {
        name: "Nikolaj Coster-Waldau",
        character: "Sir Jaime 'Kingslayer' Lannister",
        profilePath:
          "https://image.tmdb.org/t/p/w185/rpFOERbHkj7GWxkinUNiQ76sSGk.jpg",
      },
      {
        name: "Lena Headey",
        character: "Cersei Lannister",
        profilePath:
          "https://image.tmdb.org/t/p/w185/cDyZLf8ddz0EgoUjpv4jjzy7qxA.jpg",
      },
      {
        name: "Emilia Clarke",
        character: "Daenerys Targaryen",
        profilePath:
          "https://image.tmdb.org/t/p/w185/iFY6t7Ux9r70WB7Sp0TTVz6eGtm.jpg",
      },
      {
        name: "Liam Cunningham",
        character: "Davos Seaworth",
        profilePath:
          "https://image.tmdb.org/t/p/w185/y27shwpEYGq4vhdEajcmqucuq9x.jpg",
      },
      {
        name: "Maisie Williams",
        character: "Arya Stark",
        profilePath:
          "https://image.tmdb.org/t/p/w185/5RjD4dDpRDAhalFtvcUj7zdLWYB.jpg",
      },
      {
        name: "Isaac Hempstead Wright",
        character: "Brandon 'Bran' Stark",
        profilePath:
          "https://image.tmdb.org/t/p/w185/g6ZreLmGrrOzaUCGVFRNPAWfcso.jpg",
      },
      {
        name: "Sophie Turner",
        character: "Sansa Stark",
        profilePath:
          "https://image.tmdb.org/t/p/w185/8ur4aHFakVCinWk0cvrGO8qAUhv.jpg",
      },
      {
        name: "John Bradley",
        character: "Samwell 'Sam' Tarly",
        profilePath:
          "https://image.tmdb.org/t/p/w185/lQuxVtH8GkSLSZQhpmSdIi88DSF.jpg",
      },
      {
        name: "Rory McCann",
        character: "Sandor 'The Hound' Clegane",
        profilePath:
          "https://image.tmdb.org/t/p/w185/meEHyiCRXTTCiYQMzP4VEdvEuD0.jpg",
      },
      {
        name: "Joe Dempsie",
        character: "Gendry",
        profilePath:
          "https://image.tmdb.org/t/p/w185/47XNLVxbLsEBFgGYgbHAIYE5ja9.jpg",
      },
    ],
  },
  {
    tmdbId: 94997,
    imdbId: "tt11198330",
    name: "La casa del dragón",
    originalName: "House of the Dragon",
    firstAirYear: 2022,
    lastAirYear: 2026,
    numberOfSeasons: 3,
    numberOfEpisodes: 26,
    seriesStatus: "En emisión",
    posterPath:
      "https://image.tmdb.org/t/p/w500/8MaxftF69sEAAD5673vTjIl8yT3.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/577eXC8wFQT0eUrJcgznSiFPRmk.jpg",
    overview:
      "Basada en el libro 'Fuego y Sangre' de George R.R. Martin. La serie se centra en la casa Targaryen, trescientos años antes de los eventos vistos en 'Juego de Tronos'.",
    genres: ["Sci-Fi & Fantasy", "Drama", "Action & Adventure"],
    creator: "George R.R. Martin",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/1A7W0L9dZz0rCN1oj6h8YUvusdN.jpg",
    imdbRating: 8.4,
    cast: [
      {
        name: "Matt Smith",
        character: "Prince Daemon Targaryen",
        profilePath:
          "https://image.tmdb.org/t/p/w185/wxMdHj4UA6LgIU5MiA7CKySZeVU.jpg",
      },
      {
        name: "Emma D'Arcy",
        character: "Queen Rhaenyra Targaryen",
        profilePath:
          "https://image.tmdb.org/t/p/w185/9Zlmb7VmtVCxkLq5yqFFRRxCaED.jpg",
      },
      {
        name: "Olivia Cooke",
        character: "Queen Alicent Hightower",
        profilePath:
          "https://image.tmdb.org/t/p/w185/wf71ctooNlVmiT8dxx0QmRAzyiX.jpg",
      },
      {
        name: "James Norton",
        character: "Lord Ormund Hightower",
        profilePath:
          "https://image.tmdb.org/t/p/w185/3i9z9MkUCrlOGdMRw00j2vScxGC.jpg",
      },
      {
        name: "Steve Toussaint",
        character: "Lord Corlys 'The Sea Snake' Velaryon",
        profilePath:
          "https://image.tmdb.org/t/p/w185/9rJafPDkQP8YuLy9iY5v19ZfMIW.jpg",
      },
      {
        name: "Fabien Frankel",
        character: "Ser Criston Cole",
        profilePath:
          "https://image.tmdb.org/t/p/w185/nXh1h7KbdeZc41ucwGhzp1cOMnd.jpg",
      },
      {
        name: "Matthew Needham",
        character: "Lord Larys 'Clubfoot' Strong",
        profilePath:
          "https://image.tmdb.org/t/p/w185/sZHT2xFtnBawU3DoaWZACSv15gX.jpg",
      },
      {
        name: "Sonoya Mizuno",
        character: "Mysaria 'The White Worm'",
        profilePath:
          "https://image.tmdb.org/t/p/w185/WVROOHuk6G6QgVe0pU8R2i1fsE.jpg",
      },
      {
        name: "Tom Glynn-Carney",
        character: "King Aegon II Targaryen",
        profilePath:
          "https://image.tmdb.org/t/p/w185/jJ3KqUW8ySGBwHXOCN3x2Wxjm5W.jpg",
      },
      {
        name: "Ewan Mitchell",
        character: "Prince Aemond Targaryen",
        profilePath:
          "https://image.tmdb.org/t/p/w185/v1PqysDnx5umfA2DqGyjwuAxc9C.jpg",
      },
      {
        name: "Harry Collett",
        character: "Prince Jacaerys 'Jace' Velaryon",
        profilePath:
          "https://image.tmdb.org/t/p/w185/nDF4XWPBM5tGzOIHTMMWrTmWQRn.jpg",
      },
      {
        name: "Phia Saban",
        character: "Queen Helaena Targaryen",
        profilePath:
          "https://image.tmdb.org/t/p/w185/fBkNrVyKbsNBTnVxTZWhmVqXznA.jpg",
      },
    ],
  },
  {
    tmdbId: 66732,
    imdbId: "tt4574334",
    name: "Stranger Things",
    originalName: "Stranger Things",
    firstAirYear: 2016,
    lastAirYear: 2025,
    numberOfSeasons: 5,
    numberOfEpisodes: 42,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/AsPD90QEQsIAtSxfSjV3fN7XFpt.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/56v2KjBlU4XaOv9rVYEQypROD7P.jpg",
    overview:
      "A raíz de la desaparición de un niño, un pueblo desvela un misterio relacionado con experimentos secretos, fuerzas sobrenaturales aterradoras y una niña muy extraña.",
    genres: ["Action & Adventure", "Misterio", "Sci-Fi & Fantasy"],
    creator: "Ross Duffer",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/AnZhpHzHKy0IWwn9KxkukXXWNte.jpg",
    imdbRating: 8.6,
    cast: [
      {
        name: "Winona Ryder",
        character: "Joyce Byers",
        profilePath:
          "https://image.tmdb.org/t/p/w185/8RVrlgtua8b53wmK7oZAAkm0N5O.jpg",
      },
      {
        name: "David Harbour",
        character: "Jim Hopper",
        profilePath:
          "https://image.tmdb.org/t/p/w185/qMFtMWlYVtFVyBoBhX5IoA5sN5a.jpg",
      },
      {
        name: "Millie Bobby Brown",
        character: "Eleven / Jane Hopper",
        profilePath:
          "https://image.tmdb.org/t/p/w185/kHO7hdNEVuTnQ0OjjrxP1RcAa0e.jpg",
      },
      {
        name: "Finn Wolfhard",
        character: "Mike Wheeler",
        profilePath:
          "https://image.tmdb.org/t/p/w185/vgjd34eWfVL6GsLHwiwcAsjWLmo.jpg",
      },
      {
        name: "Gaten Matarazzo",
        character: "Dustin Henderson",
        profilePath:
          "https://image.tmdb.org/t/p/w185/alVT7oDp8N5G9WLIApI9jqeuqHq.jpg",
      },
      {
        name: "Caleb McLaughlin",
        character: "Lucas Sinclair",
        profilePath:
          "https://image.tmdb.org/t/p/w185/4jVS3EziBn7bf97ErxkW7jsdiLM.jpg",
      },
      {
        name: "Noah Schnapp",
        character: "Will Byers",
        profilePath:
          "https://image.tmdb.org/t/p/w185/f8Gk3MUuz3xDNtcaErYB2RLgyPO.jpg",
      },
      {
        name: "Sadie Sink",
        character: "Max Mayfield",
        profilePath:
          "https://image.tmdb.org/t/p/w185/92FddzBfK50XOUbtwjqHPraoGHy.jpg",
      },
      {
        name: "Natalia Dyer",
        character: "Nancy Wheeler",
        profilePath:
          "https://image.tmdb.org/t/p/w185/cQaa3XEiUTgJxp85VeFYFyblJIH.jpg",
      },
      {
        name: "Charlie Heaton",
        character: "Jonathan Byers",
        profilePath:
          "https://image.tmdb.org/t/p/w185/8Se6WZuvRmoB990bT29OPgVAyBo.jpg",
      },
      {
        name: "Joe Keery",
        character: "Steve Harrington",
        profilePath:
          "https://image.tmdb.org/t/p/w185/ayIAVLMfZGEGIFwAo3pPnY7p59.jpg",
      },
      {
        name: "Maya Hawke",
        character: "Robin Buckley",
        profilePath:
          "https://image.tmdb.org/t/p/w185/r4xI4vhPdkrrGBQrqW4cHf0sTqV.jpg",
      },
    ],
  },
  {
    tmdbId: 60059,
    imdbId: "tt3032476",
    name: "Better Call Saul",
    originalName: "Better Call Saul",
    firstAirYear: 2015,
    lastAirYear: 2022,
    numberOfSeasons: 6,
    numberOfEpisodes: 63,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/zjg4jpK1Wp2kiRvtt5ND0kznako.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/rfxryDIv8huejujg4JueDJx8zCz.jpg",
    overview:
      'Esta precuela de "Breaking Bad" nominada al Emmy narra la vida del picapleitos Jimmy McGill y su transformación en Saul Goodman, el abogado de moral laxa.',
    genres: ["Crimen", "Drama"],
    creator: "Vince Gilligan",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/wJIxATESjzsjSgvRhVavOmdamXc.jpg",
    imdbRating: 8.7,
    cast: [
      {
        name: "Bob Odenkirk",
        character: "Jimmy McGill",
        profilePath:
          "https://image.tmdb.org/t/p/w185/rF0Lb6SBhGSTvjRffmlKRSeI3jE.jpg",
      },
      {
        name: "Jonathan Banks",
        character: "Mike Ehrmantraut",
        profilePath:
          "https://image.tmdb.org/t/p/w185/bswk26L13PvY4iMTwUTAsepXCLv.jpg",
      },
      {
        name: "Rhea Seehorn",
        character: "Kim Wexler",
        profilePath:
          "https://image.tmdb.org/t/p/w185/tql4gvY8NfYvmAdmdp1olkwJnrq.jpg",
      },
      {
        name: "Tony Dalton",
        character: "Lalo Salamanca",
        profilePath:
          "https://image.tmdb.org/t/p/w185/vWteTJu9Dyrax7gQq8ndTjx5s6V.jpg",
      },
      {
        name: "Giancarlo Esposito",
        character: "Gus Fring",
        profilePath:
          "https://image.tmdb.org/t/p/w185/rcXnr82TwDzU4ZGdBeNXfG0ZQnZ.jpg",
      },
    ],
  },
  {
    tmdbId: 100088,
    imdbId: "tt3581920",
    name: "The Last of Us",
    originalName: "The Last of Us",
    firstAirYear: 2023,
    lastAirYear: 2025,
    numberOfSeasons: 2,
    numberOfEpisodes: 16,
    seriesStatus: "En emisión",
    posterPath:
      "https://image.tmdb.org/t/p/w500/tNQWO6cNzQYCyvw36mUcAQQyf5F.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/lY2DhbA7Hy44fAKddr06UrXWWaQ.jpg",
    overview:
      "Año 2023, veinte años después del comienzo de una plaga mundial que infectó a población con un hongo mutado transformando a las personas en unas criaturas caníbales, el contrabandista Joel tiene la misión de escoltar a la adolescente Ellie por un mundo postapocalíptico en el nada va a ser fácil para los viajeros.  Joel todavía vive atormentado por el recuerdo de su única hija. Ellie es portadora de algo que podría cambiar el destino de la humanidad ¿Conseguirán sobrevivir los dos?",
    genres: ["Drama"],
    creator: "Neil Druckmann",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/bVUsM4aYiHbeSYE1xAw2H5Z1ANU.jpg",
    imdbRating: 8.4,
    cast: [
      {
        name: "Bella Ramsey",
        character: "Ellie Williams",
        profilePath:
          "https://image.tmdb.org/t/p/w185/vDbgxc7RYawpB1wK7JDEj62j06H.jpg",
      },
      {
        name: "Gabriel Luna",
        character: "Tommy Miller",
        profilePath:
          "https://image.tmdb.org/t/p/w185/bIPORtYxTJPEUJIThbZrpqf4A11.jpg",
      },
      {
        name: "Isabela Merced",
        character: "Dina",
        profilePath:
          "https://image.tmdb.org/t/p/w185/7O5GWIH8IHwU4kGZIhC3JkGDiZr.jpg",
      },
      {
        name: "Young Mazino",
        character: "Jesse",
        profilePath:
          "https://image.tmdb.org/t/p/w185/cRuVRx1DMe2hBkz5pssVqdpCtaQ.jpg",
      },
    ],
  },
  {
    tmdbId: 76331,
    imdbId: "tt7660850",
    name: "Succession",
    originalName: "Succession",
    firstAirYear: 2018,
    lastAirYear: 2023,
    numberOfSeasons: 4,
    numberOfEpisodes: 39,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/xyHasySw0HQ4ndRWHvrpRTAsWXd.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/bcdUYUFk8GdpZJPiSAas9UeocLH.jpg",
    overview:
      "La serie gira en torno a la vida de la familia Roy. Son multimillonarios y poderosos, tienen todo lo que ansían, salvo vida familiar. Son dueños de una de la compañías de comunicaciones más exitosas del mundo. Su objetivo principal es hacer que el imperio crezca y, para ello, las lealtades se pondrán en juego.",
    genres: ["Drama", "Comedia"],
    creator: "Jesse Armstrong",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/v2BvEzPuqrgcvElZF3sFjJoSZ0w.jpg",
    imdbRating: 8.3,
    cast: [
      {
        name: "Jeremy Strong",
        character: "Kendall Roy",
        profilePath:
          "https://image.tmdb.org/t/p/w185/jcMhXWICSi4QjQttJVhFSiKVvpF.jpg",
      },
      {
        name: "Kieran Culkin",
        character: "Roman Roy",
        profilePath:
          "https://image.tmdb.org/t/p/w185/b5EC4nziLhBRX4GOcYx2BdS3FTt.jpg",
      },
      {
        name: "Sarah Snook",
        character: "Siobhan 'Shiv' Roy",
        profilePath:
          "https://image.tmdb.org/t/p/w185/w9xv72oaTISLgeT381fU4Jor9GV.jpg",
      },
      {
        name: "Brian Cox",
        character: "Logan Roy",
        profilePath:
          "https://image.tmdb.org/t/p/w185/scSjbFCTRngXlkJRoKptM5kQGw7.jpg",
      },
      {
        name: "Matthew Macfadyen",
        character: "Tom Wambsgans",
        profilePath:
          "https://image.tmdb.org/t/p/w185/sFaIfkykJdftwrc3BdEfpdg2mYW.jpg",
      },
      {
        name: "Alan Ruck",
        character: "Connor Roy",
        profilePath:
          "https://image.tmdb.org/t/p/w185/hj7CuWinT12hMKjRhSO4XEMVq7w.jpg",
      },
      {
        name: "J. Smith-Cameron",
        character: "Gerri Kellman",
        profilePath:
          "https://image.tmdb.org/t/p/w185/7MBc2xJA3BpW3SnDQsww87IA0Tr.jpg",
      },
      {
        name: "Nicholas Braun",
        character: "Greg Hirsch",
        profilePath:
          "https://image.tmdb.org/t/p/w185/b2I6bZptuld3pjlVkYIy4DtMKGg.jpg",
      },
      {
        name: "Dagmara Dominczyk",
        character: "Karolina Novotney",
        profilePath:
          "https://image.tmdb.org/t/p/w185/i1f78OP3G6pksgCcu6AxPgZYEmv.jpg",
      },
      {
        name: "Peter Friedman",
        character: "Frank Vernon",
        profilePath:
          "https://image.tmdb.org/t/p/w185/3pyU0yQsRIqSZw1fYapFRXJ3EHp.jpg",
      },
      {
        name: "Justine Lupe",
        character: "Willa Ferreyra",
        profilePath:
          "https://image.tmdb.org/t/p/w185/9lHrHYBUJPXX1rnxczFIcBZLXw8.jpg",
      },
      {
        name: "David Rasche",
        character: "Karl Muller",
        profilePath:
          "https://image.tmdb.org/t/p/w185/bWPhfa4m8pXVneP1gf37xvuMUCA.jpg",
      },
    ],
  },
  {
    tmdbId: 95396,
    imdbId: "tt11280740",
    name: "Separación",
    originalName: "Severance",
    firstAirYear: 2022,
    lastAirYear: 2025,
    numberOfSeasons: 3,
    numberOfEpisodes: 19,
    seriesStatus: "En emisión",
    posterPath:
      "https://image.tmdb.org/t/p/w500/wrZjYKxObEaWZmjB7scQMYo40o8.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/ixgFmf1X59PUZam2qbAfskx2gQr.jpg",
    overview:
      "Mark Scout dirige un equipo en Lumon Industries cuyos empleados se han sometido a un procedimiento quirúrgico que separa sus recuerdos entre trabajo y vida personal. Este arriesgado experimento de conciliación es puesto en tela de juicio cuando Mark se encuentra envuelto en un misterio que le obligará a confrontar la verdadera naturaleza de su trabajo... y de sí mismo.",
    genres: ["Drama", "Misterio", "Sci-Fi & Fantasy"],
    creator: "Dan Erickson",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/qzQ30V43kbVoMjJXRw6ydkicXEP.jpg",
    imdbRating: 8.4,
    cast: [
      {
        name: "Adam Scott",
        character: "Mark Scout",
        profilePath:
          "https://image.tmdb.org/t/p/w185/b82C29R6fGiPoqIglQ4lzS6q2YX.jpg",
      },
      {
        name: "Britt Lower",
        character: "Helly Riggs",
        profilePath:
          "https://image.tmdb.org/t/p/w185/5XIcTMDSyj7hRICQAcnY9U83ujF.jpg",
      },
      {
        name: "Tramell Tillman",
        character: "Seth Milchick",
        profilePath:
          "https://image.tmdb.org/t/p/w185/bEA15zMnkcXlRroYjKrFUWiiK7y.jpg",
      },
      {
        name: "Zach Cherry",
        character: "Dylan George",
        profilePath:
          "https://image.tmdb.org/t/p/w185/fT3Wv8ef0Vn0daHWAObCp2Bd4Y.jpg",
      },
      {
        name: "Jen Tullock",
        character: "Devon Scout-Hale",
        profilePath:
          "https://image.tmdb.org/t/p/w185/91vck8hZ1VZGV6PTcwFWEEdzGE0.jpg",
      },
      {
        name: "Dichen Lachman",
        character: "Ms. Casey",
        profilePath:
          "https://image.tmdb.org/t/p/w185/yLrpMHBNtuUAu3M9EjaYHnn5EEY.jpg",
      },
      {
        name: "Sarah Bock",
        character: "Eustice Huang",
        profilePath:
          "https://image.tmdb.org/t/p/w185/om83G0zwTPDnL3mdmqbGMZqWbO.jpg",
      },
      {
        name: "John Turturro",
        character: "Irving Bailiff",
        profilePath:
          "https://image.tmdb.org/t/p/w185/6O9W9cJW0kCqMzYeLupV9oH0ftn.jpg",
      },
      {
        name: "Christopher Walken",
        character: "Burt Goodman",
        profilePath:
          "https://image.tmdb.org/t/p/w185/3Ht7zld9UcnHyOa7WY7HrNjlJn6.jpg",
      },
      {
        name: "Patricia Arquette",
        character: "Harmony Cobel",
        profilePath:
          "https://image.tmdb.org/t/p/w185/jeThSouMatiuRiLkjDvSBLHpmq0.jpg",
      },
    ],
  },
  {
    tmdbId: 60574,
    imdbId: "tt2442560",
    name: "Peaky Blinders",
    originalName: "Peaky Blinders",
    firstAirYear: 2013,
    lastAirYear: 2022,
    numberOfSeasons: 6,
    numberOfEpisodes: 36,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/zUqNyXRfYkFAFXsqJJjKMZpjYus.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/dzq83RHwQcnP6WGJ6YkenIqeaa5.jpg",
    overview:
      "Una familia de pandilleros asentada en Birmingham, Reino Unido, tras la Primera Guerra Mundial (1914-1918), dirige un local de apuestas hípicas. Las actividades del ambicioso jefe de la banda llaman la atención del Inspector jefe Chester Campbell, un detective de la Real Policía Irlandesa que es enviado desde Belfast para limpiar la ciudad y acabar con la banda.",
    genres: ["Drama", "Crimen"],
    creator: "Steven Knight",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/vmM9j2yXI8A3AccX3YgOEZHQWcO.jpg",
    imdbRating: 8.5,
    cast: [
      {
        name: "Cillian Murphy",
        character: "Thomas Shelby",
        profilePath:
          "https://image.tmdb.org/t/p/w185/2lKs67r7FI4bPu0AXxMUJZxmUXn.jpg",
      },
      {
        name: "Paul Anderson",
        character: "Arthur Shelby",
        profilePath:
          "https://image.tmdb.org/t/p/w185/nds5rTBZvJ4rEsP4N6OaoEgQDkW.jpg",
      },
      {
        name: "Sophie Rundle",
        character: "Ada Shelby",
        profilePath:
          "https://image.tmdb.org/t/p/w185/8kZTjHZcvmGo1W53DXM2mjXex2A.jpg",
      },
      {
        name: "Natasha O'Keeffe",
        character: "Lizzie Stark",
        profilePath:
          "https://image.tmdb.org/t/p/w185/tOX10C02tSFnOSra8a8rGuA6QZ5.jpg",
      },
    ],
  },
  {
    tmdbId: 70523,
    imdbId: "tt5753856",
    name: "Dark",
    originalName: "Dark",
    firstAirYear: 2017,
    lastAirYear: 2020,
    numberOfSeasons: 3,
    numberOfEpisodes: 26,
    seriesStatus: "Finalizada",
    posterPath:
      "https://image.tmdb.org/t/p/w500/hRP7N2uI0pokxnkcMFONoOZnxbv.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/3jDXL4Xvj3AzDOF6UH1xeyHW8MH.jpg",
    overview:
      "Tras la desaparición de un niño, cuatro familias desesperadas tratan de entender lo ocurrido a medida que van desvelando un retorcido misterio que abarca tres décadas.",
    genres: ["Crimen", "Drama", "Sci-Fi & Fantasy", "Misterio"],
    creator: "Baran bo Odar",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/3CfxoYPDPgFZ6jJMBOXCO5zhhEQ.jpg",
    imdbRating: 8.4,
    cast: [
      {
        name: "Louis Hofmann",
        character: "Jonas Kahnwald",
        profilePath:
          "https://image.tmdb.org/t/p/w185/m3Mo38afbKmy9EOsfmUagvTFM9q.jpg",
      },
    ],
  },
  {
    tmdbId: 126308,
    imdbId: "tt2788316",
    name: "Shōgun",
    originalName: "Shōgun",
    firstAirYear: 2024,
    lastAirYear: 2024,
    numberOfSeasons: 1,
    numberOfEpisodes: 10,
    seriesStatus: "En emisión",
    posterPath:
      "https://image.tmdb.org/t/p/w500/uIoDvVOQaKjSfz2oihkVS8M7l1v.jpg",
    backdropPath:
      "https://image.tmdb.org/t/p/original/bwSmgmd90hCWwqOKQYTEraeOZhJ.jpg",
    overview:
      "Ambientada en el Japón de 1600, lord Yoshii Toranaga lucha por su vida mientras que sus enemigos en el Consejo de regentes se alían contra él cuando un misterioso barco europeo aparece abandonado cerca de un pueblo pesquero.",
    genres: ["Drama", "War & Politics"],
    creator: "Rachel Kondo",
    creatorImage:
      "https://image.tmdb.org/t/p/w185/1W265VLdnqVzx5ZoWxtV6mv2uxM.jpg",
    imdbRating: 8.4,
    cast: [
      {
        name: "Hiroyuki Sanada",
        character: "Yoshii Toranaga",
        profilePath:
          "https://image.tmdb.org/t/p/w185/SOwDxhGnRccP2lAtssQ7TxCzOe.jpg",
      },
      {
        name: "Cosmo Jarvis",
        character: "John Blackthorne",
        profilePath:
          "https://image.tmdb.org/t/p/w185/1kgghZ558CxZCJip5ufO6BAqUGp.jpg",
      },
      {
        name: "Anna Sawai",
        character: "Toda Mariko",
        profilePath:
          "https://image.tmdb.org/t/p/w185/6uFaCOupDTPRnTiedveTUvjOikC.jpg",
      },
      {
        name: "Tadanobu Asano",
        character: "Kashigi Yabushige",
        profilePath:
          "https://image.tmdb.org/t/p/w185/3CBpfGRcPq1jEeYr51TiOiNbZzT.jpg",
      },
      {
        name: "Takehiro Hira",
        character: "Ishido Kazunari",
        profilePath:
          "https://image.tmdb.org/t/p/w185/f8UK7xqwkfpIZiECcDgc0AErkj6.jpg",
      },
      {
        name: "Tommy Bastow",
        character: "Father Martin Alvito",
        profilePath:
          "https://image.tmdb.org/t/p/w185/dIQcrDm9dZqc98Ca6Em67x5ivba.jpg",
      },
      {
        name: "Fumi Nikaido",
        character: "Ochiba No Kata / Ruri",
        profilePath:
          "https://image.tmdb.org/t/p/w185/tqxgrZdOpx2FuTJYlhago4fttI3.jpg",
      },
    ],
  },
];
