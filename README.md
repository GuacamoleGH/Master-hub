# 🛸 Master Hub: Multi-Universo Personal (Cinephile & Gamer Hub)

> Centro de mando unificado de nivel comercial que fusiona un **Launcher Genérico y Modular** con dos universos independientes de entretenimiento: **Cinephile Hub** (Cine, Series, Streaming y Sofa Knowledge 🛋️) y **Gamer Hub** (Videojuegos, Multi-Plataforma, RAWG y Game Knowledge con Metacritic). Con sistema completo de **Autenticación Multi-Usuario, Ranking Global, Muros de Reseñas y Perfiles Públicos (v3.0)**. Desplegado en **Vercel** con base de datos en la nube en **Supabase PostgreSQL**.

---

## 🚀 Novedades de la Versión 3.0 (User Management & Social Hub)

- 🔐 **Autenticación & Cuentas de Usuario:**
  - Sistema de cuentas mediante **NextAuth.js** con registro seguro por credenciales (contraseñas hasheadas con `bcryptjs`).
  - Inicio de sesión social integrado con **Google OAuth** y **Discord OAuth**.
  - Modo **Invitado** transparente: navegación y lectura libres del catálogo y reseñas; redirección inteligente a `/login?callbackUrl=...` al intentar editar perfiles o interactuar con el sistema personal.
- 💬 **Muros Críticos de Reseñas Comunitarias (`/reviews` y `/games/reviews`):**
  - Espacios dedicados para explorar las opiniones de la comunidad divididas por universo:
    - Cine & Series (`/reviews` o `/resenas`).
    - Videojuegos (`/games/reviews` o `/games/resenas`).
  - Buscador reactivo en vivo por título, usuario crítico o texto.
  - Criterios de ordenación:
    - 🕒 **Más recientes**: Últimas opiniones publicadas.
    - ⭐ **Mayor nota**: Las mejores joyas valoradas.
    - 🔥 **Hot Takes**: Menor nota y opiniones más controvertidas frente a la crítica oficial.
  - Tarjetas de reseña con carátula de alta resolución, insignia de Ball/Game Knowledge, spoiler warning y timestamp.
- 🏆 **Salón de la Fama & Leaderboard Global (`/leaderboard`):**
  - Podio interactivo con los 3 usuarios más destacados.
  - Pestañas independientes: **General**, **Cine & Series** y **Videojuegos**.
  - Sistema de puntuación Master Hub Score calculado en base a volumen de visionados/juegos, nivel y precisión cultural.
- 👤 **Perfiles Públicos de Usuario (`/u/[username]`):**
  - Enlaces públicos compartibles con biografía, estadísticas de carrera, desglose de calificaciones y afinidad cultural entre usuarios.
  - **Top 4 Favoritos:** Muestra destacada de tus 4 películas/series y videojuegos predilectos.
- 🎨 **Modales de Edición de Perfil & Insignias Temáticas:**
  - Modales emergentes (`EditCinephileProfileModal` y `EditGamerProfileModal`) con selector de 16 avatares vectoriales prediseñados (Claqueta de Oro, Gafas 3D, Cyber Gamepad, Trofeo Platino, etc.) o URL de imagen externa.
  - Botón hover en avatar centrado milimétricamente tanto en modo invitado ("Entrar") como en autenticado ("Cambiar").
- 🔊 **Audio Háptico Web & Efectos de Sonido:**
  - Efectos auditivos sutiles en clicks, guardados y aperturas (`lib/sounds.ts`) con selector de sonido (`SoundToggle`) en la barra de navegación.

---

## 🏛️ Arquitectura del Proyecto

