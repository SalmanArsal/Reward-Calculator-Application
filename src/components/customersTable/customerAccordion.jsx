import { useState } from 'react';
import PropTypes from 'prop-types';
import Filters from '../filters/filters';
import RewardPointsCard from '../rewardPointsCard/rewardPointsCard';
import TransactionHistoryTable from './transactionHistoryTable';
import './customerAccordion.css';

function CustomerAccordion({
  customerId,
  customerName,
  isExpanded,
  totalSpent,
  totalRewards,
  transactions,
  selectedMonth,
  selectedYear,
  onMonthChange,
  onYearChange,
  onClose,
}) {
  const [expandedSections, setExpandedSections] = useState({
    filters: true,
    rewards: true,
    transactions: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!isExpanded) {
    return null;
  }

  return (
    <div className="customer-accordion-wrapper">
      <div className="customer-accordion">
        {/* Header with customer info */}
        <div className="accordion-header">
          <div className="customer-info">
            <h3 className="accordion-title">{customerName}</h3>
            <p className="customer-detail">ID: {customerId}</p>
          </div>
          <button
            className="close-button"
            onClick={onClose}
            aria-label="Close accordion"
            title="Close"
          >
            ✕
          </button>
        </div>

        {/* Filters Section */}
        <div className="accordion-section">
          <button
            className={`section-header ${expandedSections.filters ? 'expanded' : ''}`}
            onClick={() => toggleSection('filters')}
            aria-expanded={expandedSections.filters}
          >
            <span className="section-title">Transaction Filters</span>
            <span className="section-arrow">▼</span>
          </button>
          {expandedSections.filters && (
            <div className="section-content">
              <Filters
                selectedMonth={selectedMonth}
                selectedYear={selectedYear}
                onMonthChange={onMonthChange}
                onYearChange={onYearChange}
              />
            </div>
          )}
        </div>

        {/* Summary Cards Section */}
        <div className="accordion-section">
          <button
            className={`section-header ${expandedSections.rewards ? 'expanded' : ''}`}
            onClick={() => toggleSection('rewards')}
            aria-expanded={expandedSections.rewards}
          >
            <span className="section-title">Summary</span>
            <span className="section-arrow">▼</span>
          </button>
          {expandedSections.rewards && (
            <div className="section-content">
                <RewardPointsCard
                  title="Total Spent"
                  points={totalSpent}
                  subtitle="All time"
                  variant="primary"
                  icon="💵"
                  showAsCurrency
                />
                <RewardPointsCard
                  title="Total Rewards"
                  points={totalRewards}
                  subtitle="All time"
                  variant="warning"
                  icon="🏆"
                />
            </div>
          )}
        </div>

        {/* Transaction History Section */}
        <div className="accordion-section">
          <button
            className={`section-header ${expandedSections.transactions ? 'expanded' : ''}`}
            onClick={() => toggleSection('transactions')}
            aria-expanded={expandedSections.transactions}
          >
            <span className="section-title">
              Transaction History ({transactions.length})
            </span>
            <span className="section-arrow">▼</span>
          </button>
          {expandedSections.transactions && (
            <div className="section-content">
              <TransactionHistoryTable transactions={transactions} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

CustomerAccordion.propTypes = {
  customerId: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  monthlySpent: PropTypes.number.isRequired,
  totalSpent: PropTypes.number.isRequired,
  monthlyRewards: PropTypes.number.isRequired,
  totalRewards: PropTypes.number.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
  selectedMonth: PropTypes.number.isRequired,
  selectedYear: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CustomerAccordion;
