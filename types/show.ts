export interface Show {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date: string;
  vote_average: number;
  overview: string;
}

export interface ShowResponse {
  page: number;
  results: Show[];
  total_pages: number;
  total_results: number;
}

export interface FilterState {
  year: number[];
  rating: number;
  genres: string[];
  sortBy: string;
  page: number;
  search: string;
}

export interface ShowDetails extends Show {
  backdrop_path: string | null;
  episode_run_time: number[];
  genres: { id: number; name: string }[];
  tagline: string;
  status: string;
  number_of_seasons: number;
  number_of_episodes: number;
  production_companies: { id: number; name: string; logo_path: string | null }[];
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface ShowCredits {
  cast: CastMember[];
}

export interface SimilarShow {
  id: number;
  name: string;
  poster_path: string | null;
  first_air_date: string;
}

export interface SimilarShowsResponse {
  results: SimilarShow[];
}

export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details: {
    avatar_path: string | null;
    rating: number | null;
  };
}

export interface ReviewsResponse {
  id: number;
  page: number;
  results: Review[];
  total_pages: number;
  total_results: number;
}
