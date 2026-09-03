import React from 'react';
import './EditorialIntro.css';

export const EditorialIntro: React.FC = () => {
  return (
    <section id="mission" className="editorial-mission-section" aria-labelledby="mission-heading">
      <div className="container mission-container">
        
        {/* Main Row: Portrait Image on Left, Text Directly Beside It on Right (Top-Aligned) */}
        <div className="mission-top-grid">
          
          {/* Left Column: Portrait trekker image */}
          <div className="mission-image-col">
            <div className="portrait-image-card">
              <div className="image-wrapper">
                <img 
                  src="/trek.png" 
                  alt="Backpacker crossing a scenic suspension bridge on a mountain trek" 
                  loading="lazy"
                />
                <span className="image-badge">EXPEDITION 01</span>
              </div>
              <div className="portrait-caption">
                <div className="caption-detail">
                  <span className="detail-label">TERRAIN</span>
                  <span className="detail-value">Suspension Bridge • 4,130m</span>
                </div>
                <div className="caption-detail text-right">
                  <span className="detail-label">DIFFICULTY</span>
                  <span className="detail-value text-accent-yellow">GRADE IV</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Texts directly beside the image */}
          <div className="mission-content-col">
            <div className="mission-eyebrow-row">
              <span className="text-meta mission-eyebrow">OUR MISSION</span>
              <span className="mission-meta-pill">EXPLORE THE UNCHARTED</span>
            </div>

            <h2 id="mission-heading" className="mission-headline">
              <span className="mission-line">WE BELIEVE THAT</span>
              <span className="mission-line">ADVENTURE SHAPES US AND</span>
              <span className="mission-line">MAKES US WHO WE ARE.</span>
              <span className="mission-line">THAT’S WHY WE SPECIALISE</span>
              <span className="mission-line text-accent-yellow">IN CRAFTING LIFE-AFFIRMING</span>
              <span className="mission-line">ADVENTURES WORLDWIDE.</span>
            </h2>

            <p className="mission-lead-text">
              From dizzying suspension bridges across remote Himalayan gorges to high-altitude motorcycle traverses, Backpackers Destinations engineers raw, unfiltered expeditions for wanderers who demand genuine grit and authentic culture over commercial tourism.
            </p>

            {/* Expedition stats row */}
            <div className="mission-stats-strip">
              <div className="stat-box">
                <span className="stat-num">100%</span>
                <span className="stat-name">Unscripted</span>
                <span className="stat-desc">Raw backcountry routes</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">1:6</span>
                <span className="stat-name">Guide Ratio</span>
                <span className="stat-desc">Small expedition cohorts</span>
              </div>
              <div className="stat-box">
                <span className="stat-num">14+</span>
                <span className="stat-name">High Passes</span>
                <span className="stat-desc">Trans-Himalayan trails</span>
              </div>
            </div>

            {/* Action Row */}
            <div className="mission-action-row">
              <a href="#planner" className="btn btn-mission-primary">
                PLAN YOUR EXPEDITION
                <span className="btn-icon-arrow">→</span>
              </a>
              <div className="mission-status-indicator">
                <span className="status-dot"></span>
                <span>2026/27 Bookings Open</span>
              </div>
            </div>
          </div>

        </div>

        {/* Wide Landscape Feature Image (pi2.jpg) - Squeezed cleanly below */}
        <div className="mission-panorama-card">
          <div className="panorama-image-wrap">
            <img 
              src="/pi2.jpg" 
              alt="Adventure motorcyclists traversing the dramatic mountain roads of Ladakh" 
              loading="lazy"
            />
            <div className="panorama-overlay">
              <div className="panorama-info">
                <span className="panorama-tag">EXPEDITION 02 // MOTORCYCLE OVERLAND</span>
                <h3 className="panorama-title">LADAKH HIGH RIDGE ODYSSEY — 17,582 FT</h3>
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
