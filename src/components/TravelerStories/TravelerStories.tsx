import React, { useState, useEffect, useRef } from 'react';
import { REVIEWS_DATA } from '../../data/storiesData';
import { StoriesBackgroundMap } from './StoriesBackgroundMap';
import { TravellerCharacterSVG } from '../TravellerTransition/TravellerCharacterSVG';
import './TravelerStories.css';

const LOOPED_REVIEWS = [
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
  ...REVIEWS_DATA,
];

interface TravelerStoriesProps {
  onNavigate?: (route: string) => void;
}

export const TravelerStories: React.FC<TravelerStoriesProps> = ({ onNavigate }) => {
  const [trackIndex, setTrackIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);
  const [isInView, setIsInView] = useState<boolean>(false);
  
  const sectionRef = useRef<HTMLElement>(null);

  const totalReviews = REVIEWS_DATA.length;
  const activeIndex = trackIndex % totalReviews;
  const activeReview = REVIEWS_DATA[activeIndex];

  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 35;

  const handleNext = () => {
    setIsTransitioning(true);
    setTrackIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTrackIndex((prev) => (prev > 0 ? prev - 1 : 0));
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

  // Continuous forward auto-scroll every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      setTrackIndex((prev) => prev + 1);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  // Soft loop reset back to activeIndex when trackIndex gets large
  useEffect(() => {
    if (trackIndex >= 21) {
      const resetTimer = setTimeout(() => {
        setIsTransitioning(false);
        setTrackIndex(activeIndex);
      }, 700);
      return () => clearTimeout(resetTimer);
    }
  }, [trackIndex, activeIndex]);

  // Subtle tactile cursor depth parallax for the photograph (CSS variables avoid React re-renders)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 6;
    el.style.setProperty('--tilt-x', `${x.toFixed(1)}px`);
    el.style.setProperty('--tilt-y', `${y.toFixed(1)}px`);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--tilt-scale', '1.03');
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty('--tilt-scale', '1');
    e.currentTarget.style.setProperty('--tilt-x', '0px');
    e.currentTarget.style.setProperty('--tilt-y', '0px');
  };

  return (
    <section 
      id="reviews" 
      ref={sectionRef}
      className={`traveler-stories-editorial ${isInView ? 'is-in-view' : ''}`} 
      aria-labelledby="stories-heading"
    >
      <span id="stories" style={{ position: 'absolute', pointerEvents: 'none', opacity: 0 }} aria-hidden="true" />
      {/* DESKTOP VIEW: Rich Editorial Layout */}
      <div className="desktop-only-stories">
        <div className="stories-paper-texture" aria-hidden="true" />
        <div className="stories-ambient-light" aria-hidden="true" />
        <StoriesBackgroundMap isRevealed={isInView} />

        <div className="container stories-container">
          <div className="testimonial-header">
            <div className="testimonial-header-left">
              <span className="text-meta">CLIENT REVIEWS</span>
              <span className="plus-indicator">+</span>
            </div>
            {onNavigate && (
              <button 
                type="button"
                className="view-all-reviews-link-btn"
                onClick={() => onNavigate('reviews')}
              >
                <span>EXPLORE ALL REVIEWS &amp; SADDLE STORIES</span>
                <span>&rarr;</span>
              </button>
            )}
          </div>

          <div className="testimonial-grid">
            <div className="testimonial-content-col">
              <div className="accent-bars-wrap">
                {REVIEWS_DATA.map((_, idx) => (
                  <span 
                    key={idx} 
                    onClick={() => {
                      setIsTransitioning(true);
                      setTrackIndex(idx);
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
                    transform: `translateX(-${trackIndex * 100}%)`,
                    transition: isTransitioning ? 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
                  }}
                >
                  {LOOPED_REVIEWS.map((review, idx) => (
                    <div key={`${review.id}-${idx}`} className="slider-slide-item">
                      <img 
                        src={review.image} 
                        alt={`Photo of ${review.reviewer}`} 
                        className="testimonial-photo"
                        loading="lazy"
                        decoding="async"
                        style={{ 
                          objectPosition: review.imagePosition || 'center bottom',
                          transform: 'scale(var(--tilt-scale, 1)) translate3d(var(--tilt-x, 0px), var(--tilt-y, 0px), 0)',
                          transition: 'transform 0.18s ease-out'
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stories-trail-footer-lane" aria-hidden="true">
          <div className="stories-trail-faint-line" />
          <div className={`stories-traveller-carrier ${isInView ? 'is-active' : ''}`}>
            <TravellerCharacterSVG isMoving={isInView} />
          </div>
        </div>
      </div>

      {/* MOBILE VIEW: Clean Minimal Review Section */}
      <div 
        className="mobile-only-stories"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="container">
          <div className="minimal-stories-header">
            <span className="text-meta">RIDER REVIEWS</span>
            <h2 className="minimal-stories-title">
              WHAT OUR TRAVELLERS SAY
            </h2>
          </div>

          <div className="minimal-reviews-mobile-card">
            <div className="review-card-header">
              <div className="review-avatar-wrap">
                <img src={activeReview.image} alt={activeReview.reviewer} className="review-avatar-img" loading="lazy" decoding="async" />
              </div>
              <div className="review-meta-info">
                <h3 className="review-title-text">{activeReview.title}</h3>
                <div className="review-stars-row" aria-label={`${activeReview.rating} star rating`}>
                  {'★'.repeat(activeReview.rating)}
                </div>
              </div>
            </div>

            <p className="review-quote-text">
              "{activeReview.paragraphs[0]}"
            </p>

            <div className="review-footer-row">
              <span className="reviewer-name-tag">{activeReview.reviewer}</span>
              <span className="review-number-tag">#{activeReview.number}</span>
            </div>
          </div>

          <div className="minimal-reviews-nav">
            <button className="minimal-nav-btn" onClick={handlePrev} aria-label="Previous review">
              &larr; PREV
            </button>
            <div className="minimal-dots-wrap">
              {REVIEWS_DATA.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`minimal-dot ${activeIndex === idx ? 'is-active' : ''}`}
                  onClick={() => {
                    setIsTransitioning(true);
                    setTrackIndex(idx);
                  }}
                />
              ))}
            </div>
            <button className="minimal-nav-btn" onClick={handleNext} aria-label="Next review">
              NEXT &rarr;
            </button>
          </div>

          {onNavigate && (
            <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
              <button 
                type="button"
                className="btn btn-secondary" 
                style={{ width: '100%', fontSize: '0.8rem', padding: '0.75rem 1rem' }}
                onClick={() => onNavigate('reviews')}
              >
                VIEW ALL REVIEWS &amp; EXPEDITION PHOTOS &rarr;
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TravelerStories;
