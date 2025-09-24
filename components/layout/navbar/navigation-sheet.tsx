import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import Link from "next/link";


export const NavigationSheet = () => {
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

        <div className="mt-8 space-y-4">
          {/* sign in button */}
          <div>
            <Link href="/login">
              <Button variant="outline" className="w-full sm:hidden font-mono font-bold"> SIGN IN </Button>
            </Link>
          </div>
          {/* sign up button */}
          <div>
            <Link href="/signup">
              <Button className="w-full xs:hidden font-mono font-bold">CREATE ACCOUNT</Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
