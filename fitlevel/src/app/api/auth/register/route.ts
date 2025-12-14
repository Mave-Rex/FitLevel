// app/api/auth/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password, specialty, phone } = body;

    if (!firstName || !lastName || !email || !password || !specialty || !phone) {
      return NextResponse.json(
        { message: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const existing = await prisma.professor.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { message: "Ya existe un profesor con ese email" },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.professor.create({
      data: {
        firstName,
        lastName,
        email,
        passwordHash,
        specialty,
        phone,
        isApproved: false,
      },
    });

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error en el servidor" },
      { status: 500 }
    );
  }
}
