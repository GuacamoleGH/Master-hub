export interface PlatformOption {
  id: string;
  name: string;
  category: 'PC & Tiendas' | 'PlayStation' | 'Xbox' | 'Nintendo' | 'Portátiles & Emulación';
  shortName?: string;
  badgeColor: string; // Tailwind classes
}

export const ALL_PLATFORMS: PlatformOption[] = [
  // PC & Tiendas Digitales
  { id: 'pc-steam', name: 'PC (Steam)', shortName: 'Steam', category: 'PC & Tiendas', badgeColor: 'bg-sky-950/80 text-sky-300 border-sky-500/40' },
  { id: 'pc-epic', name: 'PC (Epic Games)', shortName: 'Epic', category: 'PC & Tiendas', badgeColor: 'bg-zinc-800 text-zinc-200 border-zinc-600' },
  { id: 'pc-gog', name: 'PC (GOG)', shortName: 'GOG', category: 'PC & Tiendas', badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-500/40' },
  { id: 'pc-gamepass', name: 'PC (Game Pass)', shortName: 'Game Pass', category: 'PC & Tiendas', badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' },
  { id: 'pc-battlenet', name: 'PC (Battle.net)', shortName: 'Battle.net', category: 'PC & Tiendas', badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-500/40' },
  { id: 'pc', name: 'PC (General)', shortName: 'PC', category: 'PC & Tiendas', badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40' },

  // PlayStation
  { id: 'ps5', name: 'PlayStation 5', shortName: 'PS5', category: 'PlayStation', badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-500/40' },
  { id: 'ps4', name: 'PlayStation 4', shortName: 'PS4', category: 'PlayStation', badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-600/40' },
  { id: 'ps3', name: 'PlayStation 3', shortName: 'PS3', category: 'PlayStation', badgeColor: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40' },
  { id: 'ps2', name: 'PlayStation 2', shortName: 'PS2', category: 'PlayStation', badgeColor: 'bg-blue-900/60 text-blue-200 border-blue-400/40' },
  { id: 'ps1', name: 'PlayStation 1', shortName: 'PS1', category: 'PlayStation', badgeColor: 'bg-slate-800 text-slate-300 border-slate-600' },
  { id: 'psp-vita', name: 'PSP / PS Vita', shortName: 'PS Vita', category: 'PlayStation', badgeColor: 'bg-cyan-900/60 text-cyan-200 border-cyan-400/40' },

  // Xbox
  { id: 'xbox-series', name: 'Xbox Series S/X', shortName: 'Series X/S', category: 'Xbox', badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40' },
  { id: 'xbox-one', name: 'Xbox One', shortName: 'Xbox One', category: 'Xbox', badgeColor: 'bg-emerald-900/60 text-emerald-200 border-emerald-600/40' },
  { id: 'xbox-360', name: 'Xbox 360', shortName: 'Xbox 360', category: 'Xbox', badgeColor: 'bg-green-950/80 text-green-400 border-green-500/50' },
  { id: 'xbox-classic', name: 'Xbox (Clásica)', shortName: 'Xbox Clásica', category: 'Xbox', badgeColor: 'bg-green-900/60 text-green-300 border-green-600' },

  // Nintendo
  { id: 'switch', name: 'Nintendo Switch', shortName: 'Switch', category: 'Nintendo', badgeColor: 'bg-rose-950/80 text-rose-300 border-rose-500/40' },
  { id: 'wii-u', name: 'Nintendo Wii U', shortName: 'Wii U', category: 'Nintendo', badgeColor: 'bg-sky-900/60 text-sky-200 border-sky-400/40' },
  { id: 'wii', name: 'Nintendo Wii', shortName: 'Wii', category: 'Nintendo', badgeColor: 'bg-zinc-800 text-cyan-300 border-cyan-600/40' },
  { id: 'gamecube', name: 'Nintendo GameCube', shortName: 'GameCube', category: 'Nintendo', badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-400/50' },
  { id: 'n64', name: 'Nintendo 64', shortName: 'N64', category: 'Nintendo', badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40' },
  { id: 'ds-3ds', name: 'Nintendo DS / 3DS', shortName: '3DS/DS', category: 'Nintendo', badgeColor: 'bg-rose-900/60 text-rose-200 border-rose-400/40' },
  { id: 'gba', name: 'Game Boy Advance / Retro', shortName: 'GBA', category: 'Nintendo', badgeColor: 'bg-indigo-900/60 text-indigo-200 border-indigo-400/40' },

  // Portátiles & Emulación
  { id: 'steam-deck', name: 'Steam Deck', shortName: 'Deck', category: 'Portátiles & Emulación', badgeColor: 'bg-slate-900 text-cyan-300 border-cyan-500/40' },
  { id: 'emulador', name: 'Emulador / RetroArch', shortName: 'Emulador', category: 'Portátiles & Emulación', badgeColor: 'bg-purple-900/60 text-purple-200 border-purple-400/40' },
];

/**
 * Obtiene el badge de estilo para una plataforma dada
 */
export function getPlatformBadgeStyle(platName: string): string {
  const match = ALL_PLATFORMS.find(
    (p) =>
      p.name.toLowerCase() === platName.toLowerCase() ||
      (p.shortName && p.shortName.toLowerCase() === platName.toLowerCase()) ||
      platName.toLowerCase().includes(p.name.toLowerCase())
  );

  return match?.badgeColor || 'bg-cine-900 text-cine-300 border-cine-700';
}
