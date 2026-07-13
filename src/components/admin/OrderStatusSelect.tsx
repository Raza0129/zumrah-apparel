"use client";

import { useState } from "react";
import { toast } from "sonner";
import { updateOrderStatusAction } from "@/lib/actions/admin";

const STATUSES = ["PENDING", "PRINTING", "SHIPPED", "DELIVERED", "CANCELLED"];

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: string }) {
  const [value, setValue] = useState(status);
  const [pending, setPending] = useState(false);

  const handleChange = async (newStatus: string) => {
    setValue(newStatus);
    setPending(true);
    const res = await updateOrderStatusAction(orderId, newStatus);
    setPending(false);
    if ("error" in res) {
      toast.error(res.error);
      setValue(status);
      return;
    }
    toast.success("Order status updated");
  };

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => handleChange(e.target.value)}
      className="px-3 py-1.5 bg-[#0d0d0d] border border-[#333] rounded-lg text-white text-xs outline-none focus:border-[#D4AF37]/50 disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
