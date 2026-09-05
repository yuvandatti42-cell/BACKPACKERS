import React from 'react';
import { Header } from '../components/Header/Header';
import { Footer } from '../components/Footer/Footer';
import { FeaturedExpeditions } from '../components/FeaturedExpeditions/FeaturedExpeditions';
import './ToursPage.css';

export interface TourDetail {
  id: string;
  number: string;
  destination: string;
  title: string;
  subTitle: string;
  category: 'expedition' | 'intermediate' | 'coastal' | 'bike';
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  duration: string;
  distance: string;
  elevation: string;
  image: string;
  frameColor: string;
  price: string;
  nextDeparture: string;
  slotsRemaining: number;
  highlights: string[];
  inclusions: string[];
  description: string;
}

export const TOURS_DATA: TourDetail[] = [
  {
    id: 'tour-ladakh',
    number: '01',
    destination: 'LADAKH',
    title: 'HIGH ALTITUDE ROAD EXPEDITION',
    subTitle: 'Leh • Khardung La • Nubra • Pangong Tso',
    category: 'expedition',
    difficulty: 'ADVANCED',
    duration: '8 DAYS / 7 NIGHTS',
    distance: '1,200 KM',
    elevation: '17,582 FT',
    image: '/ladakh.jpg',
    frameColor: '#768C9E',
    price: '₹34,500',
    nextDeparture: '15 MAY 2026',
    slotsRemaining: 4,
    highlights: [
      'Cross Khardung La — one of the highest motorable passes in the world',
      'Double-hump Bactrian camel safari in the high desert of Hunder',
      'Overnight glamping on the shores of cobalt-blue Pangong Tso',
      'Full backup truck with mechanic, spares, and oxygen cylinder support'
    ],
    inclusions: [
      'RE Himalayan 450 Motorbikes & Fuel',
      'Protected Area Permits & Environmental Fees',
      'Twin Sharing Deluxe Camps & Hotels with Breakfast & Dinner',
      'Lead Expedition Captain & Certified Mechanic'
    ],
    description: 'An iconic high-altitude motorcycle and overland traverse across the rugged mountain deserts of Ladakh. Negotiate gravel switchbacks, glacial streams, and high passes reaching 17,500+ feet.'
  },
  {
    id: 'tour-nepal',
    number: '02',
    destination: 'NEPAL',
    title: 'HIMALAYAN FRONTIERS TRAVERSE',
    subTitle: 'Kathmandu • Pokhara • Mustang Rim Corridor',
    category: 'expedition',
    difficulty: 'INTERMEDIATE',
    duration: '6 DAYS / 5 NIGHTS',
    distance: '850 KM',
    elevation: '12,400 FT',
    image: '/nep.jpg',
    frameColor: '#BC5F44',
    price: '₹42,000',
    nextDeparture: '02 JUNE 2026',
    slotsRemaining: 6,
    highlights: [
      'Riding under the shadows of Annapurna and Dhaulagiri massifs',
      'Deep gorge crossings via suspensions and riverbed dirt tracks',
      'Authentic Mustang tea-house stays and Tibetan culture',
      '4x4 lead vehicle and complete luggage transport'
    ],
    inclusions: [
      'Dual-sport Motorbikes / SUV seats',
      'TIMS & ACAP Conservation Permits',
      'Boutique Teahouse & Heritage Hotel Stays',
      'Medical First-Responder Support'
    ],
    description: 'Immerse into the raw beauty of Nepal’s mountain valleys and cliffside villages. Ride along ancient trading corridors with dramatic snowcapped Himalayan backdrops.'
  },
  {
    id: 'tour-kerala',
    number: '03',
    destination: 'KERALA',
    title: 'WESTERN GHATS & COASTAL ESCAPE',
    subTitle: 'Munnar • Vagamon • Alleppey Backwaters',
    category: 'coastal',
    difficulty: 'BEGINNER',
    duration: '4 DAYS / 3 NIGHTS',
    distance: '520 KM',
    elevation: '5,200 FT',
    image: '/ke.jpg',
    frameColor: '#7B8C78',
    price: '₹19,800',
    nextDeparture: '28 APRIL 2026',
    slotsRemaining: 8,
    highlights: [
      'Carve through misty tea estate hairpin bends in Munnar',
      'Sunset cruise and overnight luxury houseboat stay in Alleppey',
      'Off-road forest trail loops through spice plantations',
      'Relaxed pace suitable for beginners and couples'
    ],
    inclusions: [
      'Scouted Route GPX & Lead Navigator',
      'Luxury Plantation Resort & Houseboat Stay',
      'All Meals Included (Traditional Malabar Feast)',
      'Luggage Van & Support Crew'
    ],
    description: 'A lush tropical traverse through green mountain passes, cloud-covered tea plantations, and calm palm-fringed backwaters of Southern India.'
  },
  {
    id: 'tour-spiti',
    number: '04',
    destination: 'SPITI',
    title: 'DESERT MOUNTAIN ROAD CIRCUIT',
    subTitle: 'Shimla • Kaza • Chandratal Lake • Manali',
    category: 'expedition',
    difficulty: 'ADVANCED',
    duration: '7 DAYS / 6 NIGHTS',
    distance: '900 KM',
    elevation: '15,000 FT',
    image: '/tour_spiti.jpg',
    frameColor: '#C29B53',
    price: '₹29,900',
    nextDeparture: '10 JUNE 2026',
    slotsRemaining: 3,
    highlights: [
      'Traverse the world-famous "World\'s Most Treacherous Road" corridor',
      'Visit Key Monastery perched at 13,668 feet altitude',
      'Camping beneath galaxy-lit skies at Chandratal Lake',
      'Unmatched rugged river Nullah crossings'
    ],
    inclusions: [
      'Customized 4x4 Off-Road Vehicle / Motorbike Option',
      'All Inner Line Permits & Green Tax',
      'Homestays & High-Altitude Camping Gear',
      'Oxygen & First Aid Backup'
    ],
    description: 'The ultimate rugged circuit through the middle land of Spiti Valley. Experience cold desert landscapes, ancient cliffside monasteries, and turquoise mountain lakes.'
  },
  {
    id: 'tour-bhutan',
    number: '05',
    destination: 'BHUTAN',
    title: 'MOUNTAIN KINGDOM EXPEDITION',
    subTitle: 'Phuntsholing • Thimphu • Punakha • Paro Taktsang',
    category: 'intermediate',
    difficulty: 'INTERMEDIATE',
    duration: '9 DAYS / 8 NIGHTS',
    distance: '780 KM',
    elevation: '10,200 FT',
    image: '/tour_bhutan.jpg',
    frameColor: '#4A8280',
    price: '₹58,500',
    nextDeparture: '05 OCT 2026',
    slotsRemaining: 5,
    highlights: [
      'Hike to the legendary Tiger’s Nest (Paro Taktsang) Monastery',
      'Ride across Dochula Pass featuring 108 memorial chortens',
      'Cultural immersion in traditional Bhutanese Dzongs',
      'Seamless cross-border entry permits & Sustainable Development Fee'
    ],
    inclusions: [
      'Bhutan SDF (Sustainable Development Fee) & Visa Clearance',
      '4-Star Heritage Hotels & Traditional Dining',
      'Licensed Bhutanese Guide & Local Escort',
      'Support Vehicle & Luggage Transfer'
    ],
    description: 'Step into the Land of the Thunder Dragon. Explore pristine mountain pine forests, grand fortress monasteries, and peaceful Himalayan valley passes.'
  }
];

