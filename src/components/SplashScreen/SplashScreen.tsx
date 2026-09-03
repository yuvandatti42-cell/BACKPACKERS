import React, { useState, useEffect, useRef } from 'react';
import { MotorcycleSVG } from './MotorcycleSVG';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete?: () => void;
}



export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isAccelerating, setIsAccelerating] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsHidden(true);
      if (onComplete) onComplete();
      return;
    }

    // Check query params to allow force-testing splash (?splash or ?reload)
    const urlParams = new URLSearchParams(window.location.search);
    const forceSplash = urlParams.has('splash') || urlParams.has('test');

    // Check session storage if not forcing
    const hasSeenSplash = sessionStorage.getItem('bd_splash_seen');
    if (hasSeenSplash && !forceSplash) {
      // In development or normal browsing, if user explicitly refreshes with F5 or Cmd+R,
      // performance navigation check allows showing it, or allow session-based skip
      const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const isReload = navEntry?.type === 'reload';
      if (!isReload) {
        setIsHidden(true);
        if (onComplete) onComplete();
        return;
      }
    }

    // Target journey duration: 2400ms for 0 -> 100%
    const JOURNEY_DURATION = 2400;

    const animateProgress = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const rawT = Math.min(elapsed / JOURNEY_DURATION, 1);

      // Smooth custom easing curve (starts smooth, steady cruise, gentle settle at 100%)
      // EaseInOutQuad
      const easedT = rawT < 0.5 
        ? 2 * rawT * rawT 
        : 1 - Math.pow(-2 * rawT + 2, 2) / 2;

      const currentProgress = Math.min(Math.round(easedT * 100), 100);
      setProgress(currentProgress);

      if (rawT < 1) {
        animationFrameRef.current = requestAnimationFrame(animateProgress);
      } else {
        // Reached 100%!
        setProgress(100);
        
        // 1. Motorcycle glides forward and disappears slowly after passing the loading bar
        setIsAccelerating(true);

        // 2. Loading screen begins smooth fade-out as the bike fades away
        const exitTimeout = setTimeout(() => {
          setIsExiting(true);
        }, 650);

        // 3. Complete and reveal homepage
        const completeTimeout = setTimeout(() => {
          setIsHidden(true);
          sessionStorage.setItem('bd_splash_seen', 'true');
          if (onComplete) onComplete();
        }, 1250);

        return () => {
          clearTimeout(exitTimeout);
          clearTimeout(completeTimeout);
        };
      }
    };

    animationFrameRef.current = requestAnimationFrame(animateProgress);

    // Keyboard shortcut to skip loading (Esc or Space)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.code === 'Space') {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        setProgress(100);
        setIsAccelerating(true);
        setIsExiting(true);
        setTimeout(() => {
          setIsHidden(true);
          sessionStorage.setItem('bd_splash_seen', 'true');
          if (onComplete) onComplete();
        }, 400);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  if (isHidden) return null;



  return (
    <div 
      className={`splash-screen ${isExiting ? 'is-exiting' : ''}`} 
      role="presentation" 
      aria-hidden="true"
    >
      <div className="splash-stage">
        
        {/* Centered Backpackers Official Circular Brand Logo Container */}
        <div className="splash-logo-core">
          <div className="splash-logo-circle-frame">
            <img 
              src="/logo.jpg" 
              alt="Backpackers Destinations Official Logo" 
              className="splash-logo-img" 
            />
          </div>
        </div>

        {/* Brand Metadata & Editorial Header */}
        <div className="splash-brand-meta">
          <div className="splash-brand-title-wrap">
            <span className="splash-brand-title">BACKPACKERS</span>
            <span className="splash-brand-sub">DESTINATIONS</span>
          </div>
          <span className="splash-meta-tag">EXPEDITIONS • ROUTES • OVERLAND</span>
        </div>

        {/* ====================================================================
            MINIMALIST MOTORCYCLE JOURNEY LOADING TRACK (CENTERED, NO TEXTS)
            ==================================================================== */}
        <div className="splash-journey-wrapper">
          
          {/* Centered Travel Track Canvas */}
          <div className="splash-journey-track-area">
            
            {/* The Royal Enfield Motorcycle Container */}
            <div 
              className={`splash-bike-wrapper ${isAccelerating ? 'is-accelerating' : ''}`}
              style={{
                // Position directly controlled by progress: 0% at far left, 100% at far right
                left: `${progress}%`,
                transform: `translateX(-${progress}%)`,
              }}
            >
              {/* Dust particles billowing behind rear wheel */}
              <div className={`splash-dust-container ${progress > 2 ? 'is-active' : ''}`}>
                <span className="dust-particle p1"></span>
                <span className="dust-particle p2"></span>
                <span className="dust-particle p3"></span>
                <span className="dust-particle p4"></span>
                <span className="dust-particle p5"></span>
              </div>

              {/* Realistic Side-Profile Royal Enfield Adventure Motorcycle */}
              <MotorcycleSVG isMoving={progress > 0 && progress < 100} className="splash-enfield-bike" />
            </div>

            {/* Road Surface & Journey Track Line */}
            <div className="splash-road-track">
              {/* Base Road Bed */}
              <div className="splash-road-base"></div>
              
              {/* Subtle Road Center Dash Markings */}
              <div className="splash-road-markings"></div>

              {/* Dynamic Completed Journey Route Line (Synchronized with bike) */}
              <div 
                className="splash-road-completed"
                style={{ width: `${progress}%` }}
              >
                {/* Glowing Leading Head at the bike's rear contact */}
                <div className="splash-road-head"></div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
