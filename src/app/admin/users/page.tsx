import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UsersClient } from "@/components/admin/UsersClient";

export default async function AdminUsersPage() {
  const session = await auth();
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { orders: true } } },
  });

  return (
    <UsersClient
      currentUserId={session!.user.id}
      users={users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        blocked: u.blocked,
        createdAt: u.createdAt,
        ordersCount: u._count.orders,
      }))}
    />
  );
}
