import Link from "next/link";
import {
  Dumbbell,
  Users,
  Goal,
  LineChart,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center text-center mt-10 gap-20">

      {/* HERO */}
      <section className="max-w-3xl mx-auto px-4">
        <div className="flex justify-center">
          <Dumbbell size={60} className="text-emerald-600" />
        </div>

        <h1 className="text-4xl font-extrabold text-slate-900 leading-tight mt-4">
          La Plataforma Inteligente para Entrenadores
          <br />
          <span className="text-emerald-600">y Gestión de Alumnos</span>
        </h1>

        <p className="text-slate-600 text-lg mt-4">
          Administra alumnos, crea objetivos personalizados, registra progreso
          y motiva con un sistema visual gamificado. Todo en un solo lugar.
        </p>

        <div className="flex items-center justify-center gap-4 mt-8">
          <Link
            href="/register"
            className="bg-emerald-600 hover:bg-emerald-500 shadow-md text-white px-6 py-3 rounded-md font-semibold flex items-center gap-2"
          >
            Comenzar ahora <ArrowRight size={18} />
          </Link>

          <Link
            href="/login"
            className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-md font-semibold"
          >
            Iniciar Sesión
          </Link>
        </div>
      </section>

      {/* CARACTERISTICAS */}
      <section className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">

        <div className="bg-white shadow-md border border-slate-200 rounded-xl p-6 text-left">
          <Users size={35} className="text-emerald-600 mb-3" />
          <h3 className="text-lg font-bold text-slate-900">
            Gestión de alumnos
          </h3>
          <p className="text-slate-600 text-sm mt-2">
            Registra información completa de cada alumno: edad, peso, altura,
            sexo y progreso histórico.
          </p>
        </div>

        <div className="bg-white shadow-md border border-slate-200 rounded-xl p-6 text-left">
          <Goal size={35} className="text-emerald-600 mb-3" />
          <h3 className="text-lg font-bold text-slate-900">
            Objetivos personalizados
          </h3>
          <p className="text-slate-600 text-sm mt-2">
            Define metas claras como bajar de peso, aumentar masa, mejorar
            resistencia y más.
          </p>
        </div>

        <div className="bg-white shadow-md border border-slate-200 rounded-xl p-6 text-left">
          <LineChart size={35} className="text-emerald-600 mb-3" />
          <h3 className="text-lg font-bold text-slate-900">
            Progreso gamificado
          </h3>
          <p className="text-slate-600 text-sm mt-2">
            Motiva a tus alumnos con un camino visual tipo laberinto que avanza
            conforme completan objetivos.
          </p>
        </div>

      </section>

      {/* SECCION DE SEGURIDAD */}
      <section className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8 bg-white border border-slate-200 shadow-md rounded-xl p-8">
        <ShieldCheck size={65} className="text-emerald-600" />

        <div className="text-left">
          <h3 className="text-2xl font-bold text-slate-900">
            Seguridad y control total
          </h3>
          <p className="text-slate-600 mt-2 text-sm leading-relaxed">
            Solo profesores verificados pueden acceder a la plataforma. Tu cuenta
            debe ser aprobada antes de poder iniciar sesión, garantizando un
            entorno seguro y profesional.
          </p>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="max-w-xl mx-auto text-center px-4 mb-20">
        <h2 className="text-3xl font-bold text-slate-900">
          ¿Listo para transformar tu forma de entrenar?
        </h2>
        <p className="text-slate-600 mt-2 text-sm">
          Únete a GymCoach y lleva a tus alumnos al siguiente nivel.
        </p>

        <Link
          href="/register"
          className="mt-6 inline-block bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-md font-semibold shadow-md"
        >
          Crear cuenta de profesor
        </Link>
      </section>
    </main>
  );
}
