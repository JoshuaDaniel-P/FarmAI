import { sensorService } from './sensorService';
import { droneService } from './droneService';
import { getActiveWeedAlerts } from './weedService';
import { EXPANDED_MARKET_RATES, NEARBY_SELLING_MARKETS } from './marketService';
import { NEARBY_FERTILIZER_SHOPS } from './agriShopsService';
import { weatherService, weatherRecommendationService } from './weatherService';
import { irrigationService } from './irrigationService';
import { INITIAL_FARMER } from './mockData';
import { RegisteredDisease, Field, SoilTestProfile, PreviousCropRecord } from '../types/farm';
import { LanguageCode, SPEECH_LOCALES, translateCrop, translateText } from './i18n';

export function numberToTeluguWords(n: number): string {
  const ones = ['', 'ఒకటి', 'రెండు', 'మూడు', 'నాలుగు', 'ఐదు', 'ఆరు', 'ఏడు', 'ఎనిమిది', 'తొమ్మిది', 'పది', 'పదకొండు', 'పన్నెండు', 'పదమూడు', 'పద్నాలుగు', 'పదిహేను', 'పదహారు', 'పదిహేడు', 'పద్దెనిమిది', 'పంతొమ్మిది'];
  const tens = ['', '', 'ఇరవై', 'ముప్పై', 'నలభై', 'యాభై', 'అరవై', 'డెబ్బై', 'ఎనభై', 'తొంభై'];
  
  if (n === 0) return 'సున్నా';
  if (n < 20) return ones[n];
  if (n < 100) {
    const rem = n % 10;
    return tens[Math.floor(n / 10)] + (rem > 0 ? ` ${ones[rem]}` : '');
  }
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    const hText = h === 1 ? 'వంద' : `${ones[h]} వందల`;
    return hText + (rem > 0 ? ` ${numberToTeluguWords(rem)}` : '');
  }
  if (n < 100000) {
    const th = Math.floor(n / 1000);
    const rem = n % 1000;
    const thText = th === 1 ? 'వెయ్యి' : `${numberToTeluguWords(th)} వేల`;
    return thText + (rem > 0 ? ` ${numberToTeluguWords(rem)}` : '');
  }
  return String(n);
}

export function numberToHindiWords(n: number): string {
  const hWords: Record<number, string> = {
    0: 'शून्य', 1: 'एक', 2: 'दो', 3: 'तीन', 4: 'चार', 5: 'पाँच', 6: 'छह', 7: 'सात', 8: 'आठ', 9: 'नौ',
    10: 'दस', 11: 'ग्यारह', 12: 'बारह', 13: 'तेरह', 14: 'चौदह', 15: 'पंद्रह', 16: 'सोलह', 17: 'सत्रह', 18: 'अठारह', 19: 'उन्नीस',
    20: 'बीस', 21: 'इक्कीस', 22: 'बाईस', 23: 'तेईस', 24: 'चौबीस', 25: 'पच्चीस', 26: 'छब्बीस', 27: 'सत्ताईस', 28: 'अट्ठाईस', 29: 'उनतीस',
    30: 'तीस', 31: 'इकतीस', 32: 'बत्तीस', 33: 'तैंतीस', 34: 'चौंतीस', 35: 'पैंतीस', 36: 'छत्तीस', 37: 'सैंतीस', 38: 'अड़तीस', 39: 'उनतालीस',
    40: 'चालीस', 41: 'इकतालीस', 42: 'बयालीस', 43: 'तैंतालीस', 44: 'चौवालीस', 45: 'पैंतालीस', 46: 'छियालीस', 47: 'सैंतालीस', 48: 'अड़तालीस', 49: 'उनचास',
    50: 'पचास', 51: 'इक्यावन', 52: 'बावन', 53: 'तिरेपन', 54: 'चौवन', 55: 'पचपन', 56: 'छप्पन', 57: 'सत्तावन', 58: 'अट्ठावन', 59: 'उनसठ',
    60: 'साठ', 61: 'इकसठ', 62: 'बासठ', 63: 'तिरसठ', 64: 'चौंसठ', 65: 'पैंसठ', 66: 'छियासठ', 67: 'सरसठ', 68: 'अड़सठ', 69: 'उनहत्तर',
    70: 'सत्तर', 71: 'इकहत्तर', 72: 'बहत्तर', 73: 'तिहत्तर', 74: 'चौहत्तर', 75: 'पचहत्तर', 76: 'छिहत्तर', 77: 'सतहत्तर', 78: 'अठहत्तर', 79: 'उनासी',
    80: 'अस्सी', 81: 'इक्यासी', 82: 'बयासी', 83: 'तिरासी', 84: 'चौरासी', 85: 'पचासी', 86: 'छियासी', 87: 'सत्तासी', 88: 'अट्ठासी', 89: 'नवासी',
    90: 'नब्बे', 91: 'इक्यानवे', 92: 'बानवे', 93: 'तिरानवे', 94: 'चौरानवे', 95: 'पंचानवे', 96: 'छियानवे', 97: 'सत्तानवे', 98: 'अट्ठानवे', 99: 'निन्यानवे',
  };
  if (hWords[n] !== undefined) return hWords[n];
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    return `${numberToHindiWords(h)} सौ` + (rem > 0 ? ` ${numberToHindiWords(rem)}` : '');
  }
  if (n < 100000) {
    const th = Math.floor(n / 1000);
    const rem = n % 1000;
    return `${numberToHindiWords(th)} हज़ार` + (rem > 0 ? ` ${numberToHindiWords(rem)}` : '');
  }
  return String(n);
}

