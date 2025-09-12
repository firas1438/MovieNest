import CTABanner from "@/components/cta";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import Hero from "@/components/hero";
import Testimonial from "@/components/testimonial";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <FAQ />
      <Testimonial />
      <CTABanner/>
    </>
  );
}
