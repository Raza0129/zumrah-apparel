import { prisma } from "@/lib/prisma";
import { PostsClient } from "@/components/admin/PostsClient";

export default async function AdminBlogPage() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return <PostsClient posts={posts} />;
}
