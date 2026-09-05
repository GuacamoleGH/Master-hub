"use client";

import React, { useRef, useEffect, useState } from "react";
import {
  Sparkles,
  Download,
  Share2,
  X,
  Trophy,
  Film,
  Gamepad2,
  Check,
  Loader2,
  Camera,
} from "lucide-react";
import { UserAchievement } from "@/lib/achievements";
import { sounds } from "@/lib/sounds";
import { useToast } from "@/components/shared/ToastContext";

interface SocialWrappedModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    displayName: string;
    username?: string | null;
    avatarUrl?: string | null;
  };
  stats: {
    totalMovies?: number;
    totalSeries?: number;
    totalHours?: number;
    totalCompletedGames?: number;
    ballKnowledge?: number | null;
    gameKnowledge?: number | null;
  };
  achievements?: UserAchievement[];
}

export default function SocialWrappedModal({
  isOpen,
  onClose,
  user,
  stats,
  achievements = [],
}: SocialWrappedModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const toast = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  const unlockedAchievements = achievements
    .filter((a) => a.isUnlocked)
    .slice(0, 3);

  // Generador Canvas
  const drawCard = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsGenerating(true);

    const W = 1080;
    const H = 1920;
    canvas.width = W;
    canvas.height = H;

    // 1. Fondo Oscuro Profundo
    const bgGradient = ctx.createLinearGradient(0, 0, W, H);
    bgGradient.addColorStop(0, "#080b14");
    bgGradient.addColorStop(0.5, "#0b0f19");
    bgGradient.addColorStop(1, "#05070d");
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, W, H);

    // 2. Luces ambientales y destellos radiales
    const glow1 = ctx.createRadialGradient(900, 200, 50, 900, 200, 600);
    glow1.addColorStop(0, "rgba(245, 158, 11, 0.25)");
    glow1.addColorStop(1, "rgba(245, 158, 11, 0)");
    ctx.fillStyle = glow1;
    ctx.fillRect(0, 0, W, H);

    const glow2 = ctx.createRadialGradient(200, 1600, 50, 200, 1600, 700);
    glow2.addColorStop(0, "rgba(139, 92, 246, 0.3)");
    glow2.addColorStop(1, "rgba(139, 92, 246, 0)");
    ctx.fillStyle = glow2;
    ctx.fillRect(0, 0, W, H);

    // Borde exterior estilizado
    ctx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    ctx.lineWidth = 12;
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(40, 40, W - 80, H - 80, 48);
      ctx.stroke();
    } else {
      ctx.strokeRect(40, 40, W - 80, H - 80);
    }

    // 3. Encabezado MasterHub
    ctx.fillStyle = "#f59e0b";
    ctx.font = "bold 32px monospace";
    ctx.textAlign = "left";
    ctx.fillText("MASTERHUB • v4.0", 100, 140);

    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.font = "24px sans-serif";
    ctx.fillText("RESUMEN DE UNIVERSO", 100, 180);

    // Fecha / Año
    ctx.textAlign = "right";
    ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
    ctx.font = "bold 28px monospace";
    ctx.fillText(new Date().getFullYear().toString(), W - 100, 140);

    // 4. Tarjeta del Usuario
    const cardY = 240;
    const cardH = 260;
    ctx.fillStyle = "rgba(17, 24, 39, 0.75)";
    ctx.strokeStyle = "rgba(245, 158, 11, 0.3)";
    ctx.lineWidth = 3;
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(100, cardY, W - 200, cardH, 36);
      ctx.fill();
      ctx.stroke();
    }

    // Avatar o Monograma
    const avatarSize = 140;
    const avatarX = 150;
    const avatarY = cardY + 60;

    let avatarDrawn = false;
    if (user.avatarUrl) {
      try {
        const img = new Image();
        img.crossOrigin = "anonymous";
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = user.avatarUrl!;
        });

        ctx.save();
        ctx.beginPath();
        ctx.arc(
          avatarX + avatarSize / 2,
          avatarY + avatarSize / 2,
          avatarSize / 2,
          0,
          Math.PI * 2
        );
        ctx.clip();
        ctx.drawImage(img, avatarX, avatarY, avatarSize, avatarSize);
        ctx.restore();
        avatarDrawn = true;
      } catch {}
    }

    if (!avatarDrawn) {
      // Monograma
      const grad = ctx.createLinearGradient(
        avatarX,
        avatarY,
        avatarX + avatarSize,
        avatarY + avatarSize
      );
      grad.addColorStop(0, "#f59e0b");
      grad.addColorStop(1, "#8b5cf6");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2,
        avatarSize / 2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.font = "black 54px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      const initial = (user.displayName || "C")[0].toUpperCase();
      ctx.fillText(
        initial,
        avatarX + avatarSize / 2,
        avatarY + avatarSize / 2
      );
    }

    // Datos de texto del usuario
    ctx.textAlign = "left";
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 48px sans-serif";
    ctx.fillText(user.displayName, avatarX + avatarSize + 40, avatarY + 65);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "28px monospace";
    ctx.fillText(
      user.username ? `@${user.username}` : "@explorador",
      avatarX + avatarSize + 40,
      avatarY + 115
    );

    // 5. SECCIÓN DE ESTADÍSTICAS (4 CAJAS GIGANTES)
    const statsY = 550;
    const boxW = (W - 240) / 2;
    const boxH = 240;

    // Caja 1: Cine Visto
    drawStatBox(
      ctx,
      100,
      statsY,
      boxW,
      boxH,
      "PELÍCULAS",
      (stats.totalMovies || 0).toString(),
      "vistas y analizadas",
      "#f59e0b",
      "rgba(245, 158, 11, 0.15)"
    );

    // Caja 2: Sofa Knowledge
    drawStatBox(
      ctx,
      100 + boxW + 40,
      statsY,
      boxW,
      boxH,
      "SOFA KNOWLEDGE",
      stats.ballKnowledge ? `${stats.ballKnowledge}%` : "—",
      "precisión frente a IMDb",
      "#10b981",
      "rgba(16, 185, 129, 0.15)"
    );

    // Caja 3: Horas de Juego
    drawStatBox(
      ctx,
      100,
      statsY + boxH + 35,
      boxW,
      boxH,
      "HORAS GAMER",
      `${Math.round(stats.totalHours || 0)}h`,
      "tiempo de juego total",
      "#06b6d4",
      "rgba(6, 182, 212, 0.15)"
    );

    // Caja 4: Game Knowledge
    drawStatBox(
      ctx,
      100 + boxW + 40,
      statsY + boxH + 35,
      boxW,
      boxH,
      "GAME KNOWLEDGE",
      stats.gameKnowledge ? `${stats.gameKnowledge}%` : "—",
      "precisión frente a Metacritic",
      "#a855f7",
      "rgba(168, 85, 247, 0.15)"
    );

    // 6. VITRINA DE MEDALLAS / TOP LOGROS
    const trophySectionY = 1130;
    ctx.fillStyle = "rgba(17, 24, 39, 0.85)";
    ctx.strokeStyle = "rgba(168, 85, 247, 0.35)";
    ctx.lineWidth = 3;
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(100, trophySectionY, W - 200, 480, 36);
      ctx.fill();
      ctx.stroke();
    }

    ctx.textAlign = "left";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px sans-serif";
    ctx.fillText("🏆 Vitrina de Medallas Insignia", 150, trophySectionY + 80);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "24px sans-serif";
    ctx.fillText(
      "Mayores hazañas culturales alcanzadas en la plataforma",
      150,
      trophySectionY + 120
    );

    // Dibujar hasta 3 medallas
    if (unlockedAchievements.length === 0) {
      ctx.fillStyle = "#6b7280";
      ctx.font = "italic 28px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        "Continúa explorando catálogo para desbloquear medallas.",
        W / 2,
        trophySectionY + 280
      );
    } else {
      unlockedAchievements.forEach((ach, idx) => {
        const itemY = trophySectionY + 160 + idx * 95;

        // Círculo de medalla
        ctx.fillStyle =
          ach.rarity === "DIAMOND"
            ? "#06b6d4"
            : ach.rarity === "GOLD"
            ? "#eab308"
            : ach.rarity === "SILVER"
            ? "#cbd5e1"
            : "#d97706";
        ctx.beginPath();
        ctx.arc(180, itemY + 25, 24, 0, Math.PI * 2);
        ctx.fill();

        ctx.textAlign = "left";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 28px sans-serif";
        ctx.fillText(ach.title, 230, itemY + 24);

        ctx.fillStyle = "#9ca3af";
        ctx.font = "20px sans-serif";
        ctx.fillText(ach.description, 230, itemY + 52);

        // Badge de XP
        ctx.textAlign = "right";
        ctx.fillStyle = "#f59e0b";
        ctx.font = "bold 24px monospace";
        ctx.fillText(`+${ach.xp} XP`, W - 150, itemY + 35);
      });
    }

    // 7. Pie de Tarjeta
    const footerY = 1720;
    ctx.textAlign = "center";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 32px sans-serif";
    ctx.fillText("MasterHub • Centro de Mando Multi-Universo", W / 2, footerY);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "24px monospace";
    ctx.fillText(
      user.username
        ? `masterhub.app/u/${user.username}`
        : "masterhub.app",
      W / 2,
      footerY + 45
    );

    ctx.fillStyle = "rgba(245, 158, 11, 0.7)";
    ctx.font = "20px sans-serif";
    ctx.fillText("Hecho con pasión por Guacamole", W / 2, footerY + 90);

    const generated = canvas.toDataURL("image/png");
    setDataUrl(generated);
    setIsGenerating(false);
  };

  const drawStatBox = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    label: string,
    value: string,
    sub: string,
    accentColor: string,
    accentBg: string
  ) => {
    ctx.fillStyle = "rgba(17, 24, 39, 0.7)";
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.lineWidth = 2;
    if (typeof ctx.roundRect === "function") {
      ctx.beginPath();
      ctx.roundRect(x, y, w, h, 28);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = accentColor;
    ctx.font = "bold 22px monospace";
    ctx.textAlign = "left";
    ctx.fillText(label, x + 35, y + 55);

    ctx.fillStyle = "#ffffff";
    ctx.font = "black 62px monospace";
    ctx.fillText(value, x + 35, y + 140);

    ctx.fillStyle = "#9ca3af";
    ctx.font = "20px sans-serif";
    ctx.fillText(sub, x + 35, y + 190);
  };

  useEffect(() => {
    if (isOpen) {
      sounds.shutter();
      setTimeout(() => {
        drawCard();
      }, 100);
    }
  }, [isOpen]);

  const handleDownload = () => {
    if (!dataUrl) return;
    sounds.shutter();
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `masterhub-wrapped-${user.username || "perfil"}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("¡Tarjeta descargada con éxito!");
  };

  const handleShare = async () => {
    sounds.click();
    if (navigator.share && dataUrl) {
      try {
        const blob = await (await fetch(dataUrl)).blob();
        const file = new File([blob], "masterhub-wrapped.png", {
          type: "image/png",
        });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `MasterHub de ${user.displayName}`,
            text: `¡Mira mis estadísticas en MasterHub! #MasterHub #Cine #Gaming`,
            files: [file],
          });
          return;
        }
      } catch (e) {
        console.error(e);
      }
    }

    // Fallback: copiar enlace
    if (navigator.clipboard) {
      const url = `${window.location.origin}/u/${user.username || ""}`;
      navigator.clipboard.writeText(url);
      toast.success("Enlace a tu perfil copiado al portapapeles");
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[95vh] rounded-3xl bg-cine-950 border border-cine-800 p-5 sm:p-7 shadow-2xl flex flex-col relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            sounds.click();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-xl bg-cine-900 text-cine-400 hover:text-white hover:bg-cine-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-black text-white tracking-tight">
              MasterHub Wrapped
            </h3>
            <p className="text-xs text-cine-400">
              Tarjeta visual lista para historias de Instagram, X y WhatsApp.
            </p>
          </div>
        </div>

        {/* Vista previa en miniatura del Canvas */}
        <div className="flex-1 overflow-y-auto flex items-center justify-center py-2 bg-cine-900/40 rounded-2xl border border-cine-800/80 my-2 relative">
          <canvas ref={canvasRef} className="hidden" />

          {isGenerating ? (
            <div className="flex flex-col items-center justify-center p-12 text-cine-400 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
              <span className="text-sm font-medium">Renderizando tu tarjeta en alta resolución...</span>
            </div>
          ) : dataUrl ? (
            <img
              src={dataUrl}
              alt="MasterHub Wrapped"
              className="max-h-[55vh] rounded-xl shadow-2xl border border-cine-700/80 object-contain"
            />
          ) : null}
        </div>

        {/* Botones de acción */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-2">
          <button
            onClick={handleDownload}
            disabled={!dataUrl}
            className="py-3 px-5 rounded-xl bg-amber-500 hover:bg-amber-400 text-cine-950 font-black text-sm transition-all shadow-gold-glow flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Imagen (PNG)</span>
          </button>
          <button
            onClick={handleShare}
            disabled={!dataUrl}
            className="py-3 px-5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-sm transition-all shadow-[0_0_15px_rgba(168,85,247,0.3)] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Share2 className="w-4 h-4" />
            <span>Compartir en Redes</span>
          </button>
        </div>
      </div>
    </div>
  );
}
