import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";

const logos = [
  { src: "/sponsors/netflix.png", alt: "Netflix Logo" },
  { src: "/sponsors/hbo.png", alt: "HBO Logo" },
  { src: "/sponsors/disney.png", alt: "Disney Logo" },
  { src: "/sponsors/paramount.png", alt: "Paramount Logo" },
  { src: "/sponsors/hulu.png", alt: "Hulu Logo" },
  { src: "/sponsors/amc.png", alt: "Amc Logo" },
  { src: "/sponsors/appletv.png", alt: "AppleTV Logo" },
  { src: "/sponsors/prime.png", alt: "Prime Logo" },
  { src: "/sponsors/crunchyroll.png", alt: "Crunchyroll Logo" },
  { src: "/sponsors/slingtv.png", alt: "SlingTV Logo" },
  { src: "/sponsors/peacock.png", alt: "PeacockTV Logo" },
  { src: "/sponsors/tubi.png", alt: "Tubi Logo" },
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
