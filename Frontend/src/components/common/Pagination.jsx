import React from "react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center space-x-4 p-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-md text-sm sm:text-base ${
          currentPage === 1
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-button text-text-heading hover:bg-button-hover cursor-pointer"
        }`}
      >
        Prev
      </button>
      <span className="text-text-body text-sm sm:text-base mt-2 sm:mt-0">
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-md text-sm sm:text-base ${
          currentPage === totalPages
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-button text-text-heading hover:bg-button-hover cursor-pointer"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
