import React, { useState, useEffect, useRef } from 'react';
import { EXPEDITIONS_DATA, ExpeditionItem } from '../../data/expeditionsData';
import './TripSearchModal.css';

interface TripSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
}

const POPULAR_TAGS = [
  'Kerala',
  'Ladakh',
  'Kodaikanal',
  'Ooty & Coonoor',
  'Arunachalam & Pondy',
  'Gokarna & Dandeli',
  'Chikmagalur',
  'Weekend Trips',
  'Bike Trips',
  'Long Expedition'
];

export const TripSearchModal: React.FC<TripSearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
      setSelectedTag('');
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

  if (!isOpen) return null;

  const query = (searchTerm || selectedTag).toLowerCase().trim();

  const filteredTrips: ExpeditionItem[] = EXPEDITIONS_DATA.filter((trip) => {
    if (!query) return true;
    const matchTitle = trip.title.toLowerCase().includes(query);
    const matchDest = trip.destination.toLowerCase().includes(query);
    const matchRegion = trip.regionLabel.toLowerCase().includes(query);
    const matchDesc = (trip.description || '').toLowerCase().includes(query);
    const matchCategory = (trip.category || '').toLowerCase().includes(query);
    const matchVertical = trip.verticalLabel.toLowerCase().includes(query);
    const matchHighlights = (trip.highlights || []).some(h => h.toLowerCase().includes(query));
    const matchDifficulty = trip.difficulty.toLowerCase().includes(query);
    const matchDuration = trip.duration.toLowerCase().includes(query);

    return (
      matchTitle ||
      matchDest ||
      matchRegion ||
      matchDesc ||
      matchCategory ||
      matchVertical ||
      matchHighlights ||
      matchDifficulty ||
      matchDuration
    );
  });

  const handleSelectTrip = (trip: ExpeditionItem, action: 'inquire' | 'catalog') => {
    onClose();
    if (action === 'inquire') {
      if (onNavigate) {
        onNavigate('home', 'planner');
      } else {
        window.location.hash = 'planner';
      }
    } else {
      const cat = trip.category || 'all';
      if (onNavigate) {
        onNavigate('destinations', undefined, cat);
      } else {
        window.location.hash = 'destinations';
      }
    }
  };

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag('');
    } else {
      setSelectedTag(tag);
      setSearchTerm('');
    }
  };

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
              placeholder="Search by destination, pass, style or region (e.g. Ladakh, Spiti, Weekend, Munnar)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                if (selectedTag) setSelectedTag('');
              }}
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
          <button className="search-modal-close-btn" onClick={onClose} aria-label="Close search">
            <span>ESC</span> ✕
          </button>
        </div>

        {/* Quick Tag Pills */}
        <div className="search-tags-row">
          <span className="search-tags-label">QUICK FILTERS:</span>
          <div className="search-tags-scroll">
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                className={`search-tag-chip ${selectedTag === tag ? 'is-active' : ''}`}
                onClick={() => handleTagClick(tag)}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Metadata Bar */}
        <div className="search-results-meta">
          <span className="meta-count">
            FOUND <strong className="text-accent">{filteredTrips.length}</strong> EXPEDITIONS
            {(searchTerm || selectedTag) && ` FOR "${searchTerm || selectedTag}"`}
          </span>
          <span className="meta-tip">PRESS ESC TO EXIT</span>
        </div>

        {/* Search Results List / Grid */}
        <div className="search-results-content">
          {filteredTrips.length > 0 ? (
            <div className="search-cards-grid">
              {filteredTrips.map((trip) => (
                <div key={trip.id} className="search-trip-card">
                  <div className="search-card-media">
                    <img src={trip.image} alt={trip.title} className="search-card-img" />
                    <span className="search-region-badge" style={{ backgroundColor: trip.frameColor }}>
                      {trip.destination}
                    </span>
                  </div>

                  <div className="search-card-info">
                    <div className="search-card-top">
                      <span className="search-card-vertical">{trip.verticalLabel}</span>
                      <span className="search-card-diff">{trip.difficulty}</span>
                    </div>

                    <h3 className="search-card-title">{trip.title}</h3>
                    <p className="search-card-desc">{trip.description}</p>

                    <div className="search-card-specs">
                      <span className="spec-item">⏱ {trip.duration}</span>
                      {trip.maxAltitude && <span className="spec-item">🏔 {trip.maxAltitude}</span>}
                      {trip.price && <span className="spec-item price-tag">🏷 {trip.price}</span>}
                    </div>

                    {trip.highlights && trip.highlights.length > 0 && (
                      <div className="search-highlights">
                        {trip.highlights.slice(0, 2).map((hl, i) => (
                          <span key={i} className="search-hl-chip">• {hl}</span>
                        ))}
                      </div>
                    )}

                    <div className="search-card-actions">
                      <button 
                        className="btn-search-action btn-inquire" 
                        onClick={() => handleSelectTrip(trip, 'inquire')}
                      >
                        INQUIRE THIS ROUTE &rarr;
                      </button>
                      <button 
                        className="btn-search-action btn-catalog" 
                        onClick={() => handleSelectTrip(trip, 'catalog')}
                      >
                        VIEW IN CATALOG ↗
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="search-empty-state">
              <div className="empty-icon">🧭</div>
              <h3>NO EXPEDITIONS MATCHED YOUR SEARCH</h3>
              <p>We couldn't find any trips for "{searchTerm || selectedTag}". Try searching for popular regions like <strong>Ladakh</strong>, <strong>Spiti</strong>, <strong>Kerala</strong>, or <strong>Bhutan</strong>.</p>
              <button 
                className="btn-empty-reset" 
                onClick={() => { setSearchTerm(''); setSelectedTag(''); }}
              >
                RESET SEARCH FILTERS
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
