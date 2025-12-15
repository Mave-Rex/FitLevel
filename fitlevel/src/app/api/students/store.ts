import { mockStudents } from "@/app/lib/mockData";

export type StudentDTO = {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  sex: string;
  weightKg: number;
  heightCm: number;
  professorId: number;
};

let students: StudentDTO[] = [...(mockStudents as any[])];

export function listStudents(professorId?: number) {
  if (!professorId) return students;
  return students.filter((s) => s.professorId === professorId);
}

export function getStudent(id: number) {
  return students.find((s) => s.id === id) ?? null;
}

export function addStudent(input: Omit<StudentDTO, "id">) {
  const nextId = students.length ? Math.max(...students.map((s) => s.id)) + 1 : 1;
  const created: StudentDTO = { id: nextId, ...input };
  students.unshift(created);
  return created;
}

export function updateStudent(id: number, patch: Partial<Omit<StudentDTO, "id">>) {
  const idx = students.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  students[idx] = { ...students[idx], ...patch };
  return students[idx];
}

export function deleteStudent(id: number) {
  const before = students.length;
  students = students.filter((s) => s.id !== id);
  return students.length !== before;
}
