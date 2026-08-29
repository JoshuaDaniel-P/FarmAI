import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { Point } from '../types/farm';
import { t } from '../services/i18n';
import { LanguageSelectorModal } from './LanguageSelectorModal';

export const FieldSetupScreen: React.FC = () => {
  const {
    setCurrentScreen,
    saveFieldBoundary,
    fieldBoundary,
    selectedLanguage,
    setSelectedLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
  } = useFarm();
  const [isMapping, setIsMapping] = useState<boolean>(false);
  const [points, setPoints] = useState<Point[]>(fieldBoundary.points);
  const [acres, setAcres] = useState<number>(fieldBoundary.acres);
  const [stepText, setStepText] = useState<string>('Walk around your field to record the boundary.');

  const handleWalkAndMap = () => {
    setIsMapping(true);
    setStepText('Recording GPS boundary points...');

    setTimeout(() => {
      const simulatedPoints: Point[] = [
        { x: 18, y: 78, lat: 14.501, lng: 79.981 },
        { x: 28, y: 28, lat: 14.504, lng: 79.982 },
        { x: 72, y: 18, lat: 14.505, lng: 79.987 },
        { x: 88, y: 58, lat: 14.502, lng: 79.988 },
        { x: 62, y: 92, lat: 14.499, lng: 79.985 },
      ];
      setPoints(simulatedPoints);
      setAcres(2.4);
      setIsMapping(false);
      setStepText('Field boundary recorded! 2.4 Acres calculated.');
    }, 2000);
  };

  const handleSaveField = () => {
    saveFieldBoundary(points, acres);
  };

  return (
    <div className="bg-background text-on-background antialiased font-body-md min-h-screen flex flex-col relative overflow-hidden">
      {/* TopAppBar */}
      <header className="docked full-width top-0 bg-background z-40 flat no shadows border-b border-surface-container-highest">
        <div className="flex items-center justify-between px-margin-mobile pt-sm pb-xs w-full max-w-screen-xl mx-auto h-[72px] md:h-[88px]">
          {/* Back Action */}
          <button
            onClick={() => setCurrentScreen('dashboard')}
            className="flex items-center justify-center w-12 h-12 rounded-full hover:bg-surface-container-high transition-colors focus:outline-none focus:ring-2 focus:ring-primary group"
          >
            <span
              className="material-symbols-outlined text-primary group-active:scale-95 transition-transform duration-150"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 400" }}
            >
              arrow_back
            </span>
          </button>
          {/* Headline */}
          <h1 className="font-headline-md text-headline-md text-primary text-center flex-1 truncate px-4">
            {t('navFieldSetup', selectedLanguage)}
          </h1>
          {/* TOP-RIGHT TRANSLATE PIN BUTTON */}
          <button
            onClick={() => setIsLanguageModalOpen(true)}
            className="w-11 h-11 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center border border-primary/30 transition-all shadow-sm"
            title={t('selectLanguage', selectedLanguage)}
          >
            <span className="material-symbols-outlined text-[24px]">translate</span>
          </button>
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="flex-1 flex flex-col w-full h-[calc(100vh-160px)] relative">
        <div className="relative flex-1 w-full bg-surface-container-lowest overflow-hidden">
          <div className="absolute inset-0 w-full h-full opacity-60">
            <img
              alt="Field Satellite View"
              className="object-cover w-full h-full"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuArEXiJLp3VrtLKr02akC28goaaAr2l5SZKoOkUqzdlFX9-dtHJgCMEF_Fx5meqLT5goJTfrqd-pzMa0z8DwTBXbCXHygquNgzOTcjK_jy7Ste6sXW7okatvK6uoyK7LhriIqSmyNEeR1wLIsYIkTS5RleVwANaYPprDEjcF_6c5IQjxwcXZzB40tNNbjYFvvy1JgLbZlbqM16QXB4iZiOUyq44FmLoVXJDeYDwbd-T_HjVXlmPxsIw"
            />
          </div>

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
                strokeLinejoin="round"
                strokeWidth="1.5"
              ></polygon>
            </svg>

            <div className="absolute top-[80%] left-[20%] w-6 h-6 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary opacity-50 map-overlay-pulse"></div>
              <div className="w-3 h-3 rounded-full bg-primary shadow-lg ring-2 ring-background z-10"></div>
            </div>

            {points.map((p, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-surface border border-primary transform -translate-x-1/2 -translate-y-1/2 shadow-md"
                style={{ top: `${p.y}%`, left: `${p.x}%` }}
              ></div>
            ))}
          </div>

          <div className="absolute top-md left-1/2 transform -translate-x-1/2 z-20 w-11/12 max-w-sm">
            <div className="bg-surface-container-high/90 backdrop-blur-md rounded-full px-4 py-3 flex items-center shadow-lg border border-surface-container-highest">
              <span
                className="material-symbols-outlined text-primary mr-3"
                style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}
              >
                directions_walk
              </span>
              <p className="font-body-md text-body-md text-on-surface leading-tight">{stepText}</p>
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
            <div className="bg-surface-container/95 backdrop-blur-md rounded-lg px-6 py-4 flex flex-col items-center justify-center border-2 border-primary/30 shadow-xl">
              <span className="font-headline-lg text-headline-lg text-primary mb-1">{acres}</span>
              <span className="font-label-lg text-label-lg text-on-surface-variant uppercase tracking-widest">
                Acres
              </span>
            </div>
          </div>
        </div>

        <div className="w-full bg-surface-container rounded-t-[24px] shadow-[0_-8px_30px_rgba(0,0,0,0.4)] z-30 pt-sm pb-margin-mobile px-margin-mobile flex flex-col gap-md">
          <div className="w-12 h-1.5 bg-surface-variant rounded-full mx-auto mb-2"></div>
          <div className="flex flex-col gap-xs text-center md:text-left">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Step 1: Record Field Boundary</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Accurate boundaries ensure precise crop scheduling and market estimates.
            </p>
          </div>

          <div className="flex flex-col gap-sm mt-2">
            <button
              onClick={handleWalkAndMap}
              disabled={isMapping}
              className="w-full bg-primary hover:bg-primary-fixed-dim text-on-primary-fixed h-14 rounded-full flex items-center justify-center gap-3 transition-colors shadow-md active:scale-[0.98]"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 600" }}>
                satellite_alt
              </span>
              <span className="font-label-lg text-label-lg">{isMapping ? 'Recording GPS...' : 'Walk & Map'}</span>
            </button>

            <button
              onClick={handleSaveField}
              className="w-full bg-surface-container-highest hover:bg-secondary-container text-on-surface h-14 rounded-full flex items-center justify-center gap-3 transition-colors border border-outline-variant active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}>
                check_circle
              </span>
              <span className="font-label-lg text-label-lg">Save Field 01</span>
            </button>
          </div>
        </div>
      </main>

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
