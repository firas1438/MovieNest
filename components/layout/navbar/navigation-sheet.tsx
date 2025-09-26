"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ExternalLinkIcon, ForwardIcon, Menu, User2Icon } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/use-auth-store";
import LogoutButton from "@/app/(protected)/profile/components/logout-button";


export const NavigationSheet = () => {
  const { user } = useAuthStore();

  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHidden>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <Logo />
        <NavMenu orientation="vertical" className="mt-12" />

        {/* show buttons based on user auth state */}
        {user ? (
          <div className="mt-8 space-y-4">
            {/* profile button */}
            <div>
              <Link href="/profile">
                <Button variant="default" className="w-full font-mono font-bold"> <User2Icon className="mr-1 h-4 w-4"/> PROFILE </Button>
              </Link>
            </div>
            {/* logout button */}
            <div>
              <LogoutButton variant="destructive" classname="w-full font-mono uppercase font-bold"/>
            </div>
          </div>
          ) : (
          <div className="mt-8 space-y-4">
            {/* sign in button */}
            <div>
              <Link href="/login">
                <Button variant="outline" className="w-full font-mono font-bold"> <ForwardIcon className="mr-1 h-4 w-4"/> SIGN IN </Button>
              </Link>
            </div>
            {/* sign up button */}
            <div>
              <Link href="/signup">
                <Button className="w-full font-mono font-bold"> <ExternalLinkIcon className="mr-1 h-4 w-4"/> CREATE ACCOUNT</Button>
              </Link>
            </div>
          </div>
          )
        }

      </SheetContent>
    </Sheet>
  );
  
};
