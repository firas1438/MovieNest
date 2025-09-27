'use client'

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { CelebrityCard } from "./components/celebrity-card";
import type { Celebrity } from "@/types/celebrity";
import { CelebritySidebar } from "./components/celebrity-sidebar";

interface CelebritiesResponse {
  page: number;
  total_pages: number;
  results: Celebrity[];
}

export default function CelebritiesPage() {
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const router = useRouter();

  // api call
  const getCelebrities = useCallback(async (pageNum: number, query = "") => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: pageNum.toString(), search: query });
      const res = await fetch(`/api/celebrities?${params}`);
      const data: CelebritiesResponse = await res.json();

      if (!res.ok) throw new Error("Failed to fetch celebrities");

      setCelebrities(data.results);
      setTotalPages(data.total_pages);
    } catch (error) {
      console.error("Error fetching celebrities:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // fetch celebrities on initial load and when page or search changes
  useEffect(() => {
    getCelebrities(page, search);
  }, [page, search, getCelebrities]);

  // handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    getCelebrities(1, search);
    router.push(`/celebrities?search=${encodeURIComponent(search)}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-16">
      {/* sidebar */}
      <aside className="w-full md:w-60 md:sticky md:top-8 md:h-[calc(100vh-4rem)]">
        <CelebritySidebar/>
      </aside>

      <main className="flex-1">

        {/* search bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-8">
          <Input type="search" placeholder="Search celebrities..." value={search} onChange={(e) => setSearch(e.target.value)} className="flex-grow" />
          <Button type="submit" className="shrink-0">
            <Search className="w-4 h-4 mr-2" /> Search 
          </Button>
        </form>

        {/* results count */}
        <div className="mb-6">
          {loading ? (
            <p className="text-sm font-bold"><Spinner variant="ellipsis" /></p>
          ) : (
            <p className="text-sm font-bold">{celebrities.length} results</p>
          )}
        </div>

        {/* celebrities grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {celebrities.map((celebrity) => (
            <CelebrityCard key={celebrity.id} celebrity={celebrity} />
          ))}
        </div>

        {/*pagination */}
        <div className="flex justify-center gap-4 mt-12">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage(prev => Math.max(prev - 1, 1))} >
            Previous
          </Button>
          <Button variant="outline" disabled={page === totalPages} onClick={() => setPage(prev => Math.min(prev + 1, totalPages))} >
            Next
          </Button>
        </div>
        
      </main>
    </div>
  );
}
