import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toProductDetail } from "@/lib/serialize";
import { DesignerClient } from "@/components/designer/DesignerClient";

export default async function DesignerProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || product.hidden) {
    notFound();
  }

  const reviews = await prisma.review.findMany({
    where: { productId: product.id },
    orderBy: { createdAt: "desc" },
  });

  return <DesignerClient product={toProductDetail(product, reviews)} />;
}
