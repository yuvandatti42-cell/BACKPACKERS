import React from 'react';
import './HeroSection.css';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="hero-alpine" aria-labelledby="hero-heading">
      <div className="container hero-container">
        
        {/* Symmetrical/Asymmetrical Content Row */}
        <div className="hero-bottom-row">
          
          {/* Lower-Left Headline Block */}
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

        </div>

      </div>
    </section>
  );
};
export default HeroSection;
