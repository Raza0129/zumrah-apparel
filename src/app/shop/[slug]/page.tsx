import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toProductCard, toProductDetail } from "@/lib/serialize";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || product.hidden) {
    notFound();
  }

  const [reviews, related] = await Promise.all([
    prisma.review.findMany({ where: { productId: product.id }, orderBy: { createdAt: "desc" } }),
    prisma.product.findMany({
      where: { printingMethod: product.printingMethod, id: { not: product.id }, hidden: false },
      take: 4,
    }),
  ]);

  return (
    <ProductDetailClient
      product={toProductDetail(product, reviews)}
      relatedProducts={related.map(toProductCard)}
    />
  );
}
