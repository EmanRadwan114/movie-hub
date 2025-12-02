import { ChevronsLeft, ChevronsRight } from "lucide-react";
import React from "react";
import ReactPaginate from "react-paginate";

interface IProps {
  pageCount: number;
  onHandleChange: (val: number) => void;
  currentPage: number;
}

const Pagination: React.FC<IProps> = ({
  pageCount,
  onHandleChange,
  currentPage,
}) => {
  const handlePageClick = ({ selected }: { selected: number }) => {
    onHandleChange(selected + 1);
  };
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      breakLabel="..."
      nextLabel={<ChevronsRight />}
      onPageChange={handlePageClick}
      pageRangeDisplayed={2}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      previousLabel={<ChevronsLeft />}
      renderOnZeroPageCount={null}
      containerClassName="flex gap-2 items-center justify-center mt-10"
      pageLinkClassName="bg-neutral-300 px-2 py-1 rounded-md not-disabled:cursor-pointer"
      activeLinkClassName="bg-primary text-neutral-50"
      previousClassName="px-2 py-1 rounded-md"
      nextClassName="px-2 py-1 rounded-md"
      disabledClassName="opacity-50 cursor-not-allowed"
    />
  );
};

export default Pagination;
