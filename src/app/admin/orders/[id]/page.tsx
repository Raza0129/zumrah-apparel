import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatPKR } from "@/lib/shipping";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";
import { PaymentStatusSelect } from "@/components/admin/PaymentStatusSelect";
import { DeleteOrderButton } from "@/components/admin/DeleteOrderButton";

const PAYMENT_METHOD_LABELS: Record<string, string> = {
  COD: "Cash on Delivery",
  EASYPAISA: "EasyPaisa",
  JAZZCASH: "JazzCash",
};

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      user: true,
      items: { include: { design: true, product: true } },
    },
  });

  if (!order) notFound();

  return (
    <div>
      <Link href="/admin/orders" className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-sm mb-6 transition-colors">
        <ArrowLeft size={15} /> Back to Orders
      </Link>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
        <div>
          <h1 className="text-white text-2xl font-bold font-sans">{order.orderNumber}</h1>
          <p className="text-gray-500 text-sm mt-1">
            Placed {order.createdAt.toLocaleDateString("en-PK", { year: "numeric", month: "long", day: "numeric" })}
            {order.user && <> · {order.user.name} ({order.user.email})</>}
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <PaymentStatusSelect orderId={order.id} status={order.paymentStatus} />
          <OrderStatusSelect orderId={order.id} status={order.status} />
          <DeleteOrderButton orderId={order.id} orderNumber={order.orderNumber} redirectTo="/admin/orders" />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
            <h2 className="text-white font-bold mb-4">Items</h2>
            <div className="space-y-5">
              {order.items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-4 border-b border-[#1a1a1a] pb-5 last:border-0 last:pb-0">
                  <div className="flex gap-2 flex-shrink-0">
                    {item.design?.frontPreviewUrl || item.design?.backPreviewUrl ? (
                      <>
                        {item.design.frontPreviewUrl && (
                          <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.design.frontPreviewUrl} alt="Front design" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-[#333]" />
                            <p className="text-gray-600 text-[9px] text-center mt-1">Front</p>
                          </div>
                        )}
                        {item.design.backPreviewUrl && (
                          <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={item.design.backPreviewUrl} alt="Back design" className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-[#333]" />
                            <p className="text-gray-600 text-[9px] text-center mt-1">Back</p>
                          </div>
                        )}
                      </>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.designPreviewUrl ?? item.product.images[0]}
                        alt={item.productName}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover border border-[#333]"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    {(item.designId || item.designPreviewUrl) && (
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-1.5">
                        <Sparkles size={10} className="text-[#D4AF37]" />
                        <span className="text-[#D4AF37] text-[10px] font-semibold">Custom Design</span>
                      </div>
                    )}
                    <p className="text-white font-medium">{item.productName}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="w-4 h-4 rounded-full border border-[#333]" style={{ backgroundColor: item.selectedColor }} />
                      <span className="text-gray-500 text-xs">{item.selectedColor} · Size {item.selectedSize} · Qty {item.quantity}</span>
                    </div>
                    <p className="text-[#D4AF37] font-bold mt-2">{formatPKR(item.unitPrice * item.quantity)}</p>
                    <p className="text-gray-600 text-xs">{formatPKR(item.unitPrice)} each</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
            <h2 className="text-white font-bold mb-4">Customer & Shipping</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Name</span><span className="text-white">{order.fullName}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="text-white">{order.phone}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Email</span><span className="text-white">{order.email}</span></div>
              <div className="flex justify-between gap-4"><span className="text-gray-500 flex-shrink-0">Address</span><span className="text-white text-right">{order.addressLine}, {order.city}, {order.province} {order.postalCode}</span></div>
              {order.specialInstructions && (
                <div className="pt-2 border-t border-[#1a1a1a]">
                  <p className="text-gray-500 mb-1">Special Instructions</p>
                  <p className="text-white">{order.specialInstructions}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-5">
            <h2 className="text-white font-bold mb-4">Payment & Total</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Method</span><span className="text-white">{PAYMENT_METHOD_LABELS[order.paymentMethod] ?? order.paymentMethod}</span></div>
              {order.paymentReference && (
                <div className="flex justify-between"><span className="text-gray-500">Reference</span><span className="text-white">{order.paymentReference}</span></div>
              )}
              <div className="flex justify-between pt-2 border-t border-[#1a1a1a]"><span className="text-gray-500">Subtotal</span><span className="text-white">{formatPKR(order.subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className="text-white">{formatPKR(order.shippingCost)}</span></div>
              {order.discount > 0 && (
                <div className="flex justify-between"><span className="text-gray-500">Discount</span><span className="text-white">-{formatPKR(order.discount)}</span></div>
              )}
              <div className="flex justify-between font-bold pt-2 border-t border-[#1a1a1a]"><span className="text-white">Grand Total</span><span className="text-[#D4AF37] text-lg">{formatPKR(order.grandTotal)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
