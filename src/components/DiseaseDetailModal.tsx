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
            <p className="font-body-md text-body-md text-on-surface-variant">{translateCrop(disease.crop, selectedLanguage)} • {disease.typicalRiskPeriod}</p>
          </div>
        </div>

        <div className="space-y-md">
          {/* Risk Level Badge */}
          <div className="bg-surface-variant p-sm rounded-xl border border-outline-variant/30 flex justify-between items-center">
            <span className="font-label-sm text-xs text-on-surface-variant uppercase tracking-wider">Current Risk Level</span>
            <span className={`px-3 py-1 rounded-full font-bold text-xs ${disease.riskBadgeColor}`}>
              {translateRisk(disease.riskLevel, selectedLanguage)} Risk
            </span>
          </div>

          {/* 1. WHAT YOU MAY SEE (Symptoms) */}
          <div className="bg-surface-variant/50 p-md rounded-xl border border-outline-variant/30">
            <h4 className="font-bold text-xs text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">visibility</span>
              <span>What You May See</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-on-surface">
              {(disease.whatYouMaySee || disease.symptoms).map((s, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">check_circle</span>
                  <span>{translateText(s, selectedLanguage)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 2. RISK PERIOD & WHY IT HAPPENS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
            <div className="bg-surface-variant p-sm rounded-xl border border-outline-variant/30">
              <h5 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-wider mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-tertiary">calendar_clock</span>
                <span>Risk Period / Conditions</span>
              </h5>
              <p className="text-xs text-on-surface leading-snug">{translateText(disease.riskPeriod || disease.comesWhen, selectedLanguage)}</p>
            </div>

            <div className="bg-surface-variant p-sm rounded-xl border border-outline-variant/30">
              <h5 className="font-bold text-[11px] text-on-surface-variant uppercase tracking-wider mb-1 flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-tertiary">help_outline</span>
                <span>Why It Happens</span>
              </h5>
              <p className="text-xs text-on-surface leading-snug">{translateText(disease.whyItHappens || disease.primaryCause, selectedLanguage)}</p>
            </div>
          </div>

          {/* 3. PRECAUTION */}
          <div className="bg-surface-variant/50 p-md rounded-xl border border-outline-variant/30">
            <h4 className="font-bold text-xs text-tertiary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">shield</span>
              <span>Precautions</span>
            </h4>
            <ul className="space-y-1.5 text-xs text-on-surface-variant">
              {disease.precautions.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-tertiary text-base shrink-0 mt-0.5">verified_user</span>
                  <span>{translateText(p, selectedLanguage)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. CURE / MANAGEMENT */}
          <div className="bg-primary-container/25 p-md rounded-xl border border-primary/40">
            <h4 className="font-bold text-xs text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-base">healing</span>
              <span>Cure & Chemical / Organic Management</span>
            </h4>
            <div className="text-xs text-on-surface space-y-1.5">
              {(disease.cureAndManagement || [disease.treatment]).map((c, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-primary text-base shrink-0 mt-0.5">medication</span>
                  <span>{translateText(c, selectedLanguage)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 5. WHEN TO SEEK HELP */}
          {disease.whenToSeekHelp && (
            <div className="p-3 rounded-xl bg-error-container/15 border border-error/30 flex items-start gap-2 text-xs">
              <span className="material-symbols-outlined text-error text-base shrink-0 mt-0.5">info</span>
              <div>
                <span className="font-bold text-error uppercase text-[10px]">When to Seek Expert Help:</span>
                <p className="text-on-surface-variant mt-0.5">{disease.whenToSeekHelp}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
