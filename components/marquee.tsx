import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const logos = [
  { src: "/providers/netflix.png", alt: "Netflix Logo" },
  { src: "/providers/hbo.png", alt: "HBO Logo" },
  { src: "/providers/disney.png", alt: "Disney Logo" },
  { src: "/providers/paramount.png", alt: "Paramount Logo" },
  { src: "/providers/hulu.png", alt: "Hulu Logo" },
  { src: "/providers/amc.png", alt: "Amc Logo" },
  { src: "/providers/appletv.png", alt: "AppleTV Logo" },
  { src: "/providers/prime.png", alt: "Prime Logo" },
  { src: "/providers/crunchyroll.png", alt: "Crunchyroll Logo" },
  { src: "/providers/slingtv.png", alt: "SlingTV Logo" },
  { src: "/providers/peacock.png", alt: "PeacockTV Logo" },
  { src: "/providers/tubi.png", alt: "Tubi Logo" },
];

const LogoMarquee = () => (
  <div className="max-w-7xl mx-auto overflow-hidden relative">

    {/* left gradient */}
    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full lg:w-60 w-20 bg-gradient-to-r from-background to-transparent" />
    {/* right gradient */}
    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full lg:w-60 w-20 bg-gradient-to-l from-background to-transparent" />

    <Marquee autoFill pauseOnHover>
      <div className="flex items-center justify-center gap-4 sm:gap-8 px-2 sm:px-4">
        {logos.map((logo) => (
          <Image key={logo.alt} src={logo.src} alt={logo.alt} width={100} height={50} className="w-auto dark:filter-none filter invert"/>
        ))}
      </div>
    </Marquee>

  </div>
);

export default LogoMarquee;
