import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "@/components/theme-toggle";
import { GithubIcon, LogInIcon } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-16 bg-background border-b border-accent">
      <div className="h-full flex items-center justify-between max-w-screen-7xl mx-auto px-4 sm:px-16">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-2">

          <Link href="https://github.com/firas1438/MovieNest" target="_blank" rel="noopener noreferrer"> 
            <Button variant="outline" size="icon">
              <GithubIcon/>
            </Button>
          </Link>

          <ThemeToggle />

          <Button variant="outline"  className="hidden sm:inline-flex font-mono font-bold">
            <LogInIcon/>
            SIGN IN
          </Button>

          <Button className="hidden xs:inline-flex font-mono font-bold">
            GET STARTED
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
