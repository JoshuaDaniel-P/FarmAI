import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { t, translateCrop, translateText } from '../services/i18n';

interface FieldSwitcherProps {
  onAddNewField?: () => void;
  className?: string;
}

export const FieldSwitcher: React.FC<FieldSwitcherProps> = ({ onAddNewField, className = '' }) => {
  const { farmer, activeField, activeFieldId, setActiveFieldId, selectedLanguage, setCurrentScreen } = useFarm();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {/* Current Field Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container border border-surface-variant hover:border-primary/50 transition-all text-left group shadow-sm max-w-full"
      >
        <div className="w-8 h-8 rounded-lg bg-primary-container text-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-lg">grid_view</span>
        </div>
        <div className="flex-1 min-w-0 pr-1">
          <div className="flex items-center gap-1.5">
            <span className="font-headline-sm text-sm font-bold text-on-surface truncate">
              {translateText(activeField.name, selectedLanguage)}
            </span>
            <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20 shrink-0">
              {activeField.acres} {t('ac', selectedLanguage)}
            </span>
          </div>
          <p className="text-[11px] text-on-surface-variant truncate">
            {translateCrop(activeField.activeCrop, selectedLanguage)} • {t('day', selectedLanguage)} {activeField.cropAgeDays} ({translateText(activeField.growthStage.stageName.split('/')[0].trim(), selectedLanguage)})
          </p>
        </div>
        <span className={`material-symbols-outlined text-on-surface-variant text-base transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary' : ''}`}>
          expand_more
        </span>
      </button>

      {/* Field Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute left-0 mt-2 w-80 max-w-[90vw] bg-surface-container-high border border-surface-variant rounded-2xl shadow-2xl z-50 p-2 overflow-hidden flex flex-col gap-1.5 animate-in fade-in zoom-in-95 duration-150">
            <div className="px-3 py-1.5 flex items-center justify-between border-b border-surface-variant/40">
              <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
                {t('navField', selectedLanguage)} ({farmer.fields.length})
              </span>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onAddNewField) onAddNewField();
                  else setCurrentScreen('field-setup');
                }}
                className="text-[11px] text-primary font-bold hover:underline flex items-center gap-0.5"
              >
                <span className="material-symbols-outlined text-xs">add</span>
                {t('addField', selectedLanguage) || 'Add Field'}
              </button>
            </div>

            <div className="flex flex-col gap-1 max-h-64 overflow-y-auto pr-1">
              {farmer.fields.map((field) => {
                const isSelected = field.id === activeFieldId;
                return (
                  <button
                    key={field.id}
                    onClick={() => {
                      setActiveFieldId(field.id);
                      setIsOpen(false);
                    }}
                    className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-2 transition-all ${
                      isSelected
                        ? 'bg-primary-container text-on-primary-container border border-primary/40'
                        : 'hover:bg-surface-variant text-on-surface'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {field.activeCrop.toLowerCase().includes('paddy') ? 'water' : 'eco'}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-xs truncate">
                          {translateText(field.name, selectedLanguage)}
                        </div>
                        <div className="text-[10px] opacity-80 truncate">
                          {field.acres} {t('acres', selectedLanguage)} • {translateCrop(field.activeCrop, selectedLanguage)} ({t('day', selectedLanguage)} {field.cropAgeDays})
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="material-symbols-outlined text-primary text-base shrink-0">
                        check_circle
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
