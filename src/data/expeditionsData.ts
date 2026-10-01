import { DESTINATION_CORRIDORS, CorridorDetail } from './destinationsData';

export type ExpeditionItem = CorridorDetail & {
  destination: string;
  regionCategory: string;
  regionLabel: string;
  verticalLabel: string;
  alt: string;
  maxAltitude?: string;
  price: string;
  category?: string;
  objectPosition?: string;
};

export const EXPEDITIONS_DATA: ExpeditionItem[] = DESTINATION_CORRIDORS.map((c) => ({
  ...c,
  destination: c.region,
  regionCategory: c.id,
  regionLabel: c.landscapeZone.toUpperCase(),
  verticalLabel: `${c.region} | ${c.landscapeZone.toUpperCase()}`,
  alt: `${c.title} - ${c.subtitle}`,
  maxAltitude: c.elevation.split('/')[0]?.trim() || c.elevation,
  price: c.startingPrice,
  category: c.tripTypes[0] || 'all'
}));
