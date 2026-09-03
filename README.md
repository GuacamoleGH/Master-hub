# 🛸 Master Hub: Multi-Universo Personal (Cinephile & Gamer Hub)

> Centro de mando unificado de nivel comercial que fusiona un **Launcher Genérico y Modular** con dos universos independientes de entretenimiento: **Cinephile Hub** (Cine, Plataformas de Streaming y Ball Knowledge) y **Gamer Hub** (Videojuegos, Multi-Plataforma, RAWG y Game Knowledge con Metacritic). Desplegado en **Vercel** con base de datos en la nube en **Supabase PostgreSQL**.

---

## 🏛️ Arquitectura del Proyecto

```
prueba/
├── repair-git.bat             # Script de 1-clic para reparar índice de Git en Windows
├── prisma/
│   ├── schema.prisma          # Modelos Movie, UserMovie, Game, UserGame, GamerProfile
│   ├── seed.js                # Sembrador inicial para Cinephile Hub
│   └── seedGames.js           # Sembrador de videojuegos verificados para Gamer Hub
├── src/
│   ├── app/
│   │   ├── page.tsx           # Launcher Genérico (Centro de Mando)
│   │   ├── layout.tsx         # Layout global con cabecera y pie dinámicos
│   │   ├── movies/            # Cinephile Hub (Home de Cine)
│   │   ├── movie/[id]/        # Ficha interactiva de película
│   │   ├── watchlist/         # Películas pendientes
│   │   ├── watched/           # Películas vistas con filtros
│   │   ├── profile/           # Perfil cinéfilo y analítica de Ball Knowledge
│   │   ├── search/            # Búsqueda en catálogo de cine (TMDB)
│   │   ├── games/             # Gamer Hub (Home de Videojuegos)
│   │   ├── games/[id]/        # Ficha de videojuego (trailers, screenshots, veredicto)
│   │   ├── games/backlog/     # Backlog de videojuegos pendientes
│   │   ├── games/completed/   # Videojuegos completados y platino
│   │   ├── games/profile/     # Perfil Gamer, Critic vs You y Hot Takes
│   │   ├── games/search/      # Buscador de videojuegos con RAWG API
│   │   └── api/               # Endpoints REST para cine, juegos y perfiles
│   ├── components/
│   │   ├── DynamicNavHeader.tsx # Barra de navegación inteligente según ruta
│   │   ├── DynamicFooter.tsx    # Pie de página dinámico por universo
│   │   ├── MovieCard.tsx        # Tarjeta cinéfila
│   │   ├── MoviePoster.tsx      # Carátula con fallback resiliente
│   │   ├── ReviewModal.tsx      # Modal de valoración de películas
│   │   ├── StreamingBadge.tsx   # Plataformas de streaming (+ Pirata 🏴‍☠️)
│   │   └── games/
│   │       ├── GameCard.tsx             # Tarjeta gamer amplia (aspect 4/3)
│   │       ├── GamePoster.tsx           # Carátula gamer resiliente
│   │       ├── GameHeader.tsx           # Barra de navegación cibernética
│   │       ├── GameReviewModal.tsx      # Registro multi-plataforma y horas
│   │       ├── PlatformBadge.tsx        # Insignias de consolas / tiendas
│   │       ├── EditGamerProfileModal.tsx # Modal para editar perfil gamer y avatar
│   │       ├── GameKnowledgeBadge.tsx   # Sello de sintonía con Metacritic
│   │       ├── GamerLevelBar.tsx        # Progreso de nivel y XP gamer
│   │       ├── CriticVsYouChart.tsx     # Gráfico comparativo interactivo
│   │       └── HotTakesTable.tsx        # Ranking de Overrated y Based
│   ├── lib/
│   │   ├── prisma.ts          # Cliente Prisma ORM compartido
│   │   ├── tmdb.ts            # Integración con The Movie Database
│   │   ├── rawg.ts            # Integración con RAWG Video Games API
│   │   ├── platforms.ts       # Catálogo de plataformas (Steam, Epic, Xbox 360, PS3...)
│   │   ├── ballKnowledge.ts   # Motor matemático de Ball Knowledge (Cine)
│   │   └── gameKnowledge.ts   # Motor matemático de Game Knowledge (Videojuegos)
│   └── types/
│       ├── movie.ts           # Tipos TypeScript para cine
│       └── game.ts            # Tipos TypeScript para videojuegos
```

---

## ✨ Características Principales

### 1. 🛸 Launcher Genérico (`/`)
* Pantalla de bienvenida modular para acceder a cualquier universo activo.
* Tarjeta con estadísticas en vivo de Cinephile Hub.
* Tarjeta con estadísticas en vivo de Gamer Hub.
* Espacio modular ("Próximamente...") para futuros módulos (Anime, Libros, etc.).

### 2. 🎮 Gamer Hub (`/games/...`)
* **Integración RAWG API:** Catálogo de más de 500.000 videojuegos con carátulas, screenshots y trailers oficiales.
* **Soporte Multi-Plataforma:** Posibilidad de registrar un juego completado en varias consolas/tiendas (ej. *PC (Steam)* y *PlayStation 5*).
* **Catálogo Retro & Old Gen:** Soporte para PC (Steam, Epic, GOG, Game Pass), Xbox (Xbox 360, One, Series, Clásica), PlayStation (PS5, PS4, PS3, PS2, PS1, Vita), Nintendo (Switch, Wii, GameCube, N64, 3DS, GBA) y Steam Deck.
* **Seguimiento de Horas Jugadas:** Registro de horas totales acumuladas en tu vida.
* **Motor Game Knowledge (GK):**
  $$\text{Game Knowledge (\%)} = \max\left(0,\, 100 - (|\text{Tu Nota} - \text{Nota Metacritic}| \times 10)\right)$$
* **Tus Hot Takes 🔥:** Detección de títulos sobrevalorados por la prensa (*Biggest Overrated*) y joyas ocultas (*Hidden Gems*).
* **Perfil Gamer Editable:** Cambia tu nombre de jugador, biografía y avatar con vista previa inmediata.

### 3. 🎬 Cinephile Hub (`/movies/...`)
* Catálogo cinematográfico conectado a **TMDB**.
* Selección de plataformas de streaming donde la viste (Netflix, HBO Max, Prime Video, Disney+, Apple TV+, Movistar Plus+, Filmin o **🏴‍☠️ Pirata**).
* Motor de **Ball Knowledge** frente al consenso de IMDb.
* Historial de películas vistas y Watchlist con filtros por plataforma y género.

---

## 🛠️ Comandos Útiles

### Iniciar en local:
```bash
npm run dev
# o para producción:
npm run build
npm run start
```

### Sembrar datos en Supabase:
```bash
npm run db:seed:all     # Siembra cine y videojuegos
npm run db:seed         # Solo cine
npm run db:seed:games   # Solo videojuegos
```

### 🌿 Crear una nueva rama en GitHub para esta actualización:
Si deseas crear una nueva rama limpia en tu repositorio con todo este código organizado:

```bash
# 1. Crear y cambiarte a una nueva rama (ej. v2-master-hub)
git checkout -b v2-master-hub

# 2. Subir tu nueva rama a GitHub
git push -u origin v2-master-hub
```

### 🩹 Reparar el error de índice de Git en Windows (`repair-git.bat`):
Si en tu consola de Windows alguna vez te sale `fatal: .git/index: index file smaller than expected`, simplemente ejecuta en la raíz del proyecto:
```bash
repair-git.bat
```
