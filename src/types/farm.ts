
export interface Farmer {
  name: string;
  phone: string;
  district: string;
  village: string;
  fieldName: string;
  activeCrop: string;
  sowingDate: string;
  cropStage: string;
  cropDay: number;
  totalCropDays?: number;
}

export interface DayCropUpdate {
  day: number;
  date: string;
  stage: string;
  title: string;
  summary: string;
  tasks: string[];
  inputsApplied?: string;
  category?: 'irrigation' | 'fertilizer' | 'pest_control' | 'weeding' | 'soil_check' | 'inspection' | 'transplantation' | 'sowing';
  status: 'optimal' | 'attention' | 'action_taken';
  icon: string;
  healthPercent: number;
}


export interface Point {
  x: number;
  y: number;
  lat?: number;
  lng?: number;
}

export interface FieldBoundary {
  id: string;
  name: string;
  acres: number;
  points: Point[];
  savedAt?: string;
  isRecorded: boolean;
}

export interface SensorNode {
  id: string;
  name: string;
  sector: string;
  status: 'normal' | 'warning' | 'critical' | 'offline';
  moisture: number;
  temp: number;
  humidity: number;
  airQuality?: 'Good' | 'Fair' | 'Poor';
  recommendation?: string;
  x: number; // percentage coordinate 0-100
  y: number;
  lastUpdated?: string;
}

export interface LiveSensors {
  fieldId: string;
  overallMoisture: number;
  airTemp: number;
  humidity: number;
  airQuality: 'Good' | 'Fair' | 'Poor';
  cropHealthPercent: number;
  cropHealthStatus: 'GOOD' | 'ATTENTION' | 'CRITICAL';
  actionRequired: string | null;
  nodes: SensorNode[];
}

export type GrowthStageName =
  | 'Germination / Seedling'
  | 'Vegetative Stage'
  | 'Flowering'
  | 'Reproductive / Grain Development'
  | 'Maturity / Harvest Ready';

export interface CropGrowthStage {
  stageName: GrowthStageName;
  startDay: number;
  endDay: number;
  description: string;
  keyCareTips: string[];
}

export interface SoilTestProfile {
  soilType: string;
  testedAt: string;
  labName?: string;
  ph: number;
  phInterpretation: 'Acidic' | 'Suitable (Optimal)' | 'Alkaline';
  nitrogenKgHa: number;
  nitrogenInterpretation: 'Low' | 'Medium (Adequate)' | 'High';
  phosphorusKgHa: number;
  phosphorusInterpretation: 'Low' | 'Medium' | 'High (Optimal)';
  potassiumKgHa: number;
  potassiumInterpretation: 'Low' | 'Medium (Adequate)' | 'High';
  organicCarbonPercent: number;
  organicCarbonInterpretation: 'Low' | 'Medium' | 'High';
  electricalConductivityDsM: number;
  ecInterpretation: 'Normal / Safe' | 'Slightly Saline' | 'High Salinity';
  soilMoisturePercent?: number;
}

export interface PreviousCropProblem {
  category: 'disease' | 'pest' | 'weed' | 'irrigation' | 'weather';
  description: string;
  impactTons?: number;
}

export interface PreviousCropRecord {
  id: string;
  cropName: string;
  cropVariety?: string;
  sowingDate: string;
  harvestDate: string;
  expectedYieldTons: number;
  actualYieldTons: number;
  efficiencyPercent: number;
  mainLossFactor?: string;
  problemsEncountered: PreviousCropProblem[];
}

export interface MotorStatus {
  isOnline: boolean;
  isRunning: boolean;
  activeSectorId: string | null;
  startedAt?: string;
  isSimulated: boolean;
  history: {
    id: string;
    timestamp: string;
    action: 'start' | 'stop';
    sector: string;
    durationMinutes?: number;
  }[];
}

export interface Field {
  id: string;
  name: string;
  acres: number;
  location: {
    district: string;
    village: string;
    mandal?: string;
  };
  boundary: FieldBoundary;
  activeCrop: string;
  cropVariety?: string;
  sowingDate: string;
  cropAgeDays: number;
  growthStage: CropGrowthStage;
  soilProfile: SoilTestProfile;
  previousCropHistory: PreviousCropRecord[];
  sensors: LiveSensors;
  registeredDiseases: RegisteredDisease[];
  motorStatus: MotorStatus;
}

export interface Farmer {
  id?: string;
  name: string;
  phone: string;
  district: string;
  village: string;
  activeFieldId: string;
  fields: Field[];
  // Legacy accessors for convenience
  fieldName: string;
  activeCrop: string;
  sowingDate: string;
  cropStage: string;
  cropDay: number;
}

