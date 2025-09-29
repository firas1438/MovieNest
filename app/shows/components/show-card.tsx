import Image from "next/image";
import Link from "next/link";
import { Star, Play } from "lucide-react";
import { Show, SimilarShow } from "@/types/show";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ShowCardProps {
  show: Show | SimilarShow;
}

export function ShowCard({ show }: ShowCardProps) {
  return (
    <Link href={`/shows/${show.id}`}>
      <Card className="overflow-hidden group cursor-pointer transition-transform duration-300 hover:scale-[1.015]">
        <div className="relative aspect-[2/3]">
          {/* poster image */}
          <Image src={show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}` : "/placeholder.svg" } alt={show.name} fill className="object-cover" priority quality={100}/>
          {/* gradient overlay */}
          <div className="absolute -inset-0.5 bg-gradient-to-t from-card to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
          {/* play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="icon" variant="secondary" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Play className="w-6 h-6" />        
            </Button>
          </div>

        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm truncate text-foreground">{show.name}</h3>
          <div className="flex items-center justify-between mt-1.5 text-xs text-muted-foreground">
            {"vote_average" in show && (
              <div className="flex items-center">
                <Star className="w-3 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                {show.vote_average.toFixed(1)}
              </div>
            )}
            {show.first_air_date && (
              <div className="ml-auto">{new Date(show.first_air_date).getFullYear()}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}