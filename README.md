# 🎬 Cinephile Hub & 🏀 Ball Knowledge Platform

> Plataforma web cinematográfica de nivel comercial inspirada en IMDb y Letterboxd, con una identidad visual oscura premium, motor de coincidencia **Ball Knowledge**, gamificación por rangos cinéfilos y persistencia local en SQLite.

---

## ✨ Características Principales

1. **Buscador Cinematográfico Inteligente**
   - Búsqueda en tiempo real con _debounce_ (300ms) para autocompletado instantáneo.
   - Conexión con la API de **TMDB** y fallback offline resiliente.
   - Página dedicada de resultados completos (`/search?q=...`).

2. **Ficha de Película Espectacular (`/movie/[id]`)**
   - Gran backdrop con degradados cinematográficos y póster de alta definición.
   - Reparto principal con tarjetas de actores, personajes y fotos.
   - Ficha técnica: Director, duración, sinopsis completa, géneros y calificación oficial de IMDb.
   - Acciones rápidas: "Añadir a Watchlist" y "Marcar como vista".
   - Panel de veredicto con tu nota, reseña, fecha de visionado y sello de Ball Knowledge.

3. **🏀 Motor de Ball Knowledge**
   - Fórmula matemática exacta acotada:
     $$\text{Ball Knowledge (\%)} = \max(0, 100 - (|\text{Mi Nota} - \text{Nota IMDb}| \times 10))$$
   - Medición película a película:
     - **Exact Match (100%)**: Coincidencia milimétrica con el consenso.
     - **High Ball Knowledge (≥95%)**: Gran sintonía cinéfila.
     - **Controversial / Hot Take (<70%)**: Tus opiniones más audaces.
   - **Score Global en el Perfil**: Media agregada de todas tus valoraciones.
   - **Rankings W & L**: Detección automática de tu **Biggest W** (mayor coincidencia) y tu **Biggest L** (mayor discrepancia histórica).

4. **🏆 Mi Carrera Cinematográfica (Niveles & Gamificación)**
   - Barra de nivel con progreso porcentual y puntos de experiencia (XP):
     - **+100 XP** por película vista.
     - **+50 XP** bonus por escribir reseña.
     - **+25 XP** bonus por High Ball Knowledge (≥95%).
   - **Rangos desbloqueables**:
     - 🍿 _Casual Viewer_ (Lvl 1-5)
     - 🎬 _Cinephile_ (Lvl 6-15)
     - 🧠 _Film Nerd_ (Lvl 16-30)
     - 🏀 _Ball Knowledge Merchant_ (Lvl 31-50)
     - 🗿 _Criterion Goblin_ (Lvl 51-75)
     - 👑 _Cinema God_ (Lvl 76+)

5. **📊 Analítica Cinematográfica (Recharts)**
   - Histograma de distribución de notas (0 a 10 estrellas).
   - Ranking de géneros más vistos con nota media.
   - Gráfico de evolución temporal de visionados mensuales.

6. **📑 Watchlist & Historial de Películas Vistas**
   - Ordenación múltiple: por fecha, nota propia, nota IMDb, Ball Knowledge o título.
   - Filtros dinámicos por género y rangos de notas (Obras maestras, Notables, Regulares, Controversias).

7. **🛡️ Base de Datos Local SQLite & Modo Resiliente**
   - Cero configuración externa: los datos se guardan en `dev.db` mediante Prisma ORM.
   - Herramienta de **Wipeout** (para comenzar desde cero cuando desees) y botón de **Recargar catálogo de demostración**.

---

## 🚀 Cómo Iniciar la Aplicación

### 1. Iniciar el servidor de desarrollo

En la terminal del proyecto ejecuta:

```bash
npm run dev
```

_(En Windows PowerShell si tienes políticas de scripts restringidas, puedes ejecutar `cmd /c "npm run dev"`)._

### 2. Abrir en tu navegador

Accede a:

```
http://localhost:3000
```

---

## 🔑 Configuración de APIs (.env)

El proyecto ya cuenta con las credenciales de TMDB listas en tu archivo `.env`.

- **TMDB_API_KEY**: Clave v3 de TMDB configurada.
- **TMDB_READ_ACCESS_TOKEN**: Token Bearer de TMDB configurado.
- **OMDB_API_KEY**: (Opcional) Si en el futuro deseas obtener una clave gratuita en [omdbapi.com](https://www.omdbapi.com/apikey.aspx), solo pégala aquí para sincronizar la nota directa de IMDb. De lo contrario, el sistema utiliza la nota de TMDB y el catálogo con total precisión.
