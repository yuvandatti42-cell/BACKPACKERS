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
  title = 'TRIP CATALOG',
  pdfUrl = '/kerala_catalog.pdf',
  downloadFilename = 'Backpackers_Destinations_Catalog.pdf',
  onDirectDownload,
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [expectingCallback, setExpectingCallback] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Pre-fill from localStorage if available
  useEffect(() => {
    if (isOpen) {
      const savedName = localStorage.getItem('bp_user_name') || '';
      const savedPhone = localStorage.getItem('bp_user_phone') || '';
      if (savedName) setFullName(savedName);
      if (savedPhone) setPhone(savedPhone);
      setErrors({});
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

  const validate = () => {
    const newErrors: { fullName?: string; phone?: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    
    const digitsOnly = phone.replace(/\D/g, '');
    if (!phone.trim() || digitsOnly.length < 10) {
      newErrors.phone = 'Valid 10-digit WhatsApp phone number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    if (!validate()) return;

    setIsSubmitting(true);

    const cleanName = fullName.trim();
    const cleanPhone = phone.trim();

    // Store in localStorage for future convenience
    localStorage.setItem('bp_user_name', cleanName);
    localStorage.setItem('bp_user_phone', cleanPhone);

    const callbackText = expectingCallback ? 'Yes' : 'No';
    const messageText = 
`Hi Backpackers Destinations,

*New PDF Download Lead:*
• *Full Name:* ${cleanName}
• *Phone Number (WhatsApp):* ${cleanPhone}
• *Expecting a Callback?:* ${callbackText}
• *PDF Document:* ${title}`;

    // Open WhatsApp lead chat
    const whatsappUrl = `https://wa.me/917207681067?text=${encodeURIComponent(messageText)}`;
    window.open(whatsappUrl, '_blank');

    // Trigger PDF download
    triggerDownload();

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const formattedTitle = title.toUpperCase().startsWith('DOWNLOAD') || title.toUpperCase().startsWith('BOOK')
    ? title.toUpperCase()
    : `DOWNLOAD: ${title.toUpperCase()}`;

  return (
    <div className="pdf-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pdf-modal-card animate-pop-in" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="pdf-modal-header">
          <div className="pdf-header-text">
            <span className="pdf-eyebrow">BACKPACKERS DESTINATIONS</span>
            <h3 className="pdf-modal-title">
              {formattedTitle}
            </h3>
          </div>
          <button className="pdf-modal-close-btn" onClick={onClose} aria-label="Close modal" title="Close">
            &times;
          </button>
        </div>

        <div className="pdf-modal-divider" />

        {isSubmitted ? (
          /* Success Screen */
          <div className="pdf-success-box">
            <div className="pdf-success-icon-wrap">✓</div>
            <h4>DOWNLOAD INITIATED</h4>
            <p>
              Thank you, <strong>{fullName}</strong>. Your requested PDF is downloading now, and we've opened WhatsApp so our team can answer any questions.
            </p>
            
            <button 
              type="button" 
              className="pdf-manual-fallback-link"
              onClick={triggerDownload}
            >
              ⬇ Click here if download didn't start
            </button>

            <button className="btn-pdf-submit" onClick={onClose} style={{ marginTop: '1.25rem' }}>
              <span>CLOSE WINDOW</span>
            </button>
          </div>
        ) : (
          /* Form Screen */
          <>
            <form className="pdf-modal-body" onSubmit={handleSubmit} noValidate>
              <p className="pdf-subtext">ENTER YOUR DETAILS TO GET NOTIFIED</p>

              {/* Full Name */}
              <div className="pdf-field-group">
                <label className="pdf-field-label">FULL NAME *</label>
                <input
                  type="text"
                  className={`pdf-input ${errors.fullName ? 'input-error' : ''}`}
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }}
                  required
                />
                {errors.fullName && <span className="pdf-error-text">{errors.fullName}</span>}
              </div>

              {/* Phone Number */}
              <div className="pdf-field-group">
                <label className="pdf-field-label">PHONE NUMBER (WHATSAPP) *</label>
                <input
                  type="tel"
                  className={`pdf-input ${errors.phone ? 'input-error' : ''}`}
                  placeholder="Phone Number (WhatsApp)"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                  }}
                  required
                />
                {errors.phone && <span className="pdf-error-text">{errors.phone}</span>}
              </div>

              {/* Checkbox Row */}
              <div className="pdf-checkbox-row">
                <label className="pdf-checkbox-container">
                  <input
                    type="checkbox"
                    checked={expectingCallback}
                    onChange={(e) => setExpectingCallback(e.target.checked)}
                  />
                  <span className="pdf-checkbox-custom" />
                  <span className="pdf-checkbox-label-text">Expecting a callback?</span>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="btn-pdf-submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'PREPARING PDF...' : 'DOWNLOAD PDF →'}</span>
              </button>
            </form>

            {/* Modal Footer */}
            <div className="pdf-modal-footer">
              <div className="pdf-secured-badge">
                <span style={{ color: '#E6A817' }}>🛡️</span> secured by : <strong>backpackersdestinations.com</strong>
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
};
