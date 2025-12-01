import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { MoviesContextProvider } from "./contexts/MoviesContext";
import "./index.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movie/:id", element: <MovieDetails /> },
      { path: "*", element: "" },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <MoviesContextProvider>
    <RouterProvider router={router}></RouterProvider>
  </MoviesContextProvider>
);
