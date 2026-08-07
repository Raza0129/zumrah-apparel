"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { ShieldCheck, Menu, ChevronDown, LogOut } from "lucide-react";

const PAGE_TITLES: { prefix: string; title: string }[] = [
  { prefix: "/admin/users/", title: "Customer Profile" },
  { prefix: "/admin/users", title: "Users" },
  { prefix: "/admin/orders", title: "Orders" },
  { prefix: "/admin/products", title: "Products" },
  { prefix: "/admin/categories", title: "Categories" },
  { prefix: "/admin/blog", title: "Blog" },
  { prefix: "/admin/payments", title: "Payment Methods" },
  { prefix: "/admin", title: "Dashboard" },
];

function getTitle(pathname: string): string {
  const match = PAGE_TITLES.find((p) => pathname === p.prefix || pathname.startsWith(p.prefix));
  return match?.title ?? "Dashboard";
}

export function AdminHeader({ name, email, onMenuClick }: { name: string; email: string; onMenuClick?: () => void }) {
  const pathname = usePathname();
  const title = getTitle(pathname);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur flex-shrink-0 gap-3">
      <div className="flex items-center gap-3 min-w-0">
        {onMenuClick && (
          <button onClick={onMenuClick} className="lg:hidden text-gray-400 hover:text-white p-1.5 -ml-1.5 flex-shrink-0">
            <Menu size={20} />
          </button>
        )}
        <div className="min-w-0">
          <p className="text-gray-500 text-[11px] uppercase tracking-wider leading-tight">Admin Console</p>
          <h1 className="text-white font-bold text-lg leading-tight truncate">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-semibold">
          <ShieldCheck size={12} /> ADMIN
        </span>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 p-1 pr-1.5 rounded-lg hover:bg-white/5 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-black flex items-center justify-center text-sm font-bold flex-shrink-0">
              {name[0]?.toUpperCase() ?? "A"}
            </div>
            <div className="hidden md:block min-w-0 text-left">
              <p className="text-white text-sm font-medium leading-tight truncate max-w-[160px]">{name}</p>
              <p className="text-gray-500 text-xs leading-tight truncate max-w-[160px]">{email}</p>
            </div>
            <ChevronDown size={14} className={`text-gray-500 transition-transform hidden md:block ${menuOpen ? "rotate-180" : ""}`} />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[#111] border border-[#282828] rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-[#1e1e1e]">
                <p className="text-white text-sm font-semibold truncate">{name}</p>
                <p className="text-gray-500 text-xs truncate">{email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="flex items-center gap-3 w-full px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-sm"
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
