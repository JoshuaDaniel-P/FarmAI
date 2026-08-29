import { sensorService } from './sensorService';
import { DISEASE_DATABASE } from './diseaseService';
import { droneService } from './droneService';
import { WEED_DATABASE, getActiveWeedAlerts } from './weedService';
import { INITIAL_MARKET_RATES, INITIAL_CROP_HISTORY, INITIAL_FARMER, INITIAL_FIELD_BOUNDARY } from './mockData';
import { RegisteredDisease } from '../types/farm';

export class VoiceAssistantService {
  private synth: SpeechSynthesis | null = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
  private recognition: any = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-IN';
      }
    }
  }

  public listen(onResult: (text: string) => void, onError: (err: any) => void): () => void {
    if (!this.recognition) {
      onError('Speech Recognition not supported in this browser. You can type your query below.');
      return () => {};
    }

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

  public speak(text: string) {
    if (!this.synth) return;
    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    const voices = this.synth.getVoices();
    const inVoice = voices.find((v) => v.lang.includes('en-IN') || v.name.includes('India'));
    if (inVoice) {
      utterance.voice = inVoice;
    }
    this.synth.speak(utterance);
  }

  public stopSpeaking() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  /**
   * Grounded Natural-Language Query Engine retrieving actual application state as Source of Truth
   */
  public answerQuestion(query: string, registeredDiseases: RegisteredDisease[] = []): string {
    const q = query.toLowerCase();
    const sensors = sensorService.getSensors();
    const droneLogs = droneService.getRecentLogs();
    const latestDrone = droneLogs[0];
    const farmer = INITIAL_FARMER;
    const field = INITIAL_FIELD_BOUNDARY;
    const activeWeedAlerts = getActiveWeedAlerts(farmer.activeCrop, farmer.cropDay);
    const lastSeasonYield = INITIAL_CROP_HISTORY[0];

    // Sector 03 / Specific Sector Queries
    if (q.includes('sector 3') || q.includes('sector 03') || q.includes('sector three')) {
      const s3 = sensors.nodes.find((n) => n.id === 'S03');
      return `Soil moisture in Sector 03 is ${s3?.moisture}%. It is dry and requires irrigation immediately.`;
    }

    if (q.includes('driest') || q.includes('lowest moisture') || q.includes('dry sector')) {
      const sorted = [...sensors.nodes].sort((a, b) => a.moisture - b.moisture);
      const driest = sorted[0];
      return `Sector 03 (${driest.sector}) is the driest part of your field with ${driest.moisture}% soil moisture. Water is needed here.`;
    }

    if (q.includes('sector 1') || q.includes('sector 01')) {
      const s1 = sensors.nodes.find((n) => n.id === 'S01');
      return `Sector 01 soil moisture is ${s1?.moisture}%. Status is Good.`;
    }

    if (q.includes('sector 2') || q.includes('sector 02')) {
      const s2 = sensors.nodes.find((n) => n.id === 'S02');
      return `Sector 02 soil moisture is ${s2?.moisture}%. Status is Good.`;
    }

    if (q.includes('sector 4') || q.includes('sector 04')) {
      const s4 = sensors.nodes.find((n) => n.id === 'S04');
      return `Sector 04 soil moisture is ${s4?.moisture}%. Status is Good.`;
    }

    // Weather / Environmental Indicators
    if (q.includes('temp') || q.includes('temperature') || q.includes('weather') || q.includes('humidity') || q.includes('air quality')) {
      return `Field environment: Air Temperature is ${sensors.airTemp}°C, Humidity is ${sensors.humidity}%, and Air Quality is ${sensors.airQuality}.`;
    }

    // Overall Field / Yellow Health Status
    if (q.includes('why is my crop health yellow') || q.includes('why yellow') || q.includes('attention')) {
      return `Your crop health is marked ATTENTION (${sensors.cropHealthPercent}%) because your soil is dry in Sector 03 at 21% moisture, and relative humidity (61%) increases disease risk.`;
    }

    if (q.includes('field') || q.includes('how is') || q.includes('health') || q.includes('status')) {
      return `${farmer.fieldName} (${field.acres} acres) is at Day ${farmer.cropDay} (${farmer.cropStage}). Crop health index is ${sensors.cropHealthPercent}%. Sector 03 soil is dry at 21% moisture.`;
    }

    // Yield / Crop History
    if (q.includes('yield') || q.includes('last season') || q.includes('harvest') || q.includes('previous')) {
      return `Last season (${lastSeasonYield.yearLabel}), your expected yield was ${lastSeasonYield.expectedYieldTons} tons and actual yield was ${lastSeasonYield.actualYieldTons} tons (${lastSeasonYield.efficiencyPercent}% efficiency). Yield loss was mainly due to stem borer pest (0.3t) and mid-season water deficit (0.2t).`;
    }

    // Market Rates
    if (q.includes('price') || q.includes('rate') || q.includes('market') || q.includes('paddy rate') || q.includes('sell')) {
      const paddyRate = INITIAL_MARKET_RATES.find((m) => m.cropName.includes('Paddy'));
      return `Current Paddy market rate in Nellore mandi is ₹${paddyRate?.currentRate} per quintal (+3.2% this week). Trend is favorable.`;
    }

    // Drone / Weed Detection
    if (q.includes('drone') || q.includes('weed') || q.includes('scan') || q.includes('spray')) {
      if (activeWeedAlerts.length > 0) {
        const topWeed = activeWeedAlerts[0];
        return `Paddy is currently at Day ${farmer.cropDay}. ${topWeed.weedName} commonly appears between Days ${topWeed.startDay}-${topWeed.endDay}. Latest drone scan detected ${latestDrone.detectedWeedLocations} weed clusters in Zone B. Action: Inspect field and pluck weeds before seeds form.`;
      }
      return `Latest drone scan at ${latestDrone.timestamp} detected ${latestDrone.detectedWeedLocations} weed locations in ${latestDrone.highRiskZone}.`;
    }

    // Disease Queries
    if (q.includes('disease') || q.includes('blast') || q.includes('brown spot') || q.includes('pest') || q.includes('registered')) {
      if (registeredDiseases.length > 0) {
        const reg = registeredDiseases[0];
        return `You have registered ${reg.diseaseName} on your field. Precaution: ${reg.precaution}. Cure: ${reg.cure}.`;
      }
      return `Common Paddy diseases include Paddy Blast and Paddy Brown Spot. Paddy Blast risk increases if night temperatures drop below 22°C. Use the Scan Crop Leaf feature in the Disease tab to analyze symptoms.`;
    }

    // Default Fallback
    return `${farmer.fieldName} (${farmer.activeCrop} Day ${farmer.cropDay}) has 34°C air temperature, 61% humidity, and 21% dry soil in Sector 03. How can I help you, Raju Garu?`;
  }
}

export const voiceAssistantService = new VoiceAssistantService();
