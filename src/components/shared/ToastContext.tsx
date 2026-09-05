"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, Sparkles, X, LogIn } from "lucide-react";
import { sounds } from "@/lib/sounds";

interface Toast {
  id: string;
  type: "success" | "error" | "guest" | "info";
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
    (actionName: string = "guardar en tu colección") => {
      addToast({
        type: "guest",
        title: "¡Inicia sesión para registrar!",
        description: `Crea una cuenta o entra con Google/Discord para ${actionName}.`,
      });
    },
    [addToast],
  );

  return (
    <ToastContext.Provider
      value={{ toast: addToast, success, error, guestPrompt }}
    >
      {children}
      {/* Toast container flotante */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto p-4 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-slideUp flex items-start gap-3 relative overflow-hidden ${
              t.type === "success"
                ? "bg-cine-900/90 border-emerald-500/40 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                : t.type === "error"
                  ? "bg-cine-900/90 border-red-500/40 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                  : t.type === "guest"
                    ? "bg-cine-900/95 border-purple-500/50 text-white shadow-[0_0_25px_rgba(168,85,247,0.25)]"
                    : "bg-cine-900/90 border-cine-700 text-white"
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
              {t.type === "guest" && (
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
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
              {t.type === "guest" && (
                <div className="mt-2.5">
                  <Link
                    href="/login"
                    onClick={() => removeToast(t.id)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-purple-600 to-emerald-600 hover:from-purple-500 hover:to-emerald-500 text-white rounded-lg text-[11px] font-semibold transition-all shadow-sm"
                  >
                    <LogIn className="w-3.5 h-3.5" />
                    Iniciar Sesión Ahora
                  </Link>
                </div>
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
