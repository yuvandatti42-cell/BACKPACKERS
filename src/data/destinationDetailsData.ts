export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights?: string[];
}

export interface DestinationDetail {
  id: string;
  title: string;
  durationShort: string;
  durationFull: string;
  startingPrice: string;
  numericPrice: number;
  image: string;
  pdfUrl?: string;
  frameColor: string;
  region: string;
  elevation: string;
  squadSize: string;
  difficulty: string;
  bestSeason: string;

  about: {
    overview: string;
    highlights: string[];
    landscapeSummary: string;
    bestTimeToVisit: string;
  };

  itinerary: ItineraryDay[];

  pricing: {
    startingPrice: string;
    occupancyTypes: { type: string; price: string; note?: string }[];
    notes: string[];
  };

  inclusions: {
    included: string[];
    excluded: string[];
  };
}

export const DESTINATION_DETAILS_MAP: Record<string, DestinationDetail> = {
  kerala: {
    id: 'kerala',
    title: 'KERALA',
    durationShort: '6D/5N',
    durationFull: '6 Days - 5 Nights',
    startingPrice: '₹ 5,999',
    numericPrice: 5999,
    image: '/ke.webp',
    pdfUrl: '/kerala_catalog.pdf',
    frameColor: '#7B8C78',
    region: 'KERALA',
    elevation: '8,800 FT / 2,695 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'BEGINNER',
    bestSeason: 'SEPTEMBER — MARCH',
    about: {
      overview: 'Kerala is a diverse, affordable, and vibrant tropical destination offering a mix of breathtaking natural tea gardens, pristine mountain ridges, bamboo forests, and world-renowned backwater lagoons. From misty tea slopes in Munnar to peaceful traditional houseboat stays in Alleppey, this journey combines high mountain passes with lush coastal backwaters.',
      highlights: [
        'Munnar cloud forest switchbacks & tea estate stays',
        'Wayanad sanctuary rainforest & bamboo forest trails',
        'Traditional Kerala houseboat overnight stay on backwaters',
        'Malabar coast drive & local spice plantation experience'
      ],
      landscapeSummary: 'Misty Ghat Passes, Tea Slopes & Backwater Corridors',
      bestTimeToVisit: 'September through March (Pleasant weather & clear tea ridge views)'
    },
    itinerary: [
      {
        day: 1,
        title: 'Arrival & Scenic Climb to Munnar Tea Hills',
        description: 'Meet the team at pickup point. Ascend the misty Western Ghats switchbacks past Cheeyappara Waterfalls into Munnar tea estate valleys.',
        highlights: ['Cheeyappara & Valara Waterfalls', 'Munnar Tea Estate Stay', 'Campfire Evening']
      },
      {
        day: 2,
        title: 'Munnar High Altitude Trails & Anamudi Ridge',
        description: 'Explore Eravikulam National Park (home to Nilgiri Tahr), Mattupetty Dam, Echo Point, and high-altitude tea plantation viewpoints.',
        highlights: ['Eravikulam National Park', 'Mattupetty Lake', 'Cloud Forest Viewpoint']
      },
      {
        day: 3,
        title: 'Traverse to Wayanad Rainforest & Sanctuary Trails',
        description: 'Drive through forest corridors connecting Munnar to Wayanad. Check in to jungle eco-lodges surrounded by bamboo groves and coffee estates.',
        highlights: ['Spice Plantation Walk', 'Wayanad Sanctuary Drive', 'Eco-Lodge Stay']
      },
      {
        day: 4,
        title: 'Banasura Sagar Dam & Sentinel Rock Waterfalls',
        description: 'Trek to Banasura Sagar (India’s largest earth dam) and cool off under the cascading waters of Soochipara / Sentinel Rock Waterfalls.',
        highlights: ['Banasura Sagar Dam Trek', 'Soochipara Waterfall', 'Bamboo Rafting']
      },
      {
        day: 5,
        title: 'Alleppey Backwaters Traditional Houseboat Cruise',
        description: 'Drive down to Alleppey. Board a private traditional Kerala houseboat for an overnight cruise along palm-fringed lagoons and paddy fields.',
        highlights: ['Overnight Houseboat Stay', 'Fresh Kerala Seafood / Meals', 'Backwater Sunset']
      },
      {
        day: 6,
        title: 'Malabar Coast Spice Market & Departure',
        description: 'Enjoy sunrise over the backwaters, visit local spice markets and heritage coir craft workshops before final transfer to drop-off.',
        highlights: ['Spice Market Shopping', 'Heritage Coir Village', 'Departure Transfer']
      }
    ],
    pricing: {
      startingPrice: '₹ 5,999',
      occupancyTypes: [
        { type: 'Triple / Quad Sharing', price: '₹ 5,999', note: 'Per person (Best for groups & friends)' },
        { type: 'Double / Twin Occupancy', price: '₹ 7,499', note: 'Per person (Couples / Private Room)' },
        { type: 'Private Cottage / Villa Upgrade', price: '₹ 11,999', note: 'Per person (Luxury Stay Package)' }
      ],
      notes: [
        'Prices include all stays, breakfasts, dinners, houseboat cruise & transport.',
        '50% advance booking deposit required to lock squad slots.',
        'Custom pickup dates available for private groups of 4 or more.'
      ]
    },
    inclusions: {
      included: [
        'Accommodation in Tea Estate Stays & Deluxe Houseboat',
        'Daily Breakfast & Dinner Meals included',
        'Private AC Vehicle Transport for full circuit',
        'Lead Expedition Captain & Local Tour Guide',
        'Alleppey Houseboat Overnight Cruise with all meals',
        'All Forest Permits, Tolls & Driver Allowances'
      ],
      excluded: [
        'Airfare / Train tickets to pickup point',
        'Lunch meals & personal beverages',
        'Boating / Zip-line / Optional activity fees',
        'Personal shopping & items not mentioned in inclusions'
      ]
    }
  },

  ladakh: {
    id: 'ladakh',
    title: 'LADAKH',
    durationShort: '9D/8N',
    durationFull: '9 Days - 8 Nights',
    startingPrice: '₹ 28,999',
    numericPrice: 28999,
    image: '/ladakh.webp',
    pdfUrl: '/kerala_catalog.pdf',
    frameColor: '#768C9E',
    region: 'LADAKH',
    elevation: '17,582 FT / 5,359 M',
    squadSize: '4 - 10 RIDERS',
    difficulty: 'EXPEDITION',
    bestSeason: 'JUNE — SEPTEMBER',
    about: {
      overview: 'The legendary Trans-Himalayan overland expedition. Traverse barren cold desert passes above 17,000 ft, ancient cliffside monasteries, and high-altitude lakes. Featuring Khardung La, Pangong Tso, and Nubra Valley backed by satellite comms, oxygen support, and dedicated luggage trucks.',
      highlights: [
        'Cross world-famous Khardung La & Chang La high mountain passes',
        'Camp lakeside at turquoise Pangong Tso under starry skies',
        'Sand dune camel safari & monastery valleys in Nubra',
        'Full backup support crew, oxygen backup & satellite comms'
      ],
      landscapeSummary: 'Cold Desert, High Motorable Passes & Himalayan Scree',
      bestTimeToVisit: 'June through September (Passes open & clear blue skies)'
    },
    itinerary: [
      { day: 1, title: 'Arrive in Leh & Mandatory Acclimatization', description: 'Rest and adapt to high altitude (11,500 ft). Briefing session with lead captain evening.' },
      { day: 2, title: 'Leh Local Exploration & Monasteries', description: 'Visit Shanti Stupa, Leh Palace, Hall of Fame, and magnetic hill route.' },
      { day: 3, title: 'Leh to Nubra Valley via Khardung La (17,582 ft)', description: 'Ascend world highest motorable pass Khardung La down to Hunder sand dunes.' },
      { day: 4, title: 'Hunder Dunes Camel Safari & Diskit Monastery', description: 'Explore double-humped Bactrian camels and giant Buddha statue in Diskit.' },
      { day: 5, title: 'Nubra Valley to Pangong Tso via Shyok River Circuit', description: 'Ride alongside roaring Shyok River through rugged gorges to turquoise Pangong Tso.' },
      { day: 6, title: 'Star Gaze at Pangong Tso & High Altitude Sunrise', description: 'Wake up to serene lake colors, explore lakeside trails and local wildlife.' },
      { day: 7, title: 'Pangong Tso to Leh via Chang La Pass (17,590 ft)', description: 'Cross snow-dusted Chang La pass and visit Hemis & Thiksey Monasteries.' },
      { day: 8, title: 'Sangam Confluence & Magnetic Hill Traverse', description: 'Visit Indus & Zanskar river confluence and Pathar Sahib Gurudwara.' },
      { day: 9, title: 'Souvenir Shopping & Departure from Leh', description: 'Transfer to Leh Airport with unforgettable Trans-Himalayan memories.' }
    ],
    pricing: {
      startingPrice: '₹ 28,999',
      occupancyTypes: [
        { type: 'Solo Rider (RE Himalayan 411cc/450cc)', price: '₹ 28,999', note: 'Includes Bike + Fuel + Stays' },
        { type: 'Dual Rider / Pillion Package', price: '₹ 22,999', note: 'Per person sharing bike' },
        { type: '4x4 SUV Passenger Seat', price: '₹ 26,999', note: 'Per person in backup vehicle' }
      ],
      notes: [
        'Includes Royal Enfield Himalayan bike with fuel for entire circuit.',
        'Medical oxygen cylinders & paramedic trained captain onboard.',
        'Inner Line Permits and environmental fee included.'
      ]
    },
    inclusions: {
      included: [
        'Royal Enfield Himalayan Motorbike + Fuel',
        'Backup Support Vehicle for Luggage & Mechanical Crew',
        'Medical Oxygen Cylinder & First Aid Support',
        '3-Star Hotel Stays & Deluxe Campsite Tents',
        'Daily Breakfast & Dinner Meals',
        'All Inner Line Permits & Wildlife Fees'
      ],
      excluded: [
        'Flights to/from Leh',
        'Riding Gear (Helmet, Jacket, Gloves - Available for Rent)',
        'Refundable Security Deposit for Bike',
        'Lunch meals & personal shopping'
      ]
    }
  },

  kodaikanal: {
    id: 'kodaikanal',
    title: 'KODAIKANAL',
    durationShort: '4D/3N',
    durationFull: '4 Days - 3 Nights',
    startingPrice: '₹ 6,999',
    numericPrice: 6999,
    image: '/kodai.webp',
    pdfUrl: '/kerala_catalog.pdf',
    frameColor: '#4E7063',
    region: 'KODAIKANAL',
    elevation: '7,000 FT / 2,133 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'INTERMEDIATE',
    bestSeason: 'YEAR-ROUND',
    about: {
      overview: 'Known as the Princess of Hill Stations. A misty, pine-scented highland route winding around precipitous cliff vistas, Pillar Rocks, and off-grid forest permit trails to secluded Berijam Lake.',
      highlights: [
        'Ride through towering dense pine forest canopy trails',
        'Panoramic cliffside viewpoints at Pillar Rocks & Coakers Walk',
        'Off-grid forest permit routes to secluded Berijam Lake',
        'Cozy heritage cottage stays with campfire evenings'
      ],
      landscapeSummary: 'Dense Pine Forests, Cliff Views & Shola Mountain Curves',
      bestTimeToVisit: 'Year-Round (Cool mountain climate & lush evergreen trails)'
    },
    itinerary: [
      { day: 1, title: 'Ghat Climb & Pine Valley Check-in', description: 'Ascend Palani hills, visit Silver Cascade Waterfalls, check into cozy hillside resort.' },
      { day: 2, title: 'Pillar Rocks, Coakers Walk & Pine Forest', description: 'Walk through dense pine tree trails, cliffside cloud views at Pillar Rocks.' },
      { day: 3, title: 'Off-Grid Berijam Lake Forest Reserve Trail', description: 'Enter restricted forest permit zone to Berijam Lake surrounded by wildlife.' },
      { day: 4, title: 'Kodai Lake Boating & Homemade Chocolates', description: 'Boating on star-shaped Kodai Lake, artisan chocolate tasting, return departure.' }
    ],
    pricing: {
      startingPrice: '₹ 6,999',
      occupancyTypes: [
        { type: 'Group Sharing (3-4 Person Room)', price: '₹ 6,999', note: 'Per person' },
        { type: 'Couples Private Room (2 Person)', price: '₹ 8,499', note: 'Per person' }
      ],
      notes: [
        'Includes all stays, breakfasts, dinners & forest permit entries.'
      ]
    },
    inclusions: {
      included: [
        'Transport from Pickup Point',
        '3 Nights Resort/Cottage Stay',
        'Daily Breakfast & Dinner',
        'Berijam Lake Forest Permit Fees',
        'Campfire Evenings'
      ],
      excluded: ['Personal Shopping', 'Boating Fees', 'Lunch & Snacks']
    }
  },

  'ooty-coonoor': {
    id: 'ooty-coonoor',
    title: 'OOTY / COONOOR',
    durationShort: '3D/2N',
    durationFull: '3 Days - 2 Nights',
    startingPrice: '₹ 6,999',
    numericPrice: 6999,
    image: '/ooty.webp',
    pdfUrl: '/ooty_catalog.pdf',
    frameColor: '#5C745A',
    region: 'OOTY / COONOOR',
    elevation: '7,350 FT / 2,240 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'INTERMEDIATE',
    bestSeason: 'SEPTEMBER — MAY',
    about: {
      overview: 'A thrilling Nilgiri mountain traverse featuring 36 steep hairpin bend switchbacks, emerald tea plantations, the UNESCO Nilgiri Mountain Railway, and cool mountain breezes across Ooty and Coonoor.',
      highlights: [
        'Day 1: Botanical Garden, Doddabetta Peak & Ooty Lake',
        'Day 2: Pine Forest, Pykara Waterfalls & Shooting Spots',
        'Day 3: Nilgiri Mountain Railway, Sims Park & Dolphins Nose',
        'Coimbatore Pickup & Drop, Campfire & Meals Included'
      ],
      landscapeSummary: 'Continuous Hairpin Switchbacks & High Tea Slopes',
      bestTimeToVisit: 'September through May'
    },
    itinerary: [
      { day: 1, title: 'Coimbatore Pickup & 36 Hairpin Climb', description: 'Drive up famous 36 hairpin bends to Ooty. Visit Doddabetta Peak & Botanical Gardens.' },
      { day: 2, title: 'Pykara Waterfalls & Pine Reserve', description: 'Explore shooting spots, pine canopy walks, and Pykara lake speed boating.' },
      { day: 3, title: 'UNESCO Heritage Toy Train to Coonoor & Return', description: 'Ride iconic steam train to Coonoor, visit Sims Park & Dolphins Nose.' }
    ],
    pricing: {
      startingPrice: '₹ 6,999',
      occupancyTypes: [
        { type: 'Shared Cottage Stay', price: '₹ 6,999', note: 'Per person' },
        { type: 'Private Room Stay', price: '₹ 8,299', note: 'Per person' }
      ],
      notes: ['Includes Heritage Toy Train ticket and all internal transit.']
    },
    inclusions: {
      included: [
        'Coimbatore Pickup & Drop Transport',
        'Heritage Toy Train Tickets',
        'Resort Stay with Campfire',
        'Daily Breakfast & Dinner',
        'Expedition Leader'
      ],
      excluded: ['Lunch', 'Personal Expenses', 'Camera Fees']
    }
  },

  'arunachalam-pondicherry': {
    id: 'arunachalam-pondicherry',
    title: 'ARUNACHALAM X PONDICHERRY',
    durationShort: '5D/4N',
    durationFull: '5 Days - 4 Nights',
    startingPrice: '₹ 7,499',
    numericPrice: 7499,
    image: '/pondi.webp',
    pdfUrl: '/kerala_catalog.pdf',
    frameColor: '#8C5A48',
    region: 'SOUTH INDIA',
    elevation: '2,668 FT / 813 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'BEGINNER',
    bestSeason: 'OCTOBER — MARCH',
    about: {
      overview: 'A unique spiritual-meets-coastal long journey. Transition from the serene energy of Tiruvannamalai (Arunachalam) barefoot Girivalam walk to the vibrant French Quarter and ocean breezes of Pondicherry.',
      highlights: [
        'Girivalam barefoot walk & sunrise views around holy Arunachala Hill',
        'Scenic highway drive connecting ancient temple towns to the coast',
        'French colonial architecture, cafes & coastal bike ride in Pondicherry',
        'Sunset seaside promenade runs along the Coromandel oceanfront'
      ],
      landscapeSummary: 'Sacred Hill Routes, Inland Highways & Coastal Promenades',
      bestTimeToVisit: 'October through March'
    },
    itinerary: [
      { day: 1, title: 'Transfer to Tiruvannamalai & Ashram Visit', description: 'Arrive in sacred Arunachalam, visit Sri Ramana Ashram.' },
      { day: 2, title: 'Barefoot Girivalam Circuit & Temple Trail', description: 'Walk 14 km Girivalam path around sacred hill and visit Arunachaleswarar Temple.' },
      { day: 3, title: 'Coastal Drive to Pondicherry & Promenade Walk', description: 'Drive to Pondicherry, explore French Quarter streetscapes and seaside promenade.' },
      { day: 4, title: 'Auroville & Paradise Beach Exploration', description: 'Visit Matrimandir viewpoint in Auroville, boat ride to Paradise Beach.' },
      { day: 5, title: 'French Cafe Crawl & Departure', description: 'Morning croissant & coffee walk in White Town before return transit.' }
    ],
    pricing: {
      startingPrice: '₹ 7,499',
      occupancyTypes: [
        { type: 'Group Sharing (4 Person)', price: '₹ 7,499', note: 'Per person' },
        { type: 'Twin Occupancy (2 Person)', price: '₹ 8,999', note: 'Per person' }
      ],
      notes: ['Includes AC vehicle transit and beachside resort stay.']
    },
    inclusions: {
      included: [
        'AC Transport for entire circuit',
        'Heritage Stays in Tiruvannamalai & Pondicherry',
        'Daily Breakfast & Dinner',
        'Paradise Beach Boat Transfers'
      ],
      excluded: ['Lunch & Cafe Dining', 'Personal Puja Fees']
    }
  },

  'gokarna-dandeli': {
    id: 'gokarna-dandeli',
    title: 'GOKARNA AND DANDELI',
    durationShort: '5D/4N',
    durationFull: '5 Days - 4 Nights',
    startingPrice: '₹ 5,999',
    numericPrice: 5999,
    image: '/gokarna.webp',
    pdfUrl: '/kerala_catalog.pdf',
    frameColor: '#3A5C6D',
    region: 'KARNATAKA',
    elevation: '1,800 FT / 550 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'INTERMEDIATE',
    bestSeason: 'OCTOBER — MAY',
    about: {
      overview: 'Where the jungle meets the Arabian Sea. Experience high-octane white-water rafting on Dandeli’s Kali River followed by relaxed cliff beach sunsets and 5-beach treks in Gokarna.',
      highlights: [
        'Sunset cliff treks connecting Om Beach, Half Moon & Paradise Beach',
        'White-water rafting and river camping on the roaring Kali River in Dandeli',
        'Dense jungle canopy rides in Anshi Tiger Reserve',
        'Beachside bonfires & fresh local coastal seafood dining'
      ],
      landscapeSummary: 'Coastal Cliff Roads, Dense Jungle Reserves & River Gorges',
      bestTimeToVisit: 'October through May'
    },
    itinerary: [
      { day: 1, title: 'Overnight Transit to Dandeli Rainforest', description: 'Journey into Western Ghats rainforest reserve.' },
      { day: 2, title: 'White Water Rafting on Kali River & Jungle Stay', description: 'Conquer Class 3 rapids on Kali River, night campfire in forest camp.' },
      { day: 3, title: 'Transit to Gokarna & Om Beach Sunset', description: 'Drive down to coast, check into Kudle beachside stays, sunset at Om Beach.' },
      { day: 4, title: '5-Beach Cliffside Trek & Paradise Beach', description: 'Trek along ocean cliffs connecting Gokarna Main, Kudle, Om, Half Moon & Paradise beaches.' },
      { day: 5, title: 'Mirjan Fort Visit & Departure', description: 'Explore historic mossy stone walls of Mirjan Fort before return departure.' }
    ],
    pricing: {
      startingPrice: '₹ 5,999',
      occupancyTypes: [
        { type: 'Camp & Hostel Stay', price: '₹ 5,999', note: 'Per person' },
        { type: 'Resort & Beach Shack Stay', price: '₹ 7,299', note: 'Per person' }
      ],
      notes: ['Includes White Water Rafting ticket in Dandeli.']
    },
    inclusions: {
      included: [
        'Round-trip AC Bus / Vehicle Transport',
        'Kali River Rafting Ticket',
        'Forest Camp & Beach Stays',
        'Daily Breakfast & Dinner',
        'Guided Beach Cliff Trek'
      ],
      excluded: ['Optional Water Sports (Jet Ski, Zipline)', 'Lunch']
    }
  },

  chikmagalur: {
    id: 'chikmagalur',
    title: 'CHIKMAGALUR',
    durationShort: '4D/3N',
    durationFull: '4 Days - 3 Nights',
    startingPrice: '₹ 5,999',
    numericPrice: 5999,
    image: '/chick.webp',
    pdfUrl: '/kerala_catalog.pdf',
    frameColor: '#7B6852',
    region: 'KARNATAKA',
    elevation: '6,317 FT / 1,930 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'INTERMEDIATE',
    bestSeason: 'SEPTEMBER — MAY',
    about: {
      overview: 'The birthplace of Indian coffee. Ride up misty high-altitude peaks, navigate coffee plantation dirt tracks, summit Mullayanagiri, and cool off beneath roaring waterfall cascades.',
      highlights: [
        'Summits Karnataka’s highest peak Mullayanagiri amidst rolling fog',
        'Off-road Jeep & bike trails to hidden Hebbe & Jhari Waterfalls',
        'Private coffee estate stays with bean-to-cup brewing workshops',
        'Scenic ridge rides across Baba Budangiri mountain range'
      ],
      landscapeSummary: 'Coffee Estate Roads, Mountain Switchbacks & Dirt Spurs',
      bestTimeToVisit: 'September through May'
    },
    itinerary: [
      { day: 1, title: 'Check-in to Private Coffee Estate', description: 'Arrive in Chikmagalur, fresh coffee brewing workshop & estate walk.' },
      { day: 2, title: 'Summit Mullayanagiri & Baba Budangiri Ridge', description: 'Climb 500 steps to Karnataka highest peak (Mullayanagiri) wrapped in clouds.' },
      { day: 3, title: '4x4 Off-Road Jeep Trail to Hebbe & Jhari Waterfalls', description: 'Take 4WD Jeeps deep into forest trails to swim beneath roaring cascades.' },
      { day: 4, title: 'Belur Hoysala Architecture & Departure', description: 'Visit 12th century Hoysaleswara temple before return journey.' }
    ],
    pricing: {
      startingPrice: '₹ 5,999',
      occupancyTypes: [
        { type: 'Coffee Estate Homestay', price: '₹ 5,999', note: 'Per person' },
        { type: 'Luxury Plantation Villa', price: '₹ 7,499', note: 'Per person' }
      ],
      notes: ['Includes 4x4 Off-Road Jeep trail ride.']
    },
    inclusions: {
      included: [
        'Transport from Pickup Point',
        'Coffee Estate Stay with Bonfire',
        '4x4 Off-Road Jeep Ride to Waterfalls',
        'Daily Breakfast & Dinner',
        'Expedition Leader'
      ],
      excluded: ['Lunch & Snacks', 'Personal Expenses']
    }
  },

  spiti: {
    id: 'spiti',
    title: 'DESERT MOUNTAIN CIRCUIT',
    durationShort: '7D/6N',
    durationFull: '7 Days - 6 Nights',
    startingPrice: '₹ 28,999',
    numericPrice: 28999,
    image: '/tour_spiti.webp',
    pdfUrl: '/kerala_catalog.pdf',
    frameColor: '#C29B53',
    region: 'SPITI VALLEY',
    elevation: '15,059 FT / 4,590 M',
    squadSize: '4 - 8 RIDERS',
    difficulty: 'EXPEDITION',
    bestSeason: 'JUNE — OCTOBER',
    about: {
      overview: 'The Middle Land between India and Tibet. Remote, rugged, and unpaved, Spiti demands resilience as you conquer glacial runoff rivers, Key Monastery perched on a cliff, and camp under milky way skies at Chandratal Lake.',
      highlights: [
        'Cross treacherous water nullahs along Kinnaur cliff road',
        'Visit Key Monastery perched on a thousand-foot hill spire',
        'Camp under crystal clear starry skies at Chandratal Lake',
        'Conquer Kunzum La pass with panoramic views of Shigri Glacier'
      ],
      landscapeSummary: 'Water Crossings, Loose Shales & High Alpine Gorges',
      bestTimeToVisit: 'June through October'
    },
    itinerary: [
      { day: 1, title: 'Shimla to Kalpa via Kinnaur Cliff Road', description: 'Drive along dangerous cliff road corridor cut into mountain rock.' },
      { day: 2, title: 'Kalpa to Nako Lake & Tabo Monastery', description: 'Visit 1,000-year-old Tabo Monastery (Tibet of India).' },
      { day: 3, title: 'Tabo to Dhankar Monastery & Kaza', description: 'Visit cliffside Dhankar Monastery overlooking Spiti river.' },
      { day: 4, title: 'Key Monastery, Hikkim & Komic Village', description: 'Post postcard from highest post office (Hikkim) & visit Key Monastery.' },
      { day: 5, title: 'Kaza to Chandratal Moon Lake via Kunzum Pass (15,059 ft)', description: 'Cross high alpine Kunzum La pass down to sacred Chandratal lake.' },
      { day: 6, title: 'Chandratal Lake Camping to Manali via Atal Tunnel', description: 'Sunrise lake walk, cross Batal river bed to Manali.' },
      { day: 7, title: 'Manali Local Sightseeing & Departure', description: 'Souvenir shopping and evening departure.' }
    ],
    pricing: {
      startingPrice: '₹ 28,999',
      occupancyTypes: [
        { type: 'RE Himalayan Motorbike Package', price: '₹ 28,999', note: 'Includes Bike + Fuel' },
        { type: '4x4 SUV Passenger Seat', price: '₹ 25,999', note: 'Per person in SUV' }
      ],
      notes: ['Includes Oxygen Cylinder & Backup Support Vehicle.']
    },
    inclusions: {
      included: [
        'RE Himalayan Motorbike + Fuel / 4x4 SUV',
        'Backup Support Vehicle & Luggage Truck',
        'Oxygen Cylinder & First Aid Kit',
        'Spitian Homestays & Chandratal Campsite Tents',
        'Daily Breakfast & Dinner',
        'All Inner Line Permits'
      ],
      excluded: ['Transit to Shimla/Manali', 'Lunch', 'Riding Gear']
    }
  }
};
