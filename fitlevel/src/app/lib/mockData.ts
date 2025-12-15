// lib/mockData.ts
import { Professor, Student, Goal, ProgressLog } from "./types";

export const mockProfessors: Professor[] = [
  {
    id: 1,
    firstName: "Cristian",
    lastName: "Saltos",
    email: "cristiansaltos@gmail.com",
    password: "123456",
    specialty: "Entrenamiento funcional",
    phone: "+593 99 999 9999",
    isApproved: true,

    // ✅ NUEVO
    stars: 5,
    zone: "Quito Norte",      // ✅ zona geográfica (antes “sector”)
    showOnMap: true,          // ✅ aparece en mapa / proximidad
    location: { lat: -0.18, lng: -78.48, address: "La Carolina, Quito" }
  },
  {
    id: 2,
    firstName: "Usuario",
    lastName: "Prueba",
    email: "usuarioprueba@gmail.com",
    password: "prueba123",
    specialty: "Entrenamiento general (Demo)",
    phone: "+593 98 111 2233",
    isApproved: true,

    // ✅ NUEVO
    stars: 3,
    zone: "Quito Norte",      // ✅ zona geográfica (antes “sector”)
    showOnMap: true,          // ✅ aparece en mapa / proximidad
    location: { lat: -0.18, lng: -78.48, address: "La Carolina, Quito" }
  },
];


export const mockStudents: Student[] = [
  // =========================
  // Profesor: Cristian (id 1) — 8 alumnos (13-18)
  // =========================
  {
    id: 1,
    firstName: "Sofía",
    lastName: "Mendoza",
    age: 14,
    sex: "F",
    weightKg: 47.2,
    heightCm: 154,
    professorId: 1,
  },
  {
    id: 2,
    firstName: "Mateo",
    lastName: "Alvarado",
    age: 15,
    sex: "M",
    weightKg: 56.8,
    heightCm: 165,
    professorId: 1,
  },
  {
    id: 3,
    firstName: "Valentina",
    lastName: "Rojas",
    age: 13,
    sex: "F",
    weightKg: 43.9,
    heightCm: 150,
    professorId: 1,
  },
  {
    id: 4,
    firstName: "Thiago",
    lastName: "Paredes",
    age: 16,
    sex: "M",
    weightKg: 62.5,
    heightCm: 172,
    professorId: 1,
  },
  {
    id: 5,
    firstName: "Camila",
    lastName: "Vega",
    age: 17,
    sex: "F",
    weightKg: 55.4,
    heightCm: 162,
    professorId: 1,
  },
  {
    id: 6,
    firstName: "Daniel",
    lastName: "Herrera",
    age: 18,
    sex: "M",
    weightKg: 71.1,
    heightCm: 178,
    professorId: 1,
  },
  {
    id: 7,
    firstName: "Isabella",
    lastName: "Cárdenas",
    age: 15,
    sex: "F",
    weightKg: 50.6,
    heightCm: 158,
    professorId: 1,
  },
  {
    id: 8,
    firstName: "Sebastián",
    lastName: "Flores",
    age: 14,
    sex: "M",
    weightKg: 52.3,
    heightCm: 160,
    professorId: 1,
  },

  // =========================
  // Profesor: Demo (id 2) — 5 alumnos
  // =========================
  {
    id: 9,
    firstName: "Martina",
    lastName: "Luna",
    age: 13,
    sex: "F",
    weightKg: 44.8,
    heightCm: 149,
    professorId: 2,
  },
  {
    id: 10,
    firstName: "Joaquín",
    lastName: "Ortiz",
    age: 16,
    sex: "M",
    weightKg: 61.7,
    heightCm: 170,
    professorId: 2,
  },
  {
    id: 11,
    firstName: "Renata",
    lastName: "Sánchez",
    age: 15,
    sex: "F",
    weightKg: 52.1,
    heightCm: 159,
    professorId: 2,
  },
  {
    id: 12,
    firstName: "Nicolás",
    lastName: "Peña",
    age: 18,
    sex: "M",
    weightKg: 73.4,
    heightCm: 180,
    professorId: 2,
  },
  {
    id: 13,
    firstName: "Emily",
    lastName: "Guerrero",
    age: 14,
    sex: "F",
    weightKg: 48.7,
    heightCm: 155,
    professorId: 2,
  },
];

