import { useFetch } from "@/hooks/useMovies";
import { getAllMovies, searchMovie } from "@/services/movies";
import type { IMovie, IMovieResponse } from "@/types/interfaces";
import React, { useCallback, useContext, useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MoviesContext } from "@/contexts/MoviesContext";
import Pagination from "./ui/Pagination";

const MovieList: React.FC = () => {
  const { setMovies, movies, searchTerm } = useContext(MoviesContext);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMovies = useCallback(
    () =>
      searchTerm !== ""
        ? searchMovie(searchTerm, currentPage)
        : getAllMovies(currentPage),
    [currentPage]
  );

  const {
    data: fetchedMovies,
    // isLoading: isMovieLoading,
    // isError: isMovieError,
  } = useFetch<IMovieResponse>(fetchMovies);

  useEffect(() => {
    if (fetchedMovies) {
      setMovies(fetchedMovies);
    }
  }, [fetchedMovies, setMovies]);

  const handlePaginationChange = (val: number) => {
    setCurrentPage(val);
    // setMovies(fetchedMovies);
  };

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
        <div className="flex items-center justify-center py-10">
          <p className="text-2xl font-semibold text-neutral-700 text-center ">
            No Movies Found
          </p>
        </div>
      )}
    </>
  );
};

export default MovieList;
