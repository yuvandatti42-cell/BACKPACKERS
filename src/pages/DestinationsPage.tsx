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
  const [activeCorridorId, setActiveCorridorId] = useState<string>('kerala-weekend');

  React.useEffect(() => {
    if (initialFilter) {
      setSelectedFilter(initialFilter);
    }
  }, [initialFilter]);

  const filteredCorridors = DESTINATION_CORRIDORS.filter(c => {
    let matchesCategory = selectedFilter === 'all';
    if (!matchesCategory) {
      if (selectedFilter === 'south-india') {
        matchesCategory = c.landscapeZone === 'South India' || c.region.toLowerCase().includes('south');
      } else if (selectedFilter === 'north-india') {
        matchesCategory = c.landscapeZone === 'North India & Ladakh' || c.region.toLowerCase().includes('north');
      } else if (selectedFilter === 'ladakh') {
        matchesCategory = c.region.toLowerCase().includes('ladakh') || c.id === 'ladakh';
      } else if (selectedFilter === 'north-east') {
        matchesCategory = c.region.toLowerCase().includes('east') || c.tripTypes.includes('off-beaten');
      } else {
        matchesCategory = 
          c.tripTypes.includes(selectedFilter as TripTypeCategory) ||
          c.region.toLowerCase().includes(selectedFilter.toLowerCase()) ||
          c.keywords.some(k => k.toLowerCase() === selectedFilter.toLowerCase());
      }
    }

    return matchesCategory;
  });

  return (
    <div className="destinations-page-wrapper">
      <Header onNavigate={onNavigate} currentRoute="destinations" />

      <main className="destinations-page-main">




        {/* Category Filter Tabs */}
        <section className="dest-filter-section">
          <div className="container">
            {/* Animated Mobile Bike Rider Mascot Track */}
            <div className="dest-mobile-rider-lane" aria-hidden="true">
              <div className="dest-mobile-rider-track" />
              <div className="dest-mobile-rider-mover">
                <TravellerCharacterSVG isMoving={true} />
              </div>
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
                {filteredCorridors.map((item) => {
                  const formatDurationShort = (durationStr: string): string => {
                    if (!durationStr) return '';
                    const match = durationStr.match(/(\d+)\s*DAYS?\s*\/\s*(\d+)\s*NIGHTS?/i);
                    if (match) {
                      return `${match[1]}D/${match[2]}N`;
                    }
                    const daysOnly = durationStr.match(/(\d+)\s*DAYS?/i);
                    if (daysOnly) {
                      return `${daysOnly[1]}D`;
                    }
                    return durationStr;
                  };

                  const durationShort = formatDurationShort(item.duration);

                  return (
                    <article 
                      key={item.id} 
                      className={`dest-card ${item.id === activeCorridorId ? 'is-selected' : ''}`}
                      onClick={() => {
                        setActiveCorridorId(item.id);
                        if (onNavigate) {
                          onNavigate(`destination:${item.id}`);
                        } else if (onOpenBookModal) {
                          onOpenBookModal(item.title);
                        }
                      }}
                    >
                      <div className="dest-card-frame" style={{ backgroundColor: item.frameColor }}>
                        <div className="dest-card-inner-canvas">
                          <div className="dest-card-img-wrap">
                            <img src={item.image} alt={item.title} className="dest-card-img" loading="lazy" decoding="async" />
                          </div>

                          <div className="dest-card-body">
                            <h3 className="dest-card-title">
                              {item.title} {durationShort}
                            </h3>
                            <div className="dest-card-price-row">
                              <span className="price-label">from</span>
                              <span className="price-val">{item.startingPrice}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}
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
