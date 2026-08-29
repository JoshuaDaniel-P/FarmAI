import { LiveSensors, SensorNode } from '../types/farm';

export class SensorService {
  private sensors: LiveSensors = {
    overallMoisture: 34,
    airTemp: 34,
    humidity: 61,
    airQuality: 'Good',
    cropHealthPercent: 78,
    cropHealthStatus: 'ATTENTION',
    actionRequired: 'Your soil is dry in Sector 03 (21%). Irrigation is required.',
    nodes: [
      {
        id: 'S01',
        name: 'Sector 01',
        sector: 'North Plot',
        status: 'normal',
        moisture: 42,
        temp: 33,
        humidity: 62,
        recommendation: 'Moisture level good',
        x: 35,
        y: 30,
      },
      {
        id: 'S02',
        name: 'Sector 02',
        sector: 'West Plot',
        status: 'normal',
        moisture: 36,
        temp: 34,
        humidity: 60,
        recommendation: 'Moisture level good',
        x: 70,
        y: 40,
      },
      {
        id: 'S03',
        name: 'Sector 03',
        sector: 'East Plot',
        status: 'critical',
        moisture: 21,
        temp: 36,
        humidity: 54,
        recommendation: 'Soil is dry! Start irrigation now.',
        x: 65,
        y: 65,
      },
      {
        id: 'S04',
        name: 'Sector 04',
        sector: 'South Plot',
        status: 'normal',
        moisture: 39,
        temp: 34,
        humidity: 61,
        recommendation: 'Moisture level good',
        x: 42,
        y: 58,
      },
    ],
  };

  private listeners: ((sensors: LiveSensors) => void)[] = [];
  private intervalId: number | null = null;

  constructor() {
    this.startStreaming();
  }

  public getSensors(): LiveSensors {
    return { ...this.sensors };
  }

  public subscribe(callback: (sensors: LiveSensors) => void): () => void {
    this.listeners.push(callback);
    callback(this.getSensors());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.getSensors()));
  }

  public startStreaming() {
    if (this.intervalId) return;
    this.intervalId = window.setInterval(() => {
      const node3 = this.sensors.nodes.find((n) => n.id === 'S03');
      if (node3 && node3.status === 'critical') {
        node3.temp = +(35.5 + Math.random() * 0.8).toFixed(1);
      }
      this.sensors.airTemp = +(33.8 + Math.random() * 0.6).toFixed(1);
      this.sensors.humidity = +(60.5 + Math.random() * 1.5).toFixed(0);
      this.notify();
    }, 4000);
  }

  public triggerIrrigation() {
    // Resolve dry state in Sector 03
    const s03 = this.sensors.nodes.find((n) => n.id === 'S03');
    if (s03) {
      s03.moisture = 55;
      s03.status = 'normal';
      s03.recommendation = 'Irrigated successfully';
    }
    this.sensors.overallMoisture = 43;
    this.sensors.actionRequired = null;
    this.sensors.cropHealthPercent = 88;
    this.sensors.cropHealthStatus = 'GOOD';
    this.notify();
  }

  public stopStreaming() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const sensorService = new SensorService();
