import { Clock, Printer, Truck, CheckCircle, XCircle } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/shipping";

const STATUS_CONFIG = {
  PENDING: { label: "Pending", color: "text-yellow-400", bg: "bg-yellow-400/10", icon: Clock },
  PRINTING: { label: "Printing", color: "text-blue-400", bg: "bg-blue-400/10", icon: Printer },
  SHIPPED: { label: "Shipped", color: "text-[#D4AF37]", bg: "bg-[#D4AF37]/10", icon: Truck },
  DELIVERED: { label: "Delivered", color: "text-emerald-400", bg: "bg-emerald-400/10", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", color: "text-red-400", bg: "bg-red-400/10", icon: XCircle },
} as const;

export default async function AccountOrdersPage() {
  const session = await auth();
  const orders = await prisma.order.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6 font-sans">My Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-10 text-center">
          <p className="text-gray-500">You haven&apos;t placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = STATUS_CONFIG[order.status];
            const StatusIcon = status.icon;
            return (
              <div key={order.id} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
                <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                  <div>
                    <p className="text-white font-semibold text-sm">{order.orderNumber}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{order.createdAt.toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status.color} ${status.bg}`}>
                    <StatusIcon size={12} /> {status.label}
                  </span>
                </div>
                <div className="border-t border-[#1e1e1e] pt-3 space-y-1.5">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-400">{item.productName} × {item.quantity}</span>
                      <span className="text-gray-300">{formatPKR(item.unitPrice * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-[#1e1e1e] mt-3 pt-3 flex justify-between items-center">
                  <span className="text-gray-500 text-xs">{order.city} · Cash on Delivery</span>
                  <span className="text-[#D4AF37] font-bold">{formatPKR(order.grandTotal)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
