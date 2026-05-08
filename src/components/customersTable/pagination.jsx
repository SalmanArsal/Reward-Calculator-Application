import PropTypes from 'prop-types';
import { getPageNumbers } from '../../utils/paginationHelper';
import './pagination.css';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  onPreviousClick,
  onNextClick,
}) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = getPageNumbers(currentPage, totalPages, 5);

  return (
    <div className="pagination-container">
      <button
        className="pagination-button prev-button"
        onClick={onPreviousClick}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        ← Previous
      </button>

      <div className="page-numbers">
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`page-number ${page === currentPage ? 'active' : ''}`}
            onClick={() => onPageChange(page)}
            aria-label={`Go to page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        className="pagination-button next-button"
        onClick={onNextClick}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        Next →
      </button>

      <div className="pagination-info">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPreviousClick: PropTypes.func.isRequired,
  onNextClick: PropTypes.func.isRequired,
};

export default Pagination;
