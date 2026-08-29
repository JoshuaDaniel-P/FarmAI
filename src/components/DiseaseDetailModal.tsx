import React from 'react';
import { DiseaseInfo } from '../types/farm';

interface Props {
  disease: DiseaseInfo | null;
  onClose: () => void;
}

export const DiseaseDetailModal: React.FC<Props> = ({ disease, onClose }) => {
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

        <div className="flex items-center gap-sm mb-md">
          <div className="w-12 h-12 rounded-xl bg-surface-variant flex items-center justify-center text-error border border-error/20">
            <span className="material-symbols-outlined text-3xl">{disease.icon}</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">{disease.diseaseName}</h3>
            <p className="font-body-md text-body-md text-on-surface-variant">{disease.crop} Intelligence Module</p>
          </div>
        </div>

        <div className="space-y-md">
          {/* Risk Level & Prediction */}
          <div className="bg-surface-variant p-sm rounded-xl border border-outline-variant/30 flex flex-col gap-xs">
            <div className="flex justify-between items-center">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Current Risk</span>
              <span className={`px-sm py-xs rounded-lg font-label-lg text-label-lg ${disease.riskBadgeColor}`}>
                {disease.riskLevel} Risk
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface mt-1">{disease.currentRiskPrediction}</p>
          </div>

          {/* Symptoms */}
          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface mb-2 uppercase tracking-wider">Observed Symptoms</h4>
            <ul className="space-y-2">
              {disease.symptoms.map((s, idx) => (
                <li key={idx} className="flex items-start gap-2 text-on-surface font-body-md">
                  <span className="material-symbols-outlined text-primary text-lg mt-0.5">check_circle</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cause & Favorable Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
            <div className="bg-surface-variant p-sm rounded-xl border border-outline-variant/30">
              <h5 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Primary Cause</h5>
              <p className="font-body-md text-on-surface">{disease.primaryCause}</p>
            </div>
            <div className="bg-surface-variant p-sm rounded-xl border border-outline-variant/30">
              <h5 className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-1">Favorable Conditions</h5>
              <p className="font-body-md text-on-surface">{disease.favorableConditions}</p>
            </div>
          </div>

          {/* Precautions */}
          <div>
            <h4 className="font-label-lg text-label-lg text-on-surface mb-2 uppercase tracking-wider">Preventive Precautions</h4>
            <ul className="space-y-2">
              {disease.precautions.map((p, idx) => (
                <li key={idx} className="flex items-start gap-2 text-on-surface-variant font-body-md">
                  <span className="material-symbols-outlined text-tertiary text-lg mt-0.5">shield</span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Treatment */}
          <div className="bg-primary-container/40 border border-primary/30 p-md rounded-xl">
            <h4 className="font-headline-sm text-headline-sm text-primary mb-1">Recommended Treatment & Cure</h4>
            <p className="font-body-lg text-on-primary-container leading-relaxed">{disease.treatment}</p>
          </div>
        </div>

        <div className="mt-md pt-sm border-t border-surface-variant flex justify-end">
          <button
            onClick={onClose}
            className="px-md py-sm bg-primary text-on-primary font-label-lg text-label-lg rounded-lg hover:bg-primary-fixed transition-colors"
          >
            Close Analysis
          </button>
        </div>
      </div>
    </div>
  );
};
