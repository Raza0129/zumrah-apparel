import type { Product } from "@/generated/prisma/client";
import type { ProductCardData, ProductColor } from "@/lib/types";

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
