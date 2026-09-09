import React from 'react';
import './EditorialIntro.css';

export const EditorialIntro: React.FC = () => {
  return (
    <section id="mission" className="editorial-mission-section" aria-label="Editorial Feature">
      <div className="mission-panorama-card">
        <div className="panorama-image-wrap">
          <img 
            src="/pi2.jpg" 
            alt="Adventure motorcyclists traversing the dramatic mountain roads of Ladakh" 
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
};
export default EditorialIntro;
