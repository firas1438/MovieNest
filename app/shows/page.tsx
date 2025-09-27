'use client'

import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { ShowCard } from "./components/show-card"
import { ShowFilters } from "./components/show-filters"
import type { Show, ShowResponse, FilterState } from "@/types/show"

const currentYear = new Date().getFullYear()

export default function ShowsPage() {
  const [shows, setShows] = useState<Show[]>([])
  const [filters, setFilters] = useState<FilterState>({ year: [1900, currentYear], rating: 0, genres: [], sortBy: "popularity.desc", page: 1, search: "",})
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1)
  const router = useRouter()

  {/* API call */}
  const getShows = useCallback(async () => {
    {/* display loader */}
    setLoading(true)
    {/* construct query params */}
    const params = new URLSearchParams({  page: filters.page.toString(),  sortBy: filters.sortBy,  rating: filters.rating.toString(),  yearStart: filters.year[0].toString(),  yearEnd: filters.year[1].toString(),  genres: filters.genres.join(","),  search: filters.search, include_adult: "false",})
    {/* fetch data */}
    try {
      const res = await fetch(`/api/shows?${params}`)
      const data: ShowResponse = await res.json()
      {/* handle errors */}
      if (!res.ok) { throw new Error("Failed to fetch shows") }
      {/* update state */}
      setShows(data.results)
      setTotalPages(Math.min(data.total_pages, 500)) // TMDB caps at 500
    } catch (error) {
      console.error("Error fetching shows:", error)
    } finally {
      setLoading(false)
    }
  }, [filters])

  {/* fetch shows on filters change */}
  useEffect(() => {
    getShows()
  }, [getShows])

  {/* handle searching */}
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setFilters(prev => ({ ...prev, search: prev.search, page: 1 }))
    router.push(`/shows/?search=${encodeURIComponent(filters.search)}`)
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
    router.push(`/shows/?${searchParams.toString()}`)
  }, [router, filters])

  {/* clear filters */}
  const handleClearFilters = () => {
    setFilters({ year: [1900, currentYear], rating: 0, genres: [], sortBy: "popularity.desc", page: 1, search: "",})
    router.push("/shows")
  }

  return (
    <div className="flex flex-col md:flex-row gap-16">
      {/* filters sidebar */}
      <aside className="w-full md:w-60 md:sticky md:top-8 md:h-[calc(100vh-4rem)]">
        <ShowFilters filters={filters} onFilterChange={handleFilterChange} onClearFilters={handleClearFilters}/>
      </aside>

      {/* main content */}
      <main className="flex-1">
        {/* search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input type="search" placeholder="Search shows..." value={filters.search} onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))} className="flex-grow"/>
          <Button type="submit" className="shrink-0">
            <Search className="w-4 h-4 mr-2" /> Search
          </Button>
        </form>

        {/* results Count */}
        <div className="mb-6">
          {loading ? (
            <p className="text-sm font-bold"> <Spinner variant="ellipsis"/> </p>
          ) : (
            <p className="text-sm font-bold">{shows.length} results</p>
          )}
        </div>

        {/* shows grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {shows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </div>

        {/* pagination */}
        <div className="flex justify-center gap-4 mt-12">
          <Button variant="outline" disabled={filters.page === 1} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}>
            Previous
          </Button>
          <Button variant="outline" disabled={filters.page === totalPages} onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}>
            Next
          </Button>
        </div>
        
      </main>
    </div>
  )
}
