import PropTypes from 'prop-types';
import './rewardPointsCard.css';

function RewardPointsCard({
  title,
  points,
  subtitle,
  variant = 'primary',
  icon = '⭐',
  showAsCurrency = false,
}) {
  // Format the display value
  const displayValue = showAsCurrency
    ? `$${points.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    : points.toLocaleString();

  return (
    <div className={`reward-card reward-card-${variant}`}>
      <div className="reward-icon">{icon}</div>
      <div className="reward-content">
        <p className="reward-title">{title}</p>
        <p className="reward-points">{displayValue}</p>
        {subtitle && <p className="reward-subtitle">{subtitle}</p>}
      </div>
    </div>
  );
}

RewardPointsCard.propTypes = {
  title: PropTypes.string.isRequired,
  points: PropTypes.number.isRequired,
  subtitle: PropTypes.string,
  variant: PropTypes.oneOf(['primary', 'success', 'info', 'warning']),
  icon: PropTypes.string,
  showAsCurrency: PropTypes.bool,
};

RewardPointsCard.defaultProps = {
  subtitle: null,
  variant: 'primary',
  icon: '⭐',
  showAsCurrency: false,
};

export default RewardPointsCard;
