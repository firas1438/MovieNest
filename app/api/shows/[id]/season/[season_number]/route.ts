import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; season_number: string } }
) {
  const { id, season_number } = params;
  const TMDB_API_KEY = process.env.TMDB_API_KEY;

  if (!TMDB_API_KEY) {
    return NextResponse.json({ error: "Missing TMDB API key" }, { status: 500 });
  }

  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${TMDB_API_KEY}`
    );

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch season data" }, { status: res.status });
    }

    const data = await res.json();
    const episodes = data.episodes.map((ep: any) => ({
      episode_number: ep.episode_number,
      name: ep.name,
    }));

    return NextResponse.json({
      season_number: data.season_number,
      episodes,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
