import React from 'react';
import { useFarm } from '../context/FarmContext';
import { t, translateCrop, translateName, translateText } from '../services/i18n';

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
      <aside className="hidden md:flex flex-col w-80 h-screen fixed left-0 top-0 bg-surface-container border-r border-surface-variant z-40 p-4 overflow-y-auto">
        <div className="flex flex-col gap-1 p-4 mb-4 bg-surface-container-low rounded-2xl border border-surface-variant">
          <div className="flex items-center justify-between mb-2">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary-container">
              <img
                alt="Farmer Portrait"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIApBsvQSGN9pM5oS-4TKErfdj9Zewzc89JjDs7Fa8ww9U1-hpCxmZpQOMs-XdyG07nPb0Ekcw9Z9DpoHeBfCqKfcjfWW3GLf5hmLJds8gnOxpzBNFk4n_eKPcEANmY5eRKFN8keelEkvj_UV8GqF9ryhezcYq70Uqs380nlb6Sa6Z2cC0-kCJRvtGVuA36WmPcrb1Ox-QIrJvlFtnmD1L6BtJCTE0vnimzaqhLctl7CpNtmqwzi9h"
              />
            </div>
            {/* Direct Language Switcher Button */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="p-2.5 rounded-full bg-surface-container-high text-primary hover:bg-surface-bright border border-primary/30 transition-all flex items-center gap-1 px-3"
              title={t('selectLanguage', selectedLanguage)}
              aria-label={t('selectLanguage', selectedLanguage)}
            >
              <span className="material-symbols-outlined text-2xl">translate</span>
              <span className="font-label-sm text-xs font-bold">
                {selectedLanguage === 'te' ? 'తెలుగు' : selectedLanguage === 'hi' ? 'हिंदी' : selectedLanguage === 'ta' ? 'தமிழ்' : selectedLanguage === 'kn' ? 'ಕನ್ನಡ' : 'EN'}
              </span>
            </button>
          </div>

          <h2 className="font-headline-md text-headline-md text-primary">{translateName(farmer.name, selectedLanguage)}</h2>
          <p className="font-body-md text-body-md text-on-surface">
            {translateCrop(farmer.activeCrop, selectedLanguage)} • {translateText(farmer.fieldName, selectedLanguage)}
          </p>
          <p className="font-label-sm text-label-sm text-on-surface-variant">
            {translateText(farmer.village, selectedLanguage)}, {translateText(farmer.district, selectedLanguage)}
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
