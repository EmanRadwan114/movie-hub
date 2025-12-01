import React, { useCallback, useContext } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import type { ICategory, IMovie } from "@/types/interfaces";
import { baseImgURL } from "@/lib/apiUrl";
import { useFetch } from "@/hooks/useMovies";
import { getCategories } from "@/services/movies";
import { Badge } from "./ui/badge";
import { Link, useNavigate } from "react-router";
import { Heart, Star } from "lucide-react";
import { Button } from "./ui/button";
import { MoviesContext } from "@/contexts/MoviesContext";
import { toast } from "react-toastify";

interface IProps {
  movie: IMovie;
}

const MovieCard: React.FC<IProps> = ({ movie }) => {
  const navigate = useNavigate();

  const fetchCategories = useCallback(() => getCategories(), []);

  const {
    data: categories = [],
    isLoading,
    isError,
  } = useFetch(fetchCategories);

  //————————————————————— get movie categories to display it ———————————————————————
  //movie.genre_ids is an array of movie categories IDs
  const movieCategories = categories?.filter((cat: ICategory) =>
    movie.genre_ids.includes(cat.id)
  );

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

          <div className="flex gap-x-1 gap-y-2 flex-wrap">
            {movieCategories?.map((item: ICategory) => (
              <Badge className="font-semibold" key={item.id}>
                {item.name}
              </Badge>
            ))}
          </div>
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
        <div className="flex gap-x-1 items-center">
          <span className="font-semibold">{movie.vote_average.toFixed(1)}</span>
          <Star size={17} className="fill-secondary text-secondary" />
        </div>
      </CardFooter>
    </Card>
  );
};

export default MovieCard;
