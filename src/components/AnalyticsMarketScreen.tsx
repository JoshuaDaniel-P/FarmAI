import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { INITIAL_MARKET_RATES, SUITABLE_CROP_SUGGESTIONS } from '../services/mockData';
import { t, translateCrop, translateName, translateText } from '../services/i18n';
import { LanguageSelectorModal } from './LanguageSelectorModal';

export const AnalyticsMarketScreen: React.FC = () => {
  const {
    farmer,
    cropHistory,
    addCropHistoryRecord,
    selectedLanguage,
    setSelectedLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
  } = useFarm();
  const [selectedCropMarket, setSelectedCropMarket] = useState<string>('Paddy (Grade A)');
  const [showLogModal, setShowLogModal] = useState<boolean>(false);

  const [newCropName, setNewCropName] = useState<string>('Paddy 2026');
  const [expectedTons, setExpectedTons] = useState<number>(5.0);
  const [actualTons, setActualTons] = useState<number>(4.4);
  const [lossReason, setLossReason] = useState<string>('Water Deficit & Heat Stress');

  const activeMarket = INITIAL_MARKET_RATES.find((m) => m.cropName === selectedCropMarket) || INITIAL_MARKET_RATES[0];
  const primaryHistory = cropHistory[0];

  const handleLogHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    const eff = Math.round((actualTons / expectedTons) * 100);
    const loss = +(expectedTons - actualTons).toFixed(1);

    addCropHistoryRecord({
      id: `ch-${Date.now()}`,
      yearLabel: newCropName,
      cropName: farmer.activeCrop,
      expectedYieldTons: expectedTons,
      actualYieldTons: actualTons,
      efficiencyPercent: eff,
      yieldLossFactors: [
        {
          factorName: lossReason,
          icon: 'water_drop',
          lossTons: loss,
          color: 'bg-error',
        },
      ],
    });

    setShowLogModal(false);
  };

  return (
    <div className="bg-background text-on-surface font-body-md text-body-md min-h-screen antialiased selection:bg-primary-container selection:text-on-primary-container flex flex-col pb-[90px] md:pb-8">
      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 bg-background flex flex-col justify-between px-margin-mobile pt-sm pb-xs w-full max-w-screen-xl mx-auto shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-surface-container-highest/40">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant bg-surface-container-high flex items-center justify-center">
              <img
                alt="Farmer Portrait"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrbFlHSeABxMdVbLrZ3je4FJ3-0tUoTPMzvpy8CTOvEr1KGXHjFuRaj29KENzaSz6vx7pz1qZ2bAc8HEALMJFgKPqAeWrUR1dUciNrpNyAKybA6nZGi4rGzsJTkpQ5VhngdA7-7gqNvMq9DRj5-nMRL9FRAN_hcZ5pv09xliGngIjaBmQ7R8-E--rpaO8W3E-SFN1hsX6oaB3aeudJqF-37Ot4kc7BOEcXzmFUinyDwl2mTdkY1Q9Q"
              />
            </div>
            <h1 className="font-headline-md text-headline-md-mobile text-primary dark:text-primary-fixed m-0">
              {t('goodMorning', selectedLanguage)}, {translateName(farmer.name, selectedLanguage)}
            </h1>
          </div>

          <div className="flex items-center gap-2">
            {/* TOP-RIGHT TRANSLATE PIN BUTTON */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center border border-primary/30 transition-all shadow-sm"
              title={t('selectLanguage', selectedLanguage)}
            >
              <span className="material-symbols-outlined text-[24px]">translate</span>
            </button>

            <button
              onClick={() => setShowLogModal(true)}
              className="px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm rounded-full flex items-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              {t('logHarvest', selectedLanguage)}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full max-w-screen-md mx-auto px-margin-mobile pt-md flex flex-col gap-md">
        {/* 1. Crop History Section */}
        <section className="flex flex-col gap-sm">
          <div className="flex justify-between items-center">
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
              {t('cropHistoryYield', selectedLanguage)}
            </h2>
          </div>

          <div className="bg-surface-container rounded-xl border border-surface-variant overflow-hidden relative shadow-lg">
            <div
              className="h-24 w-full relative bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuA6k_M6nwVNHiGoFviqFP_vCzWCtgf3XqLTl2_Wp_NszpgFZ-fh2h2z6pj7dGTpZKP5hD57am8egOhnNW86PrYRJOXY1M3DACkovUDYElGF54_DxbmlbDUvDQv4jhyZ-NwZ73gMhVWqhkJk-gIRos2sSqVJd74hVs0ABcHEhatTF8TxwDDjRAzRxD_HltOvDuJvkZFB4UqF6x2Mikc7Orx5_onHUsOIcjqw-J5P5PVHVOlPa5E3muYb')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container to-transparent"></div>
              <div className="absolute bottom-4 left-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  grass
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary">{primaryHistory.yearLabel}</h3>
              </div>
            </div>

            <div className="p-4 flex flex-col gap-md">
              <div className="grid grid-cols-3 gap-2">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    {t('expected', selectedLanguage)}
                  </span>
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">
                    {primaryHistory.expectedYieldTons}
                    <span className="text-lg text-on-surface-variant">{t('tonsUnit', selectedLanguage)}</span>
                  </span>
                </div>
                <div className="flex flex-col border-l border-surface-variant pl-4">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    {t('actual', selectedLanguage)}
                  </span>
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">
                    {primaryHistory.actualYieldTons}
                    <span className="text-lg text-on-surface-variant">{t('tonsUnit', selectedLanguage)}</span>
                  </span>
                </div>
                <div className="flex flex-col border-l border-surface-variant pl-4">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    {t('efficiency', selectedLanguage)}
                  </span>
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary mt-1">
                    {primaryHistory.efficiencyPercent}
                    <span className="text-lg text-primary">%</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-4 border-t border-surface-variant/50">
                <h4 className="font-label-lg text-label-lg text-on-surface-variant">
                  {t('yieldLossFactors', selectedLanguage)} ({(primaryHistory.expectedYieldTons - primaryHistory.actualYieldTons).toFixed(1)}{t('tonsUnit', selectedLanguage)})
                </h4>
                <div className="flex flex-col gap-2">
                  {primaryHistory.yieldLossFactors.map((factor, idx) => (
                    <div key={idx} className="flex flex-col gap-1">
                      <div className="flex justify-between text-body-sm text-on-surface">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-error text-[18px]">{factor.icon}</span>
                          {translateText(factor.factorName, selectedLanguage)}
                        </span>
                        <span className="font-bold text-on-surface">
                          {factor.lossTons}{t('tonsUnit', selectedLanguage)}
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-surface-container-highest rounded-full overflow-hidden">
                        <div
                          className={`h-full ${factor.color} rounded-full`}
                          style={{
                            width: `${Math.min(
                              100,
                              Math.round(
                                (factor.lossTons / (primaryHistory.expectedYieldTons - primaryHistory.actualYieldTons)) * 100
                              )
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. Market Price Section */}
        <section className="flex flex-col gap-sm">
          <div className="flex justify-between items-center">
            <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
              {t('marketPriceTrends', selectedLanguage)}
            </h2>
            <select
              value={selectedCropMarket}
              onChange={(e) => setSelectedCropMarket(e.target.value)}
              className="bg-surface-container border border-surface-variant text-on-surface text-label-sm rounded-lg px-2 py-1 focus:outline-none"
            >
              {INITIAL_MARKET_RATES.map((m) => (
                <option key={m.cropName} value={m.cropName}>
                  {translateText(m.cropName, selectedLanguage)}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-surface-container rounded-xl border border-surface-variant p-4 flex flex-col gap-4 shadow-lg">
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
                  <span className="font-label-lg text-label-lg text-on-surface">{translateText(activeMarket.cropName, selectedLanguage)} {t('rate', selectedLanguage)}</span>
                </div>
                <span className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface mt-1">
                  ₹{activeMarket.currentRate.toLocaleString('en-IN')}{' '}
                  <span className="font-body-md text-body-md text-on-surface-variant font-normal">/ {t('unitQtl', selectedLanguage)}</span>
                </span>
              </div>
              <div className="bg-primary-container/30 px-3 py-1 rounded-full border border-primary/20">
                <span className="font-label-sm text-label-sm text-primary">
                  {activeMarket.changePercent >= 0 ? `+${activeMarket.changePercent}%` : `${activeMarket.changePercent}%`}
                </span>
              </div>
            </div>

            <div className="h-32 w-full mt-2 relative">
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="w-full border-t border-surface-variant/30"></div>
                <div className="w-full border-t border-surface-variant/30"></div>
                <div className="w-full border-t border-surface-variant/30"></div>
              </div>

              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 40">
                <path
                  d="M0,35 C10,30 20,38 30,25 C40,12 50,20 60,15 C70,10 80,18 90,5 L100,0 L100,40 L0,40 Z"
                  fill="url(#chart-gradient)"
                  opacity="0.2"
                ></path>
                <path
                  d="M0,35 C10,30 20,38 30,25 C40,12 50,20 60,15 C70,10 80,18 90,5 L100,0"
                  fill="none"
                  stroke="#90d792"
                  strokeLinecap="round"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                ></path>
                <defs>
                  <linearGradient id="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#90d792"></stop>
                    <stop offset="100%" stopColor="#1b110f" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
              </svg>

              <div className="absolute -bottom-6 w-full flex justify-between px-1">
                {activeMarket.historicalData.map((d, i) => (
                  <span key={i} className="font-label-sm text-label-sm text-on-surface-variant text-[10px]">
                    {d.label === 'Jun' ? t('monthJun', selectedLanguage) : d.label === 'Jul' ? t('monthJul', selectedLanguage) : d.label === 'Aug' ? t('monthAug', selectedLanguage) : t('monthSep', selectedLanguage)} (₹{d.rate})
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-4"></div>
          </div>
        </section>

        {/* 3. Suitable Suggestions Section */}
        <section className="flex flex-col gap-sm">
          <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
            {t('suitableSuggestions', selectedLanguage)}
          </h2>

          <div className="flex flex-col gap-3">
            {SUITABLE_CROP_SUGGESTIONS.map((suggestion, idx) => (
              <div key={idx} className="bg-surface-container rounded-xl p-4 border border-surface-variant flex items-center justify-between shadow-md">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface-container-highest flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-[24px]">{suggestion.icon}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">{translateCrop(suggestion.cropName, selectedLanguage)}</span>
                    <span className="font-body-md text-body-md text-on-surface-variant">{translateText(suggestion.reason, selectedLanguage)}</span>
                  </div>
                </div>
                <div className="bg-primary/20 border border-primary px-3 py-1 rounded-full flex items-center gap-1 shrink-0 ml-2">
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                  <span className="font-label-sm text-label-sm text-primary">
                    {suggestion.suitability === 'High' ? t('highSuitability', selectedLanguage) : t('modSuitability', selectedLanguage)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Log Harvest Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4">
          <form onSubmit={handleLogHarvest} className="bg-surface-container border border-surface-variant p-md rounded-2xl max-w-md w-full space-y-4">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">{t('logHarvest', selectedLanguage)}</h3>

            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1">{t('seasonCropName', selectedLanguage)}</label>
              <input
                type="text"
                value={newCropName}
                onChange={(e) => setNewCropName(e.target.value)}
                className="w-full bg-surface border border-surface-variant rounded-lg p-2 text-on-surface"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1">{t('expected', selectedLanguage)} ({t('tonsUnit', selectedLanguage)})</label>
                <input
                  type="number"
                  step="0.1"
                  value={expectedTons}
                  onChange={(e) => setExpectedTons(parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-surface-variant rounded-lg p-2 text-on-surface"
                />
              </div>
              <div>
                <label className="block text-label-sm text-on-surface-variant mb-1">{t('actual', selectedLanguage)} ({t('tonsUnit', selectedLanguage)})</label>
                <input
                  type="number"
                  step="0.1"
                  value={actualTons}
                  onChange={(e) => setActualTons(parseFloat(e.target.value) || 0)}
                  className="w-full bg-surface border border-surface-variant rounded-lg p-2 text-on-surface"
                />
              </div>
            </div>

            <div>
              <label className="block text-label-sm text-on-surface-variant mb-1">{t('lossReasonLabel', selectedLanguage)}</label>
              <input
                type="text"
                value={lossReason}
                onChange={(e) => setLossReason(e.target.value)}
                className="w-full bg-surface border border-surface-variant rounded-lg p-2 text-on-surface"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLogModal(false)}
                className="px-4 py-2 bg-surface-variant text-on-surface rounded-lg"
              >
                {t('cancel', selectedLanguage)}
              </button>
              <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-bold rounded-lg">
                {t('save', selectedLanguage)}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Language Selector Modal */}
      <LanguageSelectorModal
        isOpen={isLanguageModalOpen}
        onClose={() => setIsLanguageModalOpen(false)}
        currentLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
      />
    </div>
  );
};
