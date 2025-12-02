import { getCategories } from "@/services/movies";
import type { ICategory, IMovie } from "@/types/interfaces";
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";

interface IMoviesContext {
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  movies: IMovie[];
  setMovies: React.Dispatch<React.SetStateAction<IMovie[]>>;
}

interface IProps {
  children: ReactNode;
}

const MoviesContext = createContext<IMoviesContext>({
  favorites: [],
  setFavorites: () => {},
  categories: [],
  setCategories: () => {},
  movies: [],
  setMovies: () => {},
});

const MoviesContextProvider: React.FC<IProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    fetchCategories();
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        setFavorites,
        categories,
        setCategories,
        movies,
        setMovies,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesContext, MoviesContextProvider };
