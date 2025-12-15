import { NextRequest, NextResponse } from "next/server";
import { addStudent, listStudents } from "./store";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const professorId = searchParams.get("professorId");
  const data = listStudents(professorId ? Number(professorId) : undefined);
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Requeridos mínimos (ajústalo si quieres validación más estricta)
  const required = ["firstName", "lastName", "age", "sex", "weightKg", "heightCm", "professorId"];
  for (const k of required) {
    if (body?.[k] === undefined || body?.[k] === null) {
      return NextResponse.json({ message: `Missing field: ${k}` }, { status: 400 });
    }
  }

  const created = addStudent({
    firstName: String(body.firstName),
    lastName: String(body.lastName),
    age: Number(body.age),
    sex: String(body.sex),
    weightKg: Number(body.weightKg),
    heightCm: Number(body.heightCm),
    professorId: Number(body.professorId),
  });

  return NextResponse.json(created, { status: 201 });
}