export const mockGoals: Goal[] = [
  // =========================
  // Metas para Cristian (alumnos 1..8)
  // (Usando targetType: "sessions" y "weight_loss_kg" como en tu archivo actual)
  // =========================
  // Student 1 - Sofía
  {
    id: 1,
    studentId: 1,
    title: "Completar 12 sesiones (4 semanas)",
    description: "3 sesiones por semana enfocadas en técnica y movilidad.",
    targetType: "sessions",
    targetValue: 12,
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    reward: "Sticker FitLevel + felicitación en el panel",
    status: "in_progress",
  },
  {
    id: 2,
    studentId: 1,
    title: "Bajar 1kg de forma saludable",
    description: "Control de hábitos + sesiones constantes (sin extremos).",
    targetType: "weight_loss_kg",
    targetValue: 1,
    startDate: "2025-01-01",
    endDate: "2025-02-10",
    reward: "Insignia: Constancia",
    status: "pending",
  },

  // Student 2 - Mateo
  {
    id: 3,
    studentId: 2,
    title: "Completar 16 sesiones (6 semanas)",
    description: "Enfoque en resistencia y coordinación.",
    targetType: "sessions",
    targetValue: 16,
    startDate: "2025-01-01",
    endDate: "2025-02-15",
    reward: "Insignia: Resistencia",
    status: "in_progress",
  },
  {
    id: 4,
    studentId: 2,
    title: "Bajar 1kg (control y actividad)",
    targetType: "weight_loss_kg",
    targetValue: 1,
    startDate: "2025-01-10",
    endDate: "2025-02-20",
    reward: "Día de reto especial",
    status: "pending",
  },

  // Student 3 - Valentina
  {
    id: 5,
    studentId: 3,
    title: "Completar 10 sesiones (1 mes)",
    description: "Rutina base: postura, core y movilidad.",
    targetType: "sessions",
    targetValue: 10,
    startDate: "2025-01-05",
    endDate: "2025-02-05",
    reward: "Insignia: Primer Nivel",
    status: "in_progress",
  },
  {
    id: 6,
    studentId: 3,
    title: "Completar 14 sesiones (6 semanas)",
    targetType: "sessions",
    targetValue: 14,
    startDate: "2025-02-06",
    endDate: "2025-03-20",
    reward: "Insignia: Segundo Nivel",
    status: "pending",
  },

  // Student 4 - Thiago
  {
    id: 7,
    studentId: 4,
    title: "Completar 18 sesiones (6 semanas)",
    description: "3 sesiones/semana + énfasis en fuerza base.",
    targetType: "sessions",
    targetValue: 18,
    startDate: "2025-01-01",
    endDate: "2025-02-15",
    reward: "Insignia: Fuerza Base",
    status: "in_progress",
  },
  {
    id: 8,
    studentId: 4,
    title: "Bajar 2kg (progresivo)",
    targetType: "weight_loss_kg",
    targetValue: 2,
    startDate: "2025-01-15",
    endDate: "2025-03-01",
    reward: "Reto premium (solo demo)",
    status: "pending",
  },

  // Student 5 - Camila
  {
    id: 9,
    studentId: 5,
    title: "Completar 15 sesiones (5 semanas)",
    description: "Constancia + técnica en movimientos básicos.",
    targetType: "sessions",
    targetValue: 15,
    startDate: "2025-01-08",
    endDate: "2025-02-12",
    reward: "Insignia: Disciplina",
    status: "in_progress",
  },
  {
    id: 10,
    studentId: 5,
    title: "Bajar 1kg (hábitos)",
    targetType: "weight_loss_kg",
    targetValue: 1,
    startDate: "2025-01-08",
    endDate: "2025-02-25",
    reward: "Felicitación + nivel extra",
    status: "pending",
  },

  // Student 6 - Daniel
  {
    id: 11,
    studentId: 6,
    title: "Completar 20 sesiones (2 meses)",
    description: "Progresión controlada en fuerza y resistencia.",
    targetType: "sessions",
    targetValue: 20,
    startDate: "2025-01-01",
    endDate: "2025-03-01",
    reward: "Insignia: Élite",
    status: "in_progress",
  },
  {
    id: 12,
    studentId: 6,
    title: "Bajar 2kg (mejorar composición)",
    targetType: "weight_loss_kg",
    targetValue: 2,
    startDate: "2025-01-15",
    endDate: "2025-03-10",
    reward: "Semana de retos especiales",
    status: "pending",
  },

  // Student 7 - Isabella
  {
    id: 13,
    studentId: 7,
    title: "Completar 12 sesiones (1 mes)",
    description: "Enfocado en cardio moderado y técnica.",
    targetType: "sessions",
    targetValue: 12,
    startDate: "2025-01-03",
    endDate: "2025-02-02",
    reward: "Insignia: Energía",
    status: "in_progress",
  },
  {
    id: 14,
    studentId: 7,
    title: "Completar 18 sesiones (6 semanas)",
    targetType: "sessions",
    targetValue: 18,
    startDate: "2025-02-03",
    endDate: "2025-03-20",
    reward: "Insignia: Progreso",
    status: "pending",
  },

  // Student 8 - Sebastián
  {
    id: 15,
    studentId: 8,
    title: "Completar 14 sesiones (5 semanas)",
    description: "Coordinación + fuerza base + constancia.",
    targetType: "sessions",
    targetValue: 14,
    startDate: "2025-01-06",
    endDate: "2025-02-10",
    reward: "Insignia: Constante",
    status: "in_progress",
  },
  {
    id: 16,
    studentId: 8,
    title: "Bajar 1kg (progresivo)",
    targetType: "weight_loss_kg",
    targetValue: 1,
    startDate: "2025-01-20",
    endDate: "2025-03-01",
    reward: "Mini premio (demo)",
    status: "pending",
  },

  // =========================
  // Metas para Profesor Demo (alumnos 9..13)
  // =========================
  // Student 9 - Martina
  {
    id: 17,
    studentId: 9,
    title: "Completar 10 sesiones (1 mes)",
    description: "Rutina inicial para demo.",
    targetType: "sessions",
    targetValue: 10,
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    reward: "Insignia: Inicio",
    status: "in_progress",
  },
  {
    id: 18,
    studentId: 9,
    title: "Completar 14 sesiones (6 semanas)",
    targetType: "sessions",
    targetValue: 14,
    startDate: "2025-02-01",
    endDate: "2025-03-15",
    reward: "Insignia: Avance",
    status: "pending",
  },

  // Student 10 - Joaquín
  {
    id: 19,
    studentId: 10,
    title: "Completar 16 sesiones (6 semanas)",
    targetType: "sessions",
    targetValue: 16,
    startDate: "2025-01-05",
    endDate: "2025-02-16",
    reward: "Insignia: Racha",
    status: "in_progress",
  },
  {
    id: 20,
    studentId: 10,
    title: "Bajar 1kg (controlado)",
    targetType: "weight_loss_kg",
    targetValue: 1,
    startDate: "2025-01-10",
    endDate: "2025-02-25",
    reward: "Reto especial demo",
    status: "pending",
  },

  // Student 11 - Renata
  {
    id: 21,
    studentId: 11,
    title: "Completar 12 sesiones (4 semanas)",
    targetType: "sessions",
    targetValue: 12,
    startDate: "2025-01-01",
    endDate: "2025-01-31",
    reward: "Insignia: Consistencia",
    status: "in_progress",
  },
  {
    id: 22,
    studentId: 11,
    title: "Completar 18 sesiones (6 semanas)",
    targetType: "sessions",
    targetValue: 18,
    startDate: "2025-02-01",
    endDate: "2025-03-15",
    reward: "Insignia: Constancia",
    status: "pending",
  },

  // Student 12 - Nicolás
  {
    id: 23,
    studentId: 12,
    title: "Completar 20 sesiones (2 meses)",
    targetType: "sessions",
    targetValue: 20,
    startDate: "2025-01-01",
    endDate: "2025-03-01",
    reward: "Insignia: Demo Pro",
    status: "in_progress",
  },
  {
    id: 24,
    studentId: 12,
    title: "Bajar 2kg (progresivo)",
    targetType: "weight_loss_kg",
    targetValue: 2,
    startDate: "2025-01-15",
    endDate: "2025-03-10",
    reward: "Semana de retos demo",
    status: "pending",
  },

  // Student 13 - Emily
  {
    id: 25,
    studentId: 13,
    title: "Completar 12 sesiones (4 semanas)",
    targetType: "sessions",
    targetValue: 12,
    startDate: "2025-01-07",
    endDate: "2025-02-07",
    reward: "Insignia: Energía",
    status: "in_progress",
  },
  {
    id: 26,
    studentId: 13,
    title: "Completar 16 sesiones (6 semanas)",
    targetType: "sessions",
    targetValue: 16,
    startDate: "2025-02-08",
    endDate: "2025-03-22",
    reward: "Insignia: Siguiente Nivel",
    status: "pending",
  },
];

export const mockProgress: ProgressLog[] = [
  // Sofía (studentId 1) — avances sobre la meta id 1
  {
    id: 1,
    studentId: 1,
    goalId: 1,
    date: "2025-01-06",
    notes: "Primera semana completa, buena actitud.",
  },
  {
    id: 2,
    studentId: 1,
    goalId: 1,
    date: "2025-01-13",
    notes: "Mejorando técnica, se mantiene constante.",
  },

  // Mateo (studentId 2) — meta id 3
  {
    id: 3,
    studentId: 2,
    goalId: 3,
    date: "2025-01-12",
    notes: "Cumple 2/3 sesiones semanales.",
  },

  // Thiago (studentId 4) — meta id 7
  {
    id: 4,
    studentId: 4,
    goalId: 7,
    date: "2025-01-18",
    notes: "Buen progreso en fuerza base.",
  },

  // Demo: Joaquín (studentId 10) — meta id 19
  {
    id: 5,
    studentId: 10,
    goalId: 19,
    date: "2025-01-15",
    notes: "Racha inicial correcta.",
  },
];
