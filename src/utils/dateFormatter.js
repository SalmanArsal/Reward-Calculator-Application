/**
 * Date Formatting Utilities
 */

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Format date to 'MMM DD, YYYY' format
 * @param {string} dateString - Date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch (error) {
    return dateString;
  }
};

/**
 * Get month name from month number
 * @param {number} monthNumber - Month number (1-12)
 * @returns {string} Month name
 */
export const getMonthName = (monthNumber) => {
  if (monthNumber < 1 || monthNumber > 12) {
    return '';
  }
  return MONTHS[monthNumber - 1];
};

/**
 * Get short month name
 * @param {number} monthNumber - Month number (1-12)
 * @returns {string} Short month name
 */
export const getMonthShortName = (monthNumber) => {
  if (monthNumber < 1 || monthNumber > 12) {
    return '';
  }
  return MONTH_SHORT[monthNumber - 1];
};

/**
 * Get month number from month name
 * @param {string} monthName - Month name or short name
 * @returns {number} Month number (1-12) or 0 if not found
 */
export const getMonthNumber = (monthName) => {
  const upperName = monthName.toUpperCase();
  const index = MONTHS.findIndex(m => m.toUpperCase() === upperName) + 1;
  return index !== 0 ? index : MONTH_SHORT.findIndex(m => m.toUpperCase() === upperName) + 1;
};

/**
 * Get year range
 * @param {number} startYear - Start year
 * @param {number} endYear - End year
 * @returns {Array} Array of years
 */
export const getYearRange = (startYear, endYear) => {
  const years = [];
  for (let i = startYear; i <= endYear; i++) {
    years.push(i);
  }
  return years;
};

/**
 * Get last N months
 * @param {number} n - Number of months
 * @returns {Array} Array of {month, year}
 */
export const getLastNMonths = (n = 3) => {
  const months = [];
  const today = new Date();

  for (let i = 0; i < n; i++) {
    const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
    months.push({
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      label: `${getMonthName(date.getMonth() + 1)} ${date.getFullYear()}`,
    });
  }

  return months;
};
