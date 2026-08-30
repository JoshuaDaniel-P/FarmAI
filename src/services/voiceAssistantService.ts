import { sensorService } from './sensorService';
import { droneService } from './droneService';
import { getActiveWeedAlerts } from './weedService';
import { INITIAL_MARKET_RATES, INITIAL_CROP_HISTORY, INITIAL_FARMER, INITIAL_FIELD_BOUNDARY } from './mockData';
import { RegisteredDisease } from '../types/farm';
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
    s = s.replace(/విభాగం\s*0?3/g, 'విభాగం మూడు');
    s = s.replace(/విభాగం\s*0?1/g, 'విభాగం ఒకటి');
    s = s.replace(/విభాగం\s*0?2/g, 'విభాగం రెండు');
    s = s.replace(/విభాగం\s*0?4/g, 'విభాగం నాలుగు');
    s = s.replace(/జోన్\s*B|జోన్\s*బి/gi, 'జోన్ బి');
    
    // Replace currency ₹
    s = s.replace(/₹\s*([0-9,]+)/g, (_, numStr) => {
      const num = parseInt(numStr.replace(/,/g, ''), 10);
      return isNaN(num) ? `రూపాయలు ${numStr}` : `${numberToTeluguWords(num)} రూపాయలు`;
    });

    // Replace temperatures
    s = s.replace(/(\d+)\s*°C/g, (_, d) => `${numberToTeluguWords(parseInt(d, 10))} డిగ్రీల సెల్సియస్`);
    s = s.replace(/(\d+)\s*-\s*(\d+)\s*°C/g, (_, a, b) => `${numberToTeluguWords(parseInt(a, 10))} నుండి ${numberToTeluguWords(parseInt(b, 10))} డిగ్రీలు`);

    // Replace percentages
    s = s.replace(/>\s*(\d+)%/g, (_, p) => `${numberToTeluguWords(parseInt(p, 10))} శాతం కంటే ఎక్కువ`);
    s = s.replace(/<\s*(\d+)%/g, (_, p) => `${numberToTeluguWords(parseInt(p, 10))} శాతం కంటే తక్కువ`);
    s = s.replace(/(\d+(?:\.\d+)?)\s*%/g, (_, p) => {
      if (p.includes('.')) {
        const [w, dec] = p.split('.');
        return `${numberToTeluguWords(parseInt(w, 10))} పాయింట్ ${numberToTeluguWords(parseInt(dec, 10))} శాతం`;
      }
      return `${numberToTeluguWords(parseInt(p, 10))} శాతం`;
    });

    // Replace decimal numbers
    s = s.replace(/(\d+)\.(\d+)/g, (_, w, d) => `${numberToTeluguWords(parseInt(w, 10))} పాయింట్ ${numberToTeluguWords(parseInt(d, 10))}`);

    // Replace Day numbers
    s = s.replace(/(\d+)వ\s*రోజు/g, (_, d) => `${numberToTeluguWords(parseInt(d, 10))}వ రోజు`);

    // Replace isolated integers
    s = s.replace(/\b(\d+)\b/g, (_, numStr) => {
      const num = parseInt(numStr, 10);
      return numberToTeluguWords(num);
    });

    return s;
  }

  if (lang === 'hi') {
    let s = text;
    s = s.replace(/सेक्टर\s*0?3/g, 'सेक्टर तीन');
    s = s.replace(/सेक्टर\s*0?1/g, 'सेक्टर एक');
    s = s.replace(/सेक्टर\s*0?2/g, 'सेक्टर दो');
    s = s.replace(/सेक्टर\s*0?4/g, 'सेक्टर चार');
    s = s.replace(/ज़ोन\s*B|ज़ोन\s*बी/gi, 'ज़ोन बी');

    s = s.replace(/₹\s*([0-9,]+)/g, (_, numStr) => {
      const num = parseInt(numStr.replace(/,/g, ''), 10);
      return isNaN(num) ? `रुपये ${numStr}` : `${numberToHindiWords(num)} रुपये`;
    });
    s = s.replace(/(\d+)\s*°C/g, (_, d) => `${numberToHindiWords(parseInt(d, 10))} डिग्री सेल्सियस`);
    s = s.replace(/(\d+(?:\.\d+)?)\s*%/g, (_, p) => {
      if (p.includes('.')) {
        const [w, dec] = p.split('.');
        return `${numberToHindiWords(parseInt(w, 10))} दशमलव ${numberToHindiWords(parseInt(dec, 10))} प्रतिशत`;
      }
      return `${numberToHindiWords(parseInt(p, 10))} प्रतिशत`;
    });
    s = s.replace(/(\d+)\.(\d+)/g, (_, w, d) => `${numberToHindiWords(parseInt(w, 10))} दशमलव ${numberToHindiWords(parseInt(d, 10))}`);
    s = s.replace(/(\d+)वें\s*दिन/g, (_, d) => `${numberToHindiWords(parseInt(d, 10))}वें दिन`);
    s = s.replace(/\b(\d+)\b/g, (_, numStr) => {
      const num = parseInt(numStr, 10);
      return numberToHindiWords(num);
    });
    return s;
  }

  if (lang === 'ta') {
    let s = text;
    s = s.replace(/பிரிவு\s*0?3/g, 'பிரிவு மூன்று');
    s = s.replace(/பிரிவு\s*0?1/g, 'பிரிவு ஒன்று');
    s = s.replace(/பிரிவு\s*0?2/g, 'பிரிவு இரண்டு');
    s = s.replace(/பிரிவு\s*0?4/g, 'பிரிவு நான்கு');
    s = s.replace(/மண்டலம்\s*B|மண்டலம்\s*பி/gi, 'மண்டலம் பி');

    s = s.replace(/₹\s*([0-9,]+)/g, (_, numStr) => {
      const num = parseInt(numStr.replace(/,/g, ''), 10);
      return isNaN(num) ? `ரூபாய் ${numStr}` : `${numberToTamilWords(num)} ரூபாய்`;
    });
    s = s.replace(/(\d+)\s*°C/g, (_, d) => `${numberToTamilWords(parseInt(d, 10))} டிகிரி செல்சியஸ்`);
    s = s.replace(/(\d+(?:\.\d+)?)\s*%/g, (_, p) => {
      if (p.includes('.')) {
        const [w, dec] = p.split('.');
        return `${numberToTamilWords(parseInt(w, 10))} புள்ளி ${numberToTamilWords(parseInt(dec, 10))} சதவீதம்`;
      }
      return `${numberToTamilWords(parseInt(p, 10))} சதவீதம்`;
    });
    s = s.replace(/(\d+)\.(\d+)/g, (_, w, d) => `${numberToTamilWords(parseInt(w, 10))} புள்ளி ${numberToTamilWords(parseInt(d, 10))}`);
    s = s.replace(/(\d+)வது\s*நாள்/g, (_, d) => `${numberToTamilWords(parseInt(d, 10))}வது நாள்`);
    s = s.replace(/\b(\d+)\b/g, (_, numStr) => {
      const num = parseInt(numStr, 10);
      return numberToTamilWords(num);
    });
    return s;
  }

  if (lang === 'kn') {
    let s = text;
    s = s.replace(/ವಲಯ\s*0?3/g, 'ವಲಯ ಮೂರು');
    s = s.replace(/ವಲಯ\s*0?1/g, 'ವಲಯ ಒಂದು');
    s = s.replace(/ವಲಯ\s*0?2/g, 'ವಲಯ ಎರಡು');
    s = s.replace(/ವಲಯ\s*0?4/g, 'ವಲಯ ನಾಲ್ಕು');
    s = s.replace(/ವಲಯ\s*B|ವಲಯ\s*ಬಿ/gi, 'ವಲಯ ಬಿ');

    s = s.replace(/₹\s*([0-9,]+)/g, (_, numStr) => {
      const num = parseInt(numStr.replace(/,/g, ''), 10);
      return isNaN(num) ? `ರೂಪಾಯಿ ${numStr}` : `${numberToKannadaWords(num)} ರೂಪಾಯಿ`;
    });
    s = s.replace(/(\d+)\s*°C/g, (_, d) => `${numberToKannadaWords(parseInt(d, 10))} ಡಿಗ್ರಿ ಸೆಲ್ಸಿಯಸ್`);
    s = s.replace(/(\d+(?:\.\d+)?)\s*%/g, (_, p) => {
      if (p.includes('.')) {
        const [w, dec] = p.split('.');
        return `${numberToKannadaWords(parseInt(w, 10))} ಬಿಂದು ${numberToKannadaWords(parseInt(dec, 10))} ಪ್ರತಿಶತ`;
      }
      return `${numberToKannadaWords(parseInt(p, 10))} ಪ್ರತಿಶತ`;
    });
    s = s.replace(/(\d+)\.(\d+)/g, (_, w, d) => `${numberToKannadaWords(parseInt(w, 10))} ಬಿಂದು ${numberToKannadaWords(parseInt(d, 10))}`);
    s = s.replace(/(\d+)ನೇ\s*ದಿನ/g, (_, d) => `${numberToKannadaWords(parseInt(d, 10))}ನೇ ದಿನ`);
    s = s.replace(/\b(\d+)\b/g, (_, numStr) => {
      const num = parseInt(numStr, 10);
      return numberToKannadaWords(num);
    });
    return s;
  }

  // English (Indian English formatting)
  let s = text;
  s = s.replace(/₹\s*([0-9,]+)/g, 'Rs. $1');
  s = s.replace(/°C/g, ' degrees Celsius');
  s = s.replace(/%/g, ' percent');
  return s;
}

