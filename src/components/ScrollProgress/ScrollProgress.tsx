import React, { useState, useEffect } from 'react';
import './ScrollProgress.css';

export const ScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      className="scroll-progress-track" 
      role="progressbar" 
      aria-valuenow={Math.round(scrollProgress)} 
      aria-valuemin={0} 
      aria-valuemax={100}
      aria-label="Reading progress"
    >
      <div 
        className="scroll-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
