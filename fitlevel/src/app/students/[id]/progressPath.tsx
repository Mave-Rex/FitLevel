"use client";

import { motion } from "framer-motion";
import { Gift, Sparkles, Trophy } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

export type GoalNode = {
  id: number;
  title: string;
  status: "pending" | "in_progress" | "completed";
  reward?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function ProgressPath({ goals }: { goals: GoalNode[] }) {
  const [hoverId, setHoverId] = useState<number | null>(null);

  // ✅ Progreso: por defecto cuenta SOLO completed (estricto)
  const ordered = useMemo(() => goals, [goals]);
  const completedCount = ordered.filter((g) => g.status === "completed").length;

  // Si quieres que in_progress cuente un poquito:
  // const inProgCount = ordered.filter((g) => g.status === "in_progress").length;
  // const progressUnits = completedCount + inProgCount * 0.35;
  // const progressPct = ordered.length ? progressUnits / ordered.length : 0;

  const inProgCount = ordered.filter((g) => g.status === "in_progress").length;
  const progressUnits = completedCount + inProgCount * 0.35; // 0.35 = avance parcial
  const progressPct = ordered.length ? progressUnits / ordered.length : 0;


  // Geometría SVG
  const W = 640;
  const H = 220;
  const padX = 56;

  const nodes = useMemo(() => {
    const n = Math.max(ordered.length, 2);
    return ordered.map((g, i) => {
      const t = n === 1 ? 0 : i / (n - 1);
      const x = padX + t * (W - padX * 2);
      // onda suave + alternancia para que se vea "camino"
      const y = 80 + Math.sin(t * Math.PI * 2) * 32 + (i % 2 ? 10 : -10);
      return { ...g, x, y, t };
    });
  }, [ordered]);

  // Path curvo (quadratic beziers)
  const pathD = useMemo(() => {
    if (nodes.length === 0) return "";
    let d = `M ${nodes[0].x} ${nodes[0].y}`;
    for (let i = 1; i < nodes.length; i++) {
      const prev = nodes[i - 1];
      const curr = nodes[i];
      const cx = (prev.x + curr.x) / 2;
      const cy = (prev.y + curr.y) / 2 + (i % 2 ? 16 : -16);
      d += ` Q ${cx} ${cy} ${curr.x} ${curr.y}`;
    }
    return d;
  }, [nodes]);

  // ✅ Longitud REAL del path para que el progreso verde sea exacto
  const pathRef = useRef<SVGPathElement | null>(null);
  const [pathLen, setPathLen] = useState(0);

  useEffect(() => {
    if (pathRef.current) {
      setPathLen(pathRef.current.getTotalLength());
    }
  }, [pathD]);

  return (
    <div className="w-full">
      {/* Header mini */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 text-sm">
          <Sparkles className="text-emerald-600" size={18} />
          <p className="font-semibold text-slate-900">Camino gamificado</p>
        </div>

        <div className="text-xs text-slate-600">
          Progreso:{" "}
          <span className="font-semibold text-emerald-700">
            {completedCount}/{ordered.length}
          </span>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-gradient-to-b from-white to-emerald-50/40 p-3 overflow-hidden">
        <div className="relative">
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-[220px]">
            {/* Glow */}
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Camino base */}
            <path
              d={pathD}
              fill="none"
              stroke="rgba(15, 23, 42, 0.18)"
              strokeWidth="10"
              strokeLinecap="round"
            />

            {/* Camino activo (exacto) */}
            <motion.path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="rgba(16, 185, 129, 0.95)"
              strokeWidth="10"
              strokeLinecap="round"
              filter="url(#glow)"
              strokeDasharray={pathLen || 1}
              initial={{ strokeDashoffset: pathLen || 1 }}
              animate={{
                strokeDashoffset: (pathLen || 1) * (1 - clamp(progressPct, 0, 1)),
              }}
              transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Nodos */}
            {nodes.map((n, idx) => {
              const done = n.status === "completed";
              const active = n.status === "in_progress";
              const show = hoverId === n.id;

              return (
                <g
                  key={n.id}
                  onMouseEnter={() => setHoverId(n.id)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  {/* halo */}
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={done ? 18 : active ? 16 : 14}
                    fill={
                      done
                        ? "rgba(16,185,129,0.18)"
                        : active
                        ? "rgba(59,130,246,0.16)"
                        : "rgba(148,163,184,0.18)"
                    }
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: idx * 0.06 }}
                  />

                  {/* nodo principal */}
                  <motion.circle
                    cx={n.x}
                    cy={n.y}
                    r={done ? 10 : active ? 9 : 8}
                    fill={
                      done
                        ? "rgba(16,185,129,1)"
                        : active
                        ? "rgba(59,130,246,1)"
                        : "rgba(100,116,139,1)"
                    }
                    initial={{ scale: 0.7 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 14,
                      delay: idx * 0.06,
                    }}
                  />

                  {/* “premio” arriba del nodo */}
                  <foreignObject x={n.x - 12} y={n.y - 40} width="160" height="44">
                    <div className="flex items-center gap-2">
                      <div
                        className={`inline-flex items-center justify-center w-7 h-7 rounded-full border shadow-sm ${
                          done
                            ? "bg-emerald-50 border-emerald-200"
                            : active
                            ? "bg-sky-50 border-sky-200"
                            : "bg-slate-50 border-slate-200"
                        }`}
                        title={n.reward || "Premio"}
                      >
                        {done ? (
                          <Trophy size={16} className="text-emerald-700" />
                        ) : (
                          <Gift size={16} className="text-slate-700" />
                        )}
                      </div>

                      <div className="hidden sm:block">
                        <p className="text-[10px] leading-tight text-slate-600">
                          Meta {idx + 1}
                        </p>
                      </div>
                    </div>
                  </foreignObject>

                  {/* Tooltip */}
                  {show && (
                    <foreignObject x={n.x - 110} y={n.y + 18} width="230" height="95">
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                        className="rounded-xl border border-slate-200 bg-white shadow-lg px-3 py-2"
                      >
                        <p className="text-xs font-semibold text-slate-900">
                          {n.title}
                        </p>

                        <p className="text-[11px] text-slate-600 mt-1">
                          Estado:{" "}
                          <span className="font-semibold">
                            {n.status === "completed"
                              ? "Completada"
                              : n.status === "in_progress"
                              ? "En progreso"
                              : "Pendiente"}
                          </span>
                        </p>

                        {n.reward && (
                          <p className="text-[11px] text-slate-600 mt-1">
                            Premio:{" "}
                            <span className="font-semibold text-emerald-700">
                              {n.reward}
                            </span>
                          </p>
                        )}
                      </motion.div>
                    </foreignObject>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Etiquetas inferiores */}
          {ordered.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.25 }}
              className="mt-2 flex items-center justify-between text-xs text-slate-600"
            >
              <span>Inicio</span>
              <span className="inline-flex items-center gap-2">
                <Trophy size={16} className="text-emerald-700" />
                <span className="font-semibold text-slate-900">Meta final</span>
              </span>
            </motion.div>
          )}
        </div>
      </div>

      <p className="mt-2 text-[11px] text-slate-500">
        Tip: pasa el mouse por cada meta para ver el premio y detalles.
      </p>
    </div>
  );
}
