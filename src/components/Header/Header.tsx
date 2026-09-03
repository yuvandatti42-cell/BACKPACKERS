import React, { useState, useEffect } from 'react';
import './Header.css';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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

  return (
    <>
      <header className={`site-header ${isScrolled ? 'nav-scrolled' : ''}`} role="banner">
        <div className="container nav-container">
          
          {/* Left Column: Symmetrical Navigation */}
          <div className="nav-col-left">
            <a href="#destinations-section" className="nav-link">DESTINATIONS</a>
            <a href="#featured-tours" className="nav-link">TOURS</a>
          </div>

          {/* Centered Brand Logo */}
          <div className="nav-col-center">
            <a href="#hero" className="brand-center-lockup" aria-label="Backpackers Destinations Home">
              <div className="brand-logo-circle">
                <img 
                  src="/logo.jpg" 
                  alt="Backpackers Logo" 
                  className="brand-logo-img" 
                />
              </div>
              <span className="brand-center-name">BACKPACKERS</span>
            </a>
          </div>

          {/* Right Column: Symmetrical Navigation & Action buttons */}
          <div className="nav-col-right">
            <a href="#stories" className="nav-link">STORIES</a>
            <a 
              href="/terms_and_conditions.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="nav-link nav-waiver-link"
              title="Open Terms & Liability Waiver PDF"
            >
              WAIVER PDF 📄
            </a>
            <a href="#planner" className="btn btn-contact-header">CONTACT US</a>
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
          <a href="#hero" className="mobile-nav-link" onClick={closeMenu}>HOME</a>
          <a href="#destinations-section" className="mobile-nav-link" onClick={closeMenu}>DESTINATIONS</a>
          <a href="#featured-tours" className="mobile-nav-link" onClick={closeMenu}>TOURS</a>
          <a href="#stories" className="mobile-nav-link" onClick={closeMenu}>STORIES</a>
          <a 
            href="/terms_and_conditions.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="mobile-nav-link" 
            onClick={closeMenu}
            style={{ color: 'var(--accent-primary)' }}
          >
            WAIVER (PDF 📄)
          </a>
          <a href="#planner" className="mobile-nav-link" onClick={closeMenu}>CONTACT US</a>
        </div>
        <div>
          <a href="#planner" className="btn btn-primary" style={{ width: '100%' }} onClick={closeMenu}>
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
