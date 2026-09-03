import { TripCategory } from '../types';

export const CATEGORIES_DATA: TripCategory[] = [
  {
    id: 'ladakh',
    number: '01',
    title: 'LADAKH',
    description: 'High altitude mountain passes, remote valley crossings, and cold desert tracks across the Himalayas.',
    image: '/ldk.jpg',
    alt: 'Expedition trekker with hat and walking poles looking at colossal Himalayan snow peaks in Ladakh',
    isLead: true
  },
  {
    id: 'nepal',
    number: '02',
    title: 'NEPAL',
    description: 'Riding under the shadows of 8,000m peaks, navigating rough valley dirt roads and deep gorges.',
    image: '/nep.jpg',
    alt: 'Golden Buddhist monastery with snow-capped Himalayan peaks in Nepal'
  },
  {
    id: 'kerala',
    number: '03',
    title: 'KERALA',
    description: 'Misty tea plantations, wet rainforest hairpins, and scenic coastal asphalt stretches.',
    image: '/ke.jpg',
    alt: 'Lush green tea garden switchback roads in Kerala'
  },
  {
    id: 'international',
    number: '04',
    title: 'INTERNATIONAL',
    description: 'Cross-border overland expeditions designed for independent riders and long-distance touring.',
    image: '/in.jpg',
    alt: 'Winding asphalt highway surrounded by tropical forests'
  }
];
