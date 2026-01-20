
export interface Business {
  id: string;
  name: string;
  category: Category;
  description: string;
  address: string;
  phone: string;
  rating: number;
  image: string;
}

export enum Category {
  ALL = 'All',
  GYM = 'Gym',
  ELECTRICAL = 'Electrical Contractor',
  MASSAGE = 'Massage Therapy',
  LAWN_CARE = 'Lawn Care',
  HVAC = 'HVAC Contractor',
  BARBER = 'Barber Shop',
  RESTAURANT = 'Restaurant',
  AUTOMOTIVE = 'Automotive',
  NAIL_SALON = 'Nail Salon',
  DENTIST = 'Dentist',
  CLEANING = 'House Cleaning',
  HAIR_SALON = 'Hair Salon'
}
