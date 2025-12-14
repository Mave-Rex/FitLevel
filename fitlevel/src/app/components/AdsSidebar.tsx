"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const sponsors = [
  { id: 1, img: "/images/anuncio_13.png"},
  { id: 1, img: "/images/anuncio1.jpg"},
  
  
];

export default function AdsSidebar({ side }: { side: "left" | "right" }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setIndex((prev) => (prev + 1) % sponsors.length),
      5000
    );
    return () => clearInterval(interval);
  }, []);

  const current = sponsors[index];

  return (
    <aside
      className={`
        hidden md:flex fixed top-1/2 -translate-y-1/2 z-40
        ${side === "left" ? "left-0 ml-2" : "right-0 mr-2"}
      `}
    >
      <a target="_blank" rel="noopener noreferrer">
        <div className="w-38 h-[80vh] bg-white border border-slate-300 shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow">
          <div className="relative w-full h-full">
            <Image
              src={current.img}
              alt="Publicidad"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </a>
    </aside>
  );
}
