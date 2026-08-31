import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import { t, translateSector } from '../services/i18n';

export const MotorControlWidget: React.FC = () => {
  const { motorStatus, startMotor, stopMotor, activeField, selectedLanguage } = useFarm();
  const [selectedSector, setSelectedSector] = useState<string>('Sector 03');

  return (
    <div className="bg-surface-container border border-surface-variant rounded-2xl p-md shadow-md flex flex-col gap-md">
      {/* Header with Simulation Badge */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <span className={`material-symbols-outlined ${motorStatus.isRunning ? 'text-primary animate-spin' : 'text-on-surface-variant'}`}>
            settings_suggest
          </span>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              {t('irrigationMotorControl', selectedLanguage) || 'Field Irrigation Pump'}
            </h2>
            <p className="text-[11px] text-on-surface-variant">
              {activeField.name} • {motorStatus.isRunning ? `Running in ${motorStatus.activeSectorId}` : 'Pump is Standby'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Simulation Indicator */}
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-tertiary/10 border border-tertiary/30 text-tertiary">
            Simulation (ESP32 Ready)
          </span>

          <span
            className={`w-3 h-3 rounded-full ${
              motorStatus.isRunning ? 'bg-primary animate-ping' : 'bg-outline-variant'
            }`}
          ></span>
        </div>
      </div>

      {/* Control Actions & Sector Picker */}
      <div className="p-3 rounded-xl bg-surface-variant/70 border border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
              motorStatus.isRunning ? 'bg-primary text-on-primary shadow-lg shadow-primary/20' : 'bg-surface-container-high text-on-surface-variant'
            }`}
          >
            <span className="material-symbols-outlined text-2xl">
              {motorStatus.isRunning ? 'power' : 'power_off'}
            </span>
          </div>

          <div>
            <div className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">
              {motorStatus.isRunning ? 'Motor Status: ACTIVE' : 'Motor Status: OFF'}
            </div>
            <div className="text-sm font-bold text-on-surface">
              {motorStatus.isRunning
                ? `Irrigating ${motorStatus.activeSectorId} (Started: ${motorStatus.startedAt})`
                : 'Select sector and activate pump'}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {!motorStatus.isRunning ? (
            <>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="bg-surface-container text-on-surface text-xs font-bold px-3 py-2 rounded-xl border border-surface-variant focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Sector 03">Sector 03 (Dry - 21%)</option>
                <option value="Sector 01">Sector 01 (42%)</option>
                <option value="Sector 02">Sector 02 (36%)</option>
                <option value="Sector 04">Sector 04 (39%)</option>
                <option value="All Sectors (Main Valve)">All Sectors</option>
              </select>

              <button
                onClick={() => startMotor(selectedSector)}
                className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-xl shadow hover:bg-primary-fixed transition-colors flex items-center gap-1 shrink-0"
              >
                <span className="material-symbols-outlined text-sm">play_arrow</span>
                {t('startMotor', selectedLanguage) || 'Start Motor'}
              </button>
            </>
          ) : (
            <button
              onClick={stopMotor}
              className="px-4 py-2 bg-error text-on-error font-bold text-xs rounded-xl shadow hover:bg-error/90 transition-colors flex items-center gap-1 shrink-0"
            >
              <span className="material-symbols-outlined text-sm">stop</span>
              {t('stopMotor', selectedLanguage) || 'Stop Motor'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
