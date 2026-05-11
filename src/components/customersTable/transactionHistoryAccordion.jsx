import { useState } from 'react';
import PropTypes from 'prop-types';
import { calculateRewardPoints } from '../../utils/calculateRewardPoints';
import { formatDate } from '../../utils/dateFormatter';
import './transactionHistoryAccordion.css';

/**
 * Transaction History Accordion Component
 * Displays transactions grouped by month with expandable details
 */
function TransactionHistoryAccordion({ transactions }) {
  const [expandedMonths, setExpandedMonths] = useState({});

  const toggleMonth = (monthYear) => {
    setExpandedMonths((prev) => ({
      ...prev,
      [monthYear]: !prev[monthYear],
    }));
  };

  // Group transactions by month
  const groupedByMonth = transactions.reduce((acc, transaction) => {
    const date = new Date(transaction.date);
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthLabel = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    if (!acc[monthYear]) {
      acc[monthYear] = { label: monthLabel, transactions: [] };
    }
    acc[monthYear].transactions.push(transaction);
    return acc;
  }, {});

  const sortedMonths = Object.keys(groupedByMonth).sort().reverse();

  if (transactions.length === 0) {
    return (
      <div className="empty-transactions">
        <p>📋 No transactions found</p>
      </div>
    );
  }

  return (
    <div className="transaction-history-accordion">
      {sortedMonths.map((monthYear) => {
        const monthData = groupedByMonth[monthYear];
        const monthTotal = monthData.transactions.reduce((sum, t) => sum + t.amount, 0);
        const isExpanded = expandedMonths[monthYear];

        return (
          <div key={monthYear} className="month-group">
            <button
              className={`month-header ${isExpanded ? 'expanded' : ''}`}
              onClick={() => toggleMonth(monthYear)}
              aria-expanded={isExpanded}
            >
              <span className="month-icon">📅</span>
              <span className="month-label">{monthData.label}</span>
              <span className="transaction-count">
                {monthData.transactions.length} transaction{monthData.transactions.length !== 1 ? 's' : ''}
              </span>
              <span className="month-total">${monthTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              <span className="month-arrow">▼</span>
            </button>

            {isExpanded && (
              <div className="transactions-list">
                {monthData.transactions.map((transaction) => {
                  const points = calculateRewardPoints(transaction.amount);
                  return (
                    <div
                      key={transaction.transactionId}
                      className="transaction-item"
                    >
                      <div className="transaction-info">
                        <div className="transaction-header">
                          <span className="transaction-id">
                            {transaction.transactionId}
                          </span>
                          <span className="transaction-date">
                            {formatDate(transaction.date)}
                          </span>
                        </div>
                        <div className="transaction-details">
                          <span className="transaction-amount">
                            ${transaction.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                          <span className="transaction-points">
                            <strong>{points}</strong> pts
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

TransactionHistoryAccordion.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionHistoryAccordion;
