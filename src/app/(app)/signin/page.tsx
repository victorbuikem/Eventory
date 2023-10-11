import LoginForm from "@/components/loginForm";
import { getAuthSession } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <LoginForm />
      </main>
    );
  }
  redirect("/events");
}
