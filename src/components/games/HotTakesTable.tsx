'use client';

import React from 'react';
import { HotTake } from '@/types/game';
import { Flame, Brain, Gem } from 'lucide-react';

interface HotTakesTableProps {
  hotTakes: HotTake[];
}

export default function HotTakesTable({ hotTakes }: HotTakesTableProps) {
  if (!hotTakes || hotTakes.length === 0) {
    return (
      <div className="p-8 text-center text-xs text-cine-500 italic">
        Aún no hay suficientes calificaciones para calcular tus Hot Takes frente a la crítica.
      </div>
    );
  }

  const getTag = (type: HotTake['type']) => {
    switch (type) {
      case 'OVERRATED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <Flame className="w-3 h-3 text-rose-400" /> Sobrevalorado 🤡
          </span>
        );
      case 'UNDERRATED':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            <Gem className="w-3 h-3 text-emerald-400" /> Joya Oculta 💎
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            <Brain className="w-3 h-3 text-cyan-400" /> Based 🧠
          </span>
        );
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-xs">
        <thead className="text-[11px] text-cine-400 uppercase tracking-wider font-mono border-b border-cine-800/80 bg-cine-950/40">
          <tr>
            <th className="py-3 px-4">Videojuego</th>
            <th className="py-3 px-3 text-center">Crítica (MC)</th>
            <th className="py-3 px-3 text-center">Tú</th>
            <th className="py-3 px-3 text-center">Diferencia</th>
            <th className="py-3 px-3 text-center">Game Knowledge</th>
            <th className="py-3 px-4 text-right">Veredicto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cine-800/50">
          {hotTakes.map((take, idx) => {
            const diff = take.difference;
            return (
              <tr key={idx} className="hover:bg-purple-950/20 transition-colors">
                {/* Juego */}
                <td className="py-3 px-4 font-semibold text-white flex items-center gap-3">
                  {take.cover && (
                    <img
                      src={take.cover}
                      alt={take.title}
                      className="w-10 h-7 object-cover rounded-lg border border-white/10 flex-shrink-0"
                    />
                  )}
                  <span className="line-clamp-1">{take.title}</span>
                </td>

                {/* Crítica */}
                <td className="py-3 px-3 text-center font-mono text-cyan-300 font-bold">
                  {take.criticRating.toFixed(1)}
                </td>

                {/* Tú */}
                <td className="py-3 px-3 text-center font-mono text-purple-400 font-bold">
                  {take.userRating.toFixed(1)}
                </td>

                {/* Diferencia */}
                <td className="py-3 px-3 text-center font-mono font-bold">
                  <span
                    className={
                      Math.abs(diff) <= 0.3
                        ? 'text-cyan-400'
                        : diff > 0
                        ? 'text-emerald-400'
                        : 'text-rose-400'
                    }
                  >
                    {diff > 0 ? `+${diff.toFixed(1)}` : diff.toFixed(1)}
                  </span>
                </td>

                {/* GK */}
                <td className="py-3 px-3 text-center font-mono text-white font-bold">
                  {take.gameKnowledge.toFixed(1)}%
                </td>

                {/* Veredicto Tag */}
                <td className="py-3 px-4 text-right">{getTag(take.type)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
