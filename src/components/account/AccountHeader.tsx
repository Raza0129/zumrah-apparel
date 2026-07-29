"use client";

import { usePathname } from "next/navigation";
import { CheckCircle } from "lucide-react";

const PAGE_TITLES: { prefix: string; title: string }[] = [
  { prefix: "/account/orders", title: "My Orders" },
  { prefix: "/account/wishlist", title: "Wishlist" },
  { prefix: "/account/addresses", title: "Addresses" },
  { prefix: "/account", title: "Overview" },
];

function getTitle(pathname: string): string {
  const match = PAGE_TITLES.find((p) => pathname === p.prefix || pathname.startsWith(p.prefix));
  return match?.title ?? "Overview";
}

export function AccountHeader({ name, email }: { name: string; email: string }) {
  const pathname = usePathname();
  const title = getTitle(pathname);

  return (
    <header className="flex items-center justify-between h-16 px-6 border-b border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur flex-shrink-0">
      <div>
        <p className="text-gray-500 text-[11px] uppercase tracking-wider leading-tight">My Account</p>
        <h1 className="text-white font-bold text-lg leading-tight">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold">
          <CheckCircle size={12} /> Verified
        </span>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-sm font-bold flex-shrink-0">
            {name[0]?.toUpperCase() ?? "U"}
          </div>
          <div className="hidden md:block min-w-0">
            <p className="text-white text-sm font-medium leading-tight truncate max-w-[160px]">{name}</p>
            <p className="text-gray-500 text-xs leading-tight truncate max-w-[160px]">{email}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
