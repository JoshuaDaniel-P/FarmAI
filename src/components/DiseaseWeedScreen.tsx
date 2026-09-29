import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { getDiseasesByCrop, getDiseasesForStage, assessStageDiseaseRisk } from '../services/diseaseService';
import { WEED_DATABASE, getActiveWeedAlerts, getAllWeedsForCrop } from '../services/weedService';
import { droneService } from '../services/droneService';
import { t, translateCrop, translateRisk, translateText } from '../services/i18n';
import { CameraScanModal } from './CameraScanModal';
import { DiseaseDetailModal } from './DiseaseDetailModal';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { FieldSwitcher } from './FieldSwitcher';
import { DiseaseInfo } from '../types/farm';

export const DiseaseWeedScreen: React.FC = () => {
  const {
    activeField,
    sensors,
    registeredDiseases,
    registerDisease,
    selectedLanguage,
    setSelectedLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
  } = useFarm();

  const [selectedCrop, setSelectedCrop] = useState<string>(activeField.activeCrop || 'Paddy');
  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [selectedDiseaseDetail, setSelectedDiseaseDetail] = useState<DiseaseInfo | null>(null);
  const [activeTab, setActiveTab] = useState<'disease' | 'weed'>('disease');
  const [filterStageOnly, setFilterStageOnly] = useState<boolean>(true);

  // Stage-based intelligence
  const stageSpecificDiseases = getDiseasesForStage(selectedCrop, activeField.growthStage.stageName);
  const allCropDiseases = getDiseasesByCrop(selectedCrop);
  const displayDiseases = filterStageOnly ? stageSpecificDiseases : allCropDiseases;

  // Active risk assessment
  const stageRisk = assessStageDiseaseRisk(
    selectedCrop,
    activeField.growthStage.stageName,
    sensors.airTemp,
    sensors.humidity
  );

  // Weed intelligence
  const activeWeedAlerts = getActiveWeedAlerts(activeField.activeCrop, activeField.cropAgeDays);
  const cropWeeds = getAllWeedsForCrop(selectedCrop);
  const droneLogs = droneService.getRecentLogs();
  const latestScan = droneLogs[0];

  return (
    <div className="bg-background text-on-surface min-h-screen flex flex-col font-body-md overflow-x-hidden pb-[90px] md:pb-8">
      {/* TopAppBar */}
      <header className="bg-background text-primary flex flex-col justify-between px-margin-mobile pt-sm pb-xs w-full max-w-screen-xl mx-auto z-40 sticky top-0 border-b border-surface-container-highest/40">
        <div className="flex items-center justify-between w-full h-16">
          <div className="flex items-center gap-sm min-w-0">
            <FieldSwitcher />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Language Selector */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center border border-primary/30 transition-all shadow-sm"
              title={t('selectLanguage', selectedLanguage)}
            >
              <span className="material-symbols-outlined text-[22px]">translate</span>
            </button>

            {/* Camera Scan Button */}
            <button
              onClick={() => setIsCameraOpen(true)}
              className="px-3 py-1.5 bg-primary text-on-primary font-bold text-xs rounded-full flex items-center gap-1 shadow-md hover:bg-primary-fixed"
            >
              <span className="material-symbols-outlined text-lg">photo_camera</span>
              <span className="hidden sm:inline">{t('scanCropLeaf', selectedLanguage)}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow w-full max-w-screen-xl mx-auto px-margin-mobile md:px-margin-desktop py-md flex flex-col gap-md">
        {/* Module Switcher: Diseases vs Weeds */}
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
          {['Paddy', 'Cotton', 'Chilli', 'Groundnut', 'Maize'].map((crop) => (
            <button
              key={crop}
              onClick={() => setSelectedCrop(crop)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCrop.toLowerCase() === crop.toLowerCase()
                  ? 'bg-primary text-on-primary shadow-sm'
                  : 'bg-surface-container text-on-surface-variant border border-surface-variant hover:border-primary/40'
              }`}
            >
              <span className="material-symbols-outlined text-sm">
                {crop === 'Paddy' ? 'water' : crop === 'Cotton' ? 'filter_vintage' : crop === 'Chilli' ? 'local_fire_department' : 'eco'}
              </span>
              <span>{translateCrop(crop, selectedLanguage)}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: DISEASE MONITORING & STAGE RISKS */}
        {activeTab === 'disease' && (
          <div className="flex flex-col gap-md">
            {/* Stage Intelligence Banner (Requirement 7) */}
            <div className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col gap-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary-container text-primary flex items-center justify-center">
                    <span className="material-symbols-outlined text-base">timelapse</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-xs uppercase tracking-wider text-on-surface">
                      {translateText('Current Stage', selectedLanguage)}: {translateText(activeField.growthStage.stageName, selectedLanguage)} ({t('day', selectedLanguage)} {activeField.cropAgeDays})
                    </h3>
                    <p className="text-[11px] text-on-surface-variant">{translateText(stageRisk.riskDescription, selectedLanguage)}</p>
                  </div>
                </div>

                <button
                  onClick={() => setFilterStageOnly(!filterStageOnly)}
                  className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition-all ${
                    filterStageOnly
                      ? 'bg-primary/20 text-primary border-primary/40'
                      : 'bg-surface-variant text-on-surface-variant border-outline-variant/40'
                  }`}
                >
                  {filterStageOnly ? t('showingStageRisks', selectedLanguage) : t('showingAllDiseases', selectedLanguage)}
                </button>
              </div>
            </div>

            {/* Active Registered Diseases on this Field (if any) */}
            {registeredDiseases.length > 0 && (
              <div className="p-md rounded-2xl bg-error-container/15 border border-error/40 flex flex-col gap-sm">
                <div className="flex items-center gap-2 text-error font-bold text-xs uppercase tracking-wider">
                  <span className="material-symbols-outlined text-base">report</span>
                  <span>{translateText('Registered Field Diagnoses', selectedLanguage)} ({registeredDiseases.length})</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {registeredDiseases.map((reg) => (
                    <div key={reg.id} className="p-3 rounded-xl bg-surface-container border border-surface-variant flex flex-col justify-between gap-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-on-surface">{translateText(reg.diseaseName, selectedLanguage)}</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                          {translateText(reg.status, selectedLanguage)}
                        </span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant line-clamp-1">{translateText(reg.symptoms, selectedLanguage)}</p>
                      <div className="text-[11px] text-primary font-medium mt-1">{t('cureAndManagement', selectedLanguage).split('&')[0].trim()}: {translateText(reg.cure, selectedLanguage)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Disease Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {displayDiseases.map((disease) => (
                <div
                  key={disease.id}
                  onClick={() => setSelectedDiseaseDetail(disease)}
                  className="p-md rounded-2xl bg-surface-container border border-surface-variant hover:border-primary/50 transition-all cursor-pointer flex flex-col justify-between gap-md group shadow-sm"
                >
                  <div className="flex flex-col gap-sm">
                    {disease.imageUrl && (
                      <div className="w-full h-40 rounded-xl overflow-hidden relative bg-surface-container-high">
                        <img
                          src={disease.imageUrl}
                          alt={translateText(disease.diseaseName, selectedLanguage)}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${disease.riskBadgeColor}`}>
                            {translateRisk(disease.riskLevel, selectedLanguage)} {t('risk', selectedLanguage)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors">
                          {translateText(disease.diseaseName, selectedLanguage)}
                        </h4>
                        <span className="text-[11px] text-on-surface-variant">
                          {t('riskWindow', selectedLanguage)}: {translateText(disease.typicalRiskPeriod, selectedLanguage)}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 text-xs">
                      <div className="text-on-surface line-clamp-2">
                        <span className="font-bold text-on-surface-variant">{t('symptoms', selectedLanguage)}:</span> {translateText((disease.whatYouMaySee || disease.symptoms)[0], selectedLanguage)}
                      </div>
                      <div className="text-primary font-medium line-clamp-1">
                        <span className="font-bold text-on-surface-variant">{t('cureAndManagement', selectedLanguage).split('&')[0].trim()}:</span> {translateText(disease.shortCure || disease.treatment, selectedLanguage)}
                      </div>
                    </div>
                  </div>

                  <button className="w-full py-2 rounded-xl bg-surface-variant hover:bg-primary hover:text-on-primary text-on-surface font-bold text-xs flex items-center justify-center gap-1 transition-colors">
                    <span>{t('viewTreatmentAndPrecautions', selectedLanguage)}</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: WEED INTELLIGENCE & TIMING (Requirements 21 & 22) */}
        {activeTab === 'weed' && (
          <div className="flex flex-col gap-md">
            {/* Active Time-Based Weed Alerts */}
            {activeWeedAlerts.length > 0 ? (
              <div className="p-md rounded-2xl bg-surface-container border border-primary/40 flex flex-col gap-sm">
                <div className="flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-wider">
                  <span className="material-symbols-outlined text-base">warning</span>
                  <span>🌿 {translateText('Active Weed Alert', selectedLanguage)} ({translateCrop(activeField.activeCrop, selectedLanguage)} — {t('day', selectedLanguage)} {activeField.cropAgeDays})</span>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  {activeWeedAlerts.map((weed) => (
                    <div key={weed.id} className="p-3 rounded-xl bg-primary-container/25 border border-primary/30 flex flex-col gap-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-primary-fixed">{translateText(weed.weedName, selectedLanguage)}</span>
                        <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-bold text-[10px]">
                          {translateText('Comes at', selectedLanguage)}: {translateText(weed.appearancePeriod, selectedLanguage)}
                        </span>
                      </div>
                      <div className="text-on-surface mt-1">
                        <span className="font-bold text-on-surface-variant">{translateText('Identification', selectedLanguage)}:</span> {translateText(weed.identification, selectedLanguage)}
                      </div>
                      <div className="text-primary font-bold mt-1">
                        <span className="text-on-surface-variant font-bold">{t('actionLabel', selectedLanguage)}:</span> {translateText(weed.removalMethod, selectedLanguage)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-md rounded-2xl bg-surface-container border border-surface-variant text-xs text-on-surface-variant">
                {translateText('No active time-sensitive weed alert for Day', selectedLanguage)} {activeField.cropAgeDays}. {translateText('Full crop weed reference catalog below:', selectedLanguage)}
              </div>
            )}

            {/* General Weed Reference Catalog */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {cropWeeds.map((weed) => (
                <div key={weed.id} className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col justify-between gap-sm">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-on-surface">{translateText(weed.weedName, selectedLanguage)}</h4>
                      <span className="text-[10px] text-on-surface-variant font-bold px-2 py-0.5 rounded bg-surface-variant">
                        {t('day', selectedLanguage)} {weed.startDay} - {weed.endDay}
                      </span>
                    </div>

                    <p className="text-xs text-on-surface-variant mt-1">{translateText(weed.identification, selectedLanguage)}</p>

                    <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-variant/40 text-xs space-y-1 mt-2">
                      <div>
                        <span className="font-bold text-primary">{translateText('Removal', selectedLanguage)}:</span> <span className="text-on-surface">{translateText(weed.removalMethod, selectedLanguage)}</span>
                      </div>
                      <div>
                        <span className="font-bold text-tertiary">{translateText('Management', selectedLanguage)}:</span> <span className="text-on-surface-variant">{translateText(weed.managementMethod, selectedLanguage)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Disease Detail Modal */}
      <DiseaseDetailModal
        disease={selectedDiseaseDetail}
        onClose={() => setSelectedDiseaseDetail(null)}
      />

      {/* Camera Scan Modal */}
      <CameraScanModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        cropName={selectedCrop}
        onRegisterDisease={(result, img) => registerDisease(result, img)}
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
