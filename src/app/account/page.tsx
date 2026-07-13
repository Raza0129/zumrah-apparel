import { Package, Heart, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/shipping";

export default async function AccountOverviewPage() {
  const session = await auth();
  const userId = session!.user.id;

  const [orderCount, wishlistCount, recentOrders] = await Promise.all([
    prisma.order.count({ where: { userId } }),
    prisma.wishlist.count({ where: { userId } }),
    prisma.order.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6 font-sans">
        Welcome back, {session!.user.name?.split(" ")[0]}!
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Total Orders", value: orderCount, icon: Package, color: "text-[#D4AF37]" },
          { label: "Wishlist Items", value: wishlistCount, icon: Heart, color: "text-red-400" },
          { label: "Saved Addresses", value: "—", icon: MapPin, color: "text-purple-400" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
            <Icon size={22} className={`${color} mb-3`} />
            <p className={`${color} text-2xl font-bold`}>{value}</p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold">Recent Orders</h2>
          <Link href="/account/orders" className="text-[#D4AF37] text-sm flex items-center gap-1">
            View All <ChevronRight size={14} />
          </Link>
        </div>
        {recentOrders.length === 0 ? (
          <p className="text-gray-500 text-sm py-6 text-center">No orders yet.</p>
        ) : (
          <div className="space-y-3">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 bg-[#0d0d0d] rounded-xl border border-[#1a1a1a]">
                <div>
                  <p className="text-white text-sm font-medium">{order.orderNumber}</p>
                  <p className="text-gray-500 text-xs mt-0.5">{order.createdAt.toLocaleDateString("en-PK")}</p>
                </div>
                <span className="text-[#D4AF37] font-bold text-sm">{formatPKR(order.grandTotal)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
