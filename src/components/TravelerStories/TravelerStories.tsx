import React, { useState, useEffect, useRef } from 'react';
import { REVIEWS_DATA } from '../../data/storiesData';
import { StoriesBackgroundMap } from './StoriesBackgroundMap';
import { TravellerCharacterSVG } from '../TravellerTransition/TravellerCharacterSVG';
import './TravelerStories.css';

export const TravelerStories: React.FC = () => {
  const [slideIndex, setSlideIndex] = useState<number>(0);
  const [enableTransition, setEnableTransition] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(false);
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isImageHovered, setIsImageHovered] = useState<boolean>(false);
  
  const sectionRef = useRef<HTMLElement>(null);

  const extendedReviews = [...REVIEWS_DATA, REVIEWS_DATA[0]];
  const totalReviews = REVIEWS_DATA.length;
  const activeIndex = slideIndex % totalReviews;
  const activeReview = REVIEWS_DATA[activeIndex];

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 35;

  const handleNext = () => {
    setEnableTransition(true);
    setSlideIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setEnableTransition(true);
    if (slideIndex === 0) {
      setEnableTransition(false);
      setSlideIndex(totalReviews);
      setTimeout(() => {
        setEnableTransition(true);
        setSlideIndex(totalReviews - 1);
      }, 20);
    } else {
      setSlideIndex((prev) => prev - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  // Scroll reveal trigger via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.12 }
    );

    const currentEl = sectionRef.current;
    if (currentEl) {
      observer.observe(currentEl);
    }

    return () => {
      if (currentEl) observer.unobserve(currentEl);
    };
  }, []);

  // Continuous forward auto-scroll through images 1->2->3->1 every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setEnableTransition(true);
      setSlideIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // When sliding to the cloned 4th item (slideIndex === totalReviews), seamlessly reset to index 0
  useEffect(() => {
    if (slideIndex === totalReviews) {
      const resetTimer = setTimeout(() => {
        setEnableTransition(false);
        setSlideIndex(0);
      }, 750);

      return () => clearTimeout(resetTimer);
    }
  }, [slideIndex, totalReviews]);

  // Subtle tactile cursor depth parallax for the photograph
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setTilt({ x: x * 3.5, y: y * 3.5 });
  };

  const handleMouseEnter = () => {
    setIsImageHovered(true);
  };

  const handleMouseLeave = () => {
    setIsImageHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section 
      id="stories" 
      ref={sectionRef}
      className={`traveler-stories-editorial ${isInView ? 'is-in-view' : ''}`} 
      aria-labelledby="stories-heading"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ====================================================================
          ATMOSPHERIC LAYERS: TACTILE PAPER GRAIN & SLOW MOVING AMBIENT LIGHT
          ==================================================================== */}
      <div className="stories-paper-texture" aria-hidden="true" />
      <div className="stories-ambient-light" aria-hidden="true" />

      {/* ====================================================================
          TOPOGRAPHIC MAP & FAINT HIMALAYAN MOUNTAIN SILHOUETTES BACKGROUND
          ==================================================================== */}
      <StoriesBackgroundMap isRevealed={isInView} />

      <div className="container stories-container">
        
        {/* Section Header */}
        <div className="testimonial-header">
          <div className="testimonial-header-left">
            <span className="text-meta">CLIENT REVIEWS</span>
            <span className="plus-indicator">+</span>
          </div>
        </div>

        {/* Testimonial Slider Grid */}
        <div className="testimonial-grid">
          
          {/* Left Column: Review Content */}
          <div className="testimonial-content-col">
            <div className="accent-bars-wrap">
              {REVIEWS_DATA.map((_, idx) => (
                <span 
                  key={idx} 
                  onClick={() => {
                    setEnableTransition(true);
                    setSlideIndex(idx);
                  }}
                  className={`bar-indicator ${activeIndex === idx ? 'bar-active' : ''}`}
                  style={{ cursor: 'pointer' }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <h2 id="stories-heading" className="testimonial-display-title">
              {activeReview.title}
            </h2>

            <div className="testimonial-body-text">
              {activeReview.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="testimonial-para">
                  {para}
                </p>
              ))}
            </div>

            <div className="testimonial-reviewer-row">
              <span className="reviewer-identity">{activeReview.reviewer}</span>
              <div className="reviewer-stars" aria-label={`${activeReview.rating} star rating`}>
                {Array.from({ length: activeReview.rating }).map((_, sIdx) => (
                  <span key={sIdx} className="star-char">★</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Image with Smooth Sliding Track & Tactile Depth */}
          <div className="testimonial-visual-col">
            
            <div 
              className="testimonial-image-wrapper"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div 
                className="testimonial-slider-track"
                style={{
                  transform: `translateX(-${slideIndex * 100}%)`,
                  transition: enableTransition ? 'transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                }}
              >
                {extendedReviews.map((review, idx) => (
                  <div key={`${review.id}-${idx}`} className="slider-slide-item">
                    <img 
                      src={review.image} 
                      alt={`Photo of ${review.reviewer}`} 
                      className="testimonial-photo"
                      style={{ 
                        objectPosition: review.imagePosition || 'center bottom',
                        transform: (isImageHovered && activeIndex === (idx % totalReviews))
                          ? `scale(1.03) translate3d(${tilt.x}px, ${tilt.y}px, 0)` 
                          : 'scale(1) translate3d(0, 0, 0)',
                      }}
                    />
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================================
          LOWER PORTION: SMALL RECURRING CHIBI TRAVELLER FOLLOWING ROUTE LINE
          ==================================================================== */}
      <div className="stories-trail-footer-lane" aria-hidden="true">
        <div className="stories-trail-faint-line" />
        <div className={`stories-traveller-carrier ${isInView ? 'is-active' : ''}`}>
          <TravellerCharacterSVG isMoving={isInView} />
        </div>
      </div>

    </section>
  );
};

export default TravelerStories;
