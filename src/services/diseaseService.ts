import { DiseaseInfo, GrowthStageName } from '../types/farm';

export const EXPANDED_DISEASE_DATABASE: DiseaseInfo[] = [
  // ================= PADDY =================
  {
    id: 'paddy-blast',
    crop: 'Paddy',
    diseaseName: 'Paddy Blast (Aggi Tegulu)',
    relevantStages: ['Germination / Seedling', 'Vegetative Stage', 'Flowering'],
    typicalRiskPeriod: 'Day 20 - 75 (Seedling & Vegetative stage, especially cool humid nights)',
    riskLevel: 'High',
    riskBadgeColor: 'bg-error-container border-error text-error',
    imageUrl: '/images/diseases/paddy_blast.jpg',
    icon: 'warning',

    whatYouMaySee: [
      'Spindle-shaped diamond eye spots on leaves with greyish white centers and brown edges',
      'Dark brown lesions at neck nodes causing lodging of the panicle (Neck Blast)',
      'Leaves drying from tips downwards giving burnt appearance',
    ],
    riskPeriod: 'Vegetative tillering and flowering stages during cool nights (<22°C) with morning dew.',
    whyItHappens: 'Fungal spores (Pyricularia oryzae) multiply rapidly during cloudy days with >90% humidity.',
    precautions: [
      'Treat seeds with Tricyclazole 75% WP @ 2g per kg seed before sowing',
      'Avoid excess nitrogen (urea) split doses in cool weather',
      'Maintain 20x15cm planting distance for clean air flow between hills',
    ],
    cureAndManagement: [
      'Spray Tricyclazole 75% WP @ 0.6g per liter of water',
      'Or spray Isoprothiolane 40% EC @ 1.5ml per liter',
      'Spray during early morning or evening for maximum absorption',
    ],
    whenToSeekHelp: 'If more than 15% of hill leaves show spindle lesions or neck blast rot starts.',

    // Legacy helpers
    symptoms: ['Spindle-shaped spots with grey centers', 'Neck rot causing lodging of panicles'],
    primaryCause: 'Fungal infection (Pyricularia oryzae)',
    favorableConditions: 'Cool nights (<22°C), heavy morning dew, high humidity (>90%)',
    treatment: 'Spray Tricyclazole 75% WP @ 0.6g/L or Isoprothiolane @ 1.5ml/L.',
    currentRiskPrediction: 'High Risk if night temperature drops below 22°C with dew.',
    comesWhen: 'Cool night temperatures (<22°C) with heavy morning dew during vegetative stage',
    shortPrecaution: 'Treat seeds before sowing & avoid excess urea',
    shortCure: 'Spray Tricyclazole 75% WP @ 0.6g per liter of water',
  },
  {
    id: 'paddy-brown-spot',
    crop: 'Paddy',
    diseaseName: 'Paddy Brown Spot (Aaku Macha Tegulu)',
    relevantStages: ['Vegetative Stage', 'Flowering', 'Reproductive / Grain Development'],
    typicalRiskPeriod: 'Day 35 - 90 (Active tillering to grain filling)',
    riskLevel: 'Moderate',
    riskBadgeColor: 'bg-[#a67b27]/20 border-[#a67b27] text-[#f2cc81]',
    imageUrl: '/images/diseases/paddy_brown_spot.jpg',
    icon: 'coronavirus',

    whatYouMaySee: [
      'Small oval or circular dark brown spots on leaves with yellow halos',
      'Spots coalesce making entire leaf blade yellow and withered',
      'Dark discolored spots on paddy grains reducing grain weight',
    ],
    riskPeriod: 'Warm humid weather (25°C-30°C) with intermittent rain in soils with nutrient deficiency.',
    whyItHappens: 'Fungus (Bipolaris oryzae) thrives in fields with low soil nitrogen, potassium, or drought stress.',
    precautions: [
      'Apply balanced N-P-K fertilizer and adequate Potash',
      'Ensure soil does not undergo severe drying cycles',
      'Remove diseased stubble from previous harvest',
    ],
    cureAndManagement: [
      'Spray Mancozeb 75% WP @ 2.5g per liter of water',
      'Or spray Propiconazole 25% EC @ 1ml per liter of water',
      'Repeat after 10 days if spots continue spreading',
    ],
    whenToSeekHelp: 'If spots cover more than 20% of leaf area or reach the top flag leaf.',

    symptoms: ['Oval brown spots on leaves with yellow halo', 'Dark spots on grains reducing kernel weight'],
    primaryCause: 'Fungal infection (Bipolaris oryzae)',
    favorableConditions: 'High humidity (>85%), 25°C-30°C temperature, nutrient-deficient soil',
    treatment: 'Spray Mancozeb @ 2.5g/L or Propiconazole @ 1ml/L of water.',
    currentRiskPrediction: 'Moderate Risk (64% likelihood based on 61% humidity).',
    comesWhen: 'Warm humid weather (>85% humidity) during tillering and grain filling',
    shortPrecaution: 'Apply balanced Potash and avoid severe soil dry spells',
    shortCure: 'Spray Mancozeb @ 2.5g per liter of water',
  },
  {
    id: 'paddy-sheath-blight',
    crop: 'Paddy',
    diseaseName: 'Paddy Sheath Blight',
    relevantStages: ['Vegetative Stage', 'Flowering'],
    typicalRiskPeriod: 'Day 45 - 85 (Maximum tillering to heading)',
    riskLevel: 'Moderate',
    riskBadgeColor: 'bg-[#a67b27]/20 border-[#a67b27] text-[#f2cc81]',
    imageUrl: '/images/diseases/paddy_blast.jpg',
    icon: 'eco',

    whatYouMaySee: [
      'Greenish-grey water-soaked spots on leaf sheaths near water level',
      'Spots enlarge with irregular dark brown margins like snake skin pattern',
      'Upper leaves turn yellow and die prematurely',
    ],
    riskPeriod: 'High temperature (28°C-32°C) combined with high relative humidity and dense plant spacing.',
    whyItHappens: 'Soil-borne fungus (Rhizoctonia solani) spreads rapidly in densely crowded stands.',
    precautions: [
      'Avoid high planting density (maintain 15-20cm spacing)',
      'Drain stagnant water for 2-3 days to let air reach the stem base',
      'Do not apply excessive nitrogen fertilizer',
    ],
    cureAndManagement: [
      'Spray Hexaconazole 5% SC @ 2ml per liter of water directed at plant base',
      'Or spray Azoxystrobin + Difenoconazole @ 1ml per liter',
    ],
    whenToSeekHelp: 'If lesions reach the upper third of the plant canopy before flowering.',

    symptoms: ['Serpentine lesions on leaf sheaths near water line', 'Leaf drying from base upwards'],
    primaryCause: 'Fungus (Rhizoctonia solani)',
    favorableConditions: 'Warm humid weather (28-32°C), dense canopy, high nitrogen',
    treatment: 'Spray Hexaconazole 5% SC @ 2ml/L directed at stem base.',
    currentRiskPrediction: 'Moderate Risk during dense vegetative canopy growth.',
    comesWhen: 'Warm humid days with dense plant canopy during active tillering',
    shortPrecaution: 'Maintain hill spacing & drain excess water',
    shortCure: 'Spray Hexaconazole @ 2ml per liter directed at the base',
  },

  // ================= COTTON =================
  {
    id: 'cotton-bollworm',
    crop: 'Cotton',
    diseaseName: 'Cotton Pink Bollworm (Gulabi Purugu)',
    relevantStages: ['Flowering', 'Reproductive / Grain Development'],
    typicalRiskPeriod: 'Day 60 - 130 (Square formation, flowering, and green boll stages)',
    riskLevel: 'High',
    riskBadgeColor: 'bg-error-container border-error text-error',
    imageUrl: '/images/diseases/cotton_bollworm.jpg',
    icon: 'bug_report',

    whatYouMaySee: [
      'Rosetted flowers that fail to open normally ("rosetted bloom")',
      'Small entrance holes on young developing bolls',
      'Stained and damaged lint inside mature bolls',
    ],
    riskPeriod: 'Warm dry conditions during flowering and peak boll formation.',
    whyItHappens: 'Moths lay eggs in flowers; larvae bore directly inside bolls and feed on seeds.',
    precautions: [
      'Install 5 Pheromone Traps per acre with Gossyplure lures',
      'Destroy rosetted flowers and fallen squares manually',
      'Avoid extending the crop past 150 days',
    ],
    cureAndManagement: [
      'If trap catch exceeds 8 moths/night for 3 consecutive days:',
      'Spray Chlorantraniliprole 18.5 SC @ 0.3ml per liter of water',
      'Or spray Emamectin Benzoate 5% SG @ 0.5g per liter',
    ],
    whenToSeekHelp: 'If more than 10% of green bolls sampled show internal larvae bore holes.',

    symptoms: ['Rosetted flowers failing to open', 'Bore holes in green bolls with seed damage'],
    primaryCause: 'Insect pest (Pectinophora gossypiella)',
    favorableConditions: 'Warm dry weather with high green boll density',
    treatment: 'Spray Chlorantraniliprole 18.5 SC @ 0.3ml/L or Emamectin Benzoate @ 0.5g/L.',
    currentRiskPrediction: 'High risk during flowering and boll formation.',
    comesWhen: 'Warm dry weather during flowering and green boll development',
    shortPrecaution: 'Hang 5 Pheromone traps per acre',
    shortCure: 'Spray Chlorantraniliprole 18.5 SC @ 0.3ml per liter',
  },
  {
    id: 'cotton-leaf-spot',
    crop: 'Cotton',
    diseaseName: 'Cotton Alternaria Leaf Spot',
    relevantStages: ['Vegetative Stage', 'Flowering', 'Reproductive / Grain Development'],
    typicalRiskPeriod: 'Day 40 - 110 (Canopy development to boll opening)',
    riskLevel: 'Moderate',
    riskBadgeColor: 'bg-[#a67b27]/20 border-[#a67b27] text-[#f2cc81]',
    imageUrl: '/images/diseases/cotton_alternaria.jpg',
    icon: 'eco',

    whatYouMaySee: [
      'Small brown circular spots with concentric target-board rings on leaves',
      'Cracking in the center of spots creating shot holes',
      'Premature defoliation and shed of young squares',
    ],
    riskPeriod: 'Intermittent rainfall followed by warm sunny intervals (26°C-32°C).',
    whyItHappens: 'Alternaria macrospora fungus propagates during sudden rain showers on mature leaves.',
    precautions: [
      'Maintain proper row spacing (90x60cm) to allow sunlight penetration',
      'Clean fallen diseased leaves from around the plant base',
      'Ensure balanced potassium nutrition to strengthen leaf epidermis',
    ],
    cureAndManagement: [
      'Spray Copper Oxychloride 50% WP @ 3g per liter of water',
      'Or spray Propiconazole 25% EC @ 1ml per liter',
    ],
    whenToSeekHelp: 'If heavy leaf shedding occurs during peak boll development.',

    symptoms: ['Brownish spots with concentric rings', 'Early leaf drop'],
    primaryCause: 'Fungal pathogen (Alternaria macrospora)',
    favorableConditions: 'Intermittent rainfall with warm temperature (26-32°C)',
    treatment: 'Spray Copper Oxychloride @ 3g/L or Propiconazole @ 1ml/L.',
    currentRiskPrediction: 'Moderate risk during intermittent rainy spells.',
    comesWhen: 'Warm weather with sudden light rains (26-32°C)',
    shortPrecaution: 'Remove old leaves & maintain plant spacing',
    shortCure: 'Spray Copper Oxychloride @ 3g per liter of water',
  },

  // ================= CHILLI =================
  {
    id: 'chilli-leaf-curl',
    crop: 'Chilli',
    diseaseName: 'Chilli Leaf Curl Virus (Bobbara / Gemini Virus)',
    relevantStages: ['Germination / Seedling', 'Vegetative Stage', 'Flowering'],
    typicalRiskPeriod: 'Day 20 - 70 (Seedling establishment to early flowering)',
    riskLevel: 'High',
    riskBadgeColor: 'bg-error-container border-error text-error',
    imageUrl: '/images/diseases/chilli_leaf_curl.jpg',
    icon: 'coronavirus',

    whatYouMaySee: [
      'Upward curling and puckering of young top leaves ("boat shaped")',
      'Shortening of inter-nodes giving stunted bushy appearance',
      'Severely reduced flowering and small deformed pale fruits',
    ],
    riskPeriod: 'Dry hot spells (30°C-36°C) when whitefly vector population spikes.',
    whyItHappens: 'Whiteflies (Bemisia tabaci) transmit the virus from weed hosts to young chilli saplings.',
    precautions: [
      'Install 15 Yellow Sticky Traps per acre to catch vector whiteflies',
      'Grow 2-3 border rows of Maize or Sorghum as a physical vector barrier',
      'Uproot and burn virus-infected plants immediately to prevent spread',
    ],
    cureAndManagement: [
      'There is no chemical cure for the virus itself; control the whitefly vector:',
      'Spray Diafenthiuron 50% WP @ 1.25g per liter of water',
      'Or spray Imidacloprid 17.8% SL @ 0.3ml per liter in rotation',
    ],
    whenToSeekHelp: 'If more than 10% of plants show stunted bushy tops within first 45 days.',

    symptoms: ['Upward curling and puckering of leaves', 'Stunted plant growth and flower drop'],
    primaryCause: 'Viral disease transmitted by Whitefly (Bemisia tabaci)',
    favorableConditions: 'Hot dry weather (30-36°C) promoting whitefly reproduction',
    treatment: 'Spray Diafenthiuron @ 1.25g/L or Imidacloprid @ 0.3ml/L to control vector.',
    currentRiskPrediction: 'High risk during hot dry weather with high whitefly count.',
    comesWhen: 'Hot dry spells with whitefly activity on young crop',
    shortPrecaution: 'Install yellow sticky traps & border barrier crops',
    shortCure: 'Spray Diafenthiuron @ 1.25g per liter of water',
  },
  {
    id: 'chilli-anthracnose',
    crop: 'Chilli',
    diseaseName: 'Chilli Anthracnose / Die-back (Kommukullu)',
    relevantStages: ['Flowering', 'Reproductive / Grain Development', 'Maturity / Harvest Ready'],
    typicalRiskPeriod: 'Day 65 - 130 (Fruit setting to ripening)',
    riskLevel: 'Moderate',
    riskBadgeColor: 'bg-[#a67b27]/20 border-[#a67b27] text-[#f2cc81]',
    imageUrl: '/images/diseases/chilli_leaf_curl.jpg',
    icon: 'warning',

    whatYouMaySee: [
      'Circular sunken dark spots on ripe red fruits with black dot rings',
      'Branches drying from top downwards ("die-back")',
      'Premature fruit drop and rot in the field',
    ],
    riskPeriod: 'High humidity (>80%) with temperatures around 28°C during fruit ripening.',
    whyItHappens: 'Fungus (Colletotrichum capsici) enters ripe fruits through micro-cracks in rainy weather.',
    precautions: [
      'Harvest ripe fruits promptly; do not let over-ripe pods hang in rain',
      'Treat seed with Thiram @ 3g/kg before nursery raising',
      'Avoid flood irrigation during fruiting phase',
    ],
    cureAndManagement: [
      'Spray Azoxystrobin 23% SC @ 1ml per liter of water',
      'Or spray Difenoconazole 25% EC @ 0.5ml per liter',
    ],
    whenToSeekHelp: 'If fruit rot appears on green or ripening pods across multiple plots.',

    symptoms: ['Sunken water-soaked lesions on fruits', 'Top branch die-back'],
    primaryCause: 'Fungal pathogen (Colletotrichum capsici)',
    favorableConditions: 'High humidity, rain splashes during fruit ripening',
    treatment: 'Spray Azoxystrobin @ 1ml/L or Difenoconazole @ 0.5ml/L.',
    currentRiskPrediction: 'Moderate risk if rainy periods occur near harvest.',
    comesWhen: 'Warm rainy days during fruit ripening',
    shortPrecaution: 'Pick ripe fruits promptly & maintain drainage',
    shortCure: 'Spray Azoxystrobin @ 1ml per liter of water',
  },

  // ================= GROUNDNUT =================
  {
    id: 'groundnut-tikka',
    crop: 'Groundnut',
    diseaseName: 'Groundnut Tikka Leaf Spot (Tikka Tegulu)',
    relevantStages: ['Vegetative Stage', 'Flowering', 'Reproductive / Grain Development'],
    typicalRiskPeriod: 'Day 30 - 85 (Vegetative canopy to pod development)',
    riskLevel: 'Moderate',
    riskBadgeColor: 'bg-[#a67b27]/20 border-[#a67b27] text-[#f2cc81]',
    imageUrl: '/images/diseases/groundnut_tikka.jpg',
    icon: 'eco',

    whatYouMaySee: [
      'Early Tikka: Circular reddish-brown spots with prominent bright yellow halos',
      'Late Tikka: Dark brown to black circular spots without yellow halos on leaf underside',
      'Leaves dry up and drop off, leaving bare stems',
    ],
    riskPeriod: 'Prolonged cloudy weather with high humidity (>85%) and temperature 25°C-30°C.',
    whyItHappens: 'Fungi (Cercospora arachidicola & Phaeoisariopsis personata) spread via wind and rain splashes.',
    precautions: [
      'Treat seed with Mancozeb @ 3g per kg seed before planting',
      'Maintain crop rotation with Cereals (Maize/Sorghum)',
      'Apply balanced N-P-K and Gypsum at flowering',
    ],
    cureAndManagement: [
      'Spray Chlorothalonil 75% WP @ 2g per liter of water',
      'Or spray Hexaconazole 5% SC @ 2ml per liter of water',
      'Spray at initial onset of spots on lower leaves',
    ],
    whenToSeekHelp: 'If severe defoliation starts before pegging/pod filling is completed.',

    symptoms: ['Dark brown circular spots with bright yellow halos', 'Premature leaf shedding'],
    primaryCause: 'Fungal infection (Cercospora arachidicola)',
    favorableConditions: 'High humidity (>85%), warm temperature (25-30°C), cloudy days',
    treatment: 'Spray Chlorothalonil 75% WP @ 2g/L or Hexaconazole @ 2ml/L.',
    currentRiskPrediction: 'Moderate Risk during humid vegetative growth.',
    comesWhen: 'Warm humid weather (25-30°C) with cloudy skies',
    shortPrecaution: 'Treat seeds & maintain crop rotation',
    shortCure: 'Spray Chlorothalonil @ 2g per liter of water',
  },
  {
    id: 'groundnut-collar-rot',
    crop: 'Groundnut',
    diseaseName: 'Groundnut Collar Rot (Kandam Kullu)',
    relevantStages: ['Germination / Seedling', 'Vegetative Stage'],
    typicalRiskPeriod: 'Day 10 - 35 (Emergence and young seedling stage)',
    riskLevel: 'High',
    riskBadgeColor: 'bg-error-container border-error text-error',
    imageUrl: '/images/diseases/groundnut_tikka.jpg',
    icon: 'warning',

    whatYouMaySee: [
      'Dark brown rotting of stem collar at soil surface level',
      'Seedling wilting suddenly while leaves remain green',
      'White fungal cottony growth with black mustard-like spores at collar',
    ],
    riskPeriod: 'Warm moist soil (30°C-35°C) with deep sowing in heavy soils.',
    whyItHappens: 'Soil-borne fungus (Aspergillus niger) attacks tender seedlings under heat and moisture.',
    precautions: [
      'Do not sow seed deeper than 5cm in soil',
      'Treat seeds with Trichoderma viride @ 10g/kg or Captan @ 3g/kg',
      'Ensure field has good drainage and loose soil texture',
    ],
    cureAndManagement: [
      'Soil drench around infected hills with Carbendazim 50% WP @ 1g per liter of water',
      'Or drench with Copper Oxychloride @ 3g per liter',
    ],
    whenToSeekHelp: 'If seedling mortality exceeds 5% of plant stand in first 3 weeks.',

    symptoms: ['Rotting at soil line collar', 'Sudden seedling wilt'],
    primaryCause: 'Fungus (Aspergillus niger)',
    favorableConditions: 'Warm wet soil (30-35°C), deep sowing',
    treatment: 'Drench soil at stem base with Carbendazim @ 1g/L of water.',
    currentRiskPrediction: 'High risk in early seedling stage in wet soil.',
    comesWhen: 'Warm moist soil during first month after sowing',
    shortPrecaution: 'Sow at optimal depth & treat seeds with bio-agent',
    shortCure: 'Drench root zone with Carbendazim @ 1g/L',
  },

  // ================= MAIZE =================
  {
    id: 'maize-fall-armyworm',
    crop: 'Maize',
    diseaseName: 'Maize Fall Armyworm (Kathera Purugu)',
    relevantStages: ['Germination / Seedling', 'Vegetative Stage', 'Flowering'],
    typicalRiskPeriod: 'Day 10 - 60 (Knee-high to tasseling stage)',
    riskLevel: 'High',
    riskBadgeColor: 'bg-error-container border-error text-error',
    imageUrl: '/images/diseases/maize_armyworm.jpg',
    icon: 'bug_report',

    whatYouMaySee: [
      'Pin holes and large irregular "windowing" feeding holes on young leaves',
      'Abundant sawdust-like brownish fecal pellets inside the central plant whorl',
      'Larva with inverted "Y" mark on head and 4 square dots on tail segment',
    ],
    riskPeriod: 'Warm sunny days throughout seedling and knee-high growth phases.',
    whyItHappens: 'Spodoptera frugiperda caterpillar lays egg clusters covered in beige hair scales on leaves.',
    precautions: [
      'Deep plough field in summer to expose pupae to sun and predatory birds',
      'Apply sand + lime mixture (9:1) or wood ash into whorls at knee-high stage',
      'Install 5 FAW pheromone traps per acre',
    ],
    cureAndManagement: [
      'Early Stage (Day 1-20): Spray Bacillus thuringiensis (Bt) @ 2g/L or Azadirachtin 1500ppm @ 4ml/L',
      'Mid Stage (Day 20-50): Spray Chlorantraniliprole 18.5 SC @ 0.4ml/L directly into whorls',
      'Or apply Emamectin Benzoate 5% SG @ 0.4g per liter of water',
    ],
    whenToSeekHelp: 'If more than 10% of plants show central whorl destruction before tasseling.',

    symptoms: ['Window pane leaf damage', 'Sawdust frass in leaf whorls', 'Central shoot boring'],
    primaryCause: 'Invasive caterpillar pest (Spodoptera frugiperda)',
    favorableConditions: 'Warm temperatures (25-34°C) with continuous maize cropping',
    treatment: 'Spray Chlorantraniliprole 18.5 SC @ 0.4ml/L directed into central whorls.',
    currentRiskPrediction: 'High Risk from seedling to knee-high stages.',
    comesWhen: 'Warm weather during first 50 days of maize growth',
    shortPrecaution: 'Apply sand/ash into whorls & install pheromone traps',
    shortCure: 'Spray Chlorantraniliprole @ 0.4ml per liter into whorl',
  },
  {
    id: 'maize-turcicum-blight',
    crop: 'Maize',
    diseaseName: 'Maize Turcicum Leaf Blight (Aaku Endu Tegulu)',
    relevantStages: ['Vegetative Stage', 'Flowering', 'Reproductive / Grain Development'],
    typicalRiskPeriod: 'Day 35 - 80 (Vegetative grand growth to cob filling)',
    riskLevel: 'Moderate',
    riskBadgeColor: 'bg-[#a67b27]/20 border-[#a67b27] text-[#f2cc81]',
    imageUrl: '/images/diseases/maize_armyworm.jpg',
    icon: 'eco',

    whatYouMaySee: [
      'Large elliptical boat-shaped greyish-green lesions (5-15cm long) on lower leaves',
      'Lesions turn straw-colored with dark fungal sporulation in damp weather',
      'Extensive leaf drying reducing photosynthetic area of the cob',
    ],
    riskPeriod: 'Moderate temperatures (20°C-28°C) accompanied by high humidity (>80%) and dew.',
    whyItHappens: 'Fungus (Exserohilum turcicum) survives on crop residue and is wind-dispersed.',
    precautions: [
      'Use certified blight-tolerant hybrid seeds',
      'Practice balanced fertilizer application with adequate potash',
      'Destroy previous maize stubble before planting',
    ],
    cureAndManagement: [
      'Spray Mancozeb 75% WP @ 2.5g per liter of water',
      'Or spray Azoxystrobin + Difenoconazole @ 1ml per liter',
    ],
    whenToSeekHelp: 'If lesions spread to leaves above the ear cob prior to grain filling.',

    symptoms: ['Long boat-shaped grey-green lesions on leaves', 'Premature canopy drying'],
    primaryCause: 'Fungal pathogen (Exserohilum turcicum)',
    favorableConditions: 'Moderate temperature (20-28°C), high humidity, dew',
    treatment: 'Spray Mancozeb 75% WP @ 2.5g/L or Azoxystrobin @ 1ml/L.',
    currentRiskPrediction: 'Moderate risk in humid winter and post-monsoon maize.',
    comesWhen: 'Cooler humid weather with heavy morning dew',
    shortPrecaution: 'Use tolerant hybrids & maintain balanced potash',
    shortCure: 'Spray Mancozeb @ 2.5g per liter of water',
  },
];

