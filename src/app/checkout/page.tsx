"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { useSession } from "next-auth/react";
import {
  ChevronRight, CreditCard, Truck, Smartphone,
  Check, Package, MapPin, User, Phone, Mail, ArrowLeft, Loader2,
} from "lucide-react";
import { useCartStore, cartTotal } from "@/store/cart";
import { formatPKR, getShippingCost, PAKISTAN_CITIES } from "@/lib/shipping";
import { createOrderAction } from "@/lib/actions/order";
import { getEnabledPaymentMethodsAction } from "@/lib/actions/payments";

type Step = "info" | "address" | "payment" | "review" | "success";
type PaymentMethod = "COD" | "EASYPAISA" | "JAZZCASH";

const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  COD: "Cash on Delivery",
  EASYPAISA: "EasyPaisa",
  JAZZCASH: "JazzCash",
};

const PAYMENT_METHOD_ICONS: Record<PaymentMethod, React.ElementType> = {
  COD: Truck,
  EASYPAISA: Smartphone,
  JAZZCASH: Smartphone,
};

interface PaymentOption {
  method: PaymentMethod;
  accountName: string | null;
  accountNumber: string | null;
  instructions: string | null;
}

export default function CheckoutPage() {
  const { data: session, status } = useSession();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);

  const [step, setStep] = useState<Step>("info");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    email: session?.user?.email ?? "",
    phone: "",
  });
  const [address, setAddress] = useState({
    line1: "",
    city: "Karachi",
    province: "Sindh",
    postalCode: "",
    notes: "",
  });

  const [paymentOptions, setPaymentOptions] = useState<PaymentOption[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("COD");
  const [paymentReference, setPaymentReference] = useState("");

  useEffect(() => {
    getEnabledPaymentMethodsAction().then((options) => {
      setPaymentOptions(options);
      if (options.length > 0 && !options.some((o) => o.method === "COD")) {
        setPaymentMethod(options[0].method);
      }
    });
  }, []);

  const subtotal = cartTotal(items);
  const shippingCost = getShippingCost(address.city);
  const grandTotal = subtotal + shippingCost;

  const steps: { id: Step; label: string; icon: React.ElementType }[] = [
    { id: "info", label: "Information", icon: User },
    { id: "address", label: "Shipping", icon: MapPin },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "review", label: "Review", icon: Package },
  ];
  const currentStepIndex = steps.findIndex((s) => s.id === step);

  const placeOrder = async () => {
    setIsProcessing(true);
    setError("");
    const res = await createOrderAction({
      fullName: `${info.firstName} ${info.lastName}`.trim(),
      phone: info.phone,
      email: info.email,
      addressLine: address.line1,
      city: address.city,
      province: address.province,
      postalCode: address.postalCode,
      specialInstructions: address.notes,
      paymentMethod,
      paymentReference: paymentReference || undefined,
      items,
    });
    setIsProcessing(false);
    if ("error" in res) {
      setError(res.error);
      return;
    }
    setOrderNumber(res.orderNumber);
    clear();
    setStep("success");
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center">
        <Loader2 size={28} className="animate-spin text-[#D4AF37]" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center bg-[#111] border border-[#282828] rounded-2xl p-8">
          <h1 className="text-white text-2xl font-bold mb-2 font-sans">Sign in to check out</h1>
          <p className="text-gray-400 text-sm mb-6">
            You need an account to place an order — this lets you track your order and view its history anytime.
          </p>
          <div className="space-y-3">
            <Link href="/login" className="block w-full py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] transition-colors">
              Log In
            </Link>
            <Link href="/register" className="block w-full py-3 bg-[#0d0d0d] border border-[#333] text-white rounded-xl font-semibold hover:bg-[#1a1a1a] transition-colors">
              Create Account
            </Link>
          </div>
          <p className="text-gray-500 text-xs mt-6">Your cart is saved — it&apos;ll still be here after you sign in.</p>
        </div>
      </div>
    );
  }

  if (items.length === 0 && step !== "success") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-400 mb-4">Your cart is empty</p>
          <Link href="/shop" className="px-6 py-3 bg-[#D4AF37] text-black rounded-xl font-bold">Browse Products</Link>
        </div>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="min-h-screen bg-[#0a0a0a] pt-20 flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg w-full text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check size={48} className="text-black" />
          </motion.div>
          <h1 className="text-white text-3xl font-bold mb-3 font-sans">Order Placed!</h1>
          <p className="text-gray-400 mb-4">Thank you for your order. We&apos;ll start production shortly.</p>
          <div className="bg-[#111] border border-[#D4AF37]/30 rounded-2xl p-6 mb-8">
            <p className="text-gray-400 text-sm mb-1">Order Number</p>
            <p className="text-[#D4AF37] font-bold text-xl">{orderNumber}</p>
            <div className="mt-4 pt-4 border-t border-[#1e1e1e] text-left space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Delivery to</span>
                <span className="text-white">{address.city}, Pakistan</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Payment</span>
                <span className="text-white">{PAYMENT_METHOD_LABELS[paymentMethod]}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Total Due</span>
                <span className="text-[#D4AF37] font-bold">{formatPKR(grandTotal)}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <Link href="/account/orders" className="block w-full py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] transition-all">
              Track Your Order
            </Link>
            <Link href="/shop" className="block w-full py-3 bg-[#111] border border-[#333] text-white rounded-xl hover:bg-[#1a1a1a] transition-all">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#D4AF37] text-sm transition-colors mb-4">
            <ArrowLeft size={16} /> Back to Cart
          </Link>
          <h1 className="text-white text-2xl font-bold font-sans">Checkout</h1>
        </div>

        <div className="flex items-center mb-8 overflow-x-auto pb-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isCompleted = i < currentStepIndex;
            const isCurrent = s.id === step;
            return (
              <div key={s.id} className="flex items-center">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${isCurrent ? "bg-[#D4AF37] text-black" : isCompleted ? "bg-emerald-500/20 text-emerald-400" : "text-gray-500"}`}>
                  {isCompleted ? <Check size={15} /> : <Icon size={15} />}
                  <span className="hidden sm:block">{s.label}</span>
                </div>
                {i < steps.length - 1 && <ChevronRight size={16} className={`mx-1 flex-shrink-0 ${isCompleted ? "text-emerald-400" : "text-gray-700"}`} />}
              </div>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-6">
              <AnimatePresence mode="wait">
                {step === "info" && (
                  <motion.div key="info" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2"><User size={20} className="text-[#D4AF37]" /> Customer Information</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <FormField label="First Name" value={info.firstName} onChange={(v) => setInfo({ ...info, firstName: v })} placeholder="Ahmed" />
                      <FormField label="Last Name" value={info.lastName} onChange={(v) => setInfo({ ...info, lastName: v })} placeholder="Hassan" />
                      <FormField label="Email Address" value={info.email} onChange={(v) => setInfo({ ...info, email: v })} placeholder="ahmed@example.com" type="email" icon={<Mail size={15} />} />
                      <FormField label="Phone Number" value={info.phone} onChange={(v) => setInfo({ ...info, phone: v })} placeholder="+92-300-0000000" type="tel" icon={<Phone size={15} />} />
                    </div>
                    <button
                      onClick={() => setStep("address")}
                      disabled={!info.firstName || !info.lastName || !info.email || !info.phone}
                      className="mt-6 w-full py-4 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                    >
                      Continue to Shipping <ChevronRight size={18} />
                    </button>
                  </motion.div>
                )}

                {step === "address" && (
                  <motion.div key="address" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2"><MapPin size={20} className="text-[#D4AF37]" /> Shipping Address</h2>
                    <div className="space-y-4">
                      <FormField label="Address" value={address.line1} onChange={(v) => setAddress({ ...address, line1: v })} placeholder="House #12, Street 5, Block B" />
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-400 text-sm font-medium mb-2">City</label>
                          <select
                            value={address.city}
                            onChange={(e) => setAddress({ ...address, city: e.target.value })}
                            className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 text-sm"
                          >
                            {PAKISTAN_CITIES.map((city) => (
                              <option key={city} value={city}>{city}</option>
                            ))}
                          </select>
                        </div>
                        <FormField label="Province" value={address.province} onChange={(v) => setAddress({ ...address, province: v })} placeholder="Sindh" />
                        <FormField label="Postal Code" value={address.postalCode} onChange={(v) => setAddress({ ...address, postalCode: v })} placeholder="75500" />
                      </div>
                      <div>
                        <label className="block text-gray-400 text-sm font-medium mb-2">Special Instructions (Optional)</label>
                        <textarea
                          value={address.notes}
                          onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                          placeholder="Any special delivery instructions..."
                          className="w-full px-4 py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 text-sm resize-none placeholder-gray-600"
                          rows={2}
                        />
                      </div>

                      <div className={`p-4 rounded-xl border ${address.city === "Karachi" ? "bg-emerald-500/10 border-emerald-500/30" : "bg-[#D4AF37]/10 border-[#D4AF37]/30"}`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Truck size={16} className={address.city === "Karachi" ? "text-emerald-400" : "text-[#D4AF37]"} />
                            <span className="text-white text-sm font-medium">Shipping to {address.city}</span>
                          </div>
                          <span className={`font-bold ${address.city === "Karachi" ? "text-emerald-400" : "text-[#D4AF37]"}`}>{formatPKR(shippingCost)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setStep("info")} className="px-6 py-3 bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-xl text-sm hover:text-white transition-colors">← Back</button>
                      <button
                        onClick={() => setStep("payment")}
                        disabled={!address.line1 || !address.city || !address.postalCode}
                        className="flex-1 py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                      >
                        Continue to Payment <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "payment" && (
                  <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-white font-bold text-xl mb-6 flex items-center gap-2"><CreditCard size={20} className="text-[#D4AF37]" /> Payment Method</h2>
                    <div className="space-y-3 mb-6">
                      {paymentOptions.map((option) => {
                        const Icon = PAYMENT_METHOD_ICONS[option.method];
                        const isSelected = paymentMethod === option.method;
                        return (
                          <button
                            key={option.method}
                            type="button"
                            onClick={() => setPaymentMethod(option.method)}
                            className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 text-left transition-colors ${isSelected ? "border-[#D4AF37] bg-[#D4AF37]/10" : "border-[#1e1e1e] hover:border-[#333]"}`}
                          >
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isSelected ? "bg-[#D4AF37] text-black" : "bg-[#1a1a1a] text-gray-400"}`}>
                              <Icon size={18} />
                            </div>
                            <div className="flex-1">
                              <p className="text-white font-semibold text-sm">{PAYMENT_METHOD_LABELS[option.method]}</p>
                              <p className="text-gray-500 text-xs">
                                {option.method === "COD" ? "Pay when you receive your order" : `Transfer to our ${PAYMENT_METHOD_LABELS[option.method]} account`}
                              </p>
                            </div>
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? "border-[#D4AF37] bg-[#D4AF37]" : "border-[#333]"}`}>
                              {isSelected && <Check size={11} className="text-black" />}
                            </div>
                          </button>
                        );
                      })}
                      <div className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-[#1e1e1e] opacity-40 cursor-not-allowed text-left">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#1a1a1a] text-gray-500">
                          <CreditCard size={18} />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-400 font-semibold text-sm">Credit / Debit Card</p>
                          <p className="text-gray-600 text-xs">Coming soon</p>
                        </div>
                      </div>
                    </div>

                    {(() => {
                      const selected = paymentOptions.find((o) => o.method === paymentMethod);
                      if (!selected) return null;
                      if (selected.method === "COD") {
                        return (
                          <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl p-5">
                            <p className="text-gray-300 text-sm">Cash on Delivery is available across all cities in Pakistan. Please have the exact amount ready at the time of delivery.</p>
                            <p className="text-[#D4AF37] font-bold text-lg mt-3">{formatPKR(grandTotal)}</p>
                          </div>
                        );
                      }
                      return (
                        <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-2xl p-5 space-y-3">
                          {(selected.accountName || selected.accountNumber) && (
                            <div className="text-sm">
                              {selected.accountName && <p className="text-white font-medium">{selected.accountName}</p>}
                              {selected.accountNumber && <p className="text-[#D4AF37] font-bold text-lg">{selected.accountNumber}</p>}
                            </div>
                          )}
                          {selected.instructions && <p className="text-gray-400 text-sm">{selected.instructions}</p>}
                          <div>
                            <label className="block text-gray-400 text-xs font-medium mb-1.5">Transaction ID / Reference (optional)</label>
                            <input
                              value={paymentReference}
                              onChange={(e) => setPaymentReference(e.target.value)}
                              placeholder="e.g. TID123456"
                              className="w-full px-4 py-2.5 bg-[#111] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 text-sm placeholder-gray-600"
                            />
                          </div>
                          <p className="text-[#D4AF37] font-bold text-lg">{formatPKR(grandTotal)}</p>
                        </div>
                      );
                    })()}

                    <div className="flex gap-3 mt-6">
                      <button onClick={() => setStep("address")} className="px-6 py-3 bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-xl text-sm hover:text-white transition-colors">← Back</button>
                      <button
                        onClick={() => setStep("review")}
                        disabled={!paymentOptions.some((o) => o.method === paymentMethod)}
                        className="flex-1 py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                      >
                        Review Order <ChevronRight size={18} />
                      </button>
                    </div>
                  </motion.div>
                )}

                {step === "review" && (
                  <motion.div key="review" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                    <h2 className="text-white font-bold text-xl mb-6">Review Your Order</h2>

                    <div className="space-y-3 mb-5">
                      {items.map((item) => (
                        <div key={item.cartId} className="flex gap-3 p-3 bg-[#0d0d0d] rounded-xl">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={item.image} alt={item.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium line-clamp-1">{item.name}</p>
                            <p className="text-gray-500 text-xs">{item.selectedSize} · Qty: {item.quantity}</p>
                          </div>
                          <span className="text-[#D4AF37] font-bold text-sm flex-shrink-0">{formatPKR((item.salePrice ?? item.price) * item.quantity)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-[#0d0d0d] border border-[#1e1e1e] rounded-xl p-4 space-y-2 mb-5">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Delivering to</span>
                        <span className="text-white text-right max-w-xs">{address.line1}, {address.city}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Payment via</span>
                        <span className="text-white">{PAYMENT_METHOD_LABELS[paymentMethod]}</span>
                      </div>
                      <div className="flex justify-between text-sm pt-2 border-t border-[#1a1a1a]">
                        <span className="text-gray-400">Shipping</span>
                        <span className="text-white">{formatPKR(shippingCost)}</span>
                      </div>
                      <div className="flex justify-between font-bold">
                        <span className="text-white">Grand Total</span>
                        <span className="text-[#D4AF37] text-lg">{formatPKR(grandTotal)}</span>
                      </div>
                    </div>

                    {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                    <div className="flex gap-3">
                      <button onClick={() => setStep("payment")} className="px-6 py-3 bg-[#0d0d0d] border border-[#333] text-gray-400 rounded-xl text-sm hover:text-white transition-colors">← Back</button>
                      <button
                        onClick={placeOrder}
                        disabled={isProcessing}
                        className="flex-1 py-4 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] disabled:opacity-70 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                      >
                        {isProcessing ? (
                          <><Loader2 size={18} className="animate-spin" /> Processing...</>
                        ) : (
                          <><Check size={18} /> Place Order — {formatPKR(grandTotal)}</>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div>
            <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5 sticky top-24">
              <h3 className="text-white font-bold mb-4">Order Summary</h3>
              <div className="space-y-3 mb-4 max-h-48 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.cartId} className="flex gap-3">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-[#D4AF37] text-black text-[10px] font-bold rounded-full flex items-center justify-center">{item.quantity}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-xs font-medium line-clamp-1">{item.name}</p>
                      <p className="text-gray-500 text-[10px]">{item.selectedSize}</p>
                    </div>
                    <span className="text-white text-xs font-semibold">{formatPKR((item.salePrice ?? item.price) * item.quantity)}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#1e1e1e] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">{formatPKR(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">{formatPKR(shippingCost)}</span>
                </div>
                <div className="flex justify-between font-bold border-t border-[#1e1e1e] pt-2">
                  <span className="text-white">Total</span>
                  <span className="text-[#D4AF37] text-lg">{formatPKR(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ label, value, onChange, placeholder, type = "text", icon }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-gray-400 text-sm font-medium mb-2">{label}</label>
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">{icon}</div>}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full py-3 bg-[#0d0d0d] border border-[#333] rounded-xl text-white outline-none focus:border-[#D4AF37]/50 transition-colors text-sm placeholder-gray-600 ${icon ? "pl-10 pr-4" : "px-4"}`}
        />
      </div>
    </div>
  );
}
