const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CURATED_GAMES = [
  {
    rawgId: 3328,
    title: "The Witcher 3: Wild Hunt",
    released: "2015-05-18",
    backgroundImage: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10f6bcd13.jpg",
    metacritic: 92,
    rating: 4.66,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["PC", "PlayStation 5", "PlayStation 4", "Xbox One", "Nintendo Switch"]),
    developers: JSON.stringify(["CD PROJEKT RED"]),
    publishers: JSON.stringify(["CD PROJEKT RED"]),
    description: "The Witcher: Wild Hunt is a story-driven open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
    screenshots: JSON.stringify([
      "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266badb500.jpg",
      "https://media.rawg.io/media/screenshots/0b4/0b4e79d3d066717d00018178244018a9.jpg"
    ]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.4,
      hoursPlayed: 127,
      platform: "PC",
      review: "Narrativa colosal, misiones secundarias con más peso dramático que muchos juegos completos y una banda sonora inolvidable.",
      completedDate: new Date("2026-07-15T22:00:00Z")
    }
  },
  {
    rawgId: 3272,
    title: "Elden Ring",
    released: "2022-02-25",
    backgroundImage: "https://media.rawg.io/media/games/b29/b2960ad9e9d086783b3b446f5e463a8b.jpg",
    metacritic: 96,
    rating: 4.41,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["PC", "PlayStation 5", "PlayStation 4", "Xbox Series S/X"]),
    developers: JSON.stringify(["FromSoftware"]),
    publishers: JSON.stringify(["Bandai Namco Entertainment"]),
    description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    screenshots: JSON.stringify([
      "https://media.rawg.io/media/screenshots/a0a/a0a4c0a5a3a2e7c3e3e3b3a3c3e3a3e3.jpg"
    ]),
    userGame: {
      status: "PLATINUM",
      userRating: 9.8,
      hoursPlayed: 164,
      platform: "PC",
      review: "La cumbre del diseño de mundo abierto de FromSoftware. El sentido del descubrimiento no decae en ningún momento.",
      completedDate: new Date("2026-08-01T20:30:00Z")
    }
  },
  {
    rawgId: 28,
    title: "Red Dead Redemption 2",
    released: "2018-10-26",
    backgroundImage: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    metacritic: 97,
    rating: 4.58,
    genres: JSON.stringify(["Action", "Adventure"]),
    platforms: JSON.stringify(["PC", "PlayStation 4", "Xbox One"]),
    developers: JSON.stringify(["Rockstar Games"]),
    publishers: JSON.stringify(["Rockstar Games"]),
    description: "America, 1899. Arthur Morgan and the Van der Linde gang are outlaws on the run.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.7,
      hoursPlayed: 112,
      platform: "PlayStation 5",
      review: "Arthur Morgan es uno de los mejores personajes jamás escritos en la historia del entretenimiento interactivo.",
      completedDate: new Date("2026-05-10T19:00:00Z")
    }
  },
  {
    rawgId: 9767,
    title: "Hollow Knight",
    released: "2017-02-24",
    backgroundImage: "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
    metacritic: 87,
    rating: 4.41,
    genres: JSON.stringify(["Action", "Indie", "Platformer"]),
    platforms: JSON.stringify(["PC", "Nintendo Switch", "PlayStation 4", "Xbox One"]),
    developers: JSON.stringify(["Team Cherry"]),
    publishers: JSON.stringify(["Team Cherry"]),
    description: "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.6, // Hidden Gem: Tú 9.6 vs Crítica 8.7 (+0.9)
      hoursPlayed: 52,
      platform: "PC",
      review: "El pináculo absoluto del metroidvania moderno. Música, control y ambientación insuperables.",
      completedDate: new Date("2026-06-20T21:00:00Z")
    }
  },
  {
    rawgId: 41494,
    title: "Cyberpunk 2077",
    released: "2020-12-10",
    backgroundImage: "https://media.rawg.io/media/games/26d/26d44377d59666b35150d442070ab531.jpg",
    metacritic: 86,
    rating: 4.15,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["PC", "PlayStation 5", "Xbox Series S/X"]),
    developers: JSON.stringify(["CD PROJEKT RED"]),
    publishers: JSON.stringify(["CD PROJEKT RED"]),
    description: "Cyberpunk 2077 is an open-world, action-adventure story set in Night City.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.1,
      hoursPlayed: 88,
      platform: "PC",
      review: "Night City tras los parches y Phantom Liberty es el mundo cyberpunk más denso e inmersivo jamás creado.",
      completedDate: new Date("2026-07-28T23:15:00Z")
    }
  },
  {
    rawgId: 58134,
    title: "Starfield",
    released: "2023-09-06",
    backgroundImage: "https://media.rawg.io/media/games/5ec/5ecac9fdd3cad3cdd910f7694e86f474.jpg",
    metacritic: 83,
    rating: 3.12,
    genres: JSON.stringify(["RPG", "Action"]),
    platforms: JSON.stringify(["PC", "Xbox Series S/X"]),
    developers: JSON.stringify(["Bethesda Game Studios"]),
    publishers: JSON.stringify(["Bethesda Softworks"]),
    description: "Starfield is the first new universe in 25 years from Bethesda Game Studios.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "DROPPED",
      userRating: 5.2, // Overrated: Tú 5.2 vs Crítica 8.3 (-3.1)
      hoursPlayed: 24,
      platform: "PC",
      review: "Demasiadas pantallas de carga y exploración espacial sin alma. Muy por detrás de Skyrim.",
      completedDate: new Date("2026-04-05T18:00:00Z")
    }
  },
  {
    rawgId: 290856,
    title: "Baldur's Gate 3",
    released: "2023-08-03",
    backgroundImage: "https://media.rawg.io/media/games/699/699222d81ab55815805dd36931369b9b.jpg",
    metacritic: 96,
    rating: 4.54,
    genres: JSON.stringify(["RPG", "Strategy"]),
    platforms: JSON.stringify(["PC", "PlayStation 5", "Xbox Series S/X"]),
    developers: JSON.stringify(["Larian Studios"]),
    publishers: JSON.stringify(["Larian Studios"]),
    description: "Gather your party, and return to the Forgotten Realms in a tale of fellowship and betrayal.",
    screenshots: JSON.stringify([]),
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
    genres: JSON.stringify(["Action", "Adventure"]),
    platforms: JSON.stringify(["Nintendo Switch"]),
    developers: JSON.stringify(["Nintendo"]),
    publishers: JSON.stringify(["Nintendo"]),
    description: "An epic adventure across the land and skies of Hyrule awaits.",
    screenshots: JSON.stringify([]),
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
    genres: JSON.stringify(["Action", "Adventure"]),
    platforms: JSON.stringify(["PC", "PlayStation 5", "PlayStation 4"]),
    developers: JSON.stringify(["Sucker Punch Productions"]),
    publishers: JSON.stringify(["Sony Interactive Entertainment"]),
    description: "In the late 13th century, the Mongol empire has laid waste to entire nations.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "BACKLOG",
      platform: "PC"
    }
  }
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
  console.log("🎮 Sembrando base de datos de videojuegos en Supabase...");

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
        item.metacritic
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
        totalXp += Math.min(200, Math.floor(item.userGame.hoursPlayed / 10) * 10);
      }
    }
  }

  await prisma.gamerProfile.create({
    data: {
      id: "gamer-default",
      displayName: "Jose",
      avatarUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=200&auto=format&fit=crop&q=80",
      bio: "Apasionado de los RPGs narrativos, mundos abiertos densos y metroidvanias.",
      totalXp,
    },
  });

  console.log(`✅ Videojuegos sembrados con éxito. Juegos creados: ${CURATED_GAMES.length}. XP Gamer total: ${totalXp}`);
}

seedGames()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
