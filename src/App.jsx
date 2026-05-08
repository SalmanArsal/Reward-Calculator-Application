import { useState, useCallback, useMemo } from 'react';
import Layout from './components/layout/layout';
import Loading from './components/loading/loading';
import ErrorPage from './components/errorPage/errorPage';
import CustomersTable from './components/customersTable/customersTable';
import TransactionTable from './components/customersTable/transactionTable';
import Filters from './components/filters/filters';
import RewardPointsCard from './components/rewardPointsCard/rewardPointsCard';
import useTransactions from './hooks/useTransactions';
import {
  calculateMonthlyRewards,
  calculateTotalRewards,
  calculateMonthlyAmountSpent,
  calculateTotalAmountSpent,
} from './utils/calculateRewardPoints';
import { filterByMonthYear } from './services/transactionService';
import logger from './utils/logger';
import { getLastNMonths } from './utils/dateFormatter';
import { DEFAULT_FILTER } from './constants';
import './App.css';

/**
 * Main App Component
 * Root component that orchestrates the customer rewards calculator
 */
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

  // Get customer transactions
  const customerTransactions = useMemo(() => {
    if (!selectedCustomerId) return [];
    return transactions.filter((t) => t.customerId === selectedCustomerId);
  }, [selectedCustomerId, transactions]);

  // Filter transactions by month and year
  const filteredTransactions = useMemo(() => {
    return filterByMonthYear(customerTransactions, selectedMonth, selectedYear);
  }, [customerTransactions, selectedMonth, selectedYear]);

  // Calculate reward points
  const monthlyRewards = useMemo(() => {
    return calculateMonthlyRewards(customerTransactions, selectedMonth, selectedYear);
  }, [customerTransactions, selectedMonth, selectedYear]);

  const totalRewards = useMemo(() => {
    return calculateTotalRewards(customerTransactions);
  }, [customerTransactions]);

  // Calculate amount spent
  const monthlyAmountSpent = useMemo(() => {
    return calculateMonthlyAmountSpent(customerTransactions, selectedMonth, selectedYear);
  }, [customerTransactions, selectedMonth, selectedYear]);

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
        {/* Customers Section */}
        <section className="customers-section">
          <h2 className="section-title">🧑‍💼 Select a Customer</h2>
          <CustomersTable
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={handleSelectCustomer}
          />
        </section>

        {/* Customer Details Section */}
        {selectedCustomerId && (
          <>
            {/* Filters Section */}
            <section className="filters-section">
              <h2 className="section-title">📅 Filter Transactions</h2>
              <Filters
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onMonthChange={handleMonthChange}
                onYearChange={handleYearChange}
              />
            </section>

            {/* Reward Summary Cards */}
            <section className="rewards-summary">
              <div className="cards-grid">
                <RewardPointsCard
                  title="Monthly Spent"
                  points={monthlyAmountSpent}
                  subtitle={`${selectedMonth}/${selectedYear}`}
                  variant="info"
                  icon="💰"
                  showAsCurrency
                />
                <RewardPointsCard
                  title="Total Spent"
                  points={totalAmountSpent}
                  subtitle="All time"
                  variant="primary"
                  icon="💵"
                  showAsCurrency
                />
                <RewardPointsCard
                  title="Monthly Rewards"
                  points={monthlyRewards}
                  subtitle={`${selectedMonth}/${selectedYear}`}
                  variant="success"
                  icon="📊"
                />
                <RewardPointsCard
                  title="Total Rewards"
                  points={totalRewards}
                  subtitle="All time"
                  variant="warning"
                  icon="🏆"
                />
              </div>
            </section>

            {/* Transactions Section */}
            <section className="transactions-section">
              <h2 className="section-title">📋 Transaction History</h2>
              <TransactionTable transactions={filteredTransactions} />
            </section>
          </>
        )}

        {/* Empty State when no customer is selected */}
        {!selectedCustomerId && (
          <div className="empty-state-container">
            <div className="empty-state-message">
              <p>👈 Select a customer to view their transaction history and rewards</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default App;
