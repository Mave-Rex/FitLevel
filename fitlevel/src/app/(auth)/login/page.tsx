// app/(auth)/login/page.tsx
"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setErrorMsg(res.error);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <div className="max-w-sm mx-auto">
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
              className="w-full mt-1 rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 text-sm disabled:opacity-60"
          >
            {loading ? "Ingresando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
