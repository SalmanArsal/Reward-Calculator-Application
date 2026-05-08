import PropTypes from 'prop-types';
import './layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="app-title">💰 Customer Rewards Calculator</h1>
          <p className="app-subtitle">Manage and track customer reward points</p>
        </div>
      </header>

      <main className="layout-main">
        <div className="container">{children}</div>
      </main>

      <footer className="layout-footer">
        <p className="footer-text">
          © 2025 Rewards Calculator. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
