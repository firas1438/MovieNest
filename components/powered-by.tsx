import Image from "next/image";

const logos = [
  { src: "./poweredby/TMDB.svg", alt: "TMDB", h: 17 },
  { src: "./poweredby/Nextjs.svg", alt: "Nextjs", h: 14  },
  { src: "./poweredby/Supabase.svg", alt: "Supabase", h: 18 },
  { src: "./poweredby/Vercel.svg", alt: "Vercel", h: 16 },
];

const PoweredBy = () => (
  <section className="bg-background py-4">
    <div className="mx-auto max-w-xl px-6">
      <div className="mx-auto grid grid-cols-4 gap-x-8 gap-y-6 sm:gap-x-12 sm:gap-y-10">
        {/* Logos */}
        {logos.map((logo, idx) => (
          <div key={idx} className="flex justify-center">
            <Image className="h-auto w-auto dark:invert" src={logo.src} alt={logo.alt} height={logo.h} width={60} style={{ height: `${logo.h}px`, width: "auto" }} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default PoweredBy;
