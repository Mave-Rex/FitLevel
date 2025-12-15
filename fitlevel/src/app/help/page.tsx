"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Dumbbell, Microscope, Code, Target, Eye } from "lucide-react";


import {
  Mail,
  MessageCircle,
  Clock,
  MapPin,
  ArrowRight,
  HelpCircle,
  ShieldCheck,
  Users,
  Sparkles,
} from "lucide-react";

const BRAND_BLUE = "#0D3B66";

const team = [
  {
    name: "Christian Saltos",
    role: "Pedagogía en Actividad Física y Deporte",
    bio: "Estudiante de pedagogía en la actividad física y deporte con experiencia en deportes y entrenamiento personal.",
  },
  {
    name: "Jessica Tonato",
    role: "Biotecnología",
    bio: "Estudiante de Biotecnología con formación en análisis de procesos biológicos, fisiología humana y aplicación de herramientas científicas para la optimización del rendimiento físico.",
  },
  {
    name: "Emiliana Paguay",
    role: "Pedagogía en Actividad Física y Deporte",
    bio: "Estudiante de pedagogía en actividad física y deporte, con una sólida trayectoria como deportista de alto rendimiento en fútbol femenino y atletismo.",
  },
  {
    name: "Miguel Gutiérrez",
    role: "Software",
    bio: "Estudiante de Software con gran interés en ciberseguridad y en el desarrollo de sistemas y aplicaciones seguras, eficientes y de calidad, orientadas a satisfacer las demandas del campo tecnológico y digital actual.",
  },
  {
    name: "Cristian Acalo",
    role: "Software",
    bio: "Estudiante de Software, dedicado al análisis, construcción y validación de aplicaciones web, móviles y de escritorio.",
  },
];

const faqs = [
  {
    q: "¿Quién puede usar FitLevel?",
    a: "Profesores/entrenadores que deseen gestionar alumnos, registrar metas y visualizar el progreso de forma clara y gamificada.",
  },
  {
    q: "¿Puedo compartir el progreso del alumno?",
    a: "Sí. FitLevel incluye una vista pública compartible para mostrar metas y avances sin exponer datos del profesor.",
  },
  {
    q: "¿Necesito tener una cuenta para ver la ayuda?",
    a: "No. La sección de ayuda y contacto es pública.",
  },
];

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] }, // ✅ en vez de "easeOut"
  },
};


