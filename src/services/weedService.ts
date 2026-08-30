import { WeedInfo } from '../types/farm';

export const WEED_DATABASE: WeedInfo[] = [
  {
    id: 'weed-echinochloa',
    weedName: 'Echinochloa (Barnyard Grass)',
    crop: 'Paddy',
    startDay: 20,
    endDay: 50,
    imageUrl: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=600&q=80',
    identification: 'Resembles paddy seedlings; flat purplish stems at base',
    action: 'Pluck/remove manually before seed formation.',
    icon: 'grass',
    learnMoreText: 'Echinochloa crus-galli competes aggressively with paddy for nitrogen during early tillering (Days 20–35). Early hand weeding prevents up to 25% yield loss.',
  },
  {
    id: 'weed-cyperus',
    weedName: 'Cyperus rotundus (Nut Grass)',
    crop: 'Paddy',
    startDay: 15,
    endDay: 45,
    imageUrl: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=600&q=80',
    identification: 'Triangular stem with glossy dark green leaves and underground tubers',
    action: 'Uproot with tuber intact to prevent regrowth.',
    icon: 'spa',
    learnMoreText: 'Common in moist soil channels. Tubers survive in topsoil; spot removal or targeted precision spray prevents rapid underground spread.',
  },
  {
    id: 'weed-eclipta',
    weedName: 'Eclipta alba (Gunta Galagara)',
    crop: 'Paddy',
    startDay: 30,
    endDay: 60,
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    identification: 'Fleshy stems with small white daisy-like flower heads',
    action: 'Remove by hand during second weeding cycle.',
    icon: 'filter_vintage',
    learnMoreText: 'Thrives in waterlogged paddy fields. Hand weeding at 30-40 days ensures clean canopy growth.',
  },
  {
    id: 'weed-parthenium',
    weedName: 'Parthenium (Gajjelu)',
    crop: 'Cotton',
    startDay: 10,
    endDay: 40,
    imageUrl: 'https://images.unsplash.com/photo-1508873696983-2df5293cb395?auto=format&fit=crop&w=600&q=80',
    identification: 'Deeply lobed pale green leaves with small white flowers',
    action: 'Pull out before flowering while wearing protective gloves.',
    icon: 'warning',
    learnMoreText: 'Highly competitive invasive weed in cotton dryland plots. Inhibits cotton seedling germination.',
  },
];

export function getActiveWeedAlerts(crop: string, cropDay: number): WeedInfo[] {
  return WEED_DATABASE.filter(
    (w) => w.crop.toLowerCase() === crop.toLowerCase() && cropDay >= w.startDay && cropDay <= w.endDay
  );
}
