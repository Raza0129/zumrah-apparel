import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  salePrice?: number | null;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  designId?: string | null;
  designPreviewUrl?: string | null;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "cartId">) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clear: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(
          (i) =>
            i.productId === item.productId &&
            i.selectedColor === item.selectedColor &&
            i.selectedSize === item.selectedSize &&
            i.designId === item.designId
        );
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.cartId === existing.cartId
                ? { ...i, quantity: i.quantity + item.quantity }
                : i
            ),
          });
          return;
        }
        set({
          items: [
            ...get().items,
            { ...item, cartId: `${item.productId}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` },
          ],
        });
      },
      removeItem: (cartId) =>
        set({ items: get().items.filter((i) => i.cartId !== cartId) }),
      updateQuantity: (cartId, quantity) => {
        if (quantity < 1) return;
        set({
          items: get().items.map((i) =>
            i.cartId === cartId ? { ...i, quantity } : i
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
    { name: "zumrah-cart" }
  )
);

export function cartTotal(items: CartItem[]): number {
  return items.reduce(
    (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
    0
  );
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
