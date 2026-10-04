import React, { useState, useEffect } from 'react';
import { DESTINATION_DETAILS_MAP, DestinationDetail } from '../data/destinationDetailsData';
import { KeralaCatalogModal } from '../components/KeralaCatalogModal/KeralaCatalogModal';
import { OotyCatalogModal } from '../components/OotyCatalogModal/OotyCatalogModal';
import { PdfDownloadModal } from '../components/PdfDownloadModal/PdfDownloadModal';
import './DestinationDetailPage.css';

interface DestinationDetailPageProps {
  destinationId: string;
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  onOpenBookModal?: (title?: string) => void;
}

export const DestinationDetailPage: React.FC<DestinationDetailPageProps> = ({
  destinationId,
  onNavigate,
  onOpenBookModal
}) => {
  const [activeTab, setActiveTab] = useState<'about' | 'itinerary' | 'pricing' | 'inclusions'>('about');
  const [isKeralaCatalogOpen, setIsKeralaCatalogOpen] = useState<boolean>(false);
  const [isOotyCatalogOpen, setIsOotyCatalogOpen] = useState<boolean>(false);
  const [isGenericPdfLeadOpen, setIsGenericPdfLeadOpen] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [destinationId]);

  // Lookup destination details or fallback to Kerala
  const detail: DestinationDetail = DESTINATION_DETAILS_MAP[destinationId] || DESTINATION_DETAILS_MAP['kerala'];

  const handleBack = () => {
    if (onNavigate) {
      onNavigate('destinations');
    } else {
      window.history.back();
    }
  };

  const handlePdfClick = () => {
    setIsGenericPdfLeadOpen(true);
  };

  const executeGenericDownload = () => {
    const content = `${detail.title} - ${detail.durationFull}\nStarting Price: ${detail.startingPrice}\n\nOverview:\n${detail.about.overview}\n\nHighlights:\n${detail.about.highlights.join('\n')}\n\nItinerary:\n${detail.itinerary.map(i => `Day ${i.day}: ${i.title}\n${i.description}`).join('\n\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${detail.id}_itinerary.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBookClick = () => {
    if (onOpenBookModal) {
      onOpenBookModal(detail.title);
    } else {
      const whatsappUrl = `https://wa.me/917207681067?text=${encodeURIComponent(
        `Hi Backpackers Destinations! I want to book the ${detail.title} (${detail.durationShort}) trip.`
      )}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <div className="dest-detail-page-wrapper">
      {/* Top Fixed Header Navigation */}
      <header className="dest-detail-top-bar">
        <div className="dest-detail-top-container">
          <button type="button" className="dest-detail-back-btn" onClick={handleBack} title="Back to Destinations" aria-label="Back to Destinations">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
          </button>

          <div className="dest-detail-brand-center">
            <span className="brand-title">BACKPACKERS DESTINATIONS</span>
          </div>

          <div className="top-bar-placeholder" />
        </div>
      </header>

      <main className="dest-detail-main-content">
        <div className="dest-detail-layout-grid">
          
          {/* LEFT COLUMN: Large Framed Hero Gallery Image */}
          <div className="dest-detail-media-column">
            <div className="dest-detail-hero-frame" style={{ backgroundColor: detail.frameColor }}>
              {/* Blurred Ambient Background */}
              <div 
                className="hero-blur-backdrop" 
                style={{ backgroundImage: `url(${detail.image})` }} 
              />

              <div className="hero-poster-canvas">
                <img 
                  src={detail.image} 
                  alt={detail.title} 
                  className="hero-poster-img" 
                />
                
                {/* floating mobile back arrow over hero photo */}
                <button type="button" className="mobile-floating-back" onClick={handleBack} aria-label="Go Back">
                  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                </button>

                <div className="hero-poster-badge">
                  <span>{detail.region}</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: White/Surface Details Card Container */}
          <div className="dest-detail-info-column">
            <div className="dest-detail-card-sheet">
              
              {/* Drag Indicator for Mobile Sheet */}
              <div className="mobile-sheet-drag-handle" />

              {/* Title & Price Section */}
              <div className="dest-sheet-header">
                <h1 className="dest-sheet-title">
                  {detail.title} {detail.durationShort}
                </h1>
                <div className="dest-sheet-price">
                  {detail.startingPrice}
                </div>

                <div className="dest-sheet-duration-row">
                  <svg className="clock-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{detail.durationFull}</span>
                </div>
              </div>

              <div className="dest-sheet-divider" />

              {/* TABS NAVIGATION BAR */}
              <div className="dest-sheet-tabs-bar" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'about'}
                  className={`sheet-tab-btn ${activeTab === 'about' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('about')}
                >
                  About
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'itinerary'}
                  className={`sheet-tab-btn ${activeTab === 'itinerary' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('itinerary')}
                >
                  Itinerary
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'pricing'}
                  className={`sheet-tab-btn ${activeTab === 'pricing' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('pricing')}
                >
                  Pricing
                </button>

                <button
                  type="button"
                  role="tab"
                  aria-selected={activeTab === 'inclusions'}
                  className={`sheet-tab-btn ${activeTab === 'inclusions' ? 'is-active' : ''}`}
                  onClick={() => setActiveTab('inclusions')}
                >
                  Inclusions
                </button>
              </div>

              {/* TAB CONTENT PANELS */}
              <div className="dest-sheet-tab-body">
                
                {/* TAB 1: ABOUT */}
                {activeTab === 'about' && (
                  <div className="tab-panel tab-about-panel">
                    <p className="about-overview-text">
                      {detail.about.overview}
                    </p>

                    <div className="about-specs-grid">
                      <div className="spec-item">
                        <span className="spec-lbl">MAX ELEVATION</span>
                        <span className="spec-val">{detail.elevation}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-lbl">DIFFICULTY</span>
                        <span className="spec-val diff-tag">{detail.difficulty}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-lbl">BEST SEASON</span>
                        <span className="spec-val">{detail.bestSeason}</span>
                      </div>
                      <div className="spec-item">
                        <span className="spec-lbl">SQUAD SIZE</span>
                        <span className="spec-val">{detail.squadSize}</span>
                      </div>
                    </div>

                    <div className="about-highlights-section">
                      <h3 className="section-subtitle">KEY ROUTE HIGHLIGHTS</h3>
                      <ul className="highlights-list">
                        {detail.about.highlights.map((hl, index) => (
                          <li key={index} className="highlight-item">
                            <span className="hl-icon">✦</span>
                            <span>{hl}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 2: ITINERARY */}
                {activeTab === 'itinerary' && (
                  <div className="tab-panel tab-itinerary-panel">
                    <div className="itinerary-timeline">
                      {detail.itinerary.map((dayItem) => (
                        <div key={dayItem.day} className="itinerary-day-card">
                          <div className="day-badge-col">
                            <span className="day-number">DAY {dayItem.day < 10 ? `0${dayItem.day}` : dayItem.day}</span>
                          </div>
                          <div className="day-content-col">
                            <h4 className="day-title">{dayItem.title}</h4>
                            <p className="day-desc">{dayItem.description}</p>
                            
                            {dayItem.highlights && dayItem.highlights.length > 0 && (
                              <div className="day-tags-row">
                                {dayItem.highlights.map((tag, tIdx) => (
                                  <span key={tIdx} className="day-tag-pill">{tag}</span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: PRICING */}
                {activeTab === 'pricing' && (
                  <div className="tab-panel tab-pricing-panel">
                    <div className="pricing-banner">
                      <span className="p-lbl">STARTING EXPEDITION PRICE</span>
                      <span className="p-amt">{detail.startingPrice}</span>
                      <span className="p-sub">Per person inclusive of stays, transport & meals</span>
                    </div>

                    <div className="occupancy-options-list">
                      {detail.pricing.occupancyTypes.map((opt, oIdx) => (
                        <div key={oIdx} className="occupancy-card">
                          <div className="occ-info">
                            <h4 className="occ-title">{opt.type}</h4>
                            {opt.note && <span className="occ-note">{opt.note}</span>}
                          </div>
                          <div className="occ-price">{opt.price}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pricing-notes-box">
                      <h4 className="notes-title">BOOKING NOTES & TERMS</h4>
                      <ul>
                        {detail.pricing.notes.map((note, nIdx) => (
                          <li key={nIdx}>• {note}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* TAB 4: INCLUSIONS */}
                {activeTab === 'inclusions' && (
                  <div className="tab-panel tab-inclusions-panel">
                    <div className="inclusions-split-grid">
                      
                      {/* INCLUDED */}
                      <div className="inc-box inc-positive">
                        <h4 className="inc-box-header">
                          <span className="icon-check">✓</span> WHAT'S INCLUDED
                        </h4>
                        <ul className="inc-list">
                          {detail.inclusions.included.map((item, iIdx) => (
                            <li key={iIdx}>
                              <span className="bullet-green">✓</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* EXCLUDED */}
                      <div className="inc-box inc-negative">
                        <h4 className="inc-box-header">
                          <span className="icon-cross">✕</span> WHAT'S EXCLUDED
                        </h4>
                        <ul className="inc-list">
                          {detail.inclusions.excluded.map((item, eIdx) => (
                            <li key={eIdx}>
                              <span className="bullet-red">✕</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </main>

      {/* STICKY BOTTOM ACTION BAR */}
      <div className="dest-detail-bottom-bar">
        <div className="bottom-bar-container">
          <button 
            type="button" 
            className="btn-bottom-pdf" 
            onClick={handlePdfClick}
            title="Download PDF Catalog"
          >
            <span>PDF</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </button>

          <button 
            type="button" 
            className="btn-bottom-book" 
            onClick={handleBookClick}
          >
            BOOK YOUR TRIP
          </button>
        </div>
      </div>

      {/* Catalog Modals */}
      <KeralaCatalogModal 
        isOpen={isKeralaCatalogOpen} 
        onClose={() => setIsKeralaCatalogOpen(false)} 
      />

      <OotyCatalogModal 
        isOpen={isOotyCatalogOpen} 
        onClose={() => setIsOotyCatalogOpen(false)} 
      />

      <PdfDownloadModal
        isOpen={isGenericPdfLeadOpen}
        onClose={() => setIsGenericPdfLeadOpen(false)}
        title={`${detail.title} PDF Catalog`}
        pdfUrl={detail.pdfUrl || (detail.id === 'ooty-coonoor' ? '/ooty_catalog.pdf' : '/kerala_catalog.pdf')}
        downloadFilename={`${detail.id}_catalog.pdf`}
        onDirectDownload={() => {
          if (detail.id === 'kerala') {
            setIsKeralaCatalogOpen(true);
          } else if (detail.id === 'ooty-coonoor') {
            setIsOotyCatalogOpen(true);
          } else {
            executeGenericDownload();
          }
        }}
      />
    </div>
  );
};

export default DestinationDetailPage;
