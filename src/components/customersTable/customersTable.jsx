import PropTypes from 'prop-types';
import EmptyState from './emptyState';
import './customersTable.css';

function CustomersTable({ customers, selectedCustomerId, onSelectCustomer }) {
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
          {customers.map((customer) => (
            <tr
              key={customer.customerId}
              className={`customer-row ${
                selectedCustomerId === customer.customerId ? 'selected' : ''
              }`}
            >
              <td className="customer-id">{customer.customerId}</td>
              <td className="customer-name">{customer.customerName}</td>
              <td className="customer-action">
                <button
                  className={`select-button ${
                    selectedCustomerId === customer.customerId ? 'active' : ''
                  }`}
                  onClick={() => onSelectCustomer(customer.customerId)}
                >
                  {selectedCustomerId === customer.customerId
                    ? 'Selected'
                    : 'Select'}
                </button>
              </td>
            </tr>
          ))}
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
  onSelectCustomer: PropTypes.func.isRequired,
};

CustomersTable.defaultProps = {
  selectedCustomerId: null,
};

export default CustomersTable;
