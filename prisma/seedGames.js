const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CURATED_GAMES = [
  {
    rawgId: 3328,
    title: "The Witcher 3: Wild Hunt",
    released: "2015-05-18",
    backgroundImage:
      "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    metacritic: 92,
    rating: 4.66,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify([
      "PC",
      "PlayStation 5",
      "PlayStation 4",
      "Xbox One",
      "Nintendo Switch",
    ]),
    developers: JSON.stringify(["CD PROJEKT RED"]),
    publishers: JSON.stringify(["CD PROJEKT RED"]),
    description:
      "The Witcher: Wild Hunt is a story-driven open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
    screenshots: JSON.stringify([
      "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266badb500.jpg",
    ]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.4,
      hoursPlayed: 127,
      platform: "PC (Steam), PlayStation 5",
      review:
        "Narrativa colosal, misiones secundarias con más peso dramático que muchos juegos completos y una banda sonora inolvidable.",
      completedDate: new Date("2026-07-15T22:00:00Z"),
    },
  },
  {
    rawgId: 326243,
    title: "Elden Ring",
    released: "2022-02-25",
    backgroundImage:
      "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg",
    metacritic: 95,
    rating: 4.41,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify([
      "PC",
      "PlayStation 5",
      "PlayStation 4",
      "Xbox Series S/X",
    ]),
    developers: JSON.stringify(["FromSoftware"]),
    publishers: JSON.stringify(["Bandai Namco Entertainment"]),
    description:
      "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "PLATINUM",
      userRating: 9.8,
      hoursPlayed: 164,
      platform: "PC (Steam), PlayStation 5",
      review:
        "La cumbre del diseño de mundo abierto de FromSoftware. El sentido del descubrimiento no decae en ningún momento.",
      completedDate: new Date("2026-08-01T20:30:00Z"),
    },
  },
  {
    rawgId: 41494,
    title: "Cyberpunk 2077",
    released: "2020-12-10",
    backgroundImage:
      "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
    metacritic: 86,
    rating: 4.15,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["PC", "PlayStation 5", "Xbox Series S/X"]),
    developers: JSON.stringify(["CD PROJEKT RED"]),
    publishers: JSON.stringify(["CD PROJEKT RED"]),
    description:
      "Cyberpunk 2077 is an open-world, action-adventure story set in Night City.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.1,
      hoursPlayed: 88,
      platform: "PC (Steam)",
      review:
        "Night City tras los parches y Phantom Liberty es el mundo cyberpunk más denso e inmersivo jamás creado.",
      completedDate: new Date("2026-07-28T23:15:00Z"),
    },
  },
  {
    rawgId: 324997,
    title: "Baldur's Gate 3",
    released: "2023-08-03",
    backgroundImage:
      "https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg",
    metacritic: 97,
    rating: 4.54,
    genres: JSON.stringify(["RPG", "Strategy"]),
    platforms: JSON.stringify(["PC", "PlayStation 5", "Xbox Series S/X"]),
    developers: JSON.stringify(["Larian Studios"]),
    publishers: JSON.stringify(["Larian Studios"]),
    description:
      "Gather your party, and return to the Forgotten Realms in a tale of fellowship and betrayal.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "PLAYING",
      hoursPlayed: 75,
      platform: "PC (Steam), Steam Deck",
    },
  },
  {
    rawgId: 28,
    title: "Red Dead Redemption 2",
    released: "2018-10-26",
    backgroundImage:
      "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    metacritic: 96,
    rating: 4.58,
    genres: JSON.stringify(["Action", "Adventure"]),
    platforms: JSON.stringify(["PC", "PlayStation 4", "Xbox One"]),
    developers: JSON.stringify(["Rockstar Games"]),
    publishers: JSON.stringify(["Rockstar Games"]),
    description:
      "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.7,
      hoursPlayed: 112,
      platform: "PlayStation 5, PC (Epic Games)",
      review:
        "Arthur Morgan es uno de los mejores personajes jamás escritos en la historia del entretenimiento interactivo.",
      completedDate: new Date("2026-05-10T19:00:00Z"),
    },
  },
  {
    rawgId: 9767,
    title: "Hollow Knight",
    released: "2017-02-24",
    backgroundImage:
      "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
    metacritic: 88,
    rating: 4.41,
    genres: JSON.stringify(["Action", "Indie", "Platformer"]),
    platforms: JSON.stringify([
      "PC",
      "Nintendo Switch",
      "PlayStation 4",
      "Xbox One",
    ]),
    developers: JSON.stringify(["Team Cherry"]),
    publishers: JSON.stringify(["Team Cherry"]),
    description:
      "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.6,
      hoursPlayed: 52,
      platform: "Nintendo Switch, PC (Steam)",
      review:
        "El pináculo absoluto del metroidvania moderno. Música, control y ambientación insuperables.",
      completedDate: new Date("2026-06-20T21:00:00Z"),
    },
  },
  {
    rawgId: 5563,
    title: "Fallout: New Vegas",
    released: "2010-10-19",
    backgroundImage:
      "https://media.rawg.io/media/games/995/9951d9d55323d08967640f7b9ab3e342.jpg",
    metacritic: 84,
    rating: 4.44,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["PC", "Xbox 360", "PlayStation 3"]),
    developers: JSON.stringify(["Obsidian Entertainment"]),
    publishers: JSON.stringify(["Bethesda Softworks"]),
    description:
      "Welcome to Vegas. New Vegas. It’s the kind of town where you dig your own grave prior to being shot in the head.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.5, // Joya Oculta / Hot take: 9.5 vs 8.4
      hoursPlayed: 94,
      platform: "Xbox 360, PC (Steam)",
      review:
        "El mejor RPG de la era moderna. Las facciones, las opciones de diálogo y las consecuencias de tus actos no tienen rival.",
      completedDate: new Date("2026-03-12T17:00:00Z"),
    },
  },
  {
    rawgId: 28589,
    title: "Halo 3",
    released: "2007-09-25",
    backgroundImage:
      "https://media.rawg.io/media/games/982/982ff61d574fed5e416cb1867b40d9b0.jpg",
    metacritic: 91,
    rating: 4.35,
    genres: JSON.stringify(["Action", "Shooter"]),
    platforms: JSON.stringify(["Xbox 360", "PC"]),
    developers: JSON.stringify(["Bungie"]),
    publishers: JSON.stringify(["Microsoft Studios"]),
    description:
      "The epic saga continues with Halo 3, the much-anticipated sequel to the highly successful and critically acclaimed Halo franchise.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.3,
      hoursPlayed: 45,
      platform: "Xbox 360",
      review:
        "La era dorada de Xbox 360. La campaña cooperativa y el multijugador marcaron una generación entera.",
      completedDate: new Date("2026-02-18T16:00:00Z"),
    },
  },
  {
    rawgId: 58134,
    title: "Starfield",
    released: "2023-09-06",
    backgroundImage:
      "https://media.rawg.io/media/games/5ec/5ecac9fdd3cad3cdd910f7694e86f474.jpg",
    metacritic: 83,
    rating: 3.12,
    genres: JSON.stringify(["RPG", "Action"]),
    platforms: JSON.stringify(["PC", "Xbox Series S/X"]),
    developers: JSON.stringify(["Bethesda Game Studios"]),
    publishers: JSON.stringify(["Bethesda Softworks"]),
    description:
      "Starfield is the first new universe in 25 years from Bethesda Game Studios.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "DROPPED",
      userRating: 5.2, // Overrated: 5.2 vs 8.3
      hoursPlayed: 24,
      platform: "PC (Game Pass)",
      review:
        "Demasiadas pantallas de carga y exploración espacial sin alma. Muy por detrás de Skyrim.",
      completedDate: new Date("2026-04-05T18:00:00Z"),
    },
  },
  {
    rawgId: 5538,
    title: "Dark Souls",
    released: "2011-09-22",
    backgroundImage:
      "https://media.rawg.io/media/games/582/582b5518a52f5086d15dde128264b94d.jpg",
    metacritic: 89,
    rating: 4.38,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["Xbox 360", "PlayStation 3", "PC"]),
    developers: JSON.stringify(["FromSoftware"]),
    publishers: JSON.stringify(["Bandai Namco Entertainment"]),
    description:
      "Dark Souls will be the most deeply challenging game you play this year.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "BACKLOG",
      platform: "PlayStation 3, Xbox 360",
    },
  },
  // Catálogo rico para "Continuar Explorando Videojuegos"
  {
    rawgId: 22511,
    title: "The Legend of Zelda: Breath of the Wild",
    released: "2017-03-03",
    backgroundImage:
      "https://media.rawg.io/media/games/cc1/cc196a5ad763955d6532cdba236f730c.jpg",
    metacritic: 97,
    rating: 4.54,
    genres: JSON.stringify(["Action", "Adventure", "RPG"]),
    platforms: JSON.stringify(["Nintendo Switch", "Wii U"]),
    developers: JSON.stringify(["Nintendo"]),
    publishers: JSON.stringify(["Nintendo"]),
    description:
      "Forget everything you know about The Legend of Zelda games. Step into a world of discovery, exploration and adventure in The Legend of Zelda: Breath of the Wild.",
    screenshots: JSON.stringify([]),
  },
  {
    rawgId: 58175,
    title: "God of War (2018)",
    released: "2018-04-20",
    backgroundImage:
      "https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg",
    metacritic: 94,
    rating: 4.58,
    genres: JSON.stringify(["Action", "Adventure"]),
    platforms: JSON.stringify(["PlayStation 5", "PlayStation 4", "PC"]),
    developers: JSON.stringify(["Santa Monica Studio"]),
    publishers: JSON.stringify(["Sony Interactive Entertainment"]),
    description:
      "His vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters.",
    screenshots: JSON.stringify([]),
  },
  {
    rawgId: 3498,
    title: "Grand Theft Auto V",
    released: "2013-09-17",
    backgroundImage:
      "https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg",
    metacritic: 92,
    rating: 4.47,
    genres: JSON.stringify(["Action", "Adventure"]),
    platforms: JSON.stringify([
      "PC",
      "PlayStation 5",
      "Xbox Series S/X",
      "PlayStation 3",
      "Xbox 360",
    ]),
    developers: JSON.stringify(["Rockstar North"]),
    publishers: JSON.stringify(["Rockstar Games"]),
    description:
      "When a young street hustler, a retired bank robber and a terrifying psychopath find themselves entangled with some of the most frightening and deranged elements of the criminal underworld...",
    screenshots: JSON.stringify([]),
  },
  {
    rawgId: 4200,
    title: "Portal 2",
    released: "2011-04-18",
    backgroundImage:
      "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
    metacritic: 95,
    rating: 4.62,
    genres: JSON.stringify(["Puzzle", "Shooter"]),
    platforms: JSON.stringify(["PC", "Xbox 360", "PlayStation 3"]),
    developers: JSON.stringify(["Valve"]),
    publishers: JSON.stringify(["Valve"]),
    description:
      "The Perpetual Testing Initiative has been expanded to allow you to design co-op puzzles for you and your friends!",
    screenshots: JSON.stringify([]),
  },
  {
    rawgId: 4062,
    title: "BioShock Infinite",
    released: "2013-03-26",
    backgroundImage:
      "https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg",
    metacritic: 94,
    rating: 4.39,
    genres: JSON.stringify(["Action", "Shooter"]),
    platforms: JSON.stringify(["PC", "Xbox 360", "PlayStation 3"]),
    developers: JSON.stringify(["Irrational Games"]),
    publishers: JSON.stringify(["2K Games"]),
    description:
      "Indebted to the wrong people, with his life on the line, veteran of the U.S. Cavalry and now hired gun, Booker DeWitt has only one opportunity to wipe his slate clean.",
    screenshots: JSON.stringify([]),
  },
  {
    rawgId: 5679,
    title: "The Elder Scrolls V: Skyrim",
    released: "2011-11-11",
    backgroundImage:
      "https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg",
    metacritic: 94,
    rating: 4.42,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify([
      "PC",
      "Xbox 360",
      "PlayStation 3",
      "Nintendo Switch",
    ]),
    developers: JSON.stringify(["Bethesda Game Studios"]),
    publishers: JSON.stringify(["Bethesda Softworks"]),
    description:
      "EPIC FANTASY REBORN. The next chapter in the highly anticipated Elder Scrolls saga arrives from the makers of the 2006 and 2008 Games of the Year, Bethesda Game Studios.",
    screenshots: JSON.stringify([]),
  },
  {
    rawgId: 799265,
    title: "The Last of Us Part I",
    released: "2022-09-02",
    backgroundImage:
      "https://media.rawg.io/media/games/71d/71df9e759b2246f9769126c98ac997fc.jpg",
    metacritic: 88,
    rating: 4.54,
    genres: JSON.stringify(["Action", "Adventure"]),
    platforms: JSON.stringify(["PlayStation 5", "PC"]),
    developers: JSON.stringify(["Naughty Dog"]),
    publishers: JSON.stringify(["Sony Interactive Entertainment"]),
    description:
      "Endure and survive. Experience the emotional storytelling and unforgettable characters in The Last of Us.",
    screenshots: JSON.stringify([]),
  },
  {
    rawgId: 4806,
    title: "Mass Effect 2",
    released: "2010-01-26",
    backgroundImage:
      "https://media.rawg.io/media/games/3cf/3cff89996570cf29a10eb9cd967dcf73.jpg",
    metacritic: 94,
    rating: 4.48,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["PC", "Xbox 360", "PlayStation 3"]),
    developers: JSON.stringify(["BioWare"]),
    publishers: JSON.stringify(["Electronic Arts"]),
    description:
      "Are you prepared to lose everyone to save the galaxy? Mass Effect 2 is the second installment in the epic sci-fi series.",
    screenshots: JSON.stringify([]),
  },
  {
    rawgId: 4544,
    title: "Red Dead Redemption",
    released: "2010-05-18",
    backgroundImage:
      "https://media.rawg.io/media/games/686/686909717c3aa01518bc42ae2bf4259e.jpg",
    metacritic: 95,
    rating: 4.42,
    genres: JSON.stringify(["Action", "Adventure"]),
    platforms: JSON.stringify(["Xbox 360", "PlayStation 3", "Nintendo Switch"]),
    developers: JSON.stringify(["Rockstar San Diego"]),
    publishers: JSON.stringify(["Rockstar Games"]),
    description:
      "America, early 1900's. The era of the cowboy is coming to an end. When federal agents threaten his family, former outlaw John Marston is forced to pick up his guns again.",
    screenshots: JSON.stringify([]),
  },
  {
    rawgId: 3070,
    title: "Fallout 4",
    released: "2015-11-10",
    backgroundImage:
      "https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg",
    metacritic: 84,
    rating: 3.82,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["PC", "PlayStation 4", "Xbox One"]),
    developers: JSON.stringify(["Bethesda Game Studios"]),
    publishers: JSON.stringify(["Bethesda Softworks"]),
    description:
      "As the sole survivor of Vault 111, you enter a world destroyed by nuclear war. Every second is a fight for survival, and every choice is yours.",
    screenshots: JSON.stringify([]),
  },
  {
    rawgId: 274755,
    title: "Hades",
    released: "2020-09-17",
    backgroundImage:
      "https://media.rawg.io/media/games/1f4/1f47a270b8f241e4676b14d39ec620f7.jpg",
    metacritic: 93,
    rating: 4.54,
    genres: JSON.stringify(["Action", "Indie", "RPG"]),
    platforms: JSON.stringify([
      "PC",
      "Nintendo Switch",
      "PlayStation 5",
      "Xbox Series S/X",
    ]),
    developers: JSON.stringify(["Supergiant Games"]),
    publishers: JSON.stringify(["Supergiant Games"]),
    description:
      "Defy the god of the dead as you hack and slash out of the Underworld in this rogue-like dungeon crawler from the creators of Bastion.",
    screenshots: JSON.stringify([]),
  },
];

