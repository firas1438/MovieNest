import { NextResponse } from "next/server";
import { MovieDetails, MovieCredits, SimilarMoviesResponse } from "@/types/movie";

const TMDB_API_KEY = process.env.API_KEY;

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    // check whether the api key exists
    if (!TMDB_API_KEY) {
      return NextResponse.json( { error: "TMDB API key is missing" }, { status: 500 });
    }

    // fetch movie details, credits, and similar movies concurrently
    const [movieResponse, creditsResponse, similarResponse] = await Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${TMDB_API_KEY}&language=en-US`),
      fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`),
    ]);

    // handle fetch errors
    if (!movieResponse.ok || !creditsResponse.ok || !similarResponse.ok) {
      return NextResponse.json({ error: "Failed to fetch movie data from TMDB" }, { status: 500} );
    }

    // parse the JSON responses
    const movieData: MovieDetails = await movieResponse.json();
    const creditsData: MovieCredits = await creditsResponse.json();
    const similarData: SimilarMoviesResponse = await similarResponse.json();

    // return the combined data as JSON
    return NextResponse.json({ movie: movieData, credits: creditsData, similarMovies: similarData.results.slice(0, 10),});
  
    } catch (error) {
        console.error("Error fetching movie data:", error);
        return NextResponse.json( { error: "Internal server error" }, { status: 500 });
    }
}