import type { PropsWithChildren } from 'react';
import type { FavoritesContextValue } from '../types';
import { createContext, useCallback, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'cycle-shop-favorites';

export const FavoritesContext = createContext<FavoritesContextValue | null>(null);

const readStoredFavorites = (): number[] => {
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

export const FavoritesProvider = ({ children }: PropsWithChildren) => {
  const [favoriteIds, setFavoriteIds] = useState(readStoredFavorites);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favoriteIds));
  }, [favoriteIds]);

  const toggleFavorite = useCallback((productId: number) => {
    setFavoriteIds((currentIds) =>
      currentIds.includes(productId)
        ? currentIds.filter((id) => id !== productId)
        : [...currentIds, productId],
    );
  }, []);

  const isFavorite = useCallback(
    (productId: number) => favoriteIds.includes(productId),
    [favoriteIds],
  );

  const clearFavorites = useCallback(() => {
    setFavoriteIds([]);
  }, []);

  const value = useMemo(
    () => ({
      favoriteIds,
      favoritesCount: favoriteIds.length,
      toggleFavorite,
      isFavorite,
      clearFavorites,
    }),
    [clearFavorites, favoriteIds, isFavorite, toggleFavorite],
  );

  return (
    <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
  );
};
