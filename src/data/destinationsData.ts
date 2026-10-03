export type TripTypeCategory = 'weekend' | 'long-expedition' | 'bike-trips' | 'off-beaten';

export interface TripTypeInfo {
  id: TripTypeCategory;
  title: string;
  subtitle: string;
  badgeText: string;
  image: string;
  description: string;
  durationRange: string;
}

export const TRIP_TYPES: TripTypeInfo[] = [
  {
    id: 'weekend',
    title: 'WEEKEND TRIPS',
    subtitle: 'Quick 2–4 Day Escapes',
    badgeText: 'SHORT & INTENSE',
    image: '/wkndtp.webp',
    description: 'Fast-paced mountain ridge runs and coastal getaways designed for tight schedules.',
    durationRange: '2 — 4 DAYS'
  },
  {
    id: 'long-expedition',
    title: 'LONG EXPEDITION',
    subtitle: '5–14 Day Deep Overlands',
    badgeText: 'FULL TRANSIT',
    image: '/long.webp',
    description: 'Multi-day endurance runs crossing 17,000+ ft passes and cold desert plateaus.',
    durationRange: '5 — 14 DAYS'
  },
  {
    id: 'bike-trips',
    title: 'BIKE TRIPS',
    subtitle: 'Motorcycle & MTB Traverses',
    badgeText: 'TWO-WHEEL FREEDOM',
    image: '/bike.webp',
    description: 'Scouted two-wheeler routes backed by dedicated support trucks and satellite comms.',
    durationRange: '3 — 10 DAYS'
  },
  {
    id: 'off-beaten',
    title: 'OFF BEATEN PLACES',
    subtitle: 'Raw Backcountry Routes',
    badgeText: '100% UNSCRIPTED',
    image: '/off.webp',
    description: 'Untouched valley trails, cliffside monasteries, and wild backcountry camping.',
    durationRange: '4 — 12 DAYS'
  }
];

export interface CorridorDetail {
  id: string;
  number: string;
  region: string;
  title: string;
  subtitle: string;
  startingPrice: string;
  numericPrice: number;
  tripTypes: TripTypeCategory[];
  elevation: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPEDITION' | 'EXPERT';
  duration: string;
  durationDays: number;
  distance: string;
  bestSeason: string;
  squadSize: string;
  terrain: string;
  landscapeZone: 'South India' | 'North India & Ladakh';
  highlights: string[];
  description: string;
  image: string;
  frameColor: string;
  keywords: string[];
}

