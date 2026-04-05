import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

interface HeaderProps {
  title: string;
}

async function getUserData() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return prisma.user.findUnique({
    where: { email: session.user.email },
    select: { name: true, email: true },
  });
}

export default async function Header({ title }: HeaderProps) {
  const user = await getUserData();
  const name = user?.name ?? "Konto";
  const email = user?.email ?? "";
  const initial = name.charAt(0).toUpperCase();

  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-border bg-surface/50 sticky top-0 z-10">
      <h1 className="text-lg font-semibold text-foreground">{title}</h1>
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-foreground leading-tight">{name}</p>
          <p className="text-xs text-muted">{email}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
          <span className="text-primary font-semibold text-sm">{initial}</span>
        </div>
      </div>
    </header>
  );
}
