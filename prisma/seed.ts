import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL });
const prisma = new PrismaClient({ adapter });

const PRODUCTS = [
  {
    name: "Classic White DTF Premium Tee",
    slug: "classic-white-dtf-premium-tee",
    sku: "ZA-DTF-001",
    price: 1499,
    salePrice: null,
    images: [
      "https://images.unsplash.com/photo-1651761179569-4ba2aa054997?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    printingMethod: "DTF" as const,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1C1C1E" },
      { name: "Navy Blue", hex: "#1B2A4A" },
      { name: "Red", hex: "#C62828" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    badge: "BESTSELLER" as const,
    rating: 4.8,
    reviewCount: 124,
    description:
      "Premium 100% combed cotton T-shirt with vibrant DTF print technology. Perfect for daily wear, corporate events, and custom branding.",
    material: "100% Combed Cotton",
    features: ["DTF Printing Technology", "Vibrant Colors", "Wash Resistant", "Soft & Breathable", "Pre-shrunk Fabric"],
    tags: ["dtf", "cotton", "premium", "bestseller"],
  },
  {
    name: "Sublimation Sports Jersey",
    slug: "sublimation-sports-jersey",
    sku: "ZA-SUB-002",
    price: 2499,
    salePrice: 1999,
    images: [
      "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    printingMethod: "SUBLIMATION" as const,
    colors: [
      { name: "Navy Blue", hex: "#1B2A4A" },
      { name: "Red", hex: "#C62828" },
      { name: "Royal Blue", hex: "#1565C0" },
      { name: "Forest Green", hex: "#1B5E20" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    badge: "SALE" as const,
    rating: 4.9,
    reviewCount: 89,
    description:
      "High-performance sublimation printed sports jersey. Full-color, all-over print. Ideal for sports teams, schools, and tournaments.",
    material: "100% Polyester Dry-Fit",
    features: ["All-Over Sublimation Print", "Moisture Wicking", "Lightweight & Breathable", "Color-fast Technology", "Double-stitched Seams"],
    tags: ["sublimation", "sports", "jersey", "all-over"],
  },
  {
    name: "Premium Black Graphic Tee",
    slug: "premium-black-graphic-tee",
    sku: "ZA-DTF-003",
    price: 1799,
    salePrice: null,
    images: ["https://images.unsplash.com/photo-1579863943703-2a963fb7a794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
    printingMethod: "DTF" as const,
    colors: [
      { name: "Black", hex: "#1C1C1E" },
      { name: "Charcoal", hex: "#37474F" },
      { name: "Navy Blue", hex: "#1B2A4A" },
      { name: "Maroon", hex: "#880E4F" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    badge: "NEW" as const,
    rating: 4.7,
    reviewCount: 67,
    description:
      "Luxury heavyweight black tee with precision DTF printing. 220 GSM premium fabric for maximum comfort and durability.",
    material: "220 GSM Cotton Blend",
    features: ["DTF Printing", "Heavyweight 220 GSM", "Reinforced Collar", "Premium Finish"],
    tags: ["dtf", "black", "premium", "heavyweight"],
  },
  {
    name: "Corporate Polo DTF Edition",
    slug: "corporate-polo-dtf-edition",
    sku: "ZA-DTF-004",
    price: 2299,
    salePrice: null,
    images: ["https://images.unsplash.com/photo-1562157873-818bc0726f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
    printingMethod: "DTF" as const,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy Blue", hex: "#1B2A4A" },
      { name: "Black", hex: "#1C1C1E" },
      { name: "Royal Blue", hex: "#1565C0" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    badge: null,
    rating: 4.6,
    reviewCount: 43,
    description: "Professional polo shirt with DTF printed logo. Perfect for corporate uniforms, brand merchandise, and team wear.",
    material: "Pique Cotton Blend",
    features: ["DTF Logo Print", "3-Button Placket", "Corporate Grade", "Logo Ready"],
    tags: ["dtf", "polo", "corporate", "uniform"],
  },
  {
    name: "Oversized Sublimation Hoodie",
    slug: "oversized-sublimation-hoodie",
    sku: "ZA-SUB-005",
    price: 3999,
    salePrice: null,
    images: [
      "https://images.unsplash.com/photo-1614214191247-5b2d3a734f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1652823780977-b22c0ed84c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    printingMethod: "SUBLIMATION" as const,
    colors: [
      { name: "Black", hex: "#1C1C1E" },
      { name: "Charcoal", hex: "#37474F" },
      { name: "Navy Blue", hex: "#1B2A4A" },
      { name: "Purple", hex: "#6A1B9A" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    badge: "BESTSELLER" as const,
    rating: 4.9,
    reviewCount: 156,
    description: "Premium oversized hoodie with all-over sublimation print. Maximum comfort meets streetwear aesthetics.",
    material: "Fleece Polyester Blend",
    features: ["All-Over Sublimation", "Oversized Fit", "Kangaroo Pocket", "Drawstring Hood", "Ribbed Cuffs"],
    tags: ["sublimation", "hoodie", "oversized", "streetwear"],
  },
  {
    name: "University Team Jersey Pack",
    slug: "university-team-jersey-pack",
    sku: "ZA-SUB-006",
    price: 1999,
    salePrice: null,
    images: ["https://images.unsplash.com/photo-1652823780977-b22c0ed84c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
    printingMethod: "SUBLIMATION" as const,
    colors: [
      { name: "Red", hex: "#C62828" },
      { name: "Royal Blue", hex: "#1565C0" },
      { name: "Forest Green", hex: "#1B5E20" },
      { name: "Yellow", hex: "#F9A825" },
    ],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    badge: "BESTSELLER" as const,
    rating: 4.8,
    reviewCount: 231,
    description: "Custom university sports jersey with sublimation printing. Number, name, and logo included in the price.",
    material: "100% Polyester Performance",
    features: ["Player Name & Number", "Sublimation Print", "Team Logo Ready", "Breathable Mesh", "Minimum 10 pieces"],
    tags: ["sublimation", "jersey", "university", "sports", "team"],
  },
  {
    name: "DTF Streetwear Cargo Tee",
    slug: "dtf-streetwear-cargo-tee",
    sku: "ZA-DTF-007",
    price: 1699,
    salePrice: 1299,
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
    printingMethod: "DTF" as const,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Olive", hex: "#558B2F" },
      { name: "Beige", hex: "#D7CCC8" },
      { name: "Charcoal", hex: "#37474F" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL"],
    badge: "SALE" as const,
    rating: 4.5,
    reviewCount: 38,
    description: "Trendy streetwear-inspired tee with DTF printed graphics. Drop shoulders, boxy fit for the modern look.",
    material: "180 GSM Ringspun Cotton",
    features: ["DTF Printing", "Drop Shoulder Fit", "Boxy Silhouette", "Streetwear Style"],
    tags: ["dtf", "streetwear", "boxy", "cargo"],
  },
  {
    name: "Premium Sublimation Polo",
    slug: "premium-sublimation-polo",
    sku: "ZA-SUB-008",
    price: 2799,
    salePrice: null,
    images: ["https://images.unsplash.com/photo-1600269453258-30a2e10c72f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800"],
    printingMethod: "SUBLIMATION" as const,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy Blue", hex: "#1B2A4A" },
      { name: "Red", hex: "#C62828" },
      { name: "Sky Blue", hex: "#0288D1" },
    ],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    badge: "NEW" as const,
    rating: 4.7,
    reviewCount: 52,
    description: "Premium all-over sublimation polo with moisture-wicking technology. Ideal for golf, corporate events, and brand merchandise.",
    material: "Moisture-Wick Polyester",
    features: ["All-Over Sublimation", "Moisture Wicking", "UV Protection", "Premium Collar", "Corporate Ready"],
    tags: ["sublimation", "polo", "premium", "corporate", "golf"],
  },
];

const REVIEWS = [
  { productSlug: "classic-white-dtf-premium-tee", author: "Ahmed Hassan", rating: 5, comment: "Absolutely amazing quality! The DTF print is crystal clear and the fabric feels premium. Ordered 50 pieces for our company event and everyone loved them. Will definitely order again." },
  { productSlug: "classic-white-dtf-premium-tee", author: "Fatima Malik", rating: 5, comment: "Best custom t-shirts in Pakistan! The colors are vibrant and they haven't faded after multiple washes. Zumrah Apparel is truly premium quality." },
  { productSlug: "classic-white-dtf-premium-tee", author: "Usman Tariq", rating: 4, comment: "Great product overall. Delivery was a bit slow but the quality made up for it. The print is sharp and the shirt fits perfectly." },
  { productSlug: "oversized-sublimation-hoodie", author: "Sara Qureshi", rating: 5, comment: "The oversized hoodie is INCREDIBLE. All-over print is exactly like my design. Premium quality and super comfortable. Worth every rupee!" },
];

async function main() {
  const dtf = await prisma.category.upsert({
    where: { slug: "dtf-printing" },
    update: {},
    create: { name: "DTF Printing", slug: "dtf-printing" },
  });
  const sublimation = await prisma.category.upsert({
    where: { slug: "sublimation-printing" },
    update: {},
    create: { name: "Sublimation Printing", slug: "sublimation-printing" },
  });

  for (const p of PRODUCTS) {
    const categoryId = p.printingMethod === "DTF" ? dtf.id : sublimation.id;
    await prisma.product.upsert({
      where: { slug: p.slug },
      update: {},
      create: { ...p, categoryId },
    });
  }

  for (const r of REVIEWS) {
    const product = await prisma.product.findUnique({ where: { slug: r.productSlug } });
    if (!product) continue;
    await prisma.review.create({
      data: {
        productId: product.id,
        author: r.author,
        rating: r.rating,
        comment: r.comment,
        verified: true,
      },
    });
  }

  const adminEmail = "admin@zumrahapparel.com";
  const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
  if (!existingAdmin) {
    await prisma.user.create({
      data: {
        name: "Zumrah Admin",
        email: adminEmail,
        passwordHash: await bcrypt.hash("ChangeMe123!", 10),
        role: "ADMIN",
      },
    });
    console.log(`Created admin user: ${adminEmail} / password: ChangeMe123! (change this after first login)`);
  }

  console.log(`Seeded ${PRODUCTS.length} products, ${REVIEWS.length} reviews, 2 categories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
