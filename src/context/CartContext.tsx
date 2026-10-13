import type { PropsWithChildren } from 'react';
import type { CartItem, Product, Order, CheckoutData, CartContextValue } from '../types';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'cycle-shop-cart';

export const CartContext = createContext<CartContextValue | null>(null);

const readStoredCart = (): CartItem[] => {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState(readStoredCart);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product: Product) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...currentItems, { ...product, quantity: 1 }];
    });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems((currentItems) =>
        currentItems.filter((item) => item.id !== productId),
      );
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }, []);

  const removeItem = useCallback((productId: number) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const placeOrder = useCallback((checkoutData: CheckoutData) => {
    const order = {
      id: `ORD-${Date.now()}`,
      items,
      totalPrice: items.reduce(
        (total, item) => total + item.preco * item.quantity,
        0,
      ),
      checkoutData,
      placedAt: new Date().toISOString(),
    };

    setLastOrder(order);
    setItems([]);
    return order;
  }, [items]);

  const value = useMemo(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce(
      (total, item) => total + item.preco * item.quantity,
      0,
    );

    return {
      items,
      itemCount,
      totalPrice,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
      lastOrder,
      placeOrder,
    };
  }, [addItem, clearCart, items, lastOrder, placeOrder, removeItem, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
