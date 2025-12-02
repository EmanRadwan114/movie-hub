import { axiosInstance } from "@/lib/apiUrl";

//———————————————————————————————— get all categories ————————————————————————————————
const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/genre/movie/list");
    return response.data.genres;
  } catch {
    throw new Error("Failed to fetch categories");
  }
};

//———————————————————————————————— get all movies ————————————————————————————————
const getAllMovies = async (page?: number) => {
  try {
    const response = await axiosInstance.get(
      `/discover/movie?sort_by=popularity.desc&page=${page ?? 1}`
    );
    return response.data;
  } catch {
    throw new Error("Failed to fetch movies");
  }
};

//———————————————————————————————— get movie by id ————————————————————————————————
const getMovieById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/movie/${id}`);
    return response.data;
  } catch {
    throw new Error("Failed to fetch movie details");
  }
};

//———————————————————————————————— search movies ————————————————————————————————
const searchMovie = async (query: string, page?: number) => {
  try {
    const response = await axiosInstance.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&page=${
        page ?? 1
      }`
    );
    return response.data;
  } catch {
    throw new Error("Failed to search movies");
  }
};

export { getCategories, getAllMovies, getMovieById, searchMovie };