export function numberToTamilWords(n: number): string {
  const tOnes = ['', 'ஒன்று', 'இரண்டு', 'மூன்று', 'நான்கு', 'ஐந்து', 'ஆறு', 'ஏழு', 'எட்டு', 'ஒன்பது', 'பத்து', 'பதினொன்று', 'பன்னிரண்டு', 'பதின்மூன்று', 'பதினான்கு', 'பதினைந்து', 'பதினாறு', 'பதினேழு', 'பதினெட்டு', 'பத்தொன்பது'];
  const tTens = ['', '', 'இருபது', 'முப்பது', 'நாற்பது', 'ஐம்பது', 'அறுபது', 'எழுபது', 'எண்பது', 'தொண்ணூறு'];
  const tPrefixes = ['', '', 'இருபத்தி', 'முப்பத்தி', 'நாற்பத்தி', 'ஐம்பத்தி', 'அறுபத்தி', 'எழுபத்தி', 'எண்பத்தி', 'தொண்ணூற்றி'];
  if (n === 0) return 'பூஜ்ஜியம்';
  if (n < 20) return tOnes[n];
  if (n < 100) {
    const rem = n % 10;
    return rem === 0 ? tTens[Math.floor(n / 10)] : `${tPrefixes[Math.floor(n / 10)]} ${tOnes[rem]}`;
  }
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    const hText = h === 1 ? 'நூறு' : `${tOnes[h]} நூறு`;
    return hText + (rem > 0 ? ` ${numberToTamilWords(rem)}` : '');
  }
  if (n < 100000) {
    const th = Math.floor(n / 1000);
    const rem = n % 1000;
    const thText = th === 1 ? 'ஆயிரம்' : `${numberToTamilWords(th)} ஆயிரம்`;
    return thText + (rem > 0 ? ` ${numberToTamilWords(rem)}` : '');
  }
  return String(n);
}

