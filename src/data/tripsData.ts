import { Trip } from '../types';

export const TRIPS_DATA: Trip[] = [
  {
    id: 'ladakh-circuit',
    title: 'LADAKH CIRCUIT',
    category: 'EXPEDITION',
    region: 'Ladakh',
    terrain: 'Cold Desert & High Passes',
    format: 'Bike & Overland',
    description: 'Leh, Nubra Valley, Pangong Tso, and high Himalayan passes. Strict acclimatization schedule and support backup.',
    image: '/ladakh.jpg',
    alt: 'Barren high mountain pass and road in Ladakh'
  },
  {
    id: 'western-ghats',
    title: 'WESTERN GHATS & COAST',
    category: 'WEEKEND / ESCAPE',
    region: 'Kerala',
    terrain: 'Ghats & Backwaters',
    format: 'Road Journey',
    description: 'From misty tea slopes in Munnar and Wayanad through dense forest corridors to quiet coastal stops.',
    image: '/ke.jpg',
    alt: 'Tea plantations and mountain ridges in Munnar, Kerala'
  },
  {
    id: 'karnataka-ridge',
    title: 'KARNATAKA RIDGE & RUINS',
    category: 'OVERLAND',
    region: 'Karnataka',
    terrain: 'Plateaus & Forest Trails',
    format: 'Bike & Drive',
    description: 'Connecting the boulder valleys of Hampi with the dense coffee estate roads of Chikmagalur and Coorg.',
    image: '/sty.jpeg',
    alt: 'Traveller with arms outstretched at mountain valley pass'
  },
  {
    id: 'tamil-nadu-passes',
    title: 'NILGIRI & VALPARAI PASSES',
    category: 'BIKE TRIP',
    region: 'Tamil Nadu',
    terrain: 'Mountain Hairpins',
    format: 'Motorcycle Route',
    description: 'Dozens of continuous hairpin bends, high-altitude Shola forest reserves, and clean mountain roads.',
    image: '/dest_tamilnadu.jpg',
    alt: 'Winding mountain hairpin roads in Tamil Nadu'
  }
];
