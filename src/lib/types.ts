export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductCardData {
  id: string;
  slug: string;
  name: string;
  price: number;
  salePrice: number | null;
  images: string[];
  printingMethod: "DTF" | "SUBLIMATION";
  colors: ProductColor[];
  sizes: string[];
  badge: "NEW" | "BESTSELLER" | "SALE" | null;
  rating: number;
  reviewCount: number;
  isCustomizable: boolean;
  inStock: boolean;
}
