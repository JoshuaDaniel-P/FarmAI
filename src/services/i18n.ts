export type LanguageCode = 'en' | 'te' | 'hi' | 'ta' | 'kn';

export interface LanguageOption {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

export const TRANSLATIONS: Record<LanguageCode, Record<string, string>> = {
  en: {
    // Header & Greeting
    appName: 'Smart Agriculture',
    goodMorning: 'Good Morning',
    farmerSubtitle: 'Data-driven farming, from soil to silo.',
    selectLanguage: 'Select Language',
    changeLanguage: 'Change Language',
    
    // Navigation
    navHome: 'Home',
    navField: 'Field',
    navCrop: 'Crop',
    navMarkets: 'Markets',
    navAssistant: 'Assistant',
    navFieldSetup: 'Field Boundary Setup',
    navDiseaseWeed: 'Disease & Weed Monitoring',
    navCropHistory: 'Crop History & Markets',
    navAIAssistant: 'AI Voice Assistant',
    
    // Dashboard
    cropHealthIndex: 'Crop Health Index',
    stable: 'Stable',
    attentionNeeded: 'Attention Needed',
    good: 'Good',
    vegetativeStage: 'Vegetative growth stage',
    askAssistant: 'Ask Assistant',
    fieldEnvironment: 'Field Environment',
    airTemp: 'Air Temp',
    humidity: 'Humidity',
    airQuality: 'Air Quality',
    fieldSoilMoisture: 'Field Soil Moisture (4 Sectors)',
    liveReadings: 'Live Readings',
    lowSoilMoisture: 'Low Soil Moisture',
    startWater: 'Start Water',
    expandMap: 'EXPAND MAP',
    fieldSectorMap: 'Field Sector Map Layout',
    moistureLevelGood: 'Moisture level good',
    soilIsDry: 'Your soil is dry in Sector 03. Start water now.',
    
    // Notifications
    notifications: 'Notifications',
    markAllRead: 'Mark all read',
    noActiveAlerts: 'No active alerts. Your field is running smoothly!',
    
    // Disease & Weed
    diseases: 'DISEASES',
    weeds: 'WEEDS',
    scanCropLeaf: 'Scan Crop Leaf',
    imageDiseaseId: 'Image Disease Identification',
    imageDiseaseDesc: 'Take or upload a photo of your leaf to identify diseases, get precautions & treatment.',
    registeredDiseases: 'Registered Field Diseases',
    commonDiseases: 'Common Diseases',
    comesRiskPeriod: 'Comes / Risk Period',
    precaution: 'Precaution',
    cure: 'Cure',
    activeWeedAlert: 'Active Weed Alert',
    weedReferenceGuide: 'Weed Reference Guide',
    comesAt: 'COMES AT',
    remove: 'REMOVE',
    inspectField: 'Inspect Field',
    droneSurveillanceMap: 'Drone Surveillance Map',
    clustersIdentified: 'Clusters Identified',
    learnMore: 'Learn More',
    hideDetails: 'Hide Details',
    
    // Camera Scan Modal
    cropLeafScan: 'Crop Leaf Disease Scan',
    alignLeaf: 'Align Affected Leaf',
    uploadPhoto: 'Upload Photo',
    analyzePhoto: 'Analyze Photo',
    diseaseDetected: 'DISEASE DETECTED',
    symptoms: 'Symptoms',
    likelyCause: 'Likely Cause',
    registerDisease: 'Register Disease',
    scanAnother: 'Scan Another',
    
    // Assistant
    farmAssistant: 'Farm Assistant',
    tapToSpeak: 'Tap microphone to speak',
    listening: 'Listening...',
    listen: 'Listen',
    askAnything: 'Ask assistant anything about your field...',
    
    // Markets & History
    cropHistoryYield: 'Crop History & Yield',
    expected: 'Expected',
    actual: 'Actual',
    efficiency: 'Efficiency',
    yieldLossFactors: 'Yield Loss Factors',
    marketPriceTrends: 'Market Price Trends',
    suitableSuggestions: 'Suitable Crop Suggestions',
    logHarvest: 'Log Harvest',
    highSuitability: 'High',
    modSuitability: 'Moderate',
  },

  te: {
    // Telugu Translations
    appName: 'స్మార్ట్ వ్యవసాయం',
    goodMorning: 'శుభోదయం',
    farmerSubtitle: 'నేల నుండి ధాన్యాగారం వరకు సమాచార ఆధారిత వ్యవసాయం.',
    selectLanguage: 'భాషను ఎంచుకోండి',
    changeLanguage: 'భాష మార్చండి',
    
    // Navigation
    navHome: 'హోమ్',
    navField: 'పొలం',
    navCrop: 'పంట',
    navMarkets: 'మార్కెట్లు',
    navAssistant: 'అసిస్టెంట్',
    navFieldSetup: 'పొలం సరిహద్దు సెటప్',
    navDiseaseWeed: 'తెగుళ్ళు & కలుపు పర్యవేక్షణ',
    navCropHistory: 'పంట చరిత్ర & మార్కెట్లు',
    navAIAssistant: 'AI వాయిస్ అసిస్టెంట్',
    
    // Dashboard
    cropHealthIndex: 'పంట ఆరోగ్య సూచిక',
    stable: 'స్థిరంగా ఉంది',
    attentionNeeded: 'గమనించవలసినది',
    good: 'బాగుంది',
    vegetativeStage: 'శాఖీయ పెరుగుదల దశ',
    askAssistant: 'అసిస్టెంట్‌ను అడగండి',
    fieldEnvironment: 'పొలం వాతావరణం',
    airTemp: 'గాలి ఉష్ణోగ్రత',
    humidity: 'తేమ శాతం',
    airQuality: 'గాలి నాణ్యత',
    fieldSoilMoisture: 'నేల తేమ శాతం (4 సెక్టార్లు)',
    liveReadings: 'లైవ్ రీడింగ్‌లు',
    lowSoilMoisture: 'నేలలో తేమ తక్కువగా ఉంది',
    startWater: 'నీరు పెట్టండి',
    expandMap: 'మ్యాప్ చూడండి',
    fieldSectorMap: 'పొలం సెక్టార్ మ్యాప్ ల్యాఅవుట్',
    moistureLevelGood: 'తేమ మట్టం సరిగ్గా ఉంది',
    soilIsDry: 'సెక్టార్ 03 లో నేల ఎండిపోయింది. వెంటనే నీరు పెట్టండి.',
    
    // Notifications
    notifications: 'నోటిఫికేషన్‌లు',
    markAllRead: 'అన్నీ చదివినట్లు గుర్తించు',
    noActiveAlerts: 'ఎలాంటి అత్యవసర హెచ్చరికలు లేవు. మీ పొలం బాగుంది!',
    
    // Disease & Weed
    diseases: 'తెగుళ్ళు',
    weeds: 'కలుపు మొక్కలు',
    scanCropLeaf: 'ఆకును స్కాన్ చేయండి',
    imageDiseaseId: 'ఫోటో ద్వారా తెగులు గుర్తింపు',
    imageDiseaseDesc: 'తెగులును గుర్తించి చికిత్స తెలుసుకోవడానికి ఆకు ఫోటో తీయండి లేదా అప్‌లోడ్ చేయండి.',
    registeredDiseases: 'నమోదైన పంట తెగుళ్ళు',
    commonDiseases: 'సాధారణ తెగుళ్ళు',
    comesRiskPeriod: 'వచ్చే సమయం / ప్రమాద కాలం',
    precaution: 'ముందుజాగ్రత్త',
    cure: 'నివారణ / చికిత్స',
    activeWeedAlert: 'కలుపు మొక్కల హెచ్చరిక',
    weedReferenceGuide: 'కలుపు మొక్కల సమాచార దర్శిని',
    comesAt: 'వచ్చే సమయం',
    remove: 'తొలగించే విధానం',
    inspectField: 'పొలాన్ని పరిశీలించండి',
    droneSurveillanceMap: 'డ్రోన్ నిఘా మ్యాప్',
    clustersIdentified: 'గుర్తించిన కలుపు స్థానాలు',
    learnMore: 'మరిన్ని వివరాలు',
    hideDetails: 'వివరాలు దాచు',
    
    // Camera Scan Modal
    cropLeafScan: 'పంట ఆకు తెగులు స్కాన్',
    alignLeaf: 'తెగులు ఉన్న ఆకును అమర్చండి',
    uploadPhoto: 'ఫోటో అప్‌లోడ్ చేయండి',
    analyzePhoto: 'విశ్లేషించండి',
    diseaseDetected: 'గుర్తించిన తెగులు',
    symptoms: 'లక్షణాలు',
    likelyCause: 'ప్రధాన కారణం',
    registerDisease: 'తెగులును నమోదు చేయండి',
    scanAnother: 'మరొకటి స్కాన్ చేయండి',
    
    // Assistant
    farmAssistant: 'వ్యవసాయ అసిస్టెంట్',
    tapToSpeak: 'మాట్లాడటానికి మైక్ నొక్కండి',
    listening: 'వింటోంది...',
    listen: 'వినండి',
    askAnything: 'మీ పొలం గురించి ఏదైనా అడగండి...',
    
    // Markets & History
    cropHistoryYield: 'పంట చరిత్ర & దిగుబడి',
    expected: 'ఆశించిన దిగుబడి',
    actual: 'వాస్తవ దిగుబడి',
    efficiency: 'సామర్థ్యం',
    yieldLossFactors: 'దిగుబడి నష్టానికి కారణాలు',
    marketPriceTrends: 'మార్కెట్ ధరల ట్రెండ్స్',
    suitableSuggestions: 'తగిన పంట సూచనలు',
    logHarvest: 'దిగుబడి నమోదు చేయండి',
    highSuitability: 'చాలా తగినది',
    modSuitability: 'మధ్యస్థం',
  },

  hi: {
    // Hindi Translations
    appName: 'स्मार्ट कृषि',
    goodMorning: 'शुभ प्रभात',
    farmerSubtitle: 'मिट्टी से खलिहान तक डेटा-संचालित खेती।',
    selectLanguage: 'भाषा चुनें',
    changeLanguage: 'भाषा बदलें',
    
    // Navigation
    navHome: 'होम',
    navField: 'खेत',
    navCrop: 'फसल',
    navMarkets: 'बाज़ार',
    navAssistant: 'सहायक',
    navFieldSetup: 'खेत सीमा सेटअप',
    navDiseaseWeed: 'रोग एवं खरपतवार निगरानी',
    navCropHistory: 'फसल इतिहास एवं बाज़ार',
    navAIAssistant: 'एआई वॉयस असिस्टेंट',
    
    // Dashboard
    cropHealthIndex: 'फसल स्वास्थ्य सूचकांक',
    stable: 'स्थिर',
    attentionNeeded: 'ध्यान देने योग्य',
    good: 'अच्छा',
    vegetativeStage: 'वानस्पतिक वृद्धि चरण',
    askAssistant: 'सहायक से पूछें',
    fieldEnvironment: 'खेत का वातावरण',
    airTemp: 'तापमान',
    humidity: 'नमी',
    airQuality: 'वायु गुणवत्ता',
    fieldSoilMoisture: 'मृदा नमी (4 सेक्टर)',
    liveReadings: 'लाइव रीडिंग',
    lowSoilMoisture: 'कम नमी',
    startWater: 'सिंचाई शुरू करें',
    expandMap: 'मानचित्र खोलें',
    fieldSectorMap: 'खेत सेक्टर मानचित्र',
    moistureLevelGood: 'नमी का स्तर अच्छा है',
    soilIsDry: 'सेक्टर 03 में मिट्टी सूखी है। सिंचाई करें।',
    
    // Notifications
    notifications: 'सूचनाएं',
    markAllRead: 'सभी पढ़े गए चिह्नित करें',
    noActiveAlerts: 'कोई सक्रिय चेतावनी नहीं है। आपका खेत सुरक्षित है!',
    
    // Disease & Weed
    diseases: 'फसल रोग',
    weeds: 'खरपतवार',
    scanCropLeaf: 'पत्ती स्कैन करें',
    imageDiseaseId: 'चित्र द्वारा रोग पहचान',
    imageDiseaseDesc: 'रोग की पहचान और उपचार जानने के लिए पत्ती की फोटो लें।',
    registeredDiseases: 'पंजीकृत फसल रोग',
    commonDiseases: 'सामान्य रोग',
    comesRiskPeriod: 'आने का समय / जोखिम अवधि',
    precaution: 'सावधानी',
    cure: 'उपचार',
    activeWeedAlert: 'सक्रिय खरपतवार चेतावनी',
    weedReferenceGuide: 'खरपतवार संदर्भ मार्गदर्शिका',
    comesAt: 'आने का समय',
    remove: 'हटाने का तरीका',
    inspectField: 'खेत का निरीक्षण करें',
    droneSurveillanceMap: 'ड्रोन निगरानी मानचित्र',
    clustersIdentified: 'पहचाने गए समूह',
    learnMore: 'अधिक जानें',
    hideDetails: 'विवरण छुपाएं',
    
    // Camera Scan Modal
    cropLeafScan: 'फसल पत्ती रोग स्कैन',
    alignLeaf: 'प्रभावित पत्ती को संरेखित करें',
    uploadPhoto: 'फोटो अपलोड करें',
    analyzePhoto: 'विश्लेषण करें',
    diseaseDetected: 'पहचाना गया रोग',
    symptoms: 'लक्षण',
    likelyCause: 'संभावित कारण',
    registerDisease: 'रोग पंजीकृत करें',
    scanAnother: 'दूसरा स्कैन करें',
    
    // Assistant
    farmAssistant: 'कृषि सहायक',
    tapToSpeak: 'बोलने के लिए माइक दबाएं',
    listening: 'सुन रहा है...',
    listen: 'सुनें',
    askAnything: 'अपने खेत के बारे में कुछ भी पूछें...',
    
    // Markets & History
    cropHistoryYield: 'फसल इतिहास एवं उपज',
    expected: 'अनुमानित उपज',
    actual: 'वास्तविक उपज',
    efficiency: 'दक्षता',
    yieldLossFactors: 'उपज नुकसान के कारण',
    marketPriceTrends: 'बाज़ार मूल्य रुझान',
    suitableSuggestions: 'उपयुक्त फसल सुझाव',
    logHarvest: 'उपज दर्ज करें',
    highSuitability: 'उच्च',
    modSuitability: 'मध्यम',
  },

  ta: {
    // Tamil Translations
    appName: 'ஸ்மார்ட் விவசாயம்',
    goodMorning: 'காலை வணக்கம்',
    farmerSubtitle: 'மண்ணில் இருந்து களஞ்சியம் வரை தரவு சார்ந்த விவசாயம்.',
    selectLanguage: 'மொழியைத் தேர்ந்தெடுக்கவும்',
    changeLanguage: 'மொழியை மாற்றவும்',
    
    // Navigation
    navHome: 'முகப்பு',
    navField: 'நிலம்',
    navCrop: 'பயிர்',
    navMarkets: 'சந்தை',
    navAssistant: 'உதவியாளர்',
    navFieldSetup: 'நில எல்லை அமைப்பு',
    navDiseaseWeed: 'நோய் & களை கண்காணிப்பு',
    navCropHistory: 'பயிர் வரலாறு & சந்தை',
    navAIAssistant: 'AI குரல் உதவியாளர்',
    
    // Dashboard
    cropHealthIndex: 'பயிர் சுகாதார குறியீடு',
    stable: 'சீராக உள்ளது',
    attentionNeeded: 'கவனம் தேவை',
    good: 'நன்று',
    vegetativeStage: 'வளர்ச்சி நிலை',
    askAssistant: 'உதவியாளரிடம் கேட்கவும்',
    fieldEnvironment: 'நிலத்தின் வானிலை',
    airTemp: 'வெப்பநிலை',
    humidity: 'ஈரப்பதம்',
    airQuality: 'காற்றின் தரம்',
    fieldSoilMoisture: 'மண் ஈரப்பதம் (4 பிரிவுகள்)',
    liveReadings: 'நேரலை அளவீடுகள்',
    lowSoilMoisture: 'குறைந்த மண் ஈரப்பதம்',
    startWater: 'நீர்ப்பாசனம் தொடங்கவும்',
    expandMap: 'வரைபடத்தை விரிக்கவும்',
    fieldSectorMap: 'நில பிரிவு வரைபடம்',
    moistureLevelGood: 'ஈரப்பதம் நன்றாக உள்ளது',
    soilIsDry: 'பிரிவு 03 இல் மண் உலர்ந்துள்ளது. நீர் பாய்ச்சவும்.',
    
    // Notifications
    notifications: 'அறிவிப்புகள்',
    markAllRead: 'அனைத்தும் படித்ததாகக் குறிக்கவும்',
    noActiveAlerts: 'எச்சரிக்கைகள் இல்லை. உங்கள் நிலம் பாதுகாப்பாக உள்ளது!',
    
    // Disease & Weed
    diseases: 'பயிர் நோய்கள்',
    weeds: 'களைகள்',
    scanCropLeaf: 'இலையை ஸ்கேன் செய்யவும்',
    imageDiseaseId: 'புகைப்பட நோய் கண்டறிதல்',
    imageDiseaseDesc: 'நோயை கண்டறிந்து சிகிச்சை பெற இலையின் புகைப்படத்தை எடுக்கவும்.',
    registeredDiseases: 'பதிவுசெய்யப்பட்ட நோய்கள்',
    commonDiseases: 'பொதுவான நோய்கள்',
    comesRiskPeriod: 'வரும் காலம்',
    precaution: 'முன்னெச்சரிக்கை',
    cure: 'சிகிச்சை',
    activeWeedAlert: 'களை எச்சரிக்கை',
    weedReferenceGuide: 'களை வழிகாட்டி',
    comesAt: 'வரும் காலம்',
    remove: 'அகற்றும் முறை',
    inspectField: 'நிலத்தை ஆய்வு செய்யவும்',
    droneSurveillanceMap: 'ட்ரோன் வரைபடம்',
    clustersIdentified: 'கண்டறியப்பட்ட பகுதிகள்',
    learnMore: 'மேலும் அறிய',
    hideDetails: 'விவரங்களை மறைக்கவும்',
    
    // Camera Scan Modal
    cropLeafScan: 'இலை நோய் ஸ்கேன்',
    alignLeaf: 'பாதிக்கப்பட்ட இலையை வைக்கவும்',
    uploadPhoto: 'புகைப்படம் பதிவேற்றவும்',
    analyzePhoto: 'பகுப்பாய்வு செய்யவும்',
    diseaseDetected: 'கண்டறியப்பட்ட நோய்',
    symptoms: 'அறிகுறிகள்',
    likelyCause: 'காரணம்',
    registerDisease: 'நோயை பதிவு செய்யவும்',
    scanAnother: 'மறுகட்டமைப்பு செய்யவும்',
    
    // Assistant
    farmAssistant: 'விவசாய உதவியாளர்',
    tapToSpeak: 'பேச மைக் அழுத்தவும்',
    listening: 'கேட்கிறது...',
    listen: 'கேளுங்கள்',
    askAnything: 'உங்கள் நிலத்தைப் பற்றி கேட்கவும்...',
    
    // Markets & History
    cropHistoryYield: 'பயிர் வரலாறு & விளைச்சல்',
    expected: 'எதிர்பார்த்த விளைச்சல்',
    actual: 'உண்மையான விளைச்சல்',
    efficiency: 'திறன்',
    yieldLossFactors: 'விளைச்சல் இழப்பு காரணங்கள்',
    marketPriceTrends: 'சந்தை விலை போக்குகள்',
    suitableSuggestions: 'பொருத்தமான பயிர் பரிந்துரைகள்',
    logHarvest: 'விளைச்சலை பதிவு செய்யவும்',
    highSuitability: 'மிகவும் உகந்தது',
    modSuitability: 'மிதமான',
  },

  kn: {
    // Kannada Translations
    appName: 'ಸ್ಮಾರ್ಟ್ ಕೃಷಿ',
    goodMorning: 'ಶುಭೋದಯ',
    farmerSubtitle: 'ಮಣ್ಣಿನಿಂದ ಗೋದಾಮಿನವರೆಗೆ ಡೇಟಾ-ಆಧಾರಿತ ಕೃಷಿ.',
    selectLanguage: 'ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
    changeLanguage: 'ಭಾಷೆ ಬದಲಾಯಿಸಿ',
    
    // Navigation
    navHome: 'ಹೋಮ್',
    navField: 'ಜಮೀನು',
    navCrop: 'ಬೆಳೆ',
    navMarkets: 'ಮಾರುಕಟ್ಟೆ',
    navAssistant: 'ಸಹಾಯಕಿ',
    navFieldSetup: 'ಜಮೀನು ಗಡಿ ಸೆಟಪ್',
    navDiseaseWeed: 'ರೋಗ ಮತ್ತು ಕಳೆ ಮೇಲ್ವಿಚಾರಣೆ',
    navCropHistory: 'ಬೆಳೆ ಇತಿಹಾಸ ಮತ್ತು ಮಾರುಕಟ್ಟೆ',
    navAIAssistant: 'AI ವಾಯ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್',
    
    // Dashboard
    cropHealthIndex: 'ಬೆಳೆ ಆರೋಗ್ಯ ಸೂಚ್ಯಂಕ',
    stable: 'ಸ್ಥಿರವಾಗಿದೆ',
    attentionNeeded: 'ಗಮನ ಅಗತ್ಯ',
    good: 'ಉತ್ತಮವಾಗಿದೆ',
    vegetativeStage: 'ಬೆಳವಣಿಗೆಯ ಹಂತ',
    askAssistant: 'ಸಹಾಯಕಿಯನ್ನು ಕೇಳಿ',
    fieldEnvironment: 'ಜಮೀನಿನ ವಾತಾವರಣ',
    airTemp: 'ತಾಪಮಾನ',
    humidity: 'ತೇವಾಂಶ',
    airQuality: 'ಗಾಳಿಯ ಗುಣಮಟ್ಟ',
    fieldSoilMoisture: 'ಮಣ್ಣಿನ ತೇವಾಂಶ (4 ವಲಯಗಳು)',
    liveReadings: 'ಲೈವ್ ವಾಚನಗಳು',
    lowSoilMoisture: 'ಕಡಿಮೆ ಮಣ್ಣಿನ ತೇವಾಂಶ',
    startWater: 'ನೀರು ಹಾಯಿಸಿ',
    expandMap: 'ನಕ್ಷೆ ವಿಸ್ತರಿಸಿ',
    fieldSectorMap: 'ಜಮೀನಿನ ನಕ್ಷೆ',
    moistureLevelGood: 'ತೇವಾಂಶ ಮಟ್ಟ ಉತ್ತಮವಾಗಿದೆ',
    soilIsDry: 'ವಲಯ 03 ರಲ್ಲಿ ಮಣ್ಣು ಒಣಗಿದೆ. ನೀರು ಹಾಯಿಸಿ.',
    
    // Notifications
    notifications: 'ಸೂಚನೆಗಳು',
    markAllRead: 'ಎಲ್ಲವನ್ನೂ ಓದಲಾಗಿದೆ ಎಂದು ಗುರುತಿಸಿ',
    noActiveAlerts: 'ಯಾವುದೇ ಸಕ್ರಿಯ ಎಚ್ಚರಿಕೆಗಳಿಲ್ಲ. ಜಮೀನು ಸುರಕ್ಷಿತವಾಗಿದೆ!',
    
    // Disease & Weed
    diseases: 'ಬೆಳೆ ರೋಗಗಳು',
    weeds: 'ಕಳೆಗಳು',
    scanCropLeaf: 'ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    imageDiseaseId: 'ಚಿತ್ರದ ಮೂಲಕ ರೋಗ ಪತ್ತೆ',
    imageDiseaseDesc: 'ರೋಗ ಗುರುತಿಸಲು ಮತ್ತು ಚಿಕಿತ್ಸೆ ತಿಳಿಯಲು ಎಲೆಯ ಫೋಟೋ ತೆಗೆಯಿರಿ.',
    registeredDiseases: 'ನೋಂದಾಯಿತ ಬೆಳೆ ರೋಗಗಳು',
    commonDiseases: 'ಸಾಮಾನ್ಯ ರೋಗಗಳು',
    comesRiskPeriod: 'ಬರುವ ಸಮಯ',
    precaution: 'ಮುನ್ನೆಚ್ಚರಿಕೆ',
    cure: 'ಚಿಕಿತ್ಸೆ',
    activeWeedAlert: 'ಸಕ್ರಿಯ ಕಳೆ ಎಚ್ಚರಿಕೆ',
    weedReferenceGuide: 'ಕಳೆ ಮಾರ್ಗದರ್ಶಿ',
    comesAt: 'ಬರುವ ಸಮಯ',
    remove: 'ತೆಗೆಯುವ ವಿಧಾನ',
    inspectField: 'ಜಮೀನು ಪರಿಶೀಲಿಸಿ',
    droneSurveillanceMap: 'ಡ್ರೋನ್ ನಕ್ಷೆ',
    clustersIdentified: 'ಗುರುತಿಸಲಾದ ಪ್ರದೇಶಗಳು',
    learnMore: 'ಹೆಚ್ಚು ತಿಳಿಯಿರಿ',
    hideDetails: 'ವಿವರ ಮುಚ್ಚಿ',
    
    // Camera Scan Modal
    cropLeafScan: 'ಎಲೆ ರೋಗ ಸ್ಕ್ಯಾನ್',
    alignLeaf: 'ಬಾಧಿತ ಎಲೆಯನ್ನು ಇರಿಸಿ',
    uploadPhoto: 'ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ',
    analyzePhoto: 'ವಿಶ್ಲೇಷಿಸಿ',
    diseaseDetected: 'ಪತ್ತೆಯಾದ ರೋಗ',
    symptoms: 'ಲಕ್ಷಣಗಳು',
    likelyCause: 'ಸಾಧ್ಯತೆಯ ಕಾರಣ',
    registerDisease: 'ರೋಗ ನೋಂದಾಯಿಸಿ',
    scanAnother: 'ಮತ್ತೊಂದು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ',
    
    // Assistant
    farmAssistant: 'ಕೃಷಿ ಸಹಾಯಕ',
    tapToSpeak: 'ಮಾತನಾಡಲು ಮೈಕ್ ಒತ್ತಿ',
    listening: 'ಆಲಿಸುತ್ತಿದೆ...',
    listen: 'ಕೇಳಿ',
    askAnything: 'ನಿಮ್ಮ ಜಮೀನಿನ ಬಗ್ಗೆ ಕೇಳಿ...',
    
    // Markets & History
    cropHistoryYield: 'ಬೆಳೆ ಇತಿಹಾಸ ಮತ್ತು ಇಳುವರಿ',
    expected: 'ನಿರೀಕ್ಷಿತ ಇಳುವರಿ',
    actual: 'ವಾಸ್ತವ ಇಳುವರಿ',
    efficiency: 'ದಕ್ಷತೆ',
    yieldLossFactors: 'ಇಳುವರಿ ನಷ್ಟದ ಕಾರಣಗಳು',
    marketPriceTrends: 'ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಧೋರಣೆ',
    suitableSuggestions: 'ಸೂಕ್ತ ಬೆಳೆ ಸಲಹೆಗಳು',
    logHarvest: 'ಇಳುವರಿ ದಾಖಲಿಸಿ',
    highSuitability: 'ಹೆಚ್ಚು ಸೂಕ್ತ',
    modSuitability: 'ಮಧ್ಯಮ',
  },
};

export function t(key: string, lang: LanguageCode = 'en'): string {
  return TRANSLATIONS[lang]?.[key] || TRANSLATIONS.en[key] || key;
}
