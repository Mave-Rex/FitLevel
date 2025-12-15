// lib/mockService.ts
import {
  Professor,
  Student,
  Goal,
  ProgressLog,
  GoalStatus,
} from "./types";
import {
  mockProfessors,
  mockStudents,
  mockGoals,
  mockProgress,
} from "./mockData";

export async function getProfessorByEmail(email: string): Promise<Professor | null> {
  return mockProfessors.find((p) => p.email === email) ?? null;
}

export async function getStudentsByProfessorId(
  professorId: number
): Promise<Student[]> {
  return mockStudents.filter((s) => s.professorId === professorId);
}

export async function getStudentDetail(studentId: number) {
  const student = mockStudents.find((s) => s.id === studentId) || null;
  if (!student) return null;

  const goals = mockGoals.filter((g) => g.studentId === studentId);
  const progress = mockProgress.filter((p) => p.studentId === studentId)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return { student, goals, progress };
}

// Ejemplo de “crear” alumno en memoria (solo para demo)
let nextStudentId = mockStudents.length + 1;

export async function createStudent(data: Omit<Student, "id">): Promise<Student> {
  const newStudent: Student = { ...data, id: nextStudentId++ };
  mockStudents.push(newStudent);
  return newStudent;
}
