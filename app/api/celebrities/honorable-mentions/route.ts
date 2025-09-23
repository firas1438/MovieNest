// api/celebrities/honorable-mentions/route.ts
import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.API_KEY;

// static list of TMDb IDs for honorable mentions
const HONORABLE_MENTIONS = [
  { name: "Leonardo DiCaprio", tmdbId: 6193 },
  { name: "Angelina Jolie", tmdbId: 11701 },
  { name: "Morgan Freeman", tmdbId: 192 },
  { name: "Tom Hanks", tmdbId: 31 },
  { name: "Steven Spielberg", tmdbId: 488 },
  { name: "Brad Pitt", tmdbId: 287 },
  { name: "Sam Raimi", tmdbId: 7623 },
  { name: "Denzel Washington", tmdbId: 5292 },
];

export async function GET() {
  try {
    const promises = HONORABLE_MENTIONS.map(async (celeb) => {
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${celeb.tmdbId}?api_key=${TMDB_API_KEY}&language=en-US`
      );

      if (!res.ok) {
        throw new Error(`Failed to fetch data for ${celeb.name}`);
      }

      const data = await res.json();
      return {
        id: data.id,
        name: data.name,
        profile_path: data.profile_path, 
        department: data.known_for_department, 
      };
    });

    const results = await Promise.all(promises);
    return NextResponse.json(results);

  } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch honorable mentions" }, { status: 500 }
        );
  }
}
