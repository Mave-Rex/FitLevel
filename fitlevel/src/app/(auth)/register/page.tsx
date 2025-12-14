// app/(auth)/register/page.tsx
"use client";

import { FormEvent, useState } from "react";

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    const formData = new FormData(e.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setErrorMsg(data.message || "Error al crear la cuenta");
      return;
    }

    setSuccessMsg(
      "Cuenta creada correctamente. Debes esperar aprobación del administrador antes de poder iniciar sesión."
    );
    e.currentTarget.reset();
  }

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 space-y-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Crear cuenta de profesor
        </h2>

        {successMsg && (
          <div className="bg-emerald-50 border border-emerald-300 text-sm text-emerald-900 rounded-md p-3">
            {successMsg}
          </div>
        )}
        {errorMsg && (
          <div className="bg-red-50 border border-red-300 text-sm text-red-900 rounded-md p-3">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Nombre
              </label>
              <input
                name="firstName"
                required
                className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700">
                Apellido
              </label>
              <input
                name="lastName"
                required
                className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
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
              minLength={6}
              className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Especialidad
            </label>
            <input
              name="specialty"
              placeholder="Entrenamiento funcional, fuerza, etc."
              required
              className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700">
              Celular
            </label>
            <input
              name="phone"
              required
              placeholder="+593 99 999 9999"
              className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 text-sm disabled:opacity-60"
          >
            {loading ? "Creando cuenta..." : "Registrarme"}
          </button>

          <p className="text-[11px] text-slate-500 mt-1">
            Después de registrarte, un administrador deberá aprobar tu cuenta
            antes de poder iniciar sesión.
          </p>
        </form>
      </div>
    </div>
  );
}
