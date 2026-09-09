import React from 'react';
import './EditorialIntro.css';

export const EditorialIntro: React.FC = () => {
  return (
    <section id="mission" className="editorial-mission-section" aria-labelledby="mission-heading">
      <div className="container mission-container">
        
        {/* Wide Landscape Feature Image (pi2.jpg) */}
        <div className="mission-panorama-card">
          <div className="panorama-image-wrap">
            <img 
              src="/pi2.jpg" 
              alt="Adventure motorcyclists traversing the dramatic mountain roads of Ladakh" 
              loading="lazy"
              decoding="async"
            />
            <div className="panorama-overlay">
              <div className="panorama-info">
                <span className="panorama-tag">EXPEDITION 02 // MOTORCYCLE OVERLAND</span>
                <h3 id="mission-heading" className="panorama-title">LADAKH HIGH RIDGE ODYSSEY — 17,582 FT</h3>
              </div>
              <span className="panorama-location">TRANS-HIMALAYAN CORRIDOR</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EditorialIntro;

