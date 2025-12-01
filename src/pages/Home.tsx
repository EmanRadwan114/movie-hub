import MovieList from "@/components/MovieList";
import React from "react";

const Home: React.FC = () => {
  return (
    <div className="container p-5 mx-auto">
      <MovieList />
    </div>
  );
};

export default Home;
