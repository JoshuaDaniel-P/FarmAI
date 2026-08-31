import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { t, translateCrop, translateText } from '../services/i18n';
import { INITIAL_DAY_UPDATES } from '../services/mockData';
import { DayCropUpdate } from '../types/farm';

export const CropTrackRecord: React.FC = () => {
  const { farmer, selectedLanguage, setCurrentScreen } = useFarm();
  const [showAllUpdates, setShowAllUpdates] = useState<boolean>(false);
  const [selectedDayUpdate, setSelectedDayUpdate] = useState<DayCropUpdate | null>(null);

  const totalDays = farmer.totalCropDays || 120;
  const currentDay = farmer.cropDay || 47;
  const daysRemaining = Math.max(0, totalDays - currentDay);
  const percentCompleted = Math.min(100, Math.round((currentDay / totalDays) * 100));

  const updates = INITIAL_DAY_UPDATES;
  const visibleUpdates = showAllUpdates ? updates : updates.slice(0, 3);

  // Stages definition with active state for Budding Stage
  const stages = [
    {
      id: 'germination',
      nameKey: 'stageSowingSeedling',
      fallbackName: 'Germination & Seedling',
      days: 'Days 1–15',
      isCompleted: true,
      isCurrent: false,
      icon: 'yard',
    },
    {
      id: 'vegetative',
      nameKey: 'stageVegetative',
      fallbackName: 'Vegetative Growth',
      days: 'Days 16–40',
      isCompleted: true,
      isCurrent: false,
      icon: 'grass',
    },
    {
      id: 'budding',
      nameKey: 'stageBudding',
      fallbackName: 'Budding Stage',
      days: 'Days 41–65',
      isCompleted: false,
      isCurrent: true,
      icon: 'spa',
    },
    {
      id: 'flowering',
      nameKey: 'stageFlowering',
      fallbackName: 'Flowering & Panicle',
      days: 'Days 66–90',
      isCompleted: false,
      isCurrent: false,
      icon: 'psychiatry',
    },
    {
      id: 'maturity',
      nameKey: 'stageMaturity',
      fallbackName: 'Maturity & Harvest Ready',
      days: 'Days 91–120',
      isCompleted: false,
      isCurrent: false,
      icon: 'agriculture',
    },
  ];

  return (
    <div className="bg-surface-container border border-surface-variant rounded-2xl p-md shadow-md flex flex-col gap-md">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-sm border-b border-surface-variant/60 pb-sm">
        <div className="flex items-center gap-xs">
          <div className="w-10 h-10 rounded-xl bg-primary-container flex items-center justify-center text-primary shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[24px]">timeline</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
              {t('dayWiseCropUpdate', selectedLanguage)}
            </h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              {translateCrop(farmer.activeCrop, selectedLanguage)} • {t('field', selectedLanguage)} 01 • {t('sowingDateLabel', selectedLanguage)}: {farmer.sowingDate}
            </p>
          </div>
        </div>

        {/* Top Summary Badge & Open Page Button */}
        <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
          <button
            onClick={() => setCurrentScreen('day-wise-track')}
            className="px-3 py-1.5 rounded-full bg-primary text-[#003911] hover:bg-primary-fixed flex items-center gap-1.5 font-label-sm text-[12px] font-bold shadow-sm transition-all"
            title="Open Dedicated Day Wise Track Page"
          >
            <span>{t('navDayWiseTrack', selectedLanguage)}</span>
            <span className="material-symbols-outlined text-[16px]">open_in_new</span>
          </button>
          <div className="px-3 py-1.5 rounded-full bg-[#1b110f] border border-primary/40 flex items-center gap-2 shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-primary font-bold">
              {t('day', selectedLanguage)} {currentDay} / {totalDays} {t('days', selectedLanguage)} ({percentCompleted}%)
            </span>
          </div>
        </div>
      </div>

      {/* HARVEST READINESS PROGRESS BAR CARD */}
      <div className="bg-surface-variant/40 border border-outline-variant/30 rounded-xl p-md flex flex-col gap-sm">
        {/* Metric Statistics Row */}
        <div className="grid grid-cols-3 gap-2 text-center pb-xs">
          <div className="flex flex-col items-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t('daysCompleted', selectedLanguage)}
            </span>
            <span className="font-headline-sm text-headline-sm text-primary font-bold">
              {currentDay} {t('days', selectedLanguage)}
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-outline-variant/30">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t('totalDaysToHarvest', selectedLanguage)}
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              {totalDays} {t('days', selectedLanguage)}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
              {t('daysLeftToHarvest', selectedLanguage)}
            </span>
            <span className="font-headline-sm text-headline-sm text-[#f2cc81] font-bold">
              {daysRemaining} {t('days', selectedLanguage)}
            </span>
          </div>
        </div>

        {/* The Progress Bar with Shaded Completed Region */}
        <div className="flex flex-col gap-1.5 pt-xs">
          <div className="flex justify-between items-center text-[12px] font-label-sm text-on-surface-variant">
            <span>{t('day', selectedLanguage)} 1 ({t('stageSowingSeedling', selectedLanguage).split('&')[0].trim()})</span>
            <span className="text-primary font-bold">
              {percentCompleted}% {t('daysCompleted', selectedLanguage)}
            </span>
            <span>{t('day', selectedLanguage)} {totalDays} ({t('readyToHarvest', selectedLanguage)})</span>
          </div>

          {/* Track Bar */}
          <div
            className="w-full h-7 bg-[#150c0a] border border-outline-variant/60 rounded-full p-1 relative overflow-hidden flex items-center shadow-inner"
            role="progressbar"
            aria-valuenow={currentDay}
            aria-valuemin={0}
            aria-valuemax={totalDays}
            aria-label="Harvest timeline progress"
          >
            {/* Background Grid / Milestone Hash Lines */}
            <div className="absolute inset-0 flex justify-between px-4 pointer-events-none opacity-20">
              <div className="w-[1px] h-full bg-surface-variant"></div>
              <div className="w-[1px] h-full bg-surface-variant"></div>
              <div className="w-[1px] h-full bg-surface-variant"></div>
              <div className="w-[1px] h-full bg-surface-variant"></div>
            </div>

            {/* Shaded Completed Region */}
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#1b5e20] via-[#2e7d32] to-[#90d792] transition-all duration-700 relative flex items-center justify-end pr-2 shadow-[0_0_15px_rgba(144,215,146,0.4)] group"
              style={{ width: `${percentCompleted}%` }}
            >
              {/* Shimmer stripe effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent animate-pulse rounded-full"></div>

              {/* Glowing End Marker Pin */}
              <div className="w-3.5 h-3.5 rounded-full bg-[#f3deda] border-2 border-[#1b5e20] shadow-[0_0_8px_#90d792] z-10"></div>
            </div>
          </div>

          {/* Sub-bar Milestone Labels */}
          <div className="flex justify-between items-center text-[11px] text-on-surface-variant/80 px-1">
            <span>{farmer.sowingDate}</span>
            <span className="text-primary font-semibold">
              {t('day', selectedLanguage)} {currentDay} ({t('buddingStage', selectedLanguage).split('(')[0].trim()})
            </span>
            <span>~{daysRemaining} {t('days', selectedLanguage)} {t('daysRemaining', selectedLanguage).toLowerCase()}</span>
          </div>
        </div>
      </div>

      {/* CROP STAGE INDICATOR SECTION (BELOW THE BAR) */}
      <div className="flex flex-col gap-sm">
        {/* Prominent Current Stage Callout Banner */}
        <div className="bg-gradient-to-r from-[#2a1d1b] via-[#332522] to-[#2a1d1b] border-2 border-primary/50 rounded-xl p-md flex flex-col md:flex-row md:items-center justify-between gap-md relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-36 h-36 bg-primary/15 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-start md:items-center gap-md z-10">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary flex items-center justify-center text-primary shrink-0 shadow-[0_0_15px_rgba(144,215,146,0.3)] animate-pulse">
              <span className="material-symbols-outlined text-[32px]">spa</span>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                  {t('currentCropStage', selectedLanguage)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-primary text-[#003911] font-label-sm text-[11px] font-extrabold shadow-sm">
                  {t('buddingStageActive', selectedLanguage)}
                </span>
              </div>
              <h3 className="font-headline-lg-mobile md:font-headline-md text-headline-md text-primary font-bold mt-0.5">
                {t('buddingStage', selectedLanguage)}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {t('buddingStageDesc', selectedLanguage)} • {t('day', selectedLanguage)} {currentDay} {translateCrop(farmer.activeCrop, selectedLanguage)}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-1.5 z-10 shrink-0 bg-[#1b110f]/80 p-3 rounded-lg border border-outline-variant/40">
            <div className="flex items-center gap-1.5 text-primary text-[13px] font-bold">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Crop Vigor: 88% Healthy</span>
            </div>
            <div className="text-[12px] text-on-surface-variant">
              Window: Days 41–65 ({currentDay - 40} / 25 days in stage)
            </div>
          </div>
        </div>

        {/* 5-STAGE ROADMAP STEPPER */}
        <div className="bg-surface-variant/30 border border-outline-variant/30 rounded-xl p-md flex flex-col gap-sm">
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
              {t('growthStages', selectedLanguage)}
            </span>
            <span className="font-label-sm text-[11px] text-primary">
              Stage 3 of 5 In Progress
            </span>
          </div>

          {/* Stepper Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5 pt-xs">
            {stages.map((stg) => {
              return (
                <div
                  key={stg.id}
                  className={`p-3 rounded-xl border flex flex-col justify-between gap-2 transition-all relative ${
                    stg.isCurrent
                      ? 'bg-[#2a1d1b] border-primary shadow-[0_0_12px_rgba(144,215,146,0.25)] ring-1 ring-primary'
                      : stg.isCompleted
                      ? 'bg-surface-container-high/60 border-primary/30 opacity-90'
                      : 'bg-surface-container-low/50 border-outline-variant/30 opacity-60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        stg.isCurrent
                          ? 'bg-primary text-[#003911]'
                          : stg.isCompleted
                          ? 'bg-primary-container text-primary'
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {stg.isCompleted ? 'check' : stg.icon}
                      </span>
                    </div>

                    <span
                      className={`font-label-sm text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        stg.isCurrent
                          ? 'bg-primary text-[#003911]'
                          : stg.isCompleted
                          ? 'bg-primary/10 text-primary border border-primary/30'
                          : 'bg-surface-variant text-on-surface-variant'
                      }`}
                    >
                      {stg.isCurrent ? 'Current' : stg.isCompleted ? 'Done' : 'Upcoming'}
                    </span>
                  </div>

                  <div>
                    <h4
                      className={`font-headline-sm text-[14px] font-bold leading-tight ${
                        stg.isCurrent ? 'text-primary' : 'text-on-surface'
                      }`}
                    >
                      {t(stg.nameKey, selectedLanguage) || stg.fallbackName}
                    </h4>
                    <p className="font-label-sm text-[11px] text-on-surface-variant mt-0.5">
                      {stg.days}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* DAY-WISE ACTIVITY & LOG TRACK RECORD */}
      <div className="bg-surface-variant/20 border border-outline-variant/30 rounded-xl p-md flex flex-col gap-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-xs">
            <span className="material-symbols-outlined text-primary text-[20px]">history_edu</span>
            <h3 className="font-headline-sm text-[16px] text-on-surface">
              {t('dayWiseActivityLog', selectedLanguage)}
            </h3>
          </div>
          <button
            onClick={() => setShowAllUpdates(!showAllUpdates)}
            className="text-primary hover:text-primary-fixed text-[13px] font-label-sm flex items-center gap-1 transition-colors"
          >
            <span>{showAllUpdates ? 'Show Less' : `View All (${updates.length} Days)`}</span>
            <span className="material-symbols-outlined text-[18px]">
              {showAllUpdates ? 'expand_less' : 'expand_more'}
            </span>
          </button>
        </div>

        {/* Timeline Log List */}
        <div className="flex flex-col gap-2.5 mt-xs">
          {visibleUpdates.map((item) => {
            const isToday = item.day === currentDay;
            return (
              <div
                key={item.day}
                onClick={() => setSelectedDayUpdate(selectedDayUpdate?.day === item.day ? null : item)}
                className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-sm cursor-pointer transition-all ${
                  isToday
                    ? 'bg-[#2a1d1b] border-primary/60 shadow-md'
                    : 'bg-surface-container/80 border-outline-variant/30 hover:border-outline'
                }`}
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center shrink-0 ${
                      isToday ? 'bg-primary text-[#003911] font-bold' : 'bg-surface-variant text-on-surface'
                    }`}
                  >
                    <span className="text-[10px] uppercase font-bold leading-none">Day</span>
                    <span className="text-[14px] font-extrabold leading-none">{item.day}</span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-headline-sm text-[14px] text-on-surface font-semibold">
                        {translateText(item.title, selectedLanguage)}
                      </h4>
                      {isToday && (
                        <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/40 text-[10px] font-bold">
                          {t('buddingStage', selectedLanguage)}
                        </span>
                      )}
                    </div>
                    <p className="font-body-md text-[13px] text-on-surface-variant line-clamp-1 mt-0.5">
                      {translateText(item.summary, selectedLanguage)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 self-end sm:self-center">
                  <span className="text-[12px] text-on-surface-variant/80 font-label-sm">
                    {item.date}
                  </span>
                  <div className="flex items-center gap-1 text-primary text-[12px] font-bold bg-primary/10 px-2 py-1 rounded-md border border-primary/20">
                    <span className="material-symbols-outlined text-[14px]">eco</span>
                    <span>{item.healthPercent}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Modal/Card popup if an update is clicked */}
        {selectedDayUpdate && (
          <div className="mt-2 p-3.5 rounded-xl bg-[#1b110f] border border-primary/40 flex flex-col gap-2 animate-fadeIn">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">{selectedDayUpdate.icon}</span>
                <span className="font-headline-sm text-[14px] text-primary font-bold">
                  Day {selectedDayUpdate.day} Detail: {selectedDayUpdate.title}
                </span>
              </div>
              <button
                onClick={() => setSelectedDayUpdate(null)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="font-body-md text-[13px] text-on-surface">
              {selectedDayUpdate.summary}
            </p>
            <div className="flex items-center gap-3 text-[12px] text-on-surface-variant pt-1 border-t border-surface-variant flex-wrap">
              <span>Stage: <strong>{selectedDayUpdate.stage}</strong></span>
              <span>•</span>
              <span>Health Index: <strong>{selectedDayUpdate.healthPercent}%</strong></span>
              <span>•</span>
              <span>Recorded: <strong>{selectedDayUpdate.date}</strong></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
