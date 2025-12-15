"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

const sponsors = [
  { id: 1, img: "/images/anuncio_13.png", href: "#" },
  { id: 2, img: "/images/anuncio_3.png", href: "#" },
  { id: 3, img: "/images/anuncio_1.png", href: "#" },
];

const STORAGE_KEY = "fitlevel_ads_closed_until";

export default function AdsFloating() {
  const pathname = usePathname();

  // ✅ Opcional: NO mostrar en login/registro (ajusta rutas)
  const isHiddenRoute = useMemo(() => {
    return pathname.startsWith("/login") || pathname.startsWith("/register");
  }, [pathname]);

  const [index, setIndex] = useState(0);
  const [closed, setClosed] = useState(true); // arranca cerrado hasta validar localStorage
  const current = sponsors[index];

  useEffect(() => {
    if (isHiddenRoute) return;

    // ✅ recordar cierre por 12h
    const raw = localStorage.getItem(STORAGE_KEY);
    const until = raw ? Number(raw) : 0;
    const now = Date.now();

    if (!until || now > until) {
      // abrir con delay suave
      const t = setTimeout(() => setClosed(false), 1200);
      return () => clearTimeout(t);
    } else {
      setClosed(true);
    }
  }, [isHiddenRoute]);

  useEffect(() => {
    if (closed || isHiddenRoute) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % sponsors.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [closed, isHiddenRoute]);

  const onClose = () => {
    setClosed(true);
    // 12 horas (puedes cambiarlo)
    localStorage.setItem(STORAGE_KEY, String(Date.now() + 12 * 60 * 60 * 1000));
  };

  if (closed || isHiddenRoute) return null;

  return (
    <div className="fixed z-50  md:hidden top-4 right-4 md:bottom-6 md:right-6">
      <div className="relative w-[130px] md:w-[130px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        {/* X cerrar */}
        <button
          onClick={onClose}
          aria-label="Cerrar anuncio"
          className="absolute top-2 right-2 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 border border-slate-200 hover:bg-white"
        >
          ✕
        </button>

        <a href={current.href} target="_blank" rel="noopener noreferrer">
          <div className="relative h-[330px] md:h-[330px] w-full">
            <Image src={current.img} alt="Publicidad" fill className="object-cover" />
          </div>
        </a>
      </div>
    </div>
  );
}
