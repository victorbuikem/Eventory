"use server";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/app/(app)/api/auth/[...nextauth]/route";
import { prisma } from "./prisma";

export async function getUserId() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/");
  }
  const userId = await prisma.user.findUnique({
    where: {
      email: session?.user?.email as string,
    },
  });

  return userId?.id;
}
