// /types/celebrity.ts

export interface Celebrity {
  id: number;
  name: string;
  profile_path: string | null;
  known_for_department: string; // "Acting", "Directing", etc.
  popularity: number;
}

export interface CelebrityKnownFor {
  id: number;
  title?: string; // for movies
  name?: string;  // for TV shows
  media_type: "movie" | "tv";
  poster_path?: string | null;
}

export interface CelebrityResponse {
  page: number;
  results: Celebrity[];
  total_pages: number;
  total_results: number;
}

export interface CelebrityFilters {
  page: number;
  search: string;
}


// Detailed celebrity info
export interface CelebrityDetails {
  id: number;
  name: string;
  biography: string;
  birthday: string | null;
  deathday: string | null;
  known_for_department: string;
  place_of_birth: string | null;
  profile_path: string | null;
  popularity: number;
  imdb_id?: string;
}

// Combined credits (movies + TV)
export interface CelebrityCombinedCredits {
  cast: Array<{
    id: number;
    title?: string;        // for movies
    name?: string;         // for TV shows
    character?: string;    // role played
    job?: string;          // for crew
    release_date?: string;
    first_air_date?: string;
    media_type: "movie" | "tv";
    poster_path: string | null;
  }>;
  crew: Array<{
    id: number;
    title?: string;
    name?: string;
    job: string;           // position like "Director", "Producer"
    department: string;    // department like "Writing", "Production"
    release_date?: string;
    first_air_date?: string;
    media_type: "movie" | "tv";
    poster_path: string | null;
  }>;
}

// External IDs like IMDb, social platforms
export interface CelebrityExternalIds {
  imdb_id?: string;
  facebook_id?: string | null;
  instagram_id?: string | null;
  twitter_id?: string | null;
}
