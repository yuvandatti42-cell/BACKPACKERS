import React, { useEffect, useRef, useState } from 'react';
import './DiwaliCelebration.css';

interface DiwaliCelebrationProps {
  onComplete?: () => void;
  durationMs?: number;
}

interface Spark {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
  sparkle: boolean;
  trail?: { x: number; y: number }[];
  isWillow?: boolean;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  vy: number;
  vx: number;
  color: string;
  type: 'willow' | 'peony' | 'sparkler';
  trail: { x: number; y: number }[];
}

export const DiwaliCelebration: React.FC<DiwaliCelebrationProps> = ({
  onComplete,
  durationMs = 8000
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [isFadingOut, setIsFadingOut] = useState<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const sparks: Spark[] = [];
    const rockets: Rocket[] = [];

    // Authentic Diwali festive pyrotechnic colors
    const goldPalette = ['#FFFFFF', '#FFF9C4', '#FFF176', '#FFD54F', '#FFCA28', '#FFA000', '#FF6F00'];
    const festiveColors = [
      '#FFD54F', // Warm Willow Gold
      '#FF9800', // Saffron Amber
      '#E53935', // Festive Crimson Red
      '#43A047', // Emerald Green
      '#00E5FF', // Vibrant Cyan Spark
      '#FFFFFF'  // Pure Diamond Silver
    ];

    const startTime = Date.now();

    // Ground Chinchubuddi pot positions (bottom-left, bottom-center, bottom-right)
    const getPots = () => [
      { x: width * 0.12, intensity: 1.0 },
      { x: width * 0.50, intensity: 0.8 },
      { x: width * 0.88, intensity: 1.0 }
    ];

    // Emit upward fountain sparks from ground Chinchubuddis (Flower Pots / Anar)
    const emitChinchubuddi = (potX: number, potY: number, power: number) => {
      const count = Math.floor(4 * power);
      for (let i = 0; i < count; i++) {
        // Natural upward cone spray
        const angle = -Math.PI / 2 + (Math.random() - 0.5) * 0.35;
        const speed = (9 + Math.random() * 12) * power;

        sparks.push({
          x: potX + (Math.random() - 0.5) * 14,
          y: potY - 4,
          vx: Math.cos(angle) * speed + (Math.random() - 0.5) * 0.7,
          vy: Math.sin(angle) * speed,
          size: 1.2 + Math.random() * 2.2,
          alpha: 1,
          decay: 0.016 + Math.random() * 0.02,
          color: goldPalette[Math.floor(Math.random() * goldPalette.length)],
          sparkle: Math.random() > 0.3
        });
      }
    };

    // Create a natural aerial firework burst (Peony shell or Golden Willow)
    const createAerialBurst = (x: number, y: number, shellColor: string, isWillow = false) => {
      const starCount = isWillow ? 55 + Math.floor(Math.random() * 25) : 45 + Math.floor(Math.random() * 30);
      const chosenColor = isWillow ? '#FFD54F' : shellColor;

      for (let i = 0; i < starCount; i++) {
        const angle = (Math.PI * 2 * i) / starCount + (Math.random() - 0.5) * 0.25;
        const speed = isWillow 
          ? 2.5 + Math.random() * 4.8 
          : 3.0 + Math.random() * 6.0;

        sparks.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: isWillow ? 2.0 + Math.random() * 2.0 : 2.2 + Math.random() * 2.5,
          alpha: 1,
          decay: isWillow ? 0.009 + Math.random() * 0.012 : 0.014 + Math.random() * 0.018,
          color: Math.random() > 0.25 ? chosenColor : '#FFFFFF',
          sparkle: Math.random() > 0.3,
          trail: [],
          isWillow
        });
      }
    };

    // Launch a natural rising rocket that detonates into fireworks overhead
    const launchRocket = (targetX?: number, targetY?: number) => {
      const startX = targetX || width * 0.18 + Math.random() * (width * 0.64);
      const destY = targetY || height * 0.12 + Math.random() * (height * 0.32);
      const isWillowType = Math.random() > 0.45;

      rockets.push({
        x: startX + (Math.random() - 0.5) * 40,
        y: height,
        targetY: destY,
        vy: -(9.5 + Math.random() * 4.5),
        vx: (Math.random() - 0.5) * 1.5, // gentle natural wind drift
        color: festiveColors[Math.floor(Math.random() * festiveColors.length)],
        type: isWillowType ? 'willow' : 'peony',
        trail: []
      });
    };

    // Initial natural sky burst right when website opens!
    setTimeout(() => {
      launchRocket(width * 0.32, height * 0.22);
    }, 250);
    setTimeout(() => {
      launchRocket(width * 0.68, height * 0.18);
    }, 700);

    // Continuous natural rocket launches spaced gracefully
    const rocketInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed > durationMs - 2200) return;

      launchRocket();
      if (Math.random() > 0.4) {
        setTimeout(() => launchRocket(), 350);
      }
    }, 1100);

    const render = () => {
      // Clear canvas each frame so the live website is 100% visible underneath
      ctx.clearRect(0, 0, width, height);

      const elapsed = Date.now() - startTime;

      // Natural burn-down of Chinchubuddis over time
      let chinchubuddiPower = 1.0;
      if (elapsed > durationMs - 2500) {
        chinchubuddiPower = Math.max(0, (durationMs - elapsed) / 2500);
      }

      // 1. Emit Ground Chinchubuddi (Flower Pot) fountains
      if (chinchubuddiPower > 0.05) {
        const pots = getPots();
        pots.forEach(pot => {
          emitChinchubuddi(pot.x, height, chinchubuddiPower * pot.intensity);

          // Soft golden diya glow at pot base
          ctx.save();
          const baseGlow = ctx.createRadialGradient(pot.x, height, 2, pot.x, height, 48);
          baseGlow.addColorStop(0, `rgba(255, 215, 0, ${0.35 * chinchubuddiPower})`);
          baseGlow.addColorStop(0.5, `rgba(255, 140, 0, ${0.18 * chinchubuddiPower})`);
          baseGlow.addColorStop(1, 'rgba(255, 140, 0, 0)');
          ctx.fillStyle = baseGlow;
          ctx.beginPath();
          ctx.arc(pot.x, height, 48, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });
      }

      // 2. Update & Draw Rising Rockets with sparkling golden trails
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';

      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.x += r.vx;
        r.y += r.vy;
        r.vy += 0.08; // gradual decelerating apex curve

        r.trail.push({ x: r.x, y: r.y });
        if (r.trail.length > 7) r.trail.shift();

        // Draw luminous rocket trail
        ctx.strokeStyle = r.color;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        for (let j = 0; j < r.trail.length; j++) {
          const pt = r.trail[j];
          if (j === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // Rocket head spark
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fill();

        // Check if rocket has reached burst altitude or apex
        if (r.y <= r.targetY || r.vy >= -0.5) {
          createAerialBurst(r.x, r.y, r.color, r.type === 'willow');
          rockets.splice(i, 1);
        }
      }

      // 3. Update & Draw all fireworks spark particles (Aerial shells + Chinchubuddis)
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];

        // Store trail positions for natural drooping willow trails
        if (s.trail) {
          s.trail.push({ x: s.x, y: s.y });
          if (s.trail.length > 6) s.trail.shift();
        }

        s.x += s.vx;
        s.y += s.vy;
        
        // Physics: air resistance + natural gravity curve
        if (s.isWillow) {
          s.vx *= 0.96;
          s.vy += 0.15; // gentle drooping willow gravity
        } else {
          s.vx *= 0.98;
          s.vy += 0.28; // standard sparkler gravity
        }

        s.vx += (Math.random() - 0.5) * 0.2; // slight air flicker
        s.alpha -= s.decay;

        if (s.alpha <= 0 || s.y > height + 20) {
          sparks.splice(i, 1);
          continue;
        }

        const currentAlpha = s.sparkle && Math.random() > 0.35 ? s.alpha * 0.6 : s.alpha;

        // Draw spark tail for aerial fireworks
        if (s.trail && s.trail.length > 1) {
          ctx.strokeStyle = s.color;
          ctx.lineWidth = s.size * 0.6;
          ctx.beginPath();
          for (let k = 0; k < s.trail.length; k++) {
            const tp = s.trail[k];
            if (k === 0) ctx.moveTo(tp.x, tp.y);
            else ctx.lineTo(tp.x, tp.y);
          }
          ctx.globalAlpha = Math.max(0, currentAlpha * 0.45);
          ctx.stroke();
        }

        // Draw spark glowing head
        ctx.globalAlpha = Math.max(0, currentAlpha);
        ctx.fillStyle = s.color;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      if (elapsed < durationMs || sparks.length > 0 || rockets.length > 0) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    // Start graceful fade out before completion
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, durationMs - 1400);

    const finishTimer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, durationMs);

    return () => {
      clearInterval(rocketInterval);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [durationMs, onComplete]);

  if (!isVisible) return null;

  return (
    <div className={`diwali-celebration-container ${isFadingOut ? 'is-fading' : ''}`}>
      <canvas ref={canvasRef} className="diwali-celebration-canvas" />

      {/* Tasteful floating Diwali celebration pill over the live website */}
      <div className="diwali-site-banner">
        <div className="diwali-banner-content">
          <span className="diwali-diya-icon">🪔</span>
          <span className="diwali-banner-text">HAPPY DIWALI • WE ARE OFFICIALLY LIVE!</span>
          <span className="diwali-diya-icon">🪔</span>
        </div>
      </div>
    </div>
  );
};
