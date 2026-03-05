import { prisma } from "@/src/lib/prisma";

export async function getCurrentUser() {
  const userId = process.env.CURRENT_USER_ID;

  if (!userId) {
    throw new Error("CURRENT_USER_ID not set");
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("Current user not found");
  }

  return user;
}