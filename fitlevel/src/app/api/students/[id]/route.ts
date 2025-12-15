import { NextRequest, NextResponse } from "next/server";
import { deleteStudent, getStudent, updateStudent } from "../store";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  const studentId = Number(id);
  const student = getStudent(studentId);

  if (!student) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(student);
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  const studentId = Number(id);
  const body = await req.json();

  const updated = updateStudent(studentId, {
    ...(body.firstName !== undefined ? { firstName: String(body.firstName) } : {}),
    ...(body.lastName !== undefined ? { lastName: String(body.lastName) } : {}),
    ...(body.age !== undefined ? { age: Number(body.age) } : {}),
    ...(body.sex !== undefined ? { sex: String(body.sex) } : {}),
    ...(body.weightKg !== undefined ? { weightKg: Number(body.weightKg) } : {}),
    ...(body.heightCm !== undefined ? { heightCm: Number(body.heightCm) } : {}),
    ...(body.professorId !== undefined ? { professorId: Number(body.professorId) } : {}),
  });

  if (!updated) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(_: NextRequest, { params }: RouteContext) {
  const { id } = await params;

  const studentId = Number(id);
  const ok = deleteStudent(studentId);

  if (!ok) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
