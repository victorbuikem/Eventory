import { getAuthSession } from "@/app/(app)/api/auth/[...nextauth]/route";
import { prisma } from "./prisma";

export async function getUserId() {
  const session = await getAuthSession();
  const userId = await prisma.user.findFirst({
    where: {
      email: session?.user?.email as string,
    },
  });

  return userId?.id;
}
