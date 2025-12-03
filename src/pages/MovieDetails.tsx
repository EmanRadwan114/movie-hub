import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MovieCategories from "@/components/ui/MovieCategories";
import Rate from "@/components/ui/rate";
import { useFetch } from "@/hooks/useMovies";
import { baseImgURL } from "@/lib/apiUrl";
import { getMovieById } from "@/services/movies";
import type { IMovie } from "@/types/interfaces";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import fallbackImg from "@/assets/fallback-img.jpg";
import { Spinner } from "@/components/ui/spinner";

const MovieDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchMovie = useCallback(() => getMovieById(id!), [id]);

  const { data: movie, isLoading } = useFetch<IMovie>(fetchMovie);

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Spinner className="size-10 text-neutral-500" />
      </div>
    );

  return (
    <main className="flex items-center justify-center">
      <Card className="border-0 shadow-xl p-0 w-full mt-5">
        <CardContent className="p-0 grid grid-cols-1 md:grid-cols-3">
          <div className="w-full">
            <img
              src={
                movie?.poster_path
                  ? `${baseImgURL}${movie?.poster_path}`
                  : fallbackImg
              }
              alt={movie?.title}
              className="object-cover h-[450px] md:min-h-[300px] md:max-h-full w-full rounded-t-xl md:rounded-xl md:rounded-r-none"
            />
          </div>
          <div className="p-5 col-span-2">
            <h2 className="font-extrabold text-xl text-primary mb-2">
              {movie?.title}
            </h2>
            <div className="flex flex-col gap-y-4 text-lg">
              <p className="text-neutral-600 text-lg">{movie?.overview}</p>
              <MovieCategories categories={movie?.genres} />

              {/*———————————————————————————————— release date ————————————————————————————————*/}
              <div className="flex items-center gap-3">
                <span className="capitalize font-extrabold text-neutral-800">
                  release date:{" "}
                </span>
                <Badge
                  variant={"secondary"}
                  className="font-semibold text-base"
                >
                  {movie?.release_date}
                </Badge>
              </div>
              {/*———————————————————————————————— time ————————————————————————————————*/}
              <div className="flex items-center gap-3">
                <span className="capitalize font-extrabold text-neutral-800">
                  time:{" "}
                </span>
                <Badge variant={"default"} className="font-semibold text-base">
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

              <Button
                className="capitalize font-semibold"
                onClick={() => !movie?.homepage && navigate("/")}
              >
                <a
                  href={movie?.homepage && movie?.homepage}
                  target={movie?.homepage ? "_blank" : "_self"}
                  className="w-full inline-block"
                >
                  {movie?.homepage ? "Movie Homepage" : "Back to home"}
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
