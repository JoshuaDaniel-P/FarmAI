import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  Farmer,
  Field,
  FieldBoundary,
  LiveSensors,
  CropHistoryRecord,
  ChatMessage,
  Point,
  AppNotification,
  RegisteredDisease,
  SoilTestProfile,
  PreviousCropRecord,
  MotorStatus,
  WeatherData,
  WeatherRecommendation,
  CropGrowthStage,
} from '../types/farm';
import { LanguageCode, t } from '../services/i18n';
import { INITIAL_FARMER, INITIAL_CROP_HISTORY } from '../services/mockData';
import { sensorService } from '../services/sensorService';
import { voiceAssistantService } from '../services/voiceAssistantService';
import { DiseaseAnalysisResult } from '../services/imageAnalysisService';
import { weatherService, weatherRecommendationService } from '../services/weatherService';
import { irrigationService } from '../services/irrigationService';
import { calculateCropAgeDays, getGrowthStageForCrop } from '../services/cropStageService';

export type ScreenType = 'login' | 'field-setup' | 'dashboard' | 'disease-weed' | 'assistant' | 'analytics';

interface FarmContextType {
  isLoggedIn: boolean;
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  selectedLanguage: LanguageCode;
  setSelectedLanguage: (lang: LanguageCode) => void;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;

  // Farmer & Multi-Field Management
  farmer: Farmer;
  setFarmer: React.Dispatch<React.SetStateAction<Farmer>>;
  activeField: Field;
  activeFieldId: string;
  setActiveFieldId: (id: string) => void;
  addField: (newField: Omit<Field, 'id'>) => string;
  updateActiveField: (updates: Partial<Field>) => void;
  saveFieldBoundary: (points: Point[], acres: number) => void;
  selectCropForActiveField: (cropName: string, sowingDate: string) => void;

  // Field Specific Data Accessors
  fieldBoundary: FieldBoundary;
  sensors: LiveSensors;
  soilProfile: SoilTestProfile;
  previousCropHistory: PreviousCropRecord[];
  cropHistory: CropHistoryRecord[];
  registeredDiseases: RegisteredDisease[];
  motorStatus: MotorStatus;

  // Weather & Intelligence
  weatherData: WeatherData;
  weatherRecommendations: WeatherRecommendation[];

  // Motor / Irrigation Control Abstraction
  startMotor: (sectorId?: string) => void;
  stopMotor: () => void;
  triggerIrrigation: () => void;

  // Notification System
  notifications: AppNotification[];
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  markAllNotificationsRead: () => void;
  dismissNotification: (id: string) => void;

