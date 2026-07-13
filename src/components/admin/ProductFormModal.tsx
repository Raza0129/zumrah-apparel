"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createProductAction, updateProductAction } from "@/lib/actions/admin";

export interface ProductFormValues {
  id?: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  price: number;
  salePrice: number | null;
  printingMethod: "DTF" | "SUBLIMATION";
  images: string; // comma-separated
  colors: string; // "Name:hex, Name:hex"
  sizes: string; // comma-separated
  material: string;
  features: string; // comma-separated
  tags: string; // comma-separated
  isCustomizable: boolean;
  inStock: boolean;
}

const EMPTY: ProductFormValues = {
  name: "",
  slug: "",
  sku: "",
  description: "",
  price: 0,
  salePrice: null,
  printingMethod: "DTF",
  images: "",
  colors: "White:#FFFFFF, Black:#1C1C1E",
  sizes: "S, M, L, XL",
  material: "",
  features: "",
  tags: "",
  isCustomizable: true,
  inStock: true,
};

function parseCsv(value: string): string[] {
  return value.split(",").map((s) => s.trim()).filter(Boolean);
}

function parseColors(value: string): { name: string; hex: string }[] {
  return parseCsv(value).map((pair) => {
    const [name, hex] = pair.split(":").map((s) => s.trim());
    return { name: name ?? "Color", hex: hex ?? "#000000" };
  });
}

export function ProductFormModal({
  initial,
  onClose,
}: {
  initial?: ProductFormValues;
  onClose: () => void;
}) {
  const [values, setValues] = useState<ProductFormValues>(initial ?? EMPTY);
  const [pending, setPending] = useState(false);

  const set = <K extends keyof ProductFormValues>(key: K, val: ProductFormValues[K]) =>
    setValues((v) => ({ ...v, [key]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const payload = {
      name: values.name,
      slug: values.slug,
      sku: values.sku,
      description: values.description,
      price: values.price,
      salePrice: values.salePrice,
      printingMethod: values.printingMethod,
      images: parseCsv(values.images),
      colors: parseColors(values.colors),
      sizes: parseCsv(values.sizes),
      material: values.material,
      features: parseCsv(values.features),
      tags: parseCsv(values.tags),
      isCustomizable: values.isCustomizable,
      inStock: values.inStock,
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
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Printing Method">
              <select value={values.printingMethod} onChange={(e) => set("printingMethod", e.target.value as "DTF" | "SUBLIMATION")} className="input">
                <option value="DTF">DTF Printing</option>
                <option value="SUBLIMATION">Sublimation Printing</option>
              </select>
            </Field>
            <Field label="Material">
              <input required value={values.material} onChange={(e) => set("material", e.target.value)} className="input" />
            </Field>
          </div>
          <Field label="Image URLs (comma separated)">
            <input required value={values.images} onChange={(e) => set("images", e.target.value)} placeholder="https://..., https://..." className="input" />
          </Field>
          <Field label="Colors (Name:hex, Name:hex)">
            <input required value={values.colors} onChange={(e) => set("colors", e.target.value)} className="input" />
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
