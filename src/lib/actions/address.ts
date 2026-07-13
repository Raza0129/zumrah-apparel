"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function addAddressAction(formData: FormData) {
  const session = await auth();
  if (!session?.user) return { error: "Not logged in" };

  const fullName = String(formData.get("fullName") ?? "");
  const phone = String(formData.get("phone") ?? "");
  const addressLine = String(formData.get("addressLine") ?? "");
  const city = String(formData.get("city") ?? "");
  const province = String(formData.get("province") ?? "");
  const postalCode = String(formData.get("postalCode") ?? "");

  if (!fullName || !phone || !addressLine || !city || !province || !postalCode) {
    return { error: "All fields are required" };
  }

  const existingCount = await prisma.address.count({ where: { userId: session.user.id } });

  await prisma.address.create({
    data: {
      userId: session.user.id,
      fullName,
      phone,
      addressLine,
      city,
      province,
      postalCode,
      isDefault: existingCount === 0,
    },
  });

  revalidatePath("/account/addresses");
  return { success: true };
}

export async function deleteAddressAction(addressId: string) {
  const session = await auth();
  if (!session?.user) return { error: "Not logged in" };

  await prisma.address.deleteMany({ where: { id: addressId, userId: session.user.id } });
  revalidatePath("/account/addresses");
  return { success: true };
}
