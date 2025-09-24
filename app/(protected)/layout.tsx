"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Spinner } from "@/components/ui/spinner";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const supabase = createClient();

    // verify user authentication
    useEffect(() => {
        const checkAuth = async () => {
        const { data, error } = await supabase.auth.getUser();
        if (error || !data.user) {
            router.replace("/unauthorized"); // redirect if not logged in
        } else {
            setUser(data.user);
        }
        setLoading(false);
        };

        checkAuth();
    }, [supabase, router]);

    // loader
    if (loading) {
        return (
        <div className="flex items-center justify-center min-h-[34rem]">
            <div className="animate-pulse">
                <p className="text-lg font-bold"><Spinner variant="default"/></p>
            </div>
        </div>
        );
    }

    return (
      <div className="min-h-[34rem]">
        {user && children}
      </div>
    );

}
