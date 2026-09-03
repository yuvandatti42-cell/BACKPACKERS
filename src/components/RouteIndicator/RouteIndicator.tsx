import React, { useState, useEffect } from 'react';
import './RouteIndicator.css';

interface RouteStage {
  id: string;
  number: string;
  name: string;
}

const ROUTE_STAGES: RouteStage[] = [
  { id: 'hero', number: '00', name: 'EXPEDITION START' },
  { id: 'statement', number: '01', name: 'THE APPROACH' },
  { id: 'categories', number: '02', name: 'TRIP CATEGORIES' },
  { id: 'routes', number: '03', name: 'FEATURED ROUTES' },
  { id: 'destinations', number: '04', name: 'CORE REGIONS' },
  { id: 'about', number: '05', name: 'HOW WE TRAVEL' },
  { id: 'notes', number: '06', name: 'FIELD NOTES' },
  { id: 'planner', number: '07', name: 'ROUTE DESK' }
];

export const RouteIndicator: React.FC = () => {
  const [activeStage, setActiveStage] = useState<RouteStage>(ROUTE_STAGES[0]);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only after scrolling past hero
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 280);

      const sectionElements = ROUTE_STAGES.map(stage => ({
        stage,
        el: document.getElementById(stage.id)
      })).filter(item => item.el !== null);

      const currentScrollMiddle = scrollY + window.innerHeight * 0.45;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const { stage, el } = sectionElements[i];
        if (el && el.offsetTop <= currentScrollMiddle) {
          setActiveStage(stage);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <aside className="route-indicator-badge" aria-label="Current route section">
      <div className="route-indicator-inner">
        <span className="route-beacon-dot" aria-hidden="true"></span>
        <span className="route-indicator-num">{activeStage.number}</span>
        <span className="route-indicator-divider">/</span>
        <span className="route-indicator-title">{activeStage.name}</span>
      </div>
    </aside>
  );
};
