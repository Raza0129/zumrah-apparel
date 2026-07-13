"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Heart, ShoppingBag, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useCartStore } from "@/store/cart";
import { toggleWishlistAction } from "@/lib/actions/wishlist";
import { formatPKR } from "@/lib/shipping";
import type { ProductCardData } from "@/lib/types";

export function ProductCard({ product }: { product: ProductCardData }) {
  const { data: session } = useSession();
  const addItem = useCartStore((s) => s.addItem);
  const [inWishlist, setInWishlist] = useState(false);
  const [wishlistPending, setWishlistPending] = useState(false);

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      image: product.images[0] ?? "",
      price: product.price,
      salePrice: product.salePrice,
      quantity: 1,
      selectedColor: product.colors[0]?.hex ?? "",
      selectedSize: "M",
    });
    toast.success("Added to cart!");
  };

  const handleWishlist = async () => {
    if (!session?.user) {
      toast.error("Please log in to save items to your wishlist");
      return;
    }
    setWishlistPending(true);
    const res = await toggleWishlistAction(product.id);
    setWishlistPending(false);
    if ("error" in res && res.error) {
      toast.error(res.error);
      return;
    }
    if ("added" in res) {
      setInWishlist(res.added);
      toast.success(res.added ? "Added to wishlist!" : "Removed from wishlist");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
    >
      <div className="relative overflow-hidden aspect-square bg-[#0d0d0d]">
        <Link href={`/shop/${product.slug}`} className="absolute inset-0 block">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </Link>
        <div className="absolute top-3 left-3 flex gap-2 pointer-events-none">
          {product.badge === "BESTSELLER" && (
            <span className="px-2.5 py-1 bg-[#D4AF37] text-black text-xs font-bold rounded-full">Best Seller</span>
          )}
          {product.badge === "NEW" && (
            <span className="px-2.5 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">New</span>
          )}
          {product.badge === "SALE" && (
            <span className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">Sale</span>
          )}
        </div>
        <button
          onClick={handleWishlist}
          disabled={wishlistPending}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-sm transition-all ${inWishlist ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-red-500"}`}
        >
          <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
        </button>
        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 p-3 flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 py-2.5 bg-[#D4AF37] text-black rounded-xl text-sm font-bold hover:bg-[#C49B2A] transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={15} /> Add to Cart
          </button>
          <Link
            href={`/designer/${product.slug}`}
            className="px-3 py-2.5 bg-white/10 backdrop-blur-sm text-white rounded-xl text-sm hover:bg-white/20 transition-colors border border-white/20"
          >
            <Sparkles size={15} />
          </Link>
        </div>
      </div>

      <Link href={`/shop/${product.slug}`} className="block p-4">
        <div className="flex items-center gap-1 mb-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} size={12} fill={i < Math.floor(product.rating) ? "#D4AF37" : "none"} stroke="#D4AF37" />
          ))}
          <span className="text-gray-500 text-xs ml-1">({product.reviewCount})</span>
        </div>
        <h3 className="text-white font-semibold text-sm mb-1 line-clamp-1 group-hover:text-[#D4AF37] transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-500 text-xs mb-3">
          {product.printingMethod === "DTF" ? "DTF Printing" : "Sublimation Printing"}
        </p>
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
              <div key={color.hex} className="w-4 h-4 rounded-full border border-[#333]" style={{ backgroundColor: color.hex }} />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
