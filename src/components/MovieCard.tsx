import React, { useContext } from "react";
import type { IMovie } from "@/types/interfaces";
import { baseImgURL } from "@/lib/apiUrl";
import { Link, useNavigate } from "react-router";
import { Heart } from "lucide-react";
import { MoviesContext } from "@/contexts/MoviesContext";
import { toast } from "react-toastify";
import MovieCategories from "./ui/MovieCategories";
import { useCategories } from "@/hooks/useCategories";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Rate from "@/components/ui/Rate";

interface IProps {
  movie: IMovie;
}

const MovieCard: React.FC<IProps> = ({ movie }) => {
  const { movieCategories } = useCategories(movie.genre_ids);

  const navigate = useNavigate();

  //———————————————————————————————— add to favourite ————————————————————————————————
  const { favorites, setFavorites } = useContext(MoviesContext);

  const addToFavourite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites((prev) => prev.filter((item) => item !== id));
      toast.success("Movie removed from favorites successfully");
    } else {
      setFavorites((prev) => [...prev, id]);
      toast.success("Movie added to favorites successfully");
    }
  };

  return (
    <>
      <Card
        key={movie.id}
        className="border-0 shadow-lg pt-0 pb-5 gap-2 overflow-hidden group"
      >
        {/*———————————————————————————————— card header ————————————————————————————————*/}
        <CardHeader className="p-0 relative gap-0 mb-2">
          <img
            src={`${baseImgURL}${movie.poster_path}`}
            alt={movie.title}
            className="object-cover w-full h-72 rounded-t-xl group-hover:scale-105 transition-transform duration-500"
          />

          <div className="absolute inset-0 bg-black/20 group-hover:scale-105 transition-transform duration-500">
            <Heart
              size={30}
              className={`absolute top-5 end-5 text-transparent cursor-pointer ${
                favorites.includes(movie.id) ? "fill-red-700" : "fill-white"
              }`}
              fill="white"
              onClick={() => addToFavourite(movie.id)}
            />
          </div>
        </CardHeader>
        {/*———————————————————————————————— card content ————————————————————————————————*/}
        <Link to={`/movie/${movie.id}`}>
          <CardContent className="px-5 mb-2">
            <h3 className="text-primary font-semibold capitalize text-lg mb-1 hover:text-secondary transition-colors duration-300">
              {movie.title}
            </h3>
            <p className="text-neutral-600 mb-2">
              {movie.overview.slice(0, 50)}...
            </p>
            <MovieCategories categories={movieCategories} />
          </CardContent>
        </Link>

        {/*———————————————————————————————— card footer ————————————————————————————————*/}
        <CardFooter className="justify-between gap-x-2 mt-auto">
          <Button
            className="capitalize font-semibold w-2/3"
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            View details
          </Button>
          <Rate movie={movie} />
        </CardFooter>
      </Card>
    </>
  );
};

export default MovieCard;
