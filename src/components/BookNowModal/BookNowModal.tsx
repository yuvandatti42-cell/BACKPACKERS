import React, { useState, useEffect } from 'react';
import './BookNowModal.css';

interface BookNowModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle?: string;
}

export const BookNowModal: React.FC<BookNowModalProps> = ({ isOpen, onClose, tripTitle }) => {
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [expectingCallback, setExpectingCallback] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ fullName?: string; phone?: string; email?: string }>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

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

    const callbackText = expectingCallback ? 'Yes' : 'No';
    const tripText = tripTitle || 'General Expedition Notification Request';

    const messageText = 
`Hi Backpackers Destinations,

*New Expedition Booking / Notification:*
• *Full Name:* ${fullName}
• *Phone Number (WhatsApp):* ${phone}
• *Email:* ${email}
• *Expecting a Callback?:* ${callbackText}
• *Target Expedition:* ${tripText}`;

    // 1. Send via WhatsApp
    const encodedWhatsapp = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/917207681067?text=${encodedWhatsapp}`;

    // 2. Send via Email
    const emailSubject = encodeURIComponent(`Booking Inquiry - ${fullName}`);
    const emailBody = encodeURIComponent(messageText);
    const mailtoUrl = `mailto:contact@backpackersdestinations.com?subject=${emailSubject}&body=${emailBody}`;

    // Trigger Email Client
    window.open(mailtoUrl, '_blank');

    // Trigger WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 400);

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
              {tripTitle ? `BOOK: ${tripTitle.toUpperCase()}` : 'NO UPCOMING DATES'}
            </h3>
          </div>
          <button className="notify-modal-close-btn" onClick={onClose} aria-label="Close modal" title="Close">
            &times;
          </button>
        </div>

        <div className="notify-modal-divider" />

        {isSubmitted ? (
          <div className="notify-success-box">
            <div className="success-icon-wrap">✓</div>
            <h4>INQUIRY DISPATCHED</h4>
            <p>
              Thank you, <strong>{fullName}</strong>. Your expedition request details have been opened on WhatsApp and sent to <strong>contact@backpackersdestinations.com</strong>.
            </p>
            <button className="btn-notify-submit" onClick={onClose} style={{ marginTop: '1.5rem' }}>
              <span>CLOSE WINDOW</span>
            </button>
          </div>
        ) : (
          <form className="notify-modal-body" onSubmit={handleSubmit} noValidate>
            <p className="notify-subtext">ENTER YOUR DETAILS TO GET NOTIFIED</p>

            {/* Full Name */}
            <div className="notify-field-group">
              <label className="notify-field-label">FULL NAME *</label>
              <input
                type="text"
                className={`notify-input ${errors.fullName ? 'input-error' : ''}`}
                placeholder="Full Name"
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
                placeholder="Phone Number (WhatsApp)"
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
                placeholder="Email"
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
                <span className="checkbox-label-text">Expecting a callback?</span>
              </label>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-notify-submit">
              <span>NOTIFY ME</span>
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
