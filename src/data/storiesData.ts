export interface ClientReview {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  reviewer: string;
  rating: number;
  image: string;
  imagePosition?: string;
}

export const REVIEWS_DATA: ClientReview[] = [
  {
    id: 'robert-bhutan',
    number: '01',
    title: 'A SPIRITUAL ADVENTURE',
    paragraphs: [
      'From the moment we dropped into Paro airport, flanked by 5,500 metre peaks, we were greeted with care and attention. Our guides Pelden and S.T., ably assisted by the crew, went to considerable lengths to ensure we were minded and individual requests were accommodated with good cheer and enthusiasm.',
      'If you want an adventure and have any capacity for awe or wonder, Bhutan is for you.'
    ],
    reviewer: 'ROBERT, IRELAND - BHUTAN',
    rating: 5,
    image: '/reviwe.jpeg',
    imagePosition: 'center bottom'
  },
  {
    id: 'sarah-ladakh',
    number: '02',
    title: 'INTO THE HIGH WILDERNESS',
    paragraphs: [
      'Crossing the Khardung La pass under crisp blue skies was a life-changing milestone. The logistics were flawless, the support vehicle was always ready, and the motorcycles were maintained in perfect running order throughout the steep climbs.',
      'A rugged, beautiful, and deeply rewarding journey that tests your limits and rewards your soul.'
    ],
    reviewer: 'SARAH, UK - LADAKH',
    rating: 5,
    image: '/re2.jpeg',
    imagePosition: 'center 20%'
  },
  {
    id: 'marco-nepal',
    number: '03',
    title: 'AN UNFORGETTABLE RIDE',
    paragraphs: [
      'The Annapurna circuit on two wheels was challenging but incredibly rewarding. Passing through dusty river valleys, local stone valleys, and high mountain passes, the team felt like family. Every evening we gathered by the fire with local cuisine.',
      'It is not just a tour; it is a true pilgrimage of independent spirit and adventure.'
    ],
    reviewer: 'MARCO, ITALY - NEPAL',
    rating: 5,
    image: '/re3.png',
    imagePosition: 'center 15%'
  }
];
