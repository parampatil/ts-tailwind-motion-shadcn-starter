"use client";

import { createContext, useContext, useEffect, ReactNode } from "react";
import { useAuthStore } from "@/lib/store/authStore";
import { onAuthStateChange } from "@/lib/auth";

const AuthContext = createContext<Record<string, never>>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    setLoading(true);

    // Listen for auth state changes
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    // Initial load complete
    setLoading(false);

    return unsubscribe;
  }, [setUser, setLoading]);

  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}
