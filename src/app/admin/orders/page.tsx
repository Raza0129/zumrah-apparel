import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/shipping";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6 font-sans">Orders ({orders.length})</h1>

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
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-[#1a1a1a] last:border-0">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">{order.orderNumber}</p>
                      <p className="text-gray-500 text-xs">{order.createdAt.toLocaleDateString("en-PK")}</p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-white">{order.fullName}</p>
                      <p className="text-gray-500 text-xs">{order.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{order.city}</td>
                    <td className="px-4 py-3 text-gray-300">{order.items.length}</td>
                    <td className="px-4 py-3 text-[#D4AF37] font-bold">{formatPKR(order.grandTotal)}</td>
                    <td className="px-4 py-3 text-gray-300">{order.paymentMethod}</td>
                    <td className="px-4 py-3">
                      <OrderStatusSelect orderId={order.id} status={order.status} />
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
