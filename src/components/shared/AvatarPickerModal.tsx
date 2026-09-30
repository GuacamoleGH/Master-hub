"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Sparkles, Film, Gamepad2, Check } from "lucide-react";
import { PRESET_AVATARS, PresetAvatar } from "@/lib/avatars";
import { sounds } from "@/lib/sounds";

interface AvatarPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAvatar?: string | null;
  onSelect: (avatarUrl: string) => void;
}

export default function AvatarPickerModal({
  isOpen,
  onClose,
  currentAvatar,
  onSelect,
}: AvatarPickerModalProps) {
  const [filter, setFilter] = useState<"all" | "cinema" | "gaming">("all");
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

  const filteredAvatars = PRESET_AVATARS.filter((av) => {
    if (filter === "all") return true;
    return av.category === filter;
  });

  const handleChoose = (avatar: PresetAvatar) => {
    sounds.playSuccess();
    onSelect(avatar.dataUrl);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl bg-cine-900 border border-cine-700/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
        {/* Modal Header */}
        <div className="p-5 border-b border-cine-800 flex items-center justify-between bg-cine-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl border border-purple-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                Elige tu Avatar de Colección
              </h3>
              <p className="text-xs text-cine-400">
                Selecciona una insignia cinematográfica o gamer para tu perfil
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-2 rounded-xl text-cine-400 hover:text-white hover:bg-cine-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categorías */}
        <div className="px-5 pt-4 pb-2 flex items-center gap-2 bg-cine-900">
          <button
            onClick={() => {
              sounds.playNav();
              setFilter("all");
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              filter === "all"
                ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                : "bg-cine-800/80 text-cine-400 hover:text-white hover:bg-cine-800"
            }`}
          >
            Todos ({PRESET_AVATARS.length})
          </button>
          <button
            onClick={() => {
              sounds.playNav();
              setFilter("cinema");
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filter === "cinema"
                ? "bg-purple-600 text-white shadow-[0_0_12px_rgba(168,85,247,0.3)]"
                : "bg-cine-800/80 text-cine-400 hover:text-white hover:bg-cine-800"
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            Cine & Series
          </button>
          <button
            onClick={() => {
              sounds.playNav();
              setFilter("gaming");
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              filter === "gaming"
                ? "bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]"
                : "bg-cine-800/80 text-cine-400 hover:text-white hover:bg-cine-800"
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            Gaming
          </button>
        </div>

        {/* Grid de Avatares */}
        <div className="p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {filteredAvatars.map((av) => {
            const isSelected = currentAvatar === av.dataUrl;
            return (
              <button
                key={av.id}
                type="button"
                onClick={() => handleChoose(av)}
                className={`group relative flex flex-col items-center p-3 rounded-2xl border transition-all duration-200 ${
                  isSelected
                    ? "bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/50"
                    : "bg-cine-950/40 border-cine-800/80 hover:border-cine-600 hover:bg-cine-800/60 hover:scale-[1.03]"
                }`}
              >
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-lg mb-2.5 transition-transform group-hover:rotate-1">
                  <img
                    src={av.dataUrl}
                    alt={av.name}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-purple-600/40 backdrop-blur-[1px] flex items-center justify-center">
                      <Check className="w-6 h-6 text-white drop-shadow-md" />
                    </div>
                  )}
                </div>
                <span className="text-[11px] font-medium text-cine-300 text-center line-clamp-1 group-hover:text-white transition-colors">
                  {av.name}
                </span>
                <span className="text-[9px] uppercase font-mono tracking-wider text-cine-500 mt-0.5">
                  {av.category === "cinema" ? "Cine" : "Gaming"}
                </span>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cine-800/80 bg-cine-950/40 flex items-center justify-between text-xs text-cine-400">
          <span>Se actualizará instantáneamente en tu perfil</span>
          <button
            type="button"
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-4 py-2 bg-cine-800 hover:bg-cine-700 text-white rounded-xl transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
