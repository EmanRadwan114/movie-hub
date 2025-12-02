import { useFetch } from "@/hooks/useMovies";
import { getAllMovies } from "@/services/movies";
import type { IMovie, IMovieResponse } from "@/types/interfaces";
import React, { useCallback, useContext, useEffect } from "react";
import MovieCard from "./MovieCard";
import { MoviesContext } from "@/contexts/MoviesContext";

const MovieList: React.FC = () => {
  const { setMovies, movies } = useContext(MoviesContext);

  const fetchMovies = useCallback(() => getAllMovies(), []);

  const {
    data: fetchedMovies,
    // isLoading: isMovieLoading,
    // isError: isMovieError,
  } = useFetch<IMovieResponse>(fetchMovies);

  useEffect(() => {
    if (fetchedMovies) {
      setMovies(fetchedMovies.results);
    }
  }, [fetchedMovies, setMovies]);

  return (
    <>
      {movies?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-5">
          {movies?.map((item: IMovie) => (
            <MovieCard movie={item} key={item.id} />
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MovieList;
