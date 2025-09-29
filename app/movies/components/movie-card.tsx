import Image from "next/image"
import Link from "next/link"
import { Star, Play } from 'lucide-react'
import { Movie, SimilarMovie } from "@/types/movie"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MovieCardProps {
  movie: Movie | SimilarMovie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movies/${movie.id}`}>
      <Card className="overflow-hidden group cursor-pointer duration-300 transition-transform hover:scale-[1.015]">
        <div className="relative aspect-[2/3]">
          {/* poster image */}
          <Image src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "/placeholder.svg"} alt={movie.title} fill className="object-cover" priority quality={100}/>
          {/* gradient overlay*/}
            <div className="absolute -inset-0.5 bg-gradient-to-t from-card to-transparent opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
          {/* play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button size="icon" variant="secondary" className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Play className="w-6 h-6" />        
            </Button>
          </div>
        </div>
        <CardContent className="p-3">
          <h3 className="font-semibold text-sm truncate ">{movie.title}</h3> 
          <div className="flex items-center justify-between mt-1.5 text-xs ">
            {'vote_average' in movie && (
              <div className="flex items-center">
                <Star className="w-3 h-4 text-yellow-400 fill-yellow-400 mr-1" />
                {movie.vote_average.toFixed(1)}
              </div>
            )}
            {movie.release_date && (
              <div className="ml-auto">{new Date(movie.release_date).getFullYear()}</div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

