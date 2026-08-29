import { Farmer, FieldBoundary, CropHistoryRecord, MarketRate, CropSuggestion } from '../types/farm';

export const INITIAL_FARMER: Farmer = {
  name: 'Raju Garu',
  phone: '+91 98765 43210',
  district: 'Nellore',
  village: 'Kovur',
  fieldName: 'Field 01',
  activeCrop: 'Paddy',
  sowingDate: '2026-07-14',
  cropStage: 'Vegetative Stage',
  cropDay: 47,
};

export const INITIAL_FIELD_BOUNDARY: FieldBoundary = {
  id: 'field-01',
  name: 'Paddy Main Plot - Sector East',
  acres: 2.4,
  isRecorded: true,
  savedAt: '2026-07-15 10:30 AM',
  points: [
    { x: 20, y: 80, lat: 14.5012, lng: 79.9812 },
    { x: 30, y: 30, lat: 14.5045, lng: 79.9825 },
    { x: 70, y: 20, lat: 14.5050, lng: 79.9870 },
    { x: 85, y: 60, lat: 14.5020, lng: 79.9885 },
    { x: 60, y: 90, lat: 14.4995, lng: 79.9850 },
  ],
};

export const INITIAL_CROP_HISTORY: CropHistoryRecord[] = [
  {
    id: 'ch-2025',
    yearLabel: 'Paddy 2025',
    cropName: 'Paddy (BPT 5204)',
    expectedYieldTons: 4.8,
    actualYieldTons: 4.1,
    efficiencyPercent: 85,
    yieldLossFactors: [
      { factorName: 'Pest Infestation (Stem Borer)', icon: 'bug_report', lossTons: 0.3, color: 'bg-error' },
      { factorName: 'Irrigation Deficit (Mid-season)', icon: 'water_drop', lossTons: 0.2, color: 'bg-tertiary' },
      { factorName: 'Fungal Infection (Brown Spot)', icon: 'coronavirus', lossTons: 0.2, color: 'bg-outline' },
    ],
  },
  {
    id: 'ch-2024',
    yearLabel: 'Cotton 2024',
    cropName: 'Bt Cotton',
    expectedYieldTons: 3.2,
    actualYieldTons: 2.9,
    efficiencyPercent: 90,
    yieldLossFactors: [
      { factorName: 'Bollworm Attack', icon: 'bug_report', lossTons: 0.2, color: 'bg-error' },
      { factorName: 'Unseasonal Rainfall', icon: 'rainy', lossTons: 0.1, color: 'bg-tertiary' },
    ],
  },
];

export const INITIAL_MARKET_RATES: MarketRate[] = [
  {
    cropName: 'Paddy (Grade A)',
    currentRate: 2450,
    unit: 'qtl',
    changePercent: 3.2,
    historicalData: [
      { label: 'Jun', rate: 2280 },
      { label: 'Jul', rate: 2320 },
      { label: 'Aug', rate: 2370 },
      { label: 'Sep', rate: 2450 },
    ],
  },
  {
    cropName: 'Cotton',
    currentRate: 7120,
    unit: 'qtl',
    changePercent: 1.8,
    historicalData: [
      { label: 'Jun', rate: 6800 },
      { label: 'Jul', rate: 6950 },
      { label: 'Aug', rate: 7050 },
      { label: 'Sep', rate: 7120 },
    ],
  },
  {
    cropName: 'Chillies (Teja Variant)',
    currentRate: 18500,
    unit: 'qtl',
    changePercent: -0.5,
    historicalData: [
      { label: 'Jun', rate: 19000 },
      { label: 'Jul', rate: 18800 },
      { label: 'Aug', rate: 18600 },
      { label: 'Sep', rate: 18500 },
    ],
  },
  {
    cropName: 'Maize',
    currentRate: 2150,
    unit: 'qtl',
    changePercent: 4.1,
    historicalData: [
      { label: 'Jun', rate: 1980 },
      { label: 'Jul', rate: 2020 },
      { label: 'Aug', rate: 2080 },
      { label: 'Sep', rate: 2150 },
    ],
  },
];

export const SUITABLE_CROP_SUGGESTIONS: CropSuggestion[] = [
  {
    cropName: 'Groundnut',
    suitability: 'High',
    reason: 'Low water requirement & high nitrogen fixation potential for post-paddy soil profile',
    waterRequirement: 'Low to Moderate',
    icon: 'eco',
  },
  {
    cropName: 'Maize',
    suitability: 'High',
    reason: 'Current soil moisture and nitrogen levels match winter maize cultivation window',
    waterRequirement: 'Moderate',
    icon: 'nutrition',
  },
  {
    cropName: 'Cotton',
    suitability: 'Moderate',
    reason: 'Market demand rising in Guntur mandal; suitable for well-drained sandy loam',
    waterRequirement: 'Moderate to High',
    icon: 'filter_vintage',
  },
  {
    cropName: 'Red Gram (Kandulu)',
    suitability: 'High',
    reason: 'Intercropping option; drought tolerant and restores soil fertility',
    waterRequirement: 'Low',
    icon: 'grass',
  },
];

// AP Major Crops Database list for reference
export const ANDHRA_PRADESH_MAJOR_CROPS = [
  'Paddy',
  'Maize',
  'Cotton',
  'Groundnut',
  'Chillies',
  'Tobacco',
  'Sugarcane',
  'Red Gram',
  'Bengal Gram',
  'Black Gram',
  'Green Gram',
  'Jowar',
  'Bajra',
  'Ragi',
  'Korra',
  'Oil Palm',
  'Sunflower',
  'Turmeric',
  'Mango',
];
