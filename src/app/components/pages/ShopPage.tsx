import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import { motion } from "motion/react";
import {
  SlidersHorizontal, Search, Star, Heart, ShoppingBag, Sparkles,
  X, ChevronDown, Grid3X3, List, Filter, LayoutGrid
} from "lucide-react";
import { PRODUCTS, formatPKR } from "../../data/products";
import { useApp } from "../../context/AppContext";

const SIZES = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const COLOR_FILTERS = [
  { name: "White", hex: "#FFFFFF" },
  { name: "Black", hex: "#1C1C1E" },
  { name: "Navy Blue", hex: "#1B2A4A" },
  { name: "Red", hex: "#C62828" },
  { name: "Blue", hex: "#1565C0" },
  { name: "Green", hex: "#1B5E20" },
];

function ProductCard({ product, view }: { product: typeof PRODUCTS[0]; view: "grid" | "list" }) {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const inWishlist = isInWishlist(product.id);

  if (view === "list") {
    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="group bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all flex"
      >
        <div className="relative w-48 flex-shrink-0 overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          {product.badge && (
            <span className={`absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full ${product.badge === "bestseller" ? "bg-[#D4AF37] text-black" : product.badge === "new" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
              {product.badge === "bestseller" ? "Best Seller" : product.badge === "new" ? "New" : "Sale"}
            </span>
          )}
        </div>
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-gray-500 text-xs mb-1">{product.printingMethod}</p>
                <h3 className="text-white font-semibold">{product.name}</h3>
              </div>
              <button onClick={() => toggleWishlist(product)} className={`p-2 rounded-lg transition-colors ${inWishlist ? "text-red-400" : "text-gray-600 hover:text-red-400"}`}>
                <Heart size={18} fill={inWishlist ? "currentColor" : "none"} />
              </button>
            </div>
            <p className="text-gray-500 text-sm line-clamp-2 mb-3">{product.description}</p>
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "#D4AF37" : "none"} stroke="#D4AF37" />
              ))}
              <span className="text-gray-500 text-xs ml-1">({product.reviewCount})</span>
            </div>
            <div className="flex gap-1.5 mb-3">
              {product.sizes.slice(0, 5).map((s) => (
                <span key={s} className="px-2 py-0.5 bg-[#1a1a1a] border border-[#333] text-gray-400 text-xs rounded">{s}</span>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              {product.salePrice ? (
                <div>
                  <span className="text-[#D4AF37] font-bold text-lg">{formatPKR(product.salePrice)}</span>
                  <span className="text-gray-600 text-sm ml-2 line-through">{formatPKR(product.price)}</span>
                </div>
              ) : (
                <span className="text-[#D4AF37] font-bold text-lg">{formatPKR(product.price)}</span>
              )}
            </div>
            <div className="flex gap-2">
              <Link to={`/designer/${product.id}`} className="px-4 py-2 bg-white/5 border border-[#333] text-gray-300 rounded-lg text-sm hover:border-[#D4AF37]/50 transition-all flex items-center gap-1.5">
                <Sparkles size={14} /> Customize
              </Link>
              <button
                onClick={() => addToCart({ product, quantity: 1, selectedColor: product.colors[0], selectedColorName: product.colorNames[0], selectedSize: "M" })}
                className="px-4 py-2 bg-[#D4AF37] text-black rounded-lg text-sm font-bold hover:bg-[#C49B2A] transition-colors flex items-center gap-1.5"
              >
                <ShoppingBag size={14} /> Add to Cart
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
    >
      <div className="relative overflow-hidden aspect-square bg-[#0d0d0d]">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${product.badge === "bestseller" ? "bg-[#D4AF37] text-black" : product.badge === "new" ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
              {product.badge === "bestseller" ? "Best Seller" : product.badge === "new" ? "New" : "Sale"}
            </span>
          </div>
        )}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${inWishlist ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-red-500"}`}
        >
          <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
        </button>
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3 flex gap-2">
          <button
            onClick={() => addToCart({ product, quantity: 1, selectedColor: product.colors[0], selectedColorName: product.colorNames[0], selectedSize: "M" })}
            className="flex-1 py-2.5 bg-[#D4AF37] text-black rounded-xl text-xs font-bold hover:bg-[#C49B2A] transition-colors flex items-center justify-center gap-1.5"
          >
            <ShoppingBag size={14} /> Add to Cart
          </button>
          <Link to={`/designer/${product.id}`} className="px-3 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl text-xs hover:bg-white/20 transition-colors border border-white/20">
            <Sparkles size={14} />
          </Link>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "#D4AF37" : "none"} stroke="#D4AF37" />
          ))}
          <span className="text-gray-500 text-xs ml-1">({product.reviewCount})</span>
        </div>
        <Link to={`/shop/${product.id}`}>
          <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1 hover:text-[#D4AF37] transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-xs mb-3">{product.printingMethod}</p>
        <div className="flex items-center justify-between">
          <div>
            {product.salePrice ? (
              <div className="flex items-center gap-2">
                <span className="text-[#D4AF37] font-bold">{formatPKR(product.salePrice)}</span>
                <span className="text-gray-600 text-xs line-through">{formatPKR(product.price)}</span>
              </div>
            ) : (
              <span className="text-[#D4AF37] font-bold">{formatPKR(product.price)}</span>
            )}
          </div>
          <div className="flex gap-1">
            {product.colors.slice(0, 4).map((color) => (
              <div key={color} className="w-4 h-4 rounded-full border border-[#333]" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState<"grid" | "list">("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "all",
    size: "all",
    color: "all",
    minPrice: 0,
    maxPrice: 10000,
    badge: "all",
    sort: "popular",
  });

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.printingMethod.toLowerCase().includes(q));
    }
    if (filters.category !== "all") result = result.filter((p) => p.category === filters.category);
    if (filters.size !== "all") result = result.filter((p) => p.sizes.includes(filters.size));
    if (filters.color !== "all") result = result.filter((p) => {
      const colorFilter = COLOR_FILTERS.find((c) => c.name === filters.color);
      return colorFilter ? p.colors.some((c) => c.toLowerCase() === colorFilter.hex.toLowerCase()) : true;
    });
    if (filters.badge !== "all") result = result.filter((p) => p.badge === filters.badge);
    result = result.filter((p) => {
      const price = p.salePrice ?? p.price;
      return price >= filters.minPrice && price <= filters.maxPrice;
    });

    switch (filters.sort) {
      case "price-asc": result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "price-desc": result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "newest": result.sort((a, b) => (a.badge === "new" ? -1 : 1)); break;
      default: result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [filters]);

  const updateFilter = (key: string, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <h4 className="text-white text-sm font-semibold mb-3">Search</h4>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => updateFilter("search", e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-[#D4AF37]/50 transition-colors"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-white text-sm font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          {[
            { label: "All Products", value: "all" },
            { label: "DTF Printing", value: "dtf" },
            { label: "Sublimation", value: "sublimation" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter("category", opt.value)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${filters.category === opt.value ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-400 hover:bg-[#1a1a1a] border border-transparent"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <h4 className="text-white text-sm font-semibold mb-3">Size</h4>
        <div className="flex flex-wrap gap-2">
          {["all", ...SIZES].map((size) => (
            <button
              key={size}
              onClick={() => updateFilter("size", size)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${filters.size === size ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "border-[#333] text-gray-400 hover:border-[#555]"}`}
            >
              {size === "all" ? "All" : size}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="text-white text-sm font-semibold mb-3">Color</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateFilter("color", "all")}
            className={`px-3 py-1.5 rounded-lg text-xs border transition-all ${filters.color === "all" ? "bg-[#D4AF37] text-black border-[#D4AF37]" : "border-[#333] text-gray-400 hover:border-[#555]"}`}
          >All</button>
          {COLOR_FILTERS.map((c) => (
            <button
              key={c.name}
              title={c.name}
              onClick={() => updateFilter("color", c.name)}
              className={`w-7 h-7 rounded-full border-2 transition-all ${filters.color === c.name ? "border-[#D4AF37] scale-110" : "border-[#333] hover:border-[#555]"}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </div>

      {/* Badge filter */}
      <div>
        <h4 className="text-white text-sm font-semibold mb-3">Collection</h4>
        <div className="space-y-2">
          {[
            { label: "All", value: "all" },
            { label: "⭐ Best Sellers", value: "bestseller" },
            { label: "🆕 New Arrivals", value: "new" },
            { label: "🔥 On Sale", value: "sale" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => updateFilter("badge", opt.value)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${filters.badge === opt.value ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-400 hover:bg-[#1a1a1a] border border-transparent"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear filters */}
      <button
        onClick={() => setFilters({ search: "", category: "all", size: "all", color: "all", minPrice: 0, maxPrice: 10000, badge: "all", sort: "popular" })}
        className="w-full py-2.5 border border-red-500/30 text-red-400 rounded-xl text-sm hover:bg-red-500/10 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      {/* Header */}
      <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-white text-2xl font-bold" style={{ fontFamily: "Poppins, sans-serif" }}>Shop All Products</h1>
              <p className="text-gray-500 text-sm mt-1">{filteredProducts.length} products found</p>
            </div>
            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={filters.sort}
                onChange={(e) => updateFilter("sort", e.target.value)}
                className="px-4 py-2.5 bg-[#111] border border-[#333] text-gray-300 rounded-xl text-sm outline-none focus:border-[#D4AF37]/50"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
              {/* View toggle */}
              <div className="flex gap-1 bg-[#111] border border-[#333] rounded-xl p-1">
                <button onClick={() => setView("grid")} className={`p-2 rounded-lg transition-colors ${view === "grid" ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "text-gray-500 hover:text-gray-300"}`}>
                  <LayoutGrid size={16} />
                </button>
                <button onClick={() => setView("list")} className={`p-2 rounded-lg transition-colors ${view === "list" ? "bg-[#D4AF37]/20 text-[#D4AF37]" : "text-gray-500 hover:text-gray-300"}`}>
                  <List size={16} />
                </button>
              </div>
              {/* Mobile filter */}
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-[#111] border border-[#333] text-gray-300 rounded-xl text-sm"
              >
                <Filter size={16} /> Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 sticky top-24">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  <SlidersHorizontal size={16} className="text-[#D4AF37]" /> Filters
                </h3>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <Search size={48} className="text-gray-700 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search term</p>
                <button
                  onClick={() => setFilters({ search: "", category: "all", size: "all", color: "all", minPrice: 0, maxPrice: 10000, badge: "all", sort: "popular" })}
                  className="px-6 py-2.5 bg-[#D4AF37] text-black rounded-xl text-sm font-bold"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={view === "grid" ? "grid grid-cols-2 xl:grid-cols-3 gap-5" : "space-y-4"}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} view={view} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="absolute right-0 top-0 bottom-0 w-80 bg-[#111] border-l border-[#222] overflow-y-auto"
          >
            <div className="flex items-center justify-between p-5 border-b border-[#222]">
              <h3 className="text-white font-semibold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <FilterContent />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
