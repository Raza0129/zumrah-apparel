"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@/generated/prisma/client";

export interface SaveDesignInput {
  productId: string;
  name: string;
  layers: unknown;
  frontPreviewUrl?: string | null;
  backPreviewUrl?: string | null;
}

export async function saveDesignAction(
  input: SaveDesignInput
): Promise<{ error: string } | { success: true; designId: string }> {
  const session = await auth();
  if (!session?.user) {
    return { error: "Please log in to save your design" };
  }

  if (!input.productId) {
    return { error: "No product selected" };
  }

  const product = await prisma.product.findUnique({ where: { id: input.productId } });
  if (!product) {
    return { error: "Product not found" };
  }

  const design = await prisma.design.create({
    data: {
      userId: session.user.id,
      productId: input.productId,
      name: input.name?.trim() || "Untitled Design",
      layers: input.layers as Prisma.InputJsonValue,
      frontPreviewUrl: input.frontPreviewUrl ?? null,
      backPreviewUrl: input.backPreviewUrl ?? null,
    },
  });

  return { success: true, designId: design.id };
}
