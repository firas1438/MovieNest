import { ArrowUpRight, Forward } from "lucide-react";
import { Button } from "./ui/button";
import { AnimatedGridPattern } from "./ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function CTABanner() {
  return (
      <div className="dark:border relative overflow-hidden w-full dark bg-background text-foreground max-w-6xl mx-auto rounded-2xl mt-20 lg:my-4 md:my-10 py-14 md:py-16 px-10 md:px-14">
        <AnimatedGridPattern numSquares={30} maxOpacity={0.1} duration={3} className={cn( "[mask-image:radial-gradient(400px_circle_at_right,white,rgba(255,255,255,0.6),transparent)]", "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12")}/>
        <AnimatedGridPattern numSquares={30} maxOpacity={0.1} duration={3} className={cn( "[mask-image:radial-gradient(400px_circle_at_top_left,white,rgba(255,255,255,0.6),transparent)]", "inset-x-0 inset-y-0 h-[200%] skew-y-12")}/>
        <div className="relative z-0 flex flex-col gap-3">
          <h3 className="text-3xl md:text-4xl font-semibold font-mono">
            Ready to Elevate Your Experience?
          </h3>
          <p className="mt-2 text-base md:text-lg">
            Stream thousands of movies and shows for free. Sign up today and start building your personal watchlist!
          </p>
        </div>
        <div className="relative z-0 mt-14 flex flex-col sm:flex-row gap-4">
          <Link href="/movies">
            <Button size="lg">
              Start Watching <ArrowUpRight className="!h-5 !w-5" />
            </Button>
          </Link>
          <Link href="/signup">
            <Button size="lg" variant="outline">
              Create Account <Forward className="!h-5 !w-5" />
            </Button>
          </Link>
        </div>
      </div>
  );
}