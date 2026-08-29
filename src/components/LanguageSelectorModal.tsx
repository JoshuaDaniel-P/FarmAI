import React from 'react';
import { LanguageCode, SUPPORTED_LANGUAGES, t } from '../services/i18n';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: LanguageCode;
  onSelectLanguage: (lang: LanguageCode) => void;
}

export const LanguageSelectorModal: React.FC<Props> = ({
  isOpen,
  onClose,
  currentLanguage,
  onSelectLanguage,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-margin-mobile">
      <div className="bg-surface-container border border-surface-variant w-full max-w-sm rounded-2xl p-md shadow-2xl space-y-md relative animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between border-b border-surface-variant pb-3">
          <div className="flex items-center gap-2 text-primary">
            <span className="material-symbols-outlined text-2xl">translate</span>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">
              {t('selectLanguage', currentLanguage)}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-on-surface-variant hover:text-on-surface p-1 rounded-full hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        <div className="space-y-sm">
          {SUPPORTED_LANGUAGES.map((lang) => {
            const isSelected = currentLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => {
                  onSelectLanguage(lang.code);
                  onClose();
                }}
                className={`w-full p-md rounded-xl border flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-primary-container border-primary text-primary-fixed shadow-md font-bold'
                    : 'bg-surface-variant/60 border-outline-variant/30 text-on-surface hover:bg-surface-bright'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="text-left">
                    <div className="font-headline-sm text-body-lg">{lang.nativeName}</div>
                    <div className="font-label-sm text-on-surface-variant">{lang.name}</div>
                  </div>
                </div>

                {isSelected && (
                  <span className="material-symbols-outlined text-primary text-2xl">check_circle</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
