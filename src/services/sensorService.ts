import { LiveSensors, SensorNode } from '../types/farm';
import { INITIAL_FIELD_01_SENSORS, INITIAL_FIELD_02_SENSORS, INITIAL_FIELD_03_SENSORS } from './mockData';

export class SensorService {
  private fieldSensorsMap: Map<string, LiveSensors> = new Map([
    ['field-01', INITIAL_FIELD_01_SENSORS],
    ['field-02', INITIAL_FIELD_02_SENSORS],
    ['field-03', INITIAL_FIELD_03_SENSORS],
  ]);

  private activeFieldId: string = 'field-01';
  private listeners: ((sensors: LiveSensors) => void)[] = [];
  private intervalId: number | null = null;

  constructor() {
    this.startStreaming();
  }

  public setActiveFieldId(fieldId: string) {
    this.activeFieldId = fieldId;
    this.notify();
  }

  public getSensors(fieldId?: string): LiveSensors {
    const targetId = fieldId || this.activeFieldId;
    const s = this.fieldSensorsMap.get(targetId);
    if (s) return { ...s, nodes: s.nodes.map((n) => ({ ...n })) };
    return { ...INITIAL_FIELD_01_SENSORS };
  }

  public subscribe(callback: (sensors: LiveSensors) => void): () => void {
    this.listeners.push(callback);
    callback(this.getSensors());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notify() {
    const current = this.getSensors();
    this.listeners.forEach((listener) => listener(current));
  }

  public startStreaming() {
    if (this.intervalId) return;
    this.intervalId = window.setInterval(() => {
      this.fieldSensorsMap.forEach((sensors) => {
        sensors.airTemp = +(33.5 + Math.random() * 0.9).toFixed(1);
        sensors.humidity = +(60 + Math.random() * 2).toFixed(0);
        const node3 = sensors.nodes.find((n) => n.id === 'S03');
        if (node3 && node3.status === 'critical') {
          node3.temp = +(35.8 + Math.random() * 0.5).toFixed(1);
        }
      });
      this.notify();
    }, 4000);
  }

  public triggerIrrigation(fieldId?: string) {
    const targetId = fieldId || this.activeFieldId;
    const sensors = this.fieldSensorsMap.get(targetId);
    if (sensors) {
      const s03 = sensors.nodes.find((n) => n.id === 'S03');
      if (s03) {
        s03.moisture = 55;
        s03.status = 'normal';
        s03.recommendation = 'Irrigated successfully';
      }
      sensors.overallMoisture = 44;
      sensors.actionRequired = null;
      sensors.cropHealthPercent = 88;
      sensors.cropHealthStatus = 'GOOD';
      this.notify();
    }
  }

  public stopStreaming() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const sensorService = new SensorService();
