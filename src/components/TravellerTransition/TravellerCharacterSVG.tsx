import React from 'react';
import './TravellerCharacterSVG.css';

interface TravellerCharacterSVGProps {
  className?: string;
  isMoving?: boolean;
}

export const TravellerCharacterSVG: React.FC<TravellerCharacterSVGProps> = ({
  className = '',
  isMoving = true,
}) => {
  return (
    <svg
      className={`traveller-chibi-svg ${isMoving ? 'is-walking' : ''} ${className}`}
      viewBox="0 0 72 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Cute chibi motorcycle adventurer walking"
    >
      <defs>
        {/* Helmet Visor Gloss Reflection */}
        <linearGradient id="chibiVisorGloss" x1="32" y1="12" x2="48" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
          <stop offset="25%" stopColor="#E2E8F0" stopOpacity="0.4" />
          <stop offset="65%" stopColor="#C85A32" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0F100E" stopOpacity="0.95" />
        </linearGradient>

        {/* Helmet Shell Shadowing */}
        <linearGradient id="chibiHelmetGrad" x1="20" y1="4" x2="46" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3C3E3A" />
          <stop offset="50%" stopColor="#2A2B28" />
          <stop offset="100%" stopColor="#1B1C1A" />
        </linearGradient>

        {/* Jacket Leather Shading */}
        <linearGradient id="chibiJacketGrad" x1="22" y1="36" x2="38" y2="58" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#3B3D39" />
          <stop offset="70%" stopColor="#272825" />
          <stop offset="100%" stopColor="#1A1B19" />
        </linearGradient>

        {/* Backpack Gradient */}
        <linearGradient id="chibiPackGrad" x1="10" y1="34" x2="22" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#353733" />
          <stop offset="100%" stopColor="#1E1F1C" />
        </linearGradient>
      </defs>

      {/* ====================================================================
          FAR (LEFT) ARM — Swings behind torso
          ==================================================================== */}
      <g className="chibi-limb chibi-arm-back">
        {/* Sleeve */}
        <path
          d="M26,42 L18,52 L14,49 L22,39 Z"
          fill="#242522"
          stroke="#151614"
          strokeWidth="1"
        />
        {/* Chunky Biker Glove */}
        <circle cx="16" cy="52" r="3.2" fill="#151614" />
      </g>

      {/* ====================================================================
          FAR (LEFT) LEG & BOOT — Swings in counter-phase
          ==================================================================== */}
      <g className="chibi-limb chibi-leg-back">
        {/* Thigh & Shin */}
        <path
          d="M25,56 L19,69 L25,70 L29,56 Z"
          fill="#222320"
          stroke="#141513"
          strokeWidth="1"
        />
        {/* Chunky Riding Boot */}
        <path
          d="M16,69 L26,69 C27,69 28,71 28,75 L14,75 C14,71 15,69 16,69 Z"
          fill="#161715"
          stroke="#0D0E0C"
          strokeWidth="1.1"
        />
        {/* Boot Tread */}
        <line x1="13" y1="75" x2="28" y2="75" stroke="#0D0E0C" strokeWidth="1.8" strokeLinecap="round" />
      </g>

      {/* ====================================================================
          CUTE ADVENTURE ROLL-TOP BACKPACK (Attached to back)
          ==================================================================== */}
      <g className="chibi-backpack">
        {/* Main Backpack Bag */}
        <path
          d="M13,38 C13,34 16,33 21,33 L23,33 L23,54 L17,54 C13,54 12,50 12,46 Z"
          fill="url(#chibiPackGrad)"
          stroke="#141513"
          strokeWidth="1.1"
        />
        {/* Roll-top Roll on top */}
        <rect x="13" y="32" width="10" height="4" rx="1.5" fill="#42443F" stroke="#141513" strokeWidth="0.8" />
        {/* Terracotta Compression Straps */}
        <line x1="12" y1="41" x2="23" y2="41" stroke="#C85A32" strokeWidth="1.5" />
        <line x1="12" y1="47" x2="23" y2="47" stroke="#C85A32" strokeWidth="1.5" />
        {/* Mini Bedroll / Sleeping Pad at bottom */}
        <rect x="10" y="52" width="12" height="5" rx="2.5" fill="#242522" stroke="#121310" strokeWidth="1" />
        <line x1="13" y1="52" x2="13" y2="57" stroke="#C85A32" strokeWidth="1" />
        <line x1="19" y1="52" x2="19" y2="57" stroke="#C85A32" strokeWidth="1" />
      </g>

      {/* ====================================================================
          MAIN TORSO & BIKER JACKET (Bobs cutely with walking stride)
          ==================================================================== */}
      <g className="chibi-torso-group">
        
        {/* Chunky Biker Touring Jacket */}
        <g className="chibi-jacket">
          {/* Main Jacket Body */}
          <path
            d="M23,36 L38,36 C42,36 44,40 44,45 L42,57 C42,59 39,60 36,60 L24,60 C21,60 20,59 20,57 L20,45 C20,40 21,36 23,36 Z"
            fill="url(#chibiJacketGrad)"
            stroke="#151614"
            strokeWidth="1.2"
          />

          {/* Signature Terracotta Center Adventure Stripe */}
          <path
            d="M31,36 L35,36 L34,59 L30,59 Z"
            fill="#C85A32"
          />

          {/* High Protective Collar */}
          <path
            d="M26,34 L37,34 L38,38 L25,38 Z"
            fill="#1B1C1A"
            stroke="#10110F"
            strokeWidth="0.9"
          />

          {/* Protective Shoulder Armor Pad */}
          <path
            d="M32,36 C38,36 43,39 43,43 L34,44 Z"
            fill="#1F201D"
            stroke="#121311"
            strokeWidth="0.9"
          />

          {/* Backpack Harness Front Buckle */}
          <rect x="27" y="44" width="8" height="2.5" rx="0.8" fill="#4B4C47" />
          <rect x="30" y="44" width="3" height="2.5" fill="#D1D5DB" />
        </g>

        {/* ====================================================================
            BIG CHIBI ADVENTURE RIDER'S HELMET (CUTE & PROFESSIONAL)
            ==================================================================== */}
        <g className="chibi-helmet">
          
          {/* Main Big Round Helmet Shell */}
          <path
            d="M20,17 C20,8 27,2 38,2 C49,2 57,9 57,20 C57,29 49,36 38,36 C28,36 20,28 20,17 Z"
            fill="url(#chibiHelmetGrad)"
            stroke="#121310"
            strokeWidth="1.6"
          />

          {/* Signature Terracotta Racing Crown Stripe */}
          <path
            d="M33,2 C36,2 39,2 42,3 L41,9 C38,8 35,8 32,9 Z"
            fill="#C85A32"
          />

          {/* Aggressive Adventure Sun Peak / Visor Shield on top */}
          <path
            d="M28,8 L58,7 L54,12 L33,11 Z"
            fill="#1B1C19"
            stroke="#0D0E0C"
            strokeWidth="1"
          />
          {/* Sun peak orange aerodynamic tip */}
          <path d="M52,7 L58,7 L55,12 L50,11 Z" fill="#C85A32" />

          {/* Full-Face Heavy Protective Chin Bar */}
          <path
            d="M40,24 L56,23 C58,23 59,25 58,29 L54,34 C52,36 47,36 43,36 L39,34 Z"
            fill="#1C1D1A"
            stroke="#0F100E"
            strokeWidth="1.2"
          />

          {/* Chin Bar Mesh Air Intake Vent */}
          <path
            d="M48,27 L54,26 L53,30 L47,30 Z"
            fill="#0D0E0C"
            stroke="#383935"
            strokeWidth="0.6"
          />
          <line x1="50" y1="26" x2="50" y2="30" stroke="#71717A" strokeWidth="0.8" />
          <line x1="52" y1="26" x2="52" y2="30" stroke="#71717A" strokeWidth="0.8" />

          {/* BIG CURVED SMOKED VISOR (Glossy two-tone reflection) */}
          <path
            d="M31,14 C36,12 47,12 53,16 C55,18 56,22 53,24 C46,26 35,26 29,22 C28,18 29,15 31,14 Z"
            fill="url(#chibiVisorGloss)"
            stroke="#0D0E0C"
            strokeWidth="1.4"
          />

          {/* Visor Glint Sparkle (Cute Anime/Chibi shine) */}
          <path
            d="M36,15 C41,14 47,15 50,18 L48,19 C45,17 40,16 35,17 Z"
            fill="#FFFFFF"
            opacity="0.9"
          />
          <circle cx="34" cy="18" r="1.5" fill="#FFFFFF" opacity="0.85" />

          {/* Visor Mechanism Hinge Pivot (Alloy screw) */}
          <circle cx="28" cy="22" r="3.2" fill="#2E2F2B" stroke="#121310" strokeWidth="0.8" />
          <circle cx="28" cy="22" r="1.5" fill="#C85A32" />
        </g>

      </g>

      {/* ====================================================================
          NEAR (RIGHT) LEG & BOOT — Dynamic energetic step
          ==================================================================== */}
      <g className="chibi-limb chibi-leg-front">
        {/* Thigh & Knee */}
        <path
          d="M30,56 L36,69 L30,70 L25,56 Z"
          fill="#2C2D29"
          stroke="#151614"
          strokeWidth="1"
        />
        {/* Articulated Adventure Knee Guard */}
        <rect x="29" y="62" width="7" height="4.5" rx="1.5" fill="#1B1C1A" stroke="#0E0F0D" strokeWidth="0.8" />

        {/* Chunky Riding Boot */}
        <path
          d="M27,69 L40,69 C42,69 43,71 43,75 L25,75 C25,71 26,69 27,69 Z"
          fill="#171815"
          stroke="#0D0E0C"
          strokeWidth="1.2"
        />
        {/* Grip Sole */}
        <line x1="24" y1="75" x2="43" y2="75" stroke="#0D0E0C" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* ====================================================================
          NEAR (RIGHT) ARM — Swings forward with glove
          ==================================================================== */}
      <g className="chibi-limb chibi-arm-front">
        {/* Upper Arm & Elbow */}
        <path
          d="M32,41 L40,51 L36,54 L28,43 Z"
          fill="#343632"
          stroke="#171815"
          strokeWidth="1.1"
        />
        {/* Elbow Reinforcement */}
        <ellipse cx="38" cy="49" rx="2.5" ry="2" fill="#20211E" />
        {/* Chunky Biker Glove */}
        <circle cx="39" cy="54" r="3.5" fill="#141513" stroke="#0C0D0B" strokeWidth="0.8" />
        <circle cx="41" cy="53" r="1.5" fill="#C85A32" />
      </g>
    </svg>
  );
};
