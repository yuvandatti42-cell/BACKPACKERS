import React, { useState, useEffect } from 'react';
import './Header.css';

interface HeaderProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  currentRoute?: string;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, currentRoute }) => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isDropdownHovered, setIsDropdownHovered] = useState<boolean>(false);

  const isNotHome = currentRoute === 'destinations' || window.location.hash === '#destinations';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
                  <div className="dropdown-header-tag">+ EXPLORE BY TRIP TYPE</div>
                  
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
                    className="dropdown-item-link"
                    onClick={(e) => handleNavClick(e, 'destinations', undefined, 'private')}
                  >
                    <img src="/priv.jpg" alt="" className="dropdown-thumb-img" />
                    <div className="dropdown-item-text">
                      <span className="item-title">Private Trips</span>
                      <span className="item-sub">Bespoke Custom Squads</span>
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

            <a 
              href="#featured-tours" 
              className="nav-link"
              onClick={(e) => handleNavClick(e, 'home', 'featured-tours')}
            >
              TOURS
            </a>
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
            <a 
              href="#stories" 
              className="nav-link"
              onClick={(e) => handleNavClick(e, 'home', 'stories')}
            >
              STORIES
            </a>
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
            href="#featured-tours" 
            className="mobile-nav-link" 
            onClick={(e) => handleNavClick(e, 'home', 'featured-tours')}
          >
            TOURS
          </a>
          <a 
            href="#stories" 
            className="mobile-nav-link" 
            onClick={(e) => handleNavClick(e, 'home', 'stories')}
          >
            STORIES
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
    </>
  );
};
export default Header;
