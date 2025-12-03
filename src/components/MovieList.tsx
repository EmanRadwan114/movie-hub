import { useFetch } from "@/hooks/useMovies";
import { getAllMovies, searchMovie } from "@/services/movies";
import type { IMovie, IMovieResponse } from "@/types/interfaces";
import React, { useCallback, useContext, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MoviesContext } from "@/contexts/MoviesContext";
import Pagination from "./ui/Pagination";
import EmptyList from "./ui/emptyList";
import { Spinner } from "./ui/spinner";

const MovieList: React.FC = () => {
  const { setMovies, movies, searchTerm, currentPage, setCurrentPage } =
    useContext(MoviesContext);

  const fetchMovies = useCallback(
    () =>
      searchTerm !== ""
        ? searchMovie(searchTerm, currentPage)
        : getAllMovies(currentPage),
    [currentPage]
  );

  const {
    data: fetchedMovies,
    isLoading: isMovieLoading,
    // isError: isMovieError,
  } = useFetch<IMovieResponse>(fetchMovies);

  useEffect(() => {
    if (fetchedMovies) {
      setMovies(fetchedMovies);
    }
  }, [fetchedMovies, setMovies]);

  const handlePaginationChange = (val: number) => {
    setCurrentPage(val);
  };

  if (isMovieLoading) return <Spinner />;

  return (
    <>
      {movies?.results?.length ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-x-3 gap-y-5">
            {movies.results?.map((item: IMovie) => (
              <MovieCard movie={item} key={item.id} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            pageCount={movies.total_pages}
            onHandleChange={handlePaginationChange}
          />
        </>
      ) : (
        <EmptyList message="no movies found" />
      )}
    </>
  );
};

export default MovieList;
