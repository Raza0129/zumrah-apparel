import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { AddressList } from "@/components/account/AddressList";

export default async function AccountAddressesPage() {
  const session = await auth();
  const addresses = await prisma.address.findMany({
    where: { userId: session!.user.id },
    orderBy: { createdAt: "desc" },
  });

  return <AddressList addresses={addresses} />;
}
