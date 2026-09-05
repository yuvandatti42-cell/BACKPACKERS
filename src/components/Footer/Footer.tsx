import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer-editorial" role="contentinfo">
      <div className="container">
        
        {/* Top Half: Call to Action */}
        <div className="footer-cta-section">
          <h2 className="footer-cta-headline">
            LET'S START AN <span className="footer-headline-yellow">ADVENTURE</span>
          </h2>
          <a href="#planner" className="btn-footer-cta">
            CONTACT US
          </a>
        </div>

        <div className="footer-divider-line" />

        {/* Bottom Details Columns */}
        <div className="footer-details-grid">
          
          {/* Column 1: Registration, Contact Info and Socials */}
          <div className="footer-brand-col">
            <p className="footer-reg-text">
              © {new Date().getFullYear()} Backpackers Destinations Ltd is a company registered in India, number SC438812. Registered office: Desk 04, Bangalore Corridor, India.
            </p>
            
            <div className="footer-contact-row">
              <a href="tel:7207681067" className="footer-contact-item">
                <span className="contact-prefix">T:</span> +91 72076 81067
              </a>
              <span className="contact-divider">•</span>
              <a href="mailto:contact@backpackersdestinations.com" className="footer-contact-item">
                <span className="contact-prefix">E:</span> contact@backpackersdestinations.com
              </a>
            </div>

            <div className="footer-social-row">
              <a href="#" className="social-icon-link" aria-label="Facebook">
                <svg className="social-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M14 13.5h2.5l1-3H14V8.5c0-.8.2-1.1 1-1.1h1.5v-3H14c-2.7 0-4 1.4-4 4v2.1H8v3h2V20h4v-6.5z"/></svg>
              </a>
              <span className="social-separator">—</span>
              <a href="https://www.instagram.com/backpackers.destinations/" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="social-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.1c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.5.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .5 2.2.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.5-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.5-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.5-2.2-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.5-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.5 1.3-.1 1.6-.1 4.9-.1M12 0C8.7 0 8.3 0 7 0 5.8.1 4.9.3 4.2.6c-.8.3-1.4.7-2 1.4-.7.6-1.1 1.2-1.4 2C.3 4.9.1 5.8 0 7c0 1.3 0 1.7 0 5s0 3.7.1 5c.1 1.2.3 2.1.6 2.8.3.8.7 1.4 1.4 2 .6.7 1.2 1.1 2 1.4.7.3 1.6.5 2.8.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.2-.1 2.1-.3 2.8-.6.8-.3 1.4-.7 2-1.4.7-.6 1.1-1.2 1.4-2 .3-.7.5-1.6.6-2.8.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.2-.3-2.1-.6-2.8-.3-.8-.7-1.4-1.4-2-.6-.7-1.2-1.1-2-1.4-.7-.3-1.6-.5-2.8-.6-1.3-.1-1.7-.1-5-.1L12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11c0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4z"/></svg>
              </a>
              <span className="social-separator">—</span>
              <a href="#" className="social-icon-link" aria-label="YouTube">
                <svg className="social-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M23.5 6.2c-.3-1.2-1.2-2.1-2.4-2.4C19 3.2 12 3.2 12 3.2s-7 0-9.1.6c-1.2.3-2.1 1.2-2.4 2.4C0 8.3 0 12 0 12s0 3.7.6 5.8c.3 1.2 1.2 2.1 2.4 2.4 2.1.6 9.1.6 9.1.6s7 0 9.1-.6c1.2-.3 2.1-1.2 2.4-2.4.6-2.1.6-5.8.6-5.8s0-3.7-.6-5.8zm-14 9.3V8.5l6.5 3.5-6.5 3.5z"/></svg>
              </a>
              <span className="social-separator">—</span>
              <a href="mailto:contact@backpackersdestinations.com" className="social-icon-link" aria-label="Email">
                <svg className="social-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
            </div>
          </div>

        </div>

        <div className="footer-divider-line" />

        {/* Footer Bottom Row */}
        <div className="footer-bottom-row">
          <div className="footer-legal-links">
            <a 
              href="/terms_and_conditions.pdf" 
              download="Backpackers_Destinations_Terms_and_Liability_Waiver.pdf"
              target="_blank" 
              rel="noopener noreferrer"
              className="footer-waiver-link"
            >
              Terms &amp; Conditions and Liability Waiver (PDF ↓)
            </a>
            <span className="legal-separator">/</span>
            <a href="#">Privacy policy</a>
          </div>
          <div className="footer-member-badge">
            <span className="badge-text">MEMBER</span>
            <span className="badge-number">2026</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
