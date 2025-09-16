"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Star, Clock, Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { BackButton } from "@/components/back-button";
import { MovieCard } from "@/components/movies/movie-card";
import { MovieDetails, MovieCredits, CastMember, SimilarMovie } from "@/types/movie";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import Marquee from "react-fast-marquee";
import { Review } from "@/types/movie";


export default function MovieDetailsPage() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [credits, setCredits] = useState<MovieCredits | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);

  {/* fetch movie details, credits, and recommended movies */}
  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        {/* display loader */}
        setLoading(true);
        {/* fetch data */}
        const response = await fetch(`/api/movies/${id}`);
        {/* handle errors */}
        if (!response.ok) { throw new Error("Failed to fetch movie data"); }
        {/* parse response */}
        const data = await response.json();
        {/* update state */}
        setMovie(data.movie);
        setCredits(data.credits);
        setReviews(data.reviews);
        setSimilarMovies(data.similarMovies);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieData();
  }, [id]);

  if (loading) {
    return <MovieDetailsSkeleton />;
  }

  if (!movie || !credits) {
    return <div className="container mx-auto px-4 ">Movie not found</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 ">
      <BackButton />

      {/* movie details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* movie poster */}
        <div className="lg:col-span-1">
          <Image src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} width={500} height={750} className="rounded-lg shadow-lg w-full h-auto"/>
        </div>

        {/* movie info */}
        <div className="lg:col-span-2">
          {/* movie title */}
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"> {movie.title}</h1>
          {/* movie tagline */}
          {movie.tagline && (
            <p className="text-lg sm:text-xl text-muted-foreground mb-4 italic"> {movie.tagline}</p>
          )}

          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs sm:text-sm text-muted-foreground">
            {/* movie rating */}
            <div className="flex items-center mr-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400 mr-1" />
              {movie.vote_average.toFixed(1)}
            </div>
            {/* movie duration */}
            <div className="flex items-center mr-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              {movie.runtime} min
            </div>
            {/* movie release date */}
            <div className="flex items-center mr-2">
              <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-1" />
              {new Date(movie.release_date).getFullYear()}
            </div>
            {/* status */}
            <div>{movie.status}</div>
          </div>

          {/* movie genres */}
          <div className="mb-4">
            {movie.genres.map((genre) => (
              <Button key={genre.id} variant="outline" className="mr-2 mb-2 text-xs sm:text-sm rounded-2xl">
                {genre.name}
              </Button>
            ))}
          </div>

          {/* movie description */}
          <p className="text-md mb-6 text-muted-foreground">{movie.overview}</p>

          {/* budget & revenue */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {/* movie budget */}
            <div>
              <h3 className="font-semibold">Budget</h3>
              <p> {movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "N/A"} </p>
            </div>
            {/* movie revenue */}
            <div>
              <h3 className="font-semibold">Revenue</h3>
              <p> {movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "N/A"} </p>
            </div> 
          </div>

          {/* movie production companies */}
          <div>
            <h3 className="font-semibold mb-2 text-sm sm:text-base">Production Companies</h3>
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6">
              {movie.production_companies.map((company) => (
                <div key={company.id} className="flex items-center bg-muted rounded-md p-1 sm:p-2">
                  {company.logo_path ? (
                    <Image src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} alt={company.name} width={50} height={25} className="mr-2 w-6 sm:w-8 h-8"/>
                  ) : (
                    <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  )}
                  <span className="text-xs sm:text-sm">{company.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      <Separator className="my-8" />

      {/* movie cast */}
      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold mb-1">Cast</h2> 
        {/* actors marquee */}
        <div className="relative w-full overflow-hidden">
          {/* left gradient */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full lg:w-52 w-20 bg-gradient-to-r from-background to-transparent" />
          {/* right gradient */}
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full lg:w-52 w-20 bg-gradient-to-l from-background to-transparent" />
          {/* marquee */}
          <Marquee pauseOnHover autoFill className="w-full">
            <div className="flex gap-4 pr-4">
              {credits.cast.slice(0, 12).map((actor: CastMember) => (
                <div key={actor.id} className="relative space-y-2 group w-40 flex-shrink-0">
                  <div className="overflow-hidden rounded-lg aspect-[3/4] relative">
                    {/* actor image */}
                    <div className="flex items-center justify-center w-full h-full">
                      <Image src={ actor.profile_path ? `https://image.tmdb.org/t/p/w500${actor.profile_path}` : "/placeholder.svg" } alt={actor.name} width={200} height={300} className="object-contain rounded-2xl" quality={100} />
                    </div>
                    {/* more details button */}
                    <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
                      <Button asChild variant="secondary" size="sm" className="flex items-center gap-2 px-4 py-2">
                        <Link href={`/celebrities/${actor.id}`}  rel="noopener noreferrer" >
                          <span className="text-xs"> More Details</span><ExternalLink className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>

                  {/* actor name and role */}
                  <div className="space-y-1 py-1 text-center">
                    <h3 className="font-medium text-sm leading-none truncate">{actor.name}</h3>
                    <p className="text-xs text-muted-foreground truncate">{actor.character}</p>
                  </div>
                </div>
              ))}
            </div>
          </Marquee>
        </div>
      </div>

      <Separator className="my-8" />

      {/* reviews */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Reviews</h2>
        {!reviews || reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews available for this movie.</p>
        ) : (
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="p-4 border rounded-lg shadow-sm bg-card">
                {/* user review */}
                <div className="flex items-center gap-3 mb-3">
                  {review.author_details.avatar_path ? (
                    <Image src={ review.author_details.avatar_path ? review.author_details.avatar_path.startsWith("/https") ? review.author_details.avatar_path.slice(1) : `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}` : "/placeholder.svg" } alt={review.author} width={40} height={40} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                      {review.author.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{review.author}</h4>
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  {review.author_details.rating !== null && (
                    <div className="flex items-center text-yellow-500 text-sm">
                      <Star className="w-4 h-4 mr-1 fill-yellow-500" /> {review.author_details.rating}
                    </div>
                  )}
                </div>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {review.content.length > 500 ? review.content.slice(0, 500) + "..." : review.content}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator className="my-8" />

      {/* recommendations */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Recommendations</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
          {similarMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>

    </div>
  );
}

// page skeleton
function MovieDetailsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <Skeleton className="w-full aspect-[2/3] rounded-lg" />
        </div>
        <div className="lg:w-2/3">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <div className="flex gap-2 mb-4">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-20" />
          </div>
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-6" />
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Skeleton className="h-16 w-full" />
            <Skeleton className="h-16 w-full" />
          </div>
          <Skeleton className="h-8 w-40 mb-2" />
          <div className="flex flex-wrap gap-4 mb-6">
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </div>
      <Skeleton className="h-8 w-40 my-8" />
      <div className="flex gap-4 overflow-x-auto pb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-[150px] h-[225px]" />
        ))}
      </div>
      <Skeleton className="h-8 w-40 my-8" />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {[...Array(10)].map((_, i) => (
          <Skeleton key={i} className="w-full aspect-[2/3]" />
        ))}
      </div>
    </div>
  );
}