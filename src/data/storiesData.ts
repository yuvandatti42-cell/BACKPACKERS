export interface GalleryPhoto {
  id: string;
  url: string;
  caption?: string;
  alt: string;
}

export interface ClientReview {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  shortQuote?: string;
  reviewer: string;
  location?: string;
  avatar?: string;
  rating: number;
  image: string;
  imagePosition?: string;
  tripId?: string;
  tripName?: string;
  category?: 'himalayas' | 'south' | 'northeast' | 'nepal' | 'all';
  date?: string;
  elevation?: string;
  bikeModel?: string;
  verified?: boolean;
  galleryImages?: GalleryPhoto[];
}

export const REVIEWS_DATA: ClientReview[] = [
  {
    id: 'robert-kerala',
    number: '01',
    title: 'THROUGH MISTY GHATS & COAST',
    shortQuote: 'Riding through the misty tea hairpins down to the coast was pure magic. Perfect pacing and route knowledge.',
    paragraphs: [
      'Riding through the winding tea plantations of Munnar and down the wet rainforest hairpins of the Western Ghats was pure magic. The pacing was perfect and the team\'s local route knowledge made all the difference.',
      'From dense green mountain canopy to quiet coastal stretches, Kerala gave us an unforgettable journey on two wheels. The support vehicle had hot chai and spares ready at every checkpoint.'
    ],
    reviewer: 'Robert Campbell',
    location: 'Dublin, Ireland',
    avatar: '/reviewer_robert.webp',
    rating: 5,
    image: '/reviwe.webp',
    imagePosition: 'center bottom',
    tripId: 'kerala',
    tripName: 'Kerala & Western Ghats Traverse',
    category: 'south',
    date: 'August 2026',
    elevation: '6,400 FT',
    bikeModel: 'Royal Enfield Himalayan 450',
    verified: true,
    galleryImages: [
      { id: 'rob-1', url: '/reviwe.webp', alt: 'Tea plantation slopes in Munnar', caption: 'Mist rolling over tea plantations at dawn' },
      { id: 'rob-2', url: '/dest_kerala.webp', alt: 'Rainforest hairpin curves in Western Ghats', caption: 'Dense tropical canopy down the Western Ghats hairpins' },
      { id: 'rob-3', url: '/bike.webp', alt: 'Motorcycle expedition on mountain roads', caption: 'Royal Enfield Himalayan on winding backcountry asphalt' },
      { id: 'rob-4', url: '/wkndtp.webp', alt: 'Scenic mountain overlook in Kerala', caption: 'Catching sunset across the rolling valleys' }
    ]
  },
  {
    id: 'sarah-ladakh',
    number: '02',
    title: 'INTO THE HIGH WILDERNESS',
    shortQuote: 'Crossing Khardung La at 18,380 ft was life-changing. The support team and motorcycles were flawless.',
    paragraphs: [
      'Crossing the Khardung La pass under crisp blue skies was a life-changing milestone. The logistics were flawless, the support vehicle was always ready, and the motorcycles were maintained in perfect running order throughout the steep climbs.',
      'A rugged, beautiful, and deeply rewarding journey that tests your limits and rewards your soul. The campfire briefings under the Milky Way are etched into my memory forever.'
    ],
    reviewer: 'Sarah Jenkins',
    location: 'Bristol, UK',
    avatar: '/reviewer_sarah.webp',
    rating: 5,
    image: '/re2.webp',
    imagePosition: 'center 20%',
    tripId: 'ladakh',
    tripName: 'Ladakh Overland & Zanskar Pass',
    category: 'himalayas',
    date: 'July 2026',
    elevation: '18,380 FT',
    bikeModel: 'Himalayan 450',
    verified: true,
    galleryImages: [
      { id: 'sarah-1', url: '/re2.webp', alt: 'Rider silhouetted against Ladakh peaks', caption: 'High alpine pass under crisp Himalayan skies' },
      { id: 'sarah-2', url: '/dest_ladakh.webp', alt: 'Snow pass summit at Khardung La', caption: 'Approaching Khardung La at 18,380 ft' },
      { id: 'sarah-3', url: '/pic.webp', alt: 'Gravel track traversing Zanskar valley', caption: 'Barren moonscape trail along the Indus river' },
      { id: 'sarah-4', url: '/long.webp', alt: 'Expedition riders convoy on riverbed', caption: 'Crossing shallow glacial water runoffs' }
    ]
  },
  {
    id: 'marco-nepal',
    number: '03',
    title: 'AN UNFORGETTABLE RIDE',
    shortQuote: 'The Annapurna circuit on two wheels was unforgettable. The team felt like family around the fire every evening.',
    paragraphs: [
      'The Annapurna circuit on two wheels was challenging but incredibly rewarding. Passing through dusty river valleys, local stone villages, and high mountain passes, the team felt like family. Every evening we gathered by the fire with local cuisine.',
      'It is not just a tour; it is a true pilgrimage of independent spirit and adventure. Backpackers Destinations knows routes that no commercial guide mentions.'
    ],
    reviewer: 'Marco Rossi',
    location: 'Milan, Italy',
    avatar: '/reviewer_marco.webp',
    rating: 5,
    image: '/re3.webp',
    imagePosition: 'center 15%',
    tripId: 'nepal',
    tripName: 'Nepal Mountain Sanctuary & Annapurna',
    category: 'nepal',
    date: 'May 2026',
    elevation: '14,500 FT',
    bikeModel: 'Royal Enfield Scram 411',
    verified: true,
    galleryImages: [
      { id: 'marco-1', url: '/re3.webp', alt: 'Himalayan mountain suspension pass in Nepal', caption: 'Traversing the ancient Annapurna circuit trails' },
      { id: 'marco-2', url: '/dest_nepal.webp', alt: 'Valley settlements beneath Annapurna peaks', caption: 'Traditional stone villages along the mountain route' },
      { id: 'marco-3', url: '/off.webp', alt: 'Off-beaten track crossing rocky streams', caption: 'Remote backcountry stretches test machine and rider' },
      { id: 'marco-4', url: '/sty.webp', alt: 'Evening campsite with fires in the mountains', caption: 'Nightfall under the stars with warm local cuisine' }
    ]
  },
  {
    id: 'arjun-spiti',
    number: '04',
    title: 'RUGGED MOONSCAPES & CENTURIES OF SILENCE',
    shortQuote: 'Spiti is relentless and breathtaking. Waking up to Kaza’s golden sunrise made every gravel mile worth it.',
    paragraphs: [
      'Spiti is relentless, unforgiving, and mesmerizing. Backpackers Destinations provided world-class marshalling—our lead rider navigated every water crossing (mullah) with total calm and skill.',
      'Waking up to Kaza\'s golden sunrise and visiting the 1,000-year-old Key Monastery made every jolt on the gravel road worth it ten times over.'
    ],
    reviewer: 'Arjun & Pooja Mehta',
    location: 'Mumbai, India',
    avatar: '/reviewer_robert.webp',
    rating: 5,
    image: '/pic.webp',
    imagePosition: 'center center',
    tripId: 'spiti',
    tripName: 'Spiti Valley High Desert Expedition',
    category: 'himalayas',
    date: 'September 2026',
    elevation: '15,060 FT',
    bikeModel: 'Himalayan 450',
    verified: true,
    galleryImages: [
      { id: 'arjun-1', url: '/pic.webp', alt: 'Overlooking the vast Spiti canyon', caption: 'Endless high desert moonscapes near Kaza' },
      { id: 'arjun-2', url: '/in.webp', alt: 'High pass snow wall in Himachal', caption: 'Carving past towering spring snowbanks' },
      { id: 'arjun-3', url: '/long.webp', alt: 'Expedition riders navigating mountain hairpins', caption: 'Disciplined convoy riding across rugged gravel' },
      { id: 'arjun-4', url: '/ost.webp', alt: 'Riders and marshall team in conversation', caption: 'Morning route briefing by our lead marshal' }
    ]
  },
  {
    id: 'david-meghalaya',
    number: '05',
    title: 'LIVING ROOTS & UNTAMED WATERFALLS',
    shortQuote: 'Swimming in emerald cave pools and trekking living root bridges in the monsoon mist was otherworldly.',
    paragraphs: [
      'Trekking down to the double-decker living root bridges and swimming in emerald cave pools in Cherrapunji was otherworldly. The monsoon mist made the forest come alive with deep moss scents.',
      'The local tribal homestays organized by the team gave us a genuine connection with Khasi villagers. Genuine eco-travel done with absolute care.'
    ],
    reviewer: 'David Lindqvist',
    location: 'Stockholm, Sweden',
    avatar: '/reviewer_sarah.webp',
    rating: 5,
    image: '/meghalaya.webp',
    imagePosition: 'center 30%',
    tripId: 'meghalaya',
    tripName: 'Meghalaya Living Roots & Cloud Trails',
    category: 'northeast',
    date: 'June 2026',
    elevation: '4,900 FT',
    bikeModel: 'Scram 411',
    verified: true,
    galleryImages: [
      { id: 'david-1', url: '/meghalaya.webp', alt: 'Emerald river pools in Meghalaya', caption: 'Clear natural pools deep in the Khasi hills' },
      { id: 'david-2', url: '/tawang.webp', alt: 'Misty plateau ridge in North East', caption: 'Monsoon clouds rolling over lush valley ridges' },
      { id: 'david-3', url: '/chick.webp', alt: 'Scenic hill track enveloped in forest', caption: 'Quiet rainforest pathways and living root crossings' },
      { id: 'david-4', url: '/ostt.webp', alt: 'Travelers trekking along hillside trail', caption: 'Connecting with remote village communities' }
    ]
  },
  {
    id: 'kavita-chikmagalur',
    number: '06',
    title: 'SOUL-STIRRING ESCAPE IN COFFEE COUNTRY',
    paragraphs: [
      'As a solo female rider joining a group, I felt 100% welcomed, respected, and safe. The winding asphalt through Mullayanagiri enveloped in thick mist was breathtaking.',
      'Fresh estate coffee, roaring campfire camaraderie, and curves that never end. Already booked my next expedition for Ladakh next summer!'
    ],
    reviewer: 'Kavita Sundaram',
    location: 'Bengaluru, India',
    avatar: '/reviewer_marco.webp',
    rating: 5,
    image: '/chick.webp',
    imagePosition: 'center center',
    tripId: 'chikmagalur',
    tripName: 'Chikmagalur Coffee Country Traverse',
    category: 'south',
    date: 'October 2026',
    elevation: '6,317 FT',
    bikeModel: 'Royal Enfield Interceptor 650',
    verified: true
  },
  {
    id: 'ethan-tawang',
    number: '07',
    title: 'RIDING THROUGH SNOW CORRIDORS TO TAWANG',
    paragraphs: [
      'Reaching Sela Pass at 13,700 feet with snow banks towering higher than our handlebars was surreal. Backpackers Destinations handles all inner line permits and checkpoint clearances without a single hiccup.',
      'The majestic Tawang Monastery draped in prayer flags at dawn was spiritual. You can\'t put a price tag on this level of expedition leadership.'
    ],
    reviewer: 'Ethan Brooks',
    location: 'Melbourne, Australia',
    avatar: '/reviewer_robert.webp',
    rating: 5,
    image: '/tawang.webp',
    imagePosition: 'center 25%',
    tripId: 'tawang',
    tripName: 'Tawang High Plateau Expedition',
    category: 'northeast',
    date: 'May 2026',
    elevation: '13,700 FT',
    bikeModel: 'Himalayan 450',
    verified: true
  },
  {
    id: 'rohan-bir',
    number: '08',
    title: 'VALLEYS OF CEDAR & WINGS IN THE SKY',
    paragraphs: [
      'Carving through Kangra valley pinewoods followed by a tandem flight soaring over tea gardens at 8,000 feet. The combination of motorcycle touring and high mountain thermals was unmatched.',
      'The bikes were in showroom condition, tyres gripped like glue, and the marshals kept the convoy disciplined yet deeply fun.'
    ],
    reviewer: 'Rohan Deshmukh',
    location: 'Pune, India',
    avatar: '/reviewer_marco.webp',
    rating: 5,
    image: '/bir_billing.webp',
    imagePosition: 'center 35%',
    tripId: 'bir-billing',
    tripName: 'Bir Billing Heights & Kangra Traverse',
    category: 'himalayas',
    date: 'April 2026',
    elevation: '8,000 FT',
    bikeModel: 'Royal Enfield Scram 411',
    verified: true
  },
  {
    id: 'elena-kodai',
    number: '09',
    title: 'SOLITARY PINE RIDGES & FLOATING CLOUDS',
    paragraphs: [
      'Pillar rocks emerging from the rolling afternoon fog was like stepping onto another planet. Peaceful, cool mountain air and winding downhill switchbacks that tested our brake precision.',
      'Backpackers Destinations has an incredible knack for steering clear of crowded tourist traps and taking you to secluded ridge lines where only the wind speaks.'
    ],
    reviewer: 'Elena Voronova',
    location: 'Vancouver, Canada',
    avatar: '/reviewer_sarah.webp',
    rating: 5,
    image: '/kodai.webp',
    imagePosition: 'center center',
    tripId: 'kodaikanal',
    tripName: 'Kodaikanal & Palani Cloud Sanctuary',
    category: 'south',
    date: 'July 2026',
    elevation: '7,000 FT',
    bikeModel: 'Interceptor 650',
    verified: true
  }
];

