export interface PresetAvatar {
  id: string;
  name: string;
  category: "cinema" | "gaming";
  dataUrl: string;
}

// Generador de SVGs optimizados como Data URLs
function makeSvg(bgGradient: [string, string], innerSvg: string): string {
  const raw = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${bgGradient[0]}"/>
        <stop offset="100%" stop-color="${bgGradient[1]}"/>
      </linearGradient>
      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-color="#000" flood-opacity="0.5"/>
      </filter>
    </defs>
    <rect width="100" height="100" rx="28" fill="url(#g)"/>
    <g filter="url(#glow)">${innerSvg}</g>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(raw)}`;
}

export const PRESET_AVATARS: PresetAvatar[] = [
  // --- CINEMA ---
  {
    id: "cine-claqueta",
    name: "Claqueta de Oro",
    category: "cinema",
    dataUrl: makeSvg(
      ["#4c1d95", "#1e1b4b"],
      `
      <rect x="24" y="36" width="52" height="40" rx="5" fill="#18181b" stroke="#fbbf24" stroke-width="2.5"/>
      <polygon points="24,36 34,24 76,24 66,36" fill="#fbbf24"/>
      <polygon points="36,36 44,24 54,24 46,36" fill="#18181b"/>
      <polygon points="56,36 64,24 74,24 66,36" fill="#18181b"/>
      <circle cx="50" cy="56" r="8" fill="#fbbf24" opacity="0.9"/>
    `,
    ),
  },
  {
    id: "cine-popcorn",
    name: "Palomitas Neón",
    category: "cinema",
    dataUrl: makeSvg(
      ["#9f1239", "#4c0519"],
      `
      <path d="M30 45 L35 78 L65 78 L70 45 Z" fill="#e11d48" stroke="#fecdd3" stroke-width="2"/>
      <path d="M40 45 L42 78 M50 45 L50 78 M60 45 L58 78" stroke="#ffffff" stroke-width="2"/>
      <circle cx="36" cy="38" r="9" fill="#fef08a"/>
      <circle cx="50" cy="33" r="10" fill="#fde047"/>
      <circle cx="64" cy="38" r="9" fill="#fef08a"/>
      <circle cx="43" cy="42" r="7" fill="#fef08a"/>
      <circle cx="57" cy="42" r="7" fill="#fef08a"/>
    `,
    ),
  },
  {
    id: "cine-oscar",
    name: "Estatuilla Dorada",
    category: "cinema",
    dataUrl: makeSvg(
      ["#78350f", "#1c1917"],
      `
      <circle cx="50" cy="28" r="7" fill="#fde047"/>
      <path d="M44 38 L56 38 L54 62 L58 64 L42 64 L46 62 Z" fill="#fbbf24"/>
      <rect x="42" y="66" width="16" height="5" rx="1.5" fill="#f59e0b"/>
      <rect x="37" y="73" width="26" height="6" rx="2" fill="#d97706"/>
      <polygon points="50,16 52,22 58,22 53,26 55,32 50,28 45,32 47,26 42,22 48,22" fill="#ffffff" opacity="0.4"/>
    `,
    ),
  },
  {
    id: "cine-3d",
    name: "Gafas 3D Retro",
    category: "cinema",
    dataUrl: makeSvg(
      ["#0f172a", "#1e1b4b"],
      `
      <rect x="20" y="40" width="60" height="22" rx="4" fill="#f8fafc"/>
      <rect x="25" y="44" width="22" height="14" rx="2" fill="#ef4444"/>
      <rect x="53" y="44" width="22" height="14" rx="2" fill="#06b6d4"/>
      <path d="M20 44 L14 36 M80 44 L86 36" stroke="#f8fafc" stroke-width="4" stroke-linecap="round"/>
    `,
    ),
  },
  {
    id: "cine-reel",
    name: "Bobina 35mm",
    category: "cinema",
    dataUrl: makeSvg(
      ["#18181b", "#27272a"],
      `
      <circle cx="50" cy="50" r="28" fill="#3f3f46" stroke="#a1a1aa" stroke-width="3"/>
      <circle cx="50" cy="50" r="10" fill="#18181b" stroke="#fbbf24" stroke-width="2"/>
      <circle cx="50" cy="29" r="5" fill="#18181b"/>
      <circle cx="50" cy="71" r="5" fill="#18181b"/>
      <circle cx="29" cy="50" r="5" fill="#18181b"/>
      <circle cx="71" cy="50" r="5" fill="#18181b"/>
    `,
    ),
  },
  {
    id: "cine-vhs",
    name: "Cinta VHS Synthwave",
    category: "cinema",
    dataUrl: makeSvg(
      ["#3b0764", "#030712"],
      `
      <rect x="22" y="32" width="56" height="36" rx="4" fill="#09090b" stroke="#c084fc" stroke-width="2"/>
      <rect x="30" y="40" width="40" height="16" rx="2" fill="#e9d5ff"/>
      <circle cx="40" cy="48" r="5" fill="#09090b"/>
      <circle cx="60" cy="48" r="5" fill="#09090b"/>
      <line x1="45" y1="48" x2="55" y2="48" stroke="#a855f7" stroke-width="2"/>
    `,
    ),
  },
  {
    id: "cine-projector",
    name: "Proyector Lumière",
    category: "cinema",
    dataUrl: makeSvg(
      ["#042f2e", "#022c22"],
      `
      <rect x="34" y="42" width="34" height="24" rx="3" fill="#0f766e" stroke="#2dd4bf" stroke-width="2"/>
      <circle cx="42" cy="32" r="9" fill="#115e59" stroke="#5eead4" stroke-width="2"/>
      <circle cx="60" cy="32" r="9" fill="#115e59" stroke="#5eead4" stroke-width="2"/>
      <polygon points="68,50 82,42 82,58" fill="#fef08a" opacity="0.8"/>
      <line x1="51" y1="66" x2="44" y2="78" stroke="#2dd4bf" stroke-width="3" stroke-linecap="round"/>
      <line x1="51" y1="66" x2="58" y2="78" stroke="#2dd4bf" stroke-width="3" stroke-linecap="round"/>
    `,
    ),
  },
  {
    id: "cine-ticket",
    name: "Golden Ticket VIP",
    category: "cinema",
    dataUrl: makeSvg(
      ["#b45309", "#451a03"],
      `
      <rect x="24" y="35" width="52" height="30" rx="3" fill="#f59e0b" stroke="#fef3c7" stroke-width="2"/>
      <circle cx="24" cy="50" r="5" fill="#451a03"/>
      <circle cx="76" cy="50" r="5" fill="#451a03"/>
      <line x1="38" y1="37" x2="38" y2="63" stroke="#b45309" stroke-width="2" stroke-dasharray="3,3"/>
      <polygon points="55,44 57,48 62,49 58,52 59,57 55,54 51,57 52,52 48,49 53,48" fill="#ffffff"/>
    `,
    ),
  },

  // --- GAMING ---
  {
    id: "game-controller",
    name: "Cyber Gamepad",
    category: "gaming",
    dataUrl: makeSvg(
      ["#064e3b", "#022c22"],
      `
      <path d="M26 42 C26 34, 74 34, 74 42 C74 58, 66 70, 58 64 L54 60 L46 60 L42 64 C34 70, 26 58, 26 42 Z" fill="#047857" stroke="#34d399" stroke-width="2.5"/>
      <path d="M36 44 L36 52 M32 48 L40 48" stroke="#ecfdf5" stroke-width="3" stroke-linecap="round"/>
      <circle cx="60" cy="46" r="2.5" fill="#38bdf8"/>
      <circle cx="66" cy="50" r="2.5" fill="#f43f5e"/>
      <circle cx="60" cy="54" r="2.5" fill="#a855f7"/>
      <circle cx="54" cy="50" r="2.5" fill="#fbbf24"/>
    `,
    ),
  },
  {
    id: "game-heart",
    name: "Pixel Heart 8-Bit",
    category: "gaming",
    dataUrl: makeSvg(
      ["#881337", "#4c0519"],
      `
      <polygon points="30,34 44,34 50,42 56,34 70,34 76,42 76,52 50,76 24,52 24,42" fill="#f43f5e" stroke="#ffe4e6" stroke-width="3"/>
      <rect x="32" y="38" width="6" height="6" fill="#ffffff" opacity="0.8"/>
    `,
    ),
  },
  {
    id: "game-arcade",
    name: "Arcade Neón 1984",
    category: "gaming",
    dataUrl: makeSvg(
      ["#312e81", "#1e1b4b"],
      `
      <polygon points="32,24 68,24 64,76 36,76" fill="#4338ca" stroke="#818cf8" stroke-width="2.5"/>
      <rect x="36" y="28" width="28" height="8" rx="2" fill="#c084fc"/>
      <rect x="37" y="40" width="26" height="18" rx="2" fill="#06b6d4"/>
      <circle cx="44" cy="65" r="3" fill="#ef4444"/>
      <circle cx="56" cy="65" r="2.5" fill="#fbbf24"/>
    `,
    ),
  },
  {
    id: "game-sword",
    name: "Espada de Leyenda",
    category: "gaming",
    dataUrl: makeSvg(
      ["#1e3a8a", "#0f172a"],
      `
      <path d="M68 24 L74 30 L46 58 L42 54 Z" fill="#93c5fd" stroke="#bfdbfe" stroke-width="1.5"/>
      <polygon points="38,50 48,60 44,64 34,54" fill="#f59e0b"/>
      <line x1="36" y1="58" x2="26" y2="68" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
      <circle cx="24" cy="70" r="3" fill="#f59e0b"/>
    `,
    ),
  },
  {
    id: "game-visor",
    name: "Cyberpunk Visor",
    category: "gaming",
    dataUrl: makeSvg(
      ["#111827", "#374151"],
      `
      <circle cx="50" cy="50" r="28" fill="#1f2937" stroke="#4b5563" stroke-width="2"/>
      <path d="M26 46 Q50 42 74 46 L72 58 Q50 62 28 58 Z" fill="#ec4899" stroke="#f472b6" stroke-width="2"/>
      <line x1="34" y1="52" x2="66" y2="52" stroke="#ffffff" stroke-width="1.5" opacity="0.7"/>
    `,
    ),
  },
  {
    id: "game-trophy",
    name: "Trofeo Platino",
    category: "gaming",
    dataUrl: makeSvg(
      ["#0f172a", "#334155"],
      `
      <path d="M34 32 L66 32 L60 54 C58 60 42 60 40 54 Z" fill="#e2e8f0" stroke="#f8fafc" stroke-width="2"/>
      <path d="M34 36 C24 36 24 48 36 50" stroke="#cbd5e1" stroke-width="3" fill="none"/>
      <path d="M66 36 C76 36 76 48 64 50" stroke="#cbd5e1" stroke-width="3" fill="none"/>
      <rect x="47" y="58" width="6" height="10" fill="#94a3b8"/>
      <rect x="38" y="68" width="24" height="6" rx="2" fill="#64748b"/>
      <polygon points="50,40 52,44 56,44 53,47 54,51 50,48 46,51 47,47 44,44 48,44" fill="#38bdf8"/>
    `,
    ),
  },
  {
    id: "game-d20",
    name: "Dado D20 Crítico",
    category: "gaming",
    dataUrl: makeSvg(
      ["#581c87", "#2e1065"],
      `
      <polygon points="50,22 76,38 76,66 50,80 24,66 24,38" fill="#7e22ce" stroke="#c084fc" stroke-width="2.5"/>
      <polygon points="50,22 50,80 24,66" fill="#6b21a8" opacity="0.6"/>
      <text x="50" y="56" font-family="sans-serif" font-weight="900" font-size="16" fill="#fef08a" text-anchor="middle">20</text>
    `,
    ),
  },
  {
    id: "game-ghost",
    name: "Pixel Ghost",
    category: "gaming",
    dataUrl: makeSvg(
      ["#4c1d95", "#064e3b"],
      `
      <path d="M28 48 C28 32, 72 32, 72 48 L72 72 L64 66 L56 72 L48 66 L40 72 L32 66 L28 72 Z" fill="#10b981" stroke="#a7f3d0" stroke-width="2.5"/>
      <circle cx="40" cy="46" r="4" fill="#ffffff"/>
      <circle cx="60" cy="46" r="4" fill="#ffffff"/>
      <circle cx="42" cy="46" r="2" fill="#064e3b"/>
      <circle cx="62" cy="46" r="2" fill="#064e3b"/>
    `,
    ),
  },
];
