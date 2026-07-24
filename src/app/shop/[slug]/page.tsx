import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { toProductCard, toProductDetail } from "@/lib/serialize";
import { ProductDetailClient } from "@/components/shop/ProductDetailClient";
import { buildMetaTitle, buildMetaDescription } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || product.hidden) return {};

  const title = buildMetaTitle(product.metaTitle, product.name);
  const description = buildMetaDescription(product.metaDescription, product.description);
  const image = product.images[0];

  return {
    title,
    description,
    alternates: { canonical: `/shop/${product.slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.sku,
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: product.salePrice ?? product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
    ...(product.reviewCount > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient
        product={toProductDetail(product, reviews)}
        relatedProducts={related.map(toProductCard)}
      />
    </>
  );
}
