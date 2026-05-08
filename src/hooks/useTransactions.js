import { useState, useEffect, useCallback } from 'react';
import { fetchTransactions, getUniqueCustomers, getCustomerTransactions } from '../services/transactionService';
import { TRANSACTION_STATUS } from '../constants';
import logger from '../utils/logger';

/**
 * Custom hook for managing transactions data
 * @returns {Object} Transactions state and handlers
 */
export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [status, setStatus] = useState(TRANSACTION_STATUS.IDLE);
  const [error, setError] = useState(null);

  // Fetch transactions on mount
  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setStatus(TRANSACTION_STATUS.LOADING);
        setError(null);
        
        const data = await fetchTransactions();
        setTransactions(data);
        
        const uniqueCustomers = getUniqueCustomers(data);
        setCustomers(uniqueCustomers);
        
        setStatus(TRANSACTION_STATUS.SUCCESS);
        logger.info('Transactions loaded successfully');
      } catch (err) {
        logger.error('Error loading transactions', { error: err.message });
        setError(err.message || 'Failed to load transactions');
        setStatus(TRANSACTION_STATUS.ERROR);
      }
    };

    loadTransactions();
  }, []);

  // Get transactions for specific customer
  const getTransactionsForCustomer = useCallback((customerId) => {
    return getCustomerTransactions(transactions, customerId);
  }, [transactions]);

  // Retry loading transactions
  const retryLoadTransactions = useCallback(async () => {
    try {
      setStatus(TRANSACTION_STATUS.LOADING);
      setError(null);
      
      const data = await fetchTransactions();
      setTransactions(data);
      
      const uniqueCustomers = getUniqueCustomers(data);
      setCustomers(uniqueCustomers);
      
      setStatus(TRANSACTION_STATUS.SUCCESS);
      logger.info('Transactions reloaded successfully');
    } catch (err) {
      logger.error('Error reloading transactions', { error: err.message });
      setError(err.message || 'Failed to reload transactions');
      setStatus(TRANSACTION_STATUS.ERROR);
    }
  }, []);

  return {
    transactions,
    customers,
    status,
    error,
    getTransactionsForCustomer,
    retryLoadTransactions,
    isLoading: status === TRANSACTION_STATUS.LOADING,
    isError: status === TRANSACTION_STATUS.ERROR,
    isSuccess: status === TRANSACTION_STATUS.SUCCESS,
  };
};

export default useTransactions;
