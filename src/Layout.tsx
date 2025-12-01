import { ToastContainer } from "react-toastify";
import "./App.css";
import { Outlet } from "react-router";
import { MoviesContext } from "./contexts/MoviesContext";
import { useContext, useEffect } from "react";

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
    <>
      <ToastContainer />
      <Outlet />
    </>
  );
}

export default Layout;