export const DESTINATION_CORRIDORS: CorridorDetail[] = [
  {
    id: 'kerala',
    number: '01',
    region: 'KERALA',
    title: 'KERALA',
    subtitle: 'Munnar Tea Hills • Wayanad Rainforest • Alleppey Backwaters',
    startingPrice: '₹5,999',
    numericPrice: 5999,
    tripTypes: ['weekend', 'long-expedition'],
    elevation: '8,800 FT / 2,695 M',
    difficulty: 'BEGINNER',
    duration: '6 DAYS / 5 NIGHTS',
    durationDays: 6,
    distance: '620 KM',
    bestSeason: 'SEPTEMBER — MARCH',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Misty Ghat Passes, Tea Slopes & Backwater Corridors',
    landscapeZone: 'South India',
    highlights: [
      'Munnar cloud forest switchbacks & tea estate stays',
      'Wayanad sanctuary rainforest & bamboo forest trails',
      'Traditional Kerala houseboat overnight stay on backwaters',
      'Malabar coast drive & local spice plantation experience'
    ],
    description: 'From misty tea gardens in Munnar to peaceful backwater lagoons, Kerala offers a deep long-tour journey combining high mountain ridges with lush tropical coastlines.',
    image: '/ke.webp',
    frameColor: '#7B8C78',
    keywords: ['kerala', 'munnar', 'wayanad', 'alleppey', 'tea', 'plantation', 'backwaters', 'houseboat', 'south india', 'rainforest', '5999', 'cheap', 'budget', 'monsoon']
  },
  {
    id: 'ladakh',
    number: '02',
    region: 'LADAKH',
    title: 'LADAKH',
    subtitle: 'Khardung La Pass • Pangong Tso • Nubra Valley',
    startingPrice: '₹28,999',
    numericPrice: 28999,
    tripTypes: ['bike-trips', 'long-expedition'],
    elevation: '17,582 FT / 5,359 M',
    difficulty: 'EXPEDITION',
    duration: '9 DAYS / 8 NIGHTS',
    durationDays: 9,
    distance: '1,250 KM',
    bestSeason: 'JUNE — SEPTEMBER',
    squadSize: '4 - 10 RIDERS',
    terrain: 'Cold Desert, High Motorable Passes & Himalayan Scree',
    landscapeZone: 'North India & Ladakh',
    highlights: [
      'Cross world-famous Khardung La & Chang La high mountain passes',
      'Camp lakeside at turquoise Pangong Tso under starry skies',
      'Sand dune camel safari & monastery valleys in Nubra',
      'Full backup support crew, oxygen backup & satellite comms'
    ],
    description: 'The legendary Trans-Himalayan long expedition. Traverse barren cold desert high passes, ancient cliffside monasteries, and high-altitude lakes.',
    image: '/ladakh.webp',
    frameColor: '#768C9E',
    keywords: ['ladakh', 'leh', 'khardung la', 'pangong', 'pangong tso', 'nubra', 'nubra valley', 'chang la', 'north india', 'cold desert', 'himalaya', 'pass', 'bike', 'motorcycle', '28999']
  },
  {
    id: 'kodaikanal',
    number: '03',
    region: 'KODAIKANAL',
    title: 'KODAIKANAL',
    subtitle: 'Pillar Rocks • Berijam Lake Forest • Pine Reserve',
    startingPrice: '₹6,999',
    numericPrice: 6999,
    tripTypes: ['weekend'],
    elevation: '7,000 FT / 2,133 M',
    difficulty: 'INTERMEDIATE',
    duration: '4 DAYS / 3 NIGHTS',
    durationDays: 4,
    distance: '450 KM',
    bestSeason: 'YEAR-ROUND',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Dense Pine Forests, Cliff Views & Shola Mountain Curves',
    landscapeZone: 'South India',
    highlights: [
      'Ride through towering dense pine forest canopy trails',
      'Panoramic cliffside viewpoints at Pillar Rocks & Coaker’s Walk',
      'Off-grid forest permit routes to secluded Berijam Lake',
      'Cozy heritage cottage stays with campfire evenings'
    ],
    description: 'Known as the Princess of Hill Stations. A misty, pine-scented highland route winding around precipitous cliff vistas and tranquil mountain lakes.',
    image: '/kodai.webp',
    frameColor: '#4E7063',
    keywords: ['kodaikanal', 'kodai', 'pillar rocks', 'berijam', 'pine forest', 'coaker walk', 'shola', 'south india', 'tamil nadu', 'hill station', 'weekend', '6999']
  },
  {
    id: 'ooty-coonoor',
    number: '04',
    region: 'OOTY / COONOOR',
    title: 'OOTY / COONOOR',
    subtitle: '36 Hairpin Bend Corridor • Nilgiri Tea Hills • Heritage Ridge',
    startingPrice: '₹6,999',
    numericPrice: 6999,
    tripTypes: ['weekend'],
    elevation: '7,350 FT / 2,240 M',
    difficulty: 'INTERMEDIATE',
    duration: '3 DAYS / 2 NIGHTS',
    durationDays: 3,
    distance: '510 KM',
    bestSeason: 'SEPTEMBER — MAY',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Continuous Hairpin Switchbacks & High Tea Slopes',
    landscapeZone: 'South India',
    highlights: [
      'Day 1: Botanical Garden, Doddabetta Peak & Ooty Lake',
      'Day 2: Pine Forest, Pykara Waterfalls & Shooting Spots',
      'Day 3: Nilgiri Mountain Railway, Sim’s Park & Dolphin’s Nose',
      'Coimbatore Pickup & Drop, Campfire & Meals Included'
    ],
    description: 'A thrilling Nilgiri mountain traverse featuring steep hairpin turns, emerald tea plantations, and cool mountain breezes across Ooty and Coonoor.',
    image: '/ooty.webp',
    frameColor: '#5C745A',
    keywords: ['ooty', 'coonoor', '36 hairpin', 'nilgiri', 'doddabetta', 'pykara', 'toy train', 'tea estate', 'south india', 'tamil nadu', 'weekend', '6999']
  },
  {
    id: 'arunachalam-pondicherry',
    number: '05',
    region: 'ARUNACHALAM X PONDICHERRY',
    title: 'ARUNACHALAM X PONDICHERRY',
    subtitle: 'Spiritual Peak Circuit • French Quarter • Coromandel Coast',
    startingPrice: '₹7,499',
    numericPrice: 7499,
    tripTypes: ['weekend'],
    elevation: '2,668 FT / 813 M',
    difficulty: 'BEGINNER',
    duration: '5 DAYS / 4 NIGHTS',
    durationDays: 5,
    distance: '580 KM',
    bestSeason: 'OCTOBER — MARCH',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Sacred Hill Routes, Inland Highways & Coastal Promenades',
    landscapeZone: 'South India',
    highlights: [
      'Girivalam barefoot walk & sunrise views around holy Arunachala Hill',
      'Scenic highway drive connecting ancient temple towns to the coast',
      'French colonial architecture, cafes & coastal bike ride in Pondicherry',
      'Sunset seaside promenade runs along the Coromandel oceanfront'
    ],
    description: 'A unique spiritual-meets-coastal long journey. Transition from the serene energy of Tiruvannamalai (Arunachalam) to the vibrant French Quarter and ocean breeze of Pondicherry.',
    image: '/pondi.webp',
    frameColor: '#8C5A48',
    keywords: ['arunachalam', 'tiruvannamalai', 'arunachala', 'pondicherry', 'pondy', 'french quarter', 'girivalam', 'south india', 'beach', 'coastal', 'spiritual', '7499']
  },
  {
    id: 'gokarna-dandeli',
    number: '06',
    region: 'GOKARNA & DANDELI',
    title: 'GOKARNA AND DANDELI',
    subtitle: 'Om Beach Cliff Trek • Kali River Rafting • Rainforest Canopy',
    startingPrice: '₹5,999',
    numericPrice: 5999,
    tripTypes: ['weekend'],
    elevation: '1,800 FT / 550 M',
    difficulty: 'INTERMEDIATE',
    duration: '5 DAYS / 4 NIGHTS',
    durationDays: 5,
    distance: '680 KM',
    bestSeason: 'OCTOBER — MAY',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Coastal Cliff Roads, Dense Jungle Reserves & River Gorges',
    landscapeZone: 'South India',
    highlights: [
      'Sunset cliff treks connecting Om Beach, Half Moon & Paradise Beach',
      'White-water rafting and river camping on the roaring Kali River in Dandeli',
      'Dense jungle canopy rides in Anshi Tiger Reserve',
      'Beachside bonfires & fresh local coastal seafood dining'
    ],
    description: 'Where the jungle meets the Arabian Sea. Experience high-octane river rafting in Dandeli’s rainforests followed by relaxed cliff beach sunsets in Gokarna.',
    image: '/gokarna.webp',
    frameColor: '#3A5C6D',
    keywords: ['gokarna', 'dandeli', 'kali river', 'rafting', 'white water', 'om beach', 'cliff trek', 'south india', 'karnataka', 'jungle', 'beach', '5999', 'water sports']
  },
  {
    id: 'chikmagalur',
    number: '07',
    region: 'CHIKMAGALUR',
    title: 'CHIKMAGALUR',
    subtitle: 'Mullayanagiri Peak • Baba Budangiri • Hebbe Waterfalls',
    startingPrice: '₹5,999',
    numericPrice: 5999,
    tripTypes: ['weekend', 'bike-trips'],
    elevation: '6,317 FT / 1,930 M',
    difficulty: 'INTERMEDIATE',
    duration: '4 DAYS / 3 NIGHTS',
    durationDays: 4,
    distance: '490 KM',
    bestSeason: 'SEPTEMBER — MAY',
    squadSize: '6 - 12 TRAVELLERS',
    terrain: 'Coffee Estate Roads, Mountain Switchbacks & Dirt Spurs',
    landscapeZone: 'South India',
    highlights: [
      'Summits Karnataka’s highest peak Mullayanagiri amidst rolling fog',
      'Off-road Jeep & bike trails to hidden Hebbe & Jhari Waterfalls',
      'Private coffee estate stays with bean-to-cup brewing workshops',
      'Scenic ridge rides across Baba Budangiri mountain range'
    ],
    description: 'The birthplace of Indian coffee. Ride up misty high-altitude peaks, navigate coffee plantation dirt tracks, and cool off beneath roaring waterfall cascades.',
    image: '/chick.webp',
    frameColor: '#7B6852',
    keywords: ['chikmagalur', 'mullayanagiri', 'baba budangiri', 'hebbe', 'waterfall', 'coffee', 'plantation', 'highest peak', 'karnataka', 'south india', 'off road', '5999', 'bike']
  },
  {
    id: 'spiti',
    number: '08',
    region: 'SPITI VALLEY',
    title: 'DESERT MOUNTAIN CIRCUIT',
    subtitle: 'Kunzum Pass • Kaza • Chandratal Moon Lake',
    startingPrice: '₹28,999',
    numericPrice: 28999,
    tripTypes: ['bike-trips', 'long-expedition'],
    elevation: '15,059 FT / 4,590 M',
    difficulty: 'EXPEDITION',
    duration: '7 DAYS / 6 NIGHTS',
    durationDays: 7,
    distance: '920 KM',
    bestSeason: 'JUNE — OCTOBER',
    squadSize: '4 - 8 RIDERS',
    terrain: 'Water Crossings, Loose Shales & High Alpine Gorges',
    landscapeZone: 'North India & Ladakh',
    highlights: [
      'Cross treacherous water nullahs along Kinnaur cliff road',
      'Visit Key Monastery perched on a thousand-foot hill spire',
      'Camp under crystal clear starry skies at Chandratal Lake',
      'Conquer Kunzum La pass with panoramic views of Shigri Glacier'
    ],
    description: 'The Middle Land between India and Tibet. Remote, rugged, and unpaved, Spiti demands resilience as you conquer glacial runoff rivers and ancient monastery valleys.',
    image: '/tour_spiti.webp',
    frameColor: '#C29B53',
    keywords: ['spiti', 'spiti valley', 'kaza', 'kunzum', 'chandratal', 'moon lake', 'key monastery', 'hikkim', 'north india', 'himachal', 'cold desert', 'bike', '28999']
  }
];
