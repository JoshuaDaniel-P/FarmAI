import { CropGrowthStage, GrowthStageName } from '../types/farm';

export interface CropStageDefinition {
  crop: string;
  totalDurationDays: number;
  stages: CropGrowthStage[];
}

export const CROP_STAGE_DEFINITIONS: Record<string, CropStageDefinition> = {
  paddy: {
    crop: 'Paddy',
    totalDurationDays: 125,
    stages: [
      {
        stageName: 'Germination / Seedling',
        startDay: 1,
        endDay: 20,
        description: 'Nursery establishment and young seedling transplantation.',
        keyCareTips: [
          'Maintain thin 2cm water film in nursery bed',
          'Protect from thrips and root rots',
          'Transplant healthy 21-day seedlings with 2-3 seedlings per hill',
        ],
      },
      {
        stageName: 'Vegetative Stage',
        startDay: 21,
        endDay: 60,
        description: 'Active tillering and root spread. High water and nitrogen demand.',
        keyCareTips: [
          'Apply first top-dressing of Urea and Potash around Day 25-30',
          'Maintain 3-5cm standing water in the main field',
          'Inspect for early stem borer and leaf folder pests',
        ],
      },
      {
        stageName: 'Flowering',
        startDay: 61,
        endDay: 85,
        description: 'Panicle initiation, flag leaf expansion, and active flowering.',
        keyCareTips: [
          'Critical moisture period; do not let field dry out',
          'Avoid heavy chemical spraying during peak morning pollination (9 AM - 11 AM)',
          'Watch for neck blast and sheath blight',
        ],
      },
      {
        stageName: 'Reproductive / Grain Development',
        startDay: 86,
        endDay: 110,
        description: 'Milky to dough stage as grains fill and mature.',
        keyCareTips: [
          'Maintain alternate wetting and drying (AWD) to strengthen root anchorage',
          'Protect panicles from earhead bugs and false smut',
        ],
      },
      {
        stageName: 'Maturity / Harvest Ready',
        startDay: 111,
        endDay: 135,
        description: 'Grains turn golden yellow; moisture drops to harvest levels.',
        keyCareTips: [
          'Drain field water completely 10-14 days before harvest',
          'Harvest when 85% of panicles turn straw yellow',
          'Sun dry harvested paddy to 14% moisture before storage',
        ],
      },
    ],
  },
  cotton: {
    crop: 'Cotton',
    totalDurationDays: 160,
    stages: [
      {
        stageName: 'Germination / Seedling',
        startDay: 1,
        endDay: 25,
        description: 'Seed emergence, cotyledon opening, and first true leaves.',
        keyCareTips: ['Thin seedlings to 1 per hill by Day 15', 'Protect from sucking pests with yellow sticky traps'],
      },
      {
        stageName: 'Vegetative Stage',
        startDay: 26,
        endDay: 55,
        description: 'Monopodial branching, square formation, and deep taproot penetration.',
        keyCareTips: ['Apply nitrogen in split doses', 'Inter-cultivate to eliminate weeds and improve aeration'],
      },
      {
        stageName: 'Flowering',
        startDay: 56,
        endDay: 90,
        description: 'Peak blooming with creamy white/pink flowers and young boll setting.',
        keyCareTips: ['Crucial water window; prevent moisture stress', 'Install pheromone traps for pink bollworm'],
      },
      {
        stageName: 'Reproductive / Grain Development',
        startDay: 91,
        endDay: 135,
        description: 'Boll enlargement, fiber maturation, and lint formation.',
        keyCareTips: ['Spray 1% Potassium Nitrate (13-0-45) for uniform boll development', 'Check for boll rot'],
      },
      {
        stageName: 'Maturity / Harvest Ready',
        startDay: 136,
        endDay: 170,
        description: 'Bolls burst open exposing clean fluffy white cotton fiber.',
        keyCareTips: ['Pick dry cotton in bright sunshine after morning dew evaporates', 'Store in dry sheds'],
      },
    ],
  },
  chilli: {
    crop: 'Chilli',
    totalDurationDays: 150,
    stages: [
      {
        stageName: 'Germination / Seedling',
        startDay: 1,
        endDay: 30,
        description: 'Nursery seedling stage and hardening before field planting.',
        keyCareTips: ['Drench nursery with Trichoderma to avoid damping off', 'Transplant at 45-60cm spacing'],
      },
      {
        stageName: 'Vegetative Stage',
        startDay: 31,
        endDay: 60,
        description: 'Bushy branch canopy formation and root establishment.',
        keyCareTips: ['Apply balanced fertilizer dose', 'Install blue & yellow sticky traps for thrips & whiteflies'],
      },
      {
        stageName: 'Flowering',
        startDay: 61,
        endDay: 90,
        description: 'Intense flowering and green fruit setting.',
        keyCareTips: ['Maintain consistent soil moisture to prevent blossom drop', 'Spray micronutrient mixture'],
      },
      {
        stageName: 'Reproductive / Grain Development',
        startDay: 91,
        endDay: 125,
        description: 'Fruit elongation and ripening to deep crimson red.',
        keyCareTips: ['Inspect for anthracnose/fruit rot', 'Harvest green chillies selectively if required'],
      },
      {
        stageName: 'Maturity / Harvest Ready',
        startDay: 126,
        endDay: 160,
        description: 'Pods turn bright red and reach full pungency and capsaicin content.',
        keyCareTips: ['Harvest fully ripe red pods', 'Dry on clean polythene tarpaulins under direct sun'],
      },
    ],
  },
  groundnut: {
    crop: 'Groundnut',
    totalDurationDays: 110,
    stages: [
      {
        stageName: 'Germination / Seedling',
        startDay: 1,
        endDay: 20,
        description: 'Seed emergence and cotyledon development.',
        keyCareTips: ['Ensure loose soil bed for easy taproot penetration', 'Treat seed with Rhizobium culture'],
      },
      {
        stageName: 'Vegetative Stage',
        startDay: 21,
        endDay: 40,
        description: 'Canopy growth and branch spreading.',
        keyCareTips: ['Keep soil loose and weed-free', 'Apply Gypsum @ 200kg/acre around Day 35-40'],
      },
      {
        stageName: 'Flowering',
        startDay: 41,
        endDay: 65,
        description: 'Yellow flower blooms and peg initiation.',
        keyCareTips: ['Do NOT disturb soil during pegging', 'Ensure adequate soil moisture for peg penetration'],
      },
      {
        stageName: 'Reproductive / Grain Development',
        startDay: 66,
        endDay: 95,
        description: 'Pod filling underground and kernel development.',
        keyCareTips: ['Critical moisture window', 'Check for Tikka leaf spot and collar rot'],
      },
      {
        stageName: 'Maturity / Harvest Ready',
        startDay: 96,
        endDay: 115,
        description: 'Leaves yellow and inner shell of pods shows dark brown/black veins.',
        keyCareTips: ['Irrigate lightly before pulling vines to avoid pods breaking underground', 'Dry pods in sun'],
      },
    ],
  },
  maize: {
    crop: 'Maize',
    totalDurationDays: 105,
    stages: [
      {
        stageName: 'Germination / Seedling',
        startDay: 1,
        endDay: 18,
        description: 'Seed coleoptile emergence and knee-high seedling growth.',
        keyCareTips: ['Protect whorls from early Fall Armyworm (FAW) egg masses', 'Thin to single plant per station'],
      },
      {
        stageName: 'Vegetative Stage',
        startDay: 19,
        endDay: 45,
        description: 'Knee-high to grand growth stage; rapid stem and leaf area expansion.',
        keyCareTips: ['Top dress nitrogen before earthing up', 'Apply bio-pesticide if FAW windowing is seen'],
      },
      {
        stageName: 'Flowering',
        startDay: 46,
        endDay: 65,
        description: 'Tasseling (male flower) and silking (female flower emergence).',
        keyCareTips: ['Extremely moisture sensitive period; prevent drought', 'Ensure good pollen shed'],
      },
      {
        stageName: 'Reproductive / Grain Development',
        startDay: 66,
        endDay: 90,
        description: 'Cob elongation, milk to dough stage kernel formation.',
        keyCareTips: ['Maintain adequate soil moisture', 'Monitor for cob rot and bird damage'],
      },
      {
        stageName: 'Maturity / Harvest Ready',
        startDay: 91,
        endDay: 110,
        description: 'Cob husks turn dry paper-white; black layer forms at kernel base.',
        keyCareTips: ['Harvest cobs when husk turns dry', 'De-husk and dry cobs to 12% kernel moisture'],
      },
    ],
  },
};

/**
 * Calculates accurate crop age in days based on sowing date
 */
export function calculateCropAgeDays(sowingDateStr: string): number {
  if (!sowingDateStr) return 1;
  const sowing = new Date(sowingDateStr);
  const now = new Date('2026-08-30'); // System reference date
  const diffTime = Math.abs(now.getTime() - sowing.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(1, diffDays);
}

/**
 * Retrieves the exact growth stage object for a given crop and age
 */
export function getGrowthStageForCrop(cropName: string, ageDays: number): CropGrowthStage {
  const key = cropName.toLowerCase();
  const def = CROP_STAGE_DEFINITIONS[key] || CROP_STAGE_DEFINITIONS['paddy'];
  const matched = def.stages.find((s) => ageDays >= s.startDay && ageDays <= s.endDay);
  if (matched) return matched;
  if (ageDays > def.totalDurationDays) return def.stages[def.stages.length - 1];
  return def.stages[0];
}
