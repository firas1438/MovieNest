import Marquee from "react-fast-marquee";
import Image from "next/image";
import { Tooltip, TooltipContent, TooltipTrigger, } from "@/components/ui/tooltip"

const logos = [
  { src: "/providers/netflix.png", alt: "Netflix" },
  { src: "/providers/hbo.png", alt: "HBO" },
  { src: "/providers/disney.png", alt: "Disney" },
  { src: "/providers/paramount.png", alt: "Paramount" },
  { src: "/providers/hulu.png", alt: "Hulu" },
  { src: "/providers/amc.png", alt: "AMC" },
  { src: "/providers/appletv.png", alt: "AppleTV" },
  { src: "/providers/prime.png", alt: "Prime" },
  { src: "/providers/crunchyroll.png", alt: "Crunchyroll" },
  { src: "/providers/slingtv.png", alt: "SlingTV" },
  { src: "/providers/peacock.png", alt: "PeacockTV" },
  { src: "/providers/tubi.png", alt: "Tubi" },
];

// move & show providers

const ProvidedBy = () => (
  <div className="max-w-7xl mx-auto overflow-hidden relative">

    {/* left gradient */}
    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full lg:w-60 w-20 bg-gradient-to-r from-background to-transparent" />
    {/* right gradient */}
    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full lg:w-60 w-20 bg-gradient-to-l from-background to-transparent" />

    <Marquee autoFill pauseOnHover>
      <div className="flex items-center justify-center gap-4 sm:gap-8 px-2 sm:px-4">
        {logos.map((logo) => (
          <Tooltip key={logo.alt}>
            <TooltipTrigger>
              <Image key={logo.alt} src={logo.src} alt={logo.alt} width={100} height={50} className="w-auto dark:filter-none filter invert"/>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="font-semibold text-xs">
              {logo.alt}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </Marquee>

  </div>
);

export default ProvidedBy;
