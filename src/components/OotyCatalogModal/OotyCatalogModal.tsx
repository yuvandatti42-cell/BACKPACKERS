import React, { useState, useEffect, useRef } from 'react';
import './OotyCatalogModal.css';

interface OotyCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OotyCatalogModal: React.FC<OotyCatalogModalProps> = ({ isOpen, onClose }) => {
  const [viewMode, setViewMode] = useState<'pages' | 'pdf'>('pages');
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

  // Load PDF.js from CDN and render all pages to high-res canvases when modal opens
  useEffect(() => {
    if (!isOpen) return;
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

        const pdf = await pdfjsLib.getDocument('/ooty_catalog.pdf').promise;
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
          pageHeader.innerText = `PAGE ${pageNum} OF ${pdf.numPages} — OFFICIAL OOTY & COONOOR CATALOG`;
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
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="ooty-catalog-modal-overlay" onClick={onClose} aria-modal="true" role="dialog">
      <div className="ooty-catalog-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Toolbar Header */}
        <div className="ooty-catalog-toolbar">
          <div className="catalog-toolbar-title">
            <span>OFFICIAL OOTY & COONOOR PDF BROCHURE</span>
            <span className="catalog-badge-tag">ORIGINAL UNEDITED PDF</span>
          </div>

          <div className="catalog-toolbar-actions">
            <button 
              className={`catalog-tab-btn ${viewMode === 'pages' ? 'is-active' : ''}`}
              onClick={() => setViewMode('pages')}
            >
              📷 Page View
            </button>
            <button 
              className={`catalog-tab-btn ${viewMode === 'pdf' ? 'is-active' : ''}`}
              onClick={() => setViewMode('pdf')}
            >
              📄 PDF Embed
            </button>
            
            <a 
              href="/ooty_catalog.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="catalog-tab-btn link-btn"
              title="Open PDF in new tab"
            >
              ↗ Open New Tab
            </a>

            <a 
              href="/ooty_catalog.pdf" 
              download="Ooty_Coonoor_Catalog.pdf" 
              className="catalog-tab-btn download-btn"
              title="Download exact PDF document"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download PDF
            </a>

            <button className="catalog-close-btn" onClick={onClose} aria-label="Close modal">
              &times;
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="ooty-catalog-body">
          {viewMode === 'pages' ? (
            <div className="pdf-canvas-view-wrap">
              {isLoading && (
                <div className="pdf-loading-spinner-box">
                  <div className="pdf-spinner" />
                  <span>Loading original PDF pages...</span>
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
                    <a href="/ooty_catalog.pdf" target="_blank" rel="noopener noreferrer" className="btn-fallback-primary">
                      📄 Open PDF Document
                    </a>
                    <a href="/ooty_catalog.pdf" download="Ooty_Coonoor_Catalog.pdf" className="btn-fallback-secondary">
                      ⬇ Download PDF
                    </a>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="pdf-embed-wrap">
              <iframe 
                src="/ooty_catalog.pdf#toolbar=1&navpanes=0&view=FitH" 
                title="Ooty & Coonoor Official PDF Brochure"
                className="pdf-iframe-element"
              />
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
