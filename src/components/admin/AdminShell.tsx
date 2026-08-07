"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";

export function AdminShell({
  name,
  email,
  children,
}: {
  name: string;
  email: string;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="h-screen flex bg-[#0a0a0a] overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[80vw] transition-transform duration-300 lg:static lg:z-auto lg:w-64 lg:max-w-none lg:flex-shrink-0 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <AdminSidebar name={name} email={email} onClose={() => setSidebarOpen(false)} />
      </aside>

      <div className="flex-1 min-w-0 flex flex-col">
        <AdminHeader name={name} email={email} onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
