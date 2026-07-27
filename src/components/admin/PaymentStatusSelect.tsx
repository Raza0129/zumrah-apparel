"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updatePaymentStatusAction } from "@/lib/actions/admin";

const STATUSES = ["PENDING", "PAID", "FAILED", "REFUNDED"];

const COLORS: Record<string, string> = {
  PENDING: "text-yellow-400",
  PAID: "text-emerald-400",
  FAILED: "text-red-400",
  REFUNDED: "text-gray-400",
};

export function PaymentStatusSelect({ orderId, status }: { orderId: string; status: string }) {
  const [value, setValue] = useState(status);
  const [pending, setPending] = useState(false);

  const handleChange = async (newStatus: string) => {
    setValue(newStatus);
    setPending(true);
    const res = await updatePaymentStatusAction(orderId, newStatus);
    setPending(false);
    if ("error" in res) {
      toast.error(res.error);
      setValue(status);
      return;
    }
    toast.success("Payment status updated");
  };

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => handleChange(e.target.value)}
      className={`px-3 py-1.5 bg-[#0d0d0d] border border-[#333] rounded-lg text-xs outline-none focus:border-[#D4AF37]/50 disabled:opacity-50 ${COLORS[value] ?? "text-white"}`}
    >
      {STATUSES.map((s) => (
        <option key={s} value={s} className="text-white">{s}</option>
      ))}
    </select>
  );
}
