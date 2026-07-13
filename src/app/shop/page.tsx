import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import { toProductCard } from "@/lib/serialize";
import { ShopClient } from "@/components/shop/ShopClient";

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { hidden: false },
    orderBy: { createdAt: "asc" },
  });

  return (
    <Suspense>
      <ShopClient products={products.map(toProductCard)} />
    </Suspense>
  );
}
