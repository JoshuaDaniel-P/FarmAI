import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { EXPANDED_MARKET_RATES, NEARBY_SELLING_MARKETS } from '../services/marketService';
import { NEARBY_FERTILIZER_SHOPS } from '../services/agriShopsService';
import { t, translateCrop, translateName, translateText } from '../services/i18n';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { FieldSwitcher } from './FieldSwitcher';

export const AnalyticsMarketScreen: React.FC = () => {
  const {
    farmer,
    activeField,
    cropHistory,
    addCropHistoryRecord,
    selectedLanguage,
    setSelectedLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
  } = useFarm();

  const [activeSubTab, setActiveSubTab] = useState<'markets' | 'history' | 'selling_mandis' | 'fertilizer_shops'>('markets');
  const [selectedCropMarket, setSelectedCropMarket] = useState<string>(EXPANDED_MARKET_RATES[0].cropName);
  const [showLogModal, setShowLogModal] = useState<boolean>(false);

  // New Harvest Log Form State
  const [newCropName, setNewCropName] = useState<string>(`${activeField.activeCrop} 2026`);
  const [expectedTons, setExpectedTons] = useState<number>(5.0);
  const [actualTons, setActualTons] = useState<number>(4.4);
  const [lossReason, setLossReason] = useState<string>('Water Deficit & Heat Stress');

  const activeMarket = EXPANDED_MARKET_RATES.find((m) => m.cropName === selectedCropMarket) || EXPANDED_MARKET_RATES[0];
  const primaryHistory = activeField.previousCropHistory[0] || cropHistory[0];

  const handleLogHarvest = (e: React.FormEvent) => {
    e.preventDefault();
    const eff = Math.round((actualTons / expectedTons) * 100);
    const loss = +(expectedTons - actualTons).toFixed(1);

    addCropHistoryRecord({
      id: `ch-${Date.now()}`,
      fieldId: activeField.id,
      yearLabel: newCropName,
      cropName: activeField.activeCrop,
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
    <div className="bg-background text-on-surface font-body-md min-h-screen antialiased flex flex-col pb-[90px] md:pb-8">
      {/* Analytics & Markets Actions Bar with comfortable vertical spacing below AGROAURA header */}
      <div className="w-full max-w-screen-xl mx-auto px-margin-mobile md:px-margin-desktop pt-4 md:pt-6 pb-2">
        <div className="flex items-center justify-between w-full min-h-[48px] gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <FieldSwitcher />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {activeSubTab === 'history' && (
              <button
                onClick={() => setShowLogModal(true)}
                className="px-3.5 py-2 bg-primary text-on-primary font-bold text-xs rounded-full flex items-center gap-1 shadow-sm hover:bg-primary-fixed transition-all"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                <span>{t('logHarvest', selectedLanguage) || 'Log Harvest'}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Canvas */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-margin-mobile md:px-margin-desktop py-md flex flex-col gap-md">
        {/* Navigation Sub-Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface-container p-1.5 rounded-2xl border border-surface-variant">
          <button
            onClick={() => setActiveSubTab('markets')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeSubTab === 'markets'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">trending_up</span>
            <span>{t('mandiRates', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('selling_mandis')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeSubTab === 'selling_mandis'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">storefront</span>
            <span>{t('nearbyMandis', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('fertilizer_shops')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeSubTab === 'fertilizer_shops'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">local_shipping</span>
            <span>{t('agriStores', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setActiveSubTab('history')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeSubTab === 'history'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">history</span>
            <span>{t('yieldHistory', selectedLanguage)}</span>
          </button>
        </div>

        {/* TAB 1: MANDI MARKET RATES (Requirements 20) */}
        {activeSubTab === 'markets' && (
          <div className="flex flex-col gap-md">
            {/* Commodity Selector Chips */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {EXPANDED_MARKET_RATES.map((m) => (
                <button
                  key={m.cropName}
                  onClick={() => setSelectedCropMarket(m.cropName)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    selectedCropMarket === m.cropName
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container text-on-surface-variant border border-surface-variant hover:border-primary/40'
                  }`}
                >
                  <span>{translateCrop(m.cropName.split('(')[0], selectedLanguage)}</span>
                  <span className={`text-[10px] ${m.changePercent >= 0 ? 'text-primary-fixed' : 'text-error'}`}>
                    {m.changePercent >= 0 ? `+${m.changePercent}%` : `${m.changePercent}%`}
                  </span>
                </button>
              ))}
            </div>

            {/* Active Market Spotlight Card */}
            <div className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col gap-md shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-bold text-primary uppercase tracking-wider">
                    {translateName(activeMarket.mandiLocation, selectedLanguage)}
                  </span>
                  <h3 className="font-headline-sm text-lg font-bold text-on-surface mt-0.5">{translateCrop(activeMarket.cropName, selectedLanguage)}</h3>
                  <span className="text-[11px] text-on-surface-variant">{t('lastUpdated', selectedLanguage)}: {translateText(activeMarket.lastUpdated, selectedLanguage)}</span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-bold text-primary font-headline-lg">
                    ₹{activeMarket.currentRate.toLocaleString()}
                  </span>
                  <span className="text-xs text-on-surface-variant font-bold">/ {translateText(activeMarket.unit, selectedLanguage)}</span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      activeMarket.changePercent >= 0
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-error-container/30 text-error border border-error/40'
                    }`}
                  >
                    {activeMarket.changePercent >= 0 ? `+${activeMarket.changePercent}%` : `${activeMarket.changePercent}%`}
                  </span>
                </div>
              </div>

              {/* Price Trend Chart Bar Simulation */}
              <div className="flex flex-col gap-2 pt-2 border-t border-surface-variant/40">
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                  {t('apmcPriceTrend', selectedLanguage)}
                </span>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {activeMarket.historicalData.map((h, i) => (
                    <div key={i} className="p-3 rounded-xl bg-surface-variant/70 border border-outline-variant/30 flex flex-col items-center">
                      <span className="text-[11px] text-on-surface-variant font-bold">{translateText(h.label, selectedLanguage)}</span>
                      <span className="text-sm font-bold text-on-surface my-1">₹{h.rate.toLocaleString()}</span>
                      <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-primary h-full rounded-full"
                          style={{ width: `${Math.min(100, Math.max(20, (h.rate / (activeMarket.currentRate * 1.1)) * 100))}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* All Mandi Prices Table */}
            <div className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col gap-sm">
              <h4 className="font-bold text-xs text-on-surface-variant uppercase tracking-wider">
                {t('regionalApmcRates', selectedLanguage)}
              </h4>
              <div className="flex flex-col divide-y divide-surface-variant/40">
                {EXPANDED_MARKET_RATES.map((m) => (
                  <div key={m.cropName} className="py-2.5 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-bold text-on-surface">{translateCrop(m.cropName, selectedLanguage)}</div>
                      <div className="text-[11px] text-on-surface-variant">{translateName(m.mandiLocation, selectedLanguage)}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">₹{m.currentRate.toLocaleString()} / {translateText(m.unit, selectedLanguage)}</div>
                      <div className={`text-[10px] font-semibold ${m.changePercent >= 0 ? 'text-primary' : 'text-error'}`}>
                        {m.changePercent >= 0 ? `+${m.changePercent}%` : `${m.changePercent}%`}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: NEARBY SELLING MANDIS (Requirement 19) */}
        {activeSubTab === 'selling_mandis' && (
          <div className="flex flex-col gap-md">
            <div className="p-md rounded-2xl bg-primary-container/20 border border-primary/30 flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-primary">storefront</span>
              <div>
                <h3 className="font-bold text-sm text-on-surface">{t('whereCanISell', selectedLanguage)}</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {translateText('Verified APMC procurement centers & grain yards accepting', selectedLanguage)} {translateCrop(activeField.activeCrop, selectedLanguage)} {translateText('near', selectedLanguage)} {translateName(farmer.district, selectedLanguage)}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {NEARBY_SELLING_MARKETS.map((mkt) => (
                <div key={mkt.id} className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col justify-between gap-md shadow-sm">
                  <div className="flex flex-col gap-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-on-surface">{translateName(mkt.name, selectedLanguage)}</h4>
                        <span className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-xs text-primary">pin_drop</span>
                          <span>{translateName(mkt.location, selectedLanguage)}</span>
                        </span>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20 shrink-0">
                        {mkt.distanceKm} {t('kmAway', selectedLanguage)}
                      </span>
                    </div>

                    <div className="text-xs text-on-surface-variant">
                      <span className="font-bold text-on-surface">{t('tradedCommodities', selectedLanguage)}:</span> {mkt.tradedCrops.map((c) => translateCrop(c, selectedLanguage)).join(', ')}
                    </div>

                    {/* Spot Prices */}
                    <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-variant/40 space-y-1">
                      <span className="text-[10px] font-bold text-on-surface-variant uppercase tracking-wider">{t('currentYardPrices', selectedLanguage)}:</span>
                      {mkt.currentRatesSummary.map((r, i) => (
                        <div key={i} className="flex justify-between text-xs font-semibold">
                          <span className="text-on-surface">{translateCrop(r.crop, selectedLanguage)}</span>
                          <span className="text-primary font-bold">₹{r.rate.toLocaleString()} / {translateText(r.unit, selectedLanguage)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(mkt.name + ' ' + mkt.location)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2 rounded-xl bg-surface-variant hover:bg-primary hover:text-on-primary text-on-surface font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">directions</span>
                    <span>{t('getDrivingDirections', selectedLanguage)}</span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: NEARBY FERTILIZER & AGRI SHOPS (Requirement 18) */}
        {activeSubTab === 'fertilizer_shops' && (
          <div className="flex flex-col gap-md">
            <div className="p-md rounded-2xl bg-surface-container border border-surface-variant flex items-center gap-3">
              <span className="material-symbols-outlined text-3xl text-primary">local_shipping</span>
              <div>
                <h3 className="font-bold text-sm text-on-surface">{translateText('Nearby Agricultural Input & Fertilizer Stores', selectedLanguage)}</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {translateText('Authorized Rythu Bharosa Kendras (RBKs) and fertilizer dealers in', selectedLanguage)} {translateName(farmer.village, selectedLanguage)}, {translateName(farmer.district, selectedLanguage)}.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {NEARBY_FERTILIZER_SHOPS.map((shop) => (
                <div key={shop.id} className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col justify-between gap-md shadow-sm">
                  <div className="flex flex-col gap-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-on-surface">{translateName(shop.name, selectedLanguage)}</h4>
                        <span className="text-xs text-on-surface-variant flex items-center gap-1 mt-0.5">
                          <span className="material-symbols-outlined text-xs text-primary">location_on</span>
                          <span>{translateName(shop.address, selectedLanguage)}</span>
                        </span>
                      </div>

                      <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs border border-primary/20 shrink-0">
                        {shop.distanceKm} km
                      </span>
                    </div>

                    <div className="text-[11px] text-on-surface-variant flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs text-tertiary">schedule</span>
                      <span>{translateText(shop.openingHours, selectedLanguage)}</span>
                    </div>

                    {/* Category tags */}
                    <div className="flex flex-wrap gap-1 mt-1">
                      {shop.categories.map((c, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded-md bg-surface-variant text-on-surface font-medium">
                          {translateText(c, selectedLanguage)}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <a
                      href={`tel:${shop.phone.replace(/[^0-9+]/g, '')}`}
                      className="py-2 rounded-xl bg-primary text-on-primary font-bold text-xs flex items-center justify-center gap-1 shadow-sm hover:bg-primary-fixed"
                    >
                      <span className="material-symbols-outlined text-sm">call</span>
                      <span>{t('callStore', selectedLanguage)}</span>
                    </a>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(shop.name + ' ' + shop.address)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="py-2 rounded-xl bg-surface-variant text-on-surface hover:bg-surface-container-high font-bold text-xs flex items-center justify-center gap-1"
                    >
                      <span className="material-symbols-outlined text-sm">directions</span>
                      <span>{t('navigate', selectedLanguage)}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CROP HISTORY & HARVEST LOGS (Requirement 3) */}
        {activeSubTab === 'history' && (
          <div className="flex flex-col gap-md">
            {/* Primary Highlight Card */}
            {primaryHistory && (
              <div className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col gap-md shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-primary font-bold uppercase tracking-wider">
                      {translateName(activeField.name, selectedLanguage)} — {translateText('Previous Season Record', selectedLanguage)}
                    </span>
                    <h3 className="font-headline-sm text-base text-on-surface font-bold mt-0.5">
                      {translateCrop(primaryHistory.cropName, selectedLanguage)}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-bold text-xs">
                    {primaryHistory.efficiencyPercent}% {t('efficiency', selectedLanguage)}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-surface-container-low border border-surface-variant/40">
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase">{t('expected', selectedLanguage)}</span>
                    <div className="text-base font-bold text-on-surface">{primaryHistory.expectedYieldTons} {t('tonsUnit', selectedLanguage) || 'Tons'}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase">{t('actual', selectedLanguage)}</span>
                    <div className="text-base font-bold text-primary">{primaryHistory.actualYieldTons} {t('tonsUnit', selectedLanguage) || 'Tons'}</div>
                  </div>
                  <div>
                    <span className="text-[10px] text-on-surface-variant uppercase">{translateText('Loss Gap', selectedLanguage)}</span>
                    <div className="text-base font-bold text-error">
                      -{(primaryHistory.expectedYieldTons - primaryHistory.actualYieldTons).toFixed(1)} T
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Historical Log Cards */}
            <div className="flex flex-col gap-md">
              {cropHistory.map((rec) => (
                <div key={rec.id} className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col gap-sm">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-on-surface">{translateText(rec.yearLabel, selectedLanguage)} ({translateCrop(rec.cropName, selectedLanguage)})</h4>
                    <span className="text-xs font-bold text-primary">{rec.efficiencyPercent}% {t('efficiency', selectedLanguage)}</span>
                  </div>

                  <div className="space-y-1">
                    {rec.yieldLossFactors.map((f, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs text-on-surface-variant">
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm text-error">{f.icon}</span>
                          <span>{translateText(f.factorName, selectedLanguage)}</span>
                        </span>
                        <span className="font-bold text-error">-{f.lossTons} T</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Log Harvest Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-surface-container-high border border-surface-variant rounded-2xl p-md w-full max-w-md shadow-2xl flex flex-col gap-md">
            <div className="flex items-center justify-between border-b border-surface-variant/40 pb-2">
              <h3 className="font-bold text-sm text-on-surface">{t('logHarvest', selectedLanguage)} {translateName(activeField.name, selectedLanguage)}</h3>
              <button onClick={() => setShowLogModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleLogHarvest} className="flex flex-col gap-sm text-xs">
              <div>
                <label className="text-on-surface-variant font-semibold">{t('seasonCropName', selectedLanguage)}</label>
                <input
                  type="text"
                  required
                  value={newCropName}
                  onChange={(e) => setNewCropName(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-on-surface-variant font-semibold">{t('expectedTonsLabel', selectedLanguage)}</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={expectedTons}
                    onChange={(e) => setExpectedTons(parseFloat(e.target.value))}
                    className="w-full mt-1 p-2.5 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="text-on-surface-variant font-semibold">{t('actualTonsLabel', selectedLanguage)}</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={actualTons}
                    onChange={(e) => setActualTons(parseFloat(e.target.value))}
                    className="w-full mt-1 p-2.5 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-on-surface-variant font-semibold">{t('lossReasonLabel', selectedLanguage)}</label>
                <input
                  type="text"
                  value={lossReason}
                  onChange={(e) => setLossReason(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-variant/40">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-variant text-on-surface font-bold text-xs"
                >
                  {t('cancel', selectedLanguage)}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow hover:bg-primary-fixed"
                >
                  {t('save', selectedLanguage)} {translateText('Record', selectedLanguage)}
                </button>
              </div>
            </form>
          </div>
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
