import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Nicht authentifiziert." }, { status: 401 });
  }

  try {
    const { name, company } = await req.json();

    await prisma.user.update({
      where: { id: session.user.id },
      data: { name },
    });

    if (company) {
      await prisma.company.update({
        where: { userId: session.user.id },
        data: {
          name: company.name,
          legalName: company.legalName || null,
          taxId: company.taxId || null,
          address: company.address || null,
          city: company.city || null,
          postalCode: company.postalCode || null,
          phone: company.phone || null,
          website: company.website || null,
          industry: company.industry || null,
          employees: company.employees ?? null,
          setupStatus: "IN_PROGRESS",
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Speichern fehlgeschlagen." }, { status: 500 });
  }
}
