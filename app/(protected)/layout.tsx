"use client";

import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/use-auth-store";
import Loader from "@/components/loader";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  // redirect if not logged in
  if (!loading && !user) {
    router.replace("/unauthorized");
    return null;
  }

  return (
    <div className="min-h-[34rem]">
      {loading ? (
        <Loader/>
      ) : (
        user && children
      )}
    </div>
  );
}
