export interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  vote_count: number;
  genres?: ICategory[];
  runtime?: number;
  homepage?: string;
}

export interface IMovieResponse {
  results: IMovie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface ICategory {
  id: number;
  name: string;
}
