import React from 'react';
import './RiderSpotlight.css';

export const RiderSpotlight: React.FC = () => {
  return (
    <section className="rider-spotlight-root" aria-label="Creator Spotlight: Bobbie Dhanush">
      <div className="rider-spotlight-container">
        

        {/* 2-Column Classic Layout */}
        <div className="rider-spotlight-grid">
          
          {/* Left: Classic Framed Single Photo */}
          <div className="rider-photo-col">
            <div className="rider-photo-frame">
              <div className="rider-photo-inner">
                <img 
                  src="/rider.webp" 
                  alt="Bobbie Dhanush on a mountain motorcycle expedition with Backpackers Destinations" 
                  className="rider-spotlight-img"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Right: Classic Narrative & Instagram Profile */}
          <div className="rider-content-col">
            <div className="rider-content-wrap">
              
              {/* Eyebrow */}
              <span className="rider-eyebrow">
                OFFICIAL BACKPACKERS COLLABORATION
              </span>

              {/* Title */}
              <h2 className="rider-title">
                RIDING LADAKH WITH <span className="rider-title-accent">BOBBIE DHANUSH</span>
              </h2>

              {/* Creator Card */}
              <a 
                href="https://www.instagram.com/bobbiedhanush/?hl=en" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="rider-creator-card"
                title="View Bobbie Dhanush on Instagram"
              >
                <div className="creator-card-left">
                  <div className="creator-avatar-wrap">
                    <svg className="instagram-gradient-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                    </svg>
                  </div>
                  <div className="creator-meta">
                    <div className="creator-name-row">
                      <span className="creator-name">Bobbie Dhanush</span>
                      <svg className="verified-badge-icon" viewBox="0 0 24 24" width="16" height="16" fill="#3897F0">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <span className="creator-handle">@bobbiedhanush</span>
                  </div>
                </div>
                <div className="creator-card-arrow" aria-hidden="true">
                  <span>↗</span>
                </div>
              </a>

              {/* Story Narrative */}
              <p className="rider-story-desc">
                Popular Instagram creator and motorcycle enthusiast <strong>Bobbie Dhanush</strong> rode out with the <strong>Backpackers Destinations</strong> convoy on an epic Ladakh motorcycle ride. From carving rugged cliffside passes to crossing roaring mountain rivers, he experienced the raw thrill and brotherhood that define our journeys.
              </p>


              {/* Action Link & Meta Tags */}
              <div className="rider-actions-row">
                <a 
                  href="https://www.instagram.com/bobbiedhanush/?hl=en" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-rider-instagram"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  <span>SEE HIS JOURNEY ON INSTAGRAM</span>
                  <span className="btn-arrow" aria-hidden="true">&rarr;</span>
                </a>
              </div>

              {/* Expedition Spec Tags */}
              <div className="rider-specs-list">
                <div className="rider-spec-item">
                  <span className="spec-label">EXPEDITION</span>
                  <span className="spec-val">LADAKH</span>
                </div>
                <div className="rider-spec-divider" aria-hidden="true" />
                <div className="rider-spec-item">
                  <span className="spec-label">CONVOY</span>
                  <span className="spec-val">BACKPACKERS DESTINATIONS</span>
                </div>
                <div className="rider-spec-divider" aria-hidden="true" />
                <div className="rider-spec-item">
                  <span className="spec-label">GUEST</span>
                  <span className="spec-val">@BOBBIEDHANUSH</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default RiderSpotlight;
