"use client";

import React, { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sounds } from "@/lib/sounds";

interface SoundToggleProps {
  className?: string;
}

export default function SoundToggle({ className = "" }: SoundToggleProps) {
  const [muted, setMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setMuted(sounds.isMuted());

    const handleSync = (e: any) => {
      if (e?.detail?.muted !== undefined) {
        setMuted(e.detail.muted);
      }
    };

    window.addEventListener("masterhub_sound_toggle", handleSync);
    return () =>
      window.removeEventListener("masterhub_sound_toggle", handleSync);
  }, []);

  const toggle = () => {
    const nextMuted = sounds.toggleMute();
    setMuted(nextMuted);
    if (!nextMuted) {
      sounds.playClick();
    }
  };

  if (!mounted) {
    return (
      <div
        className={`w-8 h-8 rounded-lg bg-cine-800/40 border border-cine-700/40 opacity-0 ${className}`}
      />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={
        muted ? "Activar efectos de sonido" : "Silenciar efectos de sonido"
      }
      aria-label={
        muted ? "Activar efectos de sonido" : "Silenciar efectos de sonido"
      }
      className={`p-1.5 rounded-lg border transition-all duration-200 flex items-center justify-center ${
        muted
          ? "bg-cine-900/60 border-cine-800 text-cine-500 hover:text-cine-300 hover:border-cine-700"
          : "bg-purple-500/10 border-purple-500/30 text-purple-300 hover:bg-purple-500/20 hover:border-purple-500/50 shadow-[0_0_10px_rgba(168,85,247,0.15)]"
      } ${className}`}
    >
      {muted ? (
        <VolumeX className="w-4 h-4" />
      ) : (
        <Volume2 className="w-4 h-4 animate-pulse" />
      )}
    </button>
  );
}
