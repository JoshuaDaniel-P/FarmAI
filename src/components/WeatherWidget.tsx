import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { t, translateText } from '../services/i18n';

export const WeatherWidget: React.FC = () => {
  const { weatherData, weatherRecommendations, selectedLanguage } = useFarm();
  const [isForecastExpanded, setIsForecastExpanded] = useState(false);

  return (
    <div className="bg-surface-container border border-surface-variant rounded-2xl p-md shadow-md flex flex-col gap-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <span className="material-symbols-outlined text-primary">cloudy_snowing</span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface">
            {t('weatherForecast', selectedLanguage) || 'Weather Forecast & Guidance'}
          </h2>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary font-bold">
          {translateText(weatherData.condition, selectedLanguage)}
        </span>
      </div>

      {/* Multi-Day Forecast Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {weatherData.dailyForecast.map((day, idx) => (
          <div
            key={day.date}
            className={`p-3 rounded-xl border flex flex-col items-center justify-between text-center transition-all ${
              idx === 0
                ? 'bg-primary-container/30 border-primary/40 shadow-sm'
                : 'bg-surface-variant/70 border-outline-variant/30'
            }`}
          >
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              {idx === 0 ? t('today', selectedLanguage) || 'Today' : translateText(day.dayLabel, selectedLanguage)}
            </span>
            <span className="text-[11px] text-on-surface-variant/70 mb-1">{day.date}</span>

            <span className="material-symbols-outlined text-primary text-2xl my-1">
              {day.icon}
            </span>

            <div className="flex items-baseline gap-1 my-0.5">
              <span className="text-base font-bold text-on-surface">{day.tempMax}°</span>
              <span className="text-xs text-on-surface-variant">{day.tempMin}°</span>
            </div>

            <div className="flex items-center gap-1 text-[11px] text-on-surface-variant mt-1">
              <span className="material-symbols-outlined text-xs text-primary">water_drop</span>
              <span>{day.rainProbabilityPercent}%</span>
            </div>
          </div>
        ))}
      </div>

      {/* Weather-Based Farm Recommendations (Rule-based interpretation) */}
      {weatherRecommendations.length > 0 && (
        <div className="flex flex-col gap-2 pt-2 border-t border-surface-variant/50">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-on-surface-variant">
            <span className="material-symbols-outlined text-sm text-primary">lightbulb</span>
            <span>{t('weatherRecommendations', selectedLanguage) || 'Weather-Based Field Recommendations'}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {weatherRecommendations.map((rec) => (
              <div
                key={rec.id}
                className={`p-3 rounded-xl border flex flex-col justify-between gap-1.5 ${
                  rec.severity === 'warning'
                    ? 'bg-error-container/15 border-error/40'
                    : 'bg-surface-variant/60 border-outline-variant/30'
                }`}
              >
                <div className="flex items-start gap-2">
                  <span
                    className={`material-symbols-outlined text-lg shrink-0 mt-0.5 ${
                      rec.severity === 'warning' ? 'text-error' : 'text-primary'
                    }`}
                  >
                    {rec.type === 'irrigation' ? 'water' : rec.type === 'disease_risk' ? 'coronavirus' : 'thermostat'}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface">{translateText(rec.title, selectedLanguage)}</h4>
                    <p className="text-[12px] text-on-surface-variant leading-snug mt-0.5">{translateText(rec.message, selectedLanguage)}</p>
                  </div>
                </div>

                {rec.actionableTip && (
                  <div className="mt-1 pt-1.5 border-t border-outline-variant/20 flex items-center gap-1 text-[11px] text-primary font-medium">
                    <span className="material-symbols-outlined text-xs">task_alt</span>
                    <span>{translateText(rec.actionableTip, selectedLanguage)}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
