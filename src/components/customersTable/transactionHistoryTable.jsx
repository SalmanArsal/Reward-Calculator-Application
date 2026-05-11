import PropTypes from 'prop-types';
import { calculateRewardPoints } from '../../utils/calculateRewardPoints';
import { formatDate } from '../../utils/dateFormatter';
import './transactionHistoryTable.css';

/**
 * Transaction History Table Component
 * Displays all transactions in a clean table format
 */
function TransactionHistoryTable({ transactions }) {
  if (transactions.length === 0) {
    return (
      <div className="empty-transactions">
        <p>📋 No transactions found</p>
      </div>
    );
  }

  // Sort transactions by date (newest first)
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="transaction-history-table-wrapper">
      <table className="transaction-history-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => {
            const points = calculateRewardPoints(transaction.amount);
            return (
              <tr key={transaction.transactionId} className="transaction-row">
                <td className="transaction-id-cell">
                  <span className="transaction-id-value">{transaction.transactionId}</span>
                </td>
                <td className="date-cell">
                  <span className="date-value">{formatDate(transaction.date)}</span>
                </td>
                <td className="amount-cell">
                  <span className="amount-value">
                    ${transaction.amount.toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </td>
                <td className="points-cell">
                  <span className="points-badge">
                    <strong>{points}</strong> pts
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

TransactionHistoryTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionHistoryTable;
