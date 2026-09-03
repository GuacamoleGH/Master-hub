"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Film, Bookmark, CheckCircle2, User } from "lucide-react";
import MovieSearchInput from "./MovieSearchInput";

export default function Header() {
  const pathname = usePathname();

  const navLinks = [
    { href: "/watchlist", label: "Watchlist", icon: Bookmark },
    { href: "/watched", label: "Películas Vistas", icon: CheckCircle2 },
    { href: "/profile", label: "Mi Perfil", icon: User },
  ];

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-cine-800/80 bg-cine-950/85">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 py-3">
        {/* Brand / Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group flex-shrink-0"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center shadow-gold-glow group-hover:scale-105 transition-transform">
            <Film className="w-5 h-5 text-cine-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-wider text-white group-hover:text-amber-400 transition-colors">
                CINEPHILE
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30">
                BK
              </span>
            </div>
            <div className="text-[10px] tracking-wider text-cine-400 font-medium">
              Ball Knowledge Hub
            </div>
          </div>
        </Link>

        {/* Buscador Central */}
        <div className="flex-1 max-w-xl hidden md:block">
          <MovieSearchInput />
        </div>

        {/* Navegación Superior */}
        <nav className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm"
                    : "text-cine-300 hover:text-white hover:bg-cine-800/60"
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-cine-400"}`}
                />
                <span className="hidden sm:inline">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Buscador móvil */}
      <div className="md:hidden px-4 pb-3">
        <MovieSearchInput />
      </div>
    </header>
  );
}
