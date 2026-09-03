export interface ExpeditionItem {
  id: string;
  number: string;
  destination: string;
  title: string;
  verticalLabel: string;
  difficulty: string;
  duration: string;
  distance?: string; // Optional since Bhutan doesn't specify distance
  image: string;
  alt: string;
  frameColor: string; // Muted frame colors
}

export const EXPEDITIONS_DATA: ExpeditionItem[] = [
  {
    id: 'tour-ladakh',
    number: '01',
    destination: 'LADAKH',
    title: 'HIGH ALTITUDE ROAD EXPEDITION',
    verticalLabel: 'LADAKH | MTB',
    difficulty: 'ADVANCED',
    duration: '8 DAYS / 7 NIGHTS',
    distance: '1,200 KM',
    image: '/ladakh.jpg',
    alt: 'Expedition riders crossing Leh-Manali Pass in Ladakh',
    frameColor: '#768C9E' // Muted dusty blue
  },
  {
    id: 'tour-nepal',
    number: '02',
    destination: 'NEPAL',
    title: 'HIMALAYAN FRONTIERS',
    verticalLabel: 'NEPAL | MTB',
    difficulty: 'INTERMEDIATE',
    duration: '6 DAYS / 5 NIGHTS',
    distance: '850 KM',
    image: '/nep.jpg',
    alt: 'Riders climbing mountainous dirt corridor trails in Nepal',
    frameColor: '#BC5F44' // Muted terracotta
  },
  {
    id: 'tour-kerala',
    number: '03',
    destination: 'KERALA',
    title: 'COASTAL ESCAPE',
    verticalLabel: 'KERALA | ROAD',
    difficulty: 'BEGINNER',
    duration: '4 DAYS / 3 NIGHTS',
    distance: '520 KM',
    image: '/ke.jpg',
    alt: 'Coastal highways and misty plantations in Kerala',
    frameColor: '#7B8C78' // Muted sage green
  },
  {
    id: 'tour-spiti',
    number: '04',
    destination: 'SPITI',
    title: 'DESERT MOUNTAIN ROADS',
    verticalLabel: 'SPITI | MTB',
    difficulty: 'ADVANCED',
    duration: '7 DAYS / 6 NIGHTS',
    distance: '900 KM',
    image: '/tour_spiti.jpg',
    alt: 'Barren peaks and dry riverbed roads in Spiti valley',
    frameColor: '#C29B53' // Muted ochre
  },
  {
    id: 'tour-bhutan',
    number: '05',
    destination: 'BHUTAN',
    title: 'MOUNTAIN KINGDOM',
    verticalLabel: 'BHUTAN | MTB',
    difficulty: 'INTERMEDIATE',
    duration: '9 DAYS / 8 NIGHTS',
    image: '/tour_bhutan.jpg',
    alt: 'Scenic valley passes and monasteries in Bhutan',
    frameColor: '#4A8280' // Muted teal
  }
];
