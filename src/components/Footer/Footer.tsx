import React from 'react';
import './Footer.css';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer-editorial" role="contentinfo">
      <div className="container">
        
        {/* Top Section: Logo Lockup (Above Text) */}
        <div className="footer-top-brand">
          <a href="#hero" className="footer-logo-lockup" aria-label="Backpackers Destinations Home">
            <img 
              src="/logo-cropped.png" 
              alt="Backpackers Destinations Logo" 
              className="footer-logo-img" 
            />
          </a>
        </div>

        {/* Call to Action */}
        <div className="footer-cta-section">
          <h2 className="footer-cta-headline">
            LET'S START <span className="footer-headline-yellow">RIGHT NOW</span>
          </h2>
          <a href="#planner" className="btn-footer-cta">
            CONTACT US
          </a>
        </div>

        {/* Bottom Details Columns */}
        <div className="footer-details-grid">
          
          {/* Column 1: Registration, Contact Info and Socials */}
          <div className="footer-brand-col">
            <p className="footer-reg-text">
              © {new Date().getFullYear()} Backpackers Destinations Ltd is a company registered in India. Registered office: 5-4-97, Bhavani colony, Premavathipet, Rajendranagar, Rangareddy, 500030.
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
              <a href="https://www.instagram.com/backpackers.destinations/" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg className="social-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.1c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.5.6.2 1 .5 1.4 1 .5.4.8.8 1 1.4.2.4.4 1 .5 2.2.1 1.3.1 1.6.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.5 2.2-.2.6-.5 1-1 1.4-.4.5-.8.8-1.4 1-.4.2-1 .4-2.2.5-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.5-.6-.2-1-.5-1.4-1-.5-.4-.8-.8-1-1.4-.2-.4-.4-1-.5-2.2-.1-1.3-.1-1.6-.1-4.9s0-3.6.1-4.9c.1-1.2.3-1.8.5-2.2.2-.6.5-1 1-1.4.4-.5.8-.8 1.4-1 .4-.2 1-.4 2.2-.5 1.3-.1 1.6-.1 4.9-.1M12 0C8.7 0 8.3 0 7 0 5.8.1 4.9.3 4.2.6c-.8.3-1.4.7-2 1.4-.7.6-1.1 1.2-1.4 2C.3 4.9.1 5.8 0 7c0 1.3 0 1.7 0 5s0 3.7.1 5c.1 1.2.3 2.1.6 2.8.3.8.7 1.4 1.4 2 .6.7 1.2 1.1 2 1.4.7.3 1.6.5 2.8.6 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.2-.1 2.1-.3 2.8-.6.8-.3 1.4-.7 2-1.4.7-.6 1.1-1.2 1.4-2 .3-.7.5-1.6.6-2.8.1-1.3.1-1.7.1-5s0-3.7-.1-5c-.1-1.2-.3-2.1-.6-2.8-.3-.8-.7-1.4-1.4-2-.6-.7-1.2-1.1-2-1.4-.7-.3-1.6-.5-2.8-.6-1.3-.1-1.7-.1-5-.1L12 0zm0 5.8c-3.4 0-6.2 2.8-6.2 6.2s2.8 6.2 6.2 6.2 6.2-2.8 6.2-6.2-2.8-6.2-6.2-6.2zm0 10.2c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4zm6.4-11c0 .8-.6 1.4-1.4 1.4-.8 0-1.4-.6-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4z"/></svg>
              </a>
              <a href="mailto:contact@backpackersdestinations.com" className="social-icon-link" aria-label="Email">
                <svg className="social-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
              </a>
              <a href="https://wa.me/917207681067" className="social-icon-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg className="social-svg" viewBox="0 0 24 24"><path fill="currentColor" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.572-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
              </a>
            </div>
          </div>

        </div>

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
        </div>

      </div>
    </footer>
  );
};

export default Footer;
