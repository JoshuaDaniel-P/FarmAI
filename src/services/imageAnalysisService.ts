export interface DiseaseAnalysisResult {
  diseaseName: string;
  crop: string;
  confidencePercent: number;
  isConfident: boolean;
  symptoms: string;
  cause: string;
  precaution: string;
  cure: string;
  whenToSeekHelp?: string;
  statusMessage?: string;
}

export class ImageAnalysisService {
  /**
   * Mock Disease Analysis Architecture (Separated service ready to plug in real CV/Edge AI model)
   */
  public analyzeCropImage(
    crop: string,
    imagePreviewUri?: string,
    simulateLowConfidence: boolean = false
  ): Promise<DiseaseAnalysisResult> {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (simulateLowConfidence) {
          resolve({
            diseaseName: 'Inconclusive / Low Confidence',
            crop: crop,
            confidencePercent: 42,
            isConfident: false,
            symptoms: 'Blurred or insufficient symptom markers visible on leaf blade.',
            cause: 'Image may be out of focus, backlit, or taken from too far away.',
            precaution: 'Ensure the affected leaf or lesion is clearly in focus with good natural daylight.',
            cure: 'Please capture another close-up photo showing distinct spots or leaf lesions.',
            statusMessage: 'Unable to confidently identify the disease. Please take another clear image.',
          });
          return;
        }

        const cropLower = crop.toLowerCase();
        if (cropLower.includes('paddy')) {
          resolve({
            diseaseName: 'Paddy Blast (Pyricularia oryzae)',
            crop: 'Paddy',
            confidencePercent: 88,
            isConfident: true,
            symptoms: 'Spindle-shaped greyish spots with reddish-brown borders on upper leaf blades.',
            cause: 'Fungal spores multiplying under cool night temperatures (<22°C) and heavy dew.',
            precaution: 'Avoid excess nitrogen top dressing and maintain 20x15cm hill spacing.',
            cure: 'Spray Tricyclazole 75% WP @ 0.6g per liter of water or Isoprothiolane @ 1.5ml/L.',
            whenToSeekHelp: 'If more than 15% of hill leaves show spindle lesions.',
          });
        } else if (cropLower.includes('cotton')) {
          resolve({
            diseaseName: 'Cotton Pink Bollworm Damage',
            crop: 'Cotton',
            confidencePercent: 91,
            isConfident: true,
            symptoms: 'Rosetted flower petals that fail to open and small bore holes on young green bolls.',
            cause: 'Pectinophora gossypiella caterpillar feeding on internal seeds and lint.',
            precaution: 'Install 5 Pheromone traps per acre with Gossyplure lures.',
            cure: 'Spray Chlorantraniliprole 18.5 SC @ 0.3ml per liter of water.',
            whenToSeekHelp: 'If pheromone trap catch exceeds 8 moths per night for 3 consecutive days.',
          });
        } else if (cropLower.includes('chilli')) {
          resolve({
            diseaseName: 'Chilli Leaf Curl Virus',
            crop: 'Chilli',
            confidencePercent: 89,
            isConfident: true,
            symptoms: 'Upward boat-shaped curling and puckering of young leaves with inter-nodal stunting.',
            cause: 'Viral infection transmitted by Whiteflies (Bemisia tabaci) during hot dry spells.',
            precaution: 'Set up 15 Yellow Sticky Traps per acre and grow Maize border barrier rows.',
            cure: 'Spray Diafenthiuron 50% WP @ 1.25g/L or Imidacloprid 17.8% SL @ 0.3ml/L to control vector.',
            whenToSeekHelp: 'If more than 10% of field saplings exhibit stunted curling within 40 days.',
          });
        } else if (cropLower.includes('groundnut')) {
          resolve({
            diseaseName: 'Groundnut Tikka Leaf Spot',
            crop: 'Groundnut',
            confidencePercent: 87,
            isConfident: true,
            symptoms: 'Circular dark brown spots with prominent bright yellow halos on mature leaflets.',
            cause: 'Cercospora fungal infection spreading during humid cloudy weather.',
            precaution: 'Treat seed with Mancozeb @ 3g/kg and maintain rotation with cereals.',
            cure: 'Spray Chlorothalonil 75% WP @ 2g per liter or Hexaconazole @ 2ml/L.',
            whenToSeekHelp: 'If defoliation starts before pod filling is completed.',
          });
        } else if (cropLower.includes('maize')) {
          resolve({
            diseaseName: 'Maize Fall Armyworm (FAW)',
            crop: 'Maize',
            confidencePercent: 93,
            isConfident: true,
            symptoms: 'Windowing pin-hole leaf damage and sawdust-like brown frass pellets in central whorls.',
            cause: 'Spodoptera frugiperda caterpillar infestation during early vegetative stage.',
            precaution: 'Apply fine sand + lime (9:1) or wood ash into whorls at knee-high stage.',
            cure: 'Spray Chlorantraniliprole 18.5 SC @ 0.4ml/L directly into central whorls.',
            whenToSeekHelp: 'If more than 10% of plants show central whorl destruction.',
          });
        } else {
          resolve({
            diseaseName: `${crop} Brown Spot`,
            crop: crop,
            confidencePercent: 84,
            isConfident: true,
            symptoms: 'Oval brown necrotic lesions on leaf surface.',
            cause: 'Fungal pathogen favored by warm humid weather and nutrient imbalance.',
            precaution: 'Ensure balanced N-P-K fertilization and avoid drought shock.',
            cure: 'Spray Mancozeb @ 2.5g per liter of water.',
          });
        }
      }, 1500);
    });
  }
}

export const imageAnalysisService = new ImageAnalysisService();
