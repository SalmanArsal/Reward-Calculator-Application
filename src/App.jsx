import { useState, useCallback, useMemo } from 'react';
import Layout from './components/layout/layout';
import Loading from './components/loading/loading';
import ErrorPage from './components/errorPage/errorPage';
import CustomersTable from './components/customersTable/customersTable';
import useTransactions from './hooks/useTransactions';
import {
  calculateTotalRewards,
  calculateTotalAmountSpent,
} from './utils/calculateRewardPoints';
import { filterByMonthYear } from './services/transactionService';
import logger from './utils/logger';
import { DEFAULT_FILTER } from './constants';
import './App.css';

function App() {
  const { transactions, customers, status, error, retryLoadTransactions } =
    useTransactions();

  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const { month: defaultMonth, year: defaultYear } = DEFAULT_FILTER;
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  // Handle customer selection
  const handleSelectCustomer = useCallback((customerId) => {
    setSelectedCustomerId(customerId);
    logger.info('Customer selected', { customerId });
  }, []);

  // Handle month filter change
  const handleMonthChange = useCallback((newMonth) => {
    setSelectedMonth(newMonth);
    logger.info('Month filter changed', { month: newMonth });
  }, []);

  // Handle year filter change
  const handleYearChange = useCallback((newYear) => {
    setSelectedYear(newYear);
    logger.info('Year filter changed', { year: newYear });
  }, []);

  // customer transactions
  const customerTransactions = useMemo(() => {
    if (!selectedCustomerId) return [];
    return transactions.filter((t) => t.customerId === selectedCustomerId);
  }, [selectedCustomerId, transactions]);

  // Filter transactions by month and year
  const filteredTransactions = useMemo(() => {
    return filterByMonthYear(customerTransactions, selectedMonth, selectedYear);
  }, [customerTransactions, selectedMonth, selectedYear]);

  // reward points
  const totalRewards = useMemo(() => {
    return calculateTotalRewards(customerTransactions);
  }, [customerTransactions]);

  const totalAmountSpent = useMemo(() => {
    return calculateTotalAmountSpent(customerTransactions);
  }, [customerTransactions]);

  // Handle retry
  const handleRetry = useCallback(() => {
    logger.info('Retrying transaction load');
    retryLoadTransactions();
  }, [retryLoadTransactions]);

  // Handle loading state
  if (status === 'loading') {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  // Handle error state
  if (status === 'error') {
    return (
      <Layout>
        <ErrorPage error={error} onRetry={handleRetry} />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="app-content">
        {/* Customers Section with Accordion */}
        <section className="customers-section">
          <div className="section-header">
            <h2 className="section-title">Customer Rewards Dashboard</h2>
          </div>
          <CustomersTable
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            totalSpent={totalAmountSpent}
            totalRewards={totalRewards}
            allTransactions={customerTransactions}
            filteredTransactions={filteredTransactions}
            selectedMonth={selectedMonth}
            selectedYear={selectedYear}
            onSelectCustomer={handleSelectCustomer}
            onMonthChange={handleMonthChange}
            onYearChange={handleYearChange}
          />
        </section>
      </div>
    </Layout>
  );
}

export default App;
