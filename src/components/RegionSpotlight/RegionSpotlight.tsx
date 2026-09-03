import React, { useState } from 'react';
import { REGIONS_DATA } from '../../data/regionsData';
import './RegionSpotlight.css';

export const RegionSpotlight: React.FC = () => {
  const [activeRegionId, setActiveRegionId] = useState<string>(REGIONS_DATA[0].id);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [displayedRegionId, setDisplayedRegionId] = useState<string>(REGIONS_DATA[0].id);

  const handleTabChange = (regionId: string) => {
    if (regionId === activeRegionId || isTransitioning) return;
    setActiveRegionId(regionId);
    setIsTransitioning(true);
    
    setTimeout(() => {
      setDisplayedRegionId(regionId);
      setIsTransitioning(false);
    }, 220);
  };

  const displayedRegion = REGIONS_DATA.find(r => r.id === displayedRegionId) || REGIONS_DATA[0];

  return (
    <section id="destinations" className="section section-bordered-top bg-secondary" aria-labelledby="destinations-heading">
      <div className="container">
        
        {/* Section Header with Numbering & Route Line */}
        <div className="section-header">
          <div className="section-header-left">
            <div className="section-meta-row">
              <span className="text-meta">CORE REGIONS</span>
            </div>
            <h2 id="destinations-heading" className="section-headline">
              WHERE WE OPERATE
            </h2>
          </div>
          <span className="text-meta">SELECT A ROUTE CORRIDOR</span>
        </div>

        <div className="destinations-spotlight">
          
          {/* Interactive Route Branching Navigation */}
          <div className="destination-spotlight-nav" role="tablist" aria-label="Regional Destinations">
            
            {/* Route Tree Origin Badge */}
            <div className="dest-route-origin">
              <span className="origin-dot">●</span>
              <span className="origin-text">EXPEDITION NETWORK ORIGIN</span>
            </div>

            <div className="dest-nav-buttons-wrap">
              {REGIONS_DATA.map((region) => {
                const isActive = region.id === activeRegionId;
                return (
                  <button
                    key={region.id}
                    role="tab"
                    id={`tab-${region.id}`}
                    aria-controls={`panel-${region.id}`}
                    aria-selected={isActive}
                    className={`dest-nav-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => handleTabChange(region.id)}
                  >
                    {/* Conceptual Route Node & Connector */}
                    <div className="dest-branch-node" aria-hidden="true">
                      <span className="branch-line-stem"></span>
                      <span className={`branch-node-dot ${isActive ? 'is-active-dot' : ''}`}></span>
                    </div>

                    <div className="dest-nav-body">
                      <div className="dest-nav-btn-header">
                        <span className="dest-nav-num">{region.number}</span>
                        <h4>{region.name}</h4>
                        <span className="dest-branch-tag">ROUTE ACTIVE</span>
                      </div>
                      <p>{region.description.split('.')[0]}.</p>
                    </div>

                    <span className="dest-nav-indicator" aria-hidden="true"></span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Region Preview Display with Animated Transition */}
          <div 
            id={`panel-${displayedRegion.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${displayedRegion.id}`}
            className={`destination-preview-box ${isTransitioning ? 'is-exiting' : 'is-entering'}`}
          >
            <div className="dest-preview-img-wrap">
              <img 
                key={displayedRegion.image}
                src={displayedRegion.image} 
                alt={displayedRegion.alt} 
                loading="lazy" 
                className="dest-spotlight-img" 
              />
              <div className="dest-img-badge">
                <span className="dest-img-live-dot" aria-hidden="true"></span>
                <span>{displayedRegion.name} CORRIDOR</span>
              </div>
            </div>
            
            <div className="dest-preview-details">
              <span className="badge badge-accent" style={{ marginBottom: '0.5rem', width: 'fit-content' }}>
                {displayedRegion.terrain}
              </span>
              <h3 className="dest-preview-title">
                {displayedRegion.title}
              </h3>
              <p className="dest-preview-desc">{displayedRegion.description}</p>
              
              <div className="dest-route-meta-strip">
                <div className="strip-item">
                  <span className="strip-label">NETWORK ID</span>
                  <span className="strip-val">BD-EXP-{displayedRegion.number}</span>
                </div>
                <div className="strip-item">
                  <span className="strip-label">SEASON</span>
                  <span className="strip-val">BEST TIMING OPEN</span>
                </div>
              </div>

              <a href="#planner" className="btn btn-primary" style={{ marginTop: '1rem', width: 'fit-content' }}>
                <span>INQUIRE FOR THIS REGION</span>
                <span className="btn-icon-arrow" aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
