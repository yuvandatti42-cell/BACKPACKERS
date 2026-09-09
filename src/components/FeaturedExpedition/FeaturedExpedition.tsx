import React from 'react';
import './FeaturedExpedition.css';

export const FeaturedExpedition: React.FC = () => {
  return (
    <section className="featured-expedition" aria-labelledby="featured-expedition-title">
      {/* Background Cinematic Image */}
      <div className="featured-expedition-media">
        <img 
          src="/ladakh.jpg" 
          alt="A long, lonely winding asphalt highway heading into the colossal mountains of Ladakh" 
          className="featured-expedition-img"
          loading="lazy"
        />
        <div className="featured-expedition-overlay" />
      </div>

      <div className="container featured-expedition-container">
        
        {/* Top left category badge */}
        <div className="featured-expedition-badge-wrap">
          <span className="text-meta expedition-badge">RECOMMENDED RUN // SEASON 2026</span>
        </div>

        {/* Large overlapping display typography */}
        <div className="featured-expedition-title-wrap">
          <h2 id="featured-expedition-title" className="featured-expedition-display">
            <span className="expedition-line line-main">LADAKH</span>
            <span className="expedition-line line-sub text-accent">HIGH PASSES</span>
          </h2>
        </div>

        {/* Bottom row: supporting details and CTA */}
        <div className="featured-expedition-footer">
          <div className="expedition-stats">
            <div className="expedition-stat-item">
              <span className="stat-label">ALTITUDE</span>
              <span className="stat-value">5,359 M</span>
            </div>
            <div className="expedition-stat-item">
              <span className="stat-label">STAGES</span>
              <span className="stat-value">12 DAYS</span>
            </div>
            <div className="expedition-stat-item">
              <span className="stat-label">ROUTE</span>
              <span className="stat-value">LEH &bull; HANLE &bull; TSO MORIRI</span>
            </div>
            <div className="expedition-stat-item">
              <span className="stat-label">GRADE</span>
              <span className="stat-value">SEVERE / EXPEDITION</span>
            </div>
          </div>


        </div>

      </div>
    </section>
  );
};
