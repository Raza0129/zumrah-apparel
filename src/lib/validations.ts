import { z } from "zod";
import { PAKISTAN_CITIES } from "@/lib/shipping";

export const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(10, "Enter a valid phone number").optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type RegisterInput = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(10, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  addressLine: z.string().min(5, "Address is required"),
  city: z.enum(PAKISTAN_CITIES as [string, ...string[]]),
  province: z.string().min(2, "Province is required"),
  postalCode: z.string().min(4, "Enter a valid postal code"),
  specialInstructions: z.string().optional().or(z.literal("")),
});
export type CheckoutInput = z.infer<typeof checkoutSchema>;

export const productSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  sku: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().int().positive(),
  salePrice: z.coerce.number().int().positive().optional().nullable(),
  printingMethod: z.enum(["DTF", "SUBLIMATION"]),
  categoryId: z.string().optional().nullable(),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  colors: z.array(z.object({ name: z.string(), hex: z.string() })).min(1),
  sizes: z.array(z.string()).min(1),
  material: z.string().min(2),
  features: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  isCustomizable: z.boolean().default(true),
  inStock: z.boolean().default(true),
});
export type ProductInput = z.infer<typeof productSchema>;
