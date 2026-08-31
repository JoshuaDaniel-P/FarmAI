import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { t, translateCrop, translateName, translateText } from '../services/i18n';
import { INITIAL_DAY_UPDATES } from '../services/mockData';
import { DayCropUpdate } from '../types/farm';
import { LanguageSelectorModal } from './LanguageSelectorModal';

export const DayWiseTrackScreen: React.FC = () => {
  const {
    farmer,
    setCurrentScreen,
    selectedLanguage,
    setSelectedLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
  } = useFarm();

  const [visibleCount, setVisibleCount] = useState<number>(5); // Show recent 5 days by default
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'budding' | 'vegetative' | 'germination'>('all');
  const [selectedDayDetail, setSelectedDayDetail] = useState<DayCropUpdate | null>(null);
  const [searchDayQuery, setSearchDayQuery] = useState<string>('');
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState<boolean>(false);
  const [allUpdates, setAllUpdates] = useState<DayCropUpdate[]>(INITIAL_DAY_UPDATES);
  const [newNoteDay, setNewNoteDay] = useState<number>(farmer.cropDay);
  const [newNoteTitle, setNewNoteTitle] = useState<string>('');
  const [newNoteSummary, setNewNoteSummary] = useState<string>('');
  const [newNoteTask, setNewNoteTask] = useState<string>('');

  const totalDays = farmer.totalCropDays || 120;
  const currentDay = farmer.cropDay || 47;
  const daysRemaining = Math.max(0, totalDays - currentDay);
  const percentCompleted = Math.min(100, Math.round((currentDay / totalDays) * 100));

  // 5 Stages Roadmap definition
  const stages = [
    {
      id: 'germination',
      nameKey: 'stageSowingSeedling',
      fallbackName: 'Germination & Seedling',
      days: 'Days 1–15',
      isCompleted: true,
      isCurrent: false,
      icon: 'yard',
      desc: 'Nursery setup, seed treatment, radicle sprouting, puddling & transplantation',
    },
    {
      id: 'vegetative',
      nameKey: 'stageVegetative',
      fallbackName: 'Vegetative Growth',
      days: 'Days 16–40',
      isCompleted: true,
      isCurrent: false,
      icon: 'grass',
      desc: 'Active tillering, cono-weeding, top-dress nitrogen, and canopy expansion',
    },
    {
      id: 'budding',
      nameKey: 'stageBudding',
      fallbackName: 'Budding Stage',
      days: 'Days 41–65',
      isCompleted: false,
      isCurrent: true,
      icon: 'spa',
      desc: 'Apical meristem transition, panicle initiation & potassium top-dress',
    },
    {
      id: 'flowering',
      nameKey: 'stageFlowering',
      fallbackName: 'Flowering & Panicle',
      days: 'Days 66–90',
      isCompleted: false,
      isCurrent: false,
      icon: 'psychiatry',
      desc: 'Heading, anthesis, pollination, and spikelet formation',
    },
    {
      id: 'maturity',
      nameKey: 'stageMaturity',
      fallbackName: 'Maturity & Harvest Ready',
      days: 'Days 91–120',
      isCompleted: false,
      isCurrent: false,
      icon: 'agriculture',
      desc: 'Milking, dough stage, golden grain hardening, and field harvesting',
    },
  ];

  // Filtering updates
  const filteredUpdates = allUpdates.filter((item) => {
    if (searchDayQuery.trim()) {
      const q = searchDayQuery.trim().toLowerCase();
      const matchDay = item.day.toString() === q || `day ${item.day}`.includes(q);
      const matchText = item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q) || item.tasks.some(t => t.toLowerCase().includes(q));
      if (!matchDay && !matchText) return false;
    }
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'budding') return item.stage.toLowerCase().includes('budding');
    if (selectedFilter === 'vegetative') return item.stage.toLowerCase().includes('vegetative');
    if (selectedFilter === 'germination') return item.stage.toLowerCase().includes('germination') || item.stage.toLowerCase().includes('seedling');
    return true;
  });

  const displayedUpdates = filteredUpdates.slice(0, visibleCount);
  const hasMore = visibleCount < filteredUpdates.length;

  const handleReadMore = () => {
    // Reveal more days or expand all
    setVisibleCount((prev) => Math.min(filteredUpdates.length, prev + 10));
  };

  const handleShowAll = () => {
    setVisibleCount(filteredUpdates.length);
  };

  const handleShowLess = () => {
    setVisibleCount(5);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteTitle.trim()) return;

    const newEntry: DayCropUpdate = {
      day: Number(newNoteDay),
      date: 'Just Now',
      stage: 'Budding Stage',
      title: newNoteTitle.trim(),
      summary: newNoteSummary.trim() || 'Daily field observation recorded by farmer.',
      tasks: newNoteTask.trim() ? [newNoteTask.trim()] : ['Field inspection and visual assessment completed by farmer'],
      inputsApplied: 'Farmer Custom Observation',
      category: 'inspection',
      status: 'action_taken',
      icon: 'note_alt',
      healthPercent: 88,
    };

    setAllUpdates([newEntry, ...allUpdates]);
    setNewNoteTitle('');
    setNewNoteSummary('');
    setNewNoteTask('');
    setIsAddNoteModalOpen(false);
  };

  return (
    <div className="bg-background text-on-surface antialiased pb-[90px] md:pb-8 font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* Top Navigation Bar */}
      <header className="bg-background text-primary-fixed flex flex-col justify-between px-margin-mobile pt-sm pb-xs w-full max-w-screen-xl mx-auto md:px-margin-desktop sticky top-0 z-40 border-b border-surface-container-highest/40 backdrop-blur-md bg-background/90">
        <div className="flex items-center justify-between w-full h-16">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors"
              title={t('back', selectedLanguage)}
              aria-label={t('back', selectedLanguage)}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <div>
              <h1 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">timeline</span>
                <span>{t('navDayWiseTrack', selectedLanguage)}</span>
              </h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                {translateCrop(farmer.activeCrop, selectedLanguage)} • {translateText(farmer.fieldName, selectedLanguage)} • {translateName(farmer.name, selectedLanguage)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddNoteModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-primary text-[#003911] font-label-sm text-[13px] font-bold hover:bg-primary-fixed transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Log Day Task</span>
            </button>

            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="w-10 h-10 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center border border-primary/30 transition-all shadow-sm"
              title={t('selectLanguage', selectedLanguage)}
            >
              <span className="material-symbols-outlined text-[22px]">translate</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-screen-xl mx-auto px-margin-mobile md:px-margin-desktop pt-md pb-xl flex flex-col gap-md">
        {/* KPI OVERVIEW HERO ROW */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-md">
          {/* Card 1: Completed Days */}
          <div className="bg-surface-container border border-surface-variant rounded-2xl p-md flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                {t('daysCompleted', selectedLanguage)}
              </span>
              <span className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">calendar_today</span>
              </span>
            </div>
            <div className="mt-2">
              <span className="font-headline-lg text-headline-lg text-primary font-bold">
                {currentDay}
              </span>
              <span className="text-on-surface-variant text-[14px] ml-1.5">
                / {totalDays} {t('days', selectedLanguage)}
              </span>
            </div>
            <p className="text-[12px] text-primary font-semibold mt-1">
              {percentCompleted}% of growth cycle finished
            </p>
          </div>

          {/* Card 2: Current Stage */}
          <div className="bg-surface-container border border-primary/40 rounded-2xl p-md flex flex-col justify-between shadow-md relative overflow-hidden ring-1 ring-primary/30">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                {t('currentCropStage', selectedLanguage)}
              </span>
              <span className="w-8 h-8 rounded-lg bg-primary text-[#003911] flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-[18px]">spa</span>
              </span>
            </div>
            <div className="mt-2">
              <span className="font-headline-sm text-headline-sm text-primary font-extrabold leading-tight">
                {t('buddingStage', selectedLanguage).split('(')[0].trim()}
              </span>
            </div>
            <p className="text-[12px] text-on-surface-variant mt-1">
              Active Window: Days 41–65 ({currentDay - 40} days in stage)
            </p>
          </div>

          {/* Card 3: Days Remaining */}
          <div className="bg-surface-container border border-surface-variant rounded-2xl p-md flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                {t('daysLeftToHarvest', selectedLanguage)}
              </span>
              <span className="w-8 h-8 rounded-lg bg-[#f2cc81]/20 text-[#f2cc81] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">hourglass_top</span>
              </span>
            </div>
            <div className="mt-2">
              <span className="font-headline-lg text-headline-lg text-[#f2cc81] font-bold">
                {daysRemaining}
              </span>
              <span className="text-on-surface-variant text-[14px] ml-1.5">
                {t('days', selectedLanguage)}
              </span>
            </div>
            <p className="text-[12px] text-on-surface-variant mt-1">
              Ready for harvest around Day {totalDays}
            </p>
          </div>

          {/* Card 4: Sowing & Health */}
          <div className="bg-surface-container border border-surface-variant rounded-2xl p-md flex flex-col justify-between shadow-md relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                {t('sowingDateLabel', selectedLanguage)}
              </span>
              <span className="w-8 h-8 rounded-lg bg-surface-variant text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">yard</span>
              </span>
            </div>
            <div className="mt-2">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                {farmer.sowingDate}
              </span>
            </div>
            <p className="text-[12px] text-primary font-semibold mt-1">
              Field Vigor: 88% (Optimal Growth)
            </p>
          </div>
        </div>

        {/* PRIMARY HARVEST TIMELINE PROGRESS BAR SECTION */}
        <div className="bg-surface-container border border-surface-variant rounded-2xl p-md shadow-md flex flex-col gap-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary text-[24px]">flag</span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  {t('totalDaysToHarvest', selectedLanguage)}: {totalDays} {t('days', selectedLanguage)}
                </h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  {t('day', selectedLanguage)} {currentDay} of {totalDays} {t('days', selectedLanguage)} Completed • {daysRemaining} {t('days', selectedLanguage)} {t('daysRemaining', selectedLanguage).toLowerCase()}
                </p>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-[#1b110f] border border-primary/40 text-primary font-label-sm text-[13px] font-bold self-start sm:self-auto flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>{percentCompleted}% Completed</span>
            </div>
          </div>

          {/* Large Progress Bar with Shaded Region */}
          <div className="flex flex-col gap-2 pt-xs">
            <div className="flex justify-between items-center text-[12px] font-label-sm text-on-surface-variant">
              <span>{t('day', selectedLanguage)} 1 (Sowing: {farmer.sowingDate})</span>
              <span className="text-primary font-bold">
                {t('day', selectedLanguage)} {currentDay} ({t('buddingStage', selectedLanguage).split('(')[0].trim()})
              </span>
              <span>{t('day', selectedLanguage)} {totalDays} ({t('readyToHarvest', selectedLanguage)})</span>
            </div>

            {/* Visual Bar with Shaded Filled Portion */}
            <div
              className="w-full h-9 bg-[#150c0a] border-2 border-outline-variant/60 rounded-full p-1 relative overflow-hidden flex items-center shadow-inner"
              role="progressbar"
              aria-valuenow={currentDay}
              aria-valuemin={0}
              aria-valuemax={totalDays}
              aria-label="Harvest timeline progress"
            >
              {/* Milestone vertical ticks */}
              <div className="absolute inset-0 flex justify-between px-6 pointer-events-none opacity-20">
                <div className="w-[1px] h-full bg-surface-variant"></div>
                <div className="w-[1px] h-full bg-surface-variant"></div>
                <div className="w-[1px] h-full bg-surface-variant"></div>
                <div className="w-[1px] h-full bg-surface-variant"></div>
              </div>

              {/* Shaded Region representing completed days */}
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#1b5e20] via-[#2e7d32] to-[#90d792] transition-all duration-700 relative flex items-center justify-end pr-2.5 shadow-[0_0_20px_rgba(144,215,146,0.45)] group"
                style={{ width: `${percentCompleted}%` }}
              >
                {/* Shimmer gradient line */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse rounded-full"></div>

                {/* Glowing position pin */}
                <div className="w-4 h-4 rounded-full bg-[#f3deda] border-2 border-[#1b5e20] shadow-[0_0_10px_#90d792] z-10"></div>
              </div>
            </div>

            {/* Milestone Footnote */}
            <div className="flex justify-between items-center text-[11px] text-on-surface-variant/80 px-1 pt-0.5">
              <span>Transplantation Established</span>
              <span className="text-primary font-semibold">Active Panicle Budding Window</span>
              <span>Estimated Harvest Window (~73 days)</span>
            </div>
          </div>
        </div>

        {/* STAGE ROADMAP & BUDDING STAGE SPOTLIGHT */}
        <div className="bg-surface-container border border-surface-variant rounded-2xl p-md shadow-md flex flex-col gap-md">
          {/* Spotlight Active Stage Banner */}
          <div className="bg-gradient-to-r from-[#2a1d1b] via-[#352623] to-[#2a1d1b] border-2 border-primary rounded-xl p-md flex flex-col lg:flex-row lg:items-center justify-between gap-md relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 w-44 h-44 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-start md:items-center gap-md z-10">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 border-2 border-primary flex items-center justify-center text-primary shrink-0 shadow-[0_0_20px_rgba(144,215,146,0.35)] animate-pulse">
                <span className="material-symbols-outlined text-[36px]">spa</span>
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant">
                    {t('currentCropStage', selectedLanguage)}
                  </span>
                  <span className="px-3 py-0.5 rounded-full bg-primary text-[#003911] font-label-sm text-[12px] font-extrabold shadow-sm">
                    {t('buddingStageActive', selectedLanguage)}
                  </span>
                </div>
                <h3 className="font-headline-lg-mobile md:font-headline-md text-headline-md text-primary font-bold mt-1">
                  {t('buddingStage', selectedLanguage)}
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1 max-w-2xl">
                  {t('buddingStageDesc', selectedLanguage)}. Shoot apical meristem transformation is actively underway. Maintain consistent soil hydration (40-45%) and apply scheduled potassium-nitrogen top-dress.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-2 z-10 shrink-0 bg-[#1b110f]/90 p-4 rounded-xl border border-primary/30">
              <div className="flex items-center gap-1.5 text-primary text-[14px] font-bold">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>Vigor Index: 88% (Optimal)</span>
              </div>
              <div className="text-[12px] text-on-surface-variant">
                Active Stage Window: Days 41 to 65
              </div>
            </div>
          </div>

          {/* 5 STAGES STEPPER */}
          <div className="flex flex-col gap-sm">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-sm text-[16px] text-on-surface">
                {t('growthStages', selectedLanguage)}
              </h3>
              <span className="text-[12px] text-primary font-label-sm">
                Stage 3 of 5 In Progress
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {stages.map((stg) => {
                return (
                  <div
                    key={stg.id}
                    className={`p-3.5 rounded-xl border flex flex-col justify-between gap-3 transition-all ${
                      stg.isCurrent
                        ? 'bg-[#2a1d1b] border-primary shadow-[0_0_15px_rgba(144,215,146,0.3)] ring-1 ring-primary'
                        : stg.isCompleted
                        ? 'bg-surface-container-high/70 border-primary/30 opacity-90'
                        : 'bg-surface-container-low/50 border-outline-variant/30 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                          stg.isCurrent
                            ? 'bg-primary text-[#003911] shadow-md'
                            : stg.isCompleted
                            ? 'bg-primary-container text-primary'
                            : 'bg-surface-variant text-on-surface-variant'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[20px]">
                          {stg.isCompleted ? 'check' : stg.icon}
                        </span>
                      </div>

                      <span
                        className={`font-label-sm text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase ${
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
                      <p className="font-body-md text-[11px] text-on-surface-variant/80 mt-1 line-clamp-2">
                        {stg.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* COMPLETE DAY-WISE TRACK RECORD (SINCE DAY 1) WITH TASKS & ACTIVITIES */}
        <div className="bg-surface-container border border-surface-variant rounded-2xl p-md shadow-md flex flex-col gap-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-md border-b border-surface-variant pb-md">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary text-[26px]">task_alt</span>
              <div>
                <h2 className="font-headline-sm text-headline-sm text-on-surface">
                  {t('dayWiseActivityLog', selectedLanguage)} (Day 1 to Day {currentDay})
                </h2>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  Showing {Math.min(visibleCount, filteredUpdates.length)} of {filteredUpdates.length} total recorded days since sowing
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              {/* Quick Day Search Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search Day # or activity..."
                  value={searchDayQuery}
                  onChange={(e) => {
                    setSearchDayQuery(e.target.value);
                    setVisibleCount(50); // Expand if user is searching
                  }}
                  className="w-full sm:w-56 bg-[#1b110f] border border-outline-variant/60 rounded-xl pl-9 pr-3 py-1.5 text-[13px] text-on-surface font-body-md focus:border-primary focus:outline-none"
                />
                <span className="material-symbols-outlined absolute left-2.5 top-2 text-on-surface-variant text-[18px]">
                  search
                </span>
                {searchDayQuery && (
                  <button
                    onClick={() => setSearchDayQuery('')}
                    className="absolute right-2.5 top-2 text-on-surface-variant hover:text-on-surface"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                )}
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center bg-surface-variant/40 p-1 rounded-xl border border-outline-variant/30 text-[12px] overflow-x-auto">
                <button
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3 py-1 rounded-lg transition-colors font-label-sm shrink-0 ${
                    selectedFilter === 'all' ? 'bg-primary text-[#003911] font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  All ({allUpdates.length})
                </button>
                <button
                  onClick={() => setSelectedFilter('budding')}
                  className={`px-3 py-1 rounded-lg transition-colors font-label-sm shrink-0 ${
                    selectedFilter === 'budding' ? 'bg-primary text-[#003911] font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Budding (7)
                </button>
                <button
                  onClick={() => setSelectedFilter('vegetative')}
                  className={`px-3 py-1 rounded-lg transition-colors font-label-sm shrink-0 ${
                    selectedFilter === 'vegetative' ? 'bg-primary text-[#003911] font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Vegetative (25)
                </button>
                <button
                  onClick={() => setSelectedFilter('germination')}
                  className={`px-3 py-1 rounded-lg transition-colors font-label-sm shrink-0 ${
                    selectedFilter === 'germination' ? 'bg-primary text-[#003911] font-bold' : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Seedling (15)
                </button>
              </div>
            </div>
          </div>

          {/* Daily Track Cards List */}
          <div className="flex flex-col gap-3.5">
            {displayedUpdates.map((item) => {
              const isToday = item.day === currentDay;
              return (
                <div
                  key={item.day}
                  className={`p-4 rounded-xl border flex flex-col gap-3 transition-all ${
                    isToday
                      ? 'bg-[#2a1d1b] border-primary shadow-lg ring-1 ring-primary/50'
                      : 'bg-surface-variant/25 border-outline-variant/35 hover:border-outline'
                  }`}
                >
                  {/* Top Bar of Card */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-surface-variant/40 pb-2.5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-sm ${
                          isToday
                            ? 'bg-primary text-[#003911] font-bold'
                            : 'bg-surface-container-high text-on-surface'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold leading-none">Day</span>
                        <span className="text-[16px] font-extrabold leading-none">{item.day}</span>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-headline-sm text-[16px] text-on-surface font-bold">
                            {translateText(item.title, selectedLanguage)}
                          </h3>
                          <span
                            className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                              item.stage.toLowerCase().includes('budding')
                                ? 'bg-primary/20 text-primary border border-primary/40'
                                : item.stage.toLowerCase().includes('vegetative')
                                ? 'bg-[#5fa364]/20 text-[#abf4ac] border border-[#5fa364]/30'
                                : 'bg-surface-variant text-on-surface-variant'
                            }`}
                          >
                            {item.stage}
                          </span>
                          {isToday && (
                            <span className="px-2.5 py-0.5 rounded-full bg-primary text-[#003911] text-[10px] font-extrabold shadow-sm animate-pulse">
                              TODAY
                            </span>
                          )}
                        </div>
                        <span className="text-[12px] text-on-surface-variant font-label-sm">
                          {item.date} • Field Sector East
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <div className="flex items-center gap-1 text-primary text-[12px] font-bold bg-primary/10 px-2.5 py-1 rounded-lg border border-primary/20">
                        <span className="material-symbols-outlined text-[15px]">eco</span>
                        <span>{item.healthPercent}% Vigor</span>
                      </div>
                    </div>
                  </div>

                  {/* Narrative Summary */}
                  <p className="font-body-md text-[13.5px] text-on-surface leading-relaxed">
                    {translateText(item.summary, selectedLanguage)}
                  </p>

                  {/* TASKS & ACTIVITIES PERFORMED ON THIS DAY */}
                  <div className="bg-[#1b110f] border border-outline-variant/30 rounded-lg p-3 flex flex-col gap-1.5">
                    <span className="text-[11px] font-label-sm uppercase tracking-wider text-primary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[15px]">checklist</span>
                      <span>Tasks & Activities Done on Day {item.day}:</span>
                    </span>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-0.5">
                      {item.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[12.5px] text-on-surface">
                          <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                            check_circle
                          </span>
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Inputs and Category Footer */}
                  {item.inputsApplied && (
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[12px] text-on-surface-variant pt-1 border-t border-surface-variant/40">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-primary">inventory_2</span>
                        <span><strong>Inputs Applied:</strong> {item.inputsApplied}</span>
                      </div>
                      <button
                        onClick={() => setSelectedDayDetail(selectedDayDetail?.day === item.day ? null : item)}
                        className="text-primary hover:text-primary-fixed font-label-sm text-[12px] flex items-center gap-1 self-start sm:self-auto"
                      >
                        <span>{selectedDayDetail?.day === item.day ? 'Hide Details' : 'View Full Day Specs'}</span>
                        <span className="material-symbols-outlined text-[16px]">
                          {selectedDayDetail?.day === item.day ? 'expand_less' : 'expand_more'}
                        </span>
                      </button>
                    </div>
                  )}

                  {/* Expanded Detail Dropdown */}
                  {selectedDayDetail?.day === item.day && (
                    <div className="p-3.5 rounded-lg bg-surface-container border border-primary/40 flex flex-col gap-2 animate-fadeIn text-[13px]">
                      <div className="flex items-center justify-between border-b border-surface-variant/50 pb-1.5">
                        <span className="font-headline-sm text-primary font-bold text-[14px]">
                          Day {item.day} Full Telemetry & Agronomic Record
                        </span>
                        <span className="text-[12px] text-on-surface-variant">{item.date}</span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[12px] text-on-surface-variant">
                        <div>Stage: <strong className="text-on-surface">{item.stage}</strong></div>
                        <div>Category: <strong className="text-on-surface capitalize">{item.category || 'Inspection'}</strong></div>
                        <div>Health: <strong className="text-primary">{item.healthPercent}%</strong></div>
                        <div>Action Status: <strong className="text-on-surface capitalize">{item.status.replace('_', ' ')}</strong></div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* READ MORE / PAGINATION / EXPAND OPTIONS BELOW RECENT 5 DAYS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-md pt-md border-t border-surface-variant">
            <div className="text-[13px] font-label-sm text-on-surface-variant">
              Showing {Math.min(visibleCount, filteredUpdates.length)} of {filteredUpdates.length} recorded days
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {hasMore && (
                <button
                  onClick={handleReadMore}
                  className="px-5 py-2.5 rounded-xl bg-primary text-[#003911] font-label-sm text-[13px] font-bold hover:bg-primary-fixed transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>Read More (+10 Days)</span>
                  <span className="material-symbols-outlined text-[18px]">expand_more</span>
                </button>
              )}

              {hasMore && (
                <button
                  onClick={handleShowAll}
                  className="px-4 py-2.5 rounded-xl bg-surface-variant text-on-surface font-label-sm text-[13px] hover:bg-surface-bright transition-colors"
                >
                  View All ({filteredUpdates.length} Days)
                </button>
              )}

              {visibleCount > 5 && (
                <button
                  onClick={handleShowLess}
                  className="px-4 py-2.5 rounded-xl bg-[#1b110f] border border-outline-variant text-on-surface-variant hover:text-on-surface font-label-sm text-[13px] transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">expand_less</span>
                  <span>Show Recent 5 Days Only</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Log New Day Observation Modal */}
      {isAddNoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-container border border-surface-variant rounded-2xl max-w-lg w-full p-md shadow-2xl flex flex-col gap-md">
            <div className="flex items-center justify-between border-b border-surface-variant pb-sm">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">edit_note</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">
                  Log Day Crop Task & Activity
                </h3>
              </div>
              <button
                onClick={() => setIsAddNoteModalOpen(false)}
                className="text-on-surface-variant hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddNote} className="flex flex-col gap-md">
              <div className="grid grid-cols-2 gap-sm">
                <div>
                  <label className="block text-[12px] font-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                    Crop Day #
                  </label>
                  <input
                    type="number"
                    value={newNoteDay}
                    onChange={(e) => setNewNoteDay(Number(e.target.value))}
                    className="w-full bg-[#1b110f] border border-outline-variant rounded-xl px-3 py-2 text-on-surface font-headline-sm text-[14px]"
                    min={1}
                    max={totalDays}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                    Current Stage
                  </label>
                  <input
                    type="text"
                    value="Budding Stage"
                    disabled
                    className="w-full bg-[#1b110f]/60 border border-outline-variant/40 rounded-xl px-3 py-2 text-primary font-bold text-[14px] cursor-not-allowed"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                  Activity Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Apical bud inspection & foliar spray"
                  value={newNoteTitle}
                  onChange={(e) => setNewNoteTitle(e.target.value)}
                  className="w-full bg-[#1b110f] border border-outline-variant rounded-xl px-3 py-2 text-on-surface font-body-md text-[14px]"
                  required
                />
              </div>

              <div>
                <label className="block text-[12px] font-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                  Task / Activity Done (Checklist item)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Checked water level (4cm) and sprayed zinc booster"
                  value={newNoteTask}
                  onChange={(e) => setNewNoteTask(e.target.value)}
                  className="w-full bg-[#1b110f] border border-outline-variant rounded-xl px-3 py-2 text-on-surface font-body-md text-[14px]"
                />
              </div>

              <div>
                <label className="block text-[12px] font-label-sm uppercase tracking-wider text-on-surface-variant mb-1">
                  Detailed Observation Notes
                </label>
                <textarea
                  placeholder="Add observations about shoot growth, tiller vigor, pest status..."
                  value={newNoteSummary}
                  onChange={(e) => setNewNoteSummary(e.target.value)}
                  rows={3}
                  className="w-full bg-[#1b110f] border border-outline-variant rounded-xl p-3 text-on-surface font-body-md text-[14px]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-xs">
                <button
                  type="button"
                  onClick={() => setIsAddNoteModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-surface-variant text-on-surface-variant font-label-sm hover:bg-surface-bright transition-colors"
                >
                  {t('cancel', selectedLanguage)}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary text-[#003911] font-label-sm font-bold hover:bg-primary-fixed transition-colors shadow-md"
                >
                  {t('save', selectedLanguage)} Task Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
