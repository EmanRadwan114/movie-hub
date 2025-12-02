import { getCategories } from "@/services/movies";
import type { ICategory, IMovie, IMovieResponse } from "@/types/interfaces";
import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";

interface IMoviesContext {
  favorites: IMovie[];
  setFavorites: React.Dispatch<React.SetStateAction<IMovie[]>>;
  categories: ICategory[];
  setCategories: React.Dispatch<React.SetStateAction<ICategory[]>>;
  movies: IMovieResponse | null;
  setMovies: React.Dispatch<React.SetStateAction<IMovieResponse | null>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

interface IProps {
  children: ReactNode;
}

const MoviesContext = createContext<IMoviesContext>({
  favorites: [],
  setFavorites: () => {},
  categories: [],
  setCategories: () => {},
  movies: null,
  setMovies: () => {},
  searchTerm: "",
  setSearchTerm: () => {},
});

const MoviesContextProvider: React.FC<IProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<IMovie[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [movies, setMovies] = useState<IMovieResponse | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

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
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesContext, MoviesContextProvider };
