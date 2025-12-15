"use client";

import { mockStudents, mockGoals, mockProgress } from "../../../lib/mockData";
import { ProgressPath } from "../../../students/[id]/progressPath";
import { ArrowLeft, Share2 } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { useState } from "react";

export default function PublicStudentPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const studentId = Number(params.id);

  const student = mockStudents.find((s) => s.id === studentId);

  if (!student) {
    return (
      <div className="mt-10 text-center">
        Alumno no encontrado.
      </div>
    );
  }

  const goals = mockGoals.filter((g) => g.studentId === student.id);
  const progressLogs = mockProgress
    .filter((p) => p.studentId === student.id)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  // Nuevo estado para el link copiado
  const [copied, setCopied] = useState(false);

  const fullPublicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/public/students/${student.id}`
      : "";

  // Función para copiar al portapapeles
  async function copyPublicLink() {
    try {
      await navigator.clipboard.writeText(fullPublicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset después de 2 segundos
    } catch {
      // Fallback si la API de clipboard falla
      const el = document.createElement("textarea");
      el.value = fullPublicUrl;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }

  return (
    <motion.div
      className="max-w-4xl xl:max-w-5xl mx-auto mt-10 space-y-6 px-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Progreso de {student.firstName}
          </h1>
          <p className="text-xs text-slate-500">
            Vista pública del camino de progreso y metas del alumno.
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="hidden sm:flex items-center gap-1 text-xs text-emerald-700 hover:underline"
        >
          <ArrowLeft size={14} />
          Ir al panel
        </button>
      </header>

      <section className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
        <p className="text-sm text-slate-600">
          Edad: {student.age} años · Peso actual: {student.weightKg} kg · Altura:{" "}
          {student.heightCm} cm
        </p>
      </section>

      {/* Botón para compartir link */}
      <section className="bg-white rounded-xl shadow-md border border-slate-200 p-4 space-y-3">
        <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-slate-900">
          Compartir progreso
        </h2>
        
          <motion.button
            onClick={copyPublicLink}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-2"
          >
            <Share2 size={16} />
            Obtener link
          </motion.button>

          {/* Mostrar "copiado" con animación */}
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: -12 }}
              transition={{ duration: 0.3 }}
              className="text-xs font-semibold text-emerald-700"
            >
              ¡Copiado!
            </motion.span>
          )}
        </div>
      </section>

      <section className="bg-white rounded-xl shadow-md border border-slate-200 p-4 space-y-3">
        <h2 className="text-base font-semibold text-slate-900">
          Camino de progreso
        </h2>
        <ProgressPath
          goals={goals.map((g) => ({
            id: g.id,
            title: g.title,
            status: g.status as any,
            reward: g.reward ?? "", // Añadimos el premio en el path
          }))}
        />
      </section>

      <section className="bg-white rounded-xl shadow-md border border-slate-200 p-4 space-y-3 mb-10">
        <h2 className="text-base font-semibold text-slate-900">
          Metas y avances
        </h2>
        <ul className="space-y-2 text-sm">
          {goals.map((g) => (
            <li
              key={g.id}
              className="border border-slate-200 rounded-md px-3 py-2"
            >
              <p className="font-medium text-slate-900">{g.title}</p>
              <p className="text-xs text-slate-500 mt-1">
                Estado: <span className="font-semibold">{g.status}</span>
                {g.reward && ` · Recompensa: ${g.reward}`}
              </p>
            </li>
          ))}
          {!goals.length && (
            <p className="text-xs text-slate-500">
              Este alumno aún no tiene metas visibles.
            </p>
          )}
        </ul>

        {progressLogs.length > 0 && (
          <>
            <h3 className="text-sm font-semibold text-slate-900 mt-3">
              Últimos registros
            </h3>
            <ul className="space-y-2 text-xs">
              {progressLogs.map((p) => (
                <li
                  key={p.id}
                  className="flex items-center justify-between border border-slate-200 rounded-md px-3 py-2"
                >
                  <span>{p.date}</span>
                  <span>
                    {p.weightKg ? `${p.weightKg} kg` : "—"}
                    {p.notes && (
                      <span className="text-slate-500"> · {p.notes}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </motion.div>
  );
}
