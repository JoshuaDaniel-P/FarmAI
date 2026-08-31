import { MotorStatus } from '../types/farm';

export class IrrigationService {
  private motorState: MotorStatus = {
    isOnline: true,
    isRunning: false,
    activeSectorId: null,
    startedAt: undefined,
    isSimulated: true, // Clearly documented simulation abstraction
    history: [
      {
        id: 'irr-1',
        timestamp: '2026-08-29 06:30 AM',
        action: 'stop',
        sector: 'Sector 01 (North Plot)',
        durationMinutes: 45,
      },
      {
        id: 'irr-2',
        timestamp: '2026-08-27 05:00 PM',
        action: 'stop',
        sector: 'Sector 04 (South Plot)',
        durationMinutes: 30,
      },
    ],
  };

  private listeners: ((state: MotorStatus) => void)[] = [];

  public getMotorStatus(): MotorStatus {
    return { ...this.motorState };
  }

  public subscribe(callback: (state: MotorStatus) => void): () => void {
    this.listeners.push(callback);
    callback(this.getMotorStatus());
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.getMotorStatus()));
  }

  public startMotor(sectorId: string = 'Sector 03'): boolean {
    this.motorState.isRunning = true;
    this.motorState.activeSectorId = sectorId;
    this.motorState.startedAt = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    this.motorState.history.unshift({
      id: `irr-${Date.now()}`,
      timestamp: `Today, ${this.motorState.startedAt}`,
      action: 'start',
      sector: sectorId,
    });
    this.notify();
    return true;
  }

  public stopMotor(): boolean {
    if (this.motorState.isRunning) {
      const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.motorState.isRunning = false;
      this.motorState.activeSectorId = null;
      this.motorState.startedAt = undefined;
      this.motorState.history.unshift({
        id: `irr-${Date.now()}`,
        timestamp: `Today, ${nowTime}`,
        action: 'stop',
        sector: 'Main Field Valve',
        durationMinutes: 20,
      });
      this.notify();
    }
    return true;
  }
}

export const irrigationService = new IrrigationService();
