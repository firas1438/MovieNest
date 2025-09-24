// /app/api/celebrities/[id]/route.ts
import { NextResponse } from "next/server";
import type { CelebrityDetails, CelebrityCombinedCredits, CelebrityExternalIds, } from "@/types/celebrity";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET( request: Request, { params }: { params: { id: string } } ) {
  const { id } = params;

  try {
    // Ensure TMDB API key is present
    if (!TMDB_API_KEY) {
      return NextResponse.json(
        { error: "TMDB API key is missing" }, { status: 500 }
      );
    }

    // Fetch celebrity data concurrently
    const [detailsRes, creditsRes, externalIdsRes] = await Promise.all([
      fetch( `https://api.themoviedb.org/3/person/${id}?api_key=${TMDB_API_KEY}&language=en-US` ),
      fetch( `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${TMDB_API_KEY}&language=en-US` ),
      fetch( `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${TMDB_API_KEY}&language=en-US` ),
    ]);

    // Handle errors if any fetch fails
    if (!detailsRes.ok || !creditsRes.ok || !externalIdsRes.ok) {
      return NextResponse.json(
        { error: "Failed to fetch celebrity data from TMDB" },
        { status: 500 }
      );
    }

    // Parse JSON
    const detailsData: CelebrityDetails = await detailsRes.json();
    const creditsData: CelebrityCombinedCredits = await creditsRes.json();
    const externalIdsData: CelebrityExternalIds = await externalIdsRes.json();

    // Return structured data
    return NextResponse.json({
      celebrity: detailsData,
      credits: creditsData,
      externalIds: externalIdsData,
    });
  } catch (error) {
    console.error("Error fetching celebrity data:", error);
    return NextResponse.json(
      { error: "Internal server error" }, { status: 500 }
    );
  }
}
