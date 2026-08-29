import React from 'react';
import { useFarm } from '../context/FarmContext';
import { t } from '../services/i18n';

export const Navigation: React.FC = () => {
  const { currentScreen, setCurrentScreen, farmer, selectedLanguage, setIsLanguageModalOpen } = useFarm();

  if (currentScreen === 'login') {
    return null;
  }

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-surface-container-low shadow-lg md:hidden rounded-t-xl border-t border-surface-variant">
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] transition-all duration-200 ${
            currentScreen === 'dashboard'
              ? 'bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-95'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentScreen === 'dashboard' ? "'FILL' 1" : "'FILL' 0" }}
          >
            home
          </span>
          <span className="font-label-sm text-label-sm mt-0.5">{t('navHome', selectedLanguage)}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('field-setup')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] transition-colors ${
            currentScreen === 'field-setup'
              ? 'bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-95'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">map</span>
          <span className="font-label-sm text-label-sm mt-0.5">{t('navField', selectedLanguage)}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('disease-weed')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] transition-all duration-200 ${
            currentScreen === 'disease-weed'
              ? 'bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-95'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentScreen === 'disease-weed' ? "'FILL' 1" : "'FILL' 0" }}
          >
            grass
          </span>
          <span className="font-label-sm text-label-sm mt-0.5">{t('navCrop', selectedLanguage)}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('analytics')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] transition-colors ${
            currentScreen === 'analytics'
              ? 'bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-95'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentScreen === 'analytics' ? "'FILL' 1" : "'FILL' 0" }}
          >
            analytics
          </span>
          <span className="font-label-sm text-label-sm mt-0.5">{t('navMarkets', selectedLanguage)}</span>
        </button>

        <button
          onClick={() => setCurrentScreen('assistant')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] transition-all duration-200 ${
            currentScreen === 'assistant'
              ? 'bg-primary-container text-on-primary-container rounded-full px-4 py-1 scale-95'
              : 'text-on-surface-variant hover:text-primary'
          }`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: currentScreen === 'assistant' ? "'FILL' 1" : "'FILL' 0" }}
          >
            smart_toy
          </span>
          <span className="font-label-sm text-label-sm mt-0.5">{t('navAssistant', selectedLanguage)}</span>
        </button>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <aside className="hidden md:flex flex-col h-screen py-lg w-80 shrink-0 bg-surface-container border-r border-surface-variant fixed left-0 top-0 z-40">
        <div className="px-md mb-lg flex flex-col items-start w-full">
          <div className="flex justify-between items-start w-full">
            <div className="w-16 h-16 rounded-full bg-surface-variant flex items-center justify-center mb-4 overflow-hidden border-2 border-primary/30">
              <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                energy_savings_leaf
              </span>
            </div>

            {/* Translate Pin in Sidebar */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="p-2.5 rounded-full bg-surface-container-high text-primary hover:bg-surface-bright border border-primary/30 transition-all flex items-center gap-1"
              title="Translate App Language"
            >
              <span className="material-symbols-outlined text-2xl">translate</span>
              <span className="font-label-sm text-xs uppercase">{selectedLanguage}</span>
            </button>
          </div>

          <h2 className="font-headline-md text-headline-md text-primary">{farmer.name}</h2>
          <p className="font-body-md text-body-md text-on-surface">
            {farmer.activeCrop} • {farmer.fieldName}
          </p>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            {farmer.village}, {farmer.district}
          </p>
        </div>

        <nav className="flex-1 flex flex-col gap-2 px-2">
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className={`flex items-center gap-4 py-3 px-4 rounded-full min-h-[48px] transition-all text-left w-full ${
              currentScreen === 'dashboard'
                ? 'bg-secondary-container text-on-secondary-container font-bold translate-x-1'
                : 'text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <span className="material-symbols-outlined">home</span>
            <span className="font-label-lg text-label-lg">{t('navHome', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('field-setup')}
            className={`flex items-center gap-4 py-3 px-4 rounded-full min-h-[48px] transition-all text-left w-full ${
              currentScreen === 'field-setup'
                ? 'bg-secondary-container text-on-secondary-container font-bold translate-x-1'
                : 'text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <span className="material-symbols-outlined">map</span>
            <span className="font-label-lg text-label-lg">{t('navFieldSetup', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('disease-weed')}
            className={`flex items-center gap-4 py-3 px-4 rounded-full min-h-[48px] transition-all text-left w-full ${
              currentScreen === 'disease-weed'
                ? 'bg-secondary-container text-on-secondary-container font-bold translate-x-1'
                : 'text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <span className="material-symbols-outlined">grass</span>
            <span className="font-label-lg text-label-lg">{t('navDiseaseWeed', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('analytics')}
            className={`flex items-center gap-4 py-3 px-4 rounded-full min-h-[48px] transition-all text-left w-full ${
              currentScreen === 'analytics'
                ? 'bg-secondary-container text-on-secondary-container font-bold translate-x-1'
                : 'text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <span className="material-symbols-outlined">trending_up</span>
            <span className="font-label-lg text-label-lg">{t('navCropHistory', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setCurrentScreen('assistant')}
            className={`flex items-center gap-4 py-3 px-4 rounded-full min-h-[48px] transition-all text-left w-full ${
              currentScreen === 'assistant'
                ? 'bg-secondary-container text-on-secondary-container font-bold translate-x-1'
                : 'text-on-surface-variant hover:bg-surface-container-highest'
            }`}
          >
            <span className="material-symbols-outlined">smart_toy</span>
            <span className="font-label-lg text-label-lg">{t('navAIAssistant', selectedLanguage)}</span>
          </button>
        </nav>
      </aside>
    </>
  );
};
