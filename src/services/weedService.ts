import { GrowthStageName, WeedInfo } from '../types/farm';
import { diseaseImage } from './diseaseService';

export const EXPANDED_WEED_DATABASE: WeedInfo[] = [
  // ================= PADDY =================
  {
    id: 'weed-echinochloa',
    weedName: 'Echinochloa (Barnyard Grass / Oodha Gaddi)',
    crop: 'Paddy',
    startDay: 15,
    endDay: 45,
    growthStage: 'Vegetative Stage',
    appearancePeriod: '15 - 45 days (Active vegetative tillering)',
    identification: 'Resembles young paddy tillers but lacks ligules and auricles at the leaf collar.',
    removalMethod: 'Hand weeding or cono-weeder before flowering and seed setting.',
    managementMethod: 'Spray Bispyribac-sodium 10% SC @ 80ml/acre in 150L water when weed has 2-3 leaves.',
    action: 'Inspect field and pluck out manually before seed formation.',
    icon: 'grass',
    imageUrl: diseaseImage('paddy_brown_spot.jpg'),
    learnMoreText: 'Produces over 2,000 seeds per plant; seeds shatter into mud if not weeded early.',
  },
  {
    id: 'weed-cyperus-difformis',
    weedName: 'Cyperus difformis (Small-flowered Umbrella Sedge / Thunga Gaddi)',
    crop: 'Paddy',
    startDay: 20,
    endDay: 50,
    growthStage: 'Vegetative Stage',
    appearancePeriod: '20 - 50 days (Transplanted and direct-seeded flooded fields)',
    identification: 'Triangular smooth stems with dense compact umbrella-shaped yellowish-brown seed heads.',
    removalMethod: 'Manual uprooting along with root bulb during rotary weeding.',
    managementMethod: 'Spray Metsulfuron-methyl + Chlorimuron-ethyl (Almix) @ 8g/acre at 20-25 days after transplanting.',
    action: 'Apply recommended post-emergence herbicide with thin water layer.',
    icon: 'spa',
    imageUrl: diseaseImage('paddy_blast.jpg'),
    learnMoreText: 'Dominant sedge in standing water; competes vigorously for nitrogen and root space.',
  },
  {
    id: 'weed-eclipta',
    weedName: 'Eclipta alba (False Daisy / Gunta Kalagara)',
    crop: 'Paddy',
    startDay: 25,
    endDay: 60,
    growthStage: 'Vegetative Stage',
    appearancePeriod: '25 - 60 days (Water channels and saturated field bunds)',
    identification: 'Erect or prostrate branched herb with dark green leaves and small white daisy-like flower heads.',
    removalMethod: 'Pluck by hand from water channels and bunds to prevent seed entry into plots.',
    managementMethod: 'Spray 2,4-D Ethyl Ester @ 1.0 kg/acre on field bunds and drainage paths.',
    action: 'Clear bunds and water inlets to block seed dispersal.',
    icon: 'filter_vintage',
    imageUrl: diseaseImage('paddy_brown_spot.jpg'),
    learnMoreText: 'Common broadleaf weed that harbors insect pests and restricts drainage flow.',
  },

  // ================= COTTON =================
  {
    id: 'weed-trianthema',
    weedName: 'Trianthema portulacastrum (Horse Purslane / Erragaalijeru)',
    crop: 'Cotton',
    startDay: 10,
    endDay: 40,
    growthStage: 'Vegetative Stage',
    appearancePeriod: '10 - 40 days (Early seedling to square development)',
    identification: 'Succulent spreading weed with reddish prostrate stems and rounded oval green leaves.',
    removalMethod: 'Early inter-cultivation using bullock/tractor drawn blade harrows (Danti).',
    managementMethod: 'Spray Quizalofop-ethyl 5% EC @ 300-400ml/acre for mixed grass and broadleaf control.',
    action: 'Inter-cultivate between rows before the canopy closes.',
    icon: 'grass',
    imageUrl: diseaseImage('cotton_alternaria.jpg'),
    learnMoreText: 'Fast-spreading broadleaf weed that smothers young cotton seedlings within 3 weeks.',
  },
  {
    id: 'weed-cyperus-rotundus-cotton',
    weedName: 'Cyperus rotundus (Nut Grass / Thunga Mustha)',
    crop: 'Cotton',
    startDay: 5,
    endDay: 55,
    growthStage: 'Vegetative Stage',
    appearancePeriod: '5 - 55 days (Germination to square initiation)',
    identification: 'Dark green slender triangular grass leaves with dark subterranean underground tubers.',
    removalMethod: 'Deep summer ploughing to expose tubers; hand digging with sharp trowel.',
    managementMethod: 'Spot application of Glyphosate 41% SL using protective hood between rows.',
    action: 'Dig out underground tubers during dry weeding.',
    icon: 'grass',
    imageUrl: diseaseImage('cotton_bollworm.jpg'),
    learnMoreText: 'Tubers remain dormant underground for years; requires persistent deep summer cultivation.',
  },

  // ================= CHILLI =================
  {
    id: 'weed-amaranthus',
    weedName: 'Amaranthus viridis (Slender Amaranth / Chilaka Thotakura)',
    crop: 'Chilli',
    startDay: 15,
    endDay: 45,
    growthStage: 'Vegetative Stage',
    appearancePeriod: '15 - 45 days (Post-transplantation establishment)',
    identification: 'Erect green herb with long terminal and axillary green flower spikes.',
    removalMethod: 'Hand weeding around drip irrigation lines and hill bases.',
    managementMethod: 'Pre-emergence application of Pendimethalin 30% EC @ 1.0 L/acre within 3 days of transplanting.',
    action: 'Hand weed around chilli roots before fertilizer application.',
    icon: 'eco',
    imageUrl: diseaseImage('chilli_leaf_curl.jpg'),
    learnMoreText: 'Rapid consumer of applied nitrogen and host for thrips and aphids.',
  },

  // ================= GROUNDNUT =================
  {
    id: 'weed-digitaria',
    weedName: 'Digitaria sanguinalis (Crab Grass / Chinna Oodha)',
    crop: 'Groundnut',
    startDay: 12,
    endDay: 40,
    growthStage: 'Vegetative Stage',
    appearancePeriod: '12 - 40 days (Prior to peg formation)',
    identification: 'Decumbent annual grass rooting at nodes with finger-like branching seed heads.',
    removalMethod: 'Mechanical inter-cultivation before pegging stage starts (Day 40).',
    managementMethod: 'Spray Imazethapyr 10% SL @ 300ml/acre at 15-20 days after sowing.',
    action: 'Complete all weeding before pegging stage to avoid damaging underground pods.',
    icon: 'grass',
    imageUrl: diseaseImage('groundnut_tikka.jpg'),
    learnMoreText: 'Must be controlled before Day 40, as weeding after pegging severely tears developing pods.',
  },

  // ================= MAIZE =================
  {
    id: 'weed-parthenium',
    weedName: 'Parthenium hysterophorus (Carrot Grass / Vayyari Bhaama)',
    crop: 'Maize',
    startDay: 10,
    endDay: 50,
    growthStage: 'Vegetative Stage',
    appearancePeriod: '10 - 50 days (Seedling to knee-high growth)',
    identification: 'Deeply lobed leaves with tiny white flower heads and hairy grooved stems.',
    removalMethod: 'Hand plucking wearing gloves before flowering.',
    managementMethod: 'Spray Atrazine 50% WP @ 500g/acre within 2 days of sowing (Pre-emergence).',
    action: 'Apply pre-emergence herbicide or hand weed before tassel emergence.',
    icon: 'local_florist',
    imageUrl: diseaseImage('maize_armyworm.jpg'),
    learnMoreText: 'Invasive allelopathic weed that inhibits maize root development and pollen fertility.',
  },
];

export const WEED_DATABASE = EXPANDED_WEED_DATABASE;

/**
 * Returns active weed alerts ONLY if current crop day falls within the weed's appearance period
 */
export function getActiveWeedAlerts(crop: string, currentCropDay: number): WeedInfo[] {
  return EXPANDED_WEED_DATABASE.filter(
    (w) =>
      w.crop.toLowerCase() === crop.toLowerCase() &&
      currentCropDay >= w.startDay &&
      currentCropDay <= w.endDay
  );
}

/**
 * Returns all reference weeds for a specific crop (including past/future stages)
 */
export function getAllWeedsForCrop(crop: string): WeedInfo[] {
  return EXPANDED_WEED_DATABASE.filter(
    (w) => w.crop.toLowerCase() === crop.toLowerCase()
  );
}
