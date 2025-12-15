// app/students/[id]/page.tsx
"use client";

import { useRouter, useParams } from "next/navigation";
import { useProfessor } from "../../lib/useProfessor";
import { mockStudents, mockGoals, mockProgress } from "../../lib/mockData";
import { ProgressPath } from "./progressPath";
import { useMemo, useState, useEffect } from "react";
import {
  ArrowLeft,
  BarChart3,
  Info,
  UserRound,
  UserRoundCheck,
} from "lucide-react";
import { motion } from "framer-motion";



function StudentAvatar({ sex }: { sex: string }) {
  const isFemale = sex === "F";
  const bg = isFemale ? "bg-pink-100" : "bg-blue-100";
  const iconColor = isFemale ? "text-pink-600" : "text-blue-600";

  return (
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${bg}`}
    >
      {isFemale ? (
        <UserRoundCheck className={iconColor} size={26} />
      ) : (
        <UserRound className={iconColor} size={26} />
      )}
    </div>
  );
}

export default function StudentDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>(); // 👈 aquí tomamos el id
  const [tab, setTab] = useState<"info" | "progress">("info");
  const professor = useProfessor();

  // Manejo de auth en efecto para no romper render
  useEffect(() => {
    if (professor === null) return;
    if (!professor) router.push("/login");
  }, [professor, router]);

  if (!professor) return null;

  const studentId = Number(params.id);
  const student = mockStudents.find(
    (s) => s.id === studentId && s.professorId === professor.id
  );

  if (!student) {
    return (
      <div className="mt-10 text-center">
        Alumno no encontrado o no pertenece a este profesor.
      </div>
    );
  }

  const goals = mockGoals.filter((g) => g.studentId === student.id);
  const progressLogs = mockProgress
    .filter((p) => p.studentId === student.id)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  const completedCount = goals.filter((g) => g.status === "completed").length;

  const bmi = useMemo(() => {
    const hMeters = student.heightCm / 100;
    if (!hMeters) return null;
    return +(student.weightKg / (hMeters * hMeters)).toFixed(1);
  }, [student.heightCm, student.weightKg]);

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-6 space-y-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-1 text-xs text-emerald-700 hover:underline"
        >
          <ArrowLeft size={14} />
          Volver al panel
        </button>

        <div className="flex items-center gap-3 ml-auto">
          <StudentAvatar sex={student.sex} />
          <div className="text-right">
            <h1 className="text-lg font-bold text-slate-900">
              {student.firstName} {student.lastName}
            </h1>
            <p className="text-xs text-slate-500">
              Alumno de {professor.firstName} {professor.lastName}
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-200 text-sm">
        <button
          onClick={() => setTab("info")}
          className={`flex items-center gap-1 px-3 py-2 border-b-2 ${
            tab === "info"
              ? "border-emerald-600 text-emerald-700 font-semibold"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <Info size={16} /> Información
        </button>
        <button
          onClick={() => setTab("progress")}
          className={`flex items-center gap-1 px-3 py-2 border-b-2 ${
            tab === "progress"
              ? "border-emerald-600 text-emerald-700 font-semibold"
              : "border-transparent text-slate-500 hover:text-slate-700"
          }`}
        >
          <BarChart3 size={16} /> Progreso / metas
        </button>
      </div>

      {/* Contenido INFO */}
      {tab === "info" && (
        <motion.section
          key="info"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Datos generales
            </h2>
            <p className="text-sm text-slate-600">
              Edad: {student.age} años <br />
              Sexo:{" "}
              {student.sex === "F"
                ? "Femenino"
                : student.sex === "M"
                ? "Masculino"
                : student.sex}
              <br />
              Peso actual: {student.weightKg} kg <br />
              Altura: {student.heightCm} cm
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                Indicadores físicos
              </h3>
              <p className="text-sm text-slate-600">
                IMC estimado:{" "}
                <span className="font-semibold">
                  {bmi ? `${bmi}` : "N/D"}
                </span>
              </p>
              <p className="text-xs text-slate-500 mt-1">
                *(Solo referencia, no sustituye una evaluación profesional.)*
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">
                Resumen de metas
              </h3>
              <p className="text-sm text-slate-600">
                Metas totales:{" "}
                <span className="font-semibold">{goals.length}</span>
                <br />
                Completadas:{" "}
                <span className="font-semibold">{completedCount}</span>
              </p>
            </div>
          </div>
        </motion.section>
      )}

      {/* Contenido PROGRESO */}
      {tab === "progress" && (
        <motion.section
          key="progress"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="space-y-4"
        >
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
            <ProgressPath
              goals={goals.map((g) => ({
                id: g.id,
                title: g.title,
                status: g.status as any,
              }))}
            />
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Metas del alumno
            </h2>
            <ul className="space-y-2 text-sm">
              {goals.map((g) => (
                <li
                  key={g.id}
                  className="border border-slate-200 rounded-md px-3 py-2"
                >
                  <p className="font-medium text-slate-900">{g.title}</p>
                  {g.description && (
                    <p className="text-xs text-slate-500 mt-1">
                      {g.description}
                    </p>
                  )}
                  <p className="text-xs text-slate-500 mt-1">
                    Estado:{" "}
                    <span className="font-semibold">{g.status}</span>
                    {g.reward && ` · Recompensa: ${g.reward}`}
                  </p>
                </li>
              ))}
              {!goals.length && (
                <p className="text-xs text-slate-500">
                  Aún no has creado metas para este alumno.
                </p>
              )}
            </ul>
          </div>

          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-4">
            <h2 className="text-base font-semibold text-slate-900 mb-2">
              Últimos registros de progreso
            </h2>
            {progressLogs.length === 0 ? (
              <p className="text-xs text-slate-500">
                Todavía no hay registros de progreso guardados.
              </p>
            ) : (
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
                        <span className="text-slate-500">
                          {" "}
                          · {p.notes}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}
