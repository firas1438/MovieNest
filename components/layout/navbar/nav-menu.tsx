import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, } from "@/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const NavMenu = (props: NavigationMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="gap-1.5 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
      <NavigationMenuItem>
        <NavigationMenuLink asChild className="text-sm">
          <Link href="/movies"><Button variant="ghost" className="rounded-xl  font-sans" > MOVIES </Button></Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className="text-sm ">
          <Link href="/shows"><Button variant="ghost" className="rounded-xl  font-sans"> SHOWS </Button></Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className="text-sm ">
          <Link href="/celebrities"><Button variant="ghost" className="rounded-xl  font-sans"> CELEBRITIES </Button></Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink asChild className="text-sm ">
          <Link href="/bookmarks"><Button variant="ghost" className="rounded-xl  font-sans"> BOOKMARKS </Button></Link>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);
