// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import VerticalAdsBar from "./components/AdsSidebar";

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
            {/* Brand */}
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.jpg"
                alt="FitLevel Logo"
                width={55}          // 🔼 aumenta aquí (ej: 56, 64, 72)
                height={55}
                className="rounded-md"
                priority
              />
              <h1 className="text-xl font-bold tracking-tight">
                Fit<span className="text-emerald-400">Level</span>
              </h1>
            </Link>
          </header>

          <VerticalAdsBar side="left" />
          <VerticalAdsBar side="right" />

          {children}
        </div>
      </body>
    </html>
  );
}
