"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  X,
  Star,
  Loader2,
  Clock,
  Gamepad2,
  Award,
  Check,
  Plus,
  History,
  Zap,
} from "lucide-react";
import { ALL_PLATFORMS, PlatformOption } from "@/lib/platforms";
import { PlatformProgress } from "@/types/game";
import { sounds } from "@/lib/sounds";
import { useToast } from "@/components/shared/ToastContext";

const STATUS_OPTIONS = [
  { value: "BACKLOG", label: "📥 Backlog (Pendiente)" },
  { value: "PLAYING", label: "🕹️ Jugando Ahora" },
  { value: "CONTINUOUS", label: "♾️ Continuo / Sin fin" },
  { value: "COMPLETED", label: "🏆 Completado" },
  { value: "PLATINUM", label: "👑 100% Platino" },
  { value: "DROPPED", label: "💀 Abandonado" },
];

const PLATFORM_CATEGORIES = [
  "PC & Tiendas",
  "PlayStation",
  "Xbox",
  "Nintendo",
  "Portátiles & Emulación",
] as const;

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
  initialStatus?:
    | "BACKLOG"
    | "PLAYING"
    | "COMPLETED"
    | "PLATINUM"
    | "DROPPED"
    | "CONTINUOUS";
  initialRating?: number | null;
  initialHours?: number | null;
  initialPlatform?: string | null; // e.g. "PC (Steam), Xbox 360"
  initialPlatformDetails?: PlatformProgress[] | string | null;
  initialReview?: string | null;
}

