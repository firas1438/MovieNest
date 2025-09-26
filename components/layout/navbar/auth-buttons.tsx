"use client";

import { Button } from "@/components/ui/button";
import { LogInIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/use-auth-store";
import { Skeleton } from "@/components/ui/skeleton";

const AuthButtons = () => {
  const { user, loading } = useAuthStore();

  return (
    <Link href={user ? "/profile" : "/login"}>
      <Button variant="outline" className="hidden sm:inline-flex font-sans">
        {loading ? (
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded" /> 
            <Skeleton className="w-16 h-4 rounded" /> 
          </div>
        ) : (
          <div className="flex items-center gap-2">
            {user ? <UserIcon /> : <LogInIcon />}
            <span className="w-16 text-center"> {user ? "PROFILE" : "SIGN IN"} </span>
          </div>
        )}
      </Button>
    </Link>
  );
};

export default AuthButtons;
