import React, { useState } from 'react';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { TravellerCharacterSVG } from '../TravellerTransition/TravellerCharacterSVG';
import './TripCategories.css';

// Destination corridors exploration section (Ladakh, Nepal, Kerala, International)
export const TripCategories: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <section id="destinations-section" className="destinations-editorial" aria-labelledby="destinations-title">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <div className="section-header-left">
            <span className="text-meta">ROUTE EXPLORATION</span>
            <div className="destinations-title-wrap">
              <h2 id="destinations-title" className="section-headline">
                WHERE DO YOU WANT TO GO?
              </h2>
              
              {/* Subtle motorcycle traveller walking beside the title */}
              <div className="title-traveller-lane" aria-hidden="true">
                <div className="title-traveller-track-line" />
                <div className="title-traveller-mover">
                  <TravellerCharacterSVG isMoving={true} />
                </div>
              </div>
            </div>
          </div>
          <span className="text-meta header-corridor-meta">SELECT A CORRIDOR</span>
        </div>

        {/* Editorial Interactive Layout */}
        <div className="destinations-split-layout">
          
          {/* Left Column: Interactive Destination List */}
          <div className="destinations-list-panel">
            {CATEGORIES_DATA.map((dest, index) => {
              const isActive = index === activeIndex;
              return (
                <div 
                  key={dest.id}
                  className={`dest-list-row ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  tabIndex={0}
                  onFocus={() => setActiveIndex(index)}
                >
                  <div className="dest-row-number">{dest.number}</div>
                  <div className="dest-row-content">
                    <h3 className="dest-row-title">{dest.title}</h3>
                    <p className={`dest-row-desc ${isActive ? 'is-visible' : ''}`}>
                      {dest.description}
                    </p>
                  </div>
                  <span className="dest-row-indicator">&rarr;</span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Large Cinematic Image Frame with Asymmetric Overlapping Supporting Image */}
          <div className="destinations-visual-panel">
            
            {/* Main Large Cinematic Image Container */}
            <div className="dest-main-frame">
              {CATEGORIES_DATA.map((dest, index) => (
                <img 
                  key={dest.id}
                  src={dest.image}
                  alt={dest.alt}
                  className={`dest-main-img ${index === activeIndex ? 'is-visible' : ''}`}
                  loading="lazy"
                />
              ))}
              <div className="dest-img-shimmer" />
            </div>

            {/* Overlapping Asymmetric Supporting Image */}
            <div className="dest-supporting-frame">
              {CATEGORIES_DATA.map((dest, index) => {
                // Shift indices to show a different supporting image for variety
                const supportIndex = (index + 1) % CATEGORIES_DATA.length;
                const supportImg = CATEGORIES_DATA[supportIndex];
                return (
                  <img 
                    key={`support-${dest.id}`}
                    src={supportImg.image}
                    alt={supportImg.alt}
                    className={`dest-supporting-img ${index === activeIndex ? 'is-visible' : ''}`}
                    loading="lazy"
                  />
                );
              })}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
