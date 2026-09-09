import React, { useRef, useState, useEffect, useCallback } from 'react';
import { EXPEDITIONS_DATA } from '../../data/expeditionsData';
import './FeaturedExpeditions.css';

const REPEAT_COUNT = 3;
const INFINITE_EXPEDITIONS = Array.from({ length: REPEAT_COUNT }, () => EXPEDITIONS_DATA).flat();
const TOTAL_ITEMS = EXPEDITIONS_DATA.length;
const INITIAL_INDEX = TOTAL_ITEMS; // Start in middle set

export const FeaturedExpeditions: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);

  const [activeIndex, setActiveIndex] = useState<number>(INITIAL_INDEX);
  const [stepWidth, setStepWidth] = useState<number>(322);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [disableTransition, setDisableTransition] = useState<boolean>(false);

  // Measure dynamic card step width (card width + gap)
  useEffect(() => {
    const updateStepWidth = () => {
      if (trackRef.current) {
        const card = trackRef.current.querySelector('.expedition-card-wrapper') as HTMLElement;
        if (card) {
          const style = window.getComputedStyle(trackRef.current);
          const gap = parseFloat(style.gap || '32');
          setStepWidth(card.offsetWidth + gap);
        }
      }
    };

    updateStepWidth();
    window.addEventListener('resize', updateStepWidth, { passive: true });
    return () => window.removeEventListener('resize', updateStepWidth);
  }, []);

  // Seamless loop reset when activeIndex reaches boundary zones
  useEffect(() => {
    if (activeIndex >= TOTAL_ITEMS * 2.2 || activeIndex <= TOTAL_ITEMS * 0.2) {
      const timer = setTimeout(() => {
        setDisableTransition(true);
        const normalized = INITIAL_INDEX + (((activeIndex % TOTAL_ITEMS) + TOTAL_ITEMS) % TOTAL_ITEMS);
        setActiveIndex(normalized);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setDisableTransition(false);
          });
        });
      }, 520);
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDisableTransition(false);
    setActiveIndex((prev) => prev + 1);
  }, []);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setDisableTransition(false);
    setActiveIndex((prev) => prev - 1);
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDisableTransition(false);
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartX === null) return;
    const currentX = e.clientX;
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(() => {
      setDragOffset(currentX - dragStartX);
    });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      if (dragOffset < -40) {
        handleNext();
      } else if (dragOffset > 40) {
        handlePrev();
      } else {
        setDragOffset(0);
      }
      setIsDragging(false);
      setDragStartX(null);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setDragOffset(0);
      setIsDragging(false);
      setDragStartX(null);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setDisableTransition(false);
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging || dragStartX === null) return;
    const currentX = e.touches[0].clientX;
    if (animFrameRef.current !== null) {
      cancelAnimationFrame(animFrameRef.current);
    }
    animFrameRef.current = requestAnimationFrame(() => {
      setDragOffset(currentX - dragStartX);
    });
  };

  const handleTouchEnd = () => {
    if (isDragging) {
      if (dragOffset < -35) {
        handleNext();
      } else if (dragOffset > 35) {
        handlePrev();
      } else {
        setDragOffset(0);
      }
      setIsDragging(false);
      setDragStartX(null);
    }
  };

  const baseOffset = -activeIndex * stepWidth;
  const currentTransform = isDragging ? baseOffset + dragOffset : baseOffset;
  const normalizedIndex = ((activeIndex % TOTAL_ITEMS) + TOTAL_ITEMS) % TOTAL_ITEMS;
  const progressPercent = ((normalizedIndex + 1) / TOTAL_ITEMS) * 100;

  return (
    <section id="featured-tours" className="featured-expeditions-section" aria-labelledby="featured-tours-heading">
      <div className="container">
        
        {/* Header Layout */}
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

      {/* Carousel Rail Container */}
      <div className="carousel-rail-container">
        {/* Left Floating Side Button */}
        <button 
          className="carousel-side-btn carousel-side-prev"
          onClick={handlePrev}
          aria-label="Previous Tour"
          title="Previous Tour"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Right Floating Side Button */}
        <button 
          className="carousel-side-btn carousel-side-next"
          onClick={handleNext}
          aria-label="Next Tour"
          title="Next Tour"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Carousel Rail Track */}
        <div 
          className={`expeditions-rail-wrap ${isDragging ? 'is-dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            ref={trackRef}
            className="expeditions-carousel-track"
            style={{ 
              transform: `translate3d(${currentTransform}px, 0, 0)`,
              transition: (isDragging || disableTransition) ? 'none' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {INFINITE_EXPEDITIONS.map((exp, idx) => {
              const isCardActive = idx === activeIndex;
              return (
                <div 
                  key={`${exp.id}-${idx}`} 
                  className={`expedition-card-wrapper ${isCardActive ? 'is-active' : ''}`}
                  onClick={() => {
                    setDisableTransition(false);
                    setActiveIndex(idx);
                  }}
                >
                  <article className="expedition-card">
                    
                    {/* Outer Colored Frame Container */}
                    <div className="poster-frame" style={{ backgroundColor: exp.frameColor }}>
                      
                      {/* Inner Photograph Area */}
                      <div className="poster-inner-media">
                        <img 
                          src={exp.image} 
                          alt={exp.alt} 
                          className="card-img" 
                          style={exp.objectPosition ? { objectPosition: exp.objectPosition } : undefined}
                          draggable="false"
                          loading="lazy"
                          decoding="async"
                        />
                        <div className="card-media-overlay" />
                        
                        {/* Display Typography Overlay */}
                        <h3 className="poster-title-overlay">
                          {exp.title.split(' ').map((word, wIdx) => (
                            <span key={wIdx} className="title-word">{word}</span>
                          ))}
                        </h3>

                        {/* Hover indicator */}
                        <span className="hover-explore-indicator">VIEW EXPEDITION &rarr;</span>
                      </div>

                      {/* Vertical Typography Label */}
                      <div className="vertical-label">
                        {exp.verticalLabel}
                      </div>

                    </div>

                    {/* Metadata Below Image */}
                    <div className="card-meta-below">
                      <span className="card-dest-label">{exp.regionLabel}</span>
                      
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

                      <hr className="card-divider" />
                    </div>

                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="container">
        {/* Progress Bar Line */}
        <div className="expeditions-controls-bar">
          <div className="controls-progress-track">
            <div 
              className="controls-progress-bar" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedExpeditions;
