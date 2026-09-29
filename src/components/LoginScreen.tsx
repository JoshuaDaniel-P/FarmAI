import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { t } from '../services/i18n';
import { LanguageSelectorModal } from './LanguageSelectorModal';

export const LoginScreen: React.FC = () => {
  const { login, selectedLanguage, setSelectedLanguage, isLanguageModalOpen, setIsLanguageModalOpen } = useFarm();
  const [mobileNumber, setMobileNumber] = useState<string>('+91 98765 43210');
  const [otp, setOtp] = useState<string[]>(['4', '0', '2', '8']);
  const [showOtp, setShowOtp] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showOtp) {
      setShowOtp(true);
    } else {
      login(mobileNumber);
    }
  };

  return (
    <div className="bg-background text-on-surface h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Language selector pin on top right of Login Screen */}
      <div className="absolute top-4 right-4 z-20">
        <button
          onClick={() => setIsLanguageModalOpen(true)}
          className="p-2.5 rounded-full bg-surface-container text-primary hover:bg-surface-container-high border border-primary/30 transition-all flex items-center gap-1 shadow-md"
          title={t('selectLanguage', selectedLanguage)}
        >
          <span className="material-symbols-outlined text-2xl">translate</span>
          <span className="font-label-sm text-xs uppercase font-bold">{selectedLanguage}</span>
        </button>
      </div>

      {/* Decorative Earthy/Tech Background Elements */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-surface-container-high to-transparent opacity-50 -z-10"></div>
      
      <div className="w-full max-w-md px-margin-mobile md:px-margin-desktop z-10 flex flex-col items-center">
        {/* Brand Logo Area */}
        <div className="mb-lg flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center p-2 shadow-xl border border-white/20 mb-md overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}images/agroaura-logo.png`}
              alt="Agroaura Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary text-center tracking-wider font-bold">
            AGROAURA
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-sm text-center">
            {t('farmerSubtitle', selectedLanguage)}
          </p>
        </div>

        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-surface-container w-full rounded-xl p-md border border-surface-variant shadow-xl relative overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary opacity-5 rounded-full blur-2xl"></div>
          <h2 className="font-headline-md text-headline-md mb-md text-on-surface">{t('welcomeFarmer', selectedLanguage)}</h2>

          <div className="mb-md">
            <label className="block font-label-lg text-label-lg text-on-surface-variant mb-base" htmlFor="mobile-number">
              {t('mobileNumber', selectedLanguage)}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-sm">
                <span className="material-symbols-outlined text-outline" data-icon="phone_iphone">
                  phone_iphone
                </span>
              </span>
              <input
                className="w-full bg-surface text-on-surface font-body-md text-body-md pl-10 pr-sm py-sm rounded-lg border-2 border-transparent focus:border-primary focus:ring-0 focus:outline-none transition-colors border-b-surface-variant"
                id="mobile-number"
                placeholder="+91 98765 43210"
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
          </div>

          {/* OTP Input */}
          <div className={`mb-lg transition-opacity duration-300 ${showOtp ? 'opacity-100' : 'opacity-60'}`}>
            <label className="block font-label-lg text-label-lg text-on-surface-variant mb-base flex items-center justify-between">
              {t('enterOtp', selectedLanguage)}
              <span className="font-label-sm text-label-sm text-primary cursor-pointer hover:underline">{t('resend', selectedLanguage)}</span>
            </label>
            <div className="flex justify-between gap-base">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  className="w-12 h-14 bg-surface text-center font-headline-md text-headline-md text-on-surface rounded-lg border-b-2 border-surface-variant focus:border-primary focus:outline-none disabled:bg-surface-container-low"
                  maxLength={1}
                  type="text"
                  value={digit}
                  disabled={!showOtp}
                  onChange={(e) => {
                    const newOtp = [...otp];
                    newOtp[idx] = e.target.value;
                    setOtp(newOtp);
                  }}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-on-primary font-label-lg text-label-lg py-md rounded-lg flex items-center justify-center gap-sm hover:bg-primary-fixed transition-colors shadow-sm active:scale-95 duration-150"
          >
            {showOtp ? t('verifyStart', selectedLanguage) : t('getOtp', selectedLanguage)}
            <span className="material-symbols-outlined" data-icon="arrow_forward">
              arrow_forward
            </span>
          </button>
        </form>

        <p className="font-label-sm text-label-sm text-on-surface-variant mt-md text-center opacity-70">
          {t('termsPolicy', selectedLanguage)}
        </p>
      </div>

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

