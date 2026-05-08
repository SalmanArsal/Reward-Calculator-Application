import PropTypes from 'prop-types';
import './emptyState.css';

function EmptyState({ title, message, icon }) {
  return (
    <div className="empty-state">
      <div className="empty-state-content">
        <div className="empty-state-icon">{icon}</div>
        <h2 className="empty-state-title">{title}</h2>
        <p className="empty-state-message">{message}</p>
      </div>
    </div>
  );
}

EmptyState.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

EmptyState.defaultProps = {
  icon: '📭',
};

export default EmptyState;
