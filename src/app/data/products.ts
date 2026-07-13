export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  images: string[];
  category: "dtf" | "sublimation";
  printingMethod: "DTF Printing" | "Sublimation Printing";
  colors: string[];
  colorNames: string[];
  sizes: string[];
  rating: number;
  reviewCount: number;
  badge?: "new" | "bestseller" | "sale";
  description: string;
  isCustomizable: boolean;
  inStock: boolean;
  sku: string;
  material: string;
  features: string[];
  tags: string[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: "pending" | "printing" | "shipped" | "delivered" | "cancelled";
  items: number;
  total: number;
  paymentMethod: string;
  city: string;
}

export const SHIRT_COLORS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#1C1C1E" },
  { name: "Navy Blue", hex: "#1B2A4A" },
  { name: "Red", hex: "#C62828" },
  { name: "Forest Green", hex: "#1B5E20" },
  { name: "Royal Blue", hex: "#1565C0" },
  { name: "Charcoal", hex: "#37474F" },
  { name: "Yellow", hex: "#F9A825" },
  { name: "Purple", hex: "#6A1B9A" },
  { name: "Orange", hex: "#E65100" },
  { name: "Hot Pink", hex: "#AD1457" },
  { name: "Sky Blue", hex: "#0288D1" },
  { name: "Teal", hex: "#00695C" },
  { name: "Maroon", hex: "#880E4F" },
  { name: "Olive", hex: "#558B2F" },
  { name: "Beige", hex: "#D7CCC8" },
];

export const PAKISTAN_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Gujranwala",
  "Peshawar",
  "Quetta",
  "Hyderabad",
  "Sialkot",
  "Bahawalpur",
  "Sargodha",
  "Sukkur",
  "Larkana",
  "Sheikhupura",
  "Rahim Yar Khan",
  "Jhang",
  "Dera Ghazi Khan",
  "Gujrat",
  "Abbottabad",
  "Mardan",
  "Kasur",
  "Okara",
  "Chiniot",
  "Nawabshah",
  "Mingora",
  "Mirpur Khas",
  "Sahiwal",
  "Muzaffarabad",
];

export const getShippingCost = (city: string): number => {
  return city === "Karachi" ? 300 : 450;
};

export const formatPKR = (amount: number): string => {
  return `₨ ${amount.toLocaleString("en-PK")}`;
};

