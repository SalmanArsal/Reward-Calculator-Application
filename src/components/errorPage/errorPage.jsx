import PropTypes from 'prop-types';
import './errorPage.css';

function ErrorPage({ error, onRetry }) {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">⚠️</div>
        <h1 className="error-title">Oops! Something went wrong</h1>
        <p className="error-message">{error || 'An unexpected error occurred'}</p>
        {onRetry && (
          <button className="retry-button" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </div>
  );
}

ErrorPage.propTypes = {
  error: PropTypes.string,
  onRetry: PropTypes.func,
};

ErrorPage.defaultProps = {
  error: 'An unexpected error occurred',
  onRetry: null,
};

export default ErrorPage;
