// app/(auth)/login/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { mockProfessors } from "../../lib/mockData";

export default function LoginPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string).trim().toLowerCase();
    const password = (formData.get("password") as string).trim();

    // 👇 Esto es solo para que puedas ver en la consola qué está llegando
    console.log("email ingresado:", email);
    console.log("password ingresada:", password);
    console.log("mockProfessors:", mockProfessors);

    const professor = mockProfessors.find(
      (p) =>
        p.email.toLowerCase() === email &&
        p.password === password
    );

    if (!professor) {
      setErrorMsg("Credenciales incorrectas");
      setLoading(false);
      return;
    }

    // Guardar sesión en localStorage
    localStorage.setItem("professor", JSON.stringify(professor));

    router.push("/dashboard");
  }

  return (
    <div className="max-w-sm mx-auto mt-10">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">Iniciar sesión</h2>

        {errorMsg && (
          <div className="bg-red-50 border border-red-300 text-sm text-red-900 rounded-md p-3">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              defaultValue="" // 👈 para que pruebes rápido
              className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              required
              defaultValue=""              // 👈 clave correcta
              className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 text-sm"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
