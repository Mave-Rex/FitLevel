// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "FitLevel",
  description: "Gestión de alumnos para profesores de entrenamiento",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-slate-950 text-slate-100">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <header className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold tracking-tight">
              Fit<span className="text-emerald-400">Level</span>
            </h1>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
