// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "./components/navbar";
import VerticalAdsBar from "./components/AdsSidebar";
import Footer from "./components/footer";
import AdsFloating from "./components/AdsFloating";

export const metadata = {
  title: "FitLevel",
  description: "Gestión de alumnos para profesores de entrenamiento",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen flex flex-col text-slate-100 bg-slate-950">
        {/* Fondo decorativo */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(13,59,102,0.18),transparent_55%)]" />
        </div>

        <Navbar />

        <VerticalAdsBar side="left" />
        <VerticalAdsBar side="right" />
        <AdsFloating />

        {/* 👇 ESTE flex-1 es la clave */}
        <main className="flex-1 max-w-5xl mx-auto px-4 py-6 w-full">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
