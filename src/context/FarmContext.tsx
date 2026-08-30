import React, { createContext, useContext, useState, useEffect } from 'react';
import { Farmer, FieldBoundary, LiveSensors, CropHistoryRecord, ChatMessage, Point, AppNotification, RegisteredDisease } from '../types/farm';
import { LanguageCode, t } from '../services/i18n';
import { INITIAL_FARMER, INITIAL_FIELD_BOUNDARY, INITIAL_CROP_HISTORY } from '../services/mockData';
import { sensorService } from '../services/sensorService';
import { voiceAssistantService } from '../services/voiceAssistantService';
import { DiseaseAnalysisResult } from '../services/imageAnalysisService';

export type ScreenType = 'login' | 'field-setup' | 'dashboard' | 'disease-weed' | 'assistant' | 'analytics';

interface FarmContextType {
  isLoggedIn: boolean;
  currentScreen: ScreenType;
  setCurrentScreen: (screen: ScreenType) => void;
  selectedLanguage: LanguageCode;
  setSelectedLanguage: (lang: LanguageCode) => void;
  isLanguageModalOpen: boolean;
  setIsLanguageModalOpen: (open: boolean) => void;
  farmer: Farmer;
  setFarmer: React.Dispatch<React.SetStateAction<Farmer>>;
  fieldBoundary: FieldBoundary;
  setFieldBoundary: React.Dispatch<React.SetStateAction<FieldBoundary>>;
  sensors: LiveSensors;
  cropHistory: CropHistoryRecord[];
  chatMessages: ChatMessage[];
  notifications: AppNotification[];
  registeredDiseases: RegisteredDisease[];
  isNotificationDrawerOpen: boolean;
  setIsNotificationDrawerOpen: (open: boolean) => void;
  login: (mobileNumber: string) => void;
  saveFieldBoundary: (points: Point[], acres: number) => void;
  triggerIrrigation: () => void;
  sendAssistantQuery: (queryText: string) => void;
  addCropHistoryRecord: (record: CropHistoryRecord) => void;
  registerDisease: (analysis: DiseaseAnalysisResult, imageUri?: string) => void;
  markAllNotificationsRead: () => void;
  dismissNotification: (id: string) => void;
}

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const FarmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('dashboard');
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>('en');
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState<boolean>(false);
  const [farmer, setFarmer] = useState<Farmer>(INITIAL_FARMER);
  const [fieldBoundary, setFieldBoundary] = useState<FieldBoundary>(INITIAL_FIELD_BOUNDARY);
  const [sensors, setSensors] = useState<LiveSensors>(sensorService.getSensors());
  const [cropHistory, setCropHistory] = useState<CropHistoryRecord[]>(INITIAL_CROP_HISTORY);
  const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState<boolean>(false);
  const [registeredDiseases, setRegisteredDiseases] = useState<RegisteredDisease[]>([]);

  // Initial Notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'notif-1',
      category: 'irrigation',
      title: 'Irrigation Required',
      message: 'Your soil is dry in Sector 03 (21% moisture). Start watering to maintain root health.',
      timestamp: 'Just Now',
      isRead: false,
      actionLabel: 'Start Water',
      actionType: 'irrigation',
    },
    {
      id: 'notif-2',
      category: 'weed',
      title: 'Active Weed Alert',
      message: `Paddy is currently Day ${INITIAL_FARMER.cropDay}. Common weed expected: Echinochloa. Action: Inspect field and pluck out before seed formation.`,
      timestamp: 'Today, 08:00 AM',
      isRead: false,
      actionLabel: 'Inspect Weeds',
      actionType: 'view_weed',
    },
    {
      id: 'notif-3',
      category: 'disease',
      title: 'Disease Risk Warning',
      message: 'Paddy Brown Spot risk is moderate due to 61% relative humidity. Spray Mancozeb if spots appear.',
      timestamp: 'Today, 06:30 AM',
      isRead: false,
      actionLabel: 'View Guidance',
      actionType: 'view_disease',
    },
    {
      id: 'notif-4',
      category: 'drone',
      title: 'Drone Scan Completed',
      message: 'Morning drone run detected 12 weed locations in Zone B. Targeted spray is recommended.',
      timestamp: 'Today, 06:30 AM',
      isRead: true,
      actionLabel: 'Deploy Spray',
      actionType: 'spray',
    },
  ]);

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'user',
      text: 'What is the soil moisture in Sector 3?',
      timestamp: '08:32 AM',
    },
    {
      id: 'msg-2',
      sender: 'assistant',
      text: 'Soil moisture in Sector 03 is 21%. It is dry and requires irrigation immediately.',
      timestamp: '08:32 AM',
      hasAudio: true,
    },
  ]);

  // Sync live sensors
  useEffect(() => {
    const unsubscribe = sensorService.subscribe((updatedSensors) => {
      setSensors(updatedSensors);
    });
    return () => unsubscribe();
  }, []);

  const login = (mobileNumber: string) => {
    setIsLoggedIn(true);
    setFarmer((prev) => ({ ...prev, phone: mobileNumber }));
    setCurrentScreen('field-setup');
  };

  const saveFieldBoundary = (points: Point[], acres: number) => {
    setFieldBoundary({
      id: 'field-01',
      name: 'Paddy Main Plot - Recorded Boundary',
      acres: acres,
      points: points,
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRecorded: true,
    });
    setCurrentScreen('dashboard');
  };

  const triggerIrrigation = () => {
    sensorService.triggerIrrigation();
    setNotifications((prev) =>
      prev.map((n) => (n.category === 'irrigation' ? { ...n, isRead: true, message: 'Sector 03 irrigated successfully. Moisture level optimal.' } : n))
    );
  };

  const sendAssistantQuery = (queryText: string) => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: queryText,
      timestamp: time,
    };

    const answer = voiceAssistantService.answerQuestion(queryText, registeredDiseases, selectedLanguage);
    const assistantMsg: ChatMessage = {
      id: `ast-${Date.now()}`,
      sender: 'assistant',
      text: answer,
      timestamp: time,
      hasAudio: true,
    };

    setChatMessages((prev) => [...prev, userMsg, assistantMsg]);
    voiceAssistantService.speak(answer, selectedLanguage);

    const qLower = queryText.toLowerCase();
    const isIrrigationAction =
      qLower.includes('start water') ||
      qLower.includes('start irrigation') ||
      qLower.includes('water field') ||
      qLower.includes('turn on motor') ||
      qLower.includes('water now') ||
      qLower.includes('నీరు పెట్టు') ||
      qLower.includes('నీళ్లు పెట్టు') ||
      qLower.includes('మోటార్ ఆన్') ||
      qLower.includes('నీరు ఆన్') ||
      qLower.includes('మోటార్ స్టార్ట్') ||
      qLower.includes('నీటిపారుదల ప్రారంభించు') ||
      qLower.includes('తడి పెట్టు') ||
      qLower.includes('నీరు పారించు') ||
      qLower.includes('पानी चालू') ||
      qLower.includes('सिंचाई शुरू') ||
      qLower.includes('मोटर चलाओ') ||
      qLower.includes('पानी दो') ||
      qLower.includes('मोटर चालू') ||
      qLower.includes('सिंचाई करो') ||
      qLower.includes('தண்ணீர் பாய்ச்சு') ||
      qLower.includes('மோட்டார் போடு') ||
      qLower.includes('பாசனம் தொடங்கு') ||
      qLower.includes('தண்ணி விடு') ||
      qLower.includes('நீர்ப்பாசனம் செய்') ||
      qLower.includes('ನೀರು ಹಾಯಿಸಿ') ||
      qLower.includes('ಮೋಟಾರ್ ಆನ್ ಮಾಡಿ') ||
      qLower.includes('ನೀರಾವರಿ ಪ್ರಾರಂಭಿಸಿ') ||
      qLower.includes('ನೀರು ಹಾಕಿ');

    if (isIrrigationAction) {
      triggerIrrigation();
    }
  };

  const addCropHistoryRecord = (record: CropHistoryRecord) => {
    setCropHistory((prev) => [record, ...prev]);
  };

  const registerDisease = (analysis: DiseaseAnalysisResult, imageUri?: string) => {
    const newReg: RegisteredDisease = {
      id: `reg-${Date.now()}`,
      diseaseName: analysis.diseaseName,
      crop: analysis.crop,
      confidencePercent: analysis.confidencePercent,
      detectedAt: new Date().toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' }),
      imageUri: imageUri,
      symptoms: analysis.symptoms,
      cause: analysis.cause,
      precaution: analysis.precaution,
      cure: analysis.cure,
      status: 'Active Monitoring',
    };
    setRegisteredDiseases((prev) => [newReg, ...prev]);

    const notif: AppNotification = {
      id: `notif-reg-${Date.now()}`,
      category: 'disease',
      title: `Registered: ${analysis.diseaseName}`,
      message: `Follow cure instructions: ${analysis.cure}`,
      timestamp: 'Just Now',
      isRead: false,
      actionLabel: 'View Guidance',
      actionType: 'view_disease',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const dismissNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
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
        fieldBoundary,
        setFieldBoundary,
        sensors,
        cropHistory,
        chatMessages,
        notifications,
        registeredDiseases,
        isNotificationDrawerOpen,
        setIsNotificationDrawerOpen,
        login,
        saveFieldBoundary,
        triggerIrrigation,
        sendAssistantQuery,
        addCropHistoryRecord,
        registerDisease,
        markAllNotificationsRead,
        dismissNotification,
      }}
    >
      {children}
    </FarmContext.Provider>
  );
};

export const useFarm = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within a FarmProvider');
  }
  return context;
};
