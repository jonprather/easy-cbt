// components/Pagination.tsx

import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  nextCursor: string | undefined;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onNextPage,
  onPrevPage,
  nextCursor,
}) => {
  return (
    <div className="btn-group">
      <button
        data-testid="prev-btn"
        onClick={onPrevPage}
        disabled={currentPage === 0}
        className="btn-neutral btn text-lg"
      >
        <FaArrowLeft />
      </button>

      <div className="btn-neutral btn pointer-events-none font-semibold text-base-content shadow-md">
        <span className="">
          {totalPages > 0 ? (
            <>
              <span className="inline-block min-w-[2ch]">
                {currentPage + 1}
              </span>
              <span className="hidden min-w-[3ch] six:inline-block">
                / {totalPages}
              </span>
            </>
          ) : (
            <span className="inline-block min-w-[1rem]">
              0<span className="hidden six:inline"> / 0 </span>
            </span>
          )}
        </span>
      </div>

      <button
        data-testid="next-btn"
        onClick={onNextPage}
        disabled={!nextCursor}
        className="btn-neutral btn text-lg"
      >
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
