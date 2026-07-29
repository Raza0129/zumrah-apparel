import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AccountSidebar } from "@/components/account/AccountSidebar";
import { AccountHeader } from "@/components/account/AccountHeader";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="h-screen flex bg-[#0a0a0a] overflow-hidden">
      <aside className="hidden lg:block w-64 flex-shrink-0">
        <AccountSidebar />
      </aside>
      <div className="flex-1 min-w-0 flex flex-col">
        <AccountHeader name={session.user.name ?? "Customer"} email={session.user.email ?? ""} />
        <main className="flex-1 overflow-y-auto px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
