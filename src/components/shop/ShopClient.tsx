"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, Filter, X } from "lucide-react";
import { ProductCard } from "@/components/shop/ProductCard";
import type { ProductCardData } from "@/lib/types";

type SortKey = "popular" | "newest" | "rating" | "price-asc" | "price-desc";

export function ShopClient({ products }: { products: ProductCardData[] }) {
  const searchParams = useSearchParams();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "all");
  const [sort, setSort] = useState<SortKey>("popular");

  const filtered = useMemo(() => {
    let result = [...products];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((p) => p.name.toLowerCase().includes(q));
    }
    if (category !== "all") {
      result = result.filter((p) => p.printingMethod.toLowerCase() === category);
    }
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => (a.badge === "NEW" ? -1 : 1) - (b.badge === "NEW" ? -1 : 1));
        break;
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
    }
    return result;
  }, [products, search, category, sort]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-white text-sm font-semibold mb-3">Search</h4>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2.5 bg-[#1a1a1a] border border-[#333] rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-[#D4AF37]/50 transition-colors"
          />
        </div>
      </div>

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
              onClick={() => setCategory(opt.value)}
              className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all ${category === opt.value ? "bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40" : "text-gray-400 hover:bg-[#1a1a1a] border border-transparent"}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => { setSearch(""); setCategory("all"); setSort("popular"); }}
        className="w-full py-2.5 border border-red-500/30 text-red-400 rounded-xl text-sm hover:bg-red-500/10 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="bg-[#0d0d0d] border-b border-[#1a1a1a] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-white text-2xl font-bold font-sans">Shop All Products</h1>
              <p className="text-gray-500 text-sm mt-1">{filtered.length} products found</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="px-4 py-2.5 bg-[#111] border border-[#333] text-gray-300 rounded-xl text-sm outline-none focus:border-[#D4AF37]/50"
              >
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
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
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 sticky top-24">
              <h3 className="text-white font-semibold mb-5">Filters</h3>
              <FilterContent />
            </div>
          </aside>

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <Search size={48} className="text-gray-700 mx-auto mb-4" />
                <h3 className="text-white text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 text-sm mb-6">Try adjusting your filters or search term</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#111] border-l border-[#222] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-[#222]">
              <h3 className="text-white font-semibold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="p-5">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
