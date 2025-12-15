"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  LogIn,
  HelpCircle,
  Home,
  LogOut,
  Trophy,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";

function NavLink({
  href,
  label,
  icon,
  active,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={[
        "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active
          ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
          : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
      ].join(" ")}
    >
      {icon}
      {label}
    </Link>
  );
}

export default function Navbar() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [hasSession, setHasSession] = useState(false);

  // Detectar "sesión" mock en localStorage (professor)
  useEffect(() => {
    try {
      const p = localStorage.getItem("professor");
      setHasSession(!!p);
    } catch {
      setHasSession(false);
    }
  }, [pathname]);

 const links = useMemo(
  () => [
    { href: "/", label: "Inicio", icon: <Home size={16} /> },

    ...(hasSession
      ? [
          {
            href: "/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard size={16} />,
          },
          {
            href: "/rankings",
            label: "Rankings",
            icon: <Trophy size={16} />,
          },
        ]
      : [
          {
            href: "/login",
            label: "Login",
            icon: <LogIn size={16} />,
          },
        ]),

    { href: "/help", label: "Ayuda", icon: <HelpCircle size={16} /> },
  ],
  [hasSession]
);


  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const subtitle = useMemo(() => {
    if (pathname === "/") return "Inicio";
    if (pathname.startsWith("/dashboard")) return "Panel del profesor";
    if (pathname.startsWith("/students/")) return "Detalle del alumno";
    if (pathname.startsWith("/public/students/")) return "Vista pública del progreso";
    if (pathname.startsWith("/help")) return "Centro de ayuda";
    if (pathname.startsWith("/login")) return "Acceso";
    return "FitLevel";
  }, [pathname]);

  function closeMenu() {
    setOpen(false);
  }

  function logout() {
    localStorage.removeItem("professor");
    setHasSession(false);
    closeMenu();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
          <div className="relative">
            <Image
              src="/images/logo.JPG"
              alt="FitLevel Logo"
              width={44}
              height={44}
              className="rounded-md ring-1 ring-slate-200"
              priority
            />
            {/* Glow sutil */}
            <div className="absolute -inset-1 -z-10 rounded-lg bg-emerald-500/10 blur-md" />
          </div>

          <div className="leading-tight">
            <p className="text-lg font-bold tracking-tight text-[#0D3B66]">
              Fit<span className="text-emerald-600">Level</span>
            </p>

            {/* ✅ Subtítulo dinámico según ruta */}
            <p className="text-[11px] text-slate-500">{subtitle}</p>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.href}
              href={l.href}
              label={l.label}
              icon={l.icon}
              active={active(l.href)}
              onClick={closeMenu}
            />
          ))}

          {hasSession && (
            <button
              onClick={logout}
              className="ml-2 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
            >
              <LogOut size={16} />
              Salir
            </button>
          )}
        </nav>

        {/* Mobile button */}
        <button
          className="md:hidden inline-flex items-center justify-center rounded-lg p-2 text-slate-700 hover:bg-slate-100"
          onClick={() => setOpen((v) => !v)}
          aria-label="Abrir menú"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Línea animada (detalle) */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-emerald-500 via-[#0D3B66] to-emerald-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden border-b border-slate-200 bg-white/95 backdrop-blur"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="max-w-5xl mx-auto px-4 py-3 flex flex-col gap-1">
              {links.map((l) => (
                <NavLink
                  key={l.href}
                  href={l.href}
                  label={l.label}
                  icon={l.icon}
                  active={active(l.href)}
                  onClick={closeMenu}
                />
              ))}

              {hasSession && (
                <button
                  onClick={logout}
                  className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors"
                >
                  <LogOut size={16} />
                  Salir
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
