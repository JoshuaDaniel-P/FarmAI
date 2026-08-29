import { DroneScanLog } from '../types/farm';

export class DroneService {
  private scanLogs: DroneScanLog[] = [
    {
      id: 'ds-03',
      timestamp: 'Today, 06:30 AM',
      status: 'Completed',
      detectedWeedLocations: 12,
      highRiskZone: 'Zone B',
      summary: 'Heavy Cyperus rotundus (Nut grass) infestation in Zone B. 12 distinct weed clusters pinpointed.',
    },
    {
      id: 'ds-02',
      timestamp: 'Yesterday, 05:30 PM',
      status: 'Completed',
      detectedWeedLocations: 8,
      highRiskZone: 'Zone B',
      summary: 'Early weed germination detected along field irrigation channel.',
    },
    {
      id: 'ds-01',
      timestamp: 'Yesterday, 01:00 PM',
      status: 'Completed',
      detectedWeedLocations: 5,
      highRiskZone: 'Zone A',
      summary: 'Routine health scan. Normal canopy density.',
    },
  ];

  public getRecentLogs(): DroneScanLog[] {
    return [...this.scanLogs];
  }

  public scheduleNextFlight(): string {
    return 'Today, 01:00 PM (Scheduled)';
  }

  public deployPrecisionSpray(zone: string): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `Precision spray drone dispatched to ${zone}. Targeted herbicide application in progress.`,
        });
      }, 1500);
    });
  }
}

export const droneService = new DroneService();
