"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { checkoutSchema } from "@/lib/validations";
import { getShippingCost } from "@/lib/shipping";
import type { CartItem } from "@/store/cart";

export interface CreateOrderInput {
  fullName: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  province: string;
  postalCode: string;
  specialInstructions?: string;
  items: CartItem[];
}

export async function createOrderAction(
  input: CreateOrderInput
): Promise<{ error: string } | { success: true; orderNumber: string }> {
  const parsed = checkoutSchema.safeParse({
    fullName: input.fullName,
    phone: input.phone,
    email: input.email,
    addressLine: input.addressLine,
    city: input.city,
    province: input.province,
    postalCode: input.postalCode,
    specialInstructions: input.specialInstructions ?? "",
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid checkout details" };
  }

  if (input.items.length === 0) {
    return { error: "Your cart is empty" };
  }

  const session = await auth();
  const shippingCost = getShippingCost(parsed.data.city);
  const subtotal = input.items.reduce(
    (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
    0
  );
  const grandTotal = subtotal + shippingCost;
  const orderNumber = `ZA-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;

  await prisma.order.create({
    data: {
      orderNumber,
      userId: session?.user?.id ?? null,
      paymentMethod: "COD",
      fullName: parsed.data.fullName,
      phone: parsed.data.phone,
      email: parsed.data.email,
      addressLine: parsed.data.addressLine,
      city: parsed.data.city,
      province: parsed.data.province,
      postalCode: parsed.data.postalCode,
      specialInstructions: parsed.data.specialInstructions || null,
      subtotal,
      shippingCost,
      grandTotal,
      items: {
        create: input.items.map((item) => ({
          productId: item.productId,
          designId: item.designId ?? null,
          productName: item.name,
          quantity: item.quantity,
          unitPrice: item.salePrice ?? item.price,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize,
          designPreviewUrl: item.designPreviewUrl ?? null,
        })),
      },
    },
  });

  return { success: true, orderNumber };
}
