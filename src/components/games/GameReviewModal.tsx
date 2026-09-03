'use client';

import React, { useState, useEffect } from 'react';
import { X, Star, Loader2, Clock, Gamepad2, Award } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'BACKLOG', label: '📥 Backlog (Pendiente)', color: 'border-zinc-600 text-zinc-300' },
  { value: 'PLAYING', label: '🕹️ Jugando Ahora', color: 'border-cyan-500/50 text-cyan-300' },
  { value: 'COMPLETED', label: '🏆 Completado', color: 'border-purple-500/50 text-purple-300' },
  { value: 'PLATINUM', label: '👑 100% Platino', color: 'border-amber-500/50 text-amber-300' },
  { value: 'DROPPED', label: '💀 Abandonado', color: 'border-rose-500/50 text-rose-300' },
];

const PLATFORM_PRESETS = [
  'PC',
  'PlayStation 5',
  'PlayStation 4',
  'Nintendo Switch',
  'Xbox Series S/X',
  'Steam Deck',
  'Emulador',
];

interface GameReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  game: {
    rawgId: number;
    title: string;
    released?: string | null;
    backgroundImage?: string | null;
    metacritic?: number | null;
    platforms?: string[];
  };
  initialStatus?: 'BACKLOG' | 'PLAYING' | 'COMPLETED' | 'PLATINUM' | 'DROPPED';
  initialRating?: number | null;
  initialHours?: number | null;
  initialPlatform?: string | null;
  initialReview?: string | null;
}

export default function GameReviewModal({
  isOpen,
  onClose,
  onSaved,
  game,
  initialStatus = 'COMPLETED',
  initialRating,
  initialHours,
  initialPlatform,
  initialReview,
}: GameReviewModalProps) {
  const [status, setStatus] = useState(initialStatus);
  const [rating, setRating] = useState<number>(initialRating ?? 8.5);
  const [hasRating, setHasRating] = useState<boolean>(initialRating !== null && initialRating !== undefined);
  const [hours, setHours] = useState<string>(initialHours ? String(initialHours) : '');
  const [selectedPlatform, setSelectedPlatform] = useState<string>(initialPlatform || '');
  const [review, setReview] = useState<string>(initialReview || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setStatus(initialStatus);
      setRating(initialRating ?? 8.5);
      setHasRating(initialRating !== null && initialRating !== undefined);
      setHours(initialHours ? String(initialHours) : '');
      setSelectedPlatform(initialPlatform || (game.platforms && game.platforms[0]) || 'PC');
      setReview(initialReview || '');
    }
  }, [isOpen, initialStatus, initialRating, initialHours, initialPlatform, initialReview, game]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload: any = {
        rawgId: game.rawgId,
        status,
        platform: selectedPlatform || null,
        review: review.trim() || null,
        hoursPlayed: hours.trim() ? parseFloat(hours) : null,
      };

      if (hasRating && (status === 'COMPLETED' || status === 'PLATINUM' || status === 'DROPPED' || status === 'PLAYING')) {
        payload.userRating = Number(rating.toFixed(1));
      } else {
        payload.userRating = null;
      }

      const res = await fetch('/api/user-games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onSaved();
        onClose();
      }
    } catch (err) {
      console.error('Error al guardar juego:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const platformsList = Array.from(
    new Set([...PLATFORM_PRESETS, ...(game.platforms || [])])
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-lg rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl bg-cine-950/95 flex flex-col max-h-[90vh]">
        {/* Cabecera */}
        <div className="p-6 border-b border-cine-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {game.backgroundImage && (
              <img
                src={game.backgroundImage}
                alt={game.title}
                className="w-12 h-14 object-cover rounded-xl border border-white/10"
              />
            )}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                Registro Gamer
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white line-clamp-1">
                {game.title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-cine-400 hover:text-white hover:bg-cine-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario con scroll */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {/* Selector de Estado */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-cine-300 block">
              Estado del Juego
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {STATUS_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => setStatus(opt.value as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left truncate ${
                    status === opt.value
                      ? 'bg-purple-600/30 border-purple-400 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]'
                      : 'bg-cine-900/60 border-cine-800 text-cine-400 hover:bg-cine-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Horas Jugadas y Plataforma */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Horas */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> Horas Jugadas
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="9999"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  placeholder="ej. 127"
                  className="w-full px-3.5 py-2.5 bg-cine-900 border border-cine-700 rounded-xl text-sm text-white font-mono placeholder-cine-500 focus:outline-none focus:border-cyan-400"
                />
                <span className="absolute right-3.5 top-2.5 text-xs text-cine-500 font-mono">
                  horas
                </span>
              </div>
            </div>

            {/* Plataforma */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-purple-400" /> Plataforma
              </label>
              <select
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
                className="w-full px-3 py-2.5 bg-cine-900 border border-cine-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-400"
              >
                {platformsList.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Calificación (Slider + Input numérico) */}
          <div className="space-y-3 pt-2 border-t border-cine-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-purple-400 fill-purple-400" /> Tu Puntuación
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableRating"
                  checked={hasRating}
                  onChange={(e) => setHasRating(e.target.checked)}
                  className="rounded border-cine-700 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="enableRating" className="text-xs text-cine-400 cursor-pointer">
                  Asignar nota
                </label>
              </div>
            </div>

            {hasRating && (
              <div className="space-y-3 bg-cine-900/60 p-4 rounded-2xl border border-purple-500/20">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-purple-400 font-mono tracking-tight">
                    {rating.toFixed(1)}
                  </span>
                  <span className="text-xs text-cine-400 font-mono">de 10.0</span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={rating}
                  onChange={(e) => setRating(parseFloat(e.target.value))}
                  className="w-full accent-purple-500 cursor-pointer h-2 bg-cine-950 rounded-lg"
                />

                <div className="flex justify-between text-[10px] text-cine-500 font-mono">
                  <span>0.0</span>
                  <span>5.0</span>
                  <span>10.0</span>
                </div>
              </div>
            )}
          </div>

          {/* Reseña personal */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-cine-300 block">
              Tu Crítica / Veredicto Gamer
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="¿Qué te pareció la jugabilidad, el mundo, la dificultad, el final?..."
              rows={4}
              className="w-full p-3.5 bg-cine-900 border border-cine-700 rounded-xl text-sm text-cine-200 placeholder-cine-500 focus:outline-none focus:border-purple-400 resize-none"
            />
          </div>

          {/* Botones de acción */}
          <div className="pt-3 border-t border-cine-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-cine-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-all shadow-[0_0_15px_rgba(139,92,246,0.4)] flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Guardando...
                </>
              ) : (
                <>
                  <Award className="w-3.5 h-3.5" /> Guardar Veredicto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
