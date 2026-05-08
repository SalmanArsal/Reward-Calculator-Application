/**
 * Get paginated items
 * @param {Array} items - Array of items to paginate
 * @param {number} currentPage - Current page number (1-based)
 * @param {number} itemsPerPage - Number of items per page
 * @returns {Array} Paginated items for current page
 */
export const getPaginatedItems = (items, currentPage, itemsPerPage = 10) => {
  if (!Array.isArray(items) || items.length === 0) {
    return [];
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return items.slice(startIndex, endIndex);
};

/**
 * Get total pages
 * @param {number} totalItems - Total number of items
 * @param {number} itemsPerPage - Number of items per page
 * @returns {number} Total pages
 */
export const getTotalPages = (totalItems, itemsPerPage = 10) => {
  if (totalItems <= 0 || itemsPerPage <= 0) {
    return 0;
  }
  return Math.ceil(totalItems / itemsPerPage);
};

/**
 * Check if can go to previous page
 * @param {number} currentPage - Current page number
 * @returns {boolean} True if can go to previous page
 */
export const canGoPrevious = (currentPage) => {
  return currentPage > 1;
};

/**
 * Check if can go to next page
 * @param {number} currentPage - Current page
 * @param {number} totalPages - Total pages
 * @returns {boolean} True if can go to next page
 */
export const canGoNext = (currentPage, totalPages) => {
  return currentPage < totalPages;
};

/**
 * Get page numbers to display in pagination
 * @param {number} currentPage - Current page
 * @param {number} totalPages - Total pages
 * @param {number} maxButtons - Maximum number of buttons to show
 * @returns {Array} Array of page numbers
 */
export const getPageNumbers = (currentPage, totalPages, maxButtons = 5) => {
  const pages = [];

  if (totalPages <= maxButtons) {
    // Show all pages
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    const halfButtons = Math.floor(maxButtons / 2);
    let startPage = Math.max(1, currentPage - halfButtons);
    let endPage = Math.min(totalPages, startPage + maxButtons - 1);

    if (endPage - startPage + 1 < maxButtons) {
      startPage = Math.max(1, endPage - maxButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
  }

  return pages;
};
