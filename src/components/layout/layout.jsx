import PropTypes from 'prop-types';
import './layout.css';

function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <h1 className="app-title">Customer Rewards Calculator</h1>
        </div>
      </header>

      <main className="layout-main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
