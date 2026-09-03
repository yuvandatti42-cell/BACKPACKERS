import React from 'react';
import { FEATURES_DATA } from '../../data/featuresData';
import './WhyBackpackers.css';

export const WhyBackpackers: React.FC = () => {
  return (
    <section id="about" className="section section-bordered-top" aria-labelledby="why-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-header-left">
            <div className="section-meta-row">
              <span className="text-meta">HOW WE OPERATE</span>
            </div>
            <h2 id="why-heading" className="section-headline">
              WHY TRAVEL WITH US
            </h2>
          </div>
          <span className="text-meta">OPERATIONAL PILLARS</span>
        </div>

        <div className="differentiators-editorial-grid">
          {FEATURES_DATA.map((feat, index) => (
            <div 
              key={feat.number} 
              className="diff-editorial-item"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="diff-number-row">
                <span className="diff-large-num">{feat.number}</span>
                <span className="diff-accent-dot" aria-hidden="true"></span>
              </div>
              
              <h3 className="diff-editorial-title">{feat.title}</h3>
              
              <div className="diff-editorial-divider">
                <span className="diff-divider-line"></span>
              </div>
              
              <p className="diff-editorial-desc">{feat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
