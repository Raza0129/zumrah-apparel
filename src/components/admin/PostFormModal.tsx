"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createPostAction, updatePostAction } from "@/lib/actions/blog";

export interface PostFormValues {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: string;
  published: boolean;
  metaTitle: string;
  metaDescription: string;
}

const EMPTY: PostFormValues = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "",
  content: "",
  published: false,
  metaTitle: "",
  metaDescription: "",
};

export function PostFormModal({
  initial,
  onClose,
}: {
  initial?: PostFormValues;
  onClose: () => void;
}) {
  const [values, setValues] = useState<PostFormValues>(initial ?? EMPTY);
  const [pending, setPending] = useState(false);

  const set = <K extends keyof PostFormValues>(key: K, val: PostFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = values.id
      ? await updatePostAction(values.id, values)
      : await createPostAction(values);

    setPending(false);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    toast.success(values.id ? "Post updated" : "Post created");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111] border border-[#282828] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e] sticky top-0 bg-[#111]">
          <h2 className="text-white font-bold">{values.id ? "Edit Post" : "Add Post"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Title">
              <input required value={values.title} onChange={(e) => set("title", e.target.value)} className="input" />
            </Field>
            <Field label="Slug (URL)">
              <input required value={values.slug} onChange={(e) => set("slug", e.target.value)} className="input" />
            </Field>
          </div>
          <Field label="Cover Image URL (optional)">
            <input value={values.coverImage} onChange={(e) => set("coverImage", e.target.value)} placeholder="https://..." className="input" />
          </Field>
          <Field label="Excerpt (optional, shown on listing)">
            <textarea rows={2} value={values.excerpt} onChange={(e) => set("excerpt", e.target.value)} className="input resize-none" />
          </Field>
          <Field label="Content">
            <textarea required rows={10} value={values.content} onChange={(e) => set("content", e.target.value)} className="input resize-none font-mono text-xs" />
          </Field>
          <label className="flex items-center gap-2 text-gray-300 text-sm">
            <input type="checkbox" checked={values.published} onChange={(e) => set("published", e.target.checked)} />
            Published (visible on public blog)
          </label>

          <div className="pt-2 border-t border-[#1e1e1e]">
            <p className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wide">SEO (optional — auto-generated if left blank)</p>
            <div className="space-y-4">
              <Field label="SEO Title">
                <input value={values.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} placeholder={values.title ? `${values.title} | Zumrah Apparel` : "Auto-generated from post title"} className="input" />
              </Field>
              <Field label="SEO Description">
                <textarea rows={2} value={values.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} placeholder="Auto-generated from excerpt/content (max 160 characters)" className="input resize-none" />
              </Field>
            </div>
          </div>

          <button type="submit" disabled={pending} className="w-full py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] disabled:opacity-50 transition-colors">
            {pending ? "Saving..." : values.id ? "Update Post" : "Create Post"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .input {
          width: 100%;
          padding: 0.65rem 1rem;
          background: #0d0d0d;
          border: 1px solid #333;
          border-radius: 0.75rem;
          color: white;
          font-size: 0.875rem;
          outline: none;
        }
        .input:focus {
          border-color: rgba(212, 175, 55, 0.5);
        }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-gray-400 text-sm font-medium mb-1.5">{label}</label>
      {children}
    </div>
  );
}
