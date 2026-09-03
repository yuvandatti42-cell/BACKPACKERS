import React, { useEffect, useRef, useState } from 'react';
import { TravellerCharacterSVG } from './TravellerCharacterSVG';
import './TravellerTransition.css';

export const TravellerTransition: React.FC = () => {
  const transitionRef = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState<boolean>(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '120px 0px' } // Pre-activate when approaching
    );

    const el = transitionRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) observer.unobserve(el);
    };
  }, []);

  return (
    <section 
      ref={transitionRef}
      className="traveller-transition-section" 
      aria-hidden="true"
      role="presentation"
    >
      {/* Ground Trail Line & Waypoint Dashes */}
      <div className="traveller-trail-track" />
      <div className="traveller-trail-dashes" />
      
      {/* Minimalist Editorial Trail Marker */}
      <div className="traveller-trail-meta">
        TRANSIT CORRIDOR • LAT 46.5197° N
      </div>

      {/* Slowly Travelling Motorcycle Adventurer */}
      <div className={`traveller-motion-carrier ${isInView ? 'is-active' : ''}`}>
        <TravellerCharacterSVG isMoving={isInView} />
      </div>
    </section>
  );
};

export default TravellerTransition;
