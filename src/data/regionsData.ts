import { DestinationRegion } from '../types';

export const REGIONS_DATA: DestinationRegion[] = [
  {
    id: 'ladakh',
    number: '01',
    name: 'LADAKH',
    title: 'Ladakh High Passes',
    terrain: 'Mountain Passes, High-Altitude Valleys, Cold Desert',
    description: 'High mountain roads across Khardung La and Chang La. Cold desert landscapes, high-altitude lakes, and raw Himalayan passes.',
    image: '/ladakh.jpg',
    alt: 'Rugged high-altitude mountain valley road in Ladakh'
  },
  {
    id: 'kerala',
    number: '02',
    name: 'KERALA',
    title: 'Kerala Backwaters & Western Ghats',
    terrain: 'Coastal Roads, Tropical Forests, Tea Plantations',
    description: 'Winding routes through Munnar tea hills, misty Ghat passes, and tranquil backwater coastal paths.',
    image: '/ke.jpg',
    alt: 'Misty tea hills and winding roads in Western Ghats, Kerala'
  },
  {
    id: 'karnataka',
    number: '03',
    name: 'KARNATAKA',
    title: 'Karnataka Heritage & Western Ghats',
    terrain: 'Ancient Boulders, Western Ghats Ridge, Dense Foliage',
    description: 'From the boulder terrain of Hampi to the dense rainforest corridors of Coorg and Chikmagalur.',
    image: '/dest_karnataka.jpg',
    alt: 'Historical stone architecture and landscape in Karnataka'
  },
  {
    id: 'tamilnadu',
    number: '04',
    name: 'TAMIL NADU',
    title: 'Tamil Nadu Mountain Corridors',
    terrain: 'Hairpin Bends, Shola Forests, High Ridges',
    description: 'The 36 hairpin bends of Valparai, high Nilgiri mountain passes, and historic temple-flanked routes.',
    image: '/dest_tamilnadu.jpg',
    alt: 'Dramatic mountain roads and viewpoints in Tamil Nadu'
  }
];
