import React from 'react';
import './TravelCollage.css';

interface TravelCollageProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
  onOpenBookModal?: (title?: string, planDuration?: string, price?: string) => void;
}

export const TravelCollage: React.FC<TravelCollageProps> = ({ onNavigate, onOpenBookModal }) => {
  const handleCtaClick = (filter?: string) => {
    if (filter === 'book' && onOpenBookModal) {
      onOpenBookModal();
      return;
    }
    if (onNavigate) {
      onNavigate('destinations', undefined, filter || 'all');
    } else {
      window.location.hash = 'destinations';
      const el = document.getElementById('destinations');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="travel-collage-section"
      className="travel-collage-root"
      aria-label="Backpackers Immersive Travel Collage"
    >
      {/* ==================================================================
          DESKTOP DESIGN: ASYMMETRIC PHOTOGRAPHIC MOSAIC + CENTER EDITORIAL CARD
          ================================================================== */}
      <div className="travel-collage-desktop-container">
        <div className="travel-collage-grid" role="region" aria-label="Authentic Travel Photo Collage">
          
          {/* Tile 1: Top-Left Landscape - Scenic Tea Hills & Ghats in Ooty */}
          <div className="collage-tile tile-munnar-road">
            <img
              src="/ooty.webp"
              alt="Misty tea plantations and winding hairpin mountain curves in Ooty Nilgiris"
              className="collage-tile-img"
              loading="eager"
            />
          </div>

          {/* Tile 2: Top Mid-Left - Western Ghats Tea Hills & Valley */}
          <div className="collage-tile tile-kerala-valley">
            <img
              src="/dest_kerala.webp"
              alt="Scenic misty valley with tropical mountain curves in Western Ghats"
              className="collage-tile-img"
              loading="eager"
            />
          </div>

          {/* Tile 3: Top Mid-Right - Living Root Bridges & Emerald Cascades */}
          <div className="collage-tile tile-meghalaya-falls">
            <img
              src="/meghalaya.webp"
              alt="Crystal clear emerald river and living root bridges in Cherrapunji Meghalaya"
              className="collage-tile-img"
              loading="eager"
            />
          </div>

          {/* Tile 4: Top-Right - Mountain Ridge Overlook in Chikmagalur */}
          <div className="collage-tile tile-chick-ridge">
            <img
              src="/chick.webp"
              alt="Backpacker on cliff ledge overlooking misty green mountain valleys in Chikmagalur"
              className="collage-tile-img"
              loading="eager"
            />
          </div>

          {/* Tile 5: Far-Left Tall Portrait - Mountain Wilderness Hiking & Trekking */}
          <div className="collage-tile tile-pine-trail">
            <img
              src="/trek.webp"
              alt="Backpackers hiking along remote mountain wilderness trails"
              className="collage-tile-img"
              loading="eager"
            />
          </div>

          {/* Tile 6: Far-Right Tall Portrait - Motorcycle Overland Pass in Spiti */}
          <div className="collage-tile tile-spiti-pass">
            <img
              src="/pic.webp"
              alt="Motorcycle rider looking out over Spiti high desert canyons and mountain roads"
              className="collage-tile-img"
              loading="eager"
            />
          </div>

          {/* Tile 7: Bottom Left - Coastal Cliffs & Trails in Gokarna */}
          <div className="collage-tile tile-gokarna-coast">
            <img
              src="/gokarna.webp"
              alt="Dramatic ocean cliffs and golden beaches in Gokarna"
              className="collage-tile-img"
              loading="eager"
            />
          </div>

          {/* Tile 8: Bottom Mid-Left - Highland Riverbed & Canyon Route */}
          <div className="collage-tile tile-camping-tent">
            <img
              src="/sty.webp"
              alt="Backpacker traveler gazing over dramatic mountain river valley"
              className="collage-tile-img"
              loading="eager"
            />
          </div>

          {/* Tile 9: Bottom Mid-Right - Backpacker Friends at Pangong Lake */}
          <div className="collage-tile tile-friends-ledge">
            <img
              src="/r1.webp"
              alt="Backpacker friends smiling together at Pangong Lake in Ladakh"
              className="collage-tile-img"
              loading="eager"
            />
          </div>

          {/* Tile 10: Bottom Right - Kodaikanal Pine Forests & Highland Lake */}
          <div className="collage-tile tile-kodai-sunset">
            <img
              src="/kodai.webp"
              alt="Misty pine forests and mountain lakes in Kodaikanal"
              className="collage-tile-img"
              loading="eager"
            />
          </div>

          {/* ==============================================================
              CENTER WARM-WHITE EDITORIAL CARD
              - Warm-white surface (#FCFAF7 / #FAF8F5) with subtle paper texture
              - Minimal corner registration crosshairs
              - Small orange handwritten text: "FOR THE LOVE OF GETTING LOST"
              - Elegant serif headline: "Less scrolling. More exploring."
              - Supporting narrative text
              - "Explore Our Trips ↗" CTA button
              ============================================================== */}
          <div className="collage-center-card-wrap">
            <article className="collage-center-editorial-card" aria-label="Backpackers Manifesto">
              
              {/* Corner Registration Crosshairs for Editorial Journal Aesthetic */}
              <span className="corner-crosshair top-left" aria-hidden="true">+</span>
              <span className="corner-crosshair top-right" aria-hidden="true">+</span>
              <span className="corner-crosshair bottom-left" aria-hidden="true">+</span>
              <span className="corner-crosshair bottom-right" aria-hidden="true">+</span>

              {/* Minimal Top Brand Micro-Kicker */}
              <div className="editorial-meta-header">
                <span className="editorial-brand-tag">BACKPACKERS EXPEDITIONS</span>
                <span className="editorial-coord-tag">11°24′N 76°42′E · NILGIRIS & GHATS</span>
              </div>

              {/* Small Orange Handwritten Text */}
              <div className="handwritten-accent-wrap">
                <span className="handwritten-accent-text">
                  FOR THE LOVE OF GETTING LOST
                </span>
                <svg
                  className="handwritten-underline-svg"
                  viewBox="0 0 240 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8.5C45 3.5 125 3 237 7.5"
                    stroke="#D9531E"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>

              {/* Main Headline in Elegant Serif Font */}
              <h2 className="editorial-main-headline">
                Less scrolling.<br />
                <span className="headline-serif-emphasis">More exploring.</span>
              </h2>

              {/* Subtle Botanical / Minimalist Divider Line */}
              <div className="editorial-divider-line" aria-hidden="true">
                <span className="divider-hairline-left" />
                <span className="divider-diamond" />
                <span className="divider-hairline-right" />
              </div>

              {/* Supporting Text */}
              <p className="editorial-supporting-text">
                Find your people, discover breathtaking places, and turn your next getaway into a story worth telling.
              </p>

              {/* Destination Tag Chips */}
              <div className="editorial-destinations-strip">
                <span className="dest-chip">Kerala</span>
                <span className="dest-chip-dot">·</span>
                <span className="dest-chip">Ooty</span>
                <span className="dest-chip-dot">·</span>
                <span className="dest-chip">Kodaikanal</span>
                <span className="dest-chip-dot">·</span>
                <span className="dest-chip">Western Ghats</span>
              </div>

              {/* Call to Action Button */}
              <div className="editorial-action-row">
                <button
                  type="button"
                  className="collage-primary-cta"
                  onClick={() => handleCtaClick('all')}
                  aria-label="Explore our trips and expeditions"
                >
                  <span className="cta-label-text">Explore Our Trips</span>
                  <span className="cta-arrow-icon" aria-hidden="true">↗</span>
                </button>
              </div>

            </article>
          </div>

        </div>
      </div>

      {/* ==================================================================
          MOBILE EXPERIENCE — MOST IMPORTANT
          - Never scales down desktop collage
          - Immersive, image-first opening slide
          - Photograph fills composition, headline & CTA layered directly over
          - Smaller supporting travel photos around main image
          - Visually complete without requiring user to scroll to discover text
          - Touch swipeable multi-slide carousel
          - Each slide has a distinct layout, arrangement, and personality
          ================================================================== */}
      <div className="travel-collage-mobile-container">
        {/* ==============================================================
           MOBILE COLLAGE VIEW: PHOTO MOSAIC WITH COMPACT CENTER EDITORIAL
           ============================================================== */}
        <div className="mobile-collage-mosaic-wrap">
            <div className="mobile-collage-grid" role="region" aria-label="Mobile Travel Photo Collage">
              
              {/* Row 1: 4 small photos across top */}
              <div className="m-tile m-tile-top-1">
                <img
                  src="/ooty.webp"
                  alt="Ooty Nilgiri Tea Hills"
                  className="m-tile-img"
                  loading="eager"
                />
              </div>
              <div className="m-tile m-tile-top-2">
                <img
                  src="/dest_kerala.webp"
                  alt="Western Ghats Valley"
                  className="m-tile-img"
                  loading="eager"
                />
              </div>
              <div className="m-tile m-tile-top-3">
                <img
                  src="/meghalaya.webp"
                  alt="Cherrapunji Waterfalls"
                  className="m-tile-img"
                  loading="eager"
                />
              </div>
              <div className="m-tile m-tile-top-4">
                <img
                  src="/chick.webp"
                  alt="Chikmagalur Ridge"
                  className="m-tile-img"
                  loading="eager"
                />
              </div>

              {/* Left Flank: Mountain Wilderness Trek */}
              <div className="m-tile m-tile-left">
                <img
                  src="/trek.webp"
                  alt="Mountain Wilderness Trek"
                  className="m-tile-img"
                  loading="eager"
                />
              </div>

              {/* ==========================================================
                  REDUCED CENTER EDITORIAL CARD (MOBILE)
                  - Reduced frame size
                  - Centered alignment
                  - Warm-white paper card with subtle crosshairs
                  - Focused on core text & typography
                  ========================================================== */}
              <div className="mobile-center-card-wrap">
                <article className="mobile-center-editorial-card" aria-label="Backpackers Manifesto">
                  
                  {/* Subtle Corner Registration Marks */}
                  <span className="m-corner-crosshair top-left" aria-hidden="true">+</span>
                  <span className="m-corner-crosshair top-right" aria-hidden="true">+</span>
                  <span className="m-corner-crosshair bottom-left" aria-hidden="true">+</span>
                  <span className="m-corner-crosshair bottom-right" aria-hidden="true">+</span>

                  {/* Small Orange Handwritten Text */}
                  <div className="m-handwritten-wrap">
                    <span className="m-handwritten-text">
                      FOR THE LOVE OF GETTING LOST
                    </span>
                  </div>

                  {/* Main Headline in Elegant Serif */}
                  <h2 className="m-main-headline">
                    Less scrolling.<br />
                    <span className="headline-serif-emphasis">More exploring.</span>
                  </h2>

                  {/* CTA Button */}
                  <button
                    type="button"
                    className="mobile-collage-cta-btn"
                    onClick={() => handleCtaClick('all')}
                    aria-label="Explore Our Trips"
                  >
                    <span>Explore Trips</span>
                    <span className="cta-arrow-icon" aria-hidden="true">↗</span>
                  </button>

                </article>
              </div>

              {/* Right Flank: Vertical Spiti Pass Expedition */}
              <div className="m-tile m-tile-right">
                <img
                  src="/pic.webp"
                  alt="Spiti Overland Pass"
                  className="m-tile-img"
                  loading="eager"
                />
              </div>

              {/* Row 5: 4 small photos across bottom */}
              <div className="m-tile m-tile-bottom-1">
                <img
                  src="/gokarna.webp"
                  alt="Gokarna Cliff Trails"
                  className="m-tile-img"
                  loading="eager"
                />
              </div>
              <div className="m-tile m-tile-bottom-2">
                <img
                  src="/sty.webp"
                  alt="Mountain Canyon Valley"
                  className="m-tile-img"
                  loading="eager"
                />
              </div>
              <div className="m-tile m-tile-bottom-3">
                <img
                  src="/r1.webp"
                  alt="Friends at Pangong Lake"
                  className="m-tile-img"
                  loading="eager"
                />
              </div>
              <div className="m-tile m-tile-bottom-4">
                <img
                  src="/kodai.webp"
                  alt="Kodaikanal Lake & Pines"
                  className="m-tile-img"
                  loading="eager"
                />
              </div>

            </div>
          </div>
      </div>
    </section>
  );
};

export default TravelCollage;