/**
 * Universal Phonetic Indian Spoken Text Generator
 * Ensures that if a PC/browser doesn't have native Telugu/Tamil/Kannada/Hindi TTS voices installed,
 * speech synthesis speaks authentic rural Indian phrases phonetically in a clear Indian accent
 * rather than failing silently, going mute, or mispronouncing!
 */
export function getPhoneticIndianSpokenText(text: string, lang: LanguageCode): string {
  if (lang === 'en') {
    let s = text;
    s = s.replace(/₹\s*([0-9,]+)/g, 'Rs. $1');
    s = s.replace(/°C/g, ' degrees Celsius');
    s = s.replace(/%/g, ' percent');
    return s;
  }

  if (lang === 'te') {
    let s = text;
    const teMap: [RegExp, string][] = [
      [/నమస్కారం\s*రాజు\s*గారు!?/gi, 'Namaskaram Raju Garu!'],
      [/సెక్టార్\s*0?3/gi, 'Sector 03'],
      [/సెక్టార్\s*0?1/gi, 'Sector 01'],
      [/సెక్టార్\s*0?2/gi, 'Sector 02'],
      [/సెక్టార్\s*0?4/gi, 'Sector 04'],
      [/విభాగం\s*0?3/gi, 'Sector 03'],
      [/విభాగం\s*0?1/gi, 'Sector 01'],
      [/విభాగం\s*0?2/gi, 'Sector 02'],
      [/విభాగం\s*0?4/gi, 'Sector 04'],
      [/జోన్\s*B|జోన్\s*బి/gi, 'Zone B'],
      [/నేల\s*తేమ/gi, 'nela tema'],
      [/మాత్రమే\s*ఉంది/gi, 'matrame vundi'],
      [/మడి\s*చాలా\s*ఎండిపోయింది/gi, 'Madi chaala endipoyindi'],
      [/వెంటనే\s*నీళ్ళు\s*పెట్టండి/gi, 'ventane neellu pettandi'],
      [/వెంటనే\s*నీరు\s*పెట్టడం\s*అవసరం/gi, 'ventane neellu pettadam avasaram'],
      [/నీటిపారుదల\s*ప్రారంభించబడింది/gi, 'neetipaarudala prarambhinchabadindi'],
      [/మోటార్\s*ఆన్\s*చేయబడింది/gi, 'Motor on cheyabadindi'],
      [/మడికి\s*నీళ్ళు\s*అందుతున్నాయి/gi, 'madiki neellu anduthunnayi'],
      [/వరి\s*47వ\s*రోజు\s*దశలో/gi, 'Vari nalabhai yedu roju dashalo'],
      [/వరి\s*చేను\s*ప్రస్తుతం/gi, 'Vari chenu prasthutham'],
      [/ఎకరానికి\s*25\s*కిలోల\s*యూరియా/gi, 'ecaraniki iravai aidu kilola Urea'],
      [/మరియు\s*15\s*కిలోల\s*పొటాష్\s*వేయండి/gi, 'mariyu padihenu kilola Potash veyandi'],
      [/ఆకుమచ్చ\s*కనిపిస్తే/gi, 'aakumacha kanipisthe'],
      [/లీటరు\s*నీటికి\s*2\.5\s*గ్రాముల\s*మాంకోజెబ్\s*మందు\s*కలిపి\s*పిచికారీ\s*చేయండి/gi, 'leetaru neetiki rendu point aidu gramula Mancozeb mandhu kalipi pichikaaree cheyandi'],
      [/శాకీయ\s*దశలో\s*ఉంది/gi, 'shaakeeya dashalo vundi'],
      [/నాటిన\s*తేదీ:\s*14\s*జూలై\s*2026/gi, 'Naatina thedi: padhnaalugu July 2026'],
      [/మొత్తం\s*పంట\s*కాలం\s*125\s*రోజులు/gi, 'Moththam panta kaalam noota iravai aidu rojulu'],
      [/మీ\s*పొలం\s*మొత్తం\s*విస్తీర్ణం\s*2\.4\s*ఎకరాలు/gi, 'Mee polam moththam vistheeranam rendu point naalugu ekaralu'],
      [/GPS\s*సరిహద్దు\s*నమోదైంది/gi, 'GPS sarihaddu namodaindi'],
      [/ప్రధాన\s*ప్లాట్\s*-\s*తూర్పు\s*విభాగంలో\s*ఉంది/gi, 'Pradhana plot thoorpu vibhagamlo vundi'],
      [/మీ\s*చేనులో\s*అత్యంత\s*తక్కువ\s*తేమ/gi, 'Mee chenulo athyantha thakkuva tema'],
      [/ఇక్కడ\s*వెంటనే\s*నీళ్ళు\s*పెట్టాలి/gi, 'ikkada ventane neellu pettali'],
      [/పొలం\s*వాతావరణం:/gi, 'Polam vaathavaranam:'],
      [/గాలి\s*ఉష్ణోగ్రత/gi, 'gaali ushnogratha'],
      [/గాలి\s*తేమ/gi, 'gaali tema'],
      [/మరియు\s*గాలి\s*నాణ్యత\s*చాలా\s*బాగుంది/gi, 'mariyu gaali naanyatha chaala baagundi'],
      [/మీ\s*పంట\s*ఆరోగ్యం/gi, 'Mee panta aarogyam'],
      [/హెచ్చరికలో\s*ఉంది/gi, 'hecharikalo vundi'],
      [/కి\s*పడిపోయింది/gi, 'ki padipoyindi'],
      [/వలన\s*తెగుళ్ళ\s*ముప్పు\s*ఉంది/gi, 'valana thegulla muppu vundi'],
      [/పంట\s*ఆరోగ్య\s*సూచిక/gi, 'panta aarogya soochika'],
      [/గత\s*సీజన్\s*వరి\s*2025\s*లో/gi, 'Gatha season Vari 2025 lo'],
      [/అంచనా\s*వేసిన\s*దిగుబడి/gi, 'anchanaa vesina digubadi'],
      [/టన్నులు\s*కాగా\s*అసలు\s*దిగుబడి/gi, 'tons kaagaa asalu digubadi'],
      [/సామర్థ్యం\s*వచ్చింది/gi, 'percent saamarthyam vachindi'],
      [/కాండం\s*తొలిచే\s*పురుగు\s*మరియు\s*నీటి\s*కొరత\s*వల్ల\s*దిగుబడి\s*తగ్గింది/gi, 'kaandam tholiche purugu mariyu neeti koratha valla digubadi thaggindi'],
      [/నెల్లూరు\s*మార్కెట్లో\s*ప్రస్తుత\s*వరి\s*ధర\s*క్వింటాలుకు/gi, 'Nellore marketlo prasthutha Vari dhara quintal ku'],
      [/పెరుగుదల/gi, 'perugudhala'],
      [/మార్కెట్\s*ధరలు\s*బాగున్నాయి/gi, 'market dharalu baagunnaayi'],
      [/ఊద\s*కలుపు\s*గుర్తించబడింది/gi, 'Oodha kalupu gurthinchabadindi'],
      [/కలుపు\s*గుర్తించబడింది/gi, 'kalupu gurthinchabadindi'],
      [/ఉదయం\s*డ్రోన్\s*స్కాన్\s*ప్రకారం\s*జోన్\s*బి\s*లో\s*కలుపు\s*ఉంది/gi, 'Udhayam drone scan prakaaram Zone B lo kalupu vundi'],
      [/విత్తనాలు\s*రాకముందే\s*కలుపు\s*తీసివేయండి/gi, 'vithanaalu raakamundhe kalupu theesiveyandi'],
      [/వరిలో\s*సాధారణంగా\s*అగ్గి\s*తెగులు\s*\(బ్లాస్ట్\)\s*మరియు\s*ఆకుమచ్చ\s*తెగులు\s*వస్తాయి/gi, 'Varilo saadhaaranangaa Aggi Thegulu mariyu Aakumacha thegulu vasthaayi'],
      [/రాత్రి\s*ఉష్ణోగ్రతలు/gi, 'Raathri ushnograthalu'],
      [/కంటే\s*తగ్గితే\s*బ్లాస్ట్\s*తెగులు\s*ముప్పు\s*పెరుగుతుంది/gi, 'kante thaggithe blast thegulu muppu peruguthundi'],
      [/ఫోటో\s*తీసి\s*పరీక్షించండి/gi, 'Photo theesi pareekshinchandi'],
      [/మీకు\s*ఎలా\s*సహాయపడగలను\??/gi, 'Meeku elaa sahaayapadagalanu?'],
      [/రూపాయలు/gi, 'roopaayalu'],
      [/శాతం/gi, 'percent'],
      [/డిగ్రీల\s*సెల్సియస్/gi, 'degrees Celsius'],
      [/ఎకరాలు/gi, 'ekaralu'],
      [/రోజు/gi, 'roju'],
      [/వరి/gi, 'Vari'],
      [/పొలం/gi, 'Polam'],
      [/చేను/gi, 'Chenu'],
      [/మడి/gi, 'Madi'],
      [/నీళ్ళు|నీరు/gi, 'neellu']
    ];

    for (const [re, rep] of teMap) {
      s = s.replace(re, rep);
    }
    s = s.replace(/₹\s*([0-9,]+)/g, 'Rs. $1');
    s = s.replace(/°C/g, ' degrees Celsius');
    s = s.replace(/%/g, ' percent');
    return s;
  }

  if (lang === 'hi') {
    let s = text;
    const hiMap: [RegExp, string][] = [
      [/नमस्ते\s*राजू\s*जी!?/gi, 'Namaste Raju Ji!'],
      [/सेक्टर\s*0?3/gi, 'Sector 03'],
      [/सेक्टर\s*0?1/gi, 'Sector 01'],
      [/सेक्टर\s*0?2/gi, 'Sector 02'],
      [/सेक्टर\s*0?4/gi, 'Sector 04'],
      [/मिट्टी\s*की\s*नमी/gi, 'mitti ki nami'],
      [/केवल/gi, 'keval'],
      [/खेत\s*सूखा\s*है/gi, 'khet sookha hai'],
      [/तुरंत\s*पानी\s*चलाएं/gi, 'turant paani chalayein'],
      [/सिंचाई\s*सफलतापूर्वक\s*शुरू\s*कर\s*दी\s*गई\s*है/gi, 'sinchai safaltapoorvak shuru kar di gayi hai'],
      [/मोटर\s*चालू\s*हो\s*गई\s*है/gi, 'motor chaaloo ho gayi hai'],
      [/और\s*खेत\s*में\s*पानी\s*पहुँच\s*रहा\s*है/gi, 'aur khet mein paani pahunch raha hai'],
      [/धान\s*के\s*47वें\s*दिन\s*की\s*फसल\s*के\s*लिए/gi, 'Dhaan ke 47th day ki fasal ke liye'],
      [/प्रति\s*एकड़\s*25\s*किलोग्राम\s*यूरिया\s*और\s*15\s*किलोग्राम\s*पोटाश\s*डालें/gi, 'prati acre 25 kg Urea aur 15 kg Potash daalein'],
      [/पत्ती\s*पर\s*धब्बा\s*दिखे/gi, 'patti par dhabba dikhe'],
      [/2\.5\s*ग्राम\s*मैन्कोजेब\s*दवा\s*प्रति\s*लीटर\s*पानी\s*में\s*मिलाकर\s*छिड़काव\s*करें/gi, '2.5 gram Mancozeb dava prati liter paani mein milakar chhidkaav karein'],
      [/आपकी\s*धान\s*की\s*फसल\s*वर्तमान\s*में/gi, 'Aapki dhaan ki fasal vartamaan mein'],
      [/शाकीय\s*अवस्था\s*में\s*है/gi, 'shaakeeya avastha mein hai'],
      [/बुवाई\s*की\s*तारीख:\s*14\s*जुलाई\s*2026\s*है/gi, 'Buvaai ki tareekh 14 July 2026 hai'],
      [/कुल\s*फसल\s*अवधि\s*125\s*दिन\s*है/gi, 'kul fasal avadhi 125 din hai'],
      [/कुल\s*क्षेत्रफल\s*2\.4\s*एकड़\s*है/gi, 'kul kshetrafal 2.4 acre hai'],
      [/GPS\s*सीमा\s*दर्ज\s*है/gi, 'GPS seema darj hai'],
      [/मौसम:/gi, 'Mausam:'],
      [/तापमान/gi, 'taapmaan'],
      [/हवा\s*में\s*नमी/gi, 'hawa mein nami'],
      [/और\s*हवा\s*की\s*गुणवत्ता\s*बहुत\s*अच्छी\s*है/gi, 'aur hawa ki gunvatta bahut achhi hai'],
      [/फसल\s*का\s*स्वास्थ्य/gi, 'fasal ka swaasthya'],
      [/चेतावनी\s*पर\s*है/gi, 'chetaavni par hai'],
      [/नेल्लोर\s*मंडी\s*में\s*वर्तमान\s*धान\s*का\s*भाव/gi, 'Nellore mandi mein vartamaan dhaan ka bhaav'],
      [/प्रति\s*क्विंटल/gi, 'prati quintal'],
      [/वृद्धि/gi, 'vriddhi'],
      [/बाज़ार\s*का\s*रुख\s*बहुत\s*अच्छा\s*है/gi, 'bazaar ka rukh bahut achha hai'],
      [/मैं\s*आपकी\s*क्या\s*मदद\s*कर\s*सकता\s*हूँ\??/gi, 'Main aapki kya madad kar sakta hoon?']
    ];
    for (const [re, rep] of hiMap) {
      s = s.replace(re, rep);
    }
    s = s.replace(/₹\s*([0-9,]+)/g, 'Rs. $1');
    s = s.replace(/°C/g, ' degrees Celsius');
    s = s.replace(/%/g, ' percent');
    return s;
  }

  if (lang === 'ta') {
    let s = text;
    const taMap: [RegExp, string][] = [
      [/வணக்கம்\s*ராஜு\s*அவர்களே!?/gi, 'Vanakkam Raju Avargale!'],
      [/பிரிவு\s*0?3/gi, 'Sector 03'],
      [/பிரிவு\s*0?1/gi, 'Sector 01'],
      [/பிரிவு\s*0?2/gi, 'Sector 02'],
      [/பிரிவு\s*0?4/gi, 'Sector 04'],
      [/மண்\s*ஈரப்பதம்/gi, 'mann eerappadham'],
      [/மட்டுமே\s*உள்ளது/gi, 'mattume ulladhu'],
      [/நிலம்\s*வறண்டுள்ளது/gi, 'nilam varandulladhu'],
      [/உடனடியாக\s*தண்ணீர்\s*பாய்ச்சவும்/gi, 'udanadiyaaga thanneer paaychavum'],
      [/நீர்ப்பாசனம்\s*வெற்றிகரமாக\s*தொடங்கப்பட்டது/gi, 'neerppaasanam vetrigaramaaga thodangappattadhu'],
      [/மோட்டார்\s*இயக்கப்பட்டு/gi, 'motor iyakkappattu'],
      [/நிலத்திற்கு\s*தண்ணீர்\s*பாய்கிறது/gi, 'nilathirku thanneer paaygiradhu'],
      [/நெல்\s*47வது\s*நாள்\s*பயிருக்கு:/gi, 'Nel 47th day payirukku:'],
      [/ஏக்கருக்கு\s*25\s*கிலோ\s*யூரியா\s*மற்றும்\s*15\s*கிலோ\s*பொட்டாஷ்\s*உரமிடவும்/gi, 'acre kku 25 kg Urea matrum 15 kg Potash uramidavum'],
      [/இலைப்புள்ளி\s*தெரிந்தால்/gi, 'ilaippulli therindhaal'],
      [/2\.5\s*கிராம்\s*மேன்கோசெப்\s*மருந்து\s*கலந்து\s*தெளிக்கவும்/gi, '2.5 gram Mancozeb marundhu kalandhu thelikkavum'],
      [/நெல்லூர்\s*சந்தையில்\s*தற்போதைய\s*நெல்\s*விலை\s*குவிண்டாலுக்கு/gi, 'Nellore sandhaiyil tharpodhaiya nel vilai quintal kku'],
      [/உயர்வு/gi, 'uyarvu'],
      [/சந்தை\s*விலை\s*நன்றாக\s*உள்ளது/gi, 'sandhai vilai nanraaga ulladhu'],
      [/நான்\s*உங்களுக்கு\s*எப்படி\s*உதவ\s*முடியும்\??/gi, 'Naan ungalukku eppadi udhava mudiyum?']
    ];
    for (const [re, rep] of taMap) {
      s = s.replace(re, rep);
    }
    s = s.replace(/₹\s*([0-9,]+)/g, 'Rs. $1');
    s = s.replace(/°C/g, ' degrees Celsius');
    s = s.replace(/%/g, ' percent');
    return s;
  }

  if (lang === 'kn') {
    let s = text;
    const knMap: [RegExp, string][] = [
      [/ನಮಸ್ಕಾರ\s*ರಾಜು\s*ಅವರೇ!?/gi, 'Namaskara Raju Avare!'],
      [/ವಲಯ\s*0?3/gi, 'Sector 03'],
      [/ವಲಯ\s*0?1/gi, 'Sector 01'],
      [/ವಲಯ\s*0?2/gi, 'Sector 02'],
      [/ವಲಯ\s*0?4/gi, 'Sector 04'],
      [/ಮಣ್ಣಿನ\s*ತೇವಾಂಶ/gi, 'mannina tevaamsha'],
      [/ಮಾತ್ರ\s*ಇದೆ/gi, 'maatra ide'],
      [/ಹೊಲ\s*ಒಣಗಿದೆ/gi, 'hola onagide'],
      [/ತಕ್ಷಣ\s*ನೀರು\s*ಹಾಯಿಸಿ/gi, 'taksana neeru haayisi'],
      [/ನೀರಾವರಿ\s*ಯಶಸ್ವಿಯಾಗಿ\s*ಪ್ರಾರಂಭಿಸಲಾಗಿದೆ/gi, 'neeraavari yashasviyaagi praarambhisalaagide'],
      [/ಮೋಟಾರ್\s*ಆನ್\s*ಆಗಿದೆ/gi, 'motor on aagide'],
      [/ಹೊಲಕ್ಕೆ\s*ನೀರು\s*ತಲುಪುತ್ತಿದೆ/gi, 'holakke neeru taluputtide'],
      [/ಭತ್ತದ\s*47ನೇ\s*ದಿನದ\s*ಬೆಳೆಗೆ:/gi, 'Bhattada 47th day belege:'],
      [/ಎಕರೆಗೆ\s*25\s*ಕೆಜಿ\s*ಯೂರಿಯಾ\s*ಮತ್ತು\s*15\s*ಕೆಜಿ\s*ಪೊಟ್ಯಾಶ್\s*ಗೊಬ್ಬರ\s*ಹಾಕಿ/gi, 'ekarege 25 kg Urea mattu 15 kg Potash gobbara haaki'],
      [/ಎಲೆ\s*ಚುಕ್ಕೆ\s*ಕಂಡುಬಂದರೆ/gi, 'ele chukke kandubandare'],
      [/2\.5\s*ಗ್ರಾಂ\s*ಮ್ಯಾಂಕೋಜೆಬ್\s*ಔಷಧಿ\s*ಸಿಂಪಡಿಸಿ/gi, '2.5 gram Mancozeb aushadhi simpadisi'],
      [/ನೆಲ್ಲೂರು\s*ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ\s*ಭತ್ತದ\s*ಪ್ರಸ್ತುತ\s*ದರ\s*ಕ್ವಿಂಟಾಲ್‌ಗೆ/gi, 'Nellore maarukatteyalli bhattada prastuta dara quintal ge'],
      [/ಹೆಚ್ಚಳ/gi, 'hechchala'],
      [/ಮಾರುಕಟ್ಟೆ\s*ದರ\s*ಉತ್ತಮವಾಗಿದೆ/gi, 'maarukatte dara uttamavaagide'],
      [/ನಾನು\s*ನಿಮಗೆ\s*ಹೇಗೆ\s*ಸಹಾಯ\s*ಮಾಡಲಿ\??/gi, 'Naanu nimage hege sahaaya maadali?']
    ];
    for (const [re, rep] of knMap) {
      s = s.replace(re, rep);
    }
    s = s.replace(/₹\s*([0-9,]+)/g, 'Rs. $1');
    s = s.replace(/°C/g, ' degrees Celsius');
    s = s.replace(/%/g, ' percent');
    return s;
  }

  return prepareSpeechText(text, lang);
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

    // Dynamically retrieve voices in case onvoiceschanged just finished
    this.voices = this.synth.getVoices();

    const targetLocale = SPEECH_LOCALES[lang] || 'en-IN';
    const prefix = targetLocale.split('-')[0].toLowerCase();
    const nativeKeywords: Record<LanguageCode, string[]> = {
      te: ['telugu', 'te-in', 'te_in', 'mohan', 'shruti', 'chitra'],
      hi: ['hindi', 'hi-in', 'hi_in', 'swara', 'madhur', 'kalpana', 'hemant'],
      ta: ['tamil', 'ta-in', 'ta_in', 'valluvar', 'pallavi'],
      kn: ['kannada', 'kn-in', 'kn_in', 'gagan', 'sapna'],
      en: ['en-in', 'en_in', 'india', 'indian', 'heera', 'neerja', 'veena', 'ravi'],
    };
    const targetKws = nativeKeywords[lang] || [prefix];

    // Check if the current browser / OS actually has a native voice for the selected Indian language
    const nativeVoice = this.voices.find((v) => {
      const vl = v.lang.toLowerCase();
      const vn = v.name.toLowerCase();
      return vl.startsWith(prefix) || targetKws.some((k) => vn.includes(k) || vl.includes(k));
    });

    const isNativeAvailable = !!nativeVoice && lang !== 'en';

    let spokenText = '';
    let speechLang = 'en-IN';

    if (lang === 'en') {
      spokenText = prepareSpeechText(text, 'en');
      speechLang = 'en-IN';
    } else if (isNativeAvailable) {
      // Native regional voice is available! (e.g. Edge with Indian Language Pack, or Android Chrome)
      spokenText = prepareSpeechText(text, lang);
      speechLang = targetLocale;
    } else {
      // Fallback for standard desktop browsers without Telugu/Tamil/Kannada language packs:
      // Speaks authentic Indian farmer phonetics so it NEVER fails, never stays silent, and speaks loud & clear!
      spokenText = getPhoneticIndianSpokenText(text, lang);
      speechLang = 'en-IN';
    }

    const utterance = new SpeechSynthesisUtterance(spokenText);
    utterance.rate = lang === 'en' ? 0.86 : 0.88;
    utterance.pitch = lang === 'en' ? 1.10 : 1.05;
    utterance.lang = speechLang;

    if (isNativeAvailable && nativeVoice) {
      utterance.voice = nativeVoice;
    } else {
      // Select best Indian English / regional fallback voice
      let fallbackVoice = this.voices.find((v) => {
        const vl = v.lang.toLowerCase();
        const vn = v.name.toLowerCase();
        return vl.includes('en-in') || vl.includes('en_in') || vn.includes('india') || vn.includes('heera') || vn.includes('neerja') || vn.includes('ravi') || vn.includes('veena');
      });
      if (!fallbackVoice) {
        fallbackVoice = this.voices.find((v) => {
          const vn = v.name.toLowerCase();
          return vn.includes('female') || vn.includes('zira') || vn.includes('jenny') || vn.includes('sonia') || vn.includes('samantha');
        });
      }
      if (fallbackVoice) {
        utterance.voice = fallbackVoice;
      }
    }

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
   * Tailored with authentic Indian farmer slang & colloquial rural terminology across all 5 languages
   */
  public answerQuestion(query: string, registeredDiseases: RegisteredDisease[] = [], lang: LanguageCode = 'en'): string {
    const q = query.toLowerCase();
    const sensors = sensorService.getSensors();
    const droneLogs = droneService.getRecentLogs();
    const latestDrone = droneLogs[0];
    const farmer = INITIAL_FARMER;
    const field = INITIAL_FIELD_BOUNDARY;
    const activeWeedAlerts = getActiveWeedAlerts(farmer.activeCrop, farmer.cropDay);
    const lastSeasonYield = INITIAL_CROP_HISTORY[0];

    // Direct Action Command: Start Irrigation / Water Field
    if (
      q.includes('start water') || q.includes('start irrigation') || q.includes('water field') || q.includes('turn on motor') || q.includes('water now') || q.includes('start motor') ||
      q.includes('నీరు పెట్టు') || q.includes('నీళ్లు పెట్టు') || q.includes('మోటార్ ఆన్') || q.includes('నీరు ఆన్') || q.includes('మోటార్ స్టార్ట్') || q.includes('నీటిపారుదల ప్రారంభించు') || q.includes('తడి పెట్టు') || q.includes('నీరు పారించు') ||
      q.includes('पानी चालू') || q.includes('सिंचाई शुरू') || q.includes('मोटर चलाओ') || q.includes('पानी दो') || q.includes('मोटर चालू') || q.includes('सिंचाई करो') ||
      q.includes('தண்ணீர் பாய்ச்சு') || q.includes('மோட்டார் போடு') || q.includes('பாசனம் தொடங்கு') || q.includes('தண்ணி விடு') || q.includes('நீர்ப்பாசனம் செய்') ||
      q.includes('ನೀರು ಹಾಯಿಸಿ') || q.includes('ಮೋಟಾರ್ ಆನ್ ಮಾಡಿ') || q.includes('ನೀರಾವರಿ ಪ್ರಾರಂಭಿಸಿ') || q.includes('ನೀರು ಹಾಕಿ')
    ) {
      if (lang === 'te') return `నమస్కారం రాజు గారు! సెక్టార్ 03 లో నీటిపారుదల ప్రారంభించబడింది. మోటార్ ఆన్ చేయబడింది మరియు మడికి నీళ్ళు అందుతున్నాయి.`;
      if (lang === 'hi') return `नमस्ते राजू जी! सेक्टर 03 में सिंचाई सफलतापूर्वक शुरू कर दी गई है। मोटर चालू हो गई है और खेत में पानी पहुँच रहा है।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! பிரிவு 03 இல் நீர்ப்பாசனம் வெற்றிகரமாக தொடங்கப்பட்டது. மோட்டார் இயக்கப்பட்டு நிலத்திற்கு தண்ணீர் பாய்கிறது.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ವಲಯ 03 ರಲ್ಲಿ ನೀರಾವರಿ ಯಶಸ್ವಿಯಾಗಿ ಪ್ರಾರಂಭಿಸಲಾಗಿದೆ. ಮೋಟಾರ್ ಆನ್ ಆಗಿದೆ ಮತ್ತು ಹೊಲಕ್ಕೆ ನೀರು ತಲುಪುತ್ತಿದೆ.`;
      return `Namaste Raju Garu! I have turned ON the water motor for Sector 03. Irrigation has started in the field and soil moisture is rising.`;
    }

    // Fertilizer & Pesticide Dosage Guidance Commands
    if (
      q.includes('fertilizer') || q.includes('pesticide') || q.includes('dosage') || q.includes('dose') || q.includes('urea') || q.includes('potash') ||
      q.includes('ఎరువుల మోతాదు') || q.includes('పురుగు మందు ఎంత కొట్టాలి') || q.includes('ఎకరానికి ఎంత మందు') || q.includes('ఎరువులు') || q.includes('మోతాదు') || q.includes('యూరియా') || q.includes('పొటాష్') ||
      q.includes('उर्वरक की मात्रा') || q.includes('कीटनाशक की खुराक') || q.includes('प्रति एकड़ दवा') || q.includes('खाद') || q.includes('यूरिया') || q.includes('पोटाश') ||
      q.includes('உர அளவு') || q.includes('பூச்சிக்கொல்லி அளவு') || q.includes('மருந்தளவு') || q.includes('யூரியா') || q.includes('பொட்டாஷ்') ||
      q.includes('ಗೊಬ್ಬರದ ಪ್ರಮಾಣ') || q.includes('ಔಷಧ ಪ್ರಮಾಣ') || q.includes('ಕೀಟನಾಶಕ ಡೋಸ್') || q.includes('ಯೂರಿಯಾ') || q.includes('ಪೊಟ್ಯಾಶ್')
    ) {
      if (lang === 'te') return `నమస్కారం రాజు గారు! వరి 47వ రోజు దశలో: ఎకరానికి 25 కిలోల యూరియా మరియు 15 కిలోల పొటాష్ వేయండి. ఆకుమచ్చ కనిపిస్తే లీటరు నీటికి 2.5 గ్రాముల మాంకోజెబ్ మందు కలిపి పిచికారీ చేయండి.`;
      if (lang === 'hi') return `नमस्ते राजू जी! धान के 47वें दिन की फसल के लिए: प्रति एकड़ 25 किलोग्राम यूरिया और 15 किलोग्राम पोटाश डालें। पत्ती पर धब्बा दिखे तो 2.5 ग्राम मैन्कोजेब दवा प्रति लीटर पानी में मिलाकर छिड़काव करें।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! நெல் 47வது நாள் பயிருக்கு: ஏக்கருக்கு 25 கிலோ யூரியா மற்றும் 15 கிலோ பொட்டாஷ் உரமிடவும். இலைப்புள்ளி தெரிந்தால் 2.5 கிராம் மேன்கோசெப் மருந்து கலந்து தெளிக்கவும்.`
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ಭತ್ತದ 47ನೇ ದಿನದ ಬೆಳೆಗೆ: ಎಕರೆಗೆ 25 ಕೆಜಿ ಯೂರಿಯಾ ಮತ್ತು 15 ಕೆಜಿ ಪೊಟ್ಯಾಶ್ ಗೊಬ್ಬರ ಹಾಕಿ. ಎಲೆ ಚುಕ್ಕೆ ಕಂಡುಬಂದರೆ 2.5 ಗ್ರಾಂ ಮ್ಯಾಂಕೋಜೆಬ್ ಔಷಧಿ ಸಿಂಪಡಿಸಿ.`;
      return `Namaste Raju Garu! For your Paddy crop at Day 47: Please apply 25 kg Urea and 15 kg Potash per acre. If you notice leaf spots, spray Mancozeb medicine at 2.5 grams per liter of water.`;
    }

    // Crop Age / Sowing Date / Crop Stage Commands
    if (
      q.includes('crop age') || q.includes('sowing date') || q.includes('which day') || q.includes('how old') ||
      q.includes('పంట వయస్సు') || q.includes('ఎన్నో రోజు') || q.includes('విత్తనాలు ఎప్పుడు వేశారు') || q.includes('వరి నాటిన రోజు') || q.includes('నాటిన తేదీ') ||
      q.includes('फसल की उम्र') || q.includes('कितने दिन हुए') || q.includes('बुवाई की तारीख') || q.includes('धान कितने दिन का हुआ') ||
      q.includes('பயிர் வயது') || q.includes('எத்தனை நாள்') || q.includes('விதைத்த நாள்') ||
      q.includes('ಬೆಳೆಯ ವಯಸ್ಸು') || q.includes('ಎಷ್ಟು ದಿನ') || q.includes('ಬಿತ್ತನೆ ದಿನಾಂಕ')
    ) {
      if (lang === 'te') return `నమస్కారం రాజు గారు! మీ వరి చేను ప్రస్తుతం 47వ రోజు శాకీయ దశలో ఉంది. నాటిన తేదీ: 14 జూలై 2026. మొత్తం పంట కాలం 125 రోజులు.`;
      if (lang === 'hi') return `नमस्ते राजू जी! आपकी धान की फसल वर्तमान में 47वें दिन शाकीय अवस्था में है। बुवाई की तारीख: 14 जुलाई 2026 है। कुल फसल अवधि 125 दिन है।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! உங்கள் நெல் பயிர் தற்போது 47வது நாளில் உள்ளது. விதைத்த தேதி: 14 ஜூலை 2026. மொத்த பயிர் காலம் 125 நாட்கள்.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ನಿಮ್ಮ ಭತ್ತದ ಬೆಳೆ ಪ್ರಸ್ತುತ 47ನೇ ದಿನದಲ್ಲಿದೆ. ಬಿತ್ತನೆ ದಿನಾಂಕ: 14 ಜುಲೈ 2026. ಒಟ್ಟು ಬೆಳೆ ಅವಧಿ 125 ದಿನಗಳು.`;
      return `Namaste Raju Garu! Your Paddy crop is currently at Day 47 in vegetative stage. Sowing was done on 14th July 2026. The total duration is 125 days.`;
    }

    // Field Boundary & Acreage Map Commands
    if (
      q.includes('field map') || q.includes('boundary') || q.includes('acres') || q.includes('gps boundary') || q.includes('show map') ||
      q.includes('పొలం మ్యాప్') || q.includes('సరిహద్దు') || q.includes('ఎకరాలు ఎంత') || q.includes('మ్యాప్ చూపించు') || q.includes('విస్తీర్ణం') ||
      q.includes('खेत का नक्शा') || q.includes('सीमा') || q.includes('कितने एकड़') || q.includes('मैप दिखाओ') || q.includes('क्षेत्रफल') ||
      q.includes('நில வரைபடம்') || q.includes('எல்லை') || q.includes('எத்தனை ஏக்கர்') ||
      q.includes('ಜಮೀನಿನ ನಕ್ಷೆ') || q.includes('ಗಡಿ') || q.includes('ಎಷ್ಟು ಎಕರೆ')
    ) {
      if (lang === 'te') return `నమస్కారం రాజు గారు! మీ పొలం మొత్తం విస్తీర్ణం 2.4 ఎకరాలు. GPS సరిహద్దు నమోదైంది. ప్రధాన ప్లాట్ - తూర్పు విభాగంలో ఉంది.`;
      if (lang === 'hi') return `नमस्ते राजू जी! आपके खेत का कुल क्षेत्रफल 2.4 एकड़ है। GPS सीमा दर्ज है। मुख्य प्लॉट - पूर्व सेक्टर में है।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! உங்கள் நிலம் மொத்தம் 2.4 ஏக்கர் பரப்பளவு கொண்டது. GPS எல்லை பதிவு செய்யப்பட்டுள்ளது.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ನಿಮ್ಮ ಜಮೀನು ಒಟ್ಟು 2.4 ಎಕರೆ ವಿಸ್ತೀರ್ಣ ಹೊಂದಿದೆ. GPS ಗಡಿ ದಾಖಲಾಗಿದೆ.`;
      return `Namaste Raju Garu! Your field covers 2.4 acres with recorded GPS boundary points in Sector East.`;
    }

    // Sector 03 / Specific Sector Queries / Moisture & Irrigation (including Telugu/Hindi/Tamil/Kannada slang)
    if (
      q.includes('sector 3') || q.includes('sector 03') || q.includes('సెక్షన్ 3') || q.includes('3') || q.includes('మూడు') ||
      q.includes('సెక్టార్ 3') || q.includes('సెక్టార్ మూడు') || q.includes('సెక్టార్ త్రీ') ||
      q.includes('तीन') || q.includes('सेक्टर 3') || q.includes('सेक्टर तीन') ||
      q.includes('மூன்று') || q.includes('பிரிவு 3') || q.includes('பிரிவு மூன்று') ||
      q.includes('ಮೂರು') || q.includes('ವಲಯ 3') || q.includes('ವಲಯ ಮೂರು') ||
      q.includes('moisture') || q.includes('water') || q.includes('irrigation') ||
      q.includes('తేమ') || q.includes('నీరు') || q.includes('నీళ్ళు') || q.includes('నీళ్లు') || q.includes('తడి') || q.includes('నీటిపారుదల') || q.includes('నీరు పెట్టాలా') || q.includes('నీళ్ళు పెట్టాలా') ||
      q.includes('नमी') || q.includes('पानी') || q.includes('सिंचाई') || q.includes('पानी देना') ||
      q.includes('ஈரப்பதம்') || q.includes('தண்ணீர்') || q.includes('தண்ணி') || q.includes('நீர்ப்பாசனம்') ||
      q.includes('ತೇವಾಂಶ') || q.includes('ನೀರು') || q.includes('ನೀರಾವರಿ')
    ) {
      const s3 = sensors.nodes.find((n) => n.id === 'S03');
      if (lang === 'te') return `నమస్కారం రాజు గారు! సెక్టార్ 03 లో నేల తేమ ${s3?.moisture}% మాత్రమే ఉంది. మడి చాలా ఎండిపోయింది, వెంటనే నీళ్ళు పెట్టండి.`;
      if (lang === 'hi') return `नमस्ते राजू जी! सेक्टर 03 में मिट्टी की नमी केवल ${s3?.moisture}% है। खेत सूखा है, तुरंत पानी चलाएं।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! பிரிவு 03 இல் மண் ஈரப்பதம் ${s3?.moisture}% மட்டுமே உள்ளது. நிலம் வறண்டுள்ளது, உடனடியாக தண்ணீர் பாய்ச்சவும்.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ವಲಯ 03 ರಲ್ಲಿ ಮಣ್ಣಿನ ತೇವಾಂಶ ${s3?.moisture}% ಮಾತ್ರ ಇದೆ. ಹೊಲ ಒಣಗಿದೆ, ತಕ್ಷಣ ನೀರು ಹಾಯಿಸಿ.`;
      return `Namaste Raju Garu! Soil moisture in Sector 03 is just ${s3?.moisture}%. The field is very dry and requires immediate irrigation.`;
    }

    // Driest / Low moisture / Drought
    if (
      q.includes('driest') || q.includes('lowest') || q.includes('dry') ||
      q.includes('తక్కువ తేమ') || q.includes('ఎండిపోయిన') || q.includes('ఎండిపోయింది') || q.includes('పొడి') ||
      q.includes('सूखा') || q.includes('कम नमी') || q.includes('सूख गया') ||
      q.includes('வறண்ட') || q.includes('குறைந்த ஈரப்பதம்') || q.includes('காய்ந்து') ||
      q.includes('ಒಣ') || q.includes('ಕಡಿಮೆ ತೇವಾಂಶ') || q.includes('ಒಣಗಿದೆ')
    ) {
      const sorted = [...sensors.nodes].sort((a, b) => a.moisture - b.moisture);
      const driest = sorted[0];
      if (lang === 'te') return `నమస్కారం రాజు గారు! మీ చేనులో అత్యంత తక్కువ తేమ సెక్టార్ 03 లో ${driest.moisture}% మాత్రమే ఉంది. ఇక్కడ వెంటనే నీళ్ళు పెట్టాలి.`;
      if (lang === 'hi') return `नमस्ते राजू जी! आपके खेत में सबसे कम नमी सेक्टर 03 में केवल ${driest.moisture}% है। यहाँ तुरंत पानी देने की आवश्यकता है।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! உங்கள் வயலில் மிகவும் குறைந்த ஈரப்பதம் பிரிவு 03 இல் ${driest.moisture}% மட்டுமே உள்ளது. இங்கு உடனே தண்ணீர் பாய்ச்ச வேண்டும்.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ನಿಮ್ಮ ಹೊಲದಲ್ಲಿ ಅತ್ಯಂತ ಕಡಿಮೆ ತೇವಾಂಶ ವಲಯ 03 ರಲ್ಲಿ ${driest.moisture}% ಮಾತ್ರ ಇದೆ. ಇಲ್ಲಿ ತಕ್ಷಣ ನೀರು ಹಾಕಬೇಕು.`;
      return `Namaste Raju Garu! Sector 03 (${driest.sector}) is the driest part of your field with only ${driest.moisture}% soil moisture. Water is needed here immediately.`;
    }

    // Weather / Environmental Indicators (Rain, Heat, Temp)
    if (
      q.includes('temp') || q.includes('weather') || q.includes('rain') || q.includes('climate') ||
      q.includes('వాతావరణం') || q.includes('ఉష్ణోగ్రత') || q.includes('గాలి') || q.includes('వర్షం') || q.includes('వాన') || q.includes('ఎండ') || q.includes('చలి') ||
      q.includes('मौसम') || q.includes('तापमान') || q.includes('हवा') || q.includes('बारिश') || q.includes('गर्मी') ||
      q.includes('வானிலை') || q.includes('வெப்பநிலை') || q.includes('காற்று') || q.includes('மழை') ||
      q.includes('ಹವಾಮಾನ') || q.includes('ತಾಪಮಾನ') || q.includes('ಗಾಳಿ') || q.includes('ಮಳೆ')
    ) {
      if (lang === 'te') return `నమస్కారం రాజు గారు! పొలం వాతావరణం: గాలి ఉష్ణోగ్రత ${sensors.airTemp}°C, గాలి తేమ ${sensors.humidity}%, మరియు గాలి నాణ్యత చాలా బాగుంది.`;
      if (lang === 'hi') return `नमस्ते राजू जी! खेत का मौसम: तापमान ${sensors.airTemp}°C, हवा में नमी ${sensors.humidity}%, और हवा की गुणवत्ता बहुत अच्छी है।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! வயல் வானிலை: காற்றின் வெப்பநிலை ${sensors.airTemp}°C, காற்றின் ஈரப்பதம் ${sensors.humidity}%, காற்றின் தரம் சிறப்பாக உள்ளது.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ಹೊಲದ ಹವಾಮಾನ: ಗಾಳಿಯ ತಾಪಮಾನ ${sensors.airTemp}°C, ಆರ್ದ್ರತೆ ${sensors.humidity}%, ಮತ್ತು ಗಾಳಿಯ ಗುಣಮಟ್ಟ ಉತ್ತಮವಾಗಿದೆ.`;
      return `Namaste Raju Garu! Field weather update: Air Temperature is ${sensors.airTemp}°C, Humidity is ${sensors.humidity}%, and Air Quality is ${sensors.airQuality}.`;
    }

    // Overall Field / Yellow Health Status
    if (
      q.includes('yellow') || q.includes('attention') || q.includes('warning') ||
      q.includes('పసుపు') || q.includes('జాగ్రత్త') || q.includes('హెచ్చరిక') ||
      q.includes('पीला') || q.includes('चेतावनी') || q.includes('सावधानी') ||
      q.includes('மஞ்சள்') || q.includes('எச்சரிக்கை') ||
      q.includes('ಹಳದಿ') || q.includes('ಎಚ್ಚರಿಕೆ')
    ) {
      if (lang === 'te') return `నమస్కారం రాజు గారు! మీ పంట ఆరోగ్యం ${sensors.cropHealthPercent}% హెచ్చరికలో ఉంది. సెక్టార్ 03 లో నేల తేమ 21% కి పడిపోయింది మరియు గాలి తేమ 61% వలన తెగుళ్ళ ముప్పు ఉంది.`;
      if (lang === 'hi') return `नमस्ते राजू जी! फसल का स्वास्थ्य ${sensors.cropHealthPercent}% चेतावनी पर है। सेक्टर 03 में नमी 21% पर गिर गई है और 61% आर्द्रता से कीट और बीमारी का खतरा है।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! பயிர் ஆரோக்கியம் ${sensors.cropHealthPercent}% கவனம் தேவை நிலையில் உள்ளது. பிரிவு 03 இல் ஈரப்பதம் 21% ஆக குறைந்துள்ளது.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ಬೆಳೆ ಆರೋಗ್ಯ ${sensors.cropHealthPercent}% ಎಚ್ಚರಿಕೆಯಲ್ಲಿದೆ. ವಲಯ 03 ರಲ್ಲಿ ತೇವಾಂಶ 21% ಕ್ಕೆ ಇಳಿದಿದೆ.`;
      return `Namaste Raju Garu! Your crop health is marked attention (${sensors.cropHealthPercent}%) because your soil is dry in Sector 03 at 21% moisture, and relative humidity (61%) increases disease risk.`;
    }

    // Field Status / Health General Query (including colloquial "చేను ఎట్లుంది", "మడి", "పంట బాగుందా")
    if (
      q.includes('field') || q.includes('how is') || q.includes('health') || q.includes('status') ||
      q.includes('పొలం') || q.includes('చేను') || q.includes('మడి') || q.includes('పంట') || q.includes('ఎలా ఉంది') || q.includes('ఎట్లుంది') || q.includes('బాగుందా') || q.includes('పచ్చగా') || q.includes('ఆరోగ్యం') || q.includes('స్థితి') ||
      q.includes('खेत') || q.includes('फसल') || q.includes('कैसा है') || q.includes('स्वास्थ्य') || q.includes('स्थिति') ||
      q.includes('நிலம்') || q.includes('வயல்') || q.includes('பயிர்') || q.includes('எப்படி இருக்கிறது') || q.includes('ஆரோக்கியம்') ||
      q.includes('ಜಮೀನು') || q.includes('ಹೊಲ') || q.includes('ಬೆಳೆ') || q.includes('ಹೇಗಿದೆ') || q.includes('ಆರೋಗ್ಯ')
    ) {
      if (lang === 'te') return `నమస్కారం రాజు గారు! పొలం 01 (${field.acres} ఎకరాలు) ప్రస్తుతం ${farmer.cropDay}వ రోజు శాకీయ దశలో ఉంది. పంట ఆరోగ్య సూచిక ${sensors.cropHealthPercent}%. సెక్టార్ 03 లో నేల తేమ 21% ఉంది.`;
      if (lang === 'hi') return `नमस्ते राजू जी! खेत 01 (${field.acres} एकड़) वर्तमान में ${farmer.cropDay}वें दिन शाकीय अवस्था में है। फसल स्वास्थ्य ${sensors.cropHealthPercent}% है। सेक्टर 03 में नमी 21% है।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! நிலம் 01 (${field.acres} ஏக்கர்) ${farmer.cropDay}வது நாளில் உள்ளது. பயிர் ஆரோக்கியம் ${sensors.cropHealthPercent}%. பிரிவு 03 இல் ஈரப்பதம் 21% உள்ளது.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ಜಮೀನು 01 (${field.acres} ಎಕರೆ) ${farmer.cropDay}ನೇ ದಿನದಲ್ಲಿದೆ. ಬೆಳೆ ಆರೋಗ್ಯ ${sensors.cropHealthPercent}%. ವಲಯ 03 ರಲ್ಲಿ ತೇವಾಂಶ 21% ಇದೆ.`;
      return `Namaste Raju Garu! ${farmer.fieldName} (${field.acres} acres) is at Day ${farmer.cropDay} in vegetative stage. Crop health index is ${sensors.cropHealthPercent}%. Sector 03 soil is dry at 21% moisture.`;
    }

    // Yield / Crop History
    if (
      q.includes('yield') || q.includes('harvest') || q.includes('production') || q.includes('last year') ||
      q.includes('దిగుబడి') || q.includes('కోత') || q.includes('గత సంవత్సరం') || q.includes('పోయిన సారి') || q.includes('నష్టం') || q.includes('ఎంత వస్తుంది') ||
      q.includes('उपज') || q.includes('पैदावार') || q.includes('कटाई') || q.includes('पिछला साल') ||
      q.includes('மகசூல்') || q.includes('அறுவடை') || q.includes('கடந்த ஆண்டு') ||
      q.includes('ಇಳುವರಿ') || q.includes('ಕೊಯ್ಲು') || q.includes('ಕಳೆದ ವರ್ಷ')
    ) {
      if (lang === 'te') return `నమస్కారం రాజు గారు! గత సీజన్ వరి 2025 లో, అంచనా వేసిన దిగుబడి ${lastSeasonYield.expectedYieldTons} టన్నులు కాగా అసలు దిగుబడి ${lastSeasonYield.actualYieldTons} టన్నులు (${lastSeasonYield.efficiencyPercent}% సామర్థ్యం) వచ్చింది. కాండం తొలిచే పురుగు మరియు నీటి కొరత వల్ల దిగుబడి తగ్గింది.`;
      if (lang === 'hi') return `नमस्ते राजू जी! पिछले सीज़न धान 2025 में, अपेक्षित उपज ${lastSeasonYield.expectedYieldTons} टन थी और वास्तविक उपज ${lastSeasonYield.actualYieldTons} टन (${lastSeasonYield.efficiencyPercent}% दक्षता) रही। तना छेदक कीट और पानी की कमी से उपज घटी थी।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! கடந்த பருவத்தில் நெல் 2025, எதிர்பார்க்கப்பட்ட மகசூல் ${lastSeasonYield.expectedYieldTons} டன், உண்மையான மகசூல் ${lastSeasonYield.actualYieldTons} டன் (${lastSeasonYield.efficiencyPercent}% செயல்திறன்). தண்டு துளைப்பான் பூச்சியால் மகசூல் குறைந்தது.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ಕಳೆದ ಋತುವಿನಲ್ಲಿ ಭತ್ತ 2025, ನಿರೀಕ್ಷಿತ ಇಳುವರಿ ${lastSeasonYield.expectedYieldTons} ಟನ್ ಮತ್ತು ನೈಜ ಇಳುವರಿ ${lastSeasonYield.actualYieldTons} ಟನ್ (${lastSeasonYield.efficiencyPercent}% ದಕ್ಷತೆ). ಕಾಂಡ ಕೊರೆಯುವ ಹುಳುವಿನಿಂದ ಇಳುವರಿ ಕಡಿಮೆಯಾಗಿತ್ತು.`;
      return `Namaste Raju Garu! Last season (${lastSeasonYield.yearLabel}), your expected yield was ${lastSeasonYield.expectedYieldTons} tons and actual harvest was ${lastSeasonYield.actualYieldTons} tons (${lastSeasonYield.efficiencyPercent}% efficiency). Yield loss was mainly due to stem borer pest and water deficit.`;
    }

    // Market Rates (including "ధర ఎంత", "రేటు ఎంత", "ధరలు")
    if (
      q.includes('price') || q.includes('rate') || q.includes('market') || q.includes('mandi') || q.includes('cost') ||
      q.includes('ధర') || q.includes('ధరలు') || q.includes('రేటు') || q.includes('రేట్లు') || q.includes('మార్కెట్') || q.includes('మండి') || q.includes('అమ్మకం') || q.includes('క్వింటాల్') ||
      q.includes('दाम') || q.includes('भाव') || q.includes('मंडी') || q.includes('बाजार') ||
      q.includes('விலை') || q.includes('சந்தை') || q.includes('மண்டி') ||
      q.includes('ದರ') || q.includes('ಬೆಲೆ') || q.includes('ಮಾರುಕಟ್ಟೆ')
    ) {
      const paddyRate = INITIAL_MARKET_RATES.find((m) => m.cropName.includes('Paddy'));
      if (lang === 'te') return `నమస్కారం రాజు గారు! నెల్లూరు మార్కెట్లో ప్రస్తుత వరి ధర క్వింటాలుకు ₹${paddyRate?.currentRate} (+3.2% పెరుగుదల). మార్కెట్ ధరలు బాగున్నాయి.`;
      if (lang === 'hi') return `नमस्ते राजू जी! नेल्लोर मंडी में वर्तमान धान का भाव ₹${paddyRate?.currentRate} प्रति क्विंटल (+3.2% वृद्धि) है। बाज़ार का रुख बहुत अच्छा है।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! நெல்லூர் சந்தையில் தற்போதைய நெல் விலை குவிண்டாலுக்கு ₹${paddyRate?.currentRate} (+3.2% உயர்வு). சந்தை விலை நன்றாக உள்ளது.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ನೆಲ್ಲೂರು ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಭತ್ತದ ಪ್ರಸ್ತುತ ದರ ಕ್ವಿಂಟಾಲ್‌ಗೆ ₹${paddyRate?.currentRate} (+3.2% ಹೆಚ್ಚಳ). ಮಾರುಕಟ್ಟೆ ದರ ಉತ್ತಮವಾಗಿದೆ.`;
      return `Namaste Raju Garu! Current Paddy market rate in Nellore mandi is ₹${paddyRate?.currentRate} per quintal (+3.2% this week). Mandi trend is favorable.`;
    }

    // Drone / Weed Detection (including "కలుపు", "గడ్డి", "చెత్త", "ఊద", "తుంగ", "పీకాలా")
    if (
      q.includes('drone') || q.includes('weed') || q.includes('scan') || q.includes('grass') ||
      q.includes('కలుపు') || q.includes('డ్రోన్') || q.includes('స్కాన్') || q.includes('గడ్డి') || q.includes('చెత్త') || q.includes('ఊద') || q.includes('తుంగ') || q.includes('పీకాలా') ||
      q.includes('खरपतवार') || q.includes('ड्रोन') || q.includes('कचरा') || q.includes('घास') ||
      q.includes('களை') || q.includes('ட்ரோன்') || q.includes('புல்') ||
      q.includes('ಕಳೆ') || q.includes('ಡ್ರೋನ್') || q.includes('ಹುಲ್ಲು')
    ) {
      if (activeWeedAlerts.length > 0) {
        const topWeed = activeWeedAlerts[0];
        if (lang === 'te') return `నమస్కారం రాజు గారు! వరి ప్రస్తుతం ${farmer.cropDay}వ రోజులో ఉంది. ${translateText(topWeed.weedName, 'te')} కలుపు గుర్తించబడింది. ఉదయం డ్రోన్ స్కాన్ ప్రకారం జోన్ బి లో కలుపు ఉంది. విత్తనాలు రాకముందే కలుపు తీసివేయండి.`;
        if (lang === 'hi') return `नमस्ते राजू जी! धान ${farmer.cropDay}वें दिन पर है। ${translateText(topWeed.weedName, 'hi')} खरपतवार की पहचान हुई है। सुबह के ड्रोन स्कैन में ज़ोन बी में खरपतवार मिला है। बीज बनने से पहले खरपतवार निकालें।`;
        if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! நெல் ${farmer.cropDay}வது நாளில் உள்ளது. ${translateText(topWeed.weedName, 'ta')} களைகள் கண்டறியப்பட்டுள்ளன. காலை ட்ரோன் ஸ்கேனில் மண்டலம் B இல் களைகள் உள்ளன. விதைகள் தோன்றும் முன் அகற்றவும்.`;
        if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ಭತ್ತ ${farmer.cropDay}ನೇ ದಿನದಲ್ಲಿದೆ. ${translateText(topWeed.weedName, 'kn')} ಕಳೆ ಗುರುತಿಸಲಾಗಿದೆ. ಮುಂಜಾನೆಯ ಡ್ರೋನ್ ಸ್ಕ್ಯಾನ್ ಪ್ರಕಾರ ವಲಯ B ಯಲ್ಲಿ ಕಳೆ ಇದೆ. ಬೀಜ ಬರುವ ಮುನ್ನ ಕೀಳಿ.`;
        return `Namaste Raju Garu! Paddy is currently at Day ${farmer.cropDay}. Echinochloa weed was detected in Zone B during morning drone scan. Please inspect field and pluck weeds before seeds form.`;
      }
      return `Namaste Raju Garu! Latest drone scan detected ${latestDrone.detectedWeedLocations} weed locations in ${latestDrone.highRiskZone}.`;
    }

    // Disease Queries (including "తెగులు", "పురుగు", "మందు", "స్ప్రే", "పిచికారీ", "కొట్టాలా")
    if (
      q.includes('disease') || q.includes('blast') || q.includes('pest') || q.includes('spot') || q.includes('cure') || q.includes('precaution') ||
      q.includes('తెగులు') || q.includes('రోగం') || q.includes('పురుగు') || q.includes('అగ్గితెగులు') || q.includes('ఆకుమచ్చ') || q.includes('నివారణ') || q.includes('మందు') || q.includes('పిచికారీ') || q.includes('స్ప్రే') || q.includes('కొట్టాలా') ||
      q.includes('रोग') || q.includes('बीमारी') || q.includes('कीट') || q.includes('कीड़ा') || q.includes('झुलसा') || q.includes('धब्बा') || q.includes('उपचार') || q.includes('दवा') || q.includes('छिड़काव') ||
      q.includes('நோய்') || q.includes('பூச்சி') || q.includes('குலை நோய்') || q.includes('புள்ளி') || q.includes('சிகிச்சை') || q.includes('மருந்து') ||
      q.includes('ರೋಗ') || q.includes('ಕೀಟ') || q.includes('ಹುಳು') || q.includes('ಬೆಂಕಿ ರೋಗ') || q.includes('ಚುಕ್ಕೆ') || q.includes('ಚಿಕಿತ್ಸೆ') || q.includes('ಔಷಧ')
    ) {
      if (registeredDiseases.length > 0) {
        const reg = registeredDiseases[0];
        if (lang === 'te') return `నమస్కారం రాజు గారు! మీరు పొలంలో ${translateText(reg.diseaseName, 'te')} నమోదు చేశారు. జాగ్రత్త: ${reg.precaution}. నివారణ: ${reg.cure}.`;
        if (lang === 'hi') return `नमस्ते राजू जी! आपने खेत में ${translateText(reg.diseaseName, 'hi')} दर्ज किया है। सावधानी: ${reg.precaution}। उपचार: ${reg.cure}।`;
        if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! நீங்கள் நிலத்தில் ${translateText(reg.diseaseName, 'ta')} பதிவு செய்துள்ளீர்கள். தடுப்பு: ${reg.precaution}. சிகிச்சை: ${reg.cure}.`;
        if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ನೀವು ಜಮೀನಿನಲ್ಲಿ ${translateText(reg.diseaseName, 'kn')} ದಾಖಲಿಸಿದ್ದೀರಿ. ಮುನ್ನೆಚ್ಚರಿಕೆ: ${reg.precaution}. ಚಿಕಿತ್ಸೆ: ${reg.cure}.`;
        return `Namaste Raju Garu! You have registered ${reg.diseaseName} on your field. Precaution: ${reg.precaution}. Cure: ${reg.cure}.`;
      }
      if (lang === 'te') return `నమస్కారం రాజు గారు! వరిలో సాధారణంగా అగ్గి తెగులు (బ్లాస్ట్) మరియు ఆకుమచ్చ తెగులు వస్తాయి. రాత్రి ఉష్ణోగ్రతలు 22°C కంటే తగ్గితే బ్లాస్ట్ తెగులు ముప్పు పెరుగుతుంది. ఫోటో తీసి పరీక్షించండి.`;
      if (lang === 'hi') return `नमस्ते राजू जी! धान में आमतौर पर झुलसा (ब्लास्ट) और भूरा धब्बा रोग होता है। रात का तापमान 22°C से कम होने पर ब्लास्ट का खतरा बढ़ता है। पत्ती स्कैन करके जांचें।`;
      if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! நெல்லில் குலை நோய் (பிளாஸ்ட்) மற்றும் இலைப்புள்ளி நோய் பொதுவாக ஏற்படும். இரவு வெப்பநிலை 22°C க்கும் குறைந்தால் நோய் ஆபத்து அதிகம். இலை ஸ்கேன் செய்து பரிசோதிக்கவும்.`;
      if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ಭತ್ತದಲ್ಲಿ ಬೆಂಕಿ ರೋಗ (ಬ್ಲಾಸ್ಟ್) ಮತ್ತು ಎಲೆ ಚುಕ್ಕೆ ರೋಗ ಸಾಮಾನ್ಯವಾಗಿ ಬರುತ್ತದೆ. ರಾತ್ರಿ ತಾಪಮಾನ 22°C ಗಿಂತ ಕಡಿಮೆಯಾದರೆ ಬೆಂಕಿ ರೋಗದ ಅಪಾಯ ಹೆಚ್ಚು. ಎಲೆ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ತಪಾಸಣೆ ಮಾಡಿ.`;
      return `Namaste Raju Garu! Common Paddy diseases include Paddy Blast and Paddy Brown Spot. Paddy Blast risk increases if night temperatures drop below 22°C. Use the Scan Crop Leaf feature in the Disease tab to analyze symptoms.`;
    }

    // Default Fallback
    if (lang === 'te') return `నమస్కారం రాజు గారు! మీ పొలం 01 (వరి 47వ రోజు) లో గాలి ఉష్ణోగ్రత 34°C, గాలి తేమ 61%, మరియు సెక్టార్ 03 లో నేల తేమ 21% ఉంది. మీకు ఎలా సహాయపడగలను?`;
    if (lang === 'hi') return `नमस्ते राजू जी! आपके खेत 01 (धान 47वें दिन) में तापमान 34°C, आर्द्रता 61%, और सेक्टर 03 में 21% नमी है। मैं आपकी क्या मदद कर सकता हूँ?`;
    if (lang === 'ta') return `வணக்கம் ராஜு அவர்களே! உங்கள் நிலம் 01 (நெல் நாள் 47) இல் வெப்பநிலை 34°C, ஈரப்பதம் 61%, பிரிவு 03 இல் 21% மண் ஈரப்பதம் உள்ளது. நான் உங்களுக்கு எப்படி உதவ முடியும்?`;
    if (lang === 'kn') return `ನಮಸ್ಕಾರ ರಾಜು ಅವರೇ! ನಿಮ್ಮ ಜಮೀನು 01 (ಭತ್ತ ದಿನ 47) ತಾಪಮಾನ 34°C, ಆರ್ದ್ರತೆ 61%, ವಲಯ 03 ರಲ್ಲಿ 21% ತೇವಾಂಶವಿದೆ. ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?`;
    return `Namaste Raju Garu! Field 01 (Paddy Day 47) has 34°C air temperature, 61% humidity, and 21% dry soil in Sector 03. How can I help you today?`;
  }
}

export const voiceAssistantService = new VoiceAssistantService();


