
import { Business, Category } from './types';

export const BUSINESS_CATEGORIES: Category[] = Object.values(Category);

export const MOCK_BUSINESSES: Business[] = [
  {
    id: '1',
    name: 'Edgewater Fitness Center',
    category: Category.GYM,
    description: 'Premier health and wellness facility with personal training.',
    address: '123 Solomons Island Rd, Edgewater, MD 21037',
    phone: '(410) 555-0101',
    rating: 4.8,
    image: 'https://picsum.photos/seed/gym/400/300'
  },
  {
    id: '2',
    name: 'Volt Masters Electrical',
    category: Category.ELECTRICAL,
    description: 'Expert residential and commercial electrical solutions.',
    address: '456 Central Ave, Edgewater, MD 21037',
    phone: '(410) 555-0202',
    rating: 4.9,
    image: 'https://picsum.photos/seed/electric/400/300'
  },
  {
    id: '3',
    name: 'Serenity Massage Therapy',
    category: Category.MASSAGE,
    description: 'Relaxing massage and holistic wellness treatments.',
    address: '789 Mayo Rd, Edgewater, MD 21037',
    phone: '(410) 555-0303',
    rating: 4.7,
    image: 'https://picsum.photos/seed/massage/400/300'
  },
  {
    id: '4',
    name: 'Green Thumb Lawn Care',
    category: Category.LAWN_CARE,
    description: 'Full-service landscaping and lawn maintenance.',
    address: '321 Shoreham Beach Rd, Edgewater, MD 21037',
    phone: '(410) 555-0404',
    rating: 4.6,
    image: 'https://picsum.photos/seed/lawn/400/300'
  },
  {
    id: '5',
    name: 'Climate Control HVAC',
    category: Category.HVAC,
    description: 'Reliable heating, cooling, and air quality experts.',
    address: '555 Stepneys Ln, Edgewater, MD 21037',
    phone: '(410) 555-0505',
    rating: 4.9,
    image: 'https://picsum.photos/seed/hvac/400/300'
  },
  {
    id: '6',
    name: 'Main Street Barber Shop',
    category: Category.BARBER,
    description: 'Classic haircuts and beard grooming for modern gentlemen.',
    address: '101 South River Rd, Edgewater, MD 21037',
    phone: '(410) 555-0606',
    rating: 4.8,
    image: 'https://picsum.photos/seed/barber/400/300'
  },
  {
    id: '7',
    name: 'The Bay Grill',
    category: Category.RESTAURANT,
    description: 'Local seafood and American favorites with a view.',
    address: '222 Muddy Creek Rd, Edgewater, MD 21037',
    phone: '(410) 555-0707',
    rating: 4.5,
    image: 'https://picsum.photos/seed/food/400/300'
  },
  {
    id: '8',
    name: 'Revive Auto Service',
    category: Category.AUTOMOTIVE,
    description: 'Complete car repair and maintenance services.',
    address: '888 Pike Ln, Edgewater, MD 21037',
    phone: '(410) 555-0808',
    rating: 4.7,
    image: 'https://picsum.photos/seed/car/400/300'
  },
  {
    id: '9',
    name: 'Elegant Nails Spa',
    category: Category.NAIL_SALON,
    description: 'Professional nail care and luxury spa treatments.',
    address: '999 Londontown Rd, Edgewater, MD 21037',
    phone: '(410) 555-0909',
    rating: 4.6,
    image: 'https://picsum.photos/seed/nails/400/300'
  },
  {
    id: '10',
    name: 'Edgewater Dental Care',
    category: Category.DENTIST,
    description: 'Gentle family dentistry and advanced oral health.',
    address: '111 Turkey Point Rd, Edgewater, MD 21037',
    phone: '(410) 555-1010',
    rating: 4.9,
    image: 'https://picsum.photos/seed/dentist/400/300'
  },
  {
    id: '11',
    name: 'Sparkle Clean Services',
    category: Category.CLEANING,
    description: 'Eco-friendly residential and office cleaning solutions.',
    address: '777 Pike Ln, Edgewater, MD 21037',
    phone: '(410) 555-1111',
    rating: 4.8,
    image: 'https://picsum.photos/seed/clean/400/300'
  },
  {
    id: '12',
    name: 'Vogue Hair Salon',
    category: Category.HAIR_SALON,
    description: 'Master stylists specializing in color and modern cuts.',
    address: '444 Mayo Rd, Edgewater, MD 21037',
    phone: '(410) 555-1212',
    rating: 4.7,
    image: 'https://picsum.photos/seed/hair/400/300'
  }
];
