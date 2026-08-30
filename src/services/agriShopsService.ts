import { FertilizerShop } from '../types/farm';

export const NEARBY_FERTILIZER_SHOPS: FertilizerShop[] = [
  {
    id: 'shop-1',
    name: 'Sri Lakshmi Agro Chemicals & Fertilizers',
    distanceKm: 2.3,
    address: 'Main Road, Near Bus Stand, Kovur, Nellore District',
    phone: '+91 94401 23456',
    openingHours: '07:30 AM - 08:30 PM (Open Today)',
    categories: ['Fertilizers (Urea, DAP, MOP)', 'Pesticides & Fungicides', 'Certified Seeds'],
    rating: 4.6,
  },
  {
    id: 'shop-2',
    name: 'Rythu Seva Rythu Bharosa Kendra (RBK)',
    distanceKm: 1.1,
    address: 'Grama Sachivalayam, Kovur Mandal',
    phone: '+91 98480 11223',
    openingHours: '08:00 AM - 05:00 PM (Govt. Subsidized)',
    categories: ['Subsidized Fertilizers', 'Soil Testing Service', 'Govt. Certified Seed Paddy'],
    rating: 4.8,
  },
  {
    id: 'shop-3',
    name: 'Balaji Kisan Bio-Inputs & Drip Spares',
    distanceKm: 4.7,
    address: 'APMC Market Yard Gate 2, Nellore Bypass',
    phone: '+91 97005 88990',
    openingHours: '08:00 AM - 09:00 PM',
    categories: ['Bio-fertilizers', 'Drip & Sprinkler Spares', 'Micro-nutrients & Zinc'],
    rating: 4.4,
  },
  {
    id: 'shop-4',
    name: 'Annapurna Seeds & Agro Agency',
    distanceKm: 6.2,
    address: 'Trunk Road, Nellore City',
    phone: '+91 91234 56789',
    openingHours: '08:30 AM - 08:00 PM',
    categories: ['Hybrid Seeds', 'Pheromone Traps', 'Sticky Traps & Sprayers'],
    rating: 4.5,
  },
];

export function getNearbyAgriShops(): FertilizerShop[] {
  return NEARBY_FERTILIZER_SHOPS;
}
