import { useState } from 'react';
import PropTypes from 'prop-types';
import EmptyState from './emptyState';
import CustomerAccordion from './customerAccordion';
import './customersTable.css';

/**
 * Customers Table Component with Accordion Details
 * Displays customers with expandable accordion details on select
 */
function CustomersTable({
  customers,
  selectedCustomerId,
  totalSpent,
  totalRewards,
  allTransactions,
  filteredTransactions,
  selectedMonth,
  selectedYear,
  onSelectCustomer,
  onMonthChange,
  onYearChange,
}) {
  const [expandedCustomerId, setExpandedCustomerId] = useState(null);

  const handleSelectCustomer = (customerId) => {
    if (expandedCustomerId === customerId) {
      setExpandedCustomerId(null);
      onSelectCustomer(null);
    } else {
      setExpandedCustomerId(customerId);
      onSelectCustomer(customerId);
    }
  };

  const handleCloseAccordion = () => {
    setExpandedCustomerId(null);
    onSelectCustomer(null);
  };

  if (customers.length === 0) {
    return (
      <EmptyState
        title="No Customers"
        message="No customers available at this time."
        icon="👥"
      />
    );
  }

  return (
    <div className="customers-table-wrapper">
      <table className="customers-table">
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            const isExpanded = expandedCustomerId === customer.customerId;
            return [
              <tr
                key={`${customer.customerId}-row`}
                className={`customer-row ${isExpanded ? 'expanded' : ''}`}
              >
                <td className="customer-id">{customer.customerId}</td>
                <td className="customer-name">{customer.customerName}</td>
                <td className="customer-action">
                  <button
                    className={`select-button ${isExpanded ? 'active' : ''}`}
                    onClick={() => handleSelectCustomer(customer.customerId)}
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? '▼ Collapse' : '▶ Expand'}
                  </button>
                </td>
              </tr>,
              isExpanded && (
                <tr key={`${customer.customerId}-accordion`} className="accordion-row">
                  <td colSpan="3" className="accordion-cell">
                    <CustomerAccordion
                      customerId={customer.customerId}
                      customerName={customer.customerName}
                      isExpanded={isExpanded}
                      totalSpent={totalSpent}
                      totalRewards={totalRewards}
                      transactions={filteredTransactions}
                      selectedMonth={selectedMonth}
                      selectedYear={selectedYear}
                      onMonthChange={onMonthChange}
                      onYearChange={onYearChange}
                      onClose={handleCloseAccordion}
                    />
                  </td>
                </tr>
              ),
            ].filter(Boolean);
          })}
        </tbody>
      </table>
    </div>
  );
}

CustomersTable.propTypes = {
  customers: PropTypes.arrayOf(
    PropTypes.shape({
      customerId: PropTypes.string.isRequired,
      customerName: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedCustomerId: PropTypes.string,
  monthlySpent: PropTypes.number.isRequired,
  totalSpent: PropTypes.number.isRequired,
  monthlyRewards: PropTypes.number.isRequired,
  totalRewards: PropTypes.number.isRequired,
  allTransactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  filteredTransactions: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedMonth: PropTypes.number.isRequired,
  selectedYear: PropTypes.number.isRequired,
  onSelectCustomer: PropTypes.func.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

CustomersTable.defaultProps = {
  selectedCustomerId: null,
};

export default CustomersTable;
