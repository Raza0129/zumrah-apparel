import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/shipping";

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    include: {
      orders: { orderBy: { createdAt: "desc" }, include: { items: true } },
    },
  });
  if (!user) notFound();

  const totalSpent = user.orders.reduce((sum, o) => sum + o.grandTotal, 0);

  return (
    <div>
      <Link href="/admin/users" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#D4AF37] text-sm mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Users
      </Link>

      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-white text-2xl font-bold font-sans">{user.name}</h1>
            <p className="text-gray-500 text-sm">{user.email}{user.phone ? ` · ${user.phone}` : ""}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`px-2.5 py-1 rounded-full text-xs ${user.role === "ADMIN" ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "bg-gray-500/10 text-gray-400"}`}>
              {user.role}
            </span>
            <span className={`px-2.5 py-1 rounded-full text-xs ${user.blocked ? "bg-red-500/10 text-red-400" : "bg-emerald-500/10 text-emerald-400"}`}>
              {user.blocked ? "Blocked" : "Active"}
            </span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div>
            <p className="text-gray-500 text-xs">Joined</p>
            <p className="text-white text-sm font-medium">{user.createdAt.toLocaleDateString("en-PK")}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Total Orders</p>
            <p className="text-white text-sm font-medium">{user.orders.length}</p>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Total Spent</p>
            <p className="text-[#D4AF37] text-sm font-bold">{formatPKR(totalSpent)}</p>
          </div>
        </div>
      </div>

      <h2 className="text-white font-bold mb-4">Order History</h2>
      {user.orders.length === 0 ? (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-10 text-center">
          <p className="text-gray-500">This customer hasn&apos;t placed any orders yet.</p>
        </div>
      ) : (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e1e] text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">Order</th>
                  <th className="px-4 py-3 font-medium">Items</th>
                  <th className="px-4 py-3 font-medium">Total</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {user.orders.map((order) => (
                  <tr key={order.id} className="border-b border-[#1a1a1a] last:border-0">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium">{order.orderNumber}</p>
                      <p className="text-gray-500 text-xs">{order.createdAt.toLocaleDateString("en-PK")}</p>
                    </td>
                    <td className="px-4 py-3 text-gray-300">{order.items.length}</td>
                    <td className="px-4 py-3 text-[#D4AF37] font-bold">{formatPKR(order.grandTotal)}</td>
                    <td className="px-4 py-3 text-gray-300">{order.paymentMethod}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded-full text-xs bg-white/5 text-gray-300">{order.status}</span>
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
