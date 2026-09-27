import React from 'react';
import './HeroSection.css';

interface HeroSectionProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  onOpenBookModal?: (title?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate, onOpenBookModal }) => {
  const handleBookClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onOpenBookModal) {
      onOpenBookModal();
    } else if (onNavigate) {
      onNavigate('home', 'planner');
    } else {
      const plannerSection = document.getElementById('planner');
      if (plannerSection) {
        plannerSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = 'planner';
      }
    }
  };

  return (
    <section id="hero" className="hero-alpine" aria-labelledby="hero-heading">
      <div className="container hero-container">
        
        {/* Symmetrical/Asymmetrical Content Row */}
        <div className="hero-bottom-row">
          
          {/* Lower-Right Headline Block (Original Position & Order) */}
          <div className="hero-content-wrap">
            <h1 id="hero-heading" className="hero-display-headline">
              <span className="hero-headline-line animate-slide-up" style={{ animationDelay: '200ms' }}>
                ESCAPE
              </span>
              <span className="hero-headline-line animate-slide-up" style={{ animationDelay: '350ms' }}>
                EXPLORE
              </span>
              <span className="hero-headline-line animate-slide-up" style={{ animationDelay: '500ms' }}>
                EXPERIENCE
              </span>
            </h1>
          </div>

          {/* Action Panel CTA Button */}
          <div className="hero-action-panel animate-fade-in" style={{ animationDelay: '650ms' }}>
            <a 
              href="#planner" 
              className="btn-hero-cta"
              onClick={handleBookClick}
              aria-label="Book your trip"
            >
              <span>BOOK YOUR TRIP</span>
              <svg className="btn-icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;

