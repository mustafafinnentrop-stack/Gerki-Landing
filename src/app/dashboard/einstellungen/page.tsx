import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Header from "@/components/dashboard/Header";
import SettingsForm from "./SettingsForm";

async function getData(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { company: true },
    });
    return user;
  } catch {
    return null;
  }
}

export default async function EinstellungenPage() {
  const session = await getServerSession(authOptions);
  const user = session?.user?.id ? await getData(session.user.id) : null;

  return (
    <div>
      <Header title="Einstellungen" />

      <div className="p-6 max-w-2xl">
        <SettingsForm user={user} />
      </div>
    </div>
  );
}
