"use client";

import { useState } from "react";
import { X, Plus } from "lucide-react";
import { toast } from "sonner";
import { createProductAction, updateProductAction } from "@/lib/actions/admin";
import { STANDARD_COLORS } from "@/lib/colors";
import type { ProductColor } from "@/lib/types";

export interface ProductFormValues {
  id?: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  salePrice: number | null;
  printingMethod: "DTF" | "SUBLIMATION";
  categoryId: string | null;
  images: string; // comma-separated
  colors: ProductColor[];
  sizes: string; // comma-separated
  material: string;
  features: string; // comma-separated
  tags: string; // comma-separated
  isCustomizable: boolean;
  inStock: boolean;
  metaTitle: string;
  metaDescription: string;
}

const EMPTY: ProductFormValues = {
  name: "",
  slug: "",
  sku: "",
  description: "",
  price: 0,
  salePrice: null,
  printingMethod: "DTF",
  categoryId: null,
  images: "",
  colors: STANDARD_COLORS,
  sizes: "S, M, L, XL",
  material: "",
  features: "",
  tags: "",
  isCustomizable: true,
  inStock: true,
  metaTitle: "",
  metaDescription: "",
};

function parseCsv(value: string): string[] {
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

export function ProductFormModal({
  initial,
  categories,
  onClose,
}: {
  initial?: ProductFormValues;
  categories: { id: string; name: string }[];
  onClose: () => void;
}) {
  const [values, setValues] = useState<ProductFormValues>(initial ?? EMPTY);
  const [pending, setPending] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customHex, setCustomHex] = useState("#000000");

  const set = <K extends keyof ProductFormValues>(key: K, val: ProductFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const toggleColor = (color: ProductColor) => {
    const exists = values.colors.some((c) => c.hex.toLowerCase() === color.hex.toLowerCase());
    set("colors", exists ? values.colors.filter((c) => c.hex.toLowerCase() !== color.hex.toLowerCase()) : [...values.colors, color]);
  };

  const removeColor = (hex: string) => set("colors", values.colors.filter((c) => c.hex !== hex));

  const addCustomColor = () => {
    if (!customName.trim()) return;
    if (values.colors.some((c) => c.hex.toLowerCase() === customHex.toLowerCase())) {
      toast.error("That color is already added");
      return;
    }
    set("colors", [...values.colors, { name: customName.trim(), hex: customHex }]);
    setCustomName("");
    setCustomHex("#000000");
  };

  const customColors = values.colors.filter((c) => !STANDARD_COLORS.some((s) => s.hex.toLowerCase() === c.hex.toLowerCase()));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (values.colors.length === 0) {
      toast.error("Select at least one color");
      return;
    }
    setPending(true);

    const payload = {
      name: values.name,
      slug: values.slug,
      sku: values.sku,
      description: values.description,
      price: values.price,
      salePrice: values.salePrice,
      printingMethod: values.printingMethod,
      categoryId: values.categoryId || null,
      images: parseCsv(values.images),
      colors: values.colors,
      sizes: parseCsv(values.sizes),
      material: values.material,
      features: parseCsv(values.features),
      tags: parseCsv(values.tags),
      isCustomizable: values.isCustomizable,
      inStock: values.inStock,
      metaTitle: values.metaTitle,
      metaDescription: values.metaDescription,
    };

    const res = values.id
      ? await updateProductAction(values.id, payload)
      : await createProductAction(payload);

    setPending(false);
    if ("error" in res) {
      toast.error(res.error);
      return;
    }
    toast.success(values.id ? "Product updated" : "Product created");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#111] border border-[#282828] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e1e1e] sticky top-0 bg-[#111]">
          <h2 className="text-white font-bold">{values.id ? "Edit Product" : "Add Product"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name">
              <input required value={values.name} onChange={(e) => set("name", e.target.value)} className="input" />
            </Field>
            <Field label="Slug (URL)">
              <input required value={values.slug} onChange={(e) => set("slug", e.target.value)} className="input" />
            </Field>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="SKU">
              <input required value={values.sku} onChange={(e) => set("sku", e.target.value)} className="input" />
            </Field>
            <Field label="Price (PKR)">
              <input required type="number" value={values.price} onChange={(e) => set("price", Number(e.target.value))} className="input" />
            </Field>
            <Field label="Sale Price (optional)">
              <input type="number" value={values.salePrice ?? ""} onChange={(e) => set("salePrice", e.target.value ? Number(e.target.value) : null)} className="input" />
            </Field>
          </div>
          <Field label="Description">
            <textarea required rows={3} value={values.description} onChange={(e) => set("description", e.target.value)} className="input resize-none" />
          </Field>
          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Printing Method">
              <select value={values.printingMethod} onChange={(e) => set("printingMethod", e.target.value as "DTF" | "SUBLIMATION")} className="input">
                <option value="DTF">DTF Printing</option>
                <option value="SUBLIMATION">Sublimation Printing</option>
              </select>
            </Field>
            <Field label="Material">
              <input required value={values.material} onChange={(e) => set("material", e.target.value)} className="input" />
            </Field>
            <Field label="Category">
              <select value={values.categoryId ?? ""} onChange={(e) => set("categoryId", e.target.value || null)} className="input">
                <option value="">— No category —</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Image URLs (comma separated)">
            <input required value={values.images} onChange={(e) => set("images", e.target.value)} placeholder="https://..., https://..." className="input" />
          </Field>

          <Field label="Colors">
            <div className="flex flex-wrap gap-2 mb-3">
              {STANDARD_COLORS.map((c) => {
                const active = values.colors.some((sel) => sel.hex.toLowerCase() === c.hex.toLowerCase());
                return (
                  <button
                    key={c.hex}
                    type="button"
                    onClick={() => toggleColor(c)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${active ? "border-[#D4AF37] bg-[#D4AF37]/10 text-white" : "border-[#333] text-gray-500 hover:border-[#555]"}`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-[#444]" style={{ backgroundColor: c.hex }} />
                    {c.name}
                  </button>
                );
              })}
            </div>

            {customColors.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {customColors.map((c) => (
                  <span key={c.hex} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-white text-xs">
                    <span className="w-3.5 h-3.5 rounded-full border border-[#444]" style={{ backgroundColor: c.hex }} />
                    {c.name}
                    <button type="button" onClick={() => removeColor(c.hex)} className="text-gray-400 hover:text-red-400">
                      <X size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-2 p-2.5 bg-[#0d0d0d] border border-[#333] rounded-xl">
              <input type="color" value={customHex} onChange={(e) => setCustomHex(e.target.value)} className="w-8 h-8 rounded-lg border border-[#333] cursor-pointer bg-transparent" />
              <input
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Custom color name"
                className="flex-1 px-3 py-1.5 bg-[#111] border border-[#333] rounded-lg text-white text-xs outline-none focus:border-[#D4AF37]/50"
              />
              <button type="button" onClick={addCustomColor} className="flex items-center gap-1 px-3 py-1.5 bg-[#111] border border-[#333] text-gray-300 rounded-lg text-xs hover:border-[#D4AF37]/50">
                <Plus size={12} /> Add
              </button>
            </div>
          </Field>

          <Field label="Sizes (comma separated)">
            <input required value={values.sizes} onChange={(e) => set("sizes", e.target.value)} className="input" />
          </Field>
          <Field label="Features (comma separated)">
            <input value={values.features} onChange={(e) => set("features", e.target.value)} className="input" />
          </Field>
          <Field label="Tags (comma separated)">
            <input value={values.tags} onChange={(e) => set("tags", e.target.value)} className="input" />
          </Field>
          <div className="flex gap-6">
            <label className="flex items-center gap-2 text-gray-300 text-sm">
              <input type="checkbox" checked={values.isCustomizable} onChange={(e) => set("isCustomizable", e.target.checked)} />
              Customizable
            </label>
            <label className="flex items-center gap-2 text-gray-300 text-sm">
              <input type="checkbox" checked={values.inStock} onChange={(e) => set("inStock", e.target.checked)} />
              In Stock
            </label>
          </div>

          <div className="pt-2 border-t border-[#1e1e1e]">
            <p className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wide">SEO (optional — auto-generated if left blank)</p>
            <div className="space-y-4">
              <Field label="SEO Title">
                <input value={values.metaTitle} onChange={(e) => set("metaTitle", e.target.value)} placeholder={values.name ? `${values.name} | Zumrah Apparel` : "Auto-generated from product name"} className="input" />
              </Field>
              <Field label="SEO Description">
                <textarea rows={2} value={values.metaDescription} onChange={(e) => set("metaDescription", e.target.value)} placeholder="Auto-generated from description (max 160 characters)" className="input resize-none" />
              </Field>
            </div>
          </div>

          <button type="submit" disabled={pending} className="w-full py-3 bg-[#D4AF37] text-black rounded-xl font-bold hover:bg-[#C49B2A] disabled:opacity-50 transition-colors">
            {pending ? "Saving..." : values.id ? "Update Product" : "Create Product"}
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
