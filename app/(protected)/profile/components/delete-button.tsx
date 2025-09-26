"use client";

import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel, } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { deleteAccount } from "@/lib/supabase/services";


export default function DeleteButton() {
  const router = useRouter();

  const handleDelete = async () => {
    const { error } = await deleteAccount();

    if (!error) {
      toast({ title: "Account deleted successfully!", description: "Sign in to another account or create a new one", variant: "default", });
      router.push("/login");
    } else {
      toast({ title: "Account deletion failed.", description: error.message, variant: "destructive", });
    }
  };

  return (
    <AlertDialog>
      {/* trigger */}
      <AlertDialogTrigger asChild>
        <Button variant="destructive">
          <Trash2Icon className="mr-1 h-4 w-4" />
          Delete Account
        </Button>
      </AlertDialogTrigger>
      {/* alert dialog */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete your account?</AlertDialogTitle>
          <AlertDialogDescription>
            Once you delete your account, you will have to create a new one. This action cannot be undone. 
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-white hover:bg-destructive/90" > Confirm </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
