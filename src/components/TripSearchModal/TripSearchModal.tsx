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

  // Typewriter effect for live search placeholder
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

  // Multi-factor filtering strictly over canonical DESTINATION_CORRIDORS
  const filteredTrips: CorridorDetail[] = DESTINATION_CORRIDORS.filter((trip) => {
    // 1. Text Search Filter (Matches Title, Subtitle, Region, Terrain, Elevation, Description, Highlights, Starting Price, Keywords)
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

  const handleBookClick = (tripTitle: string) => {
    onClose();
    if (onOpenBookModal) {
      onOpenBookModal(tripTitle);
    } else {
      window.location.hash = 'destinations';
    }
  };

  const handleExploreClick = (tripCategoryFilter?: string) => {
    onClose();
    if (onNavigate) {
      onNavigate('destinations', undefined, tripCategoryFilter || 'all');
    } else {
      window.location.hash = 'destinations';
    }
  };

  const activeFilterCount = 
    (selectedLandscape !== 'All Regions' ? 1 : 0) +
    (selectedStyle !== 'all' ? 1 : 0) +
    (selectedPrice !== 'all' ? 1 : 0) +
    (selectedDuration !== 'all' ? 1 : 0);

  return (
    <div className="search-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="search-modal-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="search-modal-header">
          <div className="search-input-wrapper">
            <svg className="search-icon-svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              ref={inputRef}
              type="text"
              className="search-input-field"
              placeholder={placeholderText || "Search by destination, pass, landscape or budget..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="search-clear-btn" 
                onClick={() => setSearchTerm('')} 
                aria-label="Clear search text"
              >
                ✕
              </button>
            )}
          </div>

          {/* Filter Drawer Toggle Button */}
          <button 
            className={`search-filter-btn ${showFilterDrawer ? 'is-open' : ''} ${activeFilterCount > 0 ? 'has-active' : ''}`}
            onClick={() => setShowFilterDrawer(!showFilterDrawer)}
            aria-label="Toggle multi-factor filters"
            title="Filter by Landscape, Style, Price & Duration"
          >
            <svg className="filter-icon-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            <span className="filter-btn-label">
              {activeFilterCount > 0 ? `Filter (${activeFilterCount})` : 'Filters'}
            </span>
            <span className={`filter-arrow ${showFilterDrawer ? 'is-up' : ''}`}>▾</span>
          </button>

          <button className="search-modal-close-btn" onClick={onClose} aria-label="Close search" title="Close search (ESC)">
            ✕
          </button>
        </div>

        {/* Quick Landscape Zone Chips Bar */}
        <div className="search-quick-landscape-bar">
          <span className="quick-label">LANDSCAPE:</span>
          <div className="quick-chips-scroll">
            {LANDSCAPE_ZONES.map((zone) => (
              <button
                key={zone}
                className={`quick-zone-chip ${selectedLandscape === zone ? 'is-active' : ''}`}
                onClick={() => setSelectedLandscape(zone)}
              >
                {zone}
              </button>
            ))}
          </div>
        </div>

        {/* Multi-Factor Filter Drawer Panel */}
        {showFilterDrawer && (
          <div className="search-filter-dropdown-panel">
            <div className="filter-drawer-grid">
              
              {/* Landscape Zone Selector */}
              <div className="filter-group-box">
                <span className="filter-group-title">GEOGRAPHICAL REGION</span>
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

              {/* Trip Category / Style Selector */}
              <div className="filter-group-box">
                <span className="filter-group-title">TRIP CATEGORY</span>
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

              {/* Price Range Selector */}
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

              {/* Duration Range Selector */}
              <div className="filter-group-box">
                <span className="filter-group-title">TRIP DURATION</span>
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

            {/* Reset All Filters Bar */}
            {(activeFilterCount > 0 || searchTerm) && (
              <div className="filter-drawer-footer">
                <span className="filter-active-summary">
                  Showing {filteredTrips.length} matching packages
                </span>
                <button className="btn-reset-all-filters" onClick={resetAllFilters}>
                  RESET ALL FILTERS ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* Search Results Content */}
        <div className="search-results-content">
          {filteredTrips.length > 0 ? (
            <div className="search-cards-grid">
              {filteredTrips.map((trip) => (
                <article key={trip.id} className="search-trip-card">
                  <div className="search-card-media">
                    <img src={trip.image} alt={trip.title} className="search-card-img" loading="lazy" />
                    <span className="search-region-badge" style={{ backgroundColor: trip.frameColor }}>
                      {trip.landscapeZone}
                    </span>
                    <span className="search-price-badge">
                      STARTING {trip.startingPrice}
                    </span>
                  </div>

                  <div className="search-card-info">
                    <div className="search-card-top">
                      <span className="search-card-vertical">{trip.region}</span>
                      <span className="search-card-diff">{trip.difficulty}</span>
                    </div>

                    <h3 className="search-card-title">{trip.title}</h3>
                    <p className="search-card-subtitle">{trip.subtitle}</p>

                    {/* Product Specs Grid */}
                    <div className="search-card-specs">
                      <span className="spec-item">⏱ {trip.duration}</span>
                      <span className="spec-item">🏔 {trip.elevation}</span>
                      <span className="spec-item">🛣 {trip.distance}</span>
                    </div>

                    {/* Product Highlights */}
                    {trip.highlights && trip.highlights.length > 0 && (
                      <div className="search-highlights">
                        {trip.highlights.slice(0, 3).map((hl, i) => (
                          <span key={i} className="search-hl-chip">• {hl}</span>
                        ))}
                      </div>
                    )}

                    {/* Product Action Buttons */}
                    <div className="search-card-actions">
                      <button 
                        className="btn-search-action btn-inquire" 
                        onClick={() => handleBookClick(trip.title)}
                      >
                        BOOK THIS ROUTE
                      </button>
                      <button 
                        className="btn-search-action btn-catalog" 
                        onClick={() => handleExploreClick(trip.tripTypes[0])}
                      >
                        EXPLORE ROUTE ↗
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="search-empty-state">
              <div className="empty-icon">🧭</div>
              <h3>NO DESTINATION PACKAGES MATCHED YOUR SEARCH</h3>
              <p>We couldn't find any packages for "{searchTerm || selectedLandscape}". Try searching for popular destinations like <strong>Kerala</strong>, <strong>Ladakh</strong>, <strong>Spiti</strong>, <strong>Ooty</strong>, or <strong>Meghalaya</strong>.</p>
              <button 
                className="btn-empty-reset" 
                onClick={resetAllFilters}
              >
                RESET ALL FILTERS
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default TripSearchModal;
