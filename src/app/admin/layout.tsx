import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";
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
    <AdminShell name={session.user.name ?? "Admin"} email={session.user.email ?? ""}>
      {children}
    </AdminShell>
  );
}