export const PRODUCTS: Product[] = [
  {
    id: "p001",
    name: "Classic White DTF Premium Tee",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1651761179569-4ba2aa054997?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1651761179569-4ba2aa054997?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    category: "dtf",
    printingMethod: "DTF Printing",
    colors: ["#FFFFFF", "#1C1C1E", "#1B2A4A", "#C62828"],
    colorNames: ["White", "Black", "Navy Blue", "Red"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    rating: 4.8,
    reviewCount: 124,
    badge: "bestseller",
    description:
      "Premium 100% combed cotton T-shirt with vibrant DTF print technology. Perfect for daily wear, corporate events, and custom branding.",
    isCustomizable: true,
    inStock: true,
    sku: "ZA-DTF-001",
    material: "100% Combed Cotton",
    features: [
      "DTF Printing Technology",
      "Vibrant Colors",
      "Wash Resistant",
      "Soft & Breathable",
      "Pre-shrunk Fabric",
    ],
    tags: ["dtf", "cotton", "premium", "bestseller"],
  },
  {
    id: "p002",
    name: "Sublimation Sports Jersey",
    price: 2499,
    salePrice: 1999,
    image:
      "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1521498542256-5aeb47ba2b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    category: "sublimation",
    printingMethod: "Sublimation Printing",
    colors: ["#1B2A4A", "#C62828", "#1565C0", "#1B5E20"],
    colorNames: ["Navy Blue", "Red", "Royal Blue", "Forest Green"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    rating: 4.9,
    reviewCount: 89,
    badge: "sale",
    description:
      "High-performance sublimation printed sports jersey. Full-color, all-over print. Ideal for sports teams, schools, and tournaments.",
    isCustomizable: true,
    inStock: true,
    sku: "ZA-SUB-002",
    material: "100% Polyester Dry-Fit",
    features: [
      "All-Over Sublimation Print",
      "Moisture Wicking",
      "Lightweight & Breathable",
      "Color-fast Technology",
      "Double-stitched Seams",
    ],
    tags: ["sublimation", "sports", "jersey", "all-over"],
  },
  {
    id: "p003",
    name: "Premium Black Graphic Tee",
    price: 1799,
    image:
      "https://images.unsplash.com/photo-1579863943703-2a963fb7a794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1579863943703-2a963fb7a794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    category: "dtf",
    printingMethod: "DTF Printing",
    colors: ["#1C1C1E", "#37474F", "#1B2A4A", "#880E4F"],
    colorNames: ["Black", "Charcoal", "Navy Blue", "Maroon"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: 4.7,
    reviewCount: 67,
    badge: "new",
    description:
      "Luxury heavyweight black tee with precision DTF printing. 220 GSM premium fabric for maximum comfort and durability.",
    isCustomizable: true,
    inStock: true,
    sku: "ZA-DTF-003",
    material: "220 GSM Cotton Blend",
    features: [
      "DTF Printing",
      "Heavyweight 220 GSM",
      "Reinforced Collar",
      "Premium Finish",
    ],
    tags: ["dtf", "black", "premium", "heavyweight"],
  },
  {
    id: "p004",
    name: "Corporate Polo DTF Edition",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    category: "dtf",
    printingMethod: "DTF Printing",
    colors: ["#FFFFFF", "#1B2A4A", "#1C1C1E", "#1565C0"],
    colorNames: ["White", "Navy Blue", "Black", "Royal Blue"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: 4.6,
    reviewCount: 43,
    badge: undefined,
    description:
      "Professional polo shirt with DTF printed logo. Perfect for corporate uniforms, brand merchandise, and team wear.",
    isCustomizable: true,
    inStock: true,
    sku: "ZA-DTF-004",
    material: "Pique Cotton Blend",
    features: ["DTF Logo Print", "3-Button Placket", "Corporate Grade", "Logo Ready"],
    tags: ["dtf", "polo", "corporate", "uniform"],
  },
  {
    id: "p005",
    name: "Oversized Sublimation Hoodie",
    price: 3999,
    image:
      "https://images.unsplash.com/photo-1614214191247-5b2d3a734f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1614214191247-5b2d3a734f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
      "https://images.unsplash.com/photo-1652823780977-b22c0ed84c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    category: "sublimation",
    printingMethod: "Sublimation Printing",
    colors: ["#1C1C1E", "#37474F", "#1B2A4A", "#6A1B9A"],
    colorNames: ["Black", "Charcoal", "Navy Blue", "Purple"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    rating: 4.9,
    reviewCount: 156,
    badge: "bestseller",
    description:
      "Premium oversized hoodie with all-over sublimation print. Maximum comfort meets streetwear aesthetics.",
    isCustomizable: true,
    inStock: true,
    sku: "ZA-SUB-005",
    material: "Fleece Polyester Blend",
    features: [
      "All-Over Sublimation",
      "Oversized Fit",
      "Kangaroo Pocket",
      "Drawstring Hood",
      "Ribbed Cuffs",
    ],
    tags: ["sublimation", "hoodie", "oversized", "streetwear"],
  },
  {
    id: "p006",
    name: "University Team Jersey Pack",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1652823780977-b22c0ed84c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1652823780977-b22c0ed84c97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    category: "sublimation",
    printingMethod: "Sublimation Printing",
    colors: ["#C62828", "#1565C0", "#1B5E20", "#F9A825"],
    colorNames: ["Red", "Royal Blue", "Forest Green", "Yellow"],
    sizes: ["XS", "S", "M", "L", "XL", "2XL", "3XL"],
    rating: 4.8,
    reviewCount: 231,
    badge: "bestseller",
    description:
      "Custom university sports jersey with sublimation printing. Number, name, and logo included in the price.",
    isCustomizable: true,
    inStock: true,
    sku: "ZA-SUB-006",
    material: "100% Polyester Performance",
    features: [
      "Player Name & Number",
      "Sublimation Print",
      "Team Logo Ready",
      "Breathable Mesh",
      "Minimum 10 pieces",
    ],
    tags: ["sublimation", "jersey", "university", "sports", "team"],
  },
  {
    id: "p007",
    name: "DTF Streetwear Cargo Tee",
    price: 1699,
    salePrice: 1299,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    category: "dtf",
    printingMethod: "DTF Printing",
    colors: ["#FFFFFF", "#558B2F", "#D7CCC8", "#37474F"],
    colorNames: ["White", "Olive", "Beige", "Charcoal"],
    sizes: ["S", "M", "L", "XL", "2XL"],
    rating: 4.5,
    reviewCount: 38,
    badge: "sale",
    description:
      "Trendy streetwear-inspired tee with DTF printed graphics. Drop shoulders, boxy fit for the modern look.",
    isCustomizable: true,
    inStock: true,
    sku: "ZA-DTF-007",
    material: "180 GSM Ringspun Cotton",
    features: [
      "DTF Printing",
      "Drop Shoulder Fit",
      "Boxy Silhouette",
      "Streetwear Style",
    ],
    tags: ["dtf", "streetwear", "boxy", "cargo"],
  },
  {
    id: "p008",
    name: "Premium Sublimation Polo",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1600269453258-30a2e10c72f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    images: [
      "https://images.unsplash.com/photo-1600269453258-30a2e10c72f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    ],
    category: "sublimation",
    printingMethod: "Sublimation Printing",
    colors: ["#FFFFFF", "#1B2A4A", "#C62828", "#0288D1"],
    colorNames: ["White", "Navy Blue", "Red", "Sky Blue"],
    sizes: ["S", "M", "L", "XL", "2XL", "3XL"],
    rating: 4.7,
    reviewCount: 52,
    badge: "new",
    description:
      "Premium all-over sublimation polo with moisture-wicking technology. Ideal for golf, corporate events, and brand merchandise.",
    isCustomizable: true,
    inStock: true,
    sku: "ZA-SUB-008",
    material: "Moisture-Wick Polyester",
    features: [
      "All-Over Sublimation",
      "Moisture Wicking",
      "UV Protection",
      "Premium Collar",
      "Corporate Ready",
    ],
    tags: ["sublimation", "polo", "premium", "corporate", "golf"],
  },
];

export const REVIEWS: Review[] = [
  {
    id: "r001",
    productId: "p001",
    author: "Ahmed Hassan",
    avatar: "AH",
    rating: 5,
    date: "2026-06-15",
    comment:
      "Absolutely amazing quality! The DTF print is crystal clear and the fabric feels premium. Ordered 50 pieces for our company event and everyone loved them. Will definitely order again.",
    verified: true,
  },
  {
    id: "r002",
    productId: "p001",
    author: "Fatima Malik",
    avatar: "FM",
    rating: 5,
    date: "2026-06-10",
    comment:
      "Best custom t-shirts in Pakistan! The colors are vibrant and they haven't faded after multiple washes. Zumrah Apparel is truly premium quality.",
    verified: true,
  },
  {
    id: "r003",
    productId: "p001",
    author: "Usman Tariq",
    avatar: "UT",
    rating: 4,
    date: "2026-06-05",
    comment:
      "Great product overall. Delivery was a bit slow but the quality made up for it. The print is sharp and the shirt fits perfectly.",
    verified: true,
  },
  {
    id: "r004",
    productId: "p005",
    author: "Sara Qureshi",
    avatar: "SQ",
    rating: 5,
    date: "2026-06-20",
    comment:
      "The oversized hoodie is INCREDIBLE. All-over print is exactly like my design. Premium quality and super comfortable. Worth every rupee!",
    verified: true,
  },
];

export const MOCK_ORDERS: Order[] = [
  {
    id: "ZA-2026-001234",
    date: "2026-06-28",
    status: "delivered",
    items: 3,
    total: 5697,
    paymentMethod: "JazzCash",
    city: "Lahore",
  },
  {
    id: "ZA-2026-001189",
    date: "2026-06-20",
    status: "shipped",
    items: 1,
    total: 2499,
    paymentMethod: "Card",
    city: "Karachi",
  },
  {
    id: "ZA-2026-001102",
    date: "2026-06-10",
    status: "delivered",
    items: 5,
    total: 9995,
    paymentMethod: "EasyPaisa",
    city: "Islamabad",
  },
  {
    id: "ZA-2026-000988",
    date: "2026-05-25",
    status: "delivered",
    items: 2,
    total: 3998,
    paymentMethod: "COD",
    city: "Multan",
  },
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: "Ahmed Hassan",
    role: "CEO, TechStart Pakistan",
    avatar: "AH",
    rating: 5,
    comment:
      "We ordered 100 custom corporate t-shirts for our annual conference. The quality exceeded our expectations. The DTF printing is incredibly detailed and vibrant. Zumrah Apparel is our go-to for all company merchandise.",
    city: "Karachi",
  },
  {
    id: 2,
    name: "Fatima Malik",
    role: "University Sports Captain",
    avatar: "FM",
    rating: 5,
    comment:
      "Our university cricket team jerseys turned out absolutely perfect! Full sublimation with player names and numbers. The fabric is top quality and the colors are exactly as designed. Highly recommend!",
    city: "Lahore",
  },
  {
    id: 3,
    name: "Usman Tariq",
    role: "Content Creator",
    avatar: "UT",
    rating: 5,
    comment:
      "I design my own merch and Zumrah Apparel makes the production seamless. The online designer tool is like Canva but for shirts! Quality is consistently excellent.",
    city: "Islamabad",
  },
  {
    id: 4,
    name: "Sara Qureshi",
    role: "Brand Manager",
    avatar: "SQ",
    rating: 5,
    comment:
      "Fast delivery, premium packaging, and unmatched print quality. We switched all our branded merchandise to Zumrah Apparel and couldn't be happier with the results.",
    city: "Faisalabad",
  },
  {
    id: 5,
    name: "Bilal Ahmed",
    role: "Startup Founder",
    avatar: "BA",
    rating: 5,
    comment:
      "The 3D designer tool let me see exactly how my design would look before ordering. No surprises - exactly what I designed. This is the future of custom apparel!",
    city: "Rawalpindi",
  },
];

export const FAQS = [
  {
    q: "What is the minimum order quantity?",
    a: "For standard products, there is no minimum order quantity. For bulk/team orders with customization, the minimum is 10 pieces. Contact us for wholesale pricing.",
  },
  {
    q: "What is the difference between DTF and Sublimation printing?",
    a: "DTF (Direct-to-Film) printing works on any fabric color and produces vibrant prints with excellent durability. Sublimation printing is ideal for polyester fabrics and creates seamless, all-over prints with photographic quality.",
  },
  {
    q: "How long does delivery take?",
    a: "Standard delivery takes 5-7 business days. For customized orders, please allow 7-10 business days for production plus delivery time. Express options are available.",
  },
  {
    q: "What are the shipping charges?",
    a: "Shipping to Karachi costs ₨ 300. Shipping to all other cities in Pakistan costs ₨ 450. Free shipping is available on orders above ₨ 5,000.",
  },
  {
    q: "Can I see a preview of my design before ordering?",
    a: "Yes! Our 3D design studio lets you preview your design on a realistic shirt model in real-time. You can also download a preview image before placing your order.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept Visa/Mastercard credit and debit cards, EasyPaisa, JazzCash, and Cash on Delivery (COD) across Pakistan.",
  },
  {
    q: "What file formats can I upload for my design?",
    a: "We accept PNG, JPG, JPEG, WEBP, and GIF files up to 5MB. For best print quality, we recommend PNG files with transparent backgrounds at 300 DPI resolution.",
  },
  {
    q: "Do you offer bulk discounts?",
    a: "Yes! Orders of 20+ pieces receive 10% discount, 50+ pieces receive 15% discount, and 100+ pieces receive 20% discount. Contact us for custom corporate pricing.",
  },
];
