import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import MovieCategories from "@/components/ui/MovieCategories";
import Rate from "@/components/ui/Rate";
import { useFetch } from "@/hooks/useMovies";
import { baseImgURL } from "@/lib/apiUrl";
import { getMovieById } from "@/services/movies";
import type { IMovie } from "@/types/interfaces";
import React, { useCallback } from "react";
import { useParams } from "react-router";

const MovieDetails: React.FC = () => {
  const { id } = useParams();

  const fetchMovie = useCallback(() => getMovieById(id!), [id]);

  const {
    data: movie,
    isLoading,
    // isError
  } = useFetch<IMovie>(fetchMovie);
  console.log(movie?.genres);

  if (isLoading) return;
  return (
    <main className="flex items-center justify-center">
      <Card className="border-0 shadow-xl p-0 w-full">
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3 items-center">
          <div className="w-full">
            <img
              src={`${baseImgURL}${movie?.poster_path}`}
              alt={movie?.title}
              className="object-cover h-[450px] md:min-h-[300px] w-full rounded-t-xl md:rounded-xl md:rounded-r-none"
            />
          </div>
          <div className="p-5 col-span-2">
            <h2 className="font-extrabold text-xl text-primary mb-2">
              {movie?.title}
            </h2>
            <div className="flex flex-col gap-y-4">
              <p className="text-neutral-600">{movie?.overview}</p>
              <MovieCategories categories={movie?.genres} />

              {/*———————————————————————————————— release date ————————————————————————————————*/}
              <div className="flex items-center gap-3">
                <span className="capitalize font-extrabold text-neutral-800">
                  release date:{" "}
                </span>
                <Badge variant={"secondary"} className="font-semibold">
                  {movie?.release_date}
                </Badge>
              </div>
              {/*———————————————————————————————— time ————————————————————————————————*/}
              <div className="flex items-center gap-3">
                <span className="capitalize font-extrabold text-neutral-800">
                  time:{" "}
                </span>
                <Badge variant={"default"} className="font-semibold">
                  {movie?.runtime} mins
                </Badge>
              </div>

              {/*———————————————————————————————— rate ————————————————————————————————*/}
              <div className="flex items-center gap-3">
                <span className="capitalize font-extrabold text-neutral-800">
                  Avg Rate:{" "}
                </span>
                <Rate movie={movie && movie} />{" "}
                <span className="text-neutral-500">
                  ({movie?.vote_count} rates)
                </span>
              </div>

              <Button className="capitalize font-semibold">
                <a
                  href={movie?.homepage ? movie?.homepage : "/"}
                  target={movie?.homepage ? "_blank" : "_self"}
                  className="w-full inline-block"
                >
                  book your seat
                </a>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default MovieDetails;
