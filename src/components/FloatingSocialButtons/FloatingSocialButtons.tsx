import React from 'react';
import './FloatingSocialButtons.css';

export const FloatingSocialButtons: React.FC = () => {
  return (
    <div className="floating-social-container" aria-label="Social contact actions">
      
      {/* Phone Call Floating Button */}
      <a 
        href="tel:+917207681067" 
        className="floating-social-btn btn-floating-phone"
        aria-label="Call Backpackers Destinations at +91 72076 81067"
      >
        <svg className="floating-social-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
        <span className="floating-tooltip">Call +91 72076 81067</span>
      </a>

      {/* Instagram Floating Button */}
      <a 
        href="https://www.instagram.com/backpackers.destinations/" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-social-btn btn-floating-instagram"
        aria-label="Follow us on Instagram"
      >
        <svg className="floating-social-svg" viewBox="0 0 24 24">
          <path d="M12 2.1c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.5.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .5 2.2.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.5-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.5-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.5-2.2-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.5-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.5 1.3-.1 1.6-.1 4.9-.1M12 0C8.7 0 8.3 0 7 0 5.8.1 4.9.3 4.2.6c-.8.3-1.4.7-2 1.4-.7.6-1.1 1.2-1.4 2C.3 4.9.1 5.8 0 7c0 1.3 0 1.7 0 5s0 3.7.1 5c.1 1.2.3 2.1.6 2.8.3.8.7 1.4 1.4 2 .6.7 1.2 1.1 2 1.4.7.3 1.6.5 2.8.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.2-.1 2.1-.3 2.8-.6.8-.3 1.4-.7 2-1.4.7-.6 1.1-1.2 1.4-2 .3-.7.5-1.6.6-2.8.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.2-.3-2.1-.6-2.8-.3-.8-.7-1.4-1.4-2-.6-.7-1.2-1.1-2-1.4-.7-.3-1.6-.5-2.8-.6-1.3-.1-1.7-.1-5-.1L12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11c0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4z"/>
        </svg>
        <span className="floating-tooltip">Follow on Instagram</span>
      </a>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/917207681067?text=Hi%20Backpackers%20Destinations%2C%20I%20would%20like%20to%20inquire%20about%20a%20trip!" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-social-btn btn-floating-whatsapp"
        aria-label="Chat with us on WhatsApp"
      >
        <svg className="floating-social-svg" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
        <span className="floating-tooltip">Chat on WhatsApp</span>
      </a>

    </div>
  );
};

export default FloatingSocialButtons;
