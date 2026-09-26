import React, { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import './DestinationsPage.css';



export type TripTypeCategory = 'weekend' | 'long-expedition' | 'bike-trips' | 'off-beaten';

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
    id: 'kerala',
    number: '01',
    region: 'KERALA',
    title: 'KERALA',
    subtitle: 'Munnar Tea Hills • Wayanad Rainforest • Alleppey Backwaters',
    tripTypes: ['weekend', 'long-expedition'],
    elevation: '8,800 FT / 2,695 M',
    difficulty: 'BEGINNER',
    duration: '6 DAYS / 5 NIGHTS',
    distance: '620 KM',
    bestSeason: 'SEPTEMBER — MARCH',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Misty Ghat Passes, Tea Slopes & Backwater Corridors',
    highlights: [
      'Munnar cloud forest switchbacks & tea estate stays',
      'Wayanad sanctuary rainforest & bamboo forest trails',
      'Traditional Kerala houseboat overnight stay on backwaters',
      'Malabar coast drive & local spice plantation experience'
    ],
    description: 'From misty tea gardens in Munnar to peaceful backwater lagoons, Kerala offers a deep long-tour journey combining high mountain ridges with lush tropical coastlines.',
    image: '/dest_kerala.jpg',
    frameColor: '#7B8C78'
  },
  {
    id: 'ladakh',
    number: '02',
    region: 'LADAKH',
    title: 'LADAKH',
    subtitle: 'Khardung La Pass • Pangong Tso • Nubra Valley',
    tripTypes: ['bike-trips', 'long-expedition'],
    elevation: '17,582 FT / 5,359 M',
    difficulty: 'EXPEDITION',
    duration: '9 DAYS / 8 NIGHTS',
    distance: '1,250 KM',
    bestSeason: 'JUNE — SEPTEMBER',
    squadSize: '4 - 10 RIDERS',
    terrain: 'Cold Desert, High Motorable Passes & Himalayan Scree',
    highlights: [
      'Cross world-famous Khardung La & Chang La high mountain passes',
      'Camp lakeside at turquoise Pangong Tso under starry skies',
      'Sand dune camel safari & monastery valleys in Nubra',
      'Full backup support crew, oxygen backup & satellite comms'
    ],
    description: 'The legendary Trans-Himalayan long expedition. Traverse barren cold desert high passes, ancient cliffside monasteries, and high-altitude lakes.',
    image: '/ladakh.jpg',
    frameColor: '#768C9E'
  },
  {
    id: 'kodaikanal',
    number: '03',
    region: 'KODAIKANAL',
    title: 'KODAIKANAL',
    subtitle: 'Pillar Rocks • Berijam Lake Forest • Pine Reserve',
    tripTypes: ['weekend'],
    elevation: '7,000 FT / 2,133 M',
    difficulty: 'INTERMEDIATE',
    duration: '4 DAYS / 3 NIGHTS',
    distance: '450 KM',
    bestSeason: 'YEAR-ROUND',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Dense Pine Forests, Cliff Views & Shola Mountain Curves',
    highlights: [
      'Ride through towering dense pine forest canopy trails',
      'Panoramic cliffside viewpoints at Pillar Rocks & Coaker’s Walk',
      'Off-grid forest permit routes to secluded Berijam Lake',
      'Cozy heritage cottage stays with campfire evenings'
    ],
    description: 'Known as the Princess of Hill Stations. A misty, pine-scented highland route winding around precipitous cliff vistas and tranquil mountain lakes.',
    image: '/kodai.jpg',
    frameColor: '#4E7063'
  },
  {
    id: 'ooty-coonoor',
    number: '04',
    region: 'OOTY / COONOOR',
    title: 'OOTY / COONOOR',
    subtitle: '36 Hairpin Bend Corridor • Nilgiri Tea Hills • Heritage Ridge',
    tripTypes: ['weekend'],
    elevation: '7,350 FT / 2,240 M',
    difficulty: 'INTERMEDIATE',
    duration: '3 DAYS / 2 NIGHTS',
    distance: '510 KM',
    bestSeason: 'SEPTEMBER — MAY',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Continuous Hairpin Switchbacks & High Tea Slopes',
    highlights: [
      'Day 1: Botanical Garden, Doddabetta Peak & Ooty Lake',
      'Day 2: Pine Forest, Pykara Waterfalls & Shooting Spots',
      'Day 3: Nilgiri Mountain Railway, Sim’s Park & Dolphin’s Nose',
      'Coimbatore Pickup & Drop, Campfire & Meals Included'
    ],
    description: 'A thrilling Nilgiri mountain traverse featuring steep hairpin turns, emerald tea plantations, and cool mountain breezes across Ooty and Coonoor.',
    image: '/ooty.jpg',
    frameColor: '#5C745A'
  },
  {
    id: 'arunachalam-pondicherry',
    number: '05',
    region: 'ARUNACHALAM X PONDICHERRY',
    title: 'ARUNACHALAM X PONDICHERRY',
    subtitle: 'Spiritual Peak Circuit • French Quarter • Coromandel Coast',
    tripTypes: ['weekend'],
    elevation: '2,668 FT / 813 M',
    difficulty: 'BEGINNER',
    duration: '5 DAYS / 4 NIGHTS',
    distance: '580 KM',
    bestSeason: 'OCTOBER — MARCH',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Sacred Hill Routes, Inland Highways & Coastal Promenades',
    highlights: [
      'Girivalam barefoot walk & sunrise views around holy Arunachala Hill',
      'Scenic highway drive connecting ancient temple towns to the coast',
      'French colonial architecture, cafes & coastal bike ride in Pondicherry',
      'Sunset seaside promenade runs along the Coromandel oceanfront'
    ],
    description: 'A unique spiritual-meets-coastal long journey. Transition from the serene energy of Tiruvannamalai (Arunachalam) to the vibrant French Quarter and ocean breeze of Pondicherry.',
    image: '/pondi.jpg',
    frameColor: '#8C5A48'
  },
  {
    id: 'gokarna-dandeli',
    number: '06',
    region: 'GOKARNA & DANDELI',
    title: 'GOKARNA AND DANDELI',
    subtitle: 'Om Beach Cliff Trek • Kali River Rafting • Rainforest Canopy',
    tripTypes: ['weekend'],
    elevation: '1,800 FT / 550 M',
    difficulty: 'INTERMEDIATE',
    duration: '5 DAYS / 4 NIGHTS',
    distance: '680 KM',
    bestSeason: 'OCTOBER — MAY',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Coastal Cliff Roads, Dense Jungle Reserves & River Gorges',
    highlights: [
      'Sunset cliff treks connecting Om Beach, Half Moon & Paradise Beach',
      'White-water rafting and river camping on the roaring Kali River in Dandeli',
      'Dense jungle canopy rides in Anshi Tiger Reserve',
      'Beachside bonfires & fresh local coastal seafood dining'
    ],
    description: 'Where the jungle meets the Arabian Sea. Experience high-octane river rafting in Dandeli’s rainforests followed by relaxed cliff beach sunsets in Gokarna.',
    image: '/gokarna.jpg',
    frameColor: '#3A5C6D'
  },
  {
    id: 'chikmagalur',
    number: '07',
    region: 'CHIKMAGALUR',
    title: 'CHIKMAGALUR',
    subtitle: 'Mullayanagiri Peak • Baba Budangiri • Hebbe Waterfalls',
    tripTypes: [],
    elevation: '6,317 FT / 1,930 M',
    difficulty: 'INTERMEDIATE',
    duration: '4 DAYS / 3 NIGHTS',
    distance: '490 KM',
    bestSeason: 'SEPTEMBER — MAY',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Coffee Estate Roads, Mountain Switchbacks & Dirt Spurs',
    highlights: [
      'Summits Karnataka’s highest peak Mullayanagiri amidst rolling fog',
      'Off-road Jeep & bike trails to hidden Hebbe & Jhari Waterfalls',
      'Private coffee estate stays with bean-to-cup brewing workshops',
      'Scenic ridge rides across Baba Budangiri mountain range'
    ],
    description: 'The birthplace of Indian coffee. Ride up misty high-altitude peaks, navigate coffee plantation dirt tracks, and cool off beneath roaring waterfall cascades.',
    image: '/chick.jpg',
    frameColor: '#7B6852'
  },
  {
    id: 'spiti',
    number: '08',
    region: 'SPITI VALLEY',
    title: 'DESERT MOUNTAIN CIRCUIT',
    subtitle: 'Kunzum Pass • Kaza • Chandratal Moon Lake',
    tripTypes: ['bike-trips'],
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
  }
];

