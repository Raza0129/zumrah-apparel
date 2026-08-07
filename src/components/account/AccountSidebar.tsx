"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { User, Package, Heart, MapPin, LogOut, ChevronRight, CheckCircle } from "lucide-react";

const navItems = [
  { id: "", label: "Overview", icon: User },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
];

export function AccountSidebar({ name, email }: { name: string; email: string }) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile / tablet: compact header + horizontal scrollable nav */}
      <div className="lg:hidden mb-6">
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4 mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">
              {name[0] ?? "U"}
            </div>
            <div className="min-w-0">
              <p className="text-white font-semibold text-sm truncate">{name}</p>
              <p className="text-gray-500 text-xs truncate">{email}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg flex-shrink-0"
            title="Logout"
          >
            <LogOut size={18} />
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {navItems.map(({ id, label, icon: Icon }) => {
            const href = `/account/${id}`;
            const isActive = pathname === href || (id === "" && pathname === "/account");
            return (
              <Link
                key={id}
                href={href}
                className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap flex-shrink-0 transition-all ${
                  isActive ? "bg-[#D4AF37] text-black" : "bg-[#111] border border-[#1e1e1e] text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={14} /> {label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop: vertical sidebar */}
      <div className="hidden lg:block">
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
            <CheckCircle size={12} /> Verified Account
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
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-3 w-full px-5 py-3.5 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>
    </>
  );
}
