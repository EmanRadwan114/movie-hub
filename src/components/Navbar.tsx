import React, { useContext, useState, type ChangeEvent } from "react";
import logo from "../assets/popcorn.png";
import { Heart, Menu, Search } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { getAllMovies, searchMovie } from "@/services/movies";
import { MoviesContext } from "@/contexts/MoviesContext";
import { Button } from "@/components/ui/button";
import { Badge } from "./ui/badge";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const {
    setMovies,
    searchTerm,
    setSearchTerm,
    favorites,
    setCurrentPage,
    currentPage,
  } = useContext(MoviesContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    navigate("/");
    if (searchTerm !== "") {
      const result = await searchMovie(searchTerm.trim(), currentPage);
      setMovies(result);
      setCurrentPage(1);
    } else {
      const result = await getAllMovies(currentPage);
      setMovies(result);
    }
  };

  return (
    <header className="fixed top-0 w-full bg-gray-100 shadow-lg z-50">
      <div className="container mx-auto px-2 py-5">
        <nav className="flex justify-between items-center relative">
          <Link
            to={"/"}
            onClick={async () => {
              setSearchTerm("");
              setCurrentPage(1);
              const result = await getAllMovies(currentPage);
              setMovies(result);
            }}
          >
            <h1 className="flex items-center">
              <img src={logo} alt="popcorn" className="w-8" />{" "}
              <span className="text-2xl font-extrabold text-primary -ms-1 mt-0.5">
                MoviesHub
              </span>
            </h1>
          </Link>

          <div className="gap-5 w-2/3 justify-end items-center hidden md:flex">
            <Link
              to={"/favorites"}
              className="font-semibold text-neutral-700 p-2 rounded-md  hover:text-primary transition-colors duration-300 relative"
              onClick={() => {
                setSearchTerm("");
              }}
            >
              <Heart strokeWidth={1} size={30} />
              {favorites.length ? (
                <Badge
                  variant={"primary"}
                  className="w-4 rounded-md absolute end-0 top-0 text-sm p-0"
                >
                  {favorites.length}
                </Badge>
              ) : null}
            </Link>
            <div className="flex flex-col sm:flex-row justify-between gap-1 items-start">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search a Movie"
                  className="border rounded-md px-2 py-1.5 focus-within:outline-primary w-full"
                  value={searchTerm}
                  onChange={handleChange}
                />
                <Search strokeWidth={1} className="absolute end-2 top-1.5" />
              </div>
              <Button
                variant={"default"}
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
                className="font-semibold text-neutral-700 p-2 rounded-md  hover:text-primary transition-colors duration-300 relative w-fit mx-auto"
              >
                <Heart strokeWidth={1} size={30} />
                {favorites.length ? (
                  <Badge
                    variant={"primary"}
                    className="w-4 rounded-md absolute end-0 top-0 text-sm p-0"
                  >
                    {favorites.length}
                  </Badge>
                ) : null}
              </Link>
              <div className="flex flex-col sm:flex-row justify-between gap-1 items-start">
                <div className="relative flex-1 w-full">
                  <input
                    type="text"
                    placeholder="Search a Movie"
                    className="border rounded-md px-2 py-1.5 focus-within:outline-primary w-full"
                    value={searchTerm}
                    onChange={handleChange}
                  />
                  <Search strokeWidth={1} className="absolute end-2 top-1.5" />
                </div>
                <Button
                  variant={"default"}
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
