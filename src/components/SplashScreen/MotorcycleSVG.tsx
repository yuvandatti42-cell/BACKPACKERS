import React from 'react';

interface MotorcycleSVGProps {
  isMoving?: boolean;
  className?: string;
}

export const MotorcycleSVG: React.FC<MotorcycleSVGProps> = ({ isMoving = true, className = '' }) => {
  return (
    <svg
      className={`re-adventure-motorcycle ${isMoving ? 'is-moving' : ''} ${className}`}
      viewBox="0 0 300 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Royal Enfield Adventure Motorcycle"
    >
      <defs>
        {/* Headlight beam gradient */}
        <linearGradient id="headlightBeam" x1="228" y1="52" x2="330" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF9D2" stopOpacity="0.75" />
          <stop offset="25%" stopColor="#FFE89E" stopOpacity="0.35" />
          <stop offset="70%" stopColor="#FFD166" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFD166" stopOpacity="0" />
        </linearGradient>

        {/* Metallic Tank Gradient */}
        <linearGradient id="tankGradient" x1="135" y1="36" x2="175" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2A2A2A" />
          <stop offset="45%" stopColor="#1E1E1E" />
          <stop offset="100%" stopColor="#121212" />
        </linearGradient>

        {/* Engine Bash Plate Metallic */}
        <linearGradient id="bashPlateGrad" x1="108" y1="108" x2="160" y2="120" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7A7A7A" />
          <stop offset="50%" stopColor="#9C9C9C" />
          <stop offset="100%" stopColor="#636363" />
        </linearGradient>

        {/* Exhaust Silencer Brushed Metal */}
        <linearGradient id="silencerGrad" x1="60" y1="78" x2="110" y2="92" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A8A8A8" />
          <stop offset="35%" stopColor="#E2E2E2" />
          <stop offset="70%" stopColor="#9E9E9E" />
          <stop offset="100%" stopColor="#6C6C6C" />
        </linearGradient>
      </defs>

      {/* ====================================================================
          HEADLIGHT LIGHT BEAM
          ==================================================================== */}
      <polygon
        points="226,51 296,105 285,140 226,55"
        fill="url(#headlightBeam)"
        className="headlight-beam"
        pointerEvents="none"
      />

      {/* ====================================================================
          REAR TIRE & WHEEL (Center: 55, 108 | Radius: 32)
          ==================================================================== */}
      <g className="motorcycle-wheel-assembly rear-wheel-assembly">
        <g className="motorcycle-wheel rear-wheel" style={{ transformOrigin: '55px 108px' }}>
          {/* Outer Knobby Tire */}
          <circle cx="55" cy="108" r="32" stroke="#1C1C1C" strokeWidth="6.5" />
          {/* Tire Tread Notches (Knobbies) */}
          <circle
            cx="55"
            cy="108"
            r="32"
            stroke="#2B2B2B"
            strokeWidth="3.5"
            strokeDasharray="4 6"
          />
          {/* Alloy / Spoke Rim */}
          <circle cx="55" cy="108" r="26.5" stroke="#3A3A3A" strokeWidth="1.5" fill="#141414" fillOpacity="0.1" />
          {/* Wire Spokes (8 cross lines = 16 spokes) */}
          <line x1="55" y1="81.5" x2="55" y2="134.5" stroke="#8E8E8E" strokeWidth="0.8" opacity="0.85" />
          <line x1="28.5" y1="108" x2="81.5" y2="108" stroke="#8E8E8E" strokeWidth="0.8" opacity="0.85" />
          <line x1="36.3" y1="89.3" x2="73.7" y2="126.7" stroke="#8E8E8E" strokeWidth="0.8" opacity="0.85" />
          <line x1="73.7" y1="89.3" x2="36.3" y2="126.7" stroke="#8E8E8E" strokeWidth="0.8" opacity="0.85" />
          <line x1="44.6" y1="83.6" x2="65.4" y2="132.4" stroke="#7A7A7A" strokeWidth="0.75" opacity="0.75" />
          <line x1="65.4" y1="83.6" x2="44.6" y2="132.4" stroke="#7A7A7A" strokeWidth="0.75" opacity="0.75" />
          <line x1="30.6" y1="97.6" x2="79.4" y2="118.4" stroke="#7A7A7A" strokeWidth="0.75" opacity="0.75" />
          <line x1="30.6" y1="118.4" x2="79.4" y2="97.6" stroke="#7A7A7A" strokeWidth="0.75" opacity="0.75" />

          {/* Disc Brake Rotor */}
          <circle cx="55" cy="108" r="14" stroke="#909090" strokeWidth="2.5" strokeDasharray="3 2" fill="none" opacity="0.9" />
          {/* Wheel Hub */}
          <circle cx="55" cy="108" r="6.5" fill="#3D3D3D" stroke="#1F1F1F" strokeWidth="1" />
          <circle cx="55" cy="108" r="3" fill="#D4D4D4" />
        </g>
      </g>

      {/* ====================================================================
          FRONT TIRE & WHEEL (Center: 218, 104 | Radius: 36 - 21" Adv Wheel)
          ==================================================================== */}
      <g className="motorcycle-wheel-assembly front-wheel-assembly">
        <g className="motorcycle-wheel front-wheel" style={{ transformOrigin: '218px 104px' }}>
          {/* Outer Knobby Tire */}
          <circle cx="218" cy="104" r="36" stroke="#1C1C1C" strokeWidth="6.5" />
          {/* Tire Tread Notches */}
          <circle
            cx="218"
            cy="104"
            r="36"
            stroke="#2B2B2B"
            strokeWidth="3.5"
            strokeDasharray="4.5 6.5"
          />
          {/* Alloy / Spoke Rim */}
          <circle cx="218" cy="104" r="30.5" stroke="#3A3A3A" strokeWidth="1.5" fill="#141414" fillOpacity="0.1" />
          {/* Wire Spokes */}
          <line x1="218" y1="73.5" x2="218" y2="134.5" stroke="#8E8E8E" strokeWidth="0.8" opacity="0.85" />
          <line x1="187.5" y1="104" x2="248.5" y2="104" stroke="#8E8E8E" strokeWidth="0.8" opacity="0.85" />
          <line x1="196.4" y1="82.4" x2="239.6" y2="125.6" stroke="#8E8E8E" strokeWidth="0.8" opacity="0.85" />
          <line x1="239.6" y1="82.4" x2="196.4" y2="125.6" stroke="#8E8E8E" strokeWidth="0.8" opacity="0.85" />
          <line x1="206.0" y1="75.9" x2="230.0" y2="132.1" stroke="#7A7A7A" strokeWidth="0.75" opacity="0.75" />
          <line x1="230.0" y1="75.9" x2="206.0" y2="132.1" stroke="#7A7A7A" strokeWidth="0.75" opacity="0.75" />
          <line x1="189.9" y1="92.0" x2="246.1" y2="116.0" stroke="#7A7A7A" strokeWidth="0.75" opacity="0.75" />
          <line x1="189.9" y1="116.0" x2="246.1" y2="92.0" stroke="#7A7A7A" strokeWidth="0.75" opacity="0.75" />

          {/* Large Front Disc Brake Rotor */}
          <circle cx="218" cy="104" r="17.5" stroke="#909090" strokeWidth="3" strokeDasharray="3.5 2.5" fill="none" opacity="0.9" />
          {/* Wheel Hub */}
          <circle cx="218" cy="104" r="7" fill="#3D3D3D" stroke="#1F1F1F" strokeWidth="1" />
          <circle cx="218" cy="104" r="3.2" fill="#D4D4D4" />
        </g>
      </g>

      {/* ====================================================================
          BIKE CHASSIS, ENGINE, AND ADVENTURE BODYWORK (Stationary to Frame)
          ==================================================================== */}
      <g className="motorcycle-chassis">
        {/* REAR SWINGARM & DRIVE CHAIN */}
        <path
          d="M112,96 L55,108 L114,104 Z"
          fill="#242424"
          stroke="#181818"
          strokeWidth="1.5"
        />
        {/* Chain Guard */}
        <path d="M60,98 L110,92" stroke="#1A1A1A" strokeWidth="3.5" strokeLinecap="round" />
        {/* Rear Monoshock Damper */}
        <line x1="102" y1="76" x2="108" y2="98" stroke="#333333" strokeWidth="4" />
        <path
          d="M100,80 L106,82 M99,84 L105,86 M98,88 L104,90 M97,92 L103,94"
          stroke="#C85A32"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* REAR BRAKE CALIPER */}
        <rect x="64" y="99" width="7" height="10" rx="1.5" fill="#2E2E2E" stroke="#111" strokeWidth="0.7" />

        {/* FRONT BRAKE CALIPER (ByBre) */}
        <path d="M228,94 L233,101 L230,111 L225,108 Z" fill="#242424" stroke="#111" strokeWidth="0.8" />
        <circle cx="228" cy="101" r="1.2" fill="#C85A32" />

        {/* FRONT TELESCOPIC FORKS (Inverted Stanchions) */}
        {/* Upper Outer Stanchion Tubes (Dark Matte) */}
        <line x1="190" y1="49" x2="208" y2="82" stroke="#1F1F1F" strokeWidth="5.5" strokeLinecap="round" />
        {/* Lower Inverted Golden/Hard-Chrome Tubes */}
        <line x1="205" y1="78" x2="218" y2="104" stroke="#CCA43B" strokeWidth="4" strokeLinecap="round" />
        {/* Fork Seals & Triple Tree Clamp */}
        <rect x="187" y="47" width="8" height="3.5" rx="1" fill="#3D3D3D" transform="rotate(-60 190 49)" />
        <rect x="203" y="78" width="6" height="3" rx="0.8" fill="#181818" transform="rotate(-60 205 78)" />

        {/* FRONT LOWER TIRE HUGGER / MUDGUARD */}
        <path
          d="M202,74 C216,70 234,74 246,88"
          fill="none"
          stroke="#1F1F1F"
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* ENGINE UNIT (Sherpa 450 Style Single Cylinder) */}
        {/* Crankcase Bottom */}
        <path
          d="M106,86 C106,86 112,78 126,78 C136,78 144,84 144,95 C144,106 136,114 122,114 C112,114 106,108 106,96 Z"
          fill="#1C1C1C"
          stroke="#111111"
          strokeWidth="1.2"
        />
        {/* Round Engine Clutch Cover with RE Medallion Ring */}
        <circle cx="125" cy="97" r="9.5" fill="#292929" stroke="#151515" strokeWidth="1" />
        <circle cx="125" cy="97" r="7.5" fill="#1F1F1F" stroke="#383838" strokeWidth="0.8" />
        <circle cx="125" cy="97" r="3" fill="#C85A32" opacity="0.9" />

        {/* Cylinder Block & Cooling Fins */}
        <path d="M124,78 L142,75 L138,62 L121,65 Z" fill="#222222" stroke="#121212" strokeWidth="1" />
        <line x1="122" y1="66" x2="139" y2="64" stroke="#3F3F3F" strokeWidth="1.2" />
        <line x1="123" y1="70" x2="140" y2="68" stroke="#3F3F3F" strokeWidth="1.2" />
        <line x1="124" y1="74" x2="141" y2="72" stroke="#3F3F3F" strokeWidth="1.2" />

        {/* DOHC Cylinder Head & Spark Plug Box */}
        <path d="M120,62 L140,59 L138,54 L119,57 Z" fill="#2F2F2F" stroke="#121212" strokeWidth="1" />

        {/* RUGGED SUMP GUARD / BASH PLATE */}
        <path
          d="M104,106 L112,117 L146,116 L155,103 L151,102 L143,113 L114,114 L107,105 Z"
          fill="url(#bashPlateGrad)"
          stroke="#383838"
          strokeWidth="1"
        />
        {/* Bash Plate Ventilation Slots */}
        <line x1="120" y1="114.5" x2="126" y2="114.5" stroke="#1C1C1C" strokeWidth="1" />
        <line x1="130" y1="114.5" x2="136" y2="114.5" stroke="#1C1C1C" strokeWidth="1" />

        {/* EXHAUST SYSTEM (Header Pipe + Upswept Silencer) */}
        {/* Exhaust Header Pipe curving from cylinder head down into cat-box */}
        <path
          d="M138,68 C146,69 152,78 150,90 C148,102 138,109 122,110 L98,104"
          fill="none"
          stroke="#404040"
          strokeWidth="3.8"
          strokeLinecap="round"
        />
        {/* Upswept Adventure Silencer Canister */}
        <path
          d="M96,104 L60,85 L56,76 L66,73 L104,96 Z"
          fill="url(#silencerGrad)"
          stroke="#333333"
          strokeWidth="1"
        />
        {/* Silencer Heat Shield */}
        <path d="M78,85 L65,78 L68,76 L82,83 Z" fill="#2E2E2E" stroke="#1A1A1A" strokeWidth="0.8" />
        {/* Silencer Dark End Cap */}
        <path d="M56,76 L66,73 L63,70 L53,73 Z" fill="#181818" />
        <circle cx="59" cy="73" r="2.2" fill="#0A0A0A" />

        {/* RIDER FOOTPEGS & CONTROLS */}
        <rect x="114" y="103" width="9" height="3" rx="1" fill="#666666" stroke="#222" strokeWidth="0.6" />

        {/* MAIN FRAME & SUBFRAME */}
        <path
          d="M184,52 L150,56 L124,78 L104,95"
          fill="none"
          stroke="#1F1F1F"
          strokeWidth="3.2"
        />
        <path
          d="M142,57 L110,60 L72,62 L50,65"
          fill="none"
          stroke="#262626"
          strokeWidth="2.8"
        />

        {/* HIMALAYAN SIGNATURE TUBULAR TANK CRASH BARS / JERRY RACKS */}
        <path
          d="M183,48 L170,47 L154,60 L166,75 L180,68 Z"
          fill="none"
          stroke="#2B2B2B"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <line x1="162" y1="54" x2="173" y2="71" stroke="#2B2B2B" strokeWidth="1.8" />

        {/* SCULPTED FUEL TANK (Adventure Form) */}
        <path
          d="M136,58 C136,58 138,44 148,39 C158,34 175,37 184,47 C185,53 176,57 166,61 C154,64 142,63 136,58 Z"
          fill="url(#tankGradient)"
          stroke="#111111"
          strokeWidth="1.4"
        />
        {/* Signature Backpackers Terracotta Accent Stripe on Tank */}
        <path
          d="M146,43 C154,39 168,40 176,48 L172,52 C164,45 152,44 144,48 Z"
          fill="#C85A32"
        />
        {/* Subtle Fuel Filler Cap */}
        <ellipse cx="162" cy="38.5" rx="3.5" ry="1.4" fill="#3D3D3D" stroke="#181818" strokeWidth="0.8" />
        {/* Tank Knee Pad Grip */}
        <path d="M144,53 C148,50 156,51 160,54 C158,58 150,59 144,56 Z" fill="#141414" opacity="0.8" />

        {/* STEPPED ADVENTURE TOURING DUAL SEAT */}
        {/* Rider Lower Scooped Seat */}
        <path
          d="M104,58 C112,56 124,56 136,58 C137,61 133,65 122,65 C112,65 104,62 104,58 Z"
          fill="#1C1C1C"
          stroke="#111"
          strokeWidth="1"
        />
        {/* Raised Pillion / Passenger Seat */}
        <path
          d="M74,53 C84,51 98,52 106,58 C104,62 94,62 82,61 C75,60 73,56 74,53 Z"
          fill="#1F1F1F"
          stroke="#111"
          strokeWidth="1"
        />
        {/* Seat Stitching Seam Line */}
        <path d="M78,55 C92,54 114,57 132,59" stroke="#333333" strokeWidth="0.8" strokeDasharray="2 1.5" />

        {/* REAR TAIL COWL & LUGGAGE RACK */}
        <path d="M74,54 L52,58 L54,64 L75,62 Z" fill="#242424" stroke="#151515" strokeWidth="1" />
        {/* Adventure Rear Tail Carrier Rack (Tubular) */}
        <path
          d="M50,57 L40,56 L42,51 L56,52 Z"
          fill="none"
          stroke="#424242"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Side Pannier Stay Frame */}
        <rect x="52" y="64" width="22" height="13" rx="2" fill="none" stroke="#383838" strokeWidth="1.6" />
        {/* Rear Splash Guard & License Plate Tail Extension */}
        <path
          d="M52,64 L38,76 L36,88 L40,88 L43,78 L54,68 Z"
          fill="#1A1A1A"
          stroke="#111"
          strokeWidth="0.8"
        />
        {/* Rear Red LED Tail Light */}
        <rect x="49" y="56" width="3" height="4.5" rx="1" fill="#E63946" />

        {/* COCKPIT, WINDSCREEN & HIGH ADVENTURE BEAK */}
        {/* High Adventure Beak / Front Mudguard */}
        <path
          d="M188,58 L238,64 L244,66 L234,70 L194,65 Z"
          fill="#1E1E1E"
          stroke="#111111"
          strokeWidth="1.2"
        />
        {/* Beak Accent Edge */}
        <line x1="196" y1="63" x2="238" y2="66" stroke="#C85A32" strokeWidth="1.2" strokeLinecap="round" />

        {/* Tall Adventure Touring Windscreen */}
        <path
          d="M208,49 L204,18 C204,18 209,16 215,20 L219,45 Z"
          fill="#EAF4F4"
          fillOpacity="0.4"
          stroke="#A8BDBE"
          strokeWidth="1.2"
        />
        <line x1="208" y1="23" x2="214" y2="44" stroke="#FFFFFF" strokeWidth="0.8" opacity="0.6" />

        {/* Round Vintage Adventure LED Headlamp */}
        {/* Outer Headlight Shell */}
        <path
          d="M211,44 C211,44 222,46 222,54 C222,62 211,64 211,64 Z"
          fill="#1A1A1A"
          stroke="#2A2A2A"
          strokeWidth="1.2"
        />
        {/* Chrome Bezel */}
        <ellipse cx="221" cy="54" rx="2.5" ry="8" fill="#D1D1D1" stroke="#888" strokeWidth="0.8" />
        {/* Glass Lens with Glowing Warm Core */}
        <ellipse cx="222.5" cy="54" rx="1.8" ry="7" fill="#FFFBE6" />
        <circle cx="223" cy="54" r="2.5" fill="#FFE57F" />

        {/* Wide Handlebars & Controls */}
        <path d="M184,36 L196,33 L204,36" fill="none" stroke="#2B2B2B" strokeWidth="2.8" strokeLinecap="round" />
        {/* Left Handguard */}
        <path d="M198,30 C205,30 207,35 204,38" fill="none" stroke="#181818" strokeWidth="3" strokeLinecap="round" />
        {/* Mirror */}
        <line x1="192" y1="33" x2="187" y2="24" stroke="#2B2B2B" strokeWidth="1.6" />
        <ellipse cx="186" cy="22" rx="3" ry="4" fill="#1C1C1C" stroke="#444" strokeWidth="0.8" />
      </g>
    </svg>
  );
};
