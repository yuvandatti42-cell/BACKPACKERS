import React, { useState, useEffect, useRef } from 'react';
import './KeralaCatalogModal.css';

interface KeralaCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const KeralaCatalogModal: React.FC<KeralaCatalogModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'interactive' | 'pages' | 'pdf'>('interactive');
  const [activeTab, setActiveTab] = useState<'all' | 'cover' | 'details'>('all');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [pdfError, setPdfError] = useState<boolean>(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
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

  // Load PDF.js from CDN and render all pages to high-res canvases when viewMode is 'pages'
  useEffect(() => {
    if (!isOpen || viewMode !== 'pages') return;
    let isCancelled = false;

    const renderPdfPages = async () => {
      setIsLoading(true);
      setPdfError(false);
      try {
        // Load pdf.js script dynamically if not available
        if (!(window as any).pdfjsLib) {
          await new Promise<void>((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
            script.onload = () => resolve();
            script.onerror = () => reject(new Error('Failed to load PDF viewer library'));
            document.head.appendChild(script);
          });
        }

        const pdfjsLib = (window as any).pdfjsLib;
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

        const pdf = await pdfjsLib.getDocument('/kerala_catalog.pdf').promise;
        if (isCancelled) return;

        const container = canvasContainerRef.current;
        if (!container) return;
        container.innerHTML = '';

        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          if (isCancelled) return;
          const page = await pdf.getPage(pageNum);
          
          // High scale for crystal crisp resolution
          const scale = 2.0;
          const viewport = page.getViewport({ scale });

          const wrapper = document.createElement('div');
          wrapper.className = 'pdf-page-wrapper';

          const pageHeader = document.createElement('div');
          pageHeader.className = 'pdf-page-meta-tag';
          pageHeader.innerText = `PAGE ${pageNum} OF ${pdf.numPages} — OFFICIAL KERALA CATALOG`;
          wrapper.appendChild(pageHeader);

          const canvas = document.createElement('canvas');
          canvas.className = 'pdf-rendered-canvas';
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          wrapper.appendChild(canvas);
          container.appendChild(wrapper);

          const renderContext = {
            canvasContext: context!,
            viewport: viewport,
          };
          await page.render(renderContext).promise;
        }

        setIsLoading(false);
      } catch (err) {
        console.error('Error rendering PDF:', err);
        if (!isCancelled) {
          setPdfError(true);
          setIsLoading(false);
        }
      }
    };

    renderPdfPages();

    return () => {
      isCancelled = true;
    };
  }, [isOpen, viewMode]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="kerala-catalog-modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="kerala-catalog-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header Toolbar */}
        <div className="kerala-catalog-toolbar">
          <div className="catalog-toolbar-title">
            <span>OFFICIAL KERALA CATALOG</span>
            <span className="catalog-badge-tag">3D / 2N BROCHURE</span>
          </div>

          <div className="catalog-toolbar-actions">
            <button 
              className={`catalog-tab-btn ${viewMode === 'interactive' ? 'is-active' : ''}`}
              onClick={() => setViewMode('interactive')}
              title="Interactive styled catalog brochure"
            >
              ✨ Interactive
            </button>
            <button 
              className={`catalog-tab-btn ${viewMode === 'pages' ? 'is-active' : ''}`}
              onClick={() => setViewMode('pages')}
              title="High-res PDF page viewer"
            >
              📷 Page View
            </button>
            <button 
              className={`catalog-tab-btn ${viewMode === 'pdf' ? 'is-active' : ''}`}
              onClick={() => setViewMode('pdf')}
              title="Embed raw PDF document"
            >
              📄 PDF Embed
            </button>
            
            <a 
              href="/kerala_catalog.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="catalog-tab-btn link-btn"
              title="Open PDF in new browser tab"
            >
              ↗ Open New Tab
            </a>

            <a 
              href="/kerala_catalog.pdf" 
              download="Kerala_3D2N_Catalog.pdf" 
              className="catalog-tab-btn download-btn"
              title="Download official PDF document"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>

            <button className="catalog-tab-btn print-btn" onClick={handlePrint} title="Print or Save PDF">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9V2h12v7M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
                <path d="M6 14h12v8H6z"/>
              </svg>
              Print
            </button>

            <button className="catalog-close-btn" onClick={onClose} aria-label="Close modal">
              &times;
            </button>
          </div>
        </div>

        {/* Sub-bar for Interactive Mode filters */}
        {viewMode === 'interactive' && (
          <div className="kerala-sub-toolbar">
            <span className="sub-toolbar-label">INTERACTIVE BROCHURE VIEWS:</span>
            <div className="sub-toolbar-tabs">
              <button 
                className={`sub-tab-btn ${activeTab === 'all' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                Full Poster & Itinerary
              </button>
              <button 
                className={`sub-tab-btn ${activeTab === 'cover' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('cover')}
              >
                Poster Cover
              </button>
              <button 
                className={`sub-tab-btn ${activeTab === 'details' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('details')}
              >
                Itinerary & Pricing
              </button>
            </div>
          </div>
        )}

        {/* Catalog Content Area */}
        <div className="kerala-catalog-body">
          {viewMode === 'interactive' ? (
            <>
              {/* PAGE 1: COVER POSTER */}
              {(activeTab === 'all' || activeTab === 'cover') && (
                <div 
                  className="kerala-page-cover"
                  style={{ backgroundImage: `url('/dest_kerala.jpg')` }}
                >
                  <div className="kerala-cover-overlay" />

                  {/* Cover Top Header */}
                  <div className="kerala-cover-header">
                    <div className="kerala-cover-logo-wrap">
                      <img src="/logo-white.png" alt="Backpackers Destinations Logo" className="kerala-cover-logo-img" />
                      <div className="kerala-cover-logo-text">
                        <span className="kerala-cover-logo-brand">Backpackers</span>
                        <span className="kerala-cover-logo-sub">DESTINATIONS</span>
                      </div>
                    </div>
                    <div className="kerala-cover-tagline-top">
                      EXPLORE &nbsp;/&nbsp; TRAVEL &nbsp;/&nbsp; BELONG
                    </div>
                  </div>

                  {/* Cover Center Main Display */}
                  <div className="kerala-cover-center">
                    <div className="kerala-cover-escape">ESCAPE TO</div>
                    <h1 className="kerala-cover-script-title">Kerala</h1>
                    <div className="kerala-cover-destinations">
                      MUNNAR &nbsp;&bull;&nbsp; WAYANAD &nbsp;&bull;&nbsp; ALLEPPEY
                    </div>
                    <div className="kerala-cover-subtitle">
                      Mountains, Forests, Backwaters and a thousand moments.
                    </div>
                  </div>

                  {/* Cover Bottom Features & Badge */}
                  <div className="kerala-cover-footer">
                    <div className="kerala-cover-features-grid">
                      
                      {/* Icon 1: Scenic Landscapes */}
                      <div className="kerala-cover-feature-item">
                        <svg className="kerala-cover-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M3 20h18L13 4 8 13l-3-4-2 7z" />
                        </svg>
                        <span className="kerala-cover-feature-label">SCENIC LANDSCAPES</span>
                      </div>

                      {/* Icon 2: Local Experiences */}
                      <div className="kerala-cover-feature-item">
                        <svg className="kerala-cover-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M12 22s-8-5.5-8-12a8 8 0 1 1 16 0c0 6.5-8 12-8 12z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="kerala-cover-feature-label">LOCAL EXPERIENCES</span>
                      </div>

                      {/* Icon 3: Relaxing Backwaters */}
                      <div className="kerala-cover-feature-item">
                        <svg className="kerala-cover-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M2 17c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2" />
                          <path d="M2 21c3 0 3-2 6-2s3 2 6 2 3-2 6-2 3 2 6 2" />
                          <path d="M4 12l8-8 8 8H4z" />
                        </svg>
                        <span className="kerala-cover-feature-label">RELAXING BACKWATERS</span>
                      </div>

                      {/* Icon 4: Rich Culture */}
                      <div className="kerala-cover-feature-item">
                        <svg className="kerala-cover-feature-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
                          <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
                        </svg>
                        <span className="kerala-cover-feature-label">RICH CULTURE</span>
                      </div>

                    </div>

                    {/* Duration Yellow Badge */}
                    <div className="kerala-cover-duration-badge">
                      <span className="duration-badge-small">TRIP DURATION</span>
                      <span className="duration-badge-large">3 DAYS / 2 NIGHTS</span>
                    </div>
                  </div>

                </div>
              )}

              {/* PAGE 2: ITINERARY DETAILS & PRICING */}
              {(activeTab === 'all' || activeTab === 'details') && (
                <div className="kerala-page-details">
                  
                  <div className="kerala-details-top">
                    <span className="kerala-details-brand">BACKPACKERS DESTINATIONS</span>
                    <h2 className="kerala-details-title">KERALA</h2>
                    <div className="kerala-details-duration-tag">3 DAYS / 2 NIGHTS</div>

                    <div className="kerala-details-heading-italic">
                      Escape into the heart of God’s Own Country!
                    </div>
                    <p className="kerala-details-desc">
                      Cruise through serene backwaters, sip hot chai in the rain, and wake up to endless shades of green in Kerala.
                    </p>
                  </div>

                  {/* 3 Stat Cards */}
                  <div className="kerala-stats-cards-row">
                    
                    <div className="kerala-stat-card">
                      <span className="stat-card-val">03</span>
                      <span className="stat-card-label">DAYS</span>
                    </div>

                    <div className="kerala-stat-card">
                      <span className="stat-card-val">02</span>
                      <span className="stat-card-label">NIGHTS</span>
                    </div>

                    <div className="kerala-stat-card">
                      <span className="stat-card-val">₹6,999/-</span>
                      <span className="stat-card-label">STARTING FROM</span>
                    </div>

                  </div>

                  {/* Dark Green Pill */}
                  <div className="kerala-included-pill">
                    STAY &nbsp;&bull;&nbsp; TRAVEL &nbsp;&bull;&nbsp; MEALS INCLUDED
                  </div>

                  {/* Section "A FEELING, NOT JUST A DESTINATION" */}
                  <div className="kerala-feeling-section">
                    <h3 className="kerala-feeling-title">A FEELING, NOT JUST A DESTINATION</h3>
                    <p className="kerala-feeling-text">
                      From misty mornings to peaceful sunsets, Kerala is not just a destination — it’s a feeling.
                    </p>
                    <div className="kerala-feeling-tags">
                      MUNNAR &nbsp;&bull;&nbsp; WAYANAD &nbsp;&bull;&nbsp; ALLEPPEY
                    </div>
                  </div>

                  {/* Footer Booking Banner Card */}
                  <div className="kerala-details-footer-card">
                    <div className="footer-card-left">
                      <span className="footer-card-heading">BOOK YOUR NEXT GETAWAY</span>
                      <span className="footer-card-sub">Travel with Backpackers Destination</span>
                    </div>
                    <a 
                      href="https://wa.me/917207681067?text=Hi%20Backpackers%20Destinations%2C%20I%20would%20like%20to%20book%20the%20Kerala%203D2N%20package!" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="footer-card-phone"
                    >
                      +91 7207681067
                    </a>
                  </div>

                </div>
              )}
            </>
          ) : viewMode === 'pages' ? (
            <div className="pdf-canvas-view-wrap">
              {isLoading && (
                <div className="pdf-loading-spinner-box">
                  <div className="pdf-spinner" />
                  <span>Loading official Kerala PDF pages...</span>
                </div>
              )}
              
              <div 
                ref={canvasContainerRef} 
                className="pdf-canvas-container" 
                style={{ display: isLoading ? 'none' : 'flex' }}
              />

              {pdfError && (
                <div className="pdf-fallback-box">
                  <p>Could not render PDF pages on canvas. You can open or download the exact PDF file directly below:</p>
                  <div className="fallback-actions">
                    <a href="/kerala_catalog.pdf" target="_blank" rel="noopener noreferrer" className="btn-fallback-primary">
                      📄 Open PDF Document
                    </a>
                    <a href="/kerala_catalog.pdf" download="Kerala_3D2N_Catalog.pdf" className="btn-fallback-secondary">
                      ⬇ Download PDF
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="pdf-embed-wrap">
              <iframe 
                src="/kerala_catalog.pdf#toolbar=1&navpanes=0&view=FitH" 
                title="Official Kerala Catalog PDF Brochure"
                className="pdf-iframe-element"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
