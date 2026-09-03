import React, { useEffect, useRef, useState } from 'react';
import './OurStory.css';

export const OurStory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section 
      id="our-story" 
      className={`our-story-section ${isVisible ? 'is-in-view' : ''}`} 
      ref={sectionRef}
      aria-labelledby="story-heading"
    >
      <div className="container story-container">
        
        {/* Left Side: Asymmetrical Image Collage */}
        <div className="story-media-collage">
          <img 
            src="/ost.jpg" 
            alt="Backpackers Destinations Our Story expedition overview" 
            className="story-collage-img main-img"
            loading="lazy"
          />
          <img 
            src="/ostt.jpg" 
            alt="Overland touring rider pausing on scenic mountain trail" 
            className="story-collage-img secondary-img"
            loading="lazy"
          />
        </div>

        {/* Right Side: Editorial Story Content Sheet */}
        <div className="story-content-panel">
          
          {/* Eyebrow label */}
          <span className="story-eyebrow">+ OUR STORY</span>

          {/* Bold Display Headline with Line Breaks */}
          <h2 id="story-heading" className="story-display-heading">
            <span className="heading-line">HTA ADVENTURES WAS BORN</span>
            <span className="heading-line">OUT OF A PASSION FOR</span>
            <span className="heading-line">MOUNTAIN BIKE TRAVEL AND</span>
            <span className="heading-line text-accent">A DESIRE TO DO THINGS</span>
            <span className="heading-line">BETTER.</span>
          </h2>

          {/* Understated Paragraph Copy */}
          <p className="story-body-paragraph">
            "We wanted to craft our own mountain bike tours that reflected and fuelled our passion for experiencing the world on two wheels. Importantly, this meant they had to be designed with a high level of integrity, local guides and a true understanding of the culture of each destination."
          </p>

        </div>

      </div>
    </section>
  );
};
export default OurStory;