export const DISEASE_DATABASE = EXPANDED_DISEASE_DATABASE;

/**
 * Filter diseases by crop name
 */
export function getDiseasesByCrop(crop: string): DiseaseInfo[] {
  return EXPANDED_DISEASE_DATABASE.filter(
    (d) => d.crop.toLowerCase() === crop.toLowerCase()
  );
}

/**
 * Filter diseases specifically relevant to the crop and current growth stage
 */
export function getDiseasesForStage(crop: string, stageName: GrowthStageName): DiseaseInfo[] {
  const cropList = getDiseasesByCrop(crop);
  const stageSpecific = cropList.filter((d) =>
    d.relevantStages.some((st) => st.toLowerCase() === stageName.toLowerCase())
  );
  return stageSpecific.length > 0 ? stageSpecific : cropList;
}

/**
 * Evaluates real-time environmental data to assess active disease risk
 */
export function assessStageDiseaseRisk(
  crop: string,
  stageName: GrowthStageName,
  temp: number,
  humidity: number
): { highRiskDiseases: DiseaseInfo[]; riskDescription: string } {
  const stageDiseases = getDiseasesForStage(crop, stageName);
  
  // Rule-based agronomic risk conditions
  const highRiskDiseases = stageDiseases.filter((d) => {
    if (d.diseaseName.includes('Blast') && (humidity >= 60 || temp < 24)) return true;
    if (d.diseaseName.includes('Brown Spot') && humidity >= 60) return true;
    if (d.diseaseName.includes('Bollworm') && (stageName.includes('Flowering') || stageName.includes('Reproductive'))) return true;
    if (d.diseaseName.includes('Leaf Curl') && temp >= 32) return true;
    if (d.diseaseName.includes('Armyworm') && (stageName.includes('Seedling') || stageName.includes('Vegetative'))) return true;
    if (d.diseaseName.includes('Tikka') && humidity >= 65) return true;
    return d.riskLevel === 'High';
  });

  const riskDescription =
    highRiskDiseases.length > 0
      ? `Current stage (${stageName}) and conditions (${temp}°C, ${humidity}% humidity) indicate elevated risk for ${highRiskDiseases.map((d) => d.diseaseName.split('(')[0].trim()).join(' and ')}.`
      : `No critical disease outbreak detected for ${crop} in ${stageName}.`;

  return { highRiskDiseases, riskDescription };
}
