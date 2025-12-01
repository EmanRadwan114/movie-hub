import axios from "axios";

export const baseURL = "https://api.themoviedb.org/3";
export const baseImgURL = "https://image.tmdb.org/t/p/w500";

export const axiosInstance = axios.create({
  baseURL,
  timeout: 1000,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
  },
});
