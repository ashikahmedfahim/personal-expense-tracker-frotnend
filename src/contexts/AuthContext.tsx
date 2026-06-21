"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";

import * as authApi from "@/lib/api/auth";
import {
  clearToken,
  decodeToken,
  getToken,
  isTokenExpired,
  setToken,
} from "@/lib/auth/token";
import type { JwtPayload } from "@/types/api";

interface AuthContextValue {
  user: JwtPayload | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<JwtPayload | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token && !isTokenExpired(token)) {
      setUser(decodeToken(token));
    } else if (token) {
      clearToken();
    }
    setIsLoading(false);
  }, []);

  const login = useCallback(
    async (email: string, password: string) => {
      const token = await authApi.login({ email, password });
      setToken(token);
      setUser(decodeToken(token));
      router.push("/dashboard");
    },
    [router],
  );

  const register = useCallback(
    async (firstName: string, lastName: string, email: string, password: string) => {
      await authApi.register({ firstName, lastName, email, password });
      const token = await authApi.login({ email, password });
      setToken(token);
      setUser(decodeToken(token));
      router.push("/dashboard");
    },
    [router],
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      register,
      logout,
    }),
    [user, isLoading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
