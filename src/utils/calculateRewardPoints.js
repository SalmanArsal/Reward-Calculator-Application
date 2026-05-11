import logger from './logger';
import { FILTER_MONTH_OPTIONS } from '../constants';

/**
 * Calculate reward points based on transaction amount
 * Rules:
 * - No points below $50
 * - 1 point for every dollar between $50-$100
 * - 2 points for every dollar above $100
 * 
 * @param {number} amount - Transaction amount
 * @returns {number} Total reward points
 */
export const calculateRewardPoints = (amount) => {
  try {
    if (amount === null || amount === undefined) {
      logger.warn('Invalid amount: null or undefined');
      return 0;
    }

    const numAmount = Number(amount);

    if (isNaN(numAmount)) {
      logger.warn('Invalid amount: not a number', { amount });
      return 0;
    }

    if (numAmount < 0) {
      logger.warn('Negative amount provided', { amount: numAmount });
      return 0;
    }

    // No points below $50
    if (numAmount < 50) {
      return 0;
    }

    // Between $50-$100: 1 point per dollar
    if (numAmount >= 50 && numAmount <= 100) {
      return Math.floor((numAmount - 50) * 1);
    }

    // Above $100: 2 points for dollars above $100 + 1 point for $50-$100
    if (numAmount > 100) {
      const pointsAbove100 = Math.floor((numAmount - 100) * 2);
      const pointsBetween50And100 = 50; // 1 point per dollar for $50-$100 range

      return pointsAbove100 + pointsBetween50And100;
    }

    return 0;
  } catch (error) {
    logger.error('Error calculating reward points', { error, amount });
    return 0;
  }
};

/**
 * Calculate monthly reward points for a customer
 * Handles special month values: 0 (recent 3 months), -1 (all transactions)
 * @param {Array} transactions - Array of transaction objects
 * @param {number} month - Month number (1-12, 0=recent 3 months, -1=all)
 * @param {number} year - Year
 * @returns {number} Total monthly reward points
 */
export const calculateMonthlyRewards = (transactions, month, year) => {
  try {
    if (!Array.isArray(transactions)) {
      logger.warn('Transactions is not an array');
      return 0;
    }

    // Handle special month values
    if (month === FILTER_MONTH_OPTIONS.ALL_TRANSACTIONS) {
      // Sum rewards for all transactions
      return transactions.reduce((total, transaction) => {
        return total + calculateRewardPoints(transaction.amount);
      }, 0);
    }

    if (month === FILTER_MONTH_OPTIONS.RECENT_3_MONTHS) {
      // Sum rewards for last 3 months
      const today = new Date();
      const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);

      return transactions.reduce((total, transaction) => {
        const transactionDate = new Date(transaction.date);
        if (transactionDate >= threeMonthsAgo) {
          return total + calculateRewardPoints(transaction.amount);
        }
        return total;
      }, 0);
    }

    // Handle regular month filtering
    return transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionMonth = transactionDate.getMonth() + 1;
      const transactionYear = transactionDate.getFullYear();

      if (transactionMonth === month && transactionYear === year) {
        return total + calculateRewardPoints(transaction.amount);
      }

      return total;
    }, 0);
  } catch (error) {
    logger.error('Error calculating monthly rewards', { error });
    return 0;
  }
};

/**
 * Calculate total reward points
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total reward points
 */
export const calculateTotalRewards = (transactions) => {
  try {
    if (!Array.isArray(transactions)) {
      logger.warn('Transactions is not an array');
      return 0;
    }

    return transactions.reduce((total, transaction) => {
      return total + calculateRewardPoints(transaction.amount);
    }, 0);
  } catch (error) {
    logger.error('Error calculating total rewards', { error });
    return 0;
  }
};

/**
 * Calculate total amount spent in a specific month
 * Handles special month values: 0 (recent 3 months), -1 (all transactions)
 * @param {Array} transactions - Array of transaction objects
 * @param {number} month - Month number (1-12, 0=recent 3 months, -1=all)
 * @param {number} year - Year
 * @returns {number} Total amount spent in the month
 */
export const calculateMonthlyAmountSpent = (transactions, month, year) => {
  try {
    if (!Array.isArray(transactions)) {
      logger.warn('Transactions is not an array');
      return 0;
    }

    // Handle special month values
    if (month === FILTER_MONTH_OPTIONS.ALL_TRANSACTIONS) {
      // Sum amounts for all transactions
      return transactions.reduce((total, transaction) => {
        return total + (transaction.amount || 0);
      }, 0);
    }

    if (month === FILTER_MONTH_OPTIONS.RECENT_3_MONTHS) {
      // Sum amounts for last 3 months
      const today = new Date();
      const threeMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 2, 1);

      return transactions.reduce((total, transaction) => {
        const transactionDate = new Date(transaction.date);
        if (transactionDate >= threeMonthsAgo) {
          return total + (transaction.amount || 0);
        }
        return total;
      }, 0);
    }

    // Handle regular month filtering
    return transactions.reduce((total, transaction) => {
      const transactionDate = new Date(transaction.date);
      const transactionMonth = transactionDate.getMonth() + 1;
      const transactionYear = transactionDate.getFullYear();

      if (transactionMonth === month && transactionYear === year) {
        return total + (transaction.amount || 0);
      }

      return total;
    }, 0);
  } catch (error) {
    logger.error('Error calculating monthly amount spent', { error });
    return 0;
  }
};

/**
 * Calculate total amount spent across all transactions
 * @param {Array} transactions - Array of transaction objects
 * @returns {number} Total amount spent
 */
export const calculateTotalAmountSpent = (transactions) => {
  try {
    if (!Array.isArray(transactions)) {
      logger.warn('Transactions is not an array');
      return 0;
    }

    return transactions.reduce((total, transaction) => {
      return total + (transaction.amount || 0);
    }, 0);
  } catch (error) {
    logger.error('Error calculating total amount spent', { error });
    return 0;
  }
};
