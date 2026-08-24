import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Cart } from "../lib/types";
import { addToCart, getCart, removeCartLine, updateCartLine } from "../lib/shopify";
interface CartCtx {
  cart: Cart | null; isOpen: boolean; isLoading: boolean; error: string | null;
  openCart: () => void; closeCart: () => void;
  addItem: (variantId: string, qty?: number) => Promise<void>;
  updateItem: (lineId: string, qty: number) => Promise<void>;
  removeItem: (lineId: string) => Promise<void>;
}
const CartContext = createContext<CartCtx | null>(null);
export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => { getCart().then(setCart); }, []);
  const addItem = useCallback(async (variantId: string, qty = 1) => {
    setIsLoading(true); setError(null);
    const r = await addToCart(variantId, qty);
    setIsLoading(false);
    if (!r.ok) { setError(r.error); return; }
    setCart(r.data); setIsOpen(true);
  }, []);
  const updateItem = useCallback(async (lineId: string, qty: number) => {
    setIsLoading(true); setError(null);
    const r = await updateCartLine(lineId, qty);
    setIsLoading(false);
    if (!r.ok) { setError(r.error); return; }
    setCart(r.data);
  }, []);
  const removeItem = useCallback(async (lineId: string) => {
    setIsLoading(true); setError(null);
    const r = await removeCartLine(lineId);
    setIsLoading(false);
    if (!r.ok) { setError(r.error); return; }
    setCart(r.data);
  }, []);
  return (
    <CartContext.Provider value={{ cart, isOpen, isLoading, error, openCart: () => setIsOpen(true), closeCart: () => setIsOpen(false), addItem, updateItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart outside CartProvider");
  return ctx;
}
