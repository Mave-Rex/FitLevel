import { NextResponse } from "next/server";
import { mockStudents } from "../../lib/mockData";

export async function GET() {
  // Retorna todos los estudiantes
  return NextResponse.json(mockStudents);
}

export async function POST(req: Request) {
  // Crea un nuevo alumno
  const student = await req.json();
  mockStudents.push(student);
  return NextResponse.json(student, { status: 201 });
}

export async function PUT(req: Request) {
  // Actualiza un alumno por ID
  const updatedStudent = await req.json();
  const index = mockStudents.findIndex((s) => s.id === updatedStudent.id);
  if (index !== -1) {
    mockStudents[index] = updatedStudent;
  }
  return NextResponse.json(updatedStudent);
}

export async function DELETE(req: Request) {
  // Elimina un alumno por ID
  const { id } = await req.json();
  const index = mockStudents.findIndex((s) => s.id === id);
  if (index !== -1) {
    mockStudents.splice(index, 1);
  }
  return NextResponse.json({ message: "Alumno eliminado" });
}
