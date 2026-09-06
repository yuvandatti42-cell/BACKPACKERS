import { DestinationRegion } from '../types';

export const REGIONS_DATA: DestinationRegion[] = [
  {
    id: 'ladakh',
    number: '01',
    name: 'LADAKH TRIPS',
    title: 'Ladakh Trans-Himalayan High Passes',
    terrain: 'Mountain Passes, High-Altitude Valleys, Cold Desert',
    description: 'High mountain roads across Khardung La and Chang La. Cold desert landscapes, high-altitude lakes, and raw Himalayan passes.',
    image: '/ladakh.jpg',
    alt: 'Rugged high-altitude mountain valley road in Ladakh'
  },
  {
    id: 'south-india',
    number: '02',
    name: 'SOUTH INDIA',
    title: 'Kerala, Western Ghats & Coastal Corridors',
    terrain: 'Coastal Roads, Tropical Forests, Tea Plantations, 36 Hairpins',
    description: 'Winding routes through Munnar tea hills, misty Ghat passes, Valparai switchbacks, and tranquil coastal paths.',
    image: '/ke.jpg',
    alt: 'Misty tea hills and winding roads in Western Ghats, South India'
  },
  {
    id: 'north-india',
    number: '03',
    name: 'NORTH INDIA',
    title: 'Spiti Valley & Garhwal Himalayan Circuits',
    terrain: 'Unpaved Shales, Cliff Gorges, Glacial Nullahs',
    description: 'Cliffside dirt roads, high altitude lakes, Key monastery, and unscripted backcountry mountain runs.',
    image: '/tour_spiti.jpg',
    alt: 'Barren mountain gorge and unpaved road in Spiti, North India'
  },
  {
    id: 'north-east',
    number: '04',
    name: 'NORTH EAST',
    title: 'Meghalaya Abode of Clouds & Tawang Frontiers',
    terrain: 'Cloud Rainforests, River Canyons, High Slopes',
    description: 'Misty cliff passes, Cherrapunji waterfalls, Dawki crystal rivers, and living root bridge corridors.',
    image: '/ostt.jpg',
    alt: 'Misty green cliffs and waterfall canyons in North East India'
  },
  {
    id: 'international',
    number: '05',
    name: 'INTERNATIONAL',
    title: 'Nepal Mustang Valley & Bhutan Dragon Kingdom',
    terrain: 'High Himalayan Canyons, Suspension Bridges, Alpine Dzongs',
    description: 'Cross-border overlands under 8,000m summits, ancient forbidden Mustang trails, and Bhutanese mountain passes.',
    image: '/nep.jpg',
    alt: 'Mustang valley trails and Himalayan mountains in Nepal'
  }
];
