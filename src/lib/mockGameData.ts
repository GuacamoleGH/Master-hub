export interface SeedGame {
  rawgId: number;
  title: string;
  released: string;
  backgroundImage: string;
  metacritic: number;
  rating: number;
  genres: string[];
  platforms: string[];
  developers: string[];
  publishers: string[];
  description: string;
  screenshots: string[];
  userGame?: {
    status: 'BACKLOG' | 'PLAYING' | 'COMPLETED' | 'PLATINUM' | 'DROPPED';
    userRating?: number;
    hoursPlayed?: number;
    platform?: string;
    review?: string;
    completedDate?: string;
  };
}

export const CURATED_GAMES: SeedGame[] = [
  {
    rawgId: 3328,
    title: "The Witcher 3: Wild Hunt",
    released: "2015-05-18",
    backgroundImage: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10f6bcd13.jpg",
    metacritic: 92,
    rating: 4.66,
    genres: ["Action", "RPG"],
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox One", "Nintendo Switch"],
    developers: ["CD PROJEKT RED"],
    publishers: ["CD PROJEKT RED"],
    description: "The Witcher: Wild Hunt is a story-driven, next-generation open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
    screenshots: [
      "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266badb500.jpg",
      "https://media.rawg.io/media/screenshots/0b4/0b4e79d3d066717d00018178244018a9.jpg"
    ],
    userGame: {
      status: "COMPLETED",
      userRating: 9.4,
      hoursPlayed: 127,
      platform: "PC",
      review: "Narrativa colosal, misiones secundarias con más peso dramático que muchos juegos completos y una banda sonora inolvidable.",
      completedDate: "2026-07-15T22:00:00.000Z"
    }
  },
  {
    rawgId: 3272,
    title: "Elden Ring",
    released: "2022-02-25",
    backgroundImage: "https://media.rawg.io/media/games/b29/b2960ad9e9d086783b3b446f5e463a8b.jpg",
    metacritic: 96,
    rating: 4.41,
    genres: ["Action", "RPG"],
    platforms: ["PC", "PlayStation 5", "PlayStation 4", "Xbox Series S/X"],
    developers: ["FromSoftware"],
    publishers: ["Bandai Namco Entertainment"],
    description: "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    screenshots: [
      "https://media.rawg.io/media/screenshots/a0a/a0a4c0a5a3a2e7c3e3e3b3a3c3e3a3e3.jpg"
    ],
    userGame: {
      status: "PLATINUM",
      userRating: 9.8,
      hoursPlayed: 164,
      platform: "PC",
      review: "La cumbre del diseño de mundo abierto de FromSoftware. El sentido del descubrimiento no decae en ningún momento.",
      completedDate: "2026-08-01T20:30:00.000Z"
    }
  },
  {
    rawgId: 28,
    title: "Red Dead Redemption 2",
    released: "2018-10-26",
    backgroundImage: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    metacritic: 97,
    rating: 4.58,
    genres: ["Action", "Adventure"],
    platforms: ["PC", "PlayStation 4", "Xbox One"],
    developers: ["Rockstar Games"],
    publishers: ["Rockstar Games"],
    description: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run. With federal agents and the best bounty hunters in the nation massing on their heels.",
    screenshots: [],
    userGame: {
      status: "COMPLETED",
      userRating: 9.7,
      hoursPlayed: 112,
      platform: "PlayStation 5",
      review: "Arthur Morgan es uno de los mejores personajes jamás escritos en la historia del entretenimiento interactivo.",
      completedDate: "2026-05-10T19:00:00.000Z"
    }
  },
  {
    rawgId: 9767,
    title: "Hollow Knight",
    released: "2017-02-24",
    backgroundImage: "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
    metacritic: 87,
    rating: 4.41,
    genres: ["Action", "Indie", "Platformer"],
    platforms: ["PC", "Nintendo Switch", "PlayStation 4", "Xbox One"],
    developers: ["Team Cherry"],
    publishers: ["Team Cherry"],
    description: "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.",
    screenshots: [],
    userGame: {
      status: "COMPLETED",
      userRating: 9.6, // Hot Take positiva: Joya oculta frente a crítica
      hoursPlayed: 52,
      platform: "PC",
      review: "El pináculo absoluto del metroidvania moderno. Música, control y ambientación insuperables.",
      completedDate: "2026-06-20T21:00:00.000Z"
    }
  },
  {
    rawgId: 41494,
    title: "Cyberpunk 2077",
    released: "2020-12-10",
    backgroundImage: "https://media.rawg.io/media/games/26d/26d44377d59666b35150d442070ab531.jpg",
    metacritic: 86,
    rating: 4.15,
    genres: ["Action", "RPG"],
    platforms: ["PC", "PlayStation 5", "Xbox Series S/X"],
    developers: ["CD PROJEKT RED"],
    publishers: ["CD PROJEKT RED"],
    description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    screenshots: [],
    userGame: {
      status: "COMPLETED",
      userRating: 9.1,
      hoursPlayed: 88,
      platform: "PC",
      review: "Night City tras los parches y Phantom Liberty es el mundo cyberpunk más denso e inmersivo jamás creado.",
      completedDate: "2026-07-28T23:15:00.000Z"
    }
  },
  {
    rawgId: 58134,
    title: "Starfield",
    released: "2023-09-06",
    backgroundImage: "https://media.rawg.io/media/games/5ec/5ecac9fdd3cad3cdd910f7694e86f474.jpg",
    metacritic: 83,
    rating: 3.12,
    genres: ["RPG", "Action"],
    platforms: ["PC", "Xbox Series S/X"],
    developers: ["Bethesda Game Studios"],
    publishers: ["Bethesda Softworks"],
    description: "Starfield is the first new universe in 25 years from Bethesda Game Studios, the award-winning creators of The Elder Scrolls V: Skyrim and Fallout 4.",
    screenshots: [],
    userGame: {
      status: "DROPPED",
      userRating: 5.2, // Hot Take negativa: Sobrevalorado por crítica
      hoursPlayed: 24,
      platform: "PC",
      review: "Demasiadas pantallas de carga y exploración espacial sin alma. Muy por detrás de Skyrim.",
      completedDate: "2026-04-05T18:00:00.000Z"
    }
  },
  {
    rawgId: 290856,
    title: "Baldur's Gate 3",
    released: "2023-08-03",
    backgroundImage: "https://media.rawg.io/media/games/699/699222d81ab55815805dd36931369b9b.jpg",
    metacritic: 96,
    rating: 4.54,
    genres: ["RPG", "Strategy"],
    platforms: ["PC", "PlayStation 5", "Xbox Series S/X"],
    developers: ["Larian Studios"],
    publishers: ["Larian Studios"],
    description: "Gather your party, and return to the Forgotten Realms in a tale of fellowship and betrayal, sacrifice and survival, and the lure of absolute power.",
    screenshots: [],
    userGame: {
      status: "PLAYING",
      hoursPlayed: 75,
      platform: "PC"
    }
  },
  {
    rawgId: 326243,
    title: "The Legend of Zelda: Tears of the Kingdom",
    released: "2023-05-12",
    backgroundImage: "https://media.rawg.io/media/games/442/442e340cf3545b78d227c29367468165.jpg",
    metacritic: 96,
    rating: 4.45,
    genres: ["Action", "Adventure"],
    platforms: ["Nintendo Switch"],
    developers: ["Nintendo"],
    publishers: ["Nintendo"],
    description: "An epic adventure across the land and skies of Hyrule awaits in the The Legend of Zelda: Tears of the Kingdom game for the Nintendo Switch system.",
    screenshots: [],
    userGame: {
      status: "BACKLOG",
      platform: "Nintendo Switch"
    }
  },
  {
    rawgId: 58175,
    title: "Ghost of Tsushima",
    released: "2020-07-17",
    backgroundImage: "https://media.rawg.io/media/games/63f/63f470fd8d2bf4500ea54ecf0c59800e.jpg",
    metacritic: 83,
    rating: 4.4,
    genres: ["Action", "Adventure"],
    platforms: ["PC", "PlayStation 5", "PlayStation 4"],
    developers: ["Sucker Punch Productions"],
    publishers: ["Sony Interactive Entertainment"],
    description: "In the late 13th century, the Mongol empire has laid waste to entire nations along their campaign to conquer the East.",
    screenshots: [],
    userGame: {
      status: "BACKLOG",
      platform: "PC"
    }
  }
];
