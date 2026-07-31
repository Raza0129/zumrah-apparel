"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Shirt, LayoutDashboard, Package, ShoppingBag, Users, Newspaper, Wallet, FolderTree } from "lucide-react";

const navGroups = [
  {
    label: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    label: "People",
    items: [{ href: "/admin/users", label: "Users", icon: Users }],
  },
  {
    label: "Commerce",
    items: [
      { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
      { href: "/admin/products", label: "Products", icon: Package },
      { href: "/admin/categories", label: "Categories", icon: FolderTree },
    ],
  },
  {
    label: "Content",
    items: [{ href: "/admin/blog", label: "Blog", icon: Newspaper }],
  },
  {
    label: "Settings",
    items: [{ href: "/admin/payments", label: "Payments", icon: Wallet }],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] border-r border-[#1a1a1a]">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-[#1a1a1a] flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8960C] rounded-lg flex items-center justify-center flex-shrink-0">
          <Shirt size={16} className="text-black" />
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm leading-tight truncate">Zumrah Apparel</p>
          <p className="text-gray-500 text-[11px] leading-tight">Admin Console</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-gray-600">{group.label}</p>
            <div className="space-y-0.5">
              {group.items.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href || (href !== "/admin" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon size={16} />
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}
