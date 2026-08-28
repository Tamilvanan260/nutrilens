// Navbar.jsx — floating glassmorphism navigation bar

import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';

const NAV_LINKS = [
  { to: '/',          label: 'Home',     end: true  },
  { to: '/explore',   label: 'Explore',  end: false },
  { to: '/nutrients', label: 'Nutrients',end: false },
  { to: '/vitamins',  label: '💊 Vitamins', end: false },
  { to: '/favorites', label: '❤️ Favorites', end: false },
];

export default function Navbar() {
  const { setSearchOpen, favorites } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, []);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          {/* Logo */}
          <Link to="/" className="navbar-logo" aria-label="NutriLens Home">
            <span>🥗</span>
            <span>NutriLens</span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links" role="menubar">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                role="menuitem"
              >
                {link.label}
                {link.to === '/favorites' && favorites.length > 0 && (
                  <span style={{
                    marginLeft: 4,
                    background: 'var(--clr-red-400)',
                    color: 'white',
                    borderRadius: '99px',
                    padding: '1px 6px',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                  }}>
                    {favorites.length}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            <button
              className="navbar-search-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              id="navbar-search-btn"
            >
              🔍
            </button>

            {/* Hamburger */}
            <button
              className={`hamburger ${menuOpen ? 'open' : ''}`}
              onClick={() => setMenuOpen(m => !m)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              id="hamburger-btn"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu" role="menu">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              role="menuitem"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <button
            className="mobile-nav-link"
            style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}
            onClick={() => { setMenuOpen(false); setSearchOpen(true); }}
          >
            🔍 Search Foods
          </button>
        </div>
      )}
    </>
  );
}
