import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Cinephile Hub | Ball Knowledge & Movie Tracker",
  description:
    "Plataforma personal de cine, estadísticas cinematográficas y sistema de puntuación Ball Knowledge.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-cine-950 text-cine-100 antialiased min-h-screen flex flex-col selection:bg-amber-500 selection:text-cine-950">
        <Header />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <footer className="border-t border-cine-800/80 bg-cine-950/60 py-6 text-center text-xs text-cine-500">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-cine-300">Cinephile Hub</span>
              <span>•</span>
              <span>Ball Knowledge Engine 🏀</span>
            </div>
            <p className="text-cine-500">
              Datos impulsados por TMDB & OMDb. Diseñado para cinéfilos
              exigentes.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
