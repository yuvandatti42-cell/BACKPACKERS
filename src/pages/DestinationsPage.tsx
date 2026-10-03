import React, { useState } from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { TravellerCharacterSVG } from '../components/TravellerTransition/TravellerCharacterSVG';
import './DestinationsPage.css';



import { 
  DESTINATION_CORRIDORS, 
  TRIP_TYPES, 
  CorridorDetail, 
  TripTypeCategory, 
  TripTypeInfo 
} from '../data/destinationsData';

export type { CorridorDetail, TripTypeCategory, TripTypeInfo };
export { DESTINATION_CORRIDORS, TRIP_TYPES };

interface DestinationsPageProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  initialFilter?: string;
  onOpenBookModal?: (title?: string) => void;
}

export const DestinationsPage: React.FC<DestinationsPageProps> = ({ 
  onNavigate, 
  initialFilter = 'all',
  onOpenBookModal
}) => {
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
            {/* Animated Mobile Bike Rider Mascot Track */}
            <div className="dest-mobile-rider-lane" aria-hidden="true">
              <div className="dest-mobile-rider-track" />
              <div className="dest-mobile-rider-mover">
                <TravellerCharacterSVG isMoving={true} />
              </div>
            </div>

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
                  Our scouts are currently mapping untouched valley trails, cliffside monasteries, and wild backcountry camping runs across India. Official 2026/27 Off-Beaten route drops will be announced soon.
                </p>
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

                          <div className="dest-card-title-row">
                            <h3 className="dest-card-title">{item.title}</h3>
                            <div className="dest-card-price-tag">
                              <span className="price-tag-label">STARTING PRICE</span>
                              <span className="price-tag-val">{item.startingPrice}</span>
                            </div>
                          </div>
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
                            <button
                              type="button"
                              className="btn-card-book-now"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenBookModal) onOpenBookModal(item.title);
                              }}
                            >
                              BOOK NOW
                            </button>
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
