"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { signout } from "@/lib/auth";
import { toast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = createClient();

  // fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        setUser(data.user);
      }
    };

    fetchUser();
  }, [supabase]);

  // handle logout
  const handleLogout = async () => {
    const { error } = await signout();
    if (!error) {
      toast({ title: "Logout successful.", description: "Sign in to access your account again.", variant: "default", });
      router.push("/login");
    } else {
      toast({ title: "Logout failed.", description: error.message , variant: "destructive", });
    }
  };


  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      {user ? (
        <div className="space-y-4">
          <p> <strong>Full Name:</strong> {user.user_metadata.full_name || "N/A"} </p>
          <p> <strong>Email:</strong> {user.email} </p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      ) : (
        <p>No user data found.</p>
      )}
    </div>
  );


}
