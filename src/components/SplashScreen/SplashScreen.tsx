import React, { useState, useEffect, useRef } from 'react';
import { MotorcycleSVG } from './MotorcycleSVG';
import { LAUNCH_CONFIG } from '../../config/launchConfig';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete?: (wasLiveLaunch?: boolean) => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState<number>(0);
  const [isAccelerating, setIsAccelerating] = useState<boolean>(false);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const [isCountdownMode, setIsCountdownMode] = useState<boolean>(false);
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    totalMs: 0
  });

  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const countdownIntervalRef = useRef<number | null>(null);

  // Complete journey, accelerate motorcycle, and smoothly reveal the live website
  const finishAndReveal = (skipAnimation = false, wasLiveLaunch = false) => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    if (wasLiveLaunch) {
      // One-time launch completed: permanently mark as launched so timer never runs again
      localStorage.setItem('bd_site_has_launched', 'true');
    }

    if (skipAnimation) {
      setIsHidden(true);
      sessionStorage.setItem('bd_splash_seen', 'true');
      if (onComplete) onComplete(wasLiveLaunch);
      return;
    }

    setProgress(100);
    setIsAccelerating(true);

    const exitTimeout = setTimeout(() => {
      setIsExiting(true);
    }, 380);

    const completeTimeout = setTimeout(() => {
      setIsHidden(true);
      sessionStorage.setItem('bd_splash_seen', 'true');
      if (onComplete) onComplete(wasLiveLaunch);
    }, 720);

    return () => {
      clearTimeout(exitTimeout);
      clearTimeout(completeTimeout);
    };
  };

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsHidden(true);
      if (onComplete) onComplete(false);
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const forceSplash = urlParams.has('splash') || urlParams.has('test');
    const bypassLaunch = urlParams.has('bypass') || urlParams.has('preview') || urlParams.has('celebrate');

    // Admin option to reset launch state for testing: ?resetLaunch
    if (urlParams.has('resetLaunch')) {
      localStorage.removeItem('bd_site_has_launched');
    }

    // Check if the site has already executed its one-time launch
    const hasAlreadyLaunched = localStorage.getItem('bd_site_has_launched') === 'true';

    // If bypassing or testing celebrate directly, dismiss splash immediately
    if (urlParams.has('celebrate')) {
      setIsHidden(true);
      if (onComplete) onComplete(true);
      return;
    }

    // 1. Resolve target launch timestamp
    let targetTimestamp = new Date(LAUNCH_CONFIG.targetDate).getTime();
    if (urlParams.has('launch')) {
      const customTime = new Date(urlParams.get('launch')!).getTime();
      if (!isNaN(customTime)) targetTimestamp = customTime;
    } else if (urlParams.has('launchIn')) {
      const seconds = parseInt(urlParams.get('launchIn')!, 10);
      if (!isNaN(seconds) && seconds > 0) {
        targetTimestamp = Date.now() + seconds * 1000;
      }
    }

    const now = Date.now();
    const hasPassedLaunchTime = now >= targetTimestamp;

    // Once target launch time has passed, permanently mark site as launched
    if (hasPassedLaunchTime && !hasAlreadyLaunched) {
      localStorage.setItem('bd_site_has_launched', 'true');
    }

    // 2. Resolve starting timestamp for journey progress calculation
    let startTimestamp = LAUNCH_CONFIG.startDate 
      ? new Date(LAUNCH_CONFIG.startDate).getTime()
      : targetTimestamp - (5 * 60 * 1000);

    // STRICT ONE-TIME LAUNCH GUARANTEE:
    // The countdown timer runs ONLY ONCE until the designated launch moment.
    // It will NEVER run again if:
    // 1. isEnabled is false
    // 2. Site has already launched (bd_site_has_launched in localStorage)
    // 3. Current time is past the target launch timestamp
    // 4. Bypassed via URL
    const isLaunchPending = 
      LAUNCH_CONFIG.isEnabled && 
      !hasAlreadyLaunched && 
      !hasPassedLaunchTime && 
      !bypassLaunch;

    if (isLaunchPending) {
      // ====================================================================
      // PRE-LAUNCH COUNTDOWN MODE (Lock screen until target time)
      // ====================================================================
      setIsCountdownMode(true);

      const updateCountdown = () => {
        const currentNow = Date.now();
        const diff = Math.max(0, targetTimestamp - currentNow);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeRemaining({
          days,
          hours,
          minutes,
          seconds,
          totalMs: diff
        });

        // Compute motorcycle position along the road based on elapsed time
        const totalSpan = Math.max(1000, targetTimestamp - startTimestamp);
        const elapsed = Math.max(0, currentNow - startTimestamp);
        const rawProgress = (elapsed / totalSpan) * 100;
        const currentProgress = Math.min(100, Math.max(0, rawProgress));
        setProgress(currentProgress);

        // When timer hits 0: Immediately launch and open website with celebration!
        if (diff <= 0) {
          finishAndReveal(false, true);
        }
      };

      updateCountdown();
      countdownIntervalRef.current = window.setInterval(updateCountdown, 1000);
    } else {
      // ====================================================================
      // STANDARD SPLASH MODE (Post-launch or quick visitor intro)
      // ====================================================================
      setIsCountdownMode(false);
      localStorage.setItem('bd_site_has_launched', 'true');

      const hasSeenSplash = sessionStorage.getItem('bd_splash_seen');
      if (hasSeenSplash && !forceSplash) {
        setIsHidden(true);
        if (onComplete) onComplete(false);
        return;
      }

      // Snappy, cinematic journey duration: 1300ms for 0 -> 100%
      const JOURNEY_DURATION = 1300;

      const animateProgress = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;
        const elapsed = timestamp - startTimeRef.current;
        const rawT = Math.min(elapsed / JOURNEY_DURATION, 1);

        const easedT = rawT < 0.5 
          ? 2 * rawT * rawT 
          : 1 - Math.pow(-2 * rawT + 2, 2) / 2;

        const currentProgress = Math.min(Math.round(easedT * 100), 100);
        setProgress(currentProgress);

        if (rawT < 1) {
          animationFrameRef.current = requestAnimationFrame(animateProgress);
        } else {
          finishAndReveal(false, false);
        }
      };

      animationFrameRef.current = requestAnimationFrame(animateProgress);
    }

    // Keyboard shortcut to skip / preview (Esc or Space)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Escape' || e.code === 'Space') {
        finishAndReveal(true, false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  if (isHidden) return null;

  return (
    <div 
      className={`splash-screen ${isExiting ? 'is-exiting' : ''} ${isCountdownMode ? 'is-countdown-active' : ''}`} 
      role="presentation" 
      aria-hidden="true"
    >
      <div className="splash-stage">
        
        {/* Centered Backpackers Official Circular Brand Logo Container */}
        <div className="splash-logo-core">
          <div className="splash-logo-circle-frame">
            <img 
              src="/logof.webp" 
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
            OFFICIAL LAUNCH COUNTDOWN DASHBOARD
            ==================================================================== */}
        {isCountdownMode && (
          <div className="splash-countdown-card">
            <h2 className="splash-countdown-heading">{LAUNCH_CONFIG.title}</h2>
            <p className="splash-countdown-announcement">{LAUNCH_CONFIG.announcement}</p>

            <div className="splash-countdown-grid">
              {timeRemaining.days > 0 && (
                <div className="countdown-unit-box">
                  <span className="countdown-unit-val">{String(timeRemaining.days).padStart(2, '0')}</span>
                  <span className="countdown-unit-lbl">DAYS</span>
                </div>
              )}
              <div className="countdown-unit-box">
                <span className="countdown-unit-val">{String(timeRemaining.hours).padStart(2, '0')}</span>
                <span className="countdown-unit-lbl">HOURS</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-unit-box">
                <span className="countdown-unit-val">{String(timeRemaining.minutes).padStart(2, '0')}</span>
                <span className="countdown-unit-lbl">MINUTES</span>
              </div>
              <span className="countdown-separator">:</span>
              <div className="countdown-unit-box">
                <span className="countdown-unit-val">{String(timeRemaining.seconds).padStart(2, '0')}</span>
                <span className="countdown-unit-lbl">SECONDS</span>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            MOTORCYCLE JOURNEY LOADING TRACK (Bike moves with countdown timer)
            ==================================================================== */}
        <div className="splash-journey-wrapper">
          
          {/* Centered Travel Track Canvas */}
          <div className="splash-journey-track-area">
            
            {/* The Royal Enfield Motorcycle Container */}
            <div 
              className={`splash-bike-wrapper ${isAccelerating ? 'is-accelerating' : ''}`}
              style={{
                left: `${progress}%`,
                transform: `translateX(-${progress}%)`,
                transition: isAccelerating 
                  ? undefined 
                  : isCountdownMode 
                    ? 'left 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' 
                    : undefined
              }}
            >
              {/* Dust particles billowing behind rear wheel */}
              <div className={`splash-dust-container ${progress > 1 ? 'is-active' : ''}`}>
                <span className="dust-particle p1"></span>
                <span className="dust-particle p2"></span>
                <span className="dust-particle p3"></span>
                <span className="dust-particle p4"></span>
                <span className="dust-particle p5"></span>
              </div>

              {/* Realistic Side-Profile Royal Enfield Adventure Motorcycle */}
              <MotorcycleSVG isMoving={true} className="splash-enfield-bike" />
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
