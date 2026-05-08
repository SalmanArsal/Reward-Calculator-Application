import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import TransactionRow from './transactionRow';
import EmptyState from './emptyState';
import Pagination from './pagination';
import usePagination from '../../hooks/usePagination';
import { ITEMS_PER_PAGE } from '../../constants';

function TransactionTable({ transactions }) {
  const {
    paginatedItems,
    currentPage,
    totalPages,
    goToPage,
    goToPreviousPage,
    goToNextPage,
    resetPagination,
  } = usePagination(transactions, ITEMS_PER_PAGE);

  // Reset the pagination when the transactions will change
  useEffect(() => {
    resetPagination();
  }, [transactions, resetPagination]);

  if (transactions.length === 0) {
    return (
      <EmptyState
        title="No Transactions"
        message="No transactions found for the selected customer or period."
        icon="📊"
      />
    );
  }

  return (
    <div className="transaction-table-wrapper">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Reward Points</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((transaction) => (
            <TransactionRow
              key={transaction.transactionId}
              transaction={transaction}
            />
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={goToPage}
        onPreviousClick={goToPreviousPage}
        onNextClick={goToNextPage}
      />
    </div>
  );
}

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transactionId: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default TransactionTable;
