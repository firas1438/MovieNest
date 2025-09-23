'use client'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface HonorableMention {
  id: number
  name: string
  department: string
  profile_path: string | null
}


export function CelebritySidebar() {
  const [honorableMentions, setHonorableMentions] = useState<HonorableMention[]>([])
  const [loading, setLoading] = useState(true)

  {/* api call */}
  useEffect(() => {
    async function fetchHonorableMentions() {
      try {
        const res = await fetch("/api/celebrities/honorable-mentions")
        if (!res.ok) throw new Error("Failed to fetch honorable mentions")
        const data: HonorableMention[] = await res.json()
        setHonorableMentions(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchHonorableMentions()
  }, [])

  const skeletonItems = [...Array(7)]

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Honorable Mentions</h3>
      <div className="space-y-2">
        {loading
          ? skeletonItems.map((_, idx) => <CelebritySidebarSkeletonItem key={idx} />)
          : honorableMentions.map((celebrity, idx) => (
              <Link key={idx} href={`/celebrities/${celebrity.id}`} rel="noopener noreferrer" className="block rounded-lg hover:bg-accent dark:hover:bg-accent/50 transition-colors" >
                <div className="flex items-center gap-4">
                  <Image src={celebrity.profile_path ? `https://image.tmdb.org/t/p/w92${celebrity.profile_path}` : "/placeholder.svg"} alt={celebrity.name} width={64} height={64} quality={100} priority className="aspect-square rounded-md object-cover" />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{celebrity.name}</span>
                    <span className="text-xs text-muted-foreground">{celebrity.department}</span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  )
}


// skeleton
function CelebritySidebarSkeletonItem() {
  return (
    <div className="flex items-center gap-4 animate-pulse">
      <Skeleton className="w-16 h-16 rounded-md" />
      <div className="flex flex-col flex-1 gap-1">
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-3 w-16 rounded" />
      </div>
    </div>
  )
}