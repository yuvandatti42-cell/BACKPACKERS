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
            PROFESSIONAL OVERLAND ADVENTURE LAUNCH MODULE
            Appears when the countdown reaches 0 (or via ?ready / ?launchReady)
            Features: Royal Enfield Adventure Motorcycle, Overland Helmet,
            and high-contrast "TAP TO LAUNCH" expedition button!
            ==================================================================== */}
        {isLaunchReady && (
          <div className={`splash-launch-container ${isLaunching ? 'is-launching' : ''}`}>
            <div className="splash-launch-card">
              
              {/* Route Status Badge */}
              <div className="launch-status-pill">
                <span className="launch-live-dot"></span>
                <span className="launch-status-text">ROUTE UNLOCKED • ALL SYSTEMS READY</span>
              </div>

              {/* Overland Motorcycle & Helmet Scene Container */}
              <div className="launch-scene-wrapper">
                
                {/* Topographic Contour Lines Accent */}
                <div className="launch-topo-background" aria-hidden="true">
                  <svg viewBox="0 0 440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 65 Q110 20 220 70 T440 55" stroke="rgba(0,0,0,0.06)" strokeWidth="1.5" />
                    <path d="M0 95 Q130 40 260 90 T440 75" stroke="rgba(0,0,0,0.04)" strokeWidth="1.2" />
                    <path d="M0 35 Q150 80 300 30 T440 45" stroke="rgba(200,90,50,0.08)" strokeWidth="1" />
                  </svg>
                </div>

                {/* Adventure Helmet Crest */}
                <div className="launch-helmet-crest" title="Overland Gear Ready">
                  <svg className="overland-helmet-svg" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Shell */}
                    <path 
                      d="M13 36 C11 23, 20 13, 34 12 C48 12, 57 21, 57 34 C57 43, 50 51, 41 51 L36 51 C34 51, 31 49, 27 49 L21 49 C15 49, 13 43, 13 36 Z" 
                      fill="#18181B" 
                      stroke="#C85A32" 
                      strokeWidth="2" 
                      strokeLinejoin="round" 
                    />
                    {/* Sun Peak Visor */}
                    <path 
                      d="M21 15 C30 10, 46 10, 59 16 C55 19, 48 20, 40 19 L27 19 Z" 
                      fill="#C85A32" 
                    />
                    <path d="M24 18 L55 18" stroke="#E6A817" strokeWidth="1" />
                    {/* Tinted Shield & Visor Reflection */}
                    <path 
                      d="M27 25 C36 24, 46 25, 53 30 C51 38, 44 42, 35 42 C30 42, 27 39, 26 34 Z" 
                      fill="#27272A" 
                      stroke="#3F3F46" 
                      strokeWidth="1" 
                    />
                    <path d="M31 28 Q41 28 48 33" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.45" />
                    {/* Vent & Hardware */}
                    <line x1="21" y1="42" x2="26" y2="42" stroke="#C85A32" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="19" y1="45" x2="25" y2="45" stroke="#71717A" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="48" cy="36" r="2.5" fill="#C85A32" />
                  </svg>
                  <span className="helmet-label">GEAR READY</span>
                </div>

                {/* The Royal Enfield Adventure Motorcycle */}
                <div className={`launch-bike-stand ${isLaunching ? 'is-accelerating' : ''}`}>
                  {/* Dust particles billowing behind rear wheel */}
                  <div className={`splash-dust-container ${isLaunching ? 'is-active' : ''}`}>
                    <span className="dust-particle p1"></span>
                    <span className="dust-particle p2"></span>
                    <span className="dust-particle p3"></span>
                    <span className="dust-particle p4"></span>
                    <span className="dust-particle p5"></span>
                  </div>

                  <MotorcycleSVG isMoving={isLaunching} className="launch-adventure-bike" />
                </div>

                {/* Ground Road Line */}
                <div className="launch-road-bed">
                  <div className="launch-road-line"></div>
                </div>

              </div>

              {/* Professional Overland Launch Button */}
              <button 
                type="button" 
                className="splash-overland-launch-btn"
                onClick={handleLaunchWebsite}
                disabled={isLaunching}
                aria-label="Tap to start engine and launch Backpackers Destinations website"
              >
                <span className="btn-ignition-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                </span>
                <span className="btn-label-text">
                  {isLaunching ? 'IGNITING EXPEDITION...' : 'TAP TO LAUNCH'}
                </span>
                <span className="btn-arrow-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </button>

              <p className="splash-launch-subtext">
                START ENGINE • ENTER BACKPACKERS DESTINATIONS
              </p>

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
