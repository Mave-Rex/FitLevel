// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;
        if (!email || !password) return null;

        const professor = await prisma.professor.findUnique({ where: { email } });
        if (!professor) {
          throw new Error("Credenciales inválidas");
        }

        if (!professor.isApproved) {
          throw new Error(
            "Tu cuenta aún no ha sido aprobada. Por favor, espera la confirmación del administrador."
          );
        }

        const valid = await bcrypt.compare(password, professor.passwordHash);
        if (!valid) {
          throw new Error("Credenciales inválidas");
        }

        return {
          id: professor.id.toString(),
          name: `${professor.firstName} ${professor.lastName}`,
          email: professor.email,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };
