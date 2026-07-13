import React, { createContext, useContext, useState, useCallback } from "react";
import type { Product } from "../data/products";

export interface CartItem {
  cartId: string;
  product: Product;
  quantity: number;
  selectedColor: string;
  selectedColorName: string;
  selectedSize: string;
  designPreview?: string;
  customized?: boolean;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

interface AppContextValue {
  cart: CartItem[];
  wishlist: WishlistItem[];
  isLoggedIn: boolean;
  user: { name: string; email: string; phone: string } | null;
  cartCount: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, "cartId">) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  login: (email: string, name: string) => void;
  logout: () => void;
  notification: { message: string; type: "success" | "error" | "info" } | null;
  showNotification: (message: string, type?: "success" | "error" | "info") => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; phone: string } | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.product.salePrice ?? item.product.price) * item.quantity, 0);

  const addToCart = useCallback((item: Omit<CartItem, "cartId">) => {
    const cartId = `${item.product.id}-${item.selectedColor}-${item.selectedSize}-${Date.now()}`;
    setCart((prev) => {
      const existing = prev.find(
        (c) => c.product.id === item.product.id && c.selectedColor === item.selectedColor && c.selectedSize === item.selectedSize && !item.customized
      );
      if (existing) {
        return prev.map((c) => c.cartId === existing.cartId ? { ...c, quantity: c.quantity + item.quantity } : c);
      }
      return [...prev, { ...item, cartId }];
    });
    showNotification("Added to cart!", "success");
  }, []);

  const removeFromCart = useCallback((cartId: string) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  }, []);

  const updateQuantity = useCallback((cartId: string, quantity: number) => {
    if (quantity < 1) return;
    setCart((prev) => prev.map((item) => item.cartId === cartId ? { ...item, quantity } : item));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((product: Product) => {
    setWishlist((prev) => {
      const exists = prev.find((w) => w.product.id === product.id);
      if (exists) {
        showNotification("Removed from wishlist", "info");
        return prev.filter((w) => w.product.id !== product.id);
      }
      showNotification("Added to wishlist!", "success");
      return [...prev, { product, addedAt: new Date().toISOString() }];
    });
  }, []);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.some((w) => w.product.id === productId);
  }, [wishlist]);

  const login = useCallback((email: string, name: string) => {
    setIsLoggedIn(true);
    setUser({ name, email, phone: "+92-300-0000000" });
    showNotification(`Welcome back, ${name}!`, "success");
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    showNotification("Logged out successfully", "info");
  }, []);

  const showNotification = useCallback((message: string, type: "success" | "error" | "info" = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  return (
    <AppContext.Provider value={{
      cart, wishlist, isLoggedIn, user, cartCount, cartTotal,
      addToCart, removeFromCart, updateQuantity, clearCart,
      toggleWishlist, isInWishlist, login, logout,
      notification, showNotification
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