```
prueba/
├── repair-git.bat             # Script de 1-clic para reparar índice de Git en Windows
├── prisma/
│   ├── schema.prisma          # Modelos User, Account, Session, Movie, UserMovie, Series, Game, UserGame
│   ├── seed.js                # Sembrador inicial para Cinephile Hub
│   └── seedGames.js           # Sembrador de videojuegos verificados para Gamer Hub
├── src/
│   ├── app/
│   │   ├── page.tsx           # Launcher Genérico (Centro de Mando v3.0)
│   │   ├── layout.tsx         # Layout global con AuthProvider, ToastProvider y navegación
│   │   ├── login/             # Página de inicio de sesión (Credenciales, Google, Discord)
│   │   ├── register/          # Registro de nuevos usuarios
│   │   ├── reviews/           # Muro de reseñas de Cine & Series
│   │   ├── leaderboard/       # Salón de la fama y podio de usuarios
│   │   ├── u/[username]/      # Perfil público compartible de usuario
│   │   ├── movies/            # Cinephile Hub (Home de Cine)
│   │   ├── movie/[id]/        # Ficha interactiva de película
│   │   ├── series/            # Cinephile Hub (Home de Series)
│   │   ├── series/[id]/       # Ficha interactiva de serie
│   │   ├── watchlist/         # Películas y series pendientes
│   │   ├── watched/           # Obras vistas con filtros y Sofa Knowledge
│   │   ├── profile/           # Perfil cinéfilo y analítica de Ball Knowledge
│   │   ├── search/            # Búsqueda en catálogo de cine y series (TMDB)
│   │   ├── games/             # Gamer Hub (Home de Videojuegos)
│   │   ├── games/[id]/        # Ficha de videojuego (trailers, screenshots, veredicto)
│   │   ├── games/reviews/     # Muro de reseñas de Videojuegos
│   │   ├── games/backlog/     # Backlog de videojuegos pendientes
│   │   ├── games/completed/   # Videojuegos completados y platino
│   │   ├── games/profile/     # Perfil Gamer, Critic vs You y Hot Takes
│   │   ├── games/search/      # Buscador de videojuegos con RAWG API
│   │   └── api/               # Endpoints REST (auth, leaderboard, reviews, games, movies, series)
│   ├── components/
│   │   ├── DynamicNavHeader.tsx # Barra de navegación inteligente multi-universo
│   │   ├── DynamicFooter.tsx    # Pie de página dinámico por universo
│   │   ├── leaderboard/         # Componentes del ranking (PodiumCard, LeaderboardRow, UserRankCard)
│   │   ├── reviews/             # Componentes de muro de opiniones (ReviewFeedCard)
│   │   ├── profile/             # TopFourCard, AffinityCard
│   │   ├── movies/              # Componentes cinéfilos (MovieCard, EditCinephileProfileModal, ReviewModal)
│   │   ├── games/               # Componentes gamer (GameCard, EditGamerProfileModal, GamerLevelBar)
│   │   └── shared/              # Sonido, Toasts, Avatares, Badges de Knowledge
│   ├── lib/
│   │   ├── prisma.ts          # Cliente Prisma ORM compartido
│   │   ├── auth.ts            # Configuración de NextAuth (Credenciales, Google, Discord)
│   │   ├── avatars.ts         # Catálogo de 16 avatares temáticos predefinidos
│   │   ├── sounds.ts          # Motor de audio Web sintetizado
│   │   ├── tmdb.ts            # Integración con The Movie Database
│   │   ├── rawg.ts            # Integración con RAWG Video Games API
│   │   ├── platforms.ts       # Catálogo de plataformas (Steam, Epic, Xbox, PlayStation, Nintendo...)
│   │   ├── ballKnowledge.ts   # Motor matemático de Ball Knowledge (Cine)
│   │   └── gameKnowledge.ts   # Motor matemático de Game Knowledge (Videojuegos)
│   └── types/                 # Definiciones TypeScript de NextAuth, Cine, Series y Juegos
```

---

## ✨ Universos y Funcionalidades

### 1. 🛸 Launcher Genérico (`/`)
- Pantalla de bienvenida modular para acceder a cualquier universo activo (**v3.0 Multi-Universo**).
- Tarjetas vivas con estadísticas de Cinephile Hub y Gamer Hub.
- Espacio reservado modular ("Próximamente...") preparado para escalar a futuros universos (Anime, Libros, etc.).

