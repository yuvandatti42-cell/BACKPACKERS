import React, { useState, useEffect } from 'react';
import { TripSearchModal } from '../TripSearchModal/TripSearchModal';
import './Header.css';

interface HeaderProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  currentRoute?: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentRoute }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const isNotHome = currentRoute === 'destinations' || window.location.hash === '#destinations';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleGlobalCmdK = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleGlobalCmdK);
    return () => window.removeEventListener('keydown', handleGlobalCmdK);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>, 
    route: string, 
    sectionId?: string, 
    categoryFilter?: string
  ) => {
    e.preventDefault();
    closeMenu();
    setIsDropdownHovered(false);

    if (onNavigate) {
      onNavigate(route, sectionId, categoryFilter);
    } else {
      if (route === 'destinations') {
        window.location.hash = 'destinations';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetSection = sectionId ? sectionId : 'hero';
        window.location.hash = targetSection;
        const el = document.getElementById(targetSection);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <>
      <header className={`site-header ${(isScrolled || isNotHome) ? 'nav-scrolled' : ''}`} role="banner">
        <div className="container nav-container">
          
          {/* Left Column: Symmetrical Navigation with Hover Dropdown */}
          <div className="nav-col-left">
            {isNotHome && (
              <a 
                href="#hero" 
                className="nav-back-arrow-btn"
                onClick={(e) => handleNavClick(e, 'home', 'hero')}
                aria-label="Back to Home"
                title="Back to Home"
              >
                &larr;
              </a>
            )}

            {isNotHome ? (
              <a 
                href="#destinations" 
                className="nav-link"
                onClick={(e) => handleNavClick(e, 'destinations')}
              >
                DESTINATIONS
              </a>
            ) : (
              <div 
                className="nav-dropdown-wrapper"
                onMouseEnter={() => setIsDropdownHovered(true)}
                onMouseLeave={() => setIsDropdownHovered(false)}
              >
                <a 
                  href="#destinations" 
                  className="nav-link nav-dropdown-trigger"
                  onClick={(e) => handleNavClick(e, 'destinations')}
                >
                  DESTINATIONS <span className="dropdown-caret">▾</span>
                </a>

                {/* Hover Dropdown Menu */}
                <div className={`nav-dropdown-menu ${isDropdownHovered ? 'is-visible' : ''}`}>
                  <div className="dropdown-header-tag">EXPLORE BY TRIP TYPE</div>
                  
                  <a 
                    href="#destinations" 
                    className="dropdown-item-link"
                    onClick={(e) => handleNavClick(e, 'destinations', undefined, 'weekend')}
                  >
                    <img src="/wkndtp.jpeg" alt="" className="dropdown-thumb-img" />
                    <div className="dropdown-item-text">
                      <span className="item-title">Weekend Trips</span>
                      <span className="item-sub">Quick 2–3 Day Escapes</span>
                    </div>
                  </a>

                  <a 
                    href="#destinations" 
                    className="dropdown-item-link"
                    onClick={(e) => handleNavClick(e, 'destinations', undefined, 'long-expedition')}
                  >
                    <img src="/long.jpg" alt="" className="dropdown-thumb-img" />
                    <div className="dropdown-item-text">
                      <span className="item-title">Long Expedition</span>
                      <span className="item-sub">6–14 Day Overlands</span>
                    </div>
                  </a>

                  <a 
                    href="#destinations" 
                    className="dropdown-item-link"
                    onClick={(e) => handleNavClick(e, 'destinations', undefined, 'bike-trips')}
                  >
                    <img src="/bike.jpg" alt="" className="dropdown-thumb-img" />
                    <div className="dropdown-item-text">
                      <span className="item-title">Bike Trips</span>
                      <span className="item-sub">Motorcycle &amp; MTB Traverses</span>
                    </div>
                  </a>

                  <a 
                    href="#destinations" 
                    className="dropdown-item-link"
                    onClick={(e) => handleNavClick(e, 'destinations', undefined, 'off-beaten')}
                  >
                    <img src="/off.jpg" alt="" className="dropdown-thumb-img" />
                    <div className="dropdown-item-text">
                      <span className="item-title">Off Beaten Places</span>
                      <span className="item-sub">Raw Backcountry Routes</span>
                    </div>
                  </a>



                  <a 
                    href="#destinations" 
                    className="dropdown-footer-link"
                    onClick={(e) => handleNavClick(e, 'destinations', undefined, 'all')}
                  >
                    <span>VIEW ALL DESTINATIONS</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Centered Brand Logo */}
          <div className="nav-col-center">
            <a 
              href="#hero" 
              className="brand-center-lockup" 
              aria-label="Backpackers Destinations Home"
              onClick={(e) => handleNavClick(e, 'home', 'hero')}
            >
              <div className="brand-logo-circle">
                <img 
                  src="/logo.jpg" 
                  alt="Backpackers Destinations Logo" 
                  className="brand-logo-img" 
                />
              </div>
              <div className="brand-center-text">
                <span className="brand-center-name">BACKPACKERS</span>
                <span className="brand-center-sub">DESTINATIONS</span>
              </div>
            </a>
          </div>

          {/* Right Column: Symmetrical Navigation & Action buttons */}
          <div className="nav-col-right">
            <button 
              className="header-search-icon-btn"
              onClick={() => setIsSearchOpen(true)}
              title="Search Trips (Cmd+K)"
              aria-label="Search Trips"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <div className="nav-vertical-divider" aria-hidden="true" />
            <a 
              href="https://gearstation.co" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="gear-station-link"
              title="Gear Station — Get Your Gear"
            >
              <div className="gear-station-logo-wrap">
                <img 
                  src="/gearlogo.jpeg" 
                  alt="Gear Station Logo" 
                  className="gear-station-logo-img" 
                />
              </div>
              <span className="gear-station-text">GET YOUR GEAR</span>
            </a>
            <div className="nav-vertical-divider" aria-hidden="true" />
            <a 
              href="#planner" 
              className="btn btn-contact-header"
              onClick={(e) => handleNavClick(e, 'home', 'planner')}
            >
              CONTACT US
            </a>
          </div>

          {/* Mobile hamburger menu toggle */}
          <button 
            className={`nav-toggle ${isMobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-drawer"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div 
        id="mobile-nav-drawer"
        className={`mobile-drawer ${isMobileMenuOpen ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile Navigation"
      >
        <div className="mobile-nav-links">
          <button 
            className="mobile-search-trigger"
            onClick={() => {
              closeMenu();
              setIsSearchOpen(true);
            }}
          >
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <span>SEARCH ALL TRIPS</span>
          </button>

          <a 
            href="#hero" 
            className="mobile-nav-link" 
            onClick={(e) => handleNavClick(e, 'home', 'hero')}
          >
            HOME
          </a>
          <a 
            href="#destinations" 
            className="mobile-nav-link" 
            onClick={(e) => handleNavClick(e, 'destinations', undefined, 'all')}
          >
            DESTINATIONS
          </a>
          <a 
            href="https://gearstation.co" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-gear-station-link"
            onClick={closeMenu}
          >
            <div className="gear-station-logo-wrap">
              <img 
                src="/gearlogo.jpeg" 
                alt="Gear Station Logo" 
                className="gear-station-logo-img" 
              />
            </div>
            <span className="mobile-gear-station-text">GET YOUR GEAR</span>
            <span className="mobile-ext-icon">↗</span>
          </a>
          <a 
            href="#planner" 
            className="mobile-nav-link" 
            onClick={(e) => handleNavClick(e, 'home', 'planner')}
          >
            CONTACT US
          </a>
        </div>
        <div>
          <a 
            href="#planner" 
            className="btn btn-primary" 
            style={{ width: '100%' }} 
            onClick={(e) => handleNavClick(e, 'home', 'planner')}
          >
            PLAN YOUR EXPEDITION
          </a>
          <p className="text-meta" style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            BACKPACKERS DESTINATIONS &copy; 2026
          </p>
        </div>
      </div>

      {/* Global Trip Search Modal */}
      <TripSearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={onNavigate} 
      />
    </>
  );
};
export default Header;
