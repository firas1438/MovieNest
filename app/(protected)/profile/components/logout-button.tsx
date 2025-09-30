"use client";

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { signout } from "@/lib/supabase/services";
import { cn } from "@/lib/utils";

type LogoutButtonProps = {
  variant?: "default" | "secondary" | "destructive" | "outline"; 
  classname?: string; 
};

export default function LogoutButton({ variant = "secondary", classname, }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await signout();

    if (!error) {
      toast({ title: "Logout successful.", description: "Sign in to access your account again." });
      router.push("/login");
    } else {
      toast({ title: "Logout failed.", description: error.message, variant: "destructive", });
    }
  };

  return (
    <AlertDialog>
      {/* trigger */}
      <AlertDialogTrigger asChild>
        <Button variant={variant} className={cn(classname)}>
          <LogOutIcon className="mr-1 h-4 w-4" />
          Sign Out
        </Button>
      </AlertDialogTrigger>
      {/* alert dialog */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
          <AlertDialogDescription>
            This will end your current session. You will need to log in again to access your account.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} className="bg-destructive text-white hover:bg-destructive/90" > Confirm </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
