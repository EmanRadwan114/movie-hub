import MovieCard from "@/components/MovieCard";
import { Button } from "@/components/ui/button";
import EmptyList from "@/components/ui/emptyList";
import { MoviesContext } from "@/contexts/MoviesContext";
import React, { useContext } from "react";
import { toast } from "react-toastify";

const FavoriteMovies: React.FC = () => {
  const { favorites, setFavorites } = useContext(MoviesContext);

  return (
    <main>
      {favorites.length ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 mb-6">
            <p className="text-neutral-800 font-semibold text-xl capitalize mb-2">
              you have{" "}
              <span className="text-secondary">{favorites.length}</span>{" "}
              favorite {favorites.length === 1 ? "movie" : "movies"}
            </p>
            <Button
              variant={"destructive"}
              className="w-full sm:w-fit"
              onClick={() => {
                setFavorites([]);
                toast.success("Favorite list is cleared successfully!");
              }}
            >
              Clear List
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-5">
            {favorites?.map((item) => (
              <MovieCard key={item.id} movie={item} />
            ))}
          </div>
        </>
      ) : (
        <EmptyList message="your favorite list is empty. start by adding a favorite movie" />
      )}
    </main>
  );
};

export default FavoriteMovies;
