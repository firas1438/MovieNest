'use client'

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { MovieCard } from "./components/movie-card"
import { MovieFilters } from "./components/movie-filters"
import type { Movie, MovieResponse, FilterState } from "@/types/movie"

const currentYear = new Date().getFullYear()

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [filters, setFilters] = useState<FilterState>({ year: [1900, currentYear], rating: 0, genres: [], sortBy: "popularity.desc", page: 1, search: "", })
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()

  {/* API call */}
  const getMovies = useCallback(async () => {
    {/* display loader */}
    setLoading(true);
    {/* construct query params */}
    const params = new URLSearchParams({ page: filters.page.toString(), sortBy: filters.sortBy,  rating: filters.rating.toString(),  yearStart: filters.year[0].toString(),  yearEnd: filters.year[1].toString(),  genres: filters.genres.join(","),  search: filters.search, include_adult: "false",});
    {/* fetch data */}
    try {
      const res = await fetch(`/api/movies?${params}`);
      const data: MovieResponse = await res.json();
      {/* handle errors */}
      if (!res.ok) { throw new Error("Failed to fetch movies");}
      {/* update state */}
      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB caps at 500
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  {/* fetch movies */}
  useEffect(() => {
    getMovies()
  }, [getMovies])

  {/* handle searching */}
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters(prev => ({ ...prev, search: prev.search, page: 1 }))
    router.push(`/movies/?search=${encodeURIComponent(filters.search)}`)
  }

  {/* handle filtering */}
  const handleFilterChange = useCallback((updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates, page: 1 }))
    const searchParams = new URLSearchParams({
      search: filters.search,
      genres: filters.genres.join(','),
      sortBy: filters.sortBy,
      year: `${filters.year[0]},${filters.year[1]}`,
      rating: filters.rating.toString(),
    })
    router.push(`/movies/?${searchParams.toString()}`)
  }, [router, filters])

  {/* clear filters */}
  const handleClearFilters = () => {
    setFilters({ year: [1900, currentYear], rating: 0, genres: [], sortBy: "popularity.desc", page: 1, search: "", })
    router.push("/movies")
  }

  return (
    <div className="flex flex-col md:flex-row gap-16">
      {/* filters sidebar */}
      <aside className="w-full md:w-60 md:sticky md:top-8 md:h-[calc(100vh-4rem)]">
        <MovieFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters} />
      </aside>

      {/* main content */}
      <main className="flex-1">

        {/* search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input type="search" placeholder="Search movies..." value={filters.search} onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))} className="flex-grow"/>
          <Button type="submit" className="shrink-0">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </form>

        {/* results count */}
        <div className="mb-6">
          {loading ? (
            <p className="text-sm font-bold"><Spinner variant="ellipsis"/></p>
          ) : (
            <p className="text-sm font-bold"> {movies.length} results</p>
          )}
        </div>

        {/* movies grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-center gap-4 mt-12">
          <Button variant="outline" disabled={filters.page === 1} onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))} >
            Previous
          </Button>
          <Button variant="outline" disabled={filters.page === totalPages} onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}>
            Next
          </Button>
        </div>

      </main>
    </div>
  )
}

