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
  // Películas listas para "Continuar Explorando" (sin registro de usuario)
  {
    tmdbId: 27205,
    imdbId: "tt1375666",
    title: "Origen",
    originalTitle: "Inception",
    year: 2010,
    posterPath: "https://image.tmdb.org/t/p/w500/tXQvtRWfkUUnWJAn2tN3jERIUG.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg",
    overview: "Dom Cobb es un ladrón hábil, el mejor de todos, especializado en el peligroso arte de extracción: el robo de secretos valiosos desde las profundidades del subconsciente durante el estado de sueño cuando la mente está más vulnerable. Esta habilidad excepcional de Cobb le ha hecho un jugador codiciado en el traicionero nuevo mundo de espionaje corporativo, pero al mismo tiempo, le ha convertido en un fugitivo internacional y ha tenido que sacrificar todo que le importaba. Ahora a Cobb se le ofrece una oportunidad para redimirse. Con un último trabajo podría recuperar su vida anterior, pero solamente si logra lo imposible.",
    runtime: 148,
    genres: JSON.stringify(["Acción","Ciencia ficción","Aventura"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.4,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 98,
    imdbId: "tt0172495",
    title: "Gladiator",
    originalTitle: "Gladiator",
    year: 2000,
    posterPath: "https://image.tmdb.org/t/p/w500/90QFOG5zSN4cbrIVs4DL4ePAuA5.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/jhk6D8pim3yaByu1801kMoxXFaX.jpg",
    overview: "En el año 180, el Imperio Romano domina todo el mundo conocido. Tras una gran victoria sobre los bárbaros del norte, el anciano emperador Marco Aurelio decide transferir el poder a Máximo, bravo general de sus ejércitos y hombre de inquebrantable lealtad al imperio. Pero su hijo Cómodo, que aspiraba al trono, no lo acepta y trata de asesinar a Máximo.",
    runtime: 155,
    genres: JSON.stringify(["Acción","Drama","Aventura"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.2,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 807,
    imdbId: "tt0114369",
    title: "Seven",
    originalTitle: "Se7en",
    year: 1995,
    posterPath: "https://image.tmdb.org/t/p/w500/uVPcVz4b2hnSGrXYLdIGRXwcivs.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/i5H7zusQGsysGQ8i6P361Vnr0n2.jpg",
    overview: "El teniente Somerset, del departamento de homicidios, está a punto de jubilarse y ser reemplazado por el ambicioso y brillante detective David Mills. Ambos tendrán que colaborar en la resolución de una serie de asesinatos cometidos por un psicópata que toma como base la relación de los siete pecados capitales: gula, pereza, soberbia, avaricia, envidia, lujuria e ira. Los cuerpos de las víctimas, sobre los que el asesino se ensaña de manera impúdica, se convertirán para los policías en un enigma que les obligará a viajar al horror y la barbarie más absoluta.",
    runtime: 127,
    genres: JSON.stringify(["Crimen","Misterio","Suspense"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.4,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 278,
    imdbId: "tt0111161",
    title: "Cadena perpetua",
    originalTitle: "The Shawshank Redemption",
    year: 1994,
    posterPath: "https://image.tmdb.org/t/p/w500/uRRTV7p6l2ivtODWJVVAMRrwTn2.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/pNjh59JSxChQktamG3LMp9ZoQzp.jpg",
    overview: "Acusado del asesinato de su mujer, Andrew Dufresne, tras ser condenado a cadena perpetua, es enviado a la prisión de Shawshank. Con el paso de los años conseguirá ganarse la confianza del director del centro y el respeto de sus compañeros presidiarios, especialmente de Red, el jefe de la mafia de los sobornos.",
    runtime: 143,
    genres: JSON.stringify(["Drama","Crimen"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.7,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 769,
    imdbId: "tt0099685",
    title: "Uno de los nuestros",
    originalTitle: "GoodFellas",
    year: 1990,
    posterPath: "https://image.tmdb.org/t/p/w500/3Yy0zBO9AlyAZH1cTI8Ko2ouCi.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/gILte6Zd7m1YneIr6MVhh30S9pr.jpg",
    overview: "Henry, un niño de trece años de Brooklyn, vive fascinado con el mundo de los gángsters. Su sueño se hace realidad cuando entra a formar parte de la familia Pauline, dueña absoluta de la zona, que lo educan como un miembro más de la banda convirtiéndole en un destacado mafioso.",
    runtime: 146,
    genres: JSON.stringify(["Drama","Crimen"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.5,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 274,
    imdbId: "tt0102926",
    title: "El silencio de los corderos",
    originalTitle: "The Silence of the Lambs",
    year: 1991,
    posterPath: "https://image.tmdb.org/t/p/w500/8FdQQ3cUCs9goEOr1qUFaHackoJ.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/aYcnDyLMnpKce1FOYUpZrXtgUye.jpg",
    overview: "Clarice Starling, del FBI, se aventura a una prisión de máxima seguridad para analizar el cerebro enfermo de Hannibal Lecter, un psiquiatra convertido en caníbal.",
    runtime: 118,
    genres: JSON.stringify(["Crimen","Suspense","Drama"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.3,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 872585,
    imdbId: "tt15398776",
    title: "Oppenheimer",
    originalTitle: "Oppenheimer",
    year: 2023,
    posterPath: "https://image.tmdb.org/t/p/w500/mJRUREPjTqqMEKwEiM2sdmIGngz.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/neeNHeXjMF5fXoCJRsOmkNGC7q.jpg",
    overview: "Película sobre el físico J. Robert Oppenheimer y su papel como desarrollador de la bomba atómica. Basada en el libro 'American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer' de Kai Bird y Martin J. Sherwin.",
    runtime: 181,
    genres: JSON.stringify(["Drama","Historia"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 129,
    imdbId: "tt0245429",
    title: "El viaje de Chihiro",
    originalTitle: "千と千尋の神隠し",
    year: 2001,
    posterPath: "https://image.tmdb.org/t/p/w500/2RcxjDykOssx4SfqshewyI9vfSl.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/dyJvKsNs2KP8qQnAXbRwDjblViy.jpg",
    overview: "Durante el traslado de su familia a los suburbios, una niña de 10 años de edad deambula por un mundo gobernado por dioses, brujas y espíritus, y donde los humanos se convierten en bestias.",
    runtime: 122,
    genres: JSON.stringify(["Animación","Familia","Fantasía"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.5,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 693134,
    imdbId: "tt15239678",
    title: "Dune: Parte dos",
    originalTitle: "Dune: Part Two",
    year: 2024,
    posterPath: "https://image.tmdb.org/t/p/w500/xCHmhHeO7aOCMlzcNukGH6Q7EiD.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/eZ239CUp1d6OryZEBPnO2n87gMG.jpg",
    overview: "Sigue el viaje mítico de Paul Atreides mientras se une a Chani y los Fremen en una guerra de venganza contra los conspiradores que destruyeron a su familia. Al enfrentarse a una elección entre el amor de su vida y el destino del universo conocido, Paul se esfuerza por evitar un futuro terrible que solo él puede prever.",
    runtime: 167,
    genres: JSON.stringify(["Ciencia ficción","Aventura"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.1,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 569094,
    imdbId: "tt9362722",
    title: "Spider-Man: Cruzando el Multiverso",
    originalTitle: "Spider-Man: Across the Spider-Verse",
    year: 2023,
    posterPath: "https://image.tmdb.org/t/p/w500/37WcNMgNOMxdhT87MFl7tq7FM1.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/kVd3a9YeLGkoeR50jGEXM6EqseS.jpg",
    overview: "Tras reencontrarse con Gwen Stacy, el amigable vecindario de Spider-Man de Brooklyn al completo es catapultado a través del Multiverso, donde se encuentra con un equipo de Spidermans encargados de proteger su propia existencia. Pero cuando los héroes se enfrentan sobre cómo manejar una nueva amenaza, Miles se encuentra enfrentado a las otras Arañas y debe redefinir lo que significa ser un héroe para poder salvar a la gente que más quiere.",
    runtime: 140,
    genres: JSON.stringify(["Animación","Acción","Aventura","Ciencia ficción"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.3,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 28,
    imdbId: "tt0078788",
    title: "Apocalypse Now",
    originalTitle: "Apocalypse Now",
    year: 1979,
    posterPath: "https://image.tmdb.org/t/p/w500/zJXRrkJTlcb5x87v4VWN1zZX0Xk.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/49fzLedFVKgGgFChLMuulDJBY1c.jpg",
    overview: "Durante la guerra de Vietnam, al joven Capitán Willard, un oficial de los servicios de inteligencia del ejército estadounidense, se le ha encomendado entrar en Camboya con la peligrosa misión de eliminar a Kurtz, un coronel renegado que se ha vuelto loco. El capitán deberá ir navegar por el río hasta el corazón de la selva, donde parece ser que Kurtz reina como un buda despótico sobre los miembros de la tribu Montagnard, que le adoran como a un dios.",
    runtime: 147,
    genres: JSON.stringify(["Drama","Bélica"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.3,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 120467,
    imdbId: "tt2278388",
    title: "El gran hotel Budapest",
    originalTitle: "The Grand Budapest Hotel",
    year: 2014,
    posterPath: "https://image.tmdb.org/t/p/w500/1wk0vpNCX5T40KsGQKjfoDAhmJw.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/9udCLTxTFl28RxnK8Q05E154ZGa.jpg",
    overview: "El Sr. Gustave H., un legendario conserje de un famoso hotel europeo de entreguerras, entabla amistad con Zero Moustafa, un joven empleado al que convierte en su protegido. La historia trata sobre el robo y la recuperación de una pintura renacentista de valor incalculable y sobre la batalla que enfrenta a los miembros de una familia por una inmensa fortuna. Como telón de fondo, los levantamientos que transformaron Europa durante la primera mitad del siglo XX.",
    runtime: 99,
    genres: JSON.stringify(["Comedia","Drama"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 122,
    imdbId: "tt0167260",
    title: "El señor de los anillos: El retorno del rey",
    originalTitle: "The Lord of the Rings: The Return of the King",
    year: 2003,
    posterPath: "https://image.tmdb.org/t/p/w500/mWuFbQrXyLk2kMBKF9TUPtDwuPx.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/ctiw6FZK4N36LmkjSklWEbuvlq9.jpg",
    overview: "Las fuerzas de Saruman han sido destruidas, y su fortaleza sitiada. Ha llegado el momento de que se decida el destino de la Tierra Media, y por primera vez en mucho tiempo, parece que hay una pequeña esperanza. La atención del señor oscuro Sauron se centra ahora en Gondor, el último reducto de los hombres, y del cual Aragorn tendrá que reclamar el trono para ocupar su puesto de rey. Pero las fuerzas de Sauron ya se preparan para lanzar el último y definitivo ataque contra el reino de Gondor, la batalla que decidirá el destino de todos. Mientras tanto, Frodo y Sam continuan su camino hacia Mordor, a la espera de que Sauron no repare en que dos pequeños Hobbits se acercan cada día más al final de su camino, el Monte del Destino.",
    runtime: 202,
    genres: JSON.stringify(["Aventura","Fantasía","Acción"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.5,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 120,
    imdbId: "tt0120737",
    title: "El señor de los anillos: La comunidad del anillo",
    originalTitle: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
    posterPath: "https://image.tmdb.org/t/p/w500/9xtH1RmAzQ0rrMBNUMXstb2s3er.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/oiwc338EoBgS4sEI2ixAny4KQKg.jpg",
    overview: "En la Tierra Media, el Señor Oscuro Saurón creó los Grandes Anillos de Poder, forjados por los herreros Elfos. Tres para los reyes Elfos, siete para los Señores Enanos, y nueve para los Hombres Mortales. Secretamente, Saurón también forjó un anillo maestro, el Anillo Único, que contiene en sí el poder para esclavizar a toda la Tierra Media. Con la ayuda de un grupo de amigos y de valientes aliados, Frodo emprende un peligroso viaje con la misión de destruir el Anillo Único. Pero el Señor Oscuro Sauron, quien creara el Anillo, envía a sus servidores para perseguir al grupo. Si Sauron lograra recuperar el Anillo, sería el final de la Tierra Media.",
    runtime: 179,
    genres: JSON.stringify(["Aventura","Fantasía","Acción"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.4,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 121,
    imdbId: "tt0167261",
    title: "El señor de los anillos: Las dos torres",
    originalTitle: "The Lord of the Rings: The Two Towers",
    year: 2002,
    posterPath: "https://image.tmdb.org/t/p/w500/up6gIHZlfEQZkHIfQwcOOaGOzOt.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/6G73mNyooWAEQTpckPSnFxFoNmc.jpg",
    overview: "La Compañía del Anillo se ha disuelto. El portador del anillo Frodo y su fiel amigo Sam se dirigen hacia Mordor para destruir el Anillo Único y acabar con el poder de Sauron. Mientras, y tras la dura batalla contra los orcos donde cayó Boromir, el hombre Aragorn, el elfo Legolas y el enano Gimli intentan rescatar a los medianos Merry y Pipin, secuestrados por los ogros de Mordor. Por su parte, Saurón y el traidor Sarumán continúan con sus planes en Mordor, en espera de la guerra contra las razas libres de la Tierra Media.",
    runtime: 180,
    genres: JSON.stringify(["Aventura","Fantasía","Acción"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.4,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 424,
    imdbId: "tt0108052",
    title: "La lista de Schindler",
    originalTitle: "Schindler's List",
    year: 1993,
    posterPath: "https://image.tmdb.org/t/p/w500/3Ho0pXsnMxpGJWqdOi0KDNdaTkT.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
    overview: "Oskar Schindler, un hombre de enorme astucia y talento para las relaciones públicas, organiza un ambicioso plan para ganarse la simpatía de los nazis. Después de la invasión de Polonia por los alemanes, consigue, gracias a sus relaciones con los nazis, la propiedad de una fábrica de Cracovia. Allí emplea a cientos de operarios judíos, cuya explotación le hace prosperar rápidamente. Su gerente, también judío, es el verdadero director en la sombra, pues Schindler no tiene el menor conocimiento industrial.",
    runtime: 195,
    genres: JSON.stringify(["Drama","Historia","Bélica"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.6,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 13,
    imdbId: "tt0109830",
    title: "Forrest Gump",
    originalTitle: "Forrest Gump",
    year: 1994,
    posterPath: "https://image.tmdb.org/t/p/w500/azV6hV99lYkdhydsQbJCI6FqMl4.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/66Kn4XWhkuPkJxOJyPEx4U2CUfN.jpg",
    overview: "Forrest Gump es un chico con deficiencias mentales no muy profundas y con alguna incapacidad motora que, a pesar de todo, llegará a convertirse, entre otras cosas, en un héroe durante la Guerra del Vietnam. Su persistencia y bondad le llevarán a conseguir una gran fortuna, ser objeto del clamor popular y a codearse con las más altas esferas sociales y políticas del país. Siempre sin olvidar a Jenny, su gran amor desde que era niño.",
    runtime: 142,
    genres: JSON.stringify(["Comedia","Drama","Romance"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.5,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 637,
    imdbId: "tt0118799",
    title: "La vida es bella",
    originalTitle: "La vita è bella",
    year: 1997,
    posterPath: "https://image.tmdb.org/t/p/w500/aZ7MFlKPfB02Lr9NwZQ4vsYRgcy.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/6aNKD81RHR1DqUUa8kOZ1TBY1Lp.jpg",
    overview: "En 1939, a punto de estallar la Segunda Guerra Mundial (1939-1945), el extravagante Guido llega a Arezzo, en la Toscana, con la intención de abrir una librería. Allí conoce a la encantadora Dora y, a pesar de que es la prometida del fascista Rodolfo, se casa con ella y tiene un hijo. Al estallar la guerra, los tres son internados en un campo de exterminio, donde Guido hará lo imposible para hacer creer a su hijo que la terrible situación que están padeciendo es tan sólo un juego.",
    runtime: 117,
    genres: JSON.stringify(["Comedia","Drama"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.4,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 240,
    imdbId: "tt0071562",
    title: "El padrino II",
    originalTitle: "The Godfather Part II",
    year: 1974,
    posterPath: "https://image.tmdb.org/t/p/w500/mbry0W5PRylSUHsYzdiY2FSJwze.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/pGzqRKrYeK4LogoysNro0vG8d8N.jpg",
    overview: "Continuación de la saga de los Corleone con dos historias paralelas: la elección de Michael Corleone como jefe de los negocios familiares y los orígenes del patriarca, el ya fallecido Don Vito, primero en Sicilia y luego en Estados Unidos, donde, empezando desde abajo, llegó a ser un poderosísimo jefe de la mafia de Nueva York.",
    runtime: 200,
    genres: JSON.stringify(["Drama","Crimen"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.6,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 389,
    imdbId: "tt0050083",
    title: "Doce hombres sin piedad",
    originalTitle: "12 Angry Men",
    year: 1957,
    posterPath: "https://image.tmdb.org/t/p/w500/t88XfoxO5cX3f0qaSxWsBS0Lc3.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
    overview: "Tras escuchar todos los testimonios y valorar las pruebas presentadas, un jurado popular compuesto por doce hombres tiene que decidir, por unanimidad, si absuelve o condena a muerte a un joven acusado de haber matado a su padre. Al principio, once están completamente convencidos de su culpabilidad y se inclinan por la condena, pero el que discrepa empieza a plantear dudas razonables que, poco a poco, van resquebrajando la inicial seguridad de los demás.",
    runtime: 92,
    genres: JSON.stringify(["Drama"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.6,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 105,
    imdbId: "tt0088763",
    title: "Regreso al futuro",
    originalTitle: "Back to the Future",
    year: 1985,
    posterPath: "https://image.tmdb.org/t/p/w500/owk40tn1sFJmC7bhamEpmhdZPKa.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/5bzPWQ2dFUl2aZKkp7ILJVVkRed.jpg",
    overview: "El adolescente Marty McFly es amigo de Doc, un científico al que todos toman por loco. Cuando Doc crea una máquina para viajar en el tiempo, un error fortuito hace que Marty llegue a 1955, año en el que sus futuros padres aún no se habían conocido. Después de impedir su primer encuentro, deberá conseguir que se conozcan y se casen; de lo contrario, su existencia no sería posible.",
    runtime: 116,
    genres: JSON.stringify(["Aventura","Comedia","Ciencia ficción"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.3,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 19995,
    imdbId: "tt0499549",
    title: "Avatar",
    originalTitle: "Avatar",
    year: 2009,
    posterPath: "https://image.tmdb.org/t/p/w500/t5T3LPbLLgP2OP6kloM9p2PXpJL.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/vL5LR6WdxWPjLPFRLe133jXWsh5.jpg",
    overview: "Año 2154. Jake Sully, un exmarine en silla de ruedas, es enviado al planeta Pandora, donde se ha creado el programa Avatar, gracias al cual los seres humanos pueden controlar de forma remota un cuerpo biológico con apariencia y genética de la especie nativa. Pronto se encontrará con la encrucijada entre seguir las órdenes de sus superiores o defender al mundo que le ha acogido y siente como suyo.",
    runtime: 161,
    genres: JSON.stringify(["Ciencia ficción","Acción","Aventura"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 7.6,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 8587,
    imdbId: "tt0110357",
    title: "El rey león",
    originalTitle: "The Lion King",
    year: 1994,
    posterPath: "https://image.tmdb.org/t/p/w500/b0MxU37dNmMwKtoPVYPKOZSIrIn.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/q00H8EqULYSK74lgevMkhmGGLHn.jpg",
    overview: "La sabana africana es el escenario en el que tienen lugar las aventuras de Simba, un pequeño león que es el heredero del trono. Sin embargo, se ve forzado a exiliarse al ser injustamente acusado de la muerte de su padre. Durante su destierro, hará buenas amistades y, finalmente, regresará para recuperar lo que legítimamente le corresponde.",
    runtime: 85,
    genres: JSON.stringify(["Animación","Familia","Drama"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.3,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 597,
    imdbId: "tt0120338",
    title: "Titanic",
    originalTitle: "Titanic",
    year: 1997,
    posterPath: "https://image.tmdb.org/t/p/w500/rBTJZrf5UWaxzg5YJd2eqpeaSvm.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/xnHVX37XZEp33hhCbYlQFq7ux1J.jpg",
    overview: "Jack, un joven artista, gana en una partida de cartas un pasaje para viajar a América en el Titanic, el transatlántico más grande y seguro jamás construido. A bordo conoce a Rose, una joven de una buena familia venida a menos que va a contraer un matrimonio de conveniencia con Cal, un millonario engreído a quien sólo interesa el prestigioso apellido de su prometida. Jack y Rose se enamoran, pero el prometido y la madre de ella ponen todo tipo de trabas a su relación. Mientras, el gigantesco y lujoso transatlántico se aproxima hacia un inmenso iceberg.",
    runtime: 194,
    genres: JSON.stringify(["Drama","Romance"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 7.9,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 37799,
    imdbId: "tt1285016",
    title: "La red social",
    originalTitle: "The Social Network",
    year: 2010,
    posterPath: "https://image.tmdb.org/t/p/w500/2GtDmIdxkJ5NZG97yhJQtM8Wn1H.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/1PXwh3nJzgRkkYnqfWInJNypeL4.jpg",
    overview: "Mark Zuckerberg, alumno de Harvard y genio de la programación, se sienta a su ordenador y con empeño y entusiasmo comienza a desarrollar una nueva idea. En un furor de blogging y programación, lo que comenzó en la habitación de su colegio mayor pronto se convirtió en una red social global y una revolución en la comunicación. Seis años y 500 millones de amigos después, Mark Zuckerberg es el billonario más joven de la historia. Pero para este emprendedor, el éxito ha supuesto complicaciones personales y legales...",
    runtime: 120,
    genres: JSON.stringify(["Drama"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 7.4,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  },
  {
    tmdbId: 77,
    imdbId: "tt0209144",
    title: "Memento",
    originalTitle: "Memento",
    year: 2000,
    posterPath: "https://image.tmdb.org/t/p/w500/fKTPH2WvH8nHTXeBYBVhawtRqtR.jpg",
    backdropPath: "https://image.tmdb.org/t/p/original/7Wev9JMo6R5XAfz2KDvXb7oPMmy.jpg",
    overview: "Leonard Shelby sigue la pista del hombre que violó y asesinó a su mujer. Sin embargo, la dificultad de localizar al asesino de su esposa se ve agravada por el hecho de que padece una forma rara e intratable de pérdida de memoria a corto plazo. Aunque puede recordar detalles de la vida antes de su accidente, Leonard no puede recordar qué ha pasado hace quince minutos, adónde va o por qué.",
    runtime: 113,
    genres: JSON.stringify(["Misterio","Suspense"]),
    director: "Director Aclamado",
    directorImage: "",
    imdbRating: 8.2,
    streamingPlatforms: JSON.stringify(["HBO Max", "Prime Video"]),
    cast: JSON.stringify([])
  }
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