function calculateGK(userRating, metacritic) {
  if (userRating === null || userRating === undefined || !metacritic) {
    return { gameKnowledge: null, difference: null };
  }
  const criticRating = Number((metacritic / 10).toFixed(1));
  const diff = Number((userRating - criticRating).toFixed(1));
  const absDiff = Math.abs(diff);
  const score = Math.max(0, Math.min(100, 100 - absDiff * 10));
  return {
    gameKnowledge: Number(score.toFixed(1)),
    difference: diff,
  };
}

async function seedGames() {
  console.log(
    "🎮 Actualizando base de datos de videojuegos en Supabase con imágenes verificadas y plataformas múltiples...",
  );

  await prisma.userGame.deleteMany();
  await prisma.game.deleteMany();
  await prisma.gamerProfile.deleteMany();

  let totalXp = 0;

  for (const item of CURATED_GAMES) {
    const game = await prisma.game.create({
      data: {
        rawgId: item.rawgId,
        title: item.title,
        released: item.released,
        backgroundImage: item.backgroundImage,
        metacritic: item.metacritic,
        rating: item.rating,
        genres: item.genres,
        platforms: item.platforms,
        developers: item.developers,
        publishers: item.publishers,
        description: item.description,
        screenshots: item.screenshots,
      },
    });

    if (item.userGame) {
      const { gameKnowledge, difference } = calculateGK(
        item.userGame.userRating,
        item.metacritic,
      );

      await prisma.userGame.create({
        data: {
          gameId: game.id,
          status: item.userGame.status,
          userRating: item.userGame.userRating ?? null,
          hoursPlayed: item.userGame.hoursPlayed ?? null,
          platform: item.userGame.platform ?? null,
          review: item.userGame.review ?? null,
          completedDate: item.userGame.completedDate ?? null,
          gameKnowledge,
          difference,
        },
      });

      // Calcular XP Gamer
      if (item.userGame.status === "COMPLETED") totalXp += 150;
      else if (item.userGame.status === "PLATINUM") totalXp += 250;
      else if (item.userGame.status === "PLAYING") totalXp += 35;
      else if (item.userGame.status === "BACKLOG") totalXp += 15;

      if (item.userGame.review) totalXp += 50;
      if (gameKnowledge !== null && gameKnowledge >= 95) totalXp += 30;
      if (item.userGame.hoursPlayed) {
        totalXp += Math.min(
          200,
          Math.floor(item.userGame.hoursPlayed / 10) * 10,
        );
      }
    }
  }

  await prisma.gamerProfile.create({
    data: {
      id: "gamer-default",
      displayName: "Jose",
      avatarUrl:
        "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80",
      bio: "Apasionado de los RPGs narrativos, mundos abiertos densos y clásicos de Xbox 360 / PC.",
      totalXp,
    },
  });

  console.log(
    `✅ Base de datos de videojuegos actualizada con éxito. Juegos creados: ${CURATED_GAMES.length}. XP Gamer total: ${totalXp}`,
  );
}

seedGames()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
