"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { postSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/authz";
import { buildMetaTitle, buildMetaDescription } from "@/lib/seo";

type ActionResult = { error: string } | { success: true };

interface PostFormInput {
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: string;
  content: string;
  published: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

function normalize(input: PostFormInput) {
  return {
    ...input,
    excerpt: input.excerpt || null,
    coverImage: input.coverImage || null,
    metaTitle: buildMetaTitle(input.metaTitle, input.title),
    metaDescription: buildMetaDescription(input.metaDescription, input.excerpt || input.content),
  };
}

export async function createPostAction(input: PostFormInput): Promise<ActionResult> {
  const session = await requireAdmin();
  if (!session) return { error: "Forbidden: admin access required" };
  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid post data" };
  }
  await prisma.post.create({ data: { ...normalize(parsed.data), authorId: session.user.id } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function updatePostAction(postId: string, input: PostFormInput): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  const parsed = postSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid post data" };
  }
  await prisma.post.update({ where: { id: postId }, data: normalize(parsed.data) });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function deletePostAction(postId: string): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  await prisma.post.delete({ where: { id: postId } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function togglePostPublishedAction(postId: string, published: boolean): Promise<ActionResult> {
  if (!(await requireAdmin())) return { error: "Forbidden: admin access required" };
  await prisma.post.update({ where: { id: postId }, data: { published } });
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}
