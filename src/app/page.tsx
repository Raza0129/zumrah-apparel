import { prisma } from "@/lib/prisma";
import { toProductCard } from "@/lib/serialize";
import { LandingClient } from "@/components/landing/LandingClient";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { hidden: false },
    orderBy: { createdAt: "asc" },
    take: 8,
  });

  return <LandingClient products={products.map(toProductCard)} />;
}
