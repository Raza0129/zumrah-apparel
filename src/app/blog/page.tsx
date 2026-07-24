import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Blog | Zumrah Apparel",
  description: "News, guides and updates on DTF and sublimation printing from Zumrah Apparel.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-white text-3xl font-bold font-sans mb-2">
          Zumrah <span className="text-[#D4AF37]">Blog</span>
        </h1>
        <p className="text-gray-400 mb-10">News, guides and updates from Zumrah Apparel.</p>

        {posts.length === 0 ? (
          <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-10 text-center">
            <p className="text-gray-500">No posts published yet. Check back soon.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden hover:border-[#D4AF37]/40 transition-colors"
              >
                {post.coverImage && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverImage} alt={post.title} className="w-full h-44 object-cover" />
                )}
                <div className="p-5">
                  <p className="text-gray-500 text-xs mb-2">{post.createdAt.toLocaleDateString("en-PK")}</p>
                  <h2 className="text-white font-semibold text-lg mb-2 group-hover:text-[#D4AF37] transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  {post.excerpt && <p className="text-gray-400 text-sm line-clamp-3">{post.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
