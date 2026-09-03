import React from 'react';
import { TRIPS_DATA } from '../../data/tripsData';
import './FeaturedTrips.css';

export const FeaturedTrips: React.FC = () => {
  return (
    <section id="trips" className="section" aria-labelledby="routes-heading">
      <div className="container">
        <div className="section-header">
          <div className="section-header-left">
            <div className="section-meta-row">
              <span className="text-meta">FEATURED ROUTES</span>
            </div>
            <h2 id="routes-heading" className="section-headline">
              SCOUTED ITINERARIES
            </h2>
          </div>
          <span className="text-meta">AUTHENTIC LOCATIONS</span>
        </div>

        <div className="routes-layout">
          {TRIPS_DATA.map((trip) => (
            <article key={trip.id} className="route-item">
              <div className="route-media-frame">
                <img src={trip.image} alt={trip.alt} loading="lazy" />
              </div>
              
              <div className="route-header-info">
                <h3 className="route-title">{trip.title}</h3>
                <span className="badge">{trip.category}</span>
              </div>

              <p>{trip.description}</p>

              <div className="route-specs">
                <div className="route-spec-item">
                  <span className="route-spec-label">Region</span>
                  <span className="route-spec-val">{trip.region}</span>
                </div>
                <div className="route-spec-item">
                  <span className="route-spec-label">Terrain</span>
                  <span className="route-spec-val">{trip.terrain}</span>
                </div>
                <div className="route-spec-item">
                  <span className="route-spec-label">Format</span>
                  <span className="route-spec-val">{trip.format}</span>
                </div>
              </div>

              <a href="#planner" className="route-action-link">
                INQUIRE ABOUT THIS ROUTE &rarr;
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
