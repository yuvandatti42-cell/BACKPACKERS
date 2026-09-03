import React, { useState, useEffect, useRef } from 'react';
import './RouteExperience.css';

interface RouteData {
  id: string;
  name: string;
  startPoint: string;
  endPoint: string;
  distance: string;
  duration: string;
  elevation: string;
  coordinates: string;
  pathD: string; // SVG path definition
}

const ROUTES_DATA: RouteData[] = [
  {
    id: 'ladakh',
    name: 'Ladakh High Passes',
    startPoint: 'Leh',
    endPoint: 'Hanle',
    distance: '1,200 KM',
    duration: '10 Days',
    elevation: '5,359 M',
    coordinates: 'N 34°09\' • E 77°34\'',
    pathD: 'M 50 150 C 120 70, 200 80, 280 180 S 380 280, 450 180'
  },
  {
    id: 'nepal',
    name: 'Mustang Dirt Corridor',
    startPoint: 'Kathmandu',
    endPoint: 'Lo Manthang',
    distance: '850 KM',
    duration: '8 Days',
    elevation: '3,800 M',
    coordinates: 'N 27°42\' • E 85°19\'',
    pathD: 'M 50 220 C 150 220, 180 120, 270 120 S 380 220, 450 120'
  },
  {
    id: 'kerala',
    name: 'Ghats Rainforest Switchbacks',
    startPoint: 'Kochi',
    endPoint: 'Munnar',
    distance: '640 KM',
    duration: '6 Days',
    elevation: '1,600 M',
    coordinates: 'N 9°58\' • E 76°16\'',
    pathD: 'M 50 100 C 130 180, 210 180, 290 80 S 390 100, 450 220'
  },
  {
    id: 'ghats',
    name: 'Western Ghats Crossing',
    startPoint: 'Ooty',
    endPoint: 'Valparai',
    distance: '750 KM',
    duration: '7 Days',
    elevation: '2,240 M',
    coordinates: 'N 11°24\' • E 76°41\'',
    pathD: 'M 50 180 C 150 280, 220 180, 300 120 S 380 80, 450 200'
  }
];

