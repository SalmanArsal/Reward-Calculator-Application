import PropTypes from 'prop-types';
import { MONTHS } from '../../utils/dateFormatter';
import { AVAILABLE_YEARS, FILTER_MONTH_OPTIONS } from '../../constants';
import './filters.css';

function Filters({ selectedMonth, selectedYear, onMonthChange, onYearChange }) {
  const getMonthDisplay = () => {
    if (selectedMonth === FILTER_MONTH_OPTIONS.RECENT_3_MONTHS) {
      return 'Recent 3 Months';
    }
    if (selectedMonth === FILTER_MONTH_OPTIONS.ALL_TRANSACTIONS) {
      return 'All Transactions';
    }
    return `${MONTHS[selectedMonth - 1]} ${selectedYear}`;
  };

  return (
    <div className="filters-container">
      <div className="filter-group">
        <label htmlFor="month-select" className="filter-label">
          Month
        </label>
        <select
          id="month-select"
          className="filter-select"
          value={selectedMonth}
          onChange={(e) => onMonthChange(parseInt(e.target.value, 10))}
        >
          <option value={FILTER_MONTH_OPTIONS.RECENT_3_MONTHS}>Recent 3 Months</option>
          <option value={FILTER_MONTH_OPTIONS.ALL_TRANSACTIONS}>All</option>
          <optgroup label="Specific Months">
            {MONTHS.map((month, index) => (
              <option key={index} value={index + 1}>
                {month}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="year-select" className="filter-label">
          Year
        </label>
        <select
          id="year-select"
          className="filter-select"
          value={selectedYear}
          onChange={(e) => onYearChange(parseInt(e.target.value, 10))}
        >
          {AVAILABLE_YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-info">
        <span className="filter-status">
          Showing: {getMonthDisplay()}
        </span>
      </div>
    </div>
  );
}

Filters.propTypes = {
  selectedMonth: PropTypes.number.isRequired,
  selectedYear: PropTypes.number.isRequired,
  onMonthChange: PropTypes.func.isRequired,
  onYearChange: PropTypes.func.isRequired,
};

export default Filters;
