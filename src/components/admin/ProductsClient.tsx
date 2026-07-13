"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { deleteProductAction, toggleProductHiddenAction } from "@/lib/actions/admin";
import { formatPKR } from "@/lib/shipping";
import { ProductFormModal, type ProductFormValues } from "@/components/admin/ProductFormModal";
import type { ProductColor } from "@/lib/types";

interface AdminProduct {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  salePrice: number | null;
  images: string[];
  printingMethod: "DTF" | "SUBLIMATION";
  colors: ProductColor[];
  sizes: string[];
  material: string;
  features: string[];
  tags: string[];
  isCustomizable: boolean;
  inStock: boolean;
  hidden: boolean;
}

function toFormValues(p: AdminProduct): ProductFormValues {
  return {
    id: p.id,
    name: p.name,
    slug: p.slug,
    sku: p.sku,
    description: p.description,
    price: p.price,
    salePrice: p.salePrice,
    printingMethod: p.printingMethod,
    images: p.images.join(", "),
    colors: p.colors.map((c) => `${c.name}:${c.hex}`).join(", "),
    sizes: p.sizes.join(", "),
    material: p.material,
    features: p.features.join(", "),
    tags: p.tags.join(", "),
    isCustomizable: p.isCustomizable,
    inStock: p.inStock,
  };
}

export function ProductsClient({ products }: { products: AdminProduct[] }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<ProductFormValues | undefined>(undefined);

  const openCreate = () => {
    setEditing(undefined);
    setModalOpen(true);
  };

  const openEdit = (p: AdminProduct) => {
    setEditing(toFormValues(p));
    setModalOpen(true);
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const res = await deleteProductAction(id);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    toast.success("Product deleted");
  };

  const handleToggleHidden = async (id: string, hidden: boolean) => {
    const res = await toggleProductHiddenAction(id, !hidden);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    toast.success(hidden ? "Product shown in shop" : "Product hidden from shop");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-white text-2xl font-bold font-sans">Products ({products.length})</h1>
        <button onClick={openCreate} className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] text-black rounded-xl text-sm font-semibold hover:bg-[#C49B2A] transition-colors">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-[#111] border border-[#1e1e1e] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e1e1e] text-left text-gray-500">
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">SKU</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Method</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[#1a1a1a] last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={p.images[0]} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="text-white font-medium line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-400">{p.sku}</td>
                  <td className="px-4 py-3 text-[#D4AF37] font-bold">{formatPKR(p.salePrice ?? p.price)}</td>
                  <td className="px-4 py-3 text-gray-300">{p.printingMethod}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${p.hidden ? "bg-gray-500/10 text-gray-500" : "bg-emerald-500/10 text-emerald-400"}`}>
                      {p.hidden ? "Hidden" : "Live"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleToggleHidden(p.id, p.hidden)} className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/5" title={p.hidden ? "Show in shop" : "Hide from shop"}>
                        {p.hidden ? <Eye size={15} /> : <EyeOff size={15} />}
                      </button>
                      <button onClick={() => openEdit(p)} className="p-1.5 text-gray-400 hover:text-[#D4AF37] rounded-lg hover:bg-white/5">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)} className="p-1.5 text-gray-400 hover:text-red-400 rounded-lg hover:bg-red-400/10">
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

      {modalOpen && <ProductFormModal initial={editing} onClose={() => setModalOpen(false)} />}
    </div>
  );
}
