import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import ChatInterface from "./ChatInterface";

export const metadata = { title: "Gerki Chat" };

export default async function ChatPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login?callbackUrl=/chat");
  return <ChatInterface user={{ name: session.user.name ?? "", email: session.user.email ?? "" }} />;
}
