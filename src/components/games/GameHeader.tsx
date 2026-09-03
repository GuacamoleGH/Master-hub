'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Gamepad2, Bookmark, CheckCircle2, User, Menu, X, ArrowLeft } from 'lucide-react';
import GameSearchInput from './GameSearchInput';

export default function GameHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/games', label: 'Inicio', icon: Gamepad2 },
    { href: '/games/backlog', label: 'Backlog', icon: Bookmark },
    { href: '/games/completed', label: 'Completados', icon: CheckCircle2 },
    { href: '/games/profile', label: 'Perfil Gamer', icon: User },
  ];

  const isActive = (href: string) => {
    if (href === '/games') return pathname === '/games';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-purple-500/20 bg-cine-950/90 backdrop-blur-xl shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Izquierda: Botón Volver al Hub + Logo Gamer */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold text-cine-400 hover:text-white bg-cine-900/80 hover:bg-cine-800 border border-cine-700/80 transition-colors"
            title="Volver al Centro de Mando Principal"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Hub Principal</span>
          </Link>

          <Link href="/games" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform shadow-[0_0_12px_rgba(139,92,246,0.3)]">
              <Gamepad2 className="w-5 h-5 text-purple-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-base sm:text-lg tracking-tight flex items-center gap-1">
                Gamer<span className="text-purple-400">Hub</span>
              </span>
              <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-mono -mt-1">
                Game Knowledge
              </span>
            </div>
          </Link>
        </div>

        {/* Buscador Central */}
        <div className="flex-1 max-w-md hidden sm:block">
          <GameSearchInput />
        </div>

        {/* Navegación Desktop */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-500/40 shadow-[0_0_10px_rgba(139,92,246,0.2)]'
                    : 'text-cine-300 hover:text-white hover:bg-cine-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-purple-400' : 'text-cine-400'}`} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Botón menú móvil */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-cine-400 hover:text-white hover:bg-cine-900 border border-cine-800"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Buscador en móvil debajo de la cabecera */}
      <div className="sm:hidden px-4 pb-3">
        <GameSearchInput />
      </div>

      {/* Menú desplegable móvil */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-purple-500/20 bg-cine-950/95 px-4 py-3 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold ${
                  active
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40'
                    : 'text-cine-300 hover:bg-cine-900'
                }`}
              >
                <Icon className="w-4 h-4 text-purple-400" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <div className="pt-2 border-t border-cine-800 mt-2">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-cine-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver al Hub Principal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
