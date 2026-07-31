import { prisma } from "@/lib/prisma";
import { CategoriesClient } from "@/components/admin/CategoriesClient";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <CategoriesClient
      categories={categories.map((c) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
        productCount: c._count.products,
      }))}
    />
  );
}
