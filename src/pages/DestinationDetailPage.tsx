import React, { useState, useEffect } from 'react';
import { DESTINATION_DETAILS_MAP, DestinationDetail } from '../data/destinationDetailsData';
import { KeralaCatalogModal } from '../components/KeralaCatalogModal/KeralaCatalogModal';
import { OotyCatalogModal } from '../components/OotyCatalogModal/OotyCatalogModal';
import { PdfDownloadModal } from '../components/PdfDownloadModal/PdfDownloadModal';
import { GlideSelect } from '../components/GlideSelect/GlideSelect';
import './DestinationDetailPage.css';

interface DestinationDetailPageProps {
  destinationId: string;
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  onOpenBookModal?: (title?: string, planDuration?: string, price?: string) => void;
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
    setActiveTab('about');
  }, [destinationId]);

  // Lookup destination details or fallback to Kerala
  const detail: DestinationDetail = DESTINATION_DETAILS_MAP[destinationId] || DESTINATION_DETAILS_MAP['kerala'];
  const variants = (detail.durationVariants && detail.durationVariants.length > 0)
    ? detail.durationVariants
    : [
        {
          id: 'default',
          label: `${detail.title} ${detail.durationShort}`,
          durationShort: detail.durationShort,
          durationFull: detail.durationFull,
          startingPrice: detail.startingPrice,
          pdfUrl: detail.pdfUrl || '/kerala_catalog.pdf',
          about: detail.about,
          itinerary: detail.itinerary,
          pricing: detail.pricing
        }
      ];

  const [selectedVariantId, setSelectedVariantId] = useState<string>(variants[0].id);

  useEffect(() => {
    const currentVariants = (detail.durationVariants && detail.durationVariants.length > 0)
      ? detail.durationVariants
      : [
          {
            id: 'default',
            label: `${detail.title} ${detail.durationShort}`,
            durationShort: detail.durationShort,
            durationFull: detail.durationFull,
            startingPrice: detail.startingPrice,
            pdfUrl: detail.pdfUrl || '/kerala_catalog.pdf',
            about: detail.about,
            itinerary: detail.itinerary,
            pricing: detail.pricing
          }
        ];
    setSelectedVariantId(currentVariants[0].id);
  }, [destinationId, detail]);

  const glideOptions = variants.map(v => ({
    value: v.id,
    label: v.durationShort ? `${v.durationShort}` : v.label,
    tag: v.startingPrice
  }));

  const activeVariant = variants.find(v => v.id === selectedVariantId) || (variants.length > 0 ? variants[0] : null);

  const currentDurationShort = activeVariant ? activeVariant.durationShort : detail.durationShort;
  const currentDurationFull = activeVariant ? activeVariant.durationFull : detail.durationFull;
  const currentStartingPrice = activeVariant ? activeVariant.startingPrice : detail.startingPrice;
  const currentPdfUrl = activeVariant ? activeVariant.pdfUrl : (detail.pdfUrl || '/kerala_catalog.pdf');
  const currentAbout = (activeVariant && activeVariant.about) ? activeVariant.about : detail.about;
  const currentItinerary = (activeVariant && activeVariant.itinerary) ? activeVariant.itinerary : detail.itinerary;
  const currentPricing = (activeVariant && activeVariant.pricing) ? activeVariant.pricing : detail.pricing;
  const currentInclusions = (activeVariant && activeVariant.inclusions) ? activeVariant.inclusions : detail.inclusions;

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
    if (currentPdfUrl && currentPdfUrl.endsWith('.pdf')) {
      window.open(currentPdfUrl, '_blank');
      const link = document.createElement('a');
      link.href = currentPdfUrl;
      const pdfBaseName = currentPdfUrl.split('/').pop() || `${detail.title}_${currentDurationShort.replace('/', '_')}_Catalog.pdf`;
      link.download = pdfBaseName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return;
    }
    const content = `${detail.title} - ${currentDurationFull}\nStarting Price: ${currentStartingPrice}\n\nOverview:\n${currentAbout.overview}\n\nHighlights:\n${currentAbout.highlights.join('\n')}\n\nItinerary:\n${currentItinerary.map(i => `Day ${i.day}: ${i.title}\n${i.description}`).join('\n\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${detail.id}_${activeVariant ? activeVariant.id : 'catalog'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleBookClick = () => {
    const planText = currentDurationFull ? `${currentDurationFull} (${currentDurationShort})` : currentDurationShort;
    if (onOpenBookModal) {
      onOpenBookModal(detail.title, planText, currentStartingPrice);
    } else {
      const whatsappUrl = `https://wa.me/917207681067?text=${encodeURIComponent(
        `Hi Backpackers Destinations! I want to book the ${detail.title} (${planText}) trip starting at ${currentStartingPrice}.`
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
                <div className="dest-sheet-header-main">
                  <div className="dest-sheet-title-box">
                    <h1 className="dest-sheet-title">
                      {detail.title} <span className="duration-tag-badge">{currentDurationShort}</span>
                    </h1>
                    <div className="dest-sheet-price">
                      {currentStartingPrice}
                    </div>
                  </div>

                  {variants.length > 0 && (
                    <div className="dest-duration-dropdown-container">
                      <label className="dest-duration-dropdown-label">
                        SELECT YOUR PLAN
                      </label>
                      <GlideSelect
                        options={glideOptions}
                        value={selectedVariantId}
                        onChange={(val) => setSelectedVariantId(val)}
                        ariaLabel="Select your plan"
                        showTags={true}
                        accentColor="#F5BA24"
                        surfaceColor="#1C1C18"
                        highlightColor="#2E2E28"
                        textColor="#FAF8F5"
                        size="md"
                        radius={12}
                        menuWidth={200}
                        placement="bottom"
                        align="right"
                        popDuration={180}
                        glideDuration={220}
                      />
                    </div>
                  )}
                </div>

                <div className="dest-sheet-duration-row">
                  <svg className="clock-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{currentDurationFull}</span>
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

                {destinationId === 'ladakh' && currentPricing && (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeTab === 'pricing'}
                    className={`sheet-tab-btn ${activeTab === 'pricing' ? 'is-active' : ''}`}
                    onClick={() => setActiveTab('pricing')}
                  >
                    Pricing
                  </button>
                )}

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
                      {currentAbout.overview}
                    </p>



                    <div className="about-highlights-section">
                      <h3 className="section-subtitle">KEY ROUTE HIGHLIGHTS</h3>
                      <ul className="highlights-list">
                        {currentAbout.highlights.map((hl, index) => (
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
                      {currentItinerary.map((dayItem) => (
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

                {/* TAB 3: PRICING (LADAKH ONLY) */}
                {destinationId === 'ladakh' && activeTab === 'pricing' && currentPricing && (
                  <div className="tab-panel tab-pricing-panel">
                    <div className="dest-pricing-overview">
                      <div className="dest-pricing-starting-box">
                        <span className="dest-pricing-label">STARTING PRICE ({currentDurationShort})</span>
                        <span className="dest-pricing-val">{currentStartingPrice}</span>
                      </div>
                    </div>

                    <div className="dest-occupancy-list">
                      <h4 className="dest-occupancy-heading">ROOM OCCUPANCY & PRICING PLANS</h4>
                      <div className="dest-occupancy-grid">
                        {currentPricing.occupancyTypes.map((occ, oIdx) => (
                          <div key={oIdx} className="dest-occupancy-card">
                            <div className="dest-occ-type">{occ.type}</div>
                            <div className="dest-occ-price">{occ.price}</div>
                            {occ.note && <div className="dest-occ-note">{occ.note}</div>}
                          </div>
                        ))}
                      </div>
                    </div>

                    {currentPricing.notes && currentPricing.notes.length > 0 && (
                      <div className="dest-pricing-notes-box">
                        <h4 className="dest-pricing-notes-title">BOOKING & PRICING NOTES</h4>
                        <ul className="dest-pricing-notes-list">
                          {currentPricing.notes.map((note, nIdx) => (
                            <li key={nIdx}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )}
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
                          {currentInclusions.included.map((item, iIdx) => (
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
                          {currentInclusions.excluded.map((item, eIdx) => (
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
        pdfUrl={currentPdfUrl}
        durationLabel={activeVariant ? activeVariant.label : 'Kerala Catalog'}
      />

      <OotyCatalogModal 
        isOpen={isOotyCatalogOpen} 
        onClose={() => setIsOotyCatalogOpen(false)} 
      />

      <PdfDownloadModal
        isOpen={isGenericPdfLeadOpen}
        onClose={() => setIsGenericPdfLeadOpen(false)}
        title={`${detail.title} (${currentDurationShort}) PDF Catalog`}
        pdfUrl={currentPdfUrl}
        downloadFilename={currentPdfUrl.endsWith('.pdf') ? (currentPdfUrl.split('/').pop() || 'catalog.pdf') : `${detail.id}_${activeVariant ? activeVariant.id : 'catalog'}.pdf`}
        onDirectDownload={() => {
          executeGenericDownload();
        }}
      />
    </div>
  );
};

export default DestinationDetailPage;
