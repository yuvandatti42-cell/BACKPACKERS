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
  const [isGiftReady, setIsGiftReady] = useState<boolean>(false);
  const [isGiftOpening, setIsGiftOpening] = useState<boolean>(false);
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
  const giftReadyRef = useRef<boolean>(false);
  const giftOpeningRef = useRef<boolean>(false);

  // Keep refs in sync for reliable event callbacks
  useEffect(() => {
    giftReadyRef.current = isGiftReady;
  }, [isGiftReady]);

  useEffect(() => {
    giftOpeningRef.current = isGiftOpening;
  }, [isGiftOpening]);

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

  // When user taps on the cute Diwali gift box
  const handleOpenGift = () => {
    if (giftOpeningRef.current) return;
    setIsGiftOpening(true);

    // Give time for the lid to pop open and sparkles to burst before revealing the live website
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
    const forceGift = urlParams.has('gift');

    // Admin option to reset launch state for testing: ?resetLaunch
    if (urlParams.has('resetLaunch')) {
      localStorage.removeItem('bd_site_has_launched');
      sessionStorage.removeItem('bd_splash_seen');
    }

    // Direct Gift Box preview mode (?gift)
    if (forceGift) {
      setIsCountdownMode(false);
      setIsGiftReady(true);
      return;
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

        // When timer hits 0: Stop countdown, hide timer, and pop up the cute Diwali gift box!
        if (diff <= 0) {
          if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
          setIsCountdownMode(false);
          setIsGiftReady(true);
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
        if (giftReadyRef.current) {
          handleOpenGift();
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
        {isCountdownMode && !isGiftReady && (
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
            CUTE DIWALI GIFT BOX POP-UP
            Appears when the countdown reaches 0 or via ?gift
            Only opens and reveals the website when tapped!
            ==================================================================== */}
        {isGiftReady && (
          <div className={`splash-gift-container ${isGiftOpening ? 'is-opening' : ''}`}>
            <div className="splash-gift-card">
              
              {/* Warm Golden Diwali Aura / Festive Glow */}
              <div className="gift-aura-glow"></div>

              {/* Interactive Gift Box (Clickable whole area) */}
              <div 
                className="gift-interactive-wrapper"
                onClick={handleOpenGift}
                role="button"
                tabIndex={0}
                aria-label="Tap to open Diwali gift and launch website"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenGift();
                  }
                }}
              >
                {/* Floating Festive Sparkles */}
                <div className="gift-floating-sparkles">
                  <span className="sparkle s1">✨</span>
                  <span className="sparkle s2">✨</span>
                  <span className="sparkle s3">✨</span>
                  <span className="sparkle s4">✨</span>
                </div>

                {/* Cute Festive Diwali Gift Box */}
                <div className="diwali-gift-box">
                  <svg 
                    className="gift-svg" 
                    viewBox="0 0 160 160" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="giftBoxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#E23E2A" />
                        <stop offset="50%" stopColor="#C82819" />
                        <stop offset="100%" stopColor="#9C170C" />
                      </linearGradient>
                      <linearGradient id="giftLidGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#EA4835" />
                        <stop offset="100%" stopColor="#B31D10" />
                      </linearGradient>
                      <linearGradient id="goldRibbonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#FDE68A" />
                        <stop offset="35%" stopColor="#F59E0B" />
                        <stop offset="70%" stopColor="#D97706" />
                        <stop offset="100%" stopColor="#FCD34D" />
                      </linearGradient>
                      <linearGradient id="goldBowGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FEF3C7" />
                        <stop offset="50%" stopColor="#F59E0B" />
                        <stop offset="100%" stopColor="#B45309" />
                      </linearGradient>
                      <filter id="giftDropShadow" x="-20%" y="-20%" width="140%" height="150%">
                        <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.14" />
                      </filter>
                      <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#F59E0B" floodOpacity="0.5" />
                      </filter>
                    </defs>

                    {/* Ground Soft Shadow */}
                    <ellipse cx="80" cy="146" rx="50" ry="7" fill="rgba(0,0,0,0.12)" />

                    {/* MAIN GIFT BOX BODY */}
                    <g className="gift-body-group" filter="url(#giftDropShadow)">
                      <rect x="36" y="68" width="88" height="74" rx="14" fill="url(#giftBoxGrad)" />
                      <rect x="38" y="70" width="84" height="4" rx="2" fill="#FFFFFF" fillOpacity="0.25" />
                      
                      {/* Vertical Golden Ribbon */}
                      <rect x="71" y="68" width="18" height="74" fill="url(#goldRibbonGrad)" />
                      <line x1="74" y1="68" x2="74" y2="142" stroke="#FFF" strokeWidth="1" strokeOpacity="0.35" />
                      <line x1="86" y1="68" x2="86" y2="142" stroke="#B45309" strokeWidth="1" strokeOpacity="0.35" />

                      {/* Horizontal Golden Ribbon */}
                      <rect x="36" y="98" width="88" height="15" fill="url(#goldRibbonGrad)" />
                      <line x1="36" y1="100" x2="124" y2="100" stroke="#FFF" strokeWidth="1" strokeOpacity="0.35" />
                      <line x1="36" y1="111" x2="124" y2="111" stroke="#B45309" strokeWidth="1" strokeOpacity="0.35" />

                      {/* Golden Ribbon Center Knot */}
                      <circle cx="80" cy="105.5" r="4.5" fill="#FDE68A" filter="url(#goldGlow)" />
                    </g>

                    {/* INNER BURST RAYS & GOLDEN SPARKLES */}
                    <g className="gift-burst-rays">
                      <line x1="80" y1="65" x2="38" y2="18" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                      <line x1="80" y1="65" x2="80" y2="8" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
                      <line x1="80" y1="65" x2="122" y2="18" stroke="#FFD700" strokeWidth="3" strokeLinecap="round" />
                      <line x1="80" y1="65" x2="22" y2="45" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" />
                      <line x1="80" y1="65" x2="138" y2="45" stroke="#FCD34D" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="80" cy="24" r="5" fill="#FFFFFF" />
                      <circle cx="44" cy="22" r="3.5" fill="#FDE68A" />
                      <circle cx="116" cy="22" r="3.5" fill="#FDE68A" />
                    </g>

                    {/* BOX LID & CUTE BOW GROUP (Pops open on tap!) */}
                    <g className="gift-lid-group">
                      <rect x="31" y="55" width="98" height="20" rx="8" fill="url(#giftLidGrad)" filter="url(#giftDropShadow)" />
                      <rect x="33" y="56" width="94" height="3" rx="1.5" fill="#FFFFFF" fillOpacity="0.3" />
                      
                      {/* Lid Vertical Ribbon */}
                      <rect x="71" y="55" width="18" height="20" fill="url(#goldRibbonGrad)" />

                      {/* CUTE DIWALI GOLDEN BOW */}
                      <g className="gift-bow" filter="url(#goldGlow)">
                        {/* Left Bow Loop */}
                        <path 
                          d="M78 57 C66 42, 45 40, 48 54 C50 63, 68 59, 78 57 Z" 
                          fill="url(#goldBowGrad)" 
                          stroke="#F59E0B" 
                          strokeWidth="1.2" 
                        />
                        <path 
                          d="M54 50 C58 45, 68 47, 72 54" 
                          stroke="#FFFFFF" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeOpacity="0.6" 
                        />

                        {/* Right Bow Loop */}
                        <path 
                          d="M82 57 C94 42, 115 40, 112 54 C110 63, 92 59, 82 57 Z" 
                          fill="url(#goldBowGrad)" 
                          stroke="#F59E0B" 
                          strokeWidth="1.2" 
                        />
                        <path 
                          d="M106 50 C102 45, 92 47, 88 54" 
                          stroke="#FFFFFF" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeOpacity="0.6" 
                        />

                        {/* Left Ribbon Tail */}
                        <path 
                          d="M74 58 C68 64, 58 68, 54 75 C60 74, 69 70, 76 60 Z" 
                          fill="url(#goldRibbonGrad)" 
                        />
                        {/* Right Ribbon Tail */}
                        <path 
                          d="M86 58 C92 64, 102 68, 106 75 C100 74, 91 70, 84 60 Z" 
                          fill="url(#goldRibbonGrad)" 
                        />

                        {/* Center Bow Knot */}
                        <ellipse cx="80" cy="57" rx="7" ry="5.5" fill="url(#goldRibbonGrad)" stroke="#B45309" strokeWidth="1" />
                        <ellipse cx="79" cy="55.5" rx="3.5" ry="2" fill="#FFFFFF" fillOpacity="0.6" />
                      </g>
                    </g>
                  </svg>
                </div>

                {/* TAP TO LAUNCH BUTTON PILL */}
                <button 
                  type="button"
                  className="splash-gift-tap-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpenGift();
                  }}
                >
                  <span className="btn-sparkle left">✨</span>
                  <span className="btn-text">
                    {isGiftOpening ? 'OPENING...' : 'TAP TO LAUNCH'}
                  </span>
                  <span className="btn-sparkle right">✨</span>
                </button>

                <p className="splash-gift-hint">A Diwali surprise awaits • Tap to launch</p>
              </div>

            </div>
          </div>
        )}

        {/* ====================================================================
            MOTORCYCLE JOURNEY LOADING TRACK (Bike moves with countdown timer)
            ==================================================================== */}
        {!isGiftReady && (
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