interface ToursPageProps {
  onNavigate?: (route: string, sectionId?: string, categoryFilter?: string) => void;
}

export const ToursPage: React.FC<ToursPageProps> = ({ onNavigate }) => {

  return (
    <div className="tours-page-root">
      <Header onNavigate={onNavigate} currentRoute="tours" />

      <main className="tours-main">
        
        {/* Epic Hero Header Banner */}
        <section className="tours-hero">
          <div className="tours-hero-overlay"></div>
          <div className="container tours-hero-content">
            <span className="hero-eyebrow">+ FEATURED ADVENTURES &amp; EXPEDITIONS</span>
            <h1 className="tours-hero-title">
              OUR CURATED <span className="text-gold">TOURS</span>
            </h1>
            <p className="tours-hero-subtitle">
              Handcrafted mountain traverses, coastal corridors, and desert circuits led by veteran expedition captains with full support crews.
            </p>
            
            <div className="tours-hero-stats">
              <div className="stat-pill">
                <span className="stat-num">05</span>
                <span className="stat-label">EXPEDITION CORRIDORS</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-pill">
                <span className="stat-num">100%</span>
                <span className="stat-label">MECHANIC &amp; BACKUP SUPPORT</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-pill">
                <span className="stat-num">17.5K'</span>
                <span className="stat-label">MAX ALTITUDE REACHED</span>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Tours Infinite Marquee Carousel Section */}
        <FeaturedExpeditions />

        {/* CTA Planner Section */}
        <section className="tours-cta-section">
          <div className="container">
            <div className="tours-cta-box">
              <span className="cta-eyebrow">+ CUSTOM TRAVERSES &amp; PRIVATE GROUPS</span>
              <h2>WANT A TAILORED TOUR FOR YOUR SQUAD?</h2>
              <p>We build custom routes, support vehicle convoys, and dates tailored to your schedule.</p>
              <button 
                className="cta-action-btn"
                onClick={() => onNavigate && onNavigate('home', 'planner')}
              >
                REQUEST CUSTOM ITINERARY &rarr;
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};
