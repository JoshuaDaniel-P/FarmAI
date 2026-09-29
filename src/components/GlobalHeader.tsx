import React from 'react';
import { useFarm } from '../context/FarmContext';
import { t } from '../services/i18n';

export const GlobalHeader: React.FC = () => {
  const { setCurrentScreen, selectedLanguage, setIsLanguageModalOpen } = useFarm();

  const logoUrl = `${import.meta.env.BASE_URL}images/agroaura-logo.png`;

  return (
    <header className="sticky top-0 z-40 w-full bg-background/95 backdrop-blur-md border-b border-surface-container-highest/60 transition-colors">
      <div className="w-full max-w-screen-xl mx-auto px-margin-mobile md:px-margin-desktop h-[58px] md:h-[70px] flex items-center justify-between">
        {/* Brand Group: [Logo] AGROAURA on the LEFT */}
        <button
          onClick={() => setCurrentScreen('dashboard')}
          className="flex items-center gap-2.5 md:gap-3.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl transition-transform active:scale-98"
          title="Agroaura Home"
          aria-label="Agroaura Home"
        >
          {/* Logo container using uploaded official Agroaura logo */}
          <div className="h-[36px] w-[36px] md:h-[44px] md:w-[44px] rounded-xl bg-white flex items-center justify-center p-1 shadow-sm border border-white/20 shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
            <img
              src={logoUrl}
              alt="Agroaura Logo"
              className="w-full h-full object-contain"
              loading="eager"
            />
          </div>

          {/* AGROAURA text immediately beside the logo */}
          <span className="font-headline-md text-[19px] md:text-[23px] font-bold tracking-wider text-primary group-hover:text-primary-fixed transition-colors select-none">
            AGROAURA
          </span>
        </button>

        {/* Global Controls on the Right: Language Switcher */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center border border-primary/30 transition-all shadow-sm active:scale-95"
            title={t('selectLanguage', selectedLanguage)}
            aria-label={t('selectLanguage', selectedLanguage)}
          >
            <span className="material-symbols-outlined text-[20px] md:text-[22px]">translate</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default GlobalHeader;
