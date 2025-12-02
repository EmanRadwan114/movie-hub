import { ToastContainer } from "react-toastify";
import "./App.css";
import { Outlet } from "react-router";
import { MoviesContext } from "./contexts/MoviesContext";
import { useContext, useEffect } from "react";
import Navbar from "./components/Navbar";

function Layout() {
  const { favorites, setFavorites } = useContext(MoviesContext);

  useEffect(() => {
    if (localStorage.getItem("favorite-movies") !== null)
      setFavorites(JSON.parse(localStorage.getItem("favorite-movies")!));
  }, []);

  useEffect(() => {
    localStorage.setItem("favorite-movies", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <div className="flex flex-col gap-12 ">
      <Navbar />
      <ToastContainer />
      <div className="container px-3 py-16 md:px-5 mx-auto min-h-[90vh]">
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
