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
        <span>
          {totalPages > 0 ? (
            <>
              <span className="inline-block min-w-[.5rem]">
                {currentPage + 1}
              </span>{" "}
              / <span className="inline-block min-w-[.5rem]">{totalPages}</span>
            </>
          ) : (
            <span className="inline-block min-w-[1rem]">0 / 0</span>
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
