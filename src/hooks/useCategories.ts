import type { ICategory } from "@/types/interfaces";
import { MoviesContext } from "@/contexts/MoviesContext";
import { useContext, useMemo } from "react";

const useCategories = (MovieCats: number[]) => {
  const { categories } = useContext(MoviesContext);

  //————————————————————— get movie categories to display it ———————————————————————
  //movie.genre_ids is an array of movie categories IDs
  const movieCategories = useMemo(() => {
    return categories?.filter((cat: ICategory) => MovieCats?.includes(cat.id));
  }, [categories, MovieCats]);

  return { movieCategories };
};

export { useCategories };
