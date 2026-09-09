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
      className={`traveller-bike-svg ${isMoving ? 'is-riding' : ''} ${className}`}
      viewBox="0 0 100 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Chibi Mini Militia adventure mascot riding a cute motorbike"
    >
      <defs>
        {/* Visor Gloss Gradient */}
        <linearGradient id="bikeVisorGrad" x1="48" y1="10" x2="68" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="30%" stopColor="#F59E0B" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#C85A32" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#111827" stopOpacity="0.95" />
        </linearGradient>

        {/* Helmet Shell Gradient */}
        <linearGradient id="bikeHelmetGrad" x1="38" y1="4" x2="68" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#374151" />
          <stop offset="50%" stopColor="#1F2937" />
          <stop offset="100%" stopColor="#111827" />
        </linearGradient>

        {/* Orange Accent Gradient */}
        <linearGradient id="orangeAccentGrad" x1="40" y1="45" x2="65" y2="55" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
      </defs>

      {/* Ground Speed Dust Particles */}
      <g className="bike-dust-group">
        <circle cx="12" cy="74" r="2" fill="#E5E7EB" className="dust-particle p1" />
        <circle cx="8" cy="72" r="1.5" fill="#D1D5DB" className="dust-particle p2" />
        <circle cx="4" cy="73" r="1" fill="#9CA3AF" className="dust-particle p3" />
      </g>

      {/* Exhaust Smoke Puffs */}
      <g className="bike-exhaust-group">
        <circle cx="14" cy="61" r="2" fill="#9CA3AF" opacity="0.6" className="smoke-puff s1" />
        <circle cx="9" cy="59" r="3" fill="#D1D5DB" opacity="0.4" className="smoke-puff s2" />
        <circle cx="3" cy="57" r="4" fill="#E5E7EB" opacity="0.2" className="smoke-puff s3" />
      </g>

      {/* MAIN RIDER & MOTORBIKE ASSEMBLY (vibrates with engine) */}
      <g className="bike-assembly">

        {/* REAR WHEEL */}
        <g className="bike-wheel wheel-rear">
          <circle cx="26" cy="66" r="11" fill="#1F2937" stroke="#111827" strokeWidth="2.5" />
          <circle cx="26" cy="66" r="7" fill="#374151" stroke="#4B5563" strokeWidth="1" />
          {/* Rotating Rim Spokes */}
          <g className="wheel-spokes">
            <line x1="26" y1="59" x2="26" y2="73" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="19" y1="66" x2="33" y2="66" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="21" y1="61" x2="31" y2="71" stroke="#9CA3AF" strokeWidth="1" />
            <line x1="21" y1="71" x2="31" y2="61" stroke="#9CA3AF" strokeWidth="1" />
          </g>
          <circle cx="26" cy="66" r="3" fill="#F97316" />
        </g>

        {/* FRONT WHEEL */}
        <g className="bike-wheel wheel-front">
          <circle cx="76" cy="66" r="11" fill="#1F2937" stroke="#111827" strokeWidth="2.5" />
          <circle cx="76" cy="66" r="7" fill="#374151" stroke="#4B5563" strokeWidth="1" />
          {/* Rotating Rim Spokes */}
          <g className="wheel-spokes">
            <line x1="76" y1="59" x2="76" y2="73" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="69" y1="66" x2="83" y2="66" stroke="#9CA3AF" strokeWidth="1.2" />
            <line x1="71" y1="61" x2="81" y2="71" stroke="#9CA3AF" strokeWidth="1" />
            <line x1="71" y1="71" x2="81" y2="61" stroke="#9CA3AF" strokeWidth="1" />
          </g>
          <circle cx="76" cy="66" r="3" fill="#F97316" />
        </g>

        {/* MOTORBIKE FRAME & CHASSIS */}
        <g className="bike-frame">
          {/* Exhaust Pipe */}
          <path d="M30 62 L18 63" stroke="#9CA3AF" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M18 63 L14 62" stroke="#6B7280" strokeWidth="4.5" strokeLinecap="round" />

          {/* Engine Casing */}
          <rect x="34" y="54" width="18" height="13" rx="3" fill="#111827" stroke="#374151" strokeWidth="1" />
          <line x1="37" y1="57" x2="49" y2="57" stroke="#4B5563" strokeWidth="1.5" />
          <line x1="37" y1="61" x2="49" y2="61" stroke="#4B5563" strokeWidth="1.5" />

          {/* Front Fork Suspension */}
          <line x1="76" y1="66" x2="68" y2="42" stroke="#F97316" strokeWidth="3" strokeLinecap="round" />
          <line x1="74" y1="66" x2="67" y2="44" stroke="#9CA3AF" strokeWidth="1.5" />

          {/* Rear Swingarm & Shock */}
          <line x1="26" y1="66" x2="40" y2="54" stroke="#374151" strokeWidth="2.5" />
          <line x1="30" y1="60" x2="35" y2="52" stroke="#F97316" strokeWidth="2" />

          {/* Orange Fuel Tank */}
          <path d="M44 46 C44 42 50 40 60 42 C64 43 65 47 62 51 L46 51 Z" fill="url(#orangeAccentGrad)" stroke="#C2410C" strokeWidth="1" />
          <path d="M48 43 L58 43 L56 46 L47 46 Z" fill="#FFEDD5" opacity="0.4" />

          {/* Comfortable Leather Bike Seat */}
          <path d="M30 46 C34 46 42 46 46 48 L44 52 C38 52 32 50 28 48 Z" fill="#1F2937" stroke="#111827" strokeWidth="1" />

          {/* Luggage Rack on back */}
          <path d="M20 46 L30 46" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
          <rect x="18" y="44" width="10" height="2" fill="#374151" />

          {/* Front Windshield */}
          <path d="M66 40 L72 28 C73 26 75 27 75 29 L70 42 Z" fill="#93C5FD" opacity="0.5" stroke="#60A5FA" strokeWidth="0.8" />

          {/* Headlight with glow */}
          <circle cx="72" cy="45" r="3.5" fill="#FEF08A" stroke="#EAB308" strokeWidth="1" />
          <path d="M75 42 L88 38 L88 52 L75 48 Z" fill="#FEF08A" opacity="0.15" />

          {/* Handlebars & Side Mirror */}
          <path d="M64 42 L67 36 L61 36" stroke="#D1D5DB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="60" cy="34" r="2" fill="#374151" stroke="#9CA3AF" strokeWidth="0.8" />
        </g>

        {/* MASCOT RIDER (MINI MILITIA STYLE) */}
        <g className="bike-rider">

          {/* JETPACK ON BACK */}
          <g className="rider-jetpack">
            <rect x="22" y="24" width="9" height="18" rx="3" fill="#1F2937" stroke="#111827" strokeWidth="1" />
            <line x1="22" y1="28" x2="31" y2="28" stroke="#F97316" strokeWidth="1.5" />
            <line x1="22" y1="34" x2="31" y2="34" stroke="#F97316" strokeWidth="1.5" />
            {/* Jetpack Thruster Nozzle */}
            <path d="M24 42 L22 46 L29 46 L27 42 Z" fill="#374151" />
            {/* Small Thruster Flame */}
            <path d="M23 46 L20 52 L26 49 L28 52 L28 46 Z" fill="#F97316" className="jet-flame" />
          </g>

          {/* LEGS & BOOTS ON PEGS */}
          <g className="rider-legs">
            {/* Shin & Boot */}
            <path d="M38 46 L46 56 L42 58 L36 48 Z" fill="#1F2937" stroke="#111827" strokeWidth="1" />
            {/* Boot on Foot Peg */}
            <path d="M42 56 L50 56 C51 56 52 57 51 59 L41 59 Z" fill="#111827" stroke="#000" strokeWidth="0.8" />
            {/* Orange Boot Trim */}
            <line x1="43" y1="56" x2="49" y2="56" stroke="#F97316" strokeWidth="1.2" />
          </g>

          {/* TORSO & BIKER JACKET */}
          <g className="rider-torso">
            <path d="M30 26 L48 28 C52 30 53 35 51 40 L45 48 C41 49 34 49 32 46 L28 34 Z" fill="url(#bikeHelmetGrad)" stroke="#111827" strokeWidth="1.2" />
            {/* Orange Center Accent Stripe */}
            <path d="M38 27 L43 28 L40 47 L36 47 Z" fill="#F97316" />
            {/* High Collar */}
            <path d="M36 24 L46 25 L45 28 L35 27 Z" fill="#111827" />
          </g>

          {/* ARMS HOLDING HANDLEBARS */}
          <g className="rider-arms">
            {/* Sleeve leaning forward to handlebar */}
            <path d="M44 32 L64 37 L62 41 L42 36 Z" fill="#374151" stroke="#111827" strokeWidth="1" />
            {/* Orange Shoulder Pad Accent */}
            <path d="M42 30 C46 30 48 32 47 34 L41 33 Z" fill="#F97316" />
            {/* Glove gripping handlebar */}
            <circle cx="64" cy="38" r="3" fill="#111827" stroke="#000" strokeWidth="0.8" />
            <circle cx="64" cy="38" r="1.2" fill="#F97316" />
          </g>

          {/* ICONIC MINI MILITIA BIG HELMET */}
          <g className="rider-helmet">
            {/* Main Round Helmet */}
            <path d="M32 15 C32 6 42 1 54 1 C66 1 73 8 73 19 C73 28 64 33 53 33 C40 33 32 25 32 15 Z" fill="url(#bikeHelmetGrad)" stroke="#111827" strokeWidth="1.5" />

            {/* Top Visor Sun Peak / Horn Shield */}
            <path d="M42 6 L74 5 L70 10 L46 9 Z" fill="#1F2937" stroke="#111827" strokeWidth="0.8" />
            {/* Orange Tip on Sun Peak */}
            <path d="M66 5 L74 5 L71 10 L64 9 Z" fill="#F97316" />

            {/* Full-Face Chin Guard */}
            <path d="M54 22 L71 21 C73 21 74 23 73 26 L69 31 C67 33 62 33 57 33 L53 31 Z" fill="#111827" stroke="#000" strokeWidth="1" />
            {/* Chin Air Vents */}
            <line x1="63" y1="24" x2="63" y2="28" stroke="#F97316" strokeWidth="1" />
            <line x1="66" y1="24" x2="66" y2="28" stroke="#F97316" strokeWidth="1" />

            {/* BIG GOLD / ORANGE VISOR */}
            <path d="M44 12 C50 10 C62 10 68 14 70 18 C71 21 70 23 66 24 C58 25 48 25 43 21 C41 17 42 13 44 12 Z" fill="url(#bikeVisorGrad)" stroke="#111827" strokeWidth="1.2" />

            {/* Gloss Reflection Sparkle */}
            <path d="M50 13 C55 12 62 13 65 16 L63 17 C60 15 54 14 49 15 Z" fill="#FFFFFF" opacity="0.9" />
            <circle cx="47" cy="16" r="1.5" fill="#FFFFFF" opacity="0.8" />
          </g>

        </g>
      </g>
    </svg>
  );
};
export default TravellerCharacterSVG;
