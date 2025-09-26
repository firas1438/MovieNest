"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/components/ui/theme";
import { AuthProvider } from "./auth-provider";
import { Toaster } from "@/components/ui/toaster";


interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <AuthProvider>
        <Toaster />
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
