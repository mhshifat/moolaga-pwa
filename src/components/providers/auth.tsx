"use client";

import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from "react";
import Spinner from "../common/spinner";
import { storage } from "@/utils/storage";

interface AuthState {
  isLoggedIn: boolean;
  isInitializing?: boolean;
}

interface AuthCtxState {
  authState: AuthState;
  login: (authState: AuthState) => void;
}

const AuthCtx = createContext<AuthCtxState | null>(null)

export default function AuthProvider({ children }: PropsWithChildren) {
  const [authState, setAuthState] = useState<AuthState>({
    isLoggedIn: false,
    isInitializing: true
  });

  const login = useCallback((authState: AuthState) => {
    setAuthState({
      ...authState,
      isInitializing: false
    });
  }, []);

  useEffect(() => {
    (async () => {
      const value = await storage.get("MOOLAGA_PWA_CREDENTIALS");
      login({
        isLoggedIn: !!value,
        isInitializing: false
      });
    })();
  }, [])

  if (authState?.isInitializing) return (
    <Spinner fixed size="md" variant="secondary" showTitle className="gap-3" />
  )
  return (
    <AuthCtx.Provider value={{
      authState,
      login
    }}>
      {children}
    </AuthCtx.Provider>
  )
}

export function useAuth() {
  const res = useContext(AuthCtx);
  if (!res) throw new Error("Component needs to be wrapped with `AuthProvider`")
  return res;
}