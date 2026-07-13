"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingBag, ArrowLeft } from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/admin/products", label: "Products", icon: Package },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
      <div className="px-5 py-4 border-b border-[#1a1a1a]">
        <p className="text-white font-semibold text-sm">Admin Panel</p>
        <p className="text-gray-500 text-xs">Zumrah Apparel</p>
      </div>
      {navItems.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-5 py-3.5 border-b border-[#1a1a1a] transition-all ${isActive ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
          >
            <Icon size={16} />
            <span className="text-sm font-medium">{label}</span>
          </Link>
        );
      })}
      <Link href="/account" className="flex items-center gap-3 px-5 py-3.5 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm">
        <ArrowLeft size={16} /> Back to Account
      </Link>
    </div>
  );
}
