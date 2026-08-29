export interface DiseaseAnalysisResult {
  diseaseName: string;
  crop: string;
  confidencePercent: number;
  symptoms: string;
  cause: string;
  precaution: string;
  cure: string;
}

export class ImageAnalysisService {
  /**
   * Simulates computer-vision leaf image analysis service
   */
  public analyzeCropImage(crop: string, imagePreviewUri?: string): Promise<DiseaseAnalysisResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (crop.toLowerCase() === 'paddy') {
          resolve({
            diseaseName: 'Paddy Blast (Pyricularia)',
            crop: 'Paddy',
            confidencePercent: 87,
            symptoms: 'Spindle-shaped greyish spots with reddish-brown borders on upper leaves.',
            cause: 'Fungal infection triggered by cool nights (<22°C) and high morning humidity.',
            precaution: 'Use certified resistant seeds & avoid excessive nitrogen application.',
            cure: 'Spray Tricyclazole 75% WP @ 0.6g per liter of water immediately.',
          });
        } else if (crop.toLowerCase() === 'cotton') {
          resolve({
            diseaseName: 'Cotton Pink Bollworm Damage',
            crop: 'Cotton',
            confidencePercent: 91,
            symptoms: 'Rosetted flowers and small bore holes in developing bolls.',
            cause: 'Insect pest larvae feeding inside cotton bolls.',
            precaution: 'Install Pheromone traps @ 5 traps per acre.',
            cure: 'Spray Chlorantraniliprole 18.5 SC @ 0.3ml/L.',
          });
        } else if (crop.toLowerCase() === 'chilli') {
          resolve({
            diseaseName: 'Chilli Leaf Curl Virus',
            crop: 'Chilli',
            confidencePercent: 89,
            symptoms: 'Upward curling and puckering of young leaves.',
            cause: 'Viral infection spread by whiteflies during hot dry spells.',
            precaution: 'Set up Yellow Sticky Traps @ 15 traps per acre.',
            cure: 'Spray Imidacloprid 17.8 SL @ 0.3ml/L to control whiteflies.',
          });
        } else {
          resolve({
            diseaseName: `${crop} Brown Spot`,
            crop: crop,
            confidencePercent: 85,
            symptoms: 'Oval brown necrotic spots on leaf blade.',
            cause: 'Fungal infection under high humidity.',
            precaution: 'Maintain balanced N-P-K fertilizer levels.',
            cure: 'Spray Mancozeb @ 2.5g/L of water.',
          });
        }
      }, 1800);
    });
  }
}

export const imageAnalysisService = new ImageAnalysisService();
