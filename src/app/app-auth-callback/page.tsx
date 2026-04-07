import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { generateAppJWT, mapPlan } from "@/lib/appJwt";
import AppAuthRedirect from "./AppAuthRedirect";

export default async function AppAuthCallbackPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/login?source=app");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { company: { include: { subscription: true } } },
  });

  if (!user) {
    redirect("/login?source=app");
  }

  const plan = mapPlan(user.company?.subscription?.plan ?? "TRIAL");
  const token = generateAppJWT({ id: user.id, email: user.email, name: user.name, plan });

  return <AppAuthRedirect token={token} />;
}
