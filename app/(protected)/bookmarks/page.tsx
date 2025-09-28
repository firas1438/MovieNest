"use client";

import { useEffect, useState } from "react";
import { MovieCard } from "@/app/movies/components/movie-card";
import { ShowCard } from "@/app/shows/components/show-card";
import { BookmarkButton } from "@/components/bookmark-button";
import { Movie } from "@/types/movie";
import { Show as ShowType } from "@/types/show";
import { createClient } from "@/lib/supabase/client";
import { Separator } from "@/components/ui/separator";
import { Bookmark } from "@/types/bookmark";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loader from "@/components/loader";

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [moviesData, setMoviesData] = useState<Movie[]>([]);
  const [showsData, setShowsData] = useState<ShowType[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  // fetch bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        setLoading(true);

        // fetch bookmarks from supabase
        const { data, error } = await supabase.from("bookmarks").select("*");
        if (error) throw error;
        if (!data) return;

        setBookmarks(data);

        // separate movies and shows
        const movies = data.filter((b) => b.item_type === "movie");
        const shows = data.filter((b) => b.item_type === "show");

        // fetch movie details
        const moviesDetails = await Promise.all(
          movies.map(async (b) => {
            const res = await fetch(`/api/movies/${b.item_id}`);
            const json = await res.json();
            return json.movie as Movie;
          })
        );

        // fetch show details
        const showsDetails = await Promise.all(
          shows.map(async (b) => {
            const res = await fetch(`/api/shows/${b.item_id}`);
            const json = await res.json();
            return json.show as ShowType;
          })
        );

        setMoviesData(moviesDetails);
        setShowsData(showsDetails);
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  // remove bookmarks (UI only)
  const handleRemove = (id: string, type: "movie" | "show") => {
    setMoviesData((prev) => prev.filter((m) => m.id.toString() !== id));
    setShowsData((prev) => prev.filter((s) => s.id.toString() !== id));
    setBookmarks((prev) => prev.filter((b) => !(b.item_id === id && b.item_type === type)) );
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="container mx-auto py-4 lg:px-10 md:px-8 px-6 space-y-10 ">
      {/* movies section */}
      <div>
        <h2 className="text-[1.35rem] ml-1 font-semibold mb-6 lg:mb-4"> Movies ({moviesData.length}) </h2>
        {moviesData.length > 0 ? (
          <Carousel className="w-full ">
            <CarouselContent>
              {moviesData.map((movie) => (
                <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5" >
                  <div className="relative">
                    <MovieCard movie={movie} />
                    <div className="absolute top-2 right-2">
                      <BookmarkButton variant="outline" itemId={movie.id.toString()} itemType="movie" onRemove={() => handleRemove(movie.id.toString(), "movie") } />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p className="text-muted-foreground">No bookmarked movies yet.</p>
        )}
      </div>


      {/* shows section */}
      <div>
        <h2 className="text-[1.35rem] ml-1 font-semibold mb-6 lg:mb-4"> Shows ({showsData.length}) </h2>
        {showsData.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {showsData.map((show) => (
                <CarouselItem key={show.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5" >
                  <div className="relative">
                    <ShowCard show={show} />
                    <div className="absolute top-2 right-2">
                      <BookmarkButton variant="outline" itemId={show.id.toString()} itemType="show" onRemove={() => handleRemove(show.id.toString(), "show") } />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        ) : (
          <p className="text-muted-foreground">No bookmarked shows yet.</p>
        )}
      </div>
    </div>
  );
}
