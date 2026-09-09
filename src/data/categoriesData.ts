import { TripCategory } from '../types';

export const CATEGORIES_DATA: TripCategory[] = [
  {
    id: 'ladakh',
    number: '01',
    title: 'LADAKH TRIPS',
    description: 'High altitude mountain passes, Khardung La, Zanskar valley crossings, and cold desert tracks across the Himalayas.',
    image: '/ldk.jpg',
    alt: 'Expedition trekker looking at colossal Himalayan snow peaks in Ladakh',
    isLead: true
  },
  {
    id: 'south-india',
    number: '02',
    title: 'SOUTH INDIA',
    description: 'Misty Western Ghats tea plantations, 36 hairpin mountain curves, rainforest ridges, and coastal roads.',
    image: '/ke.jpg',
    alt: 'Lush green tea garden switchback roads in South India'
  },
  {
    id: 'north-india',
    number: '03',
    title: 'NORTH INDIA',
    description: 'Cliffside dirt routes through Spiti Valley, Kinnaur, Uttarakhand mountain ridges, and Atal pass circuits.',
    image: '/north.jpeg',
    alt: 'High altitude desert mountain valley in Spiti, North India'
  },
  {
    id: 'north-east',
    number: '04',
    title: 'NORTH EAST',
    description: 'Cloud-draped cliff roads, living root bridge canyons, Meghalaya waterfalls, and Tawang frontiers.',
    image: '/ostt.jpg',
    alt: 'Misty cloud cliffs and canyons in North East India'
  },
  {
    id: 'international',
    number: '05',
    title: 'INTERNATIONAL',
    description: 'Cross-border overlands into Nepal’s Mustang valley, Bhutan’s Dragon Kingdom, and pristine international passes.',
    image: '/nep.jpg',
    alt: 'Golden Buddhist monastery with snow-capped peaks in Nepal'
  }
];
