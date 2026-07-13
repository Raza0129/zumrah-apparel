"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { User, Package, Heart, MapPin, LogOut, ChevronRight, LayoutDashboard, CheckCircle } from "lucide-react";

const navItems = [
  { id: "", label: "Overview", icon: User },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
];

export function AccountSidebar({ name, email, role }: { name: string; email: string; role: string }) {
  const pathname = usePathname();

  return (
    <>
      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-14 h-14 bg-[#D4AF37] rounded-full flex items-center justify-center text-black text-xl font-bold">
            {name[0] ?? "U"}
          </div>
          <div>
            <p className="text-white font-semibold">{name}</p>
            <p className="text-gray-500 text-xs">{email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <CheckCircle size={12} /> {role === "ADMIN" ? "Admin Account" : "Verified Account"}
        </div>
      </div>

      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        {navItems.map(({ id, label, icon: Icon }) => {
          const href = `/account/${id}`;
          const isActive = pathname === href || (id === "" && pathname === "/account");
          return (
            <Link
              key={id}
              href={href}
              className={`flex items-center justify-between px-5 py-3.5 border-b border-[#1a1a1a] last:border-0 transition-all ${isActive ? "bg-[#D4AF37]/10 text-[#D4AF37]" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
            >
              <div className="flex items-center gap-3">
                <Icon size={16} />
                <span className="text-sm font-medium">{label}</span>
              </div>
              <ChevronRight size={14} />
            </Link>
          );
        })}
        {role === "ADMIN" && (
          <Link href="/admin" className="flex items-center gap-3 px-5 py-3.5 text-gray-400 hover:text-white hover:bg-white/5 transition-all text-sm border-b border-[#1a1a1a]">
            <LayoutDashboard size={16} /> Admin Panel
          </Link>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-5 py-3.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </>
  );
}
