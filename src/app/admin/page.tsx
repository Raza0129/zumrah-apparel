import { Package, DollarSign, Users, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/shipping";

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [
    todaysOrders,
    monthlyOrders,
    totalCustomers,
    pendingOrders,
    deliveredOrders,
    topProducts,
  ] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.order.findMany({ where: { createdAt: { gte: startOfMonth } }, select: { grandTotal: true } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.product.findMany({ orderBy: { reviewCount: "desc" }, take: 5 }),
  ]);

  const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + o.grandTotal, 0);

  const stats = [
    { label: "Today's Orders", value: todaysOrders, icon: Package, color: "text-[#D4AF37]" },
    { label: "Monthly Revenue", value: formatPKR(monthlyRevenue), icon: DollarSign, color: "text-emerald-400" },
    { label: "Total Customers", value: totalCustomers, icon: Users, color: "text-blue-400" },
    { label: "Pending Orders", value: pendingOrders, icon: Clock, color: "text-yellow-400" },
    { label: "Delivered Orders", value: deliveredOrders, icon: CheckCircle, color: "text-emerald-400" },
  ];

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6 font-sans">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
            <Icon size={22} className={`${color} mb-3`} />
            <p className={`${color} text-2xl font-bold`}>{value}</p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6">
        <h2 className="text-white font-bold mb-4 flex items-center gap-2">
          <TrendingUp size={18} className="text-[#D4AF37]" /> Popular Products
        </h2>
        <div className="space-y-3">
          {topProducts.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-3 bg-[#0d0d0d] rounded-xl border border-[#1a1a1a]">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="text-white text-sm font-medium">{p.name}</p>
                  <p className="text-gray-500 text-xs">{p.reviewCount} reviews · {p.rating}★</p>
                </div>
              </div>
              <span className="text-[#D4AF37] font-bold text-sm">{formatPKR(p.salePrice ?? p.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
