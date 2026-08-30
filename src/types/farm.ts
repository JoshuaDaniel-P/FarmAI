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
  status: 'normal' | 'warning' | 'critical';
  moisture: number;
  temp: number;
  humidity: number;
  recommendation?: string;
  x: number; // percentage relative coordinate 0-100
  y: number;
}

export interface LiveSensors {
  overallMoisture: number;
  airTemp: number;
  humidity: number;
  airQuality: 'Good' | 'Fair' | 'Poor';
  cropHealthPercent: number;
  cropHealthStatus: 'GOOD' | 'ATTENTION' | 'CRITICAL';
  actionRequired: string | null;
  nodes: SensorNode[];
}

export interface DiseaseInfo {
  id: string;
  crop: 'Paddy' | 'Cotton' | 'Chilli' | 'Maize' | 'Groundnut';
  diseaseName: string;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  riskBadgeColor: string;
  symptoms: string[];
  primaryCause: string;
  favorableConditions: string;
  precautions: string[];
  treatment: string;
  currentRiskPrediction: string;
  icon: string;
  imageUrl?: string;
  // Concise farmer-friendly fields
  comesWhen: string;
  shortPrecaution: string;
  shortCure: string;
}

export interface RegisteredDisease {
  id: string;
  diseaseName: string;
  crop: string;
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
  identification: string;
  action: string;
  icon: string;
  imageUrl?: string;
  learnMoreText?: string;
}

export interface AppNotification {
  id: string;
  category: 'irrigation' | 'pest' | 'disease' | 'weed' | 'drone' | 'weather';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  actionLabel?: string;
  actionType?: 'irrigation' | 'spray' | 'view_disease' | 'view_weed';
}

export interface DroneScanLog {
  id: string;
  timestamp: string;
  status: 'Completed' | 'In Progress' | 'Scheduled';
  detectedWeedLocations: number;
  highRiskZone: string;
  summary: string;
}

export interface CropHistoryRecord {
  id: string;
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
  historicalData: { label: string; rate: number }[];
}

export interface CropSuggestion {
  cropName: string;
  suitability: 'High' | 'Moderate' | 'Low';
  reason: string;
  waterRequirement: string;
  icon: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  hasAudio?: boolean;
}
