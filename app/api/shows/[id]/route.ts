import { NextResponse } from "next/server"
import { ShowDetails, ShowCredits, SimilarShowsResponse, ReviewsResponse} from "@/types/show"

const TMDB_API_KEY = process.env.API_KEY

export async function GET(request: Request,{ params }: { params: { id: string } }) {
  const { id } = params

  try {
    // check whether the api key exists
    if (!TMDB_API_KEY) {
      return NextResponse.json( { error: "TMDB API key is missing" },{ status: 500 })
    }

    // fetch show details, credits, and recommendations concurrently
    const [showResponse, creditsResponse, similarResponse, reviewsResponse] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/tv/${id}?api_key=${TMDB_API_KEY}&language=en-US`),
      fetch(`https://api.themoviedb.org/3/tv/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`),
      fetch(`https://api.themoviedb.org/3/tv/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`),
      fetch(`https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${TMDB_API_KEY}&language=en-US&page=1`),
    ])

    // handle fetch errors
    if (!showResponse.ok || !creditsResponse.ok || !similarResponse.ok || !reviewsResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch show data from TMDB" },{ status: 500 })
    }

    // parse the JSON responses
    const showData: ShowDetails = await showResponse.json()
    const creditsData: ShowCredits = await creditsResponse.json()
    const similarData: SimilarShowsResponse = await similarResponse.json()
    const reviewsData: ReviewsResponse = await reviewsResponse.json();
    

    // return the combined data as JSON
    return NextResponse.json({ 
      show: showData, 
      credits: creditsData, 
      similarShows: similarData.results.slice(0, 10), 
      reviews: reviewsData.results.slice(0, 10),
    })

  } catch (error) {
    console.error("Error fetching show data:", error)
    return NextResponse.json({ error: "Internal server error" },{ status: 500 })
  }
}
