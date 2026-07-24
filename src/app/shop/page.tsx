import { Suspense } from "react";
import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { toProductCard } from "@/lib/serialize";
import { ShopClient } from "@/components/shop/ShopClient";

export const metadata: Metadata = {
  title: "Shop Premium Custom Apparel | Zumrah Apparel",
  description: "Browse DTF and sublimation printed t-shirts, hoodies, jerseys and polos. Premium custom apparel with fast delivery across Pakistan.",
  alternates: { canonical: "/shop" },
};

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
