import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total pages is less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page, last page, current page, and pages around current page
      const leftSiblingIndex = Math.max(currentPage - 1, 1);
      const rightSiblingIndex = Math.min(currentPage + 1, totalPages);
      
      const shouldShowLeftDots = leftSiblingIndex > 2;
      const shouldShowRightDots = rightSiblingIndex < totalPages - 1;
      
      if (!shouldShowLeftDots && shouldShowRightDots) {
        // Show more pages at the beginning
        for (let i = 1; i <= 3; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (shouldShowLeftDots && !shouldShowRightDots) {
        // Show more pages at the end
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 2; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else if (shouldShowLeftDots && shouldShowRightDots) {
        // Show dots on both sides
        pageNumbers.push(1);
        pageNumbers.push('...');
        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else {
        // Show all pages
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      }
    }
    
    return pageNumbers;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <ul className="pagination-list">
        <li className="pagination-item">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`pagination-button pagination-button-prev ${
              currentPage === 1
                ? 'pagination-button-disabled'
                : 'pagination-button-inactive'
            }`}
            aria-label="Previous page"
          >
            <span className="pagination-sr-only">이전</span>
            <svg className="pagination-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
            </svg>
          </button>
        </li>
        
        {getPageNumbers().map((page, index) => (
          <li key={index} className="pagination-item">
            {page === '...' ? (
              <span className="pagination-button pagination-button-inactive">
                &#8230;
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`pagination-button ${
                  currentPage === page
                    ? 'pagination-button-active'
                    : 'pagination-button-inactive'
                }`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        
        <li className="pagination-item">
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`pagination-button pagination-button-next ${
              currentPage === totalPages
                ? 'pagination-button-disabled'
                : 'pagination-button-inactive'
            }`}
            aria-label="Next page"
          >
            <span className="pagination-sr-only">다음</span>
            <svg className="pagination-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination; 