import logger from '../utils/logger';
import { API_TIMEOUT } from '../constants';

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
 * Filter transactions by month and year
 * @param {Array} transactions - Array of transactions
 * @param {number} month - Month (1-12)
 * @param {number} year - Year
 * @returns {Array} Filtered transactions
 */
export const filterByMonthYear = (transactions, month, year) => {
  try {
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionMonth = transactionDate.getMonth() + 1;
      const transactionYear = transactionDate.getFullYear();

      return transactionMonth === month && transactionYear === year;
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
