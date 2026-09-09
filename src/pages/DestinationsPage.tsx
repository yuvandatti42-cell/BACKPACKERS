import React, { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import './DestinationsPage.css';



export type TripTypeCategory = 'weekend' | 'long-expedition' | 'bike-trips' | 'off-beaten' | 'private';

export interface TripTypeInfo {
  id: TripTypeCategory;
  title: string;
  subtitle: string;
  badgeText: string;
  image: string;
  description: string;
  durationRange: string;
}

export const TRIP_TYPES: TripTypeInfo[] = [
  {
    id: 'weekend',
    title: 'WEEKEND TRIPS',
    subtitle: 'Quick 2–3 Day Escapes',
    badgeText: 'SHORT & INTENSE',
    image: '/wkndtp.jpeg',
    description: 'Fast-paced mountain ridge runs and coastal getaways designed for tight schedules.',
    durationRange: '2 — 3 DAYS'
  },
  {
    id: 'long-expedition',
    title: 'LONG EXPEDITION',
    subtitle: '6–14 Day Deep Overlands',
    badgeText: 'FULL TRANSIT',
    image: '/long.jpg',
    description: 'Multi-day endurance runs crossing 17,000+ ft passes and cold desert plateaus.',
    durationRange: '6 — 14 DAYS'
  },
  {
    id: 'bike-trips',
    title: 'BIKE TRIPS',
    subtitle: 'Motorcycle & MTB Traverses',
    badgeText: 'TWO-WHEEL FREEDOM',
    image: '/bike.jpg',
    description: 'Scouted two-wheeler routes backed by dedicated support trucks and satellite comms.',
    durationRange: '3 — 10 DAYS'
  },
  {
    id: 'off-beaten',
    title: 'OFF BEATEN PLACES',
    subtitle: 'Raw Backcountry Routes',
    badgeText: '100% UNSCRIPTED',
    image: '/off.jpg',
    description: 'Untouched valley trails, cliffside monasteries, and wild backcountry camping.',
    durationRange: '4 — 12 DAYS'
  },
  {
    id: 'private',
    title: 'PRIVATE TRIPS',
    subtitle: 'Bespoke Custom Squads',
    badgeText: 'BESPOKE SQUAD',
    image: '/priv.jpg',
    description: 'Exclusive private group runs tailored to your exact schedule, squad size, and route preference.',
    durationRange: 'CUSTOM DATES'
  }
];

export interface CorridorDetail {
  id: string;
  number: string;
  region: string;
  title: string;
  subtitle: string;
  tripTypes: TripTypeCategory[];
  elevation: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPEDITION';
  duration: string;
  distance: string;
  bestSeason: string;
  squadSize: string;
  terrain: string;
  highlights: string[];
  description: string;
  image: string;
  frameColor: string;
}

export const DESTINATION_CORRIDORS: CorridorDetail[] = [
  {
    id: 'kerala-weekend',
    number: '01',
    region: 'WESTERN GHATS',
    title: 'MISTY GHATS WEEKEND ESCAPE',
    subtitle: 'Munnar Ridge • 36 Hairpin Curves • Tea Plantations',
    tripTypes: ['weekend', 'bike-trips'],
    elevation: '8,800 FT / 2,695 M',
    difficulty: 'BEGINNER',
    duration: '3 DAYS / 2 NIGHTS',
    distance: '380 KM',
    bestSeason: 'YEAR-ROUND',
    squadSize: '6 - 12 RIDERS',
    terrain: 'Misty Cloud Forests & Tight Banking Hairpins',
    highlights: [
      'Quick 3-day weekend loop through Munnar mountain ridges',
      'Navigate 36 continuous banking switchbacks in cloud forests',
      'High-contrast tea plantation road curves and forest trails',
      'Cozy mountain lodge stay with local spice plantation tours'
    ],
    description: 'The ultimate weekend escape. Bank through continuous hairpin curves amidst high-altitude tea gardens and misty mountain air.',
    image: '/ke.jpg',
    frameColor: '#7B8C78'
  },
  {
    id: 'spiti',
    number: '02',
    region: 'SPITI VALLEY',
    title: 'DESERT MOUNTAIN CIRCUIT',
    subtitle: 'Kunzum Pass • Kaza • Chandratal Moon Lake',
    tripTypes: ['long-expedition', 'off-beaten', 'bike-trips'],
    elevation: '15,059 FT / 4,590 M',
    difficulty: 'EXPEDITION',
    duration: '7 DAYS / 6 NIGHTS',
    distance: '920 KM',
    bestSeason: 'JUNE — OCTOBER',
    squadSize: '4 - 8 RIDERS',
    terrain: 'Water Crossings, Loose Shales & High Alpine Gorges',
    highlights: [
      'Cross treacherous water nullahs along Kinnaur cliff road',
      'Visit Key Monastery perched on a thousand-foot hill spire',
      'Camp under crystal clear starry skies at Chandratal Lake',
      'Conquer Kunzum La pass with panoramic views of Shigri Glacier'
    ],
    description: 'The Middle Land between India and Tibet. Remote, rugged, and unpaved, Spiti demands resilience as you conquer glacial runoff rivers and ancient monastery valleys.',
    image: '/tour_spiti.jpg',
    frameColor: '#C29B53'
  },
  {
    id: 'zanskar-offbeaten',
    number: '03',
    region: 'ZANSKAR',
    title: 'UNCHARTED ZANSKAR CANYON TRAIL',
    subtitle: 'Shinku La • Phugtal Cave Monastery • Padum Run',
    tripTypes: ['off-beaten', 'bike-trips', 'long-expedition'],
    elevation: '16,580 FT / 5,053 M',
    difficulty: 'EXPEDITION',
    duration: '6 DAYS / 5 NIGHTS',
    distance: '750 KM',
    bestSeason: 'JULY — SEPTEMBER',
    squadSize: '4 - 6 RIDERS',
    terrain: 'Unpaved Riverbed Tracks, High Scree & Remote Canyons',
    highlights: [
      'Traverse newly opened high pass of Shinku La',
      'Trek to Phugtal Monastery built into a cliff cave cliffside',
      'Unscripted wild riverbed camping under towering rock spires',
      'Raw, unpaved off-the-grid mountain tracks away from crowds'
    ],
    description: 'One of the last truly off-beaten corridors in the Trans-Himalayas. Unpaved, secluded, and intensely dramatic canyon wilderness.',
    image: '/pi2.jpg',
    frameColor: '#5C5468'
  },
  {
    id: 'bhutan',
    number: '04',
    region: 'BHUTAN',
    title: 'LAST THUNDER DRAGON KINGDOM',
    subtitle: 'Dochula Pass • Paro Taktsang • Punakha Valley',
    tripTypes: ['long-expedition', 'private'],
    elevation: '10,200 FT / 3,110 M',
    difficulty: 'INTERMEDIATE',
    duration: '9 DAYS / 8 NIGHTS',
    distance: '780 KM',
    bestSeason: 'SEPTEMBER — MAY',
    squadSize: '4 - 8 RIDERS',
    terrain: 'Smooth Winding Himalayan Valleys & Pine Forests',
    highlights: [
      'Ride through 108 memorial stupas at Dochula High Pass',
      'Hike to the legendary Tiger Nest monastery above Paro cliff',
      'Immerse in pure Himalayan culture and pristine fortress dzongs',
      'Smooth flow switchbacks through alpine pine valleys'
    ],
    description: 'A serene yet exhilarating cross-border journey into the peaceful Dragon Kingdom of Bhutan. Experience immaculate Himalayan switchbacks, ancient dzongs, and untouched pine forests.',
    image: '/tour_bhutan.jpg',
    frameColor: '#4A8280'
  },
  {
    id: 'private-custom-run',
    number: '05',
    region: 'PRIVATE RUNS',
    title: 'CUSTOM TAILORED OVERLAND SQUADRON',
    subtitle: 'Bespoke Route Scouting • Private Support Truck & Escort',
    tripTypes: ['private'],
    elevation: 'CUSTOM ALTITUDE',
    difficulty: 'INTERMEDIATE',
    duration: 'CUSTOM (3 — 14 DAYS)',
    distance: 'TAILORED KM',
    bestSeason: 'CUSTOM SCHEDULE',
    squadSize: 'PRIVATE SQUAD',
    terrain: 'Custom Selected Routes Across All Regions',
    highlights: [
      'Dedicated Expedition Leader, Support Vehicle & Lead Scout',
      'Customized pace, daily mileage, and luxury/wild stay choices',
      'Private group briefing, satellite logistics & medical backup',
      'Tailored for corporate squads, private crews, or solo wanderers'
    ],
    description: 'Fully customized private expeditions built around your squad’s exact preferences, dates, and vehicle setups with dedicated support escort.',
    image: '/in.jpg',
    frameColor: '#8C5A48'
  }
];

interface DestinationsPageProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  initialFilter?: string;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onNavigate, initialFilter = 'all' }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);
  const [activeCorridorId, setActiveCorridorId] = useState<string>('kerala-weekend');

  React.useEffect(() => {
    if (initialFilter) {
      setSelectedFilter(initialFilter);
    }
  }, [initialFilter]);

  const filteredCorridors = selectedFilter === 'all'
    ? DESTINATION_CORRIDORS
    : DESTINATION_CORRIDORS.filter(c => c.tripTypes.includes(selectedFilter as TripTypeCategory));

  const handleBookInquiry = (_destinationName?: string) => {
    if (onNavigate) {
      onNavigate('home', 'planner');
    } else {
      window.location.hash = 'planner';
    }
  };

  return (
    <div className="destinations-page-wrapper">
      <Header onNavigate={onNavigate} currentRoute="destinations" />

      <main className="destinations-page-main">
        {/* 5 FEATURED TRIP TYPES SHOWCASE GRID */}
        <section className="dest-trip-types-section">
          <div className="container">
            <div className="section-header-types">
              <span className="text-meta">+ TRIP CLASSIFICATIONS</span>
              <h2 className="types-section-title">FIVE WAYS TO TRAVEL WITH US</h2>
              <p className="types-section-desc">Select a trip style below to filter our scouted route catalog:</p>
            </div>

            <div className="trip-types-grid">
              {TRIP_TYPES.map((type) => {
                const isActive = selectedFilter === type.id;
                const isFeatured = type.id === 'private';
                return (
                  <div 
                    key={type.id}
                    className={`trip-type-card ${isActive ? 'is-active' : ''} ${isFeatured ? 'is-featured' : ''}`}
                    onClick={() => setSelectedFilter(type.id)}
                  >
                    {isFeatured && <span className="featured-ribbon-tag">BESPOKE</span>}
                    <div className="type-card-media-wrap">
                      <img src={type.image} alt={type.title} className="type-card-img" />
                      <div className="type-card-overlay" />
                    </div>

                    <div className="type-card-content">
                      <h3 className="type-title">{type.title}</h3>
                      <span className="type-subtitle">{type.subtitle}</span>
                      <p className="type-desc">{type.description}</p>

                      <div className="type-card-footer">
                        <span className="type-duration-val">{type.durationRange}</span>
                        <span className="type-action-arrow">
                          {isActive ? 'FILTERING LOGS ✓' : 'EXPLORE RUNS →'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Page Hero / Catalog Header */}
        <section className="dest-hero-section">
          <div className="container">
            <div className="dest-hero-content">
              <div className="dest-eyebrow-row">
                <span className="text-meta">+ DESTINATIONS &amp; TRIP TYPES</span>
                <span className="dest-badge-pill">CATALOG 2026/27</span>
              </div>
              <h1 className="dest-hero-title">
                EXPLORE OUR <span className="text-accent">DESTINATION CORRIDORS</span>
              </h1>
              <p className="dest-hero-lead">
                Whether you’re seeking a fast weekend mountain escape, a 14-day high altitude overland expedition, bike-focused traverses, uncharted off-beaten places, or a private bespoke squad run — explore our scouted travel styles.
              </p>

              {/* Key Quick Stats */}
              <div className="dest-hero-stats">
                <div className="hero-stat-item">
                  <span className="stat-value">05</span>
                  <span className="stat-label">Trip Styles</span>
                </div>
                <span className="stat-divider">•</span>
                <div className="hero-stat-item">
                  <span className="stat-value">17,582 FT</span>
                  <span className="stat-label">Max Altitude</span>
                </div>
                <span className="stat-divider">•</span>
                <div className="hero-stat-item">
                  <span className="stat-value">100%</span>
                  <span className="stat-label">Scouted Routes</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DEDICATED WHATSAPP CATALOG HIGHLIGHT BANNER */}
        <section className="dest-wa-catalog-banner">
          <div className="container">
            <div className="wa-catalog-card">
              <div className="wa-card-left">
                <div className="wa-badge-row">
                  <span className="wa-status-dot" />
                  <span className="text-meta">+ OFFICIAL WHATSAPP CATALOG</span>
                  <span className="wa-verified-pill">VERIFIED STORE DESK</span>
                </div>
                <h2 className="wa-catalog-title">
                  EXPLORE ALL ITINERARIES ON <span className="wa-brand-accent">WHATSAPP</span>
                </h2>

                
                <div className="wa-features-pills">
                  <span className="wa-feature-tag">⚡ Direct PDF Downloads</span>
                  <span className="wa-feature-tag">🗺️ Day-wise Route Map</span>
                  <span className="wa-feature-tag">💬 24/7 Scout Support</span>
                  <span className="wa-feature-tag">🏷️ Live Season Pricing</span>
                </div>
              </div>

              <div className="wa-card-right">
                <div className="wa-action-box">
                  <div className="wa-number-badge">
                    <span className="wa-number-label">WHATSAPP DESK</span>
                    <span className="wa-catalog-number">+91 72076 81067</span>
                  </div>
                  <a 
                    href="https://wa.me/c/917207681067" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-wa-primary"
                  >
                    <svg className="wa-icon-lg" viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                      <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.233-1.337a9.96 9.96 0 004.779 1.217h.005c5.506 0 9.989-4.478 9.99-9.984A9.97 9.97 0 0012.012 2zm.005 16.273h-.004a8.27 8.27 0 01-4.218-1.155l-.302-.18-3.13.814-3.076-.197a8.27 8.27 0 01-1.267-4.491c.002-4.57 3.716-8.28 8.291-8.28a8.25 8.25 0 015.86 2.427 8.23 8.23 0 012.424 5.856c-.002 4.57-3.717 8.28-8.291 8.28zm4.542-6.2c-.249-.125-1.472-.726-1.7-.809-.229-.083-.396-.125-.562.125-.166.249-.645.809-.79.975-.146.166-.291.187-.54.062s-1.053-.388-2.006-1.238c-.742-.662-1.243-1.48-1.389-1.73-.146-.249-.015-.384.11-.508.112-.112.249-.291.374-.437.125-.146.166-.249.249-.415.083-.166.042-.312-.021-.437-.062-.125-.562-1.352-.77-1.851-.202-.486-.408-.42-.562-.428l-.479-.009c-.166 0-.437.062-.666.312s-.874.853-.874 2.08.895 2.41 1.02 2.577c.125.166 1.761 2.689 4.267 3.771.596.257 1.061.411 1.424.526.598.19 1.142.163 1.572.099.48-.071 1.472-.602 1.68-1.184.208-.582.208-1.08.146-1.184-.062-.104-.229-.166-.479-.291z"/>
                    </svg>
                    <span>OPEN WHATSAPP CATALOG &rarr;</span>
                  </a>

                  <a 
                    href="https://wa.me/917207681067?text=Hi%20Backpackers%20Destinations%2C%20I%20want%20to%20inquire%20about%20your%20trips" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-wa-secondary"
                  >
                    <span>CHAT WITH SCOUT DESK</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter Tabs */}
        <section className="dest-filter-section">
          <div className="container">
            <div className="filter-bar-wrap">
              <button 
                className={`filter-btn ${selectedFilter === 'all' ? 'is-active' : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                ALL TRIPS ({DESTINATION_CORRIDORS.length})
              </button>

              {TRIP_TYPES.map(t => (
                <button 
                  key={t.id}
                  className={`filter-btn ${selectedFilter === t.id ? 'is-active' : ''}`}
                  onClick={() => setSelectedFilter(t.id)}
                >
                  <span>{t.title}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Destination Corridors Grid */}
        <section className="dest-grid-section">
          <div className="container">
            <div className="dest-catalog-header">
              <span className="text-meta">+ CATALOG RESULTS</span>
              <h2 className="catalog-title">
                SHOWING: <span className="text-accent">{selectedFilter.toUpperCase()}</span>
              </h2>
            </div>

            <div className="dest-cards-grid">
              {filteredCorridors.map((item) => (
                <article 
                  key={item.id} 
                  className={`dest-card ${item.id === activeCorridorId ? 'is-selected' : ''}`}
                  onClick={() => setActiveCorridorId(item.id)}
                >
                  <div className="dest-card-frame" style={{ backgroundColor: item.frameColor }}>
                    <div className="dest-card-inner-canvas">
                      <div className="dest-card-img-wrap">
                        <img src={item.image} alt={item.title} className="dest-card-img" loading="lazy" decoding="async" />
                        <div className="dest-card-overlay" />
                        <span className="dest-card-number">#{item.number}</span>
                        <span className="dest-card-region">{item.region}</span>
                      </div>

                      <div className="dest-card-body">
                        <div className="dest-card-meta-top">
                          <span className="dest-diff-tag">+ {item.difficulty}</span>
                          <span className="meta-dot">•</span>
                          <span className="dest-duration">{item.duration}</span>
                        </div>

                        <h3 className="dest-card-title">{item.title}</h3>
                        <p className="dest-card-subtitle">{item.subtitle}</p>

                        {/* Trip Type Badges Pill Row */}
                        <div className="dest-type-pills-row">
                          {item.tripTypes.map(tId => {
                            const tObj = TRIP_TYPES.find(t => t.id === tId);
                            return tObj ? (
                              <span key={tId} className="type-pill-tag">
                                <span>{tObj.title}</span>
                              </span>
                            ) : null;
                          })}
                        </div>

                        <div className="dest-card-specs-row">
                          <div className="spec-box">
                            <span className="spec-label">ALTITUDE</span>
                            <span className="spec-val">{item.elevation}</span>
                          </div>
                          <div className="spec-box">
                            <span className="spec-label">SEASON</span>
                            <span className="spec-val">{item.bestSeason}</span>
                          </div>
                        </div>

                        <div className="dest-card-actions">
                          <button 
                            className="btn btn-dest-inquire"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleBookInquiry(item.region);
                            }}
                          >
                            INQUIRE THIS ROUTE &rarr;
                          </button>
                          <a 
                            href={`https://wa.me/917207681067?text=Hi%2C%20I%20want%20to%20see%20details%20and%20catalog%20for%20${encodeURIComponent(item.title)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-wa-card"
                            onClick={(e) => e.stopPropagation()}
                            title="View on WhatsApp Catalog"
                          >
                            <svg className="wa-icon-sm" viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                              <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.233-1.337a9.96 9.96 0 004.779 1.217h.005c5.506 0 9.989-4.478 9.99-9.984A9.97 9.97 0 0012.012 2zm.005 16.273h-.004a8.27 8.27 0 01-4.218-1.155l-.302-.18-3.13.814-3.076-.197a8.27 8.27 0 01-1.267-4.491c.002-4.57 3.716-8.28 8.291-8.28a8.25 8.25 0 015.86 2.427 8.23 8.23 0 012.424 5.856c-.002 4.57-3.717 8.28-8.291 8.28zm4.542-6.2c-.249-.125-1.472-.726-1.7-.809-.229-.083-.396-.125-.562.125-.166.249-.645.809-.79.975-.146.166-.291.187-.54.062s-1.053-.388-2.006-1.238c-.742-.662-1.243-1.48-1.389-1.73-.146-.249-.015-.384.11-.508.112-.112.249-.291.374-.437.125-.146.166-.249.249-.415.083-.166.042-.312-.021-.437-.062-.125-.562-1.352-.77-1.851-.202-.486-.408-.42-.562-.428l-.479-.009c-.166 0-.437.062-.666.312s-.874.853-.874 2.08.895 2.41 1.02 2.577c.125.166 1.761 2.689 4.267 3.771.596.257 1.061.411 1.424.526.598.19 1.142.163 1.572.099.48-.071 1.472-.602 1.68-1.184.208-.582.208-1.08.146-1.184-.062-.104-.229-.166-.479-.291z"/>
                            </svg>
                            <span>CATALOG</span>
                            <span className="btn-external-arrow" aria-hidden="true">↗</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Floating WhatsApp Quick Access Button */}
      <a 
        href="https://wa.me/c/917207681067" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="wa-floating-badge"
        aria-label="View WhatsApp Catalog"
        title="View WhatsApp Catalog"
      >
        <div className="wa-float-icon-wrap">
          <svg className="wa-icon-float" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
            <path d="M12.012 2c-5.506 0-9.989 4.478-9.99 9.984a9.96 9.96 0 001.333 4.993L2 22l5.233-1.337a9.96 9.96 0 004.779 1.217h.005c5.506 0 9.989-4.478 9.99-9.984A9.97 9.97 0 0012.012 2zm.005 16.273h-.004a8.27 8.27 0 01-4.218-1.155l-.302-.18-3.13.814-3.076-.197a8.27 8.27 0 01-1.267-4.491c.002-4.57 3.716-8.28 8.291-8.28a8.25 8.25 0 015.86 2.427 8.23 8.23 0 012.424 5.856c-.002 4.57-3.717 8.28-8.291 8.28zm4.542-6.2c-.249-.125-1.472-.726-1.7-.809-.229-.083-.396-.125-.562.125-.166.249-.645.809-.79.975-.146.166-.291.187-.54.062s-1.053-.388-2.006-1.238c-.742-.662-1.243-1.48-1.389-1.73-.146-.249-.015-.384.11-.508.112-.112.249-.291.374-.437.125-.146.166-.249.249-.415.083-.166.042-.312-.021-.437-.062-.125-.562-1.352-.77-1.851-.202-.486-.408-.42-.562-.428l-.479-.009c-.166 0-.437.062-.666.312s-.874.853-.874 2.08.895 2.41 1.02 2.577c.125.166 1.761 2.689 4.267 3.771.596.257 1.061.411 1.424.526.598.19 1.142.163 1.572.099.48-.071 1.472-.602 1.68-1.184.208-.582.208-1.08.146-1.184-.062-.104-.229-.166-.479-.291z"/>
          </svg>
        </div>
        <div className="wa-float-text">
          <span className="wa-float-title">WHATSAPP CATALOG</span>
          <span className="wa-float-sub">Browse Live Itineraries</span>
        </div>
      </a>

      <Footer />
    </div>
  );
};

export default DestinationsPage;
