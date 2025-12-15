// components/ProgressPath.tsx
"use client";

import { motion, Variants } from "framer-motion";

export type GoalStatus = "pending" | "in_progress" | "completed" | "failed";

export interface GoalNode {
  id: number;
  title: string;
  status: GoalStatus;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

export function ProgressPath({ goals }: { goals: GoalNode[] }) {
  if (!goals.length) {
    return (
      <p className="text-xs text-slate-500 mt-2">
        Este alumno aún no tiene metas asignadas.
      </p>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 mt-3">
      <span className="text-sm text-slate-700 font-medium">
        Camino de progreso
      </span>

      <motion.div
        className="flex items-center gap-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <span className="text-xs text-slate-400">Inicio</span>

        {goals.map((g, index) => {
          const base =
            g.status === "completed"
              ? "bg-emerald-500 text-white"
              : g.status === "in_progress"
              ? "bg-yellow-400 text-slate-900"
              : g.status === "failed"
              ? "bg-red-400 text-white"
              : "bg-slate-200 text-slate-700";

          return (
            <div key={g.id} className="flex items-center gap-3">
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-semibold shadow-md cursor-default ${base}`}
                variants={nodeVariants}
                whileHover={{ scale: 1.05 }}
                title={g.title}
              >
                {index + 1}
              </motion.div>

              {index < goals.length - 1 && (
                <div className="w-10 h-[2px] bg-slate-300" />
              )}
            </div>
          );
        })}

        <span className="text-xs text-slate-400">Meta</span>
      </motion.div>

      <p className="text-[11px] text-slate-500">
        Verde: completadas · Amarillo: en progreso · Gris: pendientes.
      </p>
    </div>
  );
}
    