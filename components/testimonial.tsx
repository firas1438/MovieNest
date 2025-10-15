import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Marquee from "react-fast-marquee";
import { StarIcon } from "lucide-react";
import MotionWrapper from "./ui/motion-wrapper";

const testimonials = [
  {
    id: 1,
    name: "Omar Ben Ali",
    designation: "Movie Enthusiast",
    testimonial: "MovieNest has changed how I watch movies. Great streaming quality and always something new to enjoy.",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    rating: 5,
  },
  {
    id: 2,
    name: "Lina Chaabouni",
    designation: "TV Shows Fan",
    testimonial: "Tracking and bookmarking shows is so easy. MovieNest keeps me updated with trending series.",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    rating: 4,
  },
  {
    id: 3,
    name: "Yousef Ali",
    designation: "Cinema Critic",
    testimonial: "MovieNest’s recommendations are always spot on and help me discover movies that match my taste.",
    avatar: "https://randomuser.me/api/portraits/men/13.jpg",
    rating: 5,
  },
  {
    id: 4,
    name: "Fatima Noor",
    designation: "Casual Viewer",
    testimonial: "It’s easy to find family-friendly content, and the variety of genres keeps everyone entertained.",
    avatar: "https://randomuser.me/api/portraits/women/14.jpg",
    rating: 3,
  },
  {
    id: 5,
    name: "Ahmed Zitouni",
    designation: "Streaming Addict",
    testimonial: "The platform runs smoothly with no buffering. Binge-watching has never been this seamless.",
    avatar: "https://randomuser.me/api/portraits/men/15.jpg",
    rating: 4,
  },
  {
    id: 6,
    name: "Sara Ibrahim",
    designation: "Film Lover",
    testimonial: "MovieNest’s clean interface makes finding hidden gems fun, from new releases to classics.",
    avatar: "https://randomuser.me/api/portraits/women/16.jpg",
    rating: 5,
  },
];

const Testimonials = () => (
  <MotionWrapper delay={0.2} variant="fadeIn">
    <section id="testimonials" className="space-y-8 py-4 md:py-12 lg:py-20">
      <div className="w-full max-w-6xl mx-auto overflow-hidden relative">
        {/* header */}
        <div className="flex justify-center flex-col items-center gap-2 text-center px-4">
          <h2 className="text-3xl md:text-4xl font-semibold font-mono">Testimonials</h2>
          <p className="text-muted-foreground sm:text-lg">
            You can hear directly from our satisfied users about their experiences on our platform.
          </p>
        </div>

        {/* testimonials */}
        <div className="mt-10">
          {/* left gradient */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full lg:w-60 md:w-48 w-10 bg-gradient-to-r from-background to-transparent" />
          {/* right gradient */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full lg:w-60 md:w-48 w-10 bg-gradient-to-l from-background to-transparent" />
          {/* marquee rows */}
          <div className="space-y-6">
            {/* first row */}
            <Marquee pauseOnHover autoFill>
              <div className="flex items-stretch gap-6 px-4">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            </Marquee>

            {/* second row (reverse direction) */}
            <Marquee pauseOnHover autoFill direction="right">
              <div className="flex items-stretch gap-6 px-4">
                {testimonials.map((testimonial) => (
                  <TestimonialCard key={testimonial.id} testimonial={testimonial} />
                ))}
              </div>
            </Marquee>
          </div>

        </div>
      </div>
    </section>
  </MotionWrapper>
);

const TestimonialCard = ({ testimonial }: { testimonial: (typeof testimonials)[0] }) => (
  <div className="max-w-xs md:max-w-sm border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 ">
    <div className="flex items-center justify-between">
      {/* profile */}
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
            {testimonial.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-md font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted-foreground">{testimonial.designation}</p>
        </div>
      </div>
      {/* stars */}
      <div className="flex space-x-1">
        {Array.from({ length: testimonial.rating }).map((_, index) => (
          <StarIcon key={index} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
        ))}
      </div>
    </div>

    {/* testimonial */}
    <p className="mt-5 leading-relaxed ">{testimonial.testimonial}</p>

  </div>
);


export default Testimonials;
