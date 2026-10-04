import React, { useState, useEffect, useRef } from 'react';
import { DESTINATION_CORRIDORS, CorridorDetail, TripTypeCategory } from '../../data/destinationsData';
import './TripSearchModal.css';

interface TripSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  onOpenBookModal?: (title?: string) => void;
}

const LANDSCAPE_ZONES = [
  'All Regions',
  'South India',
  'North India & Ladakh'
];

const TRIP_STYLES = [
  { id: 'all', label: 'All Styles' },
  { id: 'weekend', label: 'Weekend Escapes' },
  { id: 'long-expedition', label: 'Long Expedition' },
  { id: 'bike-trips', label: 'Bike Trips' }
];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'budget', label: 'Under ₹10,000' },
  { id: 'premium', label: 'Overlands (₹10,000+)' }
];

const DURATION_RANGES = [
  { id: 'all', label: 'All Durations' },
  { id: 'short', label: 'Short (2–4 Days)' },
  { id: 'medium', label: 'Medium (5–7 Days)' },
  { id: 'long', label: 'Long (8+ Days)' }
];

const POPULAR_QUICK_SEARCHES = [
  { label: '🔥 All Routes', query: '' },
  { label: '🌴 Kerala', query: 'Kerala' },
  { label: '🏔 Ladakh', query: 'Ladakh' },
  { label: '☕ Chikmagalur', query: 'Chikmagalur' },
  { label: '🏕 Spiti Valley', query: 'Spiti' },
  { label: '🌊 Gokarna', query: 'Gokarna' },
  { label: '🌲 Kodaikanal / Ooty', query: 'Ooty' },
  { label: '🏍 Bike Trips', query: 'bike' }
];

const TYPEWRITER_PROMPTS = [
  "Search by destination, pass, or keyword (e.g. Munnar, Spiti, Rafting)...",
  "Search for Munnar Tea Passes & Wayanad Rainforest...",
  "Search for Ladakh, Khardung La & Pangong Tso...",
  "Search for South India or North India & Ladakh...",
  "Search by budget: Under ₹10k or ₹10k+ Overlands...",
  "Search for Gokarna Beach & Dandeli River Rafting...",
  "Search for Spiti Valley Desert Mountain Circuit...",
  "Search for Ooty 36 Hairpin Bends & Kodaikanal Pine Trails..."
];

