"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Sparkles,
  X,
  LogIn,
  ArrowRight,
} from "lucide-react";
import { sounds } from "@/lib/sounds";

interface Toast {
  id: string;
  type: "success" | "error" | "info";
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: (options: Omit<Toast, "id">) => void;
  success: (title: string, description?: string) => void;
  error: (title: string, description?: string) => void;
  guestPrompt: (actionName?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [guestModal, setGuestModal] = useState<{
    isOpen: boolean;
    actionName: string;
  }>({
    isOpen: false,
    actionName: "guardar en tu catálogo",
  });

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type, title, description }: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [
        ...prev.slice(-3),
        { id, type, title, description },
      ]);

      if (type === "success") {
        sounds.playSuccess();
      } else if (type === "error") {
        sounds.playDelete();
      } else {
        sounds.playClick();
      }

      setTimeout(() => {
        removeToast(id);
      }, 4500);
    },
    [removeToast],
  );

  const success = useCallback(
    (title: string, description?: string) => {
      addToast({ type: "success", title, description });
    },
    [addToast],
  );

  const error = useCallback(
    (title: string, description?: string) => {
      addToast({ type: "error", title, description });
    },
    [addToast],
  );

  const guestPrompt = useCallback(
    (actionName: string = "guardar en tu catálogo") => {
      sounds.playClick();
      setGuestModal({
        isOpen: true,
        actionName,
      });
    },
    [],
  );

  const closeGuestModal = useCallback(() => {
    sounds.playClick();
    setGuestModal((prev) => ({ ...prev, isOpen: false }));
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && guestModal.isOpen) {
        closeGuestModal();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [guestModal.isOpen, closeGuestModal]);

  return (
    <ToastContext.Provider
      value={{ toast: addToast, success, error, guestPrompt }}
    >
      {children}

      {/* MODAL CENTRADO EN MEDIO DE LA PANTALLA Y POR DELANTE DEL BLUR */}
      {guestModal.isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
          {/* Backdrop clickable */}
          <div className="absolute inset-0" onClick={closeGuestModal} />

          {/* Tarjeta Centrada */}
          <div className="relative z-10 w-full max-w-md bg-cine-900/95 border-2 border-purple-500/60 rounded-3xl p-6 sm:p-8 shadow-[0_0_60px_rgba(168,85,247,0.35)] animate-slideUp overflow-hidden">
            {/* Glows ambientales de fondo */}
            <div className="absolute -top-20 -right-20 w-44 h-44 bg-purple-600/30 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-emerald-600/25 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10">
              {/* Botón cerrar */}
              <button
                type="button"
                onClick={closeGuestModal}
                className="absolute -top-2 -right-2 p-2 text-cine-400 hover:text-white rounded-xl hover:bg-cine-800 transition-colors"
                title="Cerrar aviso"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Cabecera */}
              <div className="flex items-center gap-3.5 mb-4">
                <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/40 shadow-sm flex-shrink-0">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    ¡Inicia sesión para registrar!
                  </h3>
                  <span className="text-[11px] uppercase font-mono tracking-wider text-purple-400 font-bold">
                    Acción no permitida en modo invitado
                  </span>
                </div>
              </div>

              {/* Mensaje descriptivo */}
              <p className="text-xs sm:text-sm text-cine-300 leading-relaxed mb-6">
                Crea una cuenta gratuita o accede con{" "}
                <span className="text-white font-semibold">
                  Google o Discord
                </span>{" "}
                para{" "}
                <span className="text-purple-300 font-semibold">
                  {guestModal.actionName}
                </span>{" "}
                y mantener tus puntuaciones y estadísticas de Sofa / Game
                Knowledge guardadas en tu cuenta.
              </p>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <Link
                  href="/login"
                  onClick={() =>
                    setGuestModal((prev) => ({ ...prev, isOpen: false }))
                  }
                  className="w-full sm:flex-1 py-3 px-5 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)] group"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Iniciar Sesión Ahora</span>
                  <ArrowRight className="w-3.5 h-3.5 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <button
                  type="button"
                  onClick={closeGuestModal}
                  className="w-full sm:w-auto py-3 px-4 bg-cine-800/80 hover:bg-cine-800 text-cine-300 hover:text-white rounded-xl text-xs font-semibold transition-colors border border-cine-700/60"
                >
                  Continuar mirando
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast container flotante superior/inferior para toasts habituales */}
      <div className="fixed bottom-5 right-5 z-[99990] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slideUp flex items-start gap-3 relative overflow-hidden ${
              t.type === "success"
                ? "bg-cine-900/95 border-emerald-500/50 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.25)]"
                : t.type === "error"
                  ? "bg-cine-900/95 border-red-500/50 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                  : "bg-cine-900/95 border-cine-700 text-white shadow-xl"
            }`}
          >
            {/* Ícono */}
            <div className="shrink-0 mt-0.5">
              {t.type === "success" && (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
              {t.type === "error" && (
                <AlertCircle className="w-5 h-5 text-red-400" />
              )}
            </div>

            {/* Contenido */}
            <div className="flex-1 pr-4">
              <h4 className="text-xs font-bold leading-snug">{t.title}</h4>
              {t.description && (
                <p className="text-[11px] text-cine-300/90 mt-1 leading-relaxed">
                  {t.description}
                </p>
              )}
            </div>

            {/* Botón cerrar */}
            <button
              type="button"
              onClick={() => removeToast(t.id)}
              className="absolute top-3 right-3 text-cine-400 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
