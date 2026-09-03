'use client';

import React from 'react';
import { Flame, Brain, Check, TrendingDown, TrendingUp } from 'lucide-react';

interface GameKnowledgeBadgeProps {
  score?: number | null;
  difference?: number | null;
  size?: 'sm' | 'md' | 'lg';
  showDiff?: boolean;
}

export default function GameKnowledgeBadge({
  score,
  difference,
  size = 'md',
  showDiff = true,
}: GameKnowledgeBadgeProps) {
  if (score === null || score === undefined) {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-cine-900 border border-cine-800 text-cine-500 whitespace-nowrap">
        Sin GK
      </span>
    );
  }

  // Estilo y color según puntuación
  let badgeStyle = {
    bg: 'bg-cine-800/80',
    border: 'border-cine-700',
    text: 'text-cine-300',
    icon: <Brain className="w-3.5 h-3.5 flex-shrink-0" />,
  };

  if (score >= 95) {
    badgeStyle = {
      bg: 'bg-cyan-500/15',
      border: 'border-cyan-400/40',
      text: 'text-cyan-300',
      icon: <Brain className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />,
    };
  } else if (score >= 80) {
    badgeStyle = {
      bg: 'bg-purple-500/15',
      border: 'border-purple-400/40',
      text: 'text-purple-300',
      icon: <Check className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />,
    };
  } else if (score >= 60) {
    badgeStyle = {
      bg: 'bg-amber-500/15',
      border: 'border-amber-400/40',
      text: 'text-amber-300',
      icon: <Brain className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />,
    };
  } else {
    badgeStyle = {
      bg: 'bg-rose-500/15',
      border: 'border-rose-400/40',
      text: 'text-rose-300',
      icon: <Flame className="w-3.5 h-3.5 text-rose-400 animate-pulse flex-shrink-0" />,
    };
  }

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-1 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3.5 py-1.5 gap-2 font-bold',
  }[size];

  return (
    <div
      className={`inline-flex items-center font-mono font-bold rounded-xl border ${badgeStyle.bg} ${badgeStyle.border} ${badgeStyle.text} ${sizeClasses} shadow-sm backdrop-blur-md whitespace-nowrap flex-nowrap flex-shrink-0`}
    >
      {badgeStyle.icon}
      <span className="whitespace-nowrap">{score.toFixed(1)}% GK</span>

      {showDiff && difference !== null && difference !== undefined && (
        <span
          className={`ml-1 text-[10px] font-mono px-1.5 py-0.5 rounded flex items-center whitespace-nowrap flex-shrink-0 ${
            Math.abs(difference) <= 0.3
              ? 'text-cyan-300 bg-cyan-950/80'
              : difference > 0
              ? 'text-emerald-400 bg-emerald-950/80'
              : 'text-rose-400 bg-rose-950/80'
          }`}
        >
          {difference > 0 ? (
            <TrendingUp className="w-2.5 h-2.5 mr-0.5 inline" />
          ) : difference < 0 ? (
            <TrendingDown className="w-2.5 h-2.5 mr-0.5 inline" />
          ) : null}
          {difference > 0 ? `+${difference.toFixed(1)}` : difference.toFixed(1)}
        </span>
      )}
    </div>
  );
}
