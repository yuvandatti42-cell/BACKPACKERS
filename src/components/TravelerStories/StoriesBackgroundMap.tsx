import React from 'react';

interface StoriesBackgroundMapProps {
  isRevealed: boolean;
}

export const StoriesBackgroundMap: React.FC<StoriesBackgroundMapProps> = ({ isRevealed }) => {
  return (
    <div className={`stories-bg-map-wrap ${isRevealed ? 'is-revealed' : ''}`} aria-hidden="true">
      <svg
        className="stories-topo-svg"
        viewBox="0 0 1440 680"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* ====================================================================
            1. FAINT HIMALAYAN / MOUNTAIN LANDSCAPE SILHOUETTES
            ==================================================================== */}
        <g className="topo-mountain-contours">
          {/* Distant Highest Peaks (Very Low Opacity 0.035) */}
          <path
            d="M-20,440 L90,340 L160,390 L270,280 L350,330 L480,240 L580,310 L680,220 L760,260 L890,190 L980,250 L1100,180 L1220,270 L1340,210 L1460,320 L1480,480"
            stroke="#1C1C1C"
            strokeWidth="0.8"
            strokeDasharray="4 4"
            opacity="0.035"
          />

          {/* Mid Ridge Peaks with Subtle Elevation Lines */}
          <path
            d="M-40,490 L110,410 L230,470 L340,360 L440,410 L590,320 L720,380 L840,290 L940,330 L1080,250 L1210,330 L1360,280 L1480,390"
            stroke="#1C1C1C"
            strokeWidth="1"
            opacity="0.045"
          />

          {/* Foreground Mountain Foothills */}
          <path
            d="M-20,540 L180,480 L320,520 L480,430 L640,490 L790,420 L960,470 L1120,390 L1290,460 L1460,420"
            stroke="#1C1C1C"
            strokeWidth="1"
            opacity="0.04"
          />
        </g>

        {/* ====================================================================
            2. TOPOGRAPHIC CONTOUR MAP LINES (Expedition Map Feel)
            ==================================================================== */}
        <g className="topo-contour-curves" opacity="0.045">
          {/* Contour Loop A */}
          <path
            d="M60,180 C180,120 340,160 420,240 C500,320 440,420 300,440 C160,460 40,360 60,180 Z"
            stroke="#1C1C1C"
            strokeWidth="0.75"
          />
          {/* Contour Loop B (Inner) */}
          <path
            d="M110,210 C190,170 300,190 360,250 C420,310 380,380 280,390 C180,400 90,330 110,210 Z"
            stroke="#1C1C1C"
            strokeWidth="0.65"
            strokeDasharray="2 3"
          />
          {/* Right Contour Loop C */}
          <path
            d="M980,140 C1120,90 1280,130 1360,210 C1440,290 1400,410 1260,430 C1120,450 960,370 980,140 Z"
            stroke="#1C1C1C"
            strokeWidth="0.75"
          />
        </g>

        {/* ====================================================================
            3. WINDING EXPEDITION MOTORCYCLE ROUTE (Slow Reveal Animation)
            ==================================================================== */}
        <g className="topo-expedition-route">
          {/* Faint Under-Glow of the Route */}
          <path
            d="M-30,460 C120,440 220,380 340,310 C460,240 540,290 680,260 C820,230 920,310 1060,280 C1200,250 1320,340 1470,300"
            stroke="#E6A817"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.08"
          />

          {/* Main Motorcycle Trail Path with Animated Dash Draw */}
          <path
            className="route-draw-path"
            d="M-30,460 C120,440 220,380 340,310 C460,240 540,290 680,260 C820,230 920,310 1060,280 C1200,250 1320,340 1470,300"
            stroke="#C85A32"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="6 4"
            opacity="0.28"
          />
        </g>

        {/* ====================================================================
            4. TINY LOCATION / EXPEDITION WAYPOINT MARKERS
            ==================================================================== */}
        <g className="topo-waypoints">
          {/* Waypoint 1 */}
          <g className="waypoint-marker" transform="translate(340, 310)">
            <circle cx="0" cy="0" r="4.5" fill="none" stroke="#C85A32" strokeWidth="1" opacity="0.4" />
            <circle cx="0" cy="0" r="2" fill="#C85A32" opacity="0.6" />
            <text x="8" y="3" fill="#1C1C1C" fontSize="8" fontFamily="'Inter', sans-serif" fontWeight="700" letterSpacing="0.15em" opacity="0.32">
              WP-01 • PASS BASE
            </text>
          </g>

          {/* Waypoint 2 */}
          <g className="waypoint-marker" transform="translate(680, 260)">
            <circle cx="0" cy="0" r="4.5" fill="none" stroke="#C85A32" strokeWidth="1" opacity="0.4" />
            <circle cx="0" cy="0" r="2" fill="#C85A32" opacity="0.6" />
            <text x="8" y="-4" fill="#1C1C1C" fontSize="8" fontFamily="'Inter', sans-serif" fontWeight="700" letterSpacing="0.15em" opacity="0.32">
              HIGH RIDGE • 4,280M
            </text>
          </g>

          {/* Waypoint 3 */}
          <g className="waypoint-marker" transform="translate(1060, 280)">
            <circle cx="0" cy="0" r="4.5" fill="none" stroke="#C85A32" strokeWidth="1" opacity="0.4" />
            <circle cx="0" cy="0" r="2" fill="#C85A32" opacity="0.6" />
            <text x="8" y="10" fill="#1C1C1C" fontSize="8" fontFamily="'Inter', sans-serif" fontWeight="700" letterSpacing="0.15em" opacity="0.32">
              VALLEY DESCENT // WP-03
            </text>
          </g>

          {/* Elevation Benchmark Triangle */}
          <g className="waypoint-marker" transform="translate(890, 190)">
            <polygon points="0,-4 3.5,3 -3.5,3" fill="none" stroke="#1C1C1C" strokeWidth="0.8" opacity="0.25" />
            <text x="6" y="2" fill="#1C1C1C" fontSize="7" fontFamily="'Inter', sans-serif" letterSpacing="0.12em" opacity="0.22">
              ▲ 4,680M PEAK
            </text>
          </g>
        </g>
      </svg>
    </div>
  );
};

export default StoriesBackgroundMap;
