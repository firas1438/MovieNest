// src/lib/stores/use-auth-store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      loading: true, 
      setUser: (user) => set({ user }),
      setLoading: (loading) => set({ loading }),
      logout: () => set({ user: null, loading: false }),
    }),
    {
      name: "auth-storage",
      // do not rehydrate user immediately; we'll rely on Supabase for truth
      partialize: (state) => ({ user: state.user }), 
    }
  )
);