export function numberToKannadaWords(n: number): string {
  const kOnes = ['', 'ಒಂದು', 'ಎರಡು', 'ಮೂರು', 'ನಾಲ್ಕು', 'ಐದು', 'ಆರು', 'ಏಳು', 'ಎಂಟು', 'ಒಂಬತ್ತು', 'ಹತ್ತು', 'ಹನ್ನೊಂದು', 'ಹನ್ನೆರಡು', 'ಹದಿಮೂರು', 'ಹದಿನಾಲ್ಕು', 'ಹದಿನೈದು', 'ಹದಿನಾರು', 'ಹದಿನೇಳು', 'ಹದಿನೆಂಟು', 'ಹತ್ತೊಂಬತ್ತು'];
  const kTens = ['', '', 'ಇಪ್ಪತ್ತು', 'ಮೂವತ್ತು', 'ನಲವತ್ತು', 'ಐವತ್ತು', 'ಅರವತ್ತು', 'ಎಪ್ಪತ್ತು', 'ಎಂಬತ್ತು', 'ತೊಂಬತ್ತು'];
  const kPrefixes = ['', '', 'ಇಪ್ಪತ್ತ', 'ಮೂವತ್ತ', 'ನಲವತ್ತ', 'ಐವತ್ತ', 'ಅರವತ್ತ', 'ಎಪ್ಪತ್ತ', 'ಎಂಬತ್ತ', 'ತೊಂಬತ್ತ'];
  if (n === 0) return 'ಸೊನ್ನೆ';
  if (n < 20) return kOnes[n];
  if (n < 100) {
    const rem = n % 10;
    return rem === 0 ? kTens[Math.floor(n / 10)] : `${kPrefixes[Math.floor(n / 10)]}${kOnes[rem]}`;
  }
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const rem = n % 100;
    const hText = h === 1 ? 'ನೂರು' : `${kOnes[h]} ನೂರು`;
    return hText + (rem > 0 ? ` ${numberToKannadaWords(rem)}` : '');
  }
  if (n < 100000) {
    const th = Math.floor(n / 1000);
    const rem = n % 1000;
    const thText = th === 1 ? 'ಸಾವಿರ' : `${numberToKannadaWords(th)} ಸಾವಿರ`;
    return thText + (rem > 0 ? ` ${numberToKannadaWords(rem)}` : '');
  }
  return String(n);
}

export function prepareSpeechText(text: string, lang: LanguageCode): string {
  if (lang === 'te') {
    let s = text;
    s = s.replace(/సెక్టార్\s*0?3/g, 'సెక్టార్ మూడు');
    s = s.replace(/సెక్టార్\s*0?1/g, 'సెక్టార్ ఒకటి');
    s = s.replace(/సెక్టార్\s*0?2/g, 'సెక్టార్ రెండు');
    s = s.replace(/సెక్టార్\s*0?4/g, 'సెక్టార్ నాలుగు');
    s = s.replace(/₹\s*([0-9,]+)/g, (_, numStr) => {
      const num = parseInt(numStr.replace(/,/g, ''), 10);
      return isNaN(num) ? `రూపాయలు ${numStr}` : `${numberToTeluguWords(num)} రూపాయలు`;
    });
    s = s.replace(/(\d+)\s*°C/g, (_, d) => `${numberToTeluguWords(parseInt(d, 10))} డిగ్రీల సెల్సియస్`);
    s = s.replace(/(\d+(?:\.\d+)?)\s*%/g, (_, p) => `${numberToTeluguWords(parseInt(p, 10))} శాతం`);
    return s;
  }
  return text;
}

export function getPhoneticIndianSpokenText(text: string, lang: LanguageCode): string {
  let s = text;
  s = s.replace(/₹\s*([0-9,]+)/g, 'Rs. $1');
  s = s.replace(/°C/g, ' degrees Celsius');
  s = s.replace(/%/g, ' percent');
  return s;
}