  // Assistant & Operations
  chatMessages: ChatMessage[];
  sendAssistantQuery: (queryText: string) => void;
  addCropHistoryRecord: (record: CropHistoryRecord) => void;
  registerDisease: (analysis: DiseaseAnalysisResult, imageUri?: string) => void;
  login: (mobileNumber: string) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);

  // Core Farmer & Multi-Field State
  const [farmer, setFarmer] = useState<Farmer>(INITIAL_FARMER);
  const [activeFieldId, setActiveFieldIdState] = useState<string>(INITIAL_FARMER.activeFieldId || 'field-01');

  // Active Field Resolver
  const activeField: Field = useMemo(() => {
    const found = farmer.fields.find((f) => f.id === activeFieldId);
    return found || farmer.fields[0];
  }, [farmer.fields, activeFieldId]);

  // Derived / Real-Time Telemetry & Weather
  const [sensors, setSensors] = useState<LiveSensors>(sensorService.getSensors(activeFieldId));
  const [motorStatus, setMotorStatus] = useState<MotorStatus>(irrigationService.getMotorStatus());
  const [weatherData] = useState<WeatherData>(weatherService.getWeatherData());
  const [cropHistory, setCropHistory] = useState<CropHistoryRecord[]>(INITIAL_CROP_HISTORY);

  // Weather Recommendations
  const weatherRecommendations = useMemo(() => {
    return weatherRecommendationService.generateRecommendations(
      activeField.activeCrop,
      activeField.growthStage,
      sensors,
      weatherData
    );
  }, [activeField.activeCrop, activeField.growthStage, sensors, weatherData]);

  // Notifications State
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      category: 'irrigation',
      title: 'Irrigation Required',
      message: 'Soil is dry in Sector 03 (21% moisture). Start watering to maintain root health.',
      timestamp: 'Just Now',
      isRead: false,
      severity: 'critical',
      fieldId: 'field-01',
      fieldName: 'Field 01 - Paddy Main Plot',
      sectorId: 'Sector 03',
      actionLabel: 'Start Water',
      actionType: 'irrigation',
    },
    {
      id: 'notif-2',
      category: 'weather',
      title: 'Rainfall Expected Soon',
      message: 'Rain expected tomorrow (45% probability). Hold major irrigation today.',
      timestamp: 'Today, 09:00 AM',
      isRead: false,
      severity: 'info',
      fieldId: 'field-01',
      fieldName: 'Field 01',
      actionLabel: 'View Weather',
      actionType: 'view_weather',
    },
    {
      id: 'notif-3',
      category: 'weed',
      title: 'Active Weed Alert',
      message: 'Paddy is currently Day 47. Common weed expected: Echinochloa. Action: Inspect and pluck out.',
      timestamp: 'Today, 08:00 AM',
      isRead: false,
      severity: 'warning',
      fieldId: 'field-01',
      actionLabel: 'Inspect Weeds',
      actionType: 'view_weed',
    },
    {
      id: 'notif-4',
      category: 'disease',
      title: 'Disease Risk Warning',
      message: 'Paddy Brown Spot risk is moderate due to 61% relative humidity. Spray Mancozeb if spots appear.',
      timestamp: 'Today, 06:30 AM',
      isRead: false,
      severity: 'warning',
      fieldId: 'field-01',
      actionLabel: 'View Guidance',
      actionType: 'view_disease',
    },
  ]);

  // Chat messages for assistant
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Namaskaram Raju Garu! I am monitoring ${activeField.name} (${activeField.activeCrop} at Day ${activeField.cropAgeDays}). Soil moisture in Sector 03 is low at 21%. How can I help you today?`,
      timestamp: 'Just Now',
      hasAudio: true,
    },
  ]);

  // Sync active field with sensor service
  const setActiveFieldId = (id: string) => {
    setActiveFieldIdState(id);
    setFarmer((prev) => ({
      ...prev,
      activeFieldId: id,
      fieldName: prev.fields.find((f) => f.id === id)?.name || prev.fieldName,
      activeCrop: prev.fields.find((f) => f.id === id)?.activeCrop || prev.activeCrop,
    }));
    sensorService.setActiveFieldId(id);
    setSensors(sensorService.getSensors(id));
  };

  // Subscribe to live sensor streams
  useEffect(() => {
    const unsubSensors = sensorService.subscribe((updatedSensors) => {
      if (updatedSensors.fieldId === activeFieldId) {
        setSensors(updatedSensors);
      }
    });

    const unsubMotor = irrigationService.subscribe((updatedMotor) => {
      setMotorStatus(updatedMotor);
    });

    return () => {
      unsubSensors();
      unsubMotor();
    };
  }, [activeFieldId]);

  // Add a new field to farmer's profile
  const addField = (newFieldData: Omit<Field, 'id'>): string => {
    const newId = `field-${Date.now()}`;
    const newField: Field = {
      ...newFieldData,
      id: newId,
    };
    setFarmer((prev) => ({
      ...prev,
      fields: [...prev.fields, newField],
      activeFieldId: newId,
    }));
    setActiveFieldId(newId);
    return newId;
  };

  // Update active field properties
  const updateActiveField = (updates: Partial<Field>) => {
    setFarmer((prev) => ({
      ...prev,
      fields: prev.fields.map((f) => (f.id === activeFieldId ? { ...f, ...updates } : f)),
    }));
  };

  // Save boundary for active field
  const saveFieldBoundary = (points: Point[], acres: number) => {
    const updatedBoundary: FieldBoundary = {
      id: activeFieldId,
      name: activeField.name,
      acres: acres,
      points: points,
      isRecorded: true,
      savedAt: new Date().toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }),
    };

    updateActiveField({
      acres,
      boundary: updatedBoundary,
    });

    // Also update notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        category: 'irrigation',
        title: 'Field Boundary Updated',
        message: `${activeField.name} GPS boundary recorded (${acres} acres).`,
        timestamp: 'Just Now',
        isRead: false,
        severity: 'info',
        fieldId: activeFieldId,
      },
      ...prev,
    ]);

    setCurrentScreen('dashboard');
  };

  // Select crop for active field
  const selectCropForActiveField = (cropName: string, sowingDate: string) => {
    const ageDays = calculateCropAgeDays(sowingDate);
    const growthStage = getGrowthStageForCrop(cropName, ageDays);

    updateActiveField({
      activeCrop: cropName,
      sowingDate,
      cropAgeDays: ageDays,
      growthStage,
    });

    setFarmer((prev) => ({
      ...prev,
      activeCrop: cropName,
      sowingDate,
      cropDay: ageDays,
      cropStage: growthStage.stageName,
    }));
  };

  // Irrigation & Motor controls
  const startMotor = (sectorId: string = 'Sector 03') => {
    irrigationService.startMotor(sectorId);
    sensorService.triggerIrrigation(activeFieldId);
    setSensors(sensorService.getSensors(activeFieldId));
  };

  const stopMotor = () => {
    irrigationService.stopMotor();
  };

  const triggerIrrigation = () => {
    startMotor('Sector 03');
  };

  // Register disease
  const registerDisease = (analysis: DiseaseAnalysisResult, imageUri?: string) => {
    const newReg: RegisteredDisease = {
      id: `reg-${Date.now()}`,
      fieldId: activeFieldId,
      diseaseName: analysis.diseaseName,
      crop: analysis.crop,
      growthStage: activeField.growthStage.stageName,
      confidencePercent: analysis.confidencePercent,
      detectedAt: new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
      imageUri: imageUri || '/images/diseases/paddy_blast.jpg',
      symptoms: analysis.symptoms,
      cause: analysis.cause,
      precaution: analysis.precaution,
      cure: analysis.cure,
      status: 'Active Monitoring',
    };

    updateActiveField({
      registeredDiseases: [newReg, ...(activeField.registeredDiseases || [])],
    });

    // Add alert notification
    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        category: 'disease',
        title: `Disease Registered: ${analysis.diseaseName}`,
        message: `Registered on ${activeField.name}. Treatment: ${analysis.cure}`,
        timestamp: 'Just Now',
        isRead: false,
        severity: 'warning',
        fieldId: activeFieldId,
        actionLabel: 'View Treatment',
        actionType: 'view_disease',
      },
      ...prev,
    ]);
  };

  // Add crop history record
  const addCropHistoryRecord = (record: CropHistoryRecord) => {
    setCropHistory((prev) => [record, ...prev]);
  };

  // Notification Handlers
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Assistant Query Processing
  const sendAssistantQuery = (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: 'Just Now',
    };

    setChatMessages((prev) => [...prev, userMsg]);

    setTimeout(() => {
      const response = voiceAssistantService.answerQuestion(
        queryText,
        activeField.registeredDiseases || [],
        selectedLanguage
      );

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: response,
        timestamp: 'Just Now',
        hasAudio: true,
      };

      setChatMessages((prev) => [...prev, assistantMsg]);
      voiceAssistantService.speak(response, selectedLanguage);
    }, 400);
  };

  const login = (mobileNumber: string) => {
    setIsLoggedIn(true);
    setCurrentScreen('dashboard');
  };

  return (
    <FarmContext.Provider
      value={{
        isLoggedIn,
        currentScreen,
        setCurrentScreen,
        selectedLanguage,
        setSelectedLanguage,
        isLanguageModalOpen,
        setIsLanguageModalOpen,

        farmer,
        setFarmer,
        activeField,
        activeFieldId,
        setActiveFieldId,
        addField,
        updateActiveField,
        saveFieldBoundary,
        selectCropForActiveField,

        fieldBoundary: activeField.boundary,
        sensors,
        soilProfile: activeField.soilProfile,
        previousCropHistory: activeField.previousCropHistory,
        cropHistory,
        registeredDiseases: activeField.registeredDiseases,
        motorStatus,

        weatherData,
        weatherRecommendations,

        startMotor,
        stopMotor,
        triggerIrrigation,

        notifications,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        markAllNotificationsRead,
        dismissNotification,

        chatMessages,
        sendAssistantQuery,
        addCropHistoryRecord,
        registerDisease,
        login,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = (): FarmContextType => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
