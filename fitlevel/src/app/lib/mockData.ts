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
  },
];

export const mockStudents: Student[] = [
  {
    id: 1,
    firstName: "Ana",
    lastName: "Lopez",
    age: 25,
    sex: "F",
    weightKg: 68,
    heightCm: 165,
    professorId: 1,
  },
  {
    id: 2,
    firstName: "Luis",
    lastName: "Martínez",
    age: 30,
    sex: "M",
    weightKg: 82,
    heightCm: 175,
    professorId: 1,
  },
];

export const mockGoals: Goal[] = [
  {
    id: 1,
    studentId: 1,
    title: "Bajar 2kg en 1 mes",
    description: "Reducir peso con dieta y cardio 3 veces por semana",
    targetType: "weight_loss_kg",
    targetValue: 2,
    startDate: "2025-01-01",
    endDate: "2025-02-01",
    reward: "Cena libre",
    status: "in_progress",
  },
  {
    id: 2,
    studentId: 1,
    title: "Completar 12 sesiones de gimnasio",
    targetType: "sessions",
    targetValue: 12,
    startDate: "2025-01-01",
    endDate: "2025-02-15",
    reward: "Nueva camiseta deportiva",
    status: "pending",
  },
];

export const mockProgress: ProgressLog[] = [
  {
    id: 1,
    studentId: 1,
    goalId: 1,
    date: "2025-01-05",
    weightKg: 67.5,
    notes: "Primera semana, buen avance",
  },
  {
    id: 2,
    studentId: 1,
    goalId: 1,
    date: "2025-01-12",
    weightKg: 66.8,
    notes: "Mejorando la dieta",
  },
];
