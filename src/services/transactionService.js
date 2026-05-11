import logger from '../utils/logger';
import { API_TIMEOUT, FILTER_MONTH_OPTIONS } from '../constants';

/**
 * Fetch all transactions from mock API
 * @returns {Promise<Array>} Array of transactions
 */
export const fetchTransactions = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch('/data/transactions.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        logger.info('Transactions fetched successfully', { count: data.length });
        resolve(data);
      } catch (error) {
        logger.error('Failed to fetch transactions', { error: error.message });
        reject(error);
      }
    }, API_TIMEOUT);
  });
};

/**
 * Get unique customers from transactions
 * @param {Array} transactions - Array of transactions
 * @returns {Array} Array of unique customers
 */
export const getUniqueCustomers = (transactions) => {
  try {
    const customersMap = new Map();

    transactions.forEach((transaction) => {
      if (!customersMap.has(transaction.customerId)) {
        customersMap.set(transaction.customerId, {
          customerId: transaction.customerId,
          customerName: transaction.customerName,
        });
      }
    });

    return Array.from(customersMap.values()).sort((a, b) =>
      a.customerName.localeCompare(b.customerName)
    );
  } catch (error) {
    logger.error('Error getting unique customers', { error });
    return [];
  }
};

/**
 * Get transactions for a specific customer
 * @param {Array} transactions - Array of all transactions
 * @param {string} customerId - Customer ID
 * @returns {Array} Filtered transactions
 */
export const getCustomerTransactions = (transactions, customerId) => {
  try {
    return transactions
      .filter((t) => t.customerId === customerId)
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (error) {
    logger.error('Error getting customer transactions', { error });
    return [];
  }
};

/**
 * Get recent 3 months of transactions within the selected year
 * @param {Array} transactions
 * @param {number} selectedYear
 * @returns {Array}
 */
export const getRecent3MonthsTransactions = (transactions, selectedYear) => {
  try {
    const today = new Date();

    // If selected year is current year → rolling 3 months
    if (selectedYear === today.getFullYear()) {
      const threeMonthsAgo = new Date(
        today.getFullYear(),
        today.getMonth() - 2,
        1
      );

      return transactions.filter(({ date }) => {
        const d = new Date(date);
        return d >= threeMonthsAgo && d.getFullYear() === selectedYear;
      });
    }

    // For past years → last 3 months of that year (Oct–Dec)
    const start = new Date(selectedYear, 9, 1);  // Oct 1
    const end = new Date(selectedYear, 11, 31); // Dec 31

    return transactions.filter(({ date }) => {
      const d = new Date(date);
      return d >= start && d <= end;
    });
  } catch (error) {
    logger.error('Error filtering recent 3 months transactions', { error });
    return [];
  }
};

/**
 * Get all transactions for a selected year
 * @param {Array} transactions
 * @param {number} selectedYear
 * @returns {Array}
 */
export const getAllTransactions = (transactions, selectedYear) => {
  try {
    return transactions.filter(({ date }) => {
      return new Date(date).getFullYear() === selectedYear;
    });
  } catch (error) {
    logger.error('Error getting all transactions', { error });
    return [];
  }
};

/**
 * Filter transactions by month and year
 * @param {Array} transactions - Array of transactions
 * @param {number} month - Month (1-12, 0=recent 3 months, -1=all)
 * @param {number} year - Year
 * @returns {Array} Filtered transactions
 */
export const filterByMonthYear = (transactions, month, year) => {
  try {
    // Handle special month values
    if (month === FILTER_MONTH_OPTIONS.RECENT_3_MONTHS) {
      return getRecent3MonthsTransactions(transactions, year);
    }
    if (month === FILTER_MONTH_OPTIONS.ALL_TRANSACTIONS) {
      return getAllTransactions(transactions, year);
    }

    // Handle regular month filtering
   
return transactions.filter((transaction) => {
  const transactionDate = new Date(transaction.date);
  if (Number.isNaN(transactionDate.getTime())) return false;

  return (
    transactionDate.getMonth() + 1 === month &&
    transactionDate.getFullYear() === year
  );
});

  } catch (error) {
    logger.error('Error filtering transactions', { error });
    return [];
  }
};

/**
 * Simulate API error
 * @returns {Promise} Rejected promise
 */
export const simulateApiError = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      logger.error('Simulated API error');
      reject(new Error('API Error: Failed to fetch data'));
    }, API_TIMEOUT);
  });
};
