"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";

type ActionResult = { error: string } | { success: true };

export async function updateUserRoleAction(userId: string, role: "CUSTOMER" | "ADMIN"): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { error: "Forbidden: admin access required" };
  if (session.user.id === userId && role !== "ADMIN") {
    return { error: "You cannot remove your own admin access" };
  }
  await prisma.user.update({ where: { id: userId }, data: { role } });
  revalidatePath("/admin/users");
  return { success: true };
}

export async function toggleUserBlockedAction(userId: string, blocked: boolean): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { error: "Forbidden: admin access required" };
  if (session.user.id === userId) {
    return { error: "You cannot block your own account" };
  }
  await prisma.user.update({ where: { id: userId }, data: { blocked } });
  revalidatePath("/admin/users");
  return { success: true };
}

export async function deleteUserAction(userId: string): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { error: "Forbidden: admin access required" };
  if (session.user.id === userId) {
    return { error: "You cannot delete your own account" };
  }
  await prisma.user.delete({ where: { id: userId } });
  revalidatePath("/admin/users");
  return { success: true };
}
