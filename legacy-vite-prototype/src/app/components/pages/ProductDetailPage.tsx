import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import {
  Star, Heart, ShoppingBag, Sparkles, ArrowLeft, Share2,
  Truck, Shield, Package, RotateCcw, Check, ChevronDown, BadgeCheck
} from "lucide-react";
import { PRODUCTS, REVIEWS, formatPKR, getShippingCost } from "../../data/products";
import { useApp } from "../../context/AppContext";

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const product = PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
  const reviews = REVIEWS.filter((r) => r.productId === product.id);
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedColorName, setSelectedColorName] = useState(product.colorNames[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [activeTab, setActiveTab] = useState<"description" | "features" | "reviews" | "shipping">("description");

  const inWishlist = isInWishlist(product.id);
  const price = product.salePrice ?? product.price;

  const handleAddToCart = () => {
    addToCart({ product, quantity, selectedColor, selectedColorName, selectedSize });
  };

  const handleBuyNow = () => {
    addToCart({ product, quantity, selectedColor, selectedColorName, selectedSize });
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#D4AF37] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#D4AF37] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-gray-400">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="relative aspect-square bg-[#111] border border-[#1e1e1e] rounded-3xl overflow-hidden mb-4">
              <motion.img
                key={activeImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={product.images[activeImage] ?? product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1.5 text-sm font-bold rounded-full ${product.badge === "bestseller" ? "bg-[#D4AF37] text-black" : product.badge === "new" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
                    {product.badge === "bestseller" ? "⭐ Best Seller" : product.badge === "new" ? "🆕 New Arrival" : "🔥 On Sale"}
                  </span>
                </div>
              )}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${inWishlist ? "bg-red-500 text-white" : "bg-black/60 backdrop-blur-sm text-white hover:bg-red-500"}`}
                >
                  <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
                </button>
                <button className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-white/20 flex items-center justify-center transition-all">
                  <Share2 size={18} />
                </button>
              </div>
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? "border-[#D4AF37]" : "border-[#1e1e1e] hover:border-[#333]"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-4">
              <span className="text-[#D4AF37] text-xs font-semibold">{product.printingMethod}</span>
            </div>

            <h1 className="text-white text-3xl font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>{product.name}</h1>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} fill={i < Math.floor(product.rating) ? "#D4AF37" : "none"} stroke="#D4AF37" />
                ))}
                <span className="text-[#D4AF37] font-semibold text-sm ml-1">{product.rating}</span>
              </div>
              <span className="text-gray-500 text-sm">({product.reviewCount} reviews)</span>
              <span className={`text-sm font-medium ${product.inStock ? "text-emerald-400" : "text-red-400"}`}>
                {product.inStock ? "✓ In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3">
                <span className="text-[#D4AF37] text-4xl font-bold">{formatPKR(price)}</span>
                {product.salePrice && (
                  <>
                    <span className="text-gray-600 text-xl line-through">{formatPKR(product.price)}</span>
                    <span className="px-2 py-0.5 bg-red-500/20 text-red-400 rounded-full text-sm font-semibold">
                      {Math.round((1 - product.salePrice / product.price) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-500 text-xs mt-1">SKU: {product.sku} · Material: {product.material}</p>
            </div>

            {/* Color Selection */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white text-sm font-semibold">Color</span>
                <span className="text-[#D4AF37] text-sm">{selectedColorName}</span>
              </div>
              <div className="flex flex-wrap gap-2.5">
                {product.colors.map((color, i) => (
                  <button
                    key={color}
                    title={product.colorNames[i]}
                    onClick={() => { setSelectedColor(color); setSelectedColorName(product.colorNames[i]); }}
                    className={`w-9 h-9 rounded-full border-2 transition-all hover:scale-110 ${selectedColor === color ? "border-[#D4AF37] scale-110 shadow-[0_0_10px_rgba(212,175,55,0.5)]" : "border-[#333]"}`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white text-sm font-semibold">Size</span>
                <button className="text-[#D4AF37] text-xs flex items-center gap-1">
                  Size Guide <ChevronDown size={12} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${selectedSize === size ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "border-[#333] text-gray-400 hover:border-[#555] hover:text-gray-200"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-white text-sm font-semibold">Quantity</span>
              <div className="flex items-center gap-3 bg-[#111] border border-[#333] rounded-xl">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >−</button>
                <span className="text-white font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                >+</button>
              </div>
              <span className="text-gray-500 text-sm">Total: <span className="text-[#D4AF37] font-bold">{formatPKR(price * quantity)}</span></span>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                <ShoppingBag size={20} /> Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-4 bg-white/5 border border-[#333] text-white rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center justify-center gap-2"
              >
                Buy Now
              </button>
              <Link
                to={`/designer/${product.id}`}
                className="py-4 px-5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-xl hover:bg-[#D4AF37]/20 transition-all flex items-center gap-2"
              >
                <Sparkles size={20} /> Customize
              </Link>
            </div>

            {/* Shipping info */}
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck size={16} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300">Karachi: <span className="text-white font-semibold">{formatPKR(300)}</span> · Other cities: <span className="text-white font-semibold">{formatPKR(450)}</span></span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package size={16} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300">Production + delivery: <span className="text-white font-semibold">7-10 business days</span></span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield size={16} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300">Secure payment · Quality guarantee</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <RotateCcw size={16} className="text-[#D4AF37] flex-shrink-0" />
                <span className="text-gray-300">Easy returns within 7 days if print quality issue</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12">
          <div className="flex gap-1 bg-[#111] border border-[#1e1e1e] rounded-2xl p-1.5 mb-6 overflow-x-auto">
            {(["description", "features", "reviews", "shipping"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-medium transition-all capitalize whitespace-nowrap ${activeTab === tab ? "bg-[#D4AF37] text-black" : "text-gray-400 hover:text-gray-200"}`}
              >
                {tab === "reviews" ? `Reviews (${reviews.length})` : tab}
              </button>
            ))}
          </div>

          <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6">
            {activeTab === "description" && (
              <div>
                <p className="text-gray-300 leading-relaxed mb-4">{product.description}</p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Every Zumrah Apparel product is crafted with premium materials and subjected to rigorous quality control. Our printing technology ensures vibrant, long-lasting colors that won't fade even after dozens of washes.
                </p>
              </div>
            )}
            {activeTab === "features" && (
              <ul className="grid sm:grid-cols-2 gap-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-gray-300 text-sm">
                    <div className="w-6 h-6 bg-[#D4AF37]/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-[#D4AF37]" />
                    </div>
                    {f}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === "reviews" && (
              <div>
                {reviews.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
                ) : (
                  <div className="space-y-5">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b border-[#1e1e1e] pb-5 last:border-0 last:pb-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-[#D4AF37] rounded-full flex items-center justify-center text-black font-bold text-sm">
                              {review.avatar}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-white font-semibold text-sm">{review.author}</span>
                                {review.verified && <BadgeCheck size={14} className="text-emerald-400" />}
                              </div>
                              <p className="text-gray-500 text-xs">{new Date(review.date).toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} size={13} fill={i < review.rating ? "#D4AF37" : "none"} stroke="#D4AF37" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            {activeTab === "shipping" && (
              <div className="space-y-4">
                {[
                  { city: "Karachi", cost: 300, time: "2-3 business days" },
                  { city: "All Other Cities", cost: 450, time: "4-6 business days" },
                ].map(({ city, cost, time }) => (
                  <div key={city} className="flex items-center justify-between p-4 bg-[#0d0d0d] rounded-xl border border-[#1a1a1a]">
                    <div>
                      <p className="text-white font-medium text-sm">{city}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{time} (after production)</p>
                    </div>
                    <span className="text-[#D4AF37] font-bold">{formatPKR(cost)}</span>
                  </div>
                ))}
                <p className="text-gray-500 text-xs leading-relaxed">
                  Production time: 5-7 business days for custom orders. Standard products ship within 24-48 hours. Free shipping on orders above ₨ 5,000.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-white text-2xl font-bold mb-6" style={{ fontFamily: "Poppins, sans-serif" }}>Related Products</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
              {relatedProducts.map((p) => (
                <Link key={p.id} to={`/shop/${p.id}`} className="group bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h4 className="text-white text-sm font-semibold line-clamp-1 mb-1 group-hover:text-[#D4AF37] transition-colors">{p.name}</h4>
                    <span className="text-[#D4AF37] font-bold text-sm">{formatPKR(p.salePrice ?? p.price)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
