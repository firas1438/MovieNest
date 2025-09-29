"use client";

import { useEffect, useState } from "react";
import { MovieCard } from "@/app/movies/components/movie-card";
import { ShowCard } from "@/app/shows/components/show-card";
import { Movie } from "@/types/movie";
import { Show as ShowType } from "@/types/show";
import { createClient } from "@/lib/supabase/client";
import { Bookmark } from "@/types/bookmark";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel";
import Loader from "@/components/loader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="container mx-auto py-2 lg:px-10 md:px-8 px-6 space-y-8 ">
      
      {/* movies section */}
      <div>
        <h2 className="text-[1.35rem] ml-1 font-semibold mb-2"> Movies ({moviesData.length}) </h2>
        {moviesData.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent className="py-2">
              {moviesData.map((movie) => (
                <CarouselItem key={movie.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5" >
                  <div className="relative">
                    <MovieCard movie={movie} />
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
        <h2 className="text-[1.35rem] ml-1 font-semibold mb-2"> Shows ({showsData.length}) </h2>
        {showsData.length > 0 ? (
          <Carousel className="w-full">
            <CarouselContent className="py-2">
              {showsData.map((show) => (
                <CarouselItem key={show.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5" >
                  <div className="relative">
                    <ShowCard show={show} />
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

      {/* bookmarks stats */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {/* movies bookmarked */}
          <Card className="Server bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                Movies Bookmarked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center">{moviesData.length}</div>
            </CardContent>
          </Card>

          {/* shows bookmarked */}
          <Card className="Server bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                Shows Bookmarked
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center">{showsData.length}</div>
            </CardContent>
          </Card>

          {/* total bookmarks */}
          <Card className="Server bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-center gap-2">
                Total Bookmarks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-center">{moviesData.length + showsData.length}</div>
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
  );
}
