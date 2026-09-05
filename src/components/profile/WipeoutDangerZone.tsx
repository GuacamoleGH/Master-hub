"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  AlertTriangle,
  Trash2,
  ShieldAlert,
  Loader2,
  X,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { useToast } from "@/components/shared/ToastContext";
import { sounds } from "@/lib/sounds";

interface WipeoutDangerZoneProps {
  onDataWiped?: () => void;
  universe?: "CINE" | "GAMING";
}

export function WipeoutDangerZone({
  onDataWiped,
  universe = "CINE",
}: WipeoutDangerZoneProps) {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [confirmedCheck, setConfirmedCheck] = useState(false);
  const [typedWord, setTypedWord] = useState("");
  const [deleteAccount, setDeleteAccount] = useState(false);
  const [isWiping, setIsWiping] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const canExecute = confirmedCheck && typedWord.trim() === "ELIMINAR" && !isWiping;

  const handleOpen = () => {
    sounds.modalOpen();
    setConfirmedCheck(false);
    setTypedWord("");
    setDeleteAccount(false);
    setErrorMessage(null);
    setIsOpen(true);
  };

  const handleClose = () => {
    sounds.modalClose();
    setIsOpen(false);
    setConfirmedCheck(false);
    setTypedWord("");
    setDeleteAccount(false);
    setErrorMessage(null);
  };

  const handleWipeout = async () => {
    if (!canExecute) return;

    setIsWiping(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/profile/wipeout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          confirmationWord: typedWord.trim(),
          deleteAccount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Error al purgar los datos");
      }

      sounds.delete();

      toast({
        type: "success",
        title: "Wipeout ejecutado",
        description: deleteAccount
          ? "Tu cuenta y todos tus datos fueron eliminados de la base de datos."
          : "Se han eliminado tus películas, series, videojuegos y se ha restablecido tu XP.",
      });

      handleClose();

      if (deleteAccount) {
        setTimeout(() => {
          signOut({ callbackUrl: "/" });
        }, 1200);
      } else {
        if (onDataWiped) {
          onDataWiped();
        } else {
          window.location.reload();
        }
      }
    } catch (err: any) {
      sounds.pop();
      setErrorMessage(err.message || "Ocurrió un problema inesperado");
    } finally {
      setIsWiping(false);
    }
  };

  return (
    <>
      {/* Tarjeta de Zona de Peligro al pie del perfil */}
      <section className="glass-panel p-6 sm:p-7 rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/20 via-cine-900/60 to-cine-950/80 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400 shrink-0">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Zona de Peligro
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-500/20 text-red-400 border border-red-500/30">
                  Wipeout de Datos
                </span>
              </div>
              <p className="text-xs sm:text-sm text-cine-400 max-w-2xl leading-relaxed">
                Purgar de forma permanente todos los registros de tu cuenta en la base de datos
                (películas vistas, series, biblioteca gamer, reseñas, notas y puntos XP).{" "}
                <span className="text-cine-300 font-semibold">
                  Esta acción solo afecta a tus datos de usuario y es completamente irreversible.
                </span>
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <button
              onClick={handleOpen}
              disabled={!session?.user}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                session?.user
                  ? "bg-red-500/10 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 hover:border-red-500 hover:shadow-red-600/30 cursor-pointer"
                  : "bg-cine-900 text-cine-600 border border-cine-800 cursor-not-allowed"
              }`}
              title={
                session?.user
                  ? "Abrir asistente de wipeout seguro"
                  : "Inicia sesión para gestionar los datos de tu cuenta"
              }
            >
              <Trash2 className="w-4 h-4" />
              <span>Wipeout de mis datos</span>
            </button>
            {!session?.user && (
              <p className="text-[10px] text-cine-500 text-right mt-1">
                Requiere iniciar sesión
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Modal de Múltiples Capas de Seguridad */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-cine-950 border border-red-500/40 rounded-3xl p-6 sm:p-7 shadow-[0_0_50px_rgba(239,68,68,0.25)] space-y-5 animate-scale-up">
            {/* Cabecera del modal */}
            <div className="flex items-start justify-between gap-4 pb-2 border-b border-cine-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white tracking-tight">
                    Confirmar Wipeout de Datos
                  </h3>
                  <p className="text-xs text-red-400/90 font-mono">
                    Acción destructiva permanente
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                disabled={isWiping}
                className="p-1.5 rounded-lg text-cine-400 hover:text-white hover:bg-cine-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Capa 1: Desglose de lo que se destruirá */}
            <div className="bg-red-950/30 border border-red-500/20 rounded-2xl p-4 text-xs space-y-2 text-cine-300">
              <p className="font-bold text-red-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                Se purgarán los siguientes registros asociados a tu cuenta (
                <span className="font-mono text-white">
                  {session?.user?.email || session?.user?.name || "tu perfil"}
                </span>
                ):
              </p>
              <ul className="list-disc pl-5 space-y-1 text-cine-400">
                <li>
                  <strong className="text-cine-200">Catálogo de Cine & Series:</strong> Todas
                  las películas y episodios vistos, lista de pendientes, calificaciones y críticas
                  personales.
                </li>
                <li>
                  <strong className="text-cine-200">Biblioteca de Videojuegos:</strong> Horas
                  jugadas acumuladas, backlog, títulos completados, platinos y notas.
                </li>
                <li>
                  <strong className="text-cine-200">Progresión y Gamificación:</strong> Tu total
                  de XP se reseteará a 0 y volverás al rango de nivel 1.
                </li>
              </ul>
            </div>

            {/* Capa 2: Checkbox de consentimiento consciente */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-cine-900/60 border border-cine-800 hover:border-red-500/30 transition-colors cursor-pointer select-none">
              <input
                type="checkbox"
                checked={confirmedCheck}
                onChange={(e) => {
                  sounds.switch();
                  setConfirmedCheck(e.target.checked);
                }}
                disabled={isWiping}
                className="mt-0.5 rounded border-cine-700 text-red-600 focus:ring-red-500 h-4 w-4 bg-cine-800"
              />
              <span className="text-xs text-cine-300 leading-snug">
                He leído las advertencias y comprendo que esta eliminación es{" "}
                <strong className="text-white">inmediata, definitiva e irreversible</strong>. No hay copias de seguridad para restaurar mis listas.
              </span>
            </label>

            {/* Capa 3: Escribir obligatoriamente la palabra ELIMINAR */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-cine-300 block">
                Escribe la palabra <span className="font-mono font-bold text-red-400">ELIMINAR</span> en mayúsculas para desbloquear la purga:
              </label>
              <input
                type="text"
                value={typedWord}
                onChange={(e) => setTypedWord(e.target.value)}
                disabled={isWiping}
                placeholder="ELIMINAR"
                autoComplete="off"
                className="w-full px-4 py-2.5 rounded-xl bg-cine-900 border border-cine-700/80 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-sm font-mono text-white placeholder-cine-600 outline-none transition-all tracking-wider"
              />
              {typedWord && typedWord !== "ELIMINAR" && (
                <p className="text-[11px] text-amber-400/90 font-mono">
                  Escribe exactamente "ELIMINAR" (todo en mayúsculas).
                </p>
              )}
            </div>

            {/* Opción adicional: Eliminar también la cuenta de usuario */}
            <label className="flex items-center gap-3 p-2.5 rounded-xl bg-cine-900/30 border border-cine-800/80 hover:border-cine-700 transition-colors cursor-pointer select-none">
              <input
                type="checkbox"
                checked={deleteAccount}
                onChange={(e) => {
                  sounds.switch();
                  setDeleteAccount(e.target.checked);
                }}
                disabled={isWiping}
                className="rounded border-cine-700 text-red-600 focus:ring-red-500 h-4 w-4 bg-cine-800"
              />
              <span className="text-xs text-cine-400">
                Eliminar también mi cuenta de usuario y cerrar sesión automáticamente
              </span>
            </label>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/50 text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                disabled={isWiping}
                className="px-4 py-2.5 rounded-xl bg-cine-900 hover:bg-cine-800 text-cine-300 hover:text-white border border-cine-700 text-xs font-semibold transition-all cursor-pointer"
              >
                Cancelar
              </button>

              <button
                type="button"
                onClick={handleWipeout}
                disabled={!canExecute}
                className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-lg ${
                  canExecute
                    ? "bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-red-600/40 cursor-pointer animate-pulse"
                    : "bg-cine-900 text-cine-600 border border-cine-800 cursor-not-allowed opacity-60"
                }`}
              >
                {isWiping ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Purgando base de datos...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Ejecutar Wipeout Definitivo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