export const TripSearchModal: React.FC<TripSearchModalProps> = ({ 
  isOpen, 
  onClose, 
  onNavigate,
  onOpenBookModal 
}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedLandscape, setSelectedLandscape] = useState<string>('All Regions');
  const [selectedStyle, setSelectedStyle] = useState<string>('all');
  const [selectedPrice, setSelectedPrice] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [showFilterDrawer, setShowFilterDrawer] = useState<boolean>(false);
  const [placeholderText, setPlaceholderText] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  // Typewriter effect for search input placeholder
  useEffect(() => {
    if (!isOpen) return;

    let promptIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeEffect = () => {
      const currentPrompt = TYPEWRITER_PROMPTS[promptIndex];

      if (isDeleting) {
        charIndex--;
        setPlaceholderText(currentPrompt.substring(0, charIndex));
        if (charIndex === 0) {
          isDeleting = false;
          promptIndex = (promptIndex + 1) % TYPEWRITER_PROMPTS.length;
          timeoutId = setTimeout(typeEffect, 400);
          return;
        }
        timeoutId = setTimeout(typeEffect, 25);
      } else {
        charIndex++;
        setPlaceholderText(currentPrompt.substring(0, charIndex));
        if (charIndex === currentPrompt.length) {
          isDeleting = true;
          timeoutId = setTimeout(typeEffect, 2400);
          return;
        }
        timeoutId = setTimeout(typeEffect, 50);
      }
    };

    timeoutId = setTimeout(typeEffect, 150);
    return () => clearTimeout(timeoutId);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      resetAllFilters();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const resetAllFilters = () => {
    setSearchTerm('');
    setSelectedLandscape('All Regions');
    setSelectedStyle('all');
    setSelectedPrice('all');
    setSelectedDuration('all');
    setShowFilterDrawer(false);
  };

  if (!isOpen) return null;

  const query = searchTerm.toLowerCase().trim();

  // Multi-factor filtering over DESTINATION_CORRIDORS
  const filteredTrips: CorridorDetail[] = DESTINATION_CORRIDORS.filter((trip) => {
    // 1. Text Search Filter
    if (query) {
      const matchTitle = trip.title.toLowerCase().includes(query);
      const matchSub = (trip.subtitle || '').toLowerCase().includes(query);
      const matchRegion = trip.region.toLowerCase().includes(query);
      const matchLandscape = trip.landscapeZone.toLowerCase().includes(query);
      const matchDesc = trip.description.toLowerCase().includes(query);
      const matchTerrain = trip.terrain.toLowerCase().includes(query);
      const matchElevation = trip.elevation.toLowerCase().includes(query);
      const matchPrice = trip.startingPrice.toLowerCase().includes(query);
      const matchDifficulty = trip.difficulty.toLowerCase().includes(query);
      const matchHighlights = trip.highlights.some(h => h.toLowerCase().includes(query));
      const matchKeywords = trip.keywords.some(k => k.toLowerCase().includes(query));

      const textMatches = 
        matchTitle || matchSub || matchRegion || matchLandscape ||
        matchDesc || matchTerrain || matchElevation || matchPrice ||
        matchDifficulty || matchHighlights || matchKeywords;

      if (!textMatches) return false;
    }

    // 2. Landscape Zone Area Filter
    if (selectedLandscape !== 'All Regions') {
      if (trip.landscapeZone !== selectedLandscape) return false;
    }

    // 3. Trip Style / Category Filter
    if (selectedStyle !== 'all') {
      if (!trip.tripTypes.includes(selectedStyle as TripTypeCategory)) return false;
    }

    // 4. Price Filter
    if (selectedPrice !== 'all') {
      if (selectedPrice === 'budget' && trip.numericPrice > 10000) return false;
      if (selectedPrice === 'premium' && trip.numericPrice <= 10000) return false;
    }

    // 5. Duration Filter
    if (selectedDuration !== 'all') {
      if (selectedDuration === 'short' && trip.durationDays > 4) return false;
      if (selectedDuration === 'medium' && (trip.durationDays < 5 || trip.durationDays > 7)) return false;
      if (selectedDuration === 'long' && trip.durationDays < 8) return false;
    }

    return true;
  });

  const handleCardClick = (destId: string) => {
    onClose();
    if (onNavigate) {
      onNavigate(`destination:${destId}`);
    } else {
      window.location.hash = `destination/${destId}`;
    }
  };

  const handleBookClick = (e: React.MouseEvent, tripTitle: string) => {
    e.stopPropagation();
    onClose();
    if (onOpenBookModal) {
      onOpenBookModal(tripTitle);
    } else {
      window.location.hash = 'destinations';
    }
  };

  const activeFilterCount = 
    (selectedLandscape !== 'All Regions' ? 1 : 0) +
    (selectedStyle !== 'all' ? 1 : 0) +
    (selectedPrice !== 'all' ? 1 : 0) +
    (selectedDuration !== 'all' ? 1 : 0);

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

  return (
    <div className="search-page-overlay" role="dialog" aria-modal="true">
      {/* Search Page Header Navigation */}
      <header className="search-page-nav-bar">
        <div className="search-nav-container">
          <button type="button" className="search-nav-back-btn" onClick={onClose} title="Back to Exploring" aria-label="Close search">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          <div className="search-nav-brand">
            <span>BACKPACKERS DESTINATIONS</span>
          </div>

          <div className="search-nav-spacer" />
        </div>
      </header>

      {/* Main Search Page Container */}
      <div className="search-page-main">
        
        {/* Search Hero Box */}
        <section className="search-hero-box">
          <div className="search-hero-container">
            <span className="search-eyebrow">EXPLORE ROUTE CORRIDORS</span>
            <h1 className="search-hero-title">FIND YOUR NEXT ADVENTURE</h1>

            {/* Main Search Bar Input with integrated Filter button */}
            <div className="search-input-hero-wrap">
              <svg className="search-hero-icon" viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2.4">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                className="search-hero-input"
                placeholder={placeholderText || "Search by destination, pass, landscape or budget..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="search-input-actions">
                {searchTerm && (
                  <button 
                    type="button"
                    className="search-hero-clear-btn" 
                    onClick={() => setSearchTerm('')} 
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
                <button 
                  type="button" 
                  className={`search-small-filter-btn ${showFilterDrawer ? 'is-open' : ''} ${activeFilterCount > 0 ? 'has-active' : ''}`}
                  onClick={() => setShowFilterDrawer(!showFilterDrawer)}
                  title="Filter options"
                >
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                  <span>Filter{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}</span>
                </button>
              </div>
            </div>

            {/* Multi-Factor Filter Drawer */}
            {showFilterDrawer && (
              <div className="search-filter-drawer-container">
                <div className="filter-drawer-grid">
                  
                  <div className="filter-group-box">
                    <span className="filter-group-title">REGION</span>
                    <div className="filter-group-chips">
                      {LANDSCAPE_ZONES.map((zone) => (
                        <button
                          key={zone}
                          className={`filter-dropdown-chip ${selectedLandscape === zone ? 'is-active' : ''}`}
                          onClick={() => setSelectedLandscape(zone)}
                        >
                          {zone}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group-box">
                    <span className="filter-group-title">CATEGORY</span>
                    <div className="filter-group-chips">
                      {TRIP_STYLES.map((style) => (
                        <button
                          key={style.id}
                          className={`filter-dropdown-chip ${selectedStyle === style.id ? 'is-active' : ''}`}
                          onClick={() => setSelectedStyle(style.id)}
                        >
                          {style.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group-box">
                    <span className="filter-group-title">PRICE RANGE</span>
                    <div className="filter-group-chips">
                      {PRICE_RANGES.map((price) => (
                        <button
                          key={price.id}
                          className={`filter-dropdown-chip ${selectedPrice === price.id ? 'is-active' : ''}`}
                          onClick={() => setSelectedPrice(price.id)}
                        >
                          {price.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="filter-group-box">
                    <span className="filter-group-title">DURATION</span>
                    <div className="filter-group-chips">
                      {DURATION_RANGES.map((dur) => (
                        <button
                          key={dur.id}
                          className={`filter-dropdown-chip ${selectedDuration === dur.id ? 'is-active' : ''}`}
                          onClick={() => setSelectedDuration(dur.id)}
                        >
                          {dur.label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {(activeFilterCount > 0 || searchTerm) && (
                  <div className="filter-drawer-footer">
                    <span>Showing {filteredTrips.length} matching packages</span>
                    <button className="btn-reset-all-filters" onClick={resetAllFilters}>
                      RESET ALL FILTERS ✕
                    </button>
                  </div>
                )}
              </div>
            )}

          </div>
        </section>

        {/* Results Showcase Header */}
        <div className="search-results-container">
          <div className="results-header-bar">
            <span className="results-count-headline">
              SHOWING <strong className="text-accent">{filteredTrips.length}</strong> EXPEDITION ROUTES
            </span>
            {(activeFilterCount > 0 || searchTerm) && (
              <button className="btn-clear-active-filters" onClick={resetAllFilters}>
                CLEAR FILTERS ✕
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {filteredTrips.length > 0 ? (
            <div className="search-results-grid">
              {filteredTrips.map((item) => {
                const durationShort = formatDurationShort(item.duration);
                return (
                  <article
                    key={item.id}
                    className="search-dest-card"
                    onClick={() => handleCardClick(item.id)}
                  >
                    <div className="search-card-frame" style={{ backgroundColor: item.frameColor }}>
                      <div className="search-card-inner-canvas">
                        <div className="search-card-img-wrap">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="search-card-img" 
                            loading="lazy" 
                          />
                        </div>

                        <div className="search-card-body">
                          <h3 className="search-card-title">
                            {item.title} {durationShort}
                          </h3>
                          <div className="search-card-price-row">
                            <span className="price-label">from</span>
                            <span className="price-val">{item.startingPrice}</span>
                          </div>

                          <button 
                            type="button" 
                            className="btn-card-quick-book"
                            onClick={(e) => handleBookClick(e, item.title)}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="search-empty-hero">
              <div className="empty-icon-circle">🧭</div>
              <h3 className="empty-title">NO MATCHING EXPEDITION ROUTES FOUND</h3>
              <p className="empty-desc">
                We couldn't find any packages matching "{searchTerm}". Try exploring popular categories below or clear active filters.
              </p>
              <div className="empty-quick-links">
                {POPULAR_QUICK_SEARCHES.slice(1, 6).map((chip) => (
                  <button
                    key={chip.label}
                    type="button"
                    className="empty-chip-btn"
                    onClick={() => setSearchTerm(chip.query)}
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TripSearchModal;
