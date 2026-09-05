import React, { useRef, useState, useEffect } from 'react';
import { EXPEDITIONS_DATA } from '../../data/expeditionsData';
import './FeaturedExpeditions.css';

// 4 sets of 5 items = 20 cards total in infinite marquee
const DUPLICATION_FACTOR = 4;
const MARQUEE_EXPEDITIONS = Array.from({ length: DUPLICATION_FACTOR }, () => EXPEDITIONS_DATA).flat();

export const FeaturedExpeditions: React.FC = () => {
  const railWrapRef = useRef<HTMLDivElement>(null);
  const activeIndexRef = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [manualOffset, setManualOffset] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ startX: number; initialOffset: number }>({ startX: 0, initialOffset: 0 });

  // Update active index based on card nearest to container center
  useEffect(() => {
    const container = railWrapRef.current;
    if (!container) return;

    let animationFrameId: number;

    const updateActiveIndex = () => {
      const cardElements = container.querySelectorAll('.expedition-card-wrapper');
      if (!cardElements || cardElements.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let minDistance = Infinity;
      let closestCardIndex = 0;

      cardElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestCardIndex = idx;
        }
      });

      const normalizedIndex = closestCardIndex % EXPEDITIONS_DATA.length;
      if (normalizedIndex !== activeIndexRef.current) {
        activeIndexRef.current = normalizedIndex;
        setActiveIndex(normalizedIndex);
      }
    };

    const loop = () => {
      updateActiveIndex();
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    dragStartRef.current = {
      startX: e.pageX,
      initialOffset: manualOffset
    };
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.pageX - dragStartRef.current.startX;
    setManualOffset(dragStartRef.current.initialOffset + deltaX);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStartRef.current = {
        startX: e.touches[0].pageX,
        initialOffset: manualOffset
      };
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].pageX - dragStartRef.current.startX;
    setManualOffset(dragStartRef.current.initialOffset + deltaX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const scrollNav = (direction: 'prev' | 'next') => {
    const cardWidthWithGap = 290 + 32; // 322px
    setManualOffset((prev) => (direction === 'next' ? prev - cardWidthWithGap : prev + cardWidthWithGap));
  };

  return (
    <section id="featured-tours" className="featured-expeditions-section" aria-labelledby="featured-tours-heading">
      <div className="container">
        
        {/* Spacious Header Layout */}
        <div className="expeditions-header">
          <div className="header-left">
            <span className="text-meta heading-eyebrow">+ EXPLORE OUR ADVENTURES</span>
            <h2 id="featured-tours-heading" className="expeditions-display-title">
              <span className="title-row">FEATURED</span>
              <span className="title-row text-accent">TOURS</span>
            </h2>
          </div>
          <div className="header-right">
            <p className="expeditions-lead-desc">
              "Take the first step towards your next life-affirming adventure."
            </p>
          </div>
        </div>

      </div>

      {/* Gallery Rail Marquee */}
      <div 
        className={`expeditions-rail-wrap ${isDragging ? 'is-dragging' : ''}`}
        ref={railWrapRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="expeditions-nudge-track" 
          style={{ 
            transform: `translate3d(${manualOffset}px, 0, 0)`,
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          <div className="expeditions-marquee-track">
            {MARQUEE_EXPEDITIONS.map((exp, idx) => (
              <div key={`${exp.id}-${idx}`} className="expedition-card-wrapper">
                <article className="expedition-card">
                  
                  {/* Outer Colored Frame Container (approx 12-18px padding, dynamic bgColor) */}
                  <div className="poster-frame" style={{ backgroundColor: exp.frameColor }}>
                    
                    {/* Inner Photograph Area */}
                    <div className="poster-inner-media">
                      <img 
                        src={exp.image} 
                        alt={exp.alt} 
                        className="card-img" 
                        draggable="false"
                        loading="lazy"
                      />
                      <div className="card-media-overlay" />
                      
                      {/* Large Stacked White Display Typography Inside Image */}
                      <h3 className="poster-title-overlay">
                        {exp.title.split(' ').map((word, wIdx) => (
                          <span key={wIdx} className="title-word">{word}</span>
                        ))}
                      </h3>

                      {/* Hover action overlay indicator */}
                      <span className="hover-explore-indicator">VIEW EXPEDITION &rarr;</span>
                    </div>

                    {/* Vertical Typography Label Along the Right Side of Colored Frame */}
                    <div className="vertical-label">
                      {exp.verticalLabel}
                    </div>

                  </div>

                  {/* Destination & Metadata Below the Image */}
                  <div className="card-meta-below">
                    <span className="card-dest-label">{exp.destination}</span>
                    
                    <div className="card-details-row">
                      <span className="difficulty-tag">+ {exp.difficulty}</span>
                      <span className="meta-dot">&bull;</span>
                      <span className="duration-tag">{exp.duration}</span>
                      {exp.distance && (
                        <>
                          <span className="meta-dot">&bull;</span>
                          <span className="distance-tag">{exp.distance}</span>
                        </>
                      )}
                    </div>

                    {/* Clean dividing rule */}
                    <hr className="card-divider" />
                  </div>

                </article>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Navigation & Progress Bar */}
        <div className="expeditions-controls-bar">
          
          <div className="controls-progress-track">
            <div className="controls-progress-bar" />
          </div>

          <div className="controls-nav-group">
            <span className="controls-counter">
              0{activeIndex + 1} <span className="counter-divider">/</span> 05
            </span>

            <div className="controls-arrows">
              <button 
                onClick={() => scrollNav('prev')} 
                className="btn-control-arrow" 
                aria-label="Previous Tour"
              >
                &larr;
              </button>
              <span className="arrow-separator">|</span>
              <button 
                onClick={() => scrollNav('next')} 
                className="btn-control-arrow" 
                aria-label="Next Tour"
              >
                &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

