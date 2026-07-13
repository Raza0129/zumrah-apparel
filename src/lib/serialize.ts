import type { Product, Review } from "@/generated/prisma/client";
import type { ProductCardData, ProductColor, ProductDetailData } from "@/lib/types";

export function toProductCard(product: Product): ProductCardData {
  return {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: product.price,
    salePrice: product.salePrice ?? null,
    images: product.images,
    printingMethod: product.printingMethod,
    colors: (product.colors as unknown as ProductColor[]) ?? [],
    sizes: product.sizes,
    badge: product.badge ?? null,
    rating: product.rating,
    reviewCount: product.reviewCount,
    isCustomizable: product.isCustomizable,
    inStock: product.inStock,
  };
}

export function toProductDetail(
  product: Product,
  reviews: Review[]
): ProductDetailData {
  return {
    ...toProductCard(product),
    sku: product.sku,
    description: product.description,
    material: product.material,
    features: product.features,
    reviews: reviews.map((r) => ({
      id: r.id,
      author: r.author,
      rating: r.rating,
      comment: r.comment,
      verified: r.verified,
      createdAt: r.createdAt.toISOString(),
    })),
  };
}
