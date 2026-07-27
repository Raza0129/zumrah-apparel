"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { productSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/authz";
import { buildMetaTitle, buildMetaDescription } from "@/lib/seo";

type ActionResult = { error: string } | { success: true };

export async function updateOrderStatusAction(orderId: string, status: string): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  await prisma.order.update({
    where: { id: orderId },
    data: { status: status as "PENDING" | "PRINTING" | "SHIPPED" | "DELIVERED" | "CANCELLED" },
  });
  revalidatePath("/admin/orders");
  return { success: true };
}

export async function updatePaymentStatusAction(orderId: string, paymentStatus: string): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  await prisma.order.update({
    where: { id: orderId },
    data: { paymentStatus: paymentStatus as "PENDING" | "PAID" | "FAILED" | "REFUNDED" },
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
  metaTitle?: string;
  metaDescription?: string;
}

function withSeoDefaults<T extends { name: string; description: string; metaTitle?: string; metaDescription?: string }>(data: T) {
  return {
    ...data,
    metaTitle: buildMetaTitle(data.metaTitle, data.name),
    metaDescription: buildMetaDescription(data.metaDescription, data.description),
  };
}

export async function createProductAction(input: ProductFormInput): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data" };
  }
  await prisma.product.create({ data: withSeoDefaults(parsed.data) });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}

export async function updateProductAction(productId: string, input: ProductFormInput): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  const parsed = productSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid product data" };
  }
  await prisma.product.update({ where: { id: productId }, data: withSeoDefaults(parsed.data) });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}

export async function deleteProductAction(productId: string): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  await prisma.product.delete({ where: { id: productId } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}

export async function toggleProductHiddenAction(productId: string, hidden: boolean): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  await prisma.product.update({ where: { id: productId }, data: { hidden } });
  revalidatePath("/admin/products");
  revalidatePath("/shop");
  return { success: true };
}
