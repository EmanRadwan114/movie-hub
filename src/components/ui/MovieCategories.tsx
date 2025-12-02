import type { ICategory } from "@/types/interfaces";
import React from "react";
import { Badge } from "@/components/ui/badge";

interface IProps {
  categories: ICategory[] | undefined;
}

const MovieCategories: React.FC<IProps> = ({ categories }) => {
  return (
    <div className="flex gap-x-1 gap-y-2 flex-wrap">
      {categories?.map((item: ICategory) => (
        <Badge className="font-semibold text-base" key={item.id}>
          {item?.name}
        </Badge>
      ))}
    </div>
  );
};

export default MovieCategories;
