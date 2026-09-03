export interface Trip {
  id: string;
  title: string;
  category: string;
  region: string;
  terrain: string;
  format: string;
  description: string;
  image: string;
  alt: string;
}

export interface TripCategory {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  isLead?: boolean;
}

export interface DestinationRegion {
  id: string;
  number: string;
  name: string;
  title: string;
  terrain: string;
  description: string;
  image: string;
  alt: string;
}

export interface WhyFeature {
  number: string;
  title: string;
  description: string;
}

export interface TravelNote {
  id: string;
  quote: string;
  author: string;
  route: string;
}

export interface VisualMoment {
  id: string;
  caption: string;
  image: string;
  alt: string;
  isWide?: boolean;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  destination: string;
  date: string;
  travellers: string;
  message: string;
}
