"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteOrderAction } from "@/lib/actions/admin";

export function DeleteOrderButton({ orderId, orderNumber, redirectTo }: { orderId: string; orderNumber: string; redirectTo?: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete order ${orderNumber}? This cannot be undone.`)) return;
    setPending(true);
    const res = await deleteOrderAction(orderId);
    setPending(false);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    toast.success("Order deleted");
    if (redirectTo) router.push(redirectTo);
    else router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      disabled={pending}
      className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-400/10 disabled:opacity-30"
      title="Delete order"
    >
      <Trash2 size={15} />
    </button>
  );
}
