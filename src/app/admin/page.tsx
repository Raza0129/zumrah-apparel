import Link from "next/link";
import { Package, DollarSign, Users, Clock, CheckCircle, TrendingUp } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/shipping";
import { OrdersTrendChart, type TrendPoint } from "@/components/admin/OrdersTrendChart";

const TREND_DAYS = 30;

export default async function AdminDashboardPage() {
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const trendStart = new Date(startOfToday);
  trendStart.setDate(trendStart.getDate() - (TREND_DAYS - 1));

  const [
    todaysOrders,
    monthlyOrders,
    totalCustomers,
    pendingOrders,
    deliveredOrders,
    topProducts,
    trendOrders,
    recentOrders,
  ] = await Promise.all([
    prisma.order.count({ where: { createdAt: { gte: startOfToday } } }),
    prisma.order.findMany({ where: { createdAt: { gte: startOfMonth } }, select: { grandTotal: true } }),
    prisma.user.count({ where: { role: "CUSTOMER" } }),
    prisma.order.count({ where: { status: "PENDING" } }),
    prisma.order.count({ where: { status: "DELIVERED" } }),
    prisma.product.findMany({ orderBy: { reviewCount: "desc" }, take: 5 }),
    prisma.order.findMany({
      where: { createdAt: { gte: trendStart } },
      select: { createdAt: true, grandTotal: true },
    }),
    prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: { user: { select: { id: true, name: true } } },
    }),
  ]);

  const monthlyRevenue = monthlyOrders.reduce((sum, o) => sum + o.grandTotal, 0);

  const trendBuckets = new Map<string, TrendPoint>();
  for (let i = 0; i < TREND_DAYS; i++) {
    const d = new Date(trendStart);
    d.setDate(d.getDate() + i);
    const key = d.toISOString().slice(0, 10);
    trendBuckets.set(key, { date: d.toLocaleDateString("en-PK", { month: "short", day: "numeric" }), orders: 0, revenue: 0 });
  }
  for (const order of trendOrders) {
    const key = order.createdAt.toISOString().slice(0, 10);
    const bucket = trendBuckets.get(key);
    if (bucket) {
      bucket.orders += 1;
      bucket.revenue += order.grandTotal;
    }
  }
  const trendData = Array.from(trendBuckets.values());
  const firstHalf = trendData.slice(0, Math.floor(TREND_DAYS / 2)).reduce((s, p) => s + p.orders, 0);
  const secondHalf = trendData.slice(Math.floor(TREND_DAYS / 2)).reduce((s, p) => s + p.orders, 0);
  const trendDirection = secondHalf > firstHalf ? "up" : secondHalf < firstHalf ? "down" : "flat";

  const stats = [
    { label: "Today's Orders", value: todaysOrders, icon: Package, color: "text-[#D4AF37]", href: "/admin/orders" },
    { label: "Monthly Revenue", value: formatPKR(monthlyRevenue), icon: DollarSign, color: "text-emerald-400", href: "/admin/orders" },
    { label: "Total Customers", value: totalCustomers, icon: Users, color: "text-blue-400", href: "/admin/users" },
    { label: "Pending Orders", value: pendingOrders, icon: Clock, color: "text-yellow-400", href: "/admin/orders" },
    { label: "Delivered Orders", value: deliveredOrders, icon: CheckCircle, color: "text-emerald-400", href: "/admin/orders" },
  ];

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6 font-sans">Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color, href }) => (
          <Link key={label} href={href} className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 hover:border-[#D4AF37]/40 transition-colors">
            <Icon size={22} className={`${color} mb-3`} />
            <p className={`${color} text-2xl font-bold`}>{value}</p>
            <p className="text-gray-500 text-sm mt-1">{label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold flex items-center gap-2">
            <TrendingUp size={18} className="text-[#D4AF37]" /> Orders &amp; Revenue — Last {TREND_DAYS} Days
          </h2>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium ${
              trendDirection === "up"
                ? "bg-emerald-500/10 text-emerald-400"
                : trendDirection === "down"
                ? "bg-red-500/10 text-red-400"
                : "bg-gray-500/10 text-gray-400"
            }`}
          >
            {trendDirection === "up" ? "Trending up" : trendDirection === "down" ? "Trending down" : "Flat"}
          </span>
        </div>
        <OrdersTrendChart data={trendData} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
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

        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6">
          <h2 className="text-white font-bold mb-4 flex items-center gap-2">
            <Package size={18} className="text-[#D4AF37]" /> Recent Orders
          </h2>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-gray-500 text-sm">No orders yet.</p>
            ) : (
              recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 bg-[#0d0d0d] rounded-xl border border-[#1a1a1a]">
                  <div>
                    <p className="text-white text-sm font-medium">{order.orderNumber}</p>
                    {order.user ? (
                      <Link href={`/admin/users/${order.user.id}`} className="text-gray-500 text-xs hover:text-[#D4AF37] transition-colors">
                        {order.user.name}
                      </Link>
                    ) : (
                      <p className="text-gray-500 text-xs">{order.fullName} (guest)</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-[#D4AF37] font-bold text-sm block">{formatPKR(order.grandTotal)}</span>
                    <span className="text-gray-500 text-xs">{order.status}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
