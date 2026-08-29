import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { getDiseasesByCrop } from '../services/diseaseService';
import { WEED_DATABASE, getActiveWeedAlerts } from '../services/weedService';
import { droneService } from '../services/droneService';
import { t } from '../services/i18n';
import { CameraScanModal } from './CameraScanModal';
import { LanguageSelectorModal } from './LanguageSelectorModal';

export const DiseaseWeedScreen: React.FC = () => {
  const {
    farmer,
    registeredDiseases,
    registerDisease,
    selectedLanguage,
    setSelectedLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
  } = useFarm();
  const [selectedCrop, setSelectedCrop] = useState<'Paddy' | 'Cotton' | 'Chilli' | 'Maize' | 'Groundnut'>('Paddy');
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'disease' | 'weed'>('disease');
  const [expandedWeedId, setExpandedWeedId] = useState<string | null>(null);

  const cropDiseases = getDiseasesByCrop(selectedCrop);
  const activeWeedAlerts = getActiveWeedAlerts(farmer.activeCrop, farmer.cropDay);
  const cropWeeds = WEED_DATABASE.filter((w) => w.crop.toLowerCase() === selectedCrop.toLowerCase());
  const droneLogs = droneService.getRecentLogs();
  const latestScan = droneLogs[0];

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md overflow-x-hidden pb-[90px] md:pb-8">
      {/* TopAppBar */}
      <header className="bg-background text-primary flex flex-col justify-between px-margin-mobile pt-sm pb-xs w-full max-w-screen-xl mx-auto z-40 sticky border-b border-surface-container-highest/40">
        <div className="flex items-center justify-between w-full h-16">
          <div className="flex items-center gap-sm">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary shrink-0">
              <img
                alt="Farmer Profile"
                className="object-cover w-full h-full"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBm8vdbyGYrR--PK78IBWkh0dHtT1YjMWRqAeDgPo9gkipSqQ_SeIJGd2x5YLb83VJDyHPpKqpJy6zoWCI7P_H2kRNBXHMpWvVbvVeWNTHnSHh3rqXs02k9thZYn-3Q17oW-tDJt0_Cii_yfPexHKEZr7z1WBnedDHb1OQ9023FLPH5dShN0tGddAcdK4F5-cVnbzQShknztRQVpdRRVNk_bGM__b-Bwd7yPb46gvJxcJjOHKHqEGTJ"
              />
            </div>
            <h1 className="font-headline-md text-headline-md text-on-surface">{t('navDiseaseWeed', selectedLanguage)}</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* TOP-RIGHT TRANSLATE PIN BUTTON */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="w-11 h-11 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center border border-primary/30 transition-all shadow-sm"
              title={t('selectLanguage', selectedLanguage)}
            >
              <span className="material-symbols-outlined text-[24px]">translate</span>
            </button>

            <button
              onClick={() => setIsCameraOpen(true)}
              className="px-3 py-1.5 bg-primary text-on-primary font-label-lg rounded-full flex items-center gap-1 shadow-md hover:bg-primary-fixed"
            >
              <span className="material-symbols-outlined text-xl">photo_camera</span>
              {t('scanCropLeaf', selectedLanguage)}
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-margin-mobile md:px-margin-desktop py-md flex flex-col gap-md">
        {/* Module Switcher */}
        <div className="grid grid-cols-2 gap-2 bg-surface-container p-1.5 rounded-xl border border-surface-variant">
          <button
            onClick={() => setActiveTab('disease')}
            className={`py-3 rounded-lg font-headline-sm text-center flex items-center justify-center gap-2 transition-all ${
              activeTab === 'disease'
                ? 'bg-primary text-on-primary shadow-md font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">coronavirus</span>
            {t('diseases', selectedLanguage)}
          </button>

          <button
            onClick={() => setActiveTab('weed')}
            className={`py-3 rounded-lg font-headline-sm text-center flex items-center justify-center gap-2 transition-all ${
              activeTab === 'weed'
                ? 'bg-primary text-on-primary shadow-md font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">grass</span>
            {t('weeds', selectedLanguage)}
          </button>
        </div>

        {/* Crop Selector Chips */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {(['Paddy', 'Cotton', 'Chilli', 'Maize', 'Groundnut'] as const).map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-4 py-2 rounded-full font-label-lg text-label-lg transition-colors whitespace-nowrap border ${
                selectedCrop === crop
                  ? 'bg-secondary-container text-on-secondary-container border-primary font-bold shadow-md'
                  : 'bg-surface-container text-on-surface-variant border-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* TAB 1: DISEASE MONITORING */}
        {activeTab === 'disease' && (
          <div className="flex flex-col gap-md">
            <div className="bg-primary-container/40 border border-primary/30 p-md rounded-2xl flex flex-col md:flex-row items-center justify-between gap-md shadow-lg">
              <div className="flex items-center gap-md">
                <div className="w-14 h-14 rounded-2xl bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-md">
                  <span className="material-symbols-outlined text-3xl">photo_camera</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-primary-fixed">{t('imageDiseaseId', selectedLanguage)}</h3>
                  <p className="font-body-md text-on-primary-container">{t('imageDiseaseDesc', selectedLanguage)}</p>
                </div>
              </div>
              <button
                onClick={() => setIsCameraOpen(true)}
                className="w-full md:w-auto px-lg py-md bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-2xl">photo_camera</span>
                {t('scanCropLeaf', selectedLanguage)}
              </button>
            </div>

            {/* Registered Diseases */}
            {registeredDiseases.length > 0 && (
              <div className="bg-surface-container border border-surface-variant rounded-2xl p-md flex flex-col gap-sm">
                <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">history</span>
                  {t('registeredDiseases', selectedLanguage)} ({registeredDiseases.length})
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  {registeredDiseases.map((reg) => (
                    <div key={reg.id} className="bg-surface-variant p-md rounded-xl border border-primary/30 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="font-label-sm text-primary uppercase">{reg.crop}</span>
                          <h4 className="font-headline-sm text-on-surface">{reg.diseaseName}</h4>
                        </div>
                        <span className="bg-primary-container text-primary-fixed font-label-sm px-2 py-0.5 rounded">
                          {reg.confidencePercent}% Match
                        </span>
                      </div>
                      <p className="font-body-sm text-on-surface-variant">Registered: {reg.detectedAt}</p>
                      <div className="pt-2 border-t border-surface-container-high text-body-sm">
                        <p className="text-on-surface"><strong className="text-primary">{t('precaution', selectedLanguage)}:</strong> {reg.precaution}</p>
                        <p className="text-on-surface mt-1"><strong className="text-primary">{t('cure', selectedLanguage)}:</strong> {reg.cure}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Common Diseases */}
            <div className="flex flex-col gap-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">coronavirus</span>
                {t('commonDiseases', selectedLanguage)} ({selectedCrop})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {cropDiseases.map((disease) => (
                  <div
                    key={disease.id}
                    className="bg-surface-container p-md rounded-2xl border border-surface-bright flex flex-col justify-between gap-md shadow-md"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-sm">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-error text-2xl">{disease.icon}</span>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface">{disease.diseaseName}</h4>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded-full font-label-sm text-label-sm ${disease.riskBadgeColor}`}>
                          {disease.riskLevel} Risk
                        </span>
                      </div>

                      <div className="space-y-sm text-body-md">
                        <div className="bg-surface-variant p-sm rounded-lg">
                          <span className="font-label-sm text-on-surface-variant uppercase block">{t('comesRiskPeriod', selectedLanguage)}</span>
                          <span className="font-body-md text-on-surface font-medium">{disease.comesWhen}</span>
                        </div>

                        <div className="bg-surface-variant p-sm rounded-lg">
                          <span className="font-label-sm text-on-surface-variant uppercase block">{t('precaution', selectedLanguage)}</span>
                          <span className="font-body-md text-on-surface">{disease.shortPrecaution}</span>
                        </div>

                        <div className="bg-primary-container/30 border border-primary/20 p-sm rounded-lg">
                          <span className="font-label-sm text-primary uppercase block">{t('cure', selectedLanguage)}</span>
                          <span className="font-body-md text-on-surface font-semibold">{disease.shortCure}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: WEED MONITORING */}
        {activeTab === 'weed' && (
          <div className="flex flex-col gap-md">
            <div className="bg-surface-container border border-surface-variant rounded-2xl p-md flex flex-col gap-md shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-2xl">warning</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{t('activeWeedAlert', selectedLanguage)}</h3>
                </div>
                <span className="bg-primary-container text-primary-fixed font-label-sm px-3 py-1 rounded-full">
                  Paddy Day {farmer.cropDay}
                </span>
              </div>

              {activeWeedAlerts.length > 0 ? (
                <div className="space-y-md">
                  {activeWeedAlerts.map((weed) => (
                    <div
                      key={weed.id}
                      className="bg-error-container/20 border-2 border-error/50 p-md rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-md"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-primary text-xl">grass</span>
                          <h4 className="font-headline-sm text-on-surface">{weed.weedName}</h4>
                        </div>
                        <p className="font-body-md text-on-surface-variant">
                          <strong>{t('comesAt', selectedLanguage)}:</strong> Days {weed.startDay}–{weed.endDay} after sowing
                        </p>
                        <p className="font-body-md text-error font-semibold">
                          <strong>Action:</strong> {weed.action}
                        </p>
                      </div>

                      <button
                        onClick={() => alert(`Inspecting ${weed.weedName}. Drone coordinates queued.`)}
                        className="px-md py-sm bg-error text-on-error font-headline-sm rounded-lg hover:bg-error/90 shrink-0"
                      >
                        {t('inspectField', selectedLanguage)}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-surface-variant p-md rounded-xl text-center text-on-surface-variant">
                  {t('noActiveAlerts', selectedLanguage)}
                </div>
              )}
            </div>

            {/* Drone Scan Weed Map */}
            <div className="bg-surface-container rounded-2xl border border-surface-bright p-md flex flex-col gap-md">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">{t('droneSurveillanceMap', selectedLanguage)}</h3>
                  <p className="font-body-md text-on-surface-variant">Latest scan: {latestScan.timestamp}</p>
                </div>
                <span className="bg-primary/20 text-primary border border-primary px-3 py-1 rounded-full text-label-sm font-bold">
                  {latestScan.detectedWeedLocations} {t('clustersIdentified', selectedLanguage)}
                </span>
              </div>

              <div className="relative w-full h-[200px] bg-surface-variant rounded-xl overflow-hidden scanline">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="absolute top-[20%] left-[30%] w-[40%] h-[50%] border-2 border-[#f2cc81]/60 bg-[#a67b27]/20 rounded-lg flex items-center justify-center">
                  <span className="bg-surface px-2 py-1 rounded text-[#f2cc81] text-xs">Zone B Alert</span>
                </div>
                <div className="absolute top-[30%] left-[40%] w-3 h-3 rounded-full bg-error animate-pulse"></div>
                <div className="absolute top-[35%] left-[55%] w-3 h-3 rounded-full bg-error animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="absolute top-[50%] left-[35%] w-3 h-3 rounded-full bg-error animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>

            {/* MINI-WIKIPEDIA WEED REFERENCE */}
            <div className="flex flex-col gap-sm">
              <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">grass</span>
                {t('weedReferenceGuide', selectedLanguage)} ({selectedCrop})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                {cropWeeds.map((weed) => (
                  <div key={weed.id} className="bg-surface-container p-md rounded-2xl border border-surface-variant flex flex-col justify-between gap-sm shadow-md">
                    <div>
                      <div className="flex items-center gap-2 mb-sm">
                        <span className="material-symbols-outlined text-primary text-2xl">{weed.icon}</span>
                        <h4 className="font-headline-sm text-headline-sm text-on-surface">{weed.weedName}</h4>
                      </div>

                      <div className="space-y-xs text-body-md">
                        <div className="flex justify-between bg-surface-variant p-2 rounded">
                          <span className="text-on-surface-variant uppercase text-xs">{t('comesAt', selectedLanguage)}</span>
                          <span className="font-bold text-on-surface">{weed.startDay}–{weed.endDay} Days</span>
                        </div>

                        <div className="bg-surface-variant p-2 rounded">
                          <span className="text-on-surface-variant uppercase text-xs block">{t('remove', selectedLanguage)}</span>
                          <span className="text-on-surface">{weed.action}</span>
                        </div>
                      </div>

                      {expandedWeedId === weed.id && weed.learnMoreText && (
                        <p className="mt-sm p-sm bg-primary-container/20 border border-primary/20 text-on-surface text-body-sm rounded-lg">
                          {weed.learnMoreText}
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => setExpandedWeedId(expandedWeedId === weed.id ? null : weed.id)}
                      className="text-label-sm text-primary hover:underline text-left mt-1"
                    >
                      {expandedWeedId === weed.id ? t('hideDetails', selectedLanguage) : t('learnMore', selectedLanguage)}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Camera Leaf Scan Modal */}
      <CameraScanModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        cropName={selectedCrop}
        onRegisterDisease={(result, imageUri) => registerDisease(result, imageUri)}
      />

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
