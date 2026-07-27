import { prisma } from "@/lib/prisma";
import { PaymentSettingsClient } from "@/components/admin/PaymentSettingsClient";

export default async function AdminPaymentsPage() {
  const settings = await prisma.paymentSetting.findMany();

  return (
    <PaymentSettingsClient
      settings={settings.filter((s): s is typeof s & { method: "COD" | "EASYPAISA" | "JAZZCASH" } => s.method !== "CARD")}
    />
  );
}
