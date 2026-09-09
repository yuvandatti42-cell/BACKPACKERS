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
              <h2 id="mission-heading" className="panorama-heading">
                <span className="panorama-heading-line">WHERE</span>
                <span className="panorama-heading-line">WILL THE</span>
                <span className="panorama-heading-line">ROAD TAKE</span>
                <span className="panorama-heading-line highlight">YOU?</span>
              </h2>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default EditorialIntro;

