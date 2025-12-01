export interface IMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface ICategory {
  id: number;
  name: string;
}
