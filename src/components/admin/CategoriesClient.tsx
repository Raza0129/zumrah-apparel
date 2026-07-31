"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, X, FolderTree } from "lucide-react";
import { toast } from "sonner";
import { createCategoryAction, updateCategoryAction, deleteCategoryAction } from "@/lib/actions/category";

interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

export function CategoriesClient({ categories }: { categories: AdminCategory[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCategory | null>(null);
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);

  const openCreate = () => {
    setEditing(null);
    setName("");
    setModalOpen(true);
  };

  const openEdit = (c: AdminCategory) => {
    setEditing(c);
    setName(c.name);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);
    const res = editing ? await updateCategoryAction(editing.id, name) : await createCategoryAction(name);
    setPending(false);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    toast.success(editing ? "Category updated" : "Category created");
    setModalOpen(false);
  };

  const handleDelete = async (c: AdminCategory) => {
    if (!confirm(`Delete "${c.name}"? Products in this category will become uncategorized.`)) return;
    const res = await deleteCategoryAction(c.id);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    toast.success("Category deleted");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-500 text-sm">{categories.length} total categories</p>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-black rounded-xl text-sm font-semibold hover:bg-[#C49B2A] transition-colors">
          <Plus size={16} /> Add Category
        </button>
      </div>

      {categories.length === 0 ? (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl p-10 text-center">
          <FolderTree size={32} className="text-gray-700 mx-auto mb-3" />
          <p className="text-gray-500">No categories yet.</p>
        </div>
      ) : (
        <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#1e1e1e] text-left text-gray-500">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Slug</th>
                  <th className="px-4 py-3 font-medium">Products</th>
                  <th className="px-4 py-3 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((c) => (
                  <tr key={c.id} className="border-b border-[#1a1a1a] last:border-0">
                    <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-gray-500">{c.slug}</td>
                    <td className="px-4 py-3 text-gray-300">{c.productCount}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(c)} className="p-1.5 text-gray-400 hover:text-[#D4AF37] rounded-lg hover:bg-white/5">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDelete(c)} className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-400/10">
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

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111] border border-[#282828] rounded-2xl max-w-sm w-full">
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e]">
              <h2 className="text-white font-bold">{editing ? "Edit Category" : "Add Category"}</h2>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-400 text-sm font-medium mb-1.5">Name</label>
                <input
                  required
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#0d0d0d] border border-[#333] rounded-xl text-white text-sm outline-none focus:border-[#D4AF37]/50"
                />
              </div>
              <button type="submit" disabled={pending} className="w-full py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] disabled:opacity-50 transition-colors">
                {pending ? "Saving..." : editing ? "Update Category" : "Create Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
