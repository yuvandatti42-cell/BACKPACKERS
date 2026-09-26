import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { CATEGORIES_DATA } from '../data/categoriesData';
import { EXPEDITIONS_DATA } from '../data/expeditionsData';
import { DESTINATION_CORRIDORS } from './DestinationsPage';
import { KeralaCatalogModal } from '../components/KeralaCatalogModal/KeralaCatalogModal';
import { OotyCatalogModal } from '../components/OotyCatalogModal/OotyCatalogModal';
import './RegionExplorePage.css';

interface RegionExplorePageProps {
  regionId: string;
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
}

interface ConsolidatedTrip {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  regionId: string;
  regionName: string;
  difficulty: string;
  duration: string;
  distance: string;
  elevation: string;
  bestSeason: string;
  price?: string;
  terrain: string;
  highlights: string[];
  description: string;
  image: string;
  frameColor: string;
  category?: string;
}

export const RegionExplorePage: React.FC<RegionExplorePageProps> = ({ regionId, onNavigate }) => {
  const [activeRegionId, setActiveRegionId] = useState<string>(regionId);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modal states
  const [isKeralaModalOpen, setIsKeralaModalOpen] = useState<boolean>(false);
  const [isOotyModalOpen, setIsOotyModalOpen] = useState<boolean>(false);
  const [activeDetailTrip, setActiveDetailTrip] = useState<ConsolidatedTrip | null>(null);

  useEffect(() => {
    setActiveRegionId(regionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [regionId]);

  // Current selected region metadata
  const currentCategory = CATEGORIES_DATA.find(c => c.id === activeRegionId) || CATEGORIES_DATA[0];

  // Helper to map regionId to matching region names / categories
  const getRegionMatches = (regId: string): string[] => {
    switch (regId) {
      case 'ladakh':
        return ['ladakh', 'ladakh trips', 'leh'];
      case 'south-india':
        return ['south-india', 'south india', 'kerala', 'kodaikanal', 'ooty', 'arunachalam', 'gokarna', 'chikmagalur'];
      case 'north-india':
        return ['north-india', 'north india', 'spiti', 'uttarakhand', 'himachal'];
      case 'north-east':
        return ['north-east', 'north east', 'meghalaya', 'arunachal', 'tawang'];
      default:
        return [regId.toLowerCase()];
    }
  };

  const matches = getRegionMatches(activeRegionId);

  // Consolidate trips from EXPEDITIONS_DATA and DESTINATION_CORRIDORS
  const rawTrips: ConsolidatedTrip[] = [];

  // 1. From EXPEDITIONS_DATA
  EXPEDITIONS_DATA.forEach(exp => {
    const isMatch = matches.some(m => 
      exp.regionCategory.toLowerCase().includes(m) ||
      exp.regionLabel.toLowerCase().includes(m) ||
      exp.destination.toLowerCase().includes(m)
    );

    if (isMatch) {
      rawTrips.push({
        id: exp.id,
        number: exp.number,
        title: exp.title,
        subtitle: exp.verticalLabel,
        regionId: exp.regionCategory,
        regionName: exp.regionLabel,
        difficulty: exp.difficulty,
        duration: exp.duration,
        distance: exp.distance || '500+ KM',
        elevation: exp.maxAltitude || 'N/A',
        bestSeason: exp.bestSeason || 'Year-Round',
        price: exp.price,
        terrain: exp.description ? exp.description.split('.')[0] : 'Mountain terrain & backcountry trails',
        highlights: exp.highlights || [],
        description: exp.description || '',
        image: exp.image,
        frameColor: exp.frameColor,
        category: exp.category
      });
    }
  });

  // 2. Also check DESTINATION_CORRIDORS for any missing rich details
  DESTINATION_CORRIDORS.forEach(corridor => {
    const isMatch = matches.some(m => 
      corridor.region.toLowerCase().includes(m) ||
      corridor.id.toLowerCase().includes(m)
    );

    if (isMatch && !rawTrips.some(t => t.id === corridor.id || t.title.toLowerCase() === corridor.title.toLowerCase())) {
      rawTrips.push({
        id: corridor.id,
        number: corridor.number,
        title: corridor.title,
        subtitle: corridor.subtitle,
        regionId: activeRegionId,
        regionName: corridor.region,
        difficulty: corridor.difficulty,
        duration: corridor.duration,
        distance: corridor.distance,
        elevation: corridor.elevation,
        bestSeason: corridor.bestSeason,
        price: corridor.id === 'ooty-coonoor' ? '₹6,999' : corridor.id === 'kerala' ? '₹28,500' : '₹24,000',
        terrain: corridor.terrain,
        highlights: corridor.highlights,
        description: corridor.description,
        image: corridor.image,
        frameColor: corridor.frameColor
      });
    }
  });

  // Filter trips by difficulty & search query
  const filteredTrips = rawTrips.filter(trip => {
    const matchesDiff = selectedDifficulty === 'all' || trip.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
    if (!matchesDiff) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    return (
      trip.title.toLowerCase().includes(q) ||
      trip.subtitle.toLowerCase().includes(q) ||
      trip.description.toLowerCase().includes(q) ||
      trip.highlights.some(h => h.toLowerCase().includes(q))
    );
  });

  const handleOpenTripDetails = (trip: ConsolidatedTrip) => {
    if (trip.id === 'kerala' || trip.id === 'tour-kerala') {
      setIsKeralaModalOpen(true);
    } else if (trip.id === 'ooty-coonoor' || trip.id === 'tour-ooty-coonoor') {
      setIsOotyModalOpen(true);
    } else {
      setActiveDetailTrip(trip);
    }
  };

  // Derive region hero metrics
  const totalTripsCount = rawTrips.length;
  const maxAltitudeStr = rawTrips.find(t => t.elevation && t.elevation !== 'N/A')?.elevation || '17,582 FT / 5,359 M';
  const bestSeasonStr = currentCategory.id === 'ladakh' ? 'JUNE — SEPTEMBER' : currentCategory.id === 'south-india' ? 'SEPTEMBER — MAY' : currentCategory.id === 'north-india' ? 'JUNE — OCTOBER' : 'OCTOBER — APRIL';

  return (
    <div className="region-explore-wrapper">
      <Header onNavigate={onNavigate} currentRoute={`region:${activeRegionId}`} />

      <main className="region-explore-main">
        
        {/* Dynamic Cinematic Hero Section */}
        <section className="region-hero-section">
          <div 
            className="region-hero-bg" 
            style={{ backgroundImage: `url(${currentCategory.image})` }}
          >
            <div className="region-hero-overlay" />
          </div>

          <div className="container region-hero-container">
            
            {/* Breadcrumb Navigation */}
            <div className="region-breadcrumb">
              <button onClick={() => onNavigate ? onNavigate('home') : window.location.hash = 'hero'} className="bc-link">
                HOME
              </button>
              <span className="bc-sep">/</span>
              <button onClick={() => onNavigate ? onNavigate('home', 'destinations-section') : window.location.hash = 'destinations-section'} className="bc-link">
                ROUTE EXPLORATION
              </button>
              <span className="bc-sep">/</span>
              <span className="bc-current">{currentCategory.title}</span>
            </div>

            <div className="region-hero-badge">
              <span className="region-num">CORRIDOR #{currentCategory.number}</span>
              <span className="live-dot" />
              <span className="status-text">OFFICIAL EXPLORATION PAGE</span>
            </div>

            <h1 className="region-hero-title">{currentCategory.title}</h1>
            <p className="region-hero-desc">{currentCategory.description}</p>

            {/* Region Key Stats Bar */}
            <div className="region-stats-grid">
              <div className="region-stat-box">
                <span className="stat-label">EXPLORATION ROUTES</span>
                <span className="stat-val">{totalTripsCount} EXPEDITIONS</span>
              </div>
              <div className="region-stat-box">
                <span className="stat-label">MAX ELEVATION</span>
                <span className="stat-val">{maxAltitudeStr}</span>
              </div>
              <div className="region-stat-box">
                <span className="stat-label">BEST SEASON</span>
                <span className="stat-val">{bestSeasonStr}</span>
              </div>
              <div className="region-stat-box">
                <span className="stat-label">SUPPORT TEAM</span>
                <span className="stat-val">FULL SCOUT & SATELLITE</span>
              </div>
            </div>

          </div>
        </section>

        {/* Filter & Live Search Toolbar */}
        <section className="region-filter-toolbar">
          <div className="container">
            <div className="toolbar-flex">
              
              {/* Search Field */}
              <div className="region-search-wrap">
                <svg className="search-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input 
                  type="text" 
                  className="region-search-input"
                  placeholder={`Search ${currentCategory.title} by pass, waterfall, or route...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button className="clear-search-btn" onClick={() => setSearchQuery('')}>✕</button>
                )}
              </div>

              {/* Difficulty Filter Buttons */}
              <div className="difficulty-pills">
                <span className="diff-label">DIFFICULTY:</span>
                {['all', 'beginner', 'intermediate', 'advanced', 'expedition'].map(diff => (
                  <button 
                    key={diff}
                    className={`diff-pill ${selectedDifficulty === diff ? 'is-active' : ''}`}
                    onClick={() => setSelectedDifficulty(diff)}
                  >
                    {diff.toUpperCase()}
                  </button>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* Region Trips Catalog Grid */}
        <section className="region-catalog-section">
          <div className="container">
            <div className="catalog-header-bar">
              <span className="meta-headline">
                SHOWING <strong className="text-accent">{filteredTrips.length}</strong> EXPEDITION ROUTES FOR {currentCategory.title}
              </span>
            </div>

            {filteredTrips.length === 0 ? (
              <div className="region-empty-card">
                <h3>NO MATCHING ROUTES FOUND</h3>
                <p>No trips match your search filters for {currentCategory.title}. Try clearing the search or changing difficulty filters.</p>
                <button 
                  className="btn btn-reset-filters" 
                  onClick={() => { setSearchQuery(''); setSelectedDifficulty('all'); }}
                >
                  RESET FILTERS
                </button>
              </div>
            ) : (
              <div className="region-trips-grid">
                {filteredTrips.map((trip) => (
                  <article key={trip.id} className="region-trip-card">
                    
                    {/* Poster Frame */}
                    <div className="region-card-poster" style={{ backgroundColor: trip.frameColor }}>
                      <div className="poster-media">
                        <img 
                          src={trip.image} 
                          alt={trip.title} 
                          className="poster-img"
                          loading="lazy"
                        />
                        <div className="poster-gradient" />
                        <span className="poster-number">#{trip.number}</span>
                        <span className="poster-region-tag">{trip.regionName}</span>
                      </div>
                    </div>

                    {/* Card Body Information */}
                    <div className="region-card-content">
                      <div className="card-top-badges">
                        <span className="diff-badge">{trip.difficulty}</span>
                        <span className="meta-dot">•</span>
                        <span className="duration-badge">{trip.duration}</span>
                        <span className="meta-dot">•</span>
                        <span className="distance-badge">{trip.distance}</span>
                      </div>

                      <h2 className="trip-card-title">{trip.title}</h2>
                      <p className="trip-card-subtitle">{trip.subtitle}</p>
                      
                      <p className="trip-card-desc">{trip.description}</p>

                      {/* Specs Row */}
                      <div className="trip-specs-strip">
                        <div className="spec-item">
                          <span className="label">ALTITUDE</span>
                          <span className="val">{trip.elevation}</span>
                        </div>
                        <div className="spec-item">
                          <span className="label">BEST SEASON</span>
                          <span className="val">{trip.bestSeason}</span>
                        </div>
                        {trip.price && (
                          <div className="spec-item price-item">
                            <span className="label">PACKAGE PRICE</span>
                            <span className="val price-val">{trip.price}</span>
                          </div>
                        )}
                      </div>

                      {/* Highlights */}
                      {trip.highlights.length > 0 && (
                        <div className="trip-highlights-box">
                          <span className="hl-header">EXPEDITION HIGHLIGHTS:</span>
                          <ul className="hl-list">
                            {trip.highlights.map((hl, i) => (
                              <li key={i}>
                                <span className="hl-arrow">&rarr;</span>
                                <span>{hl}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Card Action Buttons */}
                      <div className="trip-card-actions">
                        <a 
                          href={`https://wa.me/917207681067?text=${encodeURIComponent(`Hi Backpackers Destinations! I would like to inquire about the ${trip.title} (${trip.duration}) route in ${currentCategory.title}.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-card-whatsapp"
                        >
                          <span>BOOK VIA WHATSAPP</span>
                          <span className="btn-icon">&rarr;</span>
                        </a>

                        <button 
                          className="btn-card-details"
                          onClick={() => handleOpenTripDetails(trip)}
                        >
                          <span>EXPLORE ITINERARY &amp; CATALOG</span>
                          <span className="btn-icon">↗</span>
                        </button>
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

      {/* Catalog Modals */}
      <KeralaCatalogModal 
        isOpen={isKeralaModalOpen} 
        onClose={() => setIsKeralaModalOpen(false)} 
      />

      <OotyCatalogModal 
        isOpen={isOotyModalOpen} 
        onClose={() => setIsOotyModalOpen(false)} 
      />

      {/* Custom Detail Modal for non-Kerala/Ooty trips */}
      {activeDetailTrip && (
        <div className="trip-detail-modal-overlay" onClick={() => setActiveDetailTrip(null)} role="dialog" aria-modal="true">
          <div className="trip-detail-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="detail-modal-close" onClick={() => setActiveDetailTrip(null)}>✕</button>

            <div className="detail-modal-header" style={{ backgroundImage: `url(${activeDetailTrip.image})` }}>
              <div className="detail-header-overlay" />
              <span className="detail-region-tag"># {activeDetailTrip.number} • {activeDetailTrip.regionName}</span>
              <h2 className="detail-header-title">{activeDetailTrip.title}</h2>
              <p className="detail-header-sub">{activeDetailTrip.subtitle}</p>
            </div>

            <div className="detail-modal-body">
              <div className="detail-specs-bar">
                <div className="d-spec">
                  <span className="d-label">DURATION</span>
                  <span className="d-val">{activeDetailTrip.duration}</span>
                </div>
                <div className="d-spec">
                  <span className="d-label">DISTANCE</span>
                  <span className="d-val">{activeDetailTrip.distance}</span>
                </div>
                <div className="d-spec">
                  <span className="d-label">MAX ALTITUDE</span>
                  <span className="d-val">{activeDetailTrip.elevation}</span>
                </div>
                <div className="d-spec">
                  <span className="d-label">DIFFICULTY</span>
                  <span className="d-val diff-highlight">{activeDetailTrip.difficulty}</span>
                </div>
                {activeDetailTrip.price && (
                  <div className="d-spec">
                    <span className="d-label">STARTING PRICE</span>
                    <span className="d-val price-highlight">{activeDetailTrip.price}</span>
                  </div>
                )}
              </div>

              <div className="detail-section">
                <h3>ROUTE OVERVIEW</h3>
                <p>{activeDetailTrip.description}</p>
              </div>

              {activeDetailTrip.highlights.length > 0 && (
                <div className="detail-section">
                  <h3>KEY HIGHLIGHTS &amp; STOPS</h3>
                  <ul className="modal-hl-list">
                    {activeDetailTrip.highlights.map((hl, i) => (
                      <li key={i}>
                        <span className="hl-bullet">✦</span>
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="detail-section">
                <h3>SUPPORT &amp; INCLUSIONS</h3>
                <div className="inclusions-grid">
                  <div className="inc-pill">✓ Dedicated Lead Expedition Captain</div>
                  <div className="inc-pill">✓ Backup Vehicle &amp; Luggage Truck</div>
                  <div className="inc-pill">✓ Oxygen Cylinder &amp; First Aid Support</div>
                  <div className="inc-pill">✓ Satellite Comms &amp; GPS Tracking</div>
                  <div className="inc-pill">✓ Stays, Campfires &amp; Selected Meals</div>
                </div>
              </div>

              <div className="detail-modal-actions">
                <a 
                  href={`https://wa.me/917207681067?text=${encodeURIComponent(`Hi Backpackers Destinations, I want to book the ${activeDetailTrip.title} (${activeDetailTrip.duration}) trip.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-modal-book"
                >
                  <span>BOOK THIS EXPEDITION ON WHATSAPP &rarr;</span>
                </a>

                <a 
                  href="https://gearstation.co" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-modal-gear"
                >
                  <span>GET RIDING GEAR AT GEAR STATION ↗</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RegionExplorePage;
