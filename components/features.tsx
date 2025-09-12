import React from "react";
import { Globe, Shield, Star, Zap, Rocket, Film } from "lucide-react";

export default function Features() {
const features = [
  { icon: <Globe className="h-8 w-8 text-primary" />, title: "Stream Anywhere", description: "Enjoy your favorite movies and shows on any device, anytime, anywhere."},
  { icon: <Film className="h-8 w-8 text-primary" />, title: "Vast Library", description: "Discover a huge collection of movies and shows across all genres."},
  { icon: <Star className="h-8 w-8 text-primary" />,title: "Top Picks", description: "Get personalized recommendations to find your next favorite movie or show."},
  { icon: <Zap className="h-8 w-8 text-primary" />,title: "Instant Playback", description: "Start watching immediately without long loading times or buffering."},
  { icon: <Rocket className="h-8 w-8 text-primary" />,title: "New Releases", description: "Stay up-to-date with the latest movies and trending shows."},
  { icon: <Shield className="h-8 w-8 text-primary" />,title: "Safe & Free", description: "Watch content securely and freely without hidden charges."}
];

  return (
    <section id="features" className="space-y-8 py-4 md:py-12 lg:py-24">
      <div className=" flex justify-center flex-col items-center gap-2 text-center px-4">
        <h2 className="text-3xl md:text-4xl font-semibold font-mono"> Features</h2>
        <p className="text-muted-foreground sm:text-lg">
          Explore the key benefits and powerful tools we offer to enhance your experience.
        </p>
      </div>

      <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-5xl md:grid-cols-3">
        {features.map((feature, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg border bg-background p-2">
            <div className="flex h-[180px] flex-col rounded-md p-6 gap-4">
              {feature.icon}
              <div className="space-y-2">
                <h3 className="font-bold text-lg ">{feature.title}</h3>
                <p className="text-sm text-muted-foreground ">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
