"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useProfessor } from "@/app/lib/useProfessor";

type FormState = {
  firstName: string;
  lastName: string;
  age: string; // string para input
  sex: "M" | "F" | "O";
  weightKg: string;
  heightCm: string;
};

export default function NewStudentPage() {
  const router = useRouter();
  const professor = useProfessor();

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    age: "",
    sex: "M",
    weightKg: "",
    heightCm: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (professor === null) return; // cargando
    if (!professor) router.push("/login");
  }, [professor, router]);

  const canSubmit = useMemo(() => {
    if (!professor) return false;
    const age = Number(form.age);
    const w = Number(form.weightKg);
    const h = Number(form.heightCm);
    return (
      form.firstName.trim().length >= 2 &&
      form.lastName.trim().length >= 2 &&
      Number.isFinite(age) &&
      age >= 5 &&
      age <= 80 &&
      Number.isFinite(w) &&
      w > 0 &&
      w <= 300 &&
      Number.isFinite(h) &&
      h > 0 &&
      h <= 250
    );
  }, [form, professor]);

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
    setError(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!professor) return;
    if (!canSubmit) {
      setError("Revisa los campos: hay valores inválidos o faltantes.");
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          age: Number(form.age),
          sex: form.sex,
          weightKg: Number(form.weightKg),
          heightCm: Number(form.heightCm),
          professorId: professor.id, // ✅ se asigna automáticamente
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "No se pudo crear el alumno.");
      }

      router.push("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Error inesperado.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!professor) return null;

  return (
    <motion.main
      className="max-w-2xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
          >
            <ArrowLeft size={16} />
            Volver al dashboard
          </Link>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
            Nuevo alumno
          </h1>
          <p className="mt-2 text-slate-600">
            Completa los datos del alumno para registrarlo en tu lista.
          </p>
        </div>

        <div className="hidden sm:flex flex-col items-end text-xs text-slate-500">
          <span className="font-semibold text-slate-700">
            {professor.firstName} {professor.lastName}
          </span>
          <span>{professor.email}</span>
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-5"
      >
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-800">
              Nombres
            </label>
            <input
              value={form.firstName}
              onChange={(e) => onChange("firstName", e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Ej: Sofía"
              minLength={2}
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-800">
              Apellidos
            </label>
            <input
              value={form.lastName}
              onChange={(e) => onChange("lastName", e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Ej: Mendoza"
              minLength={2}
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-800">Edad</label>
            <input
              value={form.age}
              onChange={(e) => onChange("age", e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Ej: 14"
              inputMode="numeric"
              required
            />
            <p className="mt-1 text-xs text-slate-500">5–80</p>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-800">Sexo</label>
            <select
              value={form.sex}
              onChange={(e) => onChange("sex", e.target.value as any)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
            >
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-800">
              Profesor (asignado)
            </label>
            <input
              value={`#${professor.id} • ${professor.firstName}`}
              readOnly
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 outline-none"
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold text-slate-800">
              Peso (kg)
            </label>
            <input
              value={form.weightKg}
              onChange={(e) => onChange("weightKg", e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Ej: 47.2"
              inputMode="decimal"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-800">
              Altura (cm)
            </label>
            <input
              value={form.heightCm}
              onChange={(e) => onChange("heightCm", e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
              placeholder="Ej: 154"
              inputMode="numeric"
              required
            />
          </div>
        </div>

        <div className="pt-2 flex items-center justify-end gap-3">
          <Link
            href="/dashboard"
            className="text-sm px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60 disabled:hover:bg-emerald-600 font-semibold shadow-sm"
          >
            {submitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            Guardar alumno
          </button>
        </div>
      </form>
    </motion.main>
  );
}
