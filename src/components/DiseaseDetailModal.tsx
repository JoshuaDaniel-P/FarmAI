import React from 'react';
import { DiseaseInfo } from '../types/farm';
import { useFarm } from '../context/FarmContext';
import { t, translateCrop, translateRisk, translateText } from '../services/i18n';

interface Props {
  disease: DiseaseInfo | null;
  onClose: () => void;
}

export const DiseaseDetailModal: React.FC<Props> = ({ disease, onClose }) => {
  const { selectedLanguage } = useFarm();
  if (!disease) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-margin-mobile">
      <div className="bg-surface-container border border-surface-variant w-full max-w-2xl rounded-2xl p-md shadow-2xl overflow-y-auto max-h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface p-2 rounded-full hover:bg-surface-container-high transition-colors"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>

        {disease.imageUrl && (
          <div className="w-full h-52 rounded-xl overflow-hidden mb-4 border border-surface-variant relative bg-surface-container-high">
            <img
              src={disease.imageUrl}
              alt={translateText(disease.diseaseName, selectedLanguage)}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent flex items-end p-3">
              <span className="font-label-sm text-xs bg-background/80 backdrop-blur-sm text-primary px-3 py-1 rounded-full border border-primary/30 flex items-center gap-1.5 font-bold">
                <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                {translateCrop(disease.crop, selectedLanguage)} • {translateText(disease.diseaseName, selectedLanguage)}
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-sm mb-md">
          <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center text-error border border-error/20">
            <span className="material-symbols-outlined text-3xl">{disease.icon}</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">{translateText(disease.diseaseName, selectedLanguage)}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{translateCrop(disease.crop, selectedLanguage)} {t('intelligenceModule', selectedLanguage)}</p>
          </div>
        </div>

        <div className="space-y-md">
          {/* Risk Level & Prediction */}
          <div className="bg-surface-variant p-sm rounded-xl border border-outline-variant/30 flex flex-col gap-xs">
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{t('currentRisk', selectedLanguage)}</span>
              <span className={`px-sm py-xs rounded-lg font-label-lg text-label-lg ${disease.riskBadgeColor}`}>
                {translateRisk(disease.riskLevel, selectedLanguage)}
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface mt-1">{translateText(disease.currentRiskPrediction, selectedLanguage)}</p>
          </div>

          {/* Symptoms */}
          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface mb-2 uppercase tracking-wider">{t('observedSymptoms', selectedLanguage)}</h4>
            <ul className="space-y-2">
              {disease.symptoms.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2 text-on-surface font-body-md">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                  <span>{translateText(s, selectedLanguage)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cause & Favorable Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
            <div className="bg-surface-variant p-sm rounded-xl border border-outline-variant/30">
              <h5 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">{t('primaryCause', selectedLanguage)}</h5>
              <p className="font-body-md text-on-surface">{translateText(disease.primaryCause, selectedLanguage)}</p>
            </div>
            <div className="bg-surface-variant p-sm rounded-xl border border-outline-variant/30">
              <h5 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">{t('favorableConditions', selectedLanguage)}</h5>
              <p className="font-body-md text-on-surface">{translateText(disease.favorableConditions, selectedLanguage)}</p>
            </div>
          </div>

          {/* Precautions */}
          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface mb-2 uppercase tracking-wider">{t('preventivePrecautions', selectedLanguage)}</h4>
            <ul className="space-y-2">
              {disease.precautions.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2 text-on-surface-variant font-body-md">
                  <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">shield</span>
                  <span>{translateText(p, selectedLanguage)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Treatment */}
          <div className="bg-primary-container/40 border border-primary/30 p-md rounded-xl">
            <h4 className="font-headline-sm text-headline-sm text-primary mb-1">{t('recommendedTreatment', selectedLanguage)}</h4>
            <p className="font-body-lg text-on-primary-container leading-relaxed">{translateText(disease.treatment, selectedLanguage)}</p>
          </div>
        </div>

        <div className="mt-md pt-sm border-t border-surface-variant flex justify-end">
          <button
            onClick={onClose}
            className="px-md py-sm bg-primary text-on-primary font-label-lg text-label-lg rounded-lg hover:bg-primary-fixed transition-colors"
          >
            {t('closeAnalysis', selectedLanguage)}
          </button>
        </div>
      </div>
    </div>
  );
};

