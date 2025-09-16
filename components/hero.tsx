import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import React from "react";
import Image from "next/image";
import LogoMarquee from "./marquee";
import Link from "next/link";


const Hero = () => {
  return (
    <div className="min-h-[calc(100vh-6rem)] flex flex-col items-center px-6 py-4">
      {/* text content */}
      <div className="md:mt-6 flex items-center justify-center">
        <div className="text-center max-w-4xl">
          {/* badge */}
          <Badge className="bg-primary rounded-full py-1 border-none">
            v1.0.0 is available now! 🚀
          </Badge>
          {/* header */}
          <div> 
            <h1 className="mt-8 lg:mt-6 text-4xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold !leading-[1.2] tracking-tight font-mono">
              Discover Movies & Shows
            </h1>
            <p className="mt-6 lg:mt-4 text-md lg:text-lg">
              Experience the platform for streaming and discovering movies and shows across all genres. Find your next favorite and enjoy endless entertainment for absolutely free!
            </p>
          </div>
          {/* buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
            <Link href="/movies">
              <Button size="lg" className="w-full sm:w-auto rounded-full text-base">
                Start Watching <CirclePlay className="!h-5 !w-5" /> 
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full text-base shadow-none">
              <ArrowUpRight className="!h-5 !w-5" /> Create Account
            </Button>
          </div>
        </div>
      </div>
      {/* app image */}
      <div className="relative mt-14 overflow-hidden px-2 ">
        <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-t from-background to-transparent"/>
        <div aria-hidden className="absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-transparent"/>
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl border p-4 shadow-lg dark:shadow-gray-800">
          <Image className="hidden rounded-2xl dark:block" src="/dark-snippet.png" alt="app screen" width={2700} height={1440}/>
          <Image className="rounded-2xl block dark:hidden" src="/light-snippet.png" alt="app screen" width={2700} height={1440}/>
        </div>
      </div>
      {/* marquee */}
      <div className="mt-16"> 
        <LogoMarquee/>
      </div>
    </div>
  );
};

export default Hero;