"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { deletePostAction, togglePostPublishedAction } from "@/lib/actions/blog";
import { PostFormModal, type PostFormValues } from "@/components/admin/PostFormModal";

interface AdminPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  content: string;
  published: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  createdAt: Date;
}

function toFormValues(p: AdminPost): PostFormValues {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    excerpt: p.excerpt ?? "",
    coverImage: p.coverImage ?? "",
    content: p.content,
    published: p.published,
    metaTitle: p.metaTitle ?? "",
    metaDescription: p.metaDescription ?? "",
  };
}

export function PostsClient({ posts }: { posts: AdminPost[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<PostFormValues | undefined>(undefined);

  const openCreate = () => {
    setEditing(undefined);
    setModalOpen(true);
  };

  const openEdit = (p: AdminPost) => {
    setEditing(toFormValues(p));
    setModalOpen(true);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    const res = await deletePostAction(id);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    toast.success("Post deleted");
  };

  const handleTogglePublished = async (id: string, published: boolean) => {
    const res = await togglePostPublishedAction(id, !published);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    toast.success(published ? "Post unpublished" : "Post published");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold font-sans">Blog Posts ({posts.length})</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-black rounded-xl text-sm font-semibold hover:bg-[#C49B2A] transition-colors">
          <Plus size={16} /> Add Post
        </button>
      </div>

      {posts.length === 0 ? (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-10 text-center">
          <p className="text-gray-500">No blog posts yet.</p>
        </div>
      ) : (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e1e] text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">Post</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Created</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((p) => (
                  <tr key={p.id} className="border-b border-[#1a1a1a] last:border-0">
                    <td className="px-4 py-3">
                      <p className="text-white font-medium line-clamp-1">{p.title}</p>
                      <p className="text-gray-500 text-xs">/blog/{p.slug}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${p.published ? "bg-emerald-500/10 text-emerald-400" : "bg-gray-500/10 text-gray-500"}`}>
                        {p.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{p.createdAt.toLocaleDateString("en-PK")}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleTogglePublished(p.id, p.published)} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5" title={p.published ? "Unpublish" : "Publish"}>
                          {p.published ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                        <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-[#D4AF37] rounded-lg hover:bg-white/5">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDelete(p.id, p.title)} className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-400/10">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {modalOpen && <PostFormModal initial={editing} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
