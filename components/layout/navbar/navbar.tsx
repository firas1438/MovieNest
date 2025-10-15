import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import ThemeToggle from "@/components/theme-toggle";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import AuthButtons from "./auth-buttons";
import MotionWrapper from "@/components/ui/motion-wrapper";


const Navbar = () => {

  return (
    <MotionWrapper variant="blurIn">
      <nav className="h-16 bg-background border-b border-accent">
        <div className="h-full flex items-center justify-between max-w-screen-7xl mx-auto px-4 sm:px-16">
          {/* left section */}
          <Logo />
          {/* middle section */}
          <NavMenu className="hidden md:block" />
          {/* right section */}
          <div className="flex items-center gap-2">
            {/* github repo link */}
            <Link href="https://github.com/firas1438/MovieNest" target="_blank" rel="noopener noreferrer"> 
              <Button variant="outline" size="icon">
                <GithubIcon/>
              </Button>
            </Link>
            {/* theme changer button */}
            <ThemeToggle />
            {/* login/profile buttons */}
            <AuthButtons/>
            {/* mobile menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </MotionWrapper>
  );
};

export default Navbar;
