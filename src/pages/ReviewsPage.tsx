import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { TravelCollage } from '../components/TravelCollage/TravelCollage';
import { scrollToSection } from '../utils/scrollUtils';
import './ReviewsPage.css';

interface ReviewsPageProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  onOpenBookModal?: (title?: string, planDuration?: string, price?: string) => void;
}

interface GalleryThumb {
  id: string;
  url: string;
  alt: string;
  caption?: string;
  objectPosition?: string;
}

interface CarouselStory {
  id: string;
  counter: string;
  progressPercent: number;
  image: string;
  alt: string;
  quote: string;
  reviewer: string;
  location: string;
  date: string;
  avatar: string;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain';
  objectPosition?: string;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ onNavigate, onOpenBookModal }) => {
  // Section 1: Auto-sliding Featured Gallery Photos (3-second timer, pause on interaction, resume)
  const featuredSlides: GalleryThumb[] = [
    {
      id: 'slide-1',
      url: '/r1.webp',
      alt: 'Three backpacker friends smiling by Pangong Lake in Ladakh',
      caption: 'Pangong Lake · Ladakh',
      objectPosition: 'center 42%'
    },
    {
      id: 'slide-2',
      url: '/r3.webp',
      alt: 'Traveler group and motorcycle posing in front of Gonbo Rangjon mountain in Zanskar Ladakh',
      caption: 'Gonbo Rangjon · Zanskar',
      objectPosition: 'center 52%'
    },
    {
      id: 'slide-3',
      url: '/r4.webp',
      alt: 'Backpacker group standing on mountain pass road overlooking dramatic high-altitude peaks',
      caption: 'Himalayan Pass · North India',
      objectPosition: 'center 68%'
    }
  ];

  const [currentSlideIdx, setCurrentSlideIdx] = useState<number>(0);
  const [isSlidePaused, setIsSlidePaused] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  const handleNextFeaturedSlide = useCallback(() => {
    setCurrentSlideIdx((prev) => (prev + 1) % featuredSlides.length);
  }, [featuredSlides.length]);

  const handlePrevFeaturedSlide = useCallback(() => {
    setCurrentSlideIdx((prev) => (prev - 1 + featuredSlides.length) % featuredSlides.length);
  }, [featuredSlides.length]);

  const handleUserInteraction = () => {
    setIsSlidePaused(true);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      setIsSlidePaused(false);
    }, 3500);
  };

  const handleGoToSlide = (index: number) => {
    setCurrentSlideIdx(index);
    handleUserInteraction();
  };

  // Auto-slide every 3 seconds (3000ms), pauses upon user interaction, resumes afterwards
  useEffect(() => {
    if (isSlidePaused) {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
      return;
    }
    autoPlayTimerRef.current = setInterval(() => {
      handleNextFeaturedSlide();
    }, 3000);

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isSlidePaused, handleNextFeaturedSlide]);

  const handleSlideTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    handleUserInteraction();
  };

  const handleSlideTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const diff = touchStartXRef.current - e.changedTouches[0].clientX;
    if (diff > 40) {
      handleNextFeaturedSlide();
    } else if (diff < -40) {
      handlePrevFeaturedSlide();
    }
    touchStartXRef.current = null;
  };

  // Section 3: Interactive Carousel Stories (4 authentic stories matching 4 images)
  const carouselStories: CarouselStory[] = [
    {
      id: 'story-01',
      counter: '01 / 04',
      progressPercent: 25,
      image: '/r2.webp',
      alt: 'Two backpacker friends looking down into the camera under clear blue sky',
      quote: '“Ooty was everything I imagined and more. The cool weather, beautiful roads and amazing company made it unforgettable.”',
      reviewer: 'Sneha P.',
      location: 'Ooty, Tamil Nadu',
      date: 'Jan 2025',
      avatar: '/reviewer_sarah.webp',
      aspectRatio: '3 / 4',
      objectFit: 'contain',
      objectPosition: 'center center'
    },
    {
      id: 'story-02',
      counter: '02 / 04',
      progressPercent: 50,
      image: '/r6.webp',
      alt: 'Ancient Buddhist cliffside monastery nestled against towering Himalayan mountain peaks',
      quote: '“Seeing this ancient monastery clinging to the mountain cliffs at sunrise was utterly spiritual and unforgettable.”',
      reviewer: 'Arjun & Pooja Mehta',
      location: 'Spiti Valley, Himachal',
      date: 'Sep 2025',
      avatar: '/reviewer_robert.webp',
      aspectRatio: '3 / 4',
      objectFit: 'contain',
      objectPosition: 'center center'
    },
    {
      id: 'story-03',
      counter: '03 / 04',
      progressPercent: 75,
      image: '/r7.webp',
      alt: 'Royal Enfield motorcycle and helmet parked above Pangong Lake in Ladakh overlooking azure waters',
      quote: '“Reaching Pangong Lake on my motorcycle and taking in this endless blue view was pure magic. An unforgettable Himalayan journey.”',
      reviewer: 'David Lindqvist',
      location: 'Pangong Lake, Ladakh',
      date: 'Jun 2025',
      avatar: '/reviewer_marco.webp',
      aspectRatio: '3 / 4',
      objectFit: 'cover',
      objectPosition: 'center 62%'
    },
    {
      id: 'story-04',
      counter: '04 / 04',
      progressPercent: 100,
      image: '/r5.webp',
      alt: 'Motorcycle convoy riding on scenic winding mountain road under vast rocky cliffs and blue skies',
      quote: '“Riding along winding mountain canyons with the group was an absolute rush. Every curve opened up a view grander than the last.”',
      reviewer: 'Vikram & Kabir',
      location: 'Ladakh, Himalayas',
      date: 'Mar 2025',
      avatar: '/reviewer_robert.webp',
      aspectRatio: '3 / 4',
      objectFit: 'contain',
      objectPosition: 'center center'
    }
  ];

  const [activeStoryIdx, setActiveStoryIdx] = useState<number>(0);
  const [isStoryFading, setIsStoryFading] = useState<boolean>(false);

  const handlePrevStory = () => {
    setIsStoryFading(true);
    setTimeout(() => {
      setActiveStoryIdx((prev) => (prev > 0 ? prev - 1 : carouselStories.length - 1));
      setIsStoryFading(false);
    }, 150);
  };

  const handleNextStory = () => {
    setIsStoryFading(true);
    setTimeout(() => {
      setActiveStoryIdx((prev) => (prev < carouselStories.length - 1 ? prev + 1 : 0));
      setIsStoryFading(false);
    }, 150);
  };

  const currentStory = carouselStories[activeStoryIdx] || carouselStories[0];

  const handleScrollToFirstSection = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToSection('travel-collage-section', 20);
  };



  return (
    <div className="reviews-page-root">
      {/* Existing Backpackers Header - starts transparent over full-bleed hero, transitions on scroll */}
      <Header onNavigate={onNavigate} onOpenBookModal={onOpenBookModal} currentRoute="reviews" />

      <main id="main-content" className="reviews-page-content">
        
        {/* ==================================================================
            HERO SECTION (Preserved as requested: "leave the hero section as same")
            Full-bleed travel photograph extending edge-to-edge behind the header
            ================================================================== */}
        <section className="reviews-hero-fullbleed" aria-label="Backpackers Reviews Hero">
          <div className="reviews-hero-bg-wrap">
            <img
              src="/r.webp"
              alt="Motorcycle rider waving on scenic mountain highway"
              className="reviews-hero-bg-img"
              loading="eager"
              decoding="async"
            />
            <div className="reviews-hero-scrim" />
          </div>

          <div className="reviews-hero-inner">
            {/* Upper-Middle Editorial Block */}
            <div className="reviews-hero-center-block">
              <h1 className="reviews-hero-headline">REVIEWS</h1>
              <p className="reviews-hero-subtext">
                Real experiences. Unfiltered moments. Here's what our travelers have to say about their adventures with Backpackers.
              </p>
            </div>

            {/* Bottom Indicators & Minimal Scroll Cue */}
            <div className="reviews-hero-bottom-bar">
              <a
                href="#travel-collage-section"
                className="reviews-hero-scroll-btn"
                onClick={handleScrollToFirstSection}
                aria-label="Scroll to explore collage & reviews"
              >
                <div className="hero-mouse-pill" aria-hidden="true">
                  <div className="hero-mouse-wheel" />
                </div>
                <span className="reviews-hero-scroll-text">Scroll to explore</span>
              </a>

            </div>
          </div>
        </section>

        {/* ==================================================================
            BACKPACKERS — IMMERSIVE TRAVEL COLLAGE SECTION
            Editorial-style collage surrounding central warm-white panel (Desktop)
            + Touch-enabled swipeable multi-layout carousel (Mobile)
            ================================================================== */}
        <TravelCollage onNavigate={onNavigate} onOpenBookModal={onOpenBookModal} />

        {/* ==================================================================
            WARM IVORY CANVAS (#FAF8F5) FOR ALL REMAINING REVIEWS
            ================================================================== */}
        <div className="reviews-editorial-stream">

          {/* ----------------------------------------------------------------
              SECTION 1: FEATURED GALLERY (Rahul K. / Munnar, Kerala)
              Matches Reference:
              - Large 16:9 landscape image with rounded corners
              - Refined serif quote with double-quote icon
              - Reviewer profile with mountain skyline divider line
              - 5 rounded photo thumbnails with active dark border
              ---------------------------------------------------------------- */}
          <section
            id="review-featured-section"
            className="review-editorial-card-block"
            aria-label="Featured Review: Rahul K. in Munnar"
          >
            <div className="editorial-container">
              <div className="featured-gallery-card">

                {/* 1. Auto-sliding Travel Photo Carousel (Slides every 3s, pauses on interaction, resumes afterwards) */}
                <div 
                  className="featured-slider-container"
                  onMouseEnter={() => setIsSlidePaused(true)}
                  onMouseLeave={() => setIsSlidePaused(false)}
                  onTouchStart={handleSlideTouchStart}
                  onTouchEnd={handleSlideTouchEnd}
                  aria-roledescription="carousel"
                  aria-label="Featured Travel Experience Gallery"
                >
                  <div 
                    className="featured-slider-track"
                    style={{ transform: `translateX(-${currentSlideIdx * 100}%)` }}
                  >
                    {featuredSlides.map((slide, idx) => (
                      <div
                        key={slide.id}
                        className="featured-slider-slide"
                        role="group"
                        aria-roledescription="slide"
                        aria-label={`Slide ${idx + 1} of ${featuredSlides.length}`}
                      >
                        <img
                          src={slide.url}
                          alt={slide.alt}
                          className="featured-slide-img"
                          style={{ objectPosition: slide.objectPosition || 'center center' }}
                          loading={idx === 0 ? 'eager' : 'lazy'}
                        />
                        {slide.caption && (
                          <span className="featured-slide-tag">{slide.caption}</span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Left & Right Arrow Controls */}
                  <button 
                    type="button" 
                    className="slider-arrow-btn prev"
                    onClick={() => { handlePrevFeaturedSlide(); handleUserInteraction(); }}
                    aria-label="Previous slide"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button 
                    type="button" 
                    className="slider-arrow-btn next"
                    onClick={() => { handleNextFeaturedSlide(); handleUserInteraction(); }}
                    aria-label="Next slide"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>

                  {/* Slide Indicators / Dots */}
                  <div className="slider-dots-bar" role="tablist" aria-label="Slide indicators">
                    {featuredSlides.map((slide, idx) => (
                      <button
                        key={slide.id}
                        type="button"
                        role="tab"
                        aria-selected={idx === currentSlideIdx}
                        aria-label={`Go to slide ${idx + 1}: ${slide.caption || ''}`}
                        className={`slider-dot-btn ${idx === currentSlideIdx ? 'is-active' : ''}`}
                        onClick={() => handleGoToSlide(idx)}
                      />
                    ))}
                  </div>
                </div>

                {/* 2. Review Quote with Double Quotation Mark */}
                <div className="featured-quote-container">
                  <div className="quote-mark-icon" aria-hidden="true">
                    <svg width="22" height="18" viewBox="0 0 22 18" fill="currentColor">
                      <path d="M0 18V10.8C0 4.8 3.6 0 9 0V3.6C6 3.6 4.2 6 3.6 10.8H9V18H0ZM13 18V10.8C13 4.8 16.6 0 22 0V3.6C19 3.6 17.2 6 16.6 10.8H22V18H13Z" />
                    </svg>
                  </div>
                  <p className="featured-quote-text">
                    The views, the people, and the memories made this trip something special. Can’t wait for the next one.
                  </p>
                </div>

                {/* 3. Reviewer Profile & Mountain Skyline Divider */}
                <div className="reviewer-skyline-row">
                  <div className="reviewer-profile-left">
                    <img
                      src="/reviewer_marco.webp"
                      alt="Rahul K."
                      className="reviewer-circle-img"
                      loading="lazy"
                    />
                    <div className="reviewer-details-col">
                      <span className="reviewer-name-label">Rahul K.</span>
                      <span className="reviewer-meta-label">Munnar, Kerala &nbsp;·&nbsp; Apr 2025</span>
                    </div>
                  </div>

                  {/* Mountain Skyline Line Art Divider */}
                  <div className="skyline-divider-wrap" aria-hidden="true">
                    <span className="skyline-line-left" />
                    <svg
                      className="skyline-mountain-svg"
                      viewBox="0 0 76 22"
                      fill="none"
                      stroke="#B3ACA2"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M0 18 L16 18 L27 5 L35 15 L45 2 L56 18 L76 18" />
                    </svg>
                    <span className="skyline-line-right" />
                  </div>
                </div>

              </div>
            </div>
          </section>



          {/* ----------------------------------------------------------------
              SECTION 3: SPLIT STORY WITH TOPOGRAPHIC CONTOURS & CAROUSEL
              Matches Reference:
              - Topographic contour map lines in background
              - Paper airplane line-art doodle in top left
              - Left: 4 friends sitting with arms over shoulders overlooking misty valley
              - Right: Serif quote ("Ooty was everything I imagined and more...")
              - Reviewer profile (Sneha P., Ooty, Tamil Nadu · Jan 2025)
              - Bottom bar: "03 / 05" progress bar + [ ← ] [ → ] navigation buttons
              ---------------------------------------------------------------- */}
          <section
            className="split-story-topographic-section"
            aria-label="Story 03: Sneha P. in Ooty"
          >
            <div className="editorial-container">
              <div className="split-story-card-wrapper">
                
                {/* Paper Airplane Line Art Doodle */}
                <div className="paper-plane-doodle" aria-hidden="true">
                  <svg
                    viewBox="0 0 54 54"
                    width="44"
                    height="44"
                    fill="none"
                    stroke="#948D82"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 26 L46 10 L30 46 L24 30 L8 26 Z" />
                    <line x1="24" y1="30" x2="46" y2="10" />
                    <path d="M16 28 C12 34, 10 38, 4 44" strokeDasharray="3 3" />
                  </svg>
                </div>

                {/* Subtle Topographic Contour Waves in Background */}
                <svg
                  className="topographic-contours-svg"
                  viewBox="0 0 400 300"
                  fill="none"
                  stroke="#E8E2D8"
                  strokeWidth="1.2"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path d="M 0 280 C 120 270, 240 240, 400 290" />
                  <path d="M 50 300 C 160 250, 280 220, 400 260" />
                  <path d="M 120 300 C 200 240, 310 200, 400 230" />
                  <path d="M 190 300 C 260 230, 340 180, 400 200" />
                  <path d="M 270 300 C 320 220, 370 160, 400 170" />
                </svg>

                {/* Two-Column Split Layout */}
                <div className="split-story-grid">
                  
                  {/* Left Column: Photograph */}
                  <div
                    className="split-story-photo-col"
                    style={{
                      aspectRatio: currentStory.aspectRatio || '16 / 11'
                    }}
                  >
                    {currentStory.objectFit === 'contain' && (
                      <img
                        src={currentStory.image}
                        alt=""
                        className="split-story-backdrop-blur"
                        aria-hidden="true"
                        decoding="async"
                      />
                    )}
                    <img
                      src={currentStory.image}
                      alt={currentStory.alt}
                      className={`split-story-featured-img ${currentStory.objectFit === 'contain' ? 'fit-contain' : ''} ${isStoryFading ? 'is-fading' : ''}`}
                      style={{
                        objectPosition: currentStory.objectPosition || 'center center'
                      }}
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  {/* Right Column: Serif Quote & Reviewer Profile */}
                  <div className="split-story-text-col">
                    <div className="split-story-quote-wrap">
                      <p className={`split-story-quote ${isStoryFading ? 'is-fading' : ''}`}>
                        {currentStory.quote}
                      </p>
                    </div>

                    <div className="split-story-reviewer-row">
                      <img
                        src={currentStory.avatar}
                        alt={currentStory.reviewer}
                        className="reviewer-circle-img"
                        loading="lazy"
                        decoding="async"
                      />
                      <div className="reviewer-details-col">
                        <span className="reviewer-name-label">{currentStory.reviewer}</span>
                        <span className="reviewer-meta-label">
                          {currentStory.location} &nbsp;·&nbsp; {currentStory.date}
                        </span>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Bar: Progress Indicator + [ ← ] [ → ] Navigation Arrows */}
                <div className="split-story-bottom-nav">
                  <div className="split-story-counter-group">
                    <span className="split-story-counter-num">
                      {String(activeStoryIdx + 1).padStart(2, '0')} / {String(carouselStories.length).padStart(2, '0')}
                    </span>
                    <div className="split-story-progress-track">
                      <div
                        className="split-story-progress-fill"
                        style={{ width: `${((activeStoryIdx + 1) / carouselStories.length) * 100}%` }}
                      />
                    </div>
                  </div>

                  <div className="split-story-arrow-controls">
                    <button
                      type="button"
                      className="carousel-circle-arrow-btn"
                      onClick={handlePrevStory}
                      aria-label="Previous traveler story"
                      title="Previous story"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="19" y1="12" x2="5" y2="12" />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                    </button>

                    <button
                      type="button"
                      className="carousel-circle-arrow-btn"
                      onClick={handleNextStory}
                      aria-label="Next traveler story"
                      title="Next story"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </section>

        </div>
      </main>

      {/* Backpackers Standard Site Footer */}
      <Footer />
    </div>
  );
};

export default ReviewsPage;
