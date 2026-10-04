import React, { useState, useEffect } from 'react';
import './PdfDownloadModal.css';

export interface PdfDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  pdfUrl?: string;
  downloadFilename?: string;
  onDirectDownload?: () => void;
}

export const PdfDownloadModal: React.FC<PdfDownloadModalProps> = ({
  isOpen,
  onClose,
  title = 'Trip Itinerary & Catalog PDF',
  pdfUrl = '/kerala_catalog.pdf',
  downloadFilename = 'Backpackers_Destinations_Catalog.pdf',
  onDirectDownload,
}) => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Pre-fill from localStorage if available
  useEffect(() => {
    if (isOpen) {
      const savedName = localStorage.getItem('bp_user_name') || '';
      const savedPhone = localStorage.getItem('bp_user_phone') || '';
      if (savedName) setName(savedName);
      if (savedPhone) setPhone(savedPhone);
      setError('');
      setIsSubmitted(false);
      setIsSubmitting(false);
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

  if (!isOpen) return null;

  const triggerDownload = () => {
    if (onDirectDownload) {
      onDirectDownload();
    } else if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName || cleanName.length < 2) {
      setError('Please enter your full name.');
      return;
    }

    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (!cleanPhone || digitsOnly.length < 10) {
      setError('Please enter a valid 10-digit WhatsApp phone number.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    // Store in localStorage for convenience on next download
    localStorage.setItem('bp_user_name', cleanName);
    localStorage.setItem('bp_user_phone', cleanPhone);

    // Prepare WhatsApp lead link
    const waText = `Hi Backpackers Destinations! My name is ${cleanName} (Phone: ${cleanPhone}). I requested to download the PDF brochure for "${title}". Please text me back with details!`;
    const waUrl = `https://wa.me/917207681067?text=${encodeURIComponent(waText)}`;

    // Open WhatsApp in new tab so business gets the lead
    window.open(waUrl, '_blank');

    // Trigger PDF download
    triggerDownload();

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  return (
    <div className="pdf-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pdf-modal-card" onClick={(e) => e.stopPropagation()}>
        
        {/* Close Button */}
        <button className="pdf-modal-close" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {!isSubmitted ? (
          <>
            {/* Modal Header */}
            <div className="pdf-modal-header">
              <div className="pdf-modal-icon-wrap">
                <span className="pdf-icon-badge">PDF</span>
                <span className="wa-icon-badge" title="WhatsApp Enabled">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                </span>
              </div>
              <h3 className="pdf-modal-title">Download PDF & Connect</h3>
              <p className="pdf-modal-sub">
                Enter your details to download <strong>{title}</strong>. We'll connect on WhatsApp so our team can answer your questions right away!
              </p>
            </div>

            {error && <div className="pdf-modal-error">{error}</div>}

            {/* Form */}
            <form onSubmit={handleSubmit} className="pdf-modal-form">
              <div className="pdf-form-group">
                <label htmlFor="pdf-user-name">Full Name *</label>
                <div className="pdf-input-wrap">
                  <span className="pdf-input-icon">👤</span>
                  <input
                    id="pdf-user-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>

              <div className="pdf-form-group">
                <label htmlFor="pdf-user-phone">WhatsApp Number *</label>
                <div className="pdf-input-wrap">
                  <span className="pdf-input-icon">📱</span>
                  <input
                    id="pdf-user-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    required
                  />
                </div>
              </div>

              <div className="pdf-wa-subnote">
                <span className="wa-subnote-icon">💬</span>
                <span>We'll send your download request to our WhatsApp support so we can text back with custom trip details.</span>
              </div>

              <button
                type="submit"
                className="pdf-submit-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'PREPARING DOWNLOAD...' : 'SEND TO WHATSAPP & DOWNLOAD PDF ↓'}
              </button>
            </form>
          </>
        ) : (
          /* Success Screen */
          <div className="pdf-success-box">
            <div className="pdf-success-icon">✓</div>
            <h3 className="pdf-success-title">Download Initiated!</h3>
            <p className="pdf-success-desc">
              Thank you <strong>{name}</strong>! We've opened WhatsApp with your request so our team can text you back, and your PDF file is downloading now.
            </p>

            <div className="pdf-success-actions">
              <button
                type="button"
                className="pdf-manual-download-btn"
                onClick={triggerDownload}
              >
                ⬇ Click Here if Download Didn't Start
              </button>

              <button
                type="button"
                className="pdf-close-btn"
                onClick={onClose}
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
