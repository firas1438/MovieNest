import { Separator } from "@/components/ui/separator";
import { Mail, GithubIcon, Linkedin } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Logo } from "./navbar/logo";
import PoweredBy from "../powered-by";

const Footer = () => {
  return (
    <footer className="mt-12 xs:mt-20 border-t">
      <div className="max-w-[90rem] mx-auto px-8 lg:px-6 py-12 flex flex-col md:flex-row justify-between gap-x-16 gap-y-10">
        
        {/* brand Section  */}
        <div className="md:w-6/12 space-y-6">
          <Logo />
          <p className="text-muted-foreground text-sm leading-relaxed">
            Discover your next favorite movie or show. Stream thousands of titles across all genres, 
            bookmark your favorites, and explore celebrity profiles.
          </p>
          <div className="flex items-center gap-1"> 
            {/* github */} 
            <Link href="https://github.com/firas1438/MovieNest" target="_blank" rel="noopener noreferrer"> 
              <Button variant="ghost" size="icon" className="rounded-full"> 
                <GithubIcon className="h-4 w-4" /> 
              </Button> </Link> 
            {/* linkedin */} 
            <Link href="https://www.linkedin.com/in/firasbenali/" target="_blank" rel="noopener noreferrer"> 
              <Button variant="ghost" size="icon" className="rounded-full"> 
                <Linkedin className="h-4 w-4" /> 
              </Button> 
            </Link> 
          </div>
        </div>

        {/* browse Section */}
        <div className="md:w-1/12 space-y-4">
          <h3 className="font-semibold text-sm">Browse</h3>
          <ul className="space-y-3">
            <li>
              <Link href="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors" >
                Movies
              </Link>
            </li>
            <li>
              <Link href="/shows" className="text-sm text-muted-foreground hover:text-foreground transition-colors" >
                TV Shows
              </Link>
            </li>
            <li>
              <Link href="/celebrities" className="text-sm text-muted-foreground hover:text-foreground transition-colors" >
                Celebrities
              </Link>
            </li>
            <li>
              <Link href="/bookmarks" className="text-sm text-muted-foreground hover:text-foreground transition-colors" >
                Bookmarks
              </Link>
            </li>
          </ul>
        </div>

        {/* services Section */}
        <div className="md:w-2/12 space-y-4">
          <h3 className="font-semibold text-sm">Services</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li>High-quality streaming</li>
            <li>Personalized recommendations</li>
            <li>Bookmark favorites</li>
            <li>Trending movies & shows</li>
            <li>Accessible on all devices</li>
          </ul>
        </div>

        {/* contact Section */}
        <div className="md:w-2/12 space-y-4">
          <h3 className="font-semibold text-sm">Contact</h3>
          <a
            href="mailto:support.movienest@proton.me"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Mail className="h-4 w-4" />
            support.movienest@proton.me
          </a>
        </div>
      </div>
      
      <Separator className="w-8/12 mx-auto" />

      {/* bottom bar */}
      <div className="mx-auto px-6 pb-4 flex justify-center items-center">
          <div className="pt-4 justify-start flex">
            <PoweredBy />
          </div>
      </div>

    </footer>
  );
};

export default Footer;
