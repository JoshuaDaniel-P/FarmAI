import { MarketRate, NearbyMarket } from '../types/farm';

export const EXPANDED_MARKET_RATES: MarketRate[] = [
  {
    cropName: 'Paddy (Grade A - BPT 5204)',
    currentRate: 2450,
    unit: 'qtl',
    changePercent: 3.2,
    mandiLocation: 'Nellore APMC Mandi',
    lastUpdated: '30 Aug 2026, 11:30 AM',
    historicalData: [
      { label: 'May', rate: 2240 },
      { label: 'Jun', rate: 2280 },
      { label: 'Jul', rate: 2320 },
      { label: 'Aug', rate: 2450 },
    ],
  },
  {
    cropName: 'Paddy (Common)',
    currentRate: 2320,
    unit: 'qtl',
    changePercent: 1.5,
    mandiLocation: 'Kovur Sub-Market',
    lastUpdated: '30 Aug 2026, 10:00 AM',
    historicalData: [
      { label: 'May', rate: 2180 },
      { label: 'Jun', rate: 2210 },
      { label: 'Jul', rate: 2260 },
      { label: 'Aug', rate: 2320 },
    ],
  },
  {
    cropName: 'Cotton (Bt Hybrid)',
    currentRate: 7120,
    unit: 'qtl',
    changePercent: 1.8,
    mandiLocation: 'Guntur Commercial Market',
    lastUpdated: '30 Aug 2026, 01:15 PM',
    historicalData: [
      { label: 'May', rate: 6600 },
      { label: 'Jun', rate: 6800 },
      { label: 'Jul', rate: 6950 },
      { label: 'Aug', rate: 7120 },
    ],
  },
  {
    cropName: 'Chillies (Teja Premium Dry)',
    currentRate: 18500,
    unit: 'qtl',
    changePercent: -0.5,
    mandiLocation: 'Guntur Mirchi Yard',
    lastUpdated: '30 Aug 2026, 12:45 PM',
    historicalData: [
      { label: 'May', rate: 19500 },
      { label: 'Jun', rate: 19000 },
      { label: 'Jul', rate: 18800 },
      { label: 'Aug', rate: 18500 },
    ],
  },
  {
    cropName: 'Groundnut (Pods with Shell)',
    currentRate: 6450,
    unit: 'qtl',
    changePercent: 2.4,
    mandiLocation: 'Adoni & Nellore Mandi',
    lastUpdated: '30 Aug 2026, 11:00 AM',
    historicalData: [
      { label: 'May', rate: 5900 },
      { label: 'Jun', rate: 6100 },
      { label: 'Jul', rate: 6280 },
      { label: 'Aug', rate: 6450 },
    ],
  },
  {
    cropName: 'Maize (Yellow Feed Grade)',
    currentRate: 2150,
    unit: 'qtl',
    changePercent: 4.1,
    mandiLocation: 'Warangal & Guntur Mandi',
    lastUpdated: '30 Aug 2026, 02:00 PM',
    historicalData: [
      { label: 'May', rate: 1920 },
      { label: 'Jun', rate: 1980 },
      { label: 'Jul', rate: 2020 },
      { label: 'Aug', rate: 2150 },
    ],
  },
  {
    cropName: 'Red Gram (Kandulu)',
    currentRate: 7800,
    unit: 'qtl',
    changePercent: 1.2,
    mandiLocation: 'Tandur & Nellore Mandi',
    lastUpdated: '30 Aug 2026, 10:30 AM',
    historicalData: [
      { label: 'May', rate: 7400 },
      { label: 'Jun', rate: 7550 },
      { label: 'Jul', rate: 7680 },
      { label: 'Aug', rate: 7800 },
    ],
  },
];

export const NEARBY_SELLING_MARKETS: NearbyMarket[] = [
  {
    id: 'mkt-1',
    name: 'Nellore Agriculture Produce Market Committee (APMC)',
    distanceKm: 8.5,
    location: 'Podalakur Road, Nellore',
    tradedCrops: ['Paddy (BPT, MTU, Sona)', 'Black Gram', 'Groundnut'],
    currentRatesSummary: [
      { crop: 'Paddy BPT 5204', rate: 2450, unit: 'qtl' },
      { crop: 'Groundnut Pods', rate: 6450, unit: 'qtl' },
    ],
  },
  {
    id: 'mkt-2',
    name: 'Kovur Paddy Mandi & Rice Millers Hub',
    distanceKm: 2.8,
    location: 'Kovur Highway Junction',
    tradedCrops: ['Paddy (All Varieties)', 'Straw Fodder'],
    currentRatesSummary: [{ crop: 'Paddy Common', rate: 2320, unit: 'qtl' }],
  },
  {
    id: 'mkt-3',
    name: 'Guntur Asia Mirchi & Cotton Yard',
    distanceKm: 185.0,
    location: 'Guntur City',
    tradedCrops: ['Chillies (Teja, 334, Deluxe)', 'Cotton (Bt)', 'Turmeric'],
    currentRatesSummary: [
      { crop: 'Chilli Teja Dry', rate: 18500, unit: 'qtl' },
      { crop: 'Cotton Bt', rate: 7120, unit: 'qtl' },
    ],
  },
];

export function getMarketRates(): MarketRate[] {
  return EXPANDED_MARKET_RATES;
}

export function getNearbySellingMarkets(): NearbyMarket[] {
  return NEARBY_SELLING_MARKETS;
}
