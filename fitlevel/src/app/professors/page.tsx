"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Star,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  ArrowLeft,
  Search,
} from "lucide-react";
import { mockProfessors } from "../lib/mockData";

// ✅ Dynamic imports para evitar SSR issues con leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(() => import("react-leaflet").then((m) => m.TileLayer), {
  ssr: false,
});
const Marker = dynamic(() => import("react-leaflet").then((m) => m.Marker), {
  ssr: false,
});
const Popup = dynamic(() => import("react-leaflet").then((m) => m.Popup), {
  ssr: false,
});

function Stars({ value }: { value: 5 | 3 | 1 }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={16}
          className={n <= value ? "text-amber-500" : "text-slate-300"}
          fill={n <= value ? "currentColor" : "none"}
        />
      ))}
      <span className="ml-2 text-xs text-slate-600 font-semibold">{value}/5</span>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-1 text-xs font-semibold">
      {children}
    </span>
  );
}

export default function ProfesoresPage() {
  // ✅ Solo aprobados + visibles en mapa
  const profes = useMemo(
    () => mockProfessors.filter((p: any) => p.isApproved && p.showOnMap),
    []
  );

  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return profes;
    return profes.filter((p: any) => {
      const full = `${p.firstName} ${p.lastName}`.toLowerCase();
      const specialty = (p.specialty ?? "").toLowerCase();
      const zone = (p.zone ?? "").toLowerCase();
      return full.includes(s) || specialty.includes(s) || zone.includes(s);
    });
  }, [q, profes]);

  const [selectedId, setSelectedId] = useState<number | null>(
    filtered?.[0]?.id ?? null
  );

  const selected = useMemo(() => {
    if (!selectedId) return filtered?.[0] ?? null;
    return filtered.find((p: any) => p.id === selectedId) ?? filtered?.[0] ?? null;
  }, [filtered, selectedId]);

  // ✅ Leaflet marker fix (iconos) — importante para que se vea el pin
  useEffect(() => {
    (async () => {
      const L = await import("leaflet");
      // @ts-ignore
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    })();
  }, []);

  const center = selected?.location
    ? [selected.location.lat, selected.location.lng]
    : [-0.180653, -78.467834]; // fallback (Quito)

  return (
    <main className="max-w-7xl mx-auto px-4 py-10">
      {/* Top bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Volver al inicio
          </Link>

          <h1 className="mt-3 text-3xl sm:text-4xl font-extrabold text-slate-900">
            Conoce a los profes
          </h1>
          <p className="mt-2 text-slate-600 max-w-2xl">
            Profesores verificados con clasificación y ubicación para clases por
            proximidad (mapa embebido).
          </p>
        </div>

        {/* Search */}
        <div className="w-full sm:w-[360px]">
          <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm focus-within:ring-2 focus-within:ring-emerald-200 transition">
            <Search size={18} className="text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar por nombre, especialidad o zona…"
              className="w-full bg-transparent outline-none text-sm text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>
      </div>

      {/* Layout */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-[1.15fr_.85fr] gap-8">
        {/* List */}
        <section className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((p: any, i: number) => {
              const active = selected?.id === p.id;

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedId(p.id)}
                  className={[
                    "text-left group rounded-3xl border bg-white p-5 shadow-sm transition-all duration-300",
                    "hover:-translate-y-1 hover:shadow-md",
                    active
                      ? "border-emerald-200 ring-2 ring-emerald-100"
                      : "border-slate-200",
                    // entrada suave
                    "opacity-0 animate-[fadeInUp_.35s_ease-out_forwards]",
                  ].join(" ")}
                  style={{ animationDelay: `${Math.min(i * 60, 300)}ms` }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-slate-900">
                          {p.firstName} {p.lastName}
                        </h3>
                        <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-semibold">
                          <ShieldCheck size={14} />
                          Verificado
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-slate-600">
                        <span className="font-semibold text-slate-700">
                          Especialidad:
                        </span>{" "}
                        {p.specialty}
                      </p>
                    </div>

                    <Badge>Zona: {p.zone}</Badge>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <Stars value={p.stars} />
                    <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                      <MapPin size={14} />
                      {p.location?.address ?? "Ubicación registrada"}
                    </span>
                  </div>

                  <div className="mt-4 grid gap-2 text-sm">
                    <a
                      className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 underline-offset-4 hover:underline"
                      href={`mailto:${p.email}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Mail size={16} className="text-slate-400" />
                      {p.email}
                    </a>

                    <a
                      className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 underline-offset-4 hover:underline"
                      href={`tel:${p.phone}`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Phone size={16} className="text-slate-400" />
                      {p.phone}
                    </a>
                  </div>

                  <div className="mt-5">
                    <div
                      className={[
                        "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold transition",
                        active
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-50 text-slate-800 border border-slate-200 group-hover:bg-slate-100",
                      ].join(" ")}
                    >
                      {active ? "Seleccionado" : "Ver en el mapa"}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Map panel */}
        <aside className="lg:sticky lg:top-6 h-[520px] rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h4 className="font-extrabold text-slate-900">Mapa</h4>
              <p className="text-xs text-slate-600 mt-1">
                Selecciona un profe para centrar su ubicación.
              </p>
            </div>
            {selected && (
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full">
                {selected.firstName} {selected.lastName}
              </span>
            )}
          </div>

          <div className="h-[calc(520px-56px)]">
            {/* key para recrear mapa y centrar sin usar hooks de leaflet */}
            <MapContainer
              key={selected?.id ?? "map"}
              center={center as any}
              zoom={14}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {filtered.map((p: any) => (
                <Marker
                  key={p.id}
                  position={[p.location.lat, p.location.lng] as any}
                  eventHandlers={{
                    click: () => setSelectedId(p.id),
                  }}
                >
                  <Popup>
                    <div className="text-sm">
                      <div className="font-bold">
                        {p.firstName} {p.lastName}
                      </div>
                      <div className="text-slate-600">{p.specialty}</div>
                      <div className="text-slate-600">Zona: {p.zone}</div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </aside>
      </div>
    </main>
  );
}
