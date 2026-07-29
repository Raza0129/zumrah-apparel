import type { Metadata } from "next";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/shipping";

export const metadata: Metadata = {
  title: "Order Confirmed | Zumrah Apparel",
  robots: { index: false, follow: false },
};

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  COD: "Cash on Delivery",
  EASYPAISA: "EasyPaisa",
  JAZZCASH: "JazzCash",
};

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const { orderNumber } = await params;

  const session = await auth();
  if (!session?.user) {
    redirect(`/login?callbackUrl=${encodeURIComponent(`/order-confirmation/${orderNumber}`)}`);
  }

  const order = await prisma.order.findUnique({
    where: { orderNumber },
    include: { items: true },
  });

  if (!order || (order.userId !== session.user.id && session.user.role !== "ADMIN")) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20 pb-16 px-4">
      <div className="max-w-lg mx-auto text-center pt-8">
        <div className="w-24 h-24 bg-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6">
          <Check size={48} className="text-black" />
        </div>
        <h1 className="text-white text-3xl font-bold mb-3 font-sans">Order Placed!</h1>
        <p className="text-gray-400 mb-8">Thank you for your order. We&apos;ll start production shortly.</p>

        <div className="bg-[#111] border border-[#D4AF37]/30 rounded-2xl p-6 mb-6 text-left">
          <p className="text-gray-400 text-sm mb-1 text-center">Order Number</p>
          <p className="text-[#D4AF37] font-bold text-xl text-center mb-4">{order.orderNumber}</p>

          <div className="space-y-3 mb-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm border-b border-[#1a1a1a] pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-white font-medium">{item.productName}</p>
                  <p className="text-gray-500 text-xs">{item.selectedColor} · {item.selectedSize} · Qty {item.quantity}</p>
                </div>
                <span className="text-gray-300">{formatPKR(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#1e1e1e] space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Delivery to</span>
              <span className="text-white text-right max-w-[60%]">{order.addressLine}, {order.city}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Payment</span>
              <span className="text-white">{PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}</span>
            </div>
            {order.paymentReference && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Reference</span>
                <span className="text-white">{order.paymentReference}</span>
              </div>
            )}
            <div className="flex justify-between text-sm pt-2 border-t border-[#1a1a1a]">
              <span className="text-gray-400">Shipping</span>
              <span className="text-white">{formatPKR(order.shippingCost)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span className="text-white">Total Due</span>
              <span className="text-[#D4AF37]">{formatPKR(order.grandTotal)}</span>
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
      </div>
    </div>
  );
}
