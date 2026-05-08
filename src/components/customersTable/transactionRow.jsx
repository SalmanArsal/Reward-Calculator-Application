import PropTypes from 'prop-types';
import { calculateRewardPoints } from '../../utils/calculateRewardPoints';
import { formatDate } from '../../utils/dateFormatter';

function TransactionRow({ transaction }) {
  const points = calculateRewardPoints(transaction.amount);

  return (
    <tr className="transaction-row">
      <td className="transaction-id">{transaction.transactionId}</td>
      <td className="transaction-date">{formatDate(transaction.date)}</td>
      <td className="transaction-amount">${transaction.amount.toFixed(2)}</td>
      <td className="transaction-points">
        <span className="points-badge">{points}</span>
      </td>
    </tr>
  );
}

TransactionRow.propTypes = {
  transaction: PropTypes.shape({
    transactionId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
  }).isRequired,
};

export default TransactionRow;
