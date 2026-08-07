import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AccountSidebar } from "@/components/account/AccountSidebar";

export default async function AccountLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }
  if (session.user.role === "ADMIN") {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 lg:flex-shrink-0">
            <AccountSidebar name={session.user.name ?? ""} email={session.user.email ?? ""} />
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
