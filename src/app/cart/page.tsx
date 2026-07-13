"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Trash2, Plus, Minus, Truck, ArrowRight, Sparkles, ShoppingCart } from "lucide-react";
import { useCartStore, cartTotal } from "@/store/cart";
import { formatPKR } from "@/lib/shipping";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const router = useRouter();

  const subtotal = cartTotal(items);
  const estimatedShipping = items.length > 0 ? 300 : 0;
  const grandTotal = subtotal + estimatedShipping;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={80} className="text-gray-700 mx-auto mb-6" />
          <h2 className="text-white text-2xl font-bold mb-3 font-sans">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some amazing products to get started</p>
          <Link href="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] transition-all">
            <ShoppingBag size={18} /> Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-white text-2xl font-bold mb-8 font-sans">
          Shopping Cart <span className="text-gray-500 text-lg font-normal">({items.length} items)</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.cartId}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 flex gap-5"
                >
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-[#0d0d0d]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        {item.designId && (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-1">
                            <Sparkles size={10} className="text-[#D4AF37]" />
                            <span className="text-[#D4AF37] text-[10px] font-semibold">Custom Design</span>
                          </div>
                        )}
                        <h3 className="text-white font-semibold text-sm">{item.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full border border-[#333]" style={{ backgroundColor: item.selectedColor }} />
                          </div>
                          <span className="text-gray-600">·</span>
                          <span className="text-gray-500 text-xs">Size: {item.selectedSize}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.cartId)}
                        className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all ml-2"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-[#0d0d0d] border border-[#333] rounded-xl">
                        <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                          <Minus size={13} />
                        </button>
                        <span className="text-white font-semibold w-6 text-center text-sm">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors">
                          <Plus size={13} />
                        </button>
                      </div>

                      <div className="text-right">
                        {item.salePrice ? (
                          <div>
                            <span className="text-[#D4AF37] font-bold">{formatPKR(item.salePrice * item.quantity)}</span>
                            <p className="text-gray-600 text-xs line-through">{formatPKR(item.price * item.quantity)}</p>
                          </div>
                        ) : (
                          <span className="text-[#D4AF37] font-bold">{formatPKR(item.price * item.quantity)}</span>
                        )}
                        <p className="text-gray-500 text-xs">{formatPKR(item.salePrice ?? item.price)} each</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link href="/shop" className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#C49B2A] text-sm font-medium transition-colors mt-2">
              ← Continue Shopping
            </Link>
          </div>

          <div>
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 sticky top-24">
              <h2 className="text-white font-bold text-lg mb-5 font-sans">Order Summary</h2>

              <div className="space-y-3 border-t border-[#1e1e1e] pt-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1.5">
                    <Truck size={13} className="text-gray-500" />
                    <span className="text-gray-400">Shipping (Est.)</span>
                  </div>
                  <span className="text-white">{formatPKR(estimatedShipping)}</span>
                </div>
                <p className="text-gray-600 text-[10px]">Karachi ₨300 · Other cities ₨450 (final at checkout)</p>
              </div>

              <div className="flex justify-between items-center border-t border-[#1e1e1e] pt-4 mb-6">
                <span className="text-white font-bold text-lg">Total</span>
                <span className="text-[#D4AF37] font-bold text-2xl">{formatPKR(grandTotal)}</span>
              </div>

              <button
                onClick={() => router.push("/checkout")}
                className="w-full py-4 bg-[#D4AF37] text-black rounded-xl font-bold text-lg hover:bg-[#C49B2A] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>

              <div className="mt-4 pt-4 border-t border-[#1e1e1e]">
                <p className="text-gray-600 text-xs text-center mb-3">Payment Methods</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  <span className="px-2 py-1 bg-[#0d0d0d] border border-[#D4AF37]/40 rounded text-[10px] text-[#D4AF37]">Cash on Delivery</span>
                  {["Visa", "Mastercard", "EasyPaisa", "JazzCash"].map((m) => (
                    <span key={m} className="px-2 py-1 bg-[#0d0d0d] border border-[#333] rounded text-[10px] text-gray-600">
                      {m} (soon)
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
