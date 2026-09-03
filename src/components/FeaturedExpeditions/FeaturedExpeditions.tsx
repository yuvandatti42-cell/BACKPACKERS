import React, { useRef, useState, useEffect } from 'react';
import { EXPEDITIONS_DATA } from '../../data/expeditionsData';
import './FeaturedExpeditions.css';

export const FeaturedExpeditions: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; scrollLeft: number }>({ x: 0, scrollLeft: 0 });

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const maxScroll = container.scrollWidth - container.clientWidth;
    const currentScroll = container.scrollLeft;

    const progress = maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0;
    setScrollProgress(progress);

    const cardElements = container.querySelectorAll('.expedition-card-wrapper');
    if (cardElements.length > 0) {
      let closestIndex = 0;
      let minDistance = Infinity;

      cardElements.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const containerCenter = containerRect.left + containerRect.width / 2;
        const distance = Math.abs(cardCenter - containerCenter);

        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });

      setActiveIndex(closestIndex);
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY !== 0) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        const isAtStart = container.scrollLeft <= 0 && e.deltaY < 0;
        const isAtEnd = container.scrollLeft >= maxScroll && e.deltaY > 0;

        if (!isAtStart && !isAtEnd) {
          e.preventDefault();
          container.scrollLeft += e.deltaY * 0.85;
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('scroll', handleScroll, { passive: true });

    handleScroll();

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsDragging(true);
    dragStartRef.current = {
      x: e.pageX - container.offsetLeft,
      scrollLeft: container.scrollLeft
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
    e.preventDefault();

    const container = scrollContainerRef.current;
    if (!container) return;

    const x = e.pageX - container.offsetLeft;
    const walk = (x - dragStartRef.current.x) * 1.5;
    container.scrollLeft = dragStartRef.current.scrollLeft - walk;
  };

  const scrollNav = (direction: 'prev' | 'next') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const card = container.querySelector('.expedition-card-wrapper');
    if (!card) return;

    const scrollAmount = card.clientWidth + 32;
    const targetScroll = direction === 'next' 
      ? container.scrollLeft + scrollAmount 
      : container.scrollLeft - scrollAmount;

    container.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
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

        {/* Gallery Rail */}
        <div 
          className={`expeditions-rail-wrap ${isDragging ? 'is-dragging' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
        >
          <div className="expeditions-rail" ref={scrollContainerRef}>
            {EXPEDITIONS_DATA.map((exp) => (
              <div key={exp.id} className="expedition-card-wrapper">
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

        {/* Navigation & Progress Bar */}
        <div className="expeditions-controls-bar">
          
          <div className="controls-progress-track">
            <div 
              className="controls-progress-bar" 
              style={{ width: `${scrollProgress}%` }}
            />
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
