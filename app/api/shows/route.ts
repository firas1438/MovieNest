// /app/api/shows/route.ts
import { NextResponse } from "next/server"

const TMDB_API_KEY = process.env.API_KEY

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  const page = searchParams.get("page") || "1"
  const sortBy = searchParams.get("sortBy") || "popularity.desc"
  const rating = searchParams.get("rating") || "0"
  const yearStart = searchParams.get("yearStart") || "1900"
  const yearEnd = searchParams.get("yearEnd") || new Date().getFullYear().toString()
  const genres = searchParams.get("genres") || ""
  const search = searchParams.get("search") || ""

  try {
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY!,
      language: "en-US",
      sort_by: sortBy,
      "vote_average.gte": rating,
      "first_air_date.gte": `${yearStart}-01-01`,
      "first_air_date.lte": `${yearEnd}-12-31`,
      with_genres: genres,
      page,
      include_adult: "false",
    })

    // Decide whether to search or discover
    const endpoint = search
      ? `https://api.themoviedb.org/3/search/tv?query=${encodeURIComponent(search)}&${params}`
      : `https://api.themoviedb.org/3/discover/tv?${params}`

    const res = await fetch(endpoint)

    if (!res.ok) {
      return NextResponse.json({error: "Failed to fetch shows from TMDB"}, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
