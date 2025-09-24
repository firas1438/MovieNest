// /app/api/celebrities/route.ts
import { NextResponse } from "next/server";

const TMDB_API_KEY = process.env.TMDB_API_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page") || "1";
  const search = searchParams.get("search") || "";

  try {
    const params = new URLSearchParams({
      api_key: TMDB_API_KEY!,
      language: "en-US",
      page,
    });

    // TMDB endpoint: search people if query exists, otherwise get popular people
    const endpoint = search
      ? `https://api.themoviedb.org/3/search/person?query=${encodeURIComponent(search)}&${params}`
      : `https://api.themoviedb.org/3/person/popular?${params}`;

    const res = await fetch(endpoint);

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch celebrities from TMDB" }, { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
    
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
