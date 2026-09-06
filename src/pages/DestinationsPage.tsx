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
    image: '/type_weekend.jpg',
    description: 'Fast-paced mountain ridge runs, rainforest switchback loops, and coastal getaways designed for riders with limited time.',
    durationRange: '2 — 3 DAYS'
  },
  {
    id: 'long-expedition',
    title: 'LONG EXPEDITION',
    subtitle: '6–14 Day Deep Overlands',
    badgeText: 'FULL TRANSIT',
    image: '/type_expedition.jpg',
    description: 'Multi-day endurance runs crossing 17,000+ ft passes, cold desert plateaus, and trans-continental mountain frontiers.',
    durationRange: '6 — 14 DAYS'
  },
  {
    id: 'bike-trips',
    title: 'BIKE TRIPS',
    subtitle: 'Motorcycle & MTB Traverses',
    badgeText: 'TWO-WHEEL FREEDOM',
    image: '/type_biketrip.jpg',
    description: 'Scouted two-wheeler routes with dedicated mechanic support, backup luggage trucks, and satellite communications.',
    durationRange: '3 — 10 DAYS'
  },
  {
    id: 'off-beaten',
    title: 'OFF BEATEN PLACES',
    subtitle: 'Raw Backcountry Routes',
    badgeText: '100% UNSCRIPTED',
    image: '/type_offbeaten.jpg',
    description: 'Untouched valley trails, cliffside monasteries, river nullah crossings, and wild lake camping far from tourist buses.',
    durationRange: '4 — 12 DAYS'
  },
  {
    id: 'private',
    title: 'PRIVATE TRIPS',
    subtitle: 'Bespoke Custom Squads',
    badgeText: 'TAILORED LOGISTICS',
    image: '/type_private.jpg',
    description: 'Exclusive private group runs tailored to your exact schedule, vehicle preferences, squad size, and difficulty level.',
    durationRange: 'CUSTOM RUNS'
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
    id: 'ladakh',
    number: '01',
    region: 'LADAKH',
    title: 'TRANS-HIMALAYAN HIGH PASSES',
    subtitle: 'Khardung La • Chang La • Zanskar Valley Corridor',
    tripTypes: ['long-expedition', 'bike-trips', 'off-beaten'],
    elevation: '17,582 FT / 5,359 M',
    difficulty: 'ADVANCED',
    duration: '8 DAYS / 7 NIGHTS',
    distance: '1,200 KM',
    bestSeason: 'JUNE — SEPTEMBER',
    squadSize: '6 - 10 RIDERS',
    terrain: 'Glacial Scree, High Passes & Dry Alpine Valleys',
    highlights: [
      'Scale 3 of the world’s highest motorable mountain passes',
      'Traverse barren cold desert plateau of More Plains',
      'Wild camping beside remote high-altitude salt lakes',
      'Navigating deep river crossings in Nubra & Shyok Valleys'
    ],
    description: 'A legendary overland expedition through the roof of India. Negotiate razor-thin mountain passes, navigate boulder-strewn glacial rivers, and ride along the surreal high-altitude lakes of Ladakh.',
    image: '/ladakh.jpg',
    frameColor: '#768C9E'
  },
  {
    id: 'nepal',
    number: '02',
    region: 'NEPAL',
    title: 'MUSTANG DIRT CORRIDOR & FRONTIERS',
    subtitle: 'Annapurna Circuit • Muktinath • Jomsom Trail',
    tripTypes: ['long-expedition', 'off-beaten', 'bike-trips'],
    elevation: '14,100 FT / 4,300 M',
    difficulty: 'INTERMEDIATE',
    duration: '6 DAYS / 5 NIGHTS',
    distance: '850 KM',
    bestSeason: 'OCTOBER — MAY',
    squadSize: '4 - 8 RIDERS',
    terrain: 'Deep Canyon Tracks, Suspension Bridges & Cliff Trails',
    highlights: [
      'Riding beneath 8,000m giant peaks of Dhaulagiri & Annapurna',
      'Cross the famous suspension bridges of Kali Gandaki gorge',
      'Explore ancient Tibetan Buddhist monasteries & cliff caves',
      'Raw Himalayan dirt tracks through Mustang forbidden valley'
    ],
    description: 'An unscripted journey into the rain-shadow territory of Upper Mustang. Ride along cliff-carved trails through the deepest gorge on Earth under giant Himalayan summits.',
    image: '/nep.jpg',
    frameColor: '#BC5F44'
  },
  {
    id: 'kerala-weekend',
    number: '03',
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
    number: '04',
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
    number: '05',
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
    number: '06',
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
    number: '07',
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
  const [activeCorridorId, setActiveCorridorId] = useState<string>('ladakh');

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
                return (
                  <div 
                    key={type.id}
                    className={`trip-type-card ${isActive ? 'is-active' : ''}`}
                    onClick={() => setSelectedFilter(type.id)}
                  >
                    <div className="type-card-media-wrap">
                      <img src={type.image} alt={type.title} className="type-card-img" />
                      <div className="type-card-overlay" />
                      <span className="type-badge">{type.badgeText}</span>
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
                  <img src={t.image} alt="" className="filter-thumb-img" />
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
                    <div className="dest-card-img-wrap">
                      <img src={item.image} alt={item.title} className="dest-card-img" loading="lazy" />
                      <div className="dest-card-overlay" />
                      <span className="dest-card-number">#{item.number}</span>
                      <span className="dest-card-region">{item.region}</span>
                    </div>
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
                            <img src={tObj.image} alt="" className="pill-thumb-img" />
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

                    <p className="dest-card-desc">{item.description}</p>

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
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>



        {/* Bottom Contact Banner CTA */}
        <section className="dest-cta-banner">
          <div className="container">
            <div className="dest-cta-card">
              <div className="cta-left">
                <span className="text-meta cta-eyebrow">+ PRIVATE &amp; CUSTOM EXPEDITIONS</span>
                <h2 className="cta-title">PLAN YOUR PRIVATE SQUADRON RUN</h2>
                <p className="cta-desc">
                  Looking for a Private Trip or specialized Bike Run? Our scouting desk handles custom route clearances, private mechanic escorts, and bespoke expedition logistics.
                </p>
              </div>
              <div className="cta-right">
                <button 
                  className="btn btn-primary cta-btn"
                  onClick={() => handleBookInquiry('Custom')}
                >
                  CONTACT SCOUTING DESK &rarr;
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DestinationsPage;
