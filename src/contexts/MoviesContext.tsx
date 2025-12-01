import { getCategories } from "@/services/movies";
import type { ICategory } from "@/types/interfaces";
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
}

interface IProps {
  children: ReactNode;
}

const MoviesContext = createContext<IMoviesContext>({
  favorites: [],
  setFavorites: () => {},
  categories: [],
  setCategories: () => {},
});

const MoviesContextProvider: React.FC<IProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);

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
      value={{ favorites, setFavorites, categories, setCategories }}
    >
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesContext, MoviesContextProvider };
