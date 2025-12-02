import React, { useContext, useState, type ChangeEvent } from "react";
import logo from "../assets/popcorn.png";
import { Heart, Menu, Search } from "lucide-react";
import { Link } from "react-router";
import { getAllMovies, searchMovie } from "@/services/movies";
import { MoviesContext } from "@/contexts/MoviesContext";
import { Button } from "@/components/ui/Button";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { setMovies, searchTerm, setSearchTerm } = useContext(MoviesContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    if (searchTerm !== "") {
      const result = await searchMovie(searchTerm.trim());
      setMovies(result);
    } else {
      const result = await getAllMovies();
      setMovies(result);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-gray-100 shadow-lg z-50">
      <div className="container mx-auto px-2 py-5">
        <nav className="flex justify-between items-center relative">
          <Link to={"/"}>
            <h1 className="flex items-center">
              <img src={logo} alt="popcorn" className="w-10" />{" "}
              <span className="text-2xl font-extrabold text-primary">
                MoviesHub
              </span>
            </h1>
          </Link>

          <div className="gap-5 w-2/3 justify-end hidden md:flex">
            <Link
              to={"/favorites"}
              className="flex gap-1 items-center font-semibold text-neutral-700 p-2 rounded-md  hover:text-secondary transition-colors duration-300"
            >
              <span>Favourite Movies</span>{" "}
              <Heart className="-mt-0.5" strokeWidth={3} size={16} />
            </Link>
            <div className="flex flex-col sm:flex-row justify-between gap-1 items-start">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search a Movie"
                  className="border rounded-md px-2 py-1.5 focus-within:outline-secondary w-full"
                  value={searchTerm}
                  onChange={handleChange}
                />
                <Search strokeWidth={1} className="absolute end-2 top-1.5" />
              </div>
              <Button
                variant={"secondary"}
                className="font-semibold w-full sm:w-fit"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>

          {/*———————————————————————————————— mobile menu ————————————————————————————————*/}
          <Menu
            className="cursor-pointer p-2 md:hidden"
            size={40}
            onClick={() => setIsOpen((prev) => !prev)}
          />
          {isOpen && (
            <div className="absolute top-full end-1 rounded-xl p-4 bg-neutral-50 shadow-lg z-100 flex flex-col gap-3 w-full sm:w-2/3">
              <Link
                to={"/favorites"}
                className="w-full flex gap-1 items-center font-semibold text-neutral-700 p-2 rounded-md  hover:bg-neutral-200 transition-colors duration-300"
              >
                <span>Favourite Movies</span>{" "}
                <Heart className="-mt-0.5" strokeWidth={3} size={16} />
              </Link>
              <div className="flex flex-col sm:flex-row justify-between gap-1 items-start">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Search a Movie"
                    className="border rounded-md px-2 py-1.5 focus-within:outline-secondary w-full"
                    value={searchTerm}
                    onChange={handleChange}
                  />
                  <Search strokeWidth={1} className="absolute end-2 top-1.5" />
                </div>
                <Button
                  variant={"secondary"}
                  className="font-semibold w-full sm:w-fit"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