export class VoiceAssistantService {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
  private recognition: any = null;
  private voices: SpeechSynthesisVoice[] = [];

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-IN';
      }

      if (this.synth) {
        this.synth.onvoiceschanged = () => {
          if (this.synth) {
            this.voices = this.synth.getVoices();
          }
        };
        this.voices = this.synth.getVoices();
      }
    }
  }

  public listen(
    onResult: (text: string) => void,
    onError: (err: any) => void,
    lang: LanguageCode = 'en'
  ): () => void {
    if (!this.recognition) {
      onError('Speech Recognition not supported in this browser. You can type your query below.');
      return () => {};
    }

    this.recognition.lang = SPEECH_LOCALES[lang] || 'en-IN';
    this.recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };
    this.recognition.onerror = (event: any) => {
      onError(event.error);
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.warn('Recognition start error', e);
    }

    return () => {
      try {
        this.recognition.stop();
      } catch (e) {}
    };
  }

  public speak(text: string, lang: LanguageCode = 'en') {
    if (!this.synth) return;
    this.synth.cancel();
    this.voices = this.synth.getVoices();

    const targetLocale = SPEECH_LOCALES[lang] || 'en-IN';
    const spokenText = prepareSpeechText(text, lang);
    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.lang = targetLocale;

    try {
      if (this.synth.paused) {
        this.synth.resume();
      }
      this.synth.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  public stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Grounded Natural-Language Query Engine retrieving actual application state as Source of Truth
   */
  public answerQuestion(
    query: string,
    registeredDiseases: RegisteredDisease[] = [],
    lang: LanguageCode = 'en'
  ): string {
    const q = query.toLowerCase();
    const sensors = sensorService.getSensors();
    const weather = weatherService.getWeatherData();
    const tomorrow = weather.dailyForecast[1];
    const farmer = INITIAL_FARMER;
    const activeField = farmer.fields[0];
    const activeWeedAlerts = getActiveWeedAlerts(activeField.activeCrop, activeField.cropAgeDays);
    const soil = activeField.soilProfile;
    const previousCrop = activeField.previousCropHistory[0];
    const motor = irrigationService.getMotorStatus();

    // 1. Motor / Irrigation Start Command
    if (
      q.includes('start water') || q.includes('start irrigation') || q.includes('water field') || q.includes('turn on motor') || q.includes('water now') || q.includes('start motor') ||
      q.includes('నీరు పెట్టు') || q.includes('నీళ్లు పెట్టు') || q.includes('మోటార్ ఆన్') || q.includes('पानी चालू') || q.includes('सिंचाई शुरू') || q.includes('மோட்டார் போடு') || q.includes('ಮೋಟಾರ್ ಆನ್')
    ) {
      irrigationService.startMotor('Sector 03');
      sensorService.triggerIrrigation(activeField.id);
      if (lang === 'te') return `నమస్కారం రాజు గారు! సెక్టార్ 03 లో నీటిపారుదల ప్రారంభించబడింది. మోటార్ సిమ్యులేషన్ ఆన్ చేయబడింది మరియు మడికి నీళ్ళు అందుతున్నాయి.`;
      if (lang === 'hi') return `नमस्ते राजू जी! सेक्टर 03 में सिंचाई सफलतापूर्वक शुरू कर दी गई है। मोटर चालू हो गई है।`;
      return `Namaste Raju Garu! I have started the irrigation motor for Sector 03. Soil moisture is rising.`;
    }

    // 2. Weather & Forecast Query
    if (
      q.includes('weather') || q.includes('tomorrow') || q.includes('rain') || q.includes('forecast') || q.includes('temperature') ||
      q.includes('వాతావరణం') || q.includes('వర్షం') || q.includes('రేపు') || q.includes('मौसम') || q.includes('बारिश') || q.includes('வானிலை') || q.includes('ಮಳೆ')
    ) {
      if (lang === 'te') {
        return `నమస్కారం రాజు గారు! నేడు ఉష్ణోగ్రత ${weather.currentTemp}°C, గాలి తేమ ${weather.currentHumidity}%. రేపు (${tomorrow.tempMax}°C) వర్షం పడే అవకాశం ${tomorrow.rainProbabilityPercent}% ఉంది. కాబట్టి నేడు ప్రధాన నీటిపారుదల అవసరం లేదు.`;
      }
      if (lang === 'hi') {
        return `नमस्ते राजू जी! आज का तापमान ${weather.currentTemp}°C है। कल ${tomorrow.tempMax}°C तापमान और ${tomorrow.rainProbabilityPercent}% बारिश की संभावना है।`;
      }
      return `Namaste Raju Garu! Current weather is ${weather.currentTemp}°C with ${weather.currentHumidity}% humidity. Tomorrow is expected to be around ${tomorrow.tempMax}°C with a ${tomorrow.rainProbabilityPercent}% chance of rain.`;
    }

    // 3. Soil Test & Profile Query
    if (
      q.includes('soil test') || q.includes('soil profile') || q.includes('ph') || q.includes('nitrogen') || q.includes('potassium') || q.includes('phosphorus') ||
      q.includes('నేల పరీక్ష') || q.includes('భూమి సారం') || q.includes('मिट्टी की जांच') || q.includes('மண் பரிசோதனை') || q.includes('ಮಣ್ಣಿನ ಪರೀಕ್ಷೆ')
    ) {
      if (lang === 'te') {
        return `నమస్కారం రాజు గారు! మీ ${activeField.name} నేల రకం: ${soil.soilType}. pH: ${soil.ph} (అనుకూలం), నత్రజని: ${soil.nitrogenInterpretation}, భాస్వరం: ${soil.phosphorusInterpretation}, పొటాష్: ${soil.potassiumInterpretation}.`;
      }
      return `Namaste Raju Garu! Soil profile for ${activeField.name}: Type is ${soil.soilType}, pH is ${soil.ph} (${soil.phInterpretation}), Nitrogen is ${soil.nitrogenInterpretation}, and Phosphorus is ${soil.phosphorusInterpretation}.`;
    }

    // 4. Previous Crop & Historical Yield Query
    if (
      q.includes('previous crop') || q.includes('last year') || q.includes('history') || q.includes('last season') ||
      q.includes('గత పంట') || q.includes('పోయిన సారి') || q.includes('पिछली फसल') || q.includes('முந்தைய பயிர்') || q.includes('ಹಿಂದಿನ ಬೆಳೆ')
    ) {
      if (lang === 'te') {
        return `నమస్కారం రాజు గారు! ఈ పొలంలో గత పంట ${previousCrop.cropName} (${previousCrop.cropVariety}). అంచనా దిగుబడి ${previousCrop.expectedYieldTons} టన్నులు, అసలు దిగుబడి ${previousCrop.actualYieldTons} టన్నులు (${previousCrop.efficiencyPercent}% సామర్థ్యం). కారణం: ${previousCrop.mainLossFactor}.`;
      }
      return `Namaste Raju Garu! Previous crop on this field was ${previousCrop.cropName} (${previousCrop.cropVariety}). Expected yield was ${previousCrop.expectedYieldTons} tons and actual harvest was ${previousCrop.actualYieldTons} tons (${previousCrop.efficiencyPercent}% efficiency). Main factor: ${previousCrop.mainLossFactor}.`;
    }

    // 5. Fertilizer Shop & Agri Input Query
    if (
      q.includes('shop') || q.includes('fertilizer shop') || q.includes('store') || q.includes('buy pesticide') || q.includes('dealer') ||
      q.includes('దుకాణం') || q.includes('ఎరువుల షాపు') || q.includes('दुकान') || q.includes('உரக்கடை') || q.includes('ರಸಗೊಬ್ಬರ ಅಂಗಡಿ')
    ) {
      const topShop = NEARBY_FERTILIZER_SHOPS[0];
      if (lang === 'te') {
        return `నమస్కారం రాజు గారు! దగ్గరలోని ఎరువుల దుకాణం: ${topShop.name}, ${topShop.distanceKm} కి.మీ దూరంలో (${topShop.address}). ఫోన్: ${topShop.phone}.`;
      }
      return `Namaste Raju Garu! Nearest agricultural supplier is ${topShop.name}, ${topShop.distanceKm} km away in ${topShop.address}. Phone: ${topShop.phone}.`;
    }

    // 6. Nearby Mandi / Selling Market Query
    if (
      q.includes('mandi') || q.includes('where to sell') || q.includes('market yard') || q.includes('sell crop') ||
      q.includes('ఎక్కడ అమ్మాలి') || q.includes('మార్కెట్ యార్డ్') || q.includes('మండి') || q.includes('कहाँ बेचें') || q.includes('சந்தை') || q.includes('ಮಾರುಕಟ್ಟೆ')
    ) {
      const topMkt = NEARBY_SELLING_MARKETS[0];
      if (lang === 'te') {
        return `నమస్కారం రాజు గారు! మీ పంటను అమ్మడానికి దగ్గరలోని మార్కెట్: ${topMkt.name} (${topMkt.distanceKm} కి.మీ). వరి క్వింటాలుకు ప్రస్తుత ధర ₹2,450.`;
      }
      return `Namaste Raju Garu! Nearest selling mandi is ${topMkt.name} (${topMkt.distanceKm} km away). Current Paddy rate is ₹2,450 per quintal.`;
    }

    // 7. Crop Stage & Growth Age Query
    if (
      q.includes('crop age') || q.includes('sowing date') || q.includes('stage') || q.includes('which day') ||
      q.includes('పంట వయస్సు') || q.includes('ఎన్నో రోజు') || q.includes('దశ') || q.includes('फसल की उम्र') || q.includes('பயிர் வயது') || q.includes('ಬೆಳೆಯ ವಯಸ್ಸು')
    ) {
      if (lang === 'te') {
        return `నమస్కారం రాజు గారు! మీ ${activeField.name} లో ${activeField.activeCrop} ప్రస్తుతం ${activeField.cropAgeDays}వ రోజు ${activeField.growthStage.stageName} లో ఉంది.`;
      }
      return `Namaste Raju Garu! Your ${activeField.name} (${activeField.activeCrop}) is currently at Day ${activeField.cropAgeDays} in ${activeField.growthStage.stageName}.`;
    }

    // 8. Sector 03 / Soil Moisture Query
    if (
      q.includes('sector 3') || q.includes('sector 03') || q.includes('moisture') || q.includes('water') ||
      q.includes('సెక్టార్ 3') || q.includes('తేమ') || q.includes('నీరు') || q.includes('नमी') || q.includes('ஈரப்பதம்') || q.includes('ತೇವಾಂಶ')
    ) {
      const s3 = sensors.nodes.find((n) => n.id === 'S03');
      if (lang === 'te') return `నమస్కారం రాజు గారు! సెక్టార్ 03 లో నేల తేమ ${s3?.moisture}% మాత్రమే ఉంది. మడి చాలా ఎండిపోయింది, వెంటనే నీళ్ళు పెట్టండి.`;
      return `Namaste Raju Garu! Soil moisture in Sector 03 is low at ${s3?.moisture}%. Irrigation is recommended.`;
    }

    // 9. Disease Risk Query
    if (
      q.includes('disease') || q.includes('pest') || q.includes('blast') || q.includes('spot') || q.includes('risk') ||
      q.includes('తెగులు') || q.includes('రోగం') || q.includes('పురుగు') || q.includes('बीमारी') || q.includes('रोग') || q.includes('நோய்') || q.includes('ರೋಗ')
    ) {
      if (lang === 'te') {
        return `నమస్కారం రాజు గారు! మీ పంట ప్రస్తుతం ${activeField.growthStage.stageName} లో ఉంది. గాలి తేమ ${sensors.humidity}% ఉన్నందున అగ్గి తెగులు (బ్లాస్ట్) మరియు ఆకుమచ్చ తెగులు ముప్పు ఉంది. ఆకులు గమనించండి.`;
      }
      return `Namaste Raju Garu! Your ${activeField.activeCrop} is in ${activeField.growthStage.stageName}. Current humidity (${sensors.humidity}%) indicates elevated risk for Paddy Blast and Brown Spot.`;
    }

    // 10. Weed Query
    if (
      q.includes('weed') || q.includes('grass') || q.includes('కలుపు') || q.includes('గడ్డి') || q.includes('खरपतवार') || q.includes('களை') || q.includes('ಕಳೆ')
    ) {
      if (activeWeedAlerts.length > 0) {
        const topWeed = activeWeedAlerts[0];
        if (lang === 'te') return `నమస్కారం రాజు గారు! వరి 47వ రోజున ${topWeed.weedName} కలుపు ముప్పు ఉంది. విత్తనాలు రాకముందే తీసివేయండి.`;
        return `Namaste Raju Garu! ${topWeed.weedName} commonly appears during this stage (Day 47). Please inspect and pluck weeds before seed formation.`;
      }
      return `Namaste Raju Garu! No critical weed outbreak currently active for this growth stage.`;
    }

    // 11. General Field Status Fallback
    if (lang === 'te') {
      return `నమస్కారం రాజు గారు! ${activeField.name} (${activeField.activeCrop} ${activeField.cropAgeDays}వ రోజు) లో పంట ఆరోగ్యం ${sensors.cropHealthPercent}%. ఉష్ణోగ్రత ${sensors.airTemp}°C మరియు సెక్టార్ 03 లో తేమ ${sensors.nodes.find((n) => n.id === 'S03')?.moisture}%. మీకు ఎలా సహాయపడగలను?`;
    }
    return `Namaste Raju Garu! ${activeField.name} (${activeField.activeCrop} Day ${activeField.cropAgeDays}) crop health index is ${sensors.cropHealthPercent}%. Air temperature is ${sensors.airTemp}°C and Sector 03 is at ${sensors.nodes.find((n) => n.id === 'S03')?.moisture}% moisture. How can I assist you?`;
  }
}

export const voiceAssistantService = new VoiceAssistantService();