export default function GameReviewModal({
  isOpen,
  onClose,
  onSaved,
  game,
  initialStatus = "COMPLETED",
  initialRating,
  initialHours,
  initialPlatform,
  initialPlatformDetails,
  initialReview,
}: GameReviewModalProps) {
  const getInitialGameRating = () => {
    if (initialRating !== null && initialRating !== undefined) {
      return initialRating;
    }
    if (typeof game.metacritic === "number" && game.metacritic > 0) {
      return Number((game.metacritic / 10).toFixed(1));
    }
    return 8.0;
  };

  const [status, setStatus] = useState(initialStatus);
  const [rating, setRating] = useState<number>(getInitialGameRating);
  const [hasRating, setHasRating] = useState<boolean>(true);
  const [hours, setHours] = useState<string>(
    initialHours ? String(initialHours) : "",
  );
  const [platformProgressList, setPlatformProgressList] = useState<
    PlatformProgress[]
  >([]);
  const [activeCategory, setActiveCategory] = useState<string>("PC & Tiendas");
  const [customPlatform, setCustomPlatform] = useState("");
  const [review, setReview] = useState<string>(initialReview || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toast = useToast();

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

  useEffect(() => {
    if (isOpen) {
      setStatus(initialStatus);
      const fallbackGameRating =
        typeof game.metacritic === "number" && game.metacritic > 0
          ? Number((game.metacritic / 10).toFixed(1))
          : 8.0;
      setRating(
        initialRating !== null && initialRating !== undefined
          ? initialRating
          : fallbackGameRating,
      );
      // Cargar desglose de plataformas
      let loadedList: PlatformProgress[] = [];
      if (initialPlatformDetails) {
        if (typeof initialPlatformDetails === "string") {
          try {
            loadedList = JSON.parse(initialPlatformDetails);
          } catch {}
        } else if (Array.isArray(initialPlatformDetails)) {
          loadedList = [...initialPlatformDetails];
        }
      }

      if (loadedList.length === 0) {
        if (initialPlatform) {
          const parsed = initialPlatform
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean);
          loadedList = parsed.map((p, idx) => ({
            platform: p,
            hours: idx === 0 ? initialHours || 0 : 0,
            status: initialStatus,
          }));
        }
      }

      // Si solo hay una plataforma seleccionada, cuadrar el estado general con esa plataforma
      let resolvedStatus = initialStatus;
      if (loadedList.length === 1 && loadedList[0].status) {
        resolvedStatus = loadedList[0].status;
      }
      setStatus(resolvedStatus);

      // Si no está seleccionado el estado completado ni en el general ni en ninguna plataforma, desmarcar por defecto la casilla de nota
      const isAnyCompleted =
        resolvedStatus === "COMPLETED" ||
        resolvedStatus === "PLATINUM" ||
        loadedList.some(
          (p) => p.status === "COMPLETED" || p.status === "PLATINUM",
        );

      setHasRating(isAnyCompleted);

      setPlatformProgressList(loadedList);
      const totalH = loadedList.reduce(
        (acc, p) => acc + (Number(p.hours) || 0),
        0,
      );
      setHours(
        totalH > 0 ? String(totalH) : initialHours ? String(initialHours) : "",
      );
      setReview(initialReview || "");
    }
  }, [
    isOpen,
    initialStatus,
    initialRating,
    initialHours,
    initialPlatform,
    initialPlatformDetails,
    initialReview,
    game,
  ]);

  if (!isOpen) return null;

  const selectedPlatformNames = platformProgressList.map((p) => p.platform);

  const handleStatusChange = (
    newStatus:
      | "BACKLOG"
      | "PLAYING"
      | "COMPLETED"
      | "PLATINUM"
      | "DROPPED"
      | "CONTINUOUS",
  ) => {
    setStatus(newStatus);

    let nextList = platformProgressList;
    if (platformProgressList.length === 1) {
      nextList = platformProgressList.map((p) => ({
        ...p,
        status: newStatus,
      }));
      setPlatformProgressList(nextList);
    }

    const isAnyCompleted =
      newStatus === "COMPLETED" ||
      newStatus === "PLATINUM" ||
      nextList.some((p) => p.status === "COMPLETED" || p.status === "PLATINUM");

    setHasRating(isAnyCompleted);
  };

  const togglePlatform = (name: string) => {
    setPlatformProgressList((prev) => {
      const exists = prev.some((p) => p.platform === name);
      let next: PlatformProgress[];
      if (exists) {
        next = prev.filter((p) => p.platform !== name);
      } else {
        next = [...prev, { platform: name, hours: 0, status: status }];
      }
      if (next.length === 1) {
        next[0].status = status;
      }
      const totalH = next.reduce((acc, p) => acc + (Number(p.hours) || 0), 0);
      setHours(totalH > 0 ? String(totalH) : "");
      return next;
    });
  };

  const updatePlatformHours = (platformName: string, h: number) => {
    setPlatformProgressList((prev) => {
      const next = prev.map((p) =>
        p.platform === platformName ? { ...p, hours: Math.max(0, h) } : p,
      );
      const totalH = next.reduce((acc, p) => acc + (Number(p.hours) || 0), 0);
      setHours(totalH > 0 ? String(totalH) : "");
      return next;
    });
  };

  const updatePlatformStatus = (
    platformName: string,
    st:
      | "BACKLOG"
      | "PLAYING"
      | "COMPLETED"
      | "PLATINUM"
      | "DROPPED"
      | "CONTINUOUS",
  ) => {
    setPlatformProgressList((prev) => {
      const next = prev.map((p) =>
        p.platform === platformName ? { ...p, status: st } : p,
      );

      let currentStatus = status;
      if (next.length === 1) {
        currentStatus = st;
        setStatus(st);
      }

      const isAnyCompleted =
        currentStatus === "COMPLETED" ||
        currentStatus === "PLATINUM" ||
        next.some((p) => p.status === "COMPLETED" || p.status === "PLATINUM");

      setHasRating(isAnyCompleted);
      return next;
    });
  };

  const addCustomPlatform = () => {
    const trimmed = customPlatform.trim();
    if (trimmed && !selectedPlatformNames.includes(trimmed)) {
      setPlatformProgressList((prev) => {
        const next = [...prev, { platform: trimmed, hours: 0, status }];
        if (next.length === 1) {
          next[0].status = status;
        }
        return next;
      });
      setCustomPlatform("");
    }
  };

  const calculatedTotalHours = platformProgressList.reduce(
    (acc, p) => acc + (Number(p.hours) || 0),
    0,
  );

  const handleTotalHoursChange = (val: string) => {
    setHours(val);
    const num = parseFloat(val);
    if (!isNaN(num) && platformProgressList.length === 1) {
      updatePlatformHours(platformProgressList[0].platform, num);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const totalH =
        calculatedTotalHours > 0
          ? calculatedTotalHours
          : hours.trim()
            ? parseFloat(hours)
            : null;

      const payload: any = {
        rawgId: game.rawgId,
        status,
        platform:
          platformProgressList.length > 0
            ? platformProgressList.map((p) => p.platform).join(", ")
            : null,
        platformDetails: JSON.stringify(platformProgressList),
        review: review.trim() || null,
        hoursPlayed: totalH,
      };

      if (
        hasRating &&
        (status === "COMPLETED" ||
          status === "PLATINUM" ||
          status === "DROPPED" ||
          status === "PLAYING" ||
          status === "CONTINUOUS")
      ) {
        payload.userRating = Number(rating.toFixed(1));
      } else {
        payload.userRating = null;
      }

      const res = await fetch("/api/user-games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.status === 401) {
        toast.guestPrompt("guardar videojuegos en tu catálogo");
        return;
      }

      if (res.ok) {
        if (status === "PLATINUM") {
          sounds.achievement();
        } else {
          sounds.playSuccess();
        }
        toast.success(
          "¡Juego registrado!",
          status === "COMPLETED" || status === "PLATINUM"
            ? `Marcado como ${status === "PLATINUM" ? "100% Platino 👑" : "Completado 🏆"} (+15 XP)`
            : "Añadido a tu colección gamer",
        );
        onSaved();
        onClose();
      }
    } catch (err) {
      console.error("Error al guardar juego:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickPlayedLongAgo = async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/user-games", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rawgId: game.rawgId,
          status: "COMPLETED",
          userRating: null,
          hoursPlayed: null,
          platform:
            platformProgressList.length > 0
              ? platformProgressList.map((p) => p.platform).join(", ")
              : null,
          platformDetails:
            platformProgressList.length > 0
              ? JSON.stringify(platformProgressList)
              : null,
          review: null,
          completedDate: null,
        }),
      });

      if (res.status === 401) {
        toast.guestPrompt("guardar videojuegos en tu catálogo");
        return;
      }

      if (res.ok) {
        sounds.playSuccess();
        toast.success(
          "¡Juego guardado!",
          "Marcado como completado en su día 🕹️ (+15 XP)",
        );
        onSaved();
        onClose();
      }
    } catch (err) {
      console.error("Error al guardar juego:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="glass-panel w-full max-w-xl rounded-3xl border border-purple-500/30 overflow-hidden shadow-2xl bg-cine-950/95 flex flex-col max-h-[92vh]">
        {/* Cabecera */}
        <div className="p-6 border-b border-cine-800 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {game.backgroundImage && (
              <img
                src={game.backgroundImage}
                alt={game.title}
                className="w-14 h-16 object-cover rounded-xl border border-white/10"
              />
            )}
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-purple-400 font-bold">
                Registro Gamer Multi-Plataforma
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

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6">
          {/* Acción rápida: Jugado en su día */}
          <div className="p-3.5 bg-purple-950/40 border border-purple-500/30 rounded-2xl flex items-center justify-between gap-3 shadow-inner">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-purple-900/50 border border-purple-500/40 flex items-center justify-center text-cyan-300 shrink-0">
                <History className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  ¿Lo jugaste en su día?
                </div>
                <div className="text-[11px] text-purple-300/80 truncate">
                  Guardar como completado sin nota ni horas
                </div>
              </div>
            </div>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleQuickPlayedLongAgo}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gradient-to-r from-purple-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white transition-all shrink-0 shadow-sm flex items-center gap-1.5 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5 fill-white text-white shrink-0" />
              <span>Guardar rápido</span>
            </button>
          </div>

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
                  onClick={() => handleStatusChange(opt.value as any)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left truncate ${
                    status === opt.value
                      ? "bg-purple-600/30 border-purple-400 text-white shadow-[0_0_12px_rgba(139,92,246,0.3)]"
                      : "bg-cine-900/60 border-cine-800 text-cine-400 hover:bg-cine-800"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            {status === "CONTINUOUS" && (
              <p className="text-[11px] text-sky-300 font-mono bg-sky-950/40 border border-sky-500/30 p-2.5 rounded-xl mt-1.5 flex items-start gap-1.5 animate-fade-in">
                <span>♾️</span>
                <span>
                  <strong>Juego Continuo / Sin fin:</strong> Ideal para títulos
                  multijugador, competitivos o infinitos tipo Counter-Strike,
                  LoL, Valorant, Rocket League o FIFA que no tienen una campaña
                  que terminar.
                </span>
              </p>
            )}
          </div>

          {/* Horas Jugadas Totales */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-cyan-400" /> Horas Jugadas
                Totales
              </label>
              {platformProgressList.length > 1 && (
                <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/50 border border-cyan-500/20 px-2 py-0.5 rounded-md">
                  Suma automática ({calculatedTotalHours}h)
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              <div className="relative w-36 sm:w-40">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="9999"
                  readOnly={platformProgressList.length > 1}
                  value={
                    platformProgressList.length > 1
                      ? calculatedTotalHours > 0
                        ? calculatedTotalHours
                        : ""
                      : platformProgressList.length === 1
                        ? platformProgressList[0].hours > 0
                          ? platformProgressList[0].hours
                          : hours
                        : hours
                  }
                  onChange={(e) => handleTotalHoursChange(e.target.value)}
                  placeholder="0"
                  className={`w-full pl-3 pr-14 py-2 bg-cine-900 border rounded-xl text-sm font-mono focus:outline-none transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                    platformProgressList.length > 1
                      ? "border-cine-800 text-cyan-300 bg-cine-950/60 cursor-default"
                      : "border-cine-700 text-white placeholder-cine-600 focus:border-cyan-400"
                  }`}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-cine-500 font-mono pointer-events-none select-none">
                  horas
                </span>
              </div>
              {platformProgressList.length > 1 && (
                <span className="text-xs text-cine-400 hidden sm:inline">
                  Desglosadas por plataforma abajo
                </span>
              )}
            </div>
          </div>

          {/* Selector Multi-Plataforma con Desglose */}
          <div className="space-y-3 pt-2 border-t border-cine-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
                <Gamepad2 className="w-3.5 h-3.5 text-purple-400" /> Plataformas
                registradas (Horas y Estado individual)
              </label>
              <span className="text-[11px] font-mono text-purple-300">
                {platformProgressList.length} seleccionada(s)
              </span>
            </div>

            {/* Tarjetas interactivas de cada plataforma seleccionada */}
            {platformProgressList.length > 0 ? (
              <div className="space-y-2">
                {platformProgressList.map((p) => (
                  <div
                    key={p.platform}
                    className="p-3 rounded-2xl bg-cine-900/90 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 shadow-sm"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 flex-shrink-0" />
                      <span className="text-xs font-mono font-bold text-white">
                        {p.platform}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {/* Horas en esta plataforma */}
                      <div className="flex items-center gap-1.5 bg-cine-950 px-2.5 py-1 rounded-xl border border-cine-700">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        <input
                          type="number"
                          min="0"
                          step="0.5"
                          value={p.hours === 0 ? "" : p.hours}
                          onChange={(e) =>
                            updatePlatformHours(
                              p.platform,
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          placeholder="0"
                          className="w-12 bg-transparent font-mono text-xs font-bold text-cyan-300 text-right focus:outline-none placeholder-cine-600"
                        />
                        <span className="text-[10px] text-cine-500 font-mono">
                          horas
                        </span>
                      </div>

                      {/* Estado en esta plataforma */}
                      <select
                        value={p.status}
                        onChange={(e) =>
                          updatePlatformStatus(
                            p.platform,
                            e.target.value as any,
                          )
                        }
                        className="bg-cine-950 border border-cine-700 rounded-xl px-2 py-1 text-xs font-semibold text-purple-300 focus:outline-none focus:border-purple-400 cursor-pointer"
                      >
                        {STATUS_OPTIONS.map((opt) => (
                          <option
                            key={opt.value}
                            value={opt.value}
                            className="bg-cine-900 text-white"
                          >
                            {opt.label}
                          </option>
                        ))}
                      </select>

                      {/* Botón quitar */}
                      <button
                        type="button"
                        onClick={() => togglePlatform(p.platform)}
                        className="p-1 rounded-lg text-cine-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        title="Quitar plataforma"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 text-center text-xs text-cine-500 bg-cine-900/40 rounded-xl border border-dashed border-cine-800">
                Selecciona al menos una plataforma abajo para registrar horas y
                estado individual.
              </div>
            )}

            {/* Pestañas de categorías de plataformas */}
            <div className="flex flex-wrap gap-1 border-b border-cine-800 pb-1 text-xs pt-1">
              {PLATFORM_CATEGORIES.map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-cine-800 text-purple-300 border border-purple-500/30"
                      : "text-cine-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grid de opciones de la categoría activa */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 max-h-36 overflow-y-auto p-1">
              {ALL_PLATFORMS.filter((p) => p.category === activeCategory).map(
                (plat) => {
                  const isSelected = selectedPlatformNames.includes(plat.name);
                  return (
                    <button
                      type="button"
                      key={plat.id}
                      onClick={() => togglePlatform(plat.name)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono text-left transition-all flex items-center justify-between border ${
                        isSelected
                          ? "bg-purple-600/30 border-purple-400 text-white font-bold"
                          : "bg-cine-900 border-cine-800 text-cine-400 hover:border-cine-700 hover:text-cine-200"
                      }`}
                    >
                      <span className="truncate">{plat.name}</span>
                      {isSelected && (
                        <Check className="w-3 h-3 text-cyan-400 flex-shrink-0" />
                      )}
                    </button>
                  );
                },
              )}
            </div>

            {/* Añadir plataforma personalizada si no está en la lista */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={customPlatform}
                onChange={(e) => setCustomPlatform(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addCustomPlatform();
                  }
                }}
                placeholder="Otra plataforma (ej. PS Vita, Amiga, SteamOS)..."
                className="flex-1 px-3 py-1.5 bg-cine-900 border border-cine-800 rounded-xl text-xs text-white placeholder-cine-500 focus:outline-none focus:border-purple-400"
              />
              <button
                type="button"
                onClick={addCustomPlatform}
                className="px-3 py-1.5 bg-cine-800 hover:bg-cine-700 text-purple-300 font-semibold rounded-xl text-xs flex items-center gap-1"
              >
                <Plus className="w-3 h-3" /> Añadir
              </button>
            </div>
          </div>

          {/* Calificación */}
          <div className="space-y-3 pt-2 border-t border-cine-800/80">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-cine-300 flex items-center gap-1.5">
                <Star className="w-3.5 h-3.5 text-purple-400 fill-purple-400" />{" "}
                Tu Puntuación
              </label>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="enableRating"
                  checked={hasRating}
                  onChange={(e) => setHasRating(e.target.checked)}
                  className="rounded border-cine-700 text-purple-600 focus:ring-purple-500"
                />
                <label
                  htmlFor="enableRating"
                  className="text-xs text-cine-400 cursor-pointer"
                >
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
                  <span className="text-xs text-cine-400 font-mono">
                    de 10.0
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={rating}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setRating(val);
                    sounds.playStar(Math.round(val));
                  }}
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
              placeholder="¿Qué te pareció en cada plataforma?..."
              rows={3}
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
    </div>,
    document.body,
  );
}