export default function AyudaPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-10">
      {/* HERO llamativo */}
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
      >
        {/* Fondo animado */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-emerald-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-sky-200/45 blur-3xl" />
          <motion.div
            className="absolute top-10 right-12 h-24 w-24 rounded-full bg-emerald-300/30 blur-2xl"
            animate={{ y: [0, 10, 0], x: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 left-10 h-20 w-20 rounded-full bg-sky-300/30 blur-2xl"
            animate={{ y: [0, -10, 0], x: [0, 8, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative p-6 sm:p-10">
          <div className="flex items-start justify-between gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                <Sparkles size={14} />
                FitLevel • Centro de ayuda
              </div>

              <h1 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Contáctanos y Conoce sobre el proyecto
              </h1>

              <p className="mt-3 text-slate-600 leading-relaxed">
                FitLevel nació en la materia <b>Gestión y Emprendimiento</b> de la{" "}
                <b>Universidad de las Fuerzas Armadas ESPE</b>. Nuestro objetivo es ayudar a entrenadores
                a gestionar alumnos, metas y progreso de forma clara, motivadora y gamificada.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="mailto:contacto@fitlevel.com"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 transition-colors shadow-sm"
                >
                  <Mail size={18} /> Escríbenos por email
                </motion.a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="https://wa.me/0000000000"
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors shadow-sm"
                >
                  <MessageCircle size={18} /> WhatsApp soporte
                </motion.a>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-slate-900 bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm"
                  >
                    Ir al Dashboard <ArrowRight size={18} />
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="hidden sm:block">
              <div className="h-16 w-16 rounded-2xl bg-white/70 border border-slate-200 flex items-center justify-center shadow-sm">
                <ShieldCheck size={28} style={{ color: BRAND_BLUE }} />
              </div>
            </div>
          </div>
        </div>

        {/* Línea de marca con animación */}
        <motion.div
          className="h-[3px] bg-gradient-to-r from-emerald-500 via-[#0D3B66] to-emerald-500"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transformOrigin: "left" }}
        />
      </motion.section>

      {/* CONTACTO (cards animadas + hover) */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="grid md:grid-cols-3 gap-4"
      >
        {[
          {
            icon: <Mail size={18} style={{ color: BRAND_BLUE }} />,
            title: "Correo",
            value: "contacto@fitlevel.com",
            note: "Respuesta en 24–48h",
          },
          {
            icon: <MessageCircle size={18} className="text-emerald-700" />,
            title: "WhatsApp",
            value: "+593 00 000 0000",
            note: "Soporte rápido",
          },
          {
            icon: <Clock size={18} className="text-slate-700" />,
            title: "Horario",
            value: "Lun–Vie, 09:00–18:00",
            note: "Hora Ecuador",
          },
        ].map((c, idx) => (
          <motion.div
            key={idx}
            variants={item}
            whileHover={{ y: -3 }}
            className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                {c.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{c.title}</p>
                <p className="text-sm text-slate-700">{c.value}</p>
              </div>
            </div>
            <p className="mt-3 text-xs text-slate-500">{c.note}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* ACERCA DE NOSOTROS */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8"
      >
        <motion.div variants={item} className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Acerca de nosotros</h2>
            <p className="mt-2 text-slate-600 leading-relaxed">
              FitLevel es un emprendimiento académico que integra deporte, ciencia y tecnología para
              mejorar el seguimiento de metas en alumnos. Buscamos que la constancia sea visible y
              motivadora con un enfoque gamificado (metas por niveles, camino visual y recompensas).
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500">
            <MapPin size={14} />
            ESPE — Ecuador
          </div>
        </motion.div>

        <div className="mt-5 grid sm:grid-cols-3 gap-4">
          {[
            {
              title: "Motivación real",
              desc: "Progreso visual y metas por niveles para mantener constancia.",
              icon: <Sparkles size={16} className="text-emerald-700" />,
            },
            {
              title: "Gestión simple",
              desc: "Panel del profesor, alumnos y detalles en un flujo intuitivo.",
              icon: <Users size={16} style={{ color: BRAND_BLUE }} />,
            },
            {
              title: "Soporte y confianza",
              desc: "Vista pública/privada separada y buenas prácticas de seguridad.",
              icon: <HelpCircle size={16} className="text-slate-700" />,
            },
          ].map((v, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -3 }}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  {v.icon}
                </div>
                <p className="text-sm font-semibold text-slate-900">{v.title}</p>
              </div>
              <p className="mt-2 text-sm text-slate-600">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

          {/* MISIÓN & VISIÓN (cards animadas) */}
<motion.section
  variants={stagger}
  initial="hidden"
  whileInView="show"
  viewport={{ once: true, amount: 0.25 }}
  className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm p-6 sm:p-8"
>
  {/* Glow suave */}
  <div className="pointer-events-none absolute inset-0">
    <motion.div
      className="absolute -top-20 -right-24 h-64 w-64 rounded-full bg-emerald-200/40 blur-3xl"
      animate={{ y: [0, 14, 0], x: [0, -10, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-sky-200/35 blur-3xl"
      animate={{ y: [0, -12, 0], x: [0, 10, 0] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>

  <motion.div variants={item} className="relative">
    <div className="flex items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900">Misión y Visión</h2>
        <p className="mt-2 text-slate-600">
          Lo que guía a FitLevel y hacia dónde queremos llegar.
        </p>
      </div>
    </div>

    <div className="mt-6 grid lg:grid-cols-2 gap-4">
      {/* MISIÓN */}
      <motion.div
        variants={item}
        whileHover={{ y: -3 }}
        className="group rounded-2xl border border-slate-200 bg-slate-50 p-5"
      >
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
            <Target size={18} className="text-emerald-700" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-slate-900">MISIÓN</p>
            <motion.div
              className="mt-2 h-[2px] w-10 bg-emerald-500/70 rounded-full"
              initial={{ width: 18, opacity: 0.6 }}
              whileHover={{ width: 56, opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Somos una plataforma digital dedicada al registro, análisis y motivación del rendimiento
              físico estudiantil. Brindamos a los docentes herramientas tecnológicas innovadoras que
              permiten establecer metas personalizadas, fomentar la competitividad sana y garantizar la
              transparencia en la evaluación deportiva, contribuyendo al desarrollo integral de los
              estudiantes.
            </p>
          </div>
        </div>
      </motion.div>

      {/* VISIÓN */}
      <motion.div
        variants={item}
        whileHover={{ y: -3 }}
        className="group rounded-2xl border border-slate-200 bg-slate-50 p-5"
      >
        <div className="flex items-start gap-3">
          <div className="h-11 w-11 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
            <Eye size={18} style={{ color: BRAND_BLUE }} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-extrabold text-slate-900">VISIÓN</p>
            <motion.div
              className="mt-2 h-[2px] w-10 rounded-full"
              style={{ backgroundColor: BRAND_BLUE, opacity: 0.6 }}
              initial={{ width: 18, opacity: 0.6 }}
              whileHover={{ width: 56, opacity: 1 }}
              transition={{ duration: 0.25 }}
            />
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              Convertirnos en la plataforma líder en Latinoamérica en el seguimiento del rendimiento
              físico estudiantil, integrando tecnologías educativas, gamificación y análisis de datos,
              garantizando transparencia, equidad y motivación deportiva. Para el futuro, buscamos
              expandirnos a instituciones deportivas, integrar inteligencia artificial y adaptarnos a los
              avances políticos, económicos, educativos y tecnológicos del entorno.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
</motion.section>

      {/* EQUIPO (stagger + hover) */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="space-y-3"
      >
        <motion.div variants={item}>
          <h2 className="text-xl font-bold text-slate-900">Equipo</h2>
          <p className="text-slate-600">
            Un equipo multidisciplinario que combina entrenamiento, biociencia y desarrollo de software.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4">
          {team.map((m) => {
  const roleIcon =
    m.role.includes("Actividad")
      ? <Dumbbell size={18} className="text-emerald-600" />
      : m.role.includes("Biotecnología")
      ? <Microscope size={18} className="text-sky-600" />
      : <Code size={18} className="text-indigo-600" />;

  return (
    <motion.div
      key={m.name}
      className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5"
      whileHover={{ y: -3 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-base font-bold text-slate-900">{m.name}</p>
          <p className="text-xs font-semibold text-emerald-700">{m.role}</p>
        </div>

        {/* ICONO POR ROL */}
        <div className="h-10 w-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center">
          {roleIcon}
        </div>
      </div>

      <p className="mt-3 text-sm text-slate-600">{m.bio}</p>
    </motion.div>
  );
})}

        </div>
      </motion.section>

      {/* FAQ (stagger) */}
      <motion.section
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8"
      >
        <motion.h2 variants={item} className="text-xl font-bold text-slate-900">
          Preguntas frecuentes
        </motion.h2>

        <motion.div variants={stagger} className="mt-4 space-y-3">
          {faqs.map((f, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -2 }}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4"
            >
              <p className="text-sm font-semibold text-slate-900">{f.q}</p>
              <p className="mt-1 text-sm text-slate-600">{f.a}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>
    </div>
  );
}
