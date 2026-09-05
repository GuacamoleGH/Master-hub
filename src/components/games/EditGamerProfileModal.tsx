"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, User, Image, FileText, Loader2, Check } from "lucide-react";

interface EditGamerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  initialName: string;
  initialBio: string | null;
  initialAvatar: string | null;
}

import { PRESET_AVATARS } from "@/lib/avatars";
import { sounds } from "@/lib/sounds";

export default function EditGamerProfileModal({
  isOpen,
  onClose,
  onSaved,
  initialName,
  initialBio,
  initialAvatar,
}: EditGamerProfileModalProps) {
  const [displayName, setDisplayName] = useState(initialName);
  const [bio, setBio] = useState(initialBio || "");
  const [avatarUrl, setAvatarUrl] = useState(initialAvatar || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/games/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          displayName: displayName.trim(),
          bio: bio.trim() || null,
          avatarUrl: avatarUrl.trim() || null,
        }),
      });

      if (res.ok) {
        sounds.playSuccess();
        onSaved();
        onClose();
      }
    } catch (err) {
      console.error("Error al actualizar perfil gamer:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl bg-cine-950/95 flex flex-col max-h-[90vh]">
        {/* Cabecera */}
        <div className="p-6 border-b border-cine-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <User className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">
              Editar Perfil Gamer
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-cine-400 hover:text-white hover:bg-cine-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          {/* Nombre de usuario */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-400" /> Nombre de Jugador
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Tu alias o gamertag..."
              required
              className="w-full px-3.5 py-2.5 bg-cine-900 border border-cine-700 rounded-xl text-sm text-white placeholder-cine-500 focus:outline-none focus:border-purple-400"
            />
          </div>

          {/* Avatar & Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-cyan-400" /> Avatar de Perfil
            </label>

            {/* Vista previa y presets */}
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-purple-500 shadow-md flex-shrink-0"
                />
              ) : (
                <div className="w-14 h-14 rounded-2xl bg-cine-900 border-2 border-dashed border-cine-700 flex items-center justify-center text-cine-600 flex-shrink-0">
                  <User className="w-6 h-6" />
                </div>
              )}

              <div className="flex-1 space-y-1.5">
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="URL de imagen externa..."
                  className="w-full px-3 py-1.5 bg-cine-900 border border-cine-700 rounded-xl text-xs text-white placeholder-cine-500 focus:outline-none focus:border-cyan-400"
                />
                <span className="text-[10px] text-cine-500 block">
                  O elige un avatar predeterminado:
                </span>
              </div>
            </div>

            {/* Presets */}
            <div className="flex gap-2 pt-1 overflow-x-auto pb-1 scrollbar-thin">
              {PRESET_AVATARS.map((preset) => (
                <button
                  type="button"
                  key={preset.id}
                  onClick={() => {
                    sounds.playClick();
                    setAvatarUrl(preset.dataUrl);
                  }}
                  title={preset.name}
                  className={`relative w-11 h-11 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                    avatarUrl === preset.dataUrl
                      ? "border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.6)] scale-105"
                      : "border-cine-800 hover:border-purple-400"
                  }`}
                >
                  <img
                    src={preset.dataUrl}
                    alt={preset.name}
                    className="w-full h-full object-cover"
                  />
                  {avatarUrl === preset.dataUrl && (
                    <div className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center">
                      <Check className="w-4 h-4 text-cyan-300 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Biografía */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-purple-400" /> Biografía
              Gamer
            </label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Cuéntanos tus géneros favoritos, consolas favoritas, o tu filosofía como jugador..."
              rows={3}
              className="w-full p-3 bg-cine-900 border border-cine-700 rounded-xl text-sm text-cine-200 placeholder-cine-500 focus:outline-none focus:border-purple-400 resize-none"
            />
          </div>

          {/* Botones */}
          <div className="pt-3 border-t border-cine-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-cine-400 hover:text-white"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl text-xs transition-all shadow-[0_0_12px_rgba(139,92,246,0.4)] flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Guardando...
                </>
              ) : (
                "Guardar Cambios"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
