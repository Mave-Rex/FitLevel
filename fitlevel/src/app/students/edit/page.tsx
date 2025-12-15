"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import { useProfessor } from "../../lib/useProfessor";

type FormState = {
  firstName: string;
  lastName: string;
  age: string;
  sex: "M" | "F" | "O";
  weightKg: string;
  heightCm: string;
};

export default function EditStudentPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const professor = useProfessor();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    firstName: "",
    lastName: "",
    age: "",
    sex: "M",
    weightKg: "",
    heightCm: "",
  });

  useEffect(() => {
    if (professor === null) return;
    if (!professor) router.push("/login");
  }, [professor, router]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/students/${id}`);
        if (!res.ok) throw new Error("Alumno no encontrado.");
        const s = await res.json();

        // opcional: validar pertenencia (si tu API no lo valida aún)
        if (professor && s.professorId !== professor.id) {
          router.push("/dashboard");
          return;
        }

        setForm({
          firstName: s.firstName ?? "",
          lastName: s.lastName ?? "",
          age: String(s.age ?? ""),
          sex: (s.sex ?? "M") as any,
          weightKg: String(s.weightKg ?? ""),
          heightCm: String(s.heightCm ?? ""),
        });
      } catch (e: any) {
        setError(e.message || "Error cargando alumno.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id, professor, router]);

  const canSubmit = useMemo(() => {
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
  }, [form]);

  function onChange<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((p) => ({ ...p, [key]: value }));
    setError(null);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch(`/api/students/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName.trim(),
          lastName: form.lastName.trim(),
          age: Number(form.age),
          sex: form.sex,
          weightKg: Number(form.weightKg),
          heightCm: Number(form.heightCm),
        }),
      });

      if (!res.ok) throw new Error("No se pudo actualizar.");
      router.push(`/students/${id}`);
    } catch (e: any) {
      setError(e.message || "Error inesperado.");
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
      <Link
        href={`/students/${id}`}
        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft size={16} />
        Volver al alumno
      </Link>

      <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
        Editar alumno
      </h1>

      <form
        onSubmit={onSubmit}
        className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm p-6 space-y-5"
      >
        {error && (
          <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-sm text-slate-600 inline-flex items-center gap-2">
            <Loader2 size={16} className="animate-spin" /> Cargando…
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-semibold text-slate-800">Nombres</label>
                <input
                  value={form.firstName}
                  onChange={(e) => onChange("firstName", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">Apellidos</label>
                <input
                  value={form.lastName}
                  onChange={(e) => onChange("lastName", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
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
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  inputMode="numeric"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-800">Sexo</label>
                <select
                  value={form.sex}
                  onChange={(e) => onChange("sex", e.target.value as any)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <option value="M">Masculino</option>
                  <option value="F">Femenino</option>
                  <option value="O">Otro</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-semibold text-slate-800">Altura (cm)</label>
                <input
                  value={form.heightCm}
                  onChange={(e) => onChange("heightCm", e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                  inputMode="numeric"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-800">Peso (kg)</label>
              <input
                value={form.weightKg}
                onChange={(e) => onChange("weightKg", e.target.value)}
                className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-200"
                inputMode="decimal"
                required
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <Link
                href={`/students/${id}`}
                className="text-sm px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700"
              >
                Cancelar
              </Link>

              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-60 font-semibold shadow-sm"
              >
                {submitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                Guardar cambios
              </button>
            </div>
          </>
        )}
      </form>
    </motion.main>
  );
}
