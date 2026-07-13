import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Trash2, Plus, Minus, Tag, Truck, ArrowRight, Sparkles, ShoppingCart } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { formatPKR } from "../../data/products";

const VALID_COUPONS: Record<string, { type: "percent" | "fixed"; value: number; label: string }> = {
  "ZUMRAH10": { type: "percent", value: 10, label: "10% off your order" },
  "NEWUSER": { type: "fixed", value: 500, label: "₨500 off for new users" },
  "BULK20": { type: "percent", value: 20, label: "20% off bulk orders" },
};

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal, showNotification } = useApp();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<typeof VALID_COUPONS[string] | null>(null);
  const [couponError, setCouponError] = useState("");

  const applyCoupon = () => {
    const code = couponCode.toUpperCase().trim();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(VALID_COUPONS[code]);
      setCouponError("");
      showNotification(`Coupon applied: ${VALID_COUPONS[code].label}`, "success");
    } else {
      setCouponError("Invalid coupon code. Try ZUMRAH10, NEWUSER, or BULK20");
      setAppliedCoupon(null);
    }
  };

  const discount = appliedCoupon
    ? appliedCoupon.type === "percent"
      ? Math.round(cartTotal * (appliedCoupon.value / 100))
      : appliedCoupon.value
    : 0;

  const estimatedShipping = 300; // Default to Karachi
  const grandTotal = cartTotal - discount + estimatedShipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart size={80} className="text-gray-700 mx-auto mb-6" />
          <h2 className="text-white text-2xl font-bold mb-3" style={{ fontFamily: "Poppins, sans-serif" }}>Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Add some amazing products to get started</p>
          <Link to="/shop" className="inline-flex items-center gap-2 px-8 py-4 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] transition-all">
            <ShoppingBag size={18} /> Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-white text-2xl font-bold mb-8" style={{ fontFamily: "Poppins, sans-serif" }}>
          Shopping Cart <span className="text-gray-500 text-lg font-normal">({cart.length} items)</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.cartId}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 flex gap-5"
                >
                  {/* Product image */}
                  <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-[#0d0d0d]">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        {item.customized && (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-1">
                            <Sparkles size={10} className="text-[#D4AF37]" />
                            <span className="text-[#D4AF37] text-[10px] font-semibold">Custom Design</span>
                          </div>
                        )}
                        <h3 className="text-white font-semibold text-sm">{item.product.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center gap-1.5">
                            <div className="w-4 h-4 rounded-full border border-[#333]" style={{ backgroundColor: item.selectedColor }} />
                            <span className="text-gray-500 text-xs">{item.selectedColorName}</span>
                          </div>
                          <span className="text-gray-600">·</span>
                          <span className="text-gray-500 text-xs">Size: {item.selectedSize}</span>
                          <span className="text-gray-600">·</span>
                          <span className="text-gray-500 text-xs">{item.product.printingMethod}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="p-1.5 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all ml-2"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-[#0d0d0d] border border-[#333] rounded-xl">
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="text-white font-semibold w-6 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        {item.product.salePrice ? (
                          <div>
                            <span className="text-[#D4AF37] font-bold">{formatPKR(item.product.salePrice * item.quantity)}</span>
                            <p className="text-gray-600 text-xs line-through">{formatPKR(item.product.price * item.quantity)}</p>
                          </div>
                        ) : (
                          <span className="text-[#D4AF37] font-bold">{formatPKR(item.product.price * item.quantity)}</span>
                        )}
                        <p className="text-gray-500 text-xs">{formatPKR(item.product.salePrice ?? item.product.price)} each</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue shopping */}
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#C49B2A] text-sm font-medium transition-colors mt-2"
            >
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6 sticky top-24">
              <h2 className="text-white font-bold text-lg mb-5" style={{ fontFamily: "Poppins, sans-serif" }}>Order Summary</h2>

              {/* Coupon */}
              <div className="mb-5">
                <label className="text-white text-sm font-medium mb-2 block">
                  <Tag size={14} className="inline mr-1.5 text-[#D4AF37]" />
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && applyCoupon()}
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2.5 bg-[#0d0d0d] border border-[#333] rounded-xl text-white text-sm outline-none focus:border-[#D4AF37]/50 transition-colors placeholder-gray-600"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2.5 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] rounded-xl text-sm font-semibold hover:bg-[#D4AF37]/20 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {couponError && <p className="text-red-400 text-xs mt-1.5">{couponError}</p>}
                {appliedCoupon && (
                  <div className="flex items-center gap-2 mt-2 px-3 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
                    <span className="text-emerald-400 text-xs">✓ {appliedCoupon.label}</span>
                    <button onClick={() => setAppliedCoupon(null)} className="ml-auto text-emerald-400 text-xs hover:text-emerald-300">✕</button>
                  </div>
                )}
                <p className="text-gray-600 text-[10px] mt-1.5">Try: ZUMRAH10 · NEWUSER · BULK20</p>
              </div>

              {/* Price breakdown */}
              <div className="space-y-3 border-t border-[#1e1e1e] pt-4 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{formatPKR(cartTotal)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400">Discount</span>
                    <span className="text-emerald-400">-{formatPKR(discount)}</span>
                  </div>
                )}
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
                onClick={() => navigate("/checkout")}
                className="w-full py-4 bg-[#D4AF37] text-black rounded-xl font-bold text-lg hover:bg-[#C49B2A] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
              >
                Proceed to Checkout <ArrowRight size={20} />
              </button>

              {/* Payment icons */}
              <div className="mt-4 pt-4 border-t border-[#1e1e1e]">
                <p className="text-gray-600 text-xs text-center mb-3">Secure Payment Methods</p>
                <div className="flex justify-center gap-2 flex-wrap">
                  {["Visa", "Mastercard", "EasyPaisa", "JazzCash", "COD"].map((m) => (
                    <span key={m} className="px-2 py-1 bg-[#0d0d0d] border border-[#333] rounded text-[10px] text-gray-500">
                      {m}
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
