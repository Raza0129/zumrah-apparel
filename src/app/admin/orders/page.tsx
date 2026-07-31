import Link from "next/link";
import { Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/shipping";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";
import { PaymentStatusSelect } from "@/components/admin/PaymentStatusSelect";
import { DeleteOrderButton } from "@/components/admin/DeleteOrderButton";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <p className="text-gray-500 text-sm mb-6">{orders.length} total orders</p>

      {orders.length === 0 ? (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-10 text-center">
          <p className="text-gray-500">No orders placed yet.</p>
        </div>
      ) : (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e1e] text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Customer</th>
                  <th className="px-4 py-3 font-medium">City</th>
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Payment Status</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-[#1a1a1a] last:border-0">
                    <td className="px-4 py-3">
                      <Link href={`/admin/orders/${order.id}`} className="text-white font-medium hover:text-[#D4AF37] transition-colors">
                        {order.orderNumber}
                      </Link>
                      <p className="text-gray-500 text-xs">{order.createdAt.toLocaleDateString("en-PK")}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white">{order.fullName}</p>
                      <p className="text-gray-500 text-xs">{order.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{order.city}</td>
                    <td className="px-4 py-3 text-gray-300">
                      <span className="inline-flex items-center gap-1.5">
                        {order.items.length}
                        {order.items.some((i) => i.designId || i.designPreviewUrl) && (
                          <span title="Includes custom design"><Sparkles size={12} className="text-[#D4AF37]" /></span>
                        )}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-[#D4AF37] font-bold">{formatPKR(order.grandTotal)}</td>
                    <td className="px-4 py-3">
                      <p className="text-gray-300">{order.paymentMethod}</p>
                      {order.paymentReference && <p className="text-gray-500 text-xs">Ref: {order.paymentReference}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <PaymentStatusSelect orderId={order.id} status={order.paymentStatus} />
                    </td>
                    <td className="px-4 py-3">
                      <OrderStatusSelect orderId={order.id} status={order.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link href={`/admin/orders/${order.id}`} className="p-1.5 text-gray-400 hover:text-[#D4AF37] rounded-lg hover:bg-white/5 text-xs">
                          View
                        </Link>
                        <DeleteOrderButton orderId={order.id} orderNumber={order.orderNumber} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
