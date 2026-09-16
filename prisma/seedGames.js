const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const CURATED_GAMES = [
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
    "backgroundImage": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
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
    "rawgId": 339958,
    "title": "Persona 5 Royal",
    "released": "2019-10-31",
    "backgroundImage": "https://media.rawg.io/media/games/a9c/a9c789951de65da545d51f664b4f2ce0.jpg",
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
    "rawgId": 3387,
    "title": "Bloodborne",
    "released": "2015-03-24",
    "backgroundImage": "https://media.rawg.io/media/games/214/214b29aeff13a0ae6a70fc4426e85991.jpg",
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
    "rawgId": 22121,
    "title": "Celeste",
    "released": "2018-01-25",
    "backgroundImage": "https://media.rawg.io/media/games/594/59487800889ebac294c7c2c070d02356.jpg",
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
    "backgroundImage": "https://media.rawg.io/media/games/9aa/9aa42d16d425fa6f179fc9dc2f763647.jpg",
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
    "rawgId": 51325,
    "title": "The Last of Us Part II",
    "released": "2020-06-19",
    "backgroundImage": "https://media.rawg.io/media/games/909/909974d1c7863c2027241e265fe7011f.jpg",
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
      "Nintendo"
    ],
    "publishers": [
      "Nintendo"
    ],
    "description": "The Legend of Zelda: Breath of the Wild is an adventure game developed by Nintendo. It is the nineteenth installment in the series.\n\nAfter awakening from a hundred year sleep, memoryless Link hears a mysterious female voice that guides him to a destroyed kingdom of Hyrule. He finds a Wiseman who says that a ruthless creature, Calamity Ganon, was imprisoned for 100 years. Even though the creature is trapped, it is still gaining power. Link sets out to kill Ganon before he frees himself and destroys the world.\n\nIn contrast to the previous titles in the series, Breath of the Wild the player to explore a vast open world. At the beginning of the game, a small tutorial is given to the players and they are free to travel the world at the pace they see fit. Link can climb almost every surface in the world, cook food to restore health. Fast travel to certain places in the world is also available for the players. The world is highly interactive thanks to the chemistry engine.",
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
      "Santa Monica Studio"
    ],
    "publishers": [
      "Sony Interactive Entertainment",
      "PlayStation PC"
    ],
    "description": "It is a new beginning for Kratos. Living as a man outside the shadow of the gods, he ventures into the brutal Norse wilds with his son Atreus, fighting to fulfill a deeply personal quest. \r\n\r\nHis vengeance against the Gods of Olympus years behind him, Kratos now lives as a man in the realm of Norse Gods and monsters. It is in this harsh, unforgiving world that he must fight to survive… And teach his son to do the same. This startling reimagining of God of War deconstructs the core elements that defined the series—satisfying combat; breathtaking scale; and a powerful narrative—and fuses them anew. \r\n\r\nKratos is a father again. As mentor and protector to Atreus, a son determined to earn his respect, he is forced to deal with and control the rage that has long defined him while out in a very dangerous world with his son. \r\n\r\nFrom the marble and columns of ornate Olympus to the gritty forests, mountains, and caves of Pre-Viking Norse lore, this is a distinctly new realm with its own panthe",
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
      "Rockstar North",
      "Rockstar Games"
    ],
    "publishers": [
      "Rockstar Games"
    ],
    "description": "Rockstar Games went bigger, since their previous installment of the series. You get the complicated and realistic world-building from Liberty City of GTA4 in the setting of lively and diverse Los Santos, from an old fan favorite GTA San Andreas. 561 different vehicles (including every transport you can operate) and the amount is rising with every update. \nSimultaneous storytelling from three unique perspectives: \nFollow Michael, ex-criminal living his life of leisure away from the past, Franklin, a kid that seeks the better future, and Trevor, the exact past Michael is trying to run away from. \nGTA Online will provide a lot of additional challenge even for the experienced players, coming fresh from the story mode. Now you will have other players around that can help you just as likely as ruin your mission. Every GTA mechanic up to date can be experienced by players through the unique customizable character, and community content paired with the leveling system tends to keep everyone bu",
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
      "Valve Software"
    ],
    "publishers": [
      "Electronic Arts",
      "Valve"
    ],
    "description": "Portal 2 is a first-person puzzle game developed by Valve Corporation and released on April 19, 2011 on Steam, PS3 and Xbox 360. It was published by Valve Corporation in digital form and by Electronic Arts in physical form. \n\nIts plot directly follows the first game's, taking place in the Half-Life universe. You play as Chell, a test subject in a research facility formerly ran by the company Aperture Science, but taken over by an evil AI that turned upon its creators, GladOS. After defeating GladOS at the end of the first game but failing to escape the facility, Chell is woken up from a stasis chamber by an AI personality core, Wheatley, as the unkempt complex is falling apart. As the two attempt to navigate through the ruins and escape, they stumble upon GladOS, and accidentally re-activate her...\n\nPortal 2's core mechanics are very similar to the first game's ; the player must make their way through several test chambers which involve puzzles. For this purpose, they possess a Portal ",
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
      "Aspyr Media",
      "2K Australia",
      "Irrational Games"
    ],
    "publishers": [
      "2K Games",
      "Aspyr"
    ],
    "description": "The third game in the series, Bioshock takes the story of the underwater confinement within the lost city of Rapture and takes it in the sky-city of Columbia. Players will follow Booker DeWitt, a private eye with a military past; as he will attempt to wipe his debts with the only skill he’s good at – finding people. Aside from obvious story and style differences, this time Bioshock protagonist has a personality, character, and voice, no longer the protagonist is a silent man, trying to survive.\r\nOpen and bright level design of Columbia shows industrial colonial America in a seemingly endless carnival. But Bioshock is not famous for its visuals, but for its story.  Mystery and creative vision of Irrational Games invite players to uncover the secrets of Columbia’s leader - Zachary Comstock and save Elizabeth, the girl, that’s been locked up in the flying city since her birth.\r\nUnique weapons and mechanics of Vigor will make encounters different, helping players to adjust to the new found",
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
      "Bethesda Game Studios"
    ],
    "publishers": [
      "Bethesda Softworks"
    ],
    "description": "The fifth game in the series, Skyrim takes us on a journey through the coldest region of Cyrodiil. Once again player can traverse the open world RPG armed with various medieval weapons and magic, to become a hero of Nordic legends –Dovahkiin, the Dragonborn. After mandatory character creation players will have to escape not only imprisonment but a fire-breathing dragon. Something Skyrim hasn’t seen in centuries.",
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
      "Naughty Dog"
    ],
    "publishers": [
      "Sony Computer Entertainment",
      "PlayStation PC"
    ],
    "description": "Revisit the game that set a new bar for single-player narrative storytelling with The Last of Us™ and explore a ravaged and hardened world, where every action has a brutal consequence for Joel and Ellie.\n\nExperience the emotional storytelling and unforgettable characters in The Last of Us™, winner of over 200 Game of the Year awards.\n\nIn a ravaged civilization, where infected and hardened survivors run rampant, Joel, a weary protagonist, is hired to smuggle 14-year-old Ellie out of a military quarantine zone. However, what starts as a small job soon transforms into a brutal cross-country journey.",
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
      "BioWare"
    ],
    "publishers": [
      "Electronic Arts"
    ],
    "description": "Mass Effect II is a sequel to Mass Effect one, following the story of Captain Shepard in his or her journey in saving the Galaxy from Reapers. Just after the fight against Saren, Shepard dies and drifts in open space. Being collected by Cerberus and the lead man, The Illusive Man, Shepard has to investigate attacks on human colonies around the Milky Way, and discover that now the Reapers using some new insectoid called the Collectors. \r\n\r\nYou can choose from different classes to play, for example, a Soldier, Adept or Vanguard. A cover system is the main mechanic in the fight, as you have to think about fighting your enemy strategically. Your talents have a global CDR, so choose wisely. With one little addition, now your weapon has a loaded magazine of bullets, and you can run out of ammo if not using your weapon properly. \r\n\r\nBioWare sticks to the tradition of dialogue and reputation system, as your actions still affect your position in the world. If you act like a hero and help everyo",
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
      "Rockstar North",
      "Rockstar Games",
      "Double Eleven",
      "Rockstar San Diego"
    ],
    "publishers": [
      "Rockstar Games"
    ],
    "description": "Red Dead Redemption is a third-person open-world adventure game which implements the Wild West at its best: it is very much GTA-clone but in bizarre stylistics and the very beginning of the twentieth century. This is the second title of a franchise, being preceded by Red Dead Revolver and followed by Red Dead Redemption 2 coming out in late 2018. \nWe play as John Marston who gradually takes down and take out criminals and those, who crosses his path. Among the combat mechanics, the most interesting one is \"Dead Eye\" — it allows one to point multiple targets out in slow motion and then shoot them simultaneously. \nThe game features 16-players multiplayer and cooperative and also has zombie DLC — Undead Nightmare. Additional content adds two modes to the original game: undead overrun in which you have to survive an infinite amount of zombie waves, and Land Grab in which player has to defend the particular piece of land to gain control of it.",
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
      "Bethesda Game Studios"
    ],
    "publishers": [
      "Bethesda Softworks"
    ],
    "description": "The fourth game in the post-apocalyptic action RPG series from Bethesda studious brings players back to the retro-future. After customizing the facial features of the character, players will be admitted to the Vault 111 with their family, and tricked into entering the cryogenic capsule. After the rude awakening after the unknown amount of time has passed, the child is separated from the parents and the loving partner is killed in front of them – the main quest is settled. Now there’s only the giant open world to explore. Fallout 4 introduces the mechanics of settlement building, where players can build their own little town. Gathering material for crafting and building brings more “survival” elements into the old formula. Within their own settlements, players will be able to build all needed utilities, from storage spaces to power armor stations. Visual upgrade from the previous game brings life to what used to be brown wastelands, now filled with details and color.",
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
      "Supergiant Games"
    ],
    "publishers": [
      "Supergiant Games"
    ],
    "description": "Hades is a rogue-like dungeon crawler that combines the best aspects of Supergiant's critically acclaimed titles, including the fast-paced action of Bastion, the rich atmosphere and depth of Transistor, and the character-driven storytelling of Pyre.\n\nBATTLE OUT OF HELL\nAs the immortal Prince of the Underworld, you'll wield the powers and mythic weapons of Olympus to break free from the clutches of the god of the dead himself, while growing stronger and unraveling more of the story with each unique escape attempt.\n\nUNLEASH THE FURY OF OLYMPUS\nThe Olympians have your back! Meet Zeus, Athena, Poseidon, and many more, and choose from their dozens of powerful Boons that enhance your abilities. There are thousands of viable character builds to discover as you go.\n\nBEFRIEND GODS, GHOSTS, AND MONSTERS\nA fully-voiced cast of colorful, larger-than-life characters is waiting to meet you! Grow your relationships with them, and experience hundreds of unique story events as you learn about what's re",
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
      "Crystal Dynamics"
    ],
    "publishers": [
      "Square Enix"
    ],
    "description": "A cinematic revival of the series in its action third person form, Tomb Rider follows Lara in her least experience period of life – her youth. Heavily influenced by Naughty Dog’s “Uncharted”, the game is a mix of everything, from stealth and survival to combat and QTE action scenes.\r\nYoung Lara Croft arrives on the Yamatai, lost island near Japan, as the leader of the expedition in search of the Yamatai Kingdom, with a diverse team of specialists. But shipwreck postponed the successful arrival and seemingly forgotten island is heavily populated with hostile inhabitants, cultists of Solarii Brotherhood.\r\nThe game will be graphic at times, especially after failed QTE’s during some of the survival scenes, but overall players will enjoy classic action adventure, reminiscent of the beginning of the series. This game is not a direct sequel or continuation of existing sub-series within the franchise, but a reboot, setting up Tomb Raider to represent modern gaming experience.\r\nThe game has RPG",
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
      "Psyonix"
    ],
    "publishers": [
      "Psyonix"
    ],
    "description": "Highly competitive soccer game with rocket-cars is the most comprehensive way to describe this game. Technically a sequel to Psyonix’ previous game - Supersonic Acrobatic Rocket-Powered Battle-Cars; Rocket League successfully became a standalone sensation, that can be enjoyed by anyone. Easy to learn, hard to master game mechanics are perfect for the tight controls. Players are invited to maneuver the different fields within several game modes, from arcade to ranked game either 1v1, or in 2v2 and 3v3 teams. Using boosters will not only speed up the car but will allow the car to propel itself into the air.\r\nRocket League provides several levels of customization, where not only the color of your car can be adjusted, but the colors and form of the booster flame, different hats, and little flags. Or players can pick a completely different car. Collaboration with different franchises brought not only original transport but some famous cars, including Batmobile or Delorian from Back to the F",
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
      "Double Eleven",
      "Playdead",
      "鱼俞"
    ],
    "publishers": [
      "Microsoft Studios",
      "Playdead",
      "鱼俞"
    ],
    "description": "This popular 2D puzzle-platformer creates the atmosphere of isolation, where the player alone can guide the nameless protagonist to his destination. Hostile environments and one-hit deaths may seem difficult, but the game implements a fair amount of checkpoints. The monochrome color palette showcases cartoony proportions of every living thing while making lack of details threatening. Limbo shows you exactly what you encounter, but never how it looks.\n\nLimbo uses the atmosphere and sound design of the horror genre while avoiding tropes of the modern horror games. The overarching theme and unique style compensated for the rather short game with an abrupt ending, making Limbo one of the most impactful games for the genre.\n\nThe simple controls and easy-to-pick-up mechanics help to make a clear distinction, which part of the stage players can interact with, and which part can lead to the quick death. Even though the game is in black and white, this separation is intuitive and natural, so th",
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
      "Engine Software",
      "Codeglue",
      "Pipeworks Studio",
      "Re-Logic"
    ],
    "publishers": [
      "505 Games",
      "Headup Games",
      "Spike Chunsoft",
      "Re-Logic"
    ],
    "description": "Terraria is a 2D action adventure sandbox game, where players create a character and gather resources in order to gradually craft stronger weapons and armor. Players create randomly generated maps that contain different locations within it, and by gathering specific resources and triggering special events, players will fight one of the many in-game bosses. Created characters can be played on different maps.\r\nThe game introduces hundreds of unique items that can be found across the entirety of the map, some of which may not even be encountered. \r\nTerraria have many different Biomes and areas with distinct visuals, containing resources and enemies unique to this biome. After gathering materials, players can craft furniture, and build settlements and houses, since after completing events or finding specific items NPCs will start to arrive, and will require player’s protection. Terraria can be played on three difficulties and has a large modding community.",
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
      "Valve Software",
      "NVIDIA Lightspeed Studios"
    ],
    "publishers": [
      "Valve",
      "Buka Entertainment",
      "NVIDIA",
      "CyberFront"
    ],
    "description": "Every single time you click your mouse while holding a gun, you expect bullets to fly and enemies to fall. But here you will try out the FPS game filled with environmental puzzles and engaging story. \r\nSilent template for your adventures, Chell, wakes up in a testing facility. She’s a subject of experiments on instant travel device, supervised by snarky and hostile GLaDOS.\r\nPlayers will have to complete the tests, room by room, expecting either reward, freedom or more tests. By using the gun, that shoots portals (Portal-Gun™), players will move blocks, travel great distance quickly and learn about your current situation, which is unraveled through environmental storytelling. What you will be told might be different from what you will see.\r\nWhite environments will guide the player’s portal placement, forcing them to pay attention to the surroundings.  Portal creates tension, allowing either solving puzzles at your own leisure or moving quickly, due to the time limit or threats.",
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
      "Valve Software",
      "Turtle Rock Studios"
    ],
    "publishers": [
      "Electronic Arts",
      "Valve",
      "Akella"
    ],
    "description": "Cooperative survival continues with a different set of characters. New survivors are making their way through 5 campaigns with an added ability to play through the story of the first game as well, using not only expanded arsenal of 20 ranged and 10 melee weapons but improved AI Director. Your surroundings and weather will change; enemy and item placement will differ from map to map, from difficulty to difficulty. New unique special zombies, placed in the unlucky for the player spot, can end your run.\r\nHigh compatibility with community mods will allow you not only to add user-created maps but player models, enemy models, and even in-game music, which will help any player to create the unique experience on top of solid game mechanics.\r\nCompetitive multiplayer mods from arena survival to a head-on competition with another team of survivors are addictive and, in addition to the campaign, will provide you with hundreds of hours of game content.",
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
      "Respawn Entertainment"
    ],
    "publishers": [
      "Electronic Arts"
    ],
    "description": "Conquer with character in Apex Legends, a free-to-play* Battle Royale shooter where legendary characters with powerful abilities team up to battle for fame and fortune on the fringes of the Frontier. Master an ever-growing roster of diverse legends, deep tactical squad play, and bold new innovations that level-up the Battle Royale experience—all within a rugged world where anything goes. Welcome to the next evolution of Battle Royale.\n\nCharacters you can play as: Caustic, Bangalore, Bloodhound, Crypto, Gibraltar, Lifeline, Loba, Mirage, Octane, Pathfinder, Rampart, Revenant.",
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
      "NVIDIA Lightspeed Studios",
      "Team Meat"
    ],
    "publishers": [
      "Microsoft Studios",
      "BlitWorks"
    ],
    "description": "Super Meat Boy is a fast-paced 2D platform game that rewards mechanical perfection and accuracy of controls. Meat Boy has to save Bandage Girl from Doctor Fetus, by completing the platforming challenges. The game has 5 main worlds, each consisting of 20 light levels, 20 dark and harder versions of those levels and a boss fight. Meat Boy has only one life and cannot take any damage, but there is no limit on attempts, so players can try and fail the stage until they get it right or collect special bandages. Unique replay system will show the player every try they made at the same time right after they completed the level.\nSuper Meat boy has multiple characters, some of them are a different skin for Meat Boy and in-game adaptations of other indie-game protagonists, that can be unlocked by completing their special challenge levels, hidden somewhere in the campaign; or by collecting set amount of bandages. Players will be able to choose any unlocked character for any level from the main men",
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
      "Electronic Arts DICE"
    ],
    "publishers": [
      "Electronic Arts"
    ],
    "description": "Refreshing look of Mirror’s Edge made this first-person action platformer recognizable even by people who have never played it before. The City of the “utopian” society is highly monitored by the totalitarian military groups. \nPlayers will take control of the female protagonist, named Faith, a specially trained Runner, master of parkour that delivers physical documents in the city, where every form of communication is watched. Her sister is framed for murder, and Faith must follow the clues to the identity of the murderer, with only lead being a note saying Icarus.\nDistinct visuals of the game form the bright white city, which Faith has to navigate through, jumping across rooftops, running on walls and climbing scaffolding. Color-coded elements of the environment guiding players as to where they can progress. Special attention to the camera that will bob up in down in accordance with the movement, trying to recreate the actual vision, and not a fixed video feed. Even though Mirror’s Ed",
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
      "Naughty Dog"
    ],
    "publishers": [
      "Sony Computer Entertainment"
    ],
    "description": "Uncharted 4 is the final installment in the Uncharted series. The story follows Nathan Drake for the last time as he now searches for Captain Henry Avery's treasure. \r\n\r\nIntroducing new characters such as Samuel Drake, with Sam and Sully Nathan agrees to find the treasure of the Gunsway heist in 1695. As antagonists, Nathan must face Rafe Adler and Nadine Ross while they are also trying to find this treasure and Nathan must face details about Sam's past.\r\n\r\nNow changing the game's concept, Naughty Dog made locations much bigger and more explorable. Expanding the story behind Henry Avery's actions in history the story once again feels like Indiana Jones kind of adventure. The grappling hook, climbing on rocks and mountains, or diving from the top, Nathan still engages into hand to hand combat with his enemies as well as using firearms. Nolan North, Emily Rose, and Richard McGonagle return to the final installment in the series to say farewell to the story of Nathan Drake for the last ti",
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
      "Feral Interactive",
      "Digital Extremes",
      "2K Australia",
      "2K Marin",
      "Virtuos",
      "2K China",
      "Blind Squirrel",
      "2K Boston"
    ],
    "publishers": [
      "2K Games",
      "Feral Interactive",
      "Take Two Interactive"
    ],
    "description": "BioShock is set in an alternate dimension in 1960. Our main protagonist Jack is the sole survivor of a plane crash in the Atlantic Ocean. With help, he gets to the Rapture - underwater city created by Andrew Ryan that wanted to create a utopia. After arriving in the city, however, he discovers Little Sisters and Big Daddies, and it is clear to Jack that there is something not okay with the city. \n\nBeing a first-person shooter, BioShock works with an active weapon and a plasmid, on the other hand, giving the player the ability to use some supernatural powers and developing unique combos with it. Many of the weapons have different types of ammunition that are effective against some specific types of enemies. Same goes for plasmids, as you need to know weapon will be effective. By retrieving EVE, you will be able to fill your resources and use plasmid once more. Although the economics of the game is more complicated as you need to gather money for refilling resources and ADAM for purchasi",
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
      "Volition"
    ],
    "publishers": [
      "THQ"
    ],
    "description": "Welcome to Steelport, a city that’s been torn by the three violent gangs. And seemingly, only another violent gang can stop them. After merging with Ultor Corporation after the events of the second game, Boss and his lieutenants became a corporation of their own. And now, after a run-in with the corrupt police forces, when they’re in the hands of the Syndicate, alone and cut out from the gathered wealth and support, 3rd Street Saints have to start from the bottom. \r\nWhile being a third person action adventure game, Saints Row: the Third is described by developers as the game that has everything in it. While the base game is reminiscent of GTA type of games mechanically, shifting tone and frantic story create the comedic and exciting atmosphere. A long line of DLC adding to the game not only unique missions, even by the Saints Row standards, but customization items, transport, and outfits. Reviews adore the lack of serious tone and gritty realism.",
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
      "Chucklefish",
      "ConcernedApe"
    ],
    "publishers": [
      "Chucklefish",
      "ConcernedApe"
    ],
    "description": "The hero (in the beginning you can choose gender, name and appearance) - an office worker who inherited an abandoned farm. The landscape of the farm can also be selected. For example, you can decide whether there will be a river nearby for fishing.\nThe farm area needs to be cleared, and it will take time.\nThe hero has many different activities: plant and care for plants, raise livestock, practice crafts, extract ore, and also enter into relationships with residents of the neighbouring town to earn game money. Relationships with characters include communication, performing tasks for money, exchanging, searching for fossils and even military actions and marrying. The character is limited by the reserve of strength and health - both parameters are visible on the screen, and the game automatically puts the hero to rest if the limit of his capabilities is close. The game does not set any ultimate or primary goal, its many possibilities are designed for an unlimited time.",
    "screenshots": []
  }
];