### 2. 🎮 Gamer Hub (`/games/...`)
- **Integración RAWG API:** Carátulas, screenshots oficiales, trailers y enlaces directos a RAWG.
- **Registro Multi-Plataforma Granular:** Horas jugadas y estado independiente por plataforma (_Completado en PC_, _Jugando en PS5_, _Platinado en Steam_).
- **Estadísticas de Plataforma:** Paneles de horas acumuladas y dedicación por ecosistema (Steam, Xbox, PlayStation, Nintendo, Emuladores).
- **Motor Game Knowledge (GK):**
  $$\text{Game Knowledge (\%)} = \max\left(0,\, 100 - (|\text{Tu Nota} - \text{Nota Metacritic}| \times 10)\right)$$
- **Tus Hot Takes 🔥:** Detección automática de discrepancias con la prensa especializada (_Overrated_ vs _Based_).
- **Muro de Reseñas Gamer (`/games/reviews`):** Feed comunitario con ordenación por fecha, nota o controversia.

### 3. 🎬 Cinephile Hub (`/movies/...` y `/series/...`)
- **Catálogo de Cine y Series TMDB:** Fichas con reparto completo, sinopsis, pósteres y enlaces a **IMDb**.
- **Plataformas de streaming:** Netflix, Max, Prime Video, Disney+, Apple TV+, Movistar+, Filmin o **🏴‍☠️ Pirata / Stremio**.
- **Registro Flexible de Obras:** Opción de registrar películas o series con o sin puntuación numérica.
- **Motor Sofa Knowledge 🛋️:** Mide tu porcentaje de sintonía cultural frente a las valoraciones medias de IMDb.
- **Muro de Reseñas Cinéfilo (`/reviews`):** Feed comunitario con filtros de búsqueda instantánea y ordenación múltiple.

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

### 🩹 Reparar el error de índice de Git en Windows (`repair-git.bat`):

Si en tu consola de Windows alguna vez te sale `fatal: .git/index: index file smaller than expected`, simplemente ejecuta en la raíz del proyecto:

```bash
repair-git.bat
# o directamente en tu terminal:
npm run git:fix
```

---

## 🌐 Despliegue en Vercel & Variables de Entorno

### 📍 ¿Dónde están las Variables de Entorno en Vercel?
Para configurar las claves en producción, la ruta en el panel de control de Vercel es:
> **Tu Proyecto en Vercel** ➔ **Settings** (pestaña superior) ➔ **Environment Variables** (menú lateral izquierdo)

### 📋 Variables requeridas en Vercel:

| Variable | Descripción / Ejemplo | Entorno Requerido |
| :--- | :--- | :--- |
| `NEXTAUTH_SECRET` | Clave secreta para firmar sesiones JWT de NextAuth (32+ caracteres) | Production, Preview |
| `NEXTAUTH_URL` | URL pública de tu dominio en Vercel (`https://tu-proyecto.vercel.app`) | Production, Preview |
| `DATABASE_URL` | Conexión pooling de Supabase PostgreSQL (`...:6543/postgres?pgbouncer=true`) | Production, Preview |
| `DIRECT_URL` | Conexión directa de Supabase PostgreSQL (`...:5432/postgres`) | Production, Preview |
| `TMDB_API_KEY` | Clave API de The Movie Database | Production, Preview |
| `RAWG_API_KEY` | Clave API de RAWG Video Games | Production, Preview |
| `GOOGLE_CLIENT_ID` | Client ID de Google Cloud OAuth *(Opcional para login con Google)* | Production, Preview |
| `GOOGLE_CLIENT_SECRET` | Client Secret de Google Cloud OAuth *(Opcional para login con Google)* | Production, Preview |
| `DISCORD_CLIENT_ID` | Client ID de Discord Developer Portal *(Opcional para login con Discord)* | Production, Preview |
| `DISCORD_CLIENT_SECRET` | Client Secret de Discord Developer Portal *(Opcional para login con Discord)* | Production, Preview |

*Nota: Tras añadir o modificar variables en Vercel, recuerda hacer **Redeploy** del último despliegue para que surtan efecto.*

