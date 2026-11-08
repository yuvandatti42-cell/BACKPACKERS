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
  const [isLaunchReady, setIsLaunchReady] = useState<boolean>(false);
  const [isLaunching, setIsLaunching] = useState<boolean>(false);
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
  const launchReadyRef = useRef<boolean>(false);
  const launchingRef = useRef<boolean>(false);

  // Keep refs in sync for reliable event callbacks
  useEffect(() => {
    launchReadyRef.current = isLaunchReady;
  }, [isLaunchReady]);

  useEffect(() => {
    launchingRef.current = isLaunching;
  }, [isLaunching]);

  // Complete journey, accelerate motorcycle, and smoothly reveal the live website
  const finishAndReveal = (skipAnimation = false, wasLiveLaunch = false) => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    if (wasLiveLaunch) {
      // One-time launch completed: permanently mark as launched so timer never runs again
      localStorage.setItem('bd_site_has_launched', 'true');
      localStorage.setItem('bd_site_has_launched_target', LAUNCH_CONFIG.targetDate);
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

  // When user taps on the overland "TAP TO LAUNCH" button
  const handleLaunchWebsite = () => {
    if (launchingRef.current) return;
    setIsLaunching(true);

    // Accelerate the bike & rev engine before smoothly revealing the live website
    setTimeout(() => {
      finishAndReveal(false, true);
    }, 480);
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
    const forceLaunchReady = urlParams.has('ready') || urlParams.has('launchReady') || urlParams.has('gift');

    // Admin option to reset launch state for testing: ?resetLaunch
    if (urlParams.has('resetLaunch')) {
      localStorage.removeItem('bd_site_has_launched');
      localStorage.removeItem('bd_site_has_launched_target');
      sessionStorage.removeItem('bd_splash_seen');
    }

    // Direct Launch Ready preview mode (?ready or ?launchReady or ?gift)
    if (forceLaunchReady) {
      setIsCountdownMode(false);
      setIsLaunchReady(true);
      return;
    }

    // Check if the site has already executed its one-time launch for this target date
    const hasAlreadyLaunched = 
      localStorage.getItem('bd_site_has_launched_target') === LAUNCH_CONFIG.targetDate;

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
      localStorage.setItem('bd_site_has_launched_target', LAUNCH_CONFIG.targetDate);
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

        // When timer hits 0: Stop countdown, hide timer, and show overland launch button & bike!
        if (diff <= 0) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          setIsCountdownMode(false);
          setIsLaunchReady(true);
          setProgress(100);
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
      localStorage.setItem('bd_site_has_launched_target', LAUNCH_CONFIG.targetDate);

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
        if (launchReadyRef.current) {
          handleLaunchWebsite();
        } else {
          finishAndReveal(true, false);
        }
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
      className={`splash-screen ${isExiting ? 'is-exiting' : ''} ${isCountdownMode ? 'is-countdown-active' : ''} ${isLaunchReady ? 'is-launch-ready-active' : ''}`} 
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
            OFFICIAL LAUNCH COUNTDOWN DASHBOARD (Active until timer hits 0)
            ==================================================================== */}
        {isCountdownMode && !isLaunchReady && (
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
            VINTAGE ROADSTER LAUNCH SCENE
            Features:
            1. Classic Roadster Bike in SIDE PROFILE sitting BEHIND the box
               (front wheel, headlight, handlebars, tank, seat, and rear wheel visible)
            2. Compact Rusty Metal Framed Box with 4 corner rivets (Main Focus)
            3. Classical Vintage Roadster Starter Button
            4. Biker Gear (Vintage Helmet, Gloves, Tool Roll, Canteen) on the floor in front of the box
            ==================================================================== */}
        {isLaunchReady && (
          <div className={`splash-roadster-launch-stage ${isLaunching ? 'is-launching' : ''}`}>
            
            {/* 1. AUTHENTIC ROYAL ENFIELD ADVENTURE MOTORCYCLE (100% VISIBLE ORIGINAL SHOWCASE) */}
            <div className="roadster-bike-showcase" aria-hidden="true">
              <MotorcycleSVG isMoving={isLaunching} className="launch-stage-enfield-bike" />
              {/* Crisp Ground / Horizon Line */}
              <div className="roadster-ground-track" aria-hidden="true"></div>
            </div>

            {/* 2. COMPACT RUSTY METAL STARTER PANEL FLANKED BY FLOOR GEAR */}
            <div className="vintage-starter-floor-row">
              {/* Left Floor: Vintage 3/4 Helmet & Leather Riding Gloves */}
              <div className="floor-gear-item floor-gear-left" aria-hidden="true">
                <svg className="floor-gear-left-svg" viewBox="0 0 140 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="65" cy="76" rx="60" ry="6" fill="rgba(0,0,0,0.25)" />
                  <g className="gear-gloves">
                    <path d="M12 68 C15 62, 28 62, 36 65 C42 67, 46 72, 44 75 C41 78, 22 79, 14 76 Z" fill="#44281D" stroke="#2B1810" strokeWidth="1.5" />
                    <path d="M16 66 L22 74 M24 66 L29 74" stroke="#7A4E38" strokeWidth="1" strokeLinecap="round" />
                    <path d="M26 64 C32 58, 48 59, 54 63 C58 66, 58 72, 54 75 C48 78, 32 77, 26 73 Z" fill="#5A3525" stroke="#2B1810" strokeWidth="1.5" />
                    <rect x="42" y="65" width="8" height="3" rx="1" fill="#D99B26" />
                  </g>
                  <g className="gear-helmet">
                    <path d="M52 64 C48 42, 60 22, 85 20 C110 18, 128 34, 126 56 C125 68, 114 74, 98 75 C82 76, 56 75, 52 64 Z" fill="#1C1A18" stroke="#383430" strokeWidth="2" />
                    <path d="M72 21 C82 20, 94 20, 102 21 C98 55, 92 68, 88 75 C82 75, 78 68, 76 55 Z" fill="#C85A32" opacity="0.9" />
                    <path d="M84 20 L82 75" stroke="#FAF8F5" strokeWidth="1.2" strokeDasharray="3 3" opacity="0.8" />
                    <path d="M54 62 C58 66, 75 70, 88 71 C84 74, 60 74, 54 68 Z" fill="#6A422D" stroke="#3A2014" strokeWidth="1.2" />
                    <path d="M52 46 C68 44, 110 44, 126 44" stroke="#3D281D" strokeWidth="5" strokeLinecap="round" />
                    <path d="M52 46 C68 44, 110 44, 126 44" stroke="#8C5E43" strokeWidth="2" strokeLinecap="round" />
                    <ellipse cx="78" cy="45" rx="11" ry="9" fill="#1C1917" stroke="#D99B26" strokeWidth="2.5" />
                    <ellipse cx="78" cy="45" rx="8" ry="6.5" fill="#FEF3C7" fillOpacity="0.4" stroke="#B45309" strokeWidth="0.8" />
                    <path d="M74 42 Q80 42 84 46" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
                    <line x1="89" y1="45" x2="93" y2="45" stroke="#D99B26" strokeWidth="3" />
                    <ellipse cx="104" cy="44" rx="11" ry="9" fill="#1C1917" stroke="#D99B26" strokeWidth="2.5" />
                    <ellipse cx="104" cy="44" rx="8" ry="6.5" fill="#FEF3C7" fillOpacity="0.4" stroke="#B45309" strokeWidth="0.8" />
                    <path d="M100 41 Q106 41 110 45" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
                  </g>
                </svg>
              </div>

              {/* Compact Rusty Metal Framed Box (Main Focus - No Clutter Text) */}
              <div className="vintage-rusty-box">
                {/* 4 Corner Heavy Metal Rivets */}
                <span className="metal-rivet rivet-tl"></span>
                <span className="metal-rivet rivet-tr"></span>
                <span className="metal-rivet rivet-bl"></span>
                <span className="metal-rivet rivet-br"></span>

                {/* Classical Vintage Launch Button */}
                <button 
                  type="button" 
                  className="vintage-roadster-starter-btn"
                  onClick={handleLaunchWebsite}
                  disabled={isLaunching}
                  aria-label="Tap to start engine and launch Backpackers Destinations website"
                >
                  <div className="btn-starter-core">
                    <span className="btn-ignition-symbol">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                    </span>
                    <span className="btn-starter-text">
                      {isLaunching ? 'IGNITING ENGINE...' : 'TAP TO LAUNCH'}
                    </span>
                  </div>
                  <div className="btn-starter-indicator">
                    <span className="indicator-glow"></span>
                    <span className="indicator-label">PUSH TO START</span>
                  </div>
                </button>
              </div>

              {/* Right Floor: Leather Overland Tool Roll & Roadster Canteen */}
              <div className="floor-gear-item floor-gear-right" aria-hidden="true">
                <svg className="floor-gear-right-svg" viewBox="0 0 135 85" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <ellipse cx="70" cy="76" rx="55" ry="6" fill="rgba(0,0,0,0.25)" />
                  <g className="gear-tool-roll">
                    <rect x="25" y="55" width="75" height="18" rx="7" fill="#4B3322" stroke="#2B1B10" strokeWidth="1.5" />
                    <ellipse cx="28" cy="64" rx="6" ry="9" fill="#3D2617" stroke="#2B1B10" strokeWidth="1.2" />
                    <rect x="45" y="53" width="7" height="22" rx="2" fill="#2E1C12" />
                    <rect x="44" y="59" width="9" height="6" rx="1" stroke="#D99B26" strokeWidth="1.5" fill="none" />
                    <rect x="75" y="53" width="7" height="22" rx="2" fill="#2E1C12" />
                    <rect x="74" y="59" width="9" height="6" rx="1" stroke="#D99B26" strokeWidth="1.5" fill="none" />
                    <path d="M88 56 L104 50 M104 48 L108 52" stroke="#A8A29E" strokeWidth="2.2" strokeLinecap="round" />
                  </g>
                  <g className="gear-canteen">
                    <ellipse cx="102" cy="62" rx="16" ry="14" fill="#3A3632" stroke="#A8A29E" strokeWidth="2" />
                    <ellipse cx="100" cy="60" rx="12" ry="10" stroke="#78716C" strokeWidth="1" strokeDasharray="3 2" fill="none" />
                    <path d="M88 62 C96 66, 108 66, 116 62" stroke="#7A4E38" strokeWidth="2.5" />
                    <rect x="98" y="44" width="8" height="6" rx="1.5" fill="#D99B26" stroke="#926210" strokeWidth="1" />
                    <path d="M106 47 C112 50, 113 56, 111 60" stroke="#D99B26" strokeWidth="1" strokeDasharray="2 2" fill="none" />
                  </g>
                </svg>
              </div>
            </div>

          </div>
        )}

        {/* ====================================================================
            MOTORCYCLE JOURNEY LOADING TRACK (Bike moves with countdown timer)
            ==================================================================== */}
        {!isLaunchReady && (
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
        )}

      </div>
    </div>
  );
};
