import React from 'react';

const Pagination = ({ itemsPerPage, totalItems, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevPage = () => {
    onPageChange(currentPage - 1);
  };

  const handleNextPage = () => {
    onPageChange(currentPage + 1);
  };

  return (
    <div>
      <button onClick={handlePrevPage} disabled={currentPage === 0}>
        Prev
      </button>
      <span>{currentPage + 1}</span>
      <button onClick={handleNextPage} disabled={currentPage + 1 === totalPages}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