export const RouteExperience: React.FC = () => {
  const [activeRouteId, setActiveRouteId] = useState<string>('ladakh');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const activeRoute = ROUTES_DATA.find(r => r.id === activeRouteId) || ROUTES_DATA[0];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="route-experience" className="route-experience" ref={sectionRef} aria-labelledby="route-heading">
      <div className="container">
        
        {/* Header Section */}
        <div className="section-header">
          <div className="section-header-left">
            <span className="text-meta">INTERACTIVE EXPEDITIONS</span>
            <h2 id="route-heading" className="section-headline">
              THE ROUTE EXPERIENCE
            </h2>
          </div>
          <span className="text-meta">TACTICAL MAP RUNS</span>
        </div>

        {/* Map Layout */}
        <div className="map-experience-grid">
          
          {/* Map Left: Interactive Route Selector & Metadata */}
          <div className="map-controls">
            <div className="map-selector-list">
              {ROUTES_DATA.map((route) => (
                <button
                  key={route.id}
                  className={`map-selector-btn ${activeRouteId === route.id ? 'is-active' : ''}`}
                  onClick={() => setActiveRouteId(route.id)}
                >
                  <span className="selector-dot"></span>
                  <div className="selector-text">
                    <span className="selector-route-name">{route.name}</span>
                    <span className="selector-route-endpoints">
                      {route.startPoint} &rarr; {route.endPoint}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Metadata Display Sheet */}
            <div className="map-metadata-sheet">
              <div className="sheet-row header-row">
                <span className="sheet-title">{activeRoute.name.toUpperCase()}</span>
                <span className="sheet-gps">{activeRoute.coordinates}</span>
              </div>
              
              <div className="sheet-stats">
                <div className="stat-box">
                  <span className="stat-label">DISTANCE</span>
                  <span className="stat-value">{activeRoute.distance}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">DURATION</span>
                  <span className="stat-value">{activeRoute.duration}</span>
                </div>
                <div className="stat-box">
                  <span className="stat-label">MAX ELEVATION</span>
                  <span className="stat-value text-accent">{activeRoute.elevation}</span>
                </div>
              </div>

              <div className="sheet-footer">
                <span className="footer-meta">STATUS: SCOUTED &amp; OPEN FOR RESERVATION</span>
              </div>
            </div>
          </div>

          {/* Map Right: SVG Canvas Container */}
          <div className="map-canvas-container">
            <div className="map-canvas-frame">
              {/* Background Topographic Grids */}
              <div className="map-topography-grid"></div>

              <svg 
                className="map-vector-svg" 
                viewBox="0 0 500 300" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Grid Coordinates */}
                <g stroke="rgba(28,28,28,0.04)" strokeWidth="0.5">
                  <line x1="100" y1="0" x2="100" y2="300" />
                  <line x1="200" y1="0" x2="200" y2="300" />
                  <line x1="300" y1="0" x2="300" y2="300" />
                  <line x1="400" y1="0" x2="400" y2="300" />
                  <line x1="0" y1="100" x2="500" y2="100" />
                  <line x1="0" y1="200" x2="500" y2="200" />
                </g>

                {/* Abstract Topographic curves */}
                <path 
                  d="M -50 80 Q 150 40 300 120 T 550 50" 
                  stroke="rgba(28,28,28,0.03)" 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                />
                <path 
                  d="M -50 200 Q 180 160 320 250 T 550 180" 
                  stroke="rgba(28,28,28,0.03)" 
                  strokeWidth="1" 
                  strokeDasharray="4 4" 
                />

                {/* Inactive routes behind the active one */}
                {ROUTES_DATA.map((route) => {
                  const isActive = route.id === activeRouteId;
                  return (
                    <path
                      key={`bg-${route.id}`}
                      d={route.pathD}
                      stroke={isActive ? 'rgba(28, 28, 28, 0.15)' : 'rgba(28, 28, 28, 0.04)'}
                      strokeWidth={isActive ? '2' : '1'}
                      strokeLinecap="round"
                      style={{ transition: 'stroke 0.4s' }}
                    />
                  );
                })}

                {/* Dynamic Drawn Active Route (Traced with Orange) */}
                {ROUTES_DATA.map((route) => {
                  const isActive = route.id === activeRouteId;
                  if (!isActive) return null;
                  return (
                    <path
                      key={`active-${route.id}`}
                      d={route.pathD}
                      stroke="var(--accent-primary)"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      className={`active-route-path-line ${isVisible ? 'should-draw' : ''}`}
                    />
                  );
                })}

                {/* Route Pins */}
                {ROUTES_DATA.map((route) => {
                  const isActive = route.id === activeRouteId;
                  if (!isActive) return null;
                  
                  // Get estimated start/end coordinates of SVG paths for placing markers
                  // Path 1 (Ladakh): M 50 150 ... 450 180
                  // Path 2 (Nepal): M 50 220 ... 450 120
                  // Path 3 (Kerala): M 50 100 ... 450 220
                  // Path 4 (Ghats): M 50 180 ... 450 200
                  let startX = 50, startY = 150, endX = 450, endY = 180;
                  if (route.id === 'nepal') {
                    startX = 50; startY = 220; endX = 450; endY = 120;
                  } else if (route.id === 'kerala') {
                    startX = 50; startY = 100; endX = 450; endY = 220;
                  } else if (route.id === 'ghats') {
                    startX = 50; startY = 180; endX = 450; endY = 200;
                  }

                  return (
                    <g key={`markers-${route.id}`} className="map-route-markers">
                      {/* Start Point */}
                      <circle cx={startX} cy={startY} r="5" fill="var(--text-primary)" />
                      <circle cx={startX} cy={startY} r="10" stroke="var(--text-primary)" strokeWidth="0.5" strokeDasharray="2 2" />
                      <text x={startX} y={startY - 15} className="map-pin-label" textAnchor="middle">
                        {route.startPoint.toUpperCase()}
                      </text>

                      {/* End Point */}
                      <circle cx={endX} cy={endY} r="5.5" fill="var(--accent-primary)" />
                      <circle cx={endX} cy={endY} r="11" stroke="var(--accent-primary)" strokeWidth="1" className="map-pin-pulse" />
                      <text x={endX} y={endY - 15} className="map-pin-label pin-accent" textAnchor="middle">
                        {route.endPoint.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>

              <div className="map-canvas-meta">
                <span>GRID ALIGNED EXPEDITION CHART // PROJECTION: POLYCONIC</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
