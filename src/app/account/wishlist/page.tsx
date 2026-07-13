import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { toProductCard } from "@/lib/serialize";
import { ProductCard } from "@/components/shop/ProductCard";

export default async function AccountWishlistPage() {
  const session = await auth();
  const wishlist = await prisma.wishlist.findMany({
    where: { userId: session!.user.id },
    orderBy: { addedAt: "desc" },
    include: { product: true },
  });

  return (
    <div>
      <h1 className="text-white text-2xl font-bold mb-6 font-sans">My Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-10 text-center">
          <p className="text-gray-500">Your wishlist is empty. Browse the shop and tap the heart icon to save items.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-5">
          {wishlist.map((w) => (
            <ProductCard key={w.id} product={toProductCard(w.product)} />
          ))}
        </div>
      )}
    </div>
  );
}
