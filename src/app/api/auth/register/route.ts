import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password, companyName } = await req.json();

    if (!name || !email || !password || !companyName) {
      return NextResponse.json(
        { error: "Alle Felder sind erforderlich." },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: "Passwort muss mindestens 8 Zeichen haben." },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existing) {
      return NextResponse.json(
        { error: "Diese E-Mail-Adresse ist bereits registriert." },
        { status: 409 }
      );
    }

    const hashed = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed,
        company: {
          create: {
            name: companyName,
            setupStatus: "PENDING",
          },
        },
      },
    });

    return NextResponse.json(
      { id: user.id, email: user.email },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut." },
      { status: 500 }
    );
  }
}
