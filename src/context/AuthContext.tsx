import type { PropsWithChildren } from 'react';
import type { User, AuthContextValue } from '../types';
import { createContext, useEffect, useMemo, useState } from 'react';

const STORAGE_KEY = 'cycle-shop-auth';

export const AuthContext = createContext<AuthContextValue | null>(null);

const readStoredUser = (): User | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const storedValue = window.localStorage.getItem(STORAGE_KEY);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState(readStoredUser);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      return;
    }

    window.localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = ({ email, name }: { email: string; name?: string }) => {
    const normalizedName =
      name?.trim() || email.split('@')[0].replace(/[._-]+/g, ' ');

    const nextUser = {
      email,
      name: normalizedName.replace(/\b\w/g, (character) => character.toUpperCase()),
    };

    setUser(nextUser);
    return nextUser;
  };

  const signup = ({ email, name }: User) => {
    const nextUser = {
      email,
      name: name.trim(),
    };

    setUser(nextUser);
    return nextUser;
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      signup,
      logout,
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
