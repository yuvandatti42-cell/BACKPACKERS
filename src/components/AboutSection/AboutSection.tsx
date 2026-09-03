import React from 'react';
import './AboutSection.css';

export const AboutSection: React.FC = () => {
  return (
    <section className="section section-bordered-top" aria-labelledby="about-heading">
      <div className="container">
        <div className="about-grid">
          <div className="about-media-frame">
            <img 
              src="/in.jpg" 
              alt="Experienced overland travel guide standing beside their bike overlooking high mountain peaks" 
              loading="lazy" 
            />
          </div>

          <div className="about-content">
            <span className="text-meta">ABOUT THE BRAND</span>
            <h2 id="about-heading" className="section-headline">
              BUILT AROUND THE ROAD
            </h2>
            <p className="text-lead">
              Backpackers Destinations organizes motorcycle tours, weekend drives, and overland expeditions.
            </p>
            <p>
              We plan routes that prioritize the driving experience, regional landscapes, and manageable daily pacing. Whether navigating mountain passes in Ladakh or coastal corridors in the south, our journeys are structured for travellers who value real routes over rushed itineraries.
            </p>
            <div style={{ marginTop: '0.75rem' }}>
              <a href="#planner" className="btn btn-secondary">
                START A CONVERSATION
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
