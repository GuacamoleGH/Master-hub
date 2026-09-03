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
    status: "BACKLOG" | "PLAYING" | "COMPLETED" | "PLATINUM" | "DROPPED";
    userRating?: number | null;
    hoursPlayed?: number | null;
    platform?: string | null;
    review?: string | null;
    completedDate?: string | null;
  };
}

export const CURATED_GAMES: SeedGame[] = [
  {
    "rawgId": 3328,
    "title": "The Witcher 3: Wild Hunt",
    "released": "2015-05-18",
    "backgroundImage": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    "metacritic": 92,
    "rating": 4.66,
    "genres": [
      "Action",
      "RPG"
    ],
    "platforms": [
      "PC (Steam)",
      "PlayStation 5",
      "PlayStation 4",
      "Xbox One",
      "Nintendo Switch"
    ],
    "developers": [
      "CD PROJEKT RED"
    ],
    "publishers": [
      "CD PROJEKT RED"
    ],
    "description": "The Witcher: Wild Hunt is a story-driven open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
    "screenshots": [
      "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266badb500.jpg"
    ],
    "userGame": {
      "status": "COMPLETED",
      "userRating": 9.4,
      "hoursPlayed": 127,
      "platform": "PC (Steam), PlayStation 5",
      "review": "Narrativa colosal, misiones secundarias con más peso dramático que muchos juegos completos y una banda sonora inolvidable.",
      "completedDate": "2026-07-15T22:00:00Z"
    }
  },
  {
    "rawgId": 326243,
    "title": "Elden Ring",
    "released": "2022-02-25",
    "backgroundImage": "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg",
    "metacritic": 95,
    "rating": 4.41,
    "genres": [
      "Action",
      "RPG"
    ],
    "platforms": [
      "PC (Steam)",
      "PlayStation 5",
      "Xbox Series S/X"
    ],
    "developers": [
      "FromSoftware"
    ],
    "publishers": [
      "Bandai Namco Entertainment"
    ],
    "description": "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    "screenshots": [],
    "userGame": {
      "status": "PLATINUM",
      "userRating": 9.8,
      "hoursPlayed": 185,
      "platform": "PlayStation 5",
      "review": "El pináculo del diseño de mundo abierto. La sensación de descubrimiento genuino supera a cualquier referente moderno.",
      "completedDate": "2026-06-10T19:30:00Z"
    }
  },
  {
    "rawgId": 41494,
    "title": "Cyberpunk 2077",
    "released": "2020-12-10",
    "backgroundImage": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c424de09.jpg",
    "metacritic": 86,
    "rating": 4.14,
    "genres": [
      "Action",
      "RPG",
      "Shooter"
    ],
    "platforms": [
      "PC (Steam)",
      "PlayStation 5",
      "Xbox Series S/X"
    ],
    "developers": [
      "CD PROJEKT RED"
    ],
    "publishers": [
      "CD PROJEKT RED"
    ],
    "description": "Cyberpunk 2077 is an open-world, action-adventure story set in Night City, a megalopolis obsessed with power, glamour and body modification.",
    "screenshots": [],
    "userGame": {
      "status": "COMPLETED",
      "userRating": 9,
      "hoursPlayed": 94,
      "platform": "PC (Steam)",
      "review": "Tras la actualización 2.0 y Phantom Liberty, Night City es una de las ambientaciones más densas y vivas jamás programadas.",
      "completedDate": "2026-05-20T23:00:00Z"
    }
  },
  {
    "rawgId": 324997,
    "title": "Persona 5 Royal",
    "released": "2019-10-31",
    "backgroundImage": "https://media.rawg.io/media/games/600/600da320f269a3048596669ff8910eb7.jpg",
    "metacritic": 95,
    "rating": 4.54,
    "genres": [
      "RPG"
    ],
    "platforms": [
      "PlayStation 5",
      "PlayStation 4",
      "Nintendo Switch",
      "PC (Steam)"
    ],
    "developers": [
      "ATLUS"
    ],
    "publishers": [
      "SEGA"
    ],
    "description": "Don the mask of Joker and join the Phantom Thieves of Hearts as you stage grand heists, infiltrate the minds of the corrupt, and make them change their ways!",
    "screenshots": [],
    "userGame": {
      "status": "PLAYING",
      "userRating": 9.5,
      "hoursPlayed": 62,
      "platform": "Nintendo Switch",
      "review": "Estilo audiovisual insuperable, jazz en cada rincón y un bucle jugable que hace que 100 horas parezcan 10.",
      "completedDate": null
    }
  },
  {
    "rawgId": 28,
    "title": "Red Dead Redemption 2",
    "released": "2018-10-26",
    "backgroundImage": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    "metacritic": 97,
    "rating": 4.59,
    "genres": [
      "Action",
      "Adventure"
    ],
    "platforms": [
      "PlayStation 5",
      "PlayStation 4",
      "Xbox One",
      "PC (Epic Games)"
    ],
    "developers": [
      "Rockstar Games"
    ],
    "publishers": [
      "Rockstar Games"
    ],
    "description": "America, 1899. The end of the wild west era has begun as lawmen hunt down the last remaining outlaw gangs.",
    "screenshots": [],
    "userGame": {
      "status": "PLATINUM",
      "userRating": 9.7,
      "hoursPlayed": 210,
      "platform": "PlayStation 5, PC (Epic Games)",
      "review": "Arthur Morgan es uno de los mejores personajes jamás escritos en cualquier medio narrativo. Nivel de detalle enfermizo.",
      "completedDate": "2026-03-01T20:00:00Z"
    }
  },
  {
    "rawgId": 9767,
    "title": "Hollow Knight",
    "released": "2017-02-24",
    "backgroundImage": "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
    "metacritic": 90,
    "rating": 4.41,
    "genres": [
      "Action",
      "Indie",
      "Platformer"
    ],
    "platforms": [
      "PC (Steam)",
      "Nintendo Switch",
      "PlayStation 4",
      "Xbox One"
    ],
    "developers": [
      "Team Cherry"
    ],
    "publishers": [
      "Team Cherry"
    ],
    "description": "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.",
    "screenshots": [],
    "userGame": {
      "status": "COMPLETED",
      "userRating": 9.2,
      "hoursPlayed": 58,
      "platform": "Nintendo Switch",
      "review": "La cúspide del metroidvania moderno. Jugabilidad quirúrgica, atmósfera melancólica y combates memorables.",
      "completedDate": "2026-01-12T14:00:00Z"
    }
  },
  {
    "rawgId": 5563,
    "title": "Bloodborne",
    "released": "2015-03-24",
    "backgroundImage": "https://media.rawg.io/media/games/214/214341400e95c4794025132204c3d78c.jpg",
    "metacritic": 92,
    "rating": 4.42,
    "genres": [
      "Action",
      "RPG"
    ],
    "platforms": [
      "PlayStation 4",
      "PlayStation 5"
    ],
    "developers": [
      "FromSoftware"
    ],
    "publishers": [
      "Sony Computer Entertainment"
    ],
    "description": "Face your fears as you search for answers in the ancient city of Yharnam, now cursed with a strange endemic illness spreading through the streets like wildfire.",
    "screenshots": [],
    "userGame": {
      "status": "COMPLETED",
      "userRating": 9.6,
      "hoursPlayed": 80,
      "platform": "PlayStation 4",
      "review": "Terror cósmico victoriano con el combate más agresivo y satisfactorio de FromSoftware. Obra de culto absoluta.",
      "completedDate": "2026-04-18T21:45:00Z"
    }
  },
  {
    "rawgId": 28589,
    "title": "Celeste",
    "released": "2018-01-25",
    "backgroundImage": "https://media.rawg.io/media/games/594/594978ae3562e182bd8516dbab8cf466.jpg",
    "metacritic": 92,
    "rating": 4.29,
    "genres": [
      "Action",
      "Indie",
      "Platformer"
    ],
    "platforms": [
      "PC (Steam)",
      "Nintendo Switch",
      "PlayStation 4",
      "Xbox One"
    ],
    "developers": [
      "Extremely OK Games"
    ],
    "publishers": [
      "Extremely OK Games"
    ],
    "description": "Help Madeline survive her inner demons on her journey to the top of Celeste Mountain, in this super-tight, hand-crafted platformer.",
    "screenshots": [],
    "userGame": {
      "status": "BACKLOG",
      "userRating": null,
      "hoursPlayed": 0,
      "platform": "PC (Steam)",
      "review": null,
      "completedDate": null
    }
  },
  {
    "rawgId": 58134,
    "title": "Marvel's Spider-Man",
    "released": "2018-09-07",
    "backgroundImage": "https://media.rawg.io/media/games/9aa/9aa42d16d425fa6f170455123d4eb069.jpg",
    "metacritic": 87,
    "rating": 4.28,
    "genres": [
      "Action",
      "Adventure"
    ],
    "platforms": [
      "PlayStation 5",
      "PlayStation 4",
      "PC (Steam)"
    ],
    "developers": [
      "Insomniac Games"
    ],
    "publishers": [
      "Sony Interactive Entertainment"
    ],
    "description": "Starring one of the world's most iconic Super Heroes, Marvel's Spider-Man features the acrobatic abilities, improvisation and web-slinging.",
    "screenshots": [],
    "userGame": {
      "status": "BACKLOG",
      "userRating": null,
      "hoursPlayed": 0,
      "platform": "PlayStation 5",
      "review": null,
      "completedDate": null
    }
  },
  {
    "rawgId": 5538,
    "title": "The Last of Us Part II",
    "released": "2020-06-19",
    "backgroundImage": "https://media.rawg.io/media/games/909/9099768181a04b1263d9167389a9f5d6.jpg",
    "metacritic": 93,
    "rating": 3.99,
    "genres": [
      "Action",
      "Shooter",
      "Adventure"
    ],
    "platforms": [
      "PlayStation 5",
      "PlayStation 4"
    ],
    "developers": [
      "Naughty Dog"
    ],
    "publishers": [
      "Sony Interactive Entertainment"
    ],
    "description": "Five years after their dangerous journey across the post-pandemic United States, Ellie and Joel have settled down in Jackson, Wyoming.",
    "screenshots": [],
    "userGame": {
      "status": "COMPLETED",
      "userRating": 9.3,
      "hoursPlayed": 32,
      "platform": "PlayStation 5",
      "review": "Audaz, desgarradora y técnicamente insuperable. Un retrato implacable sobre el ciclo del odio.",
      "completedDate": "2026-07-28T23:30:00Z"
    }
  },
  {
    "rawgId": 22511,
    "title": "The Legend of Zelda: Breath of the Wild",
    "released": "2017-03-03",
    "backgroundImage": "https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg",
    "metacritic": 97,
    "rating": 4.47,
    "genres": [
      "Action",
      "Adventure",
      "RPG"
    ],
    "platforms": [
      "Nintendo Switch",
      "Wii U"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 58175,
    "title": "God of War (2018)",
    "released": "2018-04-20",
    "backgroundImage": "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
    "metacritic": 94,
    "rating": 4.54,
    "genres": [
      "Action"
    ],
    "platforms": [
      "PC",
      "PlayStation 4"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 3498,
    "title": "Grand Theft Auto V",
    "released": "2013-09-17",
    "backgroundImage": "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
    "metacritic": 92,
    "rating": 4.47,
    "genres": [
      "Action"
    ],
    "platforms": [
      "PlayStation 5",
      "Xbox Series S/X",
      "PlayStation 3",
      "PC",
      "PlayStation 4"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 4200,
    "title": "Portal 2",
    "released": "2011-04-18",
    "backgroundImage": "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
    "metacritic": 95,
    "rating": 4.58,
    "genres": [
      "Shooter",
      "Puzzle"
    ],
    "platforms": [
      "PlayStation 3",
      "PC",
      "Xbox 360",
      "Linux",
      "macOS"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 4062,
    "title": "BioShock Infinite",
    "released": "2013-03-26",
    "backgroundImage": "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg",
    "metacritic": 94,
    "rating": 4.38,
    "genres": [
      "Action",
      "Shooter"
    ],
    "platforms": [
      "PlayStation 4",
      "Xbox 360",
      "Nintendo Switch",
      "Linux",
      "PC"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 5679,
    "title": "The Elder Scrolls V: Skyrim",
    "released": "2011-11-11",
    "backgroundImage": "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
    "metacritic": 94,
    "rating": 4.42,
    "genres": [
      "Action",
      "RPG"
    ],
    "platforms": [
      "PlayStation 5",
      "PlayStation 4",
      "PC",
      "Xbox One",
      "Xbox Series S/X"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 799265,
    "title": "The Last of Us Part I",
    "released": "2022-09-02",
    "backgroundImage": "https://media.rawg.io/media/games/71d/71df9e759b2246f9769126c98ac997fc.jpg",
    "metacritic": 85,
    "rating": 4.67,
    "genres": [
      "Action",
      "Shooter",
      "Adventure"
    ],
    "platforms": [
      "PC",
      "PlayStation 5"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 4806,
    "title": "Mass Effect 2",
    "released": "2010-01-26",
    "backgroundImage": "https://media.rawg.io/media/games/3cf/3cff89996570cf29a10eb9cd967dcf73.jpg",
    "metacritic": 94,
    "rating": 4.45,
    "genres": [
      "Action",
      "RPG"
    ],
    "platforms": [
      "PC",
      "Xbox One",
      "PlayStation 3",
      "Xbox 360"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 4544,
    "title": "Red Dead Redemption",
    "released": "2010-05-18",
    "backgroundImage": "https://media.rawg.io/media/games/686/686909717c3aa01518bc42ae2bf4259e.jpg",
    "metacritic": 95,
    "rating": 4.41,
    "genres": [
      "Action",
      "Shooter"
    ],
    "platforms": [
      "PlayStation 4",
      "PC",
      "Xbox Series S/X",
      "PlayStation 5",
      "Nintendo Switch"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 3070,
    "title": "Fallout 4",
    "released": "2015-11-09",
    "backgroundImage": "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg",
    "metacritic": 84,
    "rating": 3.81,
    "genres": [
      "Action",
      "RPG"
    ],
    "platforms": [
      "PlayStation 4",
      "PC",
      "PlayStation 5",
      "Xbox One"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 274755,
    "title": "Hades",
    "released": "2020-09-17",
    "backgroundImage": "https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg",
    "metacritic": 93,
    "rating": 4.42,
    "genres": [
      "Action",
      "Adventure",
      "RPG",
      "Indie"
    ],
    "platforms": [
      "PlayStation 5",
      "Xbox Series S/X",
      "PlayStation 4",
      "Nintendo Switch",
      "PC"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 5286,
    "title": "Tomb Raider",
    "released": "2013-03-05",
    "backgroundImage": "https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg",
    "metacritic": 86,
    "rating": 4.06,
    "genres": [
      "Action"
    ],
    "platforms": [
      "PlayStation 3",
      "Xbox 360",
      "macOS",
      "PC"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 3272,
    "title": "Rocket League",
    "released": "2015-07-07",
    "backgroundImage": "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg",
    "metacritic": 86,
    "rating": 3.93,
    "genres": [
      "Sports",
      "Racing",
      "Indie"
    ],
    "platforms": [
      "Nintendo Switch",
      "macOS",
      "PC",
      "Linux",
      "Xbox One"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 1030,
    "title": "Limbo",
    "released": "2010-07-21",
    "backgroundImage": "https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg",
    "metacritic": 88,
    "rating": 4.14,
    "genres": [
      "Action",
      "Adventure",
      "Indie",
      "Puzzle",
      "Platformer"
    ],
    "platforms": [
      "PC",
      "Android",
      "PS Vita",
      "PlayStation 4",
      "PlayStation 3"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 422,
    "title": "Terraria",
    "released": "2011-05-16",
    "backgroundImage": "https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg",
    "metacritic": 81,
    "rating": 4.08,
    "genres": [
      "Action",
      "Indie",
      "Platformer"
    ],
    "platforms": [
      "Xbox 360",
      "Wii U",
      "Nintendo 3DS",
      "Xbox One",
      "PlayStation 4"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 13536,
    "title": "Portal",
    "released": "2007-10-09",
    "backgroundImage": "https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg",
    "metacritic": 90,
    "rating": 4.49,
    "genres": [
      "Action",
      "Puzzle"
    ],
    "platforms": [
      "macOS",
      "PC",
      "Android",
      "PlayStation 3",
      "Xbox 360"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 12020,
    "title": "Left 4 Dead 2",
    "released": "2009-11-17",
    "backgroundImage": "https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg",
    "metacritic": 89,
    "rating": 4.1,
    "genres": [
      "Action",
      "Shooter"
    ],
    "platforms": [
      "Xbox 360",
      "Linux",
      "PC",
      "macOS"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 290856,
    "title": "Apex Legends",
    "released": "2019-02-04",
    "backgroundImage": "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
    "metacritic": 80,
    "rating": 3.63,
    "genres": [
      "Action",
      "Shooter"
    ],
    "platforms": [
      "PlayStation 4",
      "Nintendo Switch",
      "macOS",
      "PC",
      "Xbox One"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 3144,
    "title": "Super Meat Boy",
    "released": "2010-10-20",
    "backgroundImage": "https://media.rawg.io/media/games/e04/e04963f3ac4c4fa83a1dc0b9231e50db.jpg",
    "metacritic": 87,
    "rating": 3.98,
    "genres": [
      "Indie",
      "Platformer"
    ],
    "platforms": [
      "Linux",
      "Nintendo Switch",
      "Wii U",
      "Xbox 360",
      "PlayStation 4"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 4252,
    "title": "Mirror's Edge",
    "released": "2008-11-11",
    "backgroundImage": "https://media.rawg.io/media/games/8e4/8e4de3f54ac659e08a7ba6a2b731682a.jpg",
    "metacritic": 81,
    "rating": 4.07,
    "genres": [
      "Action"
    ],
    "platforms": [
      "Xbox 360",
      "PlayStation 3",
      "PC"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 2462,
    "title": "Uncharted 4: A Thief’s End",
    "released": "2016-05-10",
    "backgroundImage": "https://media.rawg.io/media/games/709/709bf81f874ce5d25d625b37b014cb63.jpg",
    "metacritic": 93,
    "rating": 4.48,
    "genres": [
      "Action",
      "Shooter"
    ],
    "platforms": [
      "PlayStation 5",
      "PlayStation 4"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 10754,
    "title": "BioShock Remastered",
    "released": "2016-09-15",
    "backgroundImage": "https://media.rawg.io/media/games/be0/be01c3d7d8795a45615da139322ca080.jpg",
    "metacritic": 85,
    "rating": 4.24,
    "genres": [
      "Shooter"
    ],
    "platforms": [
      "PlayStation 4",
      "Nintendo Switch",
      "macOS",
      "PC",
      "Xbox One"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 4386,
    "title": "Saints Row: The Third",
    "released": "2011-11-15",
    "backgroundImage": "https://media.rawg.io/media/games/d69/d69810315bd7e226ea2d21f9156af629.jpg",
    "metacritic": 84,
    "rating": 3.95,
    "genres": [
      "Action",
      "Adventure"
    ],
    "platforms": [
      "Linux",
      "PC",
      "Xbox One",
      "Xbox 360",
      "PlayStation 3"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  },
  {
    "rawgId": 654,
    "title": "Stardew Valley",
    "released": "2016-02-25",
    "backgroundImage": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg",
    "metacritic": 89,
    "rating": 4.39,
    "genres": [
      "RPG",
      "Simulation",
      "Indie"
    ],
    "platforms": [
      "Nintendo Switch",
      "Xbox One",
      "PC",
      "iOS",
      "macOS"
    ],
    "developers": [
      "Estudio Aclamado"
    ],
    "publishers": [
      "Publisher Aclamado"
    ],
    "description": "Obra de referencia aclamada por crítica y jugadores en el catálogo de exploración.",
    "screenshots": []
  }
];
