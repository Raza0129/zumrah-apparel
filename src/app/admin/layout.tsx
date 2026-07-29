import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    return <AdminLoginForm />;
  }
  if (session.user.role !== "ADMIN") {
    redirect("/account");
  }

  return (
    <div className="h-screen flex bg-[#0a0a0a] overflow-hidden">
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <AdminSidebar />
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <AdminHeader name={session.user.name ?? "Admin"} email={session.user.email ?? ""} />
        <main className="flex-1 overflow-y-auto px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
