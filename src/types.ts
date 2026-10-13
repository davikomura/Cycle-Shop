import type { getCompleteBikeCatalog } from './lib/catalog';

export type Product = ReturnType<typeof getCompleteBikeCatalog>[number];
export interface User { email: string; name: string }
export interface CartItem extends Product { quantity: number }
export interface CheckoutData { customer: string; email: string; address: string; city: string; cardLast4: string }
export interface Order { id: string; items: CartItem[]; totalPrice: number; checkoutData: CheckoutData; placedAt: string }
export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: { email: string; name?: string }) => User;
  signup: (credentials: User) => User;
  logout: () => void;
}
export interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  totalPrice: number;
  addItem: (product: Product) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  lastOrder: Order | null;
  placeOrder: (checkoutData: CheckoutData) => Order;
}
export interface FavoritesContextValue {
  favoriteIds: number[];
  favoritesCount: number;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  clearFavorites: () => void;
}
