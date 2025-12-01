import { useFetch } from "@/hooks/useMovies";
import { getAllMovies } from "@/services/movies";
import type { IMovie } from "@/types/interfaces";
import React, { useCallback } from "react";
import MovieCard from "./MovieCard";

const MovieList: React.FC = () => {
  const fetchMovies = useCallback(() => getAllMovies(), []);

  const { data: movies, isLoading, isError } = useFetch(fetchMovies);

  return (
    <>
      {movies?.results.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-5">
          {movies?.results.map((item: IMovie) => (
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
