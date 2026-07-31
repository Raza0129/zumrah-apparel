"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";

type ActionResult = { error: string } | { success: true };

function slugify(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function createCategoryAction(name: string): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  const trimmed = name.trim();
  if (trimmed.length < 2) return { error: "Category name must be at least 2 characters" };

  const slug = slugify(trimmed);
  const existing = await prisma.category.findUnique({ where: { slug } });
  if (existing) return { error: "A category with this name already exists" };

  await prisma.category.create({ data: { name: trimmed, slug } });
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}

export async function updateCategoryAction(id: string, name: string): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  const trimmed = name.trim();
  if (trimmed.length < 2) return { error: "Category name must be at least 2 characters" };

  const slug = slugify(trimmed);
  const existing = await prisma.category.findFirst({ where: { slug, NOT: { id } } });
  if (existing) return { error: "A category with this name already exists" };

  await prisma.category.update({ where: { id }, data: { name: trimmed, slug } });
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}

export async function deleteCategoryAction(id: string): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  await prisma.product.updateMany({ where: { categoryId: id }, data: { categoryId: null } });
  await prisma.category.delete({ where: { id } });
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}
