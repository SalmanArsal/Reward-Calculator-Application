import { useState, useCallback } from 'react';
import logger from '../utils/logger';

/**
 * Custom hook for pagination logic
 * @param {Array} items - Items to paginate
 * @param {number} itemsPerPage - Items per page
 * @returns {Object} Pagination state and handlers
 */
export const usePagination = (items, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((items?.length || 0) / itemsPerPage);

  const goToPage = useCallback((page) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
    logger.info('Navigated to page', { page: pageNumber });
  }, [totalPages]);

  const goToPreviousPage = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const goToNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, totalPages, goToPage]);

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedItems = items?.slice(startIndex, endIndex) || [];

  return {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    resetPagination,
    canGoPrevious: currentPage > 1,
    canGoNext: currentPage < totalPages,
  };
};

export default usePagination;
