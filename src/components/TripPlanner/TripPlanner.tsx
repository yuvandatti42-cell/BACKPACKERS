import React, { useState } from 'react';
import { InquiryFormData } from '../../types';
import './TripPlanner.css';

const INITIAL_FORM_STATE: InquiryFormData = {
  name: '',
  phone: '',
  email: '',
  destination: '',
  date: '',
  travellers: '1',
  message: ''
};

export const TripPlanner: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof InquiryFormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required.';
    if (!formData.destination) newErrors.destination = 'Destination is required.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof InquiryFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedMessage(
        `Thank you, ${formData.name}. Your inquiry for "${formData.destination}" has been received. Our team will review the route notes and contact you shortly.`
      );
      setFormData(INITIAL_FORM_STATE);
      setErrors({});
    }, 850);
  };

  return (
    <section id="planner" className="trip-planner-editorial" aria-labelledby="planner-heading">
      <div className="container">
        <div className="planner-split-grid">
          
          {/* Left Column: Clean Minimal Form */}
          <div className="planner-form-panel">
            <form className="minimal-trip-form" onSubmit={handleSubmit} noValidate>
              <div className="form-row-grid">
                
                {/* Name */}
                <div className="form-item">
                  <input
                    type="text"
                    id="userName"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`minimal-input ${errors.name ? 'has-error' : ''}`}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="userName" className="minimal-label">Name *</label>
                  {errors.name && <span className="minimal-error-msg">{errors.name}</span>}
                </div>

                {/* Phone */}
                <div className="form-item">
                  <input
                    type="tel"
                    id="userPhone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`minimal-input ${errors.phone ? 'has-error' : ''}`}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="userPhone" className="minimal-label">Phone Number *</label>
                  {errors.phone && <span className="minimal-error-msg">{errors.phone}</span>}
                </div>

                {/* Email */}
                <div className="form-item">
                  <input
                    type="email"
                    id="userEmail"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`minimal-input ${errors.email ? 'has-error' : ''}`}
                    placeholder=" "
                    required
                  />
                  <label htmlFor="userEmail" className="minimal-label">Email Address *</label>
                  {errors.email && <span className="minimal-error-msg">{errors.email}</span>}
                </div>

                {/* Destination Dropdown */}
                <div className="form-item">
                  <select
                    id="userDestination"
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                    className={`minimal-select ${errors.destination ? 'has-error' : ''}`}
                    required
                  >
                    <option value="" disabled hidden></option>
                    <option value="Ladakh High Passes">Ladakh High Passes</option>
                    <option value="Mustang Dirt Corridor">Mustang Dirt Corridor (Nepal)</option>
                    <option value="Ghats Rainforest Switchbacks">Ghats Rainforest Switchbacks (Kerala)</option>
                    <option value="Western Ghats Crossing">Western Ghats Crossing</option>
                    <option value="Custom Tailored Run">Custom Tailored Route</option>
                  </select>
                  <label htmlFor="userDestination" className="minimal-label">Selected Run / Corridor *</label>
                  {errors.destination && <span className="minimal-error-msg">{errors.destination}</span>}
                </div>

                {/* Date */}
                <div className="form-item">
                  <input
                    type="date"
                    id="userDate"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="minimal-input"
                    placeholder=" "
                  />
                  <label htmlFor="userDate" className="minimal-label">Target Date</label>
                </div>

                {/* Travellers */}
                <div className="form-item">
                  <select
                    id="userTravellers"
                    name="travellers"
                    value={formData.travellers}
                    onChange={handleChange}
                    className="minimal-select"
                  >
                    <option value="1">Solo Expedition (1 rider)</option>
                    <option value="2">Duo Run (2 riders)</option>
                    <option value="3-5">Small Group (3-5 riders)</option>
                    <option value="6+">Standard Squadron (6+ riders)</option>
                  </select>
                  <label htmlFor="userTravellers" className="minimal-label">Squad Size</label>
                </div>

                {/* Message */}
                <div className="form-item span-full">
                  <textarea
                    id="userMessage"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="minimal-textarea"
                    placeholder=" "
                  />
                  <label htmlFor="userMessage" className="minimal-label">Route requirements, experience or vehicle choices...</label>
                </div>

                {/* Submit Button */}
                <div className="form-item span-full submit-group">
                  <button 
                    type="submit" 
                    className={`btn btn-primary minimal-submit-btn ${isSubmitting ? 'is-loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'TRANSMITTING RUN DATA...' : 'SUBMIT INQUIRY'}
                    {!isSubmitting && <span className="btn-icon-arrow" aria-hidden="true">&rarr;</span>}
                  </button>

                  {/* PDF Waiver Download Link */}
                  <div className="form-pdf-subnote">
                    <span className="subnote-dot">•</span>
                    <span>Mandatory Participant Form: </span>
                    <a 
                      href="/terms_and_conditions.pdf" 
                      download="Backpackers_Destinations_Terms_and_Liability_Waiver.pdf"
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="cute-pdf-link"
                    >
                      Download Terms &amp; Waiver PDF ↓
                    </a>
                  </div>
                </div>

              </div>

              {submittedMessage && (
                <div className="form-response-badge" role="alert" aria-live="polite">
                  <span className="response-dot"></span>
                  <p>{submittedMessage}</p>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Large Dramatic Heading */}
          <div className="planner-headline-panel">
            <span className="text-meta planner-eyebrow">ROUTE INQUIRY</span>
            <h2 id="planner-heading" className="planner-display-headline">
              <span className="display-word">WHERE</span>
              <span className="display-word">WILL THE</span>
              <span className="display-word text-accent">ROAD TAKE</span>
              <span className="display-word">YOU?</span>
            </h2>
            <p className="planner-aside-text">
              Tell us where you want to travel. Our scouting desk reviews each inquiry individually to provide tailored route configurations and logs.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
