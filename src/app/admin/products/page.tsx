import { prisma } from "@/lib/prisma";
import { ProductsClient } from "@/components/admin/ProductsClient";
import type { ProductColor } from "@/lib/types";

export default async function AdminProductsPage() {
  const [products, categories] = await Promise.all([
    prisma.product.findMany({ orderBy: { createdAt: "desc" }, include: { category: true } }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <ProductsClient
      products={products.map((p) => ({
        ...p,
        colors: p.colors as unknown as ProductColor[],
      }))}
      categories={categories.map((c) => ({ id: c.id, name: c.name }))}
    />
  );
}
