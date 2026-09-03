import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateGameKnowledge } from '@/lib/gameKnowledge';

const CURATED_GAMES = [
  {
    rawgId: 3328,
    title: "The Witcher 3: Wild Hunt",
    released: "2015-05-18",
    backgroundImage: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    metacritic: 92,
    rating: 4.66,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["PC", "PlayStation 5", "PlayStation 4", "Xbox One", "Nintendo Switch"]),
    developers: JSON.stringify(["CD PROJEKT RED"]),
    publishers: JSON.stringify(["CD PROJEKT RED"]),
    description: "The Witcher: Wild Hunt is a story-driven open world role-playing game set in a visually stunning fantasy universe full of meaningful choices and impactful consequences.",
    screenshots: JSON.stringify([
      "https://media.rawg.io/media/screenshots/1ac/1ac19f31974314855ad7be266badb500.jpg"
    ]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.4,
      hoursPlayed: 127,
      platform: "PC (Steam), PlayStation 5",
      review: "Narrativa colosal, misiones secundarias con más peso dramático que muchos juegos completos y una banda sonora inolvidable.",
      completedDate: new Date("2026-07-15T22:00:00Z")
    }
  },
  {
    rawgId: 326243,
    title: "Elden Ring",
    released: "2022-02-25",
    backgroundImage: "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg",
    metacritic: 95,
    rating: 4.41,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["PC", "PlayStation 5", "PlayStation 4", "Xbox Series S/X"]),
    developers: JSON.stringify(["FromSoftware"]),
    publishers: JSON.stringify(["Bandai Namco Entertainment"]),
    description: "Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "PLATINUM",
      userRating: 9.8,
      hoursPlayed: 164,
      platform: "PC (Steam), PlayStation 5",
      review: "La cumbre del diseño de mundo abierto de FromSoftware. El sentido del descubrimiento no decae en ningún momento.",
      completedDate: new Date("2026-08-01T20:30:00Z")
    }
  },
  {
    rawgId: 41494,
    title: "Cyberpunk 2077",
    released: "2020-12-10",
    backgroundImage: "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
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
      platform: "PC (Steam)",
      review: "Night City tras los parches y Phantom Liberty es el mundo cyberpunk más denso e inmersivo jamás creado.",
      completedDate: new Date("2026-07-28T23:15:00Z")
    }
  },
  {
    rawgId: 324997,
    title: "Baldur's Gate 3",
    released: "2023-08-03",
    backgroundImage: "https://media.rawg.io/media/games/699/69907ecf13f172e9e144069769c3be73.jpg",
    metacritic: 97,
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
      platform: "PC (Steam), Steam Deck"
    }
  },
  {
    rawgId: 28,
    title: "Red Dead Redemption 2",
    released: "2018-10-26",
    backgroundImage: "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    metacritic: 96,
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
      platform: "PlayStation 5, PC (Epic Games)",
      review: "Arthur Morgan es uno de los mejores personajes jamás escritos en la historia del entretenimiento interactivo.",
      completedDate: new Date("2026-05-10T19:00:00Z")
    }
  },
  {
    rawgId: 9767,
    title: "Hollow Knight",
    released: "2017-02-24",
    backgroundImage: "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
    metacritic: 88,
    rating: 4.41,
    genres: JSON.stringify(["Action", "Indie", "Platformer"]),
    platforms: JSON.stringify(["PC", "Nintendo Switch", "PlayStation 4", "Xbox One"]),
    developers: JSON.stringify(["Team Cherry"]),
    publishers: JSON.stringify(["Team Cherry"]),
    description: "Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.6,
      hoursPlayed: 52,
      platform: "Nintendo Switch, PC (Steam)",
      review: "El pináculo absoluto del metroidvania moderno. Música, control y ambientación insuperables.",
      completedDate: new Date("2026-06-20T21:00:00Z")
    }
  },
  {
    rawgId: 5563,
    title: "Fallout: New Vegas",
    released: "2010-10-19",
    backgroundImage: "https://media.rawg.io/media/games/995/9951d9d55323d08967640f7b9ab3e342.jpg",
    metacritic: 84,
    rating: 4.44,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["PC", "Xbox 360", "PlayStation 3"]),
    developers: JSON.stringify(["Obsidian Entertainment"]),
    publishers: JSON.stringify(["Bethesda Softworks"]),
    description: "Welcome to Vegas. New Vegas. It’s the kind of town where you dig your own grave prior to being shot in the head.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.5,
      hoursPlayed: 94,
      platform: "Xbox 360, PC (Steam)",
      review: "El mejor RPG de la era moderna. Las facciones, las opciones de diálogo y las consecuencias de tus actos no tienen rival.",
      completedDate: new Date("2026-03-12T17:00:00Z")
    }
  },
  {
    rawgId: 28589,
    title: "Halo 3",
    released: "2007-09-25",
    backgroundImage: "https://media.rawg.io/media/games/982/982ff61d574fed5e416cb1867b40d9b0.jpg",
    metacritic: 91,
    rating: 4.35,
    genres: JSON.stringify(["Action", "Shooter"]),
    platforms: JSON.stringify(["Xbox 360", "PC"]),
    developers: JSON.stringify(["Bungie"]),
    publishers: JSON.stringify(["Microsoft Studios"]),
    description: "The epic saga continues with Halo 3, the much-anticipated sequel to the highly successful and critically acclaimed Halo franchise.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "COMPLETED",
      userRating: 9.3,
      hoursPlayed: 45,
      platform: "Xbox 360",
      review: "La era dorada de Xbox 360. La campaña cooperativa y el multijugador marcaron una generación entera.",
      completedDate: new Date("2026-02-18T16:00:00Z")
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
      userRating: 5.2,
      hoursPlayed: 24,
      platform: "PC (Game Pass)",
      review: "Demasiadas pantallas de carga y exploración espacial sin alma. Muy por detrás de Skyrim.",
      completedDate: new Date("2026-04-05T18:00:00Z")
    }
  },
  {
    rawgId: 5538,
    title: "Dark Souls",
    released: "2011-09-22",
    backgroundImage: "https://media.rawg.io/media/games/582/582b5518a52f5086d15dde128264b94d.jpg",
    metacritic: 89,
    rating: 4.38,
    genres: JSON.stringify(["Action", "RPG"]),
    platforms: JSON.stringify(["Xbox 360", "PlayStation 3", "PC"]),
    developers: JSON.stringify(["FromSoftware"]),
    publishers: JSON.stringify(["Bandai Namco Entertainment"]),
    description: "Dark Souls will be the most deeply challenging game you play this year.",
    screenshots: JSON.stringify([]),
    userGame: {
      status: "BACKLOG",
      platform: "PlayStation 3, Xbox 360"
    }
  }
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const action = body.action || 'wipe';

    if (action === 'wipe') {
      // Limpiar datos de videojuegos del usuario
      await prisma.userGame.deleteMany();
      await prisma.game.deleteMany();
      await prisma.gamerProfile.upsert({
        where: { id: 'gamer-default' },
        update: { totalXp: 0 },
        create: {
          id: 'gamer-default',
          displayName: 'Gamer',
          totalXp: 0,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Base de datos de videojuegos restablecida a cero correctamente.',
      });
    }

    if (action === 'seed') {
      // Re-sembrar catálogo de videojuegos de demostración
      await prisma.userGame.deleteMany();
      await prisma.game.deleteMany();

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
          let gameKnowledge: number | null = null;
          let difference: number | null = null;

          if (
            typeof item.userGame.userRating === 'number' &&
            typeof item.metacritic === 'number'
          ) {
            const res = calculateGameKnowledge(
              item.userGame.userRating,
              item.metacritic
            );
            gameKnowledge = res.gameKnowledge;
            difference = res.difference;
          }

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

          if (item.userGame.status === 'COMPLETED') totalXp += 150;
          else if (item.userGame.status === 'PLATINUM') totalXp += 250;
          else if (item.userGame.status === 'PLAYING') totalXp += 35;
          else if (item.userGame.status === 'BACKLOG') totalXp += 15;

          if (item.userGame.review) totalXp += 50;
          if (gameKnowledge !== null && gameKnowledge >= 95) totalXp += 30;
          if (item.userGame.hoursPlayed) {
            totalXp += Math.min(200, Math.floor(item.userGame.hoursPlayed / 10) * 10);
          }
        }
      }

      await prisma.gamerProfile.upsert({
        where: { id: 'gamer-default' },
        update: { totalXp },
        create: {
          id: 'gamer-default',
          displayName: 'Jose',
          totalXp,
        },
      });

      return NextResponse.json({
        success: true,
        message: 'Catálogo de videojuegos de demostración cargado con éxito.',
      });
    }

    return NextResponse.json({ error: 'Acción no válida' }, { status: 400 });
  } catch (error) {
    console.error('Error en /api/games/admin/reset:', error);
    return NextResponse.json(
      { error: 'Error al gestionar la base de datos de videojuegos' },
      { status: 500 }
    );
  }
}
