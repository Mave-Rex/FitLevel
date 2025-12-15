"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useProfessor } from "../lib/useProfessor";
import { mockStudents, mockGoals } from "../lib/mockData";
import Link from "next/link";
import {
  UserRound,
  UserRoundCheck,
  Target,
  Share2,
} from "lucide-react";
import { motion } from "framer-motion";

function StudentAvatar({ sex }: { sex: string }) {
  const isFemale = sex === "F";
  const bg = isFemale ? "bg-pink-100" : "bg-blue-100";
  const iconColor = isFemale ? "text-pink-600" : "text-blue-600";

  return (
    <div
      className={`w-10 h-10 rounded-full flex items-center justify-center ${bg}`}
    >
      {isFemale ? (
        <UserRoundCheck className={iconColor} size={22} />
      ) : (
        <UserRound className={iconColor} size={22} />
      )}
    </div>
  );
}

// Variantes de animación para la lista de alumnos
const listVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function DashboardPage() {
  const router = useRouter();
  const professor = useProfessor();

  useEffect(() => {
    if (professor === null) return; // aún cargando
    if (!professor) router.push("/login");
  }, [professor, router]);

  if (!professor) return null;

  const students = mockStudents.filter(
    (s) => s.professorId === professor.id
  );

  return (
    <motion.div
      className="space-y-6 mt-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {/* Encabezado del profesor */}
      <motion.section
        className="bg-white rounded-xl shadow-md border border-slate-200 p-5 flex items-center justify-between"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <div>
          <h2 className="text-xl font-bold text-slate-900">
            Hola, {professor.firstName}
          </h2>
          <p className="text-sm text-slate-600">
            Especialidad:{" "}
            <span className="font-semibold">{professor.specialty}</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Gestiona a tus alumnos, asigna metas y comparte su progreso de forma
            visual y motivadora.
          </p>
        </div>
        <div className="hidden sm:flex flex-col items-end text-xs text-slate-500">
          <span>{professor.email}</span>
          <span>{professor.phone}</span>
        </div>
      </motion.section>

      {/* Lista de alumnos */}
      <motion.section
        className="bg-white rounded-xl shadow-md border border-slate-200 p-5"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut", delay: 0.1 }}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target size={20} className="text-emerald-600" />
            <h3 className="text-lg font-semibold text-slate-900">
              Mis alumnos
            </h3>
          </div>
        </div>

        {students.length === 0 ? (
          <p className="text-sm text-slate-500">
            Aún no tienes alumnos registrados.
          </p>
        ) : (
          <motion.ul
            className="space-y-3"
            variants={listVariants}
            initial="hidden"
            animate="visible"
          >
            {students.map((s) => {
              const studentGoals = mockGoals.filter(
                (g) => g.studentId === s.id
              );
              const completedCount = studentGoals.filter(
                (g) => g.status === "completed"
              ).length;

              const publicLink = `/public/students/${s.id}`;

              return (
                <motion.li
                  key={s.id}
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border border-slate-200 rounded-lg px-3 py-3 bg-white hover:bg-slate-50 transition-transform"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Info principal */}
                  <div className="flex items-center gap-3">
                    <StudentAvatar sex={s.sex} />
                    <div>
                      <p className="font-semibold text-slate-900">
                        {s.firstName} {s.lastName}
                      </p>
                      <p className="text-xs text-slate-500">
                        {s.age} años •{" "}
                        {s.sex === "F"
                          ? "Femenino"
                          : s.sex === "M"
                          ? "Masculino"
                          : s.sex}{" "}
                        • {s.weightKg} kg • {s.heightCm} cm
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Metas asignadas:{" "}
                        <span className="font-semibold">
                          {studentGoals.length}
                        </span>{" "}
                        · Completadas:{" "}
                        <span className="font-semibold">
                          {completedCount}
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={`/students/${s.id}`}
                      className="text-xs px-3 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100 font-medium"
                    >
                      Ver información
                    </Link>

                    <Link
                      href={publicLink}
                      className="text-xs px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-500 font-medium flex items-center gap-2"
                    >
                      Ver progreso / metas
                      <Share2 size={14} />
                    </Link>
                  </div>
                </motion.li>
              );
            })}
          </motion.ul>
        )}
      </motion.section>
    </motion.div>
  );
}
