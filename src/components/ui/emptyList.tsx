import React from "react";

interface IProps {
  message: string;
}

const EmptyList: React.FC<IProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center py-10 min-h-[60vh]">
      <p className="text-2xl font-semibold text-neutral-700 text-center capitalize">
        {message}
      </p>
    </div>
  );
};

export default EmptyList;
