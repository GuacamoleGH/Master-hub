"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  User,
  Image,
  FileText,
  Loader2,
  Check,
  Film,
  Sparkles,
} from "lucide-react";
import { PRESET_AVATARS } from "@/lib/avatars";
import { sounds } from "@/lib/sounds";
import { useSession } from "next-auth/react";

interface EditCinephileProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  initialName: string;
  initialBio: string | null;
  initialAvatar: string | null;
}

export default function EditCinephileProfileModal({
  isOpen,
  onClose,
  onSaved,
  initialName,
  initialBio,
  initialAvatar,
}: EditCinephileProfileModalProps) {
  const { data: session } = useSession();
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
      setDisplayName(initialName);
      setBio(initialBio || "");
      setAvatarUrl(initialAvatar || "");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialName, initialBio, initialAvatar]);

  if (!isOpen || !mounted || !session?.user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/profile", {
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
      console.error("Error al actualizar perfil cinéfilo:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-md rounded-3xl border border-amber-500/30 overflow-hidden shadow-2xl bg-cine-950/95 flex flex-col max-h-[90vh]">
        {/* Cabecera */}
        <div className="p-6 border-b border-cine-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shadow-gold-glow">
              <Film className="w-5 h-5" />
            </div>
            <h2 className="text-lg font-bold text-white">
              Editar Perfil Cinéfilo
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
              <User className="w-3.5 h-3.5 text-amber-400" /> Nombre de Cinéfilo
            </label>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Tu nombre o alias cinéfilo..."
              required
              className="w-full px-3.5 py-2.5 bg-cine-900 border border-cine-700 rounded-xl text-sm text-white placeholder-cine-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Avatar & Presets */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-amber-400" /> Avatar de Perfil
            </label>

            {/* Vista previa y presets */}
            <div className="flex items-center gap-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar preview"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-amber-500 shadow-gold-glow flex-shrink-0"
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
                  className="w-full px-3 py-1.5 bg-cine-900 border border-cine-700 rounded-xl text-xs text-white placeholder-cine-500 focus:outline-none focus:border-amber-400"
                />
                <span className="text-[10px] text-cine-500 block">
                  O elige un avatar predeterminado:
                </span>
              </div>
            </div>

            {/* Presets */}
            <div className="grid grid-cols-4 gap-2 pt-1">
              {PRESET_AVATARS.map((av) => {
                const isSelected = avatarUrl === av.dataUrl;
                return (
                  <button
                    key={av.id}
                    type="button"
                    onClick={() => {
                      sounds.star();
                      setAvatarUrl(av.dataUrl);
                    }}
                    className={`flex flex-col items-center gap-1 p-2 rounded-xl border transition-all text-center ${
                      isSelected
                        ? "border-amber-500 bg-amber-500/20 shadow-gold-glow scale-105"
                        : "border-cine-800 bg-cine-900/60 hover:bg-cine-800/80 hover:border-cine-700"
                    }`}
                  >
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-cine-950">
                      <img
                        src={av.dataUrl}
                        alt={av.name}
                        className="w-full h-full object-cover"
                      />
                      {isSelected && (
                        <div className="absolute inset-0 bg-amber-500/30 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] text-cine-300 font-medium truncate w-full">
                      {av.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Biografía */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-amber-400" /> Biografía
              Cinéfila
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Explorador y crítico del séptimo arte..."
              className="w-full px-3.5 py-2 bg-cine-900 border border-cine-700 rounded-xl text-xs text-white placeholder-cine-500 focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          {/* Botones de acción */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-cine-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-cine-400 hover:text-white transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-gold-glow flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Guardando...</span>
                </>
              ) : (
                <span>Guardar Cambios</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body,
  );
}
