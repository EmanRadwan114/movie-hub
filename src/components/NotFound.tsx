import React from "react";
import img from "@/assets/404-error-page-found.png";
import { Button } from "./ui/button";
import { Link } from "react-router";

const NotFound: React.FC = () => {
  return (
    <div className="min-h-[60vh] text-center">
      <img src={img} alt="404 not found" className="w-64 mx-auto" />
      <Link to={"/"}>
        <Button className="capitalize font-semibold">Back to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
