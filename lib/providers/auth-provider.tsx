"use client";

import { useEffect } from "react";
import { useAuthStore } from "../store/use-auth-store";
import { createClient } from "@/lib/supabase/client";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser, setLoading } = useAuthStore();
  const supabase = createClient();

  useEffect(() => {
    
    // 1) initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false); 
    });

    // 2) real-time listener for login/logout
    const { data: { subscription }, } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // 3) cleanup on unmount
    return () => subscription.unsubscribe();

  }, [supabase, setUser, setLoading]);

  return <>{children}</>;
}
