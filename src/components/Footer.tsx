import React from "react";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="flex justify-center items-center bg-secondary py-3 px-1 mt-auto">
      <p className="text-white capitalize font-semibold">
        all rights reserved &copy; MoviesHub {year}
      </p>
      ;
    </footer>
  );
};

export default Footer;
