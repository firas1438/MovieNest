import { Separator } from "@/components/ui/separator";
import { GithubIcon } from "lucide-react";
import Link from "next/link";
import { Logo } from "./navbar/logo";



const Footer = () => {
  return (
    <footer className="mt-12 xs:mt-20  border-t">
      <div className="max-w-[90rem] mx-auto px-6 py-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-x-8 gap-y-10">
        <div className="col-span-full xl:col-span-2 space-y-6">
          {/* Logo */}
          <Logo/>

          <p className="mt-4 text-muted-foreground">
            Experience the platform for streaming and discovering movies and shows across all genres. 
          </p>
        </div>

      </div>
      <Separator/>
      
      <div className="max-w-[90rem] px-6 mx-auto py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5">
        {/* Copyright */}
        <span className=" text-center xs:text-start font-semibold">
          &copy; {new Date().getFullYear()}{" "}
            MovieNest. All rights reserved.
        </span>

        <div className="flex items-center gap-5 text-muted-foreground">
          <Link href="#" target="_blank">
            <GithubIcon className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
    </footer>
  );
};

export default Footer;














// import { Separator } from "@/components/ui/separator";
// import { GithubIcon, Twitter, Facebook, Instagram, Mail } from "lucide-react";
// import Link from "next/link";
// import { Logo } from "./navbar/logo";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// const Footer = () => {
//   return (
//     <footer className="mt-12 xs:mt-20 border-t bg-muted/10">
//       <div className="max-w-[90rem] mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
        
//         {/* Brand Section */}
//         <div className="col-span-2 space-y-6">
//           <Logo />
//           <p className="text-muted-foreground text-sm leading-relaxed">
//             Discover your next favorite movie or show. Stream thousands of titles across all genres, 
//             bookmark your favorites, and explore celebrity profiles.
//           </p>
//           <div className="flex items-center gap-4">
//             <Button variant="outline" size="icon" className="rounded-full">
//               <Twitter className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="icon" className="rounded-full">
//               <Facebook className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="icon" className="rounded-full">
//               <Instagram className="h-4 w-4" />
//             </Button>
//             <Button variant="outline" size="icon" className="rounded-full">
//               <GithubIcon className="h-4 w-4" />
//             </Button>
//           </div>
//         </div>

//         {/* Navigation Links */}
//         <div className="space-y-4">
//           <h3 className="font-semibold text-sm">Browse</h3>
//           <ul className="space-y-3">
//             <li>
//               <Link href="/movies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Movies
//               </Link>
//             </li>
//             <li>
//               <Link href="/shows" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 TV Shows
//               </Link>
//             </li>
//             <li>
//               <Link href="/celebrities" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Celebrities
//               </Link>
//             </li>
//             <li>
//               <Link href="/bookmarks" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Bookmarks
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Categories */}
//         <div className="space-y-4">
//           <h3 className="font-semibold text-sm">Categories</h3>
//           <ul className="space-y-3">
//             <li>
//               <Link href="/genre/action" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Action
//               </Link>
//             </li>
//             <li>
//               <Link href="/genre/comedy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Comedy
//               </Link>
//             </li>
//             <li>
//               <Link href="/genre/drama" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Drama
//               </Link>
//             </li>
//             <li>
//               <Link href="/genre/documentary" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Documentary
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Support */}
//         <div className="space-y-4">
//           <h3 className="font-semibold text-sm">Support</h3>
//           <ul className="space-y-3">
//             <li>
//               <Link href="/help" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Help Center
//               </Link>
//             </li>
//             <li>
//               <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 Contact Us
//               </Link>
//             </li>
//             <li>
//               <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//                 FAQ
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Newsletter */}
//         <div className="col-span-2 space-y-4">
//           <h3 className="font-semibold text-sm">Stay Updated</h3>
//           <p className="text-sm text-muted-foreground">
//             Subscribe to our newsletter for the latest releases and updates.
//           </p>
//           <div className="flex gap-2">
//             <Input 
//               type="email" 
//               placeholder="Your email" 
//               className="max-w-xs"
//             />
//             <Button size="sm" className="shrink-0">
//               <Mail className="h-4 w-4 mr-2" />
//               Subscribe
//             </Button>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <Separator />
//       <div className="max-w-[90rem] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
//         <p className="text-sm text-muted-foreground text-center md:text-left">
//           © {new Date().getFullYear()} StreamVista. All rights reserved.
//         </p>
//         <div className="flex items-center gap-6">
//           <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//             Privacy Policy
//           </Link>
//           <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//             Terms of Service
//           </Link>
//           <Link href="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
//             Cookie Policy
//           </Link>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;