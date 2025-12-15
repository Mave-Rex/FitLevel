"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import type { Map as LeafletMap } from "leaflet";

/* 🔄 Recentrar sin recrear el mapa */
function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true });
  }, [center, map]);

  return null;
}

type MapClientProps = {
  center: [number, number];
  items: Array<{
    id: number;
    firstName: string;
    lastName: string;
    specialty: string;
    zone: string;
    location: { lat: number; lng: number; address?: string };
  }>;
  onSelect: (id: number) => void;
};

export default function MapClient({ center, items, onSelect }: MapClientProps) {
  const [mounted, setMounted] = useState(false);

  // ✅ En react-leaflet, el ref apunta al LeafletMap
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => setMounted(true), []);

  // 📍 Fix de iconos del marker
  useEffect(() => {
    (async () => {
      const L = await import("leaflet");
      // @ts-ignore
      delete (L.Icon.Default.prototype as any)._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
    })();
  }, []);

  // 🧹 Cleanup para evitar "Map container is being reused..."
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <MapContainer
      ref={mapRef as any}          // ✅ aquí guardamos el LeafletMap
      center={center}
      zoom={14}
      scrollWheelZoom={false}
      className="h-full w-full"
      whenReady={() => {
        // opcional: aquí el mapa ya está listo
        // console.log("map ready", mapRef.current);
      }}
    >
      <Recenter center={center} />

      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {items.map((p) => (
        <Marker
          key={p.id}
          position={[p.location.lat, p.location.lng]}
          eventHandlers={{ click: () => onSelect(p.id) }}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-bold">
                {p.firstName} {p.lastName}
              </div>
              <div className="text-slate-600">{p.specialty}</div>
              <div className="text-slate-600">Zona: {p.zone}</div>
              {p.location.address && (
                <div className="text-slate-500">{p.location.address}</div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
