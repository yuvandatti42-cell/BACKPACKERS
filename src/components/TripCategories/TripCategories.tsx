import React, { useState } from 'react';
import { CATEGORIES_DATA } from '../../data/categoriesData';
import { TravellerCharacterSVG } from '../TravellerTransition/TravellerCharacterSVG';
import './TripCategories.css';

interface TripCategoriesProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
}

// Destination corridors exploration section (Ladakh, South India, North India, North East)
export const TripCategories: React.FC<TripCategoriesProps> = ({ onNavigate }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const handleSelectCategory = (id: string) => {
    if (onNavigate) {
      onNavigate(`region:${id}`);
    } else {
      window.location.hash = `region/${id}`;
    }
  };

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
                  onClick={() => setActiveIndex(index)}
                  tabIndex={0}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                  role="button"
                  aria-label={`Select ${dest.title}`}
                >
                  <div className="dest-row-number">{dest.number}</div>
                  <div className="dest-row-content">
                    <h3 className="dest-row-title">{dest.title}</h3>
                    <p className={`dest-row-desc ${isActive ? 'is-visible' : ''}`}>
                      {dest.description}
                    </p>
                    {isActive && (
                      <span 
                        className="dest-row-action-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectCategory(dest.id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.stopPropagation();
                            e.preventDefault();
                            handleSelectCategory(dest.id);
                          }
                        }}
                        role="button"
                        tabIndex={0}
                        aria-label={`Explore ${dest.title} trips`}
                      >
                        EXPLORE {dest.title} TRIPS &rarr;
                      </span>
                    )}
                  </div>
                  <span 
                    className="dest-row-indicator" 
                    title={`Explore ${dest.title}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCategory(dest.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        e.preventDefault();
                        handleSelectCategory(dest.id);
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Explore ${dest.title}`}
                  >
                    &rarr;
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right Column: Large Cinematic Image Frame with Asymmetric Overlapping Supporting Image */}
          <div className="destinations-visual-panel">
            
            {/* Main Large Cinematic Image Container */}
            <div 
              className="dest-main-frame" 
              onClick={() => handleSelectCategory(CATEGORIES_DATA[activeIndex].id)}
              style={{ cursor: 'pointer' }}
              title={`Click to view all ${CATEGORIES_DATA[activeIndex].title} trips`}
            >
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
              <div className="dest-hover-badge">
                EXPLORE {CATEGORIES_DATA[activeIndex]?.title} TRIPS &rarr;
              </div>
            </div>

            {/* Overlapping Asymmetric Supporting Image */}
            <div 
              className="dest-supporting-frame"
              onClick={() => {
                const nextIndex = (activeIndex + 1) % CATEGORIES_DATA.length;
                handleSelectCategory(CATEGORIES_DATA[nextIndex].id);
              }}
              style={{ cursor: 'pointer' }}
              title="Click to explore option"
            >
              {CATEGORIES_DATA.map((dest, index) => {
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

