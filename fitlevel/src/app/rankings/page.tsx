"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trophy,
  Medal,
  Crown,
  ArrowUpRight,
  Sparkles,
  Users,
  CheckCircle2,
} from "lucide-react";

import { mockStudents, mockGoals } from "../lib/mockData";

type RankRow = {
  studentId: number;
  fullName: string;
  age: number;
  sex: "M" | "F";
  completed: number;
  total: number;
  rate: number; // completed/total
  prize: string;
};

function prizeFor(place: number) {
  // 🎁 premios interesantes (puedes ajustar)
  if (place === 1) return "💵 $25 + Camiseta deportiva FitLevel";
  if (place === 2) return "🥤 Suplemento (proteína o electrolitos) + botella";
  if (place === 3) return "👕 Short/leggins deportivo + insignia Élite";
  if (place <= 10) return "🎖️ Insignia Top 10 + plan semanal premium";
  return "✨ Insignia de participación";
}

export default function RankingsPage() {
  const rows = useMemo(() => {
    const byStudent = mockStudents.map((s) => {
      const goals = mockGoals.filter((g) => g.studentId === s.id);
      const total = goals.length;
      const completed = goals.filter((g) => g.status === "completed").length;
      const rate = total ? completed / total : 0;

      return {
        studentId: s.id,
        fullName: `${s.firstName} ${s.lastName}`,
        age: s.age,
        sex: s.sex,
        completed,
        total,
        rate,
      };
    });

    // orden: más completadas, luego % de completadas, luego nombre
    byStudent.sort((a, b) => {
      if (b.completed !== a.completed) return b.completed - a.completed;
      if (b.rate !== a.rate) return b.rate - a.rate;
      return a.fullName.localeCompare(b.fullName);
    });

    return byStudent.map((r, idx) => ({
      ...r,
      prize: prizeFor(idx + 1),
    })) as RankRow[];
  }, []);

  const top3 = rows.slice(0, 3);
  const rest = rows.slice(3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900 flex items-center gap-2">
              <Trophy className="text-emerald-700" />
              Rankings FitLevel
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Tabla basada en <b>objetivos completados</b>. Motiva a tus alumnos
              con premios y reconocimientos.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-600">
            <Users size={16} />
            {rows.length} alumnos
          </div>
        </div>

        {/* Top 3 Cards */}
        <div className="grid gap-4 md:grid-cols-3">
          {top3.map((r, idx) => {
            const place = idx + 1;
            const Icon = place === 1 ? Crown : place === 2 ? Medal : Trophy;

            return (
              <motion.div
                key={r.studentId}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5 relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 h-28 w-28 rounded-full bg-emerald-100/60 blur-2xl" />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-semibold text-slate-500">
                      Puesto #{place}
                    </p>
                    <p className="text-lg font-extrabold text-slate-900">
                      {r.fullName}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      {r.completed}/{r.total} metas completadas
                    </p>
                  </div>
                  <div className="h-11 w-11 rounded-2xl border border-slate-200 bg-emerald-50 flex items-center justify-center">
                    <Icon className="text-emerald-700" />
                  </div>
                </div>

                <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <p className="text-xs font-semibold text-emerald-900 flex items-center gap-2">
                    <Sparkles size={14} className="text-emerald-700" />
                    Premio
                  </p>
                  <p className="text-sm text-emerald-900 mt-1">{r.prize}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-slate-600">
                    Edad {r.age} · {r.sex === "F" ? "Femenino" : "Masculino"}
                  </span>

                  <Link
                    href={`/public/students/${r.studentId}`}
                    className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
                  >
                    Ver público <ArrowUpRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Lista general */}
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <p className="font-bold text-slate-900">Ranking general</p>
            <p className="text-xs text-slate-600">
              Ordenado por metas completadas
            </p>
          </div>

          <div className="divide-y divide-slate-200">
            {rest.map((r, idx) => {
              const place = idx + 4;
              return (
                <motion.div
                  key={r.studentId}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: idx * 0.02 }}
                  className="p-4 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4"
                >
                  <div className="w-16 shrink-0">
                    <span className="inline-flex items-center justify-center w-12 h-10 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 font-extrabold">
                      #{place}
                    </span>
                  </div>

                  <div className="flex-1">
                    <p className="font-bold text-slate-900">{r.fullName}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Edad {r.age} · {r.sex === "F" ? "Femenino" : "Masculino"}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-xs text-slate-600">
                      <span className="font-semibold text-slate-900">
                        {r.completed}
                      </span>{" "}
                      <CheckCircle2
                        size={14}
                        className="inline -mt-0.5 text-emerald-700"
                      />{" "}
                      / {r.total}
                    </div>

                    <div className="hidden md:block text-xs text-slate-600 max-w-[260px] truncate">
                      🎁 {r.prize}
                    </div>

                    <Link
                      href={`/public/students/${r.studentId}`}
                      className="text-xs font-semibold text-emerald-700 hover:underline inline-flex items-center gap-1"
                    >
                      Ver <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
