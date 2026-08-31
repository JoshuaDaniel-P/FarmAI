import React from 'react';
import { useFarm } from '../context/FarmContext';
import { t, translateCrop, translateName, translateSector, translateText } from '../services/i18n';
import { NotificationDrawer } from './NotificationDrawer';
import { LanguageSelectorModal } from './LanguageSelectorModal';
import { FieldSwitcher } from './FieldSwitcher';
import { WeatherWidget } from './WeatherWidget';
import { SoilProfileCard } from './SoilProfileCard';
import { MotorControlWidget } from './MotorControlWidget';

export const DashboardScreen: React.FC = () => {
  const {
    farmer,
    activeField,
    sensors,
    setCurrentScreen,
    triggerIrrigation,
    notifications,
    isNotificationDrawerOpen,
    setIsNotificationDrawerOpen,
    selectedLanguage,
    setSelectedLanguage,
    isLanguageModalOpen,
    setIsLanguageModalOpen,
    markAllNotificationsRead,
    dismissNotification,
  } = useFarm();

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleNotificationAction = (notification: any) => {
    setIsNotificationDrawerOpen(false);
    if (notification.actionType === 'irrigation') {
      triggerIrrigation();
    } else if (notification.actionType === 'view_disease' || notification.actionType === 'view_weed') {
      setCurrentScreen('disease-weed');
    } else if (notification.actionType === 'view_weather') {
      // scroll to weather widget or stay in dashboard
    }
  };

  return (
    <div className="bg-background text-on-surface antialiased pb-[90px] md:pb-8 font-body-md text-body-md selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* Top App Bar */}
      <header className="bg-background text-primary-fixed flex flex-col justify-between px-margin-mobile pt-sm pb-xs w-full max-w-screen-xl mx-auto md:px-margin-desktop sticky top-0 z-40 border-b border-surface-container-highest/40">
        <div className="flex items-center justify-between w-full h-16">
          <div className="flex items-center gap-sm min-w-0">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container shrink-0">
              <img
                alt="Farmer Portrait"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIApBsvQSGN9pM5oS-4TKErfdj9Zewzc89JjDs7Fa8ww9U1-hpCxmZpQOMs-XdyG07nPb0Ekcw9Z9DpoHeBfCqKfcjfWW3GLf5hmLJds8gnOxpzBNFk4n_eKPcEANmY5eRKFN8keelEkvj_UV8GqF9ryhezcYq70Uqs380nlb6Sa6Z2cC0-kCJRvtGVuA36WmPcrb1Ox-QIrJvlFtnmD1L6BtJCTE0vnimzaqhLctl7CpNtmqwzi9h"
              />
            </div>
            <div className="min-w-0">
              <h1 className="font-headline-sm text-headline-sm text-on-surface truncate">
                {t('goodMorning', selectedLanguage)}, {translateName(farmer.name, selectedLanguage)}
              </h1>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider truncate">
                {translateCrop(activeField.activeCrop, selectedLanguage)} • {translateText(activeField.name, selectedLanguage)} • {t('day', selectedLanguage)} {activeField.cropAgeDays}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Field Quick Switcher */}
            <FieldSwitcher className="hidden sm:block" />

            {/* TOP-RIGHT TRANSLATE PIN BUTTON */}
            <button
              onClick={() => setIsLanguageModalOpen(true)}
              className="w-11 h-11 rounded-full bg-surface-container hover:bg-surface-container-high text-primary flex items-center justify-center border border-primary/30 transition-all shadow-sm"
              title={t('selectLanguage', selectedLanguage)}
            >
              <span className="material-symbols-outlined text-[24px]">translate</span>
            </button>

            {/* Header Notification Bell Icon */}
            <button
              onClick={() => setIsNotificationDrawerOpen(true)}
              className="w-11 h-11 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors relative"
              aria-label="Notifications"
            >
              <span className="material-symbols-outlined text-[24px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-error text-on-error text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-background animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Field Switcher Row */}
        <div className="sm:hidden pt-2 pb-1">
          <FieldSwitcher className="w-full" />
        </div>
      </header>

      {/* Main Content Canvas */}
      <main className="w-full max-w-screen-xl mx-auto px-margin-mobile md:px-margin-desktop pt-md pb-xl flex flex-col gap-md">
        {/* Crop Health Card & Ask Assistant Trigger */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-md">
          <div className="bg-[#2a1d1b] border border-[#3e322f] rounded-xl p-md md:col-span-8 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="flex justify-between items-start mb-md">
              <div className="flex items-center gap-xs">
                <span className="material-symbols-outlined text-primary">eco</span>
                <h2 className="font-label-lg text-label-lg text-on-surface-variant">
                  {t('cropHealthIndex', selectedLanguage)}
                </h2>
              </div>
              <div className="px-3 py-1 rounded-full bg-[rgba(144,215,146,0.1)] border border-primary text-primary font-label-sm text-label-sm">
                {sensors.cropHealthStatus === 'GOOD' ? t('stable', selectedLanguage) : t('attentionNeeded', selectedLanguage)}
              </div>
            </div>

            {/* Enlarged Crop Health Gauge */}
            <div className="flex items-center justify-center py-md">
              <div className="relative w-56 h-56 sm:w-60 sm:h-60 md:w-64 md:h-64 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="none" r="40" stroke="#3e322f" strokeWidth="7"></circle>
                  <circle
                    className="gauge-ring"
                    cx="50"
                    cy="50"
                    fill="none"
                    r="40"
                    stroke={sensors.cropHealthPercent >= 80 ? '#90d792' : '#f2cc81'}
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - sensors.cropHealthPercent / 100)}
                    strokeLinecap="round"
                    strokeWidth="7"
                  ></circle>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center pointer-events-none">
                  <span className="font-headline-lg text-[38px] sm:text-[44px] md:text-[48px] leading-none text-primary font-bold tracking-tight">
                    {sensors.cropHealthPercent}%
                  </span>
                  <span className="font-label-sm text-[11px] sm:text-[12px] md:text-[13px] text-on-surface-variant tracking-wider uppercase font-semibold mt-1.5 max-w-[150px] sm:max-w-[170px] leading-snug">
                    {sensors.cropHealthStatus === 'GOOD' ? t('good', selectedLanguage) : t('attentionNeeded', selectedLanguage)}
                  </span>
                </div>
              </div>
            </div>
            <p className="font-body-md text-body-md text-center text-on-surface-variant mt-sm">

              {translateText(activeField.growthStage.stageName, selectedLanguage)} • {t('day', selectedLanguage)} {activeField.cropAgeDays} {translateCrop(activeField.activeCrop, selectedLanguage)} ({activeField.acres} acres).

            </p>
          </div>

          <button
            onClick={() => setCurrentScreen('assistant')}
            className="bg-primary-container border-none flex flex-col items-center justify-center gap-sm hover:bg-[#004214] transition-colors relative overflow-hidden group min-h-[200px] md:col-span-4 rounded-xl p-md text-left"
          >
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-on-primary shadow-[0_0_20px_rgba(144,215,146,0.3)] group-hover:scale-110 transition-transform duration-300 z-10">
              <span className="material-symbols-outlined text-[32px]">mic</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-primary-container z-10 mt-xs">
              {t('askAssistant', selectedLanguage)}
            </span>
            <span className="text-xs text-on-surface-variant text-center px-4">
              Ask about {activeField.name} soil, weather, diseases or start pump
            </span>
          </button>
        </div>

        {/* PRIMARY ENVIRONMENTAL INDICATORS */}
        <div className="bg-surface-container border border-surface-variant rounded-2xl p-md shadow-md">
          <div className="flex items-center gap-xs mb-sm">
            <span className="material-symbols-outlined text-primary">thermostat</span>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">
              {t('fieldEnvironment', selectedLanguage)}
            </h2>
          </div>

          <div className="grid grid-cols-3 gap-md text-center">
            {/* Temp */}
            <div className="bg-surface-variant p-md rounded-xl border border-outline-variant/30 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl mb-1">thermostat</span>
              <span className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                {sensors.airTemp}°C
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">
                {t('airTemp', selectedLanguage)}
              </span>
            </div>

            {/* Humidity */}
            <div className="bg-surface-variant p-md rounded-xl border border-outline-variant/30 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl mb-1">water_drop</span>
              <span className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-on-surface">
                {sensors.humidity}%
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">
                {t('humidity', selectedLanguage)}
              </span>
            </div>

            {/* Air Quality */}
            <div className="bg-surface-variant p-md rounded-xl border border-outline-variant/30 flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-primary text-2xl mb-1">air</span>
              <span className="font-headline-lg text-headline-lg-mobile md:text-headline-lg text-primary">
                {t('good', selectedLanguage)}
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-1">
                {t('airQuality', selectedLanguage)}
              </span>
            </div>
          </div>
        </div>

        {/* WEATHER FORECAST & RECOMMENDATIONS WIDGET */}
        <WeatherWidget />

        {/* MOTOR & IRRIGATION CONTROL WIDGET */}
        <MotorControlWidget />

        {/* SOIL HEALTH PROFILE CARD */}
        <SoilProfileCard />

        {/* DEDICATED VERTICAL FOUR FIELD SECTORS SECTION */}
        <div className="bg-surface-container border border-surface-variant rounded-2xl p-md shadow-md flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary">water_drop</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                {t('fieldSoilMoisture', selectedLanguage)}
              </h2>
            </div>
            <span className="font-label-sm text-on-surface-variant">{t('liveReadings', selectedLanguage)}</span>
          </div>

          {/* Vertical Sectors 01 - 04 */}
          <div className="flex flex-col gap-md">
            {sensors.nodes.map((node) => (
              <div
                key={node.id}
                className={`p-md rounded-xl border flex flex-col md:flex-row md:items-center justify-between gap-sm transition-all ${
                  node.status === 'critical'
                    ? 'bg-error-container/20 border-error/50 shadow-lg'
                    : 'bg-surface-variant/70 border-outline-variant/30'
                }`}
              >
                <div className="flex items-center gap-md">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      node.status === 'critical' ? 'bg-error text-on-error animate-pulse' : 'bg-surface-container-high text-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-2xl">
                      {node.status === 'critical' ? 'warning' : 'grass'}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">{translateSector(node.name, selectedLanguage)}</h3>
                    <p className="font-body-md text-on-surface-variant">{translateText(node.sector, selectedLanguage)}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between md:justify-end gap-lg">
                  <div className="flex flex-col md:items-end">
                    <span className="font-label-sm text-on-surface-variant uppercase tracking-wider">
                      {t('fieldSoilMoisture', selectedLanguage).split('(')[0]}
                    </span>
                    <span
                      className={`font-headline-lg text-headline-lg-mobile md:text-headline-lg font-bold ${
                        node.status === 'critical' ? 'text-error' : 'text-primary'
                      }`}
                    >
                      {node.moisture}%
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span
                      className={`px-3 py-1 rounded-full font-label-lg text-label-lg mb-1 ${
                        node.status === 'critical'
                          ? 'bg-error text-on-error font-bold'
                          : 'bg-primary-container text-primary-fixed'
                      }`}
                    >
                      {node.status === 'critical' ? t('lowSoilMoisture', selectedLanguage) : t('good', selectedLanguage)}
                    </span>
                    {node.status === 'critical' && (
                      <button
                        onClick={triggerIrrigation}
                        className="px-3 py-1 bg-primary text-on-primary font-label-sm text-label-sm rounded-lg hover:bg-primary-fixed shadow-sm"
                      >
                        {t('startWater', selectedLanguage)}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* HERO COMMAND CENTER: Sensor Map Visualizer */}
        <div className="rounded-2xl overflow-hidden border border-[#504442] bg-[#150c0a] relative p-md flex flex-col gap-md">
          <div className="absolute inset-0 grid-bg opacity-40"></div>
          <div className="relative z-10 flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface">{t('fieldSectorMap', selectedLanguage)}</h2>
            <button
              onClick={() => setCurrentScreen('field-setup')}
              className="glass-panel px-3 py-1 rounded-full text-primary font-label-sm border border-primary/30"
            >
              {t('expandMap', selectedLanguage)}
            </button>
          </div>

          <div className="relative z-10 w-full h-[220px]">
            <svg className="w-full h-full" preserveAspectRatio="xMidYMid meet" viewBox="0 0 100 100">
              <polygon fill="rgba(144,215,146,0.05)" points="15,15 85,25 75,85 25,75" stroke="#504442" strokeDasharray="2,2" strokeWidth="0.5"></polygon>
              <polygon fill="none" opacity="0.5" points="15,15 85,25 75,85 25,75" stroke="#90d792" strokeWidth="1"></polygon>
              <path d="M 32 17 L 38 77 M 50 20 L 55 80 M 68 22 L 65 83 M 20 30 L 82 35 M 22 50 L 80 55 M 24 70 L 78 70" opacity="0.3" stroke="#90d792" strokeWidth="0.2"></path>

              <g transform="translate(35, 30)">
                <circle cx="0" cy="0" fill="#90d792" r="3"></circle>
                <text fill="#d3c3c0" fontFamily="Sora" fontSize="3.5" x="5" y="1">{translateSector('Sector 01', selectedLanguage)} ({sensors.nodes[0]?.moisture || 42}%)</text>
              </g>
              <g transform="translate(70, 40)">
                <circle cx="0" cy="0" fill="#90d792" r="3"></circle>
                <text fill="#d3c3c0" fontFamily="Sora" fontSize="3.5" x="5" y="1">{translateSector('Sector 02', selectedLanguage)} ({sensors.nodes[1]?.moisture || 36}%)</text>
              </g>
              <g transform="translate(65, 65)">
                <circle className="animate-pulse" cx="0" cy="0" fill={sensors.nodes[2]?.status === 'critical' ? '#ffb4ab' : '#90d792'} r="4"></circle>
                <text fill={sensors.nodes[2]?.status === 'critical' ? '#ffb4ab' : '#90d792'} fontFamily="Sora" fontSize="4" fontWeight="bold" x="7" y="1.5">
                  {translateSector('Sector 03', selectedLanguage)} ({sensors.nodes[2]?.moisture || 21}%)
                </text>
              </g>
              <g transform="translate(42, 58)">
                <circle cx="0" cy="0" fill="#90d792" r="3"></circle>
                <text fill="#d3c3c0" fontFamily="Sora" fontSize="3.5" x="5" y="1">{translateSector('Sector 04', selectedLanguage)} ({sensors.nodes[3]?.moisture || 39}%)</text>
              </g>
            </svg>
          </div>
        </div>

        {/* FIELD TOOLS & SETUP MODULES ON HOME PAGE */}
        <div className="bg-surface-container border border-surface-variant rounded-2xl p-md shadow-md flex flex-col gap-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-xs">
              <span className="material-symbols-outlined text-primary">apps</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface">Field Management & Modules</h2>
            </div>
            <span className="font-label-sm text-on-surface-variant">Quick Actions</span>
          </div>

          <div className="flex flex-col gap-sm">
            {/* Field Boundary Setup Option */}
            <button
              onClick={() => setCurrentScreen('field-setup')}
              className="p-md rounded-xl bg-surface-variant/40 border border-outline-variant/30 hover:border-primary/40 hover:bg-surface-variant/70 transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-sm">
                  <span className="material-symbols-outlined text-[26px]">map</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors">
                    {t('navFieldSetup', selectedLanguage)}
                  </h3>
                  <p className="font-body-md text-on-surface-variant text-[13px]">
                    {t('boundaryDesc', selectedLanguage)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary font-label-sm text-[13px] shrink-0">
                <span className="hidden sm:inline">Setup</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">chevron_right</span>
              </div>
            </button>

            {/* Day Wise Track Option (Below Field Boundary Setup) */}
            <button
              onClick={() => setCurrentScreen('day-wise-track')}
              className="p-md rounded-xl bg-[#2a1d1b] border border-primary/50 hover:border-primary hover:bg-[#332522] transition-all flex items-center justify-between group text-left shadow-sm"
            >
              <div className="flex items-center gap-md">
                <div className="w-12 h-12 rounded-xl bg-primary text-[#003911] flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  <span className="material-symbols-outlined text-[26px]">timeline</span>
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-headline-sm text-headline-sm text-primary group-hover:text-primary-fixed transition-colors">
                      {t('navDayWiseTrack', selectedLanguage)}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-[11px] font-bold">
                      {t('buddingStage', selectedLanguage).split('(')[0].trim()}
                    </span>
                  </div>
                  <p className="font-body-md text-on-surface-variant text-[13px]">
                    {t('day', selectedLanguage)} {farmer.cropDay} / {farmer.totalCropDays || 120} {t('days', selectedLanguage)} • {t('totalDaysToHarvest', selectedLanguage)} ({farmer.totalCropDays ? farmer.totalCropDays - farmer.cropDay : 73} {t('daysRemaining', selectedLanguage).toLowerCase()})
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-primary font-label-sm text-[13px] font-bold shrink-0">
                <span className="hidden sm:inline">View Track</span>
                <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </button>
          </div>
        </div>
      </main>

      {/* Notification Drawer */}
      <NotificationDrawer
        isOpen={isNotificationDrawerOpen}
        onClose={() => setIsNotificationDrawerOpen(false)}
        notifications={notifications}
        onMarkAllRead={markAllNotificationsRead}
        onDismiss={dismissNotification}
        onActionClick={handleNotificationAction}
      />

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
