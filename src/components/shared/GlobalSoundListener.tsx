"use client";

import { useEffect } from "react";
import { sounds } from "@/lib/sounds";

export default function GlobalSoundListener() {
  useEffect(() => {
    let lastClickTime = 0;

    const handleGlobalClick = (e: MouseEvent) => {
      if (sounds.isMuted()) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Si el elemento o ancestro pide omitir sonido
      if (target.closest("[data-no-sound='true']")) return;

      // Buscar si el clic fue en un elemento interactivo
      const interactive = target.closest<HTMLElement>(
        "button, a, [role='button'], [role='tab'], input[type='checkbox'], input[type='radio'], select, summary, .interactive-card"
      );

      if (!interactive) return;

      // Evitar doble reproducción instantánea
      const now = Date.now();
      if (now - lastClickTime < 50) return;
      lastClickTime = now;

      // Sonido personalizado si se declara explícitamente en data-sound
      const customSound = interactive.getAttribute("data-sound");
      if (customSound && typeof (sounds as any)[customSound] === "function") {
        (sounds as any)[customSound]();
        return;
      }

      // Si es una pestaña o enlace de navegación
      if (
        interactive.tagName === "A" ||
        interactive.getAttribute("role") === "tab" ||
        interactive.closest("nav")
      ) {
        sounds.nav();
        return;
      }

      // Si es un toggle, switch o checkbox
      if (
        interactive.tagName === "INPUT" &&
        ["checkbox", "radio"].includes((interactive as HTMLInputElement).type)
      ) {
        sounds.switch();
        return;
      }

      // Por defecto para cualquier botón
      sounds.click();
    };

    document.addEventListener("click", handleGlobalClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleGlobalClick, { capture: true });
    };
  }, []);

  return null;
}
