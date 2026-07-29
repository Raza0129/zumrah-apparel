"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Shirt, User, Package, Heart, MapPin, LogOut } from "lucide-react";

const navItems = [
  { id: "", label: "Overview", icon: User },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
];

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-[#0d0d0d] border-r border-[#1a1a1a]">
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-[#1a1a1a] flex-shrink-0">
        <div className="w-8 h-8 bg-gradient-to-br from-[#D4AF37] to-[#B8960C] rounded-lg flex items-center justify-center flex-shrink-0">
          <Shirt size={16} className="text-black" />
        </div>
        <div className="min-w-0">
          <p className="text-white font-semibold text-sm leading-tight truncate">Zumrah Apparel</p>
          <p className="text-gray-500 text-[11px] leading-tight">My Account</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-0.5">
        {navItems.map(({ id, label, icon: Icon }) => {
          const href = `/account/${id}`;
          const isActive = pathname === href || (id === "" && pathname === "/account");
          return (
            <Link
              key={id}
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
      </nav>

      <div className="p-3 border-t border-[#1a1a1a]">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </div>
  );
}
