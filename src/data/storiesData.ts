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
    id: 'robert-kerala',
    number: '01',
    title: 'THROUGH MISTY GHATS & COAST',
    paragraphs: [
      'Riding through the winding tea plantations of Munnar and down the wet rainforest hairpins of the Western Ghats was pure magic. The pacing was perfect and the team\'s local route knowledge made all the difference.',
      'From dense green mountain canopy to quiet coastal stretches, Kerala gave us an unforgettable journey on two wheels.'
    ],
    reviewer: 'ROBERT, IRELAND - KERALA',
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
