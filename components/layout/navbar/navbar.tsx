import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "@/components/theme-toggle";
import { GithubIcon, LogInIcon, UserIcon } from "lucide-react";
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

          {/* display when user is not logged in */}
          <Link href="/login"> 
            <Button variant="outline" className="hidden sm:inline-flex  font-semibold">
              <LogInIcon/> SIGN IN
            </Button>
          </Link>

          {/* display when user is logged in */}
          {/* <Button variant="outline" className="hidden sm:inline-flex  font-semibold">
           <UserIcon/> PROFILE
          </Button> */}

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
