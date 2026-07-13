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

export interface ReviewData {
  id: string;
  author: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: string;
}

export interface ProductDetailData extends ProductCardData {
  sku: string;
  description: string;
  material: string;
  features: string[];
  reviews: ReviewData[];
}
