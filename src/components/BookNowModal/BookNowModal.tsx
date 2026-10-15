import React, { useState, useEffect } from 'react';
import './BookNowModal.css';

interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle?: string;
  planDuration?: string;
  startingPrice?: string;
}

export const BookNowModal: React.FC<BookNowModalProps> = ({ 
  isOpen, 
  onClose, 
  tripTitle,
  planDuration,
  startingPrice
}) => {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [expectingCallback, setExpectingCallback] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [lastWhatsappUrl, setLastWhatsappUrl] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsSubmitted(false);
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
    const newErrors: { fullName?: string; phone?: string; email?: string } = {};
    if (!fullName.trim()) newErrors.fullName = 'Full Name is required.';
    if (!phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!email.trim() || !email.includes('@')) newErrors.email = 'Valid Email address is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const callbackText = expectingCallback ? 'Yes, please call me' : 'No, WhatsApp chat is fine';
    const tripText = tripTitle || 'Backpackers Expedition';
    const planText = planDuration ? `\n• *Selected Plan Duration:* ${planDuration}` : '';
    const priceText = startingPrice ? `\n• *Starting Price:* ${startingPrice}` : '';

    const messageText = 
`Hi Backpackers Destinations! 👋

*New Trip Booking Request:*
• *Full Name:* ${fullName.trim()}
• *Phone Number (WhatsApp):* ${phone.trim()}
• *Email:* ${email.trim()}
• *Trip / Destination:* ${tripText}${planText}${priceText}
• *Expecting a Callback?:* ${callbackText}

I would like more information and to book this plan. Please share the details!`;

    const encodedWhatsapp = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/917207681067?text=${encodedWhatsapp}`;
    setLastWhatsappUrl(whatsappUrl);

    // Open WhatsApp directly without delay
    window.open(whatsappUrl, '_blank');

    setIsSubmitted(true);
  };

  return (
    <div className="notify-modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="notify-modal-card animate-pop-in" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="notify-modal-header">
          <div className="notify-header-text">
            <span className="notify-eyebrow">BACKPACKERS DESTINATIONS</span>
            <h3 className="notify-modal-title">
              {tripTitle ? `BOOK: ${tripTitle.toUpperCase()}` : 'EXPEDITION BOOKING'}
            </h3>
            {(planDuration || startingPrice) && (
              <div className="notify-plan-badge">
                <span className="badge-sparkle">✦</span>
                {planDuration && <span className="badge-duration">PLAN: <strong>{planDuration}</strong></span>}
                {startingPrice && <span className="badge-price">• {startingPrice}</span>}
              </div>
            )}
          </div>
          <button className="notify-modal-close-btn" onClick={onClose} aria-label="Close modal" title="Close">
            &times;
          </button>
        </div>

        <div className="notify-modal-divider" />

        {isSubmitted ? (
          <div className="notify-success-box">
            <div className="success-icon-wrap">✓</div>
            <h4>REQUEST SENT TO WHATSAPP!</h4>
            <p>
              Thank you, <strong>{fullName}</strong>! We've prepared your booking details for <strong>{tripTitle || 'your trip'}</strong> {planDuration ? `(${planDuration})` : ''} and opened WhatsApp.
            </p>
            {lastWhatsappUrl && (
              <a 
                href={lastWhatsappUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-whatsapp-reopen"
              >
                <span>OPEN IN WHATSAPP NOW</span>
                <span>&rarr;</span>
              </a>
            )}
            <button className="btn-notify-close-window" onClick={onClose}>
              <span>CLOSE WINDOW</span>
            </button>
          </div>
        ) : (
          <form className="notify-modal-body" onSubmit={handleSubmit} noValidate>
            <p className="notify-subtext">ENTER YOUR DETAILS TO CONFIRM ON WHATSAPP</p>

            {/* Full Name */}
            <div className="notify-field-group">
              <label className="notify-field-label">FULL NAME *</label>
              <input
                type="text"
                className={`notify-input ${errors.fullName ? 'input-error' : ''}`}
                placeholder="Your full name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
                }}
              />
              {errors.fullName && <span className="notify-error-text">{errors.fullName}</span>}
            </div>

            {/* Phone Number */}
            <div className="notify-field-group">
              <label className="notify-field-label">PHONE NUMBER (WHATSAPP) *</label>
              <input
                type="tel"
                className={`notify-input ${errors.phone ? 'input-error' : ''}`}
                placeholder="+91 98765 43210"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                }}
              />
              {errors.phone && <span className="notify-error-text">{errors.phone}</span>}
            </div>

            {/* Email */}
            <div className="notify-field-group">
              <label className="notify-field-label">EMAIL ADDRESS *</label>
              <input
                type="email"
                className={`notify-input ${errors.email ? 'input-error' : ''}`}
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
                }}
              />
              {errors.email && <span className="notify-error-text">{errors.email}</span>}
            </div>

            {/* Expecting Callback Checkbox */}
            <div className="notify-checkbox-row">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={expectingCallback}
                  onChange={(e) => setExpectingCallback(e.target.checked)}
                />
                <span className="checkbox-custom" />
                <span className="checkbox-label-text">Request a callback from our trip leader?</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-notify-submit">
              <span>SEND TO WHATSAPP</span>
              <span className="btn-icon-arrow" aria-hidden="true">&rarr;</span>
            </button>
          </form>
        )}

        {/* Footer Brand Seal */}
        <div className="notify-modal-footer">
          <div className="secured-badge">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="#E6A817">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
            </svg>
            <span>secured by : <strong>backpackersdestinations.com</strong></span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookNowModal;
