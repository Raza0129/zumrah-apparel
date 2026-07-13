import { prisma } from "@/lib/prisma";
import { ProductsClient } from "@/components/admin/ProductsClient";
import type { ProductColor } from "@/lib/types";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <ProductsClient
      products={products.map((p) => ({
        ...p,
        colors: p.colors as unknown as ProductColor[],
      }))}
    />
  );
}
