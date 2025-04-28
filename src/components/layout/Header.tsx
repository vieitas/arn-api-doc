import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import PostmanButton from '../endpoints/PostmanButton';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper function to determine if a nav item should be active
  const isActive = (basePath: string) => {
    if (basePath === '/' && path === '/') return true;
    if (basePath !== '/' && path.startsWith(basePath)) return true;
    return false;
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-top-row">
          <div className="header-logo">
            <NavLink to="/">ARN Hotels API</NavLink>
          </div>
          <div className="header-actions">
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>
          </div>
        </div>
        <div className={`header-nav-container ${mobileMenuOpen ? 'mobile-menu-open' : ''}`}>
          <nav className="header-nav">
            <ul>
              <li><NavLink to="/" className={isActive('/') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Home</NavLink></li>
              <li><NavLink to="/getting-started" className={isActive('/getting-started') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Getting Started</NavLink></li>
              <li><NavLink to="/resources" className={isActive('/resources') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Resources</NavLink></li>
              <li><NavLink to="/endpoints/typeahead/city-search" className={isActive('/endpoints') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>API Reference</NavLink></li>
              <li><NavLink to="/technical-reference/sort-types" className={isActive('/technical-reference') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Technical Reference</NavLink></li>
              <li><NavLink to="/certification" className={isActive('/certification') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Certification</NavLink></li>
              <li><NavLink to="/support/contact" className={isActive('/support') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Support</NavLink></li>
            </ul>
          </nav>
          <div className="header-postman-button">
            <PostmanButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
