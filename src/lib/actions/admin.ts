"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";

type ActionResult = { error: string } | { success: true };

async function isAdmin() {
  const session = await auth();
  return session?.user.role === "ADMIN";
}

export async function updateOrderStatusAction(orderId: string, status: string): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Forbidden: admin access required" };
  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as "PENDING" | "PRINTING" | "SHIPPED" | "DELIVERED" | "CANCELLED" },
  });
  revalidatePath("/admin/orders");
  return { success: true };
}

interface ProductFormInput {
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  salePrice?: number | null;
  printingMethod: "DTF" | "SUBLIMATION";
  images: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  material: string;
  features: string[];
  tags: string[];
  isCustomizable: boolean;
  inStock: boolean;
}

export async function createProductAction(input: ProductFormInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Forbidden: admin access required" };
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data" };
  }
  await prisma.product.create({ data: parsed.data });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}

export async function updateProductAction(productId: string, input: ProductFormInput): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Forbidden: admin access required" };
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data" };
  }
  await prisma.product.update({ where: { id: productId }, data: parsed.data });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}

export async function deleteProductAction(productId: string): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Forbidden: admin access required" };
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}

export async function toggleProductHiddenAction(productId: string, hidden: boolean): Promise<ActionResult> {
  if (!(await isAdmin())) return { error: "Forbidden: admin access required" };
  await prisma.product.update({ where: { id: productId }, data: { hidden } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}