function calculateGK(userRating, metacritic) {
  if (userRating === null || userRating === undefined || metacritic === null || metacritic === undefined) {
    return { gameKnowledge: null, difference: null };
  }
  const criticNormalized = Number((metacritic / 10).toFixed(1));
  const diff = Number((userRating - criticNormalized).toFixed(1));
  const absDiff = Math.abs(diff);
  const score = Math.max(0, Math.min(100, 100 - absDiff * 10));
  return {
    gameKnowledge: Number(score.toFixed(1)),
    difference: diff,
  };
}

async function seedGames() {
  console.log("🎮 Sembrando base de datos gamer con catálogo ampliado y verificado...");
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
        genres: JSON.stringify(item.genres),
        platforms: JSON.stringify(item.platforms),
        developers: JSON.stringify(item.developers),
        publishers: JSON.stringify(item.publishers),
        description: item.description,
        screenshots: JSON.stringify(item.screenshots),
      },
    });

    if (item.userGame) {
      const { gameKnowledge, difference } = calculateGK(item.userGame.userRating, item.metacritic);

      await prisma.userGame.create({
        data: {
          gameId: game.id,
          status: item.userGame.status,
          userRating: item.userGame.userRating ?? null,
          hoursPlayed: item.userGame.hoursPlayed ?? null,
          platform: item.userGame.platform ?? null,
          review: item.userGame.review ?? null,
          completedDate: item.userGame.completedDate ? new Date(item.userGame.completedDate) : null,
          gameKnowledge,
          difference,
        },
      });

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
      bio: "Completista empedernido. Fan de FromSoftware, los RPGs densos y los indies con alma.",
      totalXp,
    },
  });

  console.log(`✅ Base de datos Gamer sembrada con éxito. Juegos: ${CURATED_GAMES.length}. XP: ${totalXp}`);
}

seedGames()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
