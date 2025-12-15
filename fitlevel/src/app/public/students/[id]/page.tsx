"use client";

import { mockStudents, mockGoals, mockProgress } from "../../../lib/mockData";
import { ProgressPath } from "../../../students/[id]/progressPath";
import {
  ArrowLeft,
  Share2,
  Trophy,
  Sparkles,
  Flame,
  CheckCircle2,
  Target,
  Calendar,
  Medal,
  Copy,
} from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

/** Util */
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function formatGoalStatus(status: string) {
  if (status === "completed") return "✅ Completada";
  if (status === "in_progress") return "⏳ En progreso";
  return "🟦 Pendiente";
}

function statusPillClasses(status: string) {
  if (status === "completed") return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (status === "in_progress") return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-sky-100 text-sky-800 border-sky-200";
}

function getAvatarEmoji(firstName: string) {
  const pool = ["🦄", "🐯", "🐸", "🦊", "🐼", "🐵", "🦁", "🐙", "🐲", "🦖"];
  let sum = 0;
  for (let i = 0; i < firstName.length; i++) sum += firstName.charCodeAt(i);
  return pool[sum % pool.length];
}

/** Fondo con burbujas (simple y liviano) */
function BubblesBg() {
  const bubbles = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        size: 40 + (i % 5) * 18,
        left: `${(i * 9) % 100}%`,
        delay: (i % 6) * 0.6,
        duration: 8 + (i % 5) * 1.8,
        opacity: 0.25 + (i % 4) * 0.1,
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-white to-sky-50" />
      {bubbles.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full blur-2xl"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            top: "110%",
            opacity: b.opacity,
            background:
              "radial-gradient(circle at 30% 30%, rgba(16,185,129,.65), rgba(56,189,248,.25), rgba(255,255,255,0))",
          }}
          initial={{ y: 0 }}
          animate={{ y: "-140vh" }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            repeatType: "loop",
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur rounded-2xl border border-slate-200 shadow-sm p-4">
      <div className="flex items-center gap-2 text-slate-700">
        <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
          <p className="text-lg font-bold text-slate-900 leading-tight">{value}</p>
        </div>
      </div>
      {hint && <p className="mt-2 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

export default function PublicStudentPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const studentId = Number(params.id);

  const student = mockStudents.find((s) => s.id === studentId);

  const [copied, setCopied] = useState(false);
  const [tab, setTab] = useState<"camino" | "metas" | "registros">("camino");

  if (!student) {
    return <div className="mt-10 text-center">Alumno no encontrado.</div>;
  }

  const goals = mockGoals.filter((g) => g.studentId === student.id);
  const progressLogs = mockProgress
    .filter((p) => p.studentId === student.id)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  const fullPublicUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/public/students/${student.id}`
      : "";

  async function copyPublicLink() {
    try {
      await navigator.clipboard.writeText(fullPublicUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
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

  /** Gamificación básica desde tus datos */
  const completed = goals.filter((g) => g.status === "completed").length;
  const inProgress = goals.filter((g) => g.status === "in_progress").length;
  const pending = goals.filter((g) => g.status === "pending").length;

  const xp = completed * 120 + inProgress * 40 + progressLogs.length * 12;
  const level = Math.max(1, Math.floor(xp / 220) + 1);
  const xpInLevel = xp % 220;
  const xpPct = clamp(Math.round((xpInLevel / 220) * 100), 0, 100);

  const streak = useMemo(() => {
    // streak “simpática”: si hay registros en los últimos 7 logs, suma.
    // (sin fechas reales parseadas; es gamificación visual)
    return clamp(progressLogs.length, 0, 14);
  }, [progressLogs.length]);

  const nextGoal = useMemo(() => {
    const g = goals.find((x) => x.status !== "completed");
    return g || null;
  }, [goals]);

  const badges = useMemo(() => {
    const list: { id: string; title: string; icon: React.ReactNode; desc: string }[] = [];
    if (completed >= 1)
      list.push({
        id: "first",
        title: "Primer logro",
        icon: <Medal size={16} />,
        desc: "¡Ya completaste una meta!",
      });
    if (completed >= 3)
      list.push({
        id: "champ",
        title: "Campeón",
        icon: <Trophy size={16} />,
        desc: "3 metas completadas 💪",
      });
    if (progressLogs.length >= 5)
      list.push({
        id: "tracker",
        title: "Súper constante",
        icon: <Calendar size={16} />,
        desc: "5 registros guardados",
      });
    if (streak >= 7)
      list.push({
        id: "streak7",
        title: "Racha de fuego",
        icon: <Flame size={16} />,
        desc: "¡7 pasos seguidos!",
      });
    if (list.length === 0)
      list.push({
        id: "start",
        title: "¡A empezar!",
        icon: <Sparkles size={16} />,
        desc: "Completa tu primera meta ✨",
      });
    return list.slice(0, 4);
  }, [completed, progressLogs.length, streak]);

  return (
    <div className="relative min-h-[calc(100vh-64px)]">
      <BubblesBg />

      <motion.div
        className="relative max-w-5xl mx-auto pt-10 pb-12 px-4 space-y-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        {/* Header */}
        <header className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <motion.div
              className="w-14 h-14 rounded-2xl bg-white/85 backdrop-blur border border-slate-200 shadow-sm flex items-center justify-center text-3xl"
              initial={{ rotate: -6, scale: 0.95 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
              aria-hidden
            >
              {getAvatarEmoji(student.firstName)}
            </motion.div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {student.firstName}, ¡mira tu progreso! 🚀
              </h1>
              <p className="text-xs sm:text-sm text-slate-600">
                Aquí puedes ver tu camino, tus metas y tus avances.
              </p>
            </div>
          </div>

          <button
            onClick={() => router.push("/dashboard")}
            className="hidden sm:flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
          >
            <ArrowLeft size={14} />
            Ir al panel
          </button>
        </header>

        {/* Hero gamificado */}
        <section className="bg-white/85 backdrop-blur rounded-3xl shadow-md border border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-5">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1 rounded-full bg-slate-900 text-white">
                  Nivel {level}
                </span>
                <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <Flame size={14} /> Racha: {streak}
                </span>
              </div>

              <p className="text-sm text-slate-700">
                Edad: <span className="font-semibold">{student.age}</span> · Peso:{" "}
                <span className="font-semibold">{student.weightKg} kg</span> · Altura:{" "}
                <span className="font-semibold">{student.heightCm} cm</span>
              </p>

              {/* XP bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600">
                  <span className="font-semibold">XP</span>
                  <span className="font-mono">
                    {xpInLevel}/{220} ({xpPct}%)
                  </span>
                </div>
                <div className="h-3 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg, rgba(16,185,129,1), rgba(56,189,248,1))",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${xpPct}%` }}
                    transition={{ type: "spring", stiffness: 90, damping: 18 }}
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Tip: completa metas y registra avances para subir de nivel ✨
                </p>
              </div>

              {/* Misión del día */}
              <div className="mt-2 rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-50 to-sky-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                    <Target size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Misión del día</p>
                    <p className="text-sm text-slate-700">
                      {nextGoal ? (
                        <>
                          Avanza en:{" "}
                          <span className="font-semibold">{nextGoal.title}</span>
                          {nextGoal.reward ? (
                            <>
                              {" "}
                              · Premio: <span className="font-semibold">{nextGoal.reward}</span>
                            </>
                          ) : null}
                        </>
                      ) : (
                        <>
                          ¡Increíble! 🎉 Ya completaste todas tus metas visibles.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3 w-full lg:w-[320px]">
              <StatCard
                icon={<CheckCircle2 size={18} />}
                label="Metas completadas"
                value={`${completed}`}
                hint="Sigue así 💪"
              />
              <StatCard
                icon={<Sparkles size={18} />}
                label="En progreso"
                value={`${inProgress}`}
                hint="¡Casi listo!"
              />
              <StatCard
                icon={<Calendar size={18} />}
                label="Registros"
                value={`${progressLogs.length}`}
                hint="Cada registro suma XP"
              />
            </div>
          </div>
        </section>

        {/* Compartir + Rankings (más bonito y claro) */}
        <section className="bg-white/85 backdrop-blur rounded-3xl shadow-md border border-slate-200 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Compartir</h2>
              <p className="text-xs text-slate-600">
                Comparte tu progreso con tu familia o profe 👨‍👩‍👧‍👦
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <motion.button
                onClick={copyPublicLink}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-2xl bg-emerald-600 text-white hover:bg-emerald-500 flex items-center gap-2 shadow-sm"
              >
                <Share2 size={16} />
                Obtener link
              </motion.button>

              <motion.button
                onClick={() => router.push("/rankings")}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 rounded-2xl bg-[#0D3B66] text-white hover:bg-[#0D3B80] flex items-center gap-2 shadow-sm"
              >
                <Trophy size={16} />
                Rankings
              </motion.button>

              <AnimatePresence>
                {copied && (
                  <motion.div
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                    className="px-3 py-2 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2"
                  >
                    <Copy size={14} /> ¡Copiado!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Badges */}
        <section className="bg-white/85 backdrop-blur rounded-3xl shadow-md border border-slate-200 p-5">
          <h2 className="text-base font-extrabold text-slate-900">Insignias</h2>
          <p className="text-xs text-slate-600">Tus logros especiales ⭐</p>

          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {badges.map((b, idx) => (
              <motion.div
                key={b.id}
                className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx, duration: 0.25 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                    {b.icon}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{b.title}</p>
                    <p className="text-xs text-slate-600">{b.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tabs: Camino / Metas / Registros */}
        <section className="bg-white/85 backdrop-blur rounded-3xl shadow-md border border-slate-200 p-5">
          <div className="flex flex-wrap gap-2">
            {(
              [
                { key: "camino", label: "Camino", icon: <Sparkles size={16} /> },
                { key: "metas", label: "Metas", icon: <Target size={16} /> },
                { key: "registros", label: "Registros", icon: <Calendar size={16} /> },
              ] as const
            ).map((t) => (
              <button
                key={t.key}
                onClick={() => setTab(t.key)}
                className={[
                  "px-4 py-2 rounded-2xl text-sm font-bold border flex items-center gap-2 transition",
                  tab === t.key
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                ].join(" ")}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <AnimatePresence mode="wait">
              {tab === "camino" && (
                <motion.div
                  key="camino"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="text-base font-extrabold text-slate-900">Tu camino 🛤️</h3>
                  <p className="text-xs text-slate-600">
                    Cada meta es una estación. ¡Completa y sube de nivel!
                  </p>

                  <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                    <ProgressPath
                      goals={goals.map((g) => ({
                        id: g.id,
                        title: g.title,
                        status: g.status as any,
                        reward: g.reward ?? "",
                      }))}
                    />
                  </div>
                </motion.div>
              )}

              {tab === "metas" && (
                <motion.div
                  key="metas"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="text-base font-extrabold text-slate-900">Tus metas 🎯</h3>
                  <p className="text-xs text-slate-600">
                    Mira cuáles ya lograste y cuáles siguen en camino.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {goals.map((g, idx) => (
                      <motion.div
                        key={g.id}
                        className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.03 * idx }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-extrabold text-slate-900">{g.title}</p>
                            {g.reward && (
                              <p className="text-xs text-slate-600 mt-1">
                                Premio: <span className="font-semibold">{g.reward}</span>
                              </p>
                            )}
                          </div>
                          <span
                            className={[
                              "text-xs font-bold px-3 py-1 rounded-full border",
                              statusPillClasses(g.status),
                            ].join(" ")}
                          >
                            {formatGoalStatus(g.status)}
                          </span>
                        </div>

                        {g.description && (
                          <p className="text-xs text-slate-500 mt-2">{g.description}</p>
                        )}
                      </motion.div>
                    ))}

                    {!goals.length && (
                      <p className="text-xs text-slate-500">
                        Este alumno aún no tiene metas visibles.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {tab === "registros" && (
                <motion.div
                  key="registros"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-3"
                >
                  <h3 className="text-base font-extrabold text-slate-900">Tus registros 📘</h3>
                  <p className="text-xs text-slate-600">
                    Cada registro suma XP. ¡Sigue siendo constante!
                  </p>

                  {progressLogs.length > 0 ? (
                    <ul className="space-y-2">
                      {progressLogs.map((p, idx) => (
                        <motion.li
                          key={p.id}
                          className="bg-white rounded-2xl border border-slate-200 px-4 py-3 shadow-sm flex items-center justify-between gap-3"
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.02 * idx }}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center">
                              <Sparkles size={16} />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-slate-900">{p.date}</p>
                              {p.notes && <p className="text-xs text-slate-600">{p.notes}</p>}
                            </div>
                          </div>

                          <div className="text-right">
                            <p className="text-sm font-extrabold text-slate-900">
                              {p.weightKg ? `${p.weightKg} kg` : "—"}
                            </p>
                            <p className="text-xs text-slate-500">+12 XP</p>
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  ) : (
                    <div className="rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
                      Aún no hay registros. ¡Cuando agregues uno, subirás de nivel! ✨
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </motion.div>
    </div>
  );
}
