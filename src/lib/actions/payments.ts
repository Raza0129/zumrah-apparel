"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/authz";

type ActionResult = { error: string } | { success: true };

const MANAGEABLE_METHODS = ["COD", "EASYPAISA", "JAZZCASH"] as const;
type ManageableMethod = (typeof MANAGEABLE_METHODS)[number];

interface PaymentSettingInput {
  enabled: boolean;
  accountName?: string;
  accountNumber?: string;
  instructions?: string;
}

export async function updatePaymentSettingAction(
  method: ManageableMethod,
  input: PaymentSettingInput
): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  if (!MANAGEABLE_METHODS.includes(method)) return { error: "Invalid payment method" };

  await prisma.paymentSetting.upsert({
    where: { method },
    update: {
      enabled: input.enabled,
      accountName: input.accountName || null,
      accountNumber: input.accountNumber || null,
      instructions: input.instructions || null,
    },
    create: {
      method,
      enabled: input.enabled,
      accountName: input.accountName || null,
      accountNumber: input.accountNumber || null,
      instructions: input.instructions || null,
    },
  });
  revalidatePath("/admin/payments");
  return { success: true };
}

export async function getEnabledPaymentMethodsAction() {
  const settings = await prisma.paymentSetting.findMany({
    where: { enabled: true },
    orderBy: { method: "asc" },
  });
  return settings.filter((s): s is typeof s & { method: ManageableMethod } => s.method !== "CARD");
}
