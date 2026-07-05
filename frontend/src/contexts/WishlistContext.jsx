import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const WishlistContext = createContext(null);
const STORAGE_KEY = 'sprout-wishlist';

// NOTE (Phase 2 backend): swap localStorage for GET/POST/DELETE
// /api/wishlist once auth exists — the toggle/has/list API below doesn't
// need to change shape for consumers.
function readInitialWishlist() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readInitialWishlist);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const toggleItem = useCallback((product) => {
    setItems((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      return exists
        ? prev.filter((item) => item.id !== product.id)
        : [...prev, { id: product.id, title: product.title, price: product.price }];
    });
  }, []);

  const hasItem = useCallback((productId) => items.some((item) => item.id === productId), [items]);

  const value = { items, toggleItem, hasItem, count: items.length };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider');
  return ctx;
}
