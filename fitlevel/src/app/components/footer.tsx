"use client";

import { Instagram, Facebook, Twitter, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="w-full mt-10 bg-white border-t border-slate-200">
      {/* Barra superior con degradado animado */}
      <motion.div
        className="h-1 bg-gradient-to-r from-emerald-500 via-[#0D3B66] to-emerald-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />

      <div className="max-w-6xl mx-auto px-6 py-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Marca */}
        <div className="flex items-center gap-2">
          <p className="text-lg font-bold tracking-tight text-[#0D3B66]">
              Fit<span className="text-emerald-600">Level</span>
            </p>
        </div>

        {/* Enlaces y texto */}
        <div className="flex flex-col sm:items-center gap-1 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} FitLevel. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-xs">
            <a href="/acerca" className="hover:text-emerald-600 transition-colors">
              Acerca de
            </a>
            <a href="/terminos" className="hover:text-emerald-600 transition-colors">
              Términos
            </a>
            <a href="/privacidad" className="hover:text-emerald-600 transition-colors">
              Privacidad
            </a>
          </div>
        </div>

        {/* CTA ayuda + redes */}
        <div className="flex flex-col items-end gap-2">
          <motion.a
            href="../help"
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-600 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
          >
            ¿Necesitas ayuda?
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
            </span>
          </motion.a>

          <div className="flex items-center gap-3 text-slate-500">
            <a
              href="https://wa.me/0000000000"
              target="_blank"
              className="p-2 rounded-full bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-700 transition-transform transform hover:scale-110"
            >
              <MessageCircle size={18} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 hover:text-[#E1306C] transition-transform transform hover:scale-110"
            >
              <Instagram size={18} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 hover:text-[#1877F2] transition-transform transform hover:scale-110"
            >
              <Facebook size={18} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="p-2 rounded-full bg-slate-50 hover:bg-slate-100 hover:text-slate-900 transition-transform transform hover:scale-110"
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
