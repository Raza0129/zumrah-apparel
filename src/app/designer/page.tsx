import Link from "next/link";
import { Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { toProductCard } from "@/lib/serialize";
import { formatPKR } from "@/lib/shipping";

export default async function DesignerPickerPage() {
  const products = await prisma.product.findMany({
    where: { hidden: false, isCustomizable: true },
    orderBy: { createdAt: "asc" },
    take: 8,
  });

  const cards = products.map(toProductCard);

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-4">
            <Sparkles size={14} className="text-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-semibold">Design Studio</span>
          </div>
          <h1 className="text-white text-3xl sm:text-4xl font-bold mb-3">Pick a Product to Customize</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Choose a product below to start designing — add text, upload artwork, switch colors and preview every side before you buy.
          </p>
        </div>

        {cards.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 mb-6">No customizable products are available right now.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 px-5 py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] transition-all">
              Browse Shop
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {cards.map((product) => (
              <Link
                key={product.id}
                href={`/designer/${product.slug}`}
                className="group bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-all"
              >
                <div className="aspect-square overflow-hidden bg-[#0d0d0d]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-white text-sm font-semibold line-clamp-1 mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-[#D4AF37] font-bold text-sm">{formatPKR(product.salePrice ?? product.price)}</span>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-[#D4AF37]">
                    <Sparkles size={12} /> Customize This
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
