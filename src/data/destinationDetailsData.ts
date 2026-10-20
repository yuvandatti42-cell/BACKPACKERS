export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  highlights?: string[];
}

export interface DurationVariant {
  id: string;
  label: string;
  durationShort: string;
  durationFull: string;
  startingPrice: string;
  numericPrice?: number;
  pdfUrl: string;
  about?: {
    overview: string;
    highlights: string[];
    landscapeSummary?: string;
    bestTimeToVisit?: string;
  };
  itinerary?: ItineraryDay[];
  pricing?: {
    startingPrice: string;
    occupancyTypes: { type: string; price: string; note?: string }[];
    notes: string[];
  };
  inclusions?: {
    included: string[];
    excluded: string[];
  };
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

  durationVariants?: DurationVariant[];
}

export const DESTINATION_DETAILS_MAP: Record<string, DestinationDetail> = {
  kerala: {
    id: 'kerala',
    title: 'KERALA',
    durationShort: '3D/2N',
    durationFull: '3–7 Days (4 Curated Packages)',
    startingPrice: '₹ 5,999',
    numericPrice: 5999,
    image: '/ke.webp',
    pdfUrl: '/kerala_3d2n_catalog.pdf',
    frameColor: '#7B8C78',
    region: 'KERALA',
    elevation: '8,800 FT / 2,695 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'BEGINNER',
    bestSeason: 'SEPTEMBER — MARCH',
    durationVariants: [
      {
        id: '3d2n',
        label: 'Kerala 3D2N',
        durationShort: '3D/2N',
        durationFull: '3 Days - 2 Nights',
        startingPrice: '₹ 5,999',
        numericPrice: 5999,
        pdfUrl: '/kerala_3d2n_catalog.pdf',
        about: {
          overview: 'Kerala Tour (3 Days / 2 Nights) — 2 Days Munnar with seamless Kochi transfer, covering the breathtaking tea hills of Munnar, Cheyyappara waterfalls, and scenic viewpoints.',
          highlights: [
            '2 Days exploring Munnar tea hills & mist valleys',
            'Cheyyappara & Valara Waterfalls & 2nd Mile View Point',
            'Tata Tea Museum, Eravikulam National Park & Mattupetty Dam',
            'Kochi pickup & drop transfer included'
          ],
          landscapeSummary: 'Munnar Tea Hills & Kochi Transfer',
          bestTimeToVisit: 'Year-round quick getaway'
        },
        itinerary: [
          {
            day: 1,
            title: 'Kochi Arrival & Scenic Climb to Munnar',
            description: 'Driver pick up on arrival from Kochi airport / railway station / bus station. Drive to Munnar visiting Cheyyappara Waterfalls, Valara Waterfalls, and 2nd Mile View Point. Overnight stay at Munnar.',
            highlights: ['Cheyyappara Waterfalls', 'Valara Waterfalls', '2nd Mile View Point', 'Overnight Munnar Hotel']
          },
          {
            day: 2,
            title: 'Munnar Sightseeing & High Altitude Tea Trails',
            description: 'Sightseeing transfer to Tata Tea Museum, Eravikulam National Park, Mattupetty Dam, and Echo Point. Overnight stay at Munnar.',
            highlights: ['Tata Tea Museum', 'Eravikulam National Park', 'Mattupetty Dam', 'Echo Point', 'Overnight Munnar Hotel']
          },
          {
            day: 3,
            title: 'Munnar to Kochi Transfer & Departure',
            description: 'After breakfast, scenic return drive from Munnar to Kochi. Transfer to Kochi Railway station / Airport with a heartful of memories.',
            highlights: ['Scenic Munnar Descent', 'Kochi Transfer', 'Departure Transfer']
          }
        ],
        pricing: {
          startingPrice: '₹ 5,999',
          occupancyTypes: [
            { type: 'Triple / Quad Sharing', price: '₹ 5,999', note: 'Per person (Standard Plan)' },
            { type: 'Double / Twin Occupancy', price: '₹ 6,999', note: 'Per person (Couples / Private Room)' },
            { type: 'Private Cab & Deluxe Hotel Upgrade', price: '₹ 8,999', note: 'Per person (Luxury Stay Package)' }
          ],
          notes: [
            'Includes 2N stay in Munnar Hotel & private cab transport.',
            'Driver duty time 8:00 AM to 8:00 PM (extra ₹300/hour).',
            'Includes driver bata, toll, parking, road tax, permit & fuel charges.',
            'Entrance fees for optional activities & unmentioned points excluded.'
          ]
        }
      },
      {
        id: '4d3n',
        label: 'Kerala 4D3N',
        durationShort: '4D/3N',
        durationFull: '4 Days - 3 Nights',
        startingPrice: '₹ 7,999',
        numericPrice: 7999,
        pdfUrl: '/kerala_4d3n_catalog.pdf',
        about: {
          overview: 'Kerala Tour (4 Days / 3 Nights) — 2 Days Munnar, 1 Day Alleppey & Kochi Transfer. Combines high tea ridges with tranquil Alleppey backwater houseboat cruise.',
          highlights: [
            '2 Days Munnar Tea Estate Stay & Eravikulam Sanctuary',
            '1 Day Alleppey Backwaters Houseboat Stay',
            'Mattupetty Dam & Echo Point Viewpoints',
            'Kochi Airport / Station Transfer Included'
          ],
          landscapeSummary: 'Munnar Tea Ridges, Alleppey Backwaters & Kochi Transfer',
          bestTimeToVisit: 'September through April'
        },
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Kochi & Scenic Climb to Munnar',
            description: 'Meet squad at Kochi pickup point. Scenic drive through Western Ghats switchbacks past Cheeyappara Waterfalls to Munnar tea plantations.',
            highlights: ['Cheeyappara Waterfalls', 'Tea Estate Check-in', 'Overnight Munnar']
          },
          {
            day: 2,
            title: 'Munnar Eravikulam & Tea Ridge Exploration',
            description: 'Explore Eravikulam National Park (Nilgiri Tahr), Mattupetty Lake, Echo Point, and Tata Tea Museum.',
            highlights: ['Eravikulam Sanctuary', 'Mattupetty Lake', 'Tea Museum', 'Overnight Munnar']
          },
          {
            day: 3,
            title: 'Alleppey Backwaters Houseboat Stay',
            description: 'Drive down from Munnar to Alleppey. Board private Kerala houseboat for backwater lagoon cruise with traditional meals.',
            highlights: ['1 Day Alleppey', 'Overnight Houseboat', 'Fresh Kerala Meals', 'Sunset Views']
          },
          {
            day: 4,
            title: 'Kochi Transfer & Departure',
            description: 'Morning backwater breakfast, transfer back to Kochi for airport/railway departure.',
            highlights: ['Morning Lagoon Cruise', 'Kochi Transfer', 'Departure']
          }
        ],
        pricing: {
          startingPrice: '₹ 7,999',
          occupancyTypes: [
            { type: 'Triple / Quad Sharing', price: '₹ 7,999', note: 'Per person' },
            { type: 'Double / Twin Occupancy', price: '₹ 9,499', note: 'Per person' },
            { type: 'Private Houseboat Cottage Upgrade', price: '₹ 12,499', note: 'Per person' }
          ],
          notes: [
            'Includes stays in Munnar & Alleppey houseboat, transport & meals.',
            'Advance booking required.'
          ]
        }
      },
      {
        id: '5d4n',
        label: 'Kerala 5D4N',
        durationShort: '5D/4N',
        durationFull: '5 Days - 4 Nights',
        startingPrice: '₹ 11,999',
        numericPrice: 11999,
        pdfUrl: '/kerala_5d4n_catalog.pdf',
        about: {
          overview: 'Comprehensive Kerala Tour (5 Days / 4 Nights) — 2 Days Munnar, 1 Day Thekkady, 1 Day Alappuzha, 1 Day Kochi. Linking tea hills, Periyar wildlife, backwater lagoons, and Kochi heritage.',
          highlights: [
            '2 Days Munnar cloud forest & tea garden trails',
            '1 Day Thekkady Periyar Wildlife Sanctuary & spice gardens',
            '1 Day Alappuzha (Alleppey) traditional houseboat cruise',
            '1 Day Kochi heritage trail & Kochi Transfer'
          ],
          landscapeSummary: 'Munnar, Thekkady, Alappuzha & Kochi Transfer',
          bestTimeToVisit: 'September through March'
        },
        itinerary: [
          {
            day: 1,
            title: 'Kochi Arrival & Munnar Hill Ascent',
            description: 'Pickup from Kochi and drive up to Munnar tea valleys past Cheeyappara waterfalls.',
            highlights: ['Cheeyappara Falls', 'Munnar Tea Stay']
          },
          {
            day: 2,
            title: 'Munnar Sightseeing & High Viewpoints',
            description: 'Full day exploring Eravikulam National Park, Echo Point, and high-altitude tea trails.',
            highlights: ['Eravikulam Park', 'Mattupetty Dam', 'Echo Point']
          },
          {
            day: 3,
            title: 'Thekkady Periyar Sanctuary & Spice Trails',
            description: 'Drive to Thekkady. Boat safari on Periyar Lake and spice plantation tour.',
            highlights: ['1 Day Thekkady', 'Periyar Safari', 'Spice Garden Walk']
          },
          {
            day: 4,
            title: 'Alappuzha (Alleppey) Backwaters Houseboat',
            description: 'Scenic drive to Alappuzha. Board private houseboat for backwater lagoon cruise.',
            highlights: ['1 Day Alappuzha', 'Houseboat Stay', 'Lagoon Sunset']
          },
          {
            day: 5,
            title: 'Kochi Heritage Trail & Departure Transfer',
            description: 'Explore 1 Day Kochi: Fort Kochi, Chinese Fishing Nets & spice markets before departure.',
            highlights: ['1 Day Kochi', 'Fort Kochi', 'Kochi Transfer & Departure']
          }
        ],
        pricing: {
          startingPrice: '₹ 11,999',
          occupancyTypes: [
            { type: 'Triple / Quad Sharing', price: '₹ 11,999', note: 'Per person' },
            { type: 'Double / Twin Occupancy', price: '₹ 13,499', note: 'Per person' },
            { type: 'Luxury Resort & Private Houseboat Upgrade', price: '₹ 16,999', note: 'Per person' }
          ],
          notes: [
            'Includes stay, transfers, Periyar safari, Alappuzha houseboat & Kochi transfer.'
          ]
        }
      },
      {
        id: '7d6n',
        label: 'Kerala 7D6N',
        durationShort: '7D/6N',
        durationFull: '7 Days - 6 Nights',
        startingPrice: '₹ 14,999',
        numericPrice: 14999,
        pdfUrl: '/kerala_7d6n_catalog.pdf',
        about: {
          overview: 'The Grand Kerala Tour (7 Days / 6 Nights) — 2 Days Munnar, 1 Day Thekkady, 1 Day Alappuzha, 1 Day Kochi, Day 6 Varkala, Day 7 Trivandrum. The ultimate overland across mountains, wildlife, backwaters, and ocean cliffs.',
          highlights: [
            '2 Days Munnar Tea Estate Stay & Eravikulam Park',
            '1 Day Thekkady Spice Plantations & Periyar Lake Safari',
            '1 Day Alappuzha Deluxe Overnight Houseboat Cruise',
            '1 Day Kochi Heritage Trail (Fort Kochi & Chinese Nets)',
            'Day 6 Varkala Cliff Beach Sunset & Coastal Strolls',
            'Day 7 Trivandrum Cultural Landmarks & Departure'
          ],
          landscapeSummary: 'Munnar, Thekkady, Alappuzha, Kochi, Varkala & Trivandrum',
          bestTimeToVisit: 'September through April'
        },
        itinerary: [
          {
            day: 1,
            title: 'Arrival in Kochi & Munnar Hill Drive',
            description: 'Pickup from Kochi. Ascent to Munnar past waterfalls and tea slopes.',
            highlights: ['Cheeyappara Falls', 'Munnar Tea Stay']
          },
          {
            day: 2,
            title: 'Munnar High Altitude Tea Trails',
            description: 'Full day Munnar exploration: Eravikulam Park, Mattupetty Lake & Top Station.',
            highlights: ['2 Days Munnar', 'Eravikulam Park', 'Top Station']
          },
          {
            day: 3,
            title: 'Thekkady Spice Trails & Lake Safari',
            description: 'Traverse to Thekkady. Spice garden tour and Periyar wildlife lake safari.',
            highlights: ['1 Day Thekkady', 'Periyar Safari', 'Spice Tour']
          },
          {
            day: 4,
            title: 'Alappuzha Backwaters Houseboat Cruise',
            description: 'Board private deluxe houseboat for overnight lagoon cruise with traditional meals.',
            highlights: ['1 Day Alappuzha', 'Houseboat Stay', 'Kerala Feast']
          },
          {
            day: 5,
            title: 'Kochi Heritage Trail & Cultural Evening',
            description: 'Explore Chinese Fishing Nets, Fort Kochi colonial quarter, and Jew Town markets.',
            highlights: ['1 Day Kochi', 'Fort Kochi & Chinese Nets', 'Cultural Trail']
          },
          {
            day: 6,
            title: 'Varkala Cliff Beach Sunset & Coastal Strolls',
            description: 'Drive down to Varkala. Relax on the famous red laterite cliff overlooking the Arabian Sea.',
            highlights: ['Day 6 Varkala', 'Varkala Cliff Beach', 'Sunset Views']
          },
          {
            day: 7,
            title: 'Trivandrum Sightseeing & Departure',
            description: 'Visit iconic Padmanabhaswamy Temple, Kovalam Beach, and transfer for departure.',
            highlights: ['Day 7 Trivandrum', 'Padmanabhaswamy Temple', 'Departure Transfer']
          }
        ],
        pricing: {
          startingPrice: '₹ 14,999',
          occupancyTypes: [
            { type: 'Triple / Quad Sharing', price: '₹ 14,999', note: 'Per person' },
            { type: 'Double / Twin Occupancy', price: '₹ 17,499', note: 'Per person' },
            { type: 'Luxury Beach & Villa Upgrade', price: '₹ 22,499', note: 'Per person' }
          ],
          notes: [
            'All stays, transfers, beach/forest tours, houseboat cruise included.',
            'Custom dates for private groups of 4+.'
          ]
        }
      }
    ],
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
        title: 'Thekkady Periyar Wildlife Sanctuary Trail',
        description: 'Drive through Western Ghats forest corridors connecting Munnar to Thekkady. Spice garden walk and Periyar boat safari.',
        highlights: ['1 Day Thekkady', 'Spice Plantation Walk', 'Periyar Wildlife Sanctuary']
      },
      {
        day: 4,
        title: 'Alappuzha (Alleppey) Backwaters Traditional Houseboat Cruise',
        description: 'Drive down to Alappuzha. Board a private traditional Kerala houseboat for an overnight cruise along palm-fringed lagoons and paddy fields.',
        highlights: ['1 Day Alappuzha', 'Overnight Houseboat Stay', 'Fresh Kerala Seafood / Meals', 'Backwater Sunset']
      },
      {
        day: 5,
        title: 'Fort Kochi Heritage Quarter & Departure Transfer',
        description: 'Enjoy sunrise over the backwaters, visit Fort Kochi Chinese fishing nets and spice markets before transfer to airport / railway station.',
        highlights: ['1 Day Kochi', 'Fort Kochi & Chinese Fishing Nets', 'Departure Transfer']
      }
    ],
    pricing: {
      startingPrice: '₹ 5,999',
      occupancyTypes: [
        { type: '3D/2N: 2 Days Munnar + Kochi Transfer', price: '₹ 5,999', note: 'Starting package per person' },
        { type: '4D/3N: 2 Days Munnar + 1 Day Alleppey + Kochi Transfer', price: '₹ 7,999', note: 'Houseboat package per person' },
        { type: '5D/4N: Munnar, Thekkady, Alappuzha, Kochi', price: '₹ 11,999', note: 'Overland circuit per person' },
        { type: '7D/6N: Munnar, Thekkady, Alappuzha, Kochi, Varkala, Trivandrum', price: '₹ 14,999', note: 'Grand tour package per person' }
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
    durationShort: '7 — 12 Days',
    durationFull: '7 to 12 Days (Leh to Leh & Srinagar to Manali)',
    startingPrice: '₹ 23,999',
    numericPrice: 23999,
    image: '/ladakh.webp',
    pdfUrl: '/ladakh.pdf',
    frameColor: '#768C9E',
    region: 'LADAKH',
    elevation: '19,024 FT / 5,798 M',
    squadSize: '4 - 10 RIDERS',
    difficulty: 'EXPEDITION',
    bestSeason: 'JUNE — SEPTEMBER',
    durationVariants: [
      {
        id: '7d6n',
        label: 'Ladakh 7D/6N (Leh to Leh)',
        durationShort: '7D/6N',
        durationFull: 'Leh to Leh 7D/6N - Bike Trip Planning',
        startingPrice: '₹ 23,999',
        numericPrice: 23999,
        pdfUrl: '/ladakh.pdf',
        about: {
          overview: 'High Altitude Himalayan Traverse: Leh to Leh 7D/6N Bike Trip Planning. Summit the highest motorable road on Earth at Umling La (19,024 ft), cross Khardung La (17,582 ft), explore Nubra Valley, camp lakeside at Pangong Tso, and experience the dark sky reserve at Hanle.',
          highlights: [
            'Summit Umling La Pass (19,024 ft) — World\'s Highest Motorable Road',
            'Cross Khardung La (17,582 ft) down to Hunder Bactrian Camel Sand Dunes',
            'Lakeside camping at turquoise Pangong Tso & starry night sky stargazing',
            'Hanle Dark Sky Observatory, Rezang La War Memorial & Demchok LAC Frontier',
            'Vehicle Packages: Himalayan 411 CC (Solo / Pillion) & Tempo Travelling'
          ],
          landscapeSummary: 'World\'s Highest Passes, Cold Desert & Changthang Plateau',
          bestTimeToVisit: 'June through October'
        },
        itinerary: [
          { day: 1, title: 'Arrival in Leh & Mandatory Acclimatization', description: 'Arrive at Leh Airport, hotel check-in, rest and acclimatize to high altitude (11,500 ft). Evening briefing session with lead captain. Dinner and overnight stay in Leh.', highlights: ['Leh Airport Pickup', 'Acclimatization (11,500 ft)', 'Captain Briefing', 'Overnight Leh'] },
          { day: 2, title: 'Leh to Nubra Valley via Khardung La (17,582 ft)', description: 'Drive over world-renowned Khardung La Pass (17,582 ft). Visit Diskit Monastery (108-ft Maitreya Buddha) and explore Hunder Sand Dunes for double-humped Bactrian camel safari. Overnight stay at Hunder.', highlights: ['Khardung La Pass (17,582 ft)', 'Diskit Monastery', '108ft Buddha Statue', 'Hunder Sand Dunes', 'Bactrian Camel Safari'] },
          { day: 3, title: 'Nubra Valley to Pangong Tso via Shyok River', description: 'Journey to stunning Pangong Tso via Agam and Shyok River gorge. Check into lakeside campsite, sit by the tranquil waters, and stargaze. Overnight stay at Pangong.', highlights: ['Shyok River Route', 'Pangong Tso Saltwater Lake', 'Lakeside Camping', 'Stargazing'] },
          { day: 4, title: 'Pangong Tso to Hanle via Rezang La War Memorial', description: 'Drive across Changthang Plateau past grazing yaks and nomadic settlements. Visit Rezang La War Memorial. Arrive in Hanle, famous for its high-altitude observatory and clear night skies. Overnight stay in Hanle.', highlights: ['Changthang Plateau', 'Rezang La War Memorial', 'Hanle Dark Sky Observatory', 'Overnight Hanle'] },
          { day: 5, title: 'Hanle to Umling La Summit (19,024 ft) & Demchok Circuit', description: 'High-altitude expedition to summit Umling La Pass (19,024 ft) — the highest motorable road on Earth! Witness the stark Line of Actual Control frontier at Demchok before returning to Hanle.', highlights: ['Umling La Summit (19,024 ft)', 'World\'s Highest Motorable Road', 'Demchok LAC Frontier', 'Overnight Hanle'] },
          { day: 6, title: 'Hanle to Leh via Chumathang & Indus River Valley', description: 'Exhilarating drive through Chumathang Valley alongside the winding Indus River. Transition out of the Changthang plateau back to Leh for a celebration dinner.', highlights: ['Chumathang Hot Springs Valley', 'Indus River Drive', 'Return to Leh', 'Celebration Dinner'] },
          { day: 7, title: 'Leh Souvenir Market & Departure Transfer', description: 'Enjoy breakfast, shop for souvenirs in Leh Market, and transfer to Leh Airport with memories of the highest Himalayan passes.', highlights: ['Leh Market Walk', 'Airport Drop', 'Trip Ends with Memories'] }
        ],
        pricing: {
          startingPrice: '₹ 23,999',
          occupancyTypes: [
            { type: 'Tempo Travelling', price: '₹ 23,999', note: 'Per person in backup support vehicle' },
            { type: 'Himalayan 411 CC + Pillion', price: '₹ 23,999', note: 'Per person (Rider + Pillion sharing bike)' },
            { type: 'Himalayan 411 CC', price: '₹ 28,999', note: 'Solo Rider (RE Himalayan 411 CC)' }
          ],
          notes: [
            'Includes Royal Enfield Himalayan 411 CC motorbike / Tempo Travelling seat + Fuel.',
            'Inner Line Permits (ILP), Environmental fee & Wildlife charges included.',
            'Backup Support Vehicle, Experienced Mechanic with tools, Safety Armours & All Meals.',
            'Emergency Medical Oxygen Cylinders onboard.'
          ]
        },
        inclusions: {
          included: [
            'Bike (if opted): Himalayan 411 CC (with Pillion option) or Tempo Travelling seat',
            'Inner Line Permit: All required ILP & environmental permits',
            'Backup Vehicle: Support vehicle throughout the trip',
            'Fuel: Fuel for the entire trip',
            'Mechanic: Experienced mechanic with tools',
            'Armours for Safety: Riding armours (knee, elbow) for safety',
            'Meals: All meals (Breakfast, Lunch, Dinner) during the trip',
            'Medical Oxygen Cylinder & First Aid Support'
          ],
          excluded: [
            'Flights to/from Leh Airport',
            'Refundable Security Deposit for Bike',
            'Personal shopping & miscellaneous personal expenses'
          ]
        }
      },
      {
        id: '12d11n',
        label: 'Ladakh 12D/11N (Srinagar to Manali)',
        durationShort: '12D/11N',
        durationFull: 'Srinagar to Manali - 12D/11N Bike Trip',
        startingPrice: '₹ 28,999',
        numericPrice: 28999,
        pdfUrl: '/lad2.pdf',
        about: {
          overview: 'Ladakh Srinagar to Manali 12D/11N Bike Trip. The ultimate Trans-Himalayan grand expedition crossing 11 high mountain passes across Srinagar, Kargil, Leh, Nubra, Pangong, Hanle, Sarchu, and Manali, summiting the highest motorable road on Earth at Umling La (19,024 ft).',
          highlights: [
            'Traverse Srinagar to Manali across 11 mountain passes including Umling La (19,024 ft)',
            'Drass & Kargil War Memorial, Tiger Hill views & Zoji La pass',
            'Khardung La, Hunder Bactrian Camel safari & Diskit 108ft Maitreya Buddha',
            'Pangong Tso lakeside camping, Hanle Dark Sky Reserve & Demchok LAC frontier',
            'Moore Plains, Gata Loops (21 hairpin bends), Baralacha La & Manali exploration'
          ],
          landscapeSummary: 'Trans-Himalayan Traverse across Jammu & Kashmir, Ladakh, and Himachal',
          bestTimeToVisit: 'June through October'
        },
        itinerary: [
          { day: 1, title: 'Arrival in Srinagar', description: 'Arrive in Srinagar, check into hotel/houseboat. Rest, team introduction, bike allocation, and mandatory briefing for the epic Himalayan traverse.', highlights: ['Arrival in Srinagar', 'Team Briefing', 'Squad Dinner & Rest'] },
          { day: 2, title: 'Srinagar to Kargil', description: 'Drive through Sonamarg (Meadow of Gold), conquer legendary Zoji La pass (11,575 ft), visit Drass War Memorial with views of Tiger Hill and Tololing before reaching Kargil.', highlights: ['Sonamarg Valley', 'Zoji La Pass', 'Drass War Memorial', 'Tiger Hill View', 'Overnight Kargil'] },
          { day: 3, title: 'Kargil to Leh', description: 'Cross Namika La and Fotu La passes. Visit ancient Lamayuru Monastery (Moonland of Ladakh), Hall of Fame, Magnetic Hill, and Indus-Zanskar Sangam confluence to Leh.', highlights: ['Fotu La & Namika La', 'Lamayuru Moonland', 'Magnetic Hill', 'Indus-Zanskar Sangam', 'Overnight Leh'] },
          { day: 4, title: 'Leh to Nubra', description: 'Ride over world-famous Khardung La Pass (17,582 ft) into Nubra Valley. Visit Diskit Monastery (108ft Buddha statue) and explore Hunder sand dunes for Bactrian camel safari.', highlights: ['Khardung La (17,582 ft)', 'Diskit Monastery', 'Hunder Sand Dunes', 'Bactrian Camel Safari', 'Overnight Nubra'] },
          { day: 5, title: 'Nubra to Pangong', description: 'Ride through rugged Shyok River gorge to stunning turquoise Pangong Tso. Check into lakeside campsite for sunset and starry night sky stargazing.', highlights: ['Shyok River Gorge', 'Pangong Tso Check-in', 'Lakeside Camping', 'Stargazing'] },
          { day: 6, title: 'Pangong to Hanle', description: 'Drive across Changthang plateau past grazing yaks via Chushul. Pay homage at Rezang La War Memorial and arrive in Hanle dark sky observatory zone.', highlights: ['Changthang Plateau', 'Rezang La War Memorial', 'Hanle Dark Sky Reserve', 'Overnight Hanle'] },
          { day: 7, title: 'Hanle to Umlingla to Demchok to Hanle', description: 'Summit Umling La Pass (19,024 ft) — the highest motorable road on planet Earth! Visit border frontier at Demchok before returning to Hanle.', highlights: ['Umling La Summit (19,024 ft)', 'Highest Motorable Road', 'Demchok LAC Frontier', 'Overnight Hanle'] },
          { day: 8, title: 'Hanle to Leh', description: 'Drive past Puga geothermal hot springs and Chumathang Valley alongside Indus River back to Leh for souvenir shopping and celebration dinner.', highlights: ['Puga Geothermal Valley', 'Chumathang Hot Springs', 'Indus River Drive', 'Return to Leh'] },
          { day: 9, title: 'Leh to Sarchu', description: 'Drive across Moore Plains, ascend Tanglang La, Lachung La (16,617 ft) and Nakee La. Conquer 21 hairpin bends at Gata Loops to Sarchu campsite.', highlights: ['Moore Plains', 'Tanglang La Pass', 'Gata Loops (21 Bends)', 'Sarchu Camp Stays'] },
          { day: 10, title: 'Sarchu to Manali', description: 'Cross high-altitude Baralacha La (16,040 ft), view pristine Suraj Tal lake, pass Darcha & Zingzing Bar, and cross Atal Tunnel down to Manali.', highlights: ['Baralacha La (16,040 ft)', 'Suraj Tal Lake', 'Atal Tunnel', 'Arrival in Manali'] },
          { day: 11, title: 'Exploring Manali', description: 'Full day exploring Manali: Old Manali cafes, Hadimba Temple, Jogini waterfalls, and stroll Mall Road with celebration team dinner.', highlights: ['Old Manali Cafes', 'Hadimba Temple', 'Mall Road', 'Celebration Dinner'] },
          { day: 12, title: 'Departure from Manali', description: 'Check-out with lifelong memories and brotherhood of the 12-day Trans-Himalayan mountain expedition.', highlights: ['Check-out & Departure', '12-Day Journey Complete'] }
        ],
        pricing: {
          startingPrice: '₹ 28,999',
          occupancyTypes: [
            { type: 'Own Bike', price: '₹ 28,999', note: 'Rider with own motorcycle (Includes backup, fuel & stays)' },
            { type: 'Himalayan 411CC + Pillion', price: '₹ 35,999', note: 'Per person (Rider + Pillion sharing Himalayan 411 CC)' },
            { type: 'Himalayan 411CC', price: '₹ 45,999', note: 'Solo Rider (Royal Enfield Himalayan 411 CC)' }
          ],
          notes: [
            'Includes Royal Enfield Himalayan 411cc bike with fuel for entire circuit.',
            'All Inner Line Permits, Red Cross fee, Wildlife charges & Oxygen cylinder support included.',
            'Dedicated Backup Support Vehicle, Experienced Mechanic with tools & Safety Armours included.',
            'All Meals (Breakfast, Lunch, Dinner) during the tour.'
          ]
        },
        inclusions: {
          included: [
            'Bike (if opted): Himalayan 411CC (with Pillion option)',
            'Inner Line Permit: All required ILP',
            'Backup Vehicle: Support vehicle throughout the trip',
            'Fuel: Fuel for the entire trip',
            'Mechanic: Experienced mechanic with tools',
            'Armours for Safety: Riding armours (knee, elbow) for safety',
            'Meals: All meals (Breakfast, Lunch, Dinner) during the trip',
            'Oxygen Cylinder & First Aid Support'
          ],
          excluded: [
            'Travel to Srinagar / Return from Manali',
            'Refundable security deposit for rented motorcycle',
            'Personal shopping, extra beverages & laundry'
          ]
        }
      }
    ],
    about: {
      overview: 'High Altitude Himalayan Traverse: Choose between the 7D/6N Leh to Leh circuit or the grand 12D/11N Srinagar to Manali expedition. Summit the highest motorable road on Earth at Umling La (19,024 ft), cross Khardung La (17,582 ft), explore Nubra Valley, camp lakeside at Pangong Tso, and experience the dark sky reserve at Hanle.',
      highlights: [
        'Summit Umling La Pass (19,024 ft) — World\'s Highest Motorable Road',
        'Cross Khardung La (17,582 ft) down to Hunder Bactrian Camel Sand Dunes',
        'Lakeside camping at turquoise Pangong Tso & starry night sky stargazing',
        'Hanle Dark Sky Observatory, Rezang La War Memorial & Demchok LAC Frontier',
        'Vehicle Options: Himalayan 411 CC (Solo / Pillion), Own Bike & Tempo Travelling'
      ],
      landscapeSummary: 'World\'s Highest Passes, Cold Desert & Changthang Plateau',
      bestTimeToVisit: 'June through October'
    },
    itinerary: [
      { day: 1, title: 'Arrival in Leh & Mandatory Acclimatization', description: 'Arrive at Leh Airport, hotel check-in, rest and acclimatize to high altitude (11,500 ft). Evening briefing session with lead captain. Dinner and overnight stay in Leh.', highlights: ['Leh Airport Pickup', 'Acclimatization (11,500 ft)', 'Captain Briefing', 'Overnight Leh'] },
      { day: 2, title: 'Leh to Nubra Valley via Khardung La (17,582 ft)', description: 'Drive over world-renowned Khardung La Pass (17,582 ft). Visit Diskit Monastery (108-ft Maitreya Buddha) and explore Hunder Sand Dunes for double-humped Bactrian camel safari. Overnight stay at Hunder.', highlights: ['Khardung La Pass (17,582 ft)', 'Diskit Monastery', '108ft Buddha Statue', 'Hunder Sand Dunes', 'Bactrian Camel Safari'] },
      { day: 3, title: 'Nubra Valley to Pangong Tso via Shyok River', description: 'Journey to stunning Pangong Tso via Agam and Shyok River gorge. Check into lakeside campsite, sit by the tranquil waters, and stargaze. Overnight stay at Pangong.', highlights: ['Shyok River Route', 'Pangong Tso Saltwater Lake', 'Lakeside Camping', 'Stargazing'] },
      { day: 4, title: 'Pangong Tso to Hanle via Rezang La War Memorial', description: 'Drive across Changthang Plateau past grazing yaks and nomadic settlements. Visit Rezang La War Memorial. Arrive in Hanle, famous for its high-altitude observatory and clear night skies. Overnight stay in Hanle.', highlights: ['Changthang Plateau', 'Rezang La War Memorial', 'Hanle Dark Sky Observatory', 'Overnight Hanle'] },
      { day: 5, title: 'Hanle to Umling La Summit (19,024 ft) & Demchok Circuit', description: 'High-altitude expedition to summit Umling La Pass (19,024 ft) — the highest motorable road on Earth! Witness the stark Line of Actual Control frontier at Demchok before returning to Hanle.', highlights: ['Umling La Summit (19,024 ft)', 'World\'s Highest Motorable Road', 'Demchok LAC Frontier', 'Overnight Hanle'] },
      { day: 6, title: 'Hanle to Leh via Chumathang & Indus River Valley', description: 'Exhilarating drive through Chumathang Valley alongside the winding Indus River. Transition out of the Changthang plateau back to Leh for a celebration dinner.', highlights: ['Chumathang Hot Springs Valley', 'Indus River Drive', 'Return to Leh', 'Celebration Dinner'] },
      { day: 7, title: 'Leh Souvenir Market & Departure Transfer', description: 'Enjoy breakfast, shop for souvenirs in Leh Market, and transfer to Leh Airport with memories of the highest Himalayan passes.', highlights: ['Leh Market Walk', 'Airport Drop', 'Trip Ends with Memories'] }
    ],
    pricing: {
      startingPrice: '₹ 23,999',
      occupancyTypes: [
        { type: 'Tempo Travelling', price: '₹ 23,999', note: 'Per person in backup support vehicle' },
        { type: 'Himalayan 411 CC + Pillion', price: '₹ 23,999', note: 'Per person (Rider + Pillion sharing bike)' },
        { type: 'Himalayan 411 CC', price: '₹ 28,999', note: 'Solo Rider (RE Himalayan 411 CC)' }
      ],
      notes: [
        'Includes Royal Enfield Himalayan 411 CC bike / Tempo Travelling seat + Fuel.',
        'Inner Line Permits (ILP), Environmental fee & Wildlife charges included.',
        'Backup Support Vehicle, Experienced Mechanic with tools, Safety Armours & All Meals.',
        'Emergency Medical Oxygen Cylinders onboard.'
      ]
    },
    inclusions: {
      included: [
        'Bike (if opted): Himalayan 411CC (with Pillion option)',
        'Inner Line Permit: All required ILP',
        'Backup Vehicle: Support vehicle throughout the trip',
        'Fuel: Fuel for the entire trip',
        'Mechanic: Experienced mechanic with tools',
        'Armours for Safety: Riding armours (knee, elbow) for safety',
        'Meals: All meals (Breakfast, Lunch, Dinner) during the trip',
        'Medical Oxygen Cylinder & First Aid Support'
      ],
      excluded: [
        'Flights to/from destination',
        'Refundable Security Deposit for Bike',
        'Personal shopping, extra snacks & beverages'
      ]
    }
  },

  kodaikanal: {
    id: 'kodaikanal',
    title: 'KODAIKANAL',
    durationShort: '3D/2N',
    durationFull: '3 Days - 2 Nights',
    startingPrice: '₹ 7,499',
    numericPrice: 7499,
    image: '/kodai.webp',
    pdfUrl: '/kerala_catalog.pdf',
    frameColor: '#4E7063',
    region: 'KODAIKANAL',
    elevation: '7,000 FT / 2,133 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'INTERMEDIATE',
    bestSeason: 'YEAR-ROUND',
    durationVariants: [
      {
        id: '3d2n',
        label: 'Kodaikanal 3D2N',
        durationShort: '3D/2N',
        durationFull: '3 Days - 2 Nights',
        startingPrice: '₹ 7,499',
        numericPrice: 7499,
        pdfUrl: '/kerala_catalog.pdf',
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
          { day: 1, title: 'Ghat Climb & Pine Valley Check-in', description: 'Ascend Palani hills, visit Silver Cascade Waterfalls, check into cozy hillside resort and explore pine trails.', highlights: ['Silver Cascade Waterfalls', 'Palani Ghat Road', 'Pine Valley Check-in'] },
          { day: 2, title: 'Pillar Rocks, Coakers Walk & Berijam Lake Trail', description: 'Walk through dense pine tree trails, cliffside cloud views at Pillar Rocks, and off-grid forest permit route to Berijam Lake.', highlights: ['Pillar Rocks', 'Coakers Walk', 'Berijam Lake Trail'] },
          { day: 3, title: 'Kodai Lake Boating, Artisan Chocolates & Departure', description: 'Boating on star-shaped Kodai Lake, artisan chocolate tasting, and return departure.', highlights: ['Kodai Lake Boating', 'Artisan Chocolates', 'Departure Transfer'] }
        ],
        pricing: {
          startingPrice: '₹ 7,499',
          occupancyTypes: [
            { type: 'Group Sharing (3-4 Person Room)', price: '₹ 7,499', note: 'Per person' },
            { type: 'Couples Private Room (2 Person)', price: '₹ 8,999', note: 'Per person' }
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
      }
    ],
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
      { day: 1, title: 'Ghat Climb & Pine Valley Check-in', description: 'Ascend Palani hills, visit Silver Cascade Waterfalls, check into cozy hillside resort.', highlights: ['Silver Cascade Waterfalls', 'Palani Ghat Road', 'Pine Valley Check-in'] },
      { day: 2, title: 'Pillar Rocks, Coakers Walk & Pine Forest', description: 'Walk through dense pine tree trails, cliffside cloud views at Pillar Rocks.', highlights: ['Pillar Rocks', 'Coakers Walk', 'Pine Forest Trail'] },
      { day: 3, title: 'Off-Grid Berijam Lake Forest Reserve Trail', description: 'Enter restricted forest permit zone to Berijam Lake surrounded by wildlife.', highlights: ['Berijam Lake', 'Forest Permit Route', 'Eco Sanctuary'] },
      { day: 4, title: 'Kodai Lake Boating & Homemade Chocolates', description: 'Boating on star-shaped Kodai Lake, artisan chocolate tasting, return departure.', highlights: ['Kodai Lake Boating', 'Artisan Chocolates', 'Departure Transfer'] }
    ],
    pricing: {
      startingPrice: '₹ 7,499',
      occupancyTypes: [
        { type: 'Group Sharing (3-4 Person Room)', price: '₹ 7,499', note: 'Per person' },
        { type: 'Couples Private Room (2 Person)', price: '₹ 8,999', note: 'Per person' }
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
        'Botanical Garden, Doddabetta Peak & Tea Factory & Chocolate Museum',
        'Pine Forest, 9th Mile Shooting Spot & Pykara Waterfalls & Lake',
        'Nilgiri Mountain Railway Toy Train ride & Sim\'s Park Coonoor',
        'Lamb\'s Rock, Dolphin\'s Nose & Catherine Falls Viewpoint'
      ],
      landscapeSummary: 'Continuous Hairpin Switchbacks & High Tea Slopes',
      bestTimeToVisit: 'September through May'
    },
    itinerary: [
      { day: 1, title: 'Ooty Local Sightseeing & Peak Views', description: 'Coimbatore pickup, climb 36 hairpin bends to Ooty. Visit Botanical Garden, Doddabetta Peak & Telescope House, Tea Factory & Chocolate Museum, Rose Garden, Ooty Lake & Boat House, and St. Stephen\'s Church.', highlights: ['Botanical Garden', 'Doddabetta Peak', 'Tea Factory & Chocolate Museum', 'Rose Garden', 'Ooty Lake'] },
      { day: 2, title: 'Pykara Waterfalls & Shooting Spots Trail', description: 'Explore Pine Forest, Wenlock Downs (9th Mile Shooting Spot), Kamraj Sagar Dam, Pykara Waterfalls, Pykara Lake & Dam boating, and Glenmorgan Viewpoint.', highlights: ['Pine Forest', '9th Mile Shooting Spot', 'Kamraj Sagar Dam', 'Pykara Waterfalls', 'Pykara Lake Boating'] },
      { day: 3, title: 'Coonoor Sightseeing & Nilgiri Mountain Railway', description: 'Ride iconic UNESCO Nilgiri Mountain Railway steam train to Coonoor. Visit Sim\'s Park, Highfield Tea Factory, Lamb\'s Rock, Dolphin\'s Nose, Catherine Falls & Sleeping Lady Viewpoint before departure drop.', highlights: ['Nilgiri Toy Train', 'Sim\'s Park', 'Highfield Tea Factory', 'Lamb\'s Rock', 'Dolphin\'s Nose'] }
    ],
    pricing: {
      startingPrice: '₹ 6,999',
      occupancyTypes: [
        { type: 'Shared Cottage Stay', price: '₹ 6,999', note: 'Per person' },
        { type: 'Private Room Stay', price: '₹ 8,999', note: 'Per person' }
      ],
      notes: ['Includes Coimbatore Pickup & Drop, 2 Nights Stay, 2 Breakfasts & 2 Dinners, Campfire.']
    },
    inclusions: {
      included: [
        'Coimbatore Pickup & Drop Transport',
        '2 Nights Accommodation',
        'Sightseeing Cab for 3 Days',
        '2 Breakfasts & 2 Dinners',
        'Campfire (1 Night)',
        'Driver Allowance, Toll & Parking Charges'
      ],
      excluded: ['Entry Tickets & Activity Charges', 'Toy Train Tickets', 'Boating Charges', 'Lunch & Additional Meals', 'Personal Expenses']
    }
  },

  'arunachalam-pondicherry': {
    id: 'arunachalam-pondicherry',
    title: 'ARUNACHALAM X PONDICHERRY',
    durationShort: '3D/2N',
    durationFull: '3 Days - 2 Nights',
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
      { day: 1, title: 'Transfer to Tiruvannamalai, Ashram Visit & Barefoot Girivalam', description: 'Arrive in sacred Arunachalam, visit Sri Ramana Ashram, and embark on the holy 14 km Girivalam barefoot path around Arunachala hill.', highlights: ['Tiruvannamalai Arrival', 'Sri Ramana Ashram', 'Barefoot Girivalam 14km'] },
      { day: 2, title: 'Arunachaleswarar Temple, Coastal Drive to Pondicherry & Promenade Walk', description: 'Visit historic Arunachaleswarar Temple, drive to Pondicherry, and explore French Town White Town streetscapes and Rock Beach seaside promenade.', highlights: ['Arunachaleswarar Temple', 'Drive to Pondicherry', 'French Town & Promenade'] },
      { day: 3, title: 'Auroville Matrimandir, French Cafe Crawl & Departure', description: 'Morning visit to Matrimandir viewpoint in Auroville, croissant & coffee walk in White Town, followed by return departure.', highlights: ['Auroville Matrimandir', 'French Bakery Walk', 'Departure Transfer'] }
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
    durationShort: '3D/2N',
    durationFull: '3 Days - 2 Nights',
    startingPrice: '₹ 5,999',
    numericPrice: 5999,
    image: '/gokarna.webp',
    pdfUrl: '/gnd.pdf',
    frameColor: '#3A5C6D',
    region: 'KARNATAKA',
    elevation: '1,800 FT / 550 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'INTERMEDIATE',
    bestSeason: 'OCTOBER — MAY',
    about: {
      overview: 'Wild Adventure meets Coastal Escape! From the wild rivers and dense canopy of Dandeli to the cliff beaches, sacred temples, and coastal landscapes of Gokarna.',
      highlights: [
        'Kayaking, River Boating & Zorbing adventure in Dandeli',
        'Vibhooti Waterfalls, Honnavar & Murudeshwar Temple',
        'Historic Mirjan Fort & beachside relaxation in Gokarna',
        'Mahabaleshwar Temple & Om Beach exploration'
      ],
      landscapeSummary: 'Coastal Cliff Roads, Dense Jungle Reserves & River Gorges',
      bestTimeToVisit: 'October through May'
    },
    itinerary: [
      { day: 1, title: 'Dandeli Adventure (Where the Wild Things Begin)', description: 'Start with an action-packed day in Dandeli. Enjoy kayaking, river boating, and zorbing surrounded by nature. Optional river rafting and zipline available. Evening campfire.', highlights: ['Kayaking', 'River Boating', 'Zorbing', 'Optional Rafting', 'Optional Zipline', 'Campfire Evening'] },
      { day: 2, title: 'Coastal Karnataka Trail (Waterfalls to the Coast)', description: 'Discover Vibhooti Waterfalls, explore Honnavar, visit Murudeshwar Temple & iconic giant Shiva statue, and historic Mirjan Fort before beachside relaxation.', highlights: ['Vibhooti Waterfalls', 'Honnavar', 'Murudeshwar Temple', 'Mirjan Fort', 'Beachside Stay'] },
      { day: 3, title: 'Gokarna Exploration (Temples, Beaches & Goodbye)', description: 'Visit Mahabaleshwar Temple and Ganapati Temple, followed by time at Gokarna Main Beach and famous Om Beach before beginning departure.', highlights: ['Mahabaleshwar Temple', 'Ganapati Temple', 'Gokarna Main Beach', 'Om Beach', 'Departure Transfer'] }
    ],
    pricing: {
      startingPrice: '₹ 5,999',
      occupancyTypes: [
        { type: 'Standard Sharing Plan', price: '₹ 5,999', note: 'Per person' },
        { type: 'Deluxe Occupancy Upgrade', price: '₹ 7,999', note: 'Per person' }
      ],
      notes: ['Includes 2 Nights Stay (Dandeli & Gokarna), Kayaking, Boating & Zorbing.']
    },
    inclusions: {
      included: [
        'Pickup & Drop Transport',
        '2 Nights Accommodation',
        'Adventure Activities (Kayaking, River Boating, Zorbing)',
        'Local Transfers (Cab / Vehicle)',
        'Campfire Evening & Trip Assistance'
      ],
      excluded: ['Optional River Rafting & Zipline Charges', 'Entry Tickets & Personal Expenses', 'Lunch & Additional Meals']
    }
  },

  chikmagalur: {
    id: 'chikmagalur',
    title: 'CHIKMAGALUR',
    durationShort: '3D/2N',
    durationFull: '3 Days - 2 Nights',
    startingPrice: '₹ 5,999',
    numericPrice: 5999,
    image: '/chick.webp',
    pdfUrl: '/chik.pdf',
    frameColor: '#7B6852',
    region: 'KARNATAKA',
    elevation: '6,317 FT / 1,930 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'INTERMEDIATE',
    bestSeason: 'SEPTEMBER — MAY',
    durationVariants: [
      {
        id: '3d2n',
        label: 'Chikmagalur 3D2N',
        durationShort: '3D/2N',
        durationFull: '3 Days - 2 Nights',
        startingPrice: '₹ 5,999',
        numericPrice: 5999,
        pdfUrl: '/chik.pdf',
        about: {
          overview: 'Chikmagalur Traverse (3 Days / 2 Nights). A refreshing escape into misty mountains, lush landscapes, waterfalls, and cultural heritage. From Belur & Halebidu temples to Karnataka\'s highest peak Mullayanagiri and Z Point sunset.',
          highlights: [
            'Explore historic Belur & Halebidu Temples and Yagachi Water Sports',
            'Summit Mullayanagiri Peak, Seethalayyanagiri & Baba Budangiri',
            'Discover Jhari Falls, Hebbe Falls & Shanthi Falls',
            'Catch breathtaking sunset at Z Point and enjoy Bonfire & Music Night'
          ],
          landscapeSummary: 'Coffee Estate Roads, Mountain Switchbacks & Dirt Spurs',
          bestTimeToVisit: 'September through May'
        },
        itinerary: [
          { day: 1, title: 'Culture & Leisure (Belur & Halebidu Temples)', description: 'Blend history, culture, and leisure. Explore the magnificent Belur Temple and Halebidu Temple, head to Yagachi for water sports, and local exploration before settling into homestay.', highlights: ['Belur Temple', 'Halebidu Temple', 'Yagachi Water Sports', 'Local Exploration'] },
          { day: 2, title: 'Peaks & Views (Mullayanagiri & Z Point Sunset)', description: 'Full day of mountain landscapes. Ascend Mullayanagiri Peak and Seethalayyanagiri, visit Jhari Falls, explore Baba Budangiri, and watch sunset at Z Point. Unwind with Bonfire & Music Night.', highlights: ['Mullayanagiri Peak', 'Seethalayyanagiri', 'Jhari Falls', 'Baba Budangiri', 'Z Point Sunset', 'Bonfire & Music Night'] },
          { day: 3, title: 'Nature & Waterfalls (Kemmanagundi & Hebbe Falls)', description: 'Explore Kemmanagundi, trek to spectacular Hebbe Falls and Shanthi Falls, take on Z Point Trek before concluding your expedition.', highlights: ['Kemmanagundi', 'Hebbe Falls', 'Z Point Trek', 'Shanthi Falls', 'Departure Transfer'] }
        ],
        pricing: {
          startingPrice: '₹ 5,999',
          occupancyTypes: [
            { type: 'Triple Sharing Homestay', price: '₹ 5,999', note: 'Per person (Standard Plan)' },
            { type: 'Twin / Double Occupancy', price: '₹ 7,499', note: 'Per person (Private Room)' }
          ],
          notes: ['Includes 2 Nights Homestay Accommodation with Breakfast & Dinner.', 'Bonfire & Music Night included.']
        },
        inclusions: {
          included: [
            'Pickup & Drop Transport',
            '2 Nights Homestay Accommodation (Triple Sharing)',
            'Meals: Breakfast & Dinner Included',
            'Sightseeing Assistance for Temples, Peaks & Waterfalls',
            'Bonfire & Music Night'
          ],
          excluded: ['Entry Tickets & Activity Charges', 'Water Sports Charges at Yagachi', 'Lunch & Additional Meals', 'Personal Expenses']
        }
      }
    ],
    about: {
      overview: 'Chikmagalur Traverse (3 Days / 2 Nights). A refreshing escape into misty mountains, lush landscapes, waterfalls, and cultural heritage. From Belur & Halebidu temples to Karnataka\'s highest peak Mullayanagiri and Z Point sunset.',
      highlights: [
        'Explore historic Belur & Halebidu Temples and Yagachi Water Sports',
        'Summit Mullayanagiri Peak, Seethalayyanagiri & Baba Budangiri',
        'Discover Jhari Falls, Hebbe Falls & Shanthi Falls',
        'Catch breathtaking sunset at Z Point and enjoy Bonfire & Music Night'
      ],
      landscapeSummary: 'Coffee Estate Roads, Mountain Switchbacks & Dirt Spurs',
      bestTimeToVisit: 'September through May'
    },
    itinerary: [
      { day: 1, title: 'Culture & Leisure (Belur & Halebidu Temples)', description: 'Blend history, culture, and leisure. Explore the magnificent Belur Temple and Halebidu Temple, head to Yagachi for water sports, and local exploration before settling into homestay.', highlights: ['Belur Temple', 'Halebidu Temple', 'Yagachi Water Sports', 'Local Exploration'] },
      { day: 2, title: 'Peaks & Views (Mullayanagiri & Z Point Sunset)', description: 'Full day of mountain landscapes. Ascend Mullayanagiri Peak and Seethalayyanagiri, visit Jhari Falls, explore Baba Budangiri, and watch sunset at Z Point. Unwind with Bonfire & Music Night.', highlights: ['Mullayanagiri Peak', 'Seethalayyanagiri', 'Jhari Falls', 'Baba Budangiri', 'Z Point Sunset', 'Bonfire & Music Night'] },
      { day: 3, title: 'Nature & Waterfalls (Kemmanagundi & Hebbe Falls)', description: 'Explore Kemmanagundi, trek to spectacular Hebbe Falls and Shanthi Falls, take on Z Point Trek before concluding your expedition.', highlights: ['Kemmanagundi', 'Hebbe Falls', 'Z Point Trek', 'Shanthi Falls', 'Departure Transfer'] }
    ],
    pricing: {
      startingPrice: '₹ 5,999',
      occupancyTypes: [
        { type: 'Triple Sharing Homestay', price: '₹ 5,999', note: 'Per person (Standard Plan)' },
        { type: 'Twin / Double Occupancy', price: '₹ 7,499', note: 'Per person (Private Room)' }
      ],
      notes: ['Includes 2 Nights Homestay Accommodation with Breakfast & Dinner.', 'Bonfire & Music Night included.']
    },
    inclusions: {
      included: [
        'Pickup & Drop Transport',
        '2 Nights Homestay Accommodation (Triple Sharing)',
        'Meals: Breakfast & Dinner Included',
        'Sightseeing Assistance for Temples, Peaks & Waterfalls',
        'Bonfire & Music Night'
      ],
      excluded: ['Entry Tickets & Activity Charges', 'Water Sports Charges at Yagachi', 'Lunch & Additional Meals', 'Personal Expenses']
    }
  },

  spiti: {
    id: 'spiti',
    title: 'SPITI VALLEY',
    durationShort: '9D/8N',
    durationFull: '9 Days - 8 Nights',
    startingPrice: '₹ 21,999',
    numericPrice: 21999,
    image: '/tour_spiti.webp',
    pdfUrl: '/spiti.pdf',
    frameColor: '#C29B53',
    region: 'SPITI VALLEY',
    elevation: '15,059 FT / 4,590 M',
    squadSize: '4 - 8 RIDERS',
    difficulty: 'EXPEDITION',
    bestSeason: 'JUNE — OCTOBER',
    durationVariants: [
      {
        id: '9d8n',
        label: 'Spiti 9D8N',
        durationShort: '9D/8N',
        durationFull: '9 Days - 8 Nights',
        startingPrice: '₹ 21,999',
        numericPrice: 21999,
        pdfUrl: '/spiti.pdf',
        about: {
          overview: 'Himalayan Traverse: Kullu to Manali via Kaza (9 Days / 8 Nights). An extreme, high-altitude journey riding the roof of the world through Jalori Pass, Kinnaur Valley, Chitkul frontier, ancient monasteries, high salt passes, and starry Chandratal Moon Lake.',
          highlights: [
            'Traverse steep Jalori Pass (10,236 FT) and ancient Bhimakali Temple in Sarahan',
            'Explore Chitkul - the last inhabited village on the Indo-Tibet frontier along Baspa river',
            'Visit 1,000-year-old Tabo Monastery, Dhankar cliff monastery & Key Monastery',
            'Send postcards from Hikkim (world\'s highest post office) & visit Komic village (15,027 FT)',
            'Cross mighty Kunzum Pass (15,059 FT) and camp under Milky Way skies at Chandratal Lake',
            'Tackle the notorious Batal-Gramphu riverbed crossing and navigate through the Atal Tunnel'
          ],
          landscapeSummary: 'Kinnaur Cliff Corridors, Glacial Nullahs, High Salt Passes & Moonscapes',
          bestTimeToVisit: 'June through October'
        },
        itinerary: [
          { day: 1, title: 'Arrival in Kullu - Acclimatization & Orientation', description: 'Arrive at Kullu Airport with transfer to hotel. Rest, acclimatize to high altitude, conduct local orientation and bike allocations.', highlights: ['Kullu Airport Pickup', 'Acclimatization Rest', 'Machine & Gear Allocation'] },
          { day: 2, title: 'Kullu to Sarahan via Jalori Pass (10,236 FT)', description: 'Engines on! Tackle the steep inclines of Jalori Pass through dense cedar forests and reach the historic Bhimakali Temple.', highlights: ['Jalori Pass 10236ft', 'Dense Pine Forests', 'Sarahan Bhimakali Temple'] },
          { day: 3, title: 'Sarahan to Chitkul via Baspa Valley', description: 'Ride into scenic Kinnaur Valley towards Chitkul, the last inhabited village near the Indo-Tibet frontier on the banks of Baspa River.', highlights: ['Kinnaur Valley Gorges', 'Baspa Riverbanks', 'Chitkul Indo-Tibet Border Village'] },
          { day: 4, title: 'Sangla to Kaza via Khab & Nako', description: 'Transforming landscapes from green Kinnaur to barren Spiti cold desert. Navigate Khab confluence, Nako and the infamous Malling Nallah into Kaza.', highlights: ['Khab Sutlej-Spiti Confluence', 'Nako High Lake', 'Malling Nallah Run', 'Kaza Capital'] },
          { day: 5, title: 'Kaza Local Exploration: Key, Kibber, Hikkim & Komic', description: 'High-altitude circuit to cliffside Key Monastery, high Kibber village, world\'s highest post office at Hikkim (14,567 FT) and Komic village (15,027 FT).', highlights: ['Key Cliff Monastery', 'Hikkim Highest Post Office', 'Komic Village 15000ft', 'Tibetan-Buddhist Heritage'] },
          { day: 6, title: 'Kaza to Chandratal Moon Lake via Kunzum Pass (15,059 FT)', description: 'Summit the majestic Kunzum La pass with panoramic views of Bara Shigri Glacier, descending to starlight camping at sacred Chandratal Moon Lake.', highlights: ['Kunzum Pass 15059ft', 'Chhatru Glacial Runoffs', 'Chandratal Moon Lake Camp', 'Milky Way Stargazing'] },
          { day: 7, title: 'Chandratal to Manali via Batal-Gramphu & Atal Tunnel', description: 'Conquer the notorious off-road riverbeds of Batal and Gramphu, passing through the engineering wonder of Atal Tunnel back into lush Manali.', highlights: ['Batal Water Crossings', 'Gramphu Off-Road Stretch', 'Atal Tunnel Crossing', 'Manali Green Valleys'] },
          { day: 8, title: 'Manali to Delhi via Kullu Highway (AC Volvo)', description: 'Morning leisure in Manali, local cafe walks, and scenic drive down the Kullu highway boarding the overnight AC Volvo towards Delhi.', highlights: ['Old Manali Heritage Walk', 'Kullu Valley Highway', 'Overnight Luxury AC Volvo'] },
          { day: 9, title: 'Arrival in Delhi - Farewell & Onward Journey', description: 'Morning arrival in Delhi. Bid farewell to fellow riders with lifetime memories of the 9-day Spiti Himalayan traverse.', highlights: ['Morning Delhi Arrival', 'Certificate of Achievement', 'Himalayan Expedition Memories'] }
        ],
        pricing: {
          startingPrice: '₹ 21,999',
          occupancyTypes: [
            { type: 'Own Bike / Personal Machine', price: '₹ 21,999', note: 'Excludes Fuel & Spares' },
            { type: 'RE Himalayan 411 (Dual / With Pillion)', price: '₹ 27,999', note: 'Per Person (Includes Bike + Fuel)' },
            { type: 'RE Himalayan 411 (Solo Rider)', price: '₹ 34,999', note: 'Includes Dedicated Bike + Fuel' },
            { type: '4x4 SUV / Tempo Traveller Seat', price: '₹ 25,999', note: 'Per Person Passenger in SUV' }
          ],
          notes: ['Includes Oxygen Cylinder, Backup Luggage Truck & Professional Mechanic with Spares.']
        }
      }
    ],
    about: {
      overview: 'Himalayan Traverse: Kullu to Manali via Kaza (9 Days / 8 Nights). An extreme, high-altitude journey riding the roof of the world through Jalori Pass, Kinnaur Valley, Chitkul frontier, ancient monasteries, high salt passes, and starry Chandratal Moon Lake.',
      highlights: [
        'Traverse steep Jalori Pass (10,236 FT) and ancient Bhimakali Temple in Sarahan',
        'Explore Chitkul - the last inhabited village on the Indo-Tibet frontier along Baspa river',
        'Visit 1,000-year-old Tabo Monastery, Dhankar cliff monastery & Key Monastery',
        'Send postcards from Hikkim (world\'s highest post office) & visit Komic village (15,027 FT)',
        'Cross mighty Kunzum Pass (15,059 FT) and camp under Milky Way skies at Chandratal Lake',
        'Tackle the notorious Batal-Gramphu riverbed crossing and navigate through the Atal Tunnel'
      ],
      landscapeSummary: 'Kinnaur Cliff Corridors, Glacial Nullahs, High Salt Passes & Moonscapes',
      bestTimeToVisit: 'June through October'
    },
    itinerary: [
      { day: 1, title: 'Arrival in Kullu - Acclimatization & Orientation', description: 'Arrive at Kullu Airport with transfer to hotel. Rest, acclimatize to high altitude, conduct local orientation and bike allocations.', highlights: ['Kullu Airport Pickup', 'Acclimatization Rest', 'Machine & Gear Allocation'] },
      { day: 2, title: 'Kullu to Sarahan via Jalori Pass (10,236 FT)', description: 'Engines on! Tackle the steep inclines of Jalori Pass through dense cedar forests and reach the historic Bhimakali Temple.', highlights: ['Jalori Pass 10236ft', 'Dense Pine Forests', 'Sarahan Bhimakali Temple'] },
      { day: 3, title: 'Sarahan to Chitkul via Baspa Valley', description: 'Ride into scenic Kinnaur Valley towards Chitkul, the last inhabited village near the Indo-Tibet frontier on the banks of Baspa River.', highlights: ['Kinnaur Valley Gorges', 'Baspa Riverbanks', 'Chitkul Indo-Tibet Border Village'] },
      { day: 4, title: 'Sangla to Kaza via Khab & Nako', description: 'Transforming landscapes from green Kinnaur to barren Spiti cold desert. Navigate Khab confluence, Nako and the infamous Malling Nallah into Kaza.', highlights: ['Khab Sutlej-Spiti Confluence', 'Nako High Lake', 'Malling Nallah Run', 'Kaza Capital'] },
      { day: 5, title: 'Kaza Local Exploration: Key, Kibber, Hikkim & Komic', description: 'High-altitude circuit to cliffside Key Monastery, high Kibber village, world\'s highest post office at Hikkim (14,567 FT) and Komic village (15,027 FT).', highlights: ['Key Cliff Monastery', 'Hikkim Highest Post Office', 'Komic Village 15000ft', 'Tibetan-Buddhist Heritage'] },
      { day: 6, title: 'Kaza to Chandratal Moon Lake via Kunzum Pass (15,059 FT)', description: 'Summit the majestic Kunzum La pass with panoramic views of Bara Shigri Glacier, descending to starlight camping at sacred Chandratal Moon Lake.', highlights: ['Kunzum Pass 15059ft', 'Chhatru Glacial Runoffs', 'Chandratal Moon Lake Camp', 'Milky Way Stargazing'] },
      { day: 7, title: 'Chandratal to Manali via Batal-Gramphu & Atal Tunnel', description: 'Conquer the notorious off-road riverbeds of Batal and Gramphu, passing through the engineering wonder of Atal Tunnel back into lush Manali.', highlights: ['Batal Water Crossings', 'Gramphu Off-Road Stretch', 'Atal Tunnel Crossing', 'Manali Green Valleys'] },
      { day: 8, title: 'Manali to Delhi via Kullu Highway (AC Volvo)', description: 'Morning leisure in Manali, local cafe walks, and scenic drive down the Kullu highway boarding the overnight AC Volvo towards Delhi.', highlights: ['Old Manali Heritage Walk', 'Kullu Valley Highway', 'Overnight Luxury AC Volvo'] },
      { day: 9, title: 'Arrival in Delhi - Farewell & Onward Journey', description: 'Morning arrival in Delhi. Bid farewell to fellow riders with lifetime memories of the 9-day Spiti Himalayan traverse.', highlights: ['Morning Delhi Arrival', 'Certificate of Achievement', 'Himalayan Expedition Memories'] }
    ],
    pricing: {
      startingPrice: '₹ 21,999',
      occupancyTypes: [
        { type: 'Own Bike / Personal Machine', price: '₹ 21,999', note: 'Excludes Fuel & Spares' },
        { type: 'RE Himalayan 411 (Dual / With Pillion)', price: '₹ 27,999', note: 'Per Person (Includes Bike + Fuel)' },
        { type: 'RE Himalayan 411 (Solo Rider)', price: '₹ 34,999', note: 'Includes Dedicated Bike + Fuel' },
        { type: '4x4 SUV / Tempo Traveller Seat', price: '₹ 25,999', note: 'Per Person Passenger in SUV' }
      ],
      notes: ['Includes Oxygen Cylinder, Backup Luggage Truck & Professional Mechanic with Spares.']
    },
    inclusions: {
      included: [
        'RE Himalayan Motorbike (with Fuel, Mechanical Support & Spares) / 4x4 SUV / Tempo Traveller',
        'Kullu Airport Pickup & Manali to Delhi AC Volvo Bus Transfers',
        'All Meals: Breakfast & Dinner included throughout stay (Day 1 dinner to Day 9 breakfast)',
        'All Inner-Line Permits, Red Cross fee, environmental & union permissions',
        'Emergency Oxygen Cylinders & Medical First-Aid Kit',
        'Backup Support Vehicle to carry luggage',
        'Experienced Tour Captain / Ride Marshal & Mechanic with spare parts',
        'Commercial Riding Gear (Helmets, Knee Guards, and Elbow Guards)',
        'DSLR Photography & Evening Bonfire',
        'Certificate of Achievement'
      ],
      excluded: [
        'Lunch and monument entry fees',
        'Bike transportation charges if bike is left midway',
        'Personal expenses, transit to Kullu & onward from Delhi',
        'Fuel & spare parts for riders bringing their own vehicle',
        'Personal insurance & compensation for accidental damage'
      ]
    }
  },

  meghalaya: {
    id: 'meghalaya',
    title: 'MEGHALAYA',
    durationShort: '6D/5N',
    durationFull: '6 Days - 5 Nights',
    startingPrice: '₹ 14,999',
    numericPrice: 14999,
    image: '/meghalaya.webp',
    pdfUrl: '/megha.pdf',
    frameColor: '#2E6554',
    region: 'MEGHALAYA',
    elevation: '6,440 FT / 1,963 M',
    squadSize: '6 - 12 TRAVELLERS',
    difficulty: 'INTERMEDIATE',
    bestSeason: 'OCTOBER — MAY',
    durationVariants: [
      {
        id: '6d5n',
        label: 'Meghalaya 6D5N',
        durationShort: '6D/5N',
        durationFull: '6 Days - 5 Nights',
        startingPrice: '₹ 14,999',
        numericPrice: 14999,
        pdfUrl: '/megha.pdf',
        about: {
          overview: 'Meghalaya Abode of Clouds (6 Days / 5 Nights). Explore emerald rainforests, ancient Khasi living root bridges, plunging waterfalls, prehistoric limestone caves, and transparent turquoise rivers along the misty Indo-Bangladesh border.',
          highlights: [
            'Trek 3,500 stone stairs down the jungle valley to the Double Decker Living Root Bridge',
            'Boat on the transparent glass waters of Umngot River in Dawki',
            'Marvel at Nohkalikai Falls (tallest plunge waterfall in India) and Wei Sawdong 3-tier cascade',
            'Cave exploration through limestone stalactite formations at Mawsmai and Arwah caves',
            'Stroll through Mawlynnong — awarded Asia\'s cleanest village'
          ],
          landscapeSummary: 'Rainforest Stone Steps, Limestone Canyons & Crystal Waters',
          bestTimeToVisit: 'October through May'
        },
        itinerary: [
          { day: 1, title: 'Guwahati to Shillong via Umiam Lake', description: 'Scenic drive up the Khasi hills with photo stop at tranquil Umiam Lake (Barapani). Check-in and evening explore Police Bazar.', highlights: ['Umiam Lake Viewpoint', 'Shillong Hill Town', 'Police Bazar Cafe Trail'] },
          { day: 2, title: 'Shillong to Cherrapunji (Sohra) via Waterfalls', description: 'Drive along misty gorges visiting Elephant Falls, Mawkdok Dympep Valley zipline point, and Garden of Caves.', highlights: ['Elephant Falls', 'Mawkdok Valley Suspension', 'Garden of Caves', 'Cherrapunji Mist'] },
          { day: 3, title: 'Double Decker Living Root Bridge & Rainbow Falls Trek', description: 'Descend 3,500 ancient stone stairs into deep Nongriat jungle to see centuries-old Bio-engineering living root bridges and turquoise natural pools.', highlights: ['Double Decker Root Bridge', 'Rainbow Falls', 'Natural Jungle Pools', 'Nongriat Rainforest'] },
          { day: 4, title: 'Cherrapunji Caving & Transfer to Mawlynnong & Dawki', description: 'Explore limestone fossils in Arwah & Mawsmai Caves, marvel at 1,115 ft Nohkalikai Falls, and transfer to Mawlynnong clean village.', highlights: ['Arwah Fossil Caves', 'Nohkalikai Plunge View', 'Mawlynnong Village Walk', 'Single Root Bridge'] },
          { day: 5, title: 'Dawki Umngot River Boating & Krang Shuri Falls to Shillong', description: 'Sunrise boat ride on transparent glass waters of Umngot River in Dawki/Shnongpdeng, swim in azure pools of Krang Shuri Falls, return to Shillong.', highlights: ['Umngot Transparent Boating', 'Bangladesh Border View', 'Krang Shuri Azure Pool', 'Riverside Campsite'] },
          { day: 6, title: 'Shillong Heritage Walk & Departure via Guwahati', description: 'Morning visit to Laitlum Grand Canyons, shopping for Khasi handicrafts, and scenic descent to Guwahati Airport.', highlights: ['Laitlum Grand Canyon', 'Khasi Souvenirs', 'Guwahati Airport Transfer'] }
        ],
        pricing: {
          startingPrice: '₹ 14,999',
          occupancyTypes: [
            { type: 'Triple Sharing Backpackers', price: '₹ 14,999', note: 'Per Person in 3-Sharing Room' },
            { type: 'Twin / Double Sharing Room', price: '₹ 16,999', note: 'Per Person (Ideal for couples & duos)' },
            { type: 'Solo Private Room Upgrade', price: '₹ 21,999', note: 'Dedicated Private Room' }
          ],
          notes: ['Includes Guwahati pickup & drop in comfortable vehicle with dedicated driver.']
        }
      }
    ],
    about: {
      overview: 'Meghalaya Abode of Clouds (6 Days / 5 Nights). Explore emerald rainforests, ancient Khasi living root bridges, plunging waterfalls, prehistoric limestone caves, and transparent turquoise rivers along the misty Indo-Bangladesh border.',
      highlights: [
        'Trek 3,500 stone stairs down the jungle valley to the Double Decker Living Root Bridge',
        'Boat on the transparent glass waters of Umngot River in Dawki',
        'Marvel at Nohkalikai Falls (tallest plunge waterfall in India) and Wei Sawdong 3-tier cascade',
        'Cave exploration through limestone stalactite formations at Mawsmai and Arwah caves',
        'Stroll through Mawlynnong — awarded Asia\'s cleanest village'
      ],
      landscapeSummary: 'Rainforest Stone Steps, Limestone Canyons & Crystal Waters',
      bestTimeToVisit: 'October through May'
    },
    itinerary: [
      { day: 1, title: 'Guwahati to Shillong via Umiam Lake', description: 'Scenic drive up the Khasi hills with photo stop at tranquil Umiam Lake (Barapani). Check-in and evening explore Police Bazar.', highlights: ['Umiam Lake Viewpoint', 'Shillong Hill Town', 'Police Bazar Cafe Trail'] },
      { day: 2, title: 'Shillong to Cherrapunji (Sohra) via Waterfalls', description: 'Drive along misty gorges visiting Elephant Falls, Mawkdok Dympep Valley zipline point, and Garden of Caves.', highlights: ['Elephant Falls', 'Mawkdok Valley Suspension', 'Garden of Caves', 'Cherrapunji Mist'] },
      { day: 3, title: 'Double Decker Living Root Bridge & Rainbow Falls Trek', description: 'Descend 3,500 ancient stone stairs into deep Nongriat jungle to see centuries-old Bio-engineering living root bridges and turquoise natural pools.', highlights: ['Double Decker Root Bridge', 'Rainbow Falls', 'Natural Jungle Pools', 'Nongriat Rainforest'] },
      { day: 4, title: 'Cherrapunji Caving & Transfer to Mawlynnong & Dawki', description: 'Explore limestone fossils in Arwah & Mawsmai Caves, marvel at 1,115 ft Nohkalikai Falls, and transfer to Mawlynnong clean village.', highlights: ['Arwah Fossil Caves', 'Nohkalikai Plunge View', 'Mawlynnong Village Walk', 'Single Root Bridge'] },
      { day: 5, title: 'Dawki Umngot River Boating & Krang Shuri Falls to Shillong', description: 'Sunrise boat ride on transparent glass waters of Umngot River in Dawki/Shnongpdeng, swim in azure pools of Krang Shuri Falls, return to Shillong.', highlights: ['Umngot Transparent Boating', 'Bangladesh Border View', 'Krang Shuri Azure Pool', 'Riverside Campsite'] },
      { day: 6, title: 'Shillong Heritage Walk & Departure via Guwahati', description: 'Morning visit to Laitlum Grand Canyons, shopping for Khasi handicrafts, and scenic descent to Guwahati Airport.', highlights: ['Laitlum Grand Canyon', 'Khasi Souvenirs', 'Guwahati Airport Transfer'] }
    ],
    pricing: {
      startingPrice: '₹ 14,999',
      occupancyTypes: [
        { type: 'Triple Sharing Backpackers', price: '₹ 14,999', note: 'Per Person in 3-Sharing Room' },
        { type: 'Twin / Double Sharing Room', price: '₹ 16,999', note: 'Per Person (Ideal for couples & duos)' },
        { type: 'Solo Private Room Upgrade', price: '₹ 21,999', note: 'Dedicated Private Room' }
      ],
      notes: ['Includes Guwahati pickup & drop in comfortable vehicle with dedicated driver.']
    },
    inclusions: {
      included: [
        'Guwahati to Guwahati Transfers in comfortable SUV / Tempo Traveller',
        '5 Nights Handpicked Stays (Shillong Hotel, Cherrapunji Resort & Dawki River Camp)',
        'Daily Breakfast & Dinner throughout the expedition',
        'Local Khasi Guide for Nongriat Double Decker Trek',
        'Boating fee at Dawki Umngot River',
        'All state permits, parking & toll charges',
        'Campfire evening at Shnongpdeng riverside'
      ],
      excluded: [
        'Flight/Train to Guwahati Airport',
        'Lunches and personal cafe visits',
        'Adventure water sports (Scuba, Cliff Jumping, Zipline)',
        'Personal shopping & monument camera permits'
      ]
    }
  },

  tawang: {
    id: 'tawang',
    title: 'TAWANG',
    durationShort: '7D/6N',
    durationFull: '7 Days - 6 Nights',
    startingPrice: '₹ 19,999',
    numericPrice: 19999,
    image: '/tawang.webp',
    pdfUrl: '/tawang.pdf',
    frameColor: '#9C6B38',
    region: 'TAWANG / ARUNACHAL',
    elevation: '15,200 FT / 4,632 M',
    squadSize: '4 - 8 RIDERS',
    difficulty: 'EXPEDITION',
    bestSeason: 'MARCH — NOVEMBER',
    durationVariants: [
      {
        id: '7d6n',
        label: 'Tawang 7D6N',
        durationShort: '7D/6N',
        durationFull: '7 Days - 6 Nights',
        startingPrice: '₹ 19,999',
        numericPrice: 19999,
        pdfUrl: '/tawang.pdf',
        about: {
          overview: 'Tawang Eastern Himalayan Circuit (7 Days / 6 Nights). An extraordinary high-altitude overland expedition crossing the snow-draped Sela Pass (13,700 FT), visiting the 400-year-old Tawang Monastery, and reaching the remote frontier of Bum La Pass (15,200 FT) on the India-Tibet border.',
          highlights: [
            'Ascend Sela Pass (13,700 FT) flanked by yellow Buddhist prayer flags and frozen Sela Lake',
            'Explore 400-year-old Tawang Monastery — 2nd largest Buddhist monastery on Earth',
            'Off-road 4x4 expedition to Bum La Pass (15,200 FT) and crystal clear Sangetsar (Madhuri) Lake',
            'Visit Jaswant Garh War Memorial & dramatic Nuranang (Jang) Waterfalls',
            'Immerse in Monpa tribal culture and serene apple orchard valleys in Dirang'
          ],
          landscapeSummary: 'High Mountain Passes, Snow Scree & Cloud Canyon Swerves',
          bestTimeToVisit: 'March through November'
        },
        itinerary: [
          { day: 1, title: 'Guwahati to Bhalukpong / Nameri Gateway', description: 'Scenic drive leaving Assam plains into the forested foothills of western Arunachal Pradesh.', highlights: ['Kameng River Valley', 'Arunachal Border Checkpost', 'Nameri Forest Fringe'] },
          { day: 2, title: 'Bhalukpong to Dirang via Tenga Valley', description: 'Ascend through dense mountain forests along Tenga river, visiting apple & kiwi orchards and Dirang Dzong heritage village.', highlights: ['Tenga Valley Canyon', 'Dirang Dzong 17th Century', 'Hot Water Springs'] },
          { day: 3, title: 'Dirang to Tawang via Sela Pass (13,700 FT)', description: 'Conquer legendary Sela Pass with panoramic Himalayan snow peaks, walk along frozen Sela Lake, and pay respects at Jaswant Garh War Memorial.', highlights: ['Sela Pass 13700ft', 'Sela Lake Mirrors', 'Jaswant Garh Memorial', 'Nuranang 100m Waterfalls'] },
          { day: 4, title: 'Bum La Pass (15,200 FT) & Sangetsar Lake Frontier Circuit', description: 'Rugged 4x4 overland run to the India-China Tibetan border at Bum La Pass and picnic beside pine-surrounded Sangetsar (Madhuri) Lake.', highlights: ['Bum La Border Post 15200ft', 'Sangetsar (Madhuri) Lake', 'PT Tso Alpine Tarns', 'High Himalayan Scree'] },
          { day: 5, title: 'Tawang Monastery, Urgelling Gompa & Light Show', description: 'Explore the grand golden Gompa of Tawang Monastery, birthplace of the 6th Dalai Lama, and evening Sound & Light show at War Memorial.', highlights: ['Tawang Monastery (Galden Namgey Lhatse)', 'Urgelling Birthplace', 'Tawang War Memorial Light Show'] },
          { day: 6, title: 'Tawang to Bomdila via Dirang Valley', description: 'Scenic return traverse winding down high mountain corridors into Bomdila, visiting Bomdila Monastery overlooking the valley.', highlights: ['Bomdila Monastery Viewpoint', 'Himalayan Ridge Sunset', 'Local Monpa Market'] },
          { day: 7, title: 'Bomdila to Guwahati Airport Departure', description: 'Descent down to the Brahmaputra plains with return transfer to Guwahati Airport.', highlights: ['Guwahati Airport Drop', 'Frontier Expedition Memories', 'Arunachal Souvenirs'] }
        ],
        pricing: {
          startingPrice: '₹ 19,999',
          occupancyTypes: [
            { type: '4x4 SUV Passenger Seat', price: '₹ 19,999', note: 'Per Person in Expedition SUV' },
            { type: 'Twin Sharing Deluxe Hotel/Homestay', price: '₹ 23,499', note: 'Per Person for Duos / Couples' },
            { type: 'RE Himalayan 411 Motorbike Package', price: '₹ 28,999', note: 'Includes Bike + Fuel + Spares' }
          ],
          notes: ['Includes Arunachal Inner Line Permit (ILP) & Bum La Pass special military permissions.']
        }
      }
    ],
    about: {
      overview: 'Tawang Eastern Himalayan Circuit (7 Days / 6 Nights). An extraordinary high-altitude overland expedition crossing the snow-draped Sela Pass (13,700 FT), visiting the 400-year-old Tawang Monastery, and reaching the remote frontier of Bum La Pass (15,200 FT) on the India-Tibet border.',
      highlights: [
        'Ascend Sela Pass (13,700 FT) flanked by yellow Buddhist prayer flags and frozen Sela Lake',
        'Explore 400-year-old Tawang Monastery — 2nd largest Buddhist monastery on Earth',
        'Off-road 4x4 expedition to Bum La Pass (15,200 FT) and crystal clear Sangetsar (Madhuri) Lake',
        'Visit Jaswant Garh War Memorial & dramatic Nuranang (Jang) Waterfalls',
        'Immerse in Monpa tribal culture and serene apple orchard valleys in Dirang'
      ],
      landscapeSummary: 'High Mountain Passes, Snow Scree & Cloud Canyon Swerves',
      bestTimeToVisit: 'March through November'
    },
    itinerary: [
      { day: 1, title: 'Guwahati to Bhalukpong / Nameri Gateway', description: 'Scenic drive leaving Assam plains into the forested foothills of western Arunachal Pradesh.', highlights: ['Kameng River Valley', 'Arunachal Border Checkpost', 'Nameri Forest Fringe'] },
      { day: 2, title: 'Bhalukpong to Dirang via Tenga Valley', description: 'Ascend through dense mountain forests along Tenga river, visiting apple & kiwi orchards and Dirang Dzong heritage village.', highlights: ['Tenga Valley Canyon', 'Dirang Dzong 17th Century', 'Hot Water Springs'] },
      { day: 3, title: 'Dirang to Tawang via Sela Pass (13,700 FT)', description: 'Conquer legendary Sela Pass with panoramic Himalayan snow peaks, walk along frozen Sela Lake, and pay respects at Jaswant Garh War Memorial.', highlights: ['Sela Pass 13700ft', 'Sela Lake Mirrors', 'Jaswant Garh Memorial', 'Nuranang 100m Waterfalls'] },
      { day: 4, title: 'Bum La Pass (15,200 FT) & Sangetsar Lake Frontier Circuit', description: 'Rugged 4x4 overland run to the India-China Tibetan border at Bum La Pass and picnic beside pine-surrounded Sangetsar (Madhuri) Lake.', highlights: ['Bum La Border Post 15200ft', 'Sangetsar (Madhuri) Lake', 'PT Tso Alpine Tarns', 'High Himalayan Scree'] },
      { day: 5, title: 'Tawang Monastery, Urgelling Gompa & Light Show', description: 'Explore the grand golden Gompa of Tawang Monastery, birthplace of the 6th Dalai Lama, and evening Sound & Light show at War Memorial.', highlights: ['Tawang Monastery (Galden Namgey Lhatse)', 'Urgelling Birthplace', 'Tawang War Memorial Light Show'] },
      { day: 6, title: 'Tawang to Bomdila via Dirang Valley', description: 'Scenic return traverse winding down high mountain corridors into Bomdila, visiting Bomdila Monastery overlooking the valley.', highlights: ['Bomdila Monastery Viewpoint', 'Himalayan Ridge Sunset', 'Local Monpa Market'] },
      { day: 7, title: 'Bomdila to Guwahati Airport Departure', description: 'Descent down to the Brahmaputra plains with return transfer to Guwahati Airport.', highlights: ['Guwahati Airport Drop', 'Frontier Expedition Memories', 'Arunachal Souvenirs'] }
    ],
    pricing: {
      startingPrice: '₹ 19,999',
      occupancyTypes: [
        { type: '4x4 SUV Passenger Seat', price: '₹ 19,999', note: 'Per Person in Expedition SUV' },
        { type: 'Twin Sharing Deluxe Hotel/Homestay', price: '₹ 23,499', note: 'Per Person for Duos / Couples' },
        { type: 'RE Himalayan 411 Motorbike Package', price: '₹ 28,999', note: 'Includes Bike + Fuel + Spares' }
      ],
      notes: ['Includes Arunachal Inner Line Permit (ILP) & Bum La Pass special military permissions.']
    },
    inclusions: {
      included: [
        'Guwahati to Guwahati 4x4 Expedition Vehicle with Mountain Chauffeur',
        '6 Nights Handpicked Stays (Bhalukpong, Dirang, Tawang & Bomdila)',
        'Arunachal Inner Line Permit (ILP) & Bum La DC/Army Permits',
        'Daily Breakfast & Dinner throughout the trip',
        'Bum La Pass & Sangetsar Lake 4x4 Local Vehicle Permit Run',
        'Experienced Tour Captain & First Aid Support',
        'Emergency High Altitude Oxygen Cylinder'
      ],
      excluded: [
        'Flight/Train to Guwahati Airport',
        'Lunches and personal snacks',
        'Camera fees at historical monasteries',
        'Personal insurance & porter expenses'
      ]
    }
  },

  'bir-billing': {
    id: 'bir-billing',
    title: 'BIR BILLING',
    durationShort: '7D/6N',
    durationFull: '7 Days - 6 Nights',
    startingPrice: '₹ 39,000',
    numericPrice: 39000,
    image: '/bir_billing.webp',
    pdfUrl: '/bir.pdf',
    frameColor: '#4B6B46',
    region: 'BIR BILLING',
    elevation: '8,000 FT / 2,438 M',
    squadSize: '4 - 10 TRAVELLERS',
    difficulty: 'BEGINNER',
    bestSeason: 'SEPTEMBER — JUNE',
    durationVariants: [
      {
        id: '7d6n',
        label: 'Bir Billing 7D6N',
        durationShort: '7D/6N',
        durationFull: '7 Days - 6 Nights',
        startingPrice: '₹ 39,000',
        numericPrice: 39000,
        pdfUrl: '/bir.pdf',
        about: {
          overview: 'Bir Billing Paragliding Solo Flight Course & Expedition (7 Days / 6 Nights). Transform your passion for flight into reality with an immersive 7-day certified paragliding course in the world\'s second highest takeoff site. Move from ground school fundamentals to soaring solo over the spectacular Dhauladhar ranges of Himachal.',
          highlights: [
            'Professional Paragliding Course with certified & experienced flight instructors',
            'Progressive training: equipment masterclass, canopy inflation, forward & reverse launch',
            'Multiple high-altitude solo flights over the Kangra Valley landing at Bir Colony',
            'Includes Delhi to Bir Billing roundtrip Volvo/AC transit, stays & daily meals',
            'Explore Tibetan monasteries, tea factory tours, and vibrant mountain cafes'
          ],
          landscapeSummary: 'Rolling Tea Valleys, Alpine Ridge Spur & High Sky Thermals',
          bestTimeToVisit: 'September through June'
        },
        itinerary: [
          { day: 1, title: 'Arrival in Bir – Paragliding Ground Training (Learn the Fundamentals)', description: 'Morning arrival in Bir Billing from Delhi. Check-in to accommodation and meet certified instructors for theoretical briefing, equipment introduction, harness fitting, and initial canopy ground handling.', highlights: ['Arrival & Orientation', 'Equipment & Harness Fitting', 'Canopy Inflation Practice', 'Evening Bir Colony Walk'] },
          { day: 2, title: 'Ground Training (Build Your Control)', description: 'Intensive full-day ground handling sessions. Practice directional control, glider inflation, active stabilization, and forward launch techniques under continuous instructor supervision.', highlights: ['Canopy Pitch Control', 'Forward Launch Drills', 'Glider Flare & Touchdown Basics', 'Video Analysis Session'] },
          { day: 3, title: 'Advanced Ground Training (Preparing for the Sky)', description: 'Finalize ground school drills and transition to slope launches. Practice radio communication procedures, emergency protocols, approach patterns, and flight plan briefing for solo flights.', highlights: ['Slope Gliding Runs', 'Radio Protocol Briefing', 'Flight Path Planning', 'Solo Flight Clearance'] },
          { day: 4, title: 'Solo Flight & Exploring (Your First Solo High Flight)', description: 'The defining milestone! Ascend to Billing takeoff (8,000 FT), strap in under radio guidance, launch into the Himalayan skies, and experience your first glorious solo flight landing gently at Bir.', highlights: ['Billing 8,000 FT Takeoff', 'First Solo High Flight', 'Radio-Guided Landing', 'Debriefing & Flight Log Entry'] },
          { day: 5, title: 'Solo Flights & Exploration (Fly. Explore. Experience.)', description: 'Continue solo flying with morning flights refining turns, glide ratio management, and airspeed control. Afternoon explore local Tibetan monasteries and serene organic tea gardens.', highlights: ['Second Solo High Flight', 'Turn & Speed Control Drills', 'Chokling Monastery Visit', 'Local Himalayan Cafe Trail'] },
          { day: 6, title: 'Solo Flights & Mastery (Master the Moment)', description: 'Final high flying day over Bir Billing. Execute solo flight exercises, thermaling fundamentals, and smooth target landings. Evening celebration dinner and course achievement certification.', highlights: ['High Altitude Solo Flight', 'Spot Landing Practice', 'Course Certification Celebration', 'Bonfire Dinner'] },
          { day: 7, title: 'Exploration & Departure (Until the Next Flight)', description: 'Morning visit to Palpung Sherabling Monastery nestled in dense pine forests. Final souvenir shopping in Bir Tibetan market before boarding evening transit back to Delhi.', highlights: ['Sherabling Monastery Tour', 'Souvenir Shopping', 'Farewell to Flying Squad', 'Evening Departure to Delhi'] }
        ],
        pricing: {
          startingPrice: '₹ 39,000',
          occupancyTypes: [
            { type: 'Complete Paragliding Course Package (7D/6N)', price: '₹ 39,000', note: 'All-inclusive (Training + Equipment + Stays + Delhi Transit)' },
            { type: 'Advance Seat Reservation', price: '₹ 10,000', note: 'Per Person (Remaining balance due before departure)' }
          ],
          notes: ['Advance booking amount: ₹ 10,000/- per person. Solo flights are subject to clear wind and weather conditions for participant safety.']
        }
      }
    ],
    about: {
      overview: 'Bir Billing Paragliding Solo Flight Course & Expedition (7 Days / 6 Nights). Transform your passion for flight into reality with an immersive 7-day certified paragliding course in the world\'s second highest takeoff site. Move from ground school fundamentals to soaring solo over the spectacular Dhauladhar ranges of Himachal.',
      highlights: [
        'Professional Paragliding Course with certified & experienced flight instructors',
        'Progressive training: equipment masterclass, canopy inflation, forward & reverse launch',
        'Multiple high-altitude solo flights over the Kangra Valley landing at Bir Colony',
        'Includes Delhi to Bir Billing roundtrip Volvo/AC transit, stays & daily meals',
        'Explore Tibetan monasteries, tea factory tours, and vibrant mountain cafes'
      ],
      landscapeSummary: 'Rolling Tea Valleys, Alpine Ridge Spur & High Sky Thermals',
      bestTimeToVisit: 'September through June'
    },
    itinerary: [
      { day: 1, title: 'Arrival in Bir – Paragliding Ground Training (Learn the Fundamentals)', description: 'Morning arrival in Bir Billing from Delhi. Check-in to accommodation and meet certified instructors for theoretical briefing, equipment introduction, harness fitting, and initial canopy ground handling.', highlights: ['Arrival & Orientation', 'Equipment & Harness Fitting', 'Canopy Inflation Practice', 'Evening Bir Colony Walk'] },
      { day: 2, title: 'Ground Training (Build Your Control)', description: 'Intensive full-day ground handling sessions. Practice directional control, glider inflation, active stabilization, and forward launch techniques under continuous instructor supervision.', highlights: ['Canopy Pitch Control', 'Forward Launch Drills', 'Glider Flare & Touchdown Basics', 'Video Analysis Session'] },
      { day: 3, title: 'Advanced Ground Training (Preparing for the Sky)', description: 'Finalize ground school drills and transition to slope launches. Practice radio communication procedures, emergency protocols, approach patterns, and flight plan briefing for solo flights.', highlights: ['Slope Gliding Runs', 'Radio Protocol Briefing', 'Flight Path Planning', 'Solo Flight Clearance'] },
      { day: 4, title: 'Solo Flight & Exploring (Your First Solo High Flight)', description: 'The defining milestone! Ascend to Billing takeoff (8,000 FT), strap in under radio guidance, launch into the Himalayan skies, and experience your first glorious solo flight landing gently at Bir.', highlights: ['Billing 8,000 FT Takeoff', 'First Solo High Flight', 'Radio-Guided Landing', 'Debriefing & Flight Log Entry'] },
      { day: 5, title: 'Solo Flights & Exploration (Fly. Explore. Experience.)', description: 'Continue solo flying with morning flights refining turns, glide ratio management, and airspeed control. Afternoon explore local Tibetan monasteries and serene organic tea gardens.', highlights: ['Second Solo High Flight', 'Turn & Speed Control Drills', 'Chokling Monastery Visit', 'Local Himalayan Cafe Trail'] },
      { day: 6, title: 'Solo Flights & Mastery (Master the Moment)', description: 'Final high flying day over Bir Billing. Execute solo flight exercises, thermaling fundamentals, and smooth target landings. Evening celebration dinner and course achievement certification.', highlights: ['High Altitude Solo Flight', 'Spot Landing Practice', 'Course Certification Celebration', 'Bonfire Dinner'] },
      { day: 7, title: 'Exploration & Departure (Until the Next Flight)', description: 'Morning visit to Palpung Sherabling Monastery nestled in dense pine forests. Final souvenir shopping in Bir Tibetan market before boarding evening transit back to Delhi.', highlights: ['Sherabling Monastery Tour', 'Souvenir Shopping', 'Farewell to Flying Squad', 'Evening Departure to Delhi'] }
    ],
    pricing: {
      startingPrice: '₹ 39,000',
      occupancyTypes: [
        { type: 'Complete Paragliding Course Package (7D/6N)', price: '₹ 39,000', note: 'All-inclusive (Training + Equipment + Stays + Delhi Transit)' },
        { type: 'Advance Seat Reservation', price: '₹ 10,000', note: 'Per Person (Remaining balance due before departure)' }
      ],
      notes: ['Advance booking amount: ₹ 10,000/- per person. Solo flights are subject to clear wind and weather conditions for participant safety.']
    },
    inclusions: {
      included: [
        'Professional Paragliding Course Fees & Ground Training',
        'Experienced & Certified Flying Instructors',
        'Structured Training from Ground School to Solo Flight',
        'Paragliding Flying Gear & Training Equipment Support',
        'Radio Communication & Continuous In-Flight Supervision',
        'Roundtrip AC Transportation: Delhi to Bir Billing & Return',
        '6 Nights Accommodation in Bir Billing',
        'Daily Breakfast & Dinner throughout the course',
        'Local Transportation for Billing Takeoff & Training Grounds'
      ],
      excluded: [
        'Lunches and personal cafe visits',
        'Any monument or monastery entry fees',
        'Personal insurance & equipment damage indemnity',
        'Anything not specifically mentioned under inclusions'
      ]
    }
  }
};
