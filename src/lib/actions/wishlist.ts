"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function toggleWishlistAction(
  productId: string
): Promise<{ error: string } | { added: boolean }> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Please log in to save items to your wishlist" };
  }

  const existing = await prisma.wishlist.findUnique({
    where: { userId_productId: { userId: session.user.id, productId } },
  });

  if (existing) {
    await prisma.wishlist.delete({ where: { id: existing.id } });
    revalidatePath("/account/wishlist");
    return { added: false };
  }

  await prisma.wishlist.create({ data: { userId: session.user.id, productId } });
  revalidatePath("/account/wishlist");
  return { added: true };
}
