import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { t, translateText } from '../services/i18n';

export const SoilProfileCard: React.FC = () => {
  const { soilProfile, activeField, selectedLanguage } = useFarm();
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);

  return (
    <div className="bg-surface-container border border-surface-variant rounded-2xl p-md shadow-md flex flex-col gap-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-primary">biotech</span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              {t('soilTestDetails', selectedLanguage) || 'Soil Health Profile'}
            </h2>
            <p className="text-[11px] text-on-surface-variant">
              {translateText(soilProfile.soilType, selectedLanguage)} • {soilProfile.testedAt}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
          className="text-xs text-primary font-bold hover:underline flex items-center gap-0.5 px-2.5 py-1 rounded-full bg-surface-variant"
        >
          <span>{showTechnicalDetails ? 'Simple View' : 'Raw Lab Values'}</span>
          <span className="material-symbols-outlined text-sm">
            {showTechnicalDetails ? 'expand_less' : 'expand_more'}
          </span>
        </button>
      </div>

      {/* 4-Nutrient Primary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {/* pH */}
        <div className="p-3 rounded-xl bg-surface-variant/70 border border-outline-variant/30 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">pH Level</span>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-xl font-bold text-primary">{soilProfile.ph}</span>
          </div>
          <span className="text-[11px] font-semibold text-primary px-2 py-0.5 rounded bg-primary/10 w-fit">
            {soilProfile.phInterpretation}
          </span>
        </div>

        {/* Nitrogen */}
        <div className="p-3 rounded-xl bg-surface-variant/70 border border-outline-variant/30 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Nitrogen (N)</span>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-xl font-bold text-on-surface">
              {showTechnicalDetails ? `${soilProfile.nitrogenKgHa} kg/ha` : soilProfile.nitrogenInterpretation.split(' ')[0]}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-on-surface-variant px-2 py-0.5 rounded bg-surface-container w-fit">
            {soilProfile.nitrogenInterpretation}
          </span>
        </div>

        {/* Phosphorus */}
        <div className="p-3 rounded-xl bg-surface-variant/70 border border-outline-variant/30 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Phosphorus (P)</span>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-xl font-bold text-primary">
              {showTechnicalDetails ? `${soilProfile.phosphorusKgHa} kg/ha` : soilProfile.phosphorusInterpretation.split(' ')[0]}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-primary px-2 py-0.5 rounded bg-primary/10 w-fit">
            {soilProfile.phosphorusInterpretation}
          </span>
        </div>

        {/* Potassium */}
        <div className="p-3 rounded-xl bg-surface-variant/70 border border-outline-variant/30 flex flex-col justify-between">
          <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">Potassium (K)</span>
          <div className="flex items-baseline gap-1.5 my-1">
            <span className="text-xl font-bold text-on-surface">
              {showTechnicalDetails ? `${soilProfile.potassiumKgHa} kg/ha` : soilProfile.potassiumInterpretation.split(' ')[0]}
            </span>
          </div>
          <span className="text-[11px] font-semibold text-on-surface-variant px-2 py-0.5 rounded bg-surface-container w-fit">
            {soilProfile.potassiumInterpretation}
          </span>
        </div>
      </div>

      {/* Additional Soil Parameters in Detail View */}
      {showTechnicalDetails && (
        <div className="p-3 rounded-xl bg-surface-container-low border border-surface-variant/40 grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
          <div>
            <span className="text-on-surface-variant">Organic Carbon (OC):</span>
            <div className="font-bold text-on-surface mt-0.5">{soilProfile.organicCarbonPercent}% ({soilProfile.organicCarbonInterpretation})</div>
          </div>
          <div>
            <span className="text-on-surface-variant">Electrical Conductivity (EC):</span>
            <div className="font-bold text-on-surface mt-0.5">{soilProfile.electricalConductivityDsM} dS/m ({soilProfile.ecInterpretation})</div>
          </div>
          <div>
            <span className="text-on-surface-variant">Testing Lab:</span>
            <div className="font-bold text-on-surface mt-0.5 truncate">{soilProfile.labName || 'Government Soil Testing Lab'}</div>
          </div>
        </div>
      )}
    </div>
  );
};
