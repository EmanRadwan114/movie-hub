import React, { createContext, useState, type ReactNode } from "react";

interface IMoviesContext {
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
}

interface IProps {
  children: ReactNode;
}

const MoviesContext = createContext<IMoviesContext>({
  favorites: [],
  setFavorites: () => {},
});

const MoviesContextProvider: React.FC<IProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>([]);
  return (
    <MoviesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </MoviesContext.Provider>
  );
};

export { MoviesContext, MoviesContextProvider };
