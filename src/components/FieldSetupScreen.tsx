import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Point, CropSuggestion } from '../types/farm';
import { t, translateCrop, translateText } from '../services/i18n';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { FieldSwitcher } from './FieldSwitcher';
import { COMPREHENSIVE_CROP_CATALOG } from '../services/cropSuggestionService';

export const FieldSetupScreen: React.FC = () => {
  const {
    farmer,
    activeField,
    addField,
    saveFieldBoundary,
    selectCropForActiveField,
    setCurrentScreen,
    selectedLanguage,
    setSelectedLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
  } = useFarm();

  const [activeTab, setActiveTab] = useState<'boundary' | 'soil' | 'previous_crop' | 'crop_suggester'>('boundary');

  // Boundary Mapping State
  const [isMapping, setIsMapping] = useState<boolean>(false);
  const [points, setPoints] = useState<Point[]>(activeField.boundary.points);
  const [acres, setAcres] = useState<number>(activeField.acres);
  const [stepText, setStepText] = useState<string>('');

  // Add Field Modal State
  const [showAddFieldModal, setShowAddFieldModal] = useState<boolean>(false);
  const [newFieldName, setNewFieldName] = useState<string>('');
  const [newFieldAcres, setNewFieldAcres] = useState<number>(2.0);
  const [newFieldCrop, setNewFieldCrop] = useState<string>('Paddy');
  const [newFieldVillage, setNewFieldVillage] = useState<string>(farmer.village || 'Kovur');

  const currentStepText = stepText || (isMapping ? t('recordingGps', selectedLanguage) : t('walkAroundPrompt', selectedLanguage));

  const handleWalkAndMap = () => {
    setIsMapping(true);
    setStepText(t('recordingGps', selectedLanguage));

    setTimeout(() => {
      const simulatedPoints: Point[] = [
        { x: 18, y: 78, lat: 14.501, lng: 79.981 },
        { x: 28, y: 28, lat: 14.504, lng: 79.982 },
        { x: 72, y: 18, lat: 14.505, lng: 79.987 },
        { x: 88, y: 58, lat: 14.502, lng: 79.988 },
        { x: 62, y: 92, lat: 14.499, lng: 79.985 },
      ];
      setPoints(simulatedPoints);
      setAcres(activeField.acres || 2.4);
      setIsMapping(false);
      setStepText(t('fieldRecorded', selectedLanguage));
    }, 1800);
  };

  const handleSaveField = () => {
    saveFieldBoundary(points, acres);
  };

  const handleCreateNewField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldName.trim()) return;

    addField({
      name: newFieldName,
      acres: Number(newFieldAcres) || 2.0,
      location: {
        district: farmer.district,
        village: newFieldVillage,
      },
      boundary: {
        id: `boundary-${Date.now()}`,
        name: newFieldName,
        acres: Number(newFieldAcres) || 2.0,
        isRecorded: true,
        savedAt: new Date().toLocaleDateString(),
        points: [
          { x: 20, y: 80, lat: 14.501, lng: 79.981 },
          { x: 30, y: 30, lat: 14.504, lng: 79.982 },
          { x: 70, y: 20, lat: 14.505, lng: 79.987 },
          { x: 85, y: 60, lat: 14.502, lng: 79.988 },
        ],
      },
      activeCrop: newFieldCrop,
      sowingDate: '2026-08-01',
      cropAgeDays: 30,
      growthStage: {
        stageName: 'Vegetative Stage',
        startDay: 21,
        endDay: 60,
        description: 'Vegetative growth',
        keyCareTips: ['Apply recommended N-P-K'],
      },
      soilProfile: {
        soilType: 'Red Sandy Loam',
        testedAt: 'Recent',
        ph: 6.6,
        phInterpretation: 'Suitable (Optimal)',
        nitrogenKgHa: 210,
        nitrogenInterpretation: 'Medium (Adequate)',
        phosphorusKgHa: 24,
        phosphorusInterpretation: 'Medium',
        potassiumKgHa: 180,
        potassiumInterpretation: 'Medium (Adequate)',
        organicCarbonPercent: 0.5,
        organicCarbonInterpretation: 'Medium',
        electricalConductivityDsM: 0.45,
        ecInterpretation: 'Normal / Safe',
      },
      previousCropHistory: [],
      sensors: {
        fieldId: `field-${Date.now()}`,
        overallMoisture: 40,
        airTemp: 33,
        humidity: 60,
        airQuality: 'Good',
        cropHealthPercent: 88,
        cropHealthStatus: 'GOOD',
        actionRequired: null,
        nodes: [],
      },
      registeredDiseases: [],
      motorStatus: {
        isOnline: true,
        isRunning: false,
        activeSectorId: null,
        isSimulated: true,
        history: [],
      },
    });

    setShowAddFieldModal(false);
    setNewFieldName('');
  };

  return (
    <div className="bg-background text-on-background antialiased font-body-md min-h-screen flex flex-col pb-[90px] md:pb-8">
      {/* TopAppBar */}
      <header className="sticky top-0 bg-background z-40 border-b border-surface-container-highest">
        <div className="flex items-center justify-between px-margin-mobile pt-sm pb-xs w-full max-w-screen-xl mx-auto h-[72px]">
          {/* Back Action */}
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-surface-container-high transition-colors text-primary"
          >
            <span className="material-symbols-outlined text-2xl">arrow_back</span>
          </button>

          {/* Field Quick Switcher & Headline */}
          <div className="flex items-center gap-2">
            <FieldSwitcher onAddNewField={() => setShowAddFieldModal(true)} />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddFieldModal(true)}
              className="px-3 py-1.5 bg-primary text-on-primary font-bold text-xs rounded-full flex items-center gap-1 shadow-sm hover:bg-primary-fixed"
            >
              <span className="material-symbols-outlined text-base">add_location_alt</span>
              <span className="hidden sm:inline">{t('addField', selectedLanguage)}</span>
            </button>

            {/* Language Translate Button */}
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

      {/* Main Canvas with 4 Functional Tabs */}
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-margin-mobile md:px-margin-desktop py-md flex flex-col gap-md">
        {/* Navigation Sub-Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface-container p-1.5 rounded-2xl border border-surface-variant">
          <button
            onClick={() => setActiveTab('boundary')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'boundary'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">polyline</span>
            <span>{t('gpsBoundary', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setActiveTab('crop_suggester')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'crop_suggester'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">psychology_alt</span>
            <span>{t('cropSuggester', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setActiveTab('soil')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'soil'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">biotech</span>
            <span>{t('soilProfile', selectedLanguage)}</span>
          </button>

          <button
            onClick={() => setActiveTab('previous_crop')}
            className={`py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'previous_crop'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-lg">history_edu</span>
            <span>{t('previousCrop', selectedLanguage)}</span>
          </button>
        </div>

        {/* TAB 1: GPS Boundary Walk & Map */}
        {activeTab === 'boundary' && (
          <div className="flex flex-col gap-md">
            <div className="relative w-full h-[360px] sm:h-[440px] rounded-2xl overflow-hidden border border-surface-variant bg-surface-container-lowest">
              <div className="absolute inset-0 w-full h-full opacity-60">
                <img
                  alt="Field Satellite View"
                  className="object-cover w-full h-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuArEXiJLp3VrtLKr02akC28goaaAr2l5SZKoOkUqzdlFX9-dtHJgCMEF_Fx5meqLT5goJTfrqd-pzMa0z8DwTBXbCXHygquNgzOTcjK_jy7Ste6sXW7okatvK6uoyK7LhriIqSmyNEeR1wLIsYIkTS5RleVwANaYPprDEjcF_6c5IQjxwcXZzB40tNNbjYFvvy1JgLbZlbqM16QXB4iZiOUyq44FmLoVXJDeYDwbd-T_HjVXlmPxsIw"
                />
              </div>

              {/* Polygon Overlay */}
              <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                  <polygon
                    className="transition-opacity duration-1000"
                    fill="#90d792"
                    fillOpacity="0.2"
                    points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                  ></polygon>
                  <polygon
                    className="draw-polygon"
                    fill="none"
                    points={points.map((p) => `${p.x},${p.y}`).join(' ')}
                    stroke="#90d792"
                    strokeDasharray="4 2"
                    strokeWidth="1.2"
                  ></polygon>
                  {points.map((p, idx) => (
                    <g key={idx} transform={`translate(${p.x}, ${p.y})`}>
                      <circle cx="0" cy="0" fill="#90d792" r="2.5"></circle>
                      <circle cx="0" cy="0" fill="none" r="4.5" stroke="#90d792" strokeWidth="0.8"></circle>
                    </g>
                  ))}
                </svg>
              </div>

              {/* Information pill overlay */}
              <div className="absolute top-4 left-4 z-20 glass-panel px-3 py-1.5 rounded-xl flex items-center gap-2 border border-outline-variant/40">
                <span className="material-symbols-outlined text-primary text-base">pin_drop</span>
                <span className="text-xs font-bold text-on-surface">
                  {translateText(activeField.name, selectedLanguage)} ({acres} {t('acres', selectedLanguage)})
                </span>
              </div>
            </div>

            {/* Control Strip */}
            <div className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col sm:flex-row items-center justify-between gap-md">
              <div>
                <h3 className="font-headline-sm text-sm font-bold text-on-surface">{currentStepText}</h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {t('boundaryInstructions', selectedLanguage)}
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={handleWalkAndMap}
                  disabled={isMapping}
                  className={`flex-1 sm:flex-initial px-5 py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                    isMapping
                      ? 'bg-surface-variant text-on-surface-variant'
                      : 'bg-primary text-on-primary hover:bg-primary-fixed'
                  }`}
                >
                  <span className={`material-symbols-outlined text-lg ${isMapping ? 'animate-spin' : ''}`}>
                    {isMapping ? 'sync' : 'directions_walk'}
                  </span>
                  <span>{isMapping ? t('recordingGps', selectedLanguage) : t('walkAndMapField', selectedLanguage)}</span>
                </button>

                <button
                  onClick={handleSaveField}
                  className="px-5 py-3 rounded-xl font-bold text-xs bg-surface-container-high border border-primary/50 text-primary hover:bg-surface-variant transition-all shadow-sm"
                >
                  {t('saveBoundary', selectedLanguage)}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Crop Suggester (Requirement 5) */}
        {activeTab === 'crop_suggester' && (
          <div className="flex flex-col gap-md">
            <div className="p-md rounded-2xl bg-primary-container/20 border border-primary/40 flex flex-col gap-1">
              <div className="flex items-center gap-2 text-primary font-bold text-sm">
                <span className="material-symbols-outlined text-lg">psychology</span>
                <span>{translateText('Crop Suitability Engine', selectedLanguage)}</span>
              </div>
              <p className="text-xs text-on-surface leading-relaxed">
                {translateText('"These crops can be grown under your field conditions." Based on your soil profile, climate, and regional market trends. Select a crop to cultivate:', selectedLanguage)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
              {COMPREHENSIVE_CROP_CATALOG.map((crop) => {
                const isSelected = activeField.activeCrop.toLowerCase().includes(crop.cropName.split(' ')[0].toLowerCase());
                return (
                  <div
                    key={crop.cropName}
                    className={`p-md rounded-2xl border flex flex-col justify-between gap-md transition-all ${
                      isSelected
                        ? 'bg-primary-container/30 border-primary shadow-lg ring-1 ring-primary'
                        : 'bg-surface-container border-surface-variant hover:border-primary/40'
                    }`}
                  >
                    <div className="flex flex-col gap-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div className="w-10 h-10 rounded-xl bg-primary-container text-primary flex items-center justify-center font-bold">
                            <span className="material-symbols-outlined text-xl">{crop.icon}</span>
                          </div>
                          <div>
                            <h4 className="font-bold text-sm text-on-surface">{translateText(crop.cropName, selectedLanguage)}</h4>
                            <span className="text-[11px] text-on-surface-variant">
                              {t('duration', selectedLanguage) || 'Duration'}: {crop.cropDurationDays} {t('days', selectedLanguage)} • {t('water', selectedLanguage) || 'Water'}: {translateText(crop.waterRequirement, selectedLanguage)}
                            </span>
                          </div>
                        </div>

                        <span
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                            crop.suitabilityScore === 'High'
                              ? 'bg-primary/20 text-primary border border-primary/30'
                              : 'bg-[#a67b27]/20 text-[#f2cc81] border border-[#a67b27]/40'
                          }`}
                        >
                          {translateText(crop.suitabilityScore, selectedLanguage)} {translateText('Suitability', selectedLanguage)}
                        </span>
                      </div>

                      <p className="text-xs text-on-surface-variant">{translateText(crop.suitabilityReason, selectedLanguage)}</p>

                      {/* Economics Box */}
                      <div className="grid grid-cols-3 gap-2 p-2.5 rounded-xl bg-surface-container-low border border-surface-variant/40 text-center">
                        <div>
                          <div className="text-[10px] text-on-surface-variant">{t('expenditurePerAcre', selectedLanguage)}</div>
                          <div className="text-xs font-bold text-on-surface">₹{crop.expectedExpenditurePerAcre.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-on-surface-variant">{t('expYieldPerAcre', selectedLanguage)}</div>
                          <div className="text-xs font-bold text-primary">{crop.expectedYieldPerAcre}</div>
                        </div>
                        <div>
                          <div className="text-[10px] text-on-surface-variant">{t('expProfitPerAcre', selectedLanguage)}</div>
                          <div className="text-xs font-bold text-primary-fixed">₹{crop.expectedProfitPerAcre.toLocaleString()}</div>
                        </div>
                      </div>

                      {/* Risks */}
                      <div className="text-[11px] text-on-surface-variant">
                        <span className="font-bold text-on-surface">{translateText('Major Risks', selectedLanguage)}:</span> {crop.majorDiseaseRisks.map(r => translateText(r, selectedLanguage)).slice(0, 2).join(', ')}
                      </div>
                    </div>

                    <button
                      onClick={() => selectCropForActiveField(crop.cropName.split(' ')[0], '2026-07-14')}
                      className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                        isSelected
                          ? 'bg-primary text-on-primary shadow-sm'
                          : 'bg-surface-variant hover:bg-primary hover:text-on-primary text-on-surface'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isSelected ? 'check_circle' : 'agriculture'}
                      </span>
                      <span>{isSelected ? t('currentlySelectedCrop', selectedLanguage) : t('selectCropForField', selectedLanguage)}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: Soil Test Profile (Requirement 4) */}
        {activeTab === 'soil' && (
          <div className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col gap-md">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-headline-sm text-base text-on-surface">
                  {t('soilTestDetails', selectedLanguage)}: {translateText(activeField.name, selectedLanguage)}
                </h3>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {translateText('Type', selectedLanguage)}: {translateText(activeField.soilProfile.soilType, selectedLanguage)} • {t('testingLab', selectedLanguage)}: {translateText(activeField.soilProfile.testedAt, selectedLanguage)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-md">
              <div className="p-3 rounded-xl bg-surface-variant border border-outline-variant/30">
                <span className="text-xs text-on-surface-variant font-bold uppercase">{t('phLevel', selectedLanguage)}</span>
                <div className="text-2xl font-bold text-primary my-1">{activeField.soilProfile.ph}</div>
                <div className="text-xs text-primary font-semibold">{translateText(activeField.soilProfile.phInterpretation, selectedLanguage)}</div>
              </div>

              <div className="p-3 rounded-xl bg-surface-variant border border-outline-variant/30">
                <span className="text-xs text-on-surface-variant font-bold uppercase">{t('nitrogenN', selectedLanguage)}</span>
                <div className="text-2xl font-bold text-on-surface my-1">{activeField.soilProfile.nitrogenKgHa} kg/ha</div>
                <div className="text-xs text-on-surface-variant font-semibold">{translateText(activeField.soilProfile.nitrogenInterpretation, selectedLanguage)}</div>
              </div>

              <div className="p-3 rounded-xl bg-surface-variant border border-outline-variant/30">
                <span className="text-xs text-on-surface-variant font-bold uppercase">{t('phosphorusP', selectedLanguage)}</span>
                <div className="text-2xl font-bold text-primary my-1">{activeField.soilProfile.phosphorusKgHa} kg/ha</div>
                <div className="text-xs text-primary font-semibold">{translateText(activeField.soilProfile.phosphorusInterpretation, selectedLanguage)}</div>
              </div>

              <div className="p-3 rounded-xl bg-surface-variant border border-outline-variant/30">
                <span className="text-xs text-on-surface-variant font-bold uppercase">{t('potassiumK', selectedLanguage)}</span>
                <div className="text-2xl font-bold text-on-surface my-1">{activeField.soilProfile.potassiumKgHa} kg/ha</div>
                <div className="text-xs text-on-surface-variant font-semibold">{translateText(activeField.soilProfile.potassiumInterpretation, selectedLanguage)}</div>
              </div>

              <div className="p-3 rounded-xl bg-surface-variant border border-outline-variant/30">
                <span className="text-xs text-on-surface-variant font-bold uppercase">{t('organicCarbon', selectedLanguage)}</span>
                <div className="text-2xl font-bold text-primary my-1">{activeField.soilProfile.organicCarbonPercent}%</div>
                <div className="text-xs text-primary font-semibold">{translateText(activeField.soilProfile.organicCarbonInterpretation, selectedLanguage)}</div>
              </div>

              <div className="p-3 rounded-xl bg-surface-variant border border-outline-variant/30">
                <span className="text-xs text-on-surface-variant font-bold uppercase">{t('electricalConductivity', selectedLanguage)}</span>
                <div className="text-2xl font-bold text-on-surface my-1">{activeField.soilProfile.electricalConductivityDsM} dS/m</div>
                <div className="text-xs text-on-surface-variant font-semibold">{translateText(activeField.soilProfile.ecInterpretation, selectedLanguage)}</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Previous Crop Information (Requirement 3) */}
        {activeTab === 'previous_crop' && (
          <div className="flex flex-col gap-md">
            <div className="p-md rounded-2xl bg-surface-container border border-surface-variant flex flex-col gap-md">
              <h3 className="font-headline-sm text-base text-on-surface">
                {translateText('Historical Harvests on', selectedLanguage)} {translateText(activeField.name, selectedLanguage)}
              </h3>

              {activeField.previousCropHistory.length > 0 ? (
                <div className="flex flex-col gap-md">
                  {activeField.previousCropHistory.map((rec) => (
                    <div key={rec.id} className="p-md rounded-xl bg-surface-variant/70 border border-outline-variant/30 flex flex-col gap-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-bold text-sm text-on-surface">
                            {translateCrop(rec.cropName, selectedLanguage)} {rec.cropVariety ? `(${rec.cropVariety})` : ''}
                          </h4>
                          <span className="text-xs text-on-surface-variant">
                            Sown: {rec.sowingDate} • Harvested: {rec.harvestDate}
                          </span>
                        </div>
                        <span className="px-3 py-1 rounded-full bg-primary/20 text-primary font-bold text-xs">
                          {rec.efficiencyPercent}% {t('efficiency', selectedLanguage) || 'Efficiency'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2.5 rounded-lg bg-surface-container text-center text-xs">
                        <div>
                          <span className="text-on-surface-variant">{t('expected', selectedLanguage) || 'Expected Yield'}:</span>
                          <div className="font-bold text-on-surface">{rec.expectedYieldTons} Tons</div>
                        </div>
                        <div>
                          <span className="text-on-surface-variant">{t('actual', selectedLanguage) || 'Actual Yield'}:</span>
                          <div className="font-bold text-primary">{rec.actualYieldTons} Tons</div>
                        </div>
                        <div>
                          <span className="text-on-surface-variant">{translateText('Main Factor', selectedLanguage)}:</span>
                          <div className="font-bold text-error truncate">{translateText(rec.mainLossFactor || 'None', selectedLanguage)}</div>
                        </div>
                      </div>

                      {rec.problemsEncountered.length > 0 && (
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="font-bold text-on-surface-variant uppercase text-[10px]">{translateText('Problems Encountered', selectedLanguage)}:</span>
                          <ul className="list-disc list-inside text-on-surface-variant space-y-0.5">
                            {rec.problemsEncountered.map((p, i) => (
                              <li key={i}>{translateText(p.description, selectedLanguage)} {p.impactTons ? `(-${p.impactTons}T)` : ''}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-on-surface-variant">{translateText('No previous crop history logged for this field yet.', selectedLanguage)}</p>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Add Field Modal */}
      {showAddFieldModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-surface-container-high border border-surface-variant rounded-2xl p-md w-full max-w-md shadow-2xl flex flex-col gap-md">
            <div className="flex items-center justify-between border-b border-surface-variant/40 pb-2">
              <h3 className="font-bold text-sm text-on-surface">{t('addField', selectedLanguage)}</h3>
              <button onClick={() => setShowAddFieldModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateNewField} className="flex flex-col gap-sm text-xs">
              <div>
                <label className="text-on-surface-variant font-semibold">{translateText('Field Name', selectedLanguage)}</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Field 04 - East Canal Plot"
                  value={newFieldName}
                  onChange={(e) => setNewFieldName(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-on-surface-variant font-semibold">{translateText('Area', selectedLanguage)} ({t('acres', selectedLanguage)})</label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={newFieldAcres}
                    onChange={(e) => setNewFieldAcres(parseFloat(e.target.value))}
                    className="w-full mt-1 p-2.5 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-on-surface-variant font-semibold">{translateText('Active Crop', selectedLanguage)}</label>
                  <select
                    value={newFieldCrop}
                    onChange={(e) => setNewFieldCrop(e.target.value)}
                    className="w-full mt-1 p-2.5 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="Paddy">{translateCrop('Paddy', selectedLanguage)}</option>
                    <option value="Cotton">{translateCrop('Cotton', selectedLanguage)}</option>
                    <option value="Chilli">{translateCrop('Chilli', selectedLanguage)}</option>
                    <option value="Groundnut">{translateCrop('Groundnut', selectedLanguage)}</option>
                    <option value="Maize">{translateCrop('Maize', selectedLanguage)}</option>
                    <option value="Red Gram">{translateCrop('Red Gram', selectedLanguage)}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-on-surface-variant font-semibold">{translateText('Village / Mandal', selectedLanguage)}</label>
                <input
                  type="text"
                  value={newFieldVillage}
                  onChange={(e) => setNewFieldVillage(e.target.value)}
                  className="w-full mt-1 p-2.5 rounded-xl bg-surface-container border border-surface-variant text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-variant/40">
                <button
                  type="button"
                  onClick={() => setShowAddFieldModal(false)}
                  className="px-4 py-2 rounded-xl bg-surface-variant text-on-surface font-bold text-xs"
                >
                  {t('cancel', selectedLanguage)}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-primary text-on-primary font-bold text-xs shadow hover:bg-primary-fixed"
                >
                  {t('addField', selectedLanguage)}
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
