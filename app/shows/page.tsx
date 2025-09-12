"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner"
import { ShowCard } from "@/components/shows/show-card";
import { ShowFilters } from "@/components/shows/show-filters";
import type { Show, ShowResponse, FilterState } from "@/types/show";

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || "fallback_key";
const currentYear = new Date().getFullYear();

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    year: [1900, currentYear],
    rating: 0,
    genres: [],
    sortBy: "popularity.desc",
    page: 1,
    search: "",
  });
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync filters with URL query parameters on page load
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const genres = searchParams.get("genres")?.split(",").filter(Boolean) || [];
    const sortBy = searchParams.get("sortBy") || "popularity.desc";
    const year = searchParams.get("year")?.split(",").map(Number) || [1900, currentYear];
    const rating = Number(searchParams.get("rating")) || 0;
    const page = Number(searchParams.get("page")) || 1;

    setFilters({
      search,
      genres,
      sortBy,
      year: [year[0] || 1900, year[1] || currentYear],
      rating,
      page,
    });
  }, [searchParams]);

  // API call
  const getShows = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY,
      language: "en-US",
      sort_by: filters.sortBy,
      "vote_average.gte": filters.rating.toString(),
      "first_air_date.gte": `${filters.year[0]}-01-01`,
      "first_air_date.lte": `${filters.year[1]}-12-31`,
      with_genres: filters.genres.join(","),
      page: filters.page.toString(),
      include_adult: "false",
    });

    const searchQuery = filters.search
      ? `/search/tv?query=${encodeURIComponent(filters.search)}&`
      : "/discover/tv?";

    try {
      const res = await fetch(`https://api.themoviedb.org/3${searchQuery}${params}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch shows (status: ${res.status})`);
      }
      const data: ShowResponse = await res.json();
      setShows(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB limits to 500 pages
    } catch (error: any) {
      console.error("Error fetching shows:", error.message);
    } finally {
      setLoading(false);
    }
  }, [filters, TMDB_API_KEY]);

  // Fetch shows
  useEffect(() => {
    getShows();
  }, [getShows]);

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, page: 1 }));
    const searchParams = new URLSearchParams({
      search: filters.search,
      genres: filters.genres.join(","),
      sortBy: filters.sortBy,
      year: `${filters.year[0]},${filters.year[1]}`,
      rating: filters.rating.toString(),
      page: "1",
    });
    router.push(`/shows?${searchParams.toString()}`);
  };

  // Handle filtering
  const handleFilterChange = useCallback(
    (updates: Partial<FilterState>) => {
      setFilters((prev) => ({ ...prev, ...updates, page: 1 }));
      const searchParams = new URLSearchParams({
        search: filters.search,
        genres: updates.genres?.join(",") || filters.genres.join(","),
        sortBy: updates.sortBy || filters.sortBy,
        year: `${updates.year?.[0] || filters.year[0]},${updates.year?.[1] || filters.year[1]}`,
        rating: (updates.rating ?? filters.rating).toString(),
        page: "1",
      });
      router.push(`/shows?${searchParams.toString()}`);
    },
    [router, filters]
  );

  // Clear filters
  const handleClearFilters = () => {
    setFilters({
      year: [1900, currentYear],
      rating: 0,
      genres: [],
      sortBy: "popularity.desc",
      page: 1,
      search: "",
    });
    router.push("/shows");
  };

  return (
      <div className="flex flex-col md:flex-row gap-16">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-60 md:sticky md:top-8 md:h-[calc(100vh-4rem)]">
          <ShowFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <Input
              type="search"
              placeholder="Search shows..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="flex-grow text-foreground"
            />
            <Button type="submit" className="shrink-0 rounded-md">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </form>

          {/* Results Count */}
          <div className="mb-6">
            {loading ? (
            <p className="text-sm font-bold"><Spinner variant="ellipsis"/></p>
            ) : (
              <p className="text-sm font-bold">{shows.length} results</p>
            )}
          </div>

          {/* Shows Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {shows.map((show) => (
              <ShowCard key={show.id} show={show} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-4 mt-12">
            <Button
              variant="outline"
              className="rounded-md"
              disabled={filters.page === 1}
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
              }
            >
              Previous
            </Button>
            <Button
              variant="outline"
              className="rounded-md"
              disabled={filters.page === totalPages}
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
              }
            >
              Next
            </Button>
          </div>
        </main>
      </div>
  );
}