interface DestinationsPageProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  initialFilter?: string;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ onNavigate, initialFilter = 'all' }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCorridorId, setActiveCorridorId] = useState<string>('kerala-weekend');

  React.useEffect(() => {
    if (initialFilter) {
      setSelectedFilter(initialFilter);
    }
  }, [initialFilter]);

  const filteredCorridors = DESTINATION_CORRIDORS.filter(c => {
    const matchesCategory = selectedFilter === 'all' || c.tripTypes.includes(selectedFilter as TripTypeCategory);
    if (!matchesCategory) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    return (
      c.title.toLowerCase().includes(q) ||
      c.region.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.terrain.toLowerCase().includes(q) ||
      c.difficulty.toLowerCase().includes(q) ||
      c.duration.toLowerCase().includes(q) ||
      c.highlights.some(h => h.toLowerCase().includes(q))
    );
  });

  return (
    <div className="destinations-page-wrapper">
      <Header onNavigate={onNavigate} currentRoute="destinations" />

      <main className="destinations-page-main">




        {/* Category Filter Tabs & Search Bar */}
        <section className="dest-filter-section">
          <div className="container">
            {/* Live Inline Search Bar */}
            <div className="dest-search-inline-wrap">
              <svg className="inline-search-icon" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              <input
                type="text"
                className="dest-inline-search-input"
                placeholder="Search trip routes by name, region, pass or keyword (e.g. Munnar, Spiti, Waterfall, Kerala)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  className="dest-inline-clear-btn" 
                  onClick={() => setSearchQuery('')}
                  title="Clear search filter"
                >
                  ✕ CLEAR SEARCH
                </button>
              )}
            </div>

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
              <span className="text-meta">DESTINATIONS</span>
              <h2 className="catalog-title">
                SHOWING: <span className="text-accent">{selectedFilter.toUpperCase()}</span>
              </h2>
            </div>

            {filteredCorridors.length === 0 ? (
              <div className="dest-empty-launch-banner">
                <span className="launch-badge">STATUS: YET TO LAUNCH</span>
                <h3 className="launch-title">UNSCRIPTED OFF-BEATEN ROUTES LAUNCHING SOON</h3>
                <p className="launch-desc">
                  Our scouts are currently mapping untouched valley trails, cliffside monasteries, and wild backcountry camping runs across India. Official 2026/27 Off-Beaten route drops will be announced directly on our WhatsApp scout desk.
                </p>
                <a 
                  href="https://wa.me/917207681067?text=Hi%20Backpackers%20Destinations%2C%20notify%20me%20when%20Off-Beaten%20routes%20launch!" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-launch-notify"
                >
                  <span>NOTIFY ME ON WHATSAPP SCOUT DESK &rarr;</span>
                </a>
              </div>
            ) : (
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
                            <span className="dest-diff-tag">{item.difficulty}</span>
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
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>


      </main>

      <Footer />
    </div>
  );
};

export default DestinationsPage;