export interface DiseaseInfo {
  id: string;
  crop: string;
  diseaseName: string;
  relevantStages: GrowthStageName[];
  typicalRiskPeriod: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  riskBadgeColor: string;
  imageUrl?: string;
  icon: string;
  
  // Farmer-friendly structured sections
  whatYouMaySee: string[];
  riskPeriod: string;
  whyItHappens: string;
  precautions: string[];
  cureAndManagement: string[];
  whenToSeekHelp: string;

  // Legacy compatibility helpers
  symptoms: string[];
  primaryCause: string;
  favorableConditions: string;
  treatment: string;
  currentRiskPrediction: string;
  comesWhen: string;
  shortPrecaution: string;
  shortCure: string;
}

export interface RegisteredDisease {
  id: string;
  fieldId?: string;
  diseaseName: string;
  crop: string;
  growthStage?: string;
  confidencePercent: number;
  detectedAt: string;
  imageUri?: string;
  symptoms: string;
  cause: string;
  precaution: string;
  cure: string;
  status: 'Active Monitoring' | 'Treated';
}

export interface WeedInfo {
  id: string;
  weedName: string;
  crop: string;
  startDay: number;
  endDay: number;
  growthStage?: GrowthStageName;
  appearancePeriod: string;
  identification: string;
  removalMethod: string;
  managementMethod: string;
  icon: string;
  imageUrl?: string;
  // Legacy fields
  action: string;
  learnMoreText?: string;
}

export interface AppNotification {
  id: string;
  category: 'irrigation' | 'pest' | 'disease' | 'weed' | 'drone' | 'weather' | 'market';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  severity?: 'info' | 'warning' | 'critical';
  fieldId?: string;
  fieldName?: string;
  sectorId?: string;
  actionLabel?: string;
  actionType?: 'irrigation' | 'spray' | 'view_disease' | 'view_weed' | 'view_weather' | 'view_market';
}

export interface DroneScanLog {
  id: string;
  fieldId?: string;
  timestamp: string;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  detectedWeedLocations: number;
  highRiskZone: string;
  summary: string;
}

export interface CropHistoryRecord {
  id: string;
  fieldId?: string;
  yearLabel: string;
  cropName: string;
  expectedYieldTons: number;
  actualYieldTons: number;
  efficiencyPercent: number;
  yieldLossFactors: {
    factorName: string;
    icon: string;
    lossTons: number;
    color: string;
  }[];
}

export interface MarketRate {
  cropName: string;
  currentRate: number;
  unit: string;
  changePercent: number;
  mandiLocation: string;
  lastUpdated: string;
  historicalData: { label: string; rate: number }[];
}

export interface CropSuggestion {
  cropName: string;
  cropDurationDays: number;
  waterRequirement: 'Low' | 'Medium' | 'High';
  soilSuitability: string;
  climateSuitability: string;
  expectedExpenditurePerAcre: number;
  expectedYieldPerAcre: string;
  expectedRevenuePerAcre: number;
  expectedProfitPerAcre: number;
  majorDiseaseRisks: string[];
  majorWeedRisks: string[];
  suitabilityScore: 'High' | 'Moderate' | 'Low';
  suitabilityReason: string;
  icon: string;
  // Compatibility
  suitability?: 'High' | 'Moderate' | 'Low';
  reason?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  hasAudio?: boolean;
}

export interface WeatherDayForecast {
  dayLabel: string;
  date: string;
  tempMax: number;
  tempMin: number;
  humidity: number;
  rainProbabilityPercent: number;
  rainfallMm: number;
  windKmph: number;
  condition: string;
  icon: string;
}

export interface WeatherData {
  currentTemp: number;
  currentHumidity: number;
  currentRainfallMm: number;
  currentWindKmph: number;
  condition: string;
  icon: string;
  dailyForecast: WeatherDayForecast[];
}

export interface WeatherRecommendation {
  id: string;
  title: string;
  message: string;
  type: 'irrigation' | 'disease_risk' | 'heat_stress' | 'drainage' | 'fertilizer';
  severity: 'info' | 'warning' | 'critical';
  actionableTip?: string;
}

export interface FertilizerShop {
  id: string;
  name: string;
  distanceKm: number;
  address: string;
  phone: string;
  openingHours: string;
  categories: string[];
  rating: number;
}

export interface NearbyMarket {
  id: string;
  name: string;
  distanceKm: number;
  location: string;
  tradedCrops: string[];
  currentRatesSummary: { crop: string; rate: number; unit: string }[];
}
