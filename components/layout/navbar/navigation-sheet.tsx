"use client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ExternalLinkIcon, ForwardIcon, Menu, User2Icon } from "lucide-react";
import { Logo } from "./logo";
import Link from "next/link";
import { useAuthStore } from "@/lib/store/use-auth-store";
import LogoutButton from "@/app/(protected)/profile/components/logout-button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu";

export const NavigationSheet = () => {
  const { user } = useAuthStore();

  return (
    <Sheet>
      <VisuallyHidden>
        <SheetTitle>Navigation Drawer</SheetTitle>
      </VisuallyHidden>
      {/* sidebar trigger (menu icon) */}
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu />
        </Button>
      </SheetTrigger>
      {/* sidebar content */}
      <SheetContent>
        {/* logo */}
        <Logo />

        {/* navigation menu */}
        <NavigationMenu orientation="vertical" className="mt-12">
          <NavigationMenuList className="gap-1.5 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <SheetClose asChild>
                  <Button asChild variant="ghost" className="rounded-xl font-sans w-full">
                    <Link href="/movies">MOVIES</Link>
                  </Button>
                </SheetClose>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <SheetClose asChild>
                  <Button asChild variant="ghost" className="rounded-xl font-sans w-full">
                    <Link href="/shows">SHOWS</Link>
                  </Button>
                </SheetClose>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <SheetClose asChild>
                  <Button asChild variant="ghost" className="rounded-xl font-sans w-full">
                    <Link href="/celebrities">CELEBRITIES</Link>
                  </Button>
                </SheetClose>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <SheetClose asChild>
                  <Button asChild variant="ghost" className="rounded-xl font-sans w-full">
                    <Link href="/bookmarks">BOOKMARKS</Link>
                  </Button>
                </SheetClose>
              </NavigationMenuLink>
            </NavigationMenuItem>

          </NavigationMenuList>
        </NavigationMenu>

        {/* auth buttons */}
        <div>
          {user ? (
            <div className="mt-8 space-y-4">
              <SheetClose asChild>
                <Button asChild variant="default" className="w-full font-mono font-bold">
                  <Link href="/profile">
                    <User2Icon className="mr-1 h-4 w-4" /> PROFILE
                  </Link>
                </Button>
              </SheetClose>

              <LogoutButton variant="destructive" classname="w-full font-mono uppercase font-bold"/>
            </div>
          ) : (
            <div className="mt-8 space-y-4">
              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full font-mono font-bold">
                  <Link href="/login">
                    <ForwardIcon className="mr-1 h-4 w-4" /> SIGN IN
                  </Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button asChild className="w-full font-mono font-bold">
                  <Link href="/signup">
                    <ExternalLinkIcon className="mr-1 h-4 w-4" /> CREATE ACCOUNT
                  </Link>
                </Button>
              </SheetClose>
            </div>
          )}
        </div>

      </SheetContent>
    </Sheet>
  );
};
