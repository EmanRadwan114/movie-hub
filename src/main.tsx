import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home";
import "./index.css";
import { MoviesContextProvider } from "./contexts/MoviesContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "movie/:id", element: "" },
      { path: "*", element: "" },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <MoviesContextProvider>
    <RouterProvider router={router}></RouterProvider>
  </MoviesContextProvider>
);